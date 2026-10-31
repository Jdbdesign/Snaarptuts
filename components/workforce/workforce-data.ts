import type { IconName, LogoName } from "@/components/icons";

/**
 * Data-driven copy and sample values for Snaarp Workforce tutorials.
 * All personal data is substituted with sample identities (Alex Morgan, Sam Taylor, example.com).
 */

/** Far-left Snaarp suite rail items. */
export const SUITE_RAIL_ITEMS: { id: string; label: string; logo: LogoName }[] = [
  { id: "mail", label: "Mail", logo: "mail" },
  { id: "meets", label: "Meets", logo: "meet" },
  { id: "teams", label: "Teams", logo: "teams" },
  { id: "onecard", label: "One Cardx", logo: "onecard" },
  { id: "sheets", label: "Sheets", logo: "sheet" },
  { id: "docs", label: "Docs", logo: "docs" },
  { id: "slides", label: "Slides", logo: "presentation" },
  { id: "pdf", label: "PDF", logo: "pdf" },
];

export type WorkforceNavId =
  | "dashboard"
  | "my-space"
  | "attendance"
  | "leave"
  | "time-tracker"
  | "goals"
  | "appraisals"
  | "policies"
  | "learning-hub"
  | "notifications"
  | "report-bug"
  | "admin-panel";

export type MySpaceSubId =
  | "overview"
  | "onboarding"
  | "profile"
  | "salary-advances"
  | "resignation"
  | "exit-tasks"
  | "holidays"
  | "hr-cases";

export const MY_SPACE_SUB_ITEMS: { id: MySpaceSubId; label: string; path: string }[] = [
  { id: "overview", label: "Overview", path: "/my-space" },
  { id: "onboarding", label: "My onboarding", path: "/my-space/onboarding" },
  { id: "profile", label: "My Profile", path: "/my-space/profile" },
  { id: "salary-advances", label: "Salary advances", path: "/my-space/salary-advances" },
  { id: "resignation", label: "Resignation", path: "/my-space/resignation" },
  { id: "exit-tasks", label: "Exit tasks", path: "/my-space/exit-tasks" },
  { id: "holidays", label: "Holidays", path: "/my-space/holidays" },
  { id: "hr-cases", label: "My HR cases", path: "/my-space/hr-cases" },
];

export const WORKFORCE_NAV_ITEMS: {
  id: WorkforceNavId;
  label: string;
  icon: IconName;
  expandable?: boolean;
  subItems?: typeof MY_SPACE_SUB_ITEMS;
  red?: boolean;
}[] = [
  { id: "dashboard", label: "Dashboard", icon: "grid4" },
  { id: "my-space", label: "My Space", icon: "user", expandable: true, subItems: MY_SPACE_SUB_ITEMS },
  { id: "attendance", label: "Attendance", icon: "shCalendar" },
  { id: "leave", label: "Leave", icon: "wfPlane" },
  { id: "time-tracker", label: "Time Tracker", icon: "wfTimer" },
  { id: "goals", label: "Goals", icon: "wfTarget" },
  { id: "appraisals", label: "My Appraisals", icon: "wfAppraisal" },
  { id: "policies", label: "Policies", icon: "wfBook" },
  { id: "learning-hub", label: "Learning Hub", icon: "wfGraduation" },
  { id: "notifications", label: "Notifications", icon: "bell" },
  { id: "report-bug", label: "Report a Bug", icon: "bug", red: true },
  { id: "admin-panel", label: "Admin Panel", icon: "adminSquare" },
];

export const SAMPLE_EMPLOYEE = {
  name: "Alex Morgan",
  initial: "A",
  role: "Employee",
  department: "Engineering",
  email: "alex.morgan@snaarp.com",
  id: "EMP-2026-0042",
  dob: "01/09/1990",
  startDate: "14/10/2026",
  status: "ACTIVE",
  shift: "MORNING SHIFT",
  manager: "Not provided",
  managerEmail: "Not provided",
  jobTitle: "Engineer",
  employmentType: "Not provided",
  contractType: "Not provided",
  weeklyHours: "Not provided",
};

export const SAMPLE_CONTACT_DETAILS = {
  phone: "+44 7700 900123",
  personalEmail: "alex.personal@example.com",
  address: "10 Acme Way",
  city: "London",
  postcode: "SW1A 1AA",
  emergencyName: "Morgan Taylor",
  emergencyPhone: "+44 7700 900456",
};

export const DASHBOARD_HIGHLIGHTS = [
  { id: "people", count: 2, label: "People", icon: "users" as IconName },
  { id: "annual-leave", count: 0, label: "On annual leave", icon: "wfPlane" as IconName },
  { id: "other-leave", count: 0, label: "On other leave", icon: "shCalendar" as IconName },
  { id: "off-sick", count: 0, label: "Off sick", icon: "wfThermometer" as IconName },
  { id: "birthdays", count: 0, label: "Birthdays today", icon: "wfGift" as IconName },
];

export const DASHBOARD_OVERVIEW_CARDS = [
  {
    id: "leave",
    name: "My leave",
    icon: "shCalendar" as IconName,
    title: "5 days remaining",
    sub: "0 days requested / 2 days used this year",
    btn: "View leave",
  },
  {
    id: "sickness",
    name: "My sickness",
    icon: "wfThermometer" as IconName,
    title: "2 days taken",
    sub: "1 completed absences this year",
    btn: "View requests",
  },
  {
    id: "objectives",
    name: "Objectives",
    icon: "wfTarget" as IconName,
    title: "1 active goals",
    sub: "Your goals still to be completed",
    btn: "View goals",
  },
  {
    id: "tasks",
    name: "My tasks",
    icon: "docFile" as IconName,
    title: "0 open tasks",
    sub: "Pending and in progress",
    btn: "View tasks",
  },
];

export const TASKS_AND_REQUESTS = {
  tasks: [
    { id: "t1", title: "Submit Q3 timesheet", due: "03/11/2026", status: "Pending" },
    { id: "t2", title: "Read updated remote-work policy", due: "05/11/2026", status: "In progress" },
  ],
  leave: [
    { id: "l1", title: "Annual leave 24/11/2026 to 26/11/2026 – Pending approval", status: "Pending" },
  ],
  sickness: [] as { id: string; title: string; status: string }[],
};

export const NEXT_7_DAYS = [
  { id: "n7-1", title: "Team stand-up, Mon 02/11/2026" },
  { id: "n7-2", title: "Approved leave: none" },
];

export const ANNOUNCEMENT = {
  title: "NEW MONTH CELEBRATIONS",
  text: "Celebrating a new month",
  date: "30/10/2026, 09:56",
};

export const NOTIFICATIONS_LIST = [
  { id: "n1", title: "NEW MONTH CELEBRATIONS", text: "Celebrating a new month", date: "30/10/2026" },
  { id: "n2", title: "Onboarding updated", text: "Alex Morgan: Onboarding – complete.", date: "30/10/2026" },
  { id: "n3", title: "Onboarding updated", text: "Alex Morgan: Upload identity document – …", date: "30/10/2026" },
  { id: "n4", title: "Onboarding updated", text: "Alex Morgan: Complete your employee…", date: "30/10/2026" },
  { id: "n5", title: "Onboarding assigned", text: "Onboarding tasks are ready for Alex…", date: "29/10/2026" },
  { id: "n6", title: "Policy approved", text: "ENGINEERING POLICY: approved.", date: "28/10/2026" },
  { id: "n7", title: "New department policy", text: "Engineering remote guidelines", date: "27/10/2026" },
];

export const MY_SPACE_STATS = [
  { id: "worked", value: "4", label: "Days worked this month", icon: "shCalendar" as IconName },
  { id: "hours", value: "12.2h", label: "Hours this month", icon: "clock" as IconName },
  { id: "remaining", value: "5", label: "Leave days remaining", icon: "chevronRight" as IconName },
];

export type ActivityTabId =
  | "activities"
  | "feeds"
  | "profile"
  | "approvals"
  | "leave"
  | "attendance"
  | "time-logs"
  | "timesheets";

export const ACTIVITY_TABS: { id: ActivityTabId; label: string }[] = [
  { id: "activities", label: "Activities" },
  { id: "feeds", label: "Feeds" },
  { id: "profile", label: "Profile" },
  { id: "approvals", label: "Approvals" },
  { id: "leave", label: "Leave" },
  { id: "attendance", label: "Attendance" },
  { id: "time-logs", label: "Time Logs" },
  { id: "timesheets", label: "Timesheets" },
];

export const ACTIVITY_FEED_ITEMS = [
  { id: "af1", title: "Attendance check-in", detail: "Session in progress; location captured", time: "30/10/2026, 09:47" },
  { id: "af2", title: "Attendance check-in", detail: "Recorded before session tracking", time: "30/10/2026, 09:47" },
  { id: "af3", title: "Attendance check-out", detail: "Session started 30/10/2026, 09:05 AM, duration 10h 3m", time: "29/10/2026, 19:08" },
  { id: "af4", title: "Attendance check-out", detail: "10.05h logged", time: "29/10/2026, 19:08" },
];

export const APPROVALS_ITEMS = [
  { id: "ap1", title: "Resignation approved", detail: "Proposed last day 27/11/2026", time: "19/10/2026, 13:29", link: "View request" },
  { id: "ap2", title: "Leave request approved", detail: "22/10/2026 to 23/10/2026 (2 days)", time: "19/10/2026, 13:27", link: "View request" },
];

export const ONBOARDING_RECORD = {
  employee: "Alex Morgan",
  program: "Standard onboarding",
  version: "Version 1",
  startDate: "30/10/2026",
  status: "Completed",
  progressText: "100% complete / 5 of 5 tasks",
  overviewDetails: {
    program: "Standard onboarding",
    version: "Version 1",
    employee: "Alex Morgan",
    department: "Engineering",
    mentor: "Sam Taylor",
    startDate: "30/10/2026",
    completionDate: "30/10/2026",
  },
  tasks: [
    { id: "task-profile", name: "Complete your employee profile", owner: "Alex Morgan", due: "30/10/2026", status: "Completed" },
    { id: "task-upload-id", name: "Upload identity document", owner: "Alex Morgan", due: "30/10/2026", status: "Completed", hrApproval: true, doc: "identity-document.pdf" },
    { id: "task-equipment", name: "Prepare equipment", owner: "Sam Taylor", due: "29/10/2026", status: "Completed" },
    { id: "task-accounts", name: "Set up work accounts", owner: "Sam Taylor", due: "29/10/2026", status: "Completed" },
    { id: "task-orientation", name: "First-day orientation", owner: "Sam Taylor", due: "30/10/2026", status: "Completed" },
  ],
  documents: [
    { id: "doc-id", name: "Upload identity document", owner: "Alex Morgan", due: "30/10/2026", status: "Completed", doc: "identity-document.pdf" },
  ],
  activity: [
    { id: "oa1", action: "Complete", target: "ALEX ONBOARDED SUCCESSFULLY", time: "30/10/2026, 09:09 AM" },
    { id: "oa2", action: "Submit", target: "First-day orientation", time: "30/10/2026, 09:28 AM" },
    { id: "oa3", action: "Approve", target: "Upload identity document", time: "30/10/2026, 08:30 AM" },
    { id: "oa4", action: "Submit", target: "Set up work accounts", time: "30/10/2026, 08:09 AM" },
    { id: "oa5", action: "Submit", target: "Prepare equipment", time: "30/10/2026, 08:09 AM" },
    { id: "oa6", action: "Approve", target: "Complete your employee profile", detail: "done", time: "30/10/2026, 08:09 AM" },
    { id: "oa7", action: "Submit", target: "Complete your employee profile", time: "30/10/2026, 08:08 AM" },
    { id: "oa8", action: "Submit", target: "Upload identity document", time: "30/10/2026, 08:08 AM" },
    { id: "oa9", action: "Onboarding started", target: "", time: "30/10/2026, 08:06 AM" },
  ],
};

export const URLS = {
  dashboard: "workforce.snaarp.com/dashboard",
  mySpace: "workforce.snaarp.com/my-space",
  onboarding: "workforce.snaarp.com/my-space/onboarding",
  onboardingRecord: "workforce.snaarp.com/my-space/onboarding/records/rec-001",
  taskDetail: "workforce.snaarp.com/my-space/onboarding/records/rec-001/tasks/task-upload-id",
  profile: "workforce.snaarp.com/my-space/profile",
  salaryAdvances: "workforce.snaarp.com/my-space/salary-advances",
  resignation: "workforce.snaarp.com/my-space/resignation",
  exitTasks: "workforce.snaarp.com/my-space/exit-tasks",
  holidays: "workforce.snaarp.com/organization/holidays",
  hrCases: "workforce.snaarp.com/hr-cases",
};

export const SAMPLE_SALARY_ADVANCE = {
  limit: "£1,500.00",
  terms: "Up to 3 instalments · Monthly salary",
  note: "You already have a pending or approved request",
  stats: {
    pending: 0,
    approved: 1,
    rejected: 0,
    cancelled: 0,
  },
  record: {
    employee: "Alex Morgan",
    amount: "£700.00",
    requestedDate: "22/10/2026",
    instalments: 2,
    status: "Approved - not paid",
    reason: "Unexpected car repair",
    planNote: "Requested 22/10/2026 · Monthly salary · Plan acknowledged 22/10/2026",
    repayments: [
      { date: "23/10/2026", amount: "£350.00" },
      { date: "23/11/2026", amount: "£350.00" },
    ],
    history: [
      {
        action: "approve",
        actor: "Sam Taylor",
        date: "22/10/2026, 10:19 AM",
        amount: "£700.00",
        reason: "Unexpected car repair",
      },
      {
        action: "request",
        actor: "Alex Morgan",
        date: "22/10/2026, 08:10 AM",
        amount: "£700.00",
        reason: "Unexpected car repair",
      },
    ],
  },
};

export const SAMPLE_RESIGNATION = {
  status: "Approved",
  submittedOn: "19/10/2026",
  proposedLastDay: "27/11/2026",
  approvedLastDay: "27/11/2026",
  reason: "Moving to a new role elsewhere",
  timeline: [
    { title: "Submitted", status: "completed" },
    { title: "Approved", status: "completed" },
  ],
  exitInterview: {
    title: "Exit interview submitted",
    subtitle: "Your answers are read-only.",
    date: "19/10/2026, 1:32:11 PM",
    linkText: "View submitted answers",
  },
};

export const SAMPLE_EXIT_TASKS = {
  title: "Exit tasks",
  subtitle: "Your clearance tasks and responsibilities for employee exits.",
  emptyMessage: "No exit tasks assigned.",
};

export const SAMPLE_HOLIDAYS = {
  month: "October 2026",
  holiday: {
    day: 1,
    weekday: "Thursday",
    label: "GB: Founders' Day",
  },
  today: 30,
};

export const SAMPLE_HR_CASES = {
  title: "HR Cases",
  subtitle: "Grievances and disciplinary records",
  tab: "Grievances",
  tabSubtitle: "Your private grievances and HR responses",
  cases: [
    {
      id: "case-001",
      employee: "Alex Morgan",
      type: "Bullying",
      incidentDate: "2026-10-15",
      status: "Closed",
      caseNote: "Case note",
    },
  ],
  types: [
    "Bullying",
    "Discrimination",
    "Pay dispute",
    "Working conditions",
    "Other",
  ],
};
