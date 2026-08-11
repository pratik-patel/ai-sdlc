# Delivery Roadmap and Build Gates

## 1. Delivery principle

The product will be delivered as **complete, testable journeys**, not as a sequence of disconnected catalog, builder, testing, and governance screens.

Every increment must let a real persona start from a real outcome or signal, complete a meaningful loop work item, understand what the system did, and leave the Trusted Change Package in a more justified state. No increment is considered complete because its forms or APIs exist.

## 2. Build authorization gate

Interface implementation should begin only after the following planning decisions are accepted:

- The primary implementation entry is **establish working context**: select/infer a repository or service and evaluate its Repository Delivery Profile before offering **Move work forward** commands. Returning active work and non-code product/system-scoped Intent work are explicit fast paths.
- A named, repository-bound **Delivery Harness** composes reusable capabilities and Work Patterns; a ticket resolves it into a task-specific Execution Blueprint before agents execute.
- The durable unit is the versioned **Trusted Change Package**; a Delivery Thread is its active collaboration projection, not an agent chat session.
- The product has three global regions: **Work**, **Exchange**, and **Estate**.
- Conversation, canvas, and source are synchronized authoring modes over one canonical model.
- The four loops are **Intent**, **Implementation**, **Verification**, and **Value Realization**.
- The registry stores immutable, governed capability revisions; a loop work item resolves and pins them into an Execution Blueprint.
- A discovered capability has no execution authority until identity, permission, data, environment, and expiry bindings are resolved.
- Human gates and deterministic policy gates are first-class workflow nodes with explicit decision rights.

If one of these decisions changes, update the relevant contracts before implementing screens.

## 3. Architecture decisions that precede product code

Run these bounded spikes in a disposable technical sandbox. They validate choices; they are not the product UI.

The AI Delivery Steward experience and trust decisions that connect these spikes are defined in `06_PLATFORM_ESTABLISHMENT_JOURNEY.md`. The spikes must produce evidence consumed by that journey rather than becoming separate administrator tools.

### Spike A — Backstage extension boundary

Prove that a normal Backstage application can host custom Work, Exchange, and Estate plugins while reusing authentication, ownership, component context, search, permission checks, and Scaffolder actions.

**Exit evidence**

- A component page can launch a Delivery Thread with repository and owner context.
- The custom backend can call an authorization policy before exposing or invoking an action.
- A deterministic template can provision a repository without becoming the workflow engine.
- Upgrade and plugin-version strategy is documented.

### Spike B — Registry provider compatibility

Evaluate `agentregistry-dev/agentregistry` behind the canonical registry interface.

**Exit evidence**

- Index and resolve Git-backed agent Markdown, a `SKILL.md` package, prompt/instruction, hook definition, MCP definition, test pack, and workflow pattern.
- Demonstrate immutable revision identity, digest, owner, publisher, source, compatibility, and lifecycle.
- Attach promotion evidence and retrieve it in context.
- Record extension, upstream-contribution, replacement, and operational gaps.
- Confirm that the first journey does not require container packaging, Kubernetes deployment, PyPI/npm publication, A2A, or a cloud agent registry.

This spike supplies registry infrastructure evidence to the enterprise-catalog preparation journey; it does not by itself establish the catalog. The catalog also requires taxonomy, classification, trust, evaluation, base/extension curation, promotion, coverage, repository binding, and lifecycle decisions as defined in `11_ENTERPRISE_CAPABILITY_CATALOG_PREPARATION_JOURNEY.md`.

### Spike C — Runtime compiler

Compile one canonical Execution Blueprint into two runtimes, initially Codex plus one contrasting runtime.

**Exit evidence**

- Generated instructions, agents, skills, MCP bindings, hooks, and permissions are inspectable.
- Unsupported semantics fail closed or produce a visible blocking compatibility result.
- Exact input asset revisions and compiler version reproduce the same digest.
- Out-of-band runtime edits can be detected.

### Spike D — MCP identity and authority

Connect to a sandbox Jira/Confluence environment through an MCP gateway or controlled adapter.

**Exit evidence**

- User-delegated read and bounded write paths are distinct.
- A story can be read without granting transition/edit authority.
- Material writes require a mandate or human confirmation.
- Every tool call produces a redacted, queryable receipt.
- Revocation and expired credentials fail safely.

### Spike E — durable agent/human orchestration

Prove pause, resume, retry, timeout, cancellation, callbacks, human approval, and compensation on a multi-step workflow.

**Exit evidence**

- A run survives service restart.
- Approval cannot be forged by the requesting agent.
- Changed requirements mark dependent decisions and evidence stale.
- A failed tool call has a visible recovery path rather than silently restarting the journey.

## 4. Journey increments

### Increment 0 — Experience proof, no production backend

**Question answered:** Can users understand where to start, what will happen, what authority is requested, and what output they will receive?

Create a high-fidelity, data-backed prototype for one small capability journey:

1. Select or infer one repository/service and review its Context Readiness.
2. Establish its Repository Delivery Profile, including governed external Context Product bindings and existing runtime assets.
3. Select a Jira story plus linked quality/support signals and let Intent agents challenge missing behavior or architecture.
4. Run journey/backlog shaping, requirements clarification, architecture and proof-design work items.
5. Approve the intent backlog and contract stack.
6. Accept or extend a named repository Delivery Harness and inspect its Work Patterns, agents, skills, context, tools, hooks, mandates, models, proof systems and planned human decisions.
7. Resolve the task-specific Execution Blueprint and switch the same definition among conversation, nested canvas and source.
8. Approve bounded implementation and respond to one uncertainty-driven human contribution.
9. Review unit, integration and one risk-relevant non-functional proof.
10. Make an evidence-backed UAT/release-readiness decision.
11. Observe one technical and one user/business signal, then review context/harness improvement proposals and the Human Touchpoint Map.

**Gate:** five representative users can narrate the journey, identify the next action, distinguish recommendation from enforcement, and explain the consequence of approve/reject without facilitation.

### Increment 1 — Intent loop vertical slice

**Question answered:** Can an Intent Owner and Architect convert fragmented enterprise signals into an approved, traceable intent backlog and contract stack?

Build:

- Deep link and search entry from Jira plus blank-intent fallback
- Capability Initiative, Trusted Change Package and resumable loop-work state
- Repository, service owner, Confluence, and Backstage context resolution
- Requirement-clause extraction with source citations and change detection
- Conversation-led clarification with structured contract preview
- Acceptance criteria, constraints, non-goals, risk, data classification, and required evidence
- Human approve, request-changes, reject, delegate, and expire actions
- Intent-gate decision ledger

**Durable output:** approved intent backlog, contract-stack revision, Context Product and impact snapshot.

**Not yet:** autonomous code modification.

### Increment 2 — Exchange and governed composition slice

**Question answered:** Can a user discover or create the reusable capabilities needed for this specific intent and understand why each one is present?

Build:

- Contextual pattern recommendation from the Intent Contract
- Exchange search by outcome, compatibility, authority, environment, support, and evidence—not only asset type
- Capability dossier with owner, publisher, revision, provenance, permissions, dependencies, verification, usage, incidents, and lifecycle
- Catalog contribution from repository/package/endpoint plus conversational declaration
- External discovery from sources such as `skills.sh` or Git, with quarantine, validation, sandbox evaluation, internal mirroring, and promotion
- Draft, validate, review, approve, publish, deprecate, revoke, and replace lifecycle
- One canonical orchestration definition rendered as conversation, canvas, and source
- Typed workflow nodes and ports; no arbitrary visual lines
- Agent, skill, tool, rule, hook, mandate, gate, test pack, environment, and model bindings
- Base asset extension, repository-owned overlay, lineage diff, and effective-definition resolution
- Effective-authority preview and compatibility report
- Execution Blueprint resolution with pinned revisions and digest

**Durable output:** approved, reproducible `ExecutionBlueprint` revision.

**Gate:** a reviewer can answer who supplied each capability, what it may do, what enforces its boundaries, and what evidence supports its use.

### Increment 3 — Implementation loop vertical slice

**Question answered:** Can the approved blueprint produce a bounded change while keeping the developer oriented and in control?

Build:

- Isolated worktree/sandbox provisioning
- Planner, implementer, reviewer, and specialist agent orchestration
- Runtime compilation and preflight compatibility check
- Live activity model organized by objective and workflow node, not a raw token transcript
- File/change-set view with requirement-clause lineage
- Tool-call receipts, permission prompts, policy decisions, and hook results
- Pause, resume, cancel, retry, reassign, edit-plan, and rollback-to-checkpoint controls
- Exception inbox with impact, options, recommendation, and decision deadline
- PR creation and story comment as explicit, permissioned actions

**Durable output:** traceable `ChangeSet`, run history, tool receipts, exceptions, and implementation evidence.

**Gate:** no material write occurs outside the effective permission envelope; users can reconstruct why every changed file exists.

### Increment 4 — Verification loop vertical slice

**Question answered:** Can the organization decide whether the change is fit for its intended purpose—not merely whether tests are green?

Build:

- Verification plan generated from requirement claims and risk
- Versioned synthetic, fixture, masked, generated, and approved production-like test-data references
- Unit, integration, contract, security, policy, quality, and agent-behavior evaluations
- Tool-trajectory and outcome evaluation for agent behavior
- Independent verifier role separated from implementer authority where policy requires
- Claim-to-evidence matrix with pass, fail, waived, missing, stale, and not-applicable states
- Failure triage back to intent, blueprint, implementation, environment, test, or test-data cause
- Re-run affected scope after changes
- Human verification gate with approve, request changes, reject, waive-with-expiry, and escalate

**Durable output:** signed `VerificationDossier` and decision ledger.

**Gate:** every acceptance criterion and mandatory control has current evidence or an authorized, time-bound exception.

### Increment 5 — Value Realization loop vertical slice

**Question answered:** Can an approved change move safely into service and improve the reusable system?

Build:

- Environment promotion and deployment integration
- Progressive rollout, health checks, stop conditions, and rollback
- Jira transition/comment, PR merge, release record, and stakeholder notification
- Post-release outcome and SLO observation linked to original intent
- Regression/incident correlation to asset and workflow revisions
- Proposed updates to skills, patterns, tests, hooks, or policy; never silently mutate approved assets
- Promotion workflow for learned improvements
- Reuse and outcome measures by pattern and capability

**Durable output:** `ReleaseRecord`, observations, and governed learning proposals.

**Gate:** the AI Delivery Steward owns the readiness decision independently of agent recommendation; rollback and incident accountability are explicit before promotion.

### Increment 6 — Estate operations

**Question answered:** Can platform, security, and engineering leaders understand and govern the live agent estate without interrupting ordinary delivery work?

Build:

- Deployed-agent and workflow topology
- Ownership, runtime, model, environment, tool, data, and dependency relationships
- Unsupported, deprecated, vulnerable, excessive-authority, and unowned exposure
- Cost, latency, reliability, verification drift, incidents, and business outcomes
- Credential, mandate, exception, and approval expiry queues
- Upgrade/replacement impact analysis
- Kill, quarantine, revoke, rotate, and migrate workflows with decision rights and blast-radius preview

**Durable output:** governed estate actions and auditable remediation threads.

## 5. Initial end-to-end acceptance journeys

### Journey A — Quality demand to trusted value decision

1. An Intent Owner starts from a quality demand and related Jira/support signals.
2. The system creates a Capability Initiative and Trusted Change Package, then resolves governed context.
3. Intent work patterns produce journey, backlog, behavior, architecture, proof and value contracts.
4. The Intent Owner resolves behavioral ambiguity, the Architect accepts architecture constraints, and together they approve executable intent.
5. The portal recommends a repository-compatible four-loop Work Pattern.
6. The AI Delivery Steward inspects and adjusts it through conversation or canvas; source updates simultaneously.
7. The Steward supervises agents implementing a bounded slice and producing unit/component proof.
8. The Steward invokes independent verification agents and deterministic tools that map integration, system and non-functional evidence to each claim.
9. The Steward declares UAT/release readiness or returns failed proof to the responsible decision.
10. Production and adoption signals support a scale, revise, rollback, pause or retire value decision.

### Journey B — Create and publish a specialist agent

1. An AI Delivery Steward chooses **Contribute capability** from the Exchange or asks for a missing capability while composing a loop work item.
2. Conversation captures purpose, inputs, outputs, boundaries, tools, skills, model/runtime compatibility, owner, and support tier.
3. Source/package/endpoint provenance is attached.
4. The system generates an editable canonical manifest and a test/evaluation requirement.
5. Validation checks schema, security, permissions, provenance, compatibility, and behavior.
6. Reviewers compare revision changes and evidence.
7. Approval publishes an immutable revision; the catalog projection becomes discoverable.
8. Usage remains opt-in and policy-bound; publishing does not grant runtime authority.

### Journey C — Import and govern an existing repository asset

1. A repository scan detects agent instructions, skills, hooks, MCP configuration, or custom-agent files.
2. The portal proposes normalized assets and identifies runtime-specific or unsupported semantics.
3. An owner accepts, splits, maps, or rejects each proposal.
4. Required evidence and missing metadata become a promotion checklist.
5. Approved revisions are published without overwriting the repository source.
6. Drift detection compares later source changes with cataloged revisions.

### Journey D — Extend a base capability for a repository

1. A team selects an approved base Requirements Agent, Implementation Agent, standard, or workflow pattern.
2. The workbench explains inherited behavior and declared extension points.
3. The team adds repository knowledge, commands, tests, bindings, or stricter controls without copying the base.
4. Resolution detects contract conflicts, unsupported runtime behavior, and any attempted authority expansion.
5. The repository extension is reviewed and stored in Git with its pinned base revision.
6. Execution uses the fully resolved definition and records its lineage.
7. A later base update produces an impact-aware upgrade proposal rather than silently changing the repository.

### Journey E — Production incident changes a shared pattern

1. An incident is linked to the Trusted Change Packages and asset revisions involved.
2. The system proposes affected claims, patterns, skills, hooks, rules, and test packs.
3. Owners reproduce and verify the failure.
4. A revised reusable asset travels through normal validation and approval.
5. Estate impact shows consumers that should upgrade.
6. Migration creates loop work items and package revisions rather than silently changing active workflows.

## 6. Feature traceability by product region

| User need | Entry point | Experience region | Primary output |
|---|---|---|---|
| Define an outcome or start from a signal | Work front door, deep link, search, CLI/IDE | Work | Capability Initiative and Trusted Change Package |
| Run journey, backlog, knowledge, architecture or proof design | Intent loop work catalog | Work / Intent | Approved intent backlog and contract stack |
| Find an approved agent, skill, tool, or pattern | Contextual recommendation or Exchange search | Exchange | Selected asset revision |
| Build or modify an agent/workflow | Loop-work composition or Contribute capability | Work + contextual Exchange | Canonical definition/revision |
| Understand what an agent may do | Capability dossier or authority preview | Exchange / Work | Effective permission envelope |
| Orchestrate implementation | Approved Execution Blueprint | Work / Implementation | ChangeSet and execution evidence |
| Test behavior and implementation | Verification plan | Work / Verification | Verification Dossier |
| Approve, reject, waive, or escalate | Contextual gate card and decision inbox | Work | Decision record |
| Release, observe and decide value | Approved verification gate | Work / Value Realization | Release, observation and value-decision records |
| Govern deployed agents and dependencies | Ownership/dependency links or risk queue | Estate | Remediation loop work item |

## 7. Screen and interaction readiness checklist

A screen or component may enter implementation only when its contract identifies:

1. The user intent and arrival trigger
2. Required and optional inputs, including source and freshness
3. Transformation or decision performed
4. Agents, skills, tools, and deterministic services involved
5. Effective identity, authority, policy, and data boundary
6. Primary output and where it persists
7. Next valid states and return path
8. Loading, empty, partial, stale, conflict, revoked, and failure behavior
9. Human decision rights and separation-of-duty rules
10. Audit/evidence produced
11. Accessibility and keyboard behavior
12. Success and misuse measures

A grid of records is not a workflow. A chat transcript is not an audit trail. A canvas is not executable until its nodes, ports, bindings, states, and failure paths validate against the canonical model.

## 8. Suggested new project structure

The implementation should live in a separate repository after the blueprint gate, with an architecture that preserves product boundaries:

```text
agent-developer-control-plane/
├── apps/
│   ├── portal/                 # Backstage app and custom experience shell
│   └── worker-console/         # Optional restricted operations surface
├── plugins/
│   ├── work/
│   ├── exchange/
│   └── estate/
├── services/
│   ├── delivery-thread/
│   ├── orchestration/
│   ├── evidence/
│   ├── registry-facade/
│   ├── policy-authority/
│   └── integration-gateway/
├── adapters/
│   ├── registry/
│   ├── runtime/
│   ├── mcp/
│   ├── a2a/
│   ├── atlassian/
│   └── scm/
├── packages/
│   ├── canonical-model/
│   ├── workflow-schema/
│   ├── design-system/
│   └── authorization-sdk/
├── policies/
├── examples/
│   └── eng-4521-story-journey/
├── tests/
│   ├── contract/
│   ├── journey/
│   ├── policy/
│   └── accessibility/
└── docs/
    ├── decisions/
    ├── threat-models/
    └── operating-model/
```

This is a boundary proposal, not permission to scaffold the repository yet.

## 9. Prioritized product backlog

### Must prove before MVP

- Capability Initiative, versioned Trusted Change Package and source lineage
- Four-loop work catalog and Work Pattern contract
- Governed Context Product construction
- Jira/Confluence/repository/Backstage context intake
- Intent Contract and intent approval gate
- Canonical catalog and immutable capability revisions
- Agent/workflow construction through synchronized conversation, canvas, and source
- Asset resolution, compatibility, authority, and runtime compilation
- Isolated execution and human intervention
- Claim-based verification, versioned test data, and evidence dossier
- Approve/reject/request-changes/waive/escalate decisions
- PR and Jira output with receipts
- Security, audit, accessibility, and failure recovery

### Next after the first full journey

- Additional coding runtimes and registry providers
- A2A delegation
- Value Realization automation and learning proposals
- Estate topology and remediation
- Pattern recommendation and comparative outcome intelligence
- Organization-specific templates, policy packs, and operating models

### Explicitly defer

- A broad marketplace before governance and evidence work
- Dozens of connectors before Jira, Confluence, SCM, Backstage, and one observability path are trustworthy
- Free-form no-code automation unrelated to software-delivery use cases
- Autonomous production release without explicit organizational mandate
- Novel repository hosting, CI/CD, ticketing, secrets, or identity systems
- Forks of Backstage or the open-source registry before architecture spikes justify them

## 10. Cross-cutting quality gates

| Gate | Minimum evidence |
|---|---|
| Product coherence | Journey traceability, screen contracts, usability comprehension |
| Architecture | ADRs, compatibility spikes, failure/recovery proof, migration strategy |
| Security | Threat model, least privilege, delegated identity, secret isolation, supply-chain provenance |
| Privacy | Data classification, minimization, retention, residency, redaction, deletion behavior |
| Safety and policy | Enforceable mandates, hook coverage, deterministic gates, exception expiry |
| Reliability | Idempotency, resume/retry, timeouts, compensation, dependency degradation |
| Verification | Claim coverage, test-data provenance, independent checks, stale-evidence detection |
| Accessibility | WCAG-targeted keyboard, focus, semantics, contrast, nonvisual canvas alternative |
| Operations | Ownership, SLOs, telemetry, cost controls, incident and rollback runbooks |
| Adoption | Time to first approved intent, time to trusted change, reuse and intervention quality |

## 11. Decision register

| Decision | Current position | Revisit trigger |
|---|---|---|
| Portal foundation | Backstage application plus plugins | Core requirements cannot be met through supported extensions |
| Registry | Provider abstraction; spike open-source Agent Registry | Compatibility and enterprise-gap evidence complete |
| Google Agent Registry | Optional provider and conceptual influence | Customer environment requires managed Google inventory |
| Workflow engine | Durable, resumable engine | Scale and operating requirements select a specific implementation |
| Primary UI metaphor | Capability Workbench over a Trusted Change Package, not catalog/dashboard/chat | Journey testing disproves comprehension |
| Authoring modes | Conversation + canvas + source, one model | A mode cannot preserve semantic parity |
| Runtime strategy | Canonical model plus compilers | Runtime enforcement gaps require narrower support |
| Integration strategy | Controlled gateway/adapters; MCP where suitable | Tool lacks safe identity, authority, or audit support |

## 12. Definition of MVP complete

MVP is complete when an Intent Owner and Architect can approve executable intent and an AI Delivery Steward can move one representative capability slice through implementation, verification and an initial value decision without leaving the Capability Workbench to assemble hidden configuration:

- build a governed Context Product and obtain a cited, approved intent backlog and contract stack;
- select or adapt a governed delivery pattern;
- see and edit the complete orchestration through conversation, canvas, or source;
- understand every agent, skill, tool, hook, rule, mandate, test, permission, and human gate involved;
- execute a bounded implementation in isolation;
- intervene in failures and approvals;
- produce a pull request and claim-based Verification Dossier;
- approve or reject through explicit decision rights; and
- preserve full source-to-change-to-evidence lineage;
- make an evidence-backed UAT/release-readiness decision; and
- observe technical plus user/business signals sufficient for an initial value decision.

That journey—not the number of catalog entries, connectors, dashboards, or CRUD screens—is the MVP measure.
