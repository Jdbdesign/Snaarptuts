# UI-MATCH Specification: Snaarp Projects (Steps 1–9)

Reference video: `C:\Users\HP\Downloads\1115 (4).mp4` (1386×720, 265s / 4:25).  
Design width: 1440px. Design tokens: Poppins font, brand purple `#7014D9` / `#7C3AED`, page background `#F6F6F8`, white containers `#FFFFFF`.

---

## 1. App Shell & Navigation Layout

Frames: `ref/projects/frame_0005.png`, `frame_0045.png`, `frame_0208.png`, `frame_0245.png`

| Element / Zone | Position & Dimensions | Colors & Typography | Content / Actions | Frame Ref |
|---|---|---|---|---|
| **Suite Rail** | `left: 0`, `w-14` (56px), full height | `bg-[#F7F6FB] border-r border-gray-200` | Mail, Meets, Teams, One Cardx, Sheets, Docs, Slides, PDF, Lock, Sign, Drive, Me, CRM. Pinned bottom: Logout. No product active. | `frame_0005.png` |
| **Top Bar** | `top: 0`, `h-14` (56px), spans content width | `bg-white border-b border-gray-200 flex items-center justify-between px-6` | **Left**: Hamburger (`w-5 h-5`), Projects purple rounded logo (`w-6 h-6`) + "Projects" bold wordmark + collapse icon.<br>**Center**: Search box `w-80 bg-gray-100/70 rounded-xl px-3 py-1.5 text-xs` with placeholder "Search tasks, projects...".<br>**Right**: Bell icon, 9-dot apps icon, purple circular avatar "J" with chevron down. | `frame_0005.png` |
| **Projects Sidebar** | `left: 56px`, `w-[200px]`, full height | `bg-white border-r border-gray-200 flex flex-col justify-between py-4` | **WORKSPACE**: Dashboard (`LayoutDashboard`), Projects (`FolderKanban`), Sprints (`RotateCw`), Tasks (`CheckSquare`), Whiteboards (`PenTool`), Docs (`FileText`).<br>**MANAGE**: Automations (`Zap`), Integration (`Boxes`).<br>**INSIGHTS**: Reports (`BarChart2`).<br>**Bottom**: `Report a Bug` (red bug icon + `#EF4444` text).<br>Active state: `bg-[#F5EEFF] text-[#7014D9] font-semibold rounded-xl border-l-4 border-[#7014D9]`. | `frame_0005.png` |

---

## 2. Step 1: Meet Snaarp Projects (`projects.snaarp.com/dashboard`)

Frames: `ref/projects/frame_0005.png`, `frame_0015.png`

| Element / Zone | Position & Dimensions | Colors & Typography | Content / Actions | Frame Ref |
|---|---|---|---|---|
| **Greeting Header** | Top of dashboard content | `text-gray-900` | Left: "Hello jane@example.com, Welcome Back," (`font-bold text-lg`), subtitle "Here's what's happening across your workspace today." (`text-xs text-gray-500`).<br>Right: `+ Add Task` purple button (`bg-[#7014D9] text-white font-semibold text-xs px-4 py-2 rounded-xl shadow-xs`). | `frame_0005.png` |
| **5 Stat Cards** | Row of 5 cards below greeting | `grid grid-cols-5 gap-4` | 1. **To-do**: value `7`, light-purple circular clipboard icon.<br>2. **Total Projects**: value `4`, light-blue circular folder icon.<br>3. **Assigned Tasks**: value `0`, light-green circular check icon.<br>4. **Completed**: value `0`, light-yellow circular chart icon.<br>5. **Overdue**: value `1`, light-red circular alert icon.<br>Each card: `bg-white border border-gray-200/80 rounded-2xl p-4 shadow-xs flex justify-between items-center`. | `frame_0005.png` |
| **Critical Projects** | Left 60% card in middle row | `bg-white border border-gray-200/80 rounded-2xl p-5 shadow-xs` | **Header**: "Critical Projects" (`font-bold text-sm text-gray-900`) + link "See All" (`text-xs text-[#7014D9] font-medium`).<br>**4 List Rows**: <br>• "Customer Acquisition Strategy" (purple square "C", subtitle snippet, avatars A D Y, pill "BOARD").<br>• "Digital Marketing" (blue square "D", subtitle, avatars A D Y, pill "BOARD").<br>• "Mobile App Launch" (purple square "E", subtitle, avatars A D Y, pill "BOARD").<br>• "Backend Fix" (indigo square "B", subtitle, avatars A D Y, pill "BOARD"). | `frame_0005.png` |
| **Team Status** | Right 40% card in middle row | `bg-white border border-gray-200/80 rounded-2xl p-5 shadow-xs flex flex-col justify-between` | **Header**: "Team Status" (`font-bold text-sm text-gray-900`).<br>**5 Rows**: Round avatar, email, role (Admin/Member), green active status dot.<br>**Footer**: "Team Progress" (`text-xs text-gray-500`), "0%" (`font-bold text-xs text-gray-900`). | `frame_0005.png` |
| **Calendar View** | Bottom card spanning full width | `bg-white border border-gray-200/80 rounded-2xl p-5 shadow-xs` | **Header**: "Calendar View" (`font-bold text-sm text-gray-900`).<br>**Controls (right)**: Year dropdown `2026 v`, Month dropdown `Nov v`, Toggle switch `Month` (active purple) \| `Year` (outline).<br>**Grid**: 7 columns (Su, Mo, Tu, We, Th, Fr, Sa), days 01 through 30. Today: "15" highlighted in purple circle with white text. | `frame_0005.png`, `frame_0028.png` |

---

## 3. Step 2: Check the calendar (`projects.snaarp.com/dashboard`)

Frames: `ref/projects/frame_0020.png`, `frame_0024.png`, `frame_0028.png`

| Element / Zone | Position & Dimensions | Colors & Typography | Content / Actions | Frame Ref |
|---|---|---|---|---|
| **Toggle Year View** | Calendar View top right controls | `flex items-center gap-2` | Cursor clicks `Year` button in toggle group. Month dropdown collapses. Toggle changes to `Month` (white outline) \| `Year` (purple filled). | `frame_0024.png` |
| **Year Months Grid** | Inside Calendar View | `grid grid-cols-3 gap-6 py-6 text-center text-sm font-medium text-gray-700` | 12 month tiles: Jan, Feb, Mar / Apr, May, Jun / Jul, Aug, Sep / Oct, Nov, Dec.<br>`Nov` is highlighted with purple pill (`bg-[#7014D9] text-white px-4 py-1.5 rounded-full font-bold`). | `frame_0024.png` |
| **Return to Month** | Calendar View controls | Interactive | Cursor hovers and clicks `Month`. Calendar grid restores, showing Su-Sa header and November days with "15" circled. | `frame_0028.png` |

---

## 4. Step 3: Browse and search your projects (`projects.snaarp.com/projects`)

Frames: `ref/projects/frame_0045.png`, `frame_0055.png`

| Element / Zone | Position & Dimensions | Colors & Typography | Content / Actions | Frame Ref |
|---|---|---|---|---|
| **Projects Header** | Top of Projects view | `flex items-center justify-between` | Left: "Projects" (`font-bold text-xl text-gray-900`), badges `4 Total` (purple pill) and `4 Active` (gray pill).<br>Right: View switcher `Grid` (purple active) \| `List` (gray outline), button `+ New Project` (`bg-[#7014D9] text-white font-semibold text-xs px-4 py-2 rounded-xl`). | `frame_0045.png` |
| **Filter & Search Bar** | Below header | `flex items-center gap-3 py-3` | Button `Filter` (`border border-gray-200 rounded-xl px-3 py-1.5 text-xs text-gray-700 flex items-center gap-1.5`).<br>Search input `Search projects...` with magnifying glass. | `frame_0045.png` |
| **Projects Grid** | Main content area | `grid grid-cols-3 gap-4` | 4 cards: "Customer Acquisition Strategy", "Digital Marketing", "Mobile App Launch", "Backend Fix".<br>Card details: Pills `Internal`, `BOARD`, `Active`, `Medium`. Item count `0/7 items 0%`. Date `Oct 15, 2026`. Team avatars `A D`. | `frame_0045.png` |
| **Project Details Drawer** | Slide-out from right, `w-[380px]` | `bg-white border-l border-gray-200 p-5 shadow-lg flex flex-col justify-between` | **Header**: Pill `Active`, text `Double-click name/description to edit`, icons trash and close `X`.<br>**Title & Desc**: "Customer Acquisition Strategy", description.<br>**Progress**: `0 of 7 completed` `0%`, progress bar, `7 tasks · 0 issues · 0 bugs`.<br>**Details**: Priority `Medium`, Category `Development`, Start `Oct 13, 2026`, Due `Oct 15, 2026`, Client `Customer`, Lead `Sam Taylor`.<br>**Team (8)**: Link `+ Manage` with purple user-plus icon. 8 round avatars with email tags.<br>**Milestones**: "No milestones yet...", button `+ Add Tasks`. | `frame_0055.png` |

---

## 5. Step 4: Create a project from a template (`projects.snaarp.com/projects`)

Frames: `ref/projects/frame_0075.png`, `frame_0085.png`, `frame_0140.png`, `frame_0160.png`, `frame_0172.png`, `frame_0180.png`, `frame_0200.png`

| Element / Zone | Position & Dimensions | Colors & Typography | Content / Actions | Frame Ref |
|---|---|---|---|---|
| **New Project Action** | Top right of Projects view | Button | Cursor clicks `+ New Project`. | `frame_0070.png` |
| **Template Gallery Modal** | Centered modal, `w-[680px]` | `bg-white rounded-2xl shadow-2xl p-6 border border-gray-200/90` | **Header**: "Template Gallery", subtitle "Choose a template to get started quickly, or start from scratch.", close `X`.<br>**Categories**: `All` (purple pill), `Software/IT`, `Marketing/Sales`, `Construction`, `Manufacturing`, `Pharma`, `HR`, `Others`.<br>**Search**: `Search templates...`.<br>**Cards**: Blank Project, "Explore Snaarp Projects!" (`Others`, 5 tasks), Digital Marketing, Customer Acquisition Strategy, Software Development, Product Launch Plan, Website Development, IT Support Project. | `frame_0075.png` |
| **Template Setup Form** | Replaces template grid in modal | `bg-white rounded-2xl p-6 space-y-4` | **Back link**: `← Back to templates`.<br>**Title**: "Explore Snaarp Projects!", tag `Others`.<br>**Fields**:<br>• PROJECT NAME: "Explore Snaarp Projects!"<br>• CLIENT: "Acme Studio"<br>• CATEGORY: "Research"<br>• START DATE: "2026-11-16", END DATE: "2026-12-19" (via calendar picker)<br>• LEAD ASSIGNEE: "Jane Doe"<br>• PRIORITY: `High` (purple pill)<br>• PREDEFINED TASKS (5): "Create your first project", "Add team members", "Set up task statuses", "Create milestones", "Explore reports"<br>• STATUS WORKFLOW: To Do, In Progress, Done, Closed<br>• Bottom buttons: `Cancel` and `Use Template` (purple button). | `frame_0085.png`, `frame_0160.png` |
| **Toast & Created Project** | Screen top center toast & grid | Toast: `bg-white border border-gray-200 rounded-xl px-4 py-2.5 shadow-md flex items-center gap-2` | Green check icon + text `Project "Explore Snaarp Projects!" created with 5 tasks!`.<br>Grid updates to 5 cards (`5 Total` `5 Active`). Top-left card is "Explore Snaarp Projects!", Due Dec 19 2026.<br>Right drawer opens showing created project details, Team (8), and `+ Manage` link. | `frame_0172.png`, `frame_0180.png`, `frame_0200.png` |

---

## 6. Step 5: Manage the project team (`projects.snaarp.com/members`)

Frames: `ref/projects/frame_0200.png`, `frame_0208.png`, `frame_0215.png`, `frame_0220.png`

| Element / Zone | Position & Dimensions | Colors & Typography | Content / Actions | Frame Ref |
|---|---|---|---|---|
| **Manage Team Link** | Drawer TEAM (8) section | Link | Cursor clicks `+ Manage` link in right drawer -> navigates to `projects.snaarp.com/members`. | `frame_0200.png` |
| **Members Page Header** | Top of Members view | `flex items-center gap-2 mb-4` | Icon `Users`, Title "Members" (`font-bold text-xl text-gray-900`), badge `17` (`bg-gray-100 text-gray-600 text-xs px-2 py-0.5 rounded`). | `frame_0208.png` |
| **Members Table** | Full width table | `bg-white border border-gray-200 rounded-2xl overflow-hidden text-xs` | Columns: `Member` | `Role` | `Status` | `Actions`.<br>**8 Active Rows**: Sam Taylor (Admin), Casey Brown (Member -> change to Admin), Jane Doe (Member), Jordan Lee (Admin), Alex Morgan (Member), Priya Shah (Member), Elena Marsh (Member), Ravi Menon (Member).<br>**12 Not-in-workspace Rows**: Greyed text, "Member", "Not in workspace". | `frame_0208.png`, `frame_0215.png` |
| **Update Role Action** | Casey Brown row Role dropdown | Dropdown interaction | Cursor clicks Role dropdown on Casey Brown row, changes "Member" to "Admin". Pill updates, and brief toast `Role updated to Admin` confirms. | `frame_0208.png` |

---

## 7. Step 6: Open a project's tasks (`projects.snaarp.com/tasks`)

Frames: `ref/projects/frame_0245.png`

| Element / Zone | Position & Dimensions | Colors & Typography | Content / Actions | Frame Ref |
|---|---|---|---|---|
| **Sidebar Nav to Tasks** | Projects Sidebar | Button | Cursor clicks "Tasks" in sidebar (`[data-tl=nav-tasks]`). URL updates to `projects.snaarp.com/tasks`. | `frame_0220.png`, `frame_0245.png` |
| **Work Items Header** | Top of Tasks view | `flex items-center justify-between` | Left: icon `CheckSquare`, "Work Items" (`font-bold text-xl text-gray-900`), subtitle `5 tasks · 0 issues · 0 bugs`.<br>Right: button `+ Add Task` (`bg-[#7014D9] text-white font-semibold text-xs px-4 py-2 rounded-xl`). | `frame_0245.png` |
| **Project & Progress Bar** | Below header | `space-y-3` | Project dropdown: `Project: Explore Snaarp Projects! v` (left) and `Explore Snaarp Projects!` label (right).<br>Overall Progress: `0 of 5 completed · 0%`, full-width progress bar. | `frame_0245.png` |
| **Work Items Tabs** | Above table | `flex items-center justify-between border-b border-gray-200 pb-3` | Left pills: `Tasks (5)` (purple pill, white text), `Issues (0)`, `Bugs (0)`.<br>Sub-tabs: `List View` (active with purple underline), `Board`, `Gantt`, `Calendar`. | `frame_0245.png` |
| **Tasks Table (5 Tasks)** | Main content area | `w-full bg-white border border-gray-200 rounded-2xl overflow-hidden text-xs` | Columns: `Type` \| `Title` \| `Status` \| `Priority` \| `Assignee` \| `Due Date` \| `Actions`.<br>5 rows: "Create your first project", "Add team members", "Set up task statuses", "Create milestones", "Explore reports". All `To Do`, `Normal` or `Low`, `Unassigned`, `—`. | `frame_0245.png` |

---

## 8. Step 7: Add a task (`projects.snaarp.com/tasks`)

Frames: `ref/projects/frame_0270.png`, `frame_0380.png`, `frame_0405.png`, `frame_0435.png`, `frame_0448.png`

| Element / Zone | Position & Dimensions | Colors & Typography | Content / Actions | Frame Ref |
|---|---|---|---|---|
| **Add Task Button** | Top right of Tasks view | Button | Cursor clicks `+ Add Task` -> slide-out drawer opens on right (`w-[380px]`). | `frame_0270.png` |
| **Add Task Drawer Fields** | Right drawer | `p-5 space-y-4` | • Title input: type "Research competitor onboarding flows".<br>• Assignee: select `jane@example.com` and `sam.taylor@example.com` (show tags).<br>• Due Date: "2026-11-19".<br>• Priority: select "High" (orange dot).<br>• Status: "To Do" (blue dot).<br>• Sub-tasks: type "Compile findings into a spreadsheet", click purple `+` button -> subtask item adds with checkbox. | `frame_0380.png`, `frame_0405.png`, `frame_0435.png` |
| **Create Task & Toast** | Drawer bottom button & screen top | Button / Toast | Click `Create Task`. Drawer closes.<br>Toast: `Task created`.<br>Table updates to 6 tasks (`6 tasks · 0 issues · 0 bugs`, tab `Tasks (6)`, progress `0 of 6 completed · 0%`).<br>New row: "Research competitor onboarding flows", Status To Do, Priority High, Assignee `J S jane@example.com +1`, Due Date `19/11/2026`. | `frame_0448.png` |

---

## 9. Step 8: Update a task (`projects.snaarp.com/tasks`)

Frames: `ref/projects/frame_0448.png`, `frame_0456.png`, `frame_0465.png`

| Element / Zone | Position & Dimensions | Colors & Typography | Content / Actions | Frame Ref |
|---|---|---|---|---|
| **Open Task Details** | Tasks table row | Click row | Cursor clicks row `Research competitor onboarding flows` -> details drawer opens. | `frame_0448.png`, `frame_0456.png` |
| **Description** | Drawer Description section | Text input / textarea | Click description area, type: "Check at least five competitors and note their sign-up steps." | `frame_0456.png` |
| **Activity / Comments** | Drawer Activity section | Input & send button | In "Add a comment...", type: "Started the research today.", click paper-plane send icon.<br>Comment renders in feed: Avatar "J", Jane Doe, "Just now", "Started the research today." | `frame_0456.png` |
| **Row Actions Menu** | Task row rightmost `...` icon | Popover menu | Close drawer, click `...` on task row. Popover displays: `Edit` (pencil), `Archive` (box tray), `Delete` (red text & trash can). | `frame_0465.png` |

---

## 10. Step 9: Archive or delete a task (`projects.snaarp.com/tasks`)

Frames: `ref/projects/frame_0465.png`, `frame_0468.png`, `frame_0485.png`, `frame_0510.png`

| Element / Zone | Position & Dimensions | Colors & Typography | Content / Actions | Frame Ref |
|---|---|---|---|---|
| **Archive Task** | Row `...` popover menu | Menu item click | On row `Research competitor onboarding flows`, click `Archive`.<br>Toast appears: `Task archived`.<br>Table count drops to 5 tasks (`5 tasks · 0 issues · 0 bugs`, tab `Tasks (5)`). | `frame_0465.png` |
| **Delete Task Action** | Row "Explore reports" `...` popover | Menu item click | On row `Explore reports`, click `...`, click `Delete`. | `frame_0465.png` |
| **In-App Delete Modal** | Centered modal, `w-[420px]` | `bg-white rounded-2xl shadow-2xl p-6 border border-gray-200/90` | Title: "Delete Task" (`font-bold text-base text-gray-900`).<br>Body: "Are you sure you want to delete this task? This action cannot be undone." (`text-xs text-gray-500 mt-2`).<br>Footer: `Cancel` (`border border-gray-200 rounded-xl px-4 py-2 text-xs`) and `Delete` (`bg-red-600 hover:bg-red-700 text-white font-semibold text-xs px-4 py-2 rounded-xl`). | In-app modal |
| **Confirm Delete** | Modal `Delete` button | Button click | Click `Delete`. Modal closes.<br>Toast: `Task deleted`.<br>Table count drops to 4 tasks (`4 tasks · 0 issues · 0 bugs`, progress `0 of 4 completed · 0%`, tab `Tasks (4)`). | `frame_0468.png` |

---

## 11. Step 10: Explore Sprints (`projects.snaarp.com/sprints`)

Frames: `ref/projects_part2/frame_0010.png`, `frame_0025.png`, `frame_0028.png`

| Element / Zone | Position & Dimensions | Colors & Typography | Content / Actions | Frame Ref |
|---|---|---|---|---|
| **Sprints Nav** | Sidebar | Nav item | Cursor clicks `Sprints` in workspace nav. Sidebar item highlights with `#7014D9` border. | `frame_0005.png` |
| **Sprints Header** | Top of view | `flex items-center justify-between` | Left: RotateCw icon in lilac circle, Title "Sprints" (`font-bold text-lg text-gray-900`), subtitle "0 sprints total" (`text-xs text-gray-500`).<br>Right: Switcher List \| Board, Filter button, purple `+ New Sprint` button. | `frame_0010.png` |
| **4 Sprints Tabs** | Below header | `flex items-center gap-2 border-b border-gray-200 pb-2` | 4 Tabs: `Sprints` (RotateCw), `Calendar` (CalendarIcon), `Goals` (Target), `Time Tracking` (Clock). `Sprints` tab active with `#7014D9` background. | `frame_0010.png` |
| **5 Stat Cards** | Below tabs | `grid grid-cols-5 gap-3.5` | Total Sprints (0), Active Sprint (0), Completed (0), Avg Velocity (0), Points Delivered (0). | `frame_0010.png` |
| **Filter Pills & Search** | Middle section | `flex items-center justify-between` | Pills: `0 All`, `0 Active`, `0 Planning`, `0 Completed`, `0 Cancelled`. Search input `Search sprints...`. | `frame_0010.png` |
| **Empty State** | Main table container | `bg-white border border-gray-200 rounded-2xl p-12 text-center` | Tray icon in gray circle + "No sprints match filters." + subtitle. | `frame_0010.png` |
| **Calendar Tab** | Click `Calendar` tab | Full calendar view | Month header: "November 2026", Prev/Today/Next controls. Legend: Tasks (purple), Issues (amber), Bugs (red). Grid: days 1-30 with today 15 circled in purple. Day 19 has chip "Research competitor onboarding flows". | `frame_0025.png` |
| **Chip Preview Hover** | Hover chip on 19th | Floating card `w-60` | Card displays Task badge, To Do pill, title "Research competitor onboarding flows", Priority High, Due Nov 19 2026, Project: Explore Snaarp Projects! Return to Sprints tab. | `frame_0028.png` |

---

## 12. Step 11: Create a sprint (`projects.snaarp.com/sprints`)

Frames: `ref/projects_part2/frame_0070.png`, `frame_0110.png`, `frame_0180.png`, `frame_0220.png`

| Element / Zone | Position & Dimensions | Colors & Typography | Content / Actions | Frame Ref |
|---|---|---|---|---|
| **New Sprint Trigger** | Top right controls | Purple button | Click `+ New Sprint` -> modal dialog opens. | `frame_0070.png` |
| **New Sprint Modal** | Centered modal `w-full max-w-lg` | `bg-white rounded-2xl shadow-2xl border border-gray-200 p-6` | Header: "New Sprint", subtitle "Plan and launch a new development sprint.", close X.<br>Fields: SPRINT NAME *, SPRINT GOAL, START DATE, END DATE, STORY POINT CAPACITY, PROJECT select.<br>Footer: Cancel and Create Sprint. | `frame_0070.png` |
| **Form Inputs** | Inside modal | Interactive fields | • SPRINT NAME: type "Onboarding Flow".<br>• SPRINT GOAL: type "Build the whole authentication flow from get started to the Home screen".<br>• START DATE: click input -> calendar opens -> pick day 16 (2026-11-16).<br>• END DATE: click input -> calendar opens -> pick day 18 (2026-11-18).<br>• CAPACITY: type "40".<br>• PROJECT: open select -> pick "Explore Snaarp Projects!". | `frame_0110.png`, `frame_0180.png` |
| **Create Action & Toast** | Modal submit button | Button & Top Toast | Click `Create Sprint`. Modal closes. Toast appears: `Sprint created`. Total Sprints stat updates to 1. | `frame_0210.png` |
| **Sprint List Row** | Sprints list view | `bg-white border border-gray-200 rounded-2xl p-4` | Row: SPRINT #1 `Onboarding Flow`, pill `Planning`, goal snippet, dates `2026-11-16 - 2026-11-18`, counters `0/0 items`, `0 pts`, `40 pts cap`, edit and delete action buttons. | `frame_0220.png` |

---

## 13. Step 12: Move a sprint on the board and filter (`projects.snaarp.com/sprints`)

Frames: `ref/projects_part2/frame_0290.png`, `frame_0310.png`

| Element / Zone | Position & Dimensions | Colors & Typography | Content / Actions | Frame Ref |
|---|---|---|---|---|
| **Board View Toggle** | Top right controls | Switcher button | Click `Board` in List \| Board toggle. | `frame_0280.png` |
| **Kanban Columns** | Board container | `grid grid-cols-4 gap-4` | 4 columns: Active (0), Planning (1), Completed (0), Cancelled (0). Card "Onboarding Flow" sits in Planning. | `frame_0290.png` |
| **Card Drag & Drop** | Planning to Completed column | Cursor follow drag | Drag card `Onboarding Flow` into `Completed` column. Drop updates status. Toast appears: `Sprint status updated`. Completed count = 1. | `frame_0290.png` |
| **Return to List View** | Top right controls | Switcher button | Click `List` in toggle. Row now displays `Completed` status pill (emerald badge). Completed stat card = 1. | `frame_0300.png` |
| **Filter Popover** | Under `Filter` button | `bg-white rounded-2xl shadow-xl p-4 w-72` | Checkboxes for Status (Active, Planning, Completed, Cancelled) and Projects, buttons Clear and Apply. | `frame_0310.png` |
| **Filter Interactions** | Inside popover | Checkbox & Apply clicks | Untick `Completed`, click `Apply`. List shows empty state "No sprints match filters.". Open Filter again, click `Clear`, click `Apply`. Sprint row is restored! | `frame_0310.png` |

---

## 14. Step 13: Set a goal (`projects.snaarp.com/sprints` -> `/goals/new`)

Frames: `ref/projects_part2/frame_0325.png`, `frame_0335.png`, `frame_0350.png`

| Element / Zone | Position & Dimensions | Colors & Typography | Content / Actions | Frame Ref |
|---|---|---|---|---|
| **Goals Tab** | Sprints view tabs | Tab button | Click `Goals` tab. Empty state shows: "No goals yet. Create your first goal to start tracking progress." with `+ Create Goal` button. | `frame_0325.png` |
| **Create Goal Nav** | Empty state button | Button click | Click `+ Create Goal` -> navigates to `projects.snaarp.com/goals/new`. | `frame_0325.png` |
| **Create Goal Form** | Form page `max-w-2xl` | `bg-white rounded-2xl p-6 border border-gray-200` | Header: Back button + "Create Goal".<br>Fields: GOAL NAME * (0/128), DESCRIPTION (0/2000), TARGET TYPE *, TARGET VALUE *, DUE DATE *.<br>Button: purple `Create Goal`. | `frame_0335.png` |
| **Goal Fields Input** | Inside form | Interactive fields | • GOAL NAME: type "Authentication Completion".<br>• DESCRIPTION: type "The full authentication must be completed so users can test it".<br>• TARGET TYPE: select "Percentage" (shows `%` badge).<br>• TARGET VALUE: type "100".<br>• DUE DATE: click input -> pick day 18. | `frame_0335.png` |
| **Submit Goal & Card** | Submit button & Goals tab | Button / Card | Click `Create Goal`. Toast: `Goal created successfully`. Returns to Goals tab.<br>Goal card displays: "Authentication Completion", `active` pill, description, progress bar 0%, "Due Nov 18, 2026", "Target: 100%". | `frame_0350.png` |

---

## 15. Step 14: Log your time (`projects.snaarp.com/sprints`)

Frames: `ref/projects_part2/frame_0430.png`, `frame_0460.png`, `frame_0500.png`

| Element / Zone | Position & Dimensions | Colors & Typography | Content / Actions | Frame Ref |
|---|---|---|---|---|
| **Time Tracking Tab** | Sprints view tabs | Tab button | Click `Time Tracking` tab. Shows Viewing select (`jane@example.com`), Today 0m, This Week 0m, Weekly Timesheet "Nov 9 - Nov 15, 2026" with empty state. | `frame_0430.png` |
| **Viewing Member Filter** | Under header | Select dropdown | Click `Viewing:` select. Menu opens with 6 users (`api@`, `devops@`, `jane@`, `sam.taylor@`, `casey.brown@`, `jordan.lee@`). Click `jane@example.com`. | `frame_0430.png` |
| **Log Time Modal** | Top right button | Modal `w-full max-w-md` | Click `Log Time` -> dialog "Log Time Manually" opens.<br>Fields: TASK *, DURATION (MINUTES) *, DATE *, DESCRIPTION, submit button `Add Time Entry`. | `frame_0460.png` |
| **Log Time Input** | Inside modal | Form inputs | • TASK: select "Set up task statuses".<br>• DURATION: type "40".<br>• DATE: pick day 15.<br>• DESCRIPTION: type "Set up the status workflow". | `frame_0460.png` |
| **Add Time & Timesheet** | Modal submit button & table | Submit & Row | Click `Add Time Entry`. Toast: `Time entry added`.<br>Stats update: Today 40m, This Week 40m.<br>Timesheet row: "Set up task statuses" shows `40m` under Sun Nov 15 (blue column) and Total `40m`. Summary row: Daily Total 40m, Week Total 40m. | `frame_0500.png` |

---

## 16. Step 15: See tasks as a board, timeline or calendar (`projects.snaarp.com/tasks`)

Frames: `ref/projects_part2/frame_0540.png`, `frame_0580.png`, `frame_0610.png`

| Element / Zone | Position & Dimensions | Colors & Typography | Content / Actions | Frame Ref |
|---|---|---|---|---|
| **Tasks Board Subtab** | Work Items subtabs | Subtab button | Click `Board` subtab. 4 columns appear: To Do (6), In Progress (0), Done (0), Closed (0). | `frame_0540.png` |
| **Drag Task 1** | Board To Do column | Drag to In Progress | Drag card "Create your first project" into `In Progress`. Drop updates status. Toast: `Task moved to In Progress`. To Do = 5, In Progress = 1. | `frame_0540.png` |
| **Drag Task 6** | Board To Do column | Drag to In Progress | Drag card "Research competitor onboarding flows" into `In Progress`. Toast: `Task moved to In Progress`. To Do = 4, In Progress = 2. | `frame_0540.png` |
| **Gantt Subtab** | Work Items subtabs | Subtab button | Click `Gantt` subtab. November 2026 timeline with day columns 1-30. Row "Research competitor onboarding flows" shows purple bar on 19th. | `frame_0580.png` |
| **Calendar Subtab** | Work Items subtabs | Subtab button | Click `Calendar` subtab. November 2026 grid displays purple chip on 19th. | `frame_0610.png` |
| **Project Dropdown** | Header project selector | Dropdown menu | Click `Project: Explore Snaarp Projects! v`. Menu lists 5 projects. Pick "Explore Snaarp Projects!" again. Click back to `List View` to finish. | `frame_0610.png` |

---

## 17. Step 16: Open your whiteboards (`projects.snaarp.com/whiteboards`)

Frames: `ref/projects_part2/frame_0660.png`, `frame_0700.png`

| Element / Zone | Position & Dimensions | Colors & Typography | Content / Actions | Frame Ref |
|---|---|---|---|---|
| **Whiteboards Nav** | Sidebar | Nav item | Click `Whiteboards` in workspace nav. Gallery opens with 2 cards: "Sales & Marketing" (Updated 17/11/2026) and "Design Idea" (Updated 15/09/2026), each with red Delete button. | `frame_0660.png` |
| **Open Whiteboard** | Gallery card | Card click | Click "Sales & Marketing" card -> Whiteboard Canvas editor opens. | `frame_0660.png` |
| **Canvas Top Bar** | Top of canvas | `h-12 border-b border-gray-200 bg-white/90 px-4` | Left: `< Back to whiteboards` button, title "Sales & Marketing" with edit pencil.<br>Right: "1 online" presence badge (green dot + avatar), purple `Save` button. | `frame_0700.png` |
| **Canvas Shapes** | Canvas surface | Interactive SVG/DOM shapes | Displays a rectangle, a circle, and a yellow sticky note "Double-click to edit". Click the circle: blue selection box with corner handles appears. | `frame_0700.png` |
| **Floating Toolbar** | Bottom center of canvas | `bg-white/95 rounded-2xl shadow-xl px-2.5 py-1.5` | Tools: Select, Hand, Rectangle, Circle, Diamond, Arrow, Pen, Text, Sticky note, Image, Color, Fill, Undo, Redo, Zoom controls, Fullscreen. | `frame_0700.png` |
| **Tooltips & Back** | Floating toolbar tools | Hover tooltips & Back button | Hover Text tool -> "Text (T)". Hover Arrow tool -> "Arrow (A)". Hover Diamond tool -> "Diamond (D)". Click `< Back to whiteboards` to return. | `frame_0700.png` |

---

## 18. Step 17: Draw a flow on a new whiteboard (`projects.snaarp.com/whiteboards`)

Frames: `ref/projects_part2/frame_0750.png`, `frame_0800.png`

| Element / Zone | Position & Dimensions | Colors & Typography | Content / Actions | Frame Ref |
|---|---|---|---|---|
| **New Whiteboard Trigger** | Whiteboards view top right | Purple button | Click `+ New Whiteboard` -> modal "Create Whiteboard" opens. | `frame_0750.png` |
| **Create Modal** | Modal `max-w-sm` | `bg-white rounded-2xl shadow-2xl p-6` | Input: TITLE * (placeholder "Whiteboard title"). Buttons: Cancel and Create (disabled until typed). Type "Research Product" -> Create turns active purple -> click `Create`. | `frame_0750.png` |
| **Draw Diamond 1** | Toolbar Diamond tool & Canvas | Drawing drag | Click Diamond tool (turns purple). Drag on canvas to place diamond 1. Diamond renders with blue selection box. | `frame_0800.png` |
| **Deselect & Diamond 2** | Toolbar Select & Diamond tools | Click & Drag | Click Select tool, click empty canvas to deselect. Click Diamond tool, drag to place diamond 2 to the right. | `frame_0800.png` |
| **Connect Arrow** | Toolbar Arrow tool | Drag connection | Click Arrow tool. Drag from diamond 1 to diamond 2. Connecting arrow with right arrowhead appears. | `frame_0800.png` |
| **Add Text Label** | Toolbar Text tool | Click & Type | Click Text tool. Click diamond 1: inline text input opens. Type "Home Screen". Click away: label "Home Screen" sits centered on diamond 1. | `frame_0800.png` |
| **Save Whiteboard** | Canvas top right | Purple button | Click `Save`. Toast appears: `Whiteboard saved`. | `frame_0800.png` |

---

## 19. Step 18: Delete a whiteboard (`projects.snaarp.com/whiteboards`)

Frames: `ref/projects_part2/frame_0830.png`, `frame_0850.png`

| Element / Zone | Position & Dimensions | Colors & Typography | Content / Actions | Frame Ref |
|---|---|---|---|---|
| **Gallery 3 Cards** | Whiteboards gallery | Grid of 3 cards | Gallery shows 3 cards: "Research Product" (Updated 15/11/2026), "Sales & Marketing" (Updated 17/11/2026), and "Design Idea" (Updated 15/09/2026). | `frame_0830.png` |
| **Delete Trigger** | "Design Idea" card | Red Delete button | Click red `Delete` button on "Design Idea" card. In-app confirmation dialog opens. | `frame_0830.png` |
| **In-App Delete Modal** | Centered modal `max-w-sm` | `bg-white rounded-2xl shadow-2xl p-6` | Title: "Delete whiteboard". Body: "Are you sure you want to delete \"Design Idea\"? This action cannot be undone." Buttons: Cancel and red Delete. | `frame_0850.png` |
| **Confirm Deletion** | Modal red Delete button | Button click | Click `Delete`. Modal closes. Toast appears: `Whiteboard deleted`. Card disappears, leaving 2 cards ("Research Product" and "Sales & Marketing"). | `frame_0850.png` |
| **Completion Card** | Post-tutorial card | Data-driven card | Step 18 finishes, and completion card automatically displays ("Tour complete", "Replay tour", "Back to Snaarp"). | In-app |

