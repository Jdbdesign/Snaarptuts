export const ME_URLS = {
  dashboard: "snaarp.me/dashboard",
  calendar: "snaarp.me/calendar",
  availability: "snaarp.me/availability",
  meetings: "snaarp.me/bookings",
  bookings: "snaarp.me/bookings",
  meetingDetail: "snaarp.me/bookings/a9eb4ed6-bdc7-40c1-affb-f3a5e21cd386",
  eventTypes: "snaarp.me/event-types",
  bookingPage: "snaarp.me/jane/creative-meeting-with-the-team",
  workflows: "snaarp.me/workflows",
  workflowsCreate: "snaarp.me/workflows/create",
  workflowsCreateCustom: "snaarp.me/workflows/create?custom=1",
  workflowDetail: "snaarp.me/workflows/5fe64334-ee3f-43f7-b57f-573851734764",
  workflowExecutions: "snaarp.me/workflows/638418a1-e391-4bb5-b560-ff4092328add/executions",
  contacts: "snaarp.me/contacts",
  analytics: "snaarp.me/analytics",
  integrations: "snaarp.me/integrations",
  integrationsCalendars: "snaarp.me/integrations/calendars",
  integrationsVideo: "snaarp.me/integrations/video",
  integrationsPayments: "snaarp.me/integrations/payments",
  integrationsCrm: "snaarp.me/integrations/crm",
} as const;

export type MePage =
  | "dashboard"
  | "calendar"
  | "availability"
  | "meetings"
  | "bookings"
  | "meeting-detail"
  | "event-types"
  | "booking-page"
  | "workflows"
  | "workflows-create"
  | "workflow-detail"
  | "workflow-executions"
  | "contacts"
  | "analytics"
  | "integrations"
  | "integrations-calendars"
  | "integrations-video"
  | "integrations-payments"
  | "integrations-crm";

export interface Booking {
  id: string;
  title: string;
  inviteeName: string;
  inviteeEmail: string;
  guestEmail?: string;
  date: string;
  timeRange: string;
  timeLabel: string; // e.g. "Today, 11:30 AM - 12:00 PM" or "Tomorrow, 11:30 AM - 12:00 PM"
  duration: string;
  location: string;
  meetUrl: string;
  source: string;
  created: string;
  timezone: string;
  status: "Confirmed" | "Cancelled" | "Rescheduled";
  notes?: string;
}

export interface EventType {
  id: string;
  title: string;
  description: string;
  duration: number; // in minutes
  location: string;
  slug: string;
  active: boolean;
  color: string;
  schedule: string;
  bufferBefore: number;
  bufferAfter: number;
  minNotice: number;
  maxBookingDays: number;
  dailyLimit: string;
  weeklyLimit: string;
  maxAttendees: number;
  isSecret: boolean;
  isInternal: boolean;
  redirectUrl: string;
}

export interface ActivityItem {
  id: string;
  type: "new-booking" | "rescheduled";
  userName: string;
  eventName: string;
  timeAgo: string;
}

export const INITIAL_EVENT_TYPES: EventType[] = [
  {
    id: "standup-devs",
    title: "Standup Meeting with developers",
    description: "Daily catch-up on progress and blockers",
    duration: 30,
    location: "Snaarp Meet",
    slug: "standup-meeting-with-developers",
    active: true,
    color: "#2563eb",
    schedule: "Open Days",
    bufferBefore: 0,
    bufferAfter: 0,
    minNotice: 4,
    maxBookingDays: 60,
    dailyLimit: "",
    weeklyLimit: "",
    maxAttendees: 1,
    isSecret: false,
    isInternal: false,
    redirectUrl: "",
  },
  {
    id: "30-min-meeting",
    title: "30 Minute Meeting",
    description:
      "A quick 30-minute call to discuss your project, answer questions, or explore how we can work together.",
    duration: 30,
    location: "Snaarp Meet",
    slug: "30-minute-meeting",
    active: true,
    color: "#2563eb",
    schedule: "Open Days",
    bufferBefore: 0,
    bufferAfter: 0,
    minNotice: 4,
    maxBookingDays: 60,
    dailyLimit: "",
    weeklyLimit: "",
    maxAttendees: 1,
    isSecret: false,
    isInternal: false,
    redirectUrl: "",
  },
];

export const CREATIVE_MEETING_EVENT_TYPE: EventType = {
  id: "creative-meeting",
  title: "Creative meeting with the Team",
  description: "Learn how to plan your week with Snaarp Me",
  duration: 30,
  location: "Snaarp Meet",
  slug: "creative-meeting-with-the-team",
  active: true,
  color: "#2563eb",
  schedule: "Open Days",
  bufferBefore: 0,
  bufferAfter: 0,
  minNotice: 4,
  maxBookingDays: 60,
  dailyLimit: "",
  weeklyLimit: "",
  maxAttendees: 2,
  isSecret: false,
  isInternal: false,
  redirectUrl: "",
};

export const INITIAL_BOOKINGS: Booking[] = [
  {
    id: "a9eb4ed6-bdc7-40c1-affb-f3a5e21cd386",
    title: "Standup Meeting with developers",
    inviteeName: "Sam Taylor",
    inviteeEmail: "sam.taylor@example.com",
    date: "Tuesday, November 10, 2026 at 11:30 AM",
    timeRange: "11:30 AM - 12:00 PM",
    timeLabel: "Today, 11:30 AM - 12:00 PM",
    duration: "30 minutes",
    location: "Snaarp Meet",
    meetUrl: "https://meet.snaarp.com/meet/abc-defg-hij",
    source: "Direct",
    created: "Nov 10, 2026, 2:48 AM",
    timezone: "Africa/Lagos",
    status: "Confirmed",
  },
];

export const NEW_BOOKING: Booking = {
  id: "b8fc5ea7-cde8-41d2-b00c-a4b6e32de497",
  title: "Creative meeting with the Team",
  inviteeName: "John Smith",
  inviteeEmail: "john@example.com",
  guestEmail: "guest@example.com",
  date: "Wednesday, November 11, 2026 at 11:30 AM GMT+1",
  timeRange: "11:30 AM - 12:00 PM GMT+1",
  timeLabel: "Tomorrow, 11:30 AM - 12:00 PM",
  duration: "30 min",
  location: "Snaarp Meet",
  meetUrl: "https://meet.snaarp.com/meet/mbi-ewgn-soq",
  source: "Direct",
  created: "Nov 10, 2026, 3:15 AM",
  timezone: "Africa/Lagos",
  status: "Confirmed",
  notes: "I can't wait to come and learn how you organized the team professionally",
};

export const INITIAL_ACTIVITIES: ActivityItem[] = [
  {
    id: "act-1",
    type: "new-booking",
    userName: "Sam Taylor",
    eventName: "Standup Meeting with developers",
    timeAgo: "Just now",
  },
  {
    id: "act-2",
    type: "new-booking",
    userName: "Casey Brown",
    eventName: "30 Minute Meeting",
    timeAgo: "48d ago",
  },
  {
    id: "act-3",
    type: "rescheduled",
    userName: "Casey Brown",
    eventName: "30 Minute Meeting",
    timeAgo: "49d ago",
  },
];

export const NEW_ACTIVITY: ActivityItem = {
  id: "act-new",
  type: "new-booking",
  userName: "John Smith",
  eventName: "Creative meeting with the Team",
  timeAgo: "Just now",
};

export interface DayRange {
  from: string;
  to: string;
}

export interface DaySchedule {
  enabled: boolean;
  ranges: DayRange[];
}

export interface Schedule {
  id: string;
  name: string;
  timezone: string;
  isDefault: boolean;
  weeklyHours: Record<string, DaySchedule>;
}

export interface DateOverride {
  id: string;
  date: string; // e.g. "Wed, Nov 11, 2026"
  ranges: DayRange[];
}

export const INITIAL_SCHEDULES: Schedule[] = [
  {
    id: "open-days",
    name: "Open Days",
    timezone: "Africa/Lagos",
    isDefault: true,
    weeklyHours: {
      Mon: { enabled: true, ranges: [{ from: "9:00 AM", to: "5:00 PM" }] },
      Tue: { enabled: true, ranges: [{ from: "9:00 AM", to: "5:00 PM" }] },
      Wed: { enabled: true, ranges: [{ from: "9:00 AM", to: "5:00 PM" }] },
      Thu: { enabled: true, ranges: [{ from: "9:00 AM", to: "5:00 PM" }] },
      Fri: { enabled: true, ranges: [{ from: "9:00 AM", to: "5:00 PM" }] },
      Sat: { enabled: false, ranges: [{ from: "9:00 AM", to: "5:00 PM" }] },
      Sun: { enabled: false, ranges: [{ from: "9:00 AM", to: "5:00 PM" }] },
    },
  },
];

export const PERSONAL_SCHEDULE: Schedule = {
  id: "personal-schedule",
  name: "Personal Event time",
  timezone: "Africa/Lagos",
  isDefault: false,
  weeklyHours: {
    Mon: { enabled: true, ranges: [{ from: "9:00 AM", to: "5:00 PM" }] },
    Tue: { enabled: true, ranges: [{ from: "9:00 AM", to: "5:00 PM" }] },
    Wed: { enabled: true, ranges: [{ from: "9:00 AM", to: "5:00 PM" }] },
    Thu: { enabled: true, ranges: [{ from: "9:00 AM", to: "5:00 PM" }] },
    Fri: { enabled: true, ranges: [{ from: "9:00 AM", to: "5:00 PM" }] },
    Sat: { enabled: true, ranges: [{ from: "9:00 AM", to: "1:00 PM" }] },
    Sun: { enabled: false, ranges: [{ from: "9:00 AM", to: "5:00 PM" }] },
  },
};

export const INITIAL_DATE_OVERRIDES: DateOverride[] = [
  {
    id: "override-wed-11-1",
    date: "Wed, Nov 11, 2026",
    ranges: [
      { from: "9:00 AM", to: "5:00 PM" },
      { from: "5:00 PM", to: "6:00 PM" },
    ],
  },
];

export interface MeetingItem {
  id: string;
  title: string;
  inviteeName: string;
  inviteeEmail: string;
  dateStr: string;
  timeStr: string;
  duration: string;
  status: "Confirmed" | "Rescheduled" | "Cancelled";
  category: "Upcoming" | "Past";
  avatarInitials: string;
  meetUrl: string;
}

export const ALL_MEETINGS: MeetingItem[] = [
  {
    id: "meet-creative",
    title: "Creative meeting with the Team",
    inviteeName: "John Smith",
    inviteeEmail: "john@example.com",
    dateStr: "Wed, Nov 11",
    timeStr: "11:30 AM",
    duration: "30 min",
    status: "Confirmed",
    category: "Upcoming",
    avatarInitials: "JS",
    meetUrl: "https://meet.snaarp.com/meet/sample-abc-123",
  },
  {
    id: "meet-standup",
    title: "Standup Meeting with developers",
    inviteeName: "Casey Brown",
    inviteeEmail: "casey@example.com",
    dateStr: "Tue, Nov 10",
    timeStr: "11:30 AM",
    duration: "30 min",
    status: "Confirmed",
    category: "Upcoming",
    avatarInitials: "CB",
    meetUrl: "https://meet.snaarp.com/meet/sample-abc-123",
  },
  {
    id: "meet-past-sep22",
    title: "30 Minute Meeting",
    inviteeName: "Sam Taylor",
    inviteeEmail: "sam@example.com",
    dateStr: "Tue, Sep 22",
    timeStr: "12:00 PM",
    duration: "30 min",
    status: "Confirmed",
    category: "Past",
    avatarInitials: "ST",
    meetUrl: "https://meet.snaarp.com/meet/sample-abc-123",
  },
  {
    id: "meet-rescheduled-sep21",
    title: "30 Minute Meeting",
    inviteeName: "Sam Taylor",
    inviteeEmail: "sam@example.com",
    dateStr: "Mon, Sep 21",
    timeStr: "10:30 AM",
    duration: "30 min",
    status: "Rescheduled",
    category: "Past",
    avatarInitials: "ST",
    meetUrl: "https://meet.snaarp.com/meet/sample-abc-123",
  },
];

/* =========================================================================
 * PART 3: WORKFLOWS & CONTACTS DATA
 * ========================================================================= */

export interface WorkflowItem {
  id: string;
  name: string;
  type: "booking" | "custom";
  active: boolean;
  subtitle: string;
  scheduleItems: string[];
  triggerEvent?: string;
  stepsCount?: number;
}

export const INITIAL_WORKFLOWS: WorkflowItem[] = [
  {
    id: "custom-workflow-default",
    name: "Custom workflow",
    type: "booking",
    active: false,
    subtitle: "Automatic emails when someone books and before the meeting",
    scheduleItems: [
      "Confirmation email when someone books",
      "Host notification when someone books on your calendar",
    ],
  },
  {
    id: "booking-confirmation",
    name: "Booking Confirmation & Reminder",
    type: "booking",
    active: true,
    subtitle: "Automatic emails when someone books and before the meeting",
    scheduleItems: [
      "Confirmation email when someone books",
      "Host notification when someone books on your calendar",
      "Reminder 24 hours before the meeting",
      "Reminder 1 hour before the meeting",
      "Reminder 15 minutes before the meeting",
    ],
  },
];

export const NOTIFY_ME_WORKFLOW: WorkflowItem = {
  id: "notify-me",
  name: "Notify me when someone books",
  type: "booking",
  active: true,
  subtitle: "Automatic emails when someone books and before the meeting",
  scheduleItems: [
    "Confirmation email when someone books",
    "Host notification when someone books on your calendar",
  ],
};

export const NOTIFY_ME_SAVED_WORKFLOW: WorkflowItem = {
  id: "notify-me",
  name: "Notify me when someone books",
  type: "booking",
  active: true,
  subtitle: "Automatic emails when someone books and before the meeting",
  scheduleItems: [
    "Confirmation email when someone books",
    "Host notification when someone books on your calendar",
    "Reminder 24 hours before the meeting",
    "Reminder 1 hour before the meeting",
    "Reminder 15 minutes before the meeting",
  ],
};

export const CREATED_CUSTOM_WORKFLOW: WorkflowItem = {
  id: "custom-workflow-created",
  name: "Custom workflow",
  type: "custom",
  active: true,
  subtitle: "Trigger: Meeting Started · 1 steps",
  scheduleItems: [],
  triggerEvent: "Meeting Started",
  stepsCount: 1,
};

export interface WorkflowTemplate {
  id: string;
  title: string;
  description: string;
}

export const WORKFLOW_TEMPLATES: WorkflowTemplate[] = [
  {
    id: "tpl-booking-confirmation",
    title: "Booking confirmation",
    description: "Email the invitee as soon as they book, using booking details from the backend.",
  },
  {
    id: "tpl-notify-me",
    title: "Notify me when someone books",
    description: "Email yourself when a new meeting is booked.",
  },
  {
    id: "tpl-meeting-reminder",
    title: "Meeting reminder",
    description: "Remind the invitee 24 hours before the meeting starts.",
  },
  {
    id: "tpl-cancellation-notice",
    title: "Cancellation notice",
    description: "Email the invitee when a booking is cancelled.",
  },
  {
    id: "tpl-after-meeting",
    title: "After-meeting follow-up",
    description: "Send a thank-you email after the meeting ends.",
  },
  {
    id: "tpl-no-show",
    title: "No-show follow-up",
    description: "Ask the invitee to reschedule if they missed the meeting.",
  },
];

export interface ExecutionLog {
  id: string;
  inviteeName: string;
  inviteeEmail: string;
  step: string;
  status: "completed" | "failed" | "pending" | "cancelled";
  scheduledAt: string;
  executedAt: string;
  error?: string;
}

export const INITIAL_EXECUTION_LOGS: ExecutionLog[] = [
  {
    id: "log-1",
    inviteeName: "John Smith",
    inviteeEmail: "john@example.com",
    step: "Step 4",
    status: "failed",
    scheduledAt: "10/11/2026, 12:30:08 PM",
    executedAt: "10/11/2026, 11:30:08 AM",
    error: "Email delivery failed via provider 'system': Missing '<'",
  },
  {
    id: "log-2",
    inviteeName: "John Smith",
    inviteeEmail: "john@example.com",
    step: "Step 6",
    status: "pending",
    scheduledAt: "11/11/2026, 10:30:00 AM",
    executedAt: "—",
  },
  {
    id: "log-3",
    inviteeName: "John Smith",
    inviteeEmail: "john@example.com",
    step: "Step 1",
    status: "completed",
    scheduledAt: "10/11/2026, 2:54:35 AM",
    executedAt: "10/11/2026, 2:54:35 AM",
  },
  {
    id: "log-4",
    inviteeName: "John Smith",
    inviteeEmail: "john@example.com",
    step: "Step 8",
    status: "pending",
    scheduledAt: "11/11/2026, 11:15:00 AM",
    executedAt: "—",
  },
  {
    id: "log-5",
    inviteeName: "Sam Taylor",
    inviteeEmail: "sam@example.com",
    step: "Step 2",
    status: "completed",
    scheduledAt: "10/11/2026, 2:54:35 AM",
    executedAt: "10/11/2026, 2:54:35 AM",
  },
  {
    id: "log-6",
    inviteeName: "Sam Taylor",
    inviteeEmail: "sam@example.com",
    step: "Step 1",
    status: "completed",
    scheduledAt: "10/11/2026, 2:48:22 AM",
    executedAt: "10/11/2026, 2:48:22 AM",
  },
];

export interface Contact {
  id: string;
  name: string;
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  company: string;
  jobTitle: string;
  location: string;
  linkedin?: string;
  nextMeetingDate?: string;
  lastMeetingDate?: string;
  avatarInitial?: string;
  customJob?: string;
}

export const SAMPLE_JORDAN_LEE: Contact = {
  id: "contact-jordan-lee",
  name: "Jordan Lee",
  firstName: "Jordan",
  lastName: "Lee",
  email: "jordan.lee@example.com",
  phone: "+44 7700 900123",
  company: "Acme Studio",
  jobTitle: "CEO",
  location: "London, United Kingdom",
  avatarInitial: "J",
  customJob: "CEO",
};

export const ORGANIZATION_CONTACTS: Contact[] = [
  { id: "org-1", name: "Aashir Patel", firstName: "Aashir", lastName: "Patel", email: "aashir@example.com", phone: "+44 7700 900001", company: "Product Team", jobTitle: "Engineer", location: "London", avatarInitial: "A" },
  { id: "org-2", name: "Abisola Adeyemi", firstName: "Abisola", lastName: "Adeyemi", email: "abisola@example.com", phone: "+44 7700 900002", company: "Product Team", jobTitle: "Designer", location: "Lagos", avatarInitial: "A" },
  { id: "org-3", name: "Akinbayo Ojo", firstName: "Akinbayo", lastName: "Ojo", email: "akinbayo@example.com", phone: "+44 7700 900003", company: "Product Team", jobTitle: "Tech Lead", location: "Lagos", avatarInitial: "A" },
  { id: "org-4", name: "Casey Brown", firstName: "Casey", lastName: "Brown", email: "casey@example.com", phone: "+44 7700 900004", company: "Product Team", jobTitle: "Developer", location: "London", avatarInitial: "C" },
  { id: "org-5", name: "Daniel Kawu", firstName: "Daniel", lastName: "Kawu", email: "daniel@example.com", phone: "+44 7700 900005", company: "Product Team", jobTitle: "QA Lead", location: "Lagos", avatarInitial: "D" },
  { id: "org-6", name: "DevOps Bot", firstName: "DevOps", lastName: "Team", email: "devops@example.com", phone: "+44 7700 900006", company: "Infrastructure", jobTitle: "SRE", location: "Global", avatarInitial: "D" },
  { id: "org-7", name: "Foluke Bello", firstName: "Foluke", lastName: "Bello", email: "foluke@example.com", phone: "+44 7700 900007", company: "Marketing", jobTitle: "Growth Manager", location: "Lagos", avatarInitial: "F" },
  { id: "org-8", name: "Grace Hopper", firstName: "Grace", lastName: "Hopper", email: "grace@example.com", phone: "+44 7700 900008", company: "Engineering", jobTitle: "Staff Architect", location: "London", avatarInitial: "G" },
  { id: "org-9", name: "Hassan Aliyu", firstName: "Hassan", lastName: "Aliyu", email: "hassan@example.com", phone: "+44 7700 900009", company: "Sales", jobTitle: "Account Exec", location: "London", avatarInitial: "H" },
  { id: "org-10", name: "Ibrahim Sani", firstName: "Ibrahim", lastName: "Sani", email: "ibrahim@example.com", phone: "+44 7700 900010", company: "Support", jobTitle: "Customer Success", location: "Lagos", avatarInitial: "I" },
  { id: "org-11", name: "John Smith", firstName: "John", lastName: "Smith", email: "john@example.com", phone: "+44 7700 900011", company: "Design Team", jobTitle: "Lead Designer", location: "London", avatarInitial: "J" },
  { id: "org-12", name: "Kemi Adeleke", firstName: "Kemi", lastName: "Adeleke", email: "kemi@example.com", phone: "+44 7700 900012", company: "Finance", jobTitle: "Controller", location: "Lagos", avatarInitial: "K" },
  { id: "org-13", name: "Liam Chen", firstName: "Liam", lastName: "Chen", email: "liam@example.com", phone: "+44 7700 900013", company: "Engineering", jobTitle: "Frontend Dev", location: "London", avatarInitial: "L" },
  { id: "org-14", name: "Mina Tariq", firstName: "Mina", lastName: "Tariq", email: "mina@example.com", phone: "+44 7700 900014", company: "Product", jobTitle: "Product Manager", location: "London", avatarInitial: "M" },
  { id: "org-15", name: "Nia Okon", firstName: "Nia", lastName: "Okon", email: "nia@example.com", phone: "+44 7700 900015", company: "Design", jobTitle: "Brand Designer", location: "Lagos", avatarInitial: "N" },
  { id: "org-16", name: "Oliver Vance", firstName: "Oliver", lastName: "Vance", email: "oliver@example.com", phone: "+44 7700 900016", company: "Legal", jobTitle: "Counsel", location: "London", avatarInitial: "O" },
  { id: "org-17", name: "Priya Sharma", firstName: "Priya", lastName: "Sharma", email: "priya@example.com", phone: "+44 7700 900017", company: "Engineering", jobTitle: "Backend Dev", location: "London", avatarInitial: "P" },
  { id: "org-18", name: "Sam Taylor", firstName: "Sam", lastName: "Taylor", email: "sam@example.com", phone: "+44 7700 900018", company: "Operations", jobTitle: "Operations Lead", location: "London", avatarInitial: "S" },
];

export const INVITEE_CONTACTS: Contact[] = [
  {
    id: "inv-1",
    name: "Sam Taylor",
    firstName: "Sam",
    lastName: "Taylor",
    email: "sam@example.com",
    phone: "",
    company: "Operations",
    jobTitle: "Operations Lead",
    location: "London",
    nextMeetingDate: "",
    lastMeetingDate: "22/09/2026",
    avatarInitial: "S",
  },
  {
    id: "inv-2",
    name: "Design Team",
    firstName: "Design",
    lastName: "Team",
    email: "design@example.com",
    phone: "",
    company: "Acme Studio",
    jobTitle: "Design Collective",
    location: "London",
    nextMeetingDate: "",
    lastMeetingDate: "",
    avatarInitial: "D",
  },
  {
    id: "inv-3",
    name: "John Smith",
    firstName: "John",
    lastName: "Smith",
    email: "john@example.com",
    phone: "+44 7700 900011",
    company: "Product Team",
    jobTitle: "Lead Designer",
    location: "London",
    nextMeetingDate: "11/11/2026",
    lastMeetingDate: "10/11/2026",
    avatarInitial: "J",
  },
];

export interface EventTypePricingItem {
  id: string;
  name: string;
  duration: string;
  requirePayment: boolean;
  price: string;
}

export const INITIAL_EVENT_PRICING: EventTypePricingItem[] = [
  {
    id: "creative-meeting",
    name: "Creative meeting with the Team",
    duration: "30 min",
    requirePayment: false,
    price: "£0.00",
  },
  {
    id: "standup-meeting",
    name: "Standup Meeting with developers",
    duration: "30 min",
    requirePayment: false,
    price: "£0.00",
  },
  {
    id: "thirty-minute",
    name: "30 Minute Meeting",
    duration: "30 min",
    requirePayment: false,
    price: "£0.00",
  },
];

