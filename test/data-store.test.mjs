import test from 'node:test';
import assert from 'node:assert/strict';
import { DataStore, parseCsv } from '../lib/data-store.mjs';

test('parseCsv preserves quoted business labels', () => {
  const rows = parseCsv('id,summary\n1,"Policy, regional"\n');
  assert.deepEqual(rows, [{ id: '1', summary: 'Policy, regional' }]);
});

test('mission control is a role-specific decision projection', async () => {
  const store = await DataStore.create();
  const mission = store.getMissionControl();
  const items = mission.workStreams.flatMap((stream) => stream.items);

  assert.equal(mission.viewer.title, 'Technical service owner');
  assert.ok(items.some((item) => item.kind === 'evidence-gap'));
  assert.ok(items.some((item) => item.kind === 'incident'));
  assert.ok(items.every((item) => item.whyYou && item.consequence && item.decision));
});

test('service studio preserves context across blueprint, assurance, and live operation', async () => {
  const store = await DataStore.create();
  const blueprint = store.getBlueprint('svc_customer_escalation');
  const assurance = store.getAssurance('svc_customer_escalation');
  const live = store.getLiveService('svc_customer_escalation');

  assert.equal(blueprint.service.serviceId, assurance.service.serviceId);
  assert.equal(assurance.service.serviceId, live.service.serviceId);
  assert.ok(blueprint.blueprint.bands.some((band) => band.components.some((component) => component.id === 'cmp_policy')));
  assert.ok(assurance.assurance.claims.some((claim) => claim.id === 'clm_policy_selection'));
  assert.ok(live.outcomes.length > 0);
  assert.equal(typeof live.outcomes[0].eligibleResolution, 'number');
});

test('incident evidence becomes a durable assurance scenario', async () => {
  const store = await DataStore.create();
  const evidence = store.createRegressionEvidence('run_1048', {});
  const incident = store.getIncident('inc_policy_ca');

  assert.equal(evidence.claimId, 'clm_policy_selection');
  assert.equal(evidence.sourceComponent, 'cmp_policy');
  assert.equal(incident.createdRegressionEvidence.length, 1);
});

test('intent work remains one causal thread from arrival to Trusted Draft', async () => {
  const store = await DataStore.create();
  const threadId = 'wth_customer_escalation';
  const choices = [
    'anchor_incident',
    'boundary_resolved',
    'ambiguity_transfer',
    'policy_accept_draft',
    'collaborate_priya',
    'authority_human_credit',
    'commit_trusted_draft'
  ];

  let projection = store.getIntentWorkThread(threadId);
  assert.equal(projection.moment.id, 'meaningful_beginning');
  assert.equal(projection.decisions.length, 0);

  for (const optionId of choices) projection = store.respondToIntentThread(threadId, { optionId });

  assert.equal(projection.thread.status, 'trusted_draft');
  assert.equal(projection.progress.percent, 100);
  assert.equal(projection.decisions.length, choices.length);
  assert.equal(projection.clauses.find((clause) => clause.id === 'cl_policy').epistemic, 'sourced');
  assert.equal(projection.clauses.find((clause) => clause.id === 'cl_authority').decision, 'accepted as draft');
  assert.equal(projection.gaps.find((gap) => gap.id === 'gap_policy_owner').state, 'resolved');
  assert.equal(projection.contributions[0].from, 'Priya Singh');
});
