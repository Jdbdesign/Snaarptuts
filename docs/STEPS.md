# Steps of the Snaarp 360 tutorial

Config: `tutorials/snaarp-360.ts`. Total running time from page load to the completion card: **about 2 minutes 4 seconds** (measured 123.5-123.8 s at 1920x1080, 1440x900 and 390x844). Each step adds a 0.5 s gap after it finishes (`GAP_AFTER_STEP_MS`).

Timeline times below are **active seconds from the start of the step, as implemented** (the `tl.at(...)` anchors in each script). Between anchors, actions take as long as they take (cursor glides, typing), so a beat can start slightly after its anchor if the previous one ran long. `durationMs` is only used for the progress line along the bottom edge.

## Source recording map

`Sign_up_for_snaarp_360.mp4`, 2560x1440, 1:55.

| Step | Title | Recording |
|---|---|---|
| 1 | Choose your plan | 0:00 - 0:08 |
| 2 | Create your account | 0:09 - 0:23 |
| 3 | Sign in to Admin | 0:24 - 0:45 |
| 4 | Add and verify your domain | 0:46 - 1:12 |
| 5 | Add your first user | 1:13 - 1:51 |

(`CLAUDE.md` still says 0:48 and 1:15 for the start of steps 4 and 5. The map above is the one the owner gave for the docs; the difference is two seconds of transition.)

---

## Step 1 - Choose your plan

- Files: `scenes/snaarp-360/Step1Pricing.tsx`, `step1-script.ts`, `pricing-data.ts`. `durationMs` 12300.
- URL pill: `snaarp.com/pricing#pricing` (config only, never changed).
- Screens: one page, the Snaarp pricing page: nav (Snaarp, Products, Solution, Pricing, Contact Sales, Login, Global), hero "Simple Pricing That Scales With Storage", Monthly/Yearly toggle, product tabs (15, in two rows), four plan cards (Team, Business with "Most popular", Scale, Growth) each with 17 product logos and four features. The page scrolls (`[data-scroller]`).
- Sample data: prices in pounds. Team £49 (£588/yr, 10 GB, team size 1), Business £99 (£1,188, 600 GB, 10), Scale £249 (£2,988, 2.5 TB, 30), Growth £499 (£5,988, 5 TB, 100).
- Timeline:

| Time | What happens |
|---|---|
| 0.0 | Cursor placed at 50% / 52%. Page fades in (`intro` 1). |
| 0.45 | Hero and tabs fade up (`intro` 2). |
| 1.2 - 2.5 | Caption "Open the Snaarp pricing page". |
| 2.6 | Caption "Pick how you want to be billed". Cursor to Monthly, ring, click. |
| 4.6 | Caption "Select the Snaarp 360 tab". Cursor to the 360 tab, ring, click. Plan cards slide up (`cards`). |
| 6.4 | Page scrolls to bring the plan grid into view (1.2 s). |
| 7.8 | Caption "Compare plans. Business is the most popular". Cursor visits Team, Scale, Growth, then Business (which shows hovered). |
| 10.0 | Caption "Click Start 14-day free trial". Cursor to the Business button, ring, click. |
| 11.8 | Ring and caption cleared, white fade-out. Ends at 12.3. |

---

## Step 2 - Create your account

- Files: `Step2Signup.tsx`, `step2-script.ts`, `signup-data.ts` (password rules). `durationMs` 17300.
- URL pill: `login.snaarp.com/signup?subscriptionPlanId=117&plan=Business&billing=monthly&price=99&currency=GBP` (config only).
- Screens: one split page. Left: purple brand panel with a turning orbit of product logos around the Snaarp logo, four feature rows and a footer (rows are hidden under 900px). Right: logo, "Sign up for Snaarp", a Selected plan card ("Snaarp 360", "Business £99 /month", "600 GB Billed monthly 14-day free trial included"), the form (first/last name, company email, organization, country, dial code, phone, password with five rules), a "Sign up to Snaarp 360" button.
- Sample data: Jane / Doe / `jane@acme-studio.com` / Acme Studio / Nigeria +234 / `801 234 5678` / password `Sample#Pass1`.
- Timeline:

| Time | What happens |
|---|---|
| 0.0 | Cursor at the middle. Scene fades in; the orbit is already turning. |
| 1.0 | Caption "Your plan is already selected: Business, £99/month". Ring around the plan header until 2.8. |
| 3.0 | Caption "Enter your first and last name". Types Jane, then Doe. |
| 5.2 | Caption "Use your company email address". Types the email (field turns green, "Looks good."). |
| 7.4 | Caption "Enter your organization name". Types Acme Studio. |
| 8.8 | Caption "Check your country and phone code". Rings on country and dial code, then types the phone number. |
| 10.8 | Caption "Create a strong password". Types the password while the form scrolls down (1.1 s) and the five rules tick one by one. |
| 13.6 | Caption "Click Sign up to Snaarp 360". Ring, click. Button shows "Creating account..." for 1.0 s. |
| ~16.0 | Caption hidden, white fade (0.5 s). Step ends at about 16.5. |

---

## Step 3 - Sign in to Admin

- Files: `Step3Admin.tsx`, `step3-script.ts`, `step3/` (`ProductsHome.tsx`, `LoadingScreen.tsx`, `AdminSignIn.tsx`, `DarkPanel.tsx`, `AdminDashboard.tsx`, `step3-data.ts`). `durationMs` 21800.
- Screens in order and the URL pill for each (`URLS` in the script; A uses the config URL):

| Screen | What | URL pill |
|---|---|---|
| A | Products home: two purple cards (Create/Configure Emails, System Admin), "Welcome", Active Products / Store, grid of 16 product logos (skeleton first) | `login.snaarp.com/products` |
| B | Loading ("Loading admin panel...") | `admin.snaarp.com/admin` |
| C | Admin sign-in (near-black left panel, blue button) | `admin.snaarp.com/admin/login` |
| D | Admin dashboard in `AdminLayout` (4 stat cards, email traffic chart) | `admin.snaarp.com/admin` |

- Sample data: email `jane@acme-studio.com`, password `Sample#Pass1`. Dashboard stats: Domains 0 (of 0 limit), Organization Users 1 (1 active), Inboxes 0 (of 0 limit), Plan "Business Plan" (Active).
- Timeline:

| Time | What happens |
|---|---|
| 0.0 | Cursor at 55% / 55%. Scene fades in over skeleton tiles. |
| 0.9 | Product logos pop in. "Registered from Snaarp Mail" appears. |
| 1.6 - 3.6 | Caption "Your account is ready. This is your Snaarp products home". Ring around the product grid. |
| 3.8 | Caption "Click Create/Configure Emails to open your admin area". Cursor to the card (hover tooltip), ring. |
| 5.4 | Click. |
| 5.8 | White fade to screen B (loading). |
| 7.4 | Fade to screen C. Caption "Sign in with the email and password you just created". |
| 9.0 | Types email, then password (masked). |
| 12.4 | Caption "Click Sign in to Admin Portal". Ring, click. |
| 13.8 | Fade to screen D. Caption "This is your Admin Dashboard". Numbers count up (0.6 s). |
| 15.4 | Caption "See your domains, users, inboxes and plan at a glance". Cursor and ring visit the four stat cards. |
| 18.6 | Caption "Next, add your company domain". Cursor to Domains in the sidebar, ring. |
| 21.0 | Rests on Domains without clicking (ends). Step 4 starts on this exact frame. |

---

## Step 4 - Add and verify your domain

- Files: `Step4Domains.tsx`, `step4-script.ts`, `step4/` (`DomainsPage.tsx`, `AddDomainModal.tsx`, `DnsTab.tsx`, `step4-data.ts`). `durationMs` 29500.
- URL pill: `admin.snaarp.com/admin/domains` for the whole step. The script never calls `setUrl`, so the pill already shows the domains address while the dashboard is still on screen for the first 0.6 s (see known issues in `HANDOFF.md`).
- Screens: dashboard (carried over from step 3) -> Domain Management (empty) -> Add Domain modal -> domain row "pending" -> DNS tab (MX, CNAME, three TXT records) -> back to Domains -> row actions menu -> verified.
- Sample data (`step4-data.ts`): domain `acme-studio.com`. MX `10 mail.mailrit.com.` TTL 3600. CNAME `mail.acme-studio.com` -> `mail.mailrit.com.`. TXT: `rsa._domainkey.acme-studio.com` (made-up DKIM key), `acme-studio.com` = `v=spf1 mx ra=postmaster -all`, `_dmarc.acme-studio.com` = `v=DMARC1; p=reject; rua=mailto:postmaster@acme-studio.com; ruf=...`. The "Created" date in the row is **today's date** (`toLocaleDateString("en-GB")`), not a fixed date.
- Timeline:

| Time | What happens |
|---|---|
| 0.0 | Cursor and ring already on Domains. Caption "Open Domains from the menu". |
| 0.6 | Click. Domain Management appears (empty state). |
| 2.2 | Caption "You have no domains yet. Click Add Domain". Cursor to the button, ring, click. Modal opens. |
| 4.2 | Caption "Enter your company domain without http:// or www". Types the domain. |
| 7.4 | Caption "Keep the defaults: Primary, Manual setup and Quarantine". Rings on Category, DNS Provider, DMARC (0.65 s each). |
| 9.8 | Cursor to Add Domain, ring, click. Modal closes, row appears with a red "pending" pill, counts change, toast "Domain acme-studio.com created successfully". |
| 12.4 | Caption "Your domain is added but not verified yet". Ring on the status pill until 13.8. |
| 14.0 | Caption "Open the DNS tab to see the records you need". Click the DNS tab. |
| 16.2 | Caption "Add these MX, CNAME and TXT records at your domain provider". Clicks the copy icon next to the MX hostname ("Copied" for 1 s). The page scrolls to the bottom (3.6 s). |
| ~21.2 | Caption "Back on Domains, open the actions menu". Scrolls to top, clicks the Domains tab. |
| 23.2 | Cursor to the row's three-dots button and opens the menu. Hovers "Publish DNS Automatically", then the caption "After the records are added, choose Verify Domain" appears and the cursor moves to "Verify Domain" (ring). |
| ~26.0 | Click Verify Domain. Pill turns green "verified", DNS status "All records found", Verified count 1, toast "Domain verification completed". |
| ~26.3 | Caption "Your domain is verified. Next, add your first user". |
| 29.0 | Ends on the verified domain list. |

---

## Step 5 - Add your first user

- Files: `Step5Users.tsx`, `step5-script.ts`, `step5/` (`UserManagement.tsx`, `AddUserModal.tsx`, `UserLogin.tsx`, `AdminPanelDashboard.tsx`, `AdminPanelUsers.tsx`, `step5-data.ts`). `durationMs` 42000.
- Starts on step 4's verified domain list with no fade (`DomainsPage instant`, state seeded in `seedFromStep4`). Cursor continues from where the "Verify Domain" click left it.
- Screens and URL pill (`URLS` in the script):

| Screen | What | URL pill |
|---|---|---|
| (start) | Verified domain list (owner portal) | `admin.snaarp.com/admin/domains` (config URL) |
| A | User Management, empty (owner portal, "User" active) | `admin.snaarp.com/admin/users` |
| B | "Add New User" modal over A | `admin.snaarp.com/admin/users` |
| C | User Management with the new user | `admin.snaarp.com/admin/users` |
| D | User login, 50/50 split, black Login button | `login.snaarp.com/login?redirect=%2F` |
| E | Products home for the new user (skeleton, then only "Project"; avatar "S") | `login.snaarp.com/admin` |
| (loading) | Bare spinner | `login.snaarp.com/admin` |
| F | Admin Panel dashboard (`AdminPanelLayout`) | `login.snaarp.com/admin` |
| G | Admin Panel, Users | `login.snaarp.com/admin/users` |

- Sample data (`step5-data.ts`): owner Jane Doe `jane@acme-studio.com`; new user Sam Lee `sam.lee@acme-studio.com` (email name `sam.lee` chosen from chips sam, lee, sam.lee, sam_lee, samlee, slee); recovery `sam.recovery@example.com`; fake generated password `Wd7#kQ2mPz9a`; domain `acme-studio.com`. Toasts: "Password copied to clipboard", "User inbox sam.lee@acme-studio.com created successfully!", "Login successful".
- Timeline:

| Time | What happens |
|---|---|
| 0.0 | Caption "Open User in the menu". At 0.3 the cursor glides to User; click (screen A fades in). |
| 2.4 | Caption "Click Add User". Cursor, ring, click. Modal opens. |
| 4.0 | Caption "Enter the new user's name". Types Sam, then Lee. |
| 6.6 | Suggestion chips appear. Caption "Choose an email name. Your verified domain is already selected". Ring on the domain select, then the cursor clicks the `sam.lee` chip (name part fills, Preview line shows). |
| 9.4 | Caption "Add a recovery email". Types it. (Department is skipped; it is optional.) |
| 11.6 | Caption "Keep both welcome email options on". Ring around both checkboxes (0.9 s), then the modal scrolls down (1.0 s). |
| 13.8 | Generated password and Credentials box fade in. Caption "Copy the generated password and keep it safe". Cursor to Copy, click, toast. |
| 16.0 | Caption "These are the new user's sign-in details". Ring on Credentials for 1.2 s. |
| 18.6 | Caption "Click Create User". Ring, click. Button shows a spinner and "Creating..." for 1.0 s (about 19.8 - 20.8). |
| ~20.8 | Modal closes. Screen C: toast, stats show 1 Active User, the Sam Lee row slides in. Caption "Your first user is created". |
| 23.4 | Caption "Copy the email address. Your user will sign in with it". The cursor drags over the email; it gets a light blue selection (0.7 s). |
| 25.6 | White fade to screen D. Caption "Now sign in as the new user". |
| 26.7 | Types the email, then 12 masked characters. Caption "Click Login". Ring, click. Button shows "Logging in...", bottom-left toast "Login successful", held 0.9 s. |
| 30.4 | White fade to screen E. Caption "Admins see a System Admin card. Click it". Skeleton for 0.8 s, then the Project tile. Cursor to System Admin (lifts on hover), ring, click. |
| 33.6 | Caption hidden. Loading spinner (about 0.6 s), then screen F. Caption "This is the Admin Panel for your new admin". Cursor and ring visit the three stat cards. |
| 36.4 | Cursor to Users in the menu, click. Screen G. Caption "Both people now appear in Users". |
| 39.4 | Caption "Your team can now sign in with their own Snaarp email". Ring sweeps the Jane Doe row, then the Sam Lee row. |
| 42.0 | Step ends. Step 5 is marked done (rail 5/5). |

Several beats run a fraction of a second after their anchor because glides and typing take time. The measured start of the completion card is about 124 s from page load.

---

## Completion screen

- Files: `components/player/CompletionCard.tsx`, `tutorials/completion.ts`, text in `tutorials/snaarp-360.ts` (`completion`).
- Shown by `TutorialPlayer` when `status` is `"finished"`, 0.5 s after step 5 ends. The last scene stays visible, blurred, behind a white 85% overlay; the card fades up.
- Content: large purple check circle, "You're all set", "Snaarp 360 is ready for your team.", purple button "Replay tutorial", text link "Back to Snaarp" (`https://snaarp.com`, `target="_top"`).
- After it shows, nothing autoplays. "Replay tutorial" clears all ticks and restarts at step 1. Clicking a step in the rail also restarts from that step.

---

## Cancel button (player shell, all products)

- File: `components/player/TutorialPlayer.tsx`. Lives in the shell, so it shows for every product and every step (and later for Snaarp Mail) without touching any scene.
- Position: a white rounded pill in the **top-right corner of the player**, aligned with the browser top-bar row (`absolute right-4 top-4`), matching `reference.png`. An `x` icon with the label "Cancel"; dark text on white, hairline border and soft shadow.
- Click or **Escape** posts `{ type: "snaarp-tutorial-cancel" }` to the parent window (`window.parent.postMessage`). When the page is **not** inside a frame it instead stops the tutorial and shows a blank page (no navigation).
- Responsive: below 900px it collapses to an **X-only** button in the same corner (the "Cancel" label is hidden). Verified at 1920x1080, 1440x900, 1280x720 and 390x844 with nothing overlapping or cut off.
- The existing controls are unaffected: Space still pauses/resumes, Collapse still works, rail step jumps still work.

---

# Snaarp Mail ("How to set up Snaarp Mail")

Config: `tutorials/snaarp-mail.ts`, route `/tutorials/snaarp-mail`. Recording: `ref/mail/Snaarp_Mail_setup.mp4` (998x480, 3:05; git-ignored). Only step 1 is built; the rest show "Coming soon" in the rail. Completion text (used when all nine are built): "You're all set" / "Snaarp Mail is ready for your team."

| Step | Title | URL pill | Status |
|---|---|---|---|
| 1 | Choose your plan | `snaarp.com/pricing` | Done |
| 2 | Create your account | `login.snaarp.com/signup` | Not built |
| 3 | Tell us about your organization | `login.snaarp.com/onboarding/organization` | Not built |
| 4 | Connect your domain | `login.snaarp.com/onboarding/domain` | Not built |
| 5 | Review your DNS records | `login.snaarp.com/onboarding/dns` | Not built |
| 6 | Add the records in Cloudflare | `dash.cloudflare.com/acme-studio.com/dns/records` | Not built |
| 7 | Confirm the records | `login.snaarp.com/onboarding/dns` | Not built |
| 8 | Add your team | `login.snaarp.com/onboarding/users` | Not built |
| 9 | Finish setup | `login.snaarp.com/onboarding/complete` | Not built |

URL pills of steps 2-5 and 7-9 are placeholders (the address bar is not visible in the recording).

## Mail step 1 - Choose your plan

- Files: `scenes/snaarp-mail/Step1Pricing.tsx`, `step1-script.ts`, `pricing-data.ts`. `durationMs` 9300 (runs about 9.4 s). The page is the shared `components/pricing/PricingScene.tsx`.
- Recording: 0:00-0:05 (the video opens on the Mail tab; the tutorial starts on the 360 tab as the owner specified).
- URL pill: `snaarp.com/pricing` (config only).
- Screen: the Snaarp pricing page, scrolled (`startScroll` 408) so the product tab bar sits just under the nav. Nav shows Pricing, Contact Sales, Login and a currency selector "NGN" with the Nigerian flag. Tabs as in 360 (15 tabs).
- Mail tab plans (naira, from the recording frames):

| Plan | Price /month | Total for 12 months | Storage | Users line | Icons |
|---|---|---|---|---|---|
| Starter | ₦8,917.03 | ₦107,004.42 | 10 GB | 10 Users | Mail, Drive |
| Growth | ₦44,585.17 | ₦535,022.08 | 100 GB | 25 Users | Mail, Drive, Sheet, Slides + faint shield |
| Business (Most popular) | ₦89,170.35 | ₦1,070,044.16 | 600 GB | 25 users | Mail, Drive, Lock, Sheet, Slides, Meet + faint shield |
| Scale | ₦178,340.69 | ₦2,140,088.32 | 2.5 TB | 50 users | Mail, Drive, Lock, Slides, Teams, Meet, PDF + faint shield |

  Each card: "14-day free trial" pill, "Billed monthly", checklist (users line in bold, then storage, Business Emails, Migration Assistance, Mobile App, Bulk Registration, Admin Dashboard; Business lists Mobile App last, as in the recording), "Start 14-day free trial" button (solid purple on Business, outlined on the others). Wording (including "users" / "shared space" capitalization) follows the frames.
- 360 tab (the starting tab): the same four 360 plans as the 360 tutorial (Team, Business, Scale, Growth; 17 logos each), with naira prices from the live pricing page screenshot the owner shared: Team ₦87,386.94 (total ₦1,048,643.28), Business ₦176,557.29 (₦2,118,687.44), Scale ₦444,068.33 (₦5,328,819.92), Growth ₦889,920.06 (₦10,679,040.73).
- Timeline:

| Time | What happens |
|---|---|
| 0.0 | Page fades in, cursor near the centre. 360 tab selected. |
| 0.45 | Tab bar fades up. |
| 1.0 | Caption "Open the Snaarp pricing page and choose the Mail tab". Cursor to Mail, ring, click (about 2.4 s). The purple pill moves to Mail and the cards swap with a 0.3 s fade. |
| 4.0 | Caption "Pick the plan that fits your team". Cursor drifts over Starter, then Growth; the Growth card lifts. |
| 6.6 | Caption "Click Start 14-day free trial". Cursor to the Growth button, ring, click (pressed state). |
| 8.6 | Ring and caption cleared, white fade-out. Ends at 9.3. |

- After step 1 the shell shows an end card "Step 1 complete / The next steps are coming soon." with Replay (rail 1/9). It becomes "You're all set" only when every step is built.

