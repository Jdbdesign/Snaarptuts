# Design tokens

The project uses Tailwind CSS 4. Global tokens live in `app/globals.css` (`@theme inline`). Most other values are written inline in components as Tailwind arbitrary values (for example `bg-[#0E0E10]`), so use search to find them.

## Where tokens live

| Token group | File |
|---|---|
| Brand color names (`brand`, `brand-soft`, `ink`, `muted`, `line`, `page`), font variables | `app/globals.css` (`@theme inline`) |
| Page background, body font, no scroll (`html, body` = 100vw x 100dvh, `overflow: hidden`) | `app/globals.css` |
| Fonts loaded (Poppins, JetBrains Mono) | `app/layout.tsx` |
| Highlight ring (`.tl-hl`), keyframes (`tl-fade-in`, `tl-fade`, `tl-fade-up`, `tl-row-in`, `tl-pop`, `tl-shimmer`, `orbit-spin`, `caret-blink`), `.no-scrollbar`, reduced motion | `app/globals.css` |
| Caption bubble, cursor, ripple, progress line | `components/player/ScenePlayer.tsx` |
| Cursor arrow shape | `components/icons.tsx` (`CursorArrow`) |
| Browser frame, traffic lights | `components/player/BrowserFrame.tsx` |
| Rail | `components/player/Rail.tsx` |
| Per-surface colors (admin blue, owner black, panel purple, login black) | the scene files listed in the last section |

## Fonts

- **Poppins** 400, 500, 600, 700 - all text. CSS variable `--font-poppins`; Tailwind `font-sans`.
- **JetBrains Mono** 400, 500 - generated password and DNS record values. CSS variable `--font-jetbrains`; Tailwind `font-mono`.
- Anti-aliasing: `-webkit-font-smoothing: antialiased`.

## Colors

Brand and text (from `globals.css`):

| Name | Value | Use |
|---|---|---|
| `brand` | `#7014D9` | Brand purple: marketing and sign-up buttons, rail active ring, highlight ring, progress line, Admin Panel actions |
| `brand-soft` | `#F3ECFC` | Soft purple fills (trial pill, active rail step, selected product row) |
| `ink` | `#111111` | Text |
| `muted` | `#6B7280` | Secondary text |
| `line` | `#ECEDF1` | Hairlines. (`CLAUDE.md` says `#ECECF1`; the code value is `#ECEDF1`. Many scene borders use `#F0F0F4`, `#E6E6EC` or `#E1E4EE` directly.) |
| `page` | `#F6F6F8` | Page background behind the rail and frame |

Other recurring values: admin main area `#F7F7F9`; frame border `#E4E4EA`; traffic lights red `#FF5F57`, yellow `#FEBC2E`, green `#28C840`; success green `#22A06B` (icons) and `#1B7F4B` (text); danger red `#E5484D`.

## Radii

| Thing | Radius |
|---|---|
| Player rail, completion card | 24px |
| Browser frame, modals (`Modal`), products-home purple cards | 14px |
| Plan cards, sign-up card, product tabs box | 20px |
| Admin cards and stat cards | 16px (`rounded-2xl`) |
| Buttons in the owner portal | 10px; inputs 8px |
| Pills, tabs, caption bubble, sign-up and replay buttons | fully rounded |
| Product logo tiles | 9-16px depending on size (`rounded-[9px]` in the rail and plan cards, `rounded-[16px]` on the products home) |

## Shadows (examples)

- Admin stat card: `0 6px 24px -14px rgba(17,17,17,0.12)`
- Sign-up card: `0 14px 44px -14px rgba(17,17,17,0.1)`
- Popular plan card: `0 24px 48px -16px rgba(112,20,217,0.28)`
- Modal: `0 30px 80px -20px rgba(0,0,0,0.5)`
- Dropdown menu: `0 16px 40px -12px rgba(17,17,17,0.25)`
- Toast: `0 10px 30px -12px rgba(20,120,60,0.35)`
- Purple cards (products home): `0 14px 30px -12px rgba(112,20,217,0.6)` (hover: stronger and lifted 3px)

## Player chrome

- **Caption bubble**: background `#111`, white text, 14px, weight 500, fully rounded, padding `px-5 py-2.5`, bottom center of the stage (`bottom-6`), shadow, fades and slides 8px. Max width is the stage minus 32px.
- **Highlight ring** (`.tl-hl`): `outline: 2px solid #7014D9; outline-offset: 3px`, plus an `::after` that pulses a purple glow (`tl-glow`, 1.4 s loop, up to 12px spread).
- **Cursor**: dark arrow `#111` with a white 1.6 stroke outline (`CursorArrow`, 22px wide). Press scales it to 0.82. **Ripple**: 44px circle, `brand` at 40% opacity, scales 0.2 to 1.5 and fades over 520 ms.
- **Progress line**: 3px, `brand`, along the bottom edge of the stage.
- **Scene design width**: 1440px, scaled to the stage (see `ARCHITECTURE.md`).
- **Reduced motion**: all CSS animations and transitions shortened to 1 ms; timeline tweens cap at 120 ms.

## Per-surface rules (do not unify these)

| Surface | Look | Where in code |
|---|---|---|
| Marketing pricing page and sign-up page (steps 1-2) | Brand purple `#7014D9`. Sign-up left panel gradient `linear-gradient(150deg, #8B4DF2, #6A12D6)`; sign-up button gradient `#9B5CF6` to `#7C2FE6`. | `Step1Pricing.tsx`, `Step2Signup.tsx` |
| Admin sign-in (step 3) | Near-black left panel (`DarkPanel`, radial gradient `#19191D` / `#0E0E10` / `#0A0A0C`) and **blue** actions `#2F5BE0` (`ADMIN_BLUE`): button "Sign in to Admin Portal", links, focus ring. | `step3/AdminSignIn.tsx`, `step3/DarkPanel.tsx` |
| Owner admin portal (steps 3-5: dashboard, domains, users) | **Black** buttons `#111`, **black** active menu pill `#0E0E10`, white cards on `#F7F7F9`. Blue is used only for the focus ring in fields and for the "Copy" button and "Regenerate" / "Copy all" links in the Add User modal. "Create User" is dark navy `#0E1220`. | `components/admin/AdminLayout.tsx`, `step4/*`, `step5/UserManagement.tsx`, `step5/AddUserModal.tsx` |
| Admin Panel (step 5, screens F-G) | **Purple** `brand` buttons, soft-purple active menu item `#F0E3FF` with purple text, role pills soft purple (`#F3E6FF`). | `components/admin-panel/AdminPanelLayout.tsx`, `step5/AdminPanelDashboard.tsx`, `step5/AdminPanelUsers.tsx` |
| User login (step 5, screen D) | Same `DarkPanel` as the admin sign-in, but a **black** `#111` Login button, dark focus ring, and a blue "Sign up for Business" link. | `step5/UserLogin.tsx` |
| Products home (steps 3 and 5) | Two brand-purple cards, real product logo tiles. | `step3/ProductsHome.tsx` |
| Toasts | Light green: bg `#ECFDF3`, border `#A6E3BC`, text `#14532D`, check icon `#22A06B`. | `components/admin/Toast.tsx` |
| Player shell | Neutral (white, `#F4F4F6` chips, brand only for active/progress) so it never competes with the scene. | `components/player/*` |

## Responsive tokens

- Narrow = viewport under 900px (`useNarrow`, media query `(max-width: 899px)`).
- Rail width `clamp(260px, 15vw, 300px)`; it becomes a drawer under 900px.
- Verified sizes: 1920x1080, 1440x900, 1280x720, 390x844.
