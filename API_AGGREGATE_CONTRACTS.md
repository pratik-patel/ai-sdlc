# AgentGrid API Aggregate Contracts

**Status:** Product and API planning artifact; not an implementation specification
**Purpose:** Define the use-case-oriented REST contracts that connect the canonical domain model to future portal contexts without exposing CRUD-oriented entity architecture.

---

## 1. API position

The UI should continue to load data through REST calls. The earlier technical direction remains valid:

```text
Portal context
→ use-case REST endpoint
→ application service
→ domain aggregates and projections
→ file-backed prototype or production persistence
```

The correction is not to abandon REST. It is to stop treating raw files or individual database entities as the portal contract.

The portal needs decision-ready aggregates such as:

- A release case with evidence, participants, authority, and consequences
- An incident with business impact, topology, mitigation, and follow-up
- A service blueprint with contracts, controls, and production evidence
- A portfolio lens connecting capabilities, outcomes, services, and dependencies

---

## 2. Contract principles

1. **Design endpoints around user decisions and workflows.**
2. **Keep domain entities addressable but do not force the UI to assemble primary contexts from dozens of calls.**
3. **Separate read projections from state-changing commands.**
4. **Return state semantics, transition options, and missing prerequisites together.**
5. **Include authority and evidence requirements in consequential command preparation.**
6. **Use immutable version and evidence identifiers.**
7. **Apply optimistic concurrency to editable or transitionable aggregates.**
8. **Use idempotency keys for commands that may be retried.**
9. **Return links and continuation contracts rather than navigation assumptions.**
10. **Keep sensitive content scoped and redactable.**
11. **Support external runtimes and connectors through adapters behind stable contracts.**
12. **Make file-backed prototype data conform to the same aggregate shapes expected from a future database.**

---

## 3. Query and command separation

### Query endpoints

Queries return read-optimized projections and never change state.

Examples:

- `GET /api/mission-control`
- `GET /api/portfolio?lens=architecture`
- `GET /api/services/{serviceId}/dossier`
- `GET /api/services/{serviceId}/blueprint`
- `GET /api/services/{serviceId}/assurance`
- `GET /api/services/{serviceId}/live`
- `GET /api/incidents/{incidentId}`
- `GET /api/governance/control-coverage`

### Command endpoints

Commands express domain intent rather than generic update operations.

Examples:

- `POST /api/services/{serviceId}/commands/propose-blueprint-candidate`
- `POST /api/assurance-cases/{caseId}/commands/request-evidence`
- `POST /api/release-cases/{caseId}/commands/record-decision`
- `POST /api/rollouts/{rolloutId}/commands/pause`
- `POST /api/incidents/{incidentId}/commands/apply-mitigation`
- `POST /api/runs/{runId}/commands/create-regression-evidence`

Avoid generic `PATCH /api/record/{id}` for consequential state transitions.

---

## 4. Common response envelope

```json
{
  "data": {},
  "meta": {
    "requestId": "req_01...",
    "generatedAt": "2026-08-11T14:20:00Z",
    "projectionVersion": "mission-control.v1",
    "sourceFreshness": {
      "asOf": "2026-08-11T14:19:42Z",
      "state": "current"
    }
  },
  "links": {
    "self": "/api/..."
  }
}
```

### Sensitive projection metadata

When content is reduced because of viewer entitlement:

```json
{
  "redaction": {
    "applied": true,
    "reason": "trace_content_restricted",
    "visibleScope": "aggregate_only"
  }
}
```

---

## 5. Common state representation

Never return a bare status without subject and semantics.

```json
{
  "state": {
    "dimension": "assurance_case",
    "code": "blocked",
    "label": "Blocked by missing domain evidence",
    "enteredAt": "2026-08-11T13:40:00Z",
    "reason": "Canadian policy-conflict cohort has no reviewed scenario evidence.",
    "scope": {
      "candidateBlueprintVersionId": "bpr_019...",
      "consumerSegments": ["support-specialists"],
      "jurisdictions": ["CA"]
    },
    "canAdvanceWhen": [
      "Assigned domain expert records a review",
      "Evidence producer completes the missing scenario set"
    ]
  }
}
```

---

## 6. Mission Control aggregate

### Endpoint

`GET /api/mission-control?viewer={identityId}`

In production, viewer identity should usually derive from authentication rather than a query parameter.

### Product question

What requires this person's judgment or action now, why are they responsible, and what evidence is available?

### Shape

```json
{
  "data": {
    "viewer": {
      "identityId": "idn_maya",
      "displayName": "Maya Chen",
      "activeRoles": ["agent-developer", "technical-service-owner"]
    },
    "workStreams": [
      {
        "streamKey": "decisions",
        "label": "Decisions",
        "items": [
          {
            "workItemId": "wrk_301",
            "workType": "release_evidence_gap",
            "title": "Resolve v1.9 policy-evidence gap",
            "service": {
              "serviceId": "svc_customer_escalation",
              "name": "Customer escalation"
            },
            "responsibility": {
              "role": "technical-service-owner",
              "reason": "You own the candidate architecture and evidence plan."
            },
            "consequence": {
              "businessImpact": "Canadian cancellation cohort cannot enter pilot.",
              "risk": "Regional policy mismatch",
              "timeSensitivity": "release-window"
            },
            "requiredDecision": "Assign or resolve missing evidence",
            "evidence": {
              "available": 18,
              "missing": 2,
              "blocking": true
            },
            "dueAt": "2026-08-12T17:00:00Z",
            "priorityFactors": ["material-release", "customer-impact", "assigned-owner"],
            "continuation": {
              "context": "service-assurance",
              "href": "/api/services/svc_customer_escalation/assurance?candidate=bpr_019"
            }
          }
        ]
      }
    ],
    "continuations": [],
    "recentDecisions": []
  }
}
```

### Do not include by default

- Generic enterprise KPI grid
- Every open incident regardless of responsibility
- Undifferentiated notifications
- Work that cannot be advanced by the viewer

---

## 7. Portfolio aggregate

### Endpoint

`GET /api/portfolio?lens={outcomes|architecture|lifecycle|exposure}`

### Common filters

- `domainId`
- `capabilityId`
- `ownerIdentityId`
- `riskTier`
- `jurisdiction`
- `lifecycleState`
- `registryComponentId`

### Outcome lens

```json
{
  "data": {
    "lens": "outcomes",
    "domains": [
      {
        "domainId": "dom_customer_ops",
        "name": "Customer Operations",
        "capabilities": [
          {
            "capabilityId": "cap_issue_resolution",
            "name": "Issue resolution",
            "processes": [
              {
                "processId": "prc_escalation_resolution",
                "name": "Escalation resolution",
                "services": [
                  {
                    "serviceId": "svc_customer_escalation",
                    "name": "Customer escalation",
                    "outcomes": [
                      {
                        "measureKey": "eligible_resolution",
                        "state": "trending_toward_target",
                        "current": 0.918,
                        "target": 0.94,
                        "attributionConfidence": "medium",
                        "counterMetricState": "within_target"
                      }
                    ],
                    "operatingCost": {
                      "amount": 0.42,
                      "unit": "USD_per_successful_outcome"
                    }
                  }
                ]
              }
            ]
          }
        ]
      }
    ]
  }
}
```

### Architecture lens

Returns nodes and typed relationships:

```json
{
  "data": {
    "lens": "architecture",
    "nodes": [
      {
        "id": "svc_customer_escalation",
        "type": "agent-service",
        "label": "Customer escalation",
        "criticality": "high"
      },
      {
        "id": "reg_policy_product",
        "type": "data-product",
        "label": "Resolution policies"
      }
    ],
    "relationships": [
      {
        "id": "rel_401",
        "from": "svc_customer_escalation",
        "to": "reg_policy_product",
        "type": "depends_on",
        "scope": "policy interpretation",
        "criticality": "high"
      }
    ],
    "concentrations": [
      {
        "subjectId": "reg_policy_product",
        "affectedServiceCount": 7,
        "finding": "single-source policy dependency"
      }
    ]
  }
}
```

### Lifecycle and exposure lenses

Return domain-specific dimensions, not a generic status value.

---

## 8. Service Dossier aggregate

### Endpoint

`GET /api/services/{serviceId}/dossier`

### Product question

What enterprise service is this, what is it accountable for, who owns it, and under what operating envelope?

### Shape

```json
{
  "data": {
    "service": {
      "serviceId": "svc_customer_escalation",
      "serviceKey": "customer-escalation",
      "name": "Customer escalation",
      "mission": "Resolve eligible customer escalations accurately and quickly while protecting customer trust and financial control.",
      "businessContext": {
        "domain": {"id": "dom_customer_ops", "name": "Customer Operations"},
        "capability": {"id": "cap_issue_resolution", "name": "Issue resolution"},
        "process": {"id": "prc_escalation_resolution", "name": "Escalation resolution"}
      },
      "consumers": ["support-specialists", "escalation-managers"],
      "jurisdictions": ["US", "CA"],
      "boundary": [],
      "nonGoals": []
    },
    "accountability": {
      "businessOwner": {},
      "technicalOwner": {},
      "riskOwner": {},
      "operatingTeam": {},
      "domainExperts": []
    },
    "outcomeContract": {
      "versionId": "ocv_18",
      "measures": [],
      "counterMetrics": [],
      "attributionMethod": {},
      "observationWindows": []
    },
    "operatingEnvelope": {
      "riskTier": 3,
      "dataSensitivity": ["confidential"],
      "actionAuthority": ["financial-write-with-approval"],
      "certifiedScope": {},
      "activeExceptions": []
    },
    "currentState": {
      "lifecycle": {},
      "outcomes": [],
      "runtimeHealth": {},
      "certification": {},
      "openIncidentCount": 1
    }
  }
}
```

---

## 9. Service Blueprint aggregate

### Endpoint

`GET /api/services/{serviceId}/blueprint?version={blueprintVersionId}`

### Product question

How is this service designed to produce the outcome, and what contracts, controls, and dependencies govern each component?

### Shape

```json
{
  "data": {
    "serviceSummary": {},
    "blueprint": {
      "blueprintVersionId": "bpr_019",
      "version": "1.9-candidate",
      "state": {},
      "basedOn": "bpr_018",
      "changeSet": {
        "changeSetId": "chg_019",
        "materiality": "material_behavior_and_data",
        "summary": "Adds jurisdiction and effective-date precedence to policy retrieval.",
        "affectedSubjects": []
      },
      "components": [
        {
          "componentId": "cmp_policy_interpretation",
          "type": "context_lookup",
          "name": "Determine applicable policy",
          "purpose": "Resolve authoritative policy by region, plan, and effective date.",
          "owner": {},
          "contracts": {
            "inputs": [],
            "outputs": [],
            "data": [],
            "authority": null
          },
          "registryBindings": [],
          "controlBindings": [],
          "failureModes": [],
          "productionEvidenceSummary": {}
        }
      ],
      "relationships": [],
      "failurePaths": [],
      "unresolvedDesignIssues": []
    },
    "transitionOptions": []
  }
}
```

### Component detail

`GET /api/services/{serviceId}/blueprint/components/{componentId}?version={blueprintVersionId}`

Returns deeper contracts and evidence while preserving service and blueprint context.

---

## 10. Assurance aggregate

### Endpoint

`GET /api/services/{serviceId}/assurance?candidate={blueprintVersionId}`

### Product question

What evidence supports the candidate's fitness claim, where are the gaps, and which decisions are required?

### Shape

```json
{
  "data": {
    "candidate": {},
    "changeImpact": {
      "materiality": "material_behavior_and_data",
      "affectedConsumers": ["CA-support-specialists"],
      "affectedComponents": ["cmp_policy_interpretation"],
      "affectedRequirements": [],
      "affectedRisks": [],
      "invalidatedEvidence": []
    },
    "assuranceCase": {
      "assuranceCaseId": "asc_019",
      "state": {},
      "proposedScope": {},
      "fitnessClaims": [
        {
          "fitnessClaimId": "clm_policy_selection",
          "statement": "The candidate selects the authoritative regional policy for supported jurisdictions and effective dates.",
          "state": "partially_supported",
          "requirementCoverage": {},
          "riskCoverage": {},
          "supportingEvidence": [],
          "counterEvidence": [],
          "gaps": []
        }
      ],
      "coverageMatrix": {
        "dimensions": [],
        "cells": []
      },
      "residualRisk": {},
      "waivers": [],
      "participants": [],
      "releaseReadiness": {
        "ready": false,
        "blockingReasons": []
      }
    },
    "availableCommands": []
  }
}
```

### Evidence drill-down

- `GET /api/evidence/{evidenceItemId}`
- `GET /api/assurance-cases/{caseId}/coverage?dimension=jurisdiction`
- `GET /api/assurance-cases/{caseId}/compare?baseline={blueprintVersionId}`

---

## 11. Release Case aggregate

### Endpoint

`GET /api/release-cases/{releaseCaseId}`

### Product question

Should this exact candidate transition into this environment and population now?

### Required sections

- Candidate and change summary
- Business and consumer consequence
- Architecture and dependency impact
- Assurance claims, evidence, and gaps
- Risk, controls, exceptions, and certification
- Operational readiness
- Rollout and rollback policy
- Required participants and decision state
- Decision options allowed for current viewer
- Expiration and invalidation conditions

### Decision preparation endpoint

`GET /api/release-cases/{releaseCaseId}/decision-context`

Returns viewer-specific authority, separation-of-duty check, required evidence, and allowed decisions.

---

## 12. Live Service aggregate

### Endpoint

`GET /api/services/{serviceId}/live?environment=production&window=7d`

### Product question

Is the service meeting its business, quality, reliability, cost, and control commitments, and what requires action?

### Shape

```json
{
  "data": {
    "serviceSummary": {},
    "currentRelease": {},
    "deployments": [],
    "outcomes": [
      {
        "measureKey": "eligible_resolution",
        "state": {},
        "baseline": 0.86,
        "target": 0.94,
        "current": 0.918,
        "trend": [],
        "cohorts": [],
        "attributionConfidence": "medium"
      }
    ],
    "serviceObjectives": [],
    "demandFunnel": {
      "received": 3240,
      "eligible": 2804,
      "resolved": 2574,
      "humanDecisions": 244,
      "transferred": 186,
      "reopened": 72
    },
    "topology": {
      "nodes": [],
      "relationships": [],
      "currentFindings": []
    },
    "authorityUsage": [],
    "failureClusters": [],
    "incidents": [],
    "problems": [],
    "improvements": [],
    "availableCommands": []
  }
}
```

### Trace access

- `GET /api/service-requests/{serviceRequestId}`
- `GET /api/runs/{runId}/trace`
- `GET /api/runs/{runId}/decision-lineage`

Trace content is filtered by viewer entitlement.

---

## 13. Incident aggregate

### Endpoint

`GET /api/incidents/{incidentId}`

### Product question

What is the impact, cause, current mitigation, operating topology, and next accountable decision?

### Shape

```json
{
  "data": {
    "incident": {
      "incidentId": "inc_policy_ca",
      "title": "Stale Canadian refund policy retrieval",
      "state": {},
      "severity": {},
      "commander": {},
      "declaredAt": "2026-08-11T13:50:00Z"
    },
    "businessImpact": {
      "capabilities": [],
      "processes": [],
      "services": [],
      "affectedConsumers": [],
      "financialExposure": {},
      "customerImpact": {},
      "controlExposure": []
    },
    "topology": {},
    "timeline": [],
    "relatedChanges": [],
    "representativeEvidence": [],
    "mitigations": [],
    "restorationConditions": [],
    "followUp": [],
    "decisionContext": {}
  }
}
```

---

## 14. Governance aggregates

### Control coverage

`GET /api/governance/control-coverage?scope={organization|domain|service}`

Returns:

- Policy and control-objective hierarchy
- Preventive, detective, and response controls
- Binding scope
- Current effectiveness
- Evidence freshness
- Affected risks and services
- Gaps, failures, and exceptions

### Authority exposure

`GET /api/governance/authority-exposure`

Returns services and identities by action type, consequence, population, jurisdiction, certification, and current incident restrictions.

### Decision lineage

`GET /api/governance/decisions/{decisionRecordId}`

Returns accountable identity, authority basis, evidence snapshot, conditions, effective period, invalidation rules, and resulting state.

### Exceptions

`GET /api/governance/exceptions?state=active`

Returns scope, policy/control, risk owner, compensating controls, monitoring, expiration, and affected transitions.

---

## 15. Command contract

### Common headers

- `Idempotency-Key`
- `If-Match` with current aggregate version
- Authenticated identity and organization context

### Common request shape

```json
{
  "reason": "Human-readable business reason",
  "scope": {},
  "evidenceRefs": [],
  "conditions": [],
  "clientContext": {
    "originatingProjection": "service-assurance.v1",
    "originatingSubjectId": "asc_019"
  }
}
```

### Common success shape

```json
{
  "data": {
    "commandId": "cmd_01...",
    "accepted": true,
    "resultingState": {},
    "decisionRecordId": "dec_01...",
    "createdWorkItems": [],
    "continuation": {
      "context": "release-case",
      "href": "/api/release-cases/rlc_019"
    }
  }
}
```

---

## 16. Important command examples

### Propose blueprint candidate

`POST /api/services/{serviceId}/commands/propose-blueprint-candidate`

Validates blueprint completeness, classifies material change, opens or updates assurance case, and creates required evidence work.

### Request evidence

`POST /api/assurance-cases/{caseId}/commands/request-evidence`

Identifies claim, requirement, cohort, required producer, due condition, and why the evidence is material.

### Record domain review

`POST /api/assurance-cases/{caseId}/commands/record-domain-review`

Records structured judgment, scope, evaluator qualification, evidence, counter-evidence, and claim effect.

### Submit release case

`POST /api/release-cases/{caseId}/commands/submit`

Validates required participants, evidence snapshot, operational readiness, certification, and separation of duties.

### Record release decision

`POST /api/release-cases/{caseId}/commands/record-decision`

Decision values may include:

- `approve`
- `approve_with_conditions`
- `constrain_scope`
- `request_evidence`
- `reject`
- `withdraw`

### Pause rollout

`POST /api/rollouts/{rolloutId}/commands/pause`

Records trigger, authority, affected stage, active request handling, and continuation condition.

### Apply incident mitigation

`POST /api/incidents/{incidentId}/commands/apply-mitigation`

Specifies service/deployment scope, allowed emergency authority, expected effect, rollback, and monitoring.

### Create regression evidence

`POST /api/runs/{runId}/commands/create-regression-evidence`

Creates a structured scenario proposal linked to failure mode, cohort, release, requirement, and expected behavior. It does not simply copy a chat transcript into a test name.

---

## 17. Command rejection model

### Error envelope

```json
{
  "error": {
    "code": "transition_guard_failed",
    "message": "The release case cannot be approved because required regional-policy evidence is missing.",
    "subject": {
      "type": "release-case",
      "id": "rlc_019"
    },
    "currentState": {},
    "blockingConditions": [
      {
        "code": "evidence_missing",
        "requirementId": "req_policy_jurisdiction",
        "cohort": "CA-trial-cancellation",
        "responsibleRole": "domain-expert"
      }
    ],
    "allowedContinuations": []
  }
}
```

### Error categories

- `not_authorized`
- `decision_right_missing`
- `separation_of_duties_violation`
- `transition_guard_failed`
- `evidence_stale`
- `evidence_missing`
- `decision_expired`
- `scope_exceeds_authority`
- `concurrency_conflict`
- `dependency_unavailable`
- `idempotency_conflict`
- `policy_violation`
- `invalid_contract`

Errors should explain the domain condition and next valid action.

---

## 18. Concurrency and consistency

### Optimistic concurrency

Editable aggregates return an `etag` or `aggregateVersion`. Commands include `If-Match`.

### Decision-time consistency

Before consequential action, the application service revalidates:

- Candidate/version identity
- Evidence snapshot validity
- Authority and delegation
- Approval conditions
- Current policy/control state
- Runtime or incident restrictions

### Eventual consistency

Portfolio and Mission Control projections may update asynchronously. Responses disclose projection freshness.

### Strong consistency

Use strong consistency for:

- Authority checks
- Financial-action idempotency
- Decision recording
- Release transition
- Certification or exception validity
- State-machine guard evaluation

---

## 19. Event contract

### Envelope

```json
{
  "eventId": "evt_01...",
  "eventType": "MaterialChangeDetected",
  "occurredAt": "2026-08-11T14:00:00Z",
  "organizationId": "org_northstar",
  "subject": {
    "type": "blueprint-version",
    "id": "bpr_019"
  },
  "actor": {
    "identityId": "idn_maya",
    "type": "person"
  },
  "correlationId": "chg_019",
  "causationId": "cmd_019",
  "schemaVersion": 1,
  "payload": {}
}
```

### Projection behavior

Domain events update:

- Mission Control responsibility queues
- Portfolio lenses
- Service Studio projections
- Governance coverage and exceptions
- Operations and incident correlations

---

## 20. Authorization evaluation

Each request evaluates:

- Organization and workspace
- Identity and current role assignments
- Service and business-domain scope
- Decision right
- Delegation
- Environment
- Data classification
- Trace-content entitlement
- Purpose of use
- Separation of duties
- Current incident authority

### Query authorization

May redact fields, aggregate sensitive data, or deny entire projections.

### Command authorization

Must validate both technical permission and accountable decision right.

---

## 21. Prototype fixture strategy

The prototype can remain file-backed while modeling enterprise relationships correctly.

### Proposed JSON fixtures

- `business-architecture.json`
  - Domains, capabilities, processes, objectives
- `services.json`
  - Service dossier, ownership, lifecycle, current references
- `outcome-contracts.json`
- `blueprints.json`
  - Versions, components, relationships, failure modes
- `registry.json`
  - Data products, tools, actions, models, evaluators
- `assurance-cases.json`
- `governance.json`
  - Policies, controls, bindings, exceptions, certifications
- `release-cases.json`
- `identity-authority.json`
  - Roles, assignments, delegations, authority envelopes
- `incidents.json`

### Proposed CSV fixtures

- `service-requests.csv`
- `runs.csv`
- `component-executions.csv`
- `slo-observations.csv`
- `outcome-events.csv`
- `control-observations.csv`
- `cost-observations.csv`
- `incident-timeline.csv`

### Server responsibility

The server:

1. Loads and validates files.
2. Normalizes identifiers and references.
3. Builds in-memory indexes.
4. Creates use-case projections.
5. Applies command guards.
6. Appends prototype decision or event records safely.

The UI never fetches raw fixture files.

---

## 22. Prototype API slice

Do not implement the entire model first. Demonstrate a coherent vertical slice.

### Query slice

1. `GET /api/mission-control`
2. `GET /api/portfolio?lens=outcomes`
3. `GET /api/portfolio?lens=architecture`
4. `GET /api/services/svc_customer_escalation/dossier`
5. `GET /api/services/svc_customer_escalation/blueprint?version=bpr_019`
6. `GET /api/services/svc_customer_escalation/assurance?candidate=bpr_019`
7. `GET /api/services/svc_customer_escalation/live?environment=production`
8. `GET /api/incidents/inc_policy_ca`
9. `GET /api/governance/control-coverage?serviceId=svc_customer_escalation`

### Command slice

1. Request missing domain evidence.
2. Record domain review.
3. Submit release case.
4. Record conditional release decision.
5. Pause or constrain rollout during stale-policy incident.
6. Create regression evidence from representative run.

This slice covers the product loop:

```text
Business intent
→ Blueprint
→ Assurance
→ Release decision
→ Live service
→ Incident
→ Regression and improvement
```

---

## 23. Migration from the current API

| Current endpoint | Disposition | Replacement direction |
|---|---|---|
| `GET /api/summary` | Retire | `GET /api/mission-control` and portfolio projections |
| `GET /api/agents` | Transform | Enterprise service inventory within Portfolio |
| `GET /api/agents/:id` | Decompose by use case | Dossier, Blueprint, Assurance, Live Service |
| `GET /api/runs` | Retain as supporting query | Scope by service, release, incident, cohort, and entitlement |
| `GET /api/approvals` | Retire generic list | Responsibility items and full decision contexts |
| `POST /api/approvals/:id/decision` | Replace | Domain-specific decision commands |
| `POST .../regression-test` | Enrich | Create regression evidence linked to failure, requirement, cohort, and release |

The current API remains useful only as a technical proof and should not constrain the new contracts.

---

## 24. Contract review checklist

Before accepting an endpoint:

- Does it answer one clear product question?
- Does it preserve service and decision context?
- Does it include business consequence where relevant?
- Are state dimensions explicit?
- Are relationships typed?
- Are versions and effective scope clear?
- Are evidence and missing evidence represented?
- Is viewer authority reflected?
- Is there a continuation path?
- Can sensitive content be redacted?
- Can the same contract move from files to a database?
- Does it avoid requiring the UI to reconstruct the domain model?

---

## 25. Open API decisions

1. Which projections require real-time composition versus cached read models?
2. Should commands be synchronous through guard evaluation and asynchronous through execution?
3. Which evidence payloads remain inside customer infrastructure?
4. How are external agent runtimes correlated when they lack stable request identifiers?
5. Which query fields require field-level authorization?
6. How are large traces and evaluation artifacts paged and retained?
7. Which domain events must be externally subscribable?
8. What is the versioning and compatibility policy for portal projections?
9. How are cross-region decision and evidence records replicated?
10. When should GraphQL or a graph query interface supplement, but not replace, workflow REST contracts?
