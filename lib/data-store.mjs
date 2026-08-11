import { readFile } from 'node:fs/promises';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const moduleDir = path.dirname(fileURLToPath(import.meta.url));
const dataDir = path.join(moduleDir, '..', 'data');

function parseCsvLine(line) {
  const values = [];
  let current = '';
  let quoted = false;

  for (let index = 0; index < line.length; index += 1) {
    const character = line[index];
    if (character === '"') {
      if (quoted && line[index + 1] === '"') {
        current += '"';
        index += 1;
      } else {
        quoted = !quoted;
      }
    } else if (character === ',' && !quoted) {
      values.push(current);
      current = '';
    } else {
      current += character;
    }
  }
  values.push(current);
  return values;
}

export function parseCsv(csv) {
  const lines = csv.trim().split(/\r?\n/);
  if (!lines.length || !lines[0]) return [];
  const headers = parseCsvLine(lines[0]);
  return lines.slice(1).filter(Boolean).map((line) => {
    const values = parseCsvLine(line);
    return Object.fromEntries(headers.map((header, index) => [header, values[index] ?? '']));
  });
}

function normalizeOutcome(row) {
  return {
    ...row,
    eligibleResolution: Number(row.eligibleResolution),
    policyAccuracy: Number(row.policyAccuracy),
    cycleTime: Number(row.cycleTime),
    repeatContact: Number(row.repeatContact),
    costPerSuccess: Number(row.costPerSuccess)
  };
}

function normalizeTimeline(row) {
  return { ...row, timestamp: new Date(row.timestamp).toISOString() };
}

export async function loadData() {
  const [modelText, intentThreadText, outcomeText, timelineText, runText] = await Promise.all([
    readFile(path.join(dataDir, 'product-model.json'), 'utf8'),
    readFile(path.join(dataDir, 'intent-work-thread.json'), 'utf8'),
    readFile(path.join(dataDir, 'outcome-observations.csv'), 'utf8'),
    readFile(path.join(dataDir, 'incident-timeline.csv'), 'utf8'),
    readFile(path.join(dataDir, 'runs.csv'), 'utf8')
  ]);

  return {
    model: JSON.parse(modelText),
    intentThread: JSON.parse(intentThreadText),
    outcomes: parseCsv(outcomeText).map(normalizeOutcome),
    timeline: parseCsv(timelineText).map(normalizeTimeline),
    runs: parseCsv(runText).map((run) => ({ ...run, latency: Number(run.latency), cost: Number(run.cost) }))
  };
}

export class DataStore {
  constructor(data) {
    this.data = data;
    this.intentThread = structuredClone(data.intentThread);
    this.intentThread.decisions = [];
    this.intentThread.contributions = [];
    this.createdRegressionEvidence = [];
    this.evidenceRequests = [];
  }

  static async create() {
    return new DataStore(await loadData());
  }

  getHealth() {
    return {
      status: 'ok',
      projectionVersion: 'agentgrid-v2',
      sources: ['product-model.json', 'intent-work-thread.json', 'outcome-observations.csv', 'incident-timeline.csv', 'runs.csv']
    };
  }

  getIntentWorkThread(threadId) {
    const work = this.intentThread;
    if (threadId !== work.thread.id) return null;
    const currentIndex = work.thread.currentMoment;
    const moment = work.moments[currentIndex];
    const visible = (item) => item.revealedAt <= currentIndex;
    return {
      thread: work.thread,
      moment,
      moments: work.moments.map((item, index) => ({
        id: item.id,
        eyebrow: item.eyebrow,
        title: item.title,
        index,
        state: work.thread.status === 'trusted_draft' || index < currentIndex ? 'complete' : index === currentIndex ? 'active' : 'upcoming'
      })),
      clauses: work.clauses.filter(visible),
      serviceSketch: work.serviceSketch.filter(visible),
      gaps: work.gaps.filter(visible),
      decisions: work.decisions,
      contributions: work.contributions,
      progress: {
        completed: work.thread.status === 'trusted_draft' ? work.moments.length : currentIndex,
        total: work.moments.length,
        percent: work.thread.status === 'trusted_draft' ? 100 : Math.round(currentIndex / (work.moments.length - 1) * 100)
      }
    };
  }

  respondToIntentThread(threadId, payload = {}) {
    const work = this.intentThread;
    if (threadId !== work.thread.id || work.thread.status === 'trusted_draft') return null;
    const index = work.thread.currentMoment;
    const moment = work.moments[index];
    const option = moment.options.find((item) => item.id === payload.optionId);
    if (!option) return { error: 'invalid_option' };

    work.decisions.push({
      id: `dec_${Date.now()}_${index}`,
      momentId: moment.id,
      momentTitle: moment.eyebrow,
      optionId: option.id,
      decision: option.label,
      consequence: moment.consequence,
      madeBy: payload.madeBy || work.thread.startedBy.name,
      createdAt: new Date().toISOString()
    });

    const clause = (id) => work.clauses.find((item) => item.id === id);
    const gap = (id) => work.gaps.find((item) => item.id === id);

    if (option.id === 'anchor_incident') {
      clause('cl_outcome').epistemic = 'sourced';
      clause('cl_outcome').source = 'Business objective corroborated by incident inc_policy_ca';
    }
    if (option.id === 'boundary_resolved') {
      clause('cl_outcome').decision = 'accepted as draft';
      clause('cl_boundary').decision = 'accepted as draft';
    }
    if (option.id === 'boundary_recommended') {
      clause('cl_outcome').decision = 'accepted as draft';
      clause('cl_boundary').statement = 'Complete when a policy-grounded recommendation and rationale are produced.';
      clause('cl_boundary').decision = 'accepted as draft';
    }
    if (option.id === 'ambiguity_transfer') clause('cl_ambiguity').decision = 'accepted as draft';
    if (option.id === 'ambiguity_rank') {
      clause('cl_ambiguity').statement = 'Rank conflicting policies and select the highest-confidence result.';
      clause('cl_ambiguity').decision = 'contested';
    }
    if (option.id === 'policy_accept_draft') {
      clause('cl_policy').decision = 'accepted as draft';
      gap('gap_policy_owner').state = 'ready to assign';
    }
    if (option.id === 'policy_contest') {
      clause('cl_policy').decision = 'contested';
      gap('gap_policy_owner').state = 'contested';
    }
    if (option.id === 'collaborate_priya') {
      work.thread.participants.find((person) => person.name === 'Priya Singh').state = 'contributed';
      clause('cl_policy').epistemic = 'sourced';
      clause('cl_policy').decision = 'accepted as draft';
      clause('cl_policy').source = 'Priya Singh · Canada Resolution Policy 2026.08 §2.1';
      gap('gap_policy_owner').state = 'resolved';
      work.contributions.push({
        id: `con_${Date.now()}`,
        from: 'Priya Singh',
        role: 'Policy owner',
        statement: 'Confirmed. Canadian jurisdiction and effective date take precedence. Enterprise-account exceptions must transfer for manual policy review.',
        source: 'Canada Resolution Policy 2026.08 §2.1',
        createdAt: new Date().toISOString()
      });
    }
    if (option.id === 'defer_policy_owner') {
      gap('gap_policy_owner').state = 'assigned';
      clause('cl_policy').decision = 'deferred';
    }
    if (option.id === 'authority_human_credit') clause('cl_authority').decision = 'accepted as draft';
    if (option.id === 'authority_small_credit') {
      clause('cl_authority').statement = 'The service may issue credits up to $50; larger or ambiguous credits require human approval.';
      clause('cl_authority').decision = 'accepted as draft';
    }
    if (option.id === 'review_material_decisions') {
      work.thread.currentMoment = 3;
      work.thread.reviewRequested = true;
      return this.getIntentWorkThread(threadId);
    }
    if (option.id === 'commit_trusted_draft') {
      clause('cl_fitness').decision = 'accepted as draft';
      work.thread.status = 'trusted_draft';
      work.thread.committedAt = new Date().toISOString();
      work.thread.nextEpisode = 'Compose the agent service';
      return this.getIntentWorkThread(threadId);
    }

    work.thread.currentMoment = Math.min(index + 1, work.moments.length - 1);
    work.thread.updatedAt = new Date().toISOString();
    return this.getIntentWorkThread(threadId);
  }

  resetIntentWorkThread(threadId) {
    if (threadId !== this.intentThread.thread.id) return null;
    this.intentThread = structuredClone(this.data.intentThread);
    this.intentThread.decisions = [];
    this.intentThread.contributions = [];
    return this.getIntentWorkThread(threadId);
  }

  getMissionControl() {
    return {
      organization: this.data.model.organization,
      viewer: this.data.model.viewer,
      ...this.data.model.missionControl
    };
  }

  getPortfolio(lens = 'outcomes') {
    if (lens === 'architecture') {
      return { lens, architecture: this.data.model.portfolio.architecture };
    }
    return { lens: 'outcomes', domains: this.data.model.portfolio.domains };
  }

  getServiceDossier(serviceId) {
    if (serviceId !== this.data.model.service.serviceId) return null;
    return this.data.model.service;
  }

  getBlueprint(serviceId) {
    if (serviceId !== this.data.model.service.serviceId) return null;
    return {
      service: this.data.model.service,
      blueprint: this.data.model.blueprint
    };
  }

  getAssurance(serviceId) {
    if (serviceId !== this.data.model.service.serviceId) return null;
    return {
      service: this.data.model.service,
      assurance: {
        ...this.data.model.assurance,
        requestedEvidence: this.evidenceRequests
      }
    };
  }

  getLiveService(serviceId) {
    if (serviceId !== this.data.model.service.serviceId) return null;
    return {
      service: this.data.model.service,
      live: this.data.model.live,
      outcomes: this.data.outcomes.filter((row) => row.serviceId === serviceId),
      recentRuns: this.data.runs.filter((run) => run.agentId === 'customer-escalation'),
      incident: {
        id: this.data.model.incident.id,
        title: this.data.model.incident.title,
        state: this.data.model.incident.state,
        severity: this.data.model.incident.severity
      }
    };
  }

  getOperations() {
    const allServices = this.data.model.portfolio.domains.flatMap((domain) =>
      domain.capabilities.flatMap((capability) =>
        capability.processes.flatMap((process) => process.services.map((service) => ({
          ...service,
          process: process.name,
          capability: capability.name,
          domain: domain.name
        })))
      )
    );
    return {
      services: allServices,
      incident: this.data.model.incident,
      outcomeObservations: this.data.outcomes,
      topology: this.data.model.portfolio.architecture
    };
  }

  getIncident(incidentId) {
    if (incidentId !== this.data.model.incident.id) return null;
    return {
      ...this.data.model.incident,
      service: this.data.model.service,
      topology: this.data.model.portfolio.architecture,
      timeline: this.data.timeline.filter((event) => event.incidentId === incidentId),
      createdRegressionEvidence: this.createdRegressionEvidence
    };
  }

  getGovernance() {
    return {
      service: this.data.model.service,
      governance: this.data.model.governance,
      architecture: this.data.model.portfolio.architecture
    };
  }

  requestEvidence(caseId, payload) {
    if (caseId !== this.data.model.assurance.caseId) return null;
    const request = {
      id: `evr_${Date.now()}`,
      caseId,
      gapId: payload.gapId,
      assignee: payload.assignee || this.data.model.assurance.evidenceGap.suggestedAssignee,
      note: payload.note || 'Review the missing cohort expectations and record domain evidence.',
      state: 'requested',
      requestedAt: new Date().toISOString()
    };
    this.evidenceRequests.push(request);
    return request;
  }

  createRegressionEvidence(runId, payload = {}) {
    const incident = this.data.model.incident;
    if (runId !== incident.representativeRun.id) return null;
    const evidence = {
      id: `reg_${Date.now()}`,
      runId,
      serviceId: this.data.model.service.serviceId,
      assuranceCaseId: this.data.model.assurance.caseId,
      claimId: 'clm_policy_selection',
      requirement: 'Select the authoritative regional policy by jurisdiction and effective date.',
      cohort: payload.cohort || 'Canada · trial cancellation · effective-date conflict',
      expectedBehavior: payload.expectedBehavior || 'Use the current Canadian policy or route to a policy owner when applicability is ambiguous.',
      sourceRelease: incident.representativeRun.release,
      sourceComponent: incident.representativeRun.component,
      state: 'proposed',
      createdAt: new Date().toISOString()
    };
    this.createdRegressionEvidence.push(evidence);
    return evidence;
  }
}
