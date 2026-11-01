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
  | "expenses"
  | "policies"
  | "learning-hub"
  | "notifications"
  | "appraisal-management"
  | "payroll"
  | "recruitment"
  | "email-templates"
  | "compliance"
  | "lifecycle"
  | "hr-cases-manage"
  | "announcements"
  | "shifts"
  | "holidays-manage"
  | "training"
  | "reports"
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
  attendance: "workforce.snaarp.com/attendance",
  leave: "workforce.snaarp.com/leave",
  timeTracker: "workforce.snaarp.com/time-tracker",
  goals: "workforce.snaarp.com/goals?tab=goals",
  goalsKpis: "workforce.snaarp.com/goals?tab=kpis",
  performance: "workforce.snaarp.com/performance",
  performanceReview: "workforce.snaarp.com/performance/reviews/sample",
  performanceAssigned: "workforce.snaarp.com/performance?tab=Assigned+Reviews",
  policies: "workforce.snaarp.com/policies",
  policiesEngineering: "workforce.snaarp.com/policies/folders/engineering",
  policyDetails: "workforce.snaarp.com/policies/documents/engineering-policy",
  learning: "workforce.snaarp.com/learning",
  learningCategory: "workforce.snaarp.com/learning?category=engineering",
  learningCourse: "workforce.snaarp.com/learning/course/engineering",
  learningRecord: "workforce.snaarp.com/learning?tab=record",
  notifications: "workforce.snaarp.com/notifications",
  appraisalManagement: "workforce.snaarp.com/performance/management",
  createCycle: "workforce.snaarp.com/performance/management/cycles/new",
  cycleNew: "workforce.snaarp.com/performance/management/cycles/new",
  appraisalOverview: "workforce.snaarp.com/performance/management?tab=Overview",
  assignedReviews: "workforce.snaarp.com/performance/management?tab=Assigned+Reviews",
  completedReviewAdmin: "workforce.snaarp.com/performance/reviews/sample",
  reviewSample: "workforce.snaarp.com/performance/reviews/sample",
  appraisalTemplates: "workforce.snaarp.com/performance/management?tab=Templates",
  appraisalInsights: "workforce.snaarp.com/performance/management?tab=Insights",
  employmentActions: "workforce.snaarp.com/performance/management?tab=Employment+Actions",
  payroll: "workforce.snaarp.com/payroll?tab=salary-components",
  payrollEmployeeSalaries: "workforce.snaarp.com/payroll?tab=employee-salaries",
  payrollPayRuns: "workforce.snaarp.com/payroll?tab=pay-runs",
  payrollPayslips: "workforce.snaarp.com/payroll?tab=payslips",
  payrollSalaryAdvances: "workforce.snaarp.com/payroll?tab=salary-advances",
  payrollImportExport: "workforce.snaarp.com/payroll?tab=import-export",
  payrollTaxCalculator: "workforce.snaarp.com/payroll?tab=tax-calculator",
  payrollPensionCalculator: "workforce.snaarp.com/payroll?tab=pension-calculator",
  payrollTaxPensionSettings: "workforce.snaarp.com/payroll?tab=tax-pension-settings",
  recruitment: "workforce.snaarp.com/recruitment",
  careersPublic: "workforce.snaarp.com/careers/acme",
  emailTemplates: "workforce.snaarp.com/email-templates",
  compliance: "workforce.snaarp.com/compliance",
  complianceFolderNew: "workforce.snaarp.com/compliance/folders/new",
  complianceEngineering: "workforce.snaarp.com/compliance/folders/engineering",
  compliancePolicyReview: "workforce.snaarp.com/compliance/policies/engineering-policy",
  onboardingAdmin: "workforce.snaarp.com/onboarding",
  onboardingStart: "workforce.snaarp.com/onboarding/start",
  onboardingRecordAdmin: "workforce.snaarp.com/onboarding/records/sample",
  onboardingTemplateStandard: "workforce.snaarp.com/onboarding/templates/standard",
  offboarding: "workforce.snaarp.com/offboarding",
  offboardingInitiate: "workforce.snaarp.com/offboarding/initiate",
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

export const SAMPLE_ATTENDANCE = {
  location: "Head Office, London, UK",
  checkedInTimer: "00:13:16",
  sessionStart: "09:47 AM",
  sessionEnd: "10:01 AM",
  checkedOutTimer: "00:00:00",
  checkedOutTotal: "0h 13m",
  month: "October 2026",
  legend: [
    { label: "Present", color: "bg-[#10B981]" },
    { label: "Absent", color: "bg-[#EF4444]" },
    { label: "On Duty / Half Day", color: "bg-[#3B82F6]" },
    { label: "Weekend / Holiday", color: "bg-[#9CA3AF]" },
  ],
  summary: [
    { label: "Days", value: 31 },
    { label: "Payable Days", value: 13 },
    { label: "Present", value: 4 },
    { label: "On Duty", value: 0 },
    { label: "Paid Leave", value: 0 },
    { label: "Holidays", value: 0 },
    { label: "Weekends", value: 9 },
  ],
};

export const SAMPLE_LEAVE = {
  summaryCards: [
    { label: "ALLOWANCE", value: "7 days", highlight: false },
    { label: "CARRIED FORWARD", value: "0 days", highlight: false },
    { label: "BOOKED & TAKEN", value: "2 days", highlight: false },
    { label: "AVAILABLE", value: "5 days", highlight: true },
  ],
  byType: {
    name: "Sick leave",
    availableText: "5 available of 7",
  },
  requests: [
    {
      id: "lr-1",
      type: "Sick leave",
      start: "2026-10-20",
      end: "2026-10-22",
      days: 2,
      status: "APPROVED",
      reason: "sick",
      submitted: "19/10/2026, 7:52:04 AM",
    },
  ],
  shift: {
    name: "MORNING SHIFT",
    hours: "09:00 - 17:00 | 8h 00m",
    details: "Grace period: 15 minutes | Individually assigned | Europe/London",
    note: "Fixed daily hours. Overnight attendance belongs to the date the shift starts. Changes apply to future check-ins.",
  },
};

export const SAMPLE_TIME_TRACKER = {
  projects: [
    {
      name: "Sprint 1",
      client: "-",
      status: "active",
      budget: "0.7/20h",
      dateRange: "2026-10-15 -> 2026-10-17",
    },
  ],
  jobs: [
    {
      title: "Sprint planning",
      status: "open",
      priority: "medium",
      estHours: "10.0",
      actualHours: "0.7",
      dueDate: "2026-10-22",
      overdue: true,
    },
  ],
  timeLogs: [
    {
      date: "2026-10-20",
      project: "Sprint 1",
      job: "Sprint planning",
      hours: "0.55",
      description: "-",
      billable: "No",
      status: "Not Submitted",
    },
    {
      date: "2026-10-20",
      project: "-",
      job: "General",
      hours: "0.00",
      description: "-",
      billable: "No",
      status: "Not Submitted",
    },
  ],
  totals: {
    matching: "0.55",
    submitted: "0.00",
    notSubmitted: "0.55",
  },
};

export const SAMPLE_GOALS = {
  goals: [
    {
      id: "g-1",
      title: "Appraisal for Sam",
      employee: "Sam Taylor",
      targetDate: "25/10/2026",
      progress: "100%",
      status: "Completed",
    },
    {
      id: "g-2",
      title: "Appraisal for Alex",
      employee: "Alex Morgan",
      targetDate: "25/10/2026",
      progress: "100%",
      status: "In Progress",
    },
    {
      id: "g-3",
      title: "Appraisal",
      employee: "Jordan Lee",
      targetDate: "25/10/2026",
      progress: "100%",
      status: "In Progress",
    },
  ],
  kpis: [
    {
      id: "kpi-1",
      title: "New goal KPI",
      employee: "Alex Morgan",
      period: "22/10/2026 - 30/10/2026",
      resultTarget: "30 / 30 Tickets",
      score: "100%",
      status: "verified",
    },
  ],
  kpiDetails: {
    title: "New goal KPI",
    employee: "Alex Morgan",
    status: "verified",
    period: "22/10/2026 - 30/10/2026",
    directionWeight: "Higher is better / 2",
    baselineTarget: "20 / 30 Tickets",
    actualScore: "30 Tickets / 100%",
    note: "Score measures improvement from baseline towards target, capped at 100%. Actual results retain any overachievement. Verified scores are combined using their weights.",
    evidence: "I did 30",
    feedback: "verified",
    weightedScore: "100% weighted score · 1 of 1 verified",
    history: [
      {
        action: "verify",
        actor: "Sam Taylor",
        date: "23/10/2026, 9:03:40 AM",
        actual: "30 Tickets",
        evidence: "I did 30",
        feedback: "verified",
      },
      {
        action: "submit",
        actor: "Alex Morgan",
        date: "23/10/2026, 9:02:07 AM",
        actual: "30 Tickets",
        evidence: "I did 30",
      },
      {
        action: "record",
        actor: "Alex Morgan",
        date: "23/10/2026, 9:01:48 AM",
        actual: "30 Tickets",
      },
    ],
  },
};

export const SAMPLE_APPRAISALS = {
  stats: [
    { label: "In progress", value: 1 },
    { label: "Awaiting release", value: 0 },
    { label: "Awaiting acknowledgement", value: 2 },
    { label: "Acknowledged", value: 1 },
    { label: "Overdue", value: 1 },
  ],
  reviews: [
    {
      id: "rev-1",
      cycle: "Q4 cycle",
      status: "SELF_REVIEW",
      selfRating: "-",
      managerRating: "-",
      result: "In progress",
      action: "Open review",
      stage: "SELF",
      dueDate: "28 Oct 2026 (overdue)",
    },
    {
      id: "rev-2",
      cycle: "2027 Appraisal cycle",
      status: "COMPLETED",
      selfRating: "4",
      managerRating: "-",
      result: "Released: 4.23",
      action: "View and acknowledge",
      stage: "COMPLETED",
    },
    {
      id: "rev-3",
      cycle: "2026 Appraisals",
      status: "COMPLETED",
      selfRating: "4",
      managerRating: "3",
      result: "Released: 3.48",
      action: "View result",
      stage: "COMPLETED",
    },
    {
      id: "rev-4",
      cycle: "Q2 performance review",
      status: "COMPLETED",
      selfRating: "3",
      managerRating: "4",
      result: "Released: 3.60",
      action: "View and acknowledge",
      stage: "COMPLETED",
    },
  ],
  reviewQuestions: [
    "To what extent did the employee achieve agreed performance objectives?",
    "Did the employee complete assigned tasks within agreed deadlines?",
    "How would you rate the quality and accuracy of the employee's work?",
    "How effectively did the employee manage workload and priorities?",
    "Does the employee demonstrate the technical skills required for the role?",
    "How effectively does the employee work independently?",
    "How well does the employee communicate with colleagues?",
    "How effectively does the employee use available tools and resources?",
    "Does the employee demonstrate the company's core values?",
    "How effectively does the employee collaborate with colleagues?",
    "Does the employee demonstrate accountability and professionalism?",
    "Does the employee proactively identify and solve problems?",
    "Does the employee suggest improvements to existing processes?",
    "How effectively does the employee respond to changing priorities?",
    "Has the employee demonstrated measurable improvement?",
    "Does the employee actively seek and apply feedback?",
  ],
  ratingOptions: [
    "1 - Unsatisfactory",
    "2 - Needs Improvement",
    "3 - Meets Expectations",
    "4 - Exceeds Expectations",
    "5 - Outstanding",
  ],
};

export const SAMPLE_POLICIES = {
  department: "Engineering",
  folderCount: 1,
  document: {
    title: "ENGINEERING POLICY",
    version: "1.0",
    status: "Approved",
    uploadedDate: "30/10/2026",
    uploadedBy: "Sam Taylor",
    uploadedTimestamp: "30/10/2026, 7:49:43 AM",
    reviewedTimestamp: "30/10/2026, 7:51:51 AM",
    fileName: "engineering-policy.pdf",
    fileSize: "5 KB",
    description: "Policies for engineering department",
  },
};

export const SAMPLE_LEARNING = {
  courseTitle: "Engineering course",
  category: "Engineering",
  duration: "31m",
  durationHours: "0.5 hrs",
  status: "published",
  docType: "documented course",
  overdueText: "Overdue - you can still complete this course · 0% · 0 minutes tracked",
  completedDate: "30 Oct 2026",
};

export const FULL_NOTIFICATIONS_LIST = [
  {
    id: "notif-1",
    linkText: "View course",
    title: "Training completed",
    detail: "Alex Morgan completed Engineering course.",
    time: "30/10/2026, 10:10:35 AM",
  },
  {
    id: "notif-2",
    tag: "NEW MONTH CELEBRATIONS",
    title: "Celebrating a new month",
    detail: "Celebrating a new month",
    time: "30/10/2026, 9:00:00 AM",
  },
  {
    id: "notif-3",
    linkText: "View onboarding",
    title: "Onboarding updated",
    detail: "Alex Morgan: Onboarding - complete.",
    time: "30/10/2026, 8:09:47 AM",
  },
  {
    id: "notif-4",
    linkText: "View onboarding",
    title: "Onboarding updated",
    detail: "Alex Morgan: Upload identity document - approve.",
    time: "30/10/2026, 8:09:24 AM",
  },
  {
    id: "notif-5",
    linkText: "View onboarding",
    title: "Onboarding updated",
    detail: "Alex Morgan: Complete your employee profile - approve.",
    time: "30/10/2026, 8:09:00 AM",
  },
  {
    id: "notif-6",
    linkText: "View onboarding",
    title: "Onboarding assigned",
    detail: "Onboarding tasks are ready for Alex Morgan.",
    time: "30/10/2026, 8:08:42 AM",
  },
  {
    id: "notif-7",
    linkText: "View compliance policy",
    title: "Policy approved",
    detail: "ENGINEERING POLICY: approved.",
    time: "30/10/2026, 7:51:51 AM",
  },
  {
    id: "notif-8",
    linkText: "Upload department policies",
    title: "Policy upload assigned",
    detail: "You can upload policies to Engineering policies. Open the folder and use Upload policy.",
    time: "30/10/2026, 7:48:32 AM",
  },
  {
    id: "notif-9",
    linkText: "View performance review",
    title: "2027 Appraisal cycle: acknowledge your appraisal result",
    detail: "2027 Appraisal cycle: acknowledge your appraisal result",
    time: "30/10/2026, 1:00:01 AM",
  },
  {
    id: "notif-10",
    title: "Attendance automatically stopped",
    detail: "Your attendance was stopped at 18:15 (Europe/London) after your attendance cutoff.",
    time: "29/10/2026, 6:15:00 PM",
  },
  {
    id: "notif-11",
    linkText: "View performance review",
    title: "Q4 cycle: self assessment due 2026-10-28",
    detail: "Q4 cycle: self assessment due 2026-10-28",
    time: "29/10/2026, 5:46:40 PM",
  },
  {
    id: "notif-12",
    linkText: "View performance review",
    title: "2027 Appraisal cycle: self assessment due 2026-10-27",
    detail: "2027 Appraisal cycle: self assessment due 2026-10-27",
    time: "26/10/2026, 3:10:00 PM",
  },
];

// Admin Persona & Datasets (Steps 55+)

export const SAMPLE_ADMIN = {
  name: "Sam Taylor",
  initial: "ST",
  role: "SUPER_ADMIN",
  email: "sam.taylor@snaarp.com",
};

export const ADMIN_MANAGE_NAV_ITEMS: {
  id: WorkforceNavId;
  label: string;
  icon: IconName;
  clickable?: boolean;
  expandable?: boolean;
}[] = [
  { id: "appraisal-management", label: "Appraisal Management", icon: "wfAppraisal", clickable: true },
  { id: "payroll", label: "Payroll", icon: "shCoin", clickable: true },
  { id: "recruitment", label: "Recruitment", icon: "users", clickable: true },
  { id: "email-templates", label: "Email templates", icon: "mail", clickable: true },
  { id: "compliance", label: "Compliance", icon: "shield", clickable: true },
  { id: "lifecycle", label: "Lifecycle", icon: "layers", clickable: true },
  { id: "hr-cases-manage", label: "HR Cases", icon: "building" },
  { id: "announcements", label: "Announcements", icon: "bell" },
  { id: "shifts", label: "Shifts", icon: "clock" },
  { id: "holidays-manage", label: "Holidays", icon: "shCalendar" },
  { id: "training", label: "Training", icon: "wfGraduation", expandable: true },
];

export const ADMIN_INSIGHTS_NAV_ITEMS: {
  id: WorkforceNavId;
  label: string;
  icon: IconName;
  clickable?: boolean;
}[] = [
  { id: "reports", label: "Reports", icon: "shChart" },
];

export const APPRAISAL_CYCLES = [
  {
    id: "cycle-1",
    name: "Q4 cycle",
    type: "ANNUAL",
    status: "ACTIVE",
    startDate: "27 Oct 2026",
    endDate: "28 Oct 2026",
  },
  {
    id: "cycle-2",
    name: "2027 Appraisal cycle",
    type: "ANNUAL",
    status: "ACTIVE",
    startDate: "26 Oct 2026",
    endDate: "27 Oct 2026",
  },
  {
    id: "cycle-3",
    name: "2026 Appraisals",
    type: "ANNUAL",
    status: "PAUSED",
    startDate: "25 Oct 2026",
    endDate: "27 Oct 2026",
  },
  {
    id: "cycle-4",
    name: "Q2 performance review",
    type: "QUARTERLY",
    status: "PAUSED",
    startDate: "15 Oct 2026",
    endDate: "15 Oct 2026",
  },
];

export const ASSIGNED_REVIEWS_ADMIN_LIST = [
  {
    id: "ar-1",
    employee: "Alex Morgan",
    cycle: "Q4 cycle",
    role: "MANAGER",
    action: "Open task",
  },
  {
    id: "ar-2",
    employee: "Jordan Lee",
    cycle: "2026 Appraisals",
    role: "SELF",
    action: "View review",
  },
  {
    id: "ar-3",
    employee: "Alex Morgan",
    cycle: "2026 Appraisals",
    role: "COMPLETED",
    action: "View review",
  },
  {
    id: "ar-4",
    employee: "Alex Morgan",
    cycle: "Q2 performance review",
    role: "COMPLETED",
    action: "View review",
  },
];

export const APPRAISAL_TEMPLATES_LIST = [
  { id: "tmpl-1", name: "Probation Performance Review", status: "DRAFT", revision: "Revision 3" },
  { id: "tmpl-2", name: "360 Performance Review", status: "PUBLISHED", revision: "Revision 1" },
  { id: "tmpl-3", name: "Quarterly Performance Review", status: "PUBLISHED", revision: "Revision 1" },
  { id: "tmpl-4", name: "Annual Employee Performance Review", status: "PUBLISHED", revision: "Revision 1" },
  { id: "tmpl-5", name: "Leadership Performance Review", status: "PUBLISHED", revision: "Revision 1" },
  { id: "tmpl-6", name: "Sales Performance Review", status: "PUBLISHED", revision: "Revision 1" },
];

export const APPRAISAL_INSIGHTS_QUESTIONS = [
  { question: "How effectively does the employee work independently?", category: "Job Competencies", responses: 2, average: "4.50", variance: "0.00" },
  { question: "How well does the employee communicate with colleagues?", category: "Behaviour and Company Values", responses: 2, average: "3.50", variance: "0.00" },
  { question: "Does the employee demonstrate the company's core values?", category: "Behaviour and Company Values", responses: 2, average: "3.50", variance: "0.00" },
  { question: "How effectively does the employee collaborate with colleagues?", category: "Behaviour and Company Values", responses: 2, average: "3.50", variance: "0.00" },
  { question: "Does the employee demonstrate accountability and professionalism?", category: "Behaviour and Company Values", responses: 2, average: "4.50", variance: "0.00" },
  { question: "Does the employee proactively identify and solve problems?", category: "Initiative and Problem-Solving", responses: 2, average: "4.50", variance: "0.00" },
  { question: "Does the employee suggest improvements to existing processes?", category: "Initiative and Problem-Solving", responses: 2, average: "3.50", variance: "0.00" },
  { question: "How effectively does the employee respond to changing priorities?", category: "Initiative and Problem-Solving", responses: 2, average: "4.50", variance: "0.00" },
  { question: "Has the employee demonstrated measurable improvement?", category: "Learning and Development", responses: 2, average: "4.00", variance: "0.00" },
  { question: "Does the employee actively seek and apply feedback?", category: "Learning and Development", responses: 2, average: "3.50", variance: "0.00" },
];

export const SALARY_COMPONENTS_DATA = [
  { id: "sc-1", name: "Basic salary", type: "Earning", calculation: "Flat", taxable: true, recurring: true },
  { id: "sc-2", name: "Housing", type: "Earning", calculation: "Flat", taxable: false, recurring: true },
];

export const EMPLOYEE_SALARIES_DATA = [
  {
    id: "es-1",
    name: "Alex Morgan",
    monthlySalary: "£4,000.00",
    annualSalary: "£48,000.00",
    currency: "GBP",
    payFrequency: "Monthly",
    effectiveFrom: "24/10/2026",
    status: "Active",
  },
  {
    id: "es-2",
    name: "Jordan Lee",
    monthlySalary: "£2,000.00",
    annualSalary: "£24,000.00",
    currency: "GBP",
    payFrequency: "Monthly",
    effectiveFrom: "24/10/2026",
    status: "Active",
  },
];

export const RECENT_TRANSFERS_DATA = [
  { id: "rt-1", created: "30/10/2026, 8:10:47 AM", type: "Salary import - CSV", status: "Completed", progress: "2 / 2" },
  { id: "rt-2", created: "27/10/2026, 8:21:10 AM", type: "Salary import - CSV", status: "Cancelled", progress: "2 / 2" },
  { id: "rt-3", created: "27/10/2026, 8:20:54 AM", type: "Salary import - CSV", status: "Cancelled", progress: "1 / 1" },
];

export const TAX_BRACKETS_DATA = [
  { id: "tb-1", upperLimit: "12570", rate: "0" },
  { id: "tb-2", upperLimit: "50270", rate: "20" },
  { id: "tb-3", upperLimit: "125140", rate: "40" },
];

// Recruitment Datasets (Steps 77-85)
export const RECRUITMENT_STATS = [
  { id: "open-jobs", count: 1, label: "Open Jobs", icon: "docFile" as IconName },
  { id: "total-applicants", count: 2, label: "Total Applicants", icon: "users" as IconName },
  { id: "interviews-week", count: 0, label: "Interviews This Week", icon: "video" as IconName },
  { id: "hires-month", count: 1, label: "Hires This Month", icon: "check" as IconName },
];

export const JOB_POSTINGS = [
  {
    id: "job-1",
    title: "Software Engineer (Platform)",
    department: "Engineering",
    type: "FULL TIME",
    status: "OPEN",
    applicants: "-",
    actions: ["edit", "pause", "delete"],
  },
  {
    id: "job-2",
    title: "SENIOR ENGINEER",
    department: "Engineering",
    type: "FULL TIME",
    status: "CLOSED",
    applicants: "-",
    actions: ["edit", "delete"],
  },
];

export const CAREERS_JOB = {
  title: "Software Engineer (Platform)",
  department: "Engineering",
  location: "United Kingdom",
  type: "FULL TIME",
  level: "Mid Level",
  salary: "£50,000 - £60,000",
  description:
    "Builds and maintains the internal developer platform that everyone else ships on. The job is part infrastructure, part software engineering and part product management. You treat the platform as a product and developers as your customers.",
};

export const APPLICANTS_LIST = [
  {
    id: "app-alex",
    name: "Alex Morgan",
    email: "alex.morgan@snaarp.com",
    job: "Software Engineer (Platform)",
    stage: "Hired",
    rating: 0,
    source: "DIRECT",
    isNew: true,
  },
];

export const ARCHIVED_JOBS = [
  {
    id: "arch-1",
    title: "SENIOR ENGINEER",
    ref: "a1b2c3d4",
    postedDate: "19/10/2026",
    applicantsCount: 1,
    applicants: [
      {
        id: "arch-app-1",
        name: "Alex Morgan",
        email: "alex.morgan@snaarp.com",
        job: "SENIOR ENGINEER",
        stage: "Rejected",
        source: "DIRECT",
      },
    ],
  },
];

// Email Templates Dataset (Step 86)
export const EMAIL_TEMPLATES = [
  {
    id: "additional-docs",
    name: "Additional documents",
    purpose: "Request documents",
    subject: "{{organisation_name}} is requesting more Documents from you",
    message: `Hello {{applicant_name}},

{{organisation_name}} needs more documents to continue your application for the {{job_title}} position.

Please follow these instructions when preparing your documents:
{{instructions}}

Upload your documents securely using the link below:
{{upload_link}}

This link expires on {{deadline}}. Please complete your upload before then.

If you have any questions or are unable to provide a requested document, please contact our recruitment team.

Kind regards,
Recruitment Team
{{organisation_name}}`,
    placeholders: "{{applicant_name}}, {{job_title}}, {{organisation_name}}, {{upload_link}}, {{document_list}}, {{instructions}}, {{deadline}}",
    autoSend: true,
    previewSubject: "Your organisation has received your Application",
    previewBody: `Hello Jane Doe,

Thank you for applying for the Product Manager position at Your organisation. We have received your application. Our recruitment team will review your qualifications and experience against the role's requirements and contact you with an update on the next steps.

Thank you for your interest in joining our team.

Kind regards,
Recruitment Team,
Your organisation`,
  },
  {
    id: "app-received",
    name: "Application received",
    purpose: "Application acknowledgment",
    subject: "Your application for {{job_title}} at {{organisation_name}}",
    message: `Hello {{applicant_name}},

Thank you for applying for the {{job_title}} position at {{organisation_name}}. We have received your application and materials.

Our hiring team will review your background and be in touch soon.

Kind regards,
Recruitment Team
{{organisation_name}}`,
    placeholders: "{{applicant_name}}, {{job_title}}, {{organisation_name}}",
    autoSend: true,
    previewSubject: "Your application for Software Engineer at Acme Ltd",
    previewBody: "Hello Jane Doe,\n\nThank you for applying for the position...",
  },
  { id: "app-rejection", name: "Application rejection", purpose: "Rejection", subject: "Update on your application", message: "", placeholders: "", autoSend: false },
  { id: "app-screening", name: "Application screening", purpose: "Screening", subject: "Screening invitation", message: "", placeholders: "", autoSend: false },
  { id: "app-successful", name: "Application successful", purpose: "Success", subject: "Congratulations", message: "", placeholders: "", autoSend: false },
  { id: "assessment-stage", name: "Assessment stage", purpose: "Assessment", subject: "Technical assessment", message: "", placeholders: "", autoSend: false },
  { id: "interview-stage", name: "Interview stage", purpose: "Interview", subject: "Interview invitation", message: "", placeholders: "", autoSend: false },
  { id: "offer-stage", name: "Offer stage", purpose: "Offer", subject: "Offer of employment", message: "", placeholders: "", autoSend: false },
];

// Compliance Folders Dataset (Steps 87-89)
export const COMPLIANCE_FOLDERS = [
  {
    id: "engineering",
    name: "Engineering policies",
    department: "Engineering",
    count: 1,
    description: "policies for engineering department",
    awaitingReview: 0,
  },
  {
    id: "marketing",
    name: "Marketing policies",
    department: "Marketing",
    count: 0,
    description: "policies for marketing department",
    awaitingReview: 1,
    awaitingItem: {
      title: "Marketing policies",
      uploader: "Jordan Lee",
      version: "1.0",
    },
  },
];

// Lifecycle Datasets (Steps 90-96)
export const ONBOARDING_ADMIN_RECORDS = [
  {
    id: "alex-morgan",
    employee: "Alex Morgan",
    startDate: "2026-10-30",
    progress: "5/5 tasks",
    status: "Completed",
  },
];

export const ONBOARDING_TEMPLATE_STANDARD = {
  name: "Standard onboarding",
  tasksCount: 5,
  version: 2,
  archived: false,
  tasks: [
    {
      id: "t1",
      title: "Complete your employee profile",
      type: "Profile",
      owner: "Employee",
      days: 0,
      instructions: "Fill in personal, contact, and emergency details.",
      required: true,
      requiresReview: false,
    },
    {
      id: "t2",
      title: "Upload identity document",
      type: "Documents",
      owner: "Employee",
      days: 0,
      instructions: "Upload a valid government-issued passport or national ID.",
      required: true,
      requiresReview: true,
    },
    {
      id: "t3",
      title: "Prepare equipment",
      type: "Equipment",
      owner: "HR",
      days: -1,
      instructions: "Configure laptop and developer peripherals.",
      required: true,
      requiresReview: false,
    },
    {
      id: "t4",
      title: "Set up work accounts",
      type: "Access",
      owner: "HR",
      days: -1,
      instructions: "Grant Snaarp 360, GitHub, and Slack organization access.",
      required: true,
      requiresReview: false,
    },
    {
      id: "t5",
      title: "First-day orientation",
      type: "Orientation",
      owner: "HR",
      days: 0,
      instructions: "Conduct welcoming walk-through and introduction to team.",
      required: true,
      requiresReview: false,
    },
  ],
};

export const OFFBOARDING_DASHBOARD_RECORDS = [
  {
    id: "casey-brown",
    employee: "Casey Brown",
    department: "-",
    lastWorkingDay: "26/11/2026",
    progress: 50,
    status: "On Track",
  },
];

export const OFFBOARDING_RESIGNATIONS = [
  {
    id: "casey-brown",
    employee: "Casey Brown",
    department: "-",
    proposedLwd: "26/11/2026",
    submitted: "29/10/2026",
    status: "Approved",
  },
  {
    id: "alex-morgan",
    employee: "Alex Morgan",
    department: "-",
    proposedLwd: "27/11/2026",
    approvedLwd: "27/11/2026",
    submitted: "19/10/2026",
    status: "Approved",
    reason: "Moving to a new role elsewhere",
  },
];

export const EXIT_DEFAULT_TEMPLATES = [
  {
    id: "standard-exit",
    title: "Standard Exit Checklist",
    color: "blue",
    description: "A comprehensive exit checklist covering all standard offboarding procedures.",
    itemsCount: 8,
    items: [
      "Company vehicle handed in",
      "All equipment handed in",
      "All library books submitted",
      "Security clearance",
      "Exit interview conducted",
      "Resignation letter submitted",
      "Notice period followed",
      "Manager/Supervisor clearance",
    ],
  },
  {
    id: "it-equipment",
    title: "IT Equipment Return",
    color: "purple",
    description: "Checklist for returning all IT-related assets and deactivating access.",
    itemsCount: 5,
    items: [
      "Laptop returned",
      "Charger and accessories returned",
      "Security badge returned",
      "VPN access revoked",
      "Company email deactivated",
    ],
  },
  {
    id: "finance-clearance",
    title: "Finance Clearance",
    color: "green",
    description: "Financial clearance items to ensure all monetary obligations are settled.",
    itemsCount: 4,
    items: [
      "Outstanding expenses submitted",
      "Corporate card cancelled",
      "Salary advance balance settled",
      "Final payroll sign-off",
    ],
  },
];
