# Enterprise case-study slides

This folder contains six client-anonymous SVG case-study slides and a six-tile executive overview in the established Hexaware case-study format.

## Final presentation sequence

- `svg/06-six-case-study-overview.svg` — six-tile executive story
- `svg/07-delta-engineering-harness.svg`
- `svg/08-umb-coordinated-transformation.svg`
- `svg/09-veridyan-end-to-end-ai-delivery.svg`
- `svg/10-enterprise-ai-adoption-at-scale.svg`
- `svg/11-consilio-distinct-ai-use-case.svg`
- `svg/12-insurance-policy-servicing.svg`

The client names appear only in some internal filenames and the validation ledger. The slide canvases use anonymous client descriptions. The tracked `svg/10-ey-enterprise-adoption-at-scale.svg` is a superseded concept draft, not part of the final sequence.

Each completed individual case-study SVG embeds its photograph. The SVG is a standalone file; copy or share it without the `assets/` folder. The photos in `assets/` remain available for future editing. The six-tile overview uses vector artwork only.

The complete candidate-measure library and recommended customer-facing metrics are documented in `METRICS_CATALOG.md`.

The slide-by-slide customer story, presenter handoffs, and disclosure guardrails are documented in `PRESENTER_NARRATIVE.md`.

## Slide conventions

The slide canvases use no top-right logo, drafting disclaimer, asterisk, or visible placeholder. Keep source validation in `VALIDATION_LEDGER.md`, not on the client-facing slide. Factory.ai remains omitted from the enterprise-adoption slide.

## Regeneration

Run:

```sh
node case-study-slides/generate-case-study-svgs.mjs
```

The legacy generator rewrites its five original output paths, including some filenames now used by final slides, and does not preserve the current editorial sequence. Do not run it when editing the final slides. After replacing a photo in a completed slide with a relative `../assets/` reference, run `node case-study-slides/embed-slide-images.mjs` to make the SVG standalone again.
