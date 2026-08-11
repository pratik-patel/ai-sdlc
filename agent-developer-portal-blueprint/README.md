# Agent Developer Portal Blueprint

This is a new product-planning project. It does not inherit the previous portal's navigation or screen model.

## Product thesis

The product is an **enterprise AI-SDLC control plane** that moves a capability from quality demand to justified value through executable intent, bounded implementation, independent verification and value realization. It composes approved agents, skills, context products, rules, hooks, connectors, tools, patterns, environments, proof systems and human decisions.

It is not primarily:

- A chat window for prompting one coding agent
- A drag-and-drop automation toy
- A flat agent marketplace
- A Backstage skin
- A collection of configuration forms
- A dashboard that begins after an agent already exists

## Primary entry point

The default delivery entry is **establish working context**. A returning user may resume active work directly. A user starting implementation selects or confirms a repository/service—often inferred from Jira, GitHub, Backstage, an IDE, or CLI—then verifies its Repository Delivery Profile before selecting the ticket and Delivery Harness.

The sequence is **context → work item → intent qualification → Delivery Harness → task Execution Blueprint → four-loop execution**. Product controls for agents, skills, MCPs, hooks, rules, models, and workflows appear contextually inside that journey. Non-code Intent work may begin from a product, service, system, or Context Product rather than a repository.

One versioned **Trusted Change Package** carries the capability through four connected control loops. A Delivery Thread is the active collaboration projection over that package:

```text
Intent → Implementation → Verification → Value Realization
```

The loop work catalog, capability registry and agent builder are supporting capabilities inside that journey—not competing home pages.

## Product surfaces

Global orientation is deliberately limited to three destinations:

1. **Work** — select or resume a working context, establish repository readiness, select work and a Delivery Harness, then execute or resume Trusted Change Packages and loop work items.
2. **Exchange** — discover, compare, publish, and provision reusable capabilities.
3. **Estate** — understand deployed agents, ownership, dependencies, policy exposure, cost, and outcomes.

Intent shaping, composition, execution, proof, approvals and value decisions occur inside the Capability Workbench. They are not global navigation items.

## Document sequence

1. `01_FEATURE_AND_CAPABILITY_MAP.md` — complete feature inventory, actors, entry points, canonical assets, catalog construction, and MVP boundary.
2. `02_FOUR_LOOP_DEVELOPER_JOURNEY.md` — four-loop Trusted Change journey, agent orchestration, human gates, inputs, outputs, and state transitions.
3. `03_EXPERIENCE_AND_SURFACE_CONTRACTS.md` — experience architecture, chat/canvas/source relationship, surface-level input-process-output contracts, and interaction rules.
4. `04_PLATFORM_AND_OSS_ADOPTION_ARCHITECTURE.md` — Backstage, open-source Agent Registry, Google Agent Registry concepts, A2A, MCP, Atlassian, and coding-runtime adapter decisions.
5. `05_DELIVERY_ROADMAP_AND_GATES.md` — implementation increments, architecture spikes, acceptance journeys, and build prohibitions.
6. `06_PLATFORM_ESTABLISHMENT_JOURNEY.md` — AI Delivery Steward entry, guided setup, Platform Blueprint, asset import and trust pipeline, build-versus-reuse boundary, and pilot readiness proof.
7. `07_STARTING_ARCHITECTURE_DECISION.md` — concrete starting point using Backstage, Agent Registry, Git, and a custom Trusted Change service; first asset boundary and explicitly deferred infrastructure.
8. `08_AI_SDLC_WORKBENCH_OPERATING_MODEL.md` — capability-centered four-loop product model, Trusted Change Package, front-of-portal work catalog, knowledge/context foundation, tool integration, and revised MVP.
9. `09_CONTEXT_CAPABILITY_AND_RUNTIME_COMPATIBILITY.md` — Context Fabric and Context Products, output contracts/templates, native and specialist agent families, GSD Core adoption, cross-runtime feature mapping, capability authoring, compilation, and provisioning.
10. `10_REPOSITORY_FIRST_WORK_ENTRY_AND_DELIVERY_HARNESS.md` — repository/context-first Work entry, Repository Delivery Profile, named Delivery Harnesses, nested orchestration builder, ticket execution, agent visibility, human decision taxonomy, and touchpoint-driven automation learning.
11. `11_ENTERPRISE_CAPABILITY_CATALOG_PREPARATION_JOURNEY.md` — Catalog Charter, internal/external discovery, primitive classification, canonical normalization, deduplication and extension families, quarantine, kind-specific evaluation, seed catalog curation, promotion, repository consumption, and lifecycle learning.
12. `12_MASTER_USER_JOURNEY_INVENTORY.md` — authoritative count of 15 primary journeys, grouped into five families, with actors, triggers, durable outputs, dependencies, variants, surface ownership, and the distinction between journeys and reusable subjourneys. Human decisions and exceptions are a shared workflow across all journeys.
13. `13_REPLIT_MASTER_BUILD_PROMPT_15_USER_JOURNEYS.md` — copy-pasteable React/TypeScript prototype specification for Replit covering the shared experience architecture, REST-backed data model, runtime simulations, chat/agent/human/notification/timeline/audit workflows, all 15 detailed user journeys, mandatory journey-by-journey review pauses, production-caliber UI standards, implementation increments, testing, and definition of done.

## Non-negotiable product decisions

- **One work model, three authoring modes:** conversation, visual orchestration, and source/manifest views edit the same underlying definition.
- **Catalog entries are governed revisions:** an agent, skill, hook, rule, MCP server, workflow pattern, or test pack cannot be “approved” without owner, version, provenance, compatibility, evidence, authority, and lifecycle state.
- **Reuse supports controlled specialization:** teams and repositories extend pinned base revisions through source-controlled overlays and bindings; they do not create untraceable copies, and they cannot weaken enterprise mandates.
- **Capability is not authority:** discovering or binding a tool does not grant permission to use it.
- **Guardrails have enforceable layers:** advice, runtime constraints, deterministic hooks, policy gates, and human decisions are represented separately.
- **Evidence is produced during work:** tests, evals, scans, reviews, tool receipts, approvals, and production/value observations remain linked to intent and the Trusted Change Package.
- **Runtime-neutral core:** Codex, Claude Code, Kiro, GitHub Copilot, Google ADK, and other runtimes are adapters. Product semantics do not collapse into any one vendor's file formats.
- **No screen-first implementation:** no surface is built until its entry trigger, input, transformation, decision, output, authority, failure behavior, and continuation are defined.
- **Context before command:** implementation work cannot start until repository/service context is ready or its limitations are explicitly accepted for the proposed work class.
- **Harness before autonomy:** agents do not execute a ticket from an ad-hoc collection of controls; a named Delivery Harness resolves into a reviewable, task-specific Execution Blueprint.

## Research basis

- Backstage provides a source-controlled software catalog, software templates, plugin integration, authentication, and permission framework. Its catalog metadata is commonly stored with source code and software created from templates can be registered automatically. [Backstage Software Catalog](https://backstage.io/docs/features/software-catalog/), [Create a Component](https://backstage.io/docs/getting-started/create-a-component/), [Permissions](https://backstage.io/docs/permissions/overview/)
- The Apache-2.0 `agentregistry-dev/agentregistry` project packages and curates MCP servers, agents, skills, and prompts, exposes CLI/API/UI discovery, supports deployment workflows, and can integrate with a gateway. [Agent Registry repository](https://github.com/agentregistry-dev/agentregistry)
- Google Cloud Agent Registry models agents, MCP servers, endpoints, skills, immutable skill revisions, publishers, bindings, resource identities, and runtime locations. This is a useful conceptual model, but it is a Google Cloud service rather than the portal foundation. [Google Agent Registry concepts](https://docs.cloud.google.com/agent-registry/concepts)
- A2A defines interoperable agent discovery, task collaboration, modalities, and security without requiring access to another agent's internals. [A2A specification](https://github.com/a2aproject/A2A/blob/main/docs/specification.md)
- MCP is the connection contract for tools and contextual data. Atlassian's Rovo MCP server already exposes permission-scoped Jira, Confluence, and Compass operations. [Atlassian Rovo MCP](https://support.atlassian.com/security-and-access-policies/docs/understand-atlassian-rovo-mcp-server/), [supported tools](https://support.atlassian.com/atlassian-rovo-mcp-server/docs/supported-tools/)
- Current coding-agent products expose overlapping primitives—project instructions, agents/subagents, skills, MCP connections, rules or steering, hooks, and execution permissions—but use different packaging. The portal therefore needs a canonical definition plus runtime compilers. [Official OpenAI documentation](https://developers.openai.com/), [Kiro documentation](https://kiro.dev/docs/), [GitHub Copilot customization](https://docs.github.com/en/copilot/reference/customization-cheat-sheet), [Claude Code MCP](https://docs.anthropic.com/en/docs/mcp)
- GSD Core demonstrates a canonical-capability-plus-runtime-adapter approach across multiple coding agents, durable context artifacts, fresh-context delegation, runtime manifests, converters, hooks, locks, and compatibility tests. It is an accelerator and fixture for the portal compiler, not the enterprise workflow/evidence core. [GSD Core](https://github.com/open-gsd/gsd-core)
