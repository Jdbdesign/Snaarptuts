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

- After the last built step the shell shows an end card "Step N complete / The next steps are coming soon." with Replay. It becomes "You're all set" only when every step is built.


## Mail step 2 - Create your account

- Files: `scenes/snaarp-mail/Step2Signup.tsx`, `step2-script.ts`, `signup-data.ts` (all copy, sample values, captions and the strength rule). `durationMs` 21000. Reuses `TypedField` and `Checkbox` from `components/admin/`. It is a separate scene from the 360 sign-up page (different layout), not a variant of it.
- Recording: 0:05-0:42 (frames in `ref/mail/frames-step2`). URL pill: `login.snaarp.com/signup` (config only).
- Screen: split page. Left (54% wide): near-black panel with a faint low-poly pattern, "Snaarp" wordmark, heading "Secure business email for your organization", paragraph, three feature rows (shield, people, gear icons on white tiles), footer links. Right: white, centred card "Sign up for Snaarp" with the SELECTED PLAN box (Growth, NGN 44,585.17/month, 100 GB, Billed monthly, 14-day free trial included in green), First/Last name, Email, Organization name, Country (Nigeria, NG flag), +234 and Phone number, Password with eye icon, strength bar and "Password strength: None/Weak/Good/Strong", terms checkbox, dark "Create Account" button, "Already have an account? Log In". Only the right panel scrolls.
- Sample data: Jane Doe, jane.doe@example.com, Acme Studio, Nigeria +234, 8012345678, password `Wd7#kQ2mPz9a` (shown as dots only).
- Strength rule (`passwordStrength` in `signup-data.ts`): Weak under 6 characters (red, 1/3), Good from 6 (yellow, 2/3), Strong from 10 characters with upper, lower, number and symbol (green, full).
- Timeline:

| Time | What happens |
|---|---|
| 0.0 | Page fades in. Growth already selected. |
| 1.0 | Caption "Your plan is already selected: Growth, NGN 44,585.17/month". Ring on the plan box until 2.8. |
| 3.0 | Caption "Enter your name". Types Jane, Doe. |
| 5.2 | Caption "Use an email address you can access". Types the email. |
| 7.0 | Types the organization name (caption stays). |
| 8.4 | Caption "Check your country and phone code". Rings on Country and +234, then types the phone number. |
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
- Sample data: Acme Studio, Technology, 1-10 employees, https://acme-studio.com, +234 801 234 5678, 12 Marina Road, Lagos, Nigeria.
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

Config: `tutorials/snaarp-doc.ts` (9 steps listed, PROVISIONAL: more steps will be added from later recordings; steps 1 to 8 are built, step 9 shows "Coming soon"). Recording: `ref/docs/Snaarp_Doc_flow.mp4` (1010x480, 2:15, git-ignored; frames of the first 16 s in `ref/docs/frames-step1/`). Completion text: "You're all set" / "You now know the basics of Snaarp Doc." (only shown once every step is built; until then the card reads "Step N complete").

Shared shell: **`components/docs/DocsLayout.tsx`** (app rail, sidebar, top bar, content area; copy and sample values in `components/docs/docs-data.ts`). Pass `active` ("documents" | "starred" | "trash" | null) and the screen as children; the layout itself never changes between screens. Under 900px wide the app rail and sidebar become icon-only columns and the whole layout is enlarged (CSS zoom 2.4). `components/docs/PageThumb.tsx` draws the generic page thumbnails (no screenshots).

## Doc step 1 - Explore Snaarp Doc

- Files: `scenes/snaarp-doc/Step1Explore.tsx`, `step1-script.ts`, `step1-data.ts` (all copy, sample documents, templates, captions, URLs), screens in `scenes/snaarp-doc/step1/` (`HomeScreen`, `GalleryScreen`, `TrashScreen`). `durationMs` 15400. URL pill: `docs.snaarp.com/documents` (placeholder), `/templates` (placeholder) and `docs.snaarp.com/trash` (seen in the recording).
- Screens (scene variable `screen` a/b/c; the content area fades white for 0.15 s while it swaps, the rail, sidebar and top bar stay put): A Documents home ("Start a new document" panel with 7 cards, "Recent documents" list with 4 rows); B "Create with templates" (back arrow, search, Upload template, 7 filter chips, grid of 7 columns); C Trash (one deleted "Untitled Document" with Restore and Delete).
- Sample data: Jane Doe, jane@acme-studio.com, avatar "JD"; documents Product Roadmap, Untitled Document, Project Proposal, Untitled Document (dates 10/16/2026, 10/16/2026, 10/10/2026, 09/20/2026).
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
