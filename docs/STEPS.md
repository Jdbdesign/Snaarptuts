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
- Sample data: Jane / Doe / `jane@acme-studio.com` / Acme Studio / United Kingdom +44 / `7700 900123` / password `Sample#Pass1`.
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

## Cancel button (removed)

- The Cancel button (top-right pill, X-only under 900px, Escape shortcut, `postMessage` / blank page) was removed from the player shell by owner decision. The top-right corner of the player is empty. It can be restored from the git commit "Add Cancel button to player shell".
- The other controls are unaffected: Space pauses/resumes, Collapse works, rail step jumps work.

---

# Snaarp Mail ("How to set up Snaarp Mail")

Config: `tutorials/snaarp-mail.ts`, route `/tutorials/snaarp-mail`. Recording: `ref/mail/Snaarp_Mail_setup.mp4` (998x480, 3:05; git-ignored). All 9 steps are built. Completion text (used when all nine are built): "You're all set" / "Snaarp Mail is ready for your team."

| Step | Title | URL pill | Status |
|---|---|---|---|
| 1 | Choose your plan | `snaarp.com/pricing` | Done |
| 2 | Create your account | `login.snaarp.com/signup` | Done |
| 3 | Tell us about your organization | `login.snaarp.com/onboarding/organization` | Done |
| 4 | Connect your domain | `login.snaarp.com/onboarding/domain` | Done |
| 5 | Review your DNS records | `login.snaarp.com/onboarding/dns` | Done |
| 6 | Add the records in Cloudflare | `dash.cloudflare.com/acme-studio.com/dns/records` | Done |
| 7 | Confirm the records | `login.snaarp.com/onboarding/dns` | Done |
| 8 | Add your team | `login.snaarp.com/onboarding/users` | Done |
| 9 | Finish setup | `login.snaarp.com/onboarding/complete`, then `admin.snaarp.com/admin` | Done |

URL pills of steps 2-5 and 7-9 are placeholders (the address bar is not visible in the recording).

## Mail step 1 - Choose your plan

- Files: `scenes/snaarp-mail/Step1Pricing.tsx`, `step1-script.ts`, `pricing-data.ts`. `durationMs` 9300 (runs about 9.4 s). The page is the shared `components/pricing/PricingScene.tsx`.
- Recording: 0:00-0:05 (the video opens on the Mail tab; the tutorial starts on the 360 tab as the owner specified).
- URL pill: `snaarp.com/pricing` (config only).
- Screen: the Snaarp pricing page, scrolled (`startScroll` 408) so the product tab bar sits just under the nav. Nav shows Pricing, Contact Sales, Login and a currency selector "GBP" with the UK flag. Tabs as in 360 (15 tabs).
- Mail tab plans (pounds: UK sample prices, pence shown; plans, storage and features from the recording frames; prices come from `MONTHLY_MAIL` and the total is always 12 x the monthly price):

| Plan | Price /month | Total for 12 months | Storage | Users line | Icons |
|---|---|---|---|---|---|
| Starter | £5.00 | £60.00 | 10 GB | 10 Users | Mail, Drive |
| Growth | £25.00 | £300.00 | 100 GB | 25 Users | Mail, Drive, Sheet, Slides + faint shield |
| Business (Most popular) | £50.00 | £600.00 | 600 GB | 25 users | Mail, Drive, Lock, Sheet, Slides, Meet + faint shield |
| Scale | £100.00 | £1,200.00 | 2.5 TB | 50 users | Mail, Drive, Lock, Slides, Teams, Meet, PDF + faint shield |

  Each card: "14-day free trial" pill, "Billed monthly", checklist (users line in bold, then storage, Business Emails, Migration Assistance, Mobile App, Bulk Registration, Admin Dashboard; Business lists Mobile App last, as in the recording), "Start 14-day free trial" button (solid purple on Business, outlined on the others). Wording (including "users" / "shared space" capitalization) follows the frames.
- 360 tab (the starting tab): the same four 360 plans as the 360 tutorial (Team, Business, Scale, Growth; 17 logos each), with the same monthly prices as the 360 tutorial (`MONTHLY_360`), shown with pence here: Team £49.00 (total £588.00), Business £99.00 (£1,188.00), Scale £249.00 (£2,988.00), Growth £499.00 (£5,988.00).
- Timeline:

| Time | What happens |
|---|---|
| 0.0 | Page fades in, cursor near the centre. 360 tab selected. |
| 0.45 | Tab bar fades up. |
| 1.0 | Caption "Open the Snaarp pricing page and choose the Mail tab". Cursor to Mail, ring, click (about 2.4 s). The purple pill moves to Mail and the cards swap with a 0.3 s fade. |
| 4.0 | Caption "Pick the plan that fits your team". Cursor drifts over Starter, then Growth; the Growth card lifts. |
| 6.6 | Caption "Click Start 14-day free trial". Cursor to the Growth button, ring, click (pressed state). |
| 8.6 | Ring and caption cleared, white fade-out. Ends at 9.3. |

- After the last built step the shell shows an end card "Step N complete / The next steps are coming soon." with Replay. It becomes "You're all set" only when every step is built.


## Mail step 2 - Create your account

- Files: `scenes/snaarp-mail/Step2Signup.tsx`, `step2-script.ts`, `signup-data.ts` (all copy, sample values, captions and the strength rule). `durationMs` 21000. Reuses `TypedField` and `Checkbox` from `components/admin/`. It is a separate scene from the 360 sign-up page (different layout), not a variant of it.
- Recording: 0:05-0:42 (frames in `ref/mail/frames-step2`). URL pill: `login.snaarp.com/signup` (config only).
- Screen: split page. Left (54% wide): near-black panel with a faint low-poly pattern, "Snaarp" wordmark, heading "Secure business email for your organization", paragraph, three feature rows (shield, people, gear icons on white tiles), footer links. Right: white, centred card "Sign up for Snaarp" with the SELECTED PLAN box (Growth, GBP 25.00/month, 100 GB, Billed monthly, 14-day free trial included in green), First/Last name, Email, Organization name, Country (United Kingdom, UK flag), +44 and Phone number, Password with eye icon, strength bar and "Password strength: None/Weak/Good/Strong", terms checkbox, dark "Create Account" button, "Already have an account? Log In". Only the right panel scrolls.
- Sample data: Jane Doe, jane.doe@example.com, Acme Studio, United Kingdom +44, 7700 900123, password `Wd7#kQ2mPz9a` (shown as dots only).
- Strength rule (`passwordStrength` in `signup-data.ts`): Weak under 6 characters (red, 1/3), Good from 6 (yellow, 2/3), Strong from 10 characters with upper, lower, number and symbol (green, full).
- Timeline:

| Time | What happens |
|---|---|
| 0.0 | Page fades in. Growth already selected. |
| 1.0 | Caption "Your plan is already selected: Growth, GBP 25.00/month". Ring on the plan box until 2.8. |
| 3.0 | Caption "Enter your name". Types Jane, Doe. |
| 5.2 | Caption "Use an email address you can access". Types the email. |
| 7.0 | Types the organization name (caption stays). |
| 8.4 | Caption "Check your country and phone code". Rings on Country and +44, then types the phone number. |
| 10.8 | Caption "Choose a strong password. Aim for Strong". Types the password; bar goes Weak, Good, Strong. Then the form scrolls just enough to show the checkbox, button and Log In line (about 180 px on a short window, none when the whole form already fits). |
| 15.0 | Caption "Accept the Terms of Service and Privacy Policy". Cursor ticks the checkbox. |
| 17.6 | Caption "Click Create Account". Ring, click. Button turns grey with a spinner and "Creating Account..." for 1.2 s. |
| 20.4 | Caption cleared, white fade. Ends at 21.0. |

- Below 900px wide the dark panel becomes a slim header above the form and the card is enlarged (CSS zoom 2.7) so it stays readable.

## Mail step 3 - Tell us about your organization

- Files: `scenes/snaarp-mail/Step3Organization.tsx`, `step3-script.ts`, `org-data.ts`. `durationMs` 24400. Shell: `components/onboarding/OnboardingShell.tsx`. Toast: `components/admin/Toast.tsx`. Fields: `TypedField` (new `tone="purple"` focus ring). New icons in `components/icons.tsx`: `orgChart`, `userPlus`, `circleTick`.
- Recording: 0:44-1:18 (frames in `ref/mail/frames-step3`). URL pill: `login.snaarp.com/onboarding/organization` (config only).
- OnboardingShell: 238 px dark sidebar (#0D1218, faint polygon pattern) with five items (Organization, Domain, DNS, Users Inbox, Set up completed) joined by thin vertical connectors. The current item and all before it are white and bold, later ones dim. `active` is the only setting a step passes. Under 900px the sidebar becomes a slim row of five icons. The white content area scrolls inside itself (`data-tl="content-panel"`); the page never scrolls.
- Screen: card "Organization Details" (building icon, "Tell us about your organization"); Organization Name (light blue, prefilled Acme Studio), Industry and Company Size selects, Website and Phone Number side by side, Address; Back (outlined) and Continue (#7C39ED) below the card. Two columns stack under 900px.
- Sample data: Acme Studio, Technology, 1-10 employees, https://acme-studio.com, +44 20 7946 0123, 10 Acme Street, London, EC1A 1AA.
- Timeline:

| Time | What happens |
|---|---|
| 0.0 | Shell and card fade in. Organization Name already filled. |
| 1.0 | Caption "Check your organization name". Ring on the field until 2.6. |
| 2.8 | Caption "Choose your industry". Cursor to Industry, click, list opens, hovers Healthcare and Finance, picks Technology, list closes. |
| 6.4 | Caption "Choose your company size". Opens the list, hovers 11-50 employees, picks 1-10 employees. |
| 10.4 | Caption "Website, phone and address are optional". Types the website. |
| 13.6 | Types the phone number. |
| 17.0 | Types the address. |
| 20.4 | Caption "Click Continue". Ring, click. Button shows a spinner and "Saving..." and the card dims. About 0.5 s later the green toast "Organization details saved successfully!" slides in top right. |
| 23.8 | Caption cleared, quick white fade. Ends at 24.4. |

- After step 3 the shell shows "Step 3 complete / The next steps are coming soon." (rail 3/9).

## Mail step 4 - Connect your domain

- Files: `scenes/snaarp-mail/Step4Domain.tsx`, `step4-script.ts`, `domain-data.ts` (all copy, sample value, captions), `domain/ChooseScreen.tsx`, `EnterScreen.tsx`, `SuccessScreen.tsx`, `Heading.tsx`. `durationMs` 20600. New icon: `link` in `components/icons.tsx`.
- Recording: 1:20-1:52 (frames in `ref/mail/frames-step4`). URL pill: `login.snaarp.com/onboarding/domain` (config only).
- Three screens inside one `OnboardingShell` with `active="domain"` (Organization shown as visited). The sidebar stays mounted; only the content area changes (0.4 s fade).
- Screen A: "Snaarp", "Connect your domain", grey line; two cards (left dark navy and selected: Use existing domain with four checks; right light and disabled with a "Coming soon" badge: Buy new domain with four checks); full-width navy "Add Domain".
- Screen B: "Welcome to Snaarp", grey line, label "Enter Domain Name", input (placeholder mydomain.com, purple focus border, focused when the screen opens), "Add New Domain" (grey until there is text, then navy) and outlined "Cancel".
- Screen C: green circle with check (scales in), "Congratulations! Your domain "ACME-STUDIO.COM" added successfully", grey line, navy "Proceed to Domain Verification".
- Sample data: acme-studio.com (shown as ACME-STUDIO.COM).
- Timeline:

| Time | What happens |
|---|---|
| 0.0 | Screen A fades in. Caption "Choose Use existing domain. You will connect a domain you already own". Ring on the left card until 3.0. |
| 3.0 | Cursor to Add Domain, ring, click. |
| 5.0 | Screen B. Caption "Enter your domain without www". Types acme-studio.com slowly; the button turns navy at the first letter. |
| 11.0 | Caption "Click Add New Domain". Ring, click. |
| 13.4 | Screen C with the check scale-in. Caption "Your domain is added". |
| 17.5 | Caption "Click Proceed to Domain Verification". Ring, click. |
| 20.0 | Caption cleared, quick white fade. Ends at 20.6. |

- Below 900px wide the two option cards stack and the content is enlarged (CSS zoom 2).

## Mail step 5 - Review your DNS records

- Files: `scenes/snaarp-mail/Step5Dns.tsx`, `step5-script.ts`, `dns-data.ts` (all copy, captions and the five records), `dns/DnsModal.tsx`; shared card `components/onboarding/DnsRecordCard.tsx`. `durationMs` 31600. New icons: `circleX`, `circleCheck`. `OnboardingShell` has a new `overlay` prop (draws the modal over the sidebar too).
- Recording: 1:55-3:00 (frames in `ref/mail/frames-step5`). URL pill: `login.snaarp.com/onboarding/dns` (config only).
- Page (OnboardingShell, DNS active): "Back To Domain", "DNS Mapping", grey paragraph, yellow "Configuration Steps" note (3 px yellow left border) with a blue "Click here for detailed instructions." link, black "Publish DNS automatically" button (right), grey "To continue..." line, five record cards, the TTL note, and a full-width Continue (grey until all five are verified, then #111827). Content is left-aligned, 583 px wide; the white area scrolls inside itself.
- Records (sample data, defined once in `DNS_RECORDS`): MX (acme-studio.com, priority 10, mail.mailrit.com.), CNAME (mail.acme-studio.com), TXT DKIM (rsa._domainkey.acme-studio.com, made-up key), TXT SPF, TXT DMARC (_dmarc.acme-studio.com). Tag colours: MX blue, CNAME indigo, TXT amber while pending and green once verified.
- `DnsRecordCard`: type tag, "1 record", red "Pending" + black "Mark submitted" (send icon) or green "Verified"; one-row table with copy icons (tiny "Copied" tooltip); status cell red circle-x or green circle-check. State: scene variable `dns:<id>` (`tl.setVar` or click `[data-tl=mark-<id>]`). Step 7 reuses it.
- Modal "Automatic DNS Publishing" (388 px wide): DNS Provider select (Manual Setup (Copy & Paste), Cloudflare, GoDaddy, Spaceship), blue info box, yellow credentials note, centred Close.
- Timeline:

| Time | What happens |
|---|---|
| 0.0 | Page fades in. |
| 1.0 | Caption "Snaarp shows the DNS records your domain needs". Ring on the heading area until 2.8. |
| 3.0 | Caption "Each record has a type, a name and a value". Scrolls to the CNAME card (2 s), cursor copies its host (Copied tooltip), then scrolls slowly to the bottom (5.2 s). |
| 13.0 | Scroll back to the top (1.2 s). |
| 14.5 | Caption "You can publish automatically for some providers". Cursor to Publish DNS automatically, ring, click. The modal opens. |
| 18.0 | Caption "We will add the records by hand. Keep Manual Setup". Opens the select, hovers Cloudflare, GoDaddy, Spaceship, picks Manual Setup (list closes). |
| 25.0 | Cursor clicks Close; the modal closes. |
| 27.0 | Caption "Next, open your Cloudflare dashboard and add these records". |
| 31.0 | Caption cleared, quick white fade. Ends at 31.6. |

- Below 900px wide the page is enlarged (CSS zoom 2.3) and the modal scales with it.

## Mail step 6 - Add the records in Cloudflare

- Files: `scenes/snaarp-mail/Step6Cloudflare.tsx`, `step6-script.ts`, `cloudflare-data.ts` (copy, captions, record mapping), `cloudflare/OverviewPage.tsx`, `DnsRecordsPage.tsx`, `RecordForm.tsx`, `RecordsTable.tsx`; shared frame in `components/cloudflare/` (`CloudflareChrome.tsx`, `CfField.tsx`, `parts.tsx`, `cloudflare-data.ts`). `durationMs` 60600. There is no recording for this step: the look follows the three screenshots in `ref/mail/cloudflare-*.png` (an older Cloudflare dashboard). **It is an illustration.**
- URL pill: starts at `dash.cloudflare.com/acme-studio.com` (Overview) and changes to `.../dns/records` when DNS is clicked (the config value is the DNS address). The shell pill is 320 px wide, so the long address is cut off at the end.
- Screens: **Overview** (status card, three small summary cards, next-step card) and **DNS Records** (H1 "DNS", card "DNS management for acme-studio.com", search, grey Advanced, outlined blue Add record, table Type / Name / Content / Proxy status / TTL / Actions with two existing rows: A @ 203.0.113.10 Proxied, CNAME www Proxied). Left menu: back arrow + acme-studio.com and 15 items; DNS is highlighted and opens Records / Settings. Top bar: orange cloud + "CLOUDFLARE", Add site, Support, English (US), user. Footnote on every page: "Illustration of the Cloudflare dashboard. Your screen may look slightly different."
- Add-record form (inline, above the table): Type select, Name (required, "Use @ for root"), a value field whose label follows the type (IPv4 address for A, Mail server for MX, Target for CNAME, Content for TXT, a tall multi-line box), Priority (MX only), Proxy toggle (A, AAAA and CNAME only; orange Proxied or grey DNS only), TTL Auto, Cancel and Save (#0051C3). Scene variables: `page`, `form`, `ftype`, `typeMenu`, `proxied`, `rows`, `field:name`, `field:value`, `field:priority`, `focus`. Save builds the row from what is in the form, shows the toast "Record added" (1.5 s, just below the top bar) and closes the form. New rows slide in with a soft blue highlight (`.cf-row-new`).
- Record values come from `DNS_RECORDS` (step 5): MX Name @, Mail server mail.mailrit.com, Priority 10; CNAME Name mail, Target mail.mailrit.com, DNS only; TXT DKIM Name rsa._domainkey; TXT SPF Name @; TXT DMARC Name _dmarc (Content = the same values as step 5).
- Timeline (one `addRecord` sequence runs five times: Add record, Type list, Name, value (typed, or pasted for TXT), extras, Save):

| Time | What happens |
|---|---|
| 0.0 | Overview fades in (0.5 s). Caption "Open your domain in Cloudflare". |
| 2.0 | Cursor to DNS, ring, click. The page changes to DNS Records; Records / Settings open under DNS. |
| 4.5 | Caption "Click Add record". Cursor to Add record, ring, click. The form opens. |
| about 6 | MX: caption "MX record: name @, mail server mail.mailrit.com, priority 10". Type list opens, MX chosen, Name @, Mail server typed, Priority 10 (all filled by about 12 s). |
| 15.0 | Save. Toast, MX row (priority tag 10, DNS only). |
| 17.5 | CNAME: Add record, CNAME, Name mail, Target typed. Caption "Turn the orange cloud off. Mail records must be DNS only"; the cursor rings the toggle and clicks it (orange Proxied becomes grey DNS only, off by about 25 s). |
| 27.5 | Save. |
| 30.0 | DKIM: Add record, TXT, Name rsa._domainkey, value pasted (the field flashes blue). Caption "Paste the DKIM value exactly as shown in Snaarp". |
| 37.0 | Save. |
| 39.5 / 46.0 | SPF: Add record, TXT, Name @, paste. Caption "SPF record: name @". Save. |
| 48.5 / 54.0 | DMARC: Add record, TXT, Name _dmarc, paste. Caption "DMARC record: name _dmarc". Save. |
| 56.5 | One ring around the five new rows. Caption "All five records are added. Go back to Snaarp". |
| 60.0 | Caption cleared, quick white fade. Ends at 60.6. Step 6 is marked done. |

- Below 900px wide the dashboard is enlarged (CSS zoom 2), the left menu becomes a slim icon column and the form fields wrap.

## Mail step 7 - Confirm the records

- Files: `scenes/snaarp-mail/step7-script.ts` (new); the scene is the step 5 component `Step5Dns.tsx` (same page, same `DnsRecordCard`), copy in `dns-data.ts` (`CAPTIONS.confirm`, `CAPTIONS.continue`). `durationMs` 14600. Frames for reference: `ref/mail/frames-step7/` (recording 2:25-3:00, which scrolls the page and shows Verified cards and the grey Continue; it does not show every card being marked). URL pill: `login.snaarp.com/onboarding/dns` (config only).
- Start state: all five cards Pending, modal closed, page at the top, Continue grey and disabled.
- Changes to shared pieces (step 5 looks and plays the same): `DnsRecordCard` gives the green check icons a small pop when a card turns Verified; `Step5Dns` reads the scene variables `holdContinue` (Continue stays grey while true) and `bottomRoom` (extra padding under the page); the Continue button has a small pressed state.
- Timeline:

| Time | What happens |
|---|---|
| 0.0 | Page fades in. Caption "Back in Snaarp, click Mark submitted on each record". |
| 1.5 | Cursor clicks Mark submitted on MX. Pending and the red circle-x become Verified and a green check (check pop). The page scrolls just enough before each click to keep the card visible. |
| 3.1 / 4.7 / 6.3 / 7.9 | Same for CNAME, DKIM, SPF, DMARC. |
| 10.5 | Continue turns from grey to dark navy (#111827). Caption "Click Continue". The page scrolls so the button is visible. |
| 11.5 | Cursor to Continue, ring, click (about 12.5). |
| 14.0 | Caption cleared, quick white fade. Ends at 14.6. Step 7 is marked done. |

- Below 900px wide the page is enlarged (CSS zoom 2.3), as in step 5.

## Mail step 8 - Add your team

- Files: `scenes/snaarp-mail/Step8Users.tsx`, `step8-script.ts`, `users-data.ts`, `users/OptionCards.tsx`, `users/TeamTable.tsx`. `durationMs` 32100. Design: the owner's `ref/mail/users-inbox.png` (copied to `ref/mail/`); there is no recording for this step. URL pill: `login.snaarp.com/onboarding/users` (config only).
- Screen (inside `OnboardingShell`, `active="users"`; Organization, Domain and DNS shown as visited): white card (780 px, soft shadow, centred) with the title "Add your team members" (24 px bold), grey intro, three option cards (Add Manually: selected, solid black, white user-plus tile, green "Recommended" pill; Import CSV; Sync Google Workspace), the heading "Team Members" with the pill "Total: N user(s)", an outlined Export button (decorative) and a black Add User button, the table (checkbox, NAME, EMAIL, ROLE, STATUS, ACTIONS; empty state "No team members yet"), and Back (outlined) and Continue (black). Sizes follow the design scaled to the 1440 px scene. The option cards stack and the card is enlarged (CSS zoom 1.8) under 900px; the table scrolls sideways inside its card there.
- Row: coloured initials avatar, name, email, role pill (light blue), status pill (Pending orange, Active green), three-dot button; its menu is a small white card with Copy link, Edit and Delete (red). Rows slide in with `tl-row-in`.
- Modal: the 360 `AddUserModal` unchanged apart from the optional `user` setting; the domain select shows @acme-studio.com.
- Sample data: Sam Lee, sam.lee@acme-studio.com, recovery sam.recovery@example.com, role User, status Pending, green "SL", password Wd7#kQ2mPz9a (all in `users-data.ts`).
- Timeline:

| Time | What happens |
|---|---|
| 0.0 | Shell and card fade in. Table empty, "Total: 0 users". |
| 1.0 | Caption "Choose Add Manually. It is the recommended way". Ring on the black card. |
| 3.5 | Caption "Click Add User". Cursor to Add User, ring, click. |
| 5.0 | Modal opens. Caption "Enter the new user's name". Types Sam, Lee. |
| 7.2 | Caption "Choose an email name on your verified domain". Ring on the domain select, then the sam.lee chip is clicked; the Preview line shows sam.lee@acme-studio.com. |
| 10.0 | Types the recovery email. |
| 12.2 | Caption "Keep both welcome email options on". Ring on the two checkboxes; the modal scrolls down. |
| 14.2 | Password box fades in. Caption "Copy the generated password and keep it safe". Cursor clicks Copy; toast "Password copied to clipboard". |
| 18.0 | Caption "Click Create User". Cursor starts at 18.9, ring, click; "Creating..." for 1 s. |
| 21.0 | Modal closes. Toast "User inbox sam.lee@acme-studio.com created successfully!". The Sam Lee row slides in; "Total: 1 user". Caption "Your first user is added". |
| 24.5 | Caption "Use Copy link to share the setup link with your user". Cursor to the three dots, click; menu opens, cursor rests on Copy link; the menu closes at 28.0. |
| 29.0 | Caption "Click Continue". Cursor to Continue, ring, click. |
| 31.5 | Caption cleared, quick white fade. Ends at 32.1. Step 8 is marked done. |

## Mail step 9 - Finish setup (last step)

- Files: `scenes/snaarp-mail/Step9Finish.tsx`, `step9-script.ts`, `finish-data.ts`, `finish/SetupCompleted.tsx`. `durationMs` 21000. Design: the owner's `ref/mail/setup-completed.png`; there is no recording for this step. URL pill: `login.snaarp.com/onboarding/complete` (config), changed to `admin.snaarp.com/admin` for the dashboard.
- Shared pieces: `OnboardingShell` has a new optional `completed` setting (the "Set up completed" item cross-fades from the outline circle-tick to a solid white circle with a dark check, 0.5 s; the other steps do not pass it, so they are unchanged). The dashboard is the 360 `DashboardContent` (in `scenes/snaarp-360/step3/AdminDashboard.tsx`) inside `AdminLayout`; it now takes an optional `stats` list (default = the 360 values).
- Screen A (inside `OnboardingShell active="done"`): white card (780 px, soft shadow, centred): pale-green circle with a dark green check, "Setup Completed!" (32 px bold), grey text, four chips (MX Records, SPF Record, DKIM, DMARC; grey until ticked, then pale green with a green check pop), a grey "What's Next?" box with three blue-check lines, black "Go to Admin Dashboard" and outlined "Download Summary" (decorative). Scene variables: `completed`, `ticks` (0-4).
- Screen B: the 360 owner dashboard with Jane Doe / JD / Owner and these cards (values in `MAIL_STATS`): 1 Domains "1 verified" (globe), 2 Organization Users "2 total" (people), 1 Inboxes "1 created" (inbox icon, as in 360), Growth Plan Subscription "14-day free trial" (key). Email Traffic Statistics and the left menu as in 360. The numbers count up on arrival.
- Timeline:

| Time | What happens |
|---|---|
| 0.0 | Screen A fades in. Caption "All set. Your four email records are verified". The sidebar's last item animates into the white check circle (from 0.4 s). |
| 3.0 | The four chips tick in, 0.3 s apart. |
| 6.5 | Caption "Click Go to Admin Dashboard". Cursor to the black button, ring, click. |
| 8.5 | Quick white fade to screen B. URL pill becomes admin.snaarp.com/admin. Caption "This is your email admin dashboard". |
| 11.0 | Cursor drifts across the four stat cards, a ring on each. |
| 15.5 | Cursor rests on "User" in the left menu with a ring. Caption "Manage users, domains and mail settings from here". |
| 21.0 | Step ends, Step 9 is marked done, and about 0.5 s later the shell fades in the completion card ("You're all set" / "Snaarp Mail is ready for your team." with Replay and Back to Snaarp, as in 360). |

- Below 900px wide the card is enlarged (CSS zoom 1.8), the four chips wrap into two rows and the sidebar becomes the icon row (the last icon becomes the white check circle).

# Snaarp Doc ("How to use Snaarp Doc", route `/tutorials/snaarp-doc`)

Config: `tutorials/snaarp-doc.ts` (30 steps listed, PROVISIONAL: more steps will be added from later recordings; all 30 steps are built). Recordings (git-ignored): steps 1-9 `ref/docs/Snaarp_Doc_flow.mp4` (1010x480, 2:15; frames of the first 16 s in `ref/docs/frames-step1/`), steps 10-13 `ref/docs/Snaarp_Doc_edit.mp4` (1040x480, 1:58; frames in `ref/docs/frames-step10/` to `frames-step13/`), steps 14-18 `ref/docs/Snaarp_Doc_view.mp4` (1008x480, 2:20; frames in `ref/docs/frames-step14/` to `frames-step18/`), steps 19-30 `ref/docs/Snaarp_Doc_insert.mp4` (1004x480, 5:59; frames in `ref/docs/frames-step19/` (also `19b`, `19c`) to `frames-step30/`). Completion text: "You're all set" / "You now know the basics of Snaarp Doc." (only shown once every step is built; until then the card reads "Step N complete").

Shared shell: **`components/docs/DocsLayout.tsx`** (app rail, sidebar, top bar, content area; copy and sample values in `components/docs/docs-data.ts`). Pass `active` ("documents" | "starred" | "trash" | null) and the screen as children; the layout itself never changes between screens. Under 900px wide the app rail and sidebar become icon-only columns and the whole layout is enlarged (CSS zoom 2.4). `components/docs/PageThumb.tsx` draws the generic page thumbnails (no screenshots).

## Doc step 1 - Explore Snaarp Doc

- Files: `scenes/snaarp-doc/Step1Explore.tsx`, `step1-script.ts`, `step1-data.ts` (all copy, sample documents, templates, captions, URLs), screens in `scenes/snaarp-doc/step1/` (`HomeScreen`, `GalleryScreen`, `TrashScreen`). `durationMs` 15400. URL pill: `docs.snaarp.com/documents` (placeholder), `/templates` (placeholder) and `docs.snaarp.com/trash` (seen in the recording).
- Screens (scene variable `screen` a/b/c; the content area fades white for 0.15 s while it swaps, the rail, sidebar and top bar stay put): A Documents home ("Start a new document" panel with 7 cards, "Recent documents" list with 4 rows); B "Create with templates" (back arrow, search, Upload template, 7 filter chips, grid of 7 columns); C Trash (one deleted "Untitled Document" with Restore and Delete).
- Sample data: Jane Doe, jane@acme-studio.com, avatar "JD"; documents Product Roadmap, Untitled Document, Project Proposal, Untitled Document (dates 16/10/2026, 16/10/2026, 10/10/2026, 20/09/2026).
- Timeline (active seconds):

| Time | What happens |
|---|---|
| 0.0 | Screen A fades in. |
| 1.0 | Caption "This is your Snaarp Doc home". Ring on the "Start a new document" panel. |
| 3.5 | Ring off. Caption "Your recent documents are listed here". Cursor to the grid button (hover), then the list button (hover). |
| 5.5 | Caption "Click Template gallery". Cursor to the link, ring, click. |
| 7.0 | Quick fade to screen B (URL pill `/templates`). Caption "Browse ready-made templates by category". Cursor hovers Resumes, Invoices, Papers and Reports. |
| 10.0 | Caption "Click Trash". Cursor to Trash in the sidebar, ring, click. |
| 10.8 | Quick fade to screen C (URL pill `/trash`, Trash gets the grey fill). Caption "Deleted documents stay in Trash for 30 days. You can restore them". Cursor drifts to Restore (hover only). |
| 13.0 | Caption "Click Documents to go back". Cursor to Documents, ring, click. Screen A returns. |
| 15.0 | Caption cleared, quick white fade. Ends at 15.4. Step 1 is marked done. |

- Recording timestamps: A 0:00-0:07 (the recording also shows the grid view and the Starred page, which this step leaves out), B about 0:07-0:11, C about 0:12-0:14.

## Doc step 2 - Create a blank document

- Files: `scenes/snaarp-doc/Step2Blank.tsx`, `step2-script.ts`, `step2-data.ts` (captions, URLs, document title). `durationMs` 10400. URL pill: `docs.snaarp.com/documents`, then `docs.snaarp.com/document/new` (placeholder) from the loading state on.
- The Documents home is the Step 1 `HomeScreen` inside `DocsLayout` (list view). The editor is the new shared **`components/docs/DocEditor.tsx`** (menus, toolbar order and copy in `components/docs/editor-data.ts`): header (logo mark, bold title, blue .DOCX badge, "All changes saved", Save; menus File / Edit / View / Insert / Format / Tools / Help / eSignature; Editing / Suggesting toggle, outline / comments / history / camera icons, apps icon, blue Share, JD avatar), a one-row toolbar of 17 groups, a ruler with blue indent markers, a grey-blue canvas with a centred white page (about 42% of the width, taller than the screen), an outline button top left, and two footer lines. Its `loading` state fades the header to 35%, hides the rest and shows the pulsing, gently rotating logo mark.
- Scene variable `stage`: home / loading / editor (a full-screen swap with a 0.3 s fade, DocsLayout is not used inside the editor).
- Timeline (active seconds):

| Time | What happens |
|---|---|
| 0.0 | The Documents home fades in. |
| 0.8 | Caption "Click Blank document to start a new one". Cursor to the Blank document card (blue border), ring, click. |
| 2.5 | Loading state. URL pill `docs.snaarp.com/document/new`. Caption "Your new document is opening". |
| 5.5 | The editor fades in fully. Caption "Your blank document is ready. This is the editor". |
| 7.0 | Ring around the white page (1.2 s), then around the toolbar. |
| 9.0 | Ring off. Cursor glides to the middle of the page. |
| 10.0 | Caption cleared, quick white fade. Ends at 10.4. Step 2 is marked done. |

- Recording timestamps: home about 0:13-0:15 (the recording hovers Blank document first), loading about 0:16-0:20, editor from about 0:20.

## Doc step 3 - Explore the editor and File menu

- Files: `scenes/snaarp-doc/Step3Tour.tsx`, `step3-script.ts`, `step3-data.ts` (captions, URL). `durationMs` 12400. URL pill `docs.snaarp.com/document/untitled` (placeholder).
- The screen is the Step 2 `DocEditor` (empty "Untitled Document"). New shared piece **`components/docs/FileMenu.tsx`**: a white card (180 px wide, 8 px corners, soft shadow) under "File" with 14 items in six groups (New, Open Ctrl+O, Make a copy | Share, Email, Download >, Save to Drive | Rename, Move (grey), Move to trash | Version history | Details (grey), Language (grey) | Print Ctrl+P); the hovered item gets a light grey fill; greyed items never hover. "Download" has a submenu card (Microsoft Word (.docx), PDF Document (.pdf), Web Page (.html), Markdown (.md), Plain Text (.txt)). All of it is in `components/docs/file-menu-data.ts`. While open, the "File" label has a grey fill. Scene variables: `fileMenu`, `fileSub`.
- Timeline (active seconds):

| Time | What happens |
|---|---|
| 0.0 | The editor fades in. |
| 0.8 | Caption "These are your menus". Ring around the menu row. |
| 2.8 | Caption "The toolbar has your formatting tools". Ring around the toolbar; the cursor sweeps slowly left to right across it. |
| 5.0 | Caption "Editing mode and Share are at the top right". Rings around the Editing/Suggesting toggle and Share. |
| 7.0 | Caption "Click File". Cursor to File, ring, click. The File menu opens. |
| 8.8 | Caption "The File menu holds the actions for your document". The cursor hovers New, Open and Make a copy (0.5 s each). |
| 11.2 | Cursor moves to an empty part of the canvas and clicks; the menu closes. |
| 12.0 | Caption cleared, quick white fade. Ends at 12.4. Step 3 is marked done. |

- Recording timestamps: the tour about 0:22-0:28, the open File menu about 0:28-0:34 (a later zoom at 1:34 shows the Download submenu).

## Doc steps 4-8 - shared pieces

Steps 4 to 8 are small scenes on **`components/docs/EditorStage.tsx`** (DocEditor + FileMenu + DocToast, a fade-in at 0 s and the quick white fade at the end). Each step passes the title it starts with (`DOC_TITLES` in `components/docs/doc-titles.ts`): step 4 "Untitled Document"; steps 5, 6, 7 "Untitled Document (Copy)"; step 8 "Project Brief". Scripts change the scene variable `title`. New shared pieces: `DocToast` (+ `showDocToast` / `hideDocToast`), `ShareDialog`, `RenameDialog`, `VersionHistoryPage`, and the File menu helpers `clickFileMenu` / `chooseFileMenuItem` (`components/docs/file-menu-timeline.ts`). Dialogs reuse the admin `Modal`.

## Doc step 4 - Make a copy

- Files: `scenes/snaarp-doc/Step4Copy.tsx`, `step4-script.ts`, `step4-data.ts`. `durationMs` 11400. URL pill `docs.snaarp.com/document/untitled`, then `.../untitled-copy` (placeholders).

| Time | What happens |
|---|---|
| 0.0 | The editor fades in. |
| 0.8 | Caption "Click File". Cursor to File, ring, click; the menu opens. |
| 2.4 | Caption "Open lets you pick a file from your computer". Cursor hovers Open for 1.2 s. |
| 4.0 | Caption "Click Make a copy". Cursor to the item, ring, click; the menu closes. |
| 5.0 | Loading state (faded chrome, pulsing mark), title becomes "Untitled Document (Copy)", URL pill changes, toast "Copy created" slides in. |
| 7.5 | The editor fades back in. Caption "Your copy opens as a new document". Ring on the title. |
| 9.5 | Ring off, toast fades out. |
| 11.0 | Quick white fade. Ends at 11.4. |

## Doc step 5 - Share your document

- Files: `Step5Share.tsx`, `step5-script.ts`, `step5-data.ts` (dialog copy in `components/docs/share-data.ts`). `durationMs` 20400.

| Time | What happens |
|---|---|
| 0.8 | Caption "Click File, then Share". File opens, cursor moves to Share, click. |
| 3.0 | Share dialog (Restricted, input focused with a blue border). Caption "Add people by name or email". Ring on the input. |
| 5.5 | Caption "Restricted means only people you add can open the document". Ring on General access. |
| 8.0 | Cursor clicks the "Restricted" dropdown (two options), picks "Anyone with the link": green globe, role "Viewer". Caption "Choose who can open it. Here, anyone with the link". |
| 11.0 | Caption "Choose what people with the link can do". Role dropdown opens (ROLE: Viewer, Commenter, Editor); cursor hovers Commenter. |
| 13.5 | Cursor picks Editor; the grey text reads "...can edit". |
| 15.5 | Caption "Use Copy link to share it". Cursor hovers Copy link (ring, no click). |
| 17.0 | Caption "Click Done". Ring, click; the dialog closes with a scale-down fade. |
| 20.0 | Quick white fade. Ends at 20.4. |

## Doc step 6 - Download and save to Drive

- Files: `Step6Drive.tsx`, `step6-script.ts`, `step6-data.ts`. `durationMs` 16400.

| Time | What happens |
|---|---|
| 0.8 | Caption "Click File". File opens. |
| 2.4 | Caption "Download lets you save your document in other formats". The Download submenu opens. |
| 3.6 | Cursor goes down the submenu, about 0.6 s per format (docx, pdf, html, md, txt). Caption "Choose Word, PDF, web page, Markdown or plain text". |
| 7.0 | Cursor back to Save to Drive. Caption "Save to Drive keeps a copy in your Snaarp Drive". Ring, click; the menu closes. |
| 8.5 | Toast (loading) "Uploading to Drive...". |
| 10.8 | Toast becomes success "Saved to Drive: Untitled Document (Copy).docx". Caption "Your document is saved in Drive". Hides at 13.8. |
| 16.0 | Quick white fade. Ends at 16.4. |

## Doc step 7 - Rename your document

- Files: `Step7Rename.tsx`, `step7-script.ts`, `step7-data.ts`. `durationMs` 11400.

| Time | What happens |
|---|---|
| 0.8 | Caption "Click File, then Rename". File opens, cursor moves to Rename, click. |
| 3.0 | Rename dialog with the current title selected. Caption "Type a new name". |
| 4.2 | Select all, then "Project Brief" is typed over it. |
| 6.2 | Caption "Click OK". Ring, click; the dialog closes. |
| 7.4 | The header title becomes "Project Brief" with a ring. Caption "Your document has a new name". |
| 11.0 | Quick white fade. Ends at 11.4. |

## Doc step 8 - Check version history

- Files: `Step8History.tsx` (scene variable `screen` editor/history), `step8-script.ts`, `step8-data.ts` (page copy in `components/docs/version-history-data.ts`). `durationMs` 11400. URL pill changes to `docs.snaarp.com/document/version-history` (placeholder).

| Time | What happens |
|---|---|
| 0.8 | Caption "Click File, then Version history". File opens, cursor moves to Version history, click. |
| 3.0 | Quick fade to the Version history page. Caption "Every saved version of your document appears here". Ring on the right panel. |
| 5.5 | Caption "There are no saved versions yet. They are created automatically as you edit". |
| 7.5 | Caption "Click the back arrow to return to your document". Cursor to the back arrow, ring, click. |
| 9.0 | The editor returns ("Project Brief"). |
| 11.0 | Quick white fade. Ends at 11.4. |

## Doc step 9 - Print your document

- Files: `scenes/snaarp-doc/Step9Print.tsx`, `step9-script.ts`, `step9-data.ts` (captions, URL; the panel's copy is in `components/docs/print-data.ts`). `durationMs` 13400. Starts with the title "Project Brief". New shared piece **`components/docs/PrintDialog.tsx`**: a modal (dim backdrop, 760 px wide card, 14 px corners) with a light grey preview area (blank white page, "1 / 1") on the left and "Print", "1 sheet of paper", four settings (Destination: Save as PDF, Pages: All, Layout: Portrait, Color: Color), "More settings", a blue Print and an outlined Cancel button on the right. Under 900 px it stacks (preview on top, smaller, settings below). Hooks: `print-settings`, `print-setting-<id>`, `print-btn`, `print-cancel`. Scene variable `print`.

| Time | What happens |
|---|---|
| 0.0 | The editor fades in. |
| 0.8 | Caption "Click File". Cursor to File, ring, click; the menu opens. |
| 2.4 | Caption "Click Print. You can also press Ctrl+P". Cursor moves down to Print (Ctrl+P visible), ring on the item. |
| 4.0 | Click Print; the menu closes. |
| 4.8 | The print panel opens. Caption "A print window opens". |
| 6.5 | Caption "Choose where to print and your settings". Ring on the settings list; the cursor hovers Destination, Pages, Layout and Color (0.5 s each). |
| 9.5 | Caption "Click Print to send it, or Cancel to go back". Ring on both buttons. |
| 11.0 | Cursor to Cancel, click; the panel closes. |
| 13.0 | Quick white fade. Ends at 13.4. Step 9 is marked done; step 10 follows. |

- Recording timestamps: File menu with the greyed Details / Language about 2:00-2:08, the browser's print window about 2:08-2:14 (not copied).

## Doc steps 10-13 - shared pieces (a document with real text)

Steps 10 to 13 use the same `components/docs/EditorStage.tsx` as steps 4-9, with its new optional setting **`startDocument`** (an editor state). Without it the page stays blank, exactly as before. With it the stage draws the sample text and adds the Edit menu, the Find and replace panel, the blinking caret, the blue selection, the green find highlights, the floating selection toolbar and the header status "Unsaved changes".

- **Sample document:** `components/docs/sample-document.ts` ("Acme Studio Website Redesign", 3 headings, 4 paragraphs; title "Project Brief"). "Acme" appears as Acme, acme and ACME on purpose; match counts are computed from the text (7 without Match case, 4 with it).
- **Editor state (pure logic):** `components/docs/editor-state.ts` (blocks, selection, caret, clipboard, undo/redo history, find state; functions `selectRange`, `selectAll`, `copy`, `cut`, `paste`, `deleteSelection`, `undo`, `redo`, `findMatches`, `replaceAll`...). It lives in the scene variable `editor`.
- **Drawing:** `components/docs/DocumentView.tsx` (text, caret, selection, find marks, selection toolbar). Hooks: `doc-block-<id>`, `doc-start-<id>` and `doc-end-<id>` (the cursor goes to the start or end of a paragraph's text), `doc-match-current`, `selection-toolbar`.
- **Edit menu:** `components/docs/EditMenu.tsx` (+ `edit-menu-data.ts`: items, icons, shortcuts, and which items are greyed out for which state). Hooks `edit-item-<id>` (undo, redo, cut, copy, paste, paste-plain, select-all, delete, find). Scene variable `editMenu`.
- **Find and replace panel:** `components/docs/FindReplacePanel.tsx` (+ `find-replace-data.ts`). Hooks `find-input`, `replace-input`, `find-match-case`, `find-result`, `find-btn-replace` / `-replace-all` / `-previous` / `-next`, `find-close`.
- **Timeline helpers:** `components/docs/editor-timeline.ts`: `initEditor`, `SAMPLE_EDITOR` / `COPIED_EDITOR` (start states), `dragSelectBlock`, `clickEndOfBlock`, `clickEditMenu`, `hoverEditMenuItem`, `chooseEditMenuItem` (ring, click, close, then runs the item's real action; throws if the item is greyed out), `typeInPanel`, `toggleMatchCase`, `clickStep`, `clickReplaceAll`, `clickClosePanel`, `markEdited` (Unsaved changes, then All changes saved 1.5 s later). All waits use the timeline clock, so Pause (Space) freezes them.
- `DocEditor` gained `status` ("saved" or the orange "Unsaved changes") and `live` (font size box, Undo/Redo buttons, word count). Its page padding is now 6 % of the page width (the blank page looks the same). New icons: `emCut`, `emPaste`, `emPastePlain`, `emSelectAll`. New CSS: `.doc-caret`, `.doc-pasted` in `app/globals.css`.
- Address pill for all four steps: `docs.snaarp.com/document/project-brief` (placeholder).

## Doc step 10 - Explore the Edit menu

- Files: `scenes/snaarp-doc/Step10EditMenu.tsx`, `step10-script.ts`, `step10-data.ts`. `durationMs` 13400. Starts with the sample document, nothing selected. Recording: about 0:00-0:14.

| Time | What happens |
|---|---|
| 0.0 | The editor fades in. |
| 0.8 | Caption "Click Edit". Cursor to Edit, ring, click; the Edit menu opens (Redo, Cut, Copy and Delete are greyed). |
| 2.8 | Caption "The Edit menu has your editing tools". The cursor hovers Undo, Cut, Copy and Paste (0.5 s each). |
| 6.0 | Caption "Paste without formatting keeps only the plain text". Hover that item. |
| 8.0 | Caption "Some items are greyed out until you can use them". Rings on Redo and Delete; the cursor hovers both. |
| 10.5 | Cursor to "Find and replace", hover. |
| 11.5 | Click an empty part of the canvas; the menu closes. |
| 13.0 | Quick white fade. Ends at 13.4. |

## Doc step 11 - Copy and paste text

- Files: `scenes/snaarp-doc/Step11CopyPaste.tsx`, `step11-script.ts`, `step11-data.ts`. `durationMs` 24000. Starts with the sample document. Recording: about 0:14-1:06.

| Time | What happens |
|---|---|
| 0.0 | The editor fades in. |
| 0.8 | Caption "Select the text you want to copy". The cursor goes to the start of the "Increase enquiries..." paragraph and drags to its end; the blue highlight grows and the dark selection toolbar appears above it. |
| 4.0 | Caption "Click Edit, then Copy". The menu opens (Cut, Copy and Delete are active); Copy is clicked; the menu closes and the selection stays. |
| 7.0 | Caption "Cut works the same way, but removes the original" (nothing is clicked). |
| 8.5 | Caption "Click where you want to paste it". The cursor clicks at the end of the last paragraph; the selection clears and the caret blinks. |
| 11.0 | Caption "Click Edit, then Paste". Edit opens, Paste is clicked. |
| 12.5 | The copied paragraph appears under the last one with a soft yellow fade. The status shows "Unsaved changes", then "All changes saved" 1.5 s later. Caption "The text is pasted". |
| 16.0 | Caption "Paste without formatting pastes only plain text". Edit opens, the cursor hovers that item (ring), the menu closes. |
| 20.0 | Hold. |
| 23.6 | Quick white fade. Ends at 24.0. |

## Doc step 12 - Select all, delete and undo

- Files: `scenes/snaarp-doc/Step12Undo.tsx`, `step12-script.ts`, `step12-data.ts`. `durationMs` 17000. Starts with `COPIED_EDITOR`: the sample document plus the pasted extra paragraph (the end of step 11). Recording: about 1:06-1:26.

| Time | What happens |
|---|---|
| 0.0 | The editor fades in. |
| 0.8 | Caption "Click Edit, then Select all". Edit opens, Select all is clicked; the whole document turns blue (no selection toolbar). |
| 4.0 | Caption "Click Edit, then Delete" (Delete is active now). Delete is clicked. |
| 5.5 | The page is empty with a blinking caret at the top; the status shows "Unsaved changes". Caption "Delete removes everything you selected". |
| 8.0 | Caption "Made a mistake? Click Edit, then Undo". Undo is clicked. |
| 10.0 | The whole document comes back (a real undo of the delete); the status returns to "All changes saved". Caption "Undo brings your text back". |
| 11.8 | Edit opens again; Redo is active now. Caption "Redo brings back the change you undid"; the cursor hovers Redo (ring). |
| 14.5 | Click an empty part of the canvas; the menu closes. Hold. |
| 16.6 | Quick white fade. Ends at 17.0. |

## Doc step 13 - Find and replace

- Files: `scenes/snaarp-doc/Step13FindReplace.tsx`, `step13-script.ts`, `step13-data.ts` (captions and the two words "Acme" / "Apex"). `durationMs` 30000. Starts with the sample document (no extra paragraph). Recording: about 1:26-1:58.

| Time | What happens |
|---|---|
| 0.0 | The editor fades in. |
| 0.8 | Caption "Click Edit, then Find and replace". Edit opens, the item is clicked; the panel opens at the top right with the Find input focused. |
| 3.5 | Caption "Type the word you want to find". Click the Find input, type "Acme". Matches highlight live (the current one green, the others light green); the count reads "1 of 7". |
| 7.5 | Caption "Every match is highlighted". The cursor clicks Next twice; the green highlight moves ("3 of 7"). |
| 11.0 | Caption "Type the new word in Replace with". Click that input, type "Apex". |
| 14.0 | Caption "Match case finds only the exact capital letters". The cursor ticks Match case; the count drops to "1 of 4". |
| 18.0 | Caption "Click Replace all". Cursor to the button, ring, click. |
| 19.5 | The four exact "Acme" words become "Apex"; "acme" (in the Goals paragraph and in the email address) and "ACME" stay. The panel reads "No results" and the four buttons grey out. The status shows "Unsaved changes", then "All changes saved". |
| 22.5 | Caption "All matches are replaced". |
| 24.5 | Caption "Click the X to close the panel". Cursor to the X, click; the panel closes. |
| 27.0 | Hold on the changed document. |
| 29.6 | Quick white fade. Ends at 30.0. Step 13 is marked done; step 14 follows. |

## Doc steps 14-18 - shared pieces (View menu, modes, Comments, outline)

Steps 14 to 18 use `EditorStage` with `startDocument` and the same sample document ("Project Brief", the Acme Studio brief; each step starts with the original text). Everything new is optional and off by default, so steps 1 to 13 are unchanged. URL pill for all five: `docs.snaarp.com/document/project-brief` (placeholder).

- **`ViewMenu.tsx`** (+ `view-menu-data.ts`): the dropdown under "View", 275 px wide. Groups: Mode (eye, chevron) / Comments / Document outline; Show print layout (check) / Show ruler (check + ruler icon) / Show equation toolbar (greyed out) / Show non-printing characters (Ctrl+Shift+P); Full screen. The Mode submenu (Editing, Suggesting, Viewing; the current one is checked) opens to the right. Hooks: `view-menu`, `view-item-<mode|comments|outline|print-layout|ruler|equation|non-printing|fullscreen>`, `view-sub-<editing|suggesting|viewing>`. Helpers in `view-menu-timeline.ts`.
- **Editor modes** (scene variable `mode`): Editing = black "Editing" pill; Suggesting = black "Suggesting" pill; Viewing = neither pill selected and the whole toolbar row is hidden (the page moves up), as in the frames. The ruler stays in Viewing.
- **`CommentsPanel.tsx`** (+ `comments-data.ts`, `comments-state.ts`): right-hand panel under the header, 245 px wide at the 1440 design width, white with a left border. Title "Comments" + search + X; tabs "All comments" (blue underline) / "For you"; filter pill "All types" (dropdown: All types with a check, Open, Resolved). Empty state: grey icon, "Start a discussion", blue "Add comment" button (and, as in the frames, a full-width "Add comment" button at the bottom). Composer card (avatar J, "Jane Doe", input "Comment or tag with @", Cancel, Comment pale until there is text). Thread card (label "Project Brief", avatar, "Jane Doe", "Just now", text, three dots, reply input "Reply or add others with @"; focused = blue border + pale send icon). Three-dot card: Resolve, Delete (red). Footer "Who sees comments?" + the visibility sentence. While open the header comment icon has a light grey fill and the page centres in the space left of the panel. Hooks: `comments-panel`, `comments-panel-card` (ring this one), `comments-close`, `comments-add`, `comments-add-bottom`, `comments-filter`, `comments-filter-<all|open|resolved>`, `comments-composer-input`, `-cancel`, `-submit`, `thread-<id>`, `thread-reply-<id>`, `thread-menu-<id>`, `thread-menu-item-<resolve|delete>`, `comments-body`. Helpers in `comments-timeline.ts`; threads are numbered t1, t2 (newest on top).
- **`OutlinePanel.tsx`**: left-hand "Document tabs" panel, 180 px wide, starting under the toolbar and ruler and ending above the two footer lines (so "1 page N words" stays visible). Back chevron, title, plus; the tab rows (the selected one light blue with a blue left bar, the others plain; names "Tab 1", "Tab 2", ... from data); grey hint "Headings will appear here as you add them" always under the list. The plus is a working control: it adds the next tab, selects it and shows a blank page (same size, same ruler and toolbar, footer "1 page 0 words"); clicking a row switches back, and each tab keeps its own page (`outline-state.ts`, `outline-timeline.ts`). The round outline button in the top-left of the canvas (`outline-button`) grows into a "Tab 1" pill on hover and hides while the panel is open; the header list icon gets a grey fill. Hooks: `outline-panel`, `outline-panel-card`, `outline-close`, `outline-add`, `outline-tab-<id>` (`tab-1`, `tab-2`, ...).
- **Editor state:** `anchors` (a comment's yellow-orange highlight, hook `doc-comment-<id>`) and `landmarks` (invisible cursor targets inside text, hook `doc-at-<id>`); the floating selection toolbar's comment icon has the hook `selection-comment`; for a selection that does not start at the beginning of a block the toolbar sits further left.
- **`FullScreenView.tsx`** (View > Full screen): simulated INSIDE the browser frame (never the real Fullscreen API). A dark neutral overlay (`#26272B`) covers the header, menu row, toolbar, ruler and footer with a 0.3 s fade (instant with reduced motion); the page sits centred at the same place as in the normal view, text unchanged (no non-printing marks: entering full screen switches them off). A dark pill "Press Esc to exit full screen" shows at the top centre for 3 s; an "Esc" key chip shows and is pressed when the step exits. Exiting returns the normal editor with the ruler state kept. Hooks: `fullscreen-view`, `fullscreen-hint`, `fullscreen-key`. Copy in `FULL_SCREEN` (`view-menu-data.ts`).
- **Non-printing characters:** every space shows as a small blue-grey dot and every paragraph ends with a "¶" (the page reflows a little, as in the frames).

## Doc step 14 - Change the editing mode

- Files: `scenes/snaarp-doc/Step14Mode.tsx`, `step14-script.ts`, `step14-data.ts`. `durationMs` 16000. Starts with the sample document in Editing mode. Recording: about 0:00-0:22.

| Time | What happens |
|---|---|
| 0.0 | The editor fades in. |
| 0.8 | Caption "Click View". Cursor to View, ring, click; the View menu opens. |
| 2.2 | Caption "Click Mode". Cursor to Mode; the submenu opens (Editing checked). |
| 3.6 | Caption "Suggesting lets you propose changes without changing the text". Cursor to Suggesting, ring, click; the header toggle switches. |
| 6.5 | View, Mode again (Suggesting checked). |
| 8.0 | Caption "Viewing is read-only. Use it to just read the document". Click Viewing: the toolbar hides, neither pill is selected. |
| 10.8 | View, Mode again (Viewing checked). |
| 12.2 | Caption "Choose Editing to go back to writing". Click Editing: the toolbar and the Editing pill return. |
| 15.6 | Quick white fade. Ends at 16.0. Step 14 is marked done. |

## Doc step 15 - Open Comments and add a comment

- Files: `Step15AddComment.tsx`, `step15-script.ts`, `step15-data.ts`. `durationMs` 24000. Starts with the sample document, no panel. Recording: about 0:18-0:54.

| Time | What happens |
|---|---|
| 0.0 | The editor fades in. |
| 0.8 | Caption "Click View, then Comments". View opens, Comments is clicked; the panel slides in from the right (empty state) and the page moves left. |
| 3.5 | Caption "Comments from everyone appear in this panel". Ring on the panel until 6.0. |
| 6.0 | Caption "Click Add comment". Cursor to the blue button, ring, click; the composer card appears with its input focused. |
| 8.0 | Caption "Type your comment". Types "Please review this section"; Comment turns solid blue. |
| 12.5 | Caption "Click Comment". Ring, click. |
| 14.0 | The thread card appears. Caption "Your comment is saved". |
| 17.5 | Caption "Others can reply under your comment". Cursor to the reply input, ring, click (blue border, pale send icon). |
| 23.5 | Quick white fade. Ends at 24.0. Step 15 is marked done. |

## Doc step 16 - Manage comments

- Files: `Step16ManageComments.tsx`, `step16-script.ts`, `step16-data.ts`. `durationMs` 36000. Starts with the Comments panel open and the first thread (so it also works alone from the rail). Recording: about 0:52-1:34.

| Time | What happens |
|---|---|
| 0.0 | The editor fades in (after a short pause so the page has settled beside the panel). |
| 0.8 | Caption "Click the three dots to manage a comment". Click the dots; the card opens. Hover Resolve, then Delete (no click). |
| 4.2 | Click an empty part of the panel; the card closes. |
| 5.0 | Caption "Filter comments by status". Click "All types"; hover Open, then Resolved; click All types (stays selected); the dropdown closes. |
| 10.0 | Caption "Select text in your document to comment on it". The cursor drags across "Make the services pages easier to scan" in the Goals paragraph: blue highlight and the floating toolbar. |
| 14.0 | Caption "Click the comment icon". Cursor to the last toolbar icon, ring, click; a composer card appears under the first thread. |
| 16.0 | Caption "Type your comment". Types "This needs more detail". |
| 20.0 | Caption "Click Comment". The new thread appears on top; the phrase gets the yellow-orange highlight; the status shows "Unsaved changes", then "All changes saved". |
| 23.5 | Caption "The commented text is highlighted in the document". Ring on the highlight. |
| 27.0 | The cursor goes to the highlighted phrase (ring), then to the matching comment card (ring). |
| 30.5 | Caption "Click X to close the panel". Click the X; the panel slides out and the page centres again; the highlight stays. |
| 35.6 | Quick white fade. Ends at 36.0. Step 16 is marked done. |

## Doc step 17 - Use the Document outline

- Files: `Step17Outline.tsx`, `step17-script.ts`, `step17-data.ts`. `durationMs` 19000. Starts with the commented phrase highlighted, no panel open, one tab. Recording: about 1:34-1:50. The recording opens the panel with the round outline button in the canvas corner, so the step does the same (View > Document outline does the same thing). The recording only hovers the plus; clicking it to add a tab, and switching tabs, are additions.

| Time | What happens |
|---|---|
| 0.0 | The editor fades in. |
| 0.8 | Caption "Click the outline button in the corner". Cursor to the round button (it grows into a "Tab 1" pill), ring, click; the panel slides in on the left and the page moves right. |
| 3.5 | Caption "The outline shows your document's tabs and headings". Ring on the panel until 6.0. |
| 6.0 | Caption "Click the plus to add a new tab". Cursor to the plus, ring, click. |
| 7.0 | "Tab 2" appears under "Tab 1" and is selected; the page switches to a blank page (footer "1 page 0 words"). |
| 9.5 | Caption "Each tab has its own page". Hold. |
| 12.0 | Caption "Click Tab 1 to go back". Cursor to the "Tab 1" row, ring, click; the sample document returns. |
| 14.5 | Caption "Click the arrow to close the outline". Cursor to the back chevron, ring, click; the panel closes and the page centres again. |
| 18.6 | Quick white fade. Ends at 19.0. Step 17 is marked done. |

Reset rule: the script starts with `initTabs`, so the extra tab never survives a replay (every run starts with one tab).

## Doc step 18 - Ruler and layout options

- Files: `Step18Layout.tsx`, `step18-script.ts`, `step18-data.ts`. `durationMs` 30000. Starts with the sample document, no panels, ruler on. Recording: about 1:45-2:20. Toggled for real: Show ruler, Show non-printing characters and Full screen. Hover only: Show print layout (no visible change) and the greyed-out Show equation toolbar. In the recording Full screen does nothing; the step simulates it inside the frame (see `FullScreenView.tsx`).

| Time | What happens |
|---|---|
| 0.0 | The editor fades in. |
| 0.8 | Caption "Click View". View opens. |
| 2.2 | Caption "Show print layout shows the page the way it will print". Hover that item (checked). |
| 4.5 | Caption "Click Show ruler to hide the ruler". Click it; the menu closes and the ruler row disappears (the page moves up). |
| 7.5 | Caption "Click it again to show the ruler". View opens (the check beside Show ruler is gone); click Show ruler; the ruler returns. |
| 11.0 | Caption "Show non-printing characters reveals spaces and paragraph marks". View opens, hover the item (Ctrl+Shift+P visible), click: dots and "¶" marks appear. |
| 14.8 | View opens again (the item is checked). |
| 16.0 | Caption "Some options are greyed out until they are available". Hover Show equation toolbar (stays greyed). |
| 18.0 | Caption "Click Full screen to focus on your document". Cursor to Full screen, ring, click; the menu closes. |
| 19.0 | The editor chrome fades out (0.3 s) and the dark full-screen view appears (the marks switch off). The pill "Press Esc to exit full screen" shows until 22.0. |
| 22.0 | Caption "Only your document stays on screen". Hold. |
| 25.0 | Caption "Press Esc to go back". The "Esc" key chip shows, is pressed, and the normal editor returns (ruler state kept). |
| 29.6 | Quick white fade. Ends at 30.0. Step 18 is marked done. |

## Doc step 19 - Explore the Insert menu

- Files: `Step19InsertMenu.tsx`, `step19-script.ts`, `step19-data.ts` (captions and the shared URL pill `docs.snaarp.com/document/project-brief`, a placeholder used by steps 19 to 22). `durationMs` 17000. Starts with the sample document, Editing mode, no panels, ruler on. Recording: `ref/docs/Snaarp_Doc_insert.mp4`, 0:00-0:08 (menu), about 2:25 (Break submenu), about 3:03 (Page elements submenu). New shared piece: **`components/docs/InsertMenu.tsx`** (+ `insert-menu-data.ts`, helpers in `insert-menu-timeline.ts`).
- Scene variables: `insertMenu` (open) and `insertSub` ("" / "break" / "page-elements" / "toc"). Hooks: `insert-menu-card`, `insert-item-<id>` (image, table, link, hr, break, bookmark, page-elements, quote, checklist, code, esignature, drawing, symbols, comment), `insert-sub-<id>` (page-break, section-next, section-continuous, toc, toc-links, toc-plain, toc-update, header, footer, watermark, page-numbers, footnote). Helpers: `clickInsertMenu`, `hoverInsertItem`, `hoverInsertSub`, `chooseInsertItem`, `closeInsertMenu`. Only Image, Table and Link do something when clicked (steps 20 to 22 run those from their own scripts); the other items are hoverable and do nothing yet.

| Time | What happens |
|---|---|
| 0.0 | The editor fades in. |
| 0.8 | Caption "Click Insert". Cursor to Insert, ring, click; the Insert menu opens. |
| 2.5 | Caption "The Insert menu adds content to your document". Ring on the menu card. |
| 5.0 | Caption "Break adds page and section breaks". Cursor to Break; its submenu (Page break Ctrl+Enter, Section break (next page), Section break (continuous)) opens. |
| 8.0 | Caption "Page elements adds headers, footers, watermarks and page numbers". Cursor to Page elements; its submenu opens (Table of contents with a chevron, Header, Footer, Watermark, Page numbers, Footnote). |
| 11.0 | Caption "Comment is greyed out until you select text". Cursor to Comment (stays greyed, Ctrl+Alt+M). |
| 14.0 | The menu closes and the caption hides. |
| 16.6 | Quick white fade. Ends at 17.0. Step 19 is marked done. |

## Doc step 20 - Insert an image

- Files: `Step20Image.tsx`, `step20-script.ts`, `step20-data.ts`. `durationMs` 22000. Starts like step 19. Recording: about 0:00-0:45. New shared pieces: **`components/docs/ImageBlock.tsx`** (the banner at the top of the page; four round blue corner handles and the dark floating toolbar when selected), **`FloatingToolbar.tsx`** (the toolbar icons, now shared with the text selection bar in `DocumentView.tsx`), `insert-state.ts` (`ImageState`, `TableState`), `insert-data.ts` (copy and sample content). `EditorStage` reads the scene variable `pageImage` (null = no image; `{ selected }`) and `DocumentView` draws it above the text. The banner is drawn inline (SVG, no file): purple-to-blue gradient, simple shapes, the word "Acme Studio"; the "uploaded" file name `acme-banner.png` shows only in the toast.
- Hooks: `page-image-block`, `page-image`, `image-handle-<tl|tr|bl|br>`, `image-toolbar`.

| Time | What happens |
|---|---|
| 0.0 | The editor fades in. |
| 0.8 | Caption "Click Insert, then Image". Open the menu, cursor to Image, ring, click; the menu closes. |
| 3.5 | Caption "Choose a picture from your computer". The computer's file picker is not drawn: the cursor rests. |
| 5.0 | DocToast (loading): "Uploading acme-banner.png...". |
| 6.5 | The banner fades in at the top of the page and the text moves down ("Unsaved changes" shows for 1.5 s). The toast changes to "Image uploaded" (3.5 s). |
| 9.5 | Caption "Click the image to select it". Cursor to the image, ring, click; four corner handles and the floating toolbar appear. |
| 13.0 | Caption "Drag a corner to resize it". Cursor to the bottom-right handle (hover ring only: the recording never resizes). |
| 18.0 | Ring and caption clear. Hold. |
| 21.6 | Quick white fade. Ends at 22.0. Step 20 is marked done. |

## Doc step 21 - Insert a table

- Files: `Step21Table.tsx`, `step21-script.ts`, `step21-data.ts`. `durationMs` 30000. Starts like step 19 but with the caret blinking at the end of the intro paragraph (`TABLE_SPOT_EDITOR` in `insert-timeline.ts`), so it is clear where the table goes. Recording: about 0:32-1:30 (the table appears ready-made, 3 columns, header row plus two rows, no size picker). New shared piece: **`components/docs/TableBlock.tsx`** (grey header row, thin borders, rounded corners, cell text 11.5 px, focused cell = thin blue outline plus caret). Scene variable `pageTable` (null or `{ after, cells, focus }`). Helpers in `insert-timeline.ts`: `insertTable`, `clickCell`, `typeInCell`, `clearTableFocus`. Sample cells (header Task / Owner / Due; Homepage design / Jane Doe / Nov 12; Content review / Alex Kim / Nov 26) and the block it sits under (`after: "p1"`) live in `insert-data.ts` (`TABLE`). Hooks: `table-block`, `table-cell-<row>-<col>`. The footer word count includes the table text.

| Time | What happens |
|---|---|
| 0.0 | The editor fades in. |
| 0.8 | Caption "Click Insert, then Table". Open the menu, cursor to Table, ring, click; the menu closes. |
| 3.5 | The table appears under the intro paragraph; the first header cell is focused. |
| 4.5 | Caption "Click a cell and type". The cursor clicks each header cell in turn and types Task, Owner, Due. |
| 11.5 | Caption "Fill in the first row". Homepage design, Jane Doe, 12 Nov (about 4 s). |
| 18.0 | Caption "Then the next row". Content review, Alex Kim, Nov 26 (about 5 s). |
| 25.0 | Caption "Your table is ready". The focus clears; ring on the table. |
| 28.0 | Ring and caption clear. Hold. |
| 29.6 | Quick white fade. Ends at 30.0. Step 21 is marked done. |

## Doc step 22 - Insert a link

- Files: `Step22Link.tsx`, `step22-script.ts`, `step22-data.ts`. `durationMs` 25000. Starts like step 19. Recording: about 1:25-2:00. New shared pieces: **`components/docs/LinkDialog.tsx`** (the "Insert Link" modal, 340 px wide; copy in `insert-data.ts` `LINK.dialog`) and a **link look** in the editor text: `EditorState` gained `links` (same shape as comment anchors; blue, underlined, hook `doc-link-<id>`). Scene variables: `linkDialog` (open), `linkFocus` (dark border and caret on the input), `field:link-url` (typed address; `tl.typeText("link-url", ...)`) and `linkNewTab` (ticked by default). Helpers in `insert-timeline.ts`: `openLinkDialog`, `closeLinkDialog`, `applyLink`. Hooks: `link-input`, `link-newtab`, `link-cancel`, `link-insert`. The floating selection toolbar hides while the dialog is open.

| Time | What happens |
|---|---|
| 0.0 | The editor fades in. |
| 0.8 | Caption "Select the text you want to link". The cursor drags across the heading; it turns blue and the floating toolbar appears. |
| 4.0 | Caption "Click Insert, then Link". Open the menu (Ctrl+K shows), cursor to Link, ring, click; the menu closes and the dialog opens with the URL input focused. |
| 7.0 | Caption "Type the web address". Types www.acme-studio.com. |
| 11.5 | Caption "Keep Open in new tab ticked so readers stay on your page". Ring on the checkbox. |
| 15.0 | Caption "Click Insert". Cursor to Insert, ring, click; the dialog closes and the heading becomes a blue, underlined link. |
| 18.5 | Caption "The text is now a link". Cursor hovers the link (ring). |
| 22.0 | Ring and caption clear. Hold. |
| 24.6 | Quick white fade. Ends at 25.0. Step 22 is marked done. |

## Doc step 23 - Add a line or page break

- Files: `Step23LineBreak.tsx`, `step23-script.ts`, `step23-data.ts`. `durationMs` 30000. Starts with the sample document, Editing mode, no panels, ruler on. Recording: about 1:45-2:40. New shared pieces: **`HorizontalRule.tsx`** (thin grey line across the text width, space above and below; hook `page-rule`), **multi-page support** (a page break splits the text in two: page 1 is padded to a full page, a thin grey band, then page 2; `DocumentView` draws the text, `PageDecor.tsx` draws the band; the footer line follows with `live.pages`, "2 pages"), `clickStartOfBlock`, `insertRule` and `insertPageBreak` in `insert-timeline.ts`. Scene variables: `pageRules` (ids of the blocks a line sits before) and `pageBreak` (id of the block page 2 starts at). `chooseInsertItem(tl, "hr")` and `chooseInsertSub(tl, "page-break")` run the action; Section break (next page) and (continuous) are hover only.

| Time | What happens |
|---|---|
| 0.0 | The editor fades in. |
| 0.8 | Caption "Click where you want the line". Cursor clicks at the start of the intro paragraph; the caret shows. |
| 2.5 | Caption "Click Insert, then Horizontal line". Open the menu, cursor to Horizontal line, ring, click; the menu closes and the line appears. |
| 5.0 | Caption "A line separates sections". Ring on the line. |
| 8.0 | Caption "Click where the new page should start". Cursor clicks at the start of the "Goals" heading. |
| 10.0 | Caption "Click Insert, then Break". Open the menu, cursor to Break; its submenu opens. |
| 12.5 | Caption "A page break starts a new page". Hover Page break (Ctrl+Enter shows). |
| 15.0 | Caption "Section breaks start a new section". Hover Section break (next page), then Section break (continuous). |
| 18.5 | Cursor back to Page break, ring, click. The menu closes; "Goals" and everything after it moves to page 2; the footer line says "2 pages". |
| 21.5 | Caption "Everything after the break moves to a new page". The page scrolls smoothly so page 2 shows. |
| 29.6 | Quick white fade. Ends at 30.0. Step 23 is marked done. |

## Doc step 24 - Add a bookmark

- Files: `Step24Bookmark.tsx`, `step24-script.ts`, `step24-data.ts`. `durationMs` 20000. Starts like step 23. Recording: about 2:40-3:00. New shared piece: **`BookmarkDialog.tsx`** ("Add bookmark", our own white dialog, 360 px, Cancel and OK; scene variables `bookmarkDialog`, `bookmarkFocus`, `field:bookmark-name`; hooks `bookmark-input`, `bookmark-cancel`, `bookmark-ok`). The marker is a small bookmark icon in a soft blue-grey tile at the start of its block (scene variable `pageBookmarks`, hook `doc-bookmark-<id>`). Helpers in `insert-timeline.ts`: `openBookmarkDialog`, `addBookmark` (adds the marker, shows the toast "Bookmark added").

| Time | What happens |
|---|---|
| 0.0 | The editor fades in. |
| 0.8 | Caption "Click where you want the bookmark". Cursor clicks at the start of the paragraph under "Goals"; the caret shows. |
| 2.5 | Caption "Click Insert, then Bookmark". Open the menu, cursor to Bookmark, ring, click; the menu closes and the dialog opens with the input focused. |
| 5.5 | Caption "Give your bookmark a name". Types "Work in progress". |
| 9.5 | Caption "Click OK". Cursor to OK, ring, click. The dialog closes, the marker appears and the toast "Bookmark added" shows. |
| 13.0 | Caption "Bookmarks mark a spot you can jump back to". Ring on the marker. |
| 17.0 | Ring and caption clear. Hold. |
| 19.6 | Quick white fade. Ends at 20.0. Step 24 is marked done. |

## Doc step 25 - Add a header and footer

- Files: `Step25HeaderFooter.tsx`, `step25-script.ts`, `step25-data.ts`. `durationMs` 30000. Starts like step 23. Recording: about 3:00-3:30 (the header is typed at the top of the page; the footer is never filled in). New shared piece: **header and footer zones** drawn by `PageDecor.tsx` through `DocEditor`'s new `decor` setting (small grey-dark text, a thin dotted line between the zone and the body, blinking caret while it has focus; scene variables `pageHeader` and `pageFooter` = `{ text, focus }`; hooks `page-header`, `page-footer`). Helpers in `insert-timeline.ts`: `insertZone`, `typeInZone`, `leaveZones`. `chooseInsertSub(tl, "header")` and `"footer"` both run `insertZone`; the step only uses Header and hovers Footer.

| Time | What happens |
|---|---|
| 0.0 | The editor fades in. |
| 0.8 | Caption "Click Insert, then Page elements". Open the menu; cursor to Page elements; its submenu opens. |
| 3.0 | Caption "Choose Header". Cursor to Header, ring, click. The menu closes; the header area appears at the top of the page with its dotted line and the caret. |
| 6.0 | Caption "Type your header text". Types "Acme Studio brief". |
| 10.0 | Caption "Click in the page to leave the header". Cursor clicks in the body text; the header stays. |
| 13.0 | Caption "Click Insert, then Page elements". The menu and submenu open again. |
| 16.5 | Caption "Footer works the same way at the bottom of the page". Hover Footer (hover only). |
| 21.0 | The menu closes. |
| 24.0 | Caption clears. Hold. |
| 29.6 | Quick white fade. Ends at 30.0. Step 25 is marked done. |

## Doc step 26 - Add a watermark

- Files: `Step26Watermark.tsx`, `step26-script.ts`, `step26-data.ts`. `durationMs` 27000. Starts like step 23. Recording: about 3:25-4:00. New shared piece: **`WatermarkPanel.tsx`** (right-hand panel in the Comments panel family, 216 px wide: shield icon, title, X, Image and Text tabs (Text selected), "Insert text" input with a counter, FORMATTING (font, size row, B / I / A), TRANSPARENCY (slider and "75" %), Diagonal / Horizontal radios, PLACEMENT thumbnail, "Remove watermark" button at the bottom; the Image tab only looks right). Scene variables: `watermarkOpen`, `watermark` (`{ text, transparency, layout }`), `wmFocus`, `wmTab`. While open the page shifts left and narrows (`rightInset`); on narrow screens the panel overlays the page. The watermark on the page (`PageDecor.tsx`, hook `page-watermark`) is large grey bold text at -38 degrees across the middle of the first page; copy, size and angle in `insert-data.ts` (`WATERMARK`). Hooks: `watermark-panel`, `wm-close`, `wm-tab-image`, `wm-tab-text`, `wm-input`, `wm-slider`, `wm-radio-diagonal`, `wm-radio-horizontal`, `wm-remove`. Helpers in `insert-timeline.ts`: `openWatermarkPanel`, `closeWatermarkPanel`, `typeWatermark`.

| Time | What happens |
|---|---|
| 0.0 | The editor fades in. |
| 0.8 | Caption "Click Insert, then Page elements, then Watermark". Open the menu and submenu; cursor to Watermark, ring, click. The panel slides in from the right and the page shifts left. |
| 4.5 | Caption "Choose Text to write your own watermark". Ring on the Text tab. |
| 6.0 | Caption "Type the watermark text". Cursor to the input, click, type "Draft": the watermark appears across the page as you type; the counter reads 5/100. |
| 11.0 | Caption "Transparency controls how faint it is". Cursor hovers the slider (ring). |
| 14.0 | Caption "Choose a diagonal or horizontal layout". Hover Horizontal, then back to Diagonal (hover only). |
| 17.0 | Caption "Use Remove watermark to take it off". Cursor hovers the button (hover only). |
| 20.0 | Caption "Click X to close the panel". Cursor to X, ring, click. The panel closes, the page returns to the centre and the watermark stays. |
| 23.5 | Caption clears. Hold. |
| 26.6 | Quick white fade. Ends at 27.0. Step 26 is marked done. |

## Doc step 27 - Add page numbers

- Files: `Step27PageNumbers.tsx`, `step27-script.ts`, `step27-data.ts`. `durationMs` 24000. Starts with the sample document, Editing mode, one page. Recording: about 3:55-4:15. New shared pieces: **`InsertDialog.tsx`** (the frame shared by the dialogs of steps 27 to 30: dim backdrop, white card, bold title, close X), **`InsertDialogs.tsx`** (renders them all; scene variable `insertDialog` = "pagenumbers" | "esignature" | "drawing" | "symbols" | "", one open at a time; helpers `openInsertDialog` / `closeInsertDialog`) and **`PageNumbersDialog.tsx`** (344 px; description, Position, Alignment, Start numbering at with the grey hint, Remove page numbers, Cancel, Apply; scene variables `pnPosition`, `pnAlign`, `pnStart`, `pnFocus`; hooks `pn-pos-top|bottom`, `pn-align-left|center|right`, `pn-start`, `pn-remove`, `pn-cancel`, `pn-apply`, `pn-close`). The number on the page is drawn by `PageDecor.tsx` from the scene variable `pageNumbers` (`{ position, align, start }`; hook `page-number`). Helpers in `insert-timeline.ts`: `openPageNumbers`, `chooseDialogOption`, `applyPageNumbers`. `chooseInsertSub(tl, "page-numbers")` opens the dialog.

| Time | What happens |
|---|---|
| 0.0 | The editor fades in. |
| 0.8 | Caption "Click Insert, then Page elements". Open the menu; cursor to Page elements; its submenu opens. |
| 3.0 | Caption "Choose Page numbers". Cursor to Page numbers, ring, click. The menu closes and the dialog opens (Bottom (footer) and Right are already selected, as in the frames). |
| 5.0 | Caption "Choose where the number goes". Hover Top (header), then click Bottom (footer). |
| 8.0 | Caption "Choose the alignment". Click Right. |
| 10.5 | Caption "Choose the first page number". Ring on the Start numbering at input (value 1); the grey hint shows under it. |
| 13.5 | Caption "Click Apply". Cursor to Apply, ring, click. The dialog closes, the page scrolls to its foot and the number "1" shows at the bottom right. |
| 16.5 | Caption "The page number appears in the footer". Ring on the number. |
| 20.0 | Ring and caption clear. Hold. |
| 23.6 | Quick white fade. Ends at 24.0. Step 27 is marked done. |

## Doc step 28 - Quote, checklist and code block

- Files: `Step28BlockStyles.tsx`, `step28-script.ts`, `step28-data.ts`. `durationMs` 38000. Starts like step 27. Recording: about 4:10-5:15. New block styles in the editor (`BlockKind` gained "quote", "todo" and "code"; drawn by `DocumentView.tsx`): **block quote** (thin grey bar on the left, indent, slightly muted text), **checklist item** (an empty 14 px square box, then the text; a ticked state with a check and struck-through grey text is built (`Block.checked`) but never shown, because the frames never tick it; hook `doc-check-<id>`) and **code block** (fixed-width text, 11 px, no box, as in the frames). Helpers in `insert-timeline.ts`: `clickEndAndNewLine` (click at the end of a line, then a new empty line with the caret, like Enter), `convertCaretBlock`, `typeInBlock`. `chooseInsertItem` runs Block quote, Checklist and Code block (the caret's line takes the style). The toolbar size box now shows 11 for these styles.

| Time | What happens |
|---|---|
| 0.0 | The editor fades in. |
| 0.8 | Caption "Click in the paragraph you want to quote". Cursor clicks in the intro paragraph; the caret shows. |
| 2.5 | Caption "Click Insert, then Block quote". Open the menu, cursor to Block quote, ring, click. The paragraph becomes a quote. |
| 6.0 | Caption "A block quote sets text apart". Ring on the quote. |
| 9.0 | Caption "Click at the end of the last line". Cursor clicks at the end of the Contacts paragraph; the caret moves to a new empty line. |
| 11.0 | Caption "Click Insert, then Checklist". Open the menu, cursor to Checklist, ring, click. A checklist item appears. |
| 14.0 | Caption "Type the first item". Types "Send the brief to Alex". |
| 18.5 | Caption "Click the box when it is done". Cursor to the box, ring (hover only). |
| 22.0 | Cursor clicks at the end of the item; a new empty line below. |
| 23.5 | Caption "Click Insert, then Code block". Open the menu, cursor to Code block, ring, click. A code block appears. |
| 27.0 | Caption "Type your code". Types "const client = 'Acme Studio';". |
| 32.0 | Caption "Code stays in a fixed-width font". Ring on the code block. |
| 35.0 | Ring and caption clear. Hold. |
| 37.6 | Quick white fade. Ends at 38.0. Step 28 is marked done. |

## Doc step 29 - Add an eSignature

- Files: `Step29ESignature.tsx`, `step29-script.ts`, `step29-data.ts`. `durationMs` 24000. Starts like step 27. Recording: about 5:15-5:35. New shared pieces: **`ESignatureDialog.tsx`** (380 px; tabs Draw (selected), Type, Upload, Request with icons; "Draw your signature below:"; a drawing canvas; Clear and a blue "Insert Signature"; scene variable `esigProgress` 0 to 1 reveals the stroke; hooks `esig-tab-<id>`, `esig-canvas`, `esig-stroke`, `esig-clear`, `esig-insert`, `esig-close`), the sample strokes **`stroke-data.ts`** (`SIGNATURE` and `DOODLE`, one SVG path each: original, not the recording's scribbles), **`ObjectBlock.tsx`** (the signature, a 110 px black stroke, and the drawing in the page; scene variable `pageObjects`; hooks `page-signature`, `page-drawing-block`, `page-drawing`, `drawing-handle-<tl|tr|bl|br>`, `drawing-toolbar`) and **`SelectionFrame.tsx`** (the selection look of step 20's image: outline, four corner handles, dark floating toolbar; `ImageBlock` now uses it, looking exactly as before). New timeline helper **`tl.followPath(selector, ms, onProgress)`** in `lib/timeline.ts`: the cursor glides to the start of an SVG path, then follows it at an even speed and reports its progress, so a script can reveal a stroke under the cursor; Pause freezes it; with reduced motion it jumps. Helpers in `insert-timeline.ts`: `openEsignature`, `insertObject`.

| Time | What happens |
|---|---|
| 0.0 | The editor fades in. |
| 0.8 | Caption "Click where the signature should go". Cursor clicks at the end of the Contacts paragraph; a new empty line with the caret. |
| 2.5 | Caption "Click Insert, then eSignature". Open the menu, cursor to eSignature, ring, click. The dialog opens on the Draw tab. |
| 5.5 | Caption "Draw your signature with your mouse". The cursor follows the sample stroke for about 3.2 s and the stroke appears behind it. |
| 10.0 | Caption "You can also type, upload or request a signature". Cursor hovers Type, Upload and Request in turn (hover only). |
| 14.0 | Caption "Click Insert signature". Cursor to the blue button, ring, click. The dialog closes and the signature appears in the page at the caret. |
| 17.5 | Caption "Your signature is in the document". Ring on the signature. |
| 20.5 | Ring and caption clear. Hold. |
| 23.6 | Quick white fade. Ends at 24.0. Step 29 is marked done. |

## Doc step 30 - Draw and insert symbols

- Files: `Step30DrawSymbols.tsx`, `step30-script.ts`, `step30-data.ts`. `durationMs` 38000. Starts like step 27. Recording: about 5:25-6:00. New shared pieces: **`DrawingDialog.tsx`** (420 px; Pen (selected) and Eraser, seven colour dots (black ringed), five size dots (the second selected), a crosshair canvas, Clear, Cancel and a blue Insert; scene variable `drawProgress`; hooks `draw-tool-pen|eraser`, `draw-color-<n>`, `draw-size-<n>`, `draw-canvas`, `draw-stroke`, `draw-clear`, `draw-cancel`, `draw-insert`, `draw-close`; copy, colours and sizes in `insert-data.ts` `DRAWING`) and **`SymbolsDialog.tsx`** ("Insert Symbol", 408 px, search input, six category pills with the selected one solid blue, symbols 10 to a row; scene variable `symCategory`; hooks `sym-cat-<id>`, `sym-<category>-<index>`, `sym-search`, `sym-close`; categories and symbols in `insert-data.ts` `SYMBOLS`). The drawing goes into the page as the larger doodle in the `SelectionFrame` look (four blue corner handles and the dark toolbar); a symbol click adds the character at the caret in the text behind the dialog, which stays open. Helpers in `insert-timeline.ts`: `openDrawing`, `deselectObjects`, `openSymbols`, `chooseSymbolCategory`, `clickSymbol`.

| Time | What happens |
|---|---|
| 0.0 | The editor fades in. |
| 0.8 | Caption "Click at the end of the Contacts line". Cursor clicks at the end of the Contacts paragraph; a new empty line with the caret. |
| 2.5 | Caption "Click Insert, then Drawing". Open the menu, cursor to Drawing, ring, click. The dialog opens. |
| 5.5 | Caption "Pick a pen color and size". Cursor hovers three colour dots and one size dot (hover only; black stays selected). |
| 8.0 | Caption "Draw with your mouse". The cursor follows the sample doodle for about 3.2 s and the stroke appears behind it. |
| 12.0 | Caption "Click Insert". Cursor to Insert, ring, click. The dialog closes; the drawing is in the page with four corner handles and the floating toolbar, and a new empty line is under it. |
| 16.0 | Caption "Click Insert, then Symbols". Cursor clicks on the new line below the drawing (the drawing is deselected); open the menu; cursor to Symbols, ring, click. The dialog opens on Arrows. |
| 19.5 | Caption "Browse symbols by category". Click Math, then Arrows. |
| 23.5 | Caption "Click a symbol to add it". Click five arrows in turn; each appears in the text behind the dialog. |
| 29.0 | Caption "Click X to close the window". Cursor to X, click. The dialog closes; the symbols stay. |
| 32.0 | Caption clears. Hold. |
| 35.6 | Quick white fade. Ends at 36.0 (the step is 38.0 long). Step 30 is marked done; the completion card appears ("You're all set" / "You now know the basics of Snaarp Doc.") because step 30 was then the last step in the config (steps 31 to 34 now follow). |


## Doc step 31 - Explore the Format menu

- Files: `Step31FormatMenu.tsx`, `step31-script.ts`, `step31-data.ts`. `durationMs` 23000. URL pill `docs.snaarp.com/document/project-brief` (placeholder, same for steps 32 to 34). Starts with the sample document only (Editing mode, ruler on, one page, nothing selected). Recording: `ref/docs/Snaarp_Doc_format.mp4`, about 0:01-0:12 (Text submenu), Paragraph styles at about 1:39, Align & indent at about 1:42. New shared pieces: **`FormatMenu.tsx`** (+ `format-menu-data.ts`; a card under "Format", 172 px wide; three groups: Text, Paragraph styles, Align & indent, Bullets & numbering | Headers & footers, Page numbers, Page orientation, Columns (greyed out) | Clear formatting with "Ctrl+\" and no icon; four submenus that open to the right of their row; scene variables `formatMenu` and `formatSub`; hooks `format-item-<id>`, `format-sub-<id>`, `format-menu-card`) and the timeline helpers in **`format-timeline.ts`** (`clickFormatMenu`, `hoverFormatItem`, `hoverFormatSub`, `chooseFormatSub`, `closeFormatMenu`). Eight new icons (`fmText`, `fmHeading`, `fmAlign`, `fmList`, `fmHeaderFooter`, `fmHash`, `fmOrientation`, `fmColumns`) are in `components/icons.tsx`.

| Time | What happens |
|---|---|
| 0.0 | The editor fades in. |
| 0.8 | Caption "Click Format". Cursor to Format, ring, click; the menu opens. |
| 2.5 | Caption "The Format menu changes how your document looks". Ring on the menu card. |
| 4.5 | Caption "Text sets bold, italic, underline and more". Cursor to Text; its submenu opens (Bold Ctrl+B, Italic Ctrl+I, Underline Ctrl+U, Strikethrough, Superscript, Subscript). |
| 7.0 | Caption "Paragraph styles sets headings and normal text". Submenu: Normal text, Heading 1 to 6 (each in its own size). |
| 9.5 | Caption "Align & indent moves text left, center or right". Submenu: Left, Center, Right, Justify, Increase indent, Decrease indent. |
| 12.0 | Caption "Bullets & numbering makes lists". Submenu: Bullet list, Numbered list, Checklist. |
| 14.5 | Caption "These options set up your pages". Cursor hovers Headers & footers, Page numbers and Page orientation in turn (hover only). |
| 17.0 | Caption "Columns is greyed out until it is available". Cursor to Columns (stays greyed). |
| 19.0 | Caption "Clear formatting removes all styling". Cursor to Clear formatting (shortcut visible). |
| 21.0 | The menu closes. Hold. |
| 22.6 | Quick white fade. Ends at 23.0. Step 31 is marked done. |

## Doc step 32 - Format your text

- Files: `Step32FormatText.tsx`, `step32-script.ts`, `step32-data.ts`. `durationMs` 38000. Starts with the sample document plus the practice paragraph after Contacts: "Bold, italic, underline and strikethrough change how words look. Launch is on the 15th. Water is H2O." (in `step32-data.ts`, with the words that are selected). New in the editor: **text formatting** (`Block.formats`: bold, italic, underline, strikethrough, superscript, subscript on ranges of a block's text; pure functions in `components/docs/format-state.ts` (`toggleFormat`, `practiceEditor`, `activeFormats`); drawn by `DocumentView.tsx`) and the stage setting `formatting` (the toolbar buttons show their active look; the style box shows the style). Helpers in `format-timeline.ts`: `dragSelectText` (the cursor drags across a word while the blue highlight grows; the floating toolbar hangs over the word), `clickInBlock`.

| Time | What happens |
|---|---|
| 0.0 | The editor fades in. |
| 0.8 | Caption "Select the word you want to format". The cursor drags across "Bold"; it is highlighted and the floating toolbar shows. |
| 3.0 | Caption "Click Format, then Text, then Bold". Open Format; cursor to Text; its submenu opens (Ctrl+B visible); cursor to Bold, ring, click. The word turns bold and the toolbar B button shows active. |
| 7.5 | Caption "Now select italic". Select "italic", Format > Text > Italic. |
| 12.0 | Caption "Underline adds a line under the text". Select "underline", Format > Text > Underline. |
| 16.5 | Caption "Strikethrough crosses text out". Select "strikethrough", Format > Text > Strikethrough. |
| 21.0 | Caption "Superscript raises text above the line". Select "th" in "15th", Format > Text > Superscript. |
| 25.5 | Caption "Subscript lowers text below the line". Select "2" in "H2O", Format > Text > Subscript. |
| 30.0 | Caption "Shortcuts: Ctrl+B for bold, Ctrl+I for italic, Ctrl+U for underline". Cursor clicks at the end of the practice paragraph (selection clears); ring on the paragraph. |
| 34.0 | Ring and caption clear. Hold. |
| 37.6 | Quick white fade. Ends at 38.0. Step 32 is marked done. |

Each effect cycle (select, open Format, Text, item) takes about 4.5 s and is identical.

## Doc step 33 - Use paragraph styles

- Files: `Step33ParagraphStyles.tsx`, `step33-script.ts`, `step33-data.ts`. `durationMs` 30000. Starts with the sample document plus two Normal text lines after Contacts: "Project overview" and "A faster, clearer website for Acme Studio." New in the editor: **paragraph styles** (`Block.heading` 1 to 6; Normal text clears it; `setHeading` in `format-state.ts`; styles in `DocumentView.tsx`: Heading 1 24.5 px, Heading 2 19.5 px (same as the sample "Goals"), 3 to 6 smaller, all bold). The toolbar's style box shows "Normal text" or "Heading n" and the size box follows (25, 20, 16, 14, 12, 11).

| Time | What happens |
|---|---|
| 0.0 | The editor fades in. |
| 0.8 | Caption "Click in the line you want to turn into a heading". Cursor clicks inside "Project overview"; the caret shows; the style box says "Normal text". |
| 2.8 | Caption "Click Format, then Paragraph styles". Open the menu; cursor to Paragraph styles; its submenu opens. |
| 5.0 | Caption "Higher numbers mean smaller headings". Cursor moves over Heading 1, 2, 3 (hover only). |
| 8.0 | Caption "Choose Heading 1". Cursor to Heading 1, ring, click. The line becomes a large bold heading; the style box says "Heading 1". |
| 12.0 | Format > Paragraph styles > Heading 2. Caption "Heading 2 is a bit smaller". It matches the Goals heading. |
| 16.0 | Heading 3. Caption "Heading 3 is smaller again". |
| 20.0 | Normal text. Caption "Normal text turns it back into plain text". |
| 24.0 | Heading 2. Caption "We will keep Heading 2 here". The line ends as Heading 2. |
| 27.0 | Caption clears. Hold. |
| 29.6 | Quick white fade. Ends at 30.0. Step 33 is marked done. |

## Doc step 34 - Align and indent text

- Files: `Step34AlignIndent.tsx`, `step34-script.ts`, `step34-data.ts`. `durationMs` 36000. Starts with the sample document plus one Normal text, left aligned line after Contacts: "Thank you for choosing Acme Studio." New in the editor: **alignment** (`Block.align`: left, center, right, justify; `setAlign`) and **indent** (`Block.indent`, 36 px per step, 0 to 8; `changeIndent`). The toolbar's four alignment buttons show the active look (Left when a paragraph has no alignment set). `DocEditor` toolbar groups gained hooks `toolbar-group-<first tool id>`.

| Time | What happens |
|---|---|
| 0.0 | The editor fades in. |
| 0.8 | Caption "Click in the line you want to align". Cursor clicks inside the practice line; the caret shows. |
| 2.8 | Caption "Click Format, then Align & indent, then Center". Open the menu; Align & indent; Center, ring, click. The line moves to the middle; the toolbar center button shows active. |
| 7.5 | Format > Align & indent > Right. Caption "Right moves it to the right edge". |
| 11.5 | Format > Align & indent > Left. Caption "Left puts it back". |
| 15.5 | Cursor clicks inside the intro paragraph. Caption "Justify spreads the lines to fill the full width". Format > Align & indent > Justify; the right edge is even. |
| 20.5 | Cursor clicks inside the practice line. Caption "Increase indent moves the text in". Format > Align & indent > Increase indent; the line moves in about 36 px. |
| 25.0 | Caption "Decrease indent moves it back". Format > Align & indent > Decrease indent; the line returns. |
| 29.0 | Caption "Shortcuts also work on the toolbar". Ring on the four alignment buttons. |
| 32.5 | Ring and caption clear. Hold. |
| 35.6 | Quick white fade. Ends at 36.0. Step 34 is marked done; the completion card appeared ("You're all set") when step 34 was the last step in the config (steps 35 to 38 now follow). |


## Doc step 35 - Bullets and numbered lists

- Files: `Step35Lists.tsx`, `step35-script.ts`, `step35-data.ts`. `durationMs` 26000. URL pill `docs.snaarp.com/document/project-brief` (placeholder, same for steps 36 to 38). Starts with the sample document plus three Normal text lines after Contacts: "Homepage design", "Content review", "Launch". Recording: `ref/docs/Snaarp_Doc_format.mp4`, about 2:15-2:30. New in the editor: **lists** (`Block.list` "bullet" | "number"; `setList` in `format-state.ts`; round bullets or "1." numbers in a 30 px hanging indent, drawn by `DocumentView.tsx`; Checklist is the block kind "todo" of step 28; choosing another list type replaces the old one; the toolbar bullet / number buttons show active). The Bullets & numbering rows of the Format menu are wired. Helper `dragSelectBlocks` (the cursor drags over several paragraphs while the blue highlight grows).

| Time | What happens |
|---|---|
| 0.0 | The editor fades in. |
| 0.8 | Caption "Select the lines you want in a list". The cursor drags from the start of "Homepage design" to the end of "Launch"; the three lines are highlighted. |
| 3.5 | Caption "Click Format, then Bullets & numbering, then Bullet list". Open the menu; cursor to Bullets & numbering; its submenu opens; Bullet list, ring, click. The lines become a bulleted list. |
| 8.5 | Caption "Checklist adds tick boxes for tasks". Format > Bullets & numbering > Checklist. The lines become checklist items (the selection stays). |
| 13.5 | Caption "Numbered list shows the order of steps". Format > Bullets & numbering > Numbered list. The lines become "1. 2. 3.". |
| 18.5 | Caption "Your list is ready". Ring on the list. |
| 22.0 | Ring and caption clear. Hold. |
| 25.6 | Quick white fade. Ends at 26.0. Step 35 is marked done. |

## Doc step 36 - Headers, footers and page numbers

- Files: `Step36HeaderFooter.tsx`, `step36-script.ts`, `step36-data.ts` (the sample header "Acme Studio brief" and footer "Confidential" are in the data). `durationMs` 32000. Starts with the sample document only. Recording: about 2:55-3:10 (the Format menu with Headers & footers and the Page numbers dialog). The Format menu rows are wired: **Headers & footers** (`insertHeaderFooter` in `insert-timeline.ts`: both zones appear with their dotted lines from step 25, the caret is in the header) and **Page numbers** (the step 27 dialog through `openPageNumbers`; defaults bottom, right, 1). `chooseFormatItem` (in `format-timeline.ts`) runs menu rows that have no submenu. `clickZone` scrolls the page to a zone and clicks it. The zones' text has the hooks `page-header-text` and `page-footer-text`.

| Time | What happens |
|---|---|
| 0.0 | The editor fades in. |
| 0.8 | Caption "Click Format, then Headers & footers". Open the menu; Headers & footers, ring, click. The header and footer areas appear; the caret is in the header. |
| 4.5 | Caption "Type your header text". Types "Acme Studio brief". |
| 8.5 | Caption "Click the footer to add footer text". The page scrolls to its foot; the cursor clicks in the footer. |
| 10.0 | Caption "Type your footer text". Types "Confidential". |
| 14.0 | Caption "Click Format, then Page numbers". Open the menu; Page numbers, ring, click. The dialog opens. |
| 17.0 | Caption "Choose the position and alignment". Click "Bottom (footer)", then "Right". |
| 21.0 | Caption "Click Apply". Cursor to Apply, ring, click. The dialog closes and "1" shows at the right of the footer. |
| 24.0 | Caption "Your header, footer and page number are set". The page scrolls up; ring on the header text; scrolls down; ring on the footer text, then on the number. |
| 28.0 | Ring and caption clear. Hold. |
| 31.6 | Quick white fade. Ends at 32.0. Step 36 is marked done. |

## Doc step 37 - Change page orientation

- Files: `Step37Orientation.tsx`, `step37-script.ts`, `step37-data.ts`. `durationMs` 27000. Starts with the sample document only, portrait. Recording: about 3:12-3:18 (only the dialog is shown). New shared pieces: **`PageOrientationDialog.tsx`** (340 px card on the shared `InsertDialog` frame: title "Page orientation", "Apply to" with a box showing "Whole document", "Orientation" with the radios Portrait / Landscape, Cancel and a black OK; copy and the landscape shape in `PAGE_ORIENTATION` in `format-menu-data.ts`; scene variables `insertDialog` = "orientation", `poChoice`, `pageOrientation`; hooks `po-apply-to`, `po-portrait`, `po-landscape`, `po-cancel`, `po-ok`, `po-close`) and **landscape pages** (`DocEditor` setting `landscape`: the page is 54.7% of the canvas width (92% on narrow screens), 11 : 8.5, with a border and a soft shadow; the ruler follows). Helpers in `format-timeline.ts`: `openPageOrientation`, `chooseOrientation`, `clickOrientationOk`.

| Time | What happens |
|---|---|
| 0.0 | The editor fades in. |
| 0.8 | Caption "Click Format, then Page orientation". Open the menu; Page orientation, ring, click. The dialog opens with Portrait selected. |
| 4.0 | Caption "Choose which pages to change". Ring on the "Apply to" box. |
| 6.5 | Caption "Choose Landscape". Cursor to Landscape, click; the radio switches. |
| 9.5 | Caption "Click OK". Cursor to OK, ring, click. The dialog closes and the page becomes wide. |
| 13.0 | Caption "The page is now wider than it is tall". Ring on the page. |
| 16.5 | Caption "Switch back whenever you like". Format > Page orientation; the dialog opens with Landscape selected. |
| 19.5 | Cursor to Portrait, click; then OK, ring, click. The page returns to portrait. |
| 24.0 | Caption clears. Hold. |
| 26.6 | Quick white fade. Ends at 27.0. Step 37 is marked done. |

## Doc step 38 - Clear formatting

- Files: `Step38ClearFormatting.tsx`, `step38-script.ts`, `step38-data.ts`. `durationMs` 22000. Starts with the sample document plus one pre-formatted paragraph after Contacts: "Special offer: book before December and save 20% on the redesign." ("Special offer:" bold and red, "December" italic, "20%" underlined and highlighted yellow, "redesign" struck through and blue; the marks are in `MARKS` in the data file). Recording: about 3:20-3:40. New in the editor: **colour and highlight marks** (static: `TextFormat` "color" and "highlight" with a `value`; `preformat` in `format-state.ts` puts them on text from data), a **soft selection** (`Selection.soft`: a light see-through blue, so the colours show under it) and **Clear formatting** (`clearFormats`: every inline mark comes off the selection, the words stay). Helper `dragSelectBlocks` with `soft`. The menu row shows the shortcut "Ctrl+\" as in the frames.

| Time | What happens |
|---|---|
| 0.0 | The editor fades in. |
| 0.8 | Caption "Select the text you want to reset". The cursor drags across the whole paragraph; it is highlighted and the floating toolbar appears. |
| 4.0 | Caption "This text has bold, color, a highlight and a line through it". Ring on the paragraph. |
| 7.0 | Caption "Click Format, then Clear formatting". Open the menu; Clear formatting (shortcut visible), ring, click. All the styling disappears; the words stay. |
| 11.0 | Caption "The words stay, the styling goes". Ring on the paragraph. |
| 15.0 | Caption "Shortcut: use the keys shown in the menu". Cursor hovers the toolbar area (no click). |
| 18.0 | Caption clears. Hold. |
| 21.6 | Quick white fade. Ends at 22.0. Step 38 is marked done. |

## Doc steps 39-44 - shared pieces (Tools menu, Word count, eSignature menu and tabs)

Recordings: `ref/docs/Snaarp_Doc_tools.mp4` (1910x910, 31 s; steps 39 and 40; frames `ref/docs/frames-step39/` and `frames-step40/`) and `ref/docs/Snaarp_Doc_esignature.mp4` (1000x480, 1:25; steps 41 to 44; frames `frames-step41/` to `frames-step44/`). All six steps start from the original sample document (title "Project Brief", Editing mode, panels closed, ruler on, one page, portrait) and use the placeholder address `docs.snaarp.com/document/project-brief`.

- **`ToolsMenu.tsx`** (+ `tools-menu-data.ts`, helpers in `tools-menu-timeline.ts`): the Tools dropdown under "Tools" (196 px). Groups: Spelling and grammar (greyed) | Word count (Ctrl+Shift+C), Document outline (Ctrl+Alt+H) | Dictionary (greyed, Ctrl+Shift+Y) | Notification settings, Preferences, Accessibility (all greyed). Only Word count and Document outline do anything; greyed rows get no hover fill. Scene variable `toolsMenu`. Hooks `tools-item-<id>` (spelling, word-count, outline, dictionary, notifications, preferences, accessibility) and `tools-menu-card`. Helpers `clickToolsMenu`, `hoverToolsItem`, `chooseToolsItem` (Document outline flips `outlineOpen`, the same panel as View > Document outline; Word count opens the dialog).
- **`WordCountDialog.tsx`** (+ `WORD_COUNT` copy in `tools-menu-data.ts`, numbers from `word-count.ts`): a 330 px card on the shared `InsertDialog` frame, opened with the scene variable `insertDialog` = "wordcount". Title "Word count", grey subtitle, four rows (Words, Characters, Characters (no spaces), Pages) with thin dividers, black "Done" button. The numbers are computed live from the document on screen (`docStats`), so Words always equals the footer's "N words". For the sample document: 85 words, 507 characters, 430 without spaces, 1 page. Hooks `wc-card` (the whole dialog), `wc-row-<words|characters|characters-no-spaces|pages>`, `wc-done`, `wc-close`. `InsertDialog` (`cardHook`) and the admin `Modal` (`hook`) gained an optional hook so a script can ring the whole card.
- **`ESignatureMenu.tsx`** (+ `esignature-menu-data.ts`, helpers in `esignature-menu-timeline.ts`): the dropdown under "eSignature" (170 px): Sign document (pen), Request signature (paper plane), a divider, Signature history (greyed). Scene variable `esigMenu`. Hooks `esign-item-<sign|request|history>` and `esign-menu-card`. `chooseEsignatureItem` opens the dialog on Draw (Sign document) or on Request (Request signature).
- **`ESignatureDialog.tsx`** (the step 29 dialog, extended): the scene variable `esigTab` picks the tab (draw, the default | type | upload | request); the selected tab has a blue underline and blue text. Draw is unchanged (step 29 plays as before). **Type:** grey hint, input `field:esig-name` (placeholder "Your full name"), a live preview of the name in an italic serif (28 px) under the input once text is typed, and a blue "Insert Signature" button that is pale until text is typed. **Upload:** dashed drop zone with an upload icon and "Click to upload (PNG, JPG)"; hover turns it light blue; the computer's file picker is not drawn. **Request:** two-line description, email input `field:esig-email` ("Recipient email address"), text area `field:esig-message` ("Optional message..."), and a blue "Send Request" button with a paper-plane icon, pale until the address looks valid (`isEmail`). `esigFocus` ("name" | "email" | "message") gives that input the dark border and caret. Hooks `esig-tab-<id>`, `esig-canvas`, `esig-stroke`, `esig-clear`, `esig-insert`, `esig-name`, `esig-preview`, `esig-drop`, `esig-email`, `esig-message`, `esig-request-hint`, `esig-send`, `esig-close`. Copy in `ESIGN` in `insert-data.ts`. Helpers `clickEsignatureTab` and `typeInEsignatureField`; `openEsignature(tl, tab)` resets the tab, focus and fields.
- **Signature blocks in the page** (`ObjectBlock.tsx`): `ObjectState.kind` is now "signature" (drawn) | "drawing" | "typed" (the name in `text`, italic serif, 24 px) | "upload" (the second sample signature, `UPLOADED_SIGNATURE` in `stroke-data.ts`, 120 px wide, clean black stroke on a transparent background). A `selected` one sits in the shared `SelectionFrame` (thin blue outline, four corner handles, the dark floating toolbar); hooks `page-signature-block`, `page-signature`, `signature-handle-<tl|tr|bl|br>`, `signature-toolbar`. The drawn signature of step 29 is not selected and stays a plain stroke. `insertObject(tl, kind, { selected, text })`.
- **Start state for steps 41 to 43:** `SIGN_SPOT_EDITOR` (in `esignature-menu-timeline.ts`): the sample document with a new empty line under Contacts and the caret in it; the signature goes under that line.

## Doc step 39 - Explore the Tools menu

- Files: `Step39ToolsMenu.tsx`, `step39-script.ts`, `step39-data.ts`. `durationMs` 24000. Recording: about 0:02-0:28 of the Tools video (the Comments panel and the small round pop-up near the end are left out). `initTabs` runs first so a replay starts with the outline closed.

| Time | What happens |
|---|---|
| 0.0 | The editor fades in. |
| 0.8 | Caption "Click Tools". Cursor to Tools, ring, click; the menu opens. |
| 2.5 | Caption "The Tools menu has helpers for your document". Ring on the menu. |
| 4.5 | Caption "Some tools are greyed out until they are available". Cursor hovers Spelling and grammar (stays greyed). |
| 7.0 | Caption "Word count counts your words and pages". Cursor hovers Word count (shortcut visible). |
| 9.5 | Caption "Document outline shows your tabs and headings". Cursor to Document outline, ring, click. The menu closes; the outline panel slides in on the left and the page shifts right. |
| 12.5 | Caption "The outline opens right away". |
| 14.5 | Caption "Click Tools again". Cursor to Tools, click; the menu opens. |
| 16.5 | Caption "Dictionary, notifications, preferences and accessibility are not available yet". Cursor moves over those four greyed rows in turn (hover only). |
| 20.0 | The menu closes. Caption "Click the back arrow to close the outline". Cursor to the panel's back arrow, ring, click; the panel closes and the page returns to the centre. |
| 23.0 | Caption clears. Hold. |
| 23.6 | Quick white fade. Ends at 24.0. Step 39 is marked done. |

## Doc step 40 - Check your word count

- Files: `Step40WordCount.tsx`, `step40-script.ts`, `step40-data.ts`. `durationMs` 18400. Recording: about 0:05-0:12 of the Tools video.

| Time | What happens |
|---|---|
| 0.0 | The editor fades in. |
| 0.8 | Caption "Click Tools, then Word count". Open the menu; cursor to Word count, ring, click. The menu closes and the dialog opens with the live numbers. |
| 4.0 | Caption "See your words, characters and pages". A ring moves down the four rows in turn (Words, Characters, Characters (no spaces), Pages). |
| 9.0 | Caption "Shortcut: Ctrl+Shift+C opens it any time". Ring on the whole dialog. |
| 12.5 | Caption "Click Done to close". Cursor to Done, ring, click. The dialog closes. |
| 15.5 | Caption clears. Hold. |
| 18.0 | Quick white fade. Ends at 18.4. Step 40 is marked done. |

## Doc step 41 - Sign your document

- Files: `Step41SignDocument.tsx`, `step41-script.ts`, `step41-data.ts`. `durationMs` 24000. Starts from `SIGN_SPOT_EDITOR`. Recording: about 0:00-0:28 of the eSignature video (the recording's own scribble is replaced by the sample stroke).

| Time | What happens |
|---|---|
| 0.0 | The editor fades in; the caret blinks on the empty line under Contacts. |
| 0.8 | Caption "Click eSignature". Cursor to eSignature, ring, click; the menu opens. |
| 2.5 | Caption "The eSignature menu signs documents and requests signatures". Ring on the menu; the cursor hovers Signature history (greyed). |
| 5.0 | Caption "Click Sign document". Cursor to Sign document, ring, click. The dialog opens on Draw. |
| 7.5 | Caption "Draw your signature with your mouse". The cursor follows the sample stroke (about 3 s) and the stroke appears behind it. |
| 12.0 | Caption "Click Insert Signature". Cursor to the button, ring, click. The dialog closes; the signature is in the page with its handles and floating toolbar. |
| 16.5 | Caption "Your signature is in the document". Ring on the signature. |
| 21.0 | Ring and caption clear. Hold. |
| 23.6 | Quick white fade. Ends at 24.0. Step 41 is marked done. |

## Doc step 42 - Type your signature

- Files: `Step42TypeSignature.tsx`, `step42-script.ts`, `step42-data.ts` (the sample name "Jane Doe" is in the data). `durationMs` 26000. Starts from `SIGN_SPOT_EDITOR`. Recording: about 0:26-0:52.

| Time | What happens |
|---|---|
| 0.0 | The editor fades in. |
| 0.8 | Caption "Click eSignature, then Sign document". Open the menu; Sign document, ring, click. The dialog opens on Draw. |
| 4.0 | Caption "Click Type". Cursor to the Type tab, ring, click; the tab switches. |
| 6.5 | Caption "Type your full name". Cursor to the input, click; "Jane Doe" is typed. The button turns solid blue and the preview appears under the input. |
| 12.0 | Caption "A signature is generated from your name". Ring on the preview. |
| 15.5 | Caption "Click Insert Signature". Cursor to the button, ring, click. The dialog closes; the typed signature is in the page with its handles and floating toolbar. |
| 19.5 | Caption "Your typed signature is in the document". Ring on it. |
| 24.0 | Ring and caption clear. Hold. |
| 25.6 | Quick white fade. Ends at 26.0. Step 42 is marked done. |

## Doc step 43 - Upload a signature image

- Files: `Step43UploadSignature.tsx`, `step43-script.ts`, `step43-data.ts`. `durationMs` 19000. Starts from `SIGN_SPOT_EDITOR`. Recording: about 0:54-1:14 (the computer's file picker is left out; the cursor rests on the drop zone for 1.1 s, `PICKER_REST_MS`).

| Time | What happens |
|---|---|
| 0.0 | The editor fades in. |
| 0.8 | Caption "Click eSignature, then Sign document". Open the menu; Sign document, ring, click. The dialog opens on Draw. |
| 4.0 | Caption "Click Upload". Cursor to the Upload tab, ring, click; the dashed drop zone shows. |
| 6.5 | Caption "Click the box and choose your signature image". Cursor to the drop zone (it turns light blue), ring, click; the cursor rests about 1 s. |
| 9.5 | The dialog closes and the uploaded sample signature is in the page with its handles and floating toolbar. |
| 12.0 | Caption "Your uploaded signature is in the document". Ring on it. |
| 16.0 | Ring and caption clear. Hold. |
| 18.6 | Quick white fade. Ends at 19.0. Step 43 is marked done. |

## Doc step 44 - Request a signature (last step)

- Files: `Step44RequestSignature.tsx`, `step44-script.ts`, `step44-data.ts` (the sample address "alex@acme-studio.com" and message are in the data). `durationMs` 24500. Starts from `SAMPLE_EDITOR` (no caret needed). Recording: about 1:08-1:25.

| Time | What happens |
|---|---|
| 0.0 | The editor fades in. |
| 0.8 | Caption "Click eSignature, then Request signature". Open the menu; Request signature, ring, click. The dialog opens on the Request tab. |
| 4.0 | Caption "Ask someone else to sign your document". Ring on the grey description. |
| 7.0 | Caption "Enter their email address". Cursor to the input, click; "alex@acme-studio.com" is typed. The Send Request button turns solid blue. |
| 12.0 | Caption "Add a message if you like". Cursor to the text area, click; "Please sign the brief when you have a moment." is typed. |
| 18.0 | Caption "Click Send Request". Cursor to the button, ring, click. The dialog closes, the caption clears (so a narrow screen's caption does not cover it) and a toast says "Signature request sent". |
| 21.0 | Hold. |
| 24.1 | Quick white fade. Ends at 24.5. Step 44 is marked done; the completion card appears ("You're all set") because step 44 is the last step in the config. |

# Snaarp Doc steps 45-64 (toolbar and header buttons)

Recording: `ref/docs/Snaarp_Doc_toolbar.mp4` (1006x480, 1:23; 0:00-0:45 the cursor hovers each toolbar button, 0:45-1:23 the header buttons: Meet, Version history, Snaarp apps, Share). The recording only hovers; every step here shows the tool WORKING on a short practice line of the sample "Project Brief". All steps use `EditorStage` with `startDocument`, `formatting` and `tools` (see `CLAUDE.md`, "Steps 45-64"). Each starts with the editor fading in (`intro`), calls `initEditor` and `initToolbar` first (so a replay starts clean), ends with the quick white fade, and is standalone from the rail. Common beat: cursor to the button, the dark tooltip (the recording's text) shows for about 0.7-1 s, the button is ringed and clicked, the change shows. Files: `scenes/snaarp-doc/StepNxxx.tsx`, `stepN-script.ts`, `stepN-data.ts` (all copy, practice lines, sample values).

| Step | Title | Start state (practice text in `stepN-data.ts`) | Duration | What happens |
|---|---|---|---|---|
| 45 | Undo and redo | sample document | 22.0 s | Click the end of the last paragraph, type a new line (one undo step); click Undo (line gone, Redo wakes up); click Redo (line back). |
| 46 | Print and Paint format | one line; "Winter sale" bold + blue | 27.0 s | Print button opens the print window (`PrintDialog`), Cancel closes it. Select the blue words, click Paint format (button active), select "Spring offer": it takes the style. |
| 47 | Change the zoom | sample document | 20.0 s | Zoom box opens its list; 150% (page grows, footer says "Zoom: 150%"); again, 100%. |
| 48 | Paragraph styles and fonts | two lines | 33.0 s | Click "Project goals", style box, Heading 2. Select the sentence, font box (sample font list, Arial ticked), Georgia. |
| 49 | Change the font size | one line | 30.0 s | Select it; + twice (13), - once (12); click the size box, type 18 (caret and blue ring), Enter. |
| 50 | Bold, italic, underline | one line | 28.0 s | Select a word and click B, another and I, another and U; click away to see all three. |
| 51 | Text color and highlight | one line | 30.0 s | Select a word, Text color palette, red (the bar under the button turns red); select a phrase, Highlight palette, yellow. |
| 52 | Insert a link and an image | one line | 34.0 s | Select "our site", Insert link, type acme-studio.com, Insert (the link dialog of step 22). Insert image: uploading toast, the sample banner appears at the top (no file picker). |
| 53 | Align your text | one long paragraph | 30.0 s | Click in it; center, right, justify, left. |
| 54 | Line spacing | one long paragraph | 27.0 s | Spacing menu (Single, 1.15 ticked, 1.5, Double + two grey "Add space" rows); 1.5; again, Double. |
| 55 | Lists | three short lines | 34.0 s | Select all three; Bullet list; the bullet button's arrow, Checklist; tick one box; Numbered list. |
| 56 | Indent and outdent | three-item bullet list | 22.0 s | Click item 2; Increase indent (moves in), Decrease indent (back). |
| 57 | Clear formatting, superscript and subscript | one line; first words bold, red, struck | 31.0 s | Select the styled words, Clear formatting (the crossed-S button); the "2" in "m2" superscript; the "2" in "H2O" subscript. |
| 58 | Quote, horizontal line and table | three lines | 38.0 s | Block quote on line 1; a line under line 2 (Horizontal rule); the Table arrow opens a 6 x 5 square grid, hover to 2 x 2, click; header "Task" / "Owner" typed. |
| 59 | Full screen, draw and emoji | one line | 41.0 s | Full screen (the step 18 simulation), Esc; Drawing (pen follows the sample doodle, Insert); Symbols & Emoji, Emoji tab, one emoji, close. |
| 60 | Editing, Suggesting and Viewing modes | one line | 33.0 s | The pen button's list (Editing ticked, Suggesting, Viewing); Suggesting (header pill switches); a typed sentence is green and underlined; back to Editing. |
| 61 | Start or join a meeting | sample document | 29.0 s | Header video button: "Start new meeting", "Join with link"; Join turns the card into "Have a meeting code?"; "abc-defg-hij" typed, Continue turns blue, click: toast "Meeting ready (sample)". No meeting starts. |
| 62 | Check version history | sample document | 24.0 s | Header clock opens the Version history page with the sample list of saved versions (current one highlighted), hover two versions, "Show changes" ringed, back arrow. |
| 63 | Open the Snaarp apps panel | sample document | 28.0 s | Header grid opens the "Snaarp apps" card (3-column tiles, Docs tinted); hover Mail and Sheets; scroll to the rest (ends with 360); click the grid to close. |
| 64 | Share your document | sample document | 27.0 s | Header Share button ("Share document" tooltip) opens `ShareDialog` (Anyone with the link, Editor); role list shown; Copy link (toast "Link copied"); Done. The completion card follows. |

Hooks added: tooltip `tooltip`; cards `menu-<id>` and rows `tm-<card>-<id>` (e.g. `tm-zoom-150`, `tm-style-h2`, `tm-font-georgia`, `tm-color-1-0`, `tm-highlight-0-0`, `tm-spacing-15`, `tm-bullets-check`, `tm-table-2-2`, `tm-mode-suggesting`, `tm-meet-join`), `meet-code`, `meet-continue`, `meet-back`, `apps-scroll`, `app-<id>`, `header-meet`, `header-apps`, `header-history`, `vh-list`, `vh-version-<n>`, `vh-show-changes`, `tool-layer`. Scene variables added: `tip`, `toolMenu`, `zoomPct`, `lastColor`, `lastHighlight`, `sizeBox`, `paint`, `tablePick`, `field:meet-code`, `meetFocus`.


---

# Snaarp Admin (fourth tutorial): add users and give them products

Config: `tutorials/snaarp-admin.ts`, route `/tutorials/snaarp-admin`. **8 steps, all built**; the completion card follows step 8 (the last step in the config). All steps are on the Admin Panel Users page, `login.snaarp.com/admin/users` (the address in the recording), and share one stage, `scenes/snaarp-admin/UsersStage.tsx`, which takes a `start` state from `admin-seed.ts`. Recording: `ref/admin/Snaarp_Admin_add_users.mp4` (1454x720, 3:13). There was no earlier Admin tutorial in the repo, so these are steps 1-8. Sample data (never the recording's real data): Sam Carter, sam@acme-studio.com, username `sam`, Designer, Design, EMP-100, temporary password `Welcomes#26` typed as dots, admin avatar JD, counts 40 -> 41 active users, 1 suspended, 9 administrators, dates DD/MM/YYYY (`14/03/2026`). All copy and sample values are in `scenes/snaarp-admin/admin-data.ts`; per-step captions and URL are in `stepN-data.ts`. Whole tutorial: about 2:59 (178.9 s measured at 1440x900) from load to the completion card.

| Step | Title | Starts with | Time | What happens |
|---|---|---|---|---|
| 1 | Open the Create user form | Users page, 40 active users, page 1 of the directory (20 sample people) | 10.5 s | Ring the directory; glide to the purple "Create user" button and click; the dialog opens and is ringed (Email, First name, Last name, Username, Job title, Department, Employee number, Role, Temporary password). |
| 2 | Enter the user's details | Create user dialog open and empty | 17.0 s | Type email (caption: it is how they sign in), first name, last name, username. |
| 3 | Add job details and role | Dialog open, email / names / username typed | 26.0 s | Type job title; open Department (Engineering ... Operations) and choose Design; type employee number; open Role (Member, Admin, Owner), hover Admin and Owner, choose Member again. |
| 4 | Set a temporary password and create the user | Dialog open, everything but the password filled in | 19.5 s | Type the password as dots; the four rules turn green as characters arrive (8 characters and lowercase early, "#" last); ring the rules and the hint; click Create user; dialog closes, toast "sam@acme-studio.com created", Sam Carter appears alone on page 3 ("Showing 41-41 of 41"), Active Users 40 -> 41 (ringed). |
| 5 | Check the user's access | New user in the directory (created) | 22.0 s | Ring the row; open the Role dropdown (User checked, Administrator, Super Administrator), hover each, click the heading to close; open Products ("4 products": Snaarp Mail, Snaarp PDF, Snaarp Drive, SnaarpKey), pass the cursor over each, close; ring the Actions button. |
| 6 | Open Manage products | Same as step 5 | 30.0 s | Click the row Actions (three dots): Edit Profile, Manage Products, Change Password, Deactivate, Delete user (hover down the list); click Manage Products. The dialog lists the four products with "Granted 14/03/2026", Make admin, Remove and the note. **Make admin and Remove are only hovered, never clicked**, each with a caption; the note is ringed. |
| 7 | Add the user to another product | Manage products open, four products | 32.0 s | Open "Select a product..." (search box + scrolling list of the 12 products Sam does not have); scroll to the bottom and back; type "Books" (list filters to Snaarp Books); choose it; click the purple Add; toast "Added 1 product", Snaarp Books joins the list (ringed). |
| 8 | Confirm the new access | Manage products open, five products | 17.5 s | Ring Snaarp Books in the dialog; click x to close; the Products column reads "5 products" (ringed); open it: Snaarp Books is the fifth item (ringed). The last step, the completion card follows. |

Hooks: page `btn-create-user`, `users-heading`, `users-directory`, `stat-active`, `row-sam`, `role-sam`, `products-sam`, `actions-sam`, `role-opt-<id>`, `products-list`, `products-item-<id>`, `action-<id>` (edit, products, password, deactivate, delete); Create dialog `create-dialog`, `create-scroll`, `field-<id>`, `select-dept`, `select-role`, `opt-dept-<name>`, `opt-role-<name>`, `password-rules`, `rule-<id>`, `password-hint`, `btn-submit-create`, `btn-cancel-create`, `btn-close-create`; Manage dialog `manage-dialog`, `manage-scroll`, `mp-owned`, `mp-row-<id>`, `mp-admin-<id>`, `mp-remove-<id>`, `mp-note`, `mp-select`, `mp-popover`, `mp-search`, `mp-list`, `mp-opt-<id>`, `btn-mp-add`, `btn-close-manage`; toast `admin-toast`.


# Rail search (how the index is built)

Not a tutorial step: the search box at the top of the player rail. Code: `components/player/RailSearch.tsx`, `lib/search-index.ts`, copy in `components/player/rail-search-data.ts`.

**Index.** `buildSearchIndex(tutorials)` in `lib/search-index.ts` walks the registry in `tutorials/index.ts` at load time. There is no separate list, so every new tutorial and step is searchable automatically.
- One **product** entry per tutorial: `product.name` plus the optional `product.aliases` (for example "docs", "document" for Snaarp Doc; "email", "inbox" for Snaarp Mail). Aliases find the product only, not its steps.
- One **module** entry per step that has a `scene` (unbuilt steps cannot be opened, so they are left out). Searchable text: step title, group name, product name. The result shows the step title, then a small line "Snaarp Doc · eSignature · Step 41" (group left out when the tutorial has none; the step number is its position in the config).
- **Groups** come from the optional `groups: [{ title, from }]` in a tutorial config: a group starts at the step whose `id` equals `from` and runs to the next group. Only Snaarp Doc has them (Getting started 1-2, File 3-9, Edit 10-13, View 14-18, Insert 19-30, Format 31-38, Tools 39-40, eSignature 41-44, Toolbar 45-59, Header buttons 60-64). A group is a match field and a label, not a result of its own.

**Matching.** Case-insensitive, accents ignored (NFD), curly apostrophes straight, extra spaces squeezed. The query is split into words and every word must match somewhere in the entry. A match at the start of a word ranks above a match in the middle of a word; within that, title beats group beats product name; then an earlier position; then config order. Highlighted letters are the first match of each query word in the title, group and product name.

**Results panel.** Opens over the product card and step list (they stay mounted underneath, `inert`, so closing the panel brings them back unchanged). Heads "Products" (max 6) and "Modules" (max 10), each with "Show N more" when there are more; empty state "No results for ..." with a hint. Roles: `combobox` (input), `listbox` > `group` > `option`, `aria-activedescendant`, a polite live region announces the count.

**Opening a result.** A product result opens its tutorial at step 1 (in the open product it restarts step 1). A module result in the open tutorial calls the player's `select(index)`. A module result in another product stores `{ productId, step }` in `lib/pending-jump.ts` (client-side slot, expires after 5 s) and navigates to `/tutorials/<id>`; `TutorialPlayer` reads the slot in its initial state and starts on that step. After a pick the box clears, the panel closes and the box loses focus (so Space pauses again).


---

# Snaarp Slides (fifth tutorial): the File menu

Config: `tutorials/snaarp-slides.ts`, route `/tutorials/snaarp-slides`. **This round = the File menu only: 19 steps, all built.** The completion card follows the last step in the config (step 19 today), so adding Edit, View, Insert, Format, Slide, Arrange and Tools later moves it automatically. Recording: `ref/slides/Snaarp_Slides_file.mp4` (a copy of the owner's `Downloads/1026 (1)(1).mp4`; 1006x480, 228.7 s; git-ignored; frames in `ref/slides/frames-file/` at 1 fps, contact sheets in `ref/slides/sheets3/`, zooms in `ref/slides/z/`). Whole tutorial: about 9:16 (556 s measured at 1440x900) from load to the completion card. Sample data only: deck "Acme Studio Pitch" (renamed "Acme Studio Pitch 2026"), Jane Doe (jane@acme-studio.com, avatar JD), alex@acme-studio.com, acme-studio.com, imported file `acme-pitch.pptx`, UK dates (DD/MM/YYYY). All shared copy is in `components/slides/slides-data.ts`; each step has its own `data.ts` (captions, URLs) and `script.ts`.

**One stage for every step: `components/slides/SlidesApp.tsx`.** It draws the Presentations home (`SlidesLayout` + `HomeScreens`: home, Starred, Trash), a loading screen and the editor (`SlidesEditor`) with the File menu (`SlidesFileMenu`) and every dialog, all driven by scene variables (all off by default). Steps 1-2 pass `startStage="home"`; steps 3-19 start in the editor with the "Acme Studio Pitch" deck (one blank title slide), so each works alone from the rail. Later menus (Edit, View, Insert...) add a dropdown component in `SlidesEditor`'s `overlay` slot and helpers like `slides-timeline.ts`; the shell does not change.

Scene variables: `stage` (home | loading | editor), `screen` (presentations | starred | trash), `swap`, `intro`, `fade`, `title`, `titleEdit` ("" | selected | typing; text in `field:title`), `slides` (list of `SlideData`), `selected`, `ratio` (16/9 or 4/3), `starred`, `fileMenu`, `fileSub` (new | copy | share | email | download | history), `fileTip` (id of a greyed item whose tooltip shows), `offline`, `dialog` (start | templates | open | import | publish | emailFile | emailCollab | move | nameVersion | details | pageSetup | trash), `share`, `print` (the reused Snaarp Doc dialogs), `versionsOpen`, `trashItems`, `docToast`; per dialog: `openTab`, `openLoading`, `openPicked`, `importTab`, `importPhase` (idle | chosen | uploading | processing | complete), `publishState`, `emailAttach`, `collabChecked`, `moveChoice`, `moveCurrent`, `versionSel`, `aspectChoice`, `printValues`, `printOpen`, `focus` and the typed fields `field:<id>` (`email-to`, `email-subject`, `email-msg`, `collab-msg`, `version-name`, `page-w`, `page-h`, `share-input`, `title`). A script that sets a variable which mounts new DOM (for example the Open dialog's file list) must `await tl.wait(80)` before ringing it.

| Step | Title | Starts with | Time | What happens |
|---|---|---|---|---|
| 1 | Open Snaarp Slides | Presentations home | 19.0 s | Caption the home; ring the search box; ring "Start a new presentation" and hover Ocean Blue; ring a recent presentation; click Starred (screen swap), click Trash (two sample items, Restore hovered), click Presentations. |
| 2 | Start a blank presentation | Presentations home | 21.0 s | Click Blank; loading screen ("Loading presentation..."); the editor opens with the "Let's start creating" chooser (Slides / Images / Infographics faded, Templates, Import, Blank slide); hover Templates and Import; click Blank slide; the first, empty slide is ringed, then the slide panel. |
| 3 | Meet the File menu | Editor | 21.0 s | Click File; ring each group in turn with a caption: create / open / copy, share / email / download, rename / move / delete, versions and offline, details / page setup / print. |
| 4 | Start something new | Editor | 31.0 s | File > New: the two rows; click From template (template chooser dialog, hover three cards, Cancel); File > New > Presentation: a quick fade, the deck becomes "Untitled Presentation", toast "New presentation created". |
| 5 | Open a presentation | Editor | 32.8 s | File > Open (Ctrl+O mentioned): "Open a file" dialog with a loading spinner, then Recent (3 files); click each tab (My Drive, Shared with me, Starred, Computers, Upload); back to Recent; click Acme Studio Pitch; toast "Opened Acme Studio Pitch". |
| 6 | Import slides | Editor | 31.0 s | File > Import slides; From presentations tab (empty), Upload file tab; click the drop zone (no OS picker: `acme-pitch.pptx` just appears); Uploading, Importing your slides, Import complete; dialog closes, three slides join the panel, toast "3 slides imported"; click slides 3 and 4. |
| 7 | Make a copy | Editor | 28.0 s | File > Make a copy > Entire presentation (toast "Copy created: Copy of Acme Studio Pitch"); click a slide in the panel; File > Make a copy > Selected slides (toast with "(1 slide)"). |
| 8 | Share your presentation | Editor | 40.0 s | File > Share > Share with others: the Snaarp Doc `ShareDialog`; type alex@acme-studio.com, Alex Morgan is added (Editor); General access: Anyone with the link; role Commenter; Copy link (toast "Link copied"); Done. Then File > Share > Publish to web: Publish, the link `acme-studio.com/p/acme-pitch`, Stop publishing hovered, Done. |
| 9 | Email the presentation | Editor | 45.0 s | File > Email > Email this file: type To, Subject, Message; Attach as PPTX then PDF; Send (toast). File > Email > Email collaborators: tick Alex and Sam, type a message, Send (toast "Email sent to 2 collaborators"). |
| 10 | Download in a format you need | Editor | 26.0 s | File > Download: the seven formats (labels as recorded); hover the four whole-deck formats, then ring the three image formats ("current slide only"); click PDF; toast "Preparing download..." then "Downloaded Acme Studio Pitch.pdf". |
| 11 | Rename your presentation | Editor | 20.0 s | File > Rename: the header title becomes a field with its text selected; type "Acme Studio Pitch 2026"; Enter; the title and the address bar update. |
| 12 | Move it to a folder | Editor | 22.0 s | File > Move: folder picker (All Presentations, Client work, Archive, New folder); hover the rows, pick Client work, hover New folder, Move here; toast "Moved to Client work". |
| 13 | Use version history | Editor | 38.0 s | File > Version history > Name current version: type "Final draft", Save (toast). File > Version history > See version history: side panel (Today, Yesterday, 21/10/2026, by author); hover versions, click an older one, Restore this version (toast), close the panel. |
| 14 | Make it available offline | Editor | 24.0 s | File > Make available offline (toast "Available offline"); reopen File: a tick beside the item (ringed); click again (toast "Offline access turned off"); reopen: tick gone. |
| 15 | See the presentation details | Editor | 21.0 s | File > Details: ring each row (Title, Owner, Created, Last modified, Slides, Size, Location); Close. |
| 16 | Set the page size | Editor | 38.0 s | File > Page setup: ring Widescreen 16:9, click Custom (width and height boxes appear, 1600 x 900 typed), click Standard 4:3, Apply: the slide and thumbnail change shape; reopen, choose Widescreen 16:9, Apply. |
| 17 | Print your presentation | Editor | 33.0 s | File > Print (Ctrl+P mentioned): the Doc print panel adapted (Layout, Range, Color, Slides per page); Layout > Handouts, Range > Current slide, Layout > Slides; Print; toast "Sent to print". |
| 18 | Options that are not available yet | Editor | 24.0 s | File open; hover Convert to video, Add shortcut to Drive, Security limitations, Language: each rings and shows a dark tooltip saying it is not available yet. |
| 19 | Move a presentation to Trash | Editor | 30.0 s | File > Move to trash: confirm dialog, Move to trash (toast "Moved to Trash"); a quick fade to the Trash page (the deck, "Items in Trash are permanently deleted after 30 days", Restore / Delete forever); click Restore (toast "Restored: Acme Studio Pitch"; "Trash is empty"). The last step, the completion card follows. |

Hooks: shell `slides-search`, `slides-main`, `nav-<id>` (presentations, starred, trash), `start-panel`, `blank-card`, `template-<id>` (modern-dark, clean-white, ocean-blue, sunset-warm, forest-green), `template-gallery`, `recent-<n>`, `trash-title`, `trash-item-<n>`, `trash-restore-<n>`, `trash-delete-<n>`, `trash-empty`; editor `deck-title`, `deck-title-field`, `deck-star`, `editor-menu-<id>`, `editor-menubar`, `editor-toolbar`, `tool-<id>`, `editor-share`, `slideshow-button`, `slide-panel`, `thumb-<n>`, `new-slide`, `editor-canvas`, `canvas-slide`, `right-panel`, `rail-<id>`, `notes-bar`; File menu `file-menu`, `file-group-<0-5>`, `file-item-<id>` (new, open, import, copy, share, email, download, video, rename, move, shortcut, trash, history, offline, details, security, language, pagesetup, print), `file-sub-<id>` (presentation, template, entire, selected, others, publish, file, collaborators, pptx, odp, pdf, txt, jpeg, png, svg, name, see), `file-tip-<id>`; dialogs `start-dialog`, `start-card-<id>`, `templates-dialog`, `templates-card-<id>`, `templates-cancel`, `open-dialog`, `open-tab-<id>`, `open-list`, `open-file-<n>`, `import-dialog`, `import-tab-<id>`, `import-zone`, `import-browse`, `import-file`, `import-footer`, `publish-dialog`, `publish-ok`, `publish-link`, `publish-copy`, `publish-stop`, `publish-done`, `email-dialog`, `field-email-to`, `field-email-subject`, `field-email-msg`, `email-attach-<pdf|pptx>`, `email-send`, `collab-dialog`, `collab-person-<id>`, `field-collab-msg`, `collab-send`, `move-dialog`, `move-folder-<id>`, `move-new-folder`, `move-ok`, `name-version-dialog`, `field-version-name`, `version-save`, `version-panel`, `version-<id>`, `version-restore`, `version-panel-close`, `details-dialog`, `details-row-<name>`, `details-done`, `page-setup-dialog`, `page-option-<16x9|4x3|custom>`, `field-page-w`, `field-page-h`, `page-apply`, `trash-dialog`, `trash-confirm`; reused Snaarp Doc dialogs `share-*` (ShareDialog) and `print-setting-<id>`, `print-opt-<setting>-<option>`, `print-btn` (PrintDialog).

Reused from Snaarp Doc: `ShareDialog` (two optional, additive scene variables `field:share-input` and `shareAdded`), `PrintDialog` (optional props `copy`, `landscape`, `ratio` and variables `printValues`, `printOpen`), `DocToast` + `showDocToast`, the admin `Modal`, `APP_RAIL_ITEMS`. Snaarp Doc's own screens are unchanged (defaults). New code: `components/slides/` (`slides-data.ts`, `SlidesLayout.tsx`, `HomeScreens.tsx`, `SlidesEditor.tsx`, `SlideView.tsx`, `SlidesFileMenu.tsx`, `SlidesApp.tsx`, `dialogs-start.tsx`, `dialogs-share.tsx`, `dialogs-manage.tsx`, `parts.tsx`, `slides-timeline.ts`), `scenes/snaarp-slides/shared.ts` and `scenes/snaarp-slides/step<N>/` (`Step<N>.tsx`, `script.ts`, `data.ts`), new `sl*` icons in `components/icons.tsx`.


---

# Snaarp Slides steps 20-35: the Edit, View and Insert menus

Config: `tutorials/snaarp-slides.ts` (steps 20-35 follow the 19 File-menu steps; rail groups "Edit" from step 20, "View" from step 25 and "Insert" from step 30). **All 16 steps are built.** (A step 36 "Features coming soon" was built and then removed at the owner's request; the code is in git history.) The completion card follows the last step in the config (step 35 today), so Format, Slide, Arrange and Tools can be added later and it moves by itself; its text now reads "You know your way around Snaarp Slides and its File, Edit, View and Insert menus." Recording: `ref/slides/Snaarp_Slides_edit_view_insert.mp4` (a copy of the owner's `Downloads/1026 (1)(2).mp4`; 1006x480, 107 s; git-ignored; contact sheets and frames in `ref/slides/eiv/`): Edit 0:00-0:08, View about 0:09-0:40, Insert about 0:40-1:47. Every step starts in the editor on slide 2 ("Our services") of "Acme Studio Pitch 2026" (three slides: "Acme Studio", "Our services", "Next steps"), so each plays alone from the rail and replays cleanly (`beginEiv` in `scenes/snaarp-slides/eiv.ts` resets the deck, the selection and the undo history).

**Same stage as steps 1-19** (`components/slides/SlidesApp.tsx`), with new optional props `startSlides` and `startSelected` and new scene variables, all off by default (steps 1-19 are unchanged): `menuOpen` (edit | view | insert), `menuSub`, `menuTip`, `sel` (ids of the selected elements), `clip`, `undoStack` / `redoStack`, `textEdit` + `field:slideText`, `cellEdit` + `field:slideCell`, `findOpen` + `field:find` + `field:replace` + `findMatchCase` + `findOrigin` + `findIndex`, `notesOpen` + `field:notes`, `rulers`, `rulerMark`, `guides`, `snap`, `zoom` (50 | 75 | 100 | 125 | 150 | 200 | fit), `canvasX` / `canvasY`, `tool`, `draw`, `marker`, `fullScreen` + `fsHint` + `fsKey` + `fsPressed` + `fsArrow` + `fsSlide`, `imagePick`; `dialog` gained `insertImage`.

| Step | Title | Time | What happens |
|---|---|---|---|
| 20 | Undo and redo | 26 s | Click the bullet list, type "Book a free consultation" as a new line, click an empty spot; Edit rings the Undo / Redo block (Ctrl+Z, Ctrl+Y hints); Undo removes the line; Edit > Redo brings it back. |
| 21 | Select all | 17 s | Edit > Select all (Ctrl+A hint): handles on the title, the bullets and the rectangle; click an empty spot to clear. |
| 22 | Cut, copy and paste | 41 s | Edit open with nothing selected: Cut, Copy and Paste are greyed (each hovered); click the blue rectangle; Edit > Copy; Edit > Paste (a second rectangle appears offset, selected); Edit > Cut removes it; click slide 3; Edit > Paste puts it there. |
| 23 | Duplicate and delete | 25 s | Select the rectangle; Edit > Duplicate (a copy appears offset); Edit > Delete (the Delete key is mentioned) removes the copy. |
| 24 | Find and replace | 38 s | Edit > Find and replace opens the panel; click Find, type "services": matches are marked on the slides (the current one orange) and counted ("1 of 2"); Next jumps to slide 1 ("2 of 2"), Previous goes back; type "solutions" in Replace with; Replace all (both slides change, toast "2 replacements made", "No results"); close. |
| 25 | Add speaker notes | 28 s | View > Speaker notes opens the notes panel under the slide (tick in front of the row); click it and type "Welcome everyone and introduce Acme Studio."; Clear empties it; View > Speaker notes closes it. |
| 26 | Show the ruler | 25 s | View > Show ruler: rulers along the top and left (0-960, labels every 100); the cursor sweeps over the slide and a blue tick follows it on both rulers; View > Show ruler hides them. |
| 27 | Show guides | 27 s | View > Show guides: dashed centre (darker) and thirds guides; click the rectangle and drag it: its centre snaps onto a guide (the guides turn solid blue); View > Show guides hides them. |
| 28 | Change the zoom | 31 s | View > Zoom: the submenu opens (50%, 75%, 100%, 125%, 150%, 200%, Fit, each hovered); click 150% (the page grows, the toolbar zoom box reads 150%, the canvas scrolls across and back); View > Zoom > Fit. |
| 29 | Present in full screen | 26 s | View > Full screen: a dark overlay inside the frame, the slide fills it, the "Press Esc to exit full screen" pill; the right-arrow key chip moves to slide 3, the left arrow back; the Esc chip returns to the editor. |
| 30 | Add a text box | 27 s | Insert > Text box (the T tool lights up); drag on the slide: a dashed outline grows, then a box with a caret; type "Book a call: jane@acme-studio.com"; click an empty spot; the box is selected. |
| 31 | Insert an image | 28 s | Insert > Image opens our in-app picker (three sample illustrations); click the studio desk, Insert; the picture lands with eight handles; drag the bottom-right handle to make it smaller. |
| 32 | Insert shapes | 34 s | Insert > Shape: the submenu with Rectangle, Ellipse, Triangle, Diamond, Star, Arrow (each hovered with a caption); click Ellipse; Insert > Shape > Star. |
| 33 | Draw a line | 23 s | Insert > Line: a horizontal line lands, selected with a handle at each end; click an empty spot; click the line to select it again. |
| 34 | Insert a table | 33 s | Insert > Table: a 3 x 3 grid with a shaded header row; click each cell and type Service / Price / Time, Logo design / £450 / 1 week, Website / £1,200 / 4 weeks. |
| 35 | Insert a chart | 30.5 s | Insert > Chart: the submenu (Bar chart, Line chart, Pie chart, each hovered); click Bar chart: "Website visits by month" (Jan to Jun: 1,200, 1,800, 2,400, 3,100, 3,600, 4,200) lands selected and the Chart properties panel opens on the right (title, Bar / Line / Pie switch, data table); click Line, Pie, Bar: the same chart changes type. |

**New code** (`components/slides/` unless noted; Snaarp Doc, the player shell and steps 1-19 are not changed except where stated):
- `slide-elements.ts` (the element model: text, shape, image, line, table, chart; all sizes in cqw so the canvas and the thumbnails share them; pure functions for ids, copies, find and replace, snapping), `slide-elements-data.ts` (the deck `EIV_DECK`, where each insert lands `INSERTS`, the table and chart samples, panel copy, `SOON`), `sample-images.ts` (three SVG data-URI illustrations), `SlideElements.tsx` (draws elements, selection frames, text editing, find marks, guides and the invisible `slide-marker` the cursor can glide to), `ChartGraphic.tsx` (bar, line and pie as SVG). `SlideData` gained optional `elements` and the kind "elements"; `SlideView` draws them (and only the big canvas gets `data-tl` hooks, thumbnails and full screen do not).
- `slides-menus-data.ts` + `SlidesDropdown.tsx` (the Edit, View and Insert dropdowns: labels, dividers, shortcut hints, arrows, ticks, greyed rows; `SlidesEditor` hangs each under its menu label through the new `dropdowns` prop). Hooks: `<menu>-menu`, `<menu>-group-<n>`, `<menu>-item-<id>`, `<menu>-sub-<id>`, `<menu>-tip-<id>`.
- `slides-edit.ts` (what the menus do, on scene variables: history with `commit` / `undo` / `redo`, select all, copy, cut, paste, duplicate, delete, the inserts, text and cell editing, find and replace, and the cursor-driven `sweepTo`, `dragElementBy`, `drawTextBox`, `resizeElementBy`) and `menu-timeline.ts` (`openMenu`, `closeMenu`, `hoverRow`, `hoverSubRow`, `chooseRow`, `chooseSubRow` with the action table, `pressFullScreenArrow`).
- `SpeakerNotes.tsx`, `SlidesFindPanel.tsx` (the Snaarp Doc card adapted: copy from `FIND_PANEL`), `SlidesFullScreen.tsx` (same look and variables as Snaarp Doc's full screen; `pressEscFromFullScreen` is reused), `dialogs-insert.tsx` (`InsertImageDialog`, `ChartPanel`).
- `SlidesEditor.tsx` gained optional props (`dropdowns`, `activeTool`, `zoomLabel`, `zoom`, `rulers`, `rulerMark`, `view`, `notesPanel`, `notesText`, `panelWidth`, `scroll`) and the `Rulers`; the canvas is now a scrolling box (`no-scrollbar`) so a zoomed-in page scrolls.
- `scenes/snaarp-slides/EivStage.tsx` (the one scene component every step uses), `eiv.ts` (`beginEiv`, `clickBlank`) and `step20/` ... `step35/` (`Step<N>.tsx`, `script.ts`, `data.ts`).
- `lib/timeline.ts`: `moveCursorTo` got an optional `onMove(clientX, clientY)` callback so a script can drag something along with the cursor (additive; nothing else changed).

Hooks used by the scripts: `el-<id>` (an element on the big canvas), `frame-<id>`, `handle-<id>-<nw|n|ne|e|se|s|sw|w>`, `cell-<table id>-<row>-<col>`, `slide-guides`, `slide-marker`, `ruler-top`, `ruler-left`, `notes-panel`, `notes-field`, `notes-clear`, `slides-find-panel`, `find-input`, `replace-input`, `find-match-case`, `find-btn-<replace|replace-all|previous|next>`, `find-close`, `find-result`, `slides-fullscreen`, `fullscreen-slide`, `fullscreen-hint`, `fullscreen-key`, `fullscreen-arrow`, `insert-image-dialog`, `img-pick-<id>`, `img-insert`, `img-cancel`, `chart-panel`, `chart-type-<bar|line|pie>`, `chart-title-field`, `chart-data-row-<n>`. Ids of inserted elements are `shape-1`, `line-1`, `table-1`, `chart-1`, `image-1`, `text-1`; a pasted or duplicated copy is `<kind>c-1`.

How a step works: the scripts only move the cursor, ring, click and call the helpers; the helpers do what the click would do to the scene variables (the same pattern as the File menu). The one rule to remember: elements on thumbnails have no `data-tl`, so a selector such as `[data-tl=el-s2-shape]` always finds the big canvas.


# Snaarp Slides steps 36-56: Format, Slide, Arrange and Tools menus, the toolbar and the header buttons

Config: `tutorials/snaarp-slides.ts` (steps 36-56 follow the 35 earlier steps; rail groups "Format" from step 36, "Slide" from 40, "Arrange" from 44, "Tools" from 48, "Toolbar" from 51 and "Header" from 54). **All 21 steps are built, and with them Snaarp Slides is complete (56 steps).** The completion card follows step 56, the last step in the config (its text now reads "You know your way around Snaarp Slides: all of its menus, the toolbar and the header buttons."). Recording: `ref/slides/Snaarp_Slides_final.mp4` (a copy of the owner's `Downloads\1027.mp4`; 1008x480, 133 s; git-ignored; frames and contact sheets in `ref/slides/frames-final/`, `sheetsF/`, `zf/`): Format 0-12 s, Slide 12-40 s, Arrange 40-58 s, Tools 56-66 s, toolbar dropdowns 62-95 s, header 96-133 s. Every step starts in the editor on slide 2 of "Acme Studio Pitch 2026" (same `EivStage`) unless its row says otherwise, so each plays alone from the rail and replays cleanly.

| Step | Title | Time | What happens |
|---|---|---|---|
| 36 | Format your text | 33 s | Format opens with nothing selected: Bold, Italic, Underline and Strikethrough are greyed (each hovered); click the title; Format > Bold, Italic, Underline, Strikethrough, each visibly applied (a tick shows in front of the row while it is on); Bold again turns it off. The title starts in regular weight (a title is bold by default, so Bold would not show). |
| 37 | Align and indent your text | 40 s | Click the bullet list; Format > Align and indent (Left, Center, Right, Justify, Increase indent, Decrease indent, each hovered); Center, Right, Left; Increase indent twice, Decrease once; Format > Line spacing (Single, 1.15, 1.5, Double hovered), 1.5 applied. |
| 38 | Change the theme | 38 s | Format > Theme opens the Theme list under the toolbar's Theme button; Simple Dark applies to every slide; then the toolbar Theme button: Modern Dark, Forest Green, Purple Dream, Ocean Blue (the step ends on Ocean Blue). |
| 39 | Change the slide background | 30 s | Format > Slide background opens the eight swatches under the toolbar's Background button; dark navy applies to slide 2 only (the text turns white, thumbnails 1 and 3 stay white); the toolbar Background button: all eight hovered, purple applied. |
| 40 | Add a new slide | 25 s | Slide menu opened and its rows hovered (Change layout and Transition show "Coming soon"); Slide > New slide: an empty title slide (grey placeholders) appears after slide 2, selected, with a toast. |
| 41 | Duplicate a slide | 22 s | Slide > Duplicate slide: an exact copy appears after slide 2, selected, toast; click thumbnail 2 to show the original is untouched. |
| 42 | Skip a slide | 40 s | Slide > Skip slide: thumbnail 2 dims and shows a "Skipped" badge; the menu row now reads "Unskip slide"; click slide 1, View > Full screen, right arrow: the show jumps from slide 1 to slide 3; Esc; click slide 2, Slide > Unskip slide. |
| 43 | Delete a slide | 26 s | Slide > Delete slide: slide 2 goes, toast "Slide deleted" with an **Undo** button; click Undo in the toast: the slide comes back, toast "Slide restored". |
| 44 | Change the stacking order | 42 s | Slide 2 with three overlapping squares (orange, green, purple, back to front): orange > Bring to front, orange > Send backward, green > Bring forward, purple > Send to back (the Arrange rows hovered first). |
| 45 | Align objects | 46 s | A centred title and one blue circle: select it; Arrange > Align horizontally (Left, Center, Right hovered, then applied one by one); Arrange > Align vertically (Top, Middle, Bottom, applied). One selected object aligns to the slide. |
| 46 | Distribute objects | 36 s | Three unevenly spaced squares: with one selected Distribute is greyed (hovered); Shift-click the other two; Arrange > Distribute horizontally, then vertically: the middle square moves so the gaps are equal. |
| 47 | Rotate objects | 36 s | One blue arrow: Arrange > Rotate clockwise twice (down, left), Rotate counterclockwise three times (down, right, up); each turn is 90 degrees. |
| 48 | Check your spelling | 30 s | Slide 2's title reads "Our serivces": Tools > Spelling underlines the word in red and offers "services" and "Ignore"; click "services" (toast "Spelling fixed"); run Spelling again: toast "No spelling mistakes found". |
| 49 | Explore ideas | 42 s | Tools > Explore opens a panel on the right; type "brand identity"; suggestions show (Layout ideas, Images, Related topics); click the studio desk (lands on the slide), "Logo design" (becomes a text box) and the "Key number" layout idea (adds a bold line). |
| 50 | Set your preferences | 38 s | Tools > Preferences opens a dialog: Automatic spelling check on, Show ruler on open on, Default theme list (Ocean Blue chosen), Save: toast "Preferences saved", the ruler appears and the misspelt title is underlined. |
| 51 | Meet the toolbar tools | 68 s | Text tool (draw a box, type "Hello team"), Undo, Redo, Paint format (click the blue box, Paint format, click the grey box: it turns blue), Zoom (75%, then 100%), Select, Image (picker, desk, Insert), Shape (list, Star), Line, Print (the print panel opens, Cancel). |
| 52 | Pick a layout | 34 s | Starts on a new, empty slide 4. Toolbar Layout: the six rows hovered; Title and content, Two content, Section header each replace the placeholders. |
| 53 | Add a slide transition | 40 s | Toolbar Transition: the seven rows hovered ("None" is blue at first); Fade, Slide from right, Flip, Cube, Dissolve each chosen, and a 0.7 s preview plays from slide 2 to slide 3 with the transition's name on a pill. |
| 54 | Present your slides | 64 s | Slideshow arrow: Presenter view, Start from beginning (Ctrl+Shift+F5), Present using Chromecast (greyed, tooltip), Presentation display options (each hovered); Presenter view opens (slide, next slide, speaker notes, timer, arrows, End); Start from beginning plays full screen from slide 1 (arrow, Esc); Presentation display options (Screen 2, laser pointer, Done). |
| 55 | Join or start a meeting | 42 s | Hover the video icon (tooltip "Join or start a meeting"); click it: Snaarp Meeting (NEW), Start a new meeting (toast "Meeting ready (sample)"), Use a meeting code (dialog "Have a meeting code?": type abc-defg-hij, Continue, toast). |
| 56 | Share and set permissions | 38 s | The last step. Share button: add alex@acme-studio.com (Editor); General access Restricted > Anyone with the link; role Viewer > Commenter > Editor; Copy link (toast); Done: the header's people pill turns green and reads 2. The completion card follows. |

**Same stage** (`SlidesApp`), new scene variables, all off by default so steps 1-35 are unchanged: `theme` (a theme id), `toolMenu` (background | layout | theme | transition | zoom | shape | slideshow | meet: the open toolbar or header card), `tool` (also "paint"), `paintLook`, `insertAt` ({ image?, shape?, line? }: where the next insert lands), `tpreview` (the transition preview), `spell` (the marked word), `explore` + `exploreDone` + `field:explore`, `pref:spell`, `pref:ruler`, `prefTheme`, `prefMenu`, `displayMonitor`, `laser`, `field:meetcode`, `presenter` + `presenterSlide` + `presenterSeconds`, `headerTip` (meet | cast), `collab` (the people pill's count) and `collabOn` (its green look), plus `dialog` = preferences | displayOptions | meetCode. `menuOpen` now also takes format | slide | arrange | tools. A slide (`SlideData`) gained `bg`, `skipped` and `transition`; a text element gained `fmt`, `align` (left | center | right | justify), `indent`, `spacing` and `placeholder`; any element gained `rotate`.

**New code** (`components/slides/` unless noted):
- `slides-menus-data.ts` now holds the Format, Slide, Arrange and Tools menus (rows, groups, shortcuts, greyed flags, the submenus `align`, `spacing`, `alignh`, `alignv`; a row can have `needs: "three"` and an `altLabel`; a submenu row can have a `divider`); `SlidesDropdown.tsx` draws them. Hooks as before: `<menu>-item-<id>`, `<menu>-sub-<id>`, `<menu>-tip-<id>`.
- `slides-format.ts` (what the menus do: `toggleFormat`, `setAlign`, `changeIndent`, `setSpacing`, `applyTheme`, `setSlideBg`, `newSlide`, `duplicateSlide`, `deleteSlide`, `undoDelete`, `toggleSkip`, `playableSlides`, `applyLayout`, `setTransition`, `restack`, `alignSel`, `distribute`, `rotateSel`, `startPaint`, `applyPaint`, `pickAt`, `shiftSelect`), `slides-tools.ts` (`startSpelling`, `fixSpelling`, `openExplore`, the Explore inserts, `openPreferences`, `savePreferences`), `menu-timeline.ts` (the new actions in its table), `toolbar-timeline.ts` (`openToolbar`, `hoverOption`, `chooseOption`, `clickTool`, `playTransition`), `header-timeline.ts` (`openHeader`, `hoverHeaderRow`, `chooseHeaderRow`, `pointAtMeet`, `startPresenter`, `startFromBeginning`...).
- Copy and sample data: `slides-toolbar-data.ts` (the six themes, the eight background swatches, layouts, transitions, zoom list, slide toasts), `slides-tools-data.ts` (Spelling, Explore, Preferences, meeting, Slideshow, presenter and display options), `slide-elements-data.ts` (the start decks `FORMAT_DECK`, `STACK_DECK`, `ALIGN_DECK`, `DISTRIBUTE_DECK`, `ROTATE_DECK`, `SPELL_DECK`, `PAINT_DECK`, `LAYOUT_DECK`).
- Components: `slides-theme.tsx` (`ThemeContext`: every `SlideView` reads the deck theme, so thumbnails, canvas and full screen agree), `ToolbarCards.tsx` (the Theme, Background, Layout, Transition, zoom and shape cards, hung under their buttons with the Snaarp Doc `Anchored`), `HeaderCards.tsx` (the Slideshow and meeting dropdowns and the meeting tooltip), `PresenterView.tsx`, `TransitionPreview.tsx`, `dialogs-tools.tsx` (`ExplorePanel`, `PreferencesDialog`, `DisplayOptionsDialog`, `MeetingCodeDialog`).
- `SlidesEditor.tsx`: the toolbar's four dropdown buttons have hooks (`tb-background`, `tb-layout`, `tb-theme`, `tb-transition`), the header has `header-meet`, `slideshow-start`, `slideshow-arrow`, `header-collab`, thumbnails are clickable (`onSelectSlide`) and show a "Skipped" badge, and there are three new slots: `toolLayer`, `canvasOverlay` and the `collaborators` / `collabOn` settings. **On narrow screens the header now keeps the meeting icon, Slideshow and the people pill** (they were hidden), so steps 54-56 work at 390x844.
- `SlideElements.tsx` draws the formatting, rotation, placeholders, theme colours (CSS variables `--sl-fg`, `--sl-muted`, `--sl-accent`; the deck's blue is the accent) and the spelling underline with its card. `SlideView.tsx` paints the theme or the slide's own background.
- Outside `components/slides/`: `components/docs/DocToast.tsx` and `doc-toast-timeline.ts` got an optional `action` (the toast's "Undo" button, hook `toast-action`; Snaarp Doc is unchanged), `app/globals.css` got `.tl-hl.absolute { position: absolute }` (a highlight ring on an absolutely positioned element no longer turns it into a relative one; see below), `scenes/snaarp-slides/eiv.ts` (`beginEiv` takes an optional start deck) and `step36/` ... `step56/`.

Hooks used by the scripts: `el-<id>`, `thumb-<n>`, `thumb-skip-<n>`, `tbo-<menu>-<id>` (a toolbar option: `tbo-theme-ocean-blue`, `tbo-background-navy`, `tbo-layout-two-content`, `tbo-transition-fade`, `tbo-zoom-75`, `tbo-shape-star`), `ss-presenter`, `ss-beginning`, `ss-chromecast`, `ss-options`, `mt-product`, `mt-start`, `mt-code`, `meet-tip`, `spell-word`, `spell-card`, `spell-fix`, `spell-ignore`, `explore-heading`, `explore-results`, `explore-image-<id>`, `explore-topic-<id>`, `explore-layout-<id>`, `pref-spell`, `pref-ruler`, `pref-theme`, `pref-theme-<id>`, `pref-save`, `disp-monitor-<id>`, `disp-laser`, `disp-done`, `field-meetcode`, `meet-continue`, `presenter-slide`, `presenter-notes`, `presenter-timer`, `presenter-next`, `presenter-end`, `toast-action`, `transition-preview`, `header-collab`, `editor-share`.

Gotchas: **do not ring (`tl.highlight`) an element whose Tailwind class is `absolute` unless `.tl-hl.absolute` is in `globals.css`** (it is now). Never ring `spell-card`, `presenter-view` or `explore-panel` anyway (use `explore-heading`, `right-panel` is missing on narrow screens). After a `tl.setVar` that mounts or places a card, `await tl.wait(80..120)` before moving to it (`openToolbar` and `openHeader` already do).


## Snaarp Mail admin steps 10-17 (email admin)

All use `scenes/snaarp-mail/admin/MailAdminStage.tsx`; copy, sample people and captions are in `scenes/snaarp-mail/admin/data.ts`. Recordings `ref/admin/v306.mp4`, `v211.mp4`, `v33.mp4`. Hooks: `btn-bulk-signature`, `btn-bulk-upload`, `mu-actions-<user>`, `mu-action-<id>`, `mu-move-<dept>`, `mu-row-<user>`, dialogs `bu-*`, `bs-*`, `al-*`, `sg-*`, `wz-*`, `am-*`, `fw-*`, `mb-*`, sidebar `menu-<id>`. Scene variables: `page` (users / groups / forwarding / mailbox), `mUsers`, `mDialog`, `mTarget`, `mRowMenu`, `mFile`, `sigSel`, `aliasTab`, `aliasFile`, `groups`, `gPage`, `gId`, `wizStep`, `gInbox`, `gType`, `gMenu`, `gAddSel`, `fwdSel`, `fwdSup`, `fwdMenu`, `fwdAbout`, `fwdOn`, `mbCompose`, `mbFromOpen`, `mbFrom`, `field:<id>`.

| Step | URL | Start state | Timeline |
|---|---|---|---|
| 10 Upload users in bulk (about 50 s) | admin.snaarp.com/admin/users | `users` | Bulk User Upload, Download Template (toast), scroll the format requirements, Browse Files (acme-users.csv), Upload Users, scroll to the three new rows |
| 11 Request a bulk signature (about 42 s) | same | `users` | Bulk Signature, type the signature, untick Tom and Sam (Apply to 12 Users), Apply |
| 12 Add an alias to one user (about 46 s) | same | `users` | Alex's three dots, Aliases, Add First Alias, type hello, Add Alias, Aliases (1) |
| 13 Add aliases in bulk (about 50 s) | same | `users` | Aliases, Bulk Upload tab, how-to box, Download CSV Template, Choose CSV file, Upload & Process, open Priya's Aliases |
| 14 Manage a user's signature (about 40 s) | same | `users` | Alex's three dots, Manage Signature, type, preview, Save Signature |
| 15 Create a group (about 62 s) | admin.snaarp.com/admin/groups | `users` | Groups, Create Group, name and description, Next, Primary Inbox support@, Next, Security Group, Create Group, open the group page |
| 16 Add members and use the group email (about 56 s) | groups, then mail.snaarp.com/inbox | `group-page` | Add Members, tick four, Add 4 members, Recent Members, mailbox Compose, From list, choose the group address |
| 17 Forward emails to other users (about 56 s) | admin.snaarp.com/admin/email-forwarding | `users` | Email Forwarding, About, tick Mia and Noah, supervisor list, Jane Doe, Enable Forwarding for 2 User(s), status |

## Snaarp Admin steps 5-12 (replace the old steps 5-8)

All use `scenes/snaarp-admin/UsersStage.tsx` with a start state from `admin-seed.ts`; copy and captions in `admin-data.ts`, `people-data.ts`, `steps-data.ts`. Recording `ref/admin/v179.mp4`. Hooks: `btn-bulk-user`, `btn-csv-template`, `btn-choose-file`, `btn-add-row`, `bulk-row-<id>`, `field-bulk-<row>-<field>`, `btn-bulk-create`, `filter-dept`, `dept-opt-<id>`, `filter-product`, `product-opt-<id>`, `btn-clear-filters`, `role-<user>`, `products-<user>`, `pp-remove-<product>`, `pp-add-<product>`, `pp-scroll`, `panel-menu-organization`, `org-filter-<id>`, `btn-new-department`, `field-deptname`, `newdept-color-<n>`, `btn-newdept-create`, `org-actions-<user>`, `org-move-<dept>`, `org-empty`.

| Step | Start state | Timeline |
|---|---|---|
| 5 Add many users with Bulk user (about 52 s) | `users` | Bulk user, CSV template toast, Choose file (acme-team.csv, 3 rows, 1 needs fixing), type the missing email, Add row and type a person, Create 4 users, new rows at the top (Active 42) |
| 6 Find users with filters and search (about 56 s) | `users` | search "lena", All departments (tick Engineering and HR), Clear filters, All products (Snaarp Books), Clear filters, Role dropdown |
| 7 Add a product to a user (about 40 s) | `users` | search "priya", Products dropdown (6 products), scroll to ADD PRODUCT, plus next to Snaarp Books (7 products) |
| 8 Remove a product from a user (about 36 s) | `users` | search "alex", Products dropdown, minus next to Snaarp Books (5 products) |
| 9 See your departments (about 36 s) | `users` | Organization menu, Filter list, Engineering, HR, Human Resources, Sales (empty), All members |
| 10 Create a new department (about 36 s) | `org` | New Department, name Design, description, colour, Create, Design in the list with 0 members |
| 11 Add a member to the department (about 38 s) | `org-design` | All members, Ada Okoye three dots, Move to department, Design, open Design (1 member) |
| 12 Filter users by department (about 32 s) | `users-design` | All departments, tick Design, two members listed, Clear filters |

## Snaarp Sheets steps 1-19 (File menu round)

Route `/tutorials/snaarp-sheets`, config `tutorials/snaarp-sheets.ts` (rail group "File menu" from step 1; later rounds append Edit, View, Insert, Format, Data, Tools... as new steps and groups). Recording: `ref/sheets/Snaarp_Sheets_file.mp4` (copy of `Downloads/1028.mp4`; 1452x720, 3:33; git-ignored; contact sheets in `ref/sheets/s1/`, full-size frames in `ref/sheets/f/`). The recording starts on the Sheets home (about 0:00-0:18, not built in this round) and never shows New, Make available offline, Name current version or Move to trash being used; those steps follow the owner's brief.

All 19 steps use ONE stage, `components/sheets/SheetsApp.tsx` (the editor, the File menu, every dialog, the Version history page and the toast, all driven by scene variables). Each step is `scenes/snaarp-sheets/step<N>/Step<N>.tsx` (a one-line scene that picks the start workbook), `script.ts` and `data.ts` (captions, URLs). Steps 11 and 12 share `scenes/snaarp-sheets/locate.ts`. Start workbooks (`components/sheets/sheets-sample.ts`): **blank** = "Untitled spreadsheet" with an empty grid (steps 1, 3); **budget** = "Budget draft" with the sample budget (steps 2, 4-10); **named** = "Acme Studio – Q3 Budget" with the same data (steps 11-19). Every step also works alone from the rail.

Sample data (all in `components/sheets/sheets-data.ts`, none from the recording): budget Item | Owner | Cost | Status (Design tools / Priya Shah / £120 / Paid; Cloud hosting / Alex Morgan / £340 / Pending; Stock photos / Jordan Lee / £85 / Paid; Team lunch / Sam Taylor / £210 / Pending); owner Alex Morgan; `acme-contacts.csv` (name, email, phone with +44 7700 900123 style numbers); emails on example.com; dates DD/MM/YYYY; times 24-hour.

| Step | URL | Start | Timeline |
|---|---|---|---|
| 1 Meet the File menu (about 23 s) | sheets.snaarp.com/sheet/untitled | blank | File, ring the whole menu, then one beat per group (New/Open/Import, Make a copy, Share/Email/Download, Rename/Move/Shortcut/Trash, Version history/Offline, Details/Settings, Print) |
| 2 Start a new spreadsheet (about 11 s) | .../budget-draft | budget | File, hover New, click New, quick white fade to a blank "Untitled spreadsheet" |
| 3 Open a file (about 24 s) | .../untitled | blank | File > Open, Recent (spinner, then files), Starred (empty state "No starred files in your drive."), Upload (drop zone), back to Recent, click "Acme Studio – Q3 Budget", fade, green pill "Opened ..." |
| 4 Import a file (about 21 s) | .../budget-draft | budget | File > Import, My Drive list, Upload, click browse, in-app chooser (no OS window), choose acme-contacts.csv, Next |
| 5 Choose where to import (about 17 s) | .../budget-draft | budget + Import location open | hover the four options, click Insert new sheet(s), Import, new tab "acme-contacts" and the green pill "Imported ..." |
| 6 Make a copy (about 16 s) | .../budget-draft | budget | File > Make a copy, name "Copy of Budget draft", folder My Drive, tick Share it with the same people and Copy comments, Make a copy, toast |
| 7 Share your spreadsheet (about 27 s) | .../budget-draft | budget | File > Share, type priya.shah@example.com, click the suggestion, People with access row, Restricted > Anyone with the link, Copy link (toast), gear (Settings for ...), back, Done |
| 8 Email the file (about 25 s) | .../budget-draft | budget | File > Email, To design@example.com, tick Send yourself a copy, Subject = title, type a message, File type list (PDF, Microsoft Excel (.xlsx), CSV (.csv), HTML (.html)), choose Excel, Send, toast |
| 9 Download a copy (about 23 s) | .../budget-draft | budget | File, hover Download, hover each of the six formats with a caption, click Microsoft Excel (.xlsx), "Downloading ..." toast then "downloaded" (no real file) |
| 10 Rename your spreadsheet (about 15 s) | .../budget-draft, then .../acme-studio-q3-budget | budget | File > Rename, name selected, type "Acme Studio – Q3 Budget", Rename (purple button, as in the recording), the title bar updates |
| 11 Move it to a folder (about 21 s) | .../acme-studio-q3-budget | named | File > Move, Suggested, Starred, All locations, hover the four places, My Drive, Move, toast |
| 12 Add a shortcut to Drive (about 21 s) | same | named | same picker as step 11, button "Add shortcut" |
| 13 Move it to the trash (about 12 s) | same | named | File > Move to trash, "In trash" pill and toast "Moved to trash" with Undo, click Undo (the file comes back so the tutorial can carry on) |
| 14 Name this version (about 14 s) | same | named | File > Version history > Name current version, type "Final budget", Save, toast |
| 15 See the version history (about 19 s) | .../acme-studio-q3-budget/history | named, version named | File > Version history > See version history, full page (sheet on the left, list on the right), click the earlier version, tick Show changes (two cells turn yellow), back arrow |
| 16 Make it available offline (about 13 s) | same | named | File > Make available offline, toast "Available offline", the cloud beside the title turns green, reopen File to show the tick |
| 17 See the file details (about 18 s) | same | named | File > Details, the FILE DETAILS column slides in, hover rows, click Add a description and type, close |
| 18 Settings (about 9 s) | same | named | File, hover the greyed Settings, caption "Not available in this view" (caption-only step, no dialog; kept as its own step) |
| 19 Print your spreadsheet (about 17 s) | same | named | File > Print, in-app print preview, Layout Portrait > Landscape (the paper turns), Print, toast; the last step, the completion card follows |

Scene variables, hooks and helpers: the header comment of `components/sheets/SheetsApp.tsx`; helpers in `components/sheets/sheets-timeline.ts` (see `docs/TIMELINE-API.md`). Hooks: `editor-menu-<id>`, `file-menu`, `file-group-<n>`, `file-item-<id>`, `file-sub-<id>`, `open-` / `import-` + `dialog | tab-<id> | recent-<n> | drive-<n> | zone | browse | chooser | local-<n> | primary`, `import-option-<id>`, `import-go`, `copy-*`, `share-*`, `email-*`, `rename-*`, `move-*` / `shortcut-*`, `version-*`, `versions-*`, `details-*`, `print-*`, `sheet-tab-<id>`, `sheet-notice`, `toast-action`.

## Player behaviour (all tutorials)
The scene is view-only. `components/player/CanvasOverlay.tsx` (copy and limits in `canvas-overlay-data.ts`) is a transparent layer over the scene inside the browser frame (z-45, below the completion card): clicks, wheel, touch swipes, scroll keys, context menu and middle-click never reach the scene, and the scaled scene div is `inert` (no focus, no Tab). Scripted scrolling is unaffected. One click or tap (pointer events, drag over 8 px ignored, 150 ms debounce) or Enter on the focused overlay toggles the same `paused` state as Space, so both stay in sync. Pause freezes the timeline, cursor, captions and Web Animations (existing `Timeline.setPaused`), plus CSS animations through `data-paused` on the player root (rule in `app/globals.css`). The indicator (round pause icon + "Paused. Click to play") replaces the old top-left pill; a play icon flashes for 400 ms on resume (hidden with prefers-reduced-motion). The overlay does nothing once the completion card shows. Changing step, replay or opening another tutorial resets to playing. No scene, timing or content changed.

## Saved progress and stable step ids
Completed steps are saved in the browser. `lib/progress.ts` keeps one localStorage key, `snaarp-tutorials:progress:v1`, shaped `{ [tutorialSlug]: { completed: [stepId], updatedAt } }` (only slugs, step ids and timestamps). A step is saved the moment it plays to its end (the same moment the check appears; `progressStore.complete` is called from `TutorialPlayer.handleDone` and writes synchronously). `lib/useProgress.ts` (`useSyncExternalStore`) feeds the rail checks, every product's "n/total" counter (also in the product dropdown) and `TutorialPlayer`; counters are `invisible` (space kept) for the first hydration frame (`ready`). On load the JSON is validated and cleaned: bad JSON or shape gives empty progress, and unknown slugs or step ids are dropped silently (a new step simply shows unchecked). Every storage call is in try/catch; if storage is blocked or full the player keeps in-memory progress. A `storage` event listener keeps two tabs in sync. Replay no longer clears the checks. A quiet "Reset progress" button (`components/player/ResetProgress.tsx`, copy in `progress-data.ts`) sits at the bottom of the rail and clears everything after a confirm popover. **Step ids are now the saved identity of a step: never rename or reuse a step `id` in `tutorials/*.ts` (titles and order may change freely); a renamed id loses its saved check.**


## Rule: every scene target must be reachable by ensureVisible

The player now scrolls targets into view by itself (`Timeline.ensureVisible`, see `CLAUDE.md`, "Auto-scroll and visibility QA"). When you add or change a step: put every element a script points at inside a scroll container (never inside an `overflow: hidden` box that cannot scroll), give dialogs and panels a max-height with a scrolling body and pinned header and footer, and give an animated row `relative z-20` while its popup menu is open so the menu is not painted under the next row. Then run `npm run qa:visibility -- --tutorial <id>`; the report must have no open findings (`docs/QA-VISIBILITY.md`). Scripts no longer need their own `scrollPanelTo` for a target that is merely out of view; keep it only for scrolling that is part of the story.

## Snaarp Sheets steps 20-36 (Edit and View menu round)

Same route and config (`tutorials/snaarp-sheets.ts`); rail groups "Edit menu" (from step 20, id `meet-edit-menu`) and "View menu" (from step 29, id `meet-view-menu`). Recording: `ref/sheets/Snaarp_Sheets_edit_view.mp4` (copy of `Downloads/1028(1).mp4`; 1456x720, 1:38; git-ignored; contact sheets in `ref/sheets/ev/`). It shows the Edit dropdown and its two submenus (0:00-0:17), then View with every submenu (0:18-1:30). Find and replace is not used in it, and neither is anything beyond hovering for Paste special and Delete; those behaviours follow the brief. The completion card follows step 36.

**Start state of every step in this round** (set by `beginEdit` in `components/sheets/edit-timeline.ts`; `EDIT_BOOK` in `components/sheets/sheets-sample.ts`): the workbook "Acme Studio – Q3 Budget" (address `SHEETS_URLS.renamed`), one tab Sheet1, A1 selected, nothing open, 100% zoom, formula bar and gridlines on, no history. The cells: row 1 Item | Owner | Cost | Status (bold on a pale blue fill), rows 2-5 the four budget items (Design tools £120 / Priya Shah / Paid, Cloud hosting £340 / Alex Morgan / Pending, Stock photos £85 / Jordan Lee / Paid, Team lunch £210 / Sam Taylor / Pending) and row 6 "Total" with a live `=SUM(C2:C5)` in C6 (£755, shown through `formatGBP`). Every step works alone from the rail; the three that depend on an earlier action fake it instantly at the start (22, 25).

| Step | Id | Start | Screens and timeline (as built) | Time |
|---|---|---|---|---|
| 20. Meet the Edit menu | `meet-edit-menu` | plain | Click Edit; ring the whole menu; one beat per group (Undo/Redo, Cut/Copy/Paste/Paste special, Delete, Find and replace) with a ring on the group and a caption. Undo and Redo are greyed (nothing to undo yet). | 19.8 s |
| 21. Undo a change | `edit-undo` | plain | Click C2, type the new cost (`EDIT_SAMPLE.typed`, a `formatGBP` value) and Enter: C2 and the total change; Edit > Undo: both come back. | 15.7 s |
| 22. Redo a change | `edit-redo` | typed then undone (instant) | Redo is lit in the menu; Edit > Redo: the typed cost returns. | 12.6 s |
| 23. Cut cells | `edit-cut` | plain | Drag A5:D5, Edit > Cut: marching ants on the row; the cells stay until pasted. | 17.0 s |
| 24. Copy cells | `edit-copy` | plain | Drag A2:B3, Edit > Copy: ants; originals stay. | 16.6 s |
| 25. Paste cells | `edit-paste` | A2:B3 copied | Click F2, Edit > Paste: the two rows appear there. | 14.5 s |
| 26. Paste special | `edit-paste-special` | plain | Copy A1:D2 (header + first item). Values only at F1 (words only, no bold or shading); formatting only at A6 (the Total row takes the header look, keeps its words); transposed at F5 (rows and columns swap). Each has a before / after caption and a ring. | 40.5 s |
| 27. Delete cells, rows and columns | `edit-delete` | plain | Values: C2:C3 emptied, total updates. The sample is put back (instant). Row: click A5, the row goes, rows below move up, the SUM shrinks to C2:C4. Put back. Column: click B2, the column goes, columns move left, the SUM follows to B2:B5. | 32.4 s |
| 28. Find and replace | `edit-find` | plain | Edit > Find and replace opens a floating card (no dimming). Type Paid, Find: 2 matches highlighted yellow (the current one orange) and "2 matches found"; type Settled, Replace all: both cells change and a toast reads "2 matches replaced"; Done closes it. | 23.5 s |
| 29. Meet the View menu | `meet-view-menu` | plain | Click View; ring the menu; beats for Show / Freeze / Group / Comments, the greyed Hidden sheets (with its tooltip) and Zoom / Full screen. | 17.5 s |
| 30. Show or hide parts of the sheet | `view-show` | plain | View > Show lists Formula bar and Gridlines ticked, Formulas not. Each is switched and switched back: the formula bar row disappears, the cell lines disappear, Formulas shows `=SUM(C2:C5)` in C6. | 40.5 s |
| 31. Freeze rows and columns | `view-freeze` | plain | 1 row (blue line under row 1; the grid is scrolled 8 rows with `animateVar` to show row 1 stays), 2 columns (blue line right of B; scrolled across 4 columns), click A3 then Up to current row (rows 1-3), then No rows and No columns. | 41.7 s |
| 32. Group rows and columns | `view-group` | plain | Drag A2:A3, Group rows: bracket and a minus button in a new left gutter; collapse (rows 2-3 hide, plus button) and expand. Drag B1:C1, Group columns: bracket and button in a band above the headers; collapse and expand. Ungroup rows, Ungroup columns (the rows appear in the Group submenu once a group exists). | 41.7 s |
| 33. Add a comment | `view-comments` | plain | View > Comments > Show comments: the panel opens (header, search icon, tabs All comments / For you, chips All types / All sheets, "Start a discussion", blue Add comment buttons). Click C3, Add comment, type "Please confirm this cost", Comment: the thread (Alex Morgan, 28/10/2026, 21:48) joins the list and C3 gets an orange corner. Close with the X. | 24.7 s |
| 34. Hidden sheets | `view-hidden-sheets` | plain | Hover the greyed row (tooltip "No hidden sheets"), one caption. No dialog. | 9.7 s |
| 35. Change the zoom | `view-zoom` | plain | Zoom lists 50% to 200% with a tick on 100%. 50%, 150%, 200%, back to 100%: the grid rescales, the toolbar zoom box follows. | 31.9 s |
| 36. Go full screen | `view-full-screen` | plain | View > Full screen: the title row collapses and an in-scene banner "sheets.snaarp.com – To exit full screen, press [Esc]" shows at the top centre; after a pause the Esc key dips and the sheet returns. The last step. | 17.4 s |

**Files.** One stage, as before (`components/sheets/SheetsApp.tsx`); new in this round:

- `components/sheets/SheetGrid.tsx`: the grid (replaces the old inline `GridView`; with no new props it draws what the File steps always drew). Selection range, marching ants, an editing cell, find highlights, comment corners, gridlines, formulas, frozen rows and columns, scrolled rows and columns, zoom (CSS `zoom`, more rows and columns are drawn when zoomed out), row and column groups.
- `components/sheets/grid-state.ts`: pure functions on the cells (`copyCells`, `pasteCells` with modes all / values / format / transposed, `clearRange`, `deleteRows`, `deleteCols`, `findCells`, `replaceAll`, `recalc` for `=SUM(range)` including shifting the range when rows or columns are deleted). `Cell` gained `fill` and `formula` (additive).
- `components/sheets/edit-view-data.ts`: ALL copy of this round: the Edit and View menus (labels, order, groups, glyphs, Windows shortcuts for captions), the submenus, the sample (`EDIT_SAMPLE`), Find and replace (`FIND`), Comments (`COMMENTS`), full screen (`FULLSCREEN`).
- `components/sheets/SheetMenu.tsx`: the Edit and View dropdowns (one component, `menu="edit" | "view"`); they hang inside their label in the menu bar through `SheetsEditor`'s new `menuSlots`.
- `components/sheets/EditViewPanels.tsx`: `CommentsPanel` (the right-hand panel, shares the File details slot) and `FindCard`.
- `components/sheets/edit-timeline.ts`: the helpers (see `docs/TIMELINE-API.md`).
- Per step: `scenes/snaarp-sheets/step<N>/Step<N>.tsx`, `script.ts`, `data.ts` (captions, URLs, which cells).

**Scene variables** (all off by default): `sel` (range), `clip` (`{ range, cells, cut }`), `cellEdit` + `field:cell`, `history` (`{ past, future }`), `emenu` (open dropdown, edit | view) and `esub` (open submenu), `vFormulaBar`, `vGridlines`, `vFormulas`, `frozenRows`, `frozenCols`, `gridScrollRow`, `gridScrollCol`, `groups` (`{ rows, cols }`, each `{ from, to, collapsed }`), `zoomPct`, `commentsOpen`, `comments`, `commentUi` (compose), `commented` (cell refs), `findOpen`, `findHits`, `findNow`, `findCase`, `findEntire`, `sheetFull`, `fsBanner`, `fsPressed`, plus the typed fields `field:find`, `field:replace`, `field:comment` and `focus`.

**Hooks.** `cell-<ref>` on every cell (`cell-b3`), `menu-edit` / `menu-view` (the cards), `menu-<edit|view>-group-<n>`, `menu-item-<id>`, `menu-sub-<id>` (ids in `edit-view-data.ts`: `undo`, `paste-values`, `delete-row`, `show-bar`, `freeze-r1`, `group-rows`, `ungroup-rows`, `comments-show`, `zoom-150`...), `formula-bar`, `tool-zoom`, `group-toggle-rows`, `group-toggle-cols`, `comments-panel`, `comments-add`, `comments-add-bottom`, `comments-close`, `field-comment`, `comment-post`, `comment-cancel`, `comment-t1`, `find-card`, `field-find`, `field-replace`, `find-count`, `find-case`, `find-entire`, `find-btn`, `find-replace`, `find-replace-all`, `find-done`, `find-close`, `fs-banner`, `fs-esc`.

## Snaarp Sheets steps 37-55 (Insert menu round)

Same route and config (`tutorials/snaarp-sheets.ts`); rail group "Insert menu" (from step 37, id `insert-overview`). Recording: `ref/sheets/Snaarp_Sheets_insert.mp4` (copy of `Downloads/1028(2).mp4`; 1456x720, 6:22; git-ignored; contact sheets in `ref/sheets/ins/`, zooms in `ref/sheets/ins/z/`). Pivot table and Drawing show "Pivot tables are not yet supported in this version" in the product, so they appear in step 37 only. The completion card follows step 55.

**Start state of every step** (set by `beginInsert` in `components/sheets/insert-timeline.ts`): the "Acme Studio – Q3 Budget" sample from `INSERT_BOOK` (`sheets-sample.ts`): header row Item | Owner | Cost | Status | Jul | Aug | Sep (bold, pale fill), four items, a Total row with a live `=SUM(C2:C5)`, a second tab "Forecast", A1 selected, nothing open, 100% zoom, formula bar and gridlines on. Extra start state: steps 43 and 44 begin with a line chart already inserted and the Chart editor open (43 on Setup, 44 on Customize with every section closed); steps 49, 52 and 53 add a header in column H first (`addHeader`); steps 52 and 53 widen column H to 190 px (`widenColumn`). Every step works alone from the rail.

| # | Step | id | What happens | Length |
|---|---|---|---|---|
| 37 | Meet the Insert menu | `insert-overview` | Click Insert, ring the whole menu, then one beat per group (structure, objects, formulas and links, interactive cells, annotations) and the Pivot table / Drawing note. | 17.0 s |
| 38 | Insert cells | `insert-cells` | Select B3:B4, Insert > Cells > Insert cells and shift down (owners below move down two rows). The sheet is put back; select D3:D4, shift right (Status and the months move right). | 18.3 s |
| 39 | Insert rows | `insert-rows` | Click row header 3, Insert > Rows > Row above (blank row, numbers shift, the Total formula follows). Click row header 5, Row below. | 17.0 s |
| 40 | Insert columns | `insert-columns` | Click column header C, Insert > Columns > Column left (letters move along). Click column E, Column right. | 17.0 s |
| 41 | Add a sheet | `insert-sheet` | Insert > Sheet: tab "Sheet 3" appears and becomes active (empty grid), then click Sheet1. | 9.3 s |
| 42 | Chart: choose a type | `insert-chart-setup` | Drag A1:G5, Insert > Chart: dashed chart over the cells, Chart editor opens on Setup. Chart type: Line, Pie, Area, Scatter, Line again (each a real click, the chart redraws). Stacking: Standard. Rings on Data range and X-axis. Untick and tick Aug; drag Sep above Jul. | 40.9 s |
| 43 | Chart: style and titles | `insert-chart-style` | Starts with a line chart and the editor on Setup. Customize tab: Chart style (background, font, palette 3, Maximize on/off), Chart & axis titles (title kind select, type "Q3 spend by item", font, size, bold, colour; Vertical axis title typed too). | 38.8 s |
| 44 | Chart: series, legend and axes | `insert-chart-series` | Starts with a line chart and the editor on Customize (all sections closed). Series (pick Aug, colour, thickness, right axis, Data labels, Trendline), Legend (Bottom), Horizontal / Vertical axis (opened), Gridlines and ticks (Minor gridlines). Insert places the chart; click the chart (selected, handles); the editor re-opens with "Update"; Update closes it. | 40.3 s |
| 45 | Insert an image in a cell | `insert-image-cell` | Click E8, Insert > Image > Insert image in cell. Dialog: click the drop area, pick studio-desk.svg in the in-app chooser, preview, alt text, By URL tab shown and left, Insert. The picture fills E8 (row grows to 64 px), formula bar shows =IMAGE(...), toast "Image inserted in cell". | 23.8 s |
| 46 | Insert an image over cells | `insert-image-over` | Insert > Image > Insert image over cells: same dialog (acme-skyline.svg), picture floats over A9 (300 x 200), selected with eight handles; the bottom-right handle is dragged to 360 x 240. Toast "Image inserted over cells". | 17.0 s |
| 47 | Insert a function | `insert-function` | Drag C2:C5. SUM, AVERAGE, COUNT, MAX, MIN, IF in turn from Insert > Function: the formula is typed into I2..I7 (label in H), the cells it reads get an orange outline, the formula bar shows the formula. More functions... opens the in-app list; "med" finds MEDIAN, click it: I8. | 44.8 s |
| 48 | Insert a link | `insert-link` | Click A2, Insert > Link (Ctrl+K): popover (cell text, search box, sheets list, footer). Click "Forecast": A2 becomes a blue link, chip with copy / edit / remove under it, toast "Link inserted". Then A3: type https://example.com, Apply. | 26.6 s |
| 49 | Insert a checkbox | `insert-checkbox` | New "Approved" header in H1. Drag H2:H5, Insert > Checkbox; tick H2, tick H4, untick H2. | 13.9 s |
| 50 | Insert a dropdown | `insert-dropdown` | Drag D2:D5, Insert > Dropdown: Data validation rules panel. Rename Option 1 / 2 to Paid / Pending, pick colours, Add another item (Overdue), Done: the Status cells become coloured chips, toast "Dropdown rule applied". Click D3: its list opens, pick Overdue. | 35.1 s |
| 51 | Insert an emoji | `insert-emoji` | Click D2, Insert > Emoji: picker (search, six tabs, grid). Type "smile", click the smiling-eyes emoji: D2 reads "Paid 😊". | 13.8 s |
| 52 | Smart chips: add a person | `insert-smart-chip-people` | New "Reviewer" header in H1; click H2, Insert > Smart chips: type list (People, Date, Place, File, Finance, Event). People: type "pri" (preview "@pri"), suggestions (Priya Shah, Manage addresses...), pick, Insert: chip in H2, toast "Person chip inserted". | 19.1 s |
| 53 | Smart chips: dates, places, files and more | `insert-smart-chips-more` | Column H is widened and headed "Smart chips". One chip each: Date (calendar, 14/11/2026; Back once), Place (London, UK), File (Q3 budget.xlsx), Finance (ACME with a pound price), Event (Quarterly review, 14/11/2026). | 58.4 s |
| 54 | Insert a comment | `insert-comment` | Click C3, Insert > Comment (Ctrl+Alt+M): comment box beside the cell, type "Thank you", Comment. The Comments panel opens with the thread and the orange corner; Reply, "You're welcome", close the panel. | 25.2 s |
| 55 | Insert a note | `insert-note` | Click D4, Insert > Note (Shift+F2): "Insert note (D4)" dialog, type "Okay… Seen", Insert: dark corner on D4, toast "Note added". Hover D4: the note shows. View > Comments > Show comments lists it as Note. | 22.0 s |

**Files.**

- `components/sheets/insert-data.ts`: ALL copy of this round: `INSERT_MENU` and `INSERT_SUBS` (labels, order, groups, shortcut glyphs and Windows shortcuts read from the recording), the sample (`INSERT_SAMPLE`, `INSERT_BODY`, `INSERT_FORECAST_ROWS`), `STRUCTURE`, `CHART`, `IMAGE`, `FUNCTIONS`, `LINK`, `CHECKBOX`, `DROPDOWN`, `EMOJI`, `SMART_CHIPS` (+ `CHIP_TONES`), `COMMENT_INS`, `NOTE`. Money goes through `formatGBP`.
- `components/sheets/insert-timeline.ts`: helpers (see `docs/TIMELINE-API.md`). `components/sheets/edit-timeline.ts` gained the structure actions in `runAction` (`cells-down`, `cells-right`, `row-above`, `row-below`, `col-left`, `col-right`) and exports `setRows`.
- `components/sheets/chart-state.ts`, `ChartGraphic.tsx`, `ChartEditor.tsx`: the chart. `dialogs-insert.tsx`, `InsertPanels.tsx`, `SmartChipDialog.tsx`: the dialogs and panels.
- Per step: `scenes/snaarp-sheets/step<N>/Step<N>.tsx`, `script.ts`, `data.ts` (captions, URLs, which cells).
- Images: `public/sheets-sample/studio-desk.svg`, `acme-skyline.svg`, `acme-logo.svg` (bundled illustrations).

**Scene variables** (all off by default, reset by `beginInsert`): `chart` (a `ChartState`: type, stacking, series with on / order / colours / axis / labels, palette, background, font, titles style, legend, gridlines, `placed`, `selected`), `chartPanel`, `chartTab`, `chartAcc` (open Customize section), `chartDrop` (open select list), `field:ct-chart` / `ct-h` / `ct-v` (the three titles, drawn live); `dialog` also takes `insertImage`, `emoji`, `note`, `chips` and `chips-<kind>`; `imgTab`, `imgChooser`, `imgChosen`, `field:img-alt`, `field:img-url`, `imgOver` (the floating picture), `rowHeights`; `refRange`, `fnOpen`, `field:fn-search`; `linkPop`, `linkChip`, `field:link-search`; `dvPanel`, `dv` (items and colours), `field:dv-i1..i3`, `ddPop`, `ddOptions`; `emojiTab`, `field:emoji-search`; `chipValue`, `chipSuggest`, `field:chip-people` / `chip-place` / `chip-finance` / `chip-event`; `commentPop`, `field:cmt-pop`, `replyOpen`, `field:reply`, `noteTip`, `noteRef`, `field:note-text`. The Comments panel uses the existing `comments`, `commented`, `commentsOpen`.

**Hooks.** Insert menu: `menu-insert`, `menu-insert-group-<0-4>`, `menu-item-ins-<cells|rows|cols|sheet|chart|pivot|image|drawing|function|link|checkbox|dropdown|emoji|chips|comment|note>`, `menu-sub-<cells-down|cells-right|row-above|row-below|col-left|col-right|img-cell|img-over|fn-sum|fn-average|fn-count|fn-max|fn-min|fn-if|fn-more>`; grid: `cell-<ref>`, `rowhead-<n>`, `colhead-<letter>`, `floater-<id>`, `chart-obj`, `chart-svg`, `float-img`, `float-img-handle`; Chart editor: `chart-panel`, `chart-scroll`, `chart-tab-<setup|customize>`, `cs-<select>`, `cd-<select>-<option>`, `cs-series-<id>`, `cs-tick-<id>`, `cs-grip-<id>`, `cs-sec-<id>`, `cs-check-<id>`, `cs-palette-<n>`, `cs-fmt-bold`, `cs-reset`, `chart-cancel`, `chart-insert`, `chart-close`; dialogs: `image-dialog`, `img-*`, `fn-card`, `fn-row-<NAME>`, `link-pop`, `link-sheet-<id>`, `link-apply`, `link-chip`, `link-copy` / `link-edit` / `link-remove`, `dv-*`, `dd-pop`, `dd-item-<label>`, `emoji-dialog`, `emoji-<id>`, `chips-dialog`, `chip-type-<kind>`, `chip-suggest-<n>`, `chip-day-<n>`, `chip-file-<n>`, `chip-insert`, `chip-back`, `comment-pop`, `cmt-post`, `comment-reply-<id>`, `reply-post`, `note-dialog`, `note-insert`, `note-tip`.

## Snaarp Sheets steps 56-84 (Format, Data, Tools, Extensions and Help round)

Recording `ref/sheets/Snaarp_Sheets_format_data_tools_help.mp4` (copy of `Downloads/1029.mp4`; 1450x720, 3:19). All 29 steps use the one stage `SheetsApp` and start from `FDT_BOOK` (`sheets-sample.ts`): sample sheet "Acme Studio – Q3 Budget" (Item, Owner, Cost, Status, Due date, Amount, Rate, Length, Note; five rows), A1 selected, nothing open (`beginFdt` in `components/sheets/fdt-timeline.ts`). Every step opens its menu itself. Durations are measured at 1440x900, speed 1, no console errors, no scrollbars (about 796 s for the 29 steps). Steps 61-63 call `phoneScroll` so far columns show on a phone. Rail groups: Format menu (56-64), Data menu (65-73), Tools menu (74-80), Extensions menu (81), Help menu (82-84).

| Step | Title | What happens | Time |
|---|---|---|---|
| 56 | Meet the Format menu | Open Format, hover Number (list), the text styles, the four layout rows (each submenu), the three greyed rows, Clear formatting. | 24.5 s |
| 57 | Number formats | Amount F2 in Number, Scientific, Accounting, Financial, Currency, Currency rounded; Rate G2 Percent; Due date E2 Time, Date time, Date, Custom date and time (preset, Cancel); Length H2 Duration; F2 Plain text, Custom number format (Cancel), Custom currency (£#,##0.00, Apply). | 90.6 s |
| 58 | Bold, italic, underline and strikethrough | Drag A2:A4; Bold, Italic, Underline, Strikethrough from Format (captions give the shortcuts), then each off again. | 36.2 s |
| 59 | Change the font size | A2:A3: Font size 14, 24, back to 10 (rows follow the text). | 23.6 s |
| 60 | Align your cells | A2 in a tall row: Center, Right, Left, Top, Bottom, Middle. | 35.0 s |
| 61 | Wrap long text | I2: Wrapping Overflow (spills right), Wrap (row grows), Clip. | 23.8 s |
| 62 | Rotate text | H1: Tilt up, Tilt down, Stack vertically, Rotate up, None. | 32.8 s |
| 63 | Clear formatting | F2:F3: Bold, fill (toolbar button), Currency, then Clear formatting. | 23.7 s |
| 64 | Options that are not available yet | Hover Theme, Conditional formatting, Alternating colors (greyed, tip). | 14.2 s |
| 65 | Meet the Data menu | Open Data and hover every group, with the Sort and Filter views submenus. | 21.2 s |
| 66 | Sort the whole sheet | C2 selected; Sort sheet A to Z then Z to A (header stays). | 19.1 s |
| 67 | Sort part of a sheet | A2:D4; Sort range A to Z then Z to A (rows 5-6 stay). | 21.4 s |
| 68 | Sort a column A to Z | A3; Sort A to Z then Z to A by Item. | 14.2 s |
| 69 | Create a filter | Create a filter; Status list (search, Clear, Select all, untick Paid, OK); rows hide, numbers blue; Remove filter. | 30.9 s |
| 70 | Save a filter view | Create new filter view, name it Unpaid, hide Paid, Close; reopen from Filter views; Remove filter. | 40.8 s |
| 71 | Add a dropdown with Data validation | D2:D6, Data validation panel: Paid / Pending / Overdue with colours, Done, pick Paid in D4. | 44.5 s |
| 72 | Name a range | A2; Named ranges: Name range (Q3_Costs), Range end (C5), toast; Name box list. | 25.2 s |
| 73 | Protect a sheet | Protected sheets: choice 1, lock on the tab, blocked-edit message in B3, lift the protection. | 29.5 s |
| 74 | Meet the Tools menu | Open Tools and hover each group. | 15.4 s |
| 75 | Record a macro | Create new macro: name, description, record four steps, Stop, Save Macro (header pill).  | 28.4 s |
| 76 | Run and delete a macro | Manage macros starts with the macro saved: Run (header row formats), then delete (empty list), Cancel. | 24.9 s |
| 77 | Check your spelling | A7 starts as Quartrly review; Spelling panel, Change, Spell check complete, Done. | 17.6 s |
| 78 | Turn Autocomplete on and off | Autocomplete off (Pa suggests nothing) then on (grey id, Tab takes it) in D7. | 27.6 s |
| 79 | Set your notifications | Notification settings: Edit notifications on, Comment replies off, Daily, Save. | 21.5 s |
| 80 | Accessibility options | Accessibility: High contrast, Large text, Reduce motion on; Done; open again and switch off. | 38.3 s |
| 81 | Meet the Extensions menu | Extensions: Add-ons, Apps Script, Macros greyed (hover); points to Tools. | 17.1 s |
| 82 | Meet the Help menu and search the menus | A2; Help menu rows (greyed ones hovered); Search the menus, type bold, Enter applies Bold. | 22.7 s |
| 83 | See the keyboard shortcuts | Keyboard shortcuts: grouped list scrolls inside the dialog, search bold, clear, Got it. | 19.1 s |
| 84 | About Snaarp Sheets | About: logo, version, copyright, Close. Last step; the completion card follows. | 12.4 s |

**Files.** `components/sheets/fdt-data.ts` (ALL copy: the five menus, submenus, number formats, dialogs, sample), `fdt-state.ts` (pure: `formatNum`, `setNumberFormat`, `toggleFlag`, `clearFormatting`, `sortRows`, `sortRange`, filters, `autoRowHeights`, `suggestion`), `fdt-timeline.ts` (helpers; registers the menu rows in `EXTRA_ACTIONS`), `FdtDialogs.tsx` (Custom format, Name range, Range end, Protect, Create / Manage macros, Spelling, Notification settings, Accessibility, Keyboard shortcuts, About, Search the menus, the filter list and the filter-view bar). Step 71 reuses the step 50 `ValidationPanel`.

**Scene variables** (reset by `beginFdt`): `filter`, `fviews`, `fvBar`, `fpCol`, `fpValues`, `fpOff`, `nameList`, `nameOpen`, `nameLabel`, `nrStart`, `protMsg`, `macros`, `macRec`, `macShown`, `notif`, `a11y`, `acOn`, `spell`, `customKind`, `customNum`, `customPick`, `dvRange`, `dialog` (custom | nameRange | rangeEnd | protect | macroNew | macroManage | spelling | notif | a11y | shortcuts | about | palette) and the fields `field:custom-input`, `nr-name`, `nr-end`, `pr-choice`, `mac-name`, `mac-desc`, `mac-key`, `kb-q`, `pal-q`, `fp-q`.

**Hooks.** Menus `menu-<format|data|tools|extensions|help>`, rows `menu-item-<fmt-*|dat-*|tls-*|ext-*|hlp-*>`, submenu rows `menu-sub-<nf-*|fs-N|al-*|wr-*|ro-*|sortsheet-*|sortrange-*|fv-*>`; `filter-btn-<col>`, `filter-pop`, `fp-*`, `fv-bar`, `fv-name`, `fv-close`, `name-box`, `name-box-arrow`, `name-box-list`, `sheet-lock-s1`, `protect-msg`, `tool-highlight`, dialog cards `custom-dialog`, `nr-dialog`, `re-dialog`, `pr-dialog`, `mac-dialog`, `man-dialog`, `spell-dialog`, `notif-dialog`, `a11y-dialog`, `kb-dialog`, `about-dialog`, `pal-dialog`.
