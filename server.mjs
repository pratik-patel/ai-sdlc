import { createServer } from 'node:http';
import { readFile } from 'node:fs/promises';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { DataStore } from './lib/data-store.mjs';

const rootDir = path.dirname(fileURLToPath(import.meta.url));
const publicDir = path.join(rootDir, 'public');

const mimeTypes = {
  '.html': 'text/html; charset=utf-8',
  '.css': 'text/css; charset=utf-8',
  '.js': 'text/javascript; charset=utf-8',
  '.svg': 'image/svg+xml',
  '.json': 'application/json; charset=utf-8'
};

function json(response, status, payload) {
  response.writeHead(status, { 'content-type': 'application/json; charset=utf-8' });
  response.end(JSON.stringify(payload));
}

function envelope(data, projectionVersion) {
  return {
    data,
    meta: {
      projectionVersion,
      generatedAt: new Date().toISOString()
    }
  };
}

async function readJsonBody(request) {
  const chunks = [];
  for await (const chunk of request) chunks.push(chunk);
  const text = Buffer.concat(chunks).toString('utf8');
  return text ? JSON.parse(text) : {};
}

function match(pathname, pattern) {
  const names = [];
  const expression = pattern.replace(/:([^/]+)/g, (_, name) => {
    names.push(name);
    return '([^/]+)';
  });
  const result = pathname.match(new RegExp(`^${expression}$`));
  if (!result) return null;
  return Object.fromEntries(names.map((name, index) => [name, decodeURIComponent(result[index + 1])]));
}

function notFound(response, label) {
  return json(response, 404, { error: { code: 'not_found', message: `${label} was not found.` } });
}

export async function createApp() {
  const store = await DataStore.create();

  return createServer(async (request, response) => {
    try {
      const url = new URL(request.url, 'http://localhost');
      const { pathname } = url;

      if (request.method === 'GET' && pathname === '/api/health') {
        return json(response, 200, envelope(store.getHealth(), 'health.v2'));
      }
      if (request.method === 'GET' && pathname === '/api/mission-control') {
        return json(response, 200, envelope(store.getMissionControl(), 'mission-control.v2'));
      }
      if (request.method === 'GET' && pathname === '/api/portfolio') {
        return json(response, 200, envelope(store.getPortfolio(url.searchParams.get('lens') || 'outcomes'), 'portfolio.v2'));
      }
      if (request.method === 'GET' && pathname === '/api/operations') {
        return json(response, 200, envelope(store.getOperations(), 'operations.v2'));
      }
      if (request.method === 'GET' && pathname === '/api/governance/control-coverage') {
        return json(response, 200, envelope(store.getGovernance(), 'governance-control-coverage.v2'));
      }

      const intentThread = match(pathname, '/api/work-threads/:threadId/intent-draft');
      if (request.method === 'GET' && intentThread) {
        const data = store.getIntentWorkThread(intentThread.threadId);
        return data ? json(response, 200, envelope(data, 'intent-trusted-draft.v1')) : notFound(response, 'Work thread');
      }

      const intentResponse = match(pathname, '/api/work-threads/:threadId/commands/respond');
      if (request.method === 'POST' && intentResponse) {
        const result = store.respondToIntentThread(intentResponse.threadId, await readJsonBody(request));
        if (result?.error === 'invalid_option') {
          return json(response, 422, { error: { code: 'invalid_option', message: 'That response is not available for the active moment.' } });
        }
        return result ? json(response, 200, envelope(result, 'intent-response-command.v1')) : notFound(response, 'Active work thread');
      }

      const intentReset = match(pathname, '/api/work-threads/:threadId/commands/reset');
      if (request.method === 'POST' && intentReset) {
        const result = store.resetIntentWorkThread(intentReset.threadId);
        return result ? json(response, 200, envelope(result, 'intent-reset-command.v1')) : notFound(response, 'Work thread');
      }

      const dossier = match(pathname, '/api/services/:serviceId/dossier');
      if (request.method === 'GET' && dossier) {
        const data = store.getServiceDossier(dossier.serviceId);
        return data ? json(response, 200, envelope(data, 'service-dossier.v2')) : notFound(response, 'Service');
      }

      const blueprint = match(pathname, '/api/services/:serviceId/blueprint');
      if (request.method === 'GET' && blueprint) {
        const data = store.getBlueprint(blueprint.serviceId);
        return data ? json(response, 200, envelope(data, 'service-blueprint.v2')) : notFound(response, 'Service');
      }

      const assurance = match(pathname, '/api/services/:serviceId/assurance');
      if (request.method === 'GET' && assurance) {
        const data = store.getAssurance(assurance.serviceId);
        return data ? json(response, 200, envelope(data, 'service-assurance.v2')) : notFound(response, 'Service');
      }

      const live = match(pathname, '/api/services/:serviceId/live');
      if (request.method === 'GET' && live) {
        const data = store.getLiveService(live.serviceId);
        return data ? json(response, 200, envelope(data, 'live-service.v2')) : notFound(response, 'Service');
      }

      const incident = match(pathname, '/api/incidents/:incidentId');
      if (request.method === 'GET' && incident) {
        const data = store.getIncident(incident.incidentId);
        return data ? json(response, 200, envelope(data, 'incident.v2')) : notFound(response, 'Incident');
      }

      const evidenceCommand = match(pathname, '/api/assurance-cases/:caseId/commands/request-evidence');
      if (request.method === 'POST' && evidenceCommand) {
        const result = store.requestEvidence(evidenceCommand.caseId, await readJsonBody(request));
        return result ? json(response, 201, envelope(result, 'evidence-request-command.v1')) : notFound(response, 'Assurance case');
      }

      const regressionCommand = match(pathname, '/api/runs/:runId/commands/create-regression-evidence');
      if (request.method === 'POST' && regressionCommand) {
        const result = store.createRegressionEvidence(regressionCommand.runId, await readJsonBody(request));
        return result ? json(response, 201, envelope(result, 'regression-evidence-command.v1')) : notFound(response, 'Run');
      }

      if (request.method === 'GET') {
        const requested = pathname === '/' ? 'index.html' : pathname.replace(/^\//, '');
        const candidate = path.resolve(publicDir, requested);
        if (!candidate.startsWith(publicDir)) return json(response, 403, { error: { code: 'forbidden', message: 'Forbidden' } });
        try {
          const content = await readFile(candidate);
          response.writeHead(200, { 'content-type': mimeTypes[path.extname(candidate)] ?? 'application/octet-stream' });
          return response.end(content);
        } catch {
          const content = await readFile(path.join(publicDir, 'index.html'));
          response.writeHead(200, { 'content-type': mimeTypes['.html'] });
          return response.end(content);
        }
      }

      return json(response, 404, { error: { code: 'not_found', message: 'Route not found.' } });
    } catch (error) {
      return json(response, 500, { error: { code: 'internal_error', message: error.message } });
    }
  });
}

if (process.argv[1] === fileURLToPath(import.meta.url)) {
  const port = Number(process.env.PORT || 4173);
  const server = await createApp();
  server.listen(port, '127.0.0.1', () => {
    console.log(`AgentGrid is running at http://127.0.0.1:${port}`);
  });
}
