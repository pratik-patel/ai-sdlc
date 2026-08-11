import test from 'node:test';
import assert from 'node:assert/strict';
import { once } from 'node:events';
import { createApp } from '../server.mjs';

async function withServer(run) {
  const server = await createApp();
  server.listen(0, '127.0.0.1');
  await once(server, 'listening');
  const { port } = server.address();
  try {
    await run(`http://127.0.0.1:${port}`);
  } finally {
    server.close();
    await once(server, 'close');
  }
}

async function getData(url) {
  const response = await fetch(url);
  assert.equal(response.status, 200);
  return (await response.json()).data;
}

test('workflow projections expose decisions, portfolio lenses, and service context', async () => {
  await withServer(async (baseUrl) => {
    const health = await getData(`${baseUrl}/api/health`);
    assert.equal(health.status, 'ok');
    assert.ok(health.sources.includes('runs.csv'));

    const mission = await getData(`${baseUrl}/api/mission-control`);
    assert.ok(mission.workStreams.flatMap((stream) => stream.items).length >= 4);

    const portfolio = await getData(`${baseUrl}/api/portfolio?lens=architecture`);
    assert.equal(portfolio.lens, 'architecture');
    assert.ok(portfolio.architecture.relationships.length > 0);

    const assurance = await getData(`${baseUrl}/api/services/svc_customer_escalation/assurance`);
    assert.equal(assurance.assurance.state, 'blocked');
    assert.equal(assurance.service.candidateRelease, 'v1.9');
  });
});

test('assurance and incident commands close the evidence learning loop', async () => {
  await withServer(async (baseUrl) => {
    const requestResponse = await fetch(`${baseUrl}/api/assurance-cases/asc_v19/commands/request-evidence`, {
      method: 'POST',
      headers: { 'content-type': 'application/json' },
      body: JSON.stringify({ gapId: 'gap_ca_effective_date', assignee: 'Priya Singh' })
    });
    assert.equal(requestResponse.status, 201);
    const request = (await requestResponse.json()).data;
    assert.equal(request.state, 'requested');

    const regressionResponse = await fetch(`${baseUrl}/api/runs/run_1048/commands/create-regression-evidence`, {
      method: 'POST',
      headers: { 'content-type': 'application/json' },
      body: JSON.stringify({ cohort: 'Canada · effective-date conflict' })
    });
    assert.equal(regressionResponse.status, 201);
    const regression = (await regressionResponse.json()).data;
    assert.equal(regression.runId, 'run_1048');
    assert.equal(regression.claimId, 'clm_policy_selection');

    const incident = await getData(`${baseUrl}/api/incidents/inc_policy_ca`);
    assert.equal(incident.createdRegressionEvidence.length, 1);
  });
});

test('Intent to Trusted Draft advances through REST commands as one workflow', async () => {
  await withServer(async (baseUrl) => {
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

    let projection = await getData(`${baseUrl}/api/work-threads/${threadId}/intent-draft`);
    assert.equal(projection.moment.id, 'meaningful_beginning');

    for (const optionId of choices) {
      const response = await fetch(`${baseUrl}/api/work-threads/${threadId}/commands/respond`, {
        method: 'POST',
        headers: { 'content-type': 'application/json' },
        body: JSON.stringify({ optionId, madeBy: 'Maya Chen' })
      });
      assert.equal(response.status, 200);
      projection = (await response.json()).data;
    }

    assert.equal(projection.thread.status, 'trusted_draft');
    assert.equal(projection.thread.nextEpisode, 'Compose the agent service');
    assert.equal(projection.progress.percent, 100);
    assert.equal(projection.decisions.length, 7);
  });
});
