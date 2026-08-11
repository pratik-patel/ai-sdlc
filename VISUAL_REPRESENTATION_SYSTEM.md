# AgentGrid Visual and Representation System

## 1. Experience character

AgentGrid should feel like an enterprise operating instrument:

- Calm under complexity
- Precise rather than decorative
- Evidence-led
- Architecturally literate
- Dense where comparison requires density
- Restrained where judgment requires focus

It should not resemble a marketing analytics dashboard, generic admin template, or collection of rounded cards.

## 2. Global composition

### Application frame

- Horizontal global header with wordmark, four workspaces, search, assigned-work indicator, and identity
- No permanent wide sidebar
- Contextual breadcrumb and service identity beneath the global header
- Full-width work area for maps, matrices, and timelines

### Why horizontal navigation

Four stable workspaces fit without nesting. The horizontal frame gives the enterprise representations more width and avoids visually suggesting a long admin menu.

## 3. Workspace composition

### Mission Control

Two-column master/detail layout:

- Responsibility queue: approximately 38%
- Selected decision context: approximately 62%

No KPI row.

### Portfolio

- Slim capability or lens rail
- Dominant relationship map or shared-scale comparison
- Single selected-item summary

### Service Studio

- Persistent Dossier strip
- Three mode labels: Blueprint, Assurance, Live Service
- Dominant canvas plus contextual contract/evidence inspector

### Operations and Governance

- Dominant topology or matrix
- Secondary queue only when it directly controls selection
- No grid of unrelated mini charts

## 4. Visual grammar

### Surfaces

- Warm neutral application background
- White or near-white working surface only when a boundary matters
- Fine rules instead of floating shadows
- Small radii; no pill-shaped containers except compact state tokens
- Avoid nesting cards inside cards

### Typography

- Humanist or grotesk sans for interface
- Strong numeric alignment for measures
- Modest headline scale
- Use weight and whitespace before color
- Uppercase reserved for compact technical labels, never whole headings

### Color semantics

- Deep ink/navy: primary structure and selected context
- Cobalt: navigational focus and authorized primary action
- Teal: verified evidence or healthy operating relation
- Amber: uncertainty, pending evidence, or constrained state
- Red: breached control, harmful impact, or failed transition
- Violet: governance/decision lineage where category identity is needed
- Neutral gray: inactive, historical, or supporting structure

Color never carries meaning alone.

## 5. Representation selection

| Relationship | Representation |
|---|---|
| Responsibility and next action | Prioritized master/detail queue |
| Capability → process → service → outcome | Hierarchical relationship map with shared measure axis |
| Service → dependency | Typed topology |
| Trigger → context → action → human → outcome | Structured service blueprint |
| Requirement × cohort × evidence | Coverage matrix |
| Change and incident causality | Timeline with correlated events |
| Outcome/SLO behavior | Shared time axis with baseline and target |
| Risk × control | Coverage matrix |
| Release decision | Evidence and consequence brief |
| Run investigation | Component trace aligned to blueprint |

## 6. State representation

Never show one generic status badge for a service.

Use labeled dimensions:

- Lifecycle
- Outcome
- Runtime
- Assurance
- Certification
- Control

Only the two or three dimensions relevant to the current decision remain prominent; the Dossier provides the complete state on demand.

## 7. Data density

- Keep critical identifiers, owners, versions, and scopes visible.
- Secondary metadata appears on selection, not as repeated badges.
- Tables use aligned columns, sticky headers when necessary, and meaningful row grouping.
- Matrices provide row and column summaries without duplicating every fact.
- Maps use direct labels and a small legend.

## 8. Interaction feedback

- Selected objects use outline, connected highlight, and inspector update.
- Hover provides relationship preview, not essential information.
- Loading uses structural skeletons.
- Command success reports resulting domain state and continuation.
- Command failure reports the failed guard and responsible next step.

## 9. Responsive behavior

Desktop is primary because enterprise maps and matrices need width.

At narrower widths:

- Global navigation becomes a compact four-item switcher.
- Master/detail becomes queue followed by selected context.
- Blueprint and topology preserve semantic order and allow focused component selection.
- Matrices become row-focused views rather than horizontally shrunken diagrams.
- The Dossier collapses to mission, current release, owner, and current issue.

## 10. Anti-patterns

- KPI card rows before work context
- Large empty hero copy inside operating software
- Generic icon tiles for every entity
- Excessively rounded cards and shadows
- Multiple competing charts with no selection relationship
- Status colors without labels
- Freeform node editor as the default blueprint
- Separate detail pages for data, tools, controls, tests, and releases
- Approve/reject buttons detached from evidence and consequence
