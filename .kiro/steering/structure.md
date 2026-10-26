---
inclusion: always
---

# Structure

```
app/                         layout.tsx (fonts), globals.css (tokens, keyframes), page.tsx (redirect), tutorials/[productId]/page.tsx (the route)
components/
  player/                    THE SHELL: TutorialPlayer, Rail, BrowserFrame, ScenePlayer, CompletionCard, ComingSoon
  admin/                     AdminLayout (owner portal), Modal, Toast, DropdownMenu, CopyButton, CopyActionButton,
                             TypedField, Checkbox, Radio, Chip, admin-data.ts
  admin-panel/               AdminPanelLayout (purple "Admin Panel"), admin-panel-data.ts
  icons.tsx                  all icons + ProductLogo (real logos) + CursorArrow + FlagGB
lib/                         timeline.ts (engine), useTimelineVar.ts, useNarrow.ts
tutorials/                   PRODUCT CONFIGS: types.ts, index.ts (registry), completion.ts, snaarp-360.ts, snaarp-mail.ts, snaarp-doc.ts, snaarp-admin.ts, snaarp-slides.ts
scenes/<product-id>/         SCENES: Step<N><Name>.tsx + step<N>-script.ts + step<N>/ (screens, step<N>-data.ts)
public/logos/                real Snaarp product logos (SVG)
docs/                        documentation (start with HANDOFF.md)
Sign_up_for_snaarp_360.mp4   source recording (reference only, never delete)
reference.png                the player layout (reference only, never delete)
frames_step5/                frames extracted from the recording for step 5
```

## Naming conventions

| Thing | Pattern | Example |
|---|---|---|
| Product config | `tutorials/<product-id>.ts`, `camelCase` export | `tutorials/snaarp-mail.ts` -> `snaarpMail` |
| Product id (route) | kebab-case | `/tutorials/snaarp-mail` |
| Scene component | `Step<N><Name>.tsx` | `Step5Users.tsx` |
| Script | `step<N>-script.ts` exporting `runStep<N>`, `STEP<N>_DURATION_MS` | `step5-script.ts` |
| Step screens | `scenes/<product-id>/step<N>/<Screen>.tsx` | `step5/UserLogin.tsx` |
| Step data | `step<N>-data.ts` (sample data only) | `step5/step5-data.ts` |
| Selectors | `data-tl="kebab-name"`, prefixes `btn-`, `field-`, `tab-`, `menu-`, `card-`, `select-`, `row-`, `stat-`, `chip-` | `[data-tl=btn-add-user]` |
| Scene variables | short camelCase; typed fields `field:<key>` | `modal`, `fade`, `screen`, `field:first` |

## Where things go

- New step -> screens in `scenes/<product>/step<N>/`, scene + script next to them, add `scene` to the step in `tutorials/<product>.ts`.
- New product -> `tutorials/<id>.ts`, register in `tutorials/index.ts`, scenes in `scenes/<id>/`, logo in `public/logos/` (+ `PRODUCT_LOGOS`).
- New reusable UI piece -> `components/admin/` (or a new folder), document it in `docs/TIMELINE-API.md`.
- New icon glyph -> `components/icons.tsx` only.
- Docs to update with every change: `docs/STEPS.md`, `docs/DECISIONS-AND-DEVIATIONS.md`, `CLAUDE.md` (Build status).

Recipes: `docs/HOW-TO-ADD-A-PRODUCT-OR-STEP.md`. Details: `docs/ARCHITECTURE.md`.
