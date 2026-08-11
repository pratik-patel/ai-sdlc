# Replit Master Build Prompt — AI Delivery Workbench Prototype

> Copy this entire document into Replit Agent. Treat it as the product, experience, workflow, data, API, and implementation specification for the prototype.

## 0. Your assignment

You are a principal product designer, enterprise architect, workflow strategist, and senior full-stack React engineer. Build a high-fidelity, data-backed prototype of an **Enterprise AI Delivery Workbench** covering the 15 primary user journeys in this specification.

The result must feel like a coherent enterprise product built around work progression, agent orchestration, human judgment, evidence, and learning. It must not look like:

- a collection of CRUD screens;
- an admin template with many menu items;
- an agent-card marketplace;
- a chatbot with a dashboard attached;
- a generic drag-and-drop automation canvas;
- 15 disconnected page mockups; or
- a set of forms that stop after saving data.

Build working prototype interactions backed by REST API calls and seeded JSON data. Simulate agent/runtime activity; do not attempt to execute real Claude Code, Kiro, Cursor, Codex, OpenCode, MCP, Jira, or cloud operations. All simulated actions must use the same contracts that a real integration could later implement.

Work iteratively. Keep the application runnable after every increment. Reuse components, state machines, API contracts, fixtures, and interaction patterns. Do not duplicate an entire page for each journey.

### Mandatory collaboration and stopping rule

Do **not** implement all journeys continuously. Work in one explicitly reviewable slice at a time:

1. Implement the shared visual foundation first.
2. Demonstrate it, summarize the design decisions, and stop for user review.
3. After foundation approval, implement only one primary user journey at a time in the sequence defined later in this document.
4. At the end of that journey, run it, visually inspect it, present the exact demo path and screenshots, summarize what changed, identify any design questions, and stop.
5. Do not start, scaffold, or partially generate the next journey until the user explicitly approves the current journey or says `continue`.
6. Incorporate feedback into the shared components and design system before continuing. Recheck previously approved journeys if shared behavior changes.

Silence is not approval. A passing test is not visual approval. A route that renders is not journey approval. Preserve the working application while waiting for feedback.

Treat perceived product quality as a first-class acceptance criterion. Prototype backend behavior may be simulated, but the interface, interaction, copy, transitions, information hierarchy, and collaboration experience must feel considered and production-caliber.

## 1. Product thesis

The product is an enterprise AI-SDLC control plane that moves work through four connected loops:

```text
Intent → Implementation → Verification → Value Realization
```

It coordinates:

- enterprise and repository context;
- AI agents and delegated subagents;
- skills, instructions, output contracts, and templates;
- MCP integrations and provider adapters;
- hooks, rules, mandates, permissions, and human gates;
- Claude Code, Kiro, Cursor, Codex, OpenCode, and future runtime projections;
- code changes, tests, evidence, releases, incidents, and business outcomes; and
- notifications, human contributions, decisions, audit, and learning.

The durable unit of change is a **Trusted Change Package**. It carries source context, accepted intent, selected Delivery Harness, execution trajectory, changes, evidence, decisions, release state, observations, and learning across all four loops.

## 2. Primary actors

Do not create many navigation roles. Use three experience actors:

| Actor | Responsibilities |
|---|---|
| Intent Owner | defines business intent, behavior, journey, UX expectations, backlog, acceptance, and value signals |
| Architect | defines architecture, integration, data, non-functional constraints, change boundaries, and proof direction |
| AI Delivery Steward | prepares the platform and catalog, configures agents and harnesses, implements, verifies, supervises autonomy, releases bounded changes, and improves reusable assets |

Specialist security, testing, performance, accessibility, platform, and operations capabilities are delivered by agents, skills, tools, hooks, rules, and evidence packs under these actors. They are not separate default personas.

Seed users:

- Maya Chen — AI Delivery Steward
- Priya Rao — Architect
- Daniel Brooks — Intent Owner

## 3. The 15 primary user journeys

| ID | Journey |
|---|---|
| J01 | Establish the AI-SDLC platform |
| J02 | Prepare the enterprise capability catalog |
| J03 | Build or connect a Context Product |
| J04 | Activate a repository |
| J05 | Discover, compare, and reuse a capability |
| J06 | Create, import, test, and promote a capability |
| J07 | Compose, test, and publish a Delivery Harness |
| J08 | Start or resume repository work |
| J09 | Qualify and approve Intent |
| J10 | Implement a bounded change |
| J11 | Verify fitness and evidence |
| J12 | Release, realize value, and close or continue |
| J13 | Respond to an incident or corrective signal |
| J14 | Review touchpoints and improve context/harness automation |
| J15 | Govern capability and runtime estate lifecycle |

Human decisions, contribution requests, exceptions, permissions, notifications, approvals, audit, timeline, pause/resume, and takeover are **shared workflows embedded across all 15 journeys**. Do not build them as a separate Approvals application.

## 4. Global experience architecture

Use only three global destinations:

1. **Work** — select/resume a working context, establish repository readiness, select work and a Delivery Harness, execute four-loop work, and respond to decisions.
2. **Exchange** — prepare the enterprise catalog; discover, compare, create, import, evaluate, promote, extend, deprecate, and provision reusable capabilities.
3. **Estate** — govern platform foundation, deployed/runtime state, ownership, authority, drift, reliability, cost, vulnerabilities, and lifecycle.

Do not add global navigation for Agents, Skills, MCP, Hooks, Rules, Workflows, Tests, Runs, Approvals, Models, or Settings. Those concepts appear contextually inside Work, Exchange, Estate, the repository, the capability dossier, the Delivery Harness, or the active decision.

### 4.1 Context before command

The primary implementation entry is:

```text
Select or infer repository/service
→ establish or verify repository context
→ select Jira/other work item
→ challenge and qualify intent
→ select, extend, or create Delivery Harness
→ review task Execution Blueprint
→ run four-loop journey
```

A returning user can resume active work immediately. A Jira/GitHub/Backstage/IDE deep link can infer repository and ticket. Non-code Intent work may begin from a product, service, system, or Context Product.

### 4.2 Stable product shell

Use this shell across the product:

```text
┌──────────────────────────────────────────────────────────────────────┐
│ Product · Work / Exchange / Estate · global search · notifications │
├──────────────────────────────────────────────────────────────────────┤
│ Context header: repository / package / capability / estate scope   │
│ Status · owner · current decision · runtime · environment           │
├──────────────────────────────────────────────────────────────────────┤
│ Journey spine or current workflow stage                             │
├──────────────────────────────┬──────────────────────┬────────────────┤
│ Active collaboration         │ Living work model    │ Timeline       │
│ chat/run/decision/compare    │ contract/graph/diff  │ humans/agents  │
│                              │ evidence/topology    │ notifications  │
├──────────────────────────────┴──────────────────────┴────────────────┤
│ Next-best action · gaps · execution status · continuation           │
└──────────────────────────────────────────────────────────────────────┘
```

The three content regions may resize or collapse based on the journey. Do not fill every region with cards. Lead with the current decision or active work.

## 5. Experience principles

1. **Work, not modules.** Every screen must answer what the user is trying to accomplish, what has happened, what is required now, and what will happen next.
2. **One model, three authoring modes.** Conversation, visual composition, and source/manifest edit the same canonical state.
3. **Chat materializes structure.** A chat instruction produces visible changes to contracts, graphs, manifests, decisions, or plans. Never hide important state only in chat history.
4. **Agents are visible actors.** Show which agent was selected, why, its revision, tools, skills, context, model, permissions, objective, status, outputs, and parent delegation.
5. **Human judgment is causal.** Every contribution or decision shows trigger, evidence, options, consequences, owner, response, and downstream state change.
6. **Timeline explains movement.** Humans, agents, tools, hooks, gates, notifications, artifacts, and state transitions appear in one readable event stream.
7. **Audit is immutable.** Every material action creates a separate audit record with actor, source, before/after, authority, timestamp, and correlation IDs.
8. **Capability is not authority.** A connected tool is not usable until identity and permission are resolved.
9. **Evidence advances work.** Agent confidence does not pass a gate; claims require evidence or an explicit authorized exception.
10. **Failure has a return path.** Every blocked, rejected, stale, failed, denied, or incompatible state shows consequence and recovery.
11. **No blank canvas first.** Builders begin from outcome, repository, risk, and a base pattern, then reveal detail progressively.
12. **No dashboard soup.** Use spatial hierarchy, timelines, graphs, matrices, semantic diffs, and decision briefings only when they help the current task.
13. **Progressive disclosure over simultaneous visibility.** Show what is necessary for the current decision; keep supporting evidence one interaction away and technical depth in inspectors or drawers.
14. **Continuity over navigation.** Preserve context and let the workspace transform as work advances. Avoid bouncing the user between unrelated pages.
15. **Calm confidence over visual novelty.** Make state, causality, ownership, and next action obvious without relying on decorative cards, color, or animation.

## 6. Recommended technical stack

Build a single Replit full-stack TypeScript project:

- React 19 or current stable React
- TypeScript
- Vite
- React Router
- TanStack Query for REST data fetching and mutations
- Zustand or a small equivalent store only for local UI state
- Node.js + Express REST API
- Zod for shared schemas and API validation
- Tailwind CSS or CSS modules with a small design-token layer
- React Flow only for semantic orchestration/topology views
- Recharts only where charts materially help
- Lucide icons
- Vitest + React Testing Library
- Playwright for the golden end-to-end journey

Use accessible native controls and semantic HTML. Support keyboard navigation, focus states, reduced motion, adequate contrast, and a usable 1280px desktop layout. Provide a reasonable tablet layout; mobile optimization is secondary for this enterprise prototype.

### 6.1 Suggested project structure

```text
src/
  app/
  components/
    shell/
    chat/
    workflow/
    decisions/
    timeline/
    evidence/
    capabilities/
    context/
    runtime/
  features/
    platform/
    catalog/
    context-products/
    repositories/
    capabilities/
    harnesses/
    work/
    intent/
    implementation/
    verification/
    value/
    incidents/
    learning/
    estate/
  routes/
  api/
  schemas/
  fixtures/
  styles/
server/
  index.ts
  routes/
  services/
  simulations/
  store/
shared/
  schemas.ts
  api-contracts.ts
data/
  seed/*.json
```

## 7. Prototype backend and REST behavior

Use seeded JSON files as initial data, loaded by the Express server into an in-memory state store. All UI data must be obtained through REST calls; do not import fixture JSON directly into React components.

Provide `POST /api/reset` to restore the seed state.

For async agent and runtime simulation:

- mutations start a run or action;
- the server creates staged events over time;
- the client polls run/event endpoints every 1–2 seconds;
- every stage updates domain state, timeline, notifications when appropriate, and audit;
- provide deterministic scenarios so demos are repeatable;
- provide a “Complete next simulated step” developer control when deterministic manual progression is useful.

Do not persist sensitive values. Credentials are represented as references and status only.

### 7.1 Core REST resources

Implement these resource families. Exact route organization may vary, but preserve the semantics.

```text
GET  /api/session
GET  /api/navigation-summary
GET  /api/notifications
POST /api/notifications/:id/read

GET/POST/PATCH /api/platform-blueprints
POST /api/platform-blueprints/:id/validate
POST /api/platform-blueprints/:id/publish

GET/POST/PATCH /api/catalog-releases
GET/POST/PATCH /api/capabilities
POST /api/capabilities/:id/import
POST /api/capabilities/:id/evaluate
POST /api/capabilities/:id/promote
POST /api/capabilities/:id/extend
POST /api/capabilities/:id/deprecate
POST /api/capabilities/:id/revoke

GET/POST/PATCH /api/context-products
POST /api/context-products/:id/connect-provider
POST /api/context-products/:id/test-retrieval
POST /api/context-products/:id/publish

GET/POST/PATCH /api/repositories
POST /api/repositories/:id/discover
POST /api/repositories/:id/assess-readiness
POST /api/repositories/:id/activate

GET/POST/PATCH /api/delivery-harnesses
POST /api/delivery-harnesses/:id/simulate
POST /api/delivery-harnesses/:id/compile
POST /api/delivery-harnesses/:id/publish

GET/POST/PATCH /api/change-packages
POST /api/change-packages/:id/qualify-intent
POST /api/change-packages/:id/start-implementation
POST /api/change-packages/:id/start-verification
POST /api/change-packages/:id/prepare-release
POST /api/change-packages/:id/observe

GET /api/runs
GET /api/runs/:id
GET /api/runs/:id/events
POST /api/runs/:id/pause
POST /api/runs/:id/resume
POST /api/runs/:id/cancel
POST /api/runs/:id/advance

GET/POST /api/decisions
POST /api/decisions/:id/respond
GET/POST /api/contributions
POST /api/contributions/:id/respond

GET /api/timeline
GET /api/audit-events
GET /api/evidence
GET /api/runtime-adapters
POST /api/runtime-adapters/:id/check-compatibility

GET/POST/PATCH /api/incidents
POST /api/incidents/:id/contain
POST /api/incidents/:id/open-corrective-package

GET /api/touchpoint-analytics
POST /api/improvement-proposals
POST /api/improvement-proposals/:id/simulate
POST /api/improvement-proposals/:id/promote

GET /api/estate/topology
GET /api/estate/findings
POST /api/estate/findings/:id/remediate
```

### 7.2 Mutation response contract

All meaningful mutations return:

```ts
type ActionResult = {
  actionId: string;
  status: "accepted" | "requires_decision" | "blocked" | "completed";
  message: string;
  affectedResourceRefs: string[];
  timelineEventIds: string[];
  auditEventIds: string[];
  notificationIds?: string[];
  nextAction?: {
    label: string;
    route: string;
  };
};
```

## 8. Canonical prototype data model

Use shared Zod schemas and TypeScript types for at least:

```text
Actor
Organization
PlatformBlueprint
CatalogCharter
CatalogRelease
CapabilityAsset
CapabilityRevision
CapabilityExtension
CapabilityEvaluationDossier
ContextProduct
KnowledgeBaseReference
RetrievalPolicy
ContextPack
Repository
RepositoryDeliveryProfile
ContextReadinessDimension
WorkflowFragment
WorkPattern
DeliveryHarness
ExecutionBlueprint
TrustedChangePackage
IntentContract
RequirementClause
AgentDefinition
AgentRun
ToolBinding
ToolCallReceipt
HookExecution
RuleOrMandate
ModelProfile
EnvironmentProfile
HumanContribution
HumanDecision
Notification
TimelineEvent
AuditEvent
ChangeSet
EvidenceClaim
EvidenceItem
VerificationDossier
ReleaseRecord
Observation
Incident
ImprovementProposal
EstateFinding
RuntimeAdapter
RuntimeProjection
```

### 8.1 Shared status models

Use explicit state machines rather than arbitrary status strings.

```ts
type ReadinessStatus = "ready" | "partial" | "stale" | "blocked" | "not_applicable";

type CapabilityLifecycle =
  | "discovered"
  | "quarantined"
  | "draft"
  | "evaluating"
  | "sandbox_approved"
  | "team_approved"
  | "enterprise_approved"
  | "restricted"
  | "deprecated"
  | "revoked"
  | "retired";

type RunStatus =
  | "planned"
  | "running"
  | "waiting_for_human"
  | "paused"
  | "blocked"
  | "failed"
  | "cancelled"
  | "completed";

type DecisionStatus = "pending" | "approved" | "rejected" | "changes_requested" | "constrained" | "deferred" | "expired";

type RuntimeSemanticStatus = "native" | "degraded" | "emulated" | "unsupported" | "blocked";
```

### 8.2 Timeline and audit are different

`TimelineEvent` is user-readable and causal:

```ts
type TimelineEvent = {
  id: string;
  correlationId: string;
  timestamp: string;
  actorType: "human" | "agent" | "tool" | "hook" | "system";
  actorRef: string;
  eventType: string;
  title: string;
  summary: string;
  journeyId: string;
  loop?: "intent" | "implementation" | "verification" | "value";
  resourceRefs: string[];
  consequence?: string;
  status: "info" | "success" | "warning" | "failure" | "decision";
};
```

`AuditEvent` is immutable and precise:

```ts
type AuditEvent = {
  id: string;
  correlationId: string;
  timestamp: string;
  subjectRef: string;
  action: string;
  actorRef: string;
  authorityRef?: string;
  source: "ui" | "agent" | "api" | "tool" | "hook" | "policy" | "simulation";
  beforeDigest?: string;
  afterDigest?: string;
  inputRefs: string[];
  outputRefs: string[];
  decisionRef?: string;
  result: "allowed" | "denied" | "completed" | "failed";
};
```

## 9. Cross-runtime execution abstraction

Prototype these runtime adapters:

- Claude Code
- Kiro
- Cursor
- Codex
- OpenCode

Do not invoke the actual products. Represent each runtime through a descriptor:

```ts
type RuntimeAdapter = {
  id: string;
  displayName: string;
  testedVersion: string;
  supportTier: 1 | 2;
  capabilities: {
    instructions: boolean;
    skills: boolean;
    customAgents: boolean;
    subagents: boolean;
    hooks: boolean;
    mcp: boolean;
    permissions: boolean;
    worktreeIsolation: boolean;
  };
  targets: {
    instructions?: string[];
    skills?: string[];
    agents?: string[];
    hooks?: string[];
    mcp?: string[];
  };
};
```

The runtime compiler experience must show:

- canonical capability source;
- generated native files/configuration;
- semantic source map;
- native, degraded, emulated, unsupported, or blocked features;
- runtime/tested version;
- effective tools and permissions;
- generated lockfile and digest; and
- drift between canonical and repository/runtime projections.

Seed example target mappings such as `CLAUDE.md`, `.claude/skills`, `.claude/agents`, `.mcp.json`, `AGENTS.md`, `.agents/skills`, `.kiro/steering`, `.kiro/agents`, `.github/copilot-instructions.md`, `.github/agents`, `.github/hooks`, `.cursor/rules`, and OpenCode agent/skill configuration. Clearly label these as simulated projections.

## 10. Shared workflow primitives

Build these once and reuse them everywhere.

### 10.1 Conversational work composer

Components:

- message stream with human and agent identity;
- context/source chips with provenance;
- suggested material questions;
- structured-change preview;
- accept/reject/edit proposed change;
- input supporting text, URL paste, attachments as simulated metadata, and slash-style actions;
- “What changed?” explanation after every accepted proposal.

Chat must update a living contract, manifest, graph, plan, or decision. It is never only a transcript.

### 10.2 Agent activity and delegation

Show:

- planned agent roster before execution;
- active agent tree during execution;
- parent/child delegation;
- agent revision, objective, context pack, skills, tools, model, permissions, and budget;
- waiting, stopped, failed, retried, completed, and handed-off states;
- planned versus actual trajectory; and
- produced artifacts and evidence.

### 10.3 Human contribution and decision

Trigger classes:

- mandatory control;
- planned risk decision;
- intent ambiguity;
- architecture/UX conflict;
- agent uncertainty;
- permission escalation;
- proof failure/dispute;
- runtime failure; and
- user intervention.

Decision card must show:

- exact proposition/question;
- why continuation is unsafe or impossible;
- initiating agent/workflow node;
- source evidence and conflicting claims;
- options and consequences;
- recommendation and uncertainty;
- accountable actor;
- due/expiry; and
- actions: Approve, Reject, Request changes, Constrain, Defer, or Take over when applicable.

Responding must update domain state, resume/redirect the run, create timeline and audit records, and notify the requester/affected user.

### 10.4 Notifications

Use an inbox/popover for attention, not a generic activity feed. Notification types:

- contribution requested;
- decision required;
- agent/harness/capability created;
- evaluation complete;
- approval or rejection received;
- run blocked/failed/completed;
- context stale;
- capability vulnerable/revoked/deprecated;
- runtime projection drift;
- release or outcome deviation.

Every notification deep-links to the exact decision, artifact, run node, or remediation thread. Marking read does not complete the underlying task.

### 10.5 Timeline

Provide filtering by Humans, Agents, Tools, Hooks, Decisions, Evidence, and System. Use a compact causal timeline. Expand an event to show source, output, consequence, correlation, and linked audit record.

### 10.6 Audit viewer

Audit is available contextually from a resource or timeline event. Show immutable event rows with correlation, actor, authority, before/after digest, inputs, outputs, and result. Do not allow editing or deleting audit events.

### 10.7 Evidence and gates

Represent requirements/risks as claims and map evidence to them. Evidence states:

- passed;
- failed;
- missing;
- stale;
- disputed;
- waived with expiry; and
- not applicable with rationale.

A gate transition must cite its evidence or decision.

### 10.8 Capability selection and extension

Contextual selection must compare fit, compatibility, authority, provenance, owner, support, evidence, incidents, cost, and extension lineage. Actions: Use as-is, Extend for repository, Propose base revision, Request access, or Create missing capability.

### 10.9 Async simulation

Provide scenario-driven simulated agents and tools. Each scenario contains ordered steps, optional branching decision, generated events, and final outputs. Never use random failures in the primary demo.

### 10.10 Failure and recovery

Shared actions: retry affected node, change input/context, change capability/model/runtime, request contribution, request exception, pause, resume, cancel, take over, or return to the responsible loop decision.

## 11. Reusable visual components

Build a shared component system including:

- `ProductShell`
- `ContextHeader`
- `JourneySpine`
- `NextBestAction`
- `WorkContextPicker`
- `ContextReadinessPanel`
- `ConversationComposer`
- `StructuredChangePreview`
- `LivingContract`
- `SourceProvenanceChip`
- `SemanticDiff`
- `CapabilityComparisonField`
- `CapabilityDossier`
- `ExtensionLineage`
- `NestedWorkflowCanvas`
- `WorkflowNodeInspector`
- `AgentRoster`
- `AgentRunTree`
- `RuntimeCompatibilityPanel`
- `GeneratedProjectionPreview`
- `PermissionEnvelope`
- `HumanDecisionCard`
- `ContributionRequest`
- `NotificationCenter`
- `CausalTimeline`
- `AuditDrawer`
- `ClaimEvidenceMatrix`
- `EvidenceDossier`
- `ReleaseReadinessBriefing`
- `TouchpointOverlay`
- `EstateTopology`
- `FindingRemediationPanel`
- `EmptyStateWithRealBeginning`
- `FailureRecoveryPanel`

Every component must accept typed data; do not hard-code its content inside JSX.

## 12. Visual design direction

Create a calm, high-information enterprise interface.

- Light neutral background with strong ink hierarchy
- Deep navy for structure, teal for verified/context, orange for implementation, green for verification, violet for value, red only for material failure/risk
- One readable sans-serif family and one optional restrained display face
- Dense but breathable spacing
- Thin dividers and grouped fields instead of excessive floating cards
- Semantic badges used sparingly
- Graph nodes shaped by type, not color alone
- Timeline and decision states readable without animation
- Avoid neon gradients, glassmorphism, giant metric tiles, and decorative charts
- Use responsive split panes and drawers rather than full-page detours

Each page should have one dominant task. The user should know the current context, current state, and next action within five seconds.

### 12.1 Product-quality UI standard

The prototype should be compelling before the reviewer understands its implementation. This does not mean adding decoration. It means making the workflow feel obvious, trustworthy, collaborative, and unusually well resolved.

Apply these composition rules:

- Keep global navigation to Work, Exchange, and Estate. Do not expose the underlying object model as a menu.
- Give each state one visual center of gravity: the current decision, active workflow, living contract, comparison, evidence briefing, or remediation—not all of them at equal weight.
- Present one primary action per state. Place secondary actions contextually; move infrequent actions into a restrained overflow or inspector.
- Do not show all three shell regions at full density by default. Expand the region that supports the current task and collapse supporting regions to summaries, rails, drawers, or overlays.
- Use progressive disclosure in three levels: immediate decision, supporting explanation/evidence, then implementation detail.
- Prefer a well-composed working surface over rows of cards. Cards are for meaningful bounded objects or decisions, not generic containers around every label.
- Avoid walls of tables. Use tables only for true comparison or repeated records; use timelines for causality, graphs for dependency, semantic diffs for change, and briefings for decisions.
- Keep the active context anchored while chat, agents, decisions, evidence, and outputs change around it.
- Make human and agent collaboration spatially legible without turning the interface into a chat transcript. A user should see what an agent proposed, what structure changed, who must respond, and what resumes afterward.
- Let chat feel like direct manipulation through language: highlight the structured fields or workflow nodes changed by an accepted message and provide undo/revise behavior.
- Use motion only to explain state transition, delegation, panel continuity, or new attention. Respect reduced motion and avoid ambient animation.
- Use concise, domain-specific product copy. Replace generic labels such as Submit, Process, Item, and Manage with causal actions such as Approve intent, Run proof, Constrain permission, or Publish harness.
- Design empty, loading, partial, waiting, failed, denied, stale, and completed states with the same care as the happy path.

### 12.2 Anti-clutter test

Before presenting any screen, ask:

1. What is the single question the user is resolving here?
2. What must be visible to answer it safely?
3. What can remain summarized until requested?
4. Is the next action unmistakable?
5. Can the user see what humans and agents have changed without reading a long transcript?
6. Does every chart, card, badge, panel, and line of metadata earn its space?
7. Would removing an element make the decision harder? If not, remove or defer it.

Never solve uncertainty by adding another permanent panel, menu, dashboard tile, tab set, or standalone CRUD page.

### 12.3 Visual coherence across journeys

Do not design 15 different products. Establish a small visual grammar during the foundation review and reuse it:

- stable context header and journey spine;
- consistent human, agent, tool, evidence, and system actor language;
- consistent decision, waiting, risk, completion, and recovery states;
- shared spacing, typography, elevation, icon, border, and motion tokens;
- the same timeline and audit causality patterns;
- the same transition from conversation to structured change; and
- the same return-to-origin behavior after a contextual detour.

Each journey may have a different dominant representation, but it must still feel like the same workbench.

## 13. Seed scenario and shared fixtures

Use one connected golden scenario across the entire prototype:

- Organization: Northstar Financial
- Team: Payments Platform
- Repository/service: Payment API (`payments/payment-api`)
- Jira story: `ENG-4521 — Add merchant refund reason validation`
- Context sources: Jira, Confluence refund policy, Backstage component, Git repository, Bedrock payments-policy knowledge base
- Runtime: Claude Code primary, Codex comparison, Kiro/Cursor/OpenCode available
- Harness: `Payments Standard Change v3.4`
- Agents: Intake, Context Assembly, Requirements, Architecture Challenger, Workflow Composer, Planner, Implementation, Unit Proof, Verification, Security, Evidence Synthesizer, Release, Learning Curator
- Intent problem: negative behavior for an unsupported refund reason is missing
- Architecture concern: the proposed validation duplicates a canonical domain service rule
- Implementation event: a hook blocks an unexpected production credential command
- Verification event: one negative integration test initially fails
- Release: staging succeeds; production is simulated
- Value signal: support contacts for invalid refund reasons should decline
- Learning: improve Jira template and Context Recipe

Additional fixtures:

- Customer Web repository with stale accessibility context
- Legacy Billing repository with incomplete test baseline
- Imported external `performance-test-generator` skill in quarantine
- Vulnerable deprecated `legacy-github-mcp` capability
- Incident `INC-1042` caused by refund reason mapping regression

## 14. Detailed journey specifications

Implement every journey using the shared shell, workflows, data model, and APIs.

---

### J01 — Establish the AI-SDLC platform

**Goal:** Allow an AI Delivery Steward to create and prove a governed Platform Blueprint for a narrow pilot.

**Entry:** First visit when no approved Platform Blueprint exists, or Estate → Platform foundation for a new revision.

**Prerequisites:** Signed-in Steward; seed organization.

**Primary route:** `/estate/platform/establish` and `/estate/platform/:id`

**Workflow:**

1. Define pilot intent, repository class, use case, actors, risk, and success criteria through chat.
2. Connect identity, Backstage, Jira/Confluence, Git, CI, knowledge providers, observability, and notifications using simulated connection cards and topology.
3. Select supported runtimes, models, environments, data regions, and permission posture.
4. Reference or initiate J02 catalog preparation and J03 Context Product.
5. Define enterprise mandates, human decision rights, audit, retention, exceptions, and revocation.
6. Select a base Delivery Harness template and pilot repository.
7. Run readiness checks and a simulated four-loop pilot.
8. Review readiness dossier; approve, request changes, or reject Platform Blueprint publication.

**Dominant screen:** Guided platform-establishment workspace with journey stages at left, current decision in center, topology/blueprint source at right, evidence/timeline below.

**Agent behavior:** Platform Setup Agent proposes required bindings and detects unsupported runtime semantics. It never marks a connection trusted without a test result.

**Human moments:** Steward accepts connection scopes; Architect accepts trust boundaries; Intent Owner accepts pilot outcome.

**Notifications/audit:** Notify reviewers when blueprint decision is requested; notify Steward on approval/rejection. Record every binding, scope change, test, decision, and publication.

**Completion:** Approved `PlatformBlueprint` plus readiness dossier and bounded support statement.

**Failure paths:** unavailable connector, excessive scope, unsupported runtime control, failed pilot, missing owner. Show remediation and preserve the draft.

**Prototype proof:** User can complete the setup without visiting independent connector/agent/policy settings pages.

---

### J02 — Prepare the enterprise capability catalog

**Goal:** Create a coherent, governed enterprise seed catalog for the pilot.

**Entry:** J01 establishment, Exchange → Catalog coverage, or catalog re-baseline.

**Primary route:** `/exchange/catalog/prepare`

**Workflow:**

1. Define Catalog Charter, supported capability kinds, runtimes, trust lanes, evidence minimums, and coverage target.
2. Discover assets from internal Git/runtime configurations and approved external sources without executing them.
3. Display Candidate Inventory grouped by semantic family, owner, source, risk, and current use.
4. Classify each candidate as agent, skill, instruction, output contract, Context Product, MCP/tool, hook, rule, test pack, Workflow Fragment, Work Pattern, profile, or pattern.
5. Normalize candidates into canonical manifests while preserving source view.
6. Deduplicate variants; choose enterprise base, team/repository extension, keep distinct, reject, or defer.
7. Send risky assets through quarantine and kind-specific evaluation.
8. Curate minimum four-loop seed family and coverage map.
9. Review promotion dossier and publish an immutable `CatalogRelease`.

**Dominant screen:** Catalog preparation workspace. Left: four-loop coverage map and intake counts. Center: current classification/curation decision. Right: source, semantic diff, authority, evidence, runtime compatibility, and consumers.

**Agent behavior:** Catalog Analyst suggests classification and duplicate clusters; Trust Agent scans instruction/execution surfaces; Evaluation Agent runs fixtures. Humans decide promotion.

**Human moments:** Steward resolves classification/merge decisions; Architect reviews architectural patterns; Intent Owner validates domain/output contracts.

**Notifications/audit:** Candidate owner assignment, evaluation completion, promotion request, release publication, rejected/remediation results.

**Completion:** `CatalogRelease` with approved seed revisions, gaps, support statement, and compatibility baseline.

**Failure paths:** unknown license/provenance, no owner, malicious instruction, flaky evaluation, runtime control dropped. Remain quarantined or blocked.

**Prototype proof:** Coverage is outcome-based; the catalog is not just an agent-card grid.

---

### J03 — Build or connect a Context Product

**Goal:** Create a governed knowledge/context product usable by agents and repository workflows.

**Entry:** Platform setup, repository activation, missing context in Intent, or Exchange contribution.

**Primary routes:** `/exchange/context-products/new`, `/exchange/context-products/:id`, contextual repository route.

**Variants:** Build from raw sources; connect Bedrock Knowledge Base; connect Foundry IQ/Azure AI Search; connect Copilot Space/internal provider.

**Workflow:**

1. Define decisions/tasks the context must support.
2. Add provider/source references and delegated/workload identity binding.
3. Introspect simulated provider capabilities: retrieval mode, citations, ACL, freshness, region, latency, cost.
4. Define source authority, applicability, filters, storage mode, citation, conflict, freshness, and instruction-safety policy.
5. Run representative, negative, cross-tenant, stale, missing-citation, and prompt-injection retrieval tests.
6. Inspect normalized passages, citations, excluded content, gaps, and retrieval receipts.
7. Review and publish Context Product and Context Recipe.

**Dominant screen:** Source graph and retrieval test workbench. Chat defines intent; graph shows providers/sources/authority; result panel shows passages and citations; readiness panel shows gaps and safety.

**Agent behavior:** Context Curator proposes sources and authority; Context Assembly Agent produces test Context Pack; Safety Agent flags instructions inside retrieved references.

**Human moments:** Intent Owner validates meaning; Architect accepts scope/data boundaries; Steward accepts provider binding.

**Notifications/audit:** Provider auth required, retrieval test complete, source stale, context approval requested/published.

**Completion:** Approved `ContextProduct`, `KnowledgeBinding`, `RetrievalPolicy`, and tested Context Recipe.

**Failure paths:** provider unavailable, ACL uncertainty, stale index, missing citations, prompt injection, excessive persistence. Show blocked/degraded state; never silently use model memory.

---

### J04 — Activate a repository

**Goal:** Establish a trustworthy Repository Delivery Profile before implementation work.

**Entry:** First repository selection, Jira deep link to an unknown repository, or material repository/runtime change.

**Primary route:** `/work/repositories/:id/activate`

**Workflow:**

1. Discover repository identity, ownership, service topology, languages, build/test/CI, deployments, documentation, and existing runtime assets.
2. Resolve enterprise/team base capabilities and Context Products.
3. Assess readiness dimensions: ownership, domain, architecture, execution, runtime customization, authority/data, verification, operations/value.
4. Reconcile inherited assets, approved repository extensions, unregistered local assets, generated projections, conflicts, and obsolete files.
5. Verify build/test commands and a simulated runtime compile.
6. Select or initiate J07 Delivery Harness.
7. Review semantic changes and create a simulated repository pull request.
8. Approve Repository Delivery Profile.

**Dominant screen:** Repository Work Home with contextual activation mode. Show readiness by consequence, not a percentage alone. Selecting a gap opens evidence and remediation.

**Agent behavior:** Repository Scout produces map; Runtime Discovery Agent identifies files; Readiness Agent explains material gaps by work class.

**Human moments:** Steward accepts context/assets and repository bindings; Architect resolves architecture ownership conflicts.

**Notifications/audit:** discovery complete, owner contribution requested, pull request ready, profile approved, future source becomes stale.

**Completion:** `RepositoryDeliveryProfile` with readiness states, bindings, extensions, projections, and lockfile.

**Failure paths:** missing owner, invalid build, untrusted local hook, conflicting instructions, no verification baseline. Allow partial readiness only with explicit work-class limitation.

---

### J05 — Discover, compare, and reuse a capability

**Goal:** Let users find the right trusted capability in context and understand why it fits.

**Entry:** Missing node in Delivery Harness, repository activation recommendation, catalog browsing, or active work gap.

**Primary route:** Contextual Exchange drawer plus `/exchange/capabilities/:id` dossier.

**Workflow:**

1. Carry current repository, work type, risk, runtime, authority, and unmet contract into search.
2. Rank compatible candidates before incompatible ones.
3. Compare a small set by purpose, inputs/outputs, provenance, owner, support, runtime, permissions, dependencies, evidence, incidents, and cost.
4. Inspect base/team/repository extension family and effective differences.
5. Select Use as-is, Extend for repository, Request access, Propose base revision, or Create missing capability.
6. Preview insertion point, new dependencies, authority, credentials, and workflow consequence.
7. Confirm binding; return to the originating journey without losing context.

**Dominant screen:** Ranked comparison field, not a card grid. Use a semantic comparison table and a dossier drawer.

**Agent behavior:** Capability Recommender explains fit and rejects incompatible authority/runtime candidates.

**Human moments:** Steward selects/rejects recommendation; authority request may require decision owner.

**Notifications/audit:** access request, extension review, capability bound, replacement/deprecation alert.

**Completion:** Exact approved revision bound or documented reuse-versus-create decision.

**Failure paths:** no suitable asset, missing access, unsupported runtime, revoked dependency. Route to J06 or constrained continuation.

---

### J06 — Create, import, test, and promote a capability

**Goal:** Turn an internal idea, repository asset, external source, or successful procedure into a governed reusable capability.

**Entry:** Exchange contribution, J05 gap, repository discovery, `skills.sh`/Git import, or “make this reusable” action after a run.

**Primary route:** `/exchange/contribute` and `/exchange/capabilities/:id/revisions/:rev`

**Workflow:**

1. Ask “What outcome should become repeatable?” through chat.
2. Recommend the correct primitive; allow human correction.
3. Capture purpose, inputs, outputs, context, owner, support, instructions, skills, tools, permissions, stop/failure behavior, runtime scope, and evidence requirement.
4. For import, display exact source, digest, license, files, scripts, references, hooks, dependencies, endpoints, and proposed normalization.
5. Generate canonical manifest and source preview.
6. Place external/untrusted candidate in quarantine.
7. Run kind-specific static checks and simulated behavioral/security/compatibility evaluations.
8. Show evaluation dossier and remediation loop.
9. Request approval from accountable human.
10. On approval, publish immutable revision; notify creator and originating harness/work item.

**Dominant screen:** Conversation on left; evolving canonical contract and source in center; trust/evidence/lifecycle rail on right.

**Agent behavior:** Capability Author drafts; Classifier chooses primitive; Trust/Evaluation agents produce evidence. No agent self-approves.

**Human moments:** creator accepts manifest; reviewer approves, constrains, rejects, or requests changes.

**Notifications/audit:** “Agent created,” “evaluation complete,” “approval requested,” “approved/rejected,” “available to insert.” Every creation, edit, test, decision, and publication appears in timeline and audit.

**Completion:** Approved/restricted `CapabilityRevision` plus Evaluation Dossier and origin return link.

**Failure paths:** malicious instructions, missing owner/license, excessive tool scope, failed eval, unsupported runtime. Preserve remediation history.

---

### J07 — Compose, test, and publish a Delivery Harness

**Goal:** Define how a repository performs a class of work using reusable capabilities and controlled autonomy.

**Entry:** Repository activation, missing harness, new risk/work class, or extension of base harness.

**Primary route:** `/work/repositories/:repoId/harnesses/:id`

**Workflow:**

1. Define work outcome, entry contract, completion claim, boundaries, and risk.
2. Start from enterprise harness template, Work Pattern, successful prior run, or governed skeleton.
3. Define responsibility map before detailed nodes.
4. Compose high-level four-loop Work Patterns; expand a pattern into Workflow Fragments only when needed.
5. Bind agents, skills, output contracts, context, MCP/tools, hooks, rules, mandates, models, environments, permissions, evidence, and human decision conditions.
6. Use chat, nested visual canvas, and source/manifest as synchronized modes.
7. Define retries, timeouts, compensation, escalation, pause/takeover, failure returns, and value learning.
8. Simulate normal, ambiguous, permission-denied, failed-test, runtime-incompatible, and cancellation scenarios.
9. Review runtime projections for Claude Code, Codex, Kiro, Cursor, and OpenCode.
10. Review planned human-touchpoint forecast and effective authority.
11. Name, version, and publish harness through simulated repository PR.

**Dominant screen:** Nested orchestration canvas with conversation left, graph center, inspector/source right, simulation/timeline bottom. Never show every skill/hook as top-level graph nodes.

**Agent behavior:** Workflow Composer recommends patterns; Compatibility Agent flags lost semantics; Simulation Agent executes scenarios.

**Human moments:** Steward accepts responsibility/authority; Architect reviews boundary decisions; mandatory controls cannot be removed locally.

**Notifications/audit:** simulation result, approval requested, PR ready, harness published, compatibility drift.

**Completion:** Named `DeliveryHarness` revision, scenario evidence, projections, source map, and lock.

**Failure paths:** missing capability, invalid ports, broad authority, uncovered failure, degraded runtime control. Route to J05/J06 or block publication.

---

### J08 — Start or resume repository work

**Goal:** Give the user a clear entry into daily delivery without confronting platform taxonomy.

**Entry:** Work landing, repository/service selection, Jira deep link, IDE/CLI handoff, or active notification.

**Primary routes:** `/work`, `/work/repositories/:id`, `/work/packages/:id`

**Workflow:**

1. Show Continue, recent working contexts, and assigned work that can infer scope.
2. User selects Payment API or `ENG-4521`; resolve repository and existing package.
3. Check Repository Delivery Profile freshness and readiness for this work class.
4. If missing/stale, route to J04/J03 with return state preserved.
5. Retrieve Jira story and linked context with provenance.
6. Recommend `Payments Standard Change v3.4` harness.
7. Create or resume Trusted Change Package.
8. Show concise preflight: repository, story, context status, harness, planned agents, runtime, authority, human conditions, cost/budget, and proof.
9. Continue to J09 or resume current loop/decision.

**Dominant screens:** Work landing and Repository Work Home. No KPI dashboard. Primary action changes with state.

**Agent behavior:** Intake Agent normalizes signal; Scope Resolver infers repository; Context Assembly checks Context Pack.

**Human moments:** Resolve ambiguous repository, accept material stale-context limitation, choose harness override.

**Notifications/audit:** package opened/resumed, context stale, duplicate package detected, harness changed.

**Completion:** Opened/resumed `TrustedChangePackage` with selected work context and Delivery Harness.

**Failure paths:** Jira unavailable, ambiguous repository, no harness, insufficient context, unauthorized repo. Preserve entered URL and offer recovery.

---

### J09 — Qualify and approve Intent

**Goal:** Convert fragmented work into approved, testable, architecture-aware AI-ready intent.

**Entry:** J08 selected work or new product/system outcome.

**Primary route:** `/work/packages/:id/intent`

**Workflow:**

1. Context Assembly produces cited Context Pack with facts, statements, inferences, conflicts, and gaps.
2. Requirements Agent applies Requirements Output Contract.
3. Journey/UX Agent adds user flow, interaction states, accessibility/responsive needs when relevant.
4. Architecture Agent maps affected systems and proposes architecture contract.
5. Architecture Challenger identifies duplicate validation rule in golden scenario.
6. Proof Designer maps behavior/risk to evidence obligations and value signals.
7. Conversation asks one material question at a time; answers update Living Intent Contract immediately.
8. Request targeted contributions from Intent Owner or Architect; notify them and show status in timeline.
9. Show requirement-to-source, decision, affected-system, and proof coverage.
10. Intent Owner/Architect approve, reject, request changes, constrain, or defer their decisions.
11. Freeze approved Intent Contract revision and hand off to J10.

**Dominant screen:** Active conversation plus Living Intent Contract. Use clauses with source lineage, decision state, affected-system sketch, UX/architecture lenses, and proof obligations.

**Agent behavior:** Agents challenge poor requirements or architecture with a proposition, evidence, consequence, options, and recommendation—not generic questions.

**Human moments:** Resolve unsupported refund reason behavior; Architect chooses canonical domain-service validation; approve intent.

**Notifications/audit:** contribution request, response, contract change, source changed, intent approval/rejection. All chat-accepted structured changes are audited.

**Completion:** Approved `IntentContract`, Context Pack, architecture/UX decisions, AI-ready backlog, proof/value direction.

**Failure paths:** unresolved material conflict, absent owner, stale source, untestable criterion, denied knowledge access. Block implementation with precise recovery.

---

### J10 — Implement a bounded change

**Goal:** Execute approved intent through visible, controlled agent orchestration.

**Entry:** Approved Intent Contract and task Execution Blueprint.

**Primary route:** `/work/packages/:id/implementation`

**Workflow:**

1. Resolve exact harness/capability revisions, Context Pack, models, tools, permissions, environment, and budgets.
2. Compile simulated runtime projection and provision isolated worktree.
3. Planner creates implementation plan mapped to requirements.
4. Human sees plan/change checkpoint only when required by risk/harness.
5. Implementation Agent edits simulated files and emits diff events.
6. Unit Proof Agent creates/runs tests; bounded repair loop handles failure.
7. Hooks execute around tool/edit lifecycle.
8. Golden scenario hook blocks unexpected production credential command; create permission decision with safe alternatives.
9. Change Reviewer compares implementation with intent, architecture, standards, and scope.
10. User can pause, steer, retry, cancel, constrain, change agent/model, or take over.
11. Produce Candidate Change Package and hand off to J11.

**Dominant screen:** Live execution journey. Center shows active workflow graph and agent tree; right shows diff/artifacts; timeline shows tools/hooks/decisions. Terminal detail is secondary.

**Agent behavior and visibility:** Show planned vs actual agents, objectives, context/skills used, tool calls, permissions, files, tests, budget, retry, and outputs. The Implementation Agent must explain the current objective and each bounded delegation; the Unit Proof Agent must return failure evidence into the repair loop rather than silently retrying.

**Human moments:** plan approval if risk requires; permission denial/exception; takeover/steering.

**Notifications/audit:** run started, waiting decision, hook denied, repair completed, run failed/completed. Every tool call and file change has attribution.

**Completion:** `ChangeSet` and Candidate Change Package with unit proof, trajectory, receipts, known gaps, and simulated PR.

**Failure paths:** agent stall, budget exhausted, tool denied, hook failure, merge conflict, runtime mismatch, repeated test failure. Preserve checkpoint and offer targeted recovery.

---

### J11 — Verify fitness and evidence

**Goal:** Decide whether the change is fit for intended purpose, not merely whether tests are green.

**Entry:** Candidate Change Package.

**Primary route:** `/work/packages/:id/verification`

**Workflow:**

1. Derive verification plan from requirement claims, architecture risk, changes, and mandated controls.
2. Resolve versioned test data and evidence packs.
3. Run simulated unit, integration, contract, UI, accessibility, security, performance, resilience, policy, and agent-behavior checks selected by risk.
4. Show Verification Agent roster and deterministic tools separately.
5. Map every claim to current evidence.
6. Golden scenario negative integration test fails; Evidence Synthesizer routes repair to J10 with exact responsible claim/node.
7. Re-run affected scope only and preserve previous evidence lineage.
8. Expose missing, stale, disputed, waived, and not-applicable evidence.
9. Steward reviews Verification Dossier and chooses approve, reject, request changes, constrain, defer, or waive with expiry where authorized.
10. Hand verified scope to J12.

**Dominant screen:** Claim-to-Evidence Matrix plus risk-selected verification journey. Lead with changed behavior and unsupported claims, not raw test logs.

**Agent behavior:** Test Designer selects coverage; specialists execute; Evidence Synthesizer explains sufficiency. Implementer cannot self-certify when policy requires independent proof.

**Human moments:** evidence dispute/waiver; readiness decision.

**Notifications/audit:** proof failed, repair requested/completed, evidence stale, verification decision required/completed.

**Completion:** Signed `VerificationDossier`, decision ledger, residual risk, and authorized readiness scope.

**Failure paths:** flaky test, bad test data, unavailable environment, conflicting scanner result, intent defect. Route to test/environment, J10, or J09 as appropriate.

---

### J12 — Release, realize value, and close or continue

**Goal:** Release within approved scope, observe outcomes, and feed learning back into reusable systems.

**Entry:** Verified change and authorized release scope.

**Primary route:** `/work/packages/:id/value`

**Workflow:**

1. Assemble release-readiness briefing: intent, changed behavior, evidence, residual risk, approvals, environment, stop/rollback conditions.
2. Check approval/commit/evidence freshness.
3. Simulate merge, staging deployment, health checks, and bounded production release.
4. Show progressive rollout and rollback controls.
5. Notify stakeholders and simulate Jira/PR/release updates.
6. Observe technical signals and value/adoption signals linked to original intent.
7. Compare expected versus observed outcome.
8. Learning Curator proposes regression test, Jira template, Context Recipe, skill, agent, hook, or harness changes.
9. Human chooses scale, continue observing, revise, rollback, pause, or retire.
10. Close package only when outcome/learning posture is accepted or corrective work is linked.

**Dominant screen:** Release and outcome narrative: readiness → rollout → observation → value decision. Avoid a generic deployment dashboard.

**Agent behavior:** Release Agent coordinates bounded steps; Observability/Value agents interpret signals; Learning Curator only proposes changes.

**Human moments:** release approval if mandated; rollback/value decision; approve creation of improvement proposal.

**Notifications/audit:** release ready, deployed, health failure, rollback, observation window complete, value decision, learning proposed.

**Completion:** `ReleaseRecord`, observations, value decision, and governed learning proposals.

**Failure paths:** stale approval, failed health check, regression, missing value data, attribution uncertainty. Block/rollback/extend observation with explicit state.

---

### J13 — Respond to an incident or corrective signal

**Goal:** Contain and correct a production or policy problem while converting learning into reusable prevention.

**Entry:** Incident, regression, vulnerability, failed release, support escalation, or monitoring anomaly.

**Primary route:** `/work/incidents/:id`

**Workflow:**

1. Ingest signal and correlate repository, service, recent packages, releases, agents, capabilities, and evidence.
2. Establish incident Context Pack and severity/authority.
3. Present immediate containment options and consequences.
4. Human authorizes bounded containment or rollback when required.
5. RCA Agent creates hypotheses with evidence, not a fabricated conclusion.
6. Open linked corrective Trusted Change Package using incident-repair harness.
7. Execute targeted implementation and verification loops.
8. Confirm recovery and observe recurrence window.
9. Propose regression tests, Context Product updates, skills, hooks, rules, agents, or harness changes.
10. Close incident with accountable decision and linked learning.

**Dominant screen:** Incident narrative with impact, containment, causal graph, corrective run, recovery evidence, and prevention proposals.

**Golden fixture:** `INC-1042` refund reason mapping regression linked to ENG-4521 release.

**Agent behavior:** Correlation Agent links evidence; RCA Agent grades hypotheses; Corrective Orchestrator reuses four-loop patterns.

**Human moments:** containment/risk decision, causal acceptance, closure.

**Notifications/audit:** incident opened/escalated, containment requested/completed, corrective package opened, recovery verified, learning awaiting promotion.

**Completion:** contained/corrected incident, RCA dossier, regression assets, and linked improvement proposals.

**Failure paths:** uncertain correlation, missing telemetry, containment denied, rollback fails, recurrence. Preserve hypotheses and escalate visibly.

---

### J14 — Review touchpoints and improve context/harness automation

**Goal:** Reduce avoidable interruptions and rework while preserving high-value and mandatory human accountability.

**Entry:** Repository/Harness review, repeated human decisions, low autonomous completion, waiting, rework, or post-run learning.

**Primary route:** `/work/repositories/:repoId/harnesses/:id/insights`

**Workflow:**

1. Aggregate planned and actual workflow trajectories by work/risk class.
2. Overlay human touchpoints on the nested Delivery Harness.
3. Classify touchpoints: mandatory control, planned risk, ambiguity, agent uncertainty, permission, proof dispute, runtime failure, user intervention.
4. Show frequency, wait, outcome, reversals, defects prevented/introduced, and recurrence—not just approval count.
5. Identify root pattern: context gap, poor ticket template, agent/skill weakness, permission mismatch, flaky proof, runtime issue, or valid mandatory control.
6. Generate candidate improvement with semantic diff and expected effect.
7. Replay historical fixtures and simulate candidate harness/context/capability revision.
8. Compare baseline/candidate autonomy, safety, evidence, cost, and human-touchpoint forecast.
9. Human approves promotion path; never remove a gate automatically.
10. Publish through J03, J06, J07, or policy revision and observe future results.

**Dominant screen:** Nested workflow with touchpoint heat overlay; causal breakdown and candidate improvement beside it. Avoid individual productivity ranking.

**Agent behavior:** Learning Analyst proposes causes; Simulation Agent tests changes; Policy Agent marks non-removable controls.

**Human moments:** accept diagnosis, approve candidate evaluation/promotion.

**Notifications/audit:** repeated pattern detected, candidate ready, evaluation complete, improvement approved/rejected, impact after rollout.

**Completion:** Evaluated `ImprovementProposal` routed to governed revision workflow.

**Failure paths:** insufficient sample, confounded outcomes, mandatory control mistaken for waste, candidate reduces safety. Mark inconclusive/reject.

---

### J15 — Govern capability and runtime estate lifecycle

**Goal:** Understand and remediate live ownership, authority, compatibility, reliability, vulnerability, cost, and lifecycle risks.

**Entry:** Estate, finding notification, upstream change, vulnerability, deprecation, ownership gap, cost/reliability deviation, or audit request.

**Primary routes:** `/estate`, `/estate/findings/:id`, `/estate/topology`

**Workflow:**

1. Join catalog truth, repository bindings, runtime projections, runs, permissions, context providers, evidence, incidents, cost, and outcomes.
2. Show topology by repository/service, harness, agent, capability, runtime, model, MCP/tool, identity, data, and environment.
3. Rank findings by consequence: unowned, unregistered, over-authorized, stale, unsupported, vulnerable, deprecated, unreliable, duplicated, unused, or excessive cost.
4. Select finding and inspect blast radius, consumers, evidence, alternatives, and decision owner.
5. Start a remediation thread: assign owner, restrict, quarantine, recertify, rotate, migrate, replace, revoke, deprecate, retire, or accept time-bound exception.
6. Simulate impact before material action.
7. Notify affected repository Stewards and create migration/update pull requests where applicable.
8. Track remediation to completion and verify runtime/catalog convergence.

**Dominant screen:** Consequence-ranked estate topology and finding remediation workspace. Avoid a wall of infrastructure metrics.

**Golden finding:** deprecated vulnerable `legacy-github-mcp` used by two repository harnesses; replace with approved provider revision.

**Agent behavior:** Estate Analyst correlates state; Blast Radius Agent maps consumers; Migration Planner proposes safe sequence.

**Human moments:** material restrict/revoke/migrate/exception decision.

**Notifications/audit:** finding created, owner assigned, action proposed, consumers notified, migration status, revocation complete.

**Completion:** Auditable lifecycle/remediation action with verified affected-consumer state.

**Failure paths:** unknown consumer, no replacement, runtime incompatibility, owner unavailable, migration test fails. Constrain and track residual risk.

## 15. Route map

Use this as a starting route architecture; nested routes may be adjusted for clean React Router composition.

```text
/
/work
/work/repositories/:repoId
/work/repositories/:repoId/activate
/work/repositories/:repoId/harnesses/:harnessId
/work/repositories/:repoId/harnesses/:harnessId/insights
/work/packages/:packageId
/work/packages/:packageId/intent
/work/packages/:packageId/implementation
/work/packages/:packageId/verification
/work/packages/:packageId/value
/work/incidents/:incidentId

/exchange
/exchange/catalog/prepare
/exchange/capabilities/:capabilityId
/exchange/capabilities/:capabilityId/revisions/:revisionId
/exchange/contribute
/exchange/context-products/:contextProductId
/exchange/context-products/new

/estate
/estate/platform/establish
/estate/platform/:blueprintId
/estate/topology
/estate/findings/:findingId
```

## 16. Golden end-to-end demo

Create a guided demo mode that proves the connected product:

1. Open Work and select Payment API.
2. See context ready and select ENG-4521.
3. Review Payments Standard Change harness and planned agents.
4. Enter Intent; Requirements Agent identifies missing negative behavior.
5. Daniel receives a contribution notification and answers it.
6. Architecture Challenger raises duplicate-domain-rule concern; Priya decides.
7. Approve Intent Contract.
8. Start Claude Code simulated implementation.
9. Watch planner, implementation, unit-proof, hooks, tools, changes, and audit events.
10. Hook blocks production credential command; Maya keeps it denied and run continues safely.
11. Verification runs; negative integration test fails.
12. Repair routes to Implementation and affected proof reruns.
13. Review Verification Dossier and approve readiness.
14. Simulate staging/release and observe outcome.
15. Review learning proposal and Human Touchpoint Map.

At any step, the user can open timeline and audit and reconstruct what humans and agents did, why state changed, and what happens next.

## 17. Replit implementation and review sequence

Do not try to generate everything in one unstructured pass. The increments below define dependency order, but they are **not** permission to build a whole increment without review. Inside every increment, implement and review one journey at a time.

### Mandatory review cycle for foundation and every journey

For each review unit, follow this exact cycle:

1. **Frame:** Restate the user outcome, entry point, end state, dominant interaction, and what will remain outside this slice.
2. **Compose:** Reuse the approved shell and components. Build the smallest complete end-to-end journey, not a collection of unfinished screens.
3. **Exercise:** Run the application and execute the seeded happy path plus one meaningful blocked/recovery path through REST calls.
4. **Inspect:** Review the UI at approximately 1440px and 1280px widths. Check hierarchy, density, clipping, alignment, copy, focus, loading, empty, error, and transition states. Capture screenshots of the entry, primary decision/work state, and completion/recovery state.
5. **Polish:** Remove unnecessary panels, cards, labels, badges, repeated metadata, and navigation. Resolve visual defects before presenting.
6. **Demonstrate:** Give the user the local URL, exact click path, screenshots, implemented interactions, simulated behavior, known limitations, and specific questions needing judgment.
7. **Record:** Update `docs/JOURNEY_STATUS.md`, `docs/DESIGN_SYSTEM.md`, and `docs/DECISIONS.md` with what was implemented and learned.
8. **Stop:** Wait for explicit user approval, requested revisions, or `continue`. Do not begin the next review unit.

If the user requests changes, revise and demonstrate the same journey again. Approval applies only to the reviewed slice. Do not treat approval as permission to batch the remaining journeys.

### Increment 0 — Foundation

- Project scaffold and design tokens
- Express API, Zod schemas, in-memory seed store, reset endpoint
- Product shell, routing, TanStack Query
- Timeline, audit, notifications, decisions, simulation engine
- Seed actors, repository, story, capabilities, harness, runtime adapters

**Foundation review gate:** Demonstrate the shell with one representative active-work state, one human decision, one agent event, one notification, and one timeline transition. Prove the visual grammar and interaction quality before implementing J08. Then stop for approval.

### Increment 1 — Daily delivery backbone

Implement J08 → J09 → J10 → J11 → J12 using the golden scenario. This establishes the central workbench and shared workflows.

Implement, demonstrate, review, and receive approval for J08 before beginning J09; repeat for J09, J10, J11, and J12.

**Gate:** Complete golden demo with real API mutations, async events, notification/decision round trip, timeline, audit, failure/repair, and release learning.

### Increment 2 — Repository context and harness

Implement J03, J04, and J07. Connect their outputs to J08 preflight and the runtime compatibility panel.

Implement and review in this order: J03 → J04 → J07. Stop after each journey.

**Gate:** Change repository context or harness revision and see downstream task preflight, projections, and stale-state impact update.

### Increment 3 — Enterprise catalog supply chain

Implement J02, J05, and J06.

Implement and review in this order: J02 → J05 → J06. Stop after each journey.

**Gate:** Import quarantined capability, classify/evaluate/approve it, receive notification, insert it into a harness, and see full provenance/audit.

### Increment 4 — Platform, incidents, learning, and estate

Implement J01, J13, J14, and J15.

Implement and review in this order: J01 → J13 → J14 → J15. Stop after each journey.

**Gate:** Platform pilot references seed catalog/context/repository/harness; incident produces corrective package and regression; touchpoint insight produces evaluated improvement; estate finding produces migration/remediation.

### Increment 5 — Cohesion and visual refinement

- Remove duplicated UI and disconnected routes
- Verify all return paths and deep links
- Refine information hierarchy and nested graph behavior
- Add empty, loading, error, blocked, stale, partial, and unauthorized states
- Accessibility pass
- Responsive pass
- Performance pass
- Complete automated tests

This is also reviewed in bounded slices. Do not use final refinement as an excuse to postpone obvious design-quality problems discovered during earlier journey reviews.

## 18. Definition of done for every journey

A journey is not complete until:

- it has a discoverable entry from a prior journey, notification, or global surface;
- the user understands the goal, context, current state, and next action;
- data loads through REST APIs;
- every material action uses a mutation endpoint;
- chat changes structured state visibly;
- agent actions and delegation are inspectable;
- human contribution/decision works end-to-end when applicable;
- notifications deep-link and update correctly;
- timeline records all causal movement;
- audit records all material mutations;
- output becomes input to the next journey;
- failure, denied, stale, blocked, empty, loading, and retry states exist;
- there are no dead buttons or fake links in the demonstrated path;
- components and data contracts are reusable; and
- at least one test validates its main state transition.

It must also pass the experience review gate:

- the dominant user question and next action are recognizable within five seconds;
- the screen has a clear visual center rather than several equally loud regions;
- technical detail is progressively disclosed rather than displayed by default;
- chat visibly changes structured work and is not an isolated transcript;
- human/agent collaboration and causality can be understood at a glance;
- terminology and action labels are specific to the workflow;
- the 1440px and 1280px screenshots look deliberate and presentation-ready;
- no clipping, accidental overflow, placeholder copy, unexplained icons, dead controls, or inconsistent states remain; and
- the user has explicitly approved the journey after reviewing the running prototype.

## 19. Automated testing requirements

### Unit/component tests

- State transition validation
- Decision response consequences
- Timeline/audit emission
- Capability lifecycle transition
- Context readiness calculation
- Runtime semantic compatibility display
- Evidence gate calculation
- Notification deep-link behavior

### Playwright flows

1. Golden J08–J12 story delivery
2. J06 import → quarantine → evaluate → approve → notification → harness insertion
3. J03 provider test failure and recovery
4. J04 partial repository readiness blocking high-risk work
5. J07 runtime semantic block preventing publication
6. J13 incident → corrective package → regression proposal
7. J15 vulnerable capability → blast radius → migration completion

## 20. Prototype safeguards and non-goals

- Do not execute real agent runtimes or local shell commands.
- Do not store real secrets or OAuth tokens.
- Do not claim that simulated runtime projections are production-compatible.
- Do not implement a production policy engine, workflow engine, vector database, or agent registry.
- Do not build real Jira/Confluence/GitHub/Bedrock/Azure integrations in this phase.
- Do not allow audit deletion.
- Do not silently auto-approve agents, capabilities, context, exceptions, evidence, or release.
- Do not optimize away mandatory human controls.
- Do not create a separate page for every entity.

Build abstractions and REST contracts that let mock services later be replaced by real adapters.

## 21. Documentation Replit must maintain

Create and keep updated:

- `README.md` — setup, run, tests, demo credentials, golden demo
- `docs/PRODUCT_MODEL.md` — objects and relationships
- `docs/JOURNEY_STATUS.md` — J01–J15 status and acceptance results
- `docs/API.md` — REST endpoints and examples
- `docs/SIMULATION_SCENARIOS.md` — deterministic async scenarios
- `docs/DESIGN_SYSTEM.md` — tokens and reusable components
- `docs/DECISIONS.md` — architecture and experience decisions

After each increment, update `JOURNEY_STATUS.md` with implemented, partial, blocked, and tested status. Do not mark a journey complete because its route renders.

## 22. Final acceptance standard

The prototype succeeds when a reviewer can use it to answer:

- Where am I working, and is its context ready?
- What ticket/outcome is moving through the four loops?
- Which Delivery Harness and capability revisions are effective?
- Which agents were selected, what did each do, and under what authority?
- What did humans contribute or decide, and why?
- What notifications are actionable?
- What changed in the living contract, workflow, code, evidence, release, or catalog?
- Can the complete movement be reconstructed from timeline and audit?
- How was the workflow projected to Claude Code, Kiro, Cursor, Codex, or OpenCode?
- What failed, where did it return, and how was it recovered?
- Which human touchpoints are mandatory, valuable, avoidable, or automation candidates?
- How do real outcomes create governed improvements to context, capabilities, and harnesses?

The prototype must feel like one AI Delivery Workbench whose representations change with the work—not a portal assembled from independent feature screens.
