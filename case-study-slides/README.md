# Enterprise case-study slides

This folder contains five client-anonymous SVG case-study slides in the established Hexaware case-study format.

## Final SVGs

- `svg/07-delta-engineering-harness.svg`
- `svg/08-umb-coordinated-transformation.svg`
- `svg/09-veridyan-end-to-end-ai-delivery.svg`
- `svg/10-ey-enterprise-adoption-at-scale.svg`
- `svg/11-consilio-distinct-ai-use-case.svg`

The client names appear only in internal filenames and the validation ledger. The slide canvases use anonymous client descriptions.

The complete candidate-measure library and recommended customer-facing metrics are documented in `METRICS_CATALOG.md`.

The slide-by-slide customer story, presenter handoffs, and disclosure guardrails are documented in `PRESENTER_NARRATIVE.md`.

## Working claims

Asterisks and bracketed values indicate unvalidated inputs. See `VALIDATION_LEDGER.md` before publication. Factory.ai is intentionally omitted from the enterprise-adoption slide pending confirmation of the association and permission to disclose it.

## Regeneration

Run:

```sh
node case-study-slides/generate-case-study-svgs.mjs
```

The generator rewrites the five files in `case-study-slides/svg/`.
