export const PROJECTS_URLS = {
  dashboard: "projects.snaarp.com/dashboard",
  projects: "projects.snaarp.com/projects",
  members: "projects.snaarp.com/members",
  tasks: "projects.snaarp.com/tasks",
  sprints: "projects.snaarp.com/sprints",
  goalsNew: "projects.snaarp.com/goals/new",
  whiteboards: "projects.snaarp.com/whiteboards",
  documents: "projects.snaarp.com/documents",
  docEditor: "projects.snaarp.com/documents/doc-product-design",
  docEditorNew: "projects.snaarp.com/documents/doc-design-document",
  automations: "projects.snaarp.com/automations",
  integration: "projects.snaarp.com/integration",
  reports: "projects.snaarp.com/reports",
  profile: "projects.snaarp.com/profile",
} as const;

export type ProjectsView =
  | "dashboard"
  | "projects"
  | "members"
  | "tasks"
  | "sprints"
  | "goals-new"
  | "whiteboards"
  | "whiteboard-canvas"
  | "documents"
  | "doc-editor"
  | "automations"
  | "integration"
  | "reports"
  | "profile";

export interface ProjectItem {
  id: string;
  name: string;
  description: string;
  category: string;
  client: string;
  lead: string;
  priority: "High" | "Medium" | "Low";
  startDate: string;
  dueDate: string;
  tasksCount: number;
  completedCount: number;
  issuesCount: number;
  bugsCount: number;
  team: string[];
  isInternal?: boolean;
}

export interface TeamMember {
  id: string;
  name: string;
  email: string;
  avatar: string;
  role: "Admin" | "Member";
  status: "Active" | "Not in workspace";
}

export interface SubtaskItem {
  id: string;
  title: string;
  completed: boolean;
}

export interface TaskComment {
  id: string;
  author: string;
  avatar: string;
  time: string;
  text: string;
}

export interface TaskItem {
  id: string;
  type: string;
  title: string;
  status: "To Do" | "In Progress" | "Done" | "Closed";
  priority: "Normal" | "High" | "Low";
  assignees: string[];
  dueDate: string;
  description?: string;
  subtasks: SubtaskItem[];
  comments: TaskComment[];
  isArchived?: boolean;
}

export interface TemplateItem {
  id: string;
  name: string;
  category: string;
  description: string;
  tasksCount?: number;
}

export const INITIAL_PROJECTS: ProjectItem[] = [
  {
    id: "p1",
    name: "Customer Acquisition Strategy",
    description: "Analyzing market trends and customer insights to craft data-driven strategies for growth and competitive advantage.",
    category: "Development",
    client: "Customer",
    lead: "Sam Taylor",
    priority: "Medium",
    startDate: "Oct 13, 2026",
    dueDate: "Oct 15, 2026",
    tasksCount: 7,
    completedCount: 0,
    issuesCount: 0,
    bugsCount: 0,
    team: ["A", "D", "Y", "V", "A", "I", "S", "M"],
    isInternal: true,
  },
  {
    id: "p2",
    name: "Digital Marketing",
    description: "Monitor the development of your marketing strategy as well as SEO, branding, design, and progress.",
    category: "Marketing",
    client: "Acme Studio",
    lead: "Jane Doe",
    priority: "Medium",
    startDate: "Oct 12, 2026",
    dueDate: "Oct 14, 2026",
    tasksCount: 9,
    completedCount: 0,
    issuesCount: 0,
    bugsCount: 0,
    team: ["A", "D"],
    isInternal: true,
  },
  {
    id: "p3",
    name: "Mobile App Launch",
    description: "Coordinate beta testing, store listings, and launch marketing for the iOS and Android applications.",
    category: "Mobile",
    client: "Acme Studio",
    lead: "Sam Taylor",
    priority: "Medium",
    startDate: "Oct 10, 2026",
    dueDate: "Oct 14, 2026",
    tasksCount: 5,
    completedCount: 0,
    issuesCount: 0,
    bugsCount: 0,
    team: ["A", "D"],
    isInternal: true,
  },
  {
    id: "p4",
    name: "Backend Fix",
    description: "Fixing bugs in the backend and optimizing database performance.",
    category: "Development",
    client: "Customer",
    lead: "Jordan Lee",
    priority: "Medium",
    startDate: "Oct 11, 2026",
    dueDate: "Oct 15, 2026",
    tasksCount: 1,
    completedCount: 0,
    issuesCount: 0,
    bugsCount: 0,
    team: ["A", "D"],
    isInternal: true,
  },
];

export const TEMPLATE_PROJECT: ProjectItem = {
  id: "p-template",
  name: "Explore Snaarp Projects!",
  description: "With this template, you can get a kick start of Snaarp Projects.",
  category: "Research",
  client: "Acme Studio",
  lead: "Jane Doe",
  priority: "High",
  startDate: "Nov 16, 2026",
  dueDate: "Dec 19, 2026",
  tasksCount: 5,
  completedCount: 0,
  issuesCount: 0,
  bugsCount: 0,
  team: ["A", "D", "Y", "V", "A", "I", "S", "M"],
  isInternal: true,
};

export const INITIAL_MEMBERS: TeamMember[] = [
  { id: "m1", name: "Sam Taylor", email: "sam.taylor@example.com", avatar: "S", role: "Admin", status: "Active" },
  { id: "m2", name: "Casey Brown", email: "casey.brown@example.com", avatar: "C", role: "Member", status: "Active" },
  { id: "m3", name: "Jane Doe", email: "jane@example.com", avatar: "J", role: "Member", status: "Active" },
  { id: "m4", name: "Jordan Lee", email: "jordan.lee@example.com", avatar: "J", role: "Admin", status: "Active" },
  { id: "m5", name: "Alex Morgan", email: "alex.morgan@example.com", avatar: "A", role: "Member", status: "Active" },
  { id: "m6", name: "Priya Shah", email: "priya.shah@example.com", avatar: "P", role: "Member", status: "Active" },
  { id: "m7", name: "Elena Marsh", email: "elena.marsh@example.com", avatar: "E", role: "Member", status: "Active" },
  { id: "m8", name: "Ravi Menon", email: "ravi.menon@example.com", avatar: "R", role: "Member", status: "Active" },
  // 12 not in workspace members
  { id: "m9", name: "Taylor Smith", email: "taylor@example.com", avatar: "T", role: "Member", status: "Not in workspace" },
  { id: "m10", name: "Morgan Green", email: "morgan@example.com", avatar: "M", role: "Member", status: "Not in workspace" },
  { id: "m11", name: "Chris Evans", email: "chris@example.com", avatar: "C", role: "Member", status: "Not in workspace" },
  { id: "m12", name: "Riley Vance", email: "riley@example.com", avatar: "R", role: "Member", status: "Not in workspace" },
  { id: "m13", name: "Dakota Hayes", email: "dakota@example.com", avatar: "D", role: "Member", status: "Not in workspace" },
  { id: "m14", name: "Quinn Adams", email: "quinn@example.com", avatar: "Q", role: "Member", status: "Not in workspace" },
  { id: "m15", name: "Harper Brooks", email: "harper@example.com", avatar: "H", role: "Member", status: "Not in workspace" },
  { id: "m16", name: "Avery Davis", email: "avery@example.com", avatar: "A", role: "Member", status: "Not in workspace" },
  { id: "m17", name: "Kendall Reed", email: "kendall@example.com", avatar: "K", role: "Member", status: "Not in workspace" },
  { id: "m18", name: "Reece Wilson", email: "reece@example.com", avatar: "R", role: "Member", status: "Not in workspace" },
  { id: "m19", name: "Logan Clark", email: "logan@example.com", avatar: "L", role: "Member", status: "Not in workspace" },
  { id: "m20", name: "Peyton Wood", email: "peyton@example.com", avatar: "P", role: "Member", status: "Not in workspace" },
];

export const INITIAL_TASKS: TaskItem[] = [
  {
    id: "t1",
    type: "Task",
    title: "Create your first project",
    status: "To Do",
    priority: "Normal",
    assignees: [],
    dueDate: "—",
    subtasks: [],
    comments: [],
  },
  {
    id: "t2",
    type: "Task",
    title: "Add team members",
    status: "To Do",
    priority: "Normal",
    assignees: [],
    dueDate: "—",
    subtasks: [],
    comments: [],
  },
  {
    id: "t3",
    type: "Task",
    title: "Set up task statuses",
    status: "To Do",
    priority: "Normal",
    assignees: [],
    dueDate: "—",
    subtasks: [],
    comments: [],
  },
  {
    id: "t4",
    type: "Task",
    title: "Create milestones",
    status: "To Do",
    priority: "Normal",
    assignees: [],
    dueDate: "—",
    subtasks: [],
    comments: [],
  },
  {
    id: "t5",
    type: "Task",
    title: "Explore reports",
    status: "To Do",
    priority: "Low",
    assignees: [],
    dueDate: "—",
    subtasks: [],
    comments: [],
  },
];

export const NEW_TASK_DATA: TaskItem = {
  id: "t6",
  type: "Task",
  title: "Research competitor onboarding flows",
  status: "To Do",
  priority: "High",
  assignees: ["jane@example.com", "sam.taylor@example.com"],
  dueDate: "19/11/2026",
  description: "Check at least five competitors and note their sign-up steps.",
  subtasks: [
    {
      id: "st1",
      title: "Compile findings into a spreadsheet",
      completed: false,
    },
  ],
  comments: [
    {
      id: "c1",
      author: "Jane Doe",
      avatar: "J",
      time: "Just now",
      text: "Started the research today.",
    },
  ],
};

export const TEMPLATES_LIST: TemplateItem[] = [
  {
    id: "tmpl-blank",
    name: "Blank Project",
    category: "All",
    description: "Start from scratch with a clean slate.",
  },
  {
    id: "tmpl-explore",
    name: "Explore Snaarp Projects!",
    category: "Others",
    description: "With this template, you can get a kick start of Snaarp Projects.",
    tasksCount: 5,
  },
  {
    id: "tmpl-marketing",
    name: "Digital Marketing",
    category: "Marketing/Sales",
    description: "Monitor the development of your marketing strategy as well as SEO, branding, design, and progress...",
    tasksCount: 9,
  },
  {
    id: "tmpl-acquisition",
    name: "Customer Acquisition Strategy",
    category: "Marketing/Sales",
    description: "Analyzing market trends and customer insights to craft data-driven strategies for growth and...",
    tasksCount: 7,
  },
  {
    id: "tmpl-dev",
    name: "Software Development",
    category: "Software/IT",
    description: "With our pre-defined Template, managing and monitoring your software development project will b...",
    tasksCount: 11,
  },
  {
    id: "tmpl-product",
    name: "Product Launch Plan",
    category: "Software/IT",
    description: "Strategizing and executing a comprehensive plan to introduce a new product to the market effectively...",
    tasksCount: 8,
  },
  {
    id: "tmpl-website",
    name: "Website Development",
    category: "Software/IT",
    description: "Your website's pages should be carefully planned, organised, and constructed. Using this template, yo...",
  },
  {
    id: "tmpl-support",
    name: "IT Support Project",
    category: "Software/IT",
    description: "Customize this IT support project template to meet your specific business requirements.",
  },
];

// ==========================================
// Part 2: Sprints, Goals, Time, Whiteboards
// ==========================================

export interface SprintItem {
  id: string;
  number: number;
  name: string;
  goal: string;
  status: "Planning" | "Active" | "Completed" | "Cancelled";
  startDate: string;
  endDate: string;
  capacity: number;
  project: string;
  completedItems: number;
  totalItems: number;
  points: number;
}

export interface GoalItem {
  id: string;
  name: string;
  description: string;
  targetType: "Percentage" | "Number" | "Currency";
  targetValue: number;
  dueDate: string;
  status: "active" | "completed" | "behind";
  progress: number;
}

export interface TimeEntryItem {
  id: string;
  taskName: string;
  userEmail: string;
  durationMinutes: number;
  date: string; // e.g. "2026-11-15"
  description?: string;
}

export interface WhiteboardItem {
  id: string;
  title: string;
  updatedDate: string; // "17/11/2026"
  thumbnailType?: "shapes" | "flow" | "empty";
}

export const CREATED_SPRINT_DATA: SprintItem = {
  id: "sprint-1",
  number: 1,
  name: "Onboarding Flow",
  goal: "Build the whole authentication flow from get started to the Home screen",
  status: "Planning",
  startDate: "2026-11-16",
  endDate: "2026-11-18",
  capacity: 40,
  project: "Explore Snaarp Projects!",
  completedItems: 0,
  totalItems: 0,
  points: 0,
};

export const CREATED_GOAL_DATA: GoalItem = {
  id: "goal-1",
  name: "Authentication Completion",
  description: "The full authentication must be completed so users can test it",
  targetType: "Percentage",
  targetValue: 100,
  dueDate: "2026-11-18",
  status: "active",
  progress: 0,
};

export const INITIAL_WHITEBOARDS: WhiteboardItem[] = [
  {
    id: "wb-sales",
    title: "Sales & Marketing",
    updatedDate: "17/11/2026",
    thumbnailType: "shapes",
  },
  {
    id: "wb-design",
    title: "Design Idea",
    updatedDate: "15/09/2026",
    thumbnailType: "empty",
  },
];

export const NEW_WHITEBOARD_DATA: WhiteboardItem = {
  id: "wb-research",
  title: "Research Product",
  updatedDate: "15/11/2026",
  thumbnailType: "flow",
};

export const TIME_TRACKING_USERS = [
  "api@example.com",
  "devops@example.com",
  "jane@example.com",
  "sam.taylor@example.com",
  "casey.brown@example.com",
  "jordan.lee@example.com",
];

export const ALL_PROJECT_NAMES = [
  "Explore Snaarp Projects!",
  "Customer Acquisition Strategy",
  "Digital Marketing",
  "Mobile App Launch",
  "Backend Fix",
];

// ==========================================
// Part 3: Documents, Automations, Integrations, Reports, Profile
// ==========================================

export interface DocumentItem {
  id: string;
  title: string;
  updatedDate: string;
  content?: string;
}

export const INITIAL_DOCUMENTS: DocumentItem[] = [
  { id: "doc-product-design", title: "Product design", updatedDate: "9/24/2026", content: "" },
  { id: "doc-meeting-notes", title: "Meeting notes", updatedDate: "10/21/2026", content: "" },
  { id: "doc-release-checklist", title: "Release checklist", updatedDate: "10/22/2026", content: "" },
  { id: "doc-brand-guidelines", title: "Brand guidelines", updatedDate: "10/22/2026", content: "" },
  { id: "doc-sprint-retro", title: "Sprint retrospective", updatedDate: "10/22/2026", content: "" },
  { id: "doc-onboarding-guide", title: "Onboarding guide", updatedDate: "10/22/2026", content: "" },
];

export const NEW_DOCUMENT_DATA: DocumentItem = {
  id: "doc-design-document",
  title: "Design Document",
  updatedDate: "11/16/2026",
  content: "",
};

export interface AutomationCondition {
  field: "Priority" | "Assignee" | "Tag";
  operator: "Equals" | "Contains" | "Greater Than";
  value: string;
}

export interface AutomationAction {
  actionType: "Change Status" | "Assign Member" | "Set Priority";
  targetValue: string;
}

export interface AutomationRule {
  id: string;
  name: string;
  trigger: string;
  conditionsCount: number;
  actionsCount: number;
  conditions?: AutomationCondition[];
  actions?: AutomationAction[];
  enabled: boolean;
}

export interface AutomationTemplate {
  id: string;
  title: string;
  category: "Tasks" | "Notifications";
  description: string;
  trigger: string;
  actionsCount: number;
}

export const AUTOMATION_TEMPLATES: AutomationTemplate[] = [
  {
    id: "tmpl-triage",
    title: "Triage new tasks",
    category: "Tasks",
    description: "Add a 'needs-triage' tag when a task is created",
    trigger: "Task Created",
    actionsCount: 1,
  },
  {
    id: "tmpl-tag-completed",
    title: "Tag completed tasks",
    category: "Tasks",
    description: "Tag a task as completed when all subtasks are checked",
    trigger: "Task Completed",
    actionsCount: 1,
  },
  {
    id: "tmpl-urgent-alert",
    title: "Urgent priority alert",
    category: "Notifications",
    description: "Send instant notification to lead when priority is set to Urgent",
    trigger: "Priority Change",
    actionsCount: 1,
  },
  {
    id: "tmpl-due-reminder",
    title: "Due date reminder",
    category: "Notifications",
    description: "Send reminders 24 hours before a task due date arrives",
    trigger: "Due Date Arrival",
    actionsCount: 2,
  },
];

export const CREATED_AUTOMATION_RULE: AutomationRule = {
  id: "rule-assign-team",
  name: "Assign Task to Team",
  trigger: "Task Created",
  conditionsCount: 3,
  actionsCount: 2,
  conditions: [
    { field: "Priority", operator: "Equals", value: "Normal" },
    { field: "Assignee", operator: "Contains", value: "jane@example.com" },
    { field: "Tag", operator: "Contains", value: "design" },
  ],
  actions: [
    { actionType: "Assign Member", targetValue: "jane@example.com" },
    { actionType: "Set Priority", targetValue: "High" },
  ],
  enabled: true,
};

export interface IntegrationApp {
  id: string;
  name: string;
  category: "Communication" | "Development" | "Productivity" | "Design" | "Analytics" | "Storage";
  description: string;
  iconType: "slack" | "github" | "figma" | "notion" | "gdrive" | "jira" | "zapier" | "gcal" | "datadog" | "discord";
  connected: boolean;
  lastSynced?: string;
}

export interface ApiKeyItem {
  id: string;
  name: string;
  keyMasked: string;
  createdAt: string;
}

export const INITIAL_INTEGRATION_APPS: IntegrationApp[] = [
  {
    id: "app-slack",
    name: "Slack",
    category: "Communication",
    description: "Get task updates, completions, and mentions sent instantly to any channel.",
    iconType: "slack",
    connected: false,
  },
  {
    id: "app-github",
    name: "GitHub",
    category: "Development",
    description: "Pull requests are automatically linked to tasks by branch name or commit message.",
    iconType: "github",
    connected: false,
  },
  {
    id: "app-figma",
    name: "Figma",
    category: "Design",
    description: "Latest Figma frame thumbnails appear inline on task cards.",
    iconType: "figma",
    connected: false,
  },
  {
    id: "app-notion",
    name: "Notion",
    category: "Productivity",
    description: "Mirror tasks to a Notion database - status, assignees, and due date stay in sync.",
    iconType: "notion",
    connected: false,
  },
  {
    id: "app-gdrive",
    name: "Google Drive",
    category: "Storage",
    description: "Attach any Drive file to a task or project - team members see a live preview.",
    iconType: "gdrive",
    connected: false,
  },
  {
    id: "app-jira",
    name: "Jira",
    category: "Development",
    description: "Issues created in Jira appear as tasks in Snaarp - and vice versa.",
    iconType: "jira",
    connected: false,
  },
  {
    id: "app-zapier",
    name: "Zapier",
    category: "Productivity",
    description: "Connect Snaarp to 5000+ apps with automated workflows.",
    iconType: "zapier",
    connected: false,
  },
  {
    id: "app-gcal",
    name: "Google Calendar",
    category: "Productivity",
    description: "Task due dates and milestones sync to your Google Calendar.",
    iconType: "gcal",
    connected: false,
  },
  {
    id: "app-datadog",
    name: "Datadog",
    category: "Analytics",
    description: "Monitor deployment metrics and link alerts to project tasks.",
    iconType: "datadog",
    connected: false,
  },
  {
    id: "app-discord",
    name: "Discord",
    category: "Communication",
    description: "Post task updates to Discord channels via webhooks.",
    iconType: "discord",
    connected: false,
  },
];

export interface ReportsData {
  totalTasks: number;
  completionRate: number;
  overdue: number;
  unassigned: number;
  priorityDistribution: {
    urgent: number;
    high: number;
    normal: number;
    low: number;
    none: number;
  };
  summary: {
    tasksWithDueDates: number;
    urgentPlusHigh: number;
    assignedTasks: number;
    avgTasksPerDay: number;
  };
}

export const INITIAL_REPORTS_DATA: ReportsData = {
  totalTasks: 6,
  completionRate: 0,
  overdue: 0,
  unassigned: 5,
  priorityDistribution: {
    urgent: 0,
    high: 1,
    normal: 4,
    low: 1,
    none: 0,
  },
  summary: {
    tasksWithDueDates: 1,
    urgentPlusHigh: 1,
    assignedTasks: 1,
    avgTasksPerDay: 1,
  },
};

export interface UserProfileData {
  fullName: string;
  email: string;
  avatarInitial: string;
  twoFactorEnabled: boolean;
}

export const INITIAL_USER_PROFILE: UserProfileData = {
  fullName: "Jane Doe",
  email: "jane@example.com",
  avatarInitial: "J",
  twoFactorEnabled: false,
};


