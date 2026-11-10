# UI-MATCH-ME.md — Snaarp Me UI Specifications & Frame Reference

Reference Video: `C:\Users\HP\Downloads\1110 (1).mp4` (1430x720, 5:08 duration)
Extracted Frames: `ref/me/%03d.png` (309 frames at 1 fps)

---

## 1. Global Shell & Palette

| Element | Specification / Token | Frame Reference |
|---|---|---|
| **Design Canvas** | 1440px design width, scaled to container; `#FFFFFF` / `#F9FAFB` bg | `ref/me/005.png` |
| **Typography** | Font Family: Poppins, sans-serif. Weights: 400, 500, 600, 700 | Global |
| **Primary Brand Purple** | `#7014D9` (accent, buttons, active nav, focus rings) | `ref/me/005.png` |
| **Active Nav Background** | `#F5EEFF` (subtle lilac rounded pill) | `ref/me/005.png` |
| **Active Nav Text** | `#7014D9` (bold purple text & icon) | `ref/me/005.png` |
| **Text Primary** | `#111827` (almost black headings & labels) | Global |
| **Text Muted / Grey** | `#6B7280` / `#9CA3AF` (subtitles, secondary info) | Global |
| **Borders** | `#E5E7EB` / `#F3F4F6` (subtle light grey dividers) | Global |
| **Card Background** | `#FFFFFF` with `1px solid #E5E7EB` and rounded corners `rounded-2xl` / `rounded-xl` | Global |
| **Suite Rail (Far Left)** | Width: 60px; `#FFFFFF` or `#F9FAFB`; border-r `#E5E7EB`; icons: Hamburger, Mail, Meets, Teams, One Cardx, Sheets, Docs, Slides, Logout | `ref/me/005.png` |
| **Sidebar (Navigation)** | Width: 220px; `#FFFFFF`; border-r `#E5E7EB`; Logo: purple rounded square `#7014D9` with white calendar/bag mark + bold "Snaarp Me"; items: Home, Event Type, Availability, Calendar, Meetings, Workflows, Contacts, Analytics, Integrations; bottom: Report a Bug `#EF4444` | `ref/me/005.png` |
| **Content Header** | Height: 70px; border-b `#E5E7EB`; Left card: "YOUR TEAM" (small caps 10px `#9CA3AF`) over "Product Team · Owner"; Right: 4-squares app icon, avatar "JD", "Jane Doe" / "Product Team · Owner", chevron | `ref/me/005.png` |

---

## 2. Screen 1: Home Dashboard (`snaarp.me/dashboard`)

Frames: `ref/me/005.png`, `010.png`

| Section / Element | Specification |
|---|---|
| **Welcome Banner** | White card `rounded-2xl`, border `#E5E7EB`, p-6. Heading "Welcome back, Jane" (`text-2xl font-bold #111827`), subtitle "Here's what's happening with your schedule today." (`text-sm text-gray-500`). Right: `+ New Event` pill button (`bg-gray-100 hover:bg-gray-200 text-gray-800 px-4 py-2 rounded-full text-sm font-medium`). |
| **Today's Schedule** | Heading "Today's Schedule" (`text-lg font-bold`), right link "View calendar ->" (`text-sm text-[#7014D9] font-medium`). Card: `rounded-2xl border border-gray-200 bg-white p-4 flex items-center justify-between`. Left vertical accent bar `w-1.5 h-10 bg-[#7014D9] rounded-full`. Time: "11:30 AM" (`font-bold text-base`) / "12:00 PM" (`text-xs text-gray-400`). Center: "Sam Taylor" (`font-semibold text-gray-900`) / "Standup Meeting with developers · 30 min" (`text-xs text-gray-500`). Right: "Confirmed" (`text-sm text-gray-500 flex items-center gap-1`). |
| **4 Stat Cards** | 4-column grid. Each card `rounded-2xl border border-gray-200 bg-white p-4 flex items-center gap-4`. <br>1. Calendar icon in lilac square `#F5EEFF`, "1", "Bookings This Week". <br>2. Clock icon in mint square `#DCFCE7`, "1", "Upcoming". <br>3. Check circle in lilac square `#F5EEFF`, "0", "Completed This Week". <br>4. Upward trend arrow in yellow square `#FEF3C7`, "0.0%", "Cancellation Rate". |
| **Upcoming Bookings** | Heading "Upcoming Bookings" (`text-base font-bold`). Card with left purple bar, "Sam Taylor", "Standup Meeting with developers · 30 min", "Today, 11:30 AM - 12:00 PM", right pill button "View ->". |
| **Recent Activity** | Right card `rounded-2xl border border-gray-200 bg-white p-4 w-[320px] shrink-0`. Heading "Recent Activity" (`text-sm font-bold`). Scrollable list: <br>- Item 1: green calendar icon, "New booking — Sam Taylor booked Standup Meeting with developers", "Just now" <br>- Item 2: green calendar icon, "New booking — Casey Brown booked 30 Minute Meeting", "48d ago" <br>- Item 3: amber reload icon, "Rescheduled — Casey Brown booked 30 Minute Meeting", "49d ago". |

---

## 3. Screen 2: Booking Details Modal

Frames: `ref/me/015.png`, `020.png`

| Element | Specification |
|---|---|
| **Modal Overlay** | `fixed inset-0 bg-black/40 z-50 flex items-center justify-center p-4` |
| **Dialog Card** | `bg-white rounded-3xl max-w-2xl w-full p-6 shadow-2xl relative border border-gray-100` |
| **Header** | Title "Standup Meeting with developers" (`text-xl font-bold`), subtitle "with Sam Taylor" (`text-sm text-gray-500`). Top right: Status badge "Confirmed" (`bg-green-100 text-green-700 text-xs px-3 py-1 rounded-full font-medium`) and Close `X` icon. |
| **Body (2 columns)** | **Left column ("Meeting")**: <br>- "EVENT TYPE" / "Standup Meeting with developers" <br>- "DATE & TIME" / "Tuesday, November 10, 2026 at 11:30 AM" <br>- "DURATION" / "30 minutes" <br>- "LOCATION" / "Snaarp Meet" with link `https://meet.snaarp.com/meet/abc-defg-hij` and "Copy" pill button <br>- "SOURCE" / "Direct" <br>- "CREATED" / "Nov 10, 2026, 2:48 AM" <br>- Divider line <br>- "SNAARP MEET" section: Purple pill button "Join meeting" (`bg-[#7014D9] text-white`) and link with "Copy" button. <br>**Right column ("Invitee")**: <br>- Avatar circle "S", "Sam Taylor", "sam.taylor@example.com" (purple) <br>- "TIMEZONE" / "Africa/Lagos". |
| **Footer** | Right-aligned "Close" pill button (`border border-gray-200 px-5 py-2 rounded-full text-sm hover:bg-gray-50`). |

---

## 4. Screen 3: Calendar View (`snaarp.me/calendar`)

Frame: `ref/me/025.png`

| Section / Element | Specification |
|---|---|
| **Page Header** | Heading "Calendar" (`text-2xl font-bold`), subtitle "Schedule personal events, and view bookings, connected calendars, and Snaarp Meet meetings". |
| **Filter Pills** | Pill badges with dot: "• Snaarp Me" (purple dot, rounded-full border), "• Snaarp Meet" (blue dot, rounded-full border). |
| **Controls Row** | Left: `<` `>` arrows, `Today` button, month title `November 2026` (`text-lg font-bold`). Right: view toggles `Month` (active purple), `Week`, `Day`. Below: purple button `Schedule event` and pill button `Connect Calendar`. |
| **Calendar Grid** | 7 columns: SUN, MON, TUE, WED, THU, FRI, SAT. Days 1 through 30. Day 10 is highlighted with purple circle `10`, containing event badge `• Standu...`. |
| **Right Sidebar** | **Upcoming section**: Heading "Upcoming" with purple count badge `1`. Card: left purple border, "Standup Meeting with developers", avatar "ST", "Sam Taylor", "Today · 11:30 AM - 12:00 PM". <br>**Calendar Integrations card**: "Sync your other calendars to see everything in one place. Only Snaarp Me bookings appear until you connect." List: Snaarp Meet (Connected / Disconnect), Google Calendar (Not connected / Connect), Outlook Calendar (Not connected / Connect). |

---

## 5. Screen 4: Meeting Detail Page (`snaarp.me/bookings/<id>`)

Frame: `ref/me/038.png`

| Element | Specification |
|---|---|
| **Back Link** | `< Back to Bookings` (`text-sm text-gray-500 hover:text-gray-900 flex items-center gap-1`). |
| **Header** | Title "Standup Meeting with developers" (`text-2xl font-bold`), subtitle "with Sam Taylor" (`text-sm text-gray-500`), status badge "Confirmed" (`bg-green-100 text-green-700 text-xs px-3 py-1 rounded-full font-medium`). |
| **Body (2 cards)** | **Meeting Card** (left 65% width): Same structured fields as modal (Event Type, Date & Time, Duration, Location with Copy button, Source, Created, Snaarp Meet Join button & link). <br>**Invitee Card** (right 35% width): Avatar, Name, Email (purple), Timezone. |

---

## 6. Screen 5: Create Event Type Stepper Modal

Frames: `ref/me/050.png`, `086.png`, `090.png`, `098.png`, `105.png`

| Stepper Step | Specification |
|---|---|
| **Modal Container** | `fixed inset-0 bg-black/40 z-50 flex items-center justify-center p-4`. Modal card `bg-white rounded-3xl max-w-xl w-full p-6 shadow-2xl relative`. |
| **Stepper Bar** | 3 steps connected by lines: <br>1. `Basic Info` (active purple circle `1` or completed green circle `✓`) <br>2. `Schedule` (purple circle `2` or completed green circle `✓`) <br>3. `Advanced` (purple circle `3`). |
| **Step 1: Basic Information** | - "Title *" input, placeholder "e.g., 30 Minute Meeting". Types `Creative meeting with the Team`. <br>- "Description" textarea, placeholder "Describe what this meeting is about...". Types `Learn how to plan your week with Snaarp Me`. <br>- "Duration (minutes)" chips: `15 min`, `30 min`, `45 min`, `60 min`, `90 min`, `120 min`. Clicks `45 min`, then clicks `30 min`. <br>- Footer: "Cancel" link + "Next" purple button. |
| **Step 2: Schedule & Availability** | - "Schedule *" select dropdown (`Open Days`). Helper: "Select the availability schedule for this event type". <br>- "Buffer Before (minutes)" (`0`) & "Buffer After (minutes)" (`0`). <br>- "Minimum Notice (hours)" (`4`) & "Max Booking Days" (`60`). <br>- "Daily Limit" (placeholder "No limit") & "Weekly Limit" (placeholder "No limit"). <br>- "Max Attendees" spinner (`1`). User increments to `2`. Helper: "For group events". <br>- Footer: "Back" + "Cancel" + "Next". |
| **Step 3: Advanced** | - "Color" swatch `#2563eb` with hex input `#2563eb`. <br>- "Secret Event" toggle switch (off/on). Helper: "Only accessible via direct link, not shown on your public page". Clicks on then off. <br>- "Internal Event" toggle switch (off/on). Helper: "Only available to members of your organization". Clicks on then off. <br>- "Custom Redirect URL" placeholder `https://example.com/thank-you`. <br>- Footer: "Back" + "Cancel" + "Create Event Type" purple button. |
| **Success Banner** | Light green banner on Home: `Event type created successfully.` (`bg-green-50 border border-green-200 text-green-800 rounded-xl px-4 py-3`). |

---

## 7. Screen 6: Event Types Scheduling List (`snaarp.me/event-types`)

Frames: `ref/me/120.png`, `180.png`

| Section / Element | Specification |
|---|---|
| **Header** | Title "Scheduling" (`text-2xl font-bold`), subtitle "Create and manage the types of events people can book with you". Right: `+ New Event Type` purple pill button. |
| **Event Cards** | Stack of cards with `border border-gray-200 rounded-2xl bg-white p-5 flex items-center justify-between hover:shadow-sm`. <br>Left side: <br>- Blue rounded square icon with calendar graphic <br>- Title "Creative meeting with the Team" (bold text-lg) <br>- Subtitle description <br>- Badges: `30 min` (clock icon), `Snaarp Meet` (camera icon), `Active` (green pill badge) <br>- URL link: `https://snaarp.me/jane/creative-meeting-with-the-team` <br>Right side controls: <br>- Toggle switch (purple on) <br>- Link icon (hover tooltip "Copy link"; clicking changes to checkmark and shows top toast banner "Booking link copied to clipboard!") <br>- Trash icon (delete) |
| **Existing Cards** | 2. "Standup Meeting with developers" <br>3. "30 Minute Meeting" |

---

## 8. Screen 7: Edit Event Type Drawer & Preview Panel

Frames: `ref/me/120.png`, `140.png`, `160.png`

| Section | Specification |
|---|---|
| **Drawer Layout** | Fixed right drawer `w-[560px] bg-white h-full border-l border-gray-200 shadow-2xl flex flex-col z-40`. |
| **Header** | Blue calendar tile, "EDIT EVENT TYPE" (small uppercase), "Creative meeting with the Team" (bold text-xl), subtitle "Step 1 of 3 · Basic Info", close `X` button. |
| **Tabs** | 3 tabs: `Basic Info`, `Schedule`, `Advanced`. Active tab has purple text & purple underline. |
| **Tab 1: Basic Info** | Event details heading, Title input, Description textarea, Duration chips, Location selector (`Snaarp Meet`). |
| **Tab 2: Schedule** | Buffer time before/after, Booking window (Minimum notice, Max booking days), Booking limits (Daily limit, Weekly limit, Max attendees). |
| **Tab 3: Advanced** | Secret Event toggle, Internal Event toggle, Custom redirect URL, Intake questions section with "Add question" button and empty state card. |
| **Preview Panel** | Slides in from the left of the drawer (`w-[380px] bg-white border border-gray-200 rounded-2xl shadow-xl p-5`). <br>- Header: "PREVIEW" (small uppercase), "Booking page", "How invitees see this event type", close `X`. <br>- Mini calendar picker (November 2026). Day 10 / 11. <br>- Available times list: `1:30 PM`, `2:00 PM`, `2:30 PM`, `3:00 PM`, `3:30 PM` (active lilac). <br>- Footer: "Status: Active" green badge. |
| **Drawer Footer** | `Preview` button (eye icon), `Back` button, `Cancel` button, `Save changes` purple button (`bg-[#7014D9] text-white`). |
| **Update Banner** | Top green banner: `Event type updated successfully.`. |

---

## 9. Screen 8: Public Booking Page (`snaarp.me/jane/creative-meeting-with-the-team`)

Frames: `ref/me/210.png`, `216.png`, `225.png`, `250.png`, `274.png`, `280.png`

| View State | Specification |
|---|---|
| **Full Page Wrapper** | **NO APP SHELL**. Background `#F3F4F6`. Centered large container `max-w-4xl w-full bg-white rounded-3xl shadow-lg border border-gray-200 overflow-hidden my-12 flex min-h-[580px]`. |
| **Left Info Panel** | Width: 38% (`w-[360px] border-r border-gray-200 flex flex-col justify-between`). <br>- **Top Gradient Header**: `bg-gradient-to-br from-[#6366F1] to-[#4F46E5] text-white p-6 rounded-tl-3xl`. <br>  - Round avatar "JD" + "Jane" (video: yinkas) <br>  - Title "Creative meeting with the Team" (`text-2xl font-bold`) <br>  - Chips: `30m` (clock), `Snaarp Meet` (camera) <br>- **Bottom Details Body** (p-6): <br>  - Date & Time (if selected): `Wednesday, November 11 at 11:30 AM GMT+1` (calendar icon) <br>  - Timezone: `Africa/Lagos` (globe icon) <br>  - Greeting: "Hi there! 👋" <br>  - Description: "Learn how to plan your week with Snaarp Me" <br>  - "See you soon!" <br>  - "— Jane" <br>  - (On enter details view): `< Change time` link at bottom. |
| **State A: Select Date & Time** | - Right section: p-8. <br>- Heading "Select a date & time" (`text-xl font-bold`). <br>- Timezone dropdown: globe icon `Lagos (GMT+1)` with chevron. <br>- Month header: `<` `November 2026` `>`. Days header: `MON TUE WED THU FRI SAT SUN`. Days grid: Day 11 is selected with purple rounded box. <br>- Available times column on the right: "Wednesday, November 11", "31 time slots available", list of slots (`09:00`, `09:15`, ..., `11:30`). Clicking `11:30` advances to Enter Details form. |
| **State B: Enter Details Form** | - Heading "ENTER DETAILS" (small uppercase `text-xs text-gray-400 font-semibold tracking-wider`). <br>- "Name *" input: types `John Smith`. <br>- "Email *" input: types `john@example.com`. <br>- "GUESTS": `+ Add guests` button. Clicking reveals guest input. Types `guest@example.com`, clicks `Add`. Shows tag `guest@example.com ×`. <br>- "ADDITIONAL NOTES": textarea. Types `I can't wait to come and learn how you organized the team professionally`. <br>- Legal note: "By proceeding, you confirm that you have read and agree to Snaarp Me's Invitee Terms and Privacy Notice." <br>- Purple button: `Schedule Event` (`bg-[#7014D9] text-white w-full py-3 rounded-xl font-medium`). |
| **State C: Scheduled Confirmation** | - Left panel: Gradient header with check circle "✓", "Jane", "You are scheduled!", chips `30 min` & `Snaarp Meet`. Body: "Hi there! 👋", "A calendar invitation has been sent to your email address.", "See you soon!", "— Jane". <br>- Right panel: <br>  - Purple checkmark, "Creative meeting with the Team", "Wednesday, November 11, 2026 at 11:30 AM GMT+1". <br>  - Section "Booking Details": Date & Time range, Duration `30 min`, Organizer `Jane`, Invitee `John Smith` / `john@example.com`, Guests `guest@example.com`, Venue `https://meet.snaarp.com/meet/abc-defg-hij`, Status `Confirmed`. <br>  - "Add to calendar" section: 3 buttons (`Google Calendar`, `Outlook`, `Download .ics`). Hovering shows active state. <br>  - Bottom button: `Book a new time` (`bg-[#F3E8FF] text-[#7014D9] w-full py-3 rounded-xl font-medium hover:bg-[#E9D5FF]`). |

---

## 10. Screen 9: Home Dashboard After Booking

Frame: `ref/me/300.png`

| Element | Specification |
|---|---|
| **Stat Cards** | - "Bookings This Week": **2** (was 1) <br>- "Upcoming": **2** (was 1) <br>- "Completed This Week": **0** <br>- "Cancellation Rate": **0.0%** |
| **Upcoming Bookings** | Two cards in stack: <br>1. "John Smith", "Creative meeting with the Team · 30 min", "Tomorrow, 11:30 AM - 12:00 PM", button "View ->" <br>2. "Sam Taylor", "Standup Meeting with developers · 30 min", "Today, 11:30 AM - 12:00 PM", button "View ->" |
| **Recent Activity** | New row at the top: <br>- Green calendar icon <br>- "New booking — John Smith booked Creative meeting with the Team" <br>- Timestamp: "Just now" <br>Followed by Sam Taylor (Just now) and older rows. |
| **Completion Card** | Displayed upon completing Step 6: standard tutorial celebration card with summary of Snaarp Me features explored. |

---

## 11. Screen 10: Availability Overview & Working Hours (`snaarp.me/availability`)

Frames: `ref/me2/0001.png`, `0005.png`, `0008.png`

| Section / Element | Specification |
|---|---|
| **Page Layout** | 2-column layout: Left column `w-[280px] shrink-0 border-r border-gray-100 pr-6`, Right panel `flex-1 min-w-0 pl-6`. |
| **Left Schedules List** | - Heading: "SCHEDULES" (`text-xs font-semibold tracking-wider text-gray-400 uppercase`) with `+` button in rounded border (`border border-gray-200 w-6 h-6 flex items-center justify-center rounded-lg hover:border-purple-300 text-gray-500`). <br>- Schedule card "Open Days": `rounded-2xl p-4 bg-[#F5EEFF] border border-purple-200 flex items-center justify-between cursor-pointer`. Left: purple dot, bold "Open Days" (`text-sm font-bold text-gray-900`), subtitle "Africa/Lagos" (`text-xs text-gray-400`). Right: purple circle with white checkmark `w-5 h-5 rounded-full bg-[#7014D9] flex items-center justify-center text-white`. |
| **Right Header & Tabs** | - Title: "Open Days" (`text-xl font-bold text-gray-900`) with pill badge "DEFAULT" (`text-[10px] font-bold text-[#7014D9] bg-purple-100 px-2 py-0.5 rounded-full`). <br>- Tabs: "Working Hours", "Date Overrides", "Preview". Active tab has purple underline (`border-b-2 border-[#7014D9] text-[#7014D9] font-semibold`). |
| **Schedule Settings Form** | - "Schedule Name *": input `rounded-xl border border-gray-200 bg-gray-50/50 px-4 py-2.5 text-sm`, counter "9/100 characters" below. <br>- "Timezone": "Africa/Lagos (GMT+1)", disabled/read-only input with down chevron. <br>- "Set as default schedule": card `rounded-2xl border border-gray-100 p-4 flex items-center justify-between`. Title "Set as default schedule", subtitle "This is your only schedule, so it stays the default." Toggle switch ON (`bg-[#7014D9]`). |
| **Weekly Hours Section** | - Header: "Weekly Hours" (`text-base font-bold`), right side segmented control: `List` (active) / `Calendar`. <br>- Mon row: Purple toggle ON, "Mon" label (`text-sm font-semibold`), Range bar (`9:00 AM`, purple bar, `5:00 PM`), dropdown selectors: `9:00 AM` `v` to `5:00 PM` `v`. |

---

## 12. Screen 11: Create Schedule Modal

Frames: `ref/me2/0015.png`, `0040.png`, `0060.png`, `0072.png`, `0085.png`

| Element | Specification |
|---|---|
| **Modal Container** | `fixed inset-0 bg-black/40 z-50 flex items-center justify-center p-4`. Dialog `bg-white rounded-3xl max-w-xl w-full p-6 shadow-2xl relative border border-gray-100 max-h-[90vh] flex flex-col`. |
| **Modal Header** | Title: "Create Schedule" (`text-xl font-bold text-gray-900`), Subtitle: "Define your available hours for meetings" (`text-xs text-gray-500`), top right close `X` button. |
| **Inputs** | - "Schedule Name *": types `Personal Event time` (counter `19/100 characters`). <br>- "Timezone": `Africa/Lagos (GMT+1)` with chevron. <br>- "Set as default schedule": toggle OFF, subtitle "New event types will use this schedule by default". |
| **Weekly Hours (Modal Body)** | Scrollable body: <br>- Weekdays Mon–Fri: toggle ON, From `9:00 AM` To `5:00 PM`, purple range bar, `+ Add range`, `Apply same hours to` with day checkboxes and `Weekdays` link. <br>- Saturday row: toggle turned ON, range bar appears. Opening To dropdown reveals 15-minute intervals (`12:15 PM`, `12:30 PM`, `12:45 PM`, `1:00 PM` [selected]). Bar shortens to 1:00 PM. <br>- Sunday row: toggle OFF, pill "Unavailable" (`bg-gray-100 text-gray-400 text-xs px-2.5 py-1 rounded-full`). |
| **Footer** | Pinned footer: `Cancel` text button, purple `Create Schedule` button (`bg-[#7014D9] hover:bg-[#5e0eb8] text-white px-6 py-2.5 rounded-xl font-semibold text-sm`). |
| **Success Banner** | Top green banner: `Schedule created successfully.`. New card "Personal Event time" mounted in schedules list. |

---

## 13. Screen 12: Date Overrides (Weekly Calendar & Override Modal)

Frames: `ref/me2/0095.png`, `0105.png`, `0110.png`, `0120.png`, `0135.png`, `0168.png`

| Section / Element | Specification |
|---|---|
| **Weekly Calendar View** | Switching List to Calendar in Weekly Hours renders month grid: <br>- Header: `< November 2026 >`, right: "West Africa Time". <br>- Column headers: `SUN MON TUE WED THU FRI SAT`. <br>- Cells: date number, recurring sync icon at top right, hours `09:00 - 17:00` (Sat `09:00 - 13:00`, Sun empty). Day 10 circled purple. |
| **Date Popover Menu** | Clicking Wed 11 cell opens floating menu: <br>- Header: "WEDNESDAY, NOV 11" (`text-[10px] font-bold text-gray-400`). <br>- Item 1: Calendar icon, "Edit date" (`font-semibold text-xs`), "Custom hours for this day only". <br>- Item 2: Sync icon, "Edit all Wednesdays", "Update recurring weekly hours", chevron `>`. |
| **Edit Date Modal** | Modal dialog: <br>- Title: "Edit date", "Wednesday, November 11, 2026", close `X`. <br>- "Available": toggle ON, subtitle "Set custom hours for this date". <br>- Range 1: From `9:00 AM` To `5:00 PM`, red "Remove" link. <br>- Click `+ Add time range`: Range 2 appears: Range 2 from `5:00 PM` Range 2 to `6:00 PM`, red "Remove" link. <br>- Purple `Save` button (goes disabled during save hold). <br>- Toast bottom right: `Date override saved.` with green checkmark. <br>- Day 11 cell updates to show: `09:00 - 17:00` and `17:00 - 18:00`. |
| **Date Overrides Tab** | Clicking "Date Overrides" tab shows: <br>- Title: "Date Overrides", subtitle "Override your schedule for specific dates — mark days off or set custom hours." <br>- Left list "Active Overrides": 2 rows for Wed, Nov 11, 2026 (green pills `9:00 AM - 5:00 PM` and `5:00 PM - 6:00 PM`, each with red trash icon). <br>- Right mini calendar: November 2026, Day 10 lilac, Day 11 light green, legend: pink dot "Blocked", light green dot "Custom hours". |

---

## 14. Screen 13: 14-Day Preview (List & Calendar Views)

Frames: `ref/me2/0185.png`, `0195.png`, `0205.png`, `0215.png`

| View State | Specification |
|---|---|
| **Preview Tab Header** | Title: "14-Day Preview", subtitle "How bookers see your availability", right segmented button: `= List` / `Calendar`. |
| **List View** | - Daily rows: Day name & number on left (`TUE 10`, `WED 11`, `THU 12`...). <br>- Time chips: lilac pills `#F5EEFF` with purple text `#7014D9` (`9:00 AM`, `9:30 AM`...). <br>- "+8 more" button: clicking on Tue 10 expands all remaining slots (`12:00 PM` to `4:30 PM`) and shows "Show less". <br>- Wed 11 shows `+10 more` chips (due to the added 5–6 PM override). <br>- Scrolling down shows `SAT 21` (slots up to 12:30 PM), `SUN 22` (grey italic "Unavailable"), `MON 23`. |
| **Calendar View** | Switching to `Calendar` renders 14-day grid: <br>- Headers: `SUN MON TUE WED THU FRI SAT`. <br>- Tiles: rounded-2xl cards `#FBF8FF` with border border-purple-100. Day number bold at top, count number below (`TUE 10` has `16`, `WED 11` has `18`, `SAT 14` has `8`, `SUN` days grey with no count). |

---

## 15. Screen 14: Calendar View (`snaarp.me/calendar`)

Frames: `ref/me2/0220.png`, `0230.png`, `0245.png`

| View State | Specification |
|---|---|
| **Calendar Header** | Title: "Calendar", subtitle "Schedule personal events, and view bookings, connected calendars, and Snaarp Meet meetings". <br>- Tags: `• Snaarp Me` (purple dot), `• Snaarp Meet` (blue dot). <br>- Nav controls: `<` `>` `Today` `November 2026`. <br>- View toggle: `Month` / `Week` / `Day`. <br>- Action buttons: Purple `Schedule event`, Outline `* Connect Calendar`. |
| **Right Column** | Width: `320px`. <br>- **Upcoming** (badge `2`): Standup Meeting with developers (Today 11:30 AM), Creative meeting with the Team (Tomorrow 11:30 AM). <br>- **Calendar Integrations**: Snaarp Meet (Connected, red Disconnect), Google Calendar (Not connected, Connect), Outlook Calendar (Not connected, Connect), Apple Calendar (Not connected, Soon). |
| **Week View** | Header: `November 8 – November 14, 2026`. Columns: SUN 8, MON 9, TUE 10 (purple circle), WED 11, THU 12, FRI 13, SAT 14. Event blocks: TUE 10 has Standup, WED 11 has Creative meeting. |
| **Day View** | Header: `Tuesday, November 10, 2026`. Hourly grid with scrollable timeline (8 AM to 2 PM+). Blue block for Standup Meeting with developers (`11:30 AM – 12:00 PM`). |

---

## 16. Screen 15: Day Popup & Booking Details

Frames: `ref/me2/0255.png`, `0275.png`, `0285.png`

| Component | Specification |
|---|---|
| **Day Popup (`MeDayPopup`)** | Clicking Day 10 in Month view opens modal popup: <br>- Title: "Tuesday, November 10, 2026", close `X`. <br>- Subtitle: "1 event" (`text-xs text-gray-400`). <br>- Event row: blue vertical stripe, "Standup Meeting with developers", "Today • 11:30 AM – 12:00 PM", initials pill "CB" (Casey Brown). <br>- Footer buttons: "Close" and purple "View day schedule". |
| **Booking Details Modal** | Clicking Standup block shows 0.8s loading spinner, then opens full booking modal (`MeBookingModal.tsx`): Meeting details, Snaarp Meet conferencing URL with Copy button, Invitee details, purple "Join meeting", and "Close". |

---

## 17. Screen 16: Meetings Catalog (`snaarp.me/bookings`)

Frames: `ref/me2/0311.png`, `0315.png`, `0318.png`, `0320.png`, `0325.png`, `0335.png`, `0344.png`

| Feature / Tab | Specification |
|---|---|
| **Header** | Title: "Meetings", subtitle "Manage your scheduled meetings", right controls: sort button `Date (newest first)` with icon, view mode toggle `[Grid] [List]`. |
| **Tabs** | `Upcoming` | `Past` | `Cancelled` | `All`. Active tab has bottom underline. |
| **Upcoming Tab** | 2 confirmed cards: <br>1. Confirmed (green pill), `...`, John Smith (`john@example.com`), Creative meeting with the Team, `Wed, Nov 11 • 11:30 AM`, `30 min`. <br>2. Confirmed (green pill), `...`, Casey Brown (`casey@example.com`), Standup Meeting with developers, `Tue, Nov 10 • 11:30 AM`, `30 min`. |
| **Cancelled Tab** | Empty state card: large outline calendar icon, bold "No meetings found", subtitle "No cancelled meetings." |
| **All Tab (Grid View)** | 4 cards: the 2 upcoming confirmed meetings + 2 past meetings: <br>3. Confirmed: Sam Taylor (`sam@example.com`), 30 Minute Meeting, `Tue, Sep 22 • 12:00 PM`, `30 min`. <br>4. Rescheduled (orange pill): Sam Taylor (`sam@example.com`), 30 Minute Meeting, `Mon, Sep 21 • 10:30 AM`, `30 min`. |
| **List View** | Switching to list view renders compact horizontal rows with participant names, pills, meeting details, and three-dot menus. |
| **Sort Dropdown** | Clicking sort opens menu: `Date (newest first)` (check), `Date (oldest first)`, `A-Z`, `Z-A`. Testing `A-Z` reorders list, returning to `Date (newest first)` restores default order. |

---

## 18. Screen 17: Workflows Catalog (`snaarp.me/workflows`) — Step 14

Frames: `ref/me3/0002.png`, `0005.png`, `0015.png`

| Element | Specification |
|---|---|
| **Header** | Title: "Workflows" (font-bold text-2xl text-gray-900). Subtitle: "Manage booking confirmation emails, meeting reminders, and custom automation when events occur." (text-xs text-gray-500). <br>- Top right: Outline button `Custom workflow` (`border border-[#7014D9] text-[#7014D9] rounded-xl px-4 py-2 text-xs font-semibold`), Purple button `+ New Workflow` (`bg-[#7014D9] hover:bg-[#5e0eb8] text-white rounded-xl px-4 py-2 text-xs font-semibold`). |
| **Section 1: Booking emails & reminders** | Label: "Booking emails & reminders" (`text-sm font-bold text-gray-900`). <br>- **Card 1: Custom workflow**: Pill `Inactive` (`bg-gray-100 text-gray-600 rounded-full px-2 py-0.5 text-xs`), toggle OFF, purple button `Edit emails`, outline button `Logs`. Subtitle: "Automatic emails when someone books and before the meeting". Lilac box `EMAIL SCHEDULE` with 2 items: 1. Confirmation email when someone books, 2. Host notification when someone books on your calendar. <br>- **Card 2: Booking Confirmation & Reminder**: Pill `Active` (`bg-emerald-100 text-emerald-800 rounded-full px-2 py-0.5 text-xs`), toggle ON, purple button `Edit emails`, outline button `Logs`. Subtitle: "Automatic emails when someone books and before the meeting". Lilac box `EMAIL SCHEDULE` with 5 items: 1. Confirmation email when someone books, 2. Host notification when someone books on your calendar, 3. Reminder 24 hours before the meeting, 4. Reminder 1 hour before the meeting, 5. Reminder 15 minutes before the meeting. |
| **Section 2: Custom workflows** | Header: "Custom workflows" (`text-sm font-bold text-gray-900`), right button: outline `Custom workflow`. <br>- Empty state card (`border border-dashed border-gray-200 bg-white p-6 rounded-2xl`): "Build your own automation with emails, SMS, delays, or webhooks — without starting from a template.", purple button `Create custom workflow`. |

---

## 19. Screen 18: Template Chooser (`snaarp.me/workflows/create`) — Step 15

Frames: `ref/me3/0020.png`, `0025.png`, `0035.png`

| Element | Specification |
|---|---|
| **Header & Loading** | Clicking `+ New Workflow` shows 1.0s loading spinner with text "Loading templates...". <br>- Header: "Choose a workflow template", Subtitle: "Start from a ready-made template or write your own message.", Right: `<- Back` link. |
| **Custom Workflow Hero Card** | Lilac rounded border card (`border border-purple-200 bg-purple-50/20 p-5 rounded-2xl`): "Custom workflow", "Start from scratch. Pick a trigger and add your own email, SMS, delay, or webhook steps.", purple button on right `Create custom workflow`. |
| **Templates Grid (6 cards)** | Section header "Or use a template" (`text-xs font-bold text-gray-800`). <br>1. **Booking confirmation**: "Email the invitee as soon as they book, using booking details from the backend." Button: `Use this template`. <br>2. **Notify me when someone books**: "Email yourself when a new meeting is booked." Button: `Use this template`. <br>3. **Meeting reminder**: "Remind the invitee 24 hours before the meeting starts." Button: `Use this template`. <br>4. **Cancellation notice**: "Email the invitee when a booking is cancelled." Button: `Use this template`. <br>5. **After-meeting follow-up**: "Send a thank-you email after the meeting ends." Button: `Use this template`. <br>6. **No-show follow-up**: "Ask the invitee to reschedule if they missed the meeting." Button: `Use this template`. |

---

## 20. Screen 19: Workflow Editor (`snaarp.me/workflows/create`) — Step 15

Frames: `ref/me3/0045.png`, `0048.png`, `0055.png`

| Field / Section | Specification |
|---|---|
| **Header & Steps Title** | Title: "Workflow Steps" (`text-base font-bold text-gray-900`). |
| **Step 1: Send Email Card** | Top row: "Step 1: Send Email", controls on right: `^` (collapse), `v` (reorder), red `X` (delete). <br>- Action Type: `Send Email` (`bg-gray-50 border border-gray-200 rounded-xl px-4 py-2.5 text-xs text-gray-700`). <br>- Recipient: `Organizer` (or `Invitee` / `Both`). <br>- Email Provider: `System (Default)` ("Choose which email account sends this message"). <br>- Use backend booking details: Toggle ON (`bg-[#7014D9]`), subtitle "Fill names, times, meeting links, and other fields from the booking when the email is sent." <br>- Subject: `{{invitee_name}} just booked a meeting on your Snaarp Me` (`bg-gray-50 border border-gray-200 rounded-xl px-4 py-2.5 text-xs font-medium text-gray-800`). <br>- Insert merge field: `</> Insert Merge Field` link in purple. <br>- Body: Pre-filled multiline template text with merge fields. <br>- Bottom controls: `+ Add Condition`, dashed `+ Add Step`. <br>- Footer action: Purple button `Create Workflow` (`bg-[#7014D9] text-white rounded-xl px-6 py-2.5 text-xs font-semibold`). |

---

## 21. Screen 20: Activate/Deactivate Workflow — Step 16

Frames: `ref/me3/0070.png`, `0080.png`

| Action | Specification |
|---|---|
| **Toggle Off** | Clicking toggle on "Notify me when someone books": toggle moves left (gray), pill changes to `Inactive` (gray), top green banner displays: `\"Notify me when someone books\" deactivated successfully.` |
| **Toggle On** | Clicking toggle again: toggle moves right (purple), pill changes to `Active` (green), top green banner displays: `\"Notify me when someone books\" activated successfully.` |

---

## 22. Screen 21: Edit Emails & Reminders (`snaarp.me/workflows/<id>`) — Step 17

Frames: `ref/me3/0090.png`, `0100.png`, `0120.png`

| Section / Card | Specification |
|---|---|
| **Header** | `<- Back` link, "Booking emails & reminders" + `Active` pill, subtitle "Notify me when someone books". Outline buttons: `Deactivate` (amber border/text) and `View Logs` (gray border/text). |
| **Card 1: When someone books a meeting** | Subtitle: "These emails are sent automatically. Meeting links are included when available." Numbered list 1–2 (and 3–5 once reminders are enabled). |
| **Card 2: Booking confirmation** | Subtitle: "Sent right after someone books", toggle ON, link "Customize email". |
| **Card 3: Meeting reminders** | Subtitle: "Emails sent before the meeting starts". <br>- 24 hours before (Day-before reminder) -> Toggle. <br>- 1 hour before (Last-hour heads-up) -> Toggle. <br>- 15 minutes before (Right before the meeting) -> Toggle. <br>- Link: "Customize reminder email". |
| **Card 4: Send to** | Subtitle: "Who receives these emails", Recipient dropdown: `Both` (changed from `Organizer`). |
| **Footer Actions** | Link "Switch to advanced step editor", purple button `Save changes`. On click: top green banner `Workflow saved successfully.` and top list updates with 5 scheduled emails. |

---

## 23. Screen 22: Execution Logs (`snaarp.me/workflows/<id>/executions`) — Step 18

Frames: `ref/me3/0200.png`, `0210.png`, `0225.png`

| Feature | Specification |
|---|---|
| **Header** | `<- Back` link, "Execution Logs", subtitle "View the execution history for this workflow", right button `All Workflows`. |
| **Controls** | Status dropdown: `All Statuses` (with `Completed`, `Failed`, `Pending`, `Cancelled`), button `Refresh` with rotate icon. |
| **Empty State** | For empty workflow: "No execution logs found." |
| **Logs Table** | Headers: `INVITEE`, `STEP`, `STATUS`, `SCHEDULED AT`, `EXECUTED AT`, `ERROR`. <br>- Row 1: John Smith (`john@example.com`), Step 4, `failed` (red pill), 10/11/2026 12:30:08 PM, 10/11/2026 11:30:08 AM, `Email delivery failed via provider 'system': Missing '<'`. <br>- Row 2: John Smith, Step 6, `pending` (amber pill), 11/11/2026 10:30:00 AM, —, —. <br>- Row 3: John Smith, Step 1, `completed` (green pill), 10/11/2026 2:54:35 AM, 10/11/2026 2:54:35 AM, —. <br>- Row 4: John Smith, Step 8, `pending` (amber pill), 11/11/2026 11:15:00 AM, —, —. <br>- Row 5: Sam Taylor (`sam@example.com`), Step 2, `completed` (green pill), 10/11/2026 2:54:35 AM, 10/11/2026 2:54:35 AM, —. |

---

## 24. Screen 23: Custom Workflow Builder (`snaarp.me/workflows/create?custom=1`) — Step 19

Frames: `ref/me3/0260.png`, `0270.png`, `0280.png`, `0320.png`

| Form Control | Specification |
|---|---|
| **Workflow Details** | Workflow Name*: input typed with `Custom workflow`. <br>Trigger Event*: dropdown options `Booking Created`, `Booking Cancelled`, `Booking Rescheduled`, `Meeting Started` (selected), `Meeting Completed`, `No Show`. |
| **Workflow Step 1** | Action Type: `Send Email`. <br>Recipient: dropdown select `Both`. <br>Email Provider: `System (Default)`. <br>Use backend booking details: Toggle ON. <br>Subject: input typed with `Your {{event_title}}`. <br>Merge field menu: Invitee Name, Organizer Name, Event Title, Event Date, Event Time, Event Duration. <br>Body: `Hi {{invitee_name}}, Write your message here. Turn on backend booking details to insert names, times, and links automatically.` |
| **Save Result** | Clicking `Create Workflow` returns to Workflows: new row in "Custom workflows" section showing `Custom workflow`, `Active`, `Trigger: Meeting Started · 1 steps`, toggle ON, `Edit`, `Logs`, red `Delete`. |

---

## 25. Screen 24: Delete Workflow Modal — Step 20

Frames: `ref/me3/0355.png`, `0360.png`, `0365.png`

| Modal Element | Specification |
|---|---|
| **Title & Prompt** | Modal title "Delete Workflow", prompt: "Are you sure you want to delete **Custom workflow**? This action cannot be undone." |
| **Buttons** | Cancel (`text-gray-700`), red Delete (`bg-red-500 hover:bg-red-600 text-white rounded-xl px-5 py-2`). |
| **Success Banner** | Clicking Delete shows top green banner: `Workflow deleted successfully.` and returns Custom workflows to empty state. |

---

## 26. Screen 25: Contacts Main Catalog (`snaarp.me/contacts`) — Step 21

Frames: `ref/me3/0400.png`, `0405.png`, `0420.png`, `0430.png`

| Section / Element | Specification |
|---|---|
| **Header** | Title: "Contacts" (bold text-2xl). Top right: Export CSV icon (with tooltip "Export CSV"), settings gear icon, purple button `+ Add contact` with chevron. |
| **Tabs** | `My Contacts` | `Organization` | `Invitees`. |
| **Control Bar** | Search input: `Search by name and email`. Button `Show columns` (eye icon), button `Filter` (funnel icon). |
| **Filter Chips** | `All contacts` (dark pill when selected with checkmark), `New contacts`, `No activity in next 30d`, `No meetings in next 30d`, pencil edit icon, `+ Add list` purple link. |
| **My Contacts Tab** | Starts empty: "No contacts yet. Add one manually or upload a CSV." with pagination "No contacts". |
| **Organization Tab** | 18 sample colleagues (`Showing 1 - 18 of 18`), initial avatars, alphabetical order. |
| **Invitees Tab** | 3 rows: John Smith (`john@example.com`), Sam Taylor (`sam@example.com`), Design Team (`design@example.com`) with meeting dates. |

---

## 27. Screen 26: Show Columns & Filter Popovers — Step 22

Frames: `ref/me3/0460.png`, `0480.png`

| Popover | Specification |
|---|---|
| **Show Columns** | Dropdown with checkboxes: First name, Last name, Email (checked), Phone number (checked), Next meeting date (checked), Last meeting date (checked), First email date (greyed with `?`), Last email date (greyed with `?`), Created on. Unticking and re-ticking Phone number updates table columns. |
| **Filter** | Where row: Select field (Email), Select condition (contains), Enter value ("design"), Trash icon, `+ Add condition`, purple `Apply`. Applying filters table to only "Design Team". Removing condition restores all 3 rows. |

---

## 28. Screen 27: Add Contact Modal & CSV Upload — Step 23

Frames: `ref/me3/0520.png`, `0540.png`, `0550.png`

| Feature | Specification |
|---|---|
| **Add Contact Menu** | Clicking `+ Add contact` opens dropdown: `Add manually` and `Upload CSV`. |
| **Upload CSV Modal** | Title "Upload CSV", subtitle "Upload a CSV of your contact list. Required column: Email. Optional: Name, Phone, Company, Job Title." <br>- Box with "Choose File" and "No file chosen". <br>- In-app file chooser dialog: shows sample file `sample-contacts.csv`. Picking it updates file name. <br>- Click `Upload CSV`: top green banner `Contacts imported successfully.` |
| **Add Manually Modal** | Title "Add contact", close `X`. <br>- Fields: First name * (`Jordan`), Last name (`Lee`), Email * (`jordan.lee@example.com`), Phone (`+44 7700 900123`), Company (`Acme Studio`), Job title (`CEO`), Location (`London, United Kingdom`), LinkedIn. <br>- Footer: Cancel, purple `Add contact`. <br>- On save: green banner `Jordan Lee was added.` Contact appears in My Contacts table. Search query `design@example.com` or `jordan.lee@example.com` filters to matching row. |

---

## 29. Screen 28: Custom Field Drawer (`snaarp.me/contacts`) — Step 24

Frames: `ref/me3/0650.png`, `0660.png`

| Drawer Control | Specification |
|---|---|
| **Slide-out Drawer** | Title "Create a custom field", subtitle "Custom fields will be applied to all contact records.", close `X`. |
| **Field Type** | Dropdown: `Text` (selected). Options: `Invitee question (from event types)`, `Text`, `Number`, `Currency`, `Tags`, `Date`, `Select`. |
| **Field Label** | Input typed with `Job`. Create button activates (`bg-[#7014D9] text-white`). |
| **Result** | Clicking Create: drawer closes, green banner `\"Job\" field created.` appears, and "Job" column is appended to table. |

---

## 30. Screen 29: Manage Column & Export Contacts — Steps 25 & 26

Frames: `ref/me3/0670.png`, `0685.png`, `0702.png`

| Feature | Specification |
|---|---|
| **Column Three-dot Menu** | Clicking three dots on "Job" header opens menu: `^ Sort ascending`, `v Sort descending`, `Hide column`, red `Delete field`. Click `Sort descending`, then click `Delete field`. |
| **Delete Field Confirm Modal** | In-app confirmation modal (replaces native browser confirm): "Delete the \"Job\" field? Values stored on every contact will be removed." Buttons: `Cancel` and red `OK`. On click: green banner `\"Job\" field deleted.` and column is removed. |
| **Export CSV** | Hovering Export CSV icon shows tooltip "Export CSV". Clicking icon triggers in-app green banner `Contacts export started. Your CSV will download shortly.` Concludes with 1.5s finish hold and completion card. |

---

## 31. Screen 30: Meet Analytics (`snaarp.me/analytics`) — Step 27

Frames: `ref/me4/0002.png`, `0012.png`, `0025.png`

| Section / Element | Specification | Frame Reference |
|---|---|---|
| **Header** | Title: "Meet Analytics" (`text-2xl font-bold text-gray-900`). Subtitle: "Track your booking performance and team metrics." (`text-sm text-gray-500`). | `ref/me4/0002.png` |
| **Filter Card** | White card `bg-white border border-gray-200 rounded-2xl p-4 flex items-center justify-between shadow-sm`. <br>• Left: Period buttons in a bordered pill group (`border border-gray-200 rounded-xl p-1 flex gap-1 bg-gray-50/50`). Buttons: `Today` (active `#7014D9` bg, text-white, font-semibold rounded-lg px-3 py-1.5 text-xs), `7 Days`, `30 Days`, `90 Days`, `Custom` (`text-gray-600 hover:text-gray-900 px-3 py-1.5 text-xs font-medium`). <br>• Right: Source dropdown (label "Source" `text-xs text-gray-400`, pill button showing "All Sources" with chevron; opens dropdown with "All Sources" ✓, "Web", "API", "Embed") and Event Type ID filter box (label "Event Type ID" `text-xs text-gray-400`, input with placeholder "Filter by event type", `border border-gray-200 rounded-lg px-3 py-1.5 text-xs`). | `ref/me4/0002.png`, `0012.png` |
| **4 Stat Cards** | 4-column grid `grid grid-cols-4 gap-4 mt-6`. Each card `bg-white border border-gray-200 rounded-2xl p-5 shadow-sm flex flex-col justify-between`. <br>1. **Total Bookings**: Top row with title "Total Bookings" (`text-xs font-medium text-gray-500 uppercase tracking-wider`) and lilac calendar icon in square `#F5EEFF`. Big number: "2" (`text-3xl font-bold text-gray-900`). <br>2. **Cancellations**: Title "Cancellations" with red/rose icon. Big number: "0". <br>3. **No-Shows**: Title "No-Shows" with amber icon. Big number: "0". <br>4. **Completion Rate**: Title "Completion Rate" with green checkmark icon. Big number: "0%". | `ref/me4/0002.png` |
| **Bookings Over Time** | Card `bg-white border border-gray-200 rounded-2xl p-5 shadow-sm`. Title "Bookings Over Time" (`text-base font-bold text-gray-900`). Chart area: Left y-axis with labels "2" and "0". Bottom x-axis with label "2026-11-10". Line/point with purple dot at 2. | `ref/me4/0002.png`, `0025.png` |
| **Popular Time Slots** | Card `bg-white border border-gray-200 rounded-2xl p-5 shadow-sm`. Title "Popular Time Slots" (`text-base font-bold text-gray-900`). Heatmap matrix: Rows for `Sun`, `Mon`, `Tue`, `Wed`, `Thu`, `Fri`, `Sat`. Columns for hours `6:00`, `9:00`, `12:00`, `15:00`, `18:00`. Tuesday 9:00 cell is dark purple `#7014D9`. All others are neutral light gray `#F3F4F6`. Bottom legend: "Less" [4 gradient squares from light gray to purple] "More". | `ref/me4/0025.png` |
| **Top Performers** | Card `bg-white border border-gray-200 rounded-2xl p-5 shadow-sm`. Title "Top Performers" (`text-base font-bold text-gray-900`). Empty state: "No performer data available for this period." (`text-sm text-gray-400 py-8 text-center`). | `ref/me4/0025.png` |

---

## 32. Screen 31: Meet Integrations Hub (`snaarp.me/integrations`) — Step 28

Frames: `ref/me4/0034.png`, `0112.png`

| Section / Element | Specification | Frame Reference |
|---|---|---|
| **Header** | Title: "Meet Integrations" (`text-2xl font-bold text-gray-900`). Subtitle: "Connect your favourite tools to Snaarp Me to automate scheduling, sync calendars, and streamline workflows." (`text-sm text-gray-500`). | `ref/me4/0034.png` |
| **Hub Grid** | 2x2 grid of cards (`grid grid-cols-2 gap-6 mt-6`). Each card `bg-white border border-gray-200 rounded-2xl p-6 shadow-sm hover:border-[#7014D9]/40 hover:shadow-md cursor-pointer transition-all flex items-start justify-between`. <br>• **Card 1: Calendars**: Lilac calendar icon tile `bg-purple-50 text-[#7014D9] p-3 rounded-xl`. Heading "Calendars" (`text-lg font-bold text-gray-900`), subtitle "Connect Google Calendar, Outlook, or Exchange" (`text-sm text-gray-500 mt-1`). Right chevron arrow `->`. <br>• **Card 2: Video Conferencing**: Mint/lilac video icon tile `p-3 rounded-xl`. Heading "Video Conferencing" (`text-lg font-bold text-gray-900`), subtitle "Connect Zoom, Google Meet, Microsoft Teams, or Snaarp Meet" (`text-sm text-gray-500 mt-1`). Right chevron arrow `->`. <br>• **Card 3: Payments**: Amber/lilac credit card icon tile `p-3 rounded-xl`. Heading "Payments" (`text-lg font-bold text-gray-900`), subtitle "Connect Stripe or PayPal for paid bookings" (`text-sm text-gray-500 mt-1`). Right chevron arrow `->`. <br>• **Card 4: APPS and CRM**: Blue/lilac grid icon tile `p-3 rounded-xl`. Heading "APPS and CRM" (`text-lg font-bold text-gray-900`), subtitle "Connect Salesforce or HubSpot" (`text-sm text-gray-500 mt-1`). Right chevron arrow `->`. | `ref/me4/0034.png` |

---

## 33. Screen 32: Calendar Integrations (`snaarp.me/integrations/calendars`) — Step 29

Frames: `ref/me4/0040.png`, `0045.png`

| Section / Element | Specification | Frame Reference |
|---|---|---|
| **Back Button** | Link `< Back to Integrations` (`text-sm font-medium text-gray-600 hover:text-gray-900 flex items-center gap-1.5 mb-3`). | `ref/me4/0040.png` |
| **Header** | Title: "Calendar Integrations" (`text-2xl font-bold text-gray-900`). Subtitle: "Connect your calendars to sync events and check availability." (`text-sm text-gray-500`). | `ref/me4/0040.png` |
| **Cards List** | Vertical stack of 4 integration cards (`flex flex-col gap-4 mt-6`). Each card `bg-white border border-gray-200 rounded-2xl p-5 shadow-sm flex items-center justify-between`. <br>1. **Snaarp Meet**: Left: Purple Snaarp Meet icon mark in tile, Title "Snaarp Meet" (`font-bold text-base text-gray-900`), badge "Connected" (`bg-green-100 text-green-700 text-xs px-2.5 py-0.5 rounded-full font-medium ml-2`), email "jane@example.com" (`text-xs text-gray-500 mt-0.5`). Right: "Disconnect" button (`border border-red-200 text-red-600 hover:bg-red-50 px-4 py-1.5 rounded-lg text-xs font-semibold`). <br>2. **Google Calendar**: Left: Google Calendar logo mark, Title "Google Calendar", description "Connect your Google Calendar to sync events and check availability." Right: "Connect" button (`bg-[#7014D9] hover:bg-[#5B0FB3] text-white px-5 py-2 rounded-xl text-xs font-semibold`). <br>3. **Microsoft Outlook**: Left: Outlook logo mark, Title "Microsoft Outlook", description "Connect your Microsoft Outlook calendar to sync events and check availability." Right: "Connect" button (`bg-[#7014D9] text-white px-5 py-2 rounded-xl text-xs font-semibold`). <br>4. **Microsoft Exchange**: Left: Exchange logo mark, Title "Microsoft Exchange", description "Connect your Microsoft Exchange calendar to sync events and check availability." Right: "Connect" button (`bg-[#7014D9] text-white px-5 py-2 rounded-xl text-xs font-semibold`). | `ref/me4/0040.png`, `0045.png` |

---

## 34. Screen 33: Video Conferencing (`snaarp.me/integrations/video`) — Step 30

Frames: `ref/me4/0060.png`, `0065.png`

| Section / Element | Specification | Frame Reference |
|---|---|---|
| **Back Button** | Link `< Back to Integrations` (`text-sm font-medium text-gray-600 hover:text-gray-900 flex items-center gap-1.5 mb-3`). | `ref/me4/0060.png` |
| **Header** | Title: "Video Conferencing" (`text-2xl font-bold text-gray-900`). Subtitle: "Connect your video conferencing accounts to automatically generate meeting links for bookings" (`text-sm text-gray-500`). | `ref/me4/0060.png` |
| **Cards List** | Vertical stack of 3 video integration cards (`flex flex-col gap-4 mt-6`). <br>1. **Snaarp Meet**: Card `bg-white border border-gray-200 rounded-2xl p-5 shadow-sm`. Top row: Snaarp Meet logo, title "Snaarp Meet", badge "Connected" (`bg-green-100 text-green-700 text-xs px-2.5 py-0.5 rounded-full font-medium`). Description: "Use Snaarp Meet to automatically create meeting rooms for your Snaarp Me bookings". Gray details box `bg-gray-50 rounded-xl p-3 mt-3 flex items-center justify-between border border-gray-100`: Left labels "Account ID: acct-sample-0001" and "Email: jane@example.com" (`text-xs text-gray-600 font-mono`). Right: "Disconnect" button (`border border-red-200 text-red-600 hover:bg-red-50 px-4 py-1.5 rounded-lg text-xs font-semibold`). <br>2. **Zoom**: Card `bg-white border border-gray-200 rounded-2xl p-5 shadow-sm flex items-center justify-between`. Left: Zoom logo mark, title "Zoom" (`font-bold text-base text-gray-900`), description "Connect your Zoom account to automatically create meeting links for your bookings" (`text-xs text-gray-500 mt-0.5`). Right: "Connect" button (`bg-[#7014D9] text-white px-5 py-2 rounded-xl text-xs font-semibold`). <br>3. **Google Meet**: Card `bg-white border border-gray-200 rounded-2xl p-5 shadow-sm flex items-center justify-between`. Left: Google Meet logo mark, title "Google Meet" (`font-bold text-base text-gray-900`), description "Create Google Meet links for bookings using your connected Google Calendar" (`text-xs text-gray-500 mt-0.5`). Right: badge or info "Uses connected Google Calendar" (`text-xs text-gray-400 bg-gray-100 px-3 py-1.5 rounded-lg`). | `ref/me4/0060.png`, `0065.png` |

---

## 35. Screen 34: Payments (`snaarp.me/integrations/payments`) — Step 31

Frames: `ref/me4/0075.png`, `0082.png`

| Section / Element | Specification | Frame Reference |
|---|---|---|
| **Back Button** | Link `< Back to Integrations` (`text-sm font-medium text-gray-600 hover:text-gray-900 flex items-center gap-1.5 mb-3`). | `ref/me4/0075.png` |
| **Header** | Title: "Payments" (`text-2xl font-bold text-gray-900`). Subtitle: "Connect payment providers, configure pricing for event types, and manage payment history" (`text-sm text-gray-500`). | `ref/me4/0075.png` |
| **Payment Providers** | Section heading: "Payment Providers" (`text-base font-bold text-gray-900 mt-6 mb-3`). 2-column grid `grid grid-cols-2 gap-4`. <br>• **Stripe Card**: Stripe logo mark, title "Stripe", description "Accept credit card payments through Stripe. Supports one-time and recurring payments." Right/bottom button: "Connect Stripe" (`bg-[#7014D9] text-white px-4 py-2 rounded-xl text-xs font-semibold`). <br>• **PayPal Card**: PayPal logo mark, title "PayPal", description "Accept payments via PayPal. Invitees can pay with their PayPal account or credit card." Right/bottom button: "Connect PayPal" (`bg-[#7014D9] text-white px-4 py-2 rounded-xl text-xs font-semibold`). | `ref/me4/0075.png` |
| **Event Type Pricing** | Section heading: "Event Type Pricing" (`text-base font-bold text-gray-900 mt-8 mb-3`). Table container `bg-white border border-gray-200 rounded-2xl shadow-sm overflow-hidden`. 3 rows: <br>1. "Creative meeting with the Team" · "30 min" · Require Payment toggle (off/on switch) · "Edit Price" button (`text-xs text-[#7014D9] font-medium hover:underline`). <br>2. "Standup Meeting with developers" · "30 min" · Require Payment toggle (off) · "Edit Price" button. <br>3. "30 Minute Meeting" · "30 min" · Require Payment toggle (off) · "Edit Price" button. | `ref/me4/0075.png`, `0082.png` |
| **Payment History** | Section heading: "Payment History" (`text-base font-bold text-gray-900 mt-8 mb-3`). Card `bg-white border border-gray-200 rounded-2xl p-8 shadow-sm text-center`. Text: "No payments recorded yet." (`text-sm text-gray-400`). | `ref/me4/0075.png` |

---

## 36. Screen 35: Apps and CRM Integrations (`snaarp.me/integrations/crm`) — Step 32

Frames: `ref/me4/0091.png`, `0095.png`, `0105.png`, `0112.png`

| Section / Element | Specification | Frame Reference |
|---|---|---|
| **Loading State** | 1.0 second centered loading spinner with subtitle "Loading integrations..." before rendering page. | `ref/me4/0091.png` |
| **Back Button** | Link `< Back to Integrations` (`text-sm font-medium text-gray-600 hover:text-gray-900 flex items-center gap-1.5 mb-3`). | `ref/me4/0095.png` |
| **Header** | Title: "Apps and CRM Integrations" (`text-2xl font-bold text-gray-900`). Subtitle: "Connect your CRM, email, and integration tools to automatically sync booking data and send workflow emails from your own accounts" (`text-sm text-gray-500`). | `ref/me4/0095.png` |
| **CRM Platforms** | Section heading: "CRM Platforms" (`text-base font-bold text-gray-900 mt-6 mb-3`). 2-column grid of 8 cards. Platforms: Salesforce, HubSpot, Mailchimp, Dynamics 365, Zoho CRM, ActiveCampaign, Pipedrive, Freshsales. Each card: Brand logo mark, title, description (e.g. "Sync booking data and contacts with Salesforce"), right status badge "Not Connected" (`bg-gray-100 text-gray-600 text-xs px-2.5 py-0.5 rounded-full font-medium`) and purple "Connect" button (`bg-[#7014D9] text-white px-4 py-1.5 rounded-xl text-xs font-semibold`). | `ref/me4/0095.png` |
| **Enrichment & Intelligence** | Section heading: "Enrichment & Intelligence" (`text-base font-bold text-gray-900 mt-8 mb-3`). 2 cards: Gong, LinkedIn Sales Navigator. Each with logo mark, title, description, "Not Connected", and purple "Connect" button. | `ref/me4/0105.png` |
| **Form Integrations** | Section heading: "Form Integrations" (`text-base font-bold text-gray-900 mt-8 mb-3`). 2 cards: Typeform, JotForm. Each with logo mark, title, description, "Not Connected", and purple "Connect" button. | `ref/me4/0105.png` |
| **Email Delivery** | Section heading: "Email Delivery" (`text-base font-bold text-gray-900 mt-8 mb-3`). 1 card: Postal. Logo mark, title, description, "Not Connected", and purple "Connect" button. | `ref/me4/0105.png` |
| **Workflow Email Accounts** | Section heading: "Workflow Email Accounts" (`text-base font-bold text-gray-900 mt-8 mb-1`), subtitle: "Send workflow emails (confirmations, reminders, follow-ups) from your own email account" (`text-xs text-gray-500 mb-3`). 2 cards: Gmail, Outlook. Each with logo mark, title, description, "Not Connected", and purple "Connect" button. | `ref/me4/0105.png` |
| **Completion Transition** | Clicking `< Back to Integrations` returns to Hub. 1.5s pause, then transition to completion card ("Tour complete"). | `ref/me4/0112.png` |


