# Decisions and deviations

Where the tutorial intentionally differs from the source recording (`Sign_up_for_snaarp_360.mp4`) or from the live Snaarp pages, and why. If you change any of these, update this file.

## Sample data only (no real personal data)

Rule: no real emails, passwords, names or domains anywhere in the app. All data below is made up.

| Value | Where |
|---|---|
| Owner: Jane Doe, initials JD, `jane@acme-studio.com` | Steps 2, 3 (sign-in), 4 and 5 (`SAMPLE` in `step2-script.ts` and `step3-script.ts`, `OWNER` in `step5/step5-data.ts`) |
| Organization: Acme Studio | Step 2 |
| Domain: `acme-studio.com` | `step4/step4-data.ts` (`DOMAIN`), reused in step 5 |
| Phone: Nigeria +234, `801 234 5678` | Step 2 |
| Password for the owner: `Sample#Pass1` | Steps 2 and 3 |
| New user: Sam Lee, `sam.lee@acme-studio.com` | Step 5 (`NEW_USER`) |
| Recovery email: `sam.recovery@example.com` (`example.com` is reserved for examples) | Step 5 |
| Fake generated password: `Wd7#kQ2mPz9a` | Step 5 (shown in the modal and typed on the user login) |
| Fake DKIM public key (`SAMPLE_DKIM`, made-up key material) | `step4/step4-data.ts` |
| SPF and DMARC values built from the sample domain, e.g. `v=spf1 mx ra=postmaster -all` | `step4/step4-data.ts` |
| Product URLs in the URL pill (`login.snaarp.com/...`, `admin.snaarp.com/...`) | Step configs and scripts. These are the real Snaarp hostnames, not personal data. |

## Differences from the recording

1. **Dashboard says "Business Plan".** The recording's admin dashboard showed "Starter Plan". The tutorial follows the plan the viewer chose in step 1 (Business) so the story is consistent (`step3/step3-data.ts`).
2. **DNS status after verification reads "All records found".** The recording showed "No records" even after verifying. The tutorial shows the result a real customer should see (`step4/DomainsPage.tsx`).
3. **No browser autofill, saved-email list or "Save password?" popup.** They appear in the recording (they belong to the recorder's browser, and would expose real addresses). They were deliberately left out of step 5's login.
4. **Step 5 skips the Snaarp Mail inbox.** In the recording, logging in as the new user lands on a mail inbox (with a loading skeleton) before the products page. The tutorial goes from the login straight to the products home and shows a "Login successful" toast. The products-home URL pill reads `login.snaarp.com/admin`, as the owner specified (the recording showed `/products`).
5. **Step 5 has no "Loading users..." state** on the empty User Management list.
6. **Step 5 holds a few moments longer than the recording** (for example the "Login successful" toast stays 0.9 s so it can be read) and some moments are shorter. The whole tutorial runs about 2:04 against a 1:55 recording.
7. **Prices are in pounds (£49, £99, £249, £499).** This follows the project content rule "prices use the pound sign". The live pricing page (a screenshot the owner shared) shows naira (₦) amounts. Confirm which currency the tutorial should show. Plan names, storage sizes, team sizes and feature lists follow the live page.
8. **Pricing page is simplified.** The Monthly/Yearly toggle and the product tabs change their selected state but do not change the cards below. Only the 360 tab content is shown. Plan cards show 17 product logos (the set listed by the owner), while the tab row shows all 15 product tabs from the website.
9. **Browser chrome is our own.** The frame has three traffic lights and a URL pill. The recording's real browser toolbar and extensions are not reproduced.
10. **Cursor, rings, captions and toasts are added by us.** Captions are written for the tutorial (short, imperative). The recording has none.
11. **The "Created" date in the domain row is today's date**, not a fixed date (`new Date().toLocaleDateString("en-GB")` in `step4/DomainsPage.tsx`). Screenshots taken on different days differ here.
12. **Step 5 avatars.** The new admin's avatar letter is "S" (Sam). The recording showed a different letter.
13. **Mail server value.** The MX target `mail.mailrit.com.` and the CNAME/MX layout come from the recording. The owner has said `mailrit.com` is the product's real mail host and is kept on purpose; it is not sample data. It should still be confirmed before launch (see below).
14. **Icons.**
    - Product logos are the **real Snaarp SVG logos** in `public/logos/` (shown with `ProductLogo`): pricing page tabs and plan cards, sign-up orbit and header, products home, both admin icon rails, player rail.
    - All other icons (menus, buttons, stat cards, arrows, the two glyphs on the purple "Create/Configure Emails" and "System Admin" cards, the Snaarp mark in unused fallbacks) are **redrawn SVG placeholders** in `components/icons.tsx`, not the real Snaarp icons. Icons are never cropped from video frames.

## Choices that are not deviations (kept on purpose)

- Admin surfaces keep their own colors: owner portal black, Admin Panel purple, admin sign-in blue, user login black button. Do not unify them (see `DESIGN-TOKENS.md`).
- Step 5 uses two different admin layouts (`AdminLayout` and `AdminPanelLayout`) because the real product does.
- Scenes are built at 1440px and scaled, so every step looks the same at any window size.
- Each step starts where the previous one ended (no fade) when the recording does the same.

## Things to replace or confirm before launch

1. **Cancel button.** It is specified (top right, posts `{type:"snaarp-tutorial-cancel"}` to the parent window) but not built. Build it before embedding in an iframe.
2. **Real icons** for the remaining placeholders (see item 14) and the two glyphs on the products-home cards.
3. **Currency and prices** on the pricing page (item 7), and all plan details.
4. **Copy.** Confirm all captions, the sign-up page copy ("One Snaarp account for Mail, Docs, Sheet, CRM, and everything else."), feature rows and the completion text with the product team.
5. **DNS values.** Confirm the real MX server (`mail.mailrit.com.`), CNAME, SPF and DMARC values, and the wording around them.
6. **Plan name on the dashboard** ("Business Plan") and the "Registered from Snaarp Mail" line.
7. **Hostnames in the URL pill**, especially `login.snaarp.com/login?redirect=%2F`, `login.snaarp.com/admin`, and the guessed `mail.snaarp.com/inbox` used for every Snaarp Mail module in `tutorials/snaarp-mail.ts`.
8. **Completion link.** `backHref` defaults to `https://snaarp.com`. Set the real destination per product.
9. **Progress between products.** The rail dropdown shows `0/N` for products you are not viewing because progress is not stored.
10. **Hosting.** Decide the hosting and embedding (iframe or page) and test the Cancel message with the real parent page.
