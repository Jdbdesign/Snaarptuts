export const PROJECTS_URLS = {
  dashboard: "projects.snaarp.com/dashboard",
  projects: "projects.snaarp.com/projects",
  members: "projects.snaarp.com/members",
  tasks: "projects.snaarp.com/tasks",
} as const;

export type ProjectsView = "dashboard" | "projects" | "members" | "tasks";

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
