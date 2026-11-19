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

export interface ProspectItem {
  id: string;
  name: string;
  initials: string;
  stage: string;
  email: string;
  phone: string;
  value?: string;
  createdAt: number;
}

export const CRM_PROSPECTS: ProspectItem[] = [
  {
    id: "prospect-sam",
    name: "Sam Taylor",
    initials: "ST",
    stage: "Event Leads",
    email: "sam.taylor@example.com",
    phone: "+44 7700 900123",
    value: "-",
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
    createdAt: 3,
  },
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
