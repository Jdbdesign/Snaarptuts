# Snaarp Tutorials

Full-screen, auto-playing, step-by-step tutorials that teach people how to sign up for and use Snaarp products. They are hosted on their own pages. We start with Snaarp 360 and will add every other Snaarp product later.

## How we work
- The owner is a product designer and does not write code. Give short, plain summaries of what changed. Do not explain technical steps unless asked.
- Build ONE step (one video segment) per round. Finish it, verify it, then stop and wait for feedback before starting the next step.
- When something needs doing by hand, give clear numbered steps.
- Never overwrite or delete the source video or reference.png.

## Source material
- Sign_up_for_snaarp_360.mp4: 2560x1440 screen recording, 1:55. Claude cannot watch video, so extract frames with ffmpeg and look at those (example: `ffmpeg -ss 9 -t 14 -i Sign_up_for_snaarp_360.mp4 -vf "fps=2" frames/%03d.png`).
- reference.png: the layout the player must look like (left step rail, browser frame in the middle, Cancel button top right).
- The video is only a reference. Rebuild every screen as real HTML/CSS. Never embed the video or screenshots in the final page.

## Step map for Snaarp 360 (video timestamps)
1. Choose your plan: 0:00-0:08 (pricing page, pick Business, Start 14-day free trial). Built first.
2. Create your account: 0:09-0:23 (sign-up form, then products home).
3. Sign in to Admin: 0:24-0:45 (products home, Snaarp Admin login, dashboard).
4. Add and verify your domain: 0:48-1:12 (Add Domain, DNS records, verified).
5. Add your first user: 1:15-1:51 (Add User, credentials, login as new user, Admin Panel users list).

Do not build a step until the owner asks for it.

## Product requirements
- The page fills 100vw x 100dvh. No document scroll, no letterboxing, no empty bands.
- Autoplays on load with no click. Steps advance automatically; a finished step marks done in the rail.
- Controls: Space = pause/resume, Collapse rail, Cancel (posts `{type:"snaarp-tutorial-cancel"}` to the parent window), click a built step in the rail to jump to it.
- Works at 1920x1080, 1440x900, 1280x720 and 390x844. Below 900px wide the rail auto-collapses.
- Respect prefers-reduced-motion.

## Architecture
- The player shell and the step scenes are separate. Adding a step or a product must never require editing the shell.
- Each product has one config file (for example `tutorials/snaarp-360.ts`) with its name, step titles, URLs and scenes.
- Scenes are built at a fixed 1440px design width and scaled with a CSS transform to the frame width. The design height = frame height / scale, so the scene always fills the frame.
- Shared timeline helper: `wait`, `moveCursorTo`, `click`, `scrollTo`, `showCaption`, `highlight`, `clearHighlight`. It must support pause and cancellation.
- All icons live in one icons file so the real Snaarp icons can be swapped in later. Do not crop icons out of video frames.
- Use the project's existing stack (Next.js + Tailwind if present). Route: `/tutorials/<product-id>`.

## Design tokens
- Font: Poppins (400, 500, 600, 700).
- Brand purple `#7014D9`. Text `#111111`. Secondary text `#6B7280`. Hairlines `#ECECF1`. Page background `#F6F6F8`. White cards.
- Browser traffic lights: red `#FF5F57`, yellow `#FEBC2E`, green `#28C840`.
- Radii: rail 24px, browser frame 14px, plan cards 20px, buttons and pills fully rounded.
- Caption bubble: `#111` background, white 14px Poppins Medium, rounded pill, bottom center of the frame.
- Highlight: 2px purple ring with a soft pulsing glow. Cursor: dark arrow with white outline, purple ripple on click.

## Content rules
- No real personal data anywhere: no real emails, passwords, names or domains from the video. Use obvious sample data such as Jane Doe, jane@example.com, example.com.
- Prices use the pound sign. Copy must match the real Snaarp pages unless the owner says otherwise.
- Captions are short, in the imperative, and name exactly what to click (example: "Click Start 14-day free trial").

## Definition of done for every step
1. The step runs end to end from autoplay with no errors in the console.
2. Screenshots at 1920x1080 and 1280x720, taken partway through the step, visually match the extracted video frames and reference.png (spacing, sizes, colors).
3. No scrollbars, no clipped text, nothing cut off.
4. Tell the owner the route to open and what to press to test it, then stop.

## Build status (Snaarp 360)
Route: `/tutorials/snaarp-360`

| Step | Status |
|---|---|
| 1. Choose your plan | Done |
| 2. Create your account | Done |
| 3. Sign in to Admin | Done |
| 4. Add and verify your domain | Done |
| 5. Add your first user | Done |
| Completion screen ("You're all set", Replay, Back to Snaarp) | Done |

All 5 steps and the completion screen are built. Total running time about 2:04 (123.8 s) from load to the completion screen. Not built yet: the Cancel button (see `docs/HANDOFF.md`).

### Shared pieces (file paths)
- Product config (names, titles, URLs, scenes): `tutorials/snaarp-360.ts` (types in `tutorials/types.ts`, registry in `tutorials/index.ts`)
- Route page: `app/tutorials/[productId]/page.tsx`
- Player shell: `components/player/TutorialPlayer.tsx` (also `Rail.tsx`, `BrowserFrame.tsx`, `CompletionCard.tsx`)
- Scene runner (scales the scene, draws the cursor and caption): `components/player/ScenePlayer.tsx`
- Timeline helper (`wait`, `at`, `moveCursorTo`, `click`, `scrollTo`, `scrollPanelTo`, `typeText`, `fill`, `toast`, `flash`, `showCaption`, `highlight`, `clearHighlight`, `hover`, `setUrl`, `animateVar`): `lib/timeline.ts`
- Cursor: drawn and moved in `components/player/ScenePlayer.tsx`; its motion is `moveCursorTo` / `click` in `lib/timeline.ts`; arrow icon is `CursorArrow` in `components/icons.tsx`
- Captions: bubble in `components/player/ScenePlayer.tsx`; driven by `showCaption` / `hideCaption` in `lib/timeline.ts`
- Highlight ring (`.tl-hl`): styles in `app/globals.css`; driven by `highlight` / `clearHighlight` in `lib/timeline.ts`
- `typeText`: in `lib/timeline.ts` (read the typed text in a scene with `lib/useTimelineVar.ts`)
- Toast: `components/admin/Toast.tsx` (`ToastHost`), triggered by `tl.toast` in `lib/timeline.ts`
- Modal: `components/admin/Modal.tsx`
- Dropdown: `components/admin/DropdownMenu.tsx` (`DropdownMenu`, `MenuItem`)
- AdminLayout: `components/admin/AdminLayout.tsx` (sample data in `components/admin/admin-data.ts`; `CopyButton.tsx` alongside)
- Icons file: `components/icons.tsx`
- Narrow-screen helper: `lib/useNarrow.ts`
- Step scenes and scripts: `scenes/snaarp-360/` (`StepNxxx.tsx` + `stepN-script.ts`, with step 3 and 4 screens in the `step3/` and `step4/` folders)
- Step 5 scene + script: `scenes/snaarp-360/Step5Users.tsx`, `scenes/snaarp-360/step5-script.ts`, screens in `scenes/snaarp-360/step5/`
- Admin Panel layout (purple, used by a new admin user; different from the black-pill owner `AdminLayout`): `components/admin-panel/AdminPanelLayout.tsx` (+ `admin-panel-data.ts`)
- New shared form pieces: `components/admin/TypedField.tsx`, `Checkbox.tsx`, `Radio.tsx`, `Chip.tsx`, `CopyActionButton.tsx`; `Modal.tsx` has an inner-scroll mode (`scrollId`); `Toast.tsx` has `position` (top-right or bottom-left)
- Completion screen: `components/player/CompletionCard.tsx`, text/link come from `completion` in the product config (defaults in `tutorials/completion.ts`)
- Shared login panel: `scenes/snaarp-360/step3/DarkPanel.tsx`
- Real product logos: `public/logos/*.svg`, shown with `ProductLogo` / `PRODUCT_LOGOS` in `components/icons.tsx`
- Product config for the dropdown: `tutorials/snaarp-mail.ts` (Snaarp Mail, 10 modules, none built)

### Adding a new product
Add `tutorials/<product-id>.ts` (name, steps, urls, `completion`), register it in `tutorials/index.ts`, and add `scenes/<product-id>/` with one scene component + one script per step. The shell (`components/player/`) and `lib/timeline.ts` are not edited.

### Product switcher
The rail's product card is a dropdown of every product in `tutorials/index.ts` (Snaarp 360 first). Each product has its own steps (modules) listed below it; a product with no built scenes shows a "coming soon" stage (`components/player/ComingSoon.tsx`). Snaarp Mail (`tutorials/snaarp-mail.ts`) is listed with its 10 modules, none built yet. Real product logos live in `public/logos/` and are shown with `ProductLogo` from `components/icons.tsx`.

## Docs
Start with `docs/HANDOFF.md`, then `docs/ARCHITECTURE.md`. All docs are written from the real code.
- `README.md` - what it is, how to run it, controls, links
- `docs/HANDOFF.md` - state, build history, known issues, next ideas, starter prompt for a new AI tool
- `docs/ARCHITECTURE.md` - folder map, how the player and timeline work, config format, data flow
- `docs/TIMELINE-API.md` - every timeline helper and shared UI component
- `docs/STEPS.md` - each step: screens, URLs, sample data, timeline as implemented, recording timestamps
- `docs/DESIGN-TOKENS.md` - fonts, colors, radii, shadows, per-surface rules and where they live
- `docs/DECISIONS-AND-DEVIATIONS.md` - differences from the recording, and what to replace before launch
- `docs/HOW-TO-ADD-A-PRODUCT-OR-STEP.md` - recipes, ffmpeg frame extraction, testing, definition of done
- `AGENTS.md` - tool-neutral rules; `.kiro/steering/` - Kiro steering files (product, tech, structure)

Keep the docs up to date when you change behavior: `STEPS.md` (screens, URLs, timeline), `DECISIONS-AND-DEVIATIONS.md` (anything that differs from the recording) and the Build status above.
