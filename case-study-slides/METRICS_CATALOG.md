# AI SDLC case-study metric catalog

This catalog supports the six enterprise case-study slides. Values remain unvalidated until the content owner confirms the definition, baseline, reporting period, comparison cohort, evidence system, and disclosure permission.

## Measurement structure

Each customer story should connect:

1. **Scale** — the size and complexity of the environment.
2. **Delivery change** — the improvement in flow, throughput, or time.
3. **Quality** — whether faster work reduced or increased rework and defects.
4. **AI contribution** — where AI materially affected the result.
5. **Economics** — the cost of each successful outcome.
6. **Control** — whether the work remained governed, traceable, and compliant.

Raw prompts, generated code, agent calls, and token volume are supporting diagnostics. They do not prove customer value without an outcome denominator.

## 7. Engineering harness for a complex environment

### Recommended customer metrics

| Metric | Definition |
|---|---|
| Engineering lead time | Time from an approved requirement to a verified, production-ready change. |
| Impact-analysis time | Engineering time required to identify affected applications, interfaces, data objects, and tests. |
| First-pass verification | Changes passing all required checks on the first attempt divided by total proposed changes. |
| Change rework | Completed changes requiring material redesign or correction divided by completed changes. |
| Escaped defects | Production defects attributable to released changes. |
| Dependency detection | Affected dependencies identified before implementation divided by all affected dependencies discovered. |
| Traceability coverage | Changes linked to the requirement, affected components, tests, approvals, and release evidence. |
| Cost per verified change | Labor, model, and platform cost divided by verified accepted changes. |

### Scale and complexity

- Lines of code, repositories, applications, languages, frameworks, services, and components.
- APIs, data interactions, databases, schemas, jobs, event streams, and external dependencies.
- Business rules, architecture patterns, test suites, and historical changes represented.

### Context-layer effectiveness

- Repository and application coverage.
- Dependency-map coverage and context freshness.
- Retrieval precision and recall.
- Responses supported by cited source evidence.
- Conflicting-source and missing-context detection.
- Context assembly time and manual supplementation rate.
- Business-rule and architecture-decision coverage.

### Harness and engineering outcomes

- AI actions executed through the harness.
- Policy pass rate, permission violations prevented, and approval turnaround.
- Tool-call failure, rollback success, evidence completeness, and architecture conformance.
- Requirement-to-code, code-to-test, and test-to-release time.
- Throughput, deployment frequency, build success, test coverage, change-failure rate, and mean time to restore.

### Best slide candidates

1. Lines of code and data interactions mapped.
2. Impact-analysis time.
3. Engineering lead-time reduction.
4. First-pass verification rate.
5. Rework reduction.
6. Escaped defect rate.

## 8. Coordinated transformation across technologies

### Recommended customer metrics

| Metric | Definition |
|---|---|
| End-to-end program lead time | Time from an approved business capability to production across every required system. |
| Cross-team blocked time | Time work remains blocked by another team, technology, decision, or dependency. |
| Dependency-related delay | Schedule delay caused by dependencies discovered after work begins. |
| Integrated release predictability | Multi-system releases delivered in the committed window divided by planned releases. |
| Integration defect rate | Defects caused by mismatches between systems, platforms, packages, interfaces, or data contracts. |
| Cross-stack first-pass success | Changes passing integrated testing without returning to an originating team. |
| Program rework | Engineering effort spent correcting work because another system or dependency changed. |
| Dependency resolution time | Time from dependency identification to implemented resolution. |

### Portfolio and coordination scale

- Products, programs, applications, packaged products, platforms, and technology stacks.
- APIs, integrations, data platforms, teams, vendors, regions, releases, and regulatory obligations.
- Cross-team dependencies, late-discovered dependencies, handoffs, blocked items, and handoff waiting time.
- Conflicting requirements, duplicated work avoided, and release changes caused by dependencies.

### Delivery, quality, AI, and economics

- Portfolio cycle time, throughput by stack, release frequency, schedule variance, and committed scope delivered.
- Integrated test pass rate, contract-test coverage, regression defects, data-reconciliation failures, production incidents, and rollbacks.
- AI-assisted dependency discoveries, accepted changes, accepted tests, accepted migration mappings, human correction, and time saved by work type.
- Cost per integrated capability, application, upgrade, milestone, and release; rework cost; dependency-delay cost; and AI cost per accepted deliverable.

### Best slide candidates

1. Programs, products, and teams coordinated.
2. End-to-end program lead-time reduction.
3. Cross-team blocked-time reduction.
4. Dependencies identified before implementation.
5. Integrated release predictability.
6. Integration defect reduction.

## 9. End-to-end AI delivery

### Recommended customer metrics

| Metric | Definition |
|---|---|
| Time to first release | Time from approved product concept to the first production portal. |
| Cycle time per portal | Time from starting a portal to production release. |
| Team leverage | Portals, features, or accepted changes delivered relative to team size. |
| Reuse rate | Components, patterns, requirements, tests, and deployment assets reused across portals. |
| Requirements traceability | Released requirements linked to design, implementation, tests, and release evidence. |
| Release quality | Escaped defects, production incidents, change failures, and rollbacks. |
| Product adoption | Active users and successful completion of the portal's core journeys. |
| Cost per portal | Total delivery cost divided by released and accepted portals. |

### Product, lifecycle, and business measures

- Portals committed, designed, in development, and released; users, journeys, features, and integrations delivered.
- Requirement gaps, late requirement changes, acceptance-criteria completeness, and requirement-to-test coverage.
- Design cycle time, reusable components, accessibility, usability success, and design-system adoption.
- Engineering cycle time, deployment frequency, build success, pull-request turnaround, rework, and technical debt.
- Automated test coverage, first-pass tests, escaped defects, regression time, security findings, and accessibility findings.
- Deployment success, mean time to restore, approval time, and production-readiness exceptions.
- Team size, role mix, external support, cost per feature, engineering hours, AI cost, and savings from reuse.
- Active users, completion and abandonment, transaction volume, support demand, satisfaction, revenue enabled, and operating cost avoided.

### Best slide candidates

1. Five portals in scope.
2. Portals released.
3. Time to first production release.
4. Cycle time for subsequent portals.
5. Team size versus the conventional estimate.
6. Reuse rate across portals.
7. Production quality or user adoption.

## 10. Enterprise adoption at scale

### Recommended customer metrics

| Metric | Definition |
|---|---|
| Sustained active users | Users performing qualifying work repeatedly over a defined period. |
| Active teams and programs | Teams and programs with sustained use, not simply tool access. |
| Workflow penetration | AI-assisted eligible work divided by all eligible work. |
| Time to proficiency | Time between enablement and a defined proficiency threshold. |
| Productivity improvement | Operational change in cycle time, throughput, accepted output, rework, or defects. |
| Cost per verified outcome | AI, enablement, support, and platform cost divided by verified outcomes. |
| Quality change | Difference between AI-assisted and comparison cohorts in defects, rework, failures, or corrections. |
| Governance exception rate | AI-assisted work requiring an exception to approved controls. |
| Use-case production rate | Assessed AI use cases progressing to sustained production use. |
| Enterprise value | Validated savings, capacity, revenue, or risk reduction attributable to the program. |

### Adoption and enablement

- Licensed, enabled, trained, weekly active, monthly active, sustained, and returning users.
- Adoption by role, business unit, geography, team, and program.
- Approved, production, abandoned, and graduated use cases.
- Training and assessment completion, time to first success, time to proficiency, support demand, community participation, and reusable-pattern adoption.

### Productivity and quality

- Cycle time, throughput, accepted output, review time, engineering lead time, requirements time, test creation, documentation, and incident resolution.
- First-pass acceptance, human correction, defects, escaped defects, change failures, reopened work, unsupported claims, citation accuracy, security, privacy, and intellectual-property exceptions.

### Token and model economics

- Input, output, cached, and reasoning tokens by model, tool, team, program, and workflow.
- Tokens per active user, accepted deliverable, and verified outcome.
- Cache-hit rate, context size, model routing, expensive-model share, retries, and failed-request cost.
- Model, platform, enablement, support, and governance spend.
- Cost per active user, sustained user, team, program, workflow, deliverable, verified outcome, and production use case.
- Savings from routing, caching, context optimization, avoided labor, and released capacity.

### Governance and operations

- Approved-tool usage, risk-assessed use cases, policy pass rate, governance exceptions, sensitive-data events, security incidents, audit findings, and evidence completeness.
- Human-approval compliance, time to approve a use case or model, observability coverage, service availability, latency, request failure, fallback rate, support staffing, and onboarding time.

### Best slide candidates

1. Enabled participants.
2. Sustained active users.
3. Active teams and programs.
4. Workflow penetration.
5. Time to proficiency.
6. Productivity improvement.
7. Quality or rework change.
8. Cost per verified outcome.

Token volume and model spend can appear as supporting callouts after validation. A large token number does not indicate success without a meaningful denominator.

## 11. AI-native eDiscovery delivery

The working case covers discovery, document review, redaction and production. Human specialists review exceptions and retain judgment over privileged, sensitive or uncertain material.

### Recommended customer metrics

| Metric | Definition |
|---|---|
| Review cost per document | Specialist, platform and model cost divided by accepted reviewed documents. |
| Review precision | Relevant documents correctly identified divided by documents marked relevant. |
| Human exception rate | Documents sent for specialist review divided by all processed documents. |
| Redaction accuracy | Approved redactions without material correction divided by reviewed redactions. |
| Defensible production | Produced documents with complete source, decision, approval and quality evidence. |
| Matter throughput | Accepted matters completed per specialist or hybrid pod in a defined period. |

### Workload, accuracy, and legal control

- Matters, documents, pages, sources, custodians, legal holds, file types and jurisdictions.
- Relevance and privilege precision, redaction accuracy, false negatives, sampling coverage and correction rates.
- Specialist exception volume and resolution time, accepted matters per pod, and queue time.
- Source-to-decision traceability, access controls, retention, audit completeness and defensible output.
- Specialist hours, review cost per document and matter, model cost per accepted document, and capacity released.

### Best slide candidates

1. Review cost reduction.
2. Review precision versus the agreed comparison.
3. Documents requiring specialist review.
4. End-to-end eDiscovery scope.
5. Defensible production and audit completeness.

## 12. Insurance policy servicing and customer service

### Recommended customer metrics

| Metric | Definition |
|---|---|
| Policy-query resolution improvement | Improvement in the agreed resolution measure for policy-servicing queries; establish whether it means time, first-contact resolution or successful answer rate. |
| Manual query handling | Share or volume of policy queries needing human handling in comparable periods. |
| Delivery-cycle improvement | Change in elapsed time from approved policy change to verified release. |
| Grounded-answer acceptance | Policy answers accepted by specialists with a valid source reference and no material correction. |
| Human escalation quality | Sensitive, ambiguous or low-confidence queries correctly routed to specialists. |
| Advisor registration throughput | Approved advisor registrations completed per period with the required controls. |
| Cost per resolved query | Service labor, model and platform cost divided by accepted query resolutions. |

### Best slide candidates

1. Policy-query resolution improvement.
2. Reduction in manual query handling.
3. AI-assisted delivery-cycle improvement.
4. Grounded-answer acceptance and escalation quality.
5. Advisor-registration cycle time and accuracy.

## Publication standard

Every published number must answer:

1. What exactly does the metric measure?
2. What was the baseline?
3. What is the comparison period?
4. Which teams, systems, and workflows are included?
5. Which system produced the evidence?
6. Does the organization permit disclosure?

Avoid using generated lines of code, prompts, agent calls, token volume, tool licenses, or training attendance as primary proof. They describe activity, not customer value.
