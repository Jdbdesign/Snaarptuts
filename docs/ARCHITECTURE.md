# Architecture

Stack: Next.js 16.4.2 (App Router, Turbopack), React 19.3.0, Tailwind CSS 4, TypeScript 5. No backend, no database, no auth.
Path alias: `@/*` maps to the project root (`tsconfig.json`).

> Next.js 16 has breaking changes. `AGENTS.md` points to the Next docs inside `node_modules/next/dist/docs/`. Read the relevant guide before using a Next API you are not sure about.

## Folder map

```
app/
  layout.tsx                       Root layout. Loads Poppins (400-700) and JetBrains Mono (400, 500) via next/font.
  globals.css                      Tailwind import, brand theme tokens, highlight ring, shared keyframes.
  page.tsx                         Redirects "/" to /tutorials/snaarp-360.
  tutorials/[productId]/page.tsx   The route. Looks up the product, renders <TutorialPlayer key={productId}>.

components/
  player/                          THE SHELL. Knows nothing about any product.
    TutorialPlayer.tsx             Owns run state (current step, done flags, pause, live URL, rail open). Space key. Renders rail + frame.
    Rail.tsx                       Left rail: Collapse, search, product dropdown, step list with done ticks.
    BrowserFrame.tsx               The browser window chrome (traffic lights, URL pill, expand-rail button) around the stage.
    ScenePlayer.tsx                Runs ONE scene: scales it, draws cursor, ripple, caption, progress line, creates the Timeline.
    CompletionCard.tsx             "You're all set" card shown over the stage after the last step.
    ComingSoon.tsx                 Stage shown for a product with no built steps.
  admin/                           Shared pieces for the owner admin portal and forms
    AdminLayout.tsx                Owner portal shell (icon rail, header, sidebar, main). Black active pill.
    admin-data.ts                  Icon rail items and sidebar menu items of the owner portal.
    Modal.tsx, Toast.tsx, DropdownMenu.tsx, CopyButton.tsx
    TypedField.tsx, Checkbox.tsx, Radio.tsx, Chip.tsx, CopyActionButton.tsx
  pricing/                         Shared, data-driven pricing page: PricingScene.tsx, pricing-types.ts, plans-360.ts. Used by 360 and Mail step 1.
  admin-panel/                     The "Admin Panel" an admin user sees at login.snaarp.com/admin
    AdminPanelLayout.tsx           Purple, soft-purple active item. Different from AdminLayout on purpose.
    admin-panel-data.ts            Its icon rail items and menu.
  icons.tsx                        ALL icons: redrawn interface glyphs (<Icon>), product logos (<ProductLogo>), cursor arrow, flag.

lib/
  timeline.ts                      The timeline engine (cursor, click, scroll, typing, captions, highlight, pause, cancel).
  useTimelineVar.ts                Hook: re-render a scene component when a script calls tl.setVar().
  useNarrow.ts                     Hook: true below 900px viewport width.
  money.ts                         formatGBP() and planPrice(): the only place money is formatted (Intl en-GB, GBP).

tutorials/                         PRODUCT CONFIGS
  types.ts                         Tutorial, Step, Scene, Completion types.
  index.ts                         Registry: the list of products (order = dropdown order) and getTutorial().
  completion.ts                    resolveCompletion(): config over defaults for the completion card text.
  snaarp-360.ts                    Snaarp 360 (5 steps, all built).
  snaarp-mail.ts                   Snaarp Mail (10 modules listed, none built).
  snaarp-admin.ts                  Snaarp Admin (8 steps, all built; scenes in scenes/snaarp-admin/).

scenes/snaarp-360/                 SCENES for Snaarp 360. One scene component + one script per step.
  Step1Pricing.tsx, step1-script.ts, pricing-data.ts
  Step2Signup.tsx,  step2-script.ts, signup-data.ts
  Step3Admin.tsx,   step3-script.ts, step3/   (ProductsHome, LoadingScreen, AdminSignIn, DarkPanel, AdminDashboard, step3-data.ts)
  Step4Domains.tsx, step4-script.ts, step4/   (DomainsPage, AddDomainModal, DnsTab, step4-data.ts)
  Step5Users.tsx,   step5-script.ts, step5/   (UserManagement, AddUserModal, UserLogin, AdminPanelDashboard, AdminPanelUsers, step5-data.ts)

scenes/snaarp-mail/                Scenes for Snaarp Mail. Step 1 (pricing) is built: Step1Pricing.tsx, step1-script.ts, pricing-data.ts.

public/logos/                      Real Snaarp product logos (SVG tiles). See components/icons.tsx -> PRODUCT_LOGOS.
Sign_up_for_snaarp_360.mp4         Source recording (2560x1440, 1:55). Reference only. Never embed, never delete.
reference.png                      The player layout the shell must match.
frames_step5/                      Frames extracted from the 360 recording for step 5 (git-ignored).
ref/mail/                          Snaarp Mail recording (Snaarp_Mail_setup.mp4) and its extracted frames (frames-step1/). Git-ignored.
docs/, .kiro/steering/             Documentation.
```

## How the player works

### The shell (`components/player/`)

`TutorialPlayer` is a client component. It gets a `productId`, looks the tutorial up with `getTutorial()`, and keeps:

- `run` = `{ current, runKey, status }`. `current` is the active step index. `runKey` changes on every (re)start so the scene remounts. `status` is `"playing"` or `"finished"`.
- `done[]` = one boolean per step. A step is marked done when its script finishes.
- `paused`, `liveUrl`, `railOpen` (wide screens), `drawerOpen` (narrow screens).

Layout: a `fixed inset-0` flex row with 16px padding on page background `#F6F6F8`. Left: the rail (width `clamp(260px,15vw,300px)`, animates to 0 when collapsed). Right: `BrowserFrame`, which fills the rest. Below 900px the rail becomes a drawer over a dimmed backdrop.

`Rail` shows a search field, the **product card** (current product logo, name, `done/total`, chevron) and the **step list**. Clicking the card opens a dropdown of every product in `tutorials/index.ts`. Typing in the search field filters it. Other products link to `/tutorials/<id>`; because the route page uses `key={productId}`, the player remounts clean. Counts for products other than the current one always read `0/N` (progress is not stored between pages). Steps without a `scene` are disabled and dashed ("coming soon").

`BrowserFrame` draws the 46px top bar (three traffic lights, centered URL pill) and a `relative` stage below it. The URL pill shows `liveUrl ?? step.url`.

### Scene scaling (`ScenePlayer.tsx`)

Scenes are built at a fixed design width of **1440px** (`DESIGN_WIDTH`). `ScenePlayer` measures the stage with a `ResizeObserver` and renders the scene in a box of:

- width = 1440
- height = stage height / scale
- `transform: scale(scale)` with origin top-left, where `scale = stage width / 1440`

So the scene always fills the stage with no bands, at any window size. Because the scene is laid out at 1440 and scaled, a 390px-wide phone shows a tiny copy of the desktop layout (with the `useNarrow` tweaks listed in `docs/DESIGN-TOKENS.md`).

On top of the scene (unscaled, in stage pixels) `ScenePlayer` draws: the click ripple, the cursor arrow (`CursorArrow`), the caption bubble (bottom center) and a 3px purple progress line along the bottom edge (`elapsed / durationMs`).

### The run sequence

For each step, `ScenePlayer` does this once the stage is measured:

1. `tl.ready()` - waits for fonts and one frame, then resets the clock to 0.
2. `scene.run(tl)` - the step script runs to its end.
3. `onDone()` - the shell marks the step done (rail tick, count goes up).
4. `tl.wait(500)` (`GAP_AFTER_STEP_MS`) - a short breath.
5. `onAdvance()` - the shell starts the next step that has a scene, or sets `status = "finished"`.

When `status` is `"finished"` the last scene stays on screen and `CompletionCard` fades in over it (text from the product config). Nothing plays until "Replay tutorial" is clicked (`replay()` clears all done flags and restarts the first built step).

If a scene is cancelled (step switched, page left) the timeline rejects all pending waits with `CancelledError`, which `ScenePlayer` swallows.

### The timeline engine (`lib/timeline.ts`)

A `Timeline` is created per step run. It keeps a clock of **active milliseconds** (`elapsed`), which stops while paused. A single `requestAnimationFrame` loop advances the clock by the frame delta (capped at 100ms) and runs "jobs". Every async helper (`wait`, `moveCursorTo`, `scrollTo`, `typeText`...) is a job that finishes when the clock reaches its target. Result:

- **Pause**: `setPaused(true)` stops the clock, so every job freezes. It also pauses running CSS animations/transitions inside the stage (`getAnimations()`), including ones that start while paused.
- **Cancel**: `cancel()` stops the loop and rejects every pending job with `CancelledError`.
- **Reduced motion**: if `prefers-reduced-motion: reduce` is set, tweens finish in at most 120ms with no easing and no cursor curve. CSS in `globals.css` also shortens all CSS animations.

A script is a plain `async function (tl)` that calls helpers in order. It talks to the scene component two ways:

- **DOM selectors.** Scene elements carry `data-tl="name"`. Helpers find them with `querySelector` **inside the element marked `data-scroller`** (so every scene must have exactly one `data-scroller` root around everything the script touches).
- **Scene variables.** `tl.setVar(key, value)` stores a value and notifies subscribers; the scene reads it with `useTimelineVar(tl, key, fallback)`. This is how scripts show modals, switch pages, type into fields and fire toasts.

Full API: `docs/TIMELINE-API.md`.

### Responsive behavior

`useNarrow()` is true below 900px viewport width. Scenes use it to hide the far-left icon rail and the dark login panel, put stat cards in 2 columns, and let wide tables scroll horizontally inside their own card. The player rail becomes a drawer.

## Product config format (`tutorials/types.ts`)

```ts
type Scene = {
  Component: ComponentType<{ tl: Timeline }>;  // draws the screens
  run: (tl: Timeline) => Promise<void>;         // the script
  durationMs: number;                            // expected active time; drives the progress line ONLY
};

type Step = {
  id: string;        // unique inside the product
  title: string;     // shown in the rail
  url: string;       // URL pill text when the step starts (a script may change it with tl.setUrl)
  scene?: Scene;     // no scene = "Coming soon" in the rail
};

type Completion = { title?; text?; replayLabel?; backLabel?; backHref? };   // all optional

type Tutorial = {
  product: { id: string; name: string; logo?: LogoName };  // id = the URL segment; logo = a name from PRODUCT_LOGOS
  steps: Step[];
  completion?: Completion;
};
```

Annotated example (shortened from `tutorials/snaarp-360.ts`):

```ts
export const snaarp360: Tutorial = {
  product: { id: "snaarp-360", name: "Snaarp 360", logo: "360" },   // route: /tutorials/snaarp-360
  steps: [
    {
      id: "choose-plan",
      title: "Choose your plan",
      url: "snaarp.com/pricing#pricing",
      scene: { Component: Step1Pricing, run: runStep1, durationMs: STEP1_DURATION_MS },
    },
    // ... steps 2-5 the same way ...
  ],
  completion: {                       // defaults live in tutorials/completion.ts
    title: "You're all set",
    text: "Snaarp 360 is ready for your team.",
    replayLabel: "Replay tutorial",
    backLabel: "Back to Snaarp",
    backHref: "https://snaarp.com",   // rendered as <a target="_top">
  },
};
```

Register it in `tutorials/index.ts`: the array order is the dropdown order (Snaarp 360 is first on purpose).

## Data flow: from config to screen

1. Browser opens `/tutorials/snaarp-360`. `app/tutorials/[productId]/page.tsx` checks the id (`notFound()` if unknown) and renders `TutorialPlayer`.
2. `TutorialPlayer` starts at the first step with a `scene` (`firstBuilt`) and renders `BrowserFrame` > `ScenePlayer key="<step.id>-<runKey>"`.
3. `ScenePlayer` mounts `<scene.Component tl={tl} />` and calls `scene.run(tl)`.
4. The script calls helpers; helpers move the cursor, set variables and click real DOM elements (`el.click()`), so the scene's own React handlers run.
5. **URL pill**: `BrowserFrame` shows `liveUrl ?? step.url`. A script changes it with `tl.setUrl(url)`, which calls `onUrlChange` -> `setLiveUrl`. `liveUrl` is reset to `null` whenever a step (re)starts.
6. **Rail count and ticks**: when `run()` resolves, `onDone` sets `done[current] = true`. The rail shows `done.filter(Boolean).length / steps.length` and a tick per done step. Step N+1 starts with N steps done (for example "4/5" while step 5 plays), and "5/5" when step 5 finishes. Jumping straight to a later step via the rail does not mark earlier steps done.
7. After the last built step, `status` becomes `"finished"` and `CompletionCard` appears.

## Continuity between steps

Some steps start on the exact screen the previous step ended on, with no fade (step 4 starts on the dashboard step 3 ended on; step 5 starts on the verified domain list step 4 ended on). The scene variables of a new step start empty, so the new scene "seeds" the state it needs (see `seedFromStep4()` in `Step5Users.tsx`) and the script places the cursor where the previous one left it (`tl.placeCursorOn(...)`). When you change the last screen of a step, check the first screen of the next one.
