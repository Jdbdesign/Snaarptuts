# House Scene Script Patterns

This document defines the strict motion, interaction, and timeline patterns followed by all Snaarp tutorials (Sheets, Doc, Slides, Admin, 360, and Workforce). Every scene script must adhere to these rules.

---

## 1. Cursor Actions: The `pressOn` and `hoverOn` House Standard

A cursor action that presses an element must never jump or instantly click without visual intent. It always follows the exact sequence:
1. Smooth glide to the element center: `tl.moveCursorTo(selector, { ms: 600 - 900 })`
2. Apply highlight ring: `tl.highlight(selector)`
3. Brief anticipation pause: `await tl.wait(150)`
4. Real click with active press animation: `await tl.click(selector)`
5. Immediate ring cleanup: `tl.clearHighlight()`

The canonical shared helper is `pressOn` (defined in `components/sheets/sheets-timeline.ts#L13-L19`):

```ts
// From components/sheets/sheets-timeline.ts (lines 13-19)
export async function pressOn(
  tl: Timeline,
  sel: string,
  opts: { ms?: number; dx?: number; dy?: number; ring?: boolean } = {}
) {
  await tl.moveCursorTo(sel, { ms: opts.ms ?? 650, dx: opts.dx, dy: opts.dy });
  if (opts.ring !== false) tl.highlight(sel);
  await tl.wait(150);
  await tl.click(sel);
  tl.clearHighlight();
}
```

For hover-only beats (inspections, previewing dropdown triggers, menu tooltips), use `hoverOn` (defined in `components/sheets/sheets-timeline.ts#L22-L25`):

```ts
// From components/sheets/sheets-timeline.ts (lines 22-25)
export async function hoverOn(
  tl: Timeline,
  sel: string,
  opts: { ms?: number; dx?: number; dy?: number } = {}
) {
  await tl.moveCursorTo(sel, { ms: opts.ms ?? 450, dx: opts.dx, dy: opts.dy });
  tl.hover(sel);
}
```

---

## 2. Action Honesty: "Click X" Means `click(X)`

Every caption that directs an action ("Click...", "Open...", "Select...", "Choose...", "Press...") must be backed by a real `click()` call on that element.
- The real React handler or scene state variable must execute and visibly transform the UI (tabs toggle, modal opens, button state flips, or page changes).
- **Never** merely glide to an element and ring it if the caption instructs the viewer to click it.
- Ring-only inspection beats are reserved exclusively for non-interactive demonstrations, where the caption phrasing is strictly descriptive ("This is...", "Here you can see...", "Notice the..."), never imperative.

---

## 3. Post-Action Delays: Mounting & Transition Buffers

Whenever an interaction changes the UI or mounts new elements into the DOM:
- Wait at least 80ms (`await tl.wait(80)`) before querying or ringing elements that were just mounted into the DOM by `setVar` or event handlers.
- Wait at least 250ms (`await tl.wait(250)`) after tab switches, accordion expands, or list updates before moving the cursor to elements inside them, ensuring layout transitions have settled.

---

## 4. Menus and Popovers: The Open / Hover / Choose / Close Loop

Popovers, dropdowns, and menus must be interactive:
1. **Open**: Click the trigger button using `pressOn` or dedicated helper (`openMenu`).
2. **Hover/Inspect**: Move between items (~600ms glide), set hover look, highlight the group/item, and hold for ~1700ms so the viewer can read the caption.
3. **Choose**: Click the chosen item with `chooseRow` / `chooseItem` (~500-600ms glide, highlight, wait 150ms, click, clearHighlight).
4. **Close**: Close the popover cleanly or let the selection handler dismiss it.

Never render a popover as pre-opened unless the step explicitly starts mid-action.

Example from `scenes/snaarp-sheets/step20/script.ts#L29-L35`:

```ts
// From scenes/snaarp-sheets/step20/script.ts (lines 29-35)
for (const [group, item, text] of beats) {
  tl.showCaption(text);
  await hoverRow(tl, item, { ms: 600 });
  tl.highlight(`[data-tl=menu-edit-group-${group}]`);
  await tl.wait(1700);
  tl.clearHighlight();
}
```

---

## 5. Typing: Focus Before Typing

Never inject text silently into input fields without visible interaction:
1. Glide to the field (`ms: 550 - 700`).
2. Click the field so it receives active focus state.
3. Type text using `tl.typeText(key, text, { msPerChar: 60 - 75 })` into the scene variable `field:<key>`.
4. Alternatively, use `tl.fill(selector, key, text)`.
5. For long tokens or IDs where typing would drag out the step, use `tl.paste(key, text, selector)` which sets the value instantly and flashes the field.

Example from `scenes/snaarp-slides/step24/script.ts#L13-L19`:

```ts
// From scenes/snaarp-slides/step24/script.ts (lines 13-19)
async function typeIn(tl: Timeline, box: "find" | "replace", text: string) {
  const sel = `[data-tl=${box}-input]`;
  await tl.moveCursorTo(sel, { ms: 650 });
  await tl.click(sel);
  tl.setVar("focus", box);
  await tl.typeText(box, text, { msPerChar: 75 });
}
```

---

## 6. Timing & Beat Anchors (`tl.at`)

To ensure rock-solid playback that never drifts regardless of CPU performance or framerates:
- Anchor every major beat using `await tl.at(ms)`.
- Gaps between beats are typically 2.5s to 4.0s to allow viewers time to absorb each action and read captions.
- Speeds: Use `ms: 700 - 900` for long cross-screen glides; `ms: 450 - 600` for short local adjustments.
- Continuity: When Step N+1 starts on the same screen where Step N ended, use `tl.placeCursorOn(selector)` to resume seamlessly from the previous cursor position; otherwise use `tl.placeCursor(x, y)`.
- Every step helper (begin*) MUST call tl.placeCursor; without it the pointer is invisible.
- Step Conclusion: Every step concludes with `tl.hideCaption()`, setting `tl.setVar("fade", true)` for the clean white transition, and awaiting the full step duration: `await tl.at(STEP_DURATION_MS)`.

---

## 7. Viewport Scrolling: `ensureVisible` and Explicit Smooth Scrolls

- All cursor actions (`moveCursorTo`, `click`, `highlight`) internally call `Timeline.ensureVisible` to scroll target elements into view.
- For deliberate page navigation across long forms or dashboards, use explicit `tl.scrollTo(target, 1000)` or `tl.scrollPanelTo(panel, target, 1000)` before moving the cursor so the destination is positioned comfortably before interaction begins.

---

## 8. Pause and Cancellation Safety

The tutorial player supports instant Spacebar pausing and canvas-click toggling.
- **Strict Prohibition**: Never use `setTimeout`, `setInterval`, `requestAnimationFrame`, or raw `new Promise` inside scene scripts.
- **Rule**: All timing and asynchronous logic must exclusively use Timeline primitives (`tl.wait`, `tl.at`, `tl.moveCursorTo`, `tl.click`, `tl.fill`, `tl.typeText`). These automatically pause when playback pauses and cancel cleanly when steps advance.

---

## 9. DOM Hook Selectors (`data-tl`)

- Every target element touched by a script must carry a descriptive `data-tl="element-name"` attribute in JSX.
- Scripts must strictly query by `[data-tl=element-name]`.
- Never use generic classes, tag hierarchies, or fragile positional selectors.

---

## 10. Multi-Screen Steps & Navigation Transitions

When a step transitions between pages or screens:
- Clear active highlights first: `tl.clearHighlight()`.
- Update the browser frame address: `tl.setUrl(newUrl)`.
- Update state: `tl.setVar("page", newPage)`.
- Provide sufficient settle time (`await tl.wait(250)`) before targeting elements on the newly mounted screen.

---

## Standard Step Skeleton Example

From `scenes/snaarp-sheets/step20/script.ts#L9-L40`:

```ts
// From scenes/snaarp-sheets/step20/script.ts (lines 9-40)
export async function runStep20(tl: Timeline) {
  beginEdit(tl, URLS.renamed);

  // Beat 1: Open menu
  await tl.at(800);
  tl.showCaption(CAPTIONS.open);
  await openMenu(tl, "edit", { ms: 900 });

  // Beat 2: Inspect menu
  await tl.at(3400);
  tl.showCaption(CAPTIONS.menu);
  tl.highlight("[data-tl=menu-edit]");
  await tl.wait(2200);
  tl.clearHighlight();

  // Beat 3: Iterate menu sections with hover & ring
  const beats: [number, string, string][] = [
    [0, "undo", CAPTIONS.history],
    [1, "cut", CAPTIONS.clipboard],
    [2, "delete", CAPTIONS.remove],
    [3, "find", CAPTIONS.find],
  ];
  for (const [group, item, text] of beats) {
    tl.showCaption(text);
    await hoverRow(tl, item, { ms: 600 });
    tl.highlight(`[data-tl=menu-edit-group-${group}]`);
    await tl.wait(1700);
    tl.clearHighlight();
  }

  // Close & clean up
  closeMenus(tl);
  tl.showCaption(CAPTIONS.done);
  await finish(tl, 1800);
}
```
