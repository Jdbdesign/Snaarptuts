export interface CrmMetric {
  id: string;
  label: string;
  value: string | number;
  sublabel: string;
}

export const CRM_HOME_METRICS: CrmMetric[] = [
  { id: "contacts", label: "CONTACTS", value: 59, sublabel: "Total contacts" },
  { id: "deals", label: "DEALS", value: 32, sublabel: "Active deals" },
  { id: "emails", label: "EMAILS", value: 0, sublabel: "Sent this month" },
  { id: "tasks", label: "TASKS", value: 0, sublabel: "Due today" },
];

export interface CrmDashboardItem {
  id: string;
  name: string;
  widgetCount: number;
  lastUpdated: string;
  isCustom?: boolean;
}

export const INITIAL_DASHBOARDS: CrmDashboardItem[] = [
  { id: "pr-sales", name: "PR sales", widgetCount: 0, lastUpdated: "9/1/2026" },
  { id: "my-dashboard", name: "My Dashboard", widgetCount: 8, lastUpdated: "8/7/2026" },
];

export interface WidgetCatalogItem {
  id: string;
  name: string;
  description: string;
  icon: string;
}

export const WIDGET_CATALOG: WidgetCatalogItem[] = [
  { id: "kpi-card", name: "KPI Card", description: "Single metric with comparison", icon: "activity" },
  { id: "bar-chart", name: "Bar Chart", description: "Grouped data visualization", icon: "barChart" },
  { id: "line-chart", name: "Line Chart", description: "Trending data over time", icon: "trendingUp" },
  { id: "pie-chart", name: "Pie Chart", description: "Distribution breakdown", icon: "pieChart" },
  { id: "donut-chart", name: "Donut Chart", description: "Distribution with center label", icon: "circle" },
  { id: "funnel", name: "Funnel", description: "Conversion stages", icon: "filter" },
  { id: "gauge", name: "Gauge", description: "Progress toward target", icon: "gauge" },
  { id: "table", name: "Table", description: "Tabular report data", icon: "table" },
  { id: "leaderboard", name: "Leaderboard", description: "Ranked list", icon: "award" },
  { id: "heatmap", name: "Heatmap", description: "Activity by day & hour", icon: "calendar" },
  { id: "custom-widget", name: "Custom Widget", description: "Admin-defined CRM or API widget", icon: "grid" },
];

export interface ProspectComment {
  id: string;
  author: string;
  text: string;
  date: string;
}

export interface ProspectItem {
  id: string;
  name: string;
  initials: string;
  stage: string;
  email: string;
  phone: string;
  value?: string;
  company?: string;
  title?: string;
  source?: string;
  createdAt: number;
  hasTask?: boolean;
  taskTitle?: string;
  taskPriority?: string;
  taskDone?: boolean;
  comments?: ProspectComment[];
  status?: 'open' | 'won' | 'lost';
}

export const INITIAL_PROSPECTS: ProspectItem[] = [
  {
    id: "prospect-sam",
    name: "Sam Taylor",
    initials: "ST",
    stage: "Event Leads",
    email: "sam.taylor@example.com",
    phone: "+44 7700 900123",
    value: "-",
    company: "Acme Studio",
    title: "Marketing Lead",
    source: "Website",
    createdAt: 1,
  },
  {
    id: "prospect-casey",
    name: "Casey Brown",
    initials: "CB",
    stage: "Lead",
    email: "casey.brown@example.com",
    phone: "+44 7700 900456",
    value: "-",
    company: "Acme Studio",
    title: "Sales Manager",
    source: "Referral",
    createdAt: 2,
  },
  {
    id: "prospect-jordan",
    name: "Jordan Lee",
    initials: "JL",
    stage: "Proposal",
    email: "jordan.lee@example.com",
    phone: "+44 7700 900789",
    value: "-",
    company: "Northstar Digital",
    title: "Operations Director",
    source: "LinkedIn",
    createdAt: 3,
  },
];

export const CRM_PROSPECTS: ProspectItem[] = INITIAL_PROSPECTS;

export interface CsvImportRecord {
  rowNum: number;
  firstName: string;
  lastName: string;
  name: string;
  email: string;
  phone: string;
  company: string;
  title: string;
  source: string;
  stage: string;
  dealValue: string;
  notes: string;
  isStageValid: boolean;
  issueText?: string;
}

export const CSV_IMPORT_RECORDS: CsvImportRecord[] = [
  {
    rowNum: 2,
    firstName: "Sam",
    lastName: "Taylor",
    name: "Sam Taylor",
    email: "sam.taylor@example.com",
    phone: "+44 7700 900105",
    company: "BrightPath Solutions",
    title: "Founder",
    source: "Website",
    stage: "Event Leads",
    dealValue: "5000",
    notes: "Met at conference",
    isStageValid: true,
  },
  {
    rowNum: 3,
    firstName: "Jordan",
    lastName: "Lee",
    name: "Jordan Lee",
    email: "jordan.lee@example.com",
    phone: "+44 7700 900103",
    company: "Northstar Digital",
    title: "Head of Growth",
    source: "LinkedIn",
    stage: "New",
    dealValue: "8500",
    notes: "Interested in CRM",
    isStageValid: false,
    issueText: '"New" is not a pipeline stage — will use the first stage',
  },
  {
    rowNum: 4,
    firstName: "Alex",
    lastName: "Morgan",
    name: "Alex Morgan",
    email: "alex.morgan@example.com",
    phone: "+44 7700 900101",
    company: "Acme Inc",
    title: "Marketing Manager",
    source: "Referral",
    stage: "Contacted",
    dealValue: "12000",
    notes: "Requested quote",
    isStageValid: false,
    issueText: '"Contacted" is not a pipeline stage — will use the first stage',
  },
  {
    rowNum: 5,
    firstName: "Cameron",
    lastName: "Reed",
    name: "Cameron Reed",
    email: "cameron.reed@example.com",
    phone: "+44 7700 900104",
    company: "Vertex Consulting",
    title: "Operations Director",
    source: "Website",
    stage: "Qualified",
    dealValue: "6500",
    notes: "Evaluating tools",
    isStageValid: false,
    issueText: '"Qualified" is not a pipeline stage — will use the first stage',
  },
  {
    rowNum: 6,
    firstName: "Priya",
    lastName: "Shah",
    name: "Priya Shah",
    email: "priya.shah@example.com",
    phone: "+44 7700 900102",
    company: "Cedar & Co.",
    title: "Sales Manager",
    source: "Event Leads",
    stage: "New",
    dealValue: "4200",
    notes: "Met at expo",
    isStageValid: false,
    issueText: '"New" is not a pipeline stage — will use the first stage',
  },
];

export const POST_IMPORT_PROSPECTS: ProspectItem[] = [
  {
    id: "prospect-alex",
    name: "Alex Morgan",
    initials: "AM",
    stage: "Event Leads",
    email: "alex.morgan@example.com",
    phone: "+44 7700 900101",
    value: "£12,000",
    company: "Acme Inc",
    title: "Marketing Manager",
    source: "Referral",
    createdAt: 4,
  },
  {
    id: "prospect-priya",
    name: "Priya Shah",
    initials: "PS",
    stage: "Event Leads",
    email: "priya.shah@example.com",
    phone: "+44 7700 900102",
    value: "£4,200",
    company: "Cedar & Co.",
    title: "Sales Manager",
    source: "Event Leads",
    createdAt: 5,
  },
  {
    id: "prospect-jordan-imp",
    name: "Jordan Lee",
    initials: "JL",
    stage: "Event Leads",
    email: "jordan.lee@example.com",
    phone: "+44 7700 900103",
    value: "£8,500",
    company: "Northstar Digital",
    title: "Head of Growth",
    source: "LinkedIn",
    createdAt: 6,
  },
  {
    id: "prospect-cameron",
    name: "Cameron Reed",
    initials: "CR",
    stage: "Event Leads",
    email: "cameron.reed@example.com",
    phone: "+44 7700 900104",
    value: "£6,500",
    company: "Vertex Consulting",
    title: "Operations Director",
    source: "Website",
    createdAt: 7,
  },
  {
    id: "prospect-taylor",
    name: "Taylor Davies",
    initials: "TD",
    stage: "Event Leads",
    email: "taylor.davies@example.com",
    phone: "+44 7700 900105",
    value: "£5,000",
    company: "BrightPath Solutions",
    title: "Founder",
    source: "Website",
    createdAt: 8,
  },
  {
    id: "prospect-sam",
    name: "Sam Taylor",
    initials: "ST",
    stage: "Event Leads",
    email: "sam.taylor@example.com",
    phone: "+44 7700 900123",
    value: "-",
    company: "Acme Studio",
    title: "Marketing Lead",
    source: "Website",
    createdAt: 1,
  },
  {
    id: "prospect-casey",
    name: "Casey Brown",
    initials: "CB",
    stage: "Lead",
    email: "casey.brown@example.com",
    phone: "+44 7700 900456",
    value: "-",
    company: "Acme Studio",
    title: "Sales Manager",
    source: "Referral",
    createdAt: 2,
  },
  {
    id: "prospect-sydney",
    name: "Sydney Scott",
    initials: "SS",
    stage: "Proposal",
    email: "sydney.scott@example.com",
    phone: "+44 7700 900789",
    value: "-",
    company: "Apex Tech",
    title: "VP Sales",
    source: "Direct",
    createdAt: 3,
  },
];

export interface CallItem {
  id: string;
  name: string;
  number: string;
  duration?: string;
  type: 'incoming' | 'outgoing' | 'missed';
  date: string;
}

export const CALLS_RECENT_LIST: CallItem[] = [
  { id: 'call-1', name: 'Sales', number: '+44 7700 900111', duration: '0:04', type: 'outgoing', date: '22 Oct' },
  { id: 'call-2', name: 'Sales', number: '+44 7700 900112', duration: '0:04', type: 'outgoing', date: '22 Oct' },
  { id: 'call-3', name: 'Sales', number: '+44 7700 900113', type: 'missed', date: '14 Oct' },
  { id: 'call-4', name: 'Sales', number: '+44 7700 900114', type: 'missed', date: '14 Oct' },
];

export interface SmsConversationItem {
  id: string;
  name: string;
  preview: string;
  time: string;
  badge?: string;
  phone: string;
}

export const SMS_CONVERSATIONS: SmsConversationItem[] = [
  { id: 'sms-wa', name: '+WhatsApp', preview: '<#> Your WhatsApp Busine...', time: '9:45 PM', phone: '+44 7700 900110' },
  { id: 'sms-1', name: '+44 7700 900111', preview: 'Yeah, I got it', time: '1:55 PM', phone: '+44 7700 900111' },
  { id: 'sms-2', name: 'My Uk Line', preview: '+44 7700 900112', time: 'Contact', phone: '+44 7700 900112' },
  { id: 'sms-3', name: 'My New Uk Line 2', preview: '+44 7700 900113', time: 'Contact', phone: '+44 7700 900113' },
  { id: 'sms-4', name: 'Sam Taylor', preview: '+44 7700 900114', time: 'Contact', phone: '+44 7700 900114' },
  { id: 'sms-5', name: 'Casey Brown', preview: '+44 7700 900115', time: 'Contact', phone: '+44 7700 900115' },
];

export interface CrmProductOption {
  id: string;
  name: string;
  price: string;
}

export const CRM_PRODUCT_OPTIONS: CrmProductOption[] = [
  { id: 'books', name: 'Books', price: 'GBP 5' },
  { id: 'crm', name: 'CRM', price: 'GBP 5' },
  { id: 'document', name: 'Document', price: 'GBP 5' },
  { id: 'drive', name: 'Drive', price: 'USD 0' },
  { id: 'one-card', name: 'One Card', price: 'USD 0' },
  { id: 'pdf', name: 'PDF', price: 'USD 0' },
  { id: 'projects', name: 'Projects', price: 'USD 0' },
  { id: 'sendrit', name: 'Sendrit', price: 'USD 0' },
  { id: 'sheet', name: 'Sheet', price: 'USD 0' },
];

export interface PipelineStage {
  id: string;
  label: string;
  dotColor: string;
  contactCount: number;
  percentage: string;
}

export const PIPELINE_STAGES: PipelineStage[] = [
  { id: "event-leads", label: "Event Leads", dotColor: "#EF4444", contactCount: 1, percentage: "10%" },
  { id: "lead", label: "Lead", dotColor: "#3B82F6", contactCount: 1, percentage: "5%" },
  { id: "proposal", label: "Proposal", dotColor: "#8B5CF6", contactCount: 1, percentage: "10%" },
  { id: "presentation", label: "Presentation", dotColor: "#A855F7", contactCount: 0, percentage: "10%" },
  { id: "awaiting-response", label: "Awaiting Response", dotColor: "#7C3AED", contactCount: 0, percentage: "10%" },
  { id: "interviewing", label: "Interviewing", dotColor: "#10B981", contactCount: 0, percentage: "5%" },
];

export const SORT_OPTIONS = [
  "Most recent",
  "Oldest",
  "Name (A-Z)",
  "Name (Z-A)",
  "Value (high-low)",
  "Value (low-high)",
] as const;

export type SortOption = (typeof SORT_OPTIONS)[number];

export const SHARE_ROLES = [
  "Everyone in organization",
  "Admin",
  "Manager",
  "Member",
  "Viewer",
] as const;

/* --- Part 3 (Steps 13-17) Data Definitions --- */

export interface ForecastStageItem {
  stage: string;
  probability: string;
  dealsCount: number;
  pipelineValue: string;
  weightedValue: string;
  barColor: string;
  barWidthPercent: number;
}

export const FORECAST_STAGES: ForecastStageItem[] = [
  { stage: 'Event Leads', probability: '10%', dealsCount: 352, pipelineValue: '£24.2k', weightedValue: '£2.4k', barColor: '#F87171', barWidthPercent: 92 },
  { stage: 'Admission Request', probability: '5%', dealsCount: 0, pipelineValue: '£0', weightedValue: '£0', barColor: '#9CA3AF', barWidthPercent: 0 },
  { stage: 'Form Sent', probability: '10%', dealsCount: 0, pipelineValue: '£0', weightedValue: '£0', barColor: '#9CA3AF', barWidthPercent: 0 },
  { stage: 'Lead', probability: '5%', dealsCount: 27, pipelineValue: '£12.1k', weightedValue: '£605', barColor: '#818CF8', barWidthPercent: 54 },
  { stage: 'Meeting', probability: '30%', dealsCount: 0, pipelineValue: '£0', weightedValue: '£0', barColor: '#9CA3AF', barWidthPercent: 0 },
  { stage: 'Proposal', probability: '10%', dealsCount: 4, pipelineValue: '£0', weightedValue: '£0', barColor: '#9CA3AF', barWidthPercent: 0 },
  { stage: 'Presentation', probability: '10%', dealsCount: 1, pipelineValue: '£0', weightedValue: '£0', barColor: '#9CA3AF', barWidthPercent: 0 },
  { stage: 'Admission Granted', probability: '100%', dealsCount: 0, pipelineValue: '£0', weightedValue: '£0', barColor: '#9CA3AF', barWidthPercent: 0 },
  { stage: 'Awaiting Response', probability: '10%', dealsCount: 0, pipelineValue: '£0', weightedValue: '£0', barColor: '#9CA3AF', barWidthPercent: 0 },
];

export interface ForecastRepItem {
  id: string;
  name: string;
  email: string;
  openDeals: number;
  pipeline: string;
  weighted: string;
  wonYtd: string;
  target: string;
  attainment: string;
}

export const FORECAST_REPS: ForecastRepItem[] = [
  { id: 'rep-sam', name: 'Sam Taylor', email: 'sam.taylor@example.com', openDeals: 8, pipeline: '£36.2k', weighted: '£3.0k', wonYtd: '£0', target: '—', attainment: 'No target' },
  { id: 'rep-casey', name: 'Casey Brown', email: 'casey.brown@example.com', openDeals: 3, pipeline: '£150', weighted: '£15', wonYtd: '£0', target: '—', attainment: 'No target' },
  { id: 'rep-jordan', name: 'Jordan Lee', email: 'jordan.lee@example.com', openDeals: 366, pipeline: '£0', weighted: '£0', wonYtd: '£0', target: '—', attainment: 'No target' },
  { id: 'rep-alex', name: 'Alex Morgan', email: 'alex.morgan@example.com', openDeals: 2, pipeline: '£0', weighted: '£0', wonYtd: '£0', target: '—', attainment: 'No target' },
  { id: 'rep-unassigned', name: 'Unassigned', email: '', openDeals: 1, pipeline: '£0', weighted: '£0', wonYtd: '£0', target: '—', attainment: 'No target' },
];

export interface TargetItem {
  id: string;
  scope: string;
  period: string;
  revenueTarget: string;
  dealTarget: string;
}

export const INITIAL_TARGETS: TargetItem[] = [
  { id: 'target-1', scope: 'Organization', period: 'Monthly 2026 · M11', revenueTarget: '£20.0k', dealTarget: '—' },
];

export interface PipelineRiskItem {
  id: string;
  deal: string;
  stage: string;
  value: string;
  idle: string;
  reason: string;
}

export const PIPELINE_RISK_DEALS: PipelineRiskItem[] = [
  { id: 'risk-1', deal: 'Acme Expansion Deal', stage: 'Lead', value: '£0', idle: '16d', reason: 'Stale' },
  { id: 'risk-2', deal: 'Casey Brown Pilot', stage: 'Lead', value: '£0', idle: '85d', reason: 'Stale' },
  { id: 'risk-3', deal: 'Jordan Lee Rollout', stage: 'Presentation', value: '£0', idle: '86d', reason: 'Stale' },
  { id: 'risk-4', deal: 'Sam Taylor Integration', stage: 'Lead', value: '£0', idle: '87d', reason: 'Stale' },
  { id: 'risk-5', deal: 'Alex Morgan Upgrade', stage: 'Proposal', value: '£0', idle: '86d', reason: 'Stale' },
  { id: 'risk-6', deal: 'Priya Shah Cloud', stage: 'Lead', value: '£0', idle: '87d', reason: 'Stale' },
  { id: 'risk-7', deal: 'Daniel Okoye Retainer', stage: 'Lead', value: '£0', idle: '87d', reason: 'Stale' },
];

export interface ClosedDealItem {
  id: string;
  name: string;
  initials: string;
  value: string;
  contact: string;
  closedDate: string;
  status: 'won' | 'lost';
}

export const WON_DEALS_INITIAL: ClosedDealItem[] = [
  { id: 'won-1', name: 'Alex Morgan', initials: 'AM', value: '£8,500', contact: 'alex.morgan@example.com', closedDate: '11/19/2026', status: 'won' },
  { id: 'won-2', name: 'Sam Taylor', initials: 'ST', value: '—', contact: '+44 7700 900123', closedDate: '11/19/2026', status: 'won' },
];

export const LOST_DEALS_INITIAL: ClosedDealItem[] = [
  { id: 'lost-1', name: 'Casey Brown', initials: 'CB', value: '—', contact: 'casey.brown@example.com', closedDate: '11/11/2026', status: 'lost' },
];

export const DEAL_STATUS_OPTIONS = [
  {
    group: 'Closed',
    items: ['Won', 'Lost'],
  },
  {
    group: 'Reopen as',
    items: [
      'Event Leads',
      'Lead',
      'Proposal',
      'Presentation',
      'Awaiting Response',
      'Interested',
      'Not Interested',
      'Integrating Systems',
      'Negotiation',
      'Growth',
      'Lost',
      'Won',
    ],
  },
];

export interface CrmTaskItem {
  id: string;
  title: string;
  priority: 'low' | 'medium' | 'high' | 'urgent';
  status: 'todo' | 'in_progress' | 'done' | 'cancelled';
  dueDate: string;
  description?: string;
  emailReminders?: boolean;
  linkedContact?: string;
  createdDate?: string;
}

export const INITIAL_TASKS: CrmTaskItem[] = [
  { id: 'task-1', title: 'Follow up call', priority: 'medium', status: 'done', dueDate: '—', createdDate: '11/10/2026' },
  { id: 'task-2', title: 'Message CEO', priority: 'medium', status: 'done', dueDate: '11/12/2026', createdDate: '11/11/2026' },
  { id: 'task-3', title: 'Get a new lead', priority: 'medium', status: 'done', dueDate: '—', createdDate: '11/11/2026' },
  { id: 'task-4', title: 'Follow up Sam', priority: 'high', status: 'done', dueDate: '8/20/2026', createdDate: '8/15/2026' },
  { id: 'task-5', title: 'Follow up Alex', priority: 'high', status: 'done', dueDate: '8/20/2026', createdDate: '8/15/2026' },
];

export const NEW_TASK_TEMPLATE: CrmTaskItem = {
  id: 'task-client-call',
  title: 'Call The Client before the end of work',
  priority: 'high',
  status: 'todo',
  dueDate: '11/19/2026',
  description: '',
  emailReminders: true,
  linkedContact: 'No contact linked',
  createdDate: '11/19/2026',
};

export interface CrmCalendarEvent {
  id: string;
  title: string;
  day: number;
  dateFormatted: string;
  type: 'task' | 'meeting' | 'call' | 'deal';
  priority: 'low' | 'medium' | 'high' | 'urgent';
  completed: boolean;
}

export const INITIAL_CALENDAR_EVENTS: CrmCalendarEvent[] = [
  { id: 'ev-1', title: 'Message CEO', day: 12, dateFormatted: 'Thu, Nov 12', type: 'task', priority: 'medium', completed: true },
  { id: 'ev-2', title: 'Call The Client before the end of work', day: 19, dateFormatted: 'Thu, Nov 19', type: 'task', priority: 'high', completed: false },
];

export interface CrmDirectoryContact {
  id: string;
  name: string;
  initials: string;
  email: string;
  phone: string;
  company: string;
  status: string;
}

export const INITIAL_DIRECTORY_CONTACTS: CrmDirectoryContact[] = [
  { id: 'contact-sofia', name: 'Sofia Martinez', initials: 'SM', email: 'sofia.m@example.com', phone: '+44 7700 900111', company: 'Acme Studio', status: 'Lead' },
  { id: 'contact-michael', name: 'Michael Chen', initials: 'MC', email: 'm.chen@example.com', phone: '+44 7700 900222', company: 'Apex Global', status: 'Event Leads' },
  { id: 'contact-amara', name: 'Amara Okafor', initials: 'AO', email: 'a.okafor@example.com', phone: '+44 7700 900333', company: 'Innovate Tech', status: 'Proposal' },
  { id: 'contact-daniel', name: 'Daniel Brooks', initials: 'DB', email: 'd.brooks@example.com', phone: '+44 7700 900444', company: 'Acme Studio', status: 'Interested' },
  { id: 'contact-jane', name: 'Jane Doe', initials: 'JD', email: 'jane@example.com', phone: '+44 7700 900555', company: 'Acme Studio', status: 'Won' },
  { id: 'contact-ade', name: 'Ade Tayo', initials: 'AT', email: 'ade.t@example.com', phone: '+44 7700 900666', company: 'Horizon Media', status: 'Presentation' },
  { id: 'contact-lisa', name: 'Lisa Park', initials: 'LP', email: 'lisa.p@example.com', phone: '+44 7700 900777', company: 'Starlight Ltd', status: 'Awaiting Response' },
  { id: 'contact-alex', name: 'Alex Morgan', initials: 'AM', email: 'alex.morgan@example.com', phone: '+44 7700 900125', company: 'Acme Studio', status: 'Event Leads' },
];

export const CONTACT_STATUS_FILTER_OPTIONS: string[] = [
  'All statuses',
  'Event Leads',
  'Lead',
  'First Call',
  'Second Call',
  'Proposal',
  'Presentation',
  'Awaiting Response',
  'Interested',
  'Not Interested',
  'Integrating Systems',
  'Negotiation',
  'Growth',
  'Lost',
  'Won',
  'Closed Lost',
];

export interface CrmCompanyInfo {
  name: string;
  domain: string;
  industry: string;
  size: string;
  phone: string;
  email: string;
  website: string;
  description: string;
  street: string;
  city: string;
  state: string;
  country: string;
}

export const ACME_STUDIO_COMPANY: CrmCompanyInfo = {
  name: 'Acme Studio',
  domain: 'example.com',
  industry: 'Software',
  size: '11–50',
  phone: '+44 7700 900123',
  email: 'admin@example.com',
  website: 'https://example.com',
  description: 'Business software and professional services company.',
  street: '10 Acme Street',
  city: 'London',
  state: 'London',
  country: 'United Kingdom',
};

export interface CrmChatMessage {
  id: string;
  sender: 'contact' | 'user';
  text: string;
  time: string;
}

export interface CrmConversationItem {
  id: string;
  channel: 'whatsapp' | 'sms' | 'facebook' | 'instagram' | 'telegram' | 'email';
  title: string;
  preview: string;
  date: string;
  phone?: string;
  via?: string;
  isUnknownContact?: boolean;
  messages: CrmChatMessage[];
}

export const INITIAL_CONVERSATIONS: CrmConversationItem[] = [
  {
    id: 'conv-whatsapp',
    channel: 'whatsapp',
    title: '+WhatsApp',
    preview: '<#> Your WhatsApp Business account is being registered...',
    date: 'Nov 18',
    via: 'SMS via Talking',
    isUnknownContact: true,
    messages: [
      { id: 'msg-1', sender: 'contact', text: 'Hello, I would like to know more about your services.', time: '05:11 PM' },
      { id: 'msg-2', sender: 'contact', text: 'Thank you. Could you send me more information?', time: '01:31 PM' },
      { id: 'msg-3', sender: 'contact', text: 'We will review the details and get back to you.', time: '09:45 PM' },
    ],
  },
  {
    id: 'conv-phone',
    channel: 'sms',
    title: '+44 7700 900126',
    preview: 'Yeah, i got it',
    date: 'Nov 4',
    via: 'Direct SMS',
    isUnknownContact: false,
    messages: [
      { id: 'msg-p1', sender: 'contact', text: 'Yeah, i got it', time: '11:20 AM' },
    ],
  },
];

export interface CrmEmailConfig {
  displayName: string;
  email: string;
  smtpHost: string;
  smtpPort: string;
  smtpUsername: string;
  smtpPassword?: string;
  smtpSsl: boolean;
  imapHost: string;
  imapPort: string;
  imapUsername: string;
  imapPassword?: string;
  signature: string;
}

export const DEFAULT_EMAIL_CONFIG: CrmEmailConfig = {
  displayName: 'Work Email',
  email: 'admin@example.com',
  smtpHost: 'smtp.example.com',
  smtpPort: '587',
  smtpUsername: 'admin@example.com',
  smtpSsl: true,
  imapHost: 'imap.example.com',
  imapPort: '993',
  imapUsername: 'admin@example.com',
  signature: 'Best regards,\nJane Doe\nSales — Acme Studio',
};

export const AUTOMATION_EMAIL_TEMPLATES = [
  'None (write manually)',
  'Email 3 — Understand customer needs',
  'Email 7 — Offer a trial',
  'Email 1 — First contact',
  'Email 5 — Invite to a demonstration',
  'Email 2 — Gentle follow-up',
  'Email 9 — Ask how to move forward',
  'Email 4 — Communicate business value',
  'Email 6 — Understand potential hesitation',
  'Email 10 — Final follow-up',
  'Email 8 — Establish decision timing',
];

export interface CrmAnalyticsKpi {
  id: string;
  label: string;
  value: string;
  badge?: string;
  isPositive?: boolean;
  icon: string;
}

export const ANALYTICS_KPIS: CrmAnalyticsKpi[] = [
  { id: 'contacts', label: 'Total Contacts', value: '23', badge: '+100%', isPositive: true, icon: 'users' },
  { id: 'deals', label: 'Active Deals', value: '24', badge: '+100%', isPositive: true, icon: 'target' },
  { id: 'won', label: 'Deals Won', value: '0', badge: '-100%', isPositive: false, icon: 'trophy' },
  { id: 'conversion', label: 'Conversion Rate', value: '0%', badge: '-100%', isPositive: false, icon: 'trendingUp' },
  { id: 'emails', label: 'Emails Sent', value: '0', icon: 'mail' },
  { id: 'activities', label: 'Activities', value: '0', icon: 'activity' },
];

export const ANALYTICS_DATE_OPTIONS = [
  'Last 7 days',
  'Last 30 days',
  'This month',
  'This quarter',
  'This year',
];

/* --- Part 6 (Steps 27-29) Data Definitions --- */

export interface CrmReportRecord {
  id: string;
  firstName: string;
  lastName: string;
  email: string;
  status: string;
  statusLabel: string;
  source: string;
  phone: string;
  country: string;
}

export const REPORT_SAMPLE_RECORDS: CrmReportRecord[] = [
  {
    id: "rep-1",
    firstName: "Sam",
    lastName: "Taylor",
    email: "sam.taylor@example.com",
    status: "event_leads",
    statusLabel: "Event Leads",
    source: "Event Leads",
    phone: "+44 7700 900121",
    country: "United Kingdom",
  },
  {
    id: "rep-2",
    firstName: "Casey",
    lastName: "Brown",
    email: "casey.brown@example.com",
    status: "event_leads",
    statusLabel: "Event Leads",
    source: "website",
    phone: "+44 7700 900122",
    country: "United Kingdom",
  },
  {
    id: "rep-3",
    firstName: "Jordan",
    lastName: "Lee",
    email: "jordan.lee@example.com",
    status: "lead",
    statusLabel: "Lead",
    source: "Referral",
    phone: "+44 7700 900123",
    country: "United Kingdom",
  },
  {
    id: "rep-4",
    firstName: "Alex",
    lastName: "Morgan",
    email: "alex.morgan@example.com",
    status: "event_leads",
    statusLabel: "Event Leads",
    source: "website",
    phone: "+44 7700 900124",
    country: "United Kingdom",
  },
  {
    id: "rep-5",
    firstName: "Priya",
    lastName: "Shah",
    email: "priya.shah@example.com",
    status: "proposal",
    statusLabel: "Proposal",
    source: "Website",
    phone: "+44 7700 900125",
    country: "United Kingdom",
  },
  {
    id: "rep-6",
    firstName: "Daniel",
    lastName: "Okoye",
    email: "daniel.okoye@example.com",
    status: "lead",
    statusLabel: "Lead",
    source: "Referral",
    phone: "+44 7700 900126",
    country: "United Kingdom",
  },
  {
    id: "rep-7",
    firstName: "Lisa",
    lastName: "Park",
    email: "lisa.park@example.com",
    status: "closed_won",
    statusLabel: "Closed Won",
    source: "Event Leads",
    phone: "+44 7700 900127",
    country: "United Kingdom",
  },
];

export const REPORT_DATA_SOURCES = ['Contacts', 'Deals', 'Companies', 'Tasks', 'Activities'] as const;

export const REPORT_SORT_FIELDS = [
  'First Name',
  'Last Name',
  'Email',
  'Phone',
  'Company',
  'Job Title',
  'Status',
  'Source',
  'City',
  'Country',
  'Created Date',
] as const;

export const REPORT_COLUMNS = [
  'First Name',
  'Last Name',
  'Email',
  'Phone',
  'Company',
  'Job Title',
  'Status',
  'Source',
  'City',
  'Country',
  'Created Date',
] as const;

export const REPORT_GROUP_BY_OPTIONS = ['None', 'Status', 'Source', 'Company', 'Country'] as const;

export interface CrmApprovalItem {
  id: string;
  type: string;
  relatedTo: string;
  recordName: string;
  requestedBy: string;
  approver: string;
  date: string;
  status: 'Pending' | 'Approved' | 'Rejected';
  reason?: string;
}

export const INITIAL_APPROVAL_REQUESTS: CrmApprovalItem[] = [
  {
    id: 'appr-1',
    type: 'Discount',
    relatedTo: 'Deal',
    recordName: 'Sam Taylor',
    requestedBy: 'Jane Doe',
    approver: 'Finance Reviewer',
    date: '20/11/2026',
    status: 'Pending',
  },
  {
    id: 'appr-2',
    type: 'Discount',
    relatedTo: 'Deal',
    recordName: 'Alex Morgan',
    requestedBy: 'Jane Doe',
    approver: 'Sales Manager',
    date: '20/11/2026',
    status: 'Pending',
  },
];

export const APPROVER_OPTIONS = [
  'Olivia Grant',
  'Daniel Okoye',
  'Finance Reviewer',
  'Sales Manager',
] as const;

export const REQUEST_TYPES = [
  'Discount approval',
  'Close a deal',
  'Quote approval',
  'Expense approval',
  'Other',
] as const;

export const RELATED_TO_OPTIONS = ['Deal', 'Contact', 'Company', 'Lead'] as const;

export const RECORD_OPTIONS = ['Sam Taylor', 'Alex Morgan', 'Casey Brown', 'Jordan Lee'] as const;

