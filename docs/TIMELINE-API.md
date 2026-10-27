# Timeline API and shared components

Source: `lib/timeline.ts`. A script is `async function runStepN(tl: Timeline)`. Time is **active time**: it stops while paused.
All times are in milliseconds. Selectors are CSS selectors, searched **inside the element marked `data-scroller`** (the scene root). A missing selector throws `Timeline: no element matches "<selector>"`.

Conventions the scenes follow:

- Elements the script touches get `data-tl="name"`, and scripts use `[data-tl=name]`. Use quotes if the value has a dot: `[data-tl="a.b"]`.
- The timeline sets small attributes that scenes style with Tailwind `data-[...]:` variants: `data-pressed` (during click), `data-hover` (from `hover`), `data-flash` (from `flash`), `data-ticked` (from `tickRule`). The class `.tl-hl` is the highlight ring.

## Clock and flow

| Helper | What it does |
|---|---|
| `wait(ms)` | Pause-aware sleep: resolves after `ms` of active time. `await tl.wait(350);` |
| `at(ms)` | Resolves when the step clock reaches `ms` since step start (returns at once if already past). This is how scripts stay on a schedule: `await tl.at(4000);` |
| `elapsed` | Active ms since the step started (read only). |
| `reduced` | `true` if the user prefers reduced motion (read only). |
| `ready()` | Called by `ScenePlayer` before the script: waits for fonts and a frame, then resets the clock to 0. Scripts do not call it. |
| `setPaused(p)`, `cancel()` | Called by the player. Pause freezes all helpers and running CSS animations. Cancel rejects pending helpers with `CancelledError`. |

Pattern used in every script: do the action, then `await tl.at(<next anchor>)` before the next beat. If an action ran long, `at` returns immediately, so the timeline never waits extra; it only catches up.

## Cursor

| Helper | Parameters | What it does |
|---|---|---|
| `placeCursor(fx, fy)` | fractions 0-1 of the stage | Puts the cursor there instantly and shows it. `tl.placeCursor(0.5, 0.52);` (step 1) |
| `placeCursorOn(selector, {dx?, dy?})` | element + pixel offset | Puts the cursor on an element's centre instantly. Used to continue from the previous step: `tl.placeCursorOn("[data-tl=menu-domains]");` (step 4) |
| `moveCursorTo(selector, {dx?, dy?, ms?})` | default `ms` 900 | Glides along an eased, slightly curved path to the element's centre (+ offset). `await tl.moveCursorTo("[data-tl=tab-360]", { ms: 850 });` |
| `click(selector)` | | Sets `data-pressed`, plays the press animation and ripple at the cursor, waits 120ms, calls the element's real `.click()`, waits 140ms, clears `data-pressed`. The cursor must already be over it (use `moveCursorTo` first). |
| `hover(selector \| null)` | | Marks one element `data-hover="true"` (clears the previous). `null` clears. `tl.hover("[data-tl=card-emails]");` |

## Scrolling

| Helper | Parameters | What it does |
|---|---|---|
| `scrollTo(target, ms = 1200, {margin = 24, topInset = 64})` | `target`: number (scrollTop in design px), `"top"`, `"bottom"`, or a selector | Scrolls the scene's `[data-scroller]`. With a selector it scrolls the minimum needed to bring the element's bottom into view while keeping its top below a sticky header of `topInset` px. `await tl.scrollTo("[data-tl=plan-grid]", 1200, { margin: 84, topInset: 64 });` (step 1) |
| `scrollPanelTo(panelSelector, target, ms = 1200, {margin = 24, topInset = 0})` | same targets | Same, for a scrolling panel inside the scene (form column, main area, modal). `await tl.scrollPanelTo("[data-tl=user-modal-scroll]", "bottom", 1000);` (step 5) |

## Typing and form state

| Helper | Parameters | What it does |
|---|---|---|
| `typeText(key, text, {msPerChar = 70})` | | Types one character at a time into the scene variable `field:<key>` and sets the variable `typing` to `key` while typing (cleared after). Read the text with `useTimelineVar(tl, "field:<key>", "")`. |
| `fill(selector, key, text, {moveMs = 550, msPerChar})` | | Glide to a field, click it, then `typeText`. `await tl.fill("[data-tl=field-first]", "first", "Jane", { moveMs: 700 });` (step 2) |
| `tickRule(selector, holdMs = 250)` | | Sets `data-ticked="true"` on the element (a satisfied password rule), then waits `holdMs`. |

A field is "focused" by clicking it: the scene's `onClick` sets the variable `focus` to the field id (see `TypedField`). Scripts clear it with `tl.setVar("focus", "")`.

## Captions, highlight, toast

| Helper | Parameters | What it does |
|---|---|---|
| `showCaption(text)` | | Shows the caption bubble (replaces the text). `tl.showCaption("Click Start 14-day free trial");` |
| `hideCaption()` | | Fades the bubble out (keeps the text for the fade). |
| `highlight(selector)` | | Adds the `.tl-hl` ring (2px purple outline + pulsing glow). Several elements can be highlighted at once. |
| `clearHighlight()` | | Removes every ring. (`goTo` helpers in the step 3 and 5 scripts call it before swapping screens.) |
| `toast(text, ms = 3000)` | | Sets the variable `toast`; a `<ToastHost>` in the scene renders it. It hides itself after `ms` of active time (so Pause freezes it). `tl.toast("Password copied to clipboard");` |
| `paste(key, text, flashSelector, ms = 800)` | | Writes `text` into the scene variable `field:<key>` at once (long values) and flashes the field with `flash`. Used for the TXT values in Mail step 6. |
| `flash(selector, ms = 1000)` | | Sets `data-flash="true"` for `ms`. Used by `CopyButton` for its "Copied" tooltip. |
| `setUrl(url)` | | Changes the text in the browser URL pill (for steps with several screens). `tl.setUrl("login.snaarp.com/admin");` |

Caption rule: short, imperative, name exactly what to click ("Click Start 14-day free trial").

## Scene variables (how scripts drive React)

| Helper | What it does |
|---|---|
| `setVar(key, value)` | Stores a value and notifies every subscriber. |
| `getVar<T>(key, fallback)` | Reads a value. |
| `subscribe(listener)` | Used by `useTimelineVar`. |
| `animateVar(key, from, to, ms)` | Eases a number variable (ease-out cubic): `await tl.animateVar("count", 0, 1, 600);` (the step 3 count-up) |

Scene side: `const open = useTimelineVar(tl, "modal", false);` (`lib/useTimelineVar.ts`). The fallback is also the value before the script sets it, so keep it a stable literal.

Variable names are per scene and per run (a new step starts with none set). Common ones: `intro` (page fade-in), `fade` (white fade-out overlay), `screen` (which screen of a multi-screen step), `modal`, `focus`, `field:<key>`, `toast`.

## Errors

`CancelledError` (exported) is thrown by every pending helper when the timeline is cancelled. Do not catch it in scripts; `ScenePlayer` handles it.

---

# Shared UI components

All are in `components/`. `tl` is the `Timeline`.

## Player shell (`components/player/`)

| Component | Props | Notes |
|---|---|---|
| `TutorialPlayer` | `productId: string` | The whole page. Used by `app/tutorials/[productId]/page.tsx`. |
| `Rail` | `tutorial, current, done[], playing, onSelect(i), onCollapse()` | Product dropdown + step list. |
| `BrowserFrame` | `url, onExpand?, children` | Browser chrome around the stage. |
| `ScenePlayer` | `scene, paused, onDone, onAdvance, onUrlChange` | Scales and runs one scene. |
| `CompletionCard` | `completion` (resolved), `onReplay` | Shown over the stage after the last step. |
| `ComingSoon` | `name, count` | Stage for a product with no built steps. |

## Owner admin portal (`components/admin/`)

| Component | Props | Used by |
|---|---|---|
| `AdminLayout` | `tl, active (menu id), onNavigate?(id), overlay?, children` | Steps 3, 4, 5 (owner portal: black active pill). Renders `IconRail`, header ("Snaarp", Back to user app, Search, bell, help, apps, Jane Doe / Owner), sidebar (`MENU_ITEMS`, storage box, Report a Bug), scrolling `<main data-tl="admin-main">`, a `ToastHost`, then `overlay` (put modals here). Sidebar items are `[data-tl=menu-<id>]`. |
| `IconRail` (exported from `AdminLayout.tsx`) | `items?` `{label, logo}[]` | The far-left product rail with real logos. `AdminPanelLayout` reuses it. |
| `Modal` | `open, width = 668, scrollId?, maxHeight?, children` | Dim backdrop (black 55%) + white 14px-radius dialog; stays mounted and fades. With `scrollId` the dialog scrolls inside itself and the scroll panel gets `data-tl=<scrollId>` (use with `scrollPanelTo`). Used by `AddDomainModal` (step 4) and `AddUserModal` (step 5, `width 740`, `maxHeight 780`). |
| `ToastHost` | `tl, position = "top-right" \| "bottom-left" \| "below-bar"` | Light green toast, `z-50`. Renders the `toast` variable. Top-right inside both admin layouts; bottom-left on the user login; `below-bar` (top right, under a 56px top bar) on the Cloudflare screens. |
| `DropdownMenu` + `MenuItem` | `open, className?` / `id, icon, danger?, onClick?` | Row actions menu in `DomainsPage` (step 4). `MenuItem` is `[data-tl=menu-item-<id>]` and shows hovered via `tl.hover`. |
| `CopyButton` | `tl, id, size = 14` | Small copy icon; click flashes a "Copied" tooltip. `[data-tl=copy-<id>]`. Used in `DnsTab` (step 4). |
| `CopyActionButton` | `id, label = "Copy", onClick?` | Solid blue "Copy" button with icon, `[data-tl=btn-<id>]`. Used in `AddUserModal`. |
| `TypedField` | `tl, id, placeholder, mask?, mono?, right?, tone = "blue" \| "dark", tintWhenFilled?, className?` | A text input the timeline types into (`field:<id>`, focus via `focus`). `[data-tl=field-<id>]`. Used in `AddUserModal` (blue ring, light blue fill when filled) and `UserLogin` (dark ring). |
| `FieldText` (exported from `TypedField.tsx`) | `tl, id, placeholder, mask?, mono?` | Just the text + caret + placeholder, for custom inputs (the email name part in `AddUserModal`). |
| `Checkbox` | `checked, size = 16` | Dark fill with a white tick. `AddUserModal`, `UserLogin`, `UserManagement` table header. |
| `Radio` | `selected, size = 16` | Purple ring and dot. `AddUserModal`. |
| `Chip` | `id, onClick?, children` | Small outlined suggestion chip, `[data-tl=chip-<id>]`. `AddUserModal` (email name suggestions). |

## Admin Panel (`components/admin-panel/`)

| Component | Props | Notes |
|---|---|---|
| `AdminPanelLayout` | `tl, active, title, avatar = "S", onNavigate?, hideMenuOnNarrow?, children` | The layout an admin user sees at `login.snaarp.com/admin`: slim icon rail (`PANEL_RAIL_ITEMS`), 240px white column with purple "Admin Panel" mark and menu (`PANEL_MENU`), small top bar, scrolling `<main data-tl="panel-main">`. Active item has a soft purple fill (`#F0E3FF`). Menu items are `[data-tl=panel-menu-<id>]`. Used in step 5 (screens F and G) and by every Snaarp Admin step (`hideMenuOnNarrow` hides the 240px menu column below 900px). Do not merge it with `AdminLayout`. |

## Icons and logos (`components/icons.tsx`)

| Export | Notes |
|---|---|
| `Icon` (`name: IconName`, `size`) | Redrawn interface glyphs, 24x24 viewBox, `currentColor`. Add a glyph by adding an entry to `bodies`. |
| `ProductLogo` (`name: LogoName`, `size`, `className`, `style`) | The real product logos from `public/logos/<name>.svg`. Names are listed in `PRODUCT_LOGOS`: 360, mail, me, workforce, projects, drive, lock, sendrit, verifyrit, crm, zeus, books, onecard, pdf, sign, teams, meet, sheet, presentation, docs, snaarp. Used on the pricing page, sign-up page, products home, both admin rails, and the player rail. |
| `CursorArrow`, `FlagGB` | The fake cursor and the UK flag in the sign-up country field and the pricing nav. |

## Scene-level components worth knowing

- `components/pricing/PricingScene.tsx` - the pricing page for any product. Props: `tl`, `data: PricingData` (`components/pricing/pricing-types.ts`: currency in the nav, starting tab, plans per tab, `cardsVisibleAtStart`, `startScroll`). Elements: `[data-tl=tab-<id>]`, `[data-tl=plan-<id>]`, `[data-tl=cta-<id>]`, `[data-tl=toggle-monthly]`, `[data-tl=plan-grid]`. Picking another tab swaps the cards with a short fade. Used by `scenes/snaarp-360/Step1Pricing.tsx` and `scenes/snaarp-mail/Step1Pricing.tsx`.
- `scenes/snaarp-360/step3/DarkPanel.tsx` - near-black left panel (wordmark, three feature rows, footer links). Used by the admin sign-in (step 3) and the user login (step 5).
- `scenes/snaarp-360/step3/ProductsHome.tsx` - products home. Props: `tl`, `avatar` (letter), `tiles` (list of `ProductTile`, default all 16). Elements: `[data-tl=card-emails]`, `[data-tl=card-admin]`, `[data-tl=product-grid]`. Variable `loaded` swaps the skeleton for the tiles. Step 3 shows all 16; step 5 shows only "Project".
- `scenes/snaarp-360/step3/LoadingScreen.tsx` - spinner screen; `label={null}` hides the text.
- `scenes/snaarp-360/step4/DomainsPage.tsx` - `instant` prop turns off the entry fade (step 5 uses it to start on the same frame step 4 ended on).


---

# Snaarp Doc toolbar helpers (`components/docs/toolbar-timeline.ts`)

Used by Snaarp Doc steps 45-64 (`EditorStage` with `tools`). Call `initToolbar(tl)` first in every script. `pointAt(tl, hook, {ms, tipMs, dx, dy})` glides to a button (`tool-<id>`, `header-meet`, `editor-share` ...), hovers it and shows its tooltip (scene variable `tip`); `pressButton(tl, hook)` rings, clicks and drops the tooltip; `clickTool(tl, id, run?, opts)` does both and runs what the tool does; `openMenu(tl, menu, hook, opts)` opens a dropdown card (scene variable `toolMenu`); `chooseRow(tl, rowHook, run?, opts)` hovers, rings and clicks a row (`tm-<card>-<id>`), closes the card and runs `run`; `closeMenu(tl)`; `edit(tl, fn)` applies a pure editor-state function and blinks "Unsaved changes"; `runUndo` / `runRedo`; `typeNewLine`, `typeSizeBox`, `typeSuggestion` type live. On narrow screens `pointAt` first scrolls the toolbar sideways so the button is in view. Cards and tooltips are drawn by `ToolbarLayer` / `Anchored` (see `CLAUDE.md`).

---

# Snaarp Slides helpers (`components/slides/slides-timeline.ts`)

Used by every Snaarp Slides step (`SlidesApp`). `pressOn(tl, sel, {ms, dx, dy, ring})` glides to an element, rings it and clicks it. `openFileMenu(tl)` clicks File and opens the menu; `hoverItem(tl, id, {tip})` hovers a File item (an item with a submenu opens it, a greyed item with `tip` shows its tooltip); `hoverSub(tl, id)` hovers a submenu row; `chooseItem(tl, id)` and `chooseSub(tl, itemId, subId)` click and close the menu; `closeFileMenu(tl)`. `openDialog(tl, id)` / `closeDialog(tl)` set the scene variable `dialog`. `typeInto(tl, id, text)` clicks a `field-<id>` box, gives it the focus (scene variable `focus`) and types into `field:<id>`. `toast(tl, text)` shows the shared `DocToast`; `ring(tl, sel, ms)` rings an element for a moment. A script that sets a variable which mounts new DOM must `await tl.wait(80)` before querying it.

---

# Snaarp Slides Edit, View and Insert helpers (`components/slides/menu-timeline.ts`, `slides-edit.ts`)

Used by Snaarp Slides steps 20-35 (`EivStage`). Call `beginEiv(tl)` (`scenes/snaarp-slides/eiv.ts`) first in every script: it resets the deck, the selection and the undo history. `openMenu(tl, "edit" | "view" | "insert")` clicks the menu label and opens its dropdown (scene variable `menuOpen`); `hoverRow(tl, menu, id, {tip})` hovers a row (a row with a submenu opens it, a greyed row with `tip` shows its "Coming soon" tooltip); `hoverSubRow(tl, menu, id)`; `chooseRow(tl, menu, id)` and `chooseSubRow(tl, menu, id, subId)` click, close the menu and do what the row does (the action table is in `menu-timeline.ts`); `closeMenu(tl)`; `pressFullScreenArrow(tl, "next" | "previous")`. `slides-edit.ts` holds the actions on the scene variables (`undo`, `redo`, `selectAll`, `copySel`, `cutSel`, `pasteClip`, `duplicateSel`, `deleteSel`, `insertShape`..., `beginTextEdit` / `endTextEdit`, `beginCellEdit` / `endCellEdit`, `openFind`, `stepFind`, `replaceEverything`) and the cursor-driven helpers: `sweepTo(tl, x, y, ms)` (glide over the slide; the ruler tick follows), `dragElementBy(tl, id, dx, dy, ms)` (grab and drag an element; it snaps to guides when they are on), `drawTextBox(tl, box, ms)` (drag out a text box), `resizeElementBy(tl, id, dw, ms)` (drag the bottom-right handle). Positions are in cqw (100 = the slide's width). They rely on `tl.moveCursorTo(selector, { onMove })`, which calls `onMove(clientX, clientY)` on every frame, and on the invisible `[data-tl=slide-marker]` spot the cursor glides to. Elements on the big canvas are `[data-tl=el-<id>]`; thumbnails have no hooks.
