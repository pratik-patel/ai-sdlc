# AgentGrid enterprise agent-service portal

AgentGrid is a workflow-first prototype for designing, assuring, operating, and governing consequential enterprise agent services. It is intentionally not an agent CRUD console or an API catalog. The product organizes work around business outcomes, decision rights, evidence, service behavior, and operational learning.

The current entry experience is one continuous **Intent → Trusted Draft** workflow. Seven material moments transform the same Work Thread, Living Specification, Service Sketch, gaps, provenance, collaboration context, and decision ledger. They are not seven screens.

## The core product loop

```text
Assigned decision
  → service context
  → blueprint contract
  → assurance evidence
  → bounded release
  → live outcome observation
  → incident restoration
  → regression evidence for the next release
```

The prototype demonstrates this loop through one deeply modeled service: **Customer escalation**. A Canadian policy-freshness failure connects the portfolio architecture, candidate blueprint, blocked assurance claim, constrained production mode, incident response, and newly created regression evidence.

## Product workspaces

- **Mission Control** prioritizes work by consequence and explains why the current user must act.
- **Portfolio** provides two coordinated lenses: outcome performance and architecture concentration risk.
- **Service Studio** keeps a stable Service Dossier while moving through Blueprint, Assurance, and Live Service.
- **Operations** orders intervention by customer and service impact rather than alert count.
- **Governance** connects policy objectives to control effectiveness, evidence, owners, and affected services.
- **Incident workspace** joins impact, restoration narrative, representative runtime evidence, exit conditions, and the learning loop.

## Data and application structure

```text
Browser workspace
  ↓ workflow projection requests
Node application service
  ↓ projection adapter
JSON domain fixture + CSV observations
```

The UI loads all business state through REST calls. JSON and CSV are prototype seed formats, not the product architecture. The projection layer can later move to Postgres, an event store, or enterprise connectors without forcing the UI into resource-by-resource CRUD screens.

Primary fixture sources:

- `data/product-model.json` — service, portfolio, assurance, runtime, incident, and governance model
- `data/outcome-observations.csv` — longitudinal service outcomes
- `data/incident-timeline.csv` — incident event narrative
- `data/runs.csv` — representative runtime observations

## Run and verify

```bash
npm start
```

Open [http://127.0.0.1:4173](http://127.0.0.1:4173).

```bash
npm test
```

## Workflow projections

- `GET /api/work-threads/:threadId/intent-draft`
- `POST /api/work-threads/:threadId/commands/respond`
- `POST /api/work-threads/:threadId/commands/reset`

- `GET /api/mission-control`
- `GET /api/portfolio?lens=outcomes|architecture`
- `GET /api/operations`
- `GET /api/governance/control-coverage`
- `GET /api/services/:serviceId/dossier`
- `GET /api/services/:serviceId/blueprint`
- `GET /api/services/:serviceId/assurance`
- `GET /api/services/:serviceId/live`
- `GET /api/incidents/:incidentId`
- `POST /api/assurance-cases/:caseId/commands/request-evidence`
- `POST /api/runs/:runId/commands/create-regression-evidence`

The product rationale, information architecture, lifecycle, domain model, execution plan, interaction contracts, and representation system live in the adjacent Markdown documents.

Start with these current product authorities, in this order:

- `PORTAL_PRODUCT_AND_USE_CASE_AUDIT.md` — evidence-based audit of what is implemented and what is missing
- `AGENTGRID_END_TO_END_OPERATING_MODEL.md` — corrected system boundary, catalog/builder/test/developer workflows, integration model, test strategy, and implementation increments
- `AGENTGRID_EXPERIENCE_STRATEGY.md` — experience episodes, interaction grammar, persistent work objects, component-quality standard, and the design gate before further UI implementation
- `INTENT_TO_TRUSTED_DRAFT_EXPERIENCE_CONTRACT.md` — actors, trust model, conversation strategy, transformation states, collaboration, recovery, and success criteria for the first experience
- `INTENT_TO_TRUSTED_DRAFT_WIREFLOW.md` — primary and alternate temporal flows, adaptive-surface behavior, component interaction contracts, and prototype validation script

The existing portal is evidence for the implemented assurance/operations slice, not the target interaction model. No additional catalog, builder, test, or governance screen should be added until the Intent → Trusted Draft experience gate is validated.
