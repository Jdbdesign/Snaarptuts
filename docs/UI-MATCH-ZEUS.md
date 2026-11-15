# UI-MATCH Specification: Zeus (Steps 1–9)

Reference video: `C:\Users\HP\Downloads\1115.mp4` (1384×720, 4:20).  
Design width: 1440px. Design tokens: Poppins font, brand purple `#7328E4` / `#7014D9`, background `#F6F6F8`, white cards `#FFFFFF`.

---

## 1. App Shell & Navigation Layout

Frames: `ref/zeus/0002.jpg`, `0010.jpg`, `0020.jpg`

| Element / Zone | Position & Dimensions | Colors & Typography | Content / Actions | Frame Ref |
|---|---|---|---|---|
| **Suite Rail** | `left: 0`, `w-14` (56px), full height | `bg-[#F7F6FB] border-r border-gray-200/80` | Mail, Meets, Teams, One Cardx, Sheets, Docs, Slides, PDF, Lock, Sign, Drive, Logout. No product active. | `ref/zeus/0002.jpg` |
| **Zeus Sidebar** | `left: 56px`, `w-[200px]`, full height | `bg-white border-r border-gray-200/80` | **Top**: Hamburger icon (`w-5 h-5`), Zeus purple bolt logo + "Zeus" wordmark (`font-bold text-lg`).<br>**Nav Items**: People (active: `bg-[#F5EEFF] text-[#7014D9] font-bold rounded-xl`), Companies, Lists, Exports, Integrations.<br>**Bottom**: Report a Bug (red text & flag), Admin Panel (`text-[#7014D9]`, shield icon). | `ref/zeus/0002.jpg` |
| **Top Bar** | `top: 0`, `h-14` (56px), spans content width | `bg-white border-b border-gray-200/80 flex items-center justify-between px-6` | **Left**: Hamburger + Zeus logo.<br>**Center**: Wide search box `bg-gray-100/80 rounded-xl px-4 py-2 text-xs` with magnifying glass icon and placeholder "Search people...".<br>**Right**: Credits pill (`bg-[#F5EEFF] text-[#7014D9] border border-[#7014D9]/20 rounded-full px-3 py-1 text-xs font-bold flex items-center gap-1.5`, bolt icon, "99" -> "98" -> "97"), 9-dot apps grid button, circular user avatar "U" (`bg-gray-800 text-white font-bold w-8 h-8 rounded-full`). | `ref/zeus/0002.jpg`, `0010.jpg` |

---

## 2. Step 1: Meet Zeus (`zeus.snaarp.com/people`)

Frames: `ref/zeus/0002.jpg`, `0006.jpg`

| Element / Zone | Position & Dimensions | Colors & Typography | Content / Actions | Frame Ref |
|---|---|---|---|---|
| **Filters Panel** | Left column of People view, `w-[280px]` | `bg-white border-r border-gray-200/80 p-4 overflow-y-auto` | **Header**: "Filters" (`text-sm font-bold text-gray-900`) + right link "Clear all" (`text-xs text-[#7014D9] font-semibold hover:underline`).<br>**Collapsible Groups**: Keyword (input "Search across all fields...", hint "Searches name, title, and email"), Name ("Search by name..."), Lists, Email Status, Job Titles, Company, Seniority, Department, Location, # Employees, Industry & Keywords, Revenue, Technologies.<br>**Bottom Button**: Sticky purple "Search People" button (`bg-[#7014D9] hover:bg-[#5B0FB3] text-white font-bold text-xs py-2.5 rounded-xl shadow-xs w-full`), hint "Enter or ⌘J from anywhere". | `ref/zeus/0002.jpg` |
| **Toolbar Row** | Top of main area, `h-12` | `flex items-center justify-between border-b border-gray-200/80 px-6 bg-white` | **Left**: Tab "Saved 0" (`text-xs text-gray-500 font-semibold`), button "Hide Filters" (slider/filter icon, `text-xs text-gray-700`).<br>**Center**: Database / Find Email segmented switch (`bg-gray-100 p-1 rounded-xl flex items-center`, "Database" active `bg-gray-900 text-white font-semibold text-xs px-3 py-1 rounded-lg`, "Find Email" `text-gray-600 text-xs px-3 py-1`). | `ref/zeus/0002.jpg` |
| **Empty State Hero** | Centered in main view | `flex flex-col items-center justify-center py-12 px-6 text-center` | Icon: circular lilac badge with purple search icon.<br>Title: "Find your next leads" (`text-xl font-bold text-gray-900 mt-4`).<br>Subtitle: "Search millions of verified contacts by name, title, company, location, and more." (`text-xs text-gray-500 mt-1 max-w-md`). | `ref/zeus/0002.jpg` |
| **Quick Start Cards** | 4 cards in 2x2 or 4x1 grid below hero | `grid grid-cols-4 gap-4 mt-8 max-w-4xl w-full` | **Card 1**: "C-Suite Executives", subtitle "CEOs, CTOs, CFOs", user-tie icon.<br>**Card 2**: "VP Engineering", subtitle "Tech decision makers", code icon.<br>**Card 3**: "Sales Leaders", subtitle "Directors & Managers", trending-up icon.<br>**Card 4**: "SaaS & Tech", subtitle "Technology companies", globe icon.<br>Each card: `bg-white border border-gray-200/90 rounded-2xl p-4 hover:border-[#7014D9]/40 hover:shadow-sm cursor-pointer transition-all`. | `ref/zeus/0002.jpg` |

---

## 3. Step 2: Check your credits and plan (`zeus.snaarp.com/billing`)

Frames: `ref/zeus/0020.jpg`, `0030.jpg`, `0040.jpg`

| Element / Zone | Position & Dimensions | Colors & Typography | Content / Actions | Frame Ref |
|---|---|---|---|---|
| **Page Header** | Top of Billing view | `mb-6` | Title: "Billing & Credits" (`text-2xl font-bold text-gray-900`).<br>Subtitle: "Manage your plan and track credit usage" (`text-xs text-gray-500 mt-1`). | `ref/zeus/0020.jpg` |
| **Current Plan Card** | Full width card in container | `bg-white border border-gray-200/90 rounded-2xl p-6 shadow-xs` | Badge: "Free" (`bg-gray-100 text-gray-700 text-xs font-bold px-2.5 py-0.5 rounded-full`).<br>Metric: "Credits This Month" (`text-xs text-gray-500`), bold count "99 / 100" (`text-2xl font-bold text-gray-900 mt-1`).<br>Progress bar: green bar filling 99% (`bg-emerald-500 h-2 rounded-full w-full mt-3 bg-gray-100`).<br>Subtitle: "1 credits used • 99 remaining • Resets monthly" (`text-[11px] text-gray-400 mt-2`). | `ref/zeus/0020.jpg` |
| **How Credits Work** | 4-column cards below Current Plan | `grid grid-cols-4 gap-4 mt-6` | **Tile 1**: "Reveal contact info", subtitle "1 credit per reveal", eye icon.<br>**Tile 2**: "Export data", subtitle "1 credit per 5 rows exported", download icon.<br>**Tile 3**: "Search & filter", subtitle "Free, unlimited", search icon.<br>**Tile 4**: "Save lists", subtitle "Free, unlimited", bookmark icon.<br>Style: `bg-white border border-gray-200/80 rounded-xl p-4 text-left`. | `ref/zeus/0020.jpg` |
| **Available Plans** | 4 pricing cards in 1 row | `grid grid-cols-4 gap-5 mt-8` | **Plan 1 (Free)**: £0/mo, 50 credits/month, "Current Plan" disabled tag.<br>**Plan 2 (Basic)**: £49/mo, 500 credits/month, purple "Upgrade" button (`hover:border-[#7014D9]`).<br>**Plan 3 (Professional)**: £99/mo, 2,000 credits/month, "Upgrade" button.<br>**Plan 4 (Enterprise)**: £249/mo, 10,000 credits/month, "Upgrade" button. | `ref/zeus/0020.jpg` |

---

## 4. Step 3: Search with filters (`zeus.snaarp.com/people`)

Frames: `ref/zeus/0085.jpg`, `0100.jpg`, `0120.jpg`, `0160.jpg`

| Element / Zone | Position & Dimensions | Colors & Typography | Content / Actions | Frame Ref |
|---|---|---|---|---|
| **Quick Start Search** | Click "C-Suite Executives" | Transition | Button/state shows "Searching..." spinner for 1.5s, then mounts Results Table. | `ref/zeus/0080.jpg` |
| **Results Toolbar** | Above table | `flex items-center justify-between py-3 px-6 bg-white border-b border-gray-200` | Tabs: "Total 89,187,648" (bold text, active border) + "Saved 0".<br>Button: "Filters (1)" with badge.<br>Button: "Save search" (`text-xs text-gray-700 border border-gray-200 rounded-xl px-3 py-1.5 hover:bg-gray-50 flex items-center gap-1.5`). | `ref/zeus/0085.jpg` |
| **Filter Interactions** | In left Filters panel | Active form controls | • Keyword: type "CEO".<br>• Lists: open accordion (shows checkboxes).<br>• Email Status: select radio "Has email".<br>• Seniority: tick "C-Suite" and "VP" checkboxes (purple chips mount under group title).<br>• Department: hover item.<br>• Click "Search People": shows 1.5s "Searching..." loading state, then updates table with CEO contacts and filtered count. | `ref/zeus/0120.jpg` |
| **Results Table** | Main area | `w-full bg-white border-b border-gray-200 text-xs` | Columns: Checkbox, `NAME`, `TITLE`, `COMPANY`, `EMAIL`, `PHONE`, `LOCATION`.<br>25 rows: Initial avatars, bold contact names (e.g. Jordan Lee), job titles, company blue links, masked emails ("••••••@••••.com"), phone ("Unavailable"), location.<br>Hovering a row highlights with lilac background `#F5EEFF`/50. | `ref/zeus/0085.jpg`, `0160.jpg` |
| **Table Pager** | Bottom footer bar | `flex items-center justify-between p-4 px-6 bg-white border-t border-gray-200` | "1-25 of 89,187,648" (or filtered total), "Show 25" dropdown, Pager buttons: `Previous`, `1`, `2`, `3`, `...`, `Next`. | `ref/zeus/0085.jpg` |

---

## 5. Step 4: Save a search (`zeus.snaarp.com/people`)

Frames: `ref/zeus/0480.jpg`, `0500.jpg`

| Element / Zone | Position & Dimensions | Colors & Typography | Content / Actions | Frame Ref |
|---|---|---|---|---|
| **Save Search Modal** | Centered modal dialog, `w-[440px]` | `bg-white rounded-2xl p-6 shadow-2xl border border-gray-100` | Title: "Save this search" (`text-base font-bold text-gray-900`).<br>Subtitle: "Give your search a name to quickly run it again later." (`text-xs text-gray-500 mt-1`).<br>Input: placeholder "e.g. Senior Engineers in US", types "CEOs".<br>Footer: Cancel button + purple "Save" button (`bg-[#7014D9] text-white px-5 py-2 rounded-xl text-xs font-semibold`). | `ref/zeus/0480.jpg` |
| **Toast Confirmation** | Bottom center toast | `bg-gray-900 text-white text-xs px-4 py-2.5 rounded-full shadow-lg flex items-center gap-2` | "Search saved, \"CEOs\" saved successfully". | `ref/zeus/0490.jpg` |
| **Saved Searches Button** | Toolbar top right | `bg-[#F5EEFF] text-[#7014D9] border border-[#7014D9]/20 rounded-xl px-3 py-1.5 text-xs font-bold` | "Saved Searches (1)". Clicking opens dropdown menu with heading "YOUR SAVED SEARCHES" and row "CEOs". Clicking re-runs search. | `ref/zeus/0500.jpg` |

---

## 6. Step 5: Find an email (`zeus.snaarp.com/people`)

Frames: `ref/zeus/0052.jpg`, `0060.jpg`

| Element / Zone | Position & Dimensions | Colors & Typography | Content / Actions | Frame Ref |
|---|---|---|---|---|
| **Switch to Find Email** | Center toolbar | Segmented control | Click "Find Email" tab (turns dark `#111827`, text white). | `ref/zeus/0052.jpg` |
| **Email Finder Card** | Center of main area, `max-w-xl` | `bg-white border border-gray-200/90 rounded-2xl p-6 shadow-xs` | Title: "Email Finder" (`text-base font-bold text-gray-900`).<br>Subtitle: "Find anyone's email address. Enter their name and domain." (`text-xs text-gray-500 mt-1`).<br>Full Name input: placeholder "e.g. John Smith or John Michael Smith", types "Jordan Lee".<br>Domain input: placeholder "e.g. google.com", types "example.com".<br>Button: "Find Email" (turns purple `#7014D9` when both fields filled). | `ref/zeus/0052.jpg` |
| **Email Result Card** | Below form on submit | `bg-white border border-gray-200 rounded-xl p-4 mt-4 shadow-xs flex items-center justify-between` | Left: `jordan.lee@example.com` (`font-mono text-xs font-bold text-gray-900`), copy button.<br>Right: badge "1 credit used" (`text-[11px] text-gray-500 font-medium`).<br>Header credits pill updates: **99 -> 98**. Click "Database" to return. | Clean finish |

---

## 7. Step 6: Open a contact and reveal details

Frames: `ref/zeus/0180.jpg`, `0200.jpg`, `0210.jpg`

| Element / Zone | Position & Dimensions | Colors & Typography | Content / Actions | Frame Ref |
|---|---|---|---|---|
| **Row Click** | Click Jordan Lee row | Table row | Background darkens with modal backdrop. | `ref/zeus/0180.jpg` |
| **Contact Drawer** | Slides in from right, `w-[420px]`, full height | `bg-white shadow-2xl p-6 flex flex-col justify-between overflow-y-auto` | **Header**: Close button (X), Avatar circle "JL", Name "Jordan Lee" (`text-lg font-bold text-gray-900`), Title "Managing Director" (`text-xs text-gray-500`), Company "Northwind Labs" (`text-xs text-blue-600 hover:underline font-semibold`).<br>**Contact Info Card**: Heading "Contact Information", badge "1 credit".<br>• Masked email: "••••••@••••.com" with lock icon.<br>• Purple button: "Reveal Contact (1 credit)".<br>• Link: "View LinkedIn Profile" (hover only). | `ref/zeus/0180.jpg` |
| **Reveal Action** | Click "Reveal Contact" | Spinner -> Revealed | Button shows spinner "Revealing..." for 1.5s.<br>Email replaces mask with `jordan.lee@example.com` + copy icon.<br>Phone row shows "Unavailable".<br>Reveal button disappears.<br>Credits pill updates: **98 -> 97**. | `ref/zeus/0200.jpg`, `0210.jpg` |
| **Drawer Actions** | Bottom of drawer | Actions | Button: "+ Add to List" (`border border-gray-200 rounded-xl px-4 py-2 text-xs font-semibold hover:bg-gray-50`).<br>Button: "View LinkedIn" (`bg-[#0A66C2] text-white rounded-xl px-4 py-2 text-xs font-semibold`). | `ref/zeus/0200.jpg` |

---

## 8. Step 7: Create a list (`zeus.snaarp.com/lists`)

Frames: `ref/zeus/0240.jpg`, `0260.jpg`

| Element / Zone | Position & Dimensions | Colors & Typography | Content / Actions | Frame Ref |
|---|---|---|---|---|
| **My Lists Panel** | Left column of Lists view, `w-[320px]` | `bg-white border-r border-gray-200/80 p-5` | Header: "My Lists" (`text-base font-bold text-gray-900`) + purple button "+ New List" (`bg-[#7014D9] text-white text-xs font-semibold px-3 py-1.5 rounded-xl`).<br>Initial row: "Tech CEO", subtitle "Static • 0 members • 09/10/2026".<br>Hovering row shows small pencil (edit) and trash (delete) icons. | `ref/zeus/0240.jpg` |
| **Create List Modal** | Centered modal, `w-[480px]` | `bg-white rounded-2xl p-6 shadow-2xl border border-gray-100` | Title: "Create New List" (`text-base font-bold text-gray-900`).<br>Input: List Name placeholder "e.g. Hot Leads Q4", types "New Leads".<br>Type Options: 2 selectable cards:<br>• "Static - Manually add members" (active: lilac border/bg).<br>• "Dynamic - Auto-updates by filters".<br>Buttons: Cancel + purple "Create List" (disabled until name typed). | `ref/zeus/0260.jpg` |
| **List Created Result** | Modal closes | Updated UI | Toast bottom right: "List created, \"New Leads\" is ready to use".<br>"New Leads" mounts at top of My Lists. | `ref/zeus/0270.jpg` |

---

## 9. Step 8: Add a contact to a list

Frames: `ref/zeus/0290.jpg`, `0310.jpg`, `0320.jpg`

| Element / Zone | Position & Dimensions | Colors & Typography | Content / Actions | Frame Ref |
|---|---|---|---|---|
| **Add to List Trigger** | On People view, open Jordan Lee drawer | Drawer action | Click "+ Add to List". A dropdown/menu opens with "Select a list:", option "New Leads", and Cancel button. Click "New Leads". | `ref/zeus/0290.jpg` |
| **Drawer Confirmation** | Inside drawer card | Feedback | Shows confirmation that contact was added to "New Leads". | `ref/zeus/0300.jpg` |
| **List Detail View** | Navigate to Lists -> click "New Leads" | Main content area | **Header**: "New Leads" (`text-xl font-bold text-gray-900`), subtitle "Static list • manually curated", actions: "Export CSV", "Edit", red "Delete", "Static" pill.<br>**Table**: Checkbox, `NAME`, `TITLE`, `COMPANY`, `EMAIL`, `PHONE`, `LOCATION`.<br>Row: Jordan Lee, revealed email `jordan.lee@example.com`, phone "-", remove icon at right. | `ref/zeus/0310.jpg`, `0320.jpg` |

---

## 10. Step 9: Delete a list (`zeus.snaarp.com/lists`)

Frames: `ref/zeus/0225.jpg`, `0230.jpg`

| Element / Zone | Position & Dimensions | Colors & Typography | Content / Actions | Frame Ref |
|---|---|---|---|---|
| **Select Tech CEO** | Click "Tech CEO" in My Lists | Content view | Header "Tech CEO", empty state: "No members in this list, Add people or companies from search results.", buttons: "Import CSV", "Edit", red "Delete". | `ref/zeus/0220.jpg` |
| **Delete List Modal** | Click "Delete" button | Centered modal, `w-[460px]` | Title: "Delete List" (`text-base font-bold text-gray-900`).<br>Message: "Are you sure you want to delete \"Tech CEO\"? This will remove all members from the list. This action cannot be undone."<br>Buttons: Cancel + red "Delete" (`bg-red-600 hover:bg-red-700 text-white font-semibold text-xs px-4 py-2 rounded-xl`). | `ref/zeus/0225.jpg` |
| **Deletion Result** | Click Delete | Transition | Button shows "Deleting..." spinner for 1s. Modal closes, "Tech CEO" is removed from My Lists, green toast confirms "List deleted", only "New Leads" remains.<br>Concludes tutorial -> Tour completion card! | `ref/zeus/0230.jpg` |

---
