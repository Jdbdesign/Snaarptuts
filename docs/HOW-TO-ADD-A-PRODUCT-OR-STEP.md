# How to add a step or a product

Golden rule: **the player shell never changes.** Everything you add lives in `tutorials/` (config) and `scenes/` (screens + scripts), plus shared components when a new UI piece is reusable.

Naming conventions (follow them, tools and people look for these):

| Thing | Pattern | Example |
|---|---|---|
| Product config | `tutorials/<product-id>.ts`, export `camelCase` | `tutorials/snaarp-mail.ts` exports `snaarpMail` |
| Product id (route segment) | kebab-case | `snaarp-mail` -> `/tutorials/snaarp-mail` |
| Scene folder | `scenes/<product-id>/` | `scenes/snaarp-mail/` |
| Scene component | `Step<N><Name>.tsx`, export `Step<N><Name>` | `Step1Compose.tsx` |
| Script | `step<N>-script.ts`, export `runStep<N>` and `STEP<N>_DURATION_MS` | `step1-script.ts` |
| Screens of a step | `scenes/<product-id>/step<N>/<Screen>.tsx` | `step1/ComposeWindow.tsx` |
| Sample data | `step<N>-data.ts` next to the screens | `step1/step1-data.ts` |
| Selectors | `data-tl="kebab-name"` with a prefix: `btn-`, `field-`, `tab-`, `menu-`, `card-`, `select-`, `row-`, `stat-`, `chip-` | `[data-tl=btn-add-user]` |

## A. Add a step to an existing tutorial

1. **Get frames** from the recording (see "Extracting frames" below) and look at every one before coding. Write down the screens in order and the timestamps.
2. **Create the screens** in `scenes/<product>/step<N>/`. Build them as real HTML/CSS at a 1440px design width. Reuse shared pieces: `AdminLayout`, `AdminPanelLayout`, `Modal`, `Toast`, `DropdownMenu`, `TypedField`, `Checkbox`, `Radio`, `Chip`, `ProductLogo`, `Icon`. If you need a new reusable piece, add it under `components/admin/` (or a new folder) and document it in `docs/TIMELINE-API.md`.
3. **Create the scene component** `Step<N><Name>.tsx`:
   - root `<div className="relative h-full w-full bg-white">` containing exactly one `<div data-scroller className="relative h-full w-full overflow-hidden">` that wraps everything the script touches;
   - read the screen/modal state with `useTimelineVar(tl, "...", fallback)`;
   - for multi-screen steps add a white `fade` overlay (see `Step3Admin.tsx` or `Step5Users.tsx`).
4. **Create the script** `step<N>-script.ts` (see `docs/TIMELINE-API.md`). Use `tl.at(ms)` anchors for beats and keep captions short, imperative and exact ("Click Add User"). Call `tl.setUrl()` when the address changes. Export `STEP<N>_DURATION_MS` (the last anchor, plus a little).
5. **Continuity.** If the step starts where the previous one ended, seed the same state (see `seedFromStep4` in `Step5Users.tsx`), place the cursor with `tl.placeCursorOn(...)`, and make sure the entry fade is off for that first frame.
6. **Register the scene** in `tutorials/<product>.ts`: add `scene: { Component, run, durationMs }` to the step (or add a new step object with `id`, `title`, `url`). Nothing else needs editing; the rail, count, URL pill and completion card pick it up.
7. **Test** (see "Testing" below) at the four sizes.
8. **Update docs**: `docs/STEPS.md` (screens, URLs, sample data, timeline), `docs/DECISIONS-AND-DEVIATIONS.md` (anything that differs from the recording), and the Build status in `CLAUDE.md`.

## B. Add a whole new product tutorial (example: Snaarp Mail)

A Snaarp Mail stub already exists (`tutorials/snaarp-mail.ts`, 10 modules, none built). For a product that does not exist yet:

1. **Logo.** Put the product's SVG in `public/logos/<name>.svg` and add `<name>` to `PRODUCT_LOGOS` in `components/icons.tsx` (if it is not already there; most Snaarp products are).
2. **Config.** Create `tutorials/<product-id>.ts`:

   ```ts
   export const snaarpMeet: Tutorial = {
     product: { id: "snaarp-meet", name: "Snaarp Meet", logo: "meet" },
     steps: [
       { id: "start-meeting", title: "Start a meeting", url: "meet.snaarp.com", scene: {...} },
       { id: "invite-people", title: "Invite people", url: "meet.snaarp.com" },   // no scene = "Coming soon"
     ],
     completion: { text: "Snaarp Meet is ready for your team." },   // optional; defaults come from tutorials/completion.ts
   };
   ```

3. **Register it** in `tutorials/index.ts`: import it and add it to the `tutorials` array. The array order is the order in the rail dropdown (keep Snaarp 360 first). The route `/tutorials/<product-id>` exists automatically (`generateStaticParams` reads the registry). The rail dropdown, count and logo also appear automatically.
4. **Scenes.** Create `scenes/<product-id>/` and build steps as in recipe A. Steps without a `scene` show as "Coming soon". A product with no scenes at all shows the "tutorials are coming soon" stage.
5. **Test** the route, the dropdown switch from Snaarp 360 and back, and the completion card (title, text, link).
6. **Docs**: add a section for the product to `docs/STEPS.md` and update `CLAUDE.md` Build status.

Files you will typically add for the next product: `tutorials/<id>.ts`, `scenes/<id>/Step*.tsx`, `scenes/<id>/step*-script.ts`, `scenes/<id>/step*/...`, `public/logos/<name>.svg` (if new). Files you will edit: `tutorials/index.ts`, `components/icons.tsx` (only for a new logo), docs.

## Extracting frames from a recording

Claude and other AI tools cannot watch video, so extract frames and look at them. Run from the project root (Windows: Git Bash or PowerShell both work; `ffmpeg` must be on PATH):

```bash
# 2 frames per second, from second 73 for 40 seconds, scaled to 1280 wide
mkdir -p frames_step5
ffmpeg -ss 73 -t 40 -i Sign_up_for_snaarp_360.mp4 -vf "fps=2,scale=1280:-1" frames_step5/%03d.png
```

The basic pattern is `ffmpeg -ss <start sec> -t <length sec> -i <video> -vf "fps=2" frames/%03d.png`. Frame `001` is at the start second; each next frame is 0.5 s later. For a quick overview make contact sheets (6 frames per image):

```bash
mkdir -p frames_step5/sheets
ffmpeg -framerate 1 -i frames_step5/%03d.png -vf "scale=640:360,tile=3x2" -frames:v 14 frames_step5/sheets/s%02d.png
```

Notes: this ffmpeg build does not support glob patterns, so use `%03d` numbering. Never overwrite or delete the source video or `reference.png`. Do not crop icons or screenshots out of frames for use in the app.

## Testing

There is no automated test suite in the repo. The checks used so far:

1. `npx tsc --noEmit` and `npm run lint` must be clean.
2. `npm run dev`, open `http://localhost:3000/tutorials/<product-id>`.
3. Watch the step end to end from autoplay. Open the browser console: no errors.
4. Take screenshots partway through the step at **1920x1080** and **1280x720** (also check **1440x900** and **390x844**) and compare them with the extracted frames and `reference.png` (spacing, sizes, colors).
5. Press Space mid-step: typing, scrolling, toasts and modal scroll must freeze and resume.
6. Play the whole tutorial hands off, from step 1 to the completion card.

A Playwright script run from outside the repo works well (it was used for every round; the scripts are not kept in the repo). Pattern:

```js
// node script.mjs   (Playwright installed globally; keep the script outside the project)
const page = await browser.newPage({ viewport: { width: 1920, height: 1080 } });
await page.goto("http://localhost:3000/tutorials/snaarp-360", { waitUntil: "networkidle" });
await page.locator("ol li button").nth(4).click();      // jump to step 5 (index 4)
await new Promise(r => setTimeout(r, 14000));           // wait 14 s of step time
await page.screenshot({ path: "step5-14s.png", caret: "initial" });
```

Tips: wait for `networkidle` and pass `caret: "initial"` to `screenshot`. Playwright's default caret-hiding injects a style that makes React log a harmless hydration warning if you screenshot during load. Below 900px wide the rail is a drawer: click `button[aria-label="Expand step list"]` first. Jumping straight to a later step leaves earlier steps un-ticked (the count reads `0/5`); play from the start to see `4/5`.

## Definition of done for every step

- [ ] The step runs end to end from autoplay with no console errors.
- [ ] Screenshots at 1920x1080 and 1280x720, taken partway through, match the extracted video frames and `reference.png` (spacing, sizes, colors). 1440x900 and 390x844 also checked.
- [ ] No scrollbars, no clipped text, nothing cut off; the page fills the frame (no letterboxing, no empty bands).
- [ ] Below 900px wide: icon rails and dark login panels hidden, stat cards in 2 columns, wide tables scroll inside their own card.
- [ ] Pause (Space) freezes everything and resumes cleanly. Reduced motion is respected.
- [ ] No real personal data (names, emails, passwords, domains). Sample data only.
- [ ] Captions are short, imperative and name exactly what to click.
- [ ] Copy matches the real Snaarp pages unless the owner says otherwise.
- [ ] The step starts where the previous one ended (no fade) when the recording does.
- [ ] The step's `durationMs` is about the last beat; the rail tick and count update; the URL pill changes with the screens.
- [ ] Docs updated (`STEPS.md`, `DECISIONS-AND-DEVIATIONS.md`, `CLAUDE.md` Build status).
- [ ] Tell the owner the route to open and what to press to test, then **stop and wait for feedback**. Build one step per round.
