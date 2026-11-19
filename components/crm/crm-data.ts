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
