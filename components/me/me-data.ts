export const ME_URLS = {
  dashboard: "snaarp.me/dashboard",
  calendar: "snaarp.me/calendar",
  meetings: "snaarp.me/meetings",
  meetingDetail: "snaarp.me/bookings/a9eb4ed6-bdc7-40c1-affb-f3a5e21cd386",
  eventTypes: "snaarp.me/event-types",
  bookingPage: "snaarp.me/jane/creative-meeting-with-the-team",
} as const;

export type MePage =
  | "dashboard"
  | "calendar"
  | "meetings"
  | "meeting-detail"
  | "event-types"
  | "booking-page";

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
