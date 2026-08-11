# Intent → Trusted Draft Experience Contract

**Experience ID:** AGX-01
**Status:** Required design gate before interface implementation
**Applies to:** New business intent, approved pattern adoption, and existing-agent import
**Governing strategy:** `AGENTGRID_EXPERIENCE_STRATEGY.md`

## 1. Experience promise

> Help a mixed business and technical team turn an initially ambiguous automation idea—or an opaque existing agent—into a shared, inspectable, evidence-aware draft contract without forcing them to understand the AgentGrid data model.

The user should feel that they are clarifying work with an intelligent product strategist and architect. They should not feel that they are filling out an agent-creation form or drawing a workflow before understanding the problem.

## 2. Episode boundary

### Begins when

One of the following becomes true:

- A person describes a business problem or repeatable task.
- Mission Control recommends an opportunity based on demand, friction, incidents, or duplicated work.
- A team chooses an approved pattern to adapt.
- A developer registers a repository, runtime endpoint, manifest, or external-platform agent.
- An enterprise architect discovers an unregistered agent that needs ownership and control.

### Ends when

The participants explicitly accept a **Trusted Draft** containing enough shared truth to begin composition or technical adoption.

### Does not end with

- A generic “agent created” confirmation
- A generated prompt
- A diagram with unnamed assumptions
- A completed form
- A runtime deployment
- A risk approval

The Trusted Draft is a versioned working agreement. It can still contain assigned gaps, but material uncertainty cannot be hidden.

## 3. Trusted Draft exit contract

A draft is trusted enough to leave the episode only when the following questions have explicit states.

| Contract dimension | Required understanding | Permitted exit state |
|---|---|---|
| Outcome | What should improve and how will it be observed? | Accepted or accepted with assigned measurement gap |
| Consumers | Who invokes, receives, or is affected by the work? | Accepted |
| Work boundary | What is in scope, out of scope, and transferred to a human? | Accepted |
| Trigger and completion | What starts the work and what counts as done? | Accepted |
| Evidence/context | What information is required and which sources may be authoritative? | Identified; source authorization may remain assigned |
| Judgment | Which decisions require reasoning, deterministic rules, or human expertise? | Identified |
| Actions | Which systems may be read or changed? | Identified; no write authority is silently approved |
| Human control | Where is approval, exception handling, or accountable judgment required? | Accepted or assigned to a named decision owner |
| Harm/counter-outcomes | What must not happen? | Accepted |
| Ownership | Who owns business outcome, technical behavior, domain meaning, and risk? | Named or explicitly unfilled and blocking |
| Initial requirements | What must be true before release? | Proposed and traceable to intent/evidence |
| Test obligations | Which scenarios, identities, cohorts, and boundaries must be rehearsed? | Proposed and reviewable |
| Implementation path | Native composition, template adaptation, or external implementation? | Selected |

## 4. Actors and responsibilities

### Primary human actors

| Actor | Contribution | Decisions they may own |
|---|---|---|
| Business sponsor/service owner | Outcome, consumers, acceptable operating scope, value | Outcome contract, initial business scope |
| Process/domain expert | Existing work, policy meaning, exceptions, authoritative evidence | Domain expectations and boundary behavior |
| Technical owner/agent developer | Feasibility, implementation pattern, dependencies, observability | Technical draft and implementation path |
| Data/knowledge owner | Source authority, access, freshness, quality, residency | Knowledge/data binding authorization |
| Tool/system owner | Operations, credentials, constraints, recovery | Tool/action availability and execution contract |
| Risk/control owner | Applicable policy, control expectations, review requirements | Control interpretation and risk-review path |

One person may hold multiple roles in a prototype, but the responsibilities remain distinct.

### Native assistive agents

#### Definition Agent

Owns the conversation strategy and draft synthesis.

It may:

- Summarize and structure user statements.
- Propose outcome, scope, requirement, and scenario clauses.
- Identify ambiguity, contradiction, and missing ownership.
- Ask the next most material question.
- Recommend collaborators or evidence.

It may not:

- Approve data access, actions, risk, or release.
- Present inferred material clauses as accepted facts.
- Assign a person without confirmation.
- conceal uncertainty to improve apparent completeness.

#### Architecture Agent

Progressively proposes a service sketch after the work contract is sufficiently coherent.

#### Integration Scout

Suggests candidate knowledge sources and actions only when a clear need exists.

#### Governance Agent

Identifies likely control obligations and decision owners. Its output is advisory until a control owner accepts it.

#### Test Designer

Translates outcome, boundary, harm, authority, and cohort clauses into initial rehearsal obligations.

## 5. Persistent objects created during the episode

### 5.1 Work Thread

Records:

- Originating problem, opportunity, template, or import
- Participants and roles
- Conversation and accepted decisions
- Evidence consulted
- Assigned questions
- Consequence of unresolved material gaps
- Natural continuation into composition

### 5.2 Living Specification

The specification is composed of addressable clauses rather than form fields.

Clause families:

- Outcome
- Consumer/cohort
- Trigger
- Completion
- Scope and transfer
- Evidence/context need
- Judgment/responsibility
- Tool/action need
- Authority/human control
- Harm/counter-metric
- Ownership
- Requirement
- Rehearsal obligation

### 5.3 Service Sketch

A low-commitment relationship model showing emerging responsibility:

```text
Demand → determine eligibility → assemble evidence → make judgment
       → obtain human authority → act → communicate → observe outcome
```

It avoids implementation-specific nodes until the underlying responsibility is understood.

### 5.4 Decision Ledger

Every material clause records:

- Who stated or proposed it
- Evidence/source
- Acceptance state
- Who may decide it
- Conditions or expiry
- Related requirements and risks
- Change history

### 5.5 Gap Set

Unresolved items are typed:

- Missing information
- Missing evidence
- Missing owner
- Contested interpretation
- Authority decision required
- Integration feasibility unknown
- Testability unknown
- Deferred non-material detail

The type determines the continuation. A missing owner is not treated like a missing document.

## 6. Clause state and trust model

Every material clause carries two independent states.

### Epistemic state

| State | Meaning |
|---|---|
| Sourced | Directly supported by an identified source |
| Stated | Asserted by a participant but not externally verified |
| Inferred | Proposed by an assistive agent from available context |
| Conflicted | Contradicted by another statement or source |
| Unknown | Necessary understanding is absent |
| Stale | Supporting evidence may no longer be current |

### Decision state

| State | Meaning |
|---|---|
| Proposed | Available for review |
| Accepted as draft | Approved for the current draft, not as final authority |
| Assigned | A named participant must supply or decide it |
| Contested | Participants disagree or authoritative evidence conflicts |
| Deferred | Deliberately postponed because it is not material to the current transition |
| Superseded | Replaced while retaining lineage |

“Accepted as draft” must never visually imply certification, approval, or production authorization.

## 7. Conversation strategy

### 7.1 Next-question selection

The Definition Agent chooses the next question using:

```text
priority = materiality × uncertainty × downstream impact × current answerability
```

It should ask the question that most reduces the risk of building the wrong service—not the next field in a schema.

### 7.2 Question hierarchy

The usual order is:

1. Outcome and affected people
2. Existing work and boundary
3. Trigger and completion
4. Evidence and judgment
5. Actions and human control
6. Harm and counter-outcomes
7. Ownership
8. Initial requirements and rehearsals
9. Implementation path

The order changes when imported evidence already answers part of the contract.

### 7.3 Question forms

#### Generative question

Used when the participant’s mental model matters.

> “What should be different for the customer or specialist when this work succeeds?”

#### Boundary question

Used to define in/out/transfer behavior.

> “Which escalations should never be resolved without a specialist?”

#### Consequence question

Used to expose risk or importance.

> “What is the consequence if the service selects a globally valid but regionally outdated policy?”

#### Authority question

Used when the proposed service may change another system or affect people.

> “May the service issue a credit after approval, or only prepare a recommendation?”

#### Evidence question

Used to locate authoritative truth.

> “Who owns the interpretation when regional and global policies conflict?”

#### Confirmation proposition

Used when the system can make a transparent, reviewable synthesis.

> “I have represented Canada as recommendation-only until regional-policy coverage is proven. Accept this as the draft boundary?”

### 7.4 Conversation pacing

- Ask one material question at a time.
- Allow the user to inspect or edit emerging clauses between turns.
- Summarize only when the model changed materially.
- Do not repeat accepted information.
- Surface a collaborator or source request at the moment it becomes necessary.
- Let experienced users directly edit a clause or sketch; the Definition Agent reconciles the change conversationally.

## 8. Progressive transformation model

The experience evolves through seven states. These are not pages or wizard steps.

### State 0 — Oriented beginning

The product knows:

- Why the user arrived
- Whether this is new intent, reuse, or import
- The user’s likely role and recent context

The user sees:

- A concise restatement of the trigger
- Three relevant starting moves
- Existing related work when confidently matched

The system avoids:

- Empty dashboard
- Template gallery before intent
- Long intake form
- Premature naming of an agent

### State 1 — Outcome framed

The product materializes:

- Outcome proposition
- Affected consumers
- Initial counter-outcomes
- Current baseline evidence if available

The service sketch shows only demand and outcome. It does not fabricate steps.

### State 2 — Work boundary revealed

The product materializes:

- Trigger
- Existing process
- In-scope work
- Transfers and exceptions
- Completion definition

The sketch gains responsibility segments.

### State 3 — Evidence and judgment exposed

The product materializes:

- Required business evidence
- Candidate authoritative sources
- Decisions made by rules, agents, or humans
- Conflict and uncertainty behavior

The sketch distinguishes evidence assembly from judgment.

### State 4 — Authority bounded

The product materializes:

- Read and write needs
- Execution identity alternatives
- Human approval boundary
- Consequential operations
- Failure, retry, and compensation expectations

No authority becomes active; the draft captures requested authority and decision owners.

### State 5 — Fitness made testable

The product materializes:

- Initial requirements
- Representative and boundary cohorts
- Forbidden outcomes
- Expected tool trajectories
- Outcome/SLO obligations

The Test Designer proposes rehearsal obligations alongside their source clauses.

### State 6 — Trusted Draft committed

The participants see a decision briefing:

- What has been accepted
- What is sourced versus inferred
- What remains assigned or contested
- Why remaining gaps do or do not block composition
- What the first composition/rehearsal work will be

Committing creates Draft v0.1 and a decision receipt. It does not deploy or certify anything.

## 9. Entry-path behavior

### 9.1 Describe the work

Initial input may be one sentence, a pasted problem statement, a Jira issue, or spoken text.

The system first reflects intent and consequence, not a generated workflow.

### 9.2 Begin from an approved pattern

Patterns appear only after the user expresses enough intent to rank relevance.

A pattern explains:

- Which outcome/work shape it fits
- What it includes
- What the organization has already approved
- What must still be decided for this use case
- Evidence/test packs it can contribute

Adopting a pattern populates proposed clauses with provenance. It does not mark them accepted.

### 9.3 Bring an existing agent

The user can supply:

- Repository or package
- Runtime endpoint
- Manifest
- Platform connection
- Agent card
- Representative traces

The import process first reconstructs observed behavior and metadata. The Definition Agent then asks business questions the implementation cannot answer:

- What outcome is this accountable for?
- Who owns it?
- Who is affected?
- What authority is intended versus merely technically possible?
- Which behavior is contractual versus incidental?

The UI distinguishes **observed implementation fact** from **declared business intent**.

## 10. Material-assumption protocol

An assistive agent may create a material proposition only when it can show:

- The evidence or statements used
- The reasoning category, not hidden chain-of-thought
- What would change if accepted
- The appropriate human decision role
- A revision path

Available actions:

- Accept as draft
- Revise directly
- Discuss with Definition Agent
- Connect evidence
- Assign a decision
- Mark contested
- Defer with consequence

There is no undifferentiated “Apply all AI suggestions.”

## 11. Collaboration model

### Synchronous collaboration

Participants may join the same Work Thread. The experience indicates:

- Who is present
- Which clause they are reviewing
- Role-relevant decision rights
- Pending proposed changes

Only one accepted version of a clause exists at a time; alternative proposals retain authorship.

### Asynchronous contribution

The user assigns an exact question, not the entire draft.

An assignment includes:

- Clause or gap
- Why this person/role is needed
- Evidence already available
- Decision or contribution requested
- Consequence and time horizon

The recipient enters directly into that context and can respond, propose evidence, or identify the correct owner.

### Conflict

When participants disagree, the product preserves both claims, sources, roles, and consequence. It does not merge them into vague text.

Resolution paths:

- Identify authoritative source
- Ask accountable decision owner
- Narrow scope to avoid the contested condition
- Create explicit conditional behavior
- Mark blocking for composition

## 12. Recovery and revision

### Misunderstood intent

The user can revise a clause or tell the Definition Agent what was misunderstood. The system previews affected clauses, sketch relationships, requirements, and assignments before applying the revision.

### Over-scoped proposal

The experience offers boundary reduction:

> “This draft spans policy interpretation, financial authority, and customer communication. Would you like to establish a recommendation-only first release?”

This proposal explains reduced value and risk.

### Unsupported source or action

The Integration Scout marks feasibility unknown and offers:

- Request an integration assessment
- Choose an already approved alternative
- Define a manual handoff
- Retain as a blocking dependency

### Abandon or pause

The Work Thread retains the last accepted clause version, unresolved gaps, origin, and participants. Resumption explains what changed while the work was paused, including source or policy drift.

### Undo

Every material acceptance or revision can be superseded through an explicit new decision. Audit history is not destructively removed.

## 13. Customer Escalation example choreography

### Initial statement

> “We want an agent that resolves customer escalations faster and can issue credits.”

### Definition Agent response

The response should not generate a complete workflow. It should reflect the goal and expose the first consequential ambiguity:

> “You want to reduce escalation resolution time, with possible financial action. Before proposing behavior, which cases should the service resolve and which must remain with a specialist?”

### Emerging contract after turn 1

```text
Outcome — reduce eligible escalation resolution time [stated / proposed]
Action need — issue account credit [stated / authority unresolved]
Scope — unknown [blocking]
Consumers — unknown
Counter-outcome — unauthorized financial action [inferred / proposed]
```

### Boundary answer

> “Subscription cancellations and refund disputes. Suspected fraud, legal threats, or cases without enough account evidence must transfer.”

### Transformation

- Trigger: escalated cancellation/refund case
- In scope: eligible cancellation and refund disputes
- Transfer: fraud, legal, insufficient evidence
- Proposed requirement: scope and transfer must be determined before recommendation
- Proposed rehearsal obligations: fraud flag, legal language, missing account history

### Evidence question

> “Which sources determine the correct remedy, especially when product or regional policies differ?”

### Evidence answer

> “The support case, account history, and current resolution policy. Regional policy takes precedence.”

### Material proposition

> “Applicable policy will be resolved by jurisdiction and effective date before global ranking. Priya Singh is proposed as domain owner for policy interpretation. Accept, revise, or assign?”

### Authority answer

> “The agent can recommend any eligible remedy, but credits over $50 require Finance approval.”

### Emerging Authority Envelope

- Read case/account/policy under invoking specialist identity
- Recommend remedy
- Prepare credit action
- Execute ≤$50 only if delegated authority is explicitly confirmed, otherwise approval required
- Execute >$50 only with current Finance approval
- No autonomous action for fraud/legal/transferred cases

The product should challenge whether ≤$50 execution is genuinely intended and authorized; it must not treat the statement as approval.

### Trusted Draft briefing

The final briefing explains:

- Accepted business outcome and boundary
- Proposed service narrative
- Requested knowledge and actions
- Human authority model
- Initial representative/boundary cohorts
- Named owners
- Assigned policy-source and action-feasibility gaps
- Why composition may begin while production authority remains unavailable

## 14. Event and audit contract

Important domain events:

- `IntentCaptured`
- `ClauseProposed`
- `ClauseAcceptedAsDraft`
- `ClauseRevised`
- `ClauseContested`
- `GapIdentified`
- `ContributionRequested`
- `EvidenceLinked`
- `PatternAdopted`
- `ExistingAgentObserved`
- `AuthorityNeedDeclared`
- `RehearsalObligationProposed`
- `TrustedDraftCommitted`
- `DraftReopened`

Every event includes actor, role, timestamp, source context, affected clauses, and originating Work Thread.

## 15. Privacy, security, and trust

- Conversation attachments inherit source permissions and retention rules.
- Sensitive content is masked when a participant lacks access.
- The Definition Agent cannot expose source content merely because another participant used it.
- Imported repositories and traces are scanned/classified before broad visibility.
- Assistive-agent suggestions show provenance and are never labeled as human decisions.
- Identity is explicit for both the participant and any system action.
- The product records when a clause was accepted without authoritative evidence.

## 16. Accessibility and inclusive interaction

- Clause and decision states use text and shape, not color alone.
- Conversation, clauses, gaps, and sketch relationships are navigable by keyboard in a logical order.
- The service sketch has an equivalent structured narrative.
- New material propositions are announced without stealing focus.
- Users can reduce motion and disable animated sketch transformations.
- Direct clause editing does not require drag-and-drop.
- Assignment and decision actions have explicit accessible names describing consequence.
- Reading order remains conversation → changed contract → consequence → available action.

## 17. Success measures

### Comprehension

- Participants can explain outcome, scope, authority, and unresolved gaps without facilitator translation.
- Users distinguish inferred, stated, sourced, and accepted clauses.

### Efficiency

- The experience asks fewer but more material questions than a complete intake form.
- Users do not re-enter information already present in sources or imports.

### Quality

- Material assumptions are explicitly reviewed.
- Draft requirements and rehearsal obligations trace back to business intent, harm, or authority.
- Existing-agent imports distinguish observed capability from intended authorization.

### Continuity

- Users resume without reconstructing context.
- Assignments open directly into the relevant clause and consequence.
- Composition begins with the same Work Thread, Living Specification, Service Sketch, and gaps.

## 18. Validation scenarios

The experience design must be tested with:

1. Business owner with a vague desired outcome
2. Domain expert challenging an inferred policy rule
3. Developer importing an existing repository/runtime
4. Risk owner refusing proposed autonomous authority
5. Data owner identifying a permission/freshness constraint
6. Two participants proposing conflicting boundaries
7. User pausing and resuming after source changes
8. Keyboard-only participant completing clause review and assignment
9. Participant without permission to view one linked source
10. Expert user directly editing the service sketch and reconciling it with the contract

## 19. Implementation prohibition

Do not implement AGX-01 until:

- The primary and alternate wireflows are reviewed.
- Every component in the companion wireflow has an interaction contract.
- The Customer Escalation choreography is prototyped with realistic content.
- At least one business owner, developer, domain expert, and control owner can explain the Trusted Draft without navigation coaching.
