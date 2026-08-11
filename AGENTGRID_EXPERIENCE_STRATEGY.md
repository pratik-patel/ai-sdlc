# AgentGrid Experience Strategy

**Status:** Design authority before further portal implementation
**Principle:** AgentGrid is not a sequence of management screens. It is a continuous environment for making consequential decisions about agent-enabled work.

## 1. Experience thesis

Most enterprise agent products expose their data model as navigation:

```text
Agents → Prompts → Knowledge → Tools → Tests → Deployments → Traces
```

That forces users to reconstruct intent and causality across disconnected screens.

AgentGrid must instead organize the experience around a continuous transformation:

```text
Intent
  → explicit service contract
  → executable behavior
  → demonstrated evidence
  → bounded authority
  → controlled release
  → observed outcome
  → durable learning
```

The interface should feel like one intelligent work surface changing resolution around the user’s current decision—not a suite of administrative applications.

## 2. The design unit is an experience episode

An experience episode begins with a real trigger and ends with a consequential state change.

Every episode must define:

1. **Trigger:** Why did the user arrive now?
2. **Intent:** What are they trying to understand or change?
3. **Decision object:** What exact contract, claim, version, run, or authority is in question?
4. **Necessary evidence:** What must be visible for a responsible decision?
5. **Interaction:** What does the user inspect, compose, compare, simulate, or decide?
6. **Consequence:** What becomes true after the action?
7. **Continuation:** Where does the work naturally go next?
8. **Trust state:** What is known, inferred, uncertain, missing, or contested?
9. **Collaboration:** Who else must contribute or decide?
10. **Recovery:** How does the user undo, revise, retry, or challenge the result?

No interface component should be designed until its role in an episode is explicit.

## 3. Core experience episodes

| Episode | User trigger | Dominant question | Consequential outcome |
|---|---|---|---|
| Resume consequential work | Assignment, change, alert, recent draft | What requires my judgment and why? | Exact work context opened |
| Frame an opportunity | Business problem or proposed automation | What outcome should change, for whom, and within what boundary? | Agent-service intent contract |
| Adopt an existing agent | Repository, endpoint, or external platform | What exists, what does it actually do, and can we trust it? | Registered agent with reconstructed dossier |
| Compose behavior | Approved intent | How should humans, agents, rules, knowledge, and actions work together? | Versioned executable blueprint |
| Bind context and authority | Component requires information or action | What may this service know and do under whose identity? | Governed binding contract |
| Rehearse behavior | Draft or proposed change | What happens for this identity, cohort, data, and condition? | Inspectable run evidence |
| Establish fitness | Requirements and accumulated runs | What is proven, challenged, missing, or waived? | Evidence-backed release case |
| Bound a release | Candidate ready for decision | Who gets this version, under what thresholds and recovery conditions? | Controlled rollout decision |
| Understand live behavior | Outcome deviation, feedback, or change | Is the service producing the intended outcome safely? | Intervention or improvement decision |
| Learn from failure | Incident or representative run | What contract failed, and how will recurrence be prevented? | Regression evidence and proposed correction |
| Govern the estate | Risk, ownership, duplication, expiry, or cost exception | Where must the enterprise restrict, consolidate, certify, or retire? | Portfolio-level control decision |

These are not eleven pages. They are states of the same work environment.

## 4. Interaction grammar

AgentGrid should use a small, consistent interaction grammar across every episode.

### 4.1 Describe → materialize

The user explains intent in natural language. The system turns it into visible structured contracts while the conversation continues.

Rules:

- The user always sees what the system inferred.
- Material assumptions appear as reviewable propositions.
- The assistant asks one high-value question at a time.
- Accepted statements become versioned specification elements.
- Data access and action authority are never silently inferred as approved.

### 4.2 Select → reveal consequence

Selecting an agent, component, knowledge source, action, test, claim, or trace reveals its contract and downstream consequence without replacing the primary context.

Rules:

- Selection opens contextual depth, not a new administrative destination.
- The inspector explains purpose, ownership, evidence, authority, dependencies, and current finding.
- Related objects are shown because they affect the current decision, not because they exist in the database.

### 4.3 Zoom → preserve orientation

The user moves from enterprise → capability → service → component → version → run → span while retaining a visible breadcrumb of meaning.

Rules:

- The user never loses the active service, version, cohort, environment, or originating decision.
- Backtracking returns to the same selection and evidence state.
- Portfolio, service, and runtime are resolutions of one model—not separate products.

### 4.4 Compose → validate locally

When users add or change behavior, knowledge, tools, or authority, the interface immediately exposes affected requirements and the smallest relevant rehearsal.

Rules:

- Changes are made in the context where their purpose is visible.
- The system proposes affected tests and reviewers.
- A component can be exercised without forcing a full release workflow.
- Configuration fields appear only when a decision requires precision.

### 4.5 Rehearse → capture evidence

A rehearsal is an inspectable execution, not merely a chat response.

Rules:

- Conversation/result and execution evidence are visible together.
- Identity, permissions, cohort, data, environment, knowledge snapshot, version, and tools are explicit.
- Useful runs can become scenarios without copying content between screens.
- A failure links back to the responsible specification or component.

### 4.6 Compare → decide

Comparison is used when change or choice matters: proposed versus current, expected versus observed, allowed versus attempted, supported versus missing.

Rules:

- Differences are expressed in human consequences before technical details.
- Changed authority, knowledge, users, and outcomes are more prominent than raw configuration diffs.
- The decision action states what it will authorize or constrain.

### 4.7 Decide → bind accountability

Approval is not a button at the end of a record. It binds a person, evidence, conditions, scope, and expiry to a consequential state transition.

Rules:

- The interface identifies why this person has the decision right.
- Missing evidence and unresolved objections remain visible.
- Conditional approval creates explicit obligations and re-review triggers.
- The decision receipt is permanent and traceable.

### 4.8 Trace → learn

Production evidence should move directly into design and test improvement.

Rules:

- The user can move from impact to representative run to failed contract.
- Creating regression evidence proposes a requirement, cohort, expected behavior, and owner.
- A trace is never saved as an unlabeled generic test.
- Fix, evidence, release, and restoration remain causally linked.

## 5. Persistent experience objects

Instead of a collection of pages, the product maintains several persistent objects across episodes.

### 5.1 Work Thread

The causal thread connecting why the user arrived, what they inspected, decisions made, people involved, and what must happen next.

It contains:

- Originating assignment, opportunity, change, or incident
- Current decision and consequence
- Relevant service/version/cohort
- Evidence viewed or created
- Participants and pending contributions
- Decision history and continuation

### 5.2 Agent Service Spine

The stable identity of the work:

- Mission and intended consumers
- Business capability/process
- Owners and decision rights
- Active and proposed versions
- Lifecycle, runtime, assurance, outcome, and certification states
- Knowledge and action-authority envelope

It stays visible at an appropriate density throughout the lifecycle.

### 5.3 Living Specification

The continuously updated contract produced through conversation, imported metadata, component configuration, and human decisions.

It is not a long form. It is a structured composition of:

- Outcome
- Users and triggers
- Behavior and boundaries
- Knowledge and data
- Tools and authority
- Human control
- Requirements and risks
- Success and counter-metrics
- Test obligations

### 5.4 Evidence Thread

A traceable relationship among:

```text
Requirement → risk → scenario → run → evaluation → claim → decision
```

The user can enter the thread from any element without losing the surrounding service context.

### 5.5 Authority Envelope

An explicit visual and contractual boundary around what an agent can read, recommend, write, or execute autonomously.

It shows:

- Invoking and executing identity
- Permitted systems and operations
- Approval boundaries
- Jurisdiction and cohort restrictions
- Preconditions, expiry, retries, and compensation
- Evidence supporting the authority

### 5.6 Outcome Loop

The relationship between demand, work performed, human contribution, service behavior, customer/business result, and improvement.

It prevents the product from equating agent activity with business value.

## 6. Experience surface model

The application shell may retain a few stable anchors for orientation, but users should navigate primarily by continuing work objects.

### Stable anchors

- **Work** — consequential assignments and continuations
- **Agents** — discovery, use, ownership, and lifecycle entry
- **Operate** — live outcomes, incidents, and intervention
- **Control** — enterprise exceptions and authority

These anchors answer “where am I at enterprise scope?” They do not contain deep menus.

### Contextual lifecycle rail

When an agent is active, the experience exposes its lifecycle as a compact progress-and-evidence rail:

```text
Intent · Composition · Rehearsal · Decision · Live · Learning
```

This is not a wizard. It communicates where evidence exists, where work is incomplete, and which transitions are possible.

### Focus surface

One representation dominates at a time:

- Conversation plus living specification
- Service composition
- Rehearsal and trace
- Evidence/decision comparison
- Live outcome and failure narrative
- Enterprise exception map

Supporting detail appears through contextual inspectors, overlays, and evidence threads rather than parallel dashboards.

## 7. First experience: intent to trusted draft

This is the next experience to design before the catalog or any additional dashboard.

### 7.1 Entry moment

The user arrives because they want to automate a process or adopt an existing agent.

The opening state asks:

> What work should change—or what existing agent should AgentGrid understand?

Three visible starts are enough:

- Describe the work
- Bring an existing agent
- Begin from an approved pattern

### 7.2 Describe-the-work experience

The surface has three coordinated regions, not three pages:

1. **Conversation thread** — the Definition Agent conducts a focused dialogue.
2. **Living contract** — accepted outcome, users, boundaries, and evidence appear as structured statements.
3. **Service sketch** — emerging relationships among trigger, evidence, judgment, actions, humans, and outcome.

The design intentionally delays technical configuration until the business contract is coherent.

### 7.3 Progressive questioning

The system should not ask a fixed questionnaire. It should select the next question based on material uncertainty.

Example sequence for Customer Escalation:

1. “Which escalations should this service resolve, and which must remain with a specialist?”
2. “What outcome should improve without increasing unauthorized financial actions?”
3. “Which policy evidence determines an eligible remedy?”
4. “May the service only recommend a credit, or may it issue one after approval?”
5. “Who owns policy interpretation when global and regional guidance conflict?”

Each answer changes the living contract and service sketch immediately.

### 7.4 Material-assumption interaction

If the Definition Agent infers something material, it presents a proposition:

```text
Proposed boundary
Canada: recommendation only until regional policy coverage is proven.

Why proposed
The requested workflow includes consequential financial action and regional policy variation.

[Accept as draft] [Revise] [Assign decision]
```

This is more trustworthy than silently populating a form.

### 7.5 Transition to composition

The experience does not end with “Create.” It shows readiness:

- Outcome clear
- Owner accepted
- Users/cohort clear
- Trigger and completion defined
- Knowledge needs identified
- Authority unresolved
- Initial test obligations proposed

The user continues into composition with the same conversation, contract, work thread, and service sketch intact.

## 8. Composition experience

Composition should not imitate a generic flowchart builder.

### Dominant representation

Use a service narrative organized around responsibility and control:

```text
Demand → establish eligibility → assemble evidence → make judgment
       → obtain human authority → execute → communicate → observe outcome
```

Agent, deterministic, data, tool, and human components are visually distinct because their responsibilities differ.

### Component interaction contract

Selecting a component answers:

- Why does this component exist?
- What contract does it fulfill?
- What does it receive and produce?
- What knowledge or authority does it use?
- What may fail, and how is failure handled?
- Who owns it?
- What evidence currently supports it?
- Which requirements and tests are affected by change?

The user changes behavior from this context. There is no separate prompt page, tool page, or knowledge page.

### Contextual insertion

“Add knowledge,” “Add action,” or “Add human decision” opens a context-filtered library.

The library ranks options using:

- The selected component’s purpose
- Approved enterprise sources/actions
- User and service permissions
- Existing organizational patterns
- Jurisdiction and data sensitivity
- Required test/evidence packs

Insertion creates a binding proposal, not immediate unrestricted access.

## 9. Rehearsal experience

Testing should feel like staging the work, not operating a test-management product.

### Rehearsal setup

The user establishes only the conditions that materially affect behavior:

- Scenario/cohort
- Invoking identity and permissions
- Candidate version
- Data and knowledge time point
- Action mode: simulate, require confirmation, or sandbox execute

### Coordinated representation

The surface keeps three synchronized views:

1. User conversation or task result
2. Service journey with active component and branching
3. Evidence stream: retrieval, tools, policies, cost, latency, and evaluators

Selecting any response fragment highlights its sources and responsible execution path.

### Save-as-evidence interaction

When a run is useful, the system proposes:

- Requirement protected
- Cohort represented
- Expected behavior
- Expected/forbidden trajectory
- Knowledge snapshot semantics
- Evaluators
- Dataset placement and owner

The user confirms or edits this proposal. The run becomes durable evidence without manual transcription.

## 10. Release-decision experience

Release is a decision briefing, not a deployment form.

The briefing tells a causal story:

```text
Why change → what changed → who/what is affected → what evidence exists
→ what remains uncertain → what authority changes → how exposure is bounded
→ how we detect harm → how we recover
```

The decision control expresses scope:

> Release v1.9 to 10% of Canadian support specialists for four hours, recommendation-only, with policy accuracy ≥98% and automatic pause on any unauthorized-action attempt.

Approving this statement creates a scoped decision receipt, not a generic approved status.

## 11. Live and learning experience

The live experience should begin with the outcome contract rather than infrastructure health.

The user sees:

- Demand entering the service
- Eligible work and completed outcomes
- Human/agent/system contribution
- Quality, safety, latency, cost, and counter-metrics
- Current operating restrictions
- Changes or dependencies most likely to explain deviation

When an incident occurs, the outcome narrative progressively resolves into cohort, version, component, trace, and failed contract.

The experience returns to composition and rehearsal through a regression proposal. It does not end at incident closure.

## 12. Estate-governance experience

Control should begin from exceptions that demand action:

- High authority without sufficient evidence
- Unowned or expired service
- Duplicated outcome or overlapping agent
- Knowledge source with concentrated blast radius
- External agent without trace/test coverage
- Cost without measurable adoption or outcome
- Control failure or unresolved exception

Selecting an exception reveals the affected services, authority, evidence, owners, and available control actions in one context.

Portfolio visualizations are used only when they help compare or locate these relationships. They are not the product’s default home.

## 13. Component-quality standard

Every interactive component must have a written contract before implementation.

### Required component contract

| Dimension | Required question |
|---|---|
| Purpose | What user decision does this component improve? |
| Trigger | Why does it appear now? |
| Primary content | What is the minimum evidence required? |
| Action | What can the user change or decide? |
| Consequence | What state transition does the action create? |
| Continuation | What is the next natural piece of work? |
| Trust | What is sourced, inferred, stale, missing, or disputed? |
| Authority | Who may view or act, and under what identity? |
| Collaboration | Who can be assigned, consulted, or asked to decide? |
| Empty state | How does the component help when no data exists? |
| Failure state | How does it explain and recover from failure? |
| Accessibility | Can the meaning and action be understood without color, hover, or pointer precision? |
| Audit | What interaction or decision must be recorded? |

If these questions cannot be answered, the component should not be built.

## 14. Anti-patterns

Do not build:

- A generic dashboard of KPI cards
- An agent gallery without lifecycle, trust, ownership, or continuation
- Separate CRUD pages for prompts, tools, knowledge, tests, versions, and deployments
- A blank node canvas before intent and requirements are coherent
- A chat panel disconnected from structured contracts
- A test table disconnected from a rehearsal and trace
- Approval buttons without scope and consequence
- Architecture diagrams without a decision question, hierarchy, legend, and continuation
- Status pills that combine lifecycle, runtime, quality, evidence, and certification
- AI suggestions that conceal assumptions or appear already approved
- Navigation that requires users to remember identifiers or reconstruct causality

## 15. Design-validation protocol

Before implementation, each episode must pass five reviews.

### 1. Narrative review

Can a user explain why they arrived, what changed, what they decided, and what happens next?

### 2. Context-continuity review

Does service, version, cohort, environment, authority, and originating work persist across the episode?

### 3. Evidence review

Is every consequential statement sourced or explicitly labeled as inference, uncertainty, or missing evidence?

### 4. Authority review

Does the experience make decision rights, execution identity, permissions, and consequences explicit?

### 5. Usability rehearsal

Can a business owner, agent developer, domain expert, release authority, and operator complete their role in the Customer Escalation narrative without being taught the information architecture?

## 16. Implementation constraint

No new screen should be implemented merely because it appears in a feature inventory.

The next artifact must be an **experience contract and interactive wireflow for Intent → Trusted Draft**, including:

- Entry trigger and first-run state
- Definition Agent dialogue strategy
- Living Specification behavior
- Service sketch evolution
- Material-assumption review
- Collaboration and assignment
- Trust and provenance representation
- Empty, uncertain, conflicting, and recovery states
- Transition into composition

Only after that wireflow is validated should interface implementation resume.
