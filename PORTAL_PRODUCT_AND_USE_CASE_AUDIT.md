# AgentGrid Portal Product and Use-Case Audit

**Audit date:** August 11, 2026
**Scope:** Running portal, product concept, portal architecture map, service blueprint, domain model, Glean research, and comparable enterprise agent platforms

## 1. Executive verdict

The current portal is a credible **assurance, operations, and governance vertical slice for one agent-enabled business service**. It is not yet a coherent enterprise agent platform, agent catalog, developer portal, or complete agent lifecycle product.

The central product promise is:

> Register or define an agent, connect enterprise context and actions, test it, release it, operate it, and continuously improve it from production evidence.

The portal currently begins near the **assurance/release decision** and ends at **incident-to-regression evidence**. It does not show how a user gets to that point.

```text
Missing today                                      Implemented today

Idea / requirement                                Assurance case
  → create or import agent                          → live outcome
  → catalog registration                            → incident
  → define outcome and behavior                     → regression evidence
  → connect knowledge and actions
  → configure implementation/runtime
  → build test data and run evaluations
  → prepare release
```

The result is exactly the confusion observed in the review:

- There is no obvious system entry for creating, importing, or discovering agents.
- “Portfolio” is presented before the user understands what is in the portfolio.
- The architecture map lacks a clear hierarchy from product and business process to service, agent, repository, and deployment.
- Assurance looks like submission control because the design and test work that produced the evidence is absent.
- Operations and Governance have useful meaning only after an agent catalog and lifecycle exist.
- The current customer-escalation example is loaded as a finished fixture rather than built through the product.

## 2. What the running portal actually contains

| Workspace or route | Implemented representation | Working user action | Product role |
|---|---|---|---|
| `#/mission-control` | Consequence-ranked work queue | Open evidence, blueprint, architecture, incident, or governance context | Personal work coordination |
| `#/portfolio?lens=outcomes` | Capability/process/service outcome map | Compare current and target outcomes and enter the modeled service | Cross-service business view |
| `#/portfolio?lens=architecture` | Data/platform/service/action topology | Inspect a dependency and trace its incident or blueprint impact | Enterprise architecture view |
| `#/services/.../blueprint` | Four-band service blueprint | Inspect a component contract and continue to assurance or incident | Design documentation, not yet a builder |
| `#/services/.../assurance` | Claims and cohort coverage matrix | Request domain evidence | Release fitness and evidence review |
| `#/services/.../live` | Outcome trend, demand funnel, SLOs, findings | Enter the incident or challenged claim | Live-service understanding |
| `#/operations` | Outcome-ordered fleet list and active incident | Manage restoration or trace dependency impact | Cross-service operations |
| `#/governance` | Control-effectiveness table | Trace a control failure to incident or architecture | Control oversight |
| `#/incidents/...` | Impact, timeline, run evidence, exit conditions | Create regression evidence | Incident learning loop |

All nine routes render and the two implemented commands work. The issue is product coverage, not route stability.

## 3. Use cases implemented versus promised

### Status key

- **Implemented:** usable in the running prototype
- **Partial:** represented, but the user cannot complete the real workflow
- **Missing:** no entry point or working flow

| Use case | Intended entry point | Current entry point | Status | Audit finding |
|---|---|---|---|---|
| Prioritize assigned work | Home / Mission Control | Mission Control | Implemented | Strongest portal entry today |
| Discover available agents | Agents catalog, search, favorites | None | Missing | Portfolio is not a substitute for a catalog |
| Start a new agent from intent | Home, Agents, recommendation, template | None | Missing | No create action, definition chat, or readiness flow |
| Import an existing agent | Agents catalog or developer entry | None | Missing | No endpoint, repository, manifest, runtime, or platform registration |
| Define business outcome and requirements | New-agent definition flow | Fixture-only service dossier | Missing | Outcome exists in JSON but cannot be authored |
| Design behavior and workflow | Agent Workspace → Design | Blueprint | Partial | Blueprint is inspectable but not editable or executable |
| Connect knowledge sources | Design contextual insert | Blueprint text only | Missing | No source discovery, connector binding, permission preview, or freshness contract |
| Connect tools and actions | Design contextual insert | Blueprint text only | Missing | No OpenAPI/MCP/action registration or credential model |
| Configure models and memory | Agent settings or component inspector | None | Missing | No model, prompt, memory, temperature, or runtime configuration |
| Configure human approval and authority | Design and Control | Blueprint/Assurance text | Partial | Authority is visible, not configurable or simulated |
| Interactive playground/chat test | Agent Workspace → Test | None | Missing | Assurance is not a playground |
| Maintain test cases and datasets | Agent Workspace → Test | CSV fixtures outside UI | Missing | No dataset ownership, versioning, provenance, or editing |
| Run evaluation suites | Test or CI | Assurance matrix with static values | Partial | Evidence is shown but cannot be generated or rerun |
| Compare candidate and production | Test/Release | Assurance copy | Partial | No executable version comparison |
| Review release readiness | Assigned work or Agent Workspace → Release | Assurance | Partial | Claims and gaps work; rollout and release actions do not |
| Deploy or publish an agent | Release | None | Missing | No runtime adapter, publication channel, environment, or rollback |
| Observe outcomes and SLOs | Operations or Agent Workspace → Improve | Live Service / Operations | Implemented | Strong static prototype |
| Investigate a production failure | Alert, Operations, Improve | Mission Control, Live Service, Operations | Implemented | Coherent incident flow |
| Convert failure to regression evidence | Incident trace | Incident | Implemented | Best closed-loop differentiator in current build |
| Govern control effectiveness | Control | Governance | Partial | Inspectable controls, but no policy authoring, exception, certification, pause, or retire action |
| Govern the agent estate | Control and Agents | Governance/Portfolio | Missing | No actual agent inventory, duplication, ownership, lifecycle, or external-agent coverage |

## 4. Direct answers to the review questions

### What agents are being used in the current portal?

The current data fixture models only one explicit component with `type: "agent"`:

- **Recommend resolution** (`cmp_recommend`) — proposes a policy-compliant remedy, rationale, customer draft, and confidence.

The rest of the customer-escalation blueprint contains triggers, validation, context retrieval, human approval, actions, outputs, and outcome observation. Those are service components, not separately registered agents.

There is no implemented multi-agent team, agent registry, sub-agent catalog, or runtime binding. The portal title says AgentGrid, but the current product data is primarily a **business-service blueprint and assurance case**.

### How are those agents configured initially?

They are not configured through the UI. The example is authored directly in:

- `data/product-model.json`
- `data/outcome-observations.csv`
- `data/incident-timeline.csv`
- `data/runs.csv`

The browser receives use-case projections from the local REST service. There is no create, edit, import, save, version, or publish workflow.

### Is there a chat panel for defining or creating agents?

No. The current portal has no builder chat, definition assistant, playground, or end-user agent conversation.

The target product needs chat in two different contexts:

1. **Definition chat:** turns business intent into a structured agent-service specification.
2. **Test/playground chat:** invokes a draft version using controlled identities, data, and tools and exposes the trace beside the conversation.

Chat should not become a generic global panel. It belongs inside Define/Build and Test.

### Where are the agents loaded?

Today: static local fixtures.
Target: a first-class Agent Registry populated through:

- Native AgentGrid builder publication
- Repository/manifest registration
- Runtime endpoint registration
- SDK instrumentation and trace discovery
- Platform adapters for Glean, Copilot Studio, Agentforce, ServiceNow, Google ADK, LangGraph, OpenAI Agents SDK, and other runtimes
- A2A agent cards and MCP/OpenAPI metadata where available

### How is the agent catalog viewed?

It is not implemented. The current Portfolio outcome map shows agent-enabled services, but it does not answer the basic catalog question: “Which agents exist?”

The target navigation should restore **Agents** as the understandable global destination. Its default view should be a searchable, permission-aware catalog. Portfolio and architecture become secondary lenses inside Agents—not the first and only representation.

### Is AgentGrid a developer portal?

Conceptually yes; currently no.

A real developer mode must support:

- Register repository, runtime, endpoint, framework, and owner
- Download or validate an AgentGrid manifest
- Register prompts, models, knowledge bindings, tools, policies, and versions
- Generate SDK/API credentials and webhook subscriptions
- Run local/sandbox traces
- Upload or synchronize evaluation datasets
- Invoke evaluations from CI
- Compare builds and enforce release gates
- Publish trace and deployment events back to the control plane
- Use MCP, OpenAPI, A2A, and OpenTelemetry adapters

These should appear inside the same Agent Workspace used by business and control users, with a developer mode for implementation detail.

### Is AgentGrid a test portal?

Conceptually yes; currently only the assurance result is shown.

The missing Test workspace must include:

- Interactive playground
- Draft versus production version selection
- Representative user/role and permission simulation
- Test-data selection
- Trace, source, model, tool, policy, cost, and latency inspection
- Saved scenarios and versioned datasets
- Evaluation suite execution
- Security, permissions, adversarial, and action-safety tests
- Failure-to-design navigation
- CI run history and release-gate results

Assurance consumes test evidence. It should not be the place where all tests are authored and debugged.

### What does Portfolio mean?

Portfolio is intended to model the enterprise hierarchy:

```text
Enterprise portfolio
  → business domain
    → business capability
      → business process or journey
        → agent-enabled business service
          → agent and deterministic components
            → implementations, repositories, runtimes, versions, deployments
```

In the fixture:

```text
Northstar Labs
  → Customer Operations
    → Issue resolution
      → Escalation resolution
        → Customer escalation service
          → Recommend resolution agent component
```

The current architecture map is a dependency topology for the **Customer escalation service**, showing policy data, account/case data, model gateway, related services, and consequential actions. It is not a repository map, product-feature map, or source-code architecture map.

The portal does not explain this hierarchy, and it does not show repository/runtime/deployment layers. Therefore the visual appears arbitrary. Portfolio must become an optional enterprise lens reached after catalog comprehension.

## 5. Root-cause assessment

The product strategy originally made the right distinction:

> AgentGrid should register, test, release, govern, and observe agents built anywhere.

The later architecture reset correctly strengthened business-service context, but it overcorrected in three ways:

1. **The primary object changed from agent to service without preserving agent discoverability.**
2. **The lifecycle stepper was reduced from Overview/Design/Test/Release/Improve to Blueprint/Assurance/Live Service.**
3. **The prototype started with a prebuilt operational scenario instead of demonstrating how the scenario enters the system.**

The correction is not to abandon service architecture. It is to put it around a visible agent registry and lifecycle.

## 6. What current market products make obvious

### Glean

Glean provides an explicit Agent Library, two creation paths (natural language or scratch), visual trigger/step/action/flow construction, preview/debug, permissions and publication, connector-backed enterprise context, and developer APIs/SDKs. Its library is directly accessible from Agents navigation, and agents may publish to Slack, API, or embeds. See [Agent Library](https://docs.glean.com/agents/concepts/agent-library), [Agent Builder](https://docs.glean.com/agents/concepts/agent-builder), [How Agents Work](https://docs.glean.com/agents/how-agents-work), [Sharing and Permissions](https://docs.glean.com/agents/concepts/sharing-permissions), and the [Developer Platform](https://developers.glean.com/).

Glean also makes a crucial architectural distinction: **connectors index permission-aware content; actions perform live reads or writes**. See [Actions overview](https://docs.glean.com/actions/actions-overview).

### Ema

Interpreting “Eva” in the review as **Ema.ai**, Ema presents an AI Employee lifecycle—create, configure, deploy, monitor—and an explicit specialized-agent catalog within a unified builder canvas. See [AI Employees](https://builder.ema.ai/core-concepts/ai-employees), [Platform Tour](https://builder.ema.ai/introduction/platform-tour), and [Agent Reference](https://builder.ema.ai/agent-reference).

### Moveworks

Moveworks makes “idea to plugin” explicit through Agent Architect, a low-code Agent Studio, Mock Agents, developer documentation, testing/error-handling guidance, and an installable Agent Marketplace. See [Agent Studio](https://www.moveworks.com/us/en/platform/ai-agent-builder), [Developer Portal](https://www.moveworks.com/us/en/developers), and [Agent Studio Overview](https://docs.moveworks.com/agent-studio/overview).

### Microsoft Copilot Studio

Copilot Studio’s Build surface combines agent instructions with knowledge, tools, connected agents, memory, model choice, preview, and tests. It also provides repeatable test sets and evaluations. See [Build an agent](https://learn.microsoft.com/en-us/microsoft-copilot-studio/agents-experience/build-overview) and [Agent evaluation](https://learn.microsoft.com/en-us/microsoft-copilot-studio/analytics-agent-evaluation-intro).

### Salesforce Agentforce

Agentforce Testing Center generates or imports scenarios and evaluates response quality, sub-agent recognition, action execution, and knowledge retrieval. Salesforce explicitly warns that tests can modify CRM data and should run in a sandbox. See [Agentforce Testing Center](https://help.salesforce.com/s/articleView?id=ai.agent_testing_center.htm&language=en_US&type=5).

### ServiceNow

ServiceNow separates AI Agent Studio (build/test/deploy) from AI Control Tower (discover/govern/measure native and third-party assets). Its testing experience includes manual chat, automated evaluation, versions, ACL validation, orchestration visibility, and decision logs. See [AI Agent Studio](https://www.servicenow.com/docs/r/intelligent-experiences/ai-agent-studio.html), [manual agent testing](https://www.servicenow.com/docs/r/intelligent-experiences/test-ai-agent.html), and [AI Control Tower](https://newsroom.servicenow.com/press-releases/details/2026/ServiceNow-expands-AI-Control-Tower-to-discover-observe-govern-secure-and-measure-AI-deployed-across-any-system-in-the-enterprise/default.aspx).

## 7. Benchmark conclusion

AgentGrid should not copy Glean’s search platform, Moveworks’ plugin marketplace, or ServiceNow’s workflow estate. Its differentiated product should be:

> The framework-independent agent engineering and control plane that turns business requirements, agent specifications, tests, release evidence, production traces, and business outcomes into one continuous lifecycle.

That differentiation is valuable only if the product first implements the missing front half: **Catalog → Define/Import → Build/Connect → Test → Release**.

## 8. Final audit disposition

| Area | Disposition |
|---|---|
| Mission Control | Keep and extend with create/import/review continuations |
| Portfolio Outcomes | Keep as a secondary Catalog lens; explain the hierarchy |
| Portfolio Architecture | Keep as service dependency lens; add legend and implementation layers |
| Service Dossier | Keep as stable lifecycle header |
| Blueprint | Evolve from read-only diagram into Build workspace |
| Assurance | Keep as Release evidence view; do not treat as Test workspace |
| Live Service | Keep and connect to versions, catalog, traces, and test coverage |
| Operations | Keep; populate from registered agents and runtimes |
| Governance | Keep; add agent inventory, policy, exception, certification, pause, and retire workflows |
| Agent discovery and adoption | Design as an experience episode, then implement |
| Definition/Import | Design Intent → Trusted Draft first |
| Builder conversation and composition | Design as one coordinated experience, not separate screens |
| Rehearsal and evidence management | Design as synchronized behavior/evidence exploration |
| Developer portal mode | Embed technical depth into the same lifecycle experience |
