# UI Match: Snaarp CRM

Design lock and side-by-side audit notes for Snaarp CRM:
- Part 1 (steps 1–6): `C:\Users\HP\Downloads\1119.mp4` (1444x720, 3:25).
- Part 2 (steps 7–12): `C:\Users\HP\Downloads\1119(1).mp4` (1444x720, 4:37).
- Part 3 (steps 13–17): `C:\Users\HP\Downloads\1119(2).mp4` (1340x720, 3:39).
- Part 4 (steps 18–22): `C:\Users\HP\Downloads\1119(3).mp4` (1386x720, 3:44).
- Part 5 (steps 23–26): `C:\Users\HP\Downloads\1119(4).mp4` (1392x720, 2:59).
- Part 6 (steps 27–29): `C:\Users\HP\Downloads\1120.mp4` (1384x720, 1:44).
- Part 7 (steps 30–34): `C:\Users\HP\Downloads\1120(2).mp4` (1390x720, 5:19).

---

## Step 1: CRM overview and navigation (0:00–0:15)

URL: `crm.snaarp.com/home`
Route: `/tutorials/crm`
View: CRM Home Dashboard

### UI Elements & Specifications

| Element | Position / Layout | Size | Colors | Typography / Content | State |
| :--- | :--- | :--- | :--- | :--- | :--- |
| **Suite Rail** | Leftmost column | 56px wide, 100% height | Bg: `#FFFFFF`, border-r: `#ECECF1` | Logos: Mail, Meets, Teams, One Cardx, Sheets, Docs, Slides, PDF, Lock, Sign, Drive, Logout. CRM active at top | CRM icon highlighted with `#7C3AED` accent |
| **Top Bar** | Top horizontal header | 56px height, full width | Bg: `#FFFFFF`, border-b: `#ECECF1` | Left: Menu button, CRM logo + "CRM" (`#111111`, bold 16px). Center: search input. Right: Add Users, Alerts (badge 8), 9-dot grid, User avatar | Search placeholder: "Search contacts..." |
| **CRM Sidebar** | Left column next to suite rail | 240px wide, flex col | Bg: `#FFFFFF`, border-r: `#ECECF1` | Home, Dashboards, CRM > Sales (Prospects, Forecasts, Won, Lost), Activities, Calls, Contacts, Messages, Automations, MANAGE > Analytics, Reports, My Requests, Settings, Report a Bug, Admin Panel | `Home` active: `#F3ECFC` bg, purple text & icon |
| **Page Header** | Top of main dashboard | Pinned top, p-6 | Text: `#111111` & `#6B7280` | Heading: "Dashboard" (bold 22px), Subtitle: "Your CRM at a glance" (13px) | Default |
| **Metric Cards Grid** | Main content area | 4 columns grid, gap-5 | Bg: `#FFFFFF`, rounded-[16px], border `#ECECF1` | 4 cards: CONTACTS (59 / Total contacts), DEALS (32 / Active deals), EMAILS (0 / Sent this month), TASKS (0 / Due today) | Static metric overview |

---

## Step 2: Explore CRM dashboards (0:15–0:30)

URL: `crm.snaarp.com/dashboards`
View: CRM Dashboards Section (`My Dashboard` active)

### UI Elements & Specifications

| Element | Position / Layout | Size | Colors | Typography / Content | State |
| :--- | :--- | :--- | :--- | :--- | :--- |
| **Dashboards Subnav** | Column between sidebar and content | 220px wide | Bg: `#FFFFFF`, border-r: `#ECECF1` | Header: `<< Dashboards` with `+` button. List: `PR sales` (0 widgets), `My Dashboard` (8 widgets) with trash icons | `My Dashboard` selected: `#F3ECFC` bg, purple text |
| **Dashboard Header** | Top of content area | Flex row justify-between | Heading `#111111`, buttons | "My Dashboard" (bold 20px), "8 widgets · Last updated 8/7/2026" (12px). Actions: `TV Mode`, `Share`, `Edit` (purple pill) | View mode |
| **KPI Card Widget** | Top row left | Col span 1 | Bg: `#FFFFFF`, rounded-[16px], border `#ECECF1` | Title: `KPI CARD` (11px gray), Value: `25` (bold 28px), Label: `KPI Card` | Displaying 25 |
| **Bar Chart Widget** | Top row right | Col span 2 | Bg: `#FFFFFF`, rounded-[16px], border `#ECECF1` | Title: `BAR CHART`. Horizontal purple bars: `Event_leads` (15), `Lead` (6) | Displaying bars |
| **Donut Chart Widget** | Second row left | Col span 1 | Bg: `#FFFFFF`, rounded-[16px], border `#ECECF1` | Title: `DONUT CHART`. Center count: `25`. Legend on right: Event_leads (15), Lead (6), New (2), Proposal (2) | Donut slices matching legend |
| **Line Chart Widget** | Second row right | Col span 2 | Bg: `#FFFFFF`, rounded-[16px], border `#ECECF1` | Title: `LINE CHART`. Smooth downward slope curve from 15 to 2 | Curve rendered |
| **Pie Chart Widget** | Third row left | Col span 1 | Bg: `#FFFFFF`, rounded-[16px], border `#ECECF1` | Title: `PIE CHART`. Slices breakdown + legend: Event_leads (15), Lead (6), New (2), Proposal (2) | Pie chart rendered |
| **Funnel Widget** | Third row right | Col span 2 | Bg: `#FFFFFF`, rounded-[16px], border `#ECECF1` | Title: `FUNNEL`. 4 horizontal gradient bars: event_leads (15), lead (6), new (2), proposal (2) | Funnel bars |
| **Heatmap Widget** | Fourth row full width | Full width | Bg: `#FFFFFF`, rounded-[16px], border `#ECECF1` | Title: `HEATMAP`. Days: Sun–Sat. Hours: 0h to 21h grid blocks with intensity shades | Grid rendered |
| **Table Widget** | Scrollable below | Full width | Bg: `#FFFFFF`, rounded-[16px], border `#ECECF1` | Title: `TABLE`. Columns: STATUS, VALUE. Rows: Event_leads (15), Lead (6) | Table rows |

---

## Step 3: Create a custom dashboard (0:30–0:48)

URL: `crm.snaarp.com/dashboards`
View: New Dashboard Modal & Empty State

### UI Elements & Specifications

| Element | Position / Layout | Size | Colors | Typography / Content | State |
| :--- | :--- | :--- | :--- | :--- | :--- |
| **Create Button (`+`)** | Dashboards subnav header right | 28x28px circular/square | Text `#6B7280`, hover `#111111` | Plus `+` icon | Clickable |
| **New Dashboard Modal** | Centered modal dialog | 440px wide | Bg: `#FFFFFF`, rounded-[20px], shadow-2xl | Title: "New Dashboard" (bold 18px), Input: rounded-full pill with light border, Buttons: `Cancel` and `Create` (purple pill) | Active typing "Client Leads" |
| **Toast Notification** | Top right floating | Auto width | Bg: `#D1FAE5`, border `#A7F3D0`, text `#065F46` | Green circle check + "Dashboard created" | Slides in and persists 3s |
| **Empty Dashboard State** | Main content area | Full width, dashed border | Dashed border `#D1D5DB`, bg `#F9FAFB` | Icon: 4-square grid, "Empty Dashboard" (bold 16px), "Add widgets to build your custom dashboard" (13px), `+ Add First Widget` button | Empty state visible |
| **Header Action Buttons** | Top right of dashboard | Row | `+ Add Widget`, `Save` (purple), `Cancel`, trash icon | Edit mode action buttons | Visible |

---

## Step 4: Add and save dashboard widgets (0:48–1:57)

URL: `crm.snaarp.com/dashboards/client-leads`
View: Add Widgets Modal & Populated Custom Dashboard

### UI Elements & Specifications

| Element | Position / Layout | Size | Colors | Typography / Content | State |
| :--- | :--- | :--- | :--- | :--- | :--- |
| **Add Widgets Modal** | Centered modal overlay | 640px wide, max-h-[85vh] | Bg: `#FFFFFF`, rounded-[20px], shadow-2xl | Header: "Add Widgets" (bold 18px), "Select as many as you like, then add them all at once.", close button | Open overlay |
| **Widget Option Cards** | 2-column grid in modal | 11 options | Border `#E5E7EB`, hover `#F3F4F6` | KPI Card, Bar Chart, Line Chart, Pie Chart, Donut Chart, Funnel, Gauge, Table, Leaderboard, Heatmap, Custom Widget | Selected cards get purple border & checkmark badge |
| **Add Button in Modal** | Modal footer right | Pill button | Bg: `#7014D9`, text white | `+ Add N widget(s)` (dynamic count: "Add 4 widgets", "Add 1 widget") | Clickable |
| **Client Leads Dashboard (6 Widgets)** | Main canvas | Row 1: KPI (1), Bar (2), KPI (1). Row 2: Pie (1), Line (2). Row 3: Table (3) | White cards, rounded-[16px], border `#ECECF1` | KPI: 25. Bar: Event_leads (15), Lead (6), New (2), Proposal (2). Pie: 4 slices. Line: trend curve. Table: STATUS & VALUE rows | All 6 widgets populated |
| **Save Action** | Top header right | Pill button | Bg: `#7014D9`, text white, diskette icon | "Save" button | Clicked -> saves dashboard |
| **Saved Toast** | Top right floating | Auto width | Bg: `#D1FAE5`, border `#A7F3D0`, text `#065F46` | Green checkmark + "Dashboard saved" | Displayed on save |

---

## Step 5: Share and present the dashboard (1:57–2:48)

URL: `crm.snaarp.com/dashboards/client-leads`
View: Share Dashboard Dialog & Full-Screen TV Mode

### UI Elements & Specifications

| Element | Position / Layout | Size | Colors | Typography / Content | State |
| :--- | :--- | :--- | :--- | :--- | :--- |
| **Share Button** | Header top right | Text button with share icon | Text `#374151`, hover `#111111` | Share icon + "Share" | Clickable |
| **Share Modal** | Centered modal dialog | 420px wide | Bg: `#FFFFFF`, rounded-[20px], shadow-2xl | Title: "Share Dashboard", Subtitle: "Choose which roles can view this dashboard", Role options: Everyone in organization, Admin, Manager, Member, Viewer | `Everyone in organization` selected with light purple highlight |
| **Save Share Button** | Modal footer | Purple pill | Bg: `#7014D9`, text white | "Save" | Clicked -> toast "Sharing updated" |
| **TV Mode Button** | Header top right | Text button with TV icon | Text `#374151`, hover `#111111` | TV icon + "TV Mode" | Clickable |
| **TV Mode Layout** | Full container overlay | 100% width, 100% height | Bg: `#581C87` (rich purple) | Header: "Client Leads" (white bold 20px), "Auto-refreshing · 11/19/2026, 2:27:06 AM". Controls: Pause `||` pill, `Exit TV Mode` black pill | Full presentation view |
| **TV Mode Widget Cards** | Grid matching dashboard | Same 6 widget arrangement | Bg: `#1E293B`, rounded-[16px] | Dark theme versions of KPI Card, Bar Chart, Line Chart, Pie Chart, Table | Rendered on purple canvas |
| **Exit TV Mode** | Header top right | Pill button | Bg: `#111827`, text white | "Exit TV Mode" | Clicked -> returns to standard dashboard |

---

## Step 6: View and sort CRM prospects (2:48–3:25)

URL: `crm.snaarp.com/sales/prospects`
View: Prospects Pipeline (Kanban, List, Grid views & Sorting)

### UI Elements & Specifications

| Element | Position / Layout | Size | Colors | Typography / Content | State |
| :--- | :--- | :--- | :--- | :--- | :--- |
| **Sales Navigation** | CRM sidebar | Subnav under CRM | Text `#374151`, active `#7014D9` | Click `Sales` -> expand subitems: `Prospects`, `Forecasts`, `Won`, `Lost` | `Prospects` active |
| **Prospects Header** | Top of main canvas | Flex row justify-between | Heading `#111111`, controls | "Prospects" (bold 20px), "Sales Pipeline v" pill, "3 open prospects" subtitle | Default |
| **View Switcher** | Top right controls | Segmented button group | Bg: `#F3F4F6`, rounded-[10px] | `Kanban` (icon + text), `List` (icon + text), `Grid` (icon + text) | Active pill gets `#EDE9FE` / purple text |
| **Sort Dropdown** | Beside view switcher | Pill button | Bg: `#FFFFFF`, border `#E5E7EB` | `↑↓ Most recent v` | Click opens 6-item menu |
| **Sort Menu** | Dropdown popover | 180px wide | Bg: `#FFFFFF`, rounded-[12px], shadow-xl | Most recent, Oldest, Name (A-Z), Name (Z-A), Value (high-low), Value (low-high) | `Name (A-Z)` selected |
| **Kanban Columns** | Horizontal scroll row | 5+ columns, min-w-[240px] each | Bg: `#F9FAFB`, rounded-[16px] | Event Leads (coral dot, 1 contact · 10%), Lead (blue dot, 1 contact · 5%), Proposal (purple dot, 1 contact · 10%), Presentation (0), Awaiting Response (0) | Horizontally scrollable |
| **Prospect Cards** | Inside stage columns | Full column width | Bg: `#FFFFFF`, rounded-[12px], border `#E5E7EB` | Avatar (ST, CB, JL), Name, Three dots, Action buttons row: `Email`, `Call`, `SMS`, `WhatsApp` pills | 3 cards populated |
| **List View Table** | When List view clicked | Full width table | Bg: `#FFFFFF`, rounded-[16px], border `#E5E7EB` | Columns: Checkbox, Name, Stage (dropdown pill), Value (`-`), Contact (email/phone), Actions (`Won`, `Lost`, `:`) | Tabular list |
| **Grid View Cards** | When Grid view clicked | 3-column card grid | Bg: `#FFFFFF`, rounded-[16px], border `#E5E7EB` | Checkbox, Avatar, Name, bullet + stage name, stage selector dropdown at bottom | Card grid |

---

## Step 7: Import prospects from CSV (0:00–0:55)

URL: `crm.snaarp.com/sales/prospects`
Route: `/tutorials/crm`
View: Prospects Pipeline & 4-Stage CSV Import Modal
Source recording: `C:\Users\HP\Downloads\1119(1).mp4` (0:00–0:55)

### UI Elements & Specifications

| Element | Position / Layout | Size | Colors | Typography / Content | State |
| :--- | :--- | :--- | :--- | :--- | :--- |
| **Import Button** | Top header right beside view options | Pill button | Bg: `#FFFFFF`, border `#E5E7EB`, text `#374151` | Upload icon + "Import" | Clicked -> opens import modal |
| **Import Modal Dialog** | Centered modal overlay | 760px wide, max-h-[90vh] | Bg: `#FFFFFF`, rounded-[20px], shadow-2xl | Header: "Import Prospects" + close button. 4-step wizard indicator | Open overlay |
| **Wizard Step Indicator** | Top of modal body | 4 steps horizontal row | Numbers in circles, text | 1 Upload, 2 Map Columns, 3 Review, 4 Complete | Stage indicator highlights active step |
| **Stage 1 (Upload)** | Modal central body | Dashed dropzone | Border `#D1D5DB`, bg `#F9FAFB` | Upload icon, "Click to upload or drag and drop", "CSV files up to 10MB". File preview card: `prospects_import.csv (1.2 MB)` with green checkmark | File selected, "Continue" button active |
| **Stage 2 (Map Columns)** | Modal central body | 10-row mapping table | Alternating row tint, borders `#F3F4F6` | Columns: CSV COLUMN (10 items) -> CRM FIELD (dropdown selects). Mappings: FIRST NAME -> First Name, LAST NAME -> Last Name, EMAIL -> Email, PHONE -> Phone, COMPANY -> Company, TITLE -> Job Title, SOURCE -> Source, STAGE -> Stage, DEAL VALUE -> Deal Value, NOTES -> Notes | All 10 fields mapped; "Review Data" button active |
| **Stage 3 (Review)** | Modal central body | 3 stat summary cards + warning notice | Green card (5 Records to import), Gray card (0 Records with errors), Blue card (1 Stage mapped). Warning notice: Amber tint `#FEF3C7`, border `#FDE68A` | Notice text: `"Stage" mapping: 1 record matched an existing stage, 4 will use the default stage "Event Leads"` | Review overview visible; "Import 5 Prospects" button active |
| **Stage 4 (Complete)** | Modal central body | Centered celebration icon + stats | Green checkmark circle, text `#111111` & `#6B7280` | "Import complete!", "5 prospects successfully imported to your pipeline." | "Done" button clicked -> closes modal |
| **Updated Kanban Board** | Main canvas | 5 stage columns | White cards, stage dot accents | 5 new imported cards present: Alex Morgan, Morgan Taylor, Taylor Brooks, Sam Lee, Casey Jordan | Kanban board populated with imported records |

---

## Step 8: Cloud phone and SMS messaging (0:55–1:40)

URL: `crm.snaarp.com/calls`
View: Calls and SMS Communication Hub
Source recording: `C:\Users\HP\Downloads\1119(1).mp4` (0:55–1:40)

### UI Elements & Specifications

| Element | Position / Layout | Size | Colors | Typography / Content | State |
| :--- | :--- | :--- | :--- | :--- | :--- |
| **Calls Sidebar Item** | CRM sidebar under CRM | Full item row | Active bg `#F3ECFC`, text `#7014D9` | Phone icon + "Calls" | Active selected tab |
| **Calls Header** | Top of page | Flex row justify-between | Heading `#111111`, subtitle `#6B7280` | Title: "Cloud Phone", Subtitle: "Make calls and manage communications". Action buttons: `My Numbers`, `Call Settings` | Rendered |
| **Subnav Tabs** | Under header | Segmented tabs | Active border-b-2 `#7014D9`, text `#7014D9` | `Calls` tab, `SMS` tab | Switchable |
| **Call Stats Cards** | Top of Calls tab | 5 metric cards grid | Bg: `#FFFFFF`, rounded-[16px], border `#ECECF1` | Total Calls (24), Answered (18), Missed (6), Inbound (10), Outbound (14) | Static metrics |
| **Dial Pad Widget** | Calls tab left column | 320px wide card | Bg: `#FFFFFF`, rounded-[16px], border `#ECECF1` | Number display: `+44 7700 900456`. 12-key telephone grid (`1`..`9`, `*`, `0`, `#`). Green `Call` pill button with phone icon | Dialing active |
| **Active Call Bar** | Below dial pad | Banner | Bg: `#ECFDF5`, border `#A7F3D0`, text `#065F46` | Pulsing green dot, "Call in progress with Alex Morgan", duration timer | Calling state |
| **Recent Calls Panel** | Calls tab right column | Flex-1 card | Bg: `#FFFFFF`, rounded-[16px], border `#ECECF1` | Header: "Recent Calls", filter tabs (All, Missed, Voicemail). Rows with call direction icons, name, timestamp, duration | Call history displayed |
| **SMS View Grid** | When SMS tab clicked | 3-column split view | Split layout | Left: Conversation list (Alex Morgan, Morgan Taylor, Taylor Brooks). Center: Message thread + composer. Right: Contact details card | SMS view active |
| **SMS Message Thread** | Center column | Scrollable conversation | Incoming gray bubbles `#F3F4F6`, outgoing purple bubbles `#7014D9` | Speech bubbles with timestamps ("Hi Alex, following up on our proposal...", "Thanks Jane, let's connect tomorrow!") | Active thread with Alex Morgan |
| **SMS Composer** | Bottom of center column | Text input card | Border `#E5E7EB`, focus ring `#7014D9` | Textarea, emoji picker, attachment paperclip, purple `Send` button | Text typed and sent |
| **WhatsApp Quick Action** | Contact profile card right | Pill button | Green accent `#10B981` | WhatsApp icon + "WhatsApp" | In-app feedback triggered |

---

## Step 9: Add a contact and link products (1:40–2:30)

URL: `crm.snaarp.com/sales/prospects`
View: Add Contact 2-Column Modal Dialog
Source recording: `C:\Users\HP\Downloads\1119(1).mp4` (1:40–2:30)

### UI Elements & Specifications

| Element | Position / Layout | Size | Colors | Typography / Content | State |
| :--- | :--- | :--- | :--- | :--- | :--- |
| **Add Contact Button** | Top header right | Purple pill button | Bg: `#7014D9`, text white | `+ Add Contact` | Clicked -> opens modal |
| **Add Contact Modal** | Centered modal overlay | 720px wide, max-h-[85vh] | Bg: `#FFFFFF`, rounded-[20px], shadow-2xl | Header: "Add New Contact", close button. 2-column scrollable form | Open overlay |
| **Left Form Column** | Left half of form | Flex col gap-3 | Input borders `#E5E7EB` | First Name (Jane), Last Name (Smith), Email (jane.smith@acme-studio.com), Phone (+44 7700 900789), Mobile, Job Title (Sales Manager), Company (Acme Studio), Website, Source (Referral) | Values typed |
| **Right Form Column** | Right half of form | Flex col gap-3 | Input borders `#E5E7EB` | Stage (Proposal), Priority (High), Assigned Rep, Currency (£ GBP), Deal Value (£4,500), Linked Products, Notes | Configured |
| **Linked Products Button** | In right column | Outline button | Border `#D1D5DB`, hover `#F3F4F6` | `+ Add` button | Clicked -> opens products dropdown |
| **Products Dropdown** | Popover menu | 220px wide | Bg: `#FFFFFF`, rounded-[12px], shadow-xl | Snaarp PDF (£12/mo), Snaarp Books (£19/mo), Snaarp Sheets (£8/mo), Snaarp Teams (£15/mo) | "Snaarp PDF" selected -> adds product tag |
| **Selected Product Chip** | Under Products label | Pill badge | Bg: `#F3ECFC`, text `#7014D9`, border `#DDD6FE` | Snaarp PDF (£12/mo) + `x` remove icon | Tag displayed |
| **Modal Footer Actions** | Modal bottom bar | Flex row justify-end gap-3 | Border-t `#F3F4F6` | `Cancel` button (gray text), `Create Contact` button (purple pill `#7014D9`) | Create Contact clicked -> closes modal |
| **Success Toast** | Top right floating | Auto width | Bg: `#D1FAE5`, border `#A7F3D0`, text `#065F46` | Checkmark + "Contact created successfully" | Visible 3s |

---

## Step 10: Prospect tasks, reminders, and comments (2:30–3:30)

URL: `crm.snaarp.com/sales/prospects`
View: Card Value Editor, Inline Tasks, High Priority Reminder & Comments Modals
Source recording: `C:\Users\HP\Downloads\1119(1).mp4` (2:30–3:30)

### UI Elements & Specifications

| Element | Position / Layout | Size | Colors | Typography / Content | State |
| :--- | :--- | :--- | :--- | :--- | :--- |
| **Deal Value Badge** | Alex Morgan card header | Inline button | Text `#111111` bold, hover bg `#F3F4F6` | "£5,000" | Clicked -> opens inline editor |
| **Inline Value Input** | Replaces value badge | Small input pill | Border `#7014D9`, ring-2 `#DDD6FE` | Input field with "£8,500" typed + checkmark button | Enter / check clicked -> saves new value |
| **Card 3-Dot Actions** | Top right of Alex Morgan card | 28x28px button | Hover bg `#F3F4F6` | Vertical 3 dots icon | Clicked -> opens action menu |
| **Card Context Menu** | Popover below 3 dots | 200px wide | Bg: `#FFFFFF`, rounded-[12px], shadow-xl | Add Task, Add Comment, View Comments, Edit Client Details, Close Deal (Won), Close Deal (Lost) | Menu options visible |
| **Inline Task Creation** | Sub-panel on card | Card width | Bg: `#FFFBEB`, border `#FDE68A` | Task title: "Follow up on proposal feedback", Due: "Tomorrow, 10:00 AM", priority selector | Saved -> adds task box to card |
| **Card Task Indicator** | Bottom of Alex Morgan card | Banner inside card | Bg: `#F9FAFB`, rounded-[8px], border `#E5E7EB` | Orange clock icon, "Follow up on proposal feedback", checkbox | Displayed on card |
| **High Priority Task Reminder** | Centered modal overlay | 460px wide | Bg: `#FFFFFF`, rounded-[20px], shadow-2xl | Header: Orange alert icon + "High Priority Task Reminder". Body: task description, client name, due status | Open overlay |
| **Reminder Actions** | Modal footer & buttons | Action buttons | Green pill `✓ Mark Done`, Purple button `Go to Task`, Snooze grid (`15m`, `1h`, `Tomorrow`) | `Mark Done` clicked -> closes modal, toast "Task marked as done" |
| **Add Comment Modal** | Centered modal overlay | 480px wide | Bg: `#FFFFFF`, rounded-[20px], shadow-2xl | Title: "Add Comment - Alex Morgan", textarea with placeholder "Type internal notes...", `Save Comment` purple button | Notes typed: "Alex confirmed budget approval for Q1 rollout" -> toast "Comment added" |
| **View Comments Modal** | Centered modal overlay | 520px wide | Bg: `#FFFFFF`, rounded-[20px], shadow-2xl | Title: "Comments - Alex Morgan", timeline list of logged comments with author initials, date, and note content | Open overlay |

---

## Step 11: Edit client details and close deal (3:30–4:15)

URL: `crm.snaarp.com/sales/prospects`
View: Edit Client Details Scrollable Modal & Close Deal (Won) Dialog
Source recording: `C:\Users\HP\Downloads\1119(1).mp4` (3:30–4:15)

### UI Elements & Specifications

| Element | Position / Layout | Size | Colors | Typography / Content | State |
| :--- | :--- | :--- | :--- | :--- | :--- |
| **Edit Client Details Modal** | Centered modal overlay | 680px wide, max-h-[85vh] | Bg: `#FFFFFF`, rounded-[20px], shadow-2xl | Header: "Edit Client - Alex Morgan", close button. 2 scrolling sections | Open overlay |
| **Client Details Section** | Top section of modal body | Full width form | Borders `#E5E7EB`, text `#111111` | Name: Alex Morgan, Email: alex@acme-studio.com, Phone: +44 7700 900456, Company: Acme Studio, Title: VP of Operations | Displayed and reviewed |
| **Prospect Details Section** | Bottom section (scrolled into view) | Full width form | Borders `#E5E7EB` | Deal Stage: Proposal, Deal Value: £8,500, Probability: 75%, Expected Close Date | Scrolled into view |
| **Save Changes Button** | Modal footer right | Purple pill button | Bg: `#7014D9`, text white | "Save Changes" | Clicked -> saves client, toast "Prospect updated" |
| **Close Deal (Won) Option** | 3-dot dropdown menu | Menu item | Green hover tint, text `#059669` | Trophy / check icon + "Close Deal (Won)" | Clicked -> opens confirmation modal |
| **Close Won Modal** | Centered modal dialog | 420px wide | Bg: `#FFFFFF`, rounded-[20px], shadow-2xl | Green celebration icon, "Mark Alex Morgan as Won?", "This will move the deal to Won with value £8,500 and notify the account manager." | Open dialog |
| **Confirm Won Button** | Modal footer right | Green pill button | Bg: `#10B981`, text white | "Confirm Won" | Clicked -> moves deal to Won, toast "Deal marked as Won (£8,500)" |

---

## Step 12: List view and pipeline sorting (4:15–4:37)

URL: `crm.snaarp.com/sales/prospects`
View: Prospects Pipeline List View & Column Sorting
Source recording: `C:\Users\HP\Downloads\1119(1).mp4` (4:15–4:37)

### UI Elements & Specifications

| Element | Position / Layout | Size | Colors | Typography / Content | State |
| :--- | :--- | :--- | :--- | :--- | :--- |
| **List View Switcher Button** | View switcher group on header | Segmented pill | Active `#EDE9FE` bg, `#7014D9` text | List icon + "List" | Clicked -> switches canvas from Kanban to List view |
| **Prospects Table** | Main content canvas | Full width table | Bg: `#FFFFFF`, rounded-[16px], border `#E5E7EB` | Columns: Checkbox, Name, Stage, Deal Value, Contact Info, Actions | Dense table rendered |
| **Stage Dropdown Pills** | In Stage table column | Small dropdown button | Colored pill matching stage (coral, blue, purple, green) | Event Leads, Lead, Proposal, Won | Interactive dropdowns |
| **Sort Dropdown Button** | Header beside view switcher | Pill button | Bg: `#FFFFFF`, border `#E5E7EB` | `↑↓ Most recent v` | Clicked -> opens sort menu |
| **Sort Options Menu** | Popover dropdown | 180px wide | Bg: `#FFFFFF`, rounded-[12px], shadow-xl | Most recent, Oldest, Name (A-Z), Name (Z-A), Value (high-low), Value (low-high) | Open menu |
| **Name (A-Z) Sort Action** | Third item in sort menu | Menu item row | Hover bg `#F3F4F6`, active purple text | "Name (A-Z)" | Clicked -> table reorders: Alex Morgan, Casey Jordan, Morgan Taylor, Sam Lee, Taylor Brooks |
| **Name (Z-A) Sort Action** | Fourth item in sort menu | Menu item row | Hover bg `#F3F4F6`, active purple text | "Name (Z-A)" | Clicked -> table reorders: Taylor Brooks, Sam Lee, Morgan Taylor, Casey Jordan, Alex Morgan |
| **Pagination Bar** | Table footer | Flex row justify-between | Text `#6B7280`, border-t `#F3F4F6` | "Showing 5 of 5 prospects", Prev / Next buttons | Rendered |
| **Completion Card (Part 2)** | Follows Step 12 in Part 2 | Centered completion overlay | Bg: `#FFFFFF`, rounded-[24px], shadow-2xl | Title: "You're all set", Replay & Back to Snaarp buttons | Relocated to step 17 in Part 3 |

---

## Step 13: Sales forecasting and quota targets (0:00–0:48)

URL: `crm.snaarp.com/forecasts`
Route: `/tutorials/crm`
View: Sales Forecasting (Weighted Pipeline, By Rep, Targets, Pipeline Risk)
Source recording: `C:\Users\HP\Downloads\1119(2).mp4` (0:00–0:48)

### UI Elements & Specifications

| Element | Position / Layout | Size | Colors | Typography / Content | State |
| :--- | :--- | :--- | :--- | :--- | :--- |
| **Sales Navigation Subitem** | CRM Sidebar under Sales | Item row | Active text `#7014D9` | Trending icon + "Forecasts" | Active subitem |
| **Page Header** | Top of main canvas | Flex col gap-1 | Heading `#111111`, subtitle `#6B7280` | "Sales Forecasting" (bold 20px), "Weighted pipeline, per-rep forecasts, quota tracking and at-risk deals." | Default |
| **Tab Navigation Bar** | Under page header | Horizontal tab row | Border-b `#E5E7EB` | Tabs: `Weighted Pipeline` (active, purple underline `#7014D9`), `By Rep`, `Targets`, `Pipeline Risk` | Switchable |
| **Total Pipeline KPI Card** | Top row left | Col span 1 | Bg: `#FFFFFF`, rounded-[16px], border `#ECECF1` | Title: `$ Total Pipeline`, Value: `£36.4k` (bold 28px) | Rendered |
| **Weighted Forecast KPI Card** | Top row center | Col span 1 | Bg: `#FFFFFF`, rounded-[16px], border `#ECECF1` | Title: `📈 Weighted Forecast`, Value: `£3.0k` (bold 28px purple `#7014D9`) | Rendered |
| **Quota Attainment KPI Card** | Top row right | Col span 1 | Bg: `#FFFFFF`, rounded-[16px], border `#ECECF1` | Title: `🎯 Quota Attainment`, Value: `0%` (bold 28px), Subtitle: `£0 of £0` | Rendered |
| **Pipeline by Stage Chart** | Main canvas below KPIs | Full width card | Bg: `#FFFFFF`, rounded-[16px], border `#ECECF1` | Header: "Pipeline by stage". 9 stage progress bars: Event Leads (10%, 352 deals, £24.2k -> £2.4k, coral bar), Admission Request, Form Sent, Lead (5%, 27 deals, £12.1k -> £605, indigo bar), Meeting, Proposal (4 deals), Presentation (1 deal), Admission Granted, Awaiting Response | Displayed |
| **By Rep Table** | By Rep tab content | Full width table | Bg: `#FFFFFF`, rounded-[16px], border `#ECECF1` | Columns: Rep, Open deals, Pipeline, Weighted, Won (YTD), Target, Attainment. 5 fictional rep rows (Sam Taylor, Casey Brown, Jordan Lee, Alex Morgan, Unassigned) | Table rendered |
| **Targets Empty State** | Targets tab initial | Full width card | Bg: `#FFFFFF`, rounded-[16px], border `#ECECF1` | Title: "No sales targets set", Subtitle: "Targets drive quota attainment on the overview and per-rep tabs.", Button: `Create a target` (purple pill) | Empty state active |
| **New Sales Target Modal** | Centered modal overlay | 480px wide | Bg: `#FFFFFF`, rounded-[20px], shadow-2xl | Header: "New Sales Target", close `x`. Form fields: Period ("Monthly"), Year ("2026"), Month ("November"), Revenue target ("20000"), Deal count target ("0") | Active typing & creation |
| **Create Target Button** | Modal footer right | Purple pill | Bg: `#7014D9`, text white | "Create Target" | Clicked -> saves target, toast "Target created" |
| **Targets Table** | Targets tab populated | Full width table | Bg: `#FFFFFF`, rounded-[16px], border `#ECECF1` | Columns: Scope ("Organization"), Period ("Monthly 2026 · M11"), Revenue target ("£20.0k"), Deal target ("—"), delete action | Rendered with created target |
| **Pipeline Risk KPI Cards** | Pipeline Risk tab top | 2 cards grid | Bg: `#FFFFFF`, rounded-[16px], border `#ECECF1` | `Deals at risk: 7`, `Value at risk: £0` | Rendered |
| **Pipeline Risk Table** | Pipeline Risk tab | Full width table | Bg: `#FFFFFF`, rounded-[16px], border `#ECECF1` | Columns: Deal, Stage, Value, Idle, Reason. 7 deals (stale badge `#F59E0B`, idle days 16d-87d) | Rendered |

---

## Step 14: Won and lost deals (0:48–1:04)

URL: `crm.snaarp.com/deals/won` (Won) and `crm.snaarp.com/deals/lost` (Lost)
View: Won Deals & Lost Deals Catalog (List & Grid Layouts, Status Dropdowns)
Source recording: `C:\Users\HP\Downloads\1119(2).mp4` (0:48–1:04)

### UI Elements & Specifications

| Element | Position / Layout | Size | Colors | Typography / Content | State |
| :--- | :--- | :--- | :--- | :--- | :--- |
| **Won Sidebar Subitem** | CRM Sidebar under Sales | Item row | Active text `#7014D9` | Check/star icon + "Won" | Active |
| **Won Deals Header** | Top of main canvas | Flex row justify-between | Heading `#111111`, controls | "Won Deals" (bold 20px), "Sales Pipeline v" pill, "2 won deals" subtitle | Default |
| **Won Deals Empty State** | Main canvas initial | Full width | Text `#6B7280` | "No won deals yet" | Rendered momentarily |
| **Won Deals List View** | Main canvas | Full width table | Bg: `#FFFFFF`, rounded-[16px], border `#ECECF1` | Columns: NAME, VALUE, CONTACT, CLOSED, STATUS. Rows: Alex Morgan (£8,500, 11/19/2026, Won), Sam Taylor (—, 11/19/2026, Won) | Populated list view |
| **Status Dropdown** | Status column on deal row | Select pill | Bg: `#ECFDF5`, text `#059669`, border `#A7F3D0` | "Won v" pill | Clicked -> opens options menu |
| **Status Options Menu** | Popover dropdown | 200px wide | Bg: `#FFFFFF`, rounded-[12px], shadow-xl | Groups: `Closed` (Won, Lost), `Reopen as` (Event Leads, Lead, Proposal, Presentation, Awaiting Response, Interested, Not Interested, Integrating Systems, Negotiation, Growth, Lost, Won) | "Interested" hovered |
| **Grid View Toggle** | Top right controls | Segmented button | Active bg `#EDE9FE`, text `#7014D9` | Grid icon + "Grid" | Clicked -> switches to card layout |
| **Won Deals Grid Cards** | Main canvas | 2-column card grid | Bg: `#FFFFFF`, rounded-[16px], border `#ECECF1` | Avatar, Deal Name, Closed date, Deal value (green bold), Status dropdown pill | Cards rendered |
| **Lost Sidebar Subitem** | CRM Sidebar under Sales | Item row | Active text `#7014D9` | Alert/ban icon + "Lost" | Clicked -> navigates to Lost Deals |
| **Lost Deals Header** | Top of main canvas | Flex row justify-between | Heading `#111111`, controls | "Lost Deals" (bold 20px), "Sales Pipeline v" pill, "1 lost deals" subtitle | Default |
| **Lost Deal Card** | Main canvas (Grid view) | Single card in grid | Bg: `#FFFFFF`, rounded-[16px], border `#ECECF1` | Avatar `CB`, "Casey Brown", "Closed 11/11/2026", status pill: `Lost v` (red/pink tint `#FEE2E2`, text `#DC2626`) | Displayed |

---

## Step 15: Manage and create tasks (1:44–2:42)

URL: `crm.snaarp.com/tasks`
View: Tasks Board & Inline Add Task Form
Source recording: `C:\Users\HP\Downloads\1119(2).mp4` (1:44–2:42)

### UI Elements & Specifications

| Element | Position / Layout | Size | Colors | Typography / Content | State |
| :--- | :--- | :--- | :--- | :--- | :--- |
| **Activities Sidebar Nav** | CRM Sidebar | Collapsible group | Active `#7014D9` | Clipboard icon + "Activities" (expanded to Tasks, Calendar) | Expanded |
| **Tasks Header** | Top of page | Flex row justify-between | Heading `#111111`, controls | "Tasks" (bold 20px), "5 total tasks" subtitle (becomes "6 total tasks"). Controls: `List`, `Board` (active), `+ Add Task` purple button | Rendered |
| **Search & Filters Row** | Under header | Flex row gap-3 | Borders `#E5E7EB` | Search input ("Search tasks..."), "All statuses v", "All priorities v" | Rendered |
| **Tasks Board Columns** | Main canvas | 3-column board | Bg: `#F9FAFB`, rounded-[16px], p-3 | `🔵 To Do (0)`, `🟠 In Progress (0)`, `🟢 Done (5)` | Columns rendered |
| **Done Tasks Cards** | Inside Done column | Full width cards | Bg: `#FFFFFF`, rounded-[12px], border `#E5E7EB` | 5 tasks: "Follow up call" (medium), "Message CEO" (medium, 11/12/2026), "Get a new lead" (medium), "Follow up Sam" (high, 8/20/2026), "Follow up Alex" (high, 8/20/2026) | Existing tasks shown |
| **Add Task Button** | Top right controls | Purple pill | Bg: `#7014D9`, text white | `+ Add Task` | Clicked -> opens inline form |
| **Inline Add Task Form** | Between filters & board | Full width card | Bg: `#FFFFFF`, rounded-[16px], border `#E5E7EB`, p-4 | Task title input, Priority dropdown ("High"), Due date picker ("11/19/2026"), Description (optional), Link to contact (optional), `Add Task` & `Cancel` buttons | Form expanded & typed |
| **Submit Add Task** | Inline form bottom left | Purple pill | Bg: `#7014D9`, text white | "Add Task" | Clicked -> creates task, toast "Task created" |
| **New Task Card** | In To Do column | Full column width | Bg: `#FFFFFF`, rounded-[12px], border `#E5E7EB` | Title: "Call The Client before the end of work", Badge: `high` (orange `#FEF3C7`), Date: `11/19/2026` | Rendered in To Do |

---

## Step 16: Task details and priority reminders (2:42–3:18)

URL: `crm.snaarp.com/tasks`
View: Task Details Slide-over Panel, High Priority Alert & Status Transition
Source recording: `C:\Users\HP\Downloads\1119(2).mp4` (2:42–3:18)

### UI Elements & Specifications

| Element | Position / Layout | Size | Colors | Typography / Content | State |
| :--- | :--- | :--- | :--- | :--- | :--- |
| **Task Card Click** | In To Do column | Click target | Hover border `#DDD6FE` | "Call The Client before the end of work" | Clicked -> opens details panel |
| **Task Details Panel** | Right side slide-over | 380px wide, full height | Bg: `#FFFFFF`, border-l `#ECECF1`, shadow-xl | Header: "Task Details", close `x`. Fields: Title, Status (4 pills: To Do, In Progress, Done, Cancelled), Priority (4 pills: Low, Medium, High, Urgent), Due Date (11/19/2026), Description, Email reminders (checked), Linked Contact ("No contact linked"), Created ("11/19/2026"), Delete Task button | Open panel |
| **High Priority Alert Modal** | Centered modal overlay | 460px wide | Bg: `#FFFFFF`, rounded-[20px], shadow-2xl | Header: Solid orange `#EA580C`, alert icon, "High Priority Task", "Needs your attention". Body: "High priority task: Call The Client before the end of work", `✓ Mark Done`, `Go to Task ->`, `REMIND ME LATER` options | Open overlay |
| **Snooze Option: 1 Hour** | Remind me later grid | Pill button | Border `#E5E7EB`, hover `#F3F4F6` | "1 hour" | Clicked -> closes modal, toast "Reminder snoozed for 1 hour" |
| **In Progress Status Pill** | Task Details panel Status row | Segmented pill | Active `#F3ECFC` bg, `#7014D9` text | "In Progress" | Clicked -> updates status |
| **Board Column Transition** | Tasks Board canvas | 3 columns | Updated column counts | Task card moves from `To Do` (0) to `In Progress` (1); `Done` remains 5 | Task in In Progress |

---

## Step 17: Calendar and task completion (3:18–3:39)

URL: `crm.snaarp.com/calendar`
View: Calendar Month Grid, Day Details Panel & Task Completion
Source recording: `C:\Users\HP\Downloads\1119(2).mp4` (3:18–3:39)

### UI Elements & Specifications

| Element | Position / Layout | Size | Colors | Typography / Content | State |
| :--- | :--- | :--- | :--- | :--- | :--- |
| **Calendar Sidebar Item** | CRM Sidebar under Activities | Item row | Active text `#7014D9` | Calendar icon + "Calendar" | Active |
| **Calendar Header** | Top of page | Flex row justify-between | Heading `#111111`, controls | Title: "Calendar", Subtitle: "Tasks, meetings, calls, and deal deadlines". Controls: Legend dots (Task, Meeting, Call, Deal), `Today` button, `<` `>` chevrons, `November 2026` | Rendered |
| **Month Grid** | Main calendar area | 7-column grid (Sun-Sat) | Bg: `#FFFFFF`, rounded-[16px], border `#ECECF1` | 35 day cells for November 2026. Day 20 purple indicator circle. Cell 12: `Message CEO` chip. Cell 19: `Call The Client before the end of work` chip | Rendered |
| **Right Side Day Panel** | Right column | 320px wide | Bg: `#FFFFFF`, border-l `#ECECF1`, p-4 | Header: `Thu, Nov 12` / `Thu, Nov 19`, `1 event`, `+` button. Event card | Dynamic panel |
| **Nov 12 Cell Click** | Cell 12 / 13 in grid | Grid cell | Hover bg `#F3F4F6` | Event chip `Message CEO` | Clicked -> right panel shows `Thu, Nov 12`, 1 event, `Message CEO` (Task, medium) |
| **Nov 19 Cell Click** | Cell 19 / 20 in grid | Grid cell | Selected border/bg | Event chip `Call The Client before the end o...` | Clicked -> right panel shows `Thu, Nov 19`, 1 event, `Call The Client before the end of work` (Task, high) |
| **Task Completion Control** | Inside task card in day panel | Circle checkbox / checkmark | Border `#D1D5DB`, checked `#10B981` | Checkbox / ring control | Clicked -> marks task done, toast "Task marked as done", strikethrough on title, green circle checkmark |
| **Completion Card** | Follows Step 17 automatically | Centered completion overlay | Bg: `#FFFFFF`, rounded-[24px], shadow-2xl | Title: "You're all set", Replay & Back to Snaarp buttons | Relocated to step 22 in Part 4 |

---

## Step 18: Calling settings and Cloud Phone (0:00–2:10)

URL: `crm.snaarp.com/calls`
View: Cloud Phone Dashboard & Call Settings Modals (Caller ID, Voicemail Greeting, Ring Strategy, Business Hours)
Source recording: `C:\Users\HP\Downloads\1119(3).mp4` (0:00–2:10)

### UI Elements & Specifications

| Element | Position / Layout | Size | Colors | Typography / Content | State |
| :--- | :--- | :--- | :--- | :--- | :--- |
| **Calls Sidebar Item** | CRM Sidebar | Item row | Active text `#7014D9`, lilac bg `#F3ECFC` | Phone icon + "Calls" | Active |
| **Calls Header** | Top of main canvas | Flex col gap-1 | Heading `#111111`, subtitle `#6B7280` | "Calls" (bold 22px), "Make calls, send WhatsApp messages, and manage calling providers" | Default |
| **Calls Tabs** | Top header below title | Pill tab row | Bg `#F3F4F6`, rounded-full | `Cloud Phone` (active, purple `#7014D9`), `SMS`, `# Phone Numbers` | Switchable |
| **Top Right Controls** | Header right | Flex row gap-3 | Credit pill & white button | `2.32 CREDIT` (red pill), `Providers` button | Default |
| **My Numbers Card** | Left panel top | 280px wide card | Bg: `#FFFFFF`, rounded-[16px], border `#ECECF1` | Title: "My Numbers", Active card with `+44 7700 900123`, `✓ Active` (green pill), `Sales`, action icons (phone, settings, mic, copy) | Rendered |
| **Call Settings Card** | Left panel below numbers | 280px wide card | Bg: `#FFFFFF`, rounded-[16px], border `#ECECF1` | Title: "Call Settings", 7 setting rows: `Dialer & Keypad Sound` (Configured), `Call Forwarding` (Off), `Do Not Disturb` (Off), `Voicemail Greeting` (Custom greeting >), `Ring Strategy` (Ring all devices >), `Business Hours` (Mon - Tue, 9:00 AM - 6:00 PM >), `Caller ID` (Custom Name >) | Interactive rows |
| **KPI Metric Cards** | Center top row | 5 cards grid | Bg: `#FFFFFF`, rounded-[14px], border `#ECECF1` | `Total Calls: 4`, `Inbound Calls: 2`, `Outbound Calls: 2`, `Missed Calls: 2` (red `#DC2626`), `Avg. Call Duration: 00:02` | Rendered |
| **Keypad Section** | Center card below KPIs | Full width card | Bg: `#FFFFFF`, rounded-[20px], border `#ECECF1` | Tabs: `Keypad` (active, purple underline), `Recent Calls`, `Favorites`. Dial input `GB +44 Enter phone number...`, 12-key keypad (1 to 9, *, 0, #), green circular call button | Keypad active |
| **Recent Calls Card** | Right panel top | 280px wide card | Bg: `#FFFFFF`, rounded-[16px], border `#ECECF1` | Title: "Recent Calls" (`View all`), call rows with initials `S`, `Sales`, Ofcom drama phone, duration / `Missed`, dates | Rendered |
| **Voicemails Card** | Right panel bottom | 280px wide card | Bg: `#FFFFFF`, rounded-[16px], border `#ECECF1` | Title: "Voicemails" (`View all`), cassette icon, "No voicemails" | Empty state |
| **Caller ID Modal** | Centered modal overlay | 480px wide | Bg: `#FFFFFF`, rounded-[20px], shadow-2xl | Header: "Caller ID", "Control what callers see when you make outbound calls." Display Type: Custom Name (choices: Business Name, Phone Number, Custom Name). Number dropdown: `+44 7700 900123 (Main Business Line)`. Toggles: Local Presence, Hide Caller ID. Cancel & Save Changes buttons | Opened -> Cancelled |
| **Voicemail Greeting Modal** | Centered modal overlay | 480px wide | Bg: `#FFFFFF`, rounded-[20px], shadow-2xl | Header: "Voicemail Greeting", "Configure the greeting callers hear when you can't answer." Greeting Type: Custom Recording (choices: Custom Recording, Text-to-Speech, Default System Greeting). Toggles: Transcribe voicemails, Email notifications. Max Duration: 60 seconds. Cancel & Save Changes buttons | Opened -> Cancelled |
| **Ring Strategy Modal** | Centered modal overlay | 480px wide | Bg: `#FFFFFF`, rounded-[20px], shadow-2xl | Header: "Ring Strategy", "Choose how calls ring across your connected devices." Ring Strategy: Ring all devices simultaneously (choices: Ring all devices simultaneously, Ring sequentially, Round robin). Ring Duration: 20 seconds. Toggles: Desktop App (ON), Mobile App (ON), Desk Phone (ON), Web Browser (OFF). Cancel & Save Changes buttons | Opened -> Cancelled |
| **Business Hours Modal** | Centered modal overlay | 520px wide | Bg: `#FFFFFF`, rounded-[20px], shadow-2xl | Header: "Business Hours", "Set your availability schedule for receiving calls." Time Zone: (GMT+01:00) West Africa Time (Lagos). Schedule: Mon-Fri 09:00 AM - 06:00 PM (ON), Sat-Sun — (OFF). After Hours Action: Send to voicemail. Cancel & Save Changes buttons | Opened -> Cancelled |

---

## Step 19: Calling Providers (2:10–2:20)

URL: `crm.snaarp.com/calls`
View: Calling Providers Modal & Connected Status
Source recording: `C:\Users\HP\Downloads\1119(3).mp4` (2:10–2:20)

### UI Elements & Specifications

| Element | Position / Layout | Size | Colors | Typography / Content | State |
| :--- | :--- | :--- | :--- | :--- | :--- |
| **Providers Button** | Top right of Calls view | Pill button | Bg: `#FFFFFF`, border `#E5E7EB` | Gear icon + "Providers" | Clicked -> opens modal |
| **Calling Providers Modal** | Centered modal overlay | 440px wide | Bg: `#FFFFFF`, rounded-[20px], shadow-2xl | Header: "Calling Providers", close button `x` | Open overlay |
| **Provider Card** | Modal body | Full width card | Bg: `#F9FAFB`, rounded-[14px], border `#E5E7EB` | Red phone icon in light red box, Title: `Talking`, Subtitle: `Connected as admin@example.com`, Badge: `✓ Connected` (green pill `#DCFCE7`, text `#16A34A`), Action: `Disconnect` (red text `#DC2626`) | Rendered Connected |
| **Modal Close Control** | Top right of modal header | 28x28px button | Text `#9CA3AF`, hover `#111111` | `X` icon | Clicked -> closes modal |

---

## Step 20: Contacts directory, Add Contact and safe deletion (2:25–3:00)

URL: `crm.snaarp.com/contacts`
View: Contacts Directory, Status Filter Dropdown, Add Contact Drawer, and Safe Contact Deletion
Source recording: `C:\Users\HP\Downloads\1119(3).mp4` (2:25–3:00)

### UI Elements & Specifications

| Element | Position / Layout | Size | Colors | Typography / Content | State |
| :--- | :--- | :--- | :--- | :--- | :--- |
| **Contacts Sidebar Item** | CRM Sidebar | Collapsible group | Active `#7014D9` | Users icon + "Contacts" (expanded to All Contacts, Companies) | Expanded |
| **Contacts Header** | Top of page | Flex row justify-between | Heading `#111111`, controls | "Contacts" (bold 22px), "8 total contacts" subtitle (updates to "7 total contacts"). Buttons: `Import` (icon + text), `+ Add Contact` (purple pill `#7014D9`) | Rendered |
| **Search & Status Filter** | Under header | Flex row gap-3 | Borders `#E5E7EB` | `🔍 Search contacts...` input, `All statuses v` dropdown button | Rendered |
| **All Statuses Menu** | Popover dropdown | 180px wide | Bg: `#FFFFFF`, rounded-[12px], shadow-xl | 16 status options: All statuses, Event Leads, Lead, First Call, Second Call, Proposal, Presentation, Awaiting Response, Interested, Not Interested, Integrating Systems, Negotiation, Growth, Lost, Won, Closed Lost | Open menu |
| **Contacts Table** | Main content canvas | Full width table | Bg: `#FFFFFF`, rounded-[16px], border `#ECECF1` | Columns: Checkbox, NAME, EMAIL, PHONE, COMPANY, STATUS, ACTIONS (trash). 8 initial fictional contacts (Sofia Martinez, Michael Chen, Amara Okafor, Daniel Brooks, Jane Doe, Ade Tayo, Lisa Park, Mayopo Adeoye) | Dense table rendered |
| **Add Contact Button** | Top right of Contacts view | Purple pill | Bg: `#7014D9`, text white | `+ Add Contact` | Clicked -> opens Add Contact form |
| **Add Contact Form Drawer** | Centered modal / drawer | 520px wide, max-h-[85vh] | Bg: `#FFFFFF`, rounded-[20px], shadow-2xl | Header: "Add Contact", close `x`. Fields: Company, Job title, Source, Status, Address, City, Country, Zip Code, Products ("No products linked", "Add v"), Notes ("Additional notes..."), Cancel & Add Contact buttons | Scrolled & cancelled |
| **Lisa Park Delete Action** | Table row Actions column | Trash button | Text `#9CA3AF`, hover `#DC2626` | Trash icon | Clicked -> deletes Lisa Park from isolated dataset |
| **Success Toast** | Top right floating toast | Toast pill | Bg: `#DCFCE7`, border `#86EFAC`, text `#16A34A` | `✓ Contact deleted` | Rendered |
| **Updated Contact Count** | Header subtitle | Text string | Text `#6B7280` | "7 total contacts" | Updated |

---

## Step 21: Contact profile and activity (3:00–3:30)

URL: `crm.snaarp.com/contacts/alex-morgan`
View: Contact Profile Detail Page (Timeline, Comments, Details, History)
Source recording: `C:\Users\HP\Downloads\1119(3).mp4` (3:00–3:30)

### UI Elements & Specifications

| Element | Position / Layout | Size | Colors | Typography / Content | State |
| :--- | :--- | :--- | :--- | :--- | :--- |
| **Contact Profile Header** | Top of detail canvas | Flex row justify-between | Heading `#111111`, subtitle `#6B7280` | `<-` back button, Avatar circle `AM`, Title: `Alex Morgan`, Subtitle: `Sales Manager at Acme Studio · alex.morgan@example.com`, `Delete` button (red outline) | Rendered |
| **Top Metric Cards** | Below profile header | 4 cards grid | Bg: `#FFFFFF`, rounded-[16px], border `#ECECF1` | `0 Emails`, `1 Deals` (green `$`), `0 Tasks`, `0 Activities` | Rendered |
| **Tab Navigation Pills** | Below metric cards | Pill bar | Bg: `#F3F4F6`, rounded-full, p-1 | `Timeline` (active `#F3ECFC`, text `#7014D9`), `Comments`, `History`, `Details` | Switchable |
| **Activity Timeline Card** | Timeline tab content | Full width card | Bg: `#FFFFFF`, rounded-[16px], border `#ECECF1` | Title: `Activity Timeline`. Event: green `$` circle, `Alex Morgan`, `£4,200 · open`, date: `11/19/2026` | Rendered |
| **Comments Tab Content** | Comments tab | Full width card | Bg: `#FFFFFF`, rounded-[16px], border `#ECECF1` | Title: `Comments`. Input: `Add a comment...`, `Add` purple button with send icon. Below: clean empty / loading state | Rendered |
| **Details Tab Content** | Details tab | Full width cards stack | Bg: `#FFFFFF`, rounded-[16px], border `#ECECF1` | 5 structured sections: `PERSONAL`, `PROFESSIONAL`, `ADDRESS`, `NOTES`, `ATTACHMENTS` | Rendered |
| **Personal Section** | Details card top | 2-column fields | Borders `#E5E7EB` | First name: Alex, Last name: Morgan, Email: alex.morgan@example.com, Phone: +44 7700 900125, Date of birth: mm/dd/yyyy | Displayed |
| **Professional Section** | Details card middle | 2-column fields | Borders `#E5E7EB` | Company: Acme Studio, Job title: Sales Manager, Source: Networking, Pipeline Stage: Event Leads, Products: "No products linked" | Displayed |
| **Address Section** | Details card | 2-column fields | Borders `#E5E7EB` | Street address: 10 Acme Street, City: London, State: London, Zip code: EC1A 1AA, Country: United Kingdom | Displayed |
| **Notes Section** | Details card | Text area box | Borders `#E5E7EB` | "Met at a business networking event" | Displayed |
| **Attachments Section** | Details card bottom | Flex row justify-between | Border `#E5E7EB` | Title: `ATTACHMENTS`, `📎 Attach file` button, "No files attached to this contact" | Empty state |

---

## Step 22: Company information (3:30–3:44)

URL: `crm.snaarp.com/companies/acme-studio`
View: Company Details View & Associated Contacts Panel
Source recording: `C:\Users\HP\Downloads\1119(3).mp4` (3:30–3:44)

### UI Elements & Specifications

| Element | Position / Layout | Size | Colors | Typography / Content | State |
| :--- | :--- | :--- | :--- | :--- | :--- |
| **Companies Sidebar Subitem** | CRM Sidebar under Contacts | Item row | Active text `#7014D9` | Building icon + "Companies" | Active |
| **Company Details Header** | Top of canvas | Flex row justify-between | Heading `#111111`, action buttons | `<-` back button, Building icon, Title: `Acme Studio`. Buttons: `Delete` (red outline `#FECACA`, text `#DC2626`), `Save` (purple `#7014D9`, text white) | Rendered |
| **Company Info Card** | Left main column | Full width card | Bg: `#FFFFFF`, rounded-[16px], border `#ECECF1` | Title: `COMPANY INFO`. 2-column fields: Name (`Acme Studio`), Domain (`example.com`), Industry (`Software`), Size (`11–50`), Phone (`+44 7700 900123`), Email (`admin@example.com`), Website (`https://example.com`), Description (`Business software and professional services company.`) | Displayed |
| **Company Address Card** | Left main column below Info | Full width card | Bg: `#FFFFFF`, rounded-[16px], border `#ECECF1` | Title: `ADDRESS`. Fields: Street (`10 Acme Street`), City (`London`), State (`London`), Country (`United Kingdom`) | Displayed |
| **Associated Contacts Panel** | Right side column | 320px wide card | Bg: `#FFFFFF`, rounded-[16px], border `#ECECF1` | Title: `Associated Contacts` (users icon). Empty state text: "No contacts linked to this company yet. Add contacts with this company name to see them here." | Empty state rendered |
| **Completion Card** | Follows Step 22 automatically | Centered completion overlay | Bg: `#FFFFFF`, rounded-[24px], shadow-2xl | Title: "You're all set", Replay & Back to Snaarp buttons | Concludes full 22-step tutorial |

---

## Step 23: Messages and messaging channel integrations (0:00–1:00)

URL: `crm.snaarp.com/messages`
Route: `/tutorials/crm`
View: Messages Inbox, Conversations & Channel Integrations (Facebook, Instagram, WhatsApp, Telegram)
Source recording: `C:\Users\HP\Downloads\1119(4).mp4` (0:00–1:00)

### UI Elements & Specifications

| Element | Position / Layout | Size | Colors | Typography / Content | State |
| :--- | :--- | :--- | :--- | :--- | :--- |
| **Messages Sidebar Item** | CRM Sidebar under Contacts | Item row | Active text `#7014D9`, bg `#F3ECFC` | MessageSquare icon + "Messages" | Active |
| **Messages Split View** | Main content canvas | Full width & height | Bg: `#FFFFFF`, border `#ECECF1` | Left: Conversation search & list (280px). Right: Main conversation area / Channel setup view | Split layout |
| **Conversation Search Bar** | Left panel top | Flex row justify-between | Input bg `#F8FAFC`, border `#E5E7EB` | Search icon, "Search conversations...", filter sliders button | Searchable |
| **Conversation List** | Left panel below search | Vertical list | Hover bg `#F8FAFC`, active `#F3ECFC` | 1: `+WhatsApp` (bold, date `Nov 18`, safe preview), 2: `+44 7700 900126` (date `Nov 4`, `Yeah, i got it`) | `+WhatsApp` selected |
| **Channels Toolbar** | Top of right panel | Flex row gap-2 items-center | Pill borders `#E5E7EB`, active `#7014D9` | `All` (purple pill), Facebook Messenger, Instagram, WhatsApp, Telegram, SMS, Email, Settings gear | Filterable |
| **Conversation Header** | Right panel top | Flex row items-center justify-between | Text `#111111` & `#6B7280` | Title: `+WhatsApp` (bold 14px), Subtitle: `SMS via Talking` (11px) | Displayed |
| **Message Thread** | Central chat scroll area | Max width chat bubbles | White cards, borders `#ECECF1`, shadow-2xs | 3 safe incoming messages: "Hello, I would like to know more about your services.", "Thank you. Could you send me more information?", "We will review the details and get back to you." | Rendered |
| **Unknown Contact Banner** | Above message composer | Full width banner | Bg: `#FEF9C3`, text `#854D0E`, border `#FEF08A` | Text: "Unknown contact — not linked in your CRM", Action: `+ Create Contact` (orange text button) | Displayed |
| **Message Composer** | Bottom of right panel | Flex row gap-2 | Input `#F8FAFC`, send button purple | "Type a message..." input, circular send button with paper plane | Rendered |
| **Facebook Setup View** | Channel view when FB clicked | Full content area | Bg: `#F8FAFC` | Heading: `Facebook`, Subtitle: "Connect your Facebook Page...", status "INACTIVE", 3 setup steps, webhook/OAuth fields, "Connect with Meta", "+ Advanced: connect manually" expanding manual form | Rendered |
| **Instagram Setup View** | Channel view when IG clicked | Full content area | Bg: `#F8FAFC` | Heading: `Instagram`, Subtitle: "Connect your Instagram account...", status "INACTIVE", 3 setup steps, info banner, "Connect with Meta (via Facebook)" | Rendered |
| **WhatsApp Setup View** | Channel view when WA clicked | Full content area | Bg: `#F8FAFC` | Heading: `WhatsApp`, Subtitle: "Connect your WhatsApp number...", status "INACTIVE", 4 setup steps, info banner, "+ Connect with Phone Number ID" | Rendered |
| **Telegram Setup View** | Channel view when TG clicked | Full content area | Bg: `#F8FAFC` | Heading: `Telegram`, Subtitle: "Connect your Telegram bot...", status "INACTIVE", 3 setup steps, info banner, "+ Advanced: connect manually" | Rendered |

---

## Step 24: Connect Email Account (1:00–1:27)

URL: `crm.snaarp.com/messages`
View: Connect Email Account Modal Dialog
Source recording: `C:\Users\HP\Downloads\1119(4).mp4` (1:00–1:27)

### UI Elements & Specifications

| Element | Position / Layout | Size | Colors | Typography / Content | State |
| :--- | :--- | :--- | :--- | :--- | :--- |
| **Email Channel Icon** | Top channels toolbar | Round button | Hover bg `#F3F4F6` | Mail icon | Clicked -> opens modal |
| **Connect Email Modal** | Centered modal overlay | 520px wide, max-h-[85vh] | Bg: `#FFFFFF`, rounded-[20px], shadow-2xl | Header: "Connect Email Account", "Add your SMTP and IMAP credentials", close `x` | Open overlay |
| **Account Fields** | Modal body top | 2-column inputs | Borders `#E5E7EB` | Display name: `Work Email`, Email: `admin@example.com` | Typed |
| **OUTGOING (SMTP)** | Modal body section 2 | 2-column inputs | Borders `#E5E7EB` | Host: `smtp.example.com`, Port: `587`, Username: `admin@example.com`, Password (masked), SSL/TLS checkbox | Populated |
| **INCOMING (IMAP)** | Modal body section 3 | 2-column inputs | Borders `#E5E7EB` | Host: `imap.example.com`, Port: `993`, Username: `admin@example.com`, Password (masked) | Populated |
| **Signature Section** | Modal body section 4 | Description & textarea | Border `#E5E7EB`, text `#111111` | Description: "Appended to the bottom of every email...", Value: `Best regards,\nJane Doe\nSales — Acme Studio` | Populated |
| **Modal Footer** | Pinned modal footer | Flex row justify-between | Border-t `#F3F4F6`, bg `#FFFFFF` | Left: "Show passwords" checkbox. Right: `Test Connection` button, `Cancel` button, `Connect` purple pill | Cancel clicked -> closes cleanly |

---

## Step 25: Create and configure a workflow automation (1:27–2:45)

URL: `crm.snaarp.com/automations`
View: Visual Workflow Builder Canvas & Node Config
Source recording: `C:\Users\HP\Downloads\1119(4).mp4` (1:27–2:45)

### UI Elements & Specifications

| Element | Position / Layout | Size | Colors | Typography / Content | State |
| :--- | :--- | :--- | :--- | :--- | :--- |
| **Automations Sidebar Item** | CRM Sidebar under Messages | Item row | Active text `#7014D9`, bg `#F3ECFC` | Zap/Lightning icon + "Automations" | Active |
| **Builder Top Toolbar** | Top of canvas | Flex row items-center justify-between | Bg: `#FFFFFF`, border-b `#ECECF1`, px-4 py-3 | Input: "New Contact Follow-up", Scope: `My contacts (safe default) v`, Module: `Contacts v`, `AI Automation` pill, `Save Workflow` purple button | Configured |
| **Left Node Library** | Left column on canvas | 200px wide panel | Bg: `#FFFFFF`, rounded-2xl, border `#ECECF1` | Groups: TRIGGER (Record Created, Record Updated, etc.), ACTIONS (Send Email, Send SMS, WhatsApp), CONTROL (Condition, Wait/Delay, End) | Draggable library |
| **Canvas Area** | Center of view | Full width flex-1 | Dotted background `#E5E7EB`, overflow-hidden | Dotted canvas, zoom controls bottom-left (`+`, `-`, fit, lock), mini-map bottom-right | Interactive canvas |
| **Node 1: Record Created** | Canvas top center | 220px wide card | Bg: `#10B981` (green), text white, rounded-2xl | Play icon + "Record Created", subtitle `contacts`, bottom connection port | Connected to Node 2 |
| **Node 2: Send Email** | Canvas middle | 220px wide card | Bg: `#3B82F6` (blue), text white, rounded-2xl | Lightning icon + "Send Email", subtitle `{contact.email}`, top & bottom connection ports | Connected to Node 3 |
| **Node 3: End** | Canvas bottom | 160px wide card | Bg: `#EF4444` (red), text white, rounded-2xl | Square stop icon + "End", top connection port | Connected |
| **Connecting Lines** | Between nodes | Curved dashed SVG paths | Stroke `#7014D9`, dashed, strokeWidth 2 | Smooth curve with arrows directing from trigger to action to end | Rendered |
| **Right Node Config Panel** | Right column on canvas | 260px wide panel | Bg: `#FFFFFF`, border-l `#ECECF1`, p-4 | Heading: "NODE CONFIG", node name, template dropdown ("Email 3 — Understand customer needs"), recipient ("Contact Email"), Subject, Body, Insert event | Populated & saved |
| **Save Action** | Top toolbar right | Purple pill button | Bg: `#7014D9`, text white | "Save Workflow" | Clicked -> saves in tutorial data, toast "Workflow saved successfully" |

---

## Step 26: CRM Analytics (2:45–2:59)

URL: `crm.snaarp.com/analytics`
View: CRM Analytics Performance Dashboard
Source recording: `C:\Users\HP\Downloads\1119(4).mp4` (2:45–2:59)

### UI Elements & Specifications

| Element | Position / Layout | Size | Colors | Typography / Content | State |
| :--- | :--- | :--- | :--- | :--- | :--- |
| **Analytics Sidebar Item** | CRM Sidebar under MANAGE | Item row | Active text `#7014D9`, bg `#F3ECFC` | Activity/BarChart icon + "Analytics" | Active |
| **Analytics Header** | Top of main canvas | Flex row justify-between | Heading `#111111`, subtitle `#6B7280` | "Analytics" (bold 22px), "Track performance, identify trends, and make data-driven decisions", Date filter: `Last 30 days v` | Rendered |
| **6 KPI Metric Cards** | Top horizontal grid | 6 columns grid, gap-3 | Bg: `#FFFFFF`, rounded-[16px], border `#ECECF1` | Total Contacts (23, +100%), Active Deals (24, +100%), Deals Won (0, -100%), Conversion Rate (0%, -100%), Emails Sent (0), Activities (0) | Rendered |
| **Chart 1: Conversion Rate** | Row 2 left | Half width card | Bg: `#FFFFFF`, rounded-[16px], border `#ECECF1` | "Conversion Rate Over Time", "Deals won vs created per period", purple trendline curve across W45–W47 | Rendered |
| **Chart 2: Contact Growth** | Row 2 right | Half width card | Bg: `#FFFFFF`, rounded-[16px], border `#ECECF1` | "Contact Growth", "New contacts added over time", 3 purple bars across W45–W47 | Rendered |
| **Chart 3: Pipeline Trending** | Row 3 left | Half width card | Bg: `#FFFFFF`, rounded-[16px], border `#ECECF1` | "Pipeline Value Trending", "Deal value created over time", orange trendline curve | Rendered |
| **Chart 4: Activity Breakdown** | Row 3 right | Half width card | Bg: `#FFFFFF`, rounded-[16px], border `#ECECF1` | "Activity Breakdown", "Activities by type this period", Empty state: "No data for this period" | Empty state |
| **Date Range Dropdown** | Header top right | Popover menu | 160px wide | Last 7 days, Last 30 days, This month, This quarter, This year | `Last 30 days` selected |
| **Completion Card** | Follows Step 26 temporarily | Centered completion overlay | Bg: `#FFFFFF`, rounded-[24px], shadow-2xl | Title: "You're all set", Replay & Back to Snaarp buttons | Concludes Part 5 |

---

## Step 27: Report Builder and report generation (0:00–0:48)

URL: `crm.snaarp.com/reports`
Route: `/tutorials/crm`
View: Saved Reports panel, Report Configuration & Results Table
Source recording: `C:\Users\HP\Downloads\1120.mp4` (0:00–0:48)

### UI Elements & Specifications

| Element | Position / Layout | Size | Colors | Typography / Content | State |
| :--- | :--- | :--- | :--- | :--- | :--- |
| **Reports Sidebar Item** | CRM Sidebar under MANAGE | Item row | Active text `#7014D9`, bg `#F3ECFC` | FileText icon + "Reports" | Active |
| **Saved Reports Panel** | Left side of canvas | 240px wide panel | Bg: `#FFFFFF`, border-r `#ECECF1`, p-4 | Heading: "Saved Reports" (bold 14px), empty state: FileText icon + "No saved reports yet" | Empty state |
| **Workspace Header** | Top of main canvas | Flex row justify-between | Heading `#111111`, subtitle `#6B7280` | "Report Builder" (bold 20px), "Create custom reports from your CRM data", Action: `Schedule Delivery` (calendar icon) | Rendered |
| **Report Type Tabs** | Below header | Horizontal pill bar | Bg: `#F3F4F6`, rounded-full, p-1 | `Standard` (active `#F3ECFC`, text `#7014D9`), `Matrix/Pivot`, `Date Comparison`, `With Formulas` | `Standard` active |
| **Config Card** | Main workspace top | Full width card | Bg: `#FFFFFF`, rounded-[16px], border `#ECECF1`, p-5 | 4 field grid: Data Source (`Contacts`), Sort By (`Created Date` -> `First Name`), Order (`Newest first`), Max Results (`50`) | Populated |
| **Columns Chips** | Config card row 2 | Flex wrap gap-1.5 | Active bg `#F3ECFC`, text `#7014D9`, border `#DDD6FE` | 11 chips: First Name, Last Name, Email, Phone, Company, Job Title, Status, Source, City, Country, Created Date | Chip selection |
| **Group By Selector** | Config card row 3 left | Dropdown | Bg: `#FFFFFF`, border `#E5E7EB` | None, Status, Source, Company, Country | `Status` selected |
| **Visualization Tabs** | Config card row 3 right | Segmented group | Active bg `#F3ECFC`, text `#7014D9` | Table, Bar, Pie, Line | Clicked Bar then returns to Table |
| **Filters Section** | Config card row 4 | Flex col gap-2 | Button `#7014D9` text | "+ Add filter" button -> adds filter row: Field (`Status`), Operator (`equals`), Value (empty input), Remove `x` | 1 filter row active |
| **Run Report Button** | Config card bottom | Pill button | Bg: `#7014D9`, text white | "Run Report" | Clicked -> generates results |
| **Action Buttons Row** | Config card bottom after run | Flex row gap-2 | White pills, purple primary | `Run Report`, `Save`, `Export CSV`, `Export PDF` | Actions rendered |
| **Results Table** | Below config card | Full width table card | Bg: `#FFFFFF`, rounded-[16px], border `#ECECF1`, p-4 | Heading: "Results" (bold 14px), badge `7 records`. Columns: FIRST NAME, LAST NAME, EMAIL, STATUS, SOURCE, PHONE, COUNTRY | 7 fictional rows rendered |

---

## Step 28: Create an approval request (0:48–1:15)

URL: `crm.snaarp.com/approvals`
Route: `/tutorials/crm`
View: Approvals List & New Approval Request Modal Dialog
Source recording: `C:\Users\HP\Downloads\1120.mp4` (0:48–1:15)

### UI Elements & Specifications

| Element | Position / Layout | Size | Colors | Typography / Content | State |
| :--- | :--- | :--- | :--- | :--- | :--- |
| **My Requests Sidebar Item** | CRM Sidebar under MANAGE | Item row | Active text `#7014D9`, bg `#F3ECFC` | CheckSquare icon + "My Requests" | Active |
| **Approvals Header** | Top of canvas | Flex row justify-between | Heading `#111111`, subtitle `#6B7280` | "Approvals" (bold 20px), "Raise, review and manage approval requests" | Rendered |
| **Approval Tabs** | Top right beside header | Segmented tabs + button | Active border-b-2 `#7014D9`, purple button | `Pending (0)`, `All (0)`, `+ New Request` purple pill button | Initial empty state |
| **Empty State** | Center of view | Centered card | Text `#6B7280`, icon `#9CA3AF` | CheckCircle icon + "No pending approvals" | Displayed |
| **New Request Modal** | Centered modal overlay | 520px wide, max-h-[85vh] | Bg: `#FFFFFF`, rounded-[20px], shadow-2xl | Title: "New Approval Request", 5 fields, Cancel & Submit buttons | Open overlay |
| **Request Type** | Modal field 1 | Dropdown | Bg: `#FFFFFF`, border `#E5E7EB` | Discount approval, Close a deal, Quote approval, Expense approval, Other | `Discount approval` selected |
| **Related To** | Modal field 2 | Dropdown | Bg: `#FFFFFF`, border `#E5E7EB` | Deal, Contact, Company, Lead | `Deal` selected |
| **Record** | Modal field 3 | Dropdown | Bg: `#FFFFFF`, border `#E5E7EB` | Fictional CRM records: Sam Taylor, Alex Morgan, Casey Brown, Jordan Lee | `Sam Taylor` selected |
| **Approvers List** | Modal field 4 | Checkbox list | Borders `#E5E7EB` | Supporting label: "Approvers (approved in the order selected)". Options: Olivia Grant, Daniel Okoye, Finance Reviewer, Sales Manager | `Finance Reviewer` checked |
| **Reason** | Modal field 5 | Textarea | Border `#E5E7EB` | Placeholder: "Why is this approval needed?" | Left blank |
| **Submit Request** | Modal footer | Purple pill button | Bg: `#7014D9`, text white | "Submit Request" -> loading "Submitting..." -> toast "Approval request submitted" | Submitted |
| **Updated Approvals List** | Main canvas | 2 request cards | Bg: `#FFFFFF`, rounded-2xl, border `#ECECF1`, p-4 | Tabs: `Pending (1)`, `All (2)`. Cards display: Discount, Pending badge, Requested by Jane Doe, Date 20/11/2026, Approve & Reject buttons | 2 cards displayed |

---

## Step 29: Approval management, permission handling and rejection (1:15–1:44)

URL: `crm.snaarp.com/approvals`
Route: `/tutorials/crm`
View: Approval Cards, Permission Error Toast, Rejection & Filter Views
Source recording: `C:\Users\HP\Downloads\1120.mp4` (1:15–1:44)

### UI Elements & Specifications

| Element | Position / Layout | Size | Colors | Typography / Content | State |
| :--- | :--- | :--- | :--- | :--- | :--- |
| **Approve Button** | Request card right | Green outline / light pill | Bg: `#ECFDF5`, text `#059669`, border `#A7F3D0` | Check icon + "Approve" | Clicked -> triggers permission check |
| **Permission Error Toast** | Top right floating | Auto width | Bg: `#EF4444`, text white, rounded-xl, shadow-lg | Alert icon + "You are not the current approver for this request" | Displayed on Approve |
| **Reject Button** | Request card right | Red outline / light pill | Bg: `#FEF2F2`, text `#DC2626`, border `#FECACA` | X icon + "Reject" | Clicked -> rejects request |
| **Rejected Toast** | Top right floating | Auto width | Bg: `#111827`, text white, rounded-xl, shadow-lg | Check icon + "Rejected" | Displayed on Reject |
| **Rejected Status Badge** | First request card | Pill badge | Bg: `#FEE2E2`, text `#991B1B` | "Rejected" | Updated status |
| **All Filter Tab** | Top header tabs | Pill button | Active `#7014D9`, text `#7014D9` | `All (2)` | Clicked -> displays 2 requests (1 Rejected, 1 Pending) |
| **Pending Filter Tab** | Top header tabs | Pill button | Active `#7014D9`, text `#7014D9` | `Pending (0)` | Clicked -> displays final empty state |
| **Final Empty State** | Center of view | Centered card | Text `#6B7280` | CheckCircle icon + "No pending approvals" | Matches final recording state |

---

## Step 30: System admin overview and team members (0:00–1:05)

URL: `crm.snaarp.com/admin/overview` -> `crm.snaarp.com/admin/team`
Route: `/tutorials/crm`
View: System Admin Overview & Team Members Management
Source recording: `C:\Users\HP\Downloads\1120(2).mp4` (0:00–1:05)

### UI Elements & Specifications

| Element | Position / Layout | Size | Colors | Typography / Content | State |
| :--- | :--- | :--- | :--- | :--- | :--- |
| **System Admin Sidebar** | Left column next to suite rail | 240px wide, flex col | Bg: `#FFFFFF`, border-r: `#ECECF1` | Header: "PLATFORM / System Admin". Nav: Overview, Team Members, Products, Events, Event Attendees, Transfer Leads, Forecasting, Pipeline Settings, Ads & Social, Automation, Automation Templates, Audit Logs, Web Forms, Web Form Leads, Settings. Bottom: "Back to Sales CRM" | `Overview` active initially |
| **Overview Header** | Top of main canvas | Flex row justify-between | Heading `#111111`, subtitle `#6B7280` | Heading: "Analytics" (bold 20px), Subtitle: "Performance across all salesperson CRMs", Date pill: "Last 30 days" | Displayed |
| **KPI Metric Cards** | Main content top grid | 4 columns x 2 rows (8 cards) | Bg: `#FFFFFF`, rounded-[16px], border `#ECECF1`, p-4 | 1: "379 New Contacts", 2: "1 Deals Won", 3: "£0 Revenue", 4: "3% Win Rate", 5: "£27,850 Pipeline Value", 6: "379 New Deals", 7: "0 Activities", 8: "5 Tasks Created" | 8 cards rendered |
| **Performance by Salesperson Table** | Below KPI cards | Full width table card | Bg: `#FFFFFF`, rounded-[16px], border `#ECECF1`, p-4 | Columns: REP, CONTACTS, DEALS WON, OPEN DEALS, REVENUE, ACTIVITIES. Fictional reps: Alex Morgan, Jordan Lee, Priya Shah, Sam Taylor, Daniel Okoye, Casey Brown | 6 rep rows |
| **Team Members Nav Item** | System Admin sidebar | Item row | Active text `#7014D9`, bg `#F3ECFC` | Users icon + "Team Members" | Clicked -> switches view to Team Members |
| **Team Members Header** | Top of main canvas | Flex row justify-between | Heading `#111111`, subtitle `#6B7280` | "Team Members" (bold 20px), "Users from your Snaarp account. Add or manage them in the accounts admin." Actions: `Roles & permissions`, `Add Salesperson` | Displayed |
| **Team Members Table** | Main content area | Full width table card | Bg: `#FFFFFF`, rounded-[16px], border `#ECECF1`, p-4 | Columns: NAME, EMAIL, DEPARTMENT, ACCOUNT ROLE, CRM ACCESS, STATUS, ACTIONS. Fictional members: Alex Morgan, Jordan Lee, Priya Shah, Sam Taylor, Daniel Okoye, Casey Brown | 6 user rows |
| **CRM Access Dropdown** | Sam Taylor row CRM access cell | Select dropdown | Bg: `#FFFFFF`, border `#E5E7EB` | Options: Full access (admin), Full access (no role), Viewer, Sales Rep | Clicked -> changed to "Viewer" |
| **Role Update Toast** | Top right floating | Auto width | Bg: `#111827`, text white, rounded-xl | Check icon + "Role updated for Sam Taylor" | Rendered |

---

## Step 31: Roles and permissions (1:05–1:55)

URL: `crm.snaarp.com/admin/team` (Roles modal)
Route: `/tutorials/crm`
View: Roles & Permissions Matrix Modal Dialog
Source recording: `C:\Users\HP\Downloads\1120(2).mp4` (1:05–1:55)

### UI Elements & Specifications

| Element | Position / Layout | Size | Colors | Typography / Content | State |
| :--- | :--- | :--- | :--- | :--- | :--- |
| **Roles & Permissions Button** | Team Members page top right | White pill button | Bg: `#FFFFFF`, border `#E5E7EB`, text `#111111` | Shield icon + "Roles & permissions" | Clicked -> opens modal |
| **Roles Modal Dialog** | Centered modal overlay | 880px wide, max-h-[85vh] | Bg: `#FFFFFF`, rounded-[20px], shadow-2xl | Flex row with sidebar and matrix canvas | Open overlay |
| **Roles Sidebar** | Modal left pane | 220px wide | Bg: `#F9FAFB`, border-r `#ECECF1`, p-3 | ROLES list: `Admin (locked)`, `Viewer`, `Sales Rep`. Bottom: `+ New role` button | `Admin (locked)` active initially |
| **Admin Permissions Matrix** | Modal right pane | Flex-1, p-5 | Banner `#FEF3C7`, table `#FFFFFF` | Header: "Admin — Permissions", "Full access to every module". Alert banner: "Admins always have full access. This role can't be changed." Matrix: 10 modules x 5 actions (all checked & disabled) | Locked display |
| **New Role Button** | Roles sidebar bottom | Purple outlined pill | Text `#7014D9`, border `#DDD6FE` | Plus icon + "New role" | Clicked -> opens role creator |
| **Role Name Input** | Role creator form | Full width text input | Bg: `#FFFFFF`, border `#E5E7EB` | Placeholder: "e.g. Sales Associate", Label: "Role Name *" | Typed "Auditor" |
| **Description Input** | Role creator form | Textarea / input | Bg: `#FFFFFF`, border `#E5E7EB` | Placeholder: "Brief description (optional)" | Optional |
| **Permission Checkboxes** | Permissions matrix | 10 rows x 5 checkboxes | Checkboxes `#7014D9` | Modules: Contacts, Companies, Prospects & Deals, Forecasts, Tasks & Calendar, Calls, Messages, Automations, Web Forms, Reports & Analytics. Actions: View, Create, Edit, Delete, Approve | Forecasts: View checked, Create checked |
| **Create Role Button** | Modal footer | Purple pill button | Bg: `#7014D9`, text white | "Create role" | Clicked -> adds Auditor role |
| **Role Created Toast** | Top right floating | Auto width | Bg: `#111827`, text white, rounded-xl | Check icon + "Role \"Auditor\" created" | Displayed |
| **Roles Modal Close** | Modal top right | Icon button | Text `#6B7280` | X icon | Clicked -> closes modal |

---

## Step 32: Admin users and products catalogue (1:55–3:30)

URL: `admin.snaarp.com/admin/users` -> `crm.snaarp.com/admin/products`
Route: `/tutorials/crm`
View: Admin Users Directory & CRM Products Catalogue (Grid, List, Add, Edit, Bulk Delete)
Source recording: `C:\Users\HP\Downloads\1120(2).mp4` (1:55–3:30)

### UI Elements & Specifications

| Element | Position / Layout | Size | Colors | Typography / Content | State |
| :--- | :--- | :--- | :--- | :--- | :--- |
| **Admin Users View** | Standalone organization admin | Full width screen | Bg: `#F6F6F8` | Header: "Users", "Manage the people in your organization." KPI cards: 17 Active Users, 27 Suspended Users, 7 Administrators. Tabs: Active Users, Suspended Users. Directory table. Action: "Return to CRM" | Inspected briefly, returns to CRM |
| **Products Nav Item** | System Admin sidebar | Item row | Active text `#7014D9`, bg `#F3ECFC` | Package icon + "Products" | Active |
| **Products Header** | Top of main canvas | Flex row justify-between | Heading `#111111`, subtitle `#6B7280` | "Products" (bold 20px), "20 products · drop these into email templates". Actions: Export, Import, `+ Add Product` | Rendered |
| **Search & Filters Row** | Below products header | Flex row items-center justify-between | Inputs & toggles | Search input ("Search products..."), Sort dropdown ("Newest" -> "Name A-Z"), View toggle (Grid / List) | Grid view initially |
| **Product Grid Cards** | Main content area | 4 columns grid, gap-4 | Bg: `#FFFFFF`, rounded-[16px], border `#ECECF1`, p-4 | 12 products: Books, CRM, Document, Drive, Identity, Lock: Password Manager, Mail, Meet, PDF, Projects, Sendrit, Sheet. Card shows icon/thumbnail, name, SKU, price, actions | Grid displayed |
| **List View Toggle** | Filter controls right | Segmented button | Active bg `#F3ECFC`, text `#7014D9` | List icon button | Clicked -> switches to table view |
| **Product List Table** | Main content area in list mode | Full width table | Bg: `#FFFFFF`, rounded-[16px], border `#ECECF1` | Columns: Checkbox, Product, SKU, Category, Price, Status ("Active" green badge), Actions (Edit, Duplicate, Delete) | List displayed |
| **Sort Dropdown** | Filter controls center | Select dropdown | Bg: `#FFFFFF`, border `#E5E7EB` | Options: Newest, Oldest, Name A-Z, Price Low-High, Price High-Low | Changed to "Name A-Z" |
| **Add Product Button** | Header top right | Purple pill button | Bg: `#7014D9`, text white | Plus icon + "Add Product" | Clicked -> opens modal |
| **Add Product Modal** | Centered modal overlay | 560px wide | Bg: `#FFFFFF`, rounded-[20px], shadow-2xl | Fields: Name, SKU, Category, Price, Currency, Image, Description, Active checkbox, Email Preview. Cancel & Create Product buttons | Inspected, then Cancelled |
| **Edit Lock Product Action** | Lock: Password Manager row | Action button | Text `#6B7280`, hover `#111111` | Edit icon | Clicked -> opens edit modal |
| **Edit Product Modal** | Centered modal overlay | 560px wide | Bg: `#FFFFFF`, rounded-[20px], shadow-2xl | Pre-filled with "Lock: Password Manager", SKU `LOCK-01`, price `£4.99`. Cancel & Save Changes buttons | Inspected, then Cancelled |
| **Bulk Checkboxes** | Table row leftmost cells | Checkboxes | Purple accent `#7014D9` | Books checkbox clicked, CRM checkbox clicked | 2 selected |
| **Bulk Action Bar** | Top of table floating/pinned | Flex row justify-between | Bg: `#7014D9`, text white, rounded-xl, p-3 | Left: "2 selected", Right: "Clear", "Delete" (trash icon button) | Displayed on selection |
| **Bulk Delete Action** | Bulk action bar right | Red/white pill button | Bg: `#EF4444`, text white | Trash icon + "Delete" | Clicked -> removes Books & CRM |
| **Updated Products Table** | Main content area | Table card | Same | Remaining products displayed, selection bar dismissed | Updated list |

---

## Step 33: Events management (3:30–4:35)

URL: `crm.snaarp.com/admin/events`
Route: `/tutorials/crm`
View: Events Management, Event Detail Cards, Add Contact Slide-Over & Event Modals
Source recording: `C:\Users\HP\Downloads\1120(2).mp4` (3:30–4:35)

### UI Elements & Specifications

| Element | Position / Layout | Size | Colors | Typography / Content | State |
| :--- | :--- | :--- | :--- | :--- | :--- |
| **Events Nav Item** | System Admin sidebar | Item row | Active text `#7014D9`, bg `#F3ECFC` | Calendar icon + "Events" | Active |
| **Events Header** | Top of main canvas | Flex row justify-between | Heading `#111111`, subtitle `#6B7280` | "Events" (bold 20px), "Create events like webinars and masterclasses, then use them in automations — e.g. \"remind attendees 1 day before\"." Actions: Search input, `+ New event` | Rendered |
| **Event Card** | Main content area | Full width card | Bg: `#FFFFFF`, rounded-[16px], border `#ECECF1`, p-5 | Title: "Free Masterclass", badge: "Upcoming" (green), Date: "Friday 27 November 2026, 03:00", Location: "Live Online", Link: `https://example.com/events/free-masterclass`, Attendees: "2 attendees", Actions: `Add contact`, `Edit` | Displayed |
| **Add Contact Button** | Event card right | White pill button | Bg: `#FFFFFF`, border `#E5E7EB`, text `#111111` | UserPlus icon + "Add contact" | Clicked -> opens right slide-over |
| **Add Contact Slide-Over** | Right pinned drawer | 360px wide, full height | Bg: `#FFFFFF`, border-l `#ECECF1`, shadow-xl | Header: "Add a contact", Search input, List of 2 registered contacts (Alex Morgan, Priya Shah) with `Remove` buttons | Inspected, then closed |
| **New Event Button** | Events header top right | Purple pill button | Bg: `#7014D9`, text white | Plus icon + "New event" | Clicked -> opens modal |
| **New Event Modal** | Centered modal overlay | 540px wide | Bg: `#FFFFFF`, rounded-[20px], shadow-2xl | Title: "New Event". Fields: Name, Starts, Ends, Time zone (Africa/Lagos), Location (Live Online), Details link, Description | Filled & Saved |
| **Save Event Button** | Modal footer | Purple pill button | Bg: `#7014D9`, text white | "Save" | Clicked -> toast "Event created" |
| **Edit Event Button** | Free Masterclass card | White pill button | Bg: `#FFFFFF`, border `#E5E7EB`, text `#111111` | Edit icon + "Edit" | Clicked -> opens edit modal |
| **Edit Event Modal** | Centered modal overlay | 540px wide | Bg: `#FFFFFF`, rounded-[20px], shadow-2xl | Title: "Edit Event". Pre-filled fields, plus "Cancelled" checkbox | Inspected unchecked, then Cancelled |

---

## Step 34: Event attendees (4:35–5:19)

URL: `crm.snaarp.com/admin/event-attendees`
Route: `/tutorials/crm`
View: Event Attendees Directory, Filter Tabs, Pagination & Contact Profile Drawer
Source recording: `C:\Users\HP\Downloads\1120(2).mp4` (4:35–5:19)

### UI Elements & Specifications

| Element | Position / Layout | Size | Colors | Typography / Content | State |
| :--- | :--- | :--- | :--- | :--- | :--- |
| **Event Attendees Nav Item** | System Admin sidebar | Item row | Active text `#7014D9`, bg `#F3ECFC` | Users icon + "Event Attendees" | Active |
| **Attendees Header** | Top of main canvas | Flex row justify-between | Heading `#111111`, subtitle `#6B7280` | "Event Attendees" (bold 20px), "Everyone registered for your events, from web forms or added by hand." Actions: "All events" dropdown, Search input, Export | Rendered |
| **Attendees Filter Tabs** | Below header | Horizontal pill/segmented tabs | Active border-b-2 `#7014D9`, text `#7014D9` | `All 2`, `Web form 2`, `Added manually 0` | `All 2` active initially |
| **Attendees Table** | Main content area | Full width table card | Bg: `#FFFFFF`, rounded-[16px], border `#ECECF1` | Columns: Checkbox, ATTENDEE, CONTACT, STAGE, EVENT, SOURCE, REGISTERED, ACTIONS. Rows: Alex Morgan, Priya Shah | 2 attendee rows rendered |
| **Web Form Tab** | Filter tabs center | Tab button | Active `#7014D9` | `Web form 2` | Clicked -> filters to 2 web form attendees |
| **Added Manually Tab** | Filter tabs right | Tab button | Text `#6B7280` | `Added manually 0` | Clicked -> shows empty state: "No attendees found" |
| **All Tab** | Filter tabs left | Tab button | Text `#7014D9` | `All 2` | Clicked -> returns to all attendees |
| **Attendee Name Link** | Alex Morgan row | Clickable link | Text `#7014D9`, hover underline | "Alex Morgan" | Clicked -> opens contact profile drawer |
| **Contact Profile Drawer** | Right slide-over drawer | 400px wide, full height | Bg: `#FFFFFF`, border-l `#ECECF1`, shadow-xl | Profile header: Alex Morgan, alex.morgan@example.com, Company: Acme Ltd, Stage: New, Close X button | Inspected, then closed |
| **Completion Card** | Follows Step 34 automatically | Centered completion overlay | Bg: `#FFFFFF`, rounded-[24px], shadow-2xl | Title: "You're all set", Replay & Back to Snaarp buttons | Concludes complete 34-step CRM tutorial |

