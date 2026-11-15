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
| **Confirm Delete** | Modal `Delete` button | Button click | Click `Delete`. Modal closes.<br>Toast: `Task deleted`.<br>Table count drops to 4 tasks (`4 tasks · 0 issues · 0 bugs`, progress `0 of 4 completed · 0%`, tab `Tasks (4)`).<br>Step finishes, completion card automatically displays! | `frame_0468.png` |
