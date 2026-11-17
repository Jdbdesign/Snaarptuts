/**
 * Data structures and sample datasets for Snaarp Teams tutorial.
 * Pure sample data: Jane Doe, Acme Studio, all @example.com, UK locale.
 */

export const TEAMS_URLS = {
  chat: "teams.snaarp.com/chat",
  meet: "teams.snaarp.com/meet",
  people: "teams.snaarp.com/people",
  calendar: "teams.snaarp.com/calendar",
  snaarpMe: "teams.snaarp.com/snaarp-me",
  activity: "teams.snaarp.com/activity",
  settings: "teams.snaarp.com/settings",
  prejoin: "meet.snaarp.com/meet/ukr-vmvj-pfa",
} as const;

export type TeamsNav =
  | "chat"
  | "meet"
  | "people"
  | "calendar"
  | "activity"
  | "settings";

export type ChatFilterTab = "all" | "unread" | "group";
export type ChatSubTab = "chat" | "files" | "photos";
export type MeetSubTab = "links" | "scheduled" | "calls";
export type PeopleFilterTab = "all" | "chat" | "org" | "external";
export type ActivityFilterTab = "all" | "unread" | "calls" | "ongoing";
export type SettingsTab = "profile" | "security" | "notifications" | "account";
export type UserPresence = "available" | "busy";

export interface ChatItem {
  id: string;
  name: string;
  time: string;
  preview: string;
  avatarText: string;
  avatarBg: string;
  isGroup: boolean;
  isPinned?: boolean;
  unreadCount?: number;
  isOnline?: boolean;
  isCall?: boolean;
}

export interface ChatMessage {
  id: string;
  sender: string;
  avatarText?: string;
  avatarBg?: string;
  time: string;
  text?: string;
  isMe: boolean;
  isMissedCall?: boolean;
  imageName?: string;
  reaction?: string;
  mention?: string;
}

export interface GroupMember {
  id: string;
  name: string;
  email: string;
  avatarText: string;
  avatarBg: string;
  role?: string;
  isYou?: boolean;
}

export interface MeetLinkCard {
  id: string;
  title: string;
  url: string;
  created: string;
  expires: string;
  isActive: boolean;
}

export interface CallRecord {
  id: string;
  name: string;
  avatarText: string;
  avatarBg: string;
  type: "missed-audio" | "missed-video" | "incoming-audio";
  timeAgo: string;
  dateStr: string;
}

export interface PersonItem {
  id: string;
  name: string;
  email: string;
  avatarText: string;
  avatarBg: string;
  department?: string;
  isOnChat?: boolean;
  isOrg?: boolean;
  isExternal?: boolean;
}

export interface CalendarEvent {
  id: string;
  day: number;
  title: string;
  chipText: string;
  time: string;
  host: string;
}

export interface ActivityItem {
  id: string;
  groupDate: string;
  type: "call" | "message";
  title: string;
  preview: string;
  timeAgo: string;
  avatarText: string;
  avatarBg: string;
  callType?: "missed-video" | "missed-audio" | "incoming-audio";
  callIcon?: "video" | "phone";
  isMissed?: boolean;
}

export const CURRENT_USER = {
  name: "Jane Doe",
  email: "jane@example.com",
  avatarText: "J",
  avatarBg: "bg-blue-600",
  isOnline: true,
};

export const INITIAL_CHATS: ChatItem[] = [
  {
    id: "sam-taylor",
    name: "Sam Taylor",
    time: "5 days",
    preview: "okay",
    avatarText: "ST",
    avatarBg: "bg-blue-600",
    isGroup: false,
    isOnline: false,
  },
  {
    id: "people-of-acme",
    name: "People of Acme",
    time: "14 days",
    preview: "sales acme: @HR Department Than...",
    avatarText: "PE",
    avatarBg: "bg-green-700",
    isGroup: true,
  },
  {
    id: "acme-product-tech",
    name: "Acme Product & Tech Team",
    time: "29 days",
    preview: "Team Lead: @all Hello Team...",
    avatarText: "SN",
    avatarBg: "bg-blue-600",
    isGroup: true,
  },
  {
    id: "acme-team",
    name: "Acme Team",
    time: "about 1 month",
    preview: "Sam Taylor: Name AWS Region pr...",
    avatarText: "SN",
    avatarBg: "bg-indigo-600",
    isGroup: true,
  },
  {
    id: "casey-brown",
    name: "Casey Brown",
    time: "2 months",
    preview: "Hi Jane, have you done the product...",
    avatarText: "CB",
    avatarBg: "bg-amber-600",
    isGroup: false,
  },
  {
    id: "jordan-lee",
    name: "Jordan Lee",
    time: "3 months",
    preview: "this is a good effect",
    avatarText: "JL",
    avatarBg: "bg-purple-600",
    isGroup: false,
  },
  {
    id: "alex-morgan",
    name: "Alex Morgan",
    time: "3 months",
    preview: "pls can you send the workforce logo t...",
    avatarText: "AM",
    avatarBg: "bg-blue-600",
    isGroup: false,
  },
  {
    id: "daniel-okoye",
    name: "Daniel Okoye",
    time: "3 months",
    preview: "Audio call · 52:09",
    avatarText: "DO",
    avatarBg: "bg-zinc-700",
    isGroup: false,
    isCall: true,
  },
  {
    id: "priya-shah",
    name: "Priya Shah",
    time: "3 months",
    preview: "https://www.figma.com/design/...",
    avatarText: "PS",
    avatarBg: "bg-blue-500",
    isGroup: false,
  },
];

export const SAM_TAYLOR_MESSAGES: ChatMessage[] = [
  {
    id: "m1",
    sender: "Jane Doe",
    time: "2:41 PM",
    text: "Good afternoon Sam",
    isMe: true,
  },
  {
    id: "m2",
    sender: "Jane Doe",
    time: "2:42 PM",
    text: "Could you send me the brief for the new onboarding flow?",
    isMe: true,
  },
  {
    id: "m3",
    sender: "Jane Doe",
    time: "9:43 AM",
    imageName: "Acme card.png",
    isMe: true,
  },
  {
    id: "m4",
    sender: "Sam Taylor",
    avatarText: "ST",
    avatarBg: "bg-blue-600",
    time: "9:06 AM",
    text: "Missed audio call",
    isMe: false,
    isMissedCall: true,
  },
  {
    id: "m5",
    sender: "Sam Taylor",
    avatarText: "ST",
    avatarBg: "bg-blue-600",
    time: "9:06 AM",
    text: "good morning",
    isMe: false,
  },
  {
    id: "m6",
    sender: "Jane Doe",
    time: "9:07 AM",
    text: "Good morning",
    isMe: true,
  },
  {
    id: "m7",
    sender: "Sam Taylor",
    avatarText: "ST",
    avatarBg: "bg-blue-600",
    time: "9:07 AM",
    text: "I am testing the new build",
    isMe: false,
  },
  {
    id: "m8",
    sender: "Jane Doe",
    time: "10:09 AM",
    text: "okay",
    isMe: true,
  },
];

export const GROUP_WELCOME_MESSAGE = `@all Hello Team,

I created this group so we can have a dedicated space for communication and collaboration around our products and technical matters.

As I've been going through and using some of our products, I have noticed a few issues that I will be dropping here from time to time for visibility and follow-up.

I will also share any feedback or observations I come across from a user/product perspective. Hopefully, this helps us identify and resolve issues quickly and continue improving the overall user experience.

Thanks.`;

export const GROUP_MESSAGES: ChatMessage[] = [
  {
    id: "gm1",
    sender: "Team Lead",
    avatarText: "TL",
    avatarBg: "bg-red-500",
    time: "11:39 PM",
    text: GROUP_WELCOME_MESSAGE,
    isMe: false,
  },
  {
    id: "gm2",
    sender: "Team Lead",
    avatarText: "TL",
    avatarBg: "bg-red-500",
    time: "11:09 AM",
    mention: "@casey",
    isMe: false,
  },
  {
    id: "gm3",
    sender: "Casey Brown",
    avatarText: "CB",
    avatarBg: "bg-blue-500",
    time: "11:41 AM",
    text: "Thank you",
    reaction: "👍",
    isMe: false,
  },
  {
    id: "gm4",
    sender: "Team Lead",
    avatarText: "TL",
    avatarBg: "bg-red-500",
    time: "10:45 AM",
    mention: "@jordan",
    isMe: false,
  },
];

export const GROUP_MEMBERS: GroupMember[] = [
  {
    id: "m-jane",
    name: "Jane Doe",
    email: "jane@example.com",
    avatarText: "J",
    avatarBg: "bg-rose-500",
    role: "You",
    isYou: true,
  },
  {
    id: "m-tl",
    name: "Team Lead",
    email: "lead@example.com",
    avatarText: "TL",
    avatarBg: "bg-red-500",
    role: "Organizer",
  },
  {
    id: "m-sam",
    name: "Sam Taylor",
    email: "sam.taylor@example.com",
    avatarText: "ST",
    avatarBg: "bg-blue-600",
  },
  {
    id: "m-casey",
    name: "Casey Brown",
    email: "casey.brown@example.com",
    avatarText: "CB",
    avatarBg: "bg-amber-600",
  },
  {
    id: "m-jordan",
    name: "Jordan Lee",
    email: "jordan.lee@example.com",
    avatarText: "JL",
    avatarBg: "bg-purple-600",
  },
  {
    id: "m-alex",
    name: "Alex Morgan",
    email: "alex.morgan@example.com",
    avatarText: "AM",
    avatarBg: "bg-blue-600",
  },
  {
    id: "m-priya",
    name: "Priya Shah",
    email: "priya.shah@example.com",
    avatarText: "PS",
    avatarBg: "bg-pink-600",
  },
  {
    id: "m-daniel",
    name: "Daniel Okoye",
    email: "daniel.okoye@example.com",
    avatarText: "DO",
    avatarBg: "bg-emerald-600",
  },
];

export const CANDIDATE_USERS: GroupMember[] = [
  {
    id: "u-sam",
    name: "Sam Taylor",
    email: "sam.taylor@example.com",
    avatarText: "ST",
    avatarBg: "bg-blue-600",
  },
  {
    id: "u-casey",
    name: "Casey Brown",
    email: "casey.brown@example.com",
    avatarText: "CB",
    avatarBg: "bg-amber-600",
  },
  {
    id: "u-jordan",
    name: "Jordan Lee",
    email: "jordan.lee@example.com",
    avatarText: "JL",
    avatarBg: "bg-purple-600",
  },
  {
    id: "u-alex",
    name: "Alex Morgan",
    email: "alex.morgan@example.com",
    avatarText: "AM",
    avatarBg: "bg-blue-600",
  },
  {
    id: "u-priya",
    name: "Priya Shah",
    email: "priya.shah@example.com",
    avatarText: "PS",
    avatarBg: "bg-pink-600",
  },
  {
    id: "u-daniel",
    name: "Daniel Okoye",
    email: "daniel.okoye@example.com",
    avatarText: "DO",
    avatarBg: "bg-emerald-600",
  },
  {
    id: "u-admin",
    name: "Admin Acme",
    email: "admin@example.com",
    avatarText: "AA",
    avatarBg: "bg-zinc-700",
  },
  {
    id: "u-ade",
    name: "Ade Lewis",
    email: "ade.lewis@example.com",
    avatarText: "AL",
    avatarBg: "bg-blue-500",
  },
  {
    id: "u-maria",
    name: "Maria Silva",
    email: "maria.silva@example.com",
    avatarText: "MS",
    avatarBg: "bg-teal-600",
  },
  {
    id: "u-tom",
    name: "Tom Baker",
    email: "tom.baker@example.com",
    avatarText: "TB",
    avatarBg: "bg-orange-600",
  },
];

export const INITIAL_MEET_LINKS: MeetLinkCard[] = [
  {
    id: "card-1",
    title: "Meeting with Jane Doe",
    url: "https://meet.snaarp.com/meet/ukr-vmvj-pfa",
    created: "16/11/2026",
    expires: "17/11/2026",
    isActive: true,
  },
];

export const SECOND_MEET_LINK: MeetLinkCard = {
  id: "card-2",
  title: "Meeting with Jane Doe",
  url: "https://meet.snaarp.com/meet/etz-pips-nmk",
  created: "16/11/2026",
  expires: "17/11/2026",
  isActive: true,
};

export const RECENT_CALLS: CallRecord[] = [
  {
    id: "call-1",
    name: "Sam Taylor",
    avatarText: "ST",
    avatarBg: "bg-blue-600",
    type: "missed-audio",
    timeAgo: "3 hours ago",
    dateStr: "Mon, Nov 16 · 7:07 AM",
  },
  {
    id: "call-2",
    name: "Sam Taylor",
    avatarText: "ST",
    avatarBg: "bg-blue-600",
    type: "missed-audio",
    timeAgo: "4 days ago",
    dateStr: "Thu, Nov 12 · 9:06 AM",
  },
  {
    id: "call-3",
    name: "Alex Morgan",
    avatarText: "AM",
    avatarBg: "bg-zinc-700",
    type: "incoming-audio",
    timeAgo: "52:09 · 3 months ago",
    dateStr: "Thu, Aug 13 · 11:47 AM",
  },
  {
    id: "call-4",
    name: "Casey Brown",
    avatarText: "CB",
    avatarBg: "bg-amber-600",
    type: "missed-audio",
    timeAgo: "3 months ago",
    dateStr: "Tue, Aug 11 · 4:26 PM",
  },
];

// --- 25 PEOPLE DATA FOR TEAMS PEOPLE VIEW ---
export const TEAMS_PEOPLE: PersonItem[] = [
  {
    id: "p-admin",
    name: "Admin Acme",
    email: "admin@example.com",
    avatarText: "AA",
    avatarBg: "bg-purple-700",
    department: "Engineering",
    isOnChat: true,
    isOrg: true,
  },
  {
    id: "p-alex",
    name: "Alex Morgan",
    email: "alex.morgan@example.com",
    avatarText: "AM",
    avatarBg: "bg-zinc-800",
    isOnChat: true,
    isExternal: true,
  },
  {
    id: "p-alex-2",
    name: "Alex Morgan",
    email: "alex@example.com",
    avatarText: "AM",
    avatarBg: "bg-blue-600",
    isOnChat: true,
    isExternal: true,
  },
  {
    id: "p-casey",
    name: "Casey Brown",
    email: "casey.brown@example.com",
    avatarText: "CB",
    avatarBg: "bg-amber-700",
    department: "Engineering",
    isOnChat: true,
    isOrg: true,
  },
  {
    id: "p-jordan",
    name: "Jordan Lee",
    email: "jordan.lee@example.com",
    avatarText: "JL",
    avatarBg: "bg-red-600",
    isOnChat: true,
    isOrg: true,
  },
  {
    id: "p-priya",
    name: "Priya Shah",
    email: "priya.shah@example.com",
    avatarText: "PS",
    avatarBg: "bg-pink-600",
    isOnChat: true,
    isExternal: true,
  },
  {
    id: "p-daniel",
    name: "Daniel Okoye",
    email: "daniel.okoye@example.com",
    avatarText: "DO",
    avatarBg: "bg-purple-600",
    department: "Engineering",
    isOnChat: true,
    isOrg: true,
  },
  {
    id: "p-guest",
    name: "Guest Contact",
    email: "guest@example.com",
    avatarText: "G",
    avatarBg: "bg-red-600",
    isExternal: true,
  },
  {
    id: "p-maria",
    name: "Maria Silva",
    email: "maria.silva@example.com",
    avatarText: "MS",
    avatarBg: "bg-blue-600",
    isOnChat: true,
    isExternal: true,
  },
  {
    id: "p-tom",
    name: "Tom Baker",
    email: "tom.baker@example.com",
    avatarText: "TB",
    avatarBg: "bg-blue-600",
    isOnChat: true,
    isExternal: true,
  },
  {
    id: "p-ade",
    name: "Ade Lewis",
    email: "ade.lewis@example.com",
    avatarText: "AL",
    avatarBg: "bg-blue-600",
    department: "Engineering",
    isOnChat: true,
    isExternal: true,
  },
  {
    id: "p-nina",
    name: "Nina Patel",
    email: "nina.patel@example.com",
    avatarText: "NP",
    avatarBg: "bg-emerald-600",
    isOnChat: true,
    isOrg: true,
  },
  {
    id: "p-hr",
    name: "HR Team",
    email: "hr@example.com",
    avatarText: "HR",
    avatarBg: "bg-teal-700",
    isOnChat: true,
    isOrg: true,
  },
  {
    id: "p-sam",
    name: "Sam Taylor",
    email: "sam.taylor@example.com",
    avatarText: "ST",
    avatarBg: "bg-blue-600",
    department: "Product",
    isOnChat: true,
    isOrg: true,
  },
  {
    id: "p-lucas",
    name: "Lucas Vance",
    email: "lucas.vance@example.com",
    avatarText: "LV",
    avatarBg: "bg-indigo-600",
    isOnChat: true,
    isOrg: true,
  },
  {
    id: "p-clara",
    name: "Clara Oswald",
    email: "clara.oswald@example.com",
    avatarText: "CO",
    avatarBg: "bg-violet-600",
    department: "Design",
    isOnChat: true,
    isOrg: true,
  },
  {
    id: "p-ben",
    name: "Ben Davies",
    email: "ben.davies@example.com",
    avatarText: "BD",
    avatarBg: "bg-sky-600",
    isExternal: true,
  },
  {
    id: "p-sophia",
    name: "Sophia Chen",
    email: "sophia.chen@example.com",
    avatarText: "SC",
    avatarBg: "bg-rose-600",
    department: "Engineering",
    isOnChat: true,
    isOrg: true,
  },
  {
    id: "p-liam",
    name: "Liam Evans",
    email: "liam.evans@example.com",
    avatarText: "LE",
    avatarBg: "bg-amber-600",
    isExternal: true,
  },
  {
    id: "p-olivia",
    name: "Olivia Brooks",
    email: "olivia.brooks@example.com",
    avatarText: "OB",
    avatarBg: "bg-fuchsia-600",
    isOnChat: true,
    isOrg: true,
  },
  {
    id: "p-ethan",
    name: "Ethan Wright",
    email: "ethan.wright@example.com",
    avatarText: "EW",
    avatarBg: "bg-cyan-600",
    department: "Operations",
    isOnChat: true,
    isOrg: true,
  },
  {
    id: "p-zoe",
    name: "Zoe Bell",
    email: "zoe.bell@example.com",
    avatarText: "ZB",
    avatarBg: "bg-orange-600",
    isOnChat: true,
    isExternal: true,
  },
  {
    id: "p-noah",
    name: "Noah Scott",
    email: "noah.scott@example.com",
    avatarText: "NS",
    avatarBg: "bg-lime-700",
    isExternal: true,
  },
  {
    id: "p-chloe",
    name: "Chloe Turner",
    email: "chloe.turner@example.com",
    avatarText: "CT",
    avatarBg: "bg-emerald-700",
    department: "Marketing",
    isOnChat: true,
    isOrg: true,
  },
  {
    id: "p-hannah",
    name: "Hannah Reed",
    email: "hannah.reed@example.com",
    avatarText: "HR",
    avatarBg: "bg-teal-600",
    isOnChat: true,
    isOrg: true,
  },
];

// Subtitles for People tabs
export const PEOPLE_SUBTITLES: Record<PeopleFilterTab, string> = {
  all: "People in your org domain, address book, and anyone you've chatted with · example.com",
  chat: "People on Snaarp Chat you can message or call · example.com",
  org: "People who share your organisation's email domain · example.com",
  external: "Address book and chat contacts outside your organization · example.com",
};

// Calendar Data (November 2026, UK locale, today = 17 Nov 2026)
export const CALENDAR_EVENTS: CalendarEvent[] = [
  {
    id: "evt-10",
    day: 10,
    title: "Standup Meeting with developers",
    chipText: "11:30 Standup Meeting with devel...",
    time: "11:30 AM – 12:00 PM",
    host: "with Jane Doe",
  },
  {
    id: "evt-11",
    day: 11,
    title: "Creative meeting with the Team",
    chipText: "11:30 Creative meeting with the T...",
    time: "11:30 AM – 12:30 PM",
    host: "with Sam Taylor",
  },
];

// Activity Feed Data
export const ACTIVITY_ITEMS: ActivityItem[] = [
  {
    id: "act-1",
    groupDate: "YESTERDAY",
    type: "call",
    title: "Sam Taylor",
    preview: "Missed video call",
    timeAgo: "about 14 hours ago",
    avatarText: "ST",
    avatarBg: "bg-blue-600",
    callType: "missed-video",
    callIcon: "video",
    isMissed: true,
  },
  {
    id: "act-2",
    groupDate: "YESTERDAY",
    type: "call",
    title: "Sam Taylor",
    preview: "Missed video call",
    timeAgo: "about 14 hours ago",
    avatarText: "ST",
    avatarBg: "bg-blue-600",
    callType: "missed-video",
    callIcon: "video",
    isMissed: true,
  },
  {
    id: "act-3",
    groupDate: "THURSDAY, NOV 12",
    type: "call",
    title: "Sam Taylor",
    preview: "Missed call",
    timeAgo: "5 days ago",
    avatarText: "ST",
    avatarBg: "bg-blue-600",
    callType: "missed-audio",
    callIcon: "phone",
    isMissed: true,
  },
  {
    id: "act-4",
    groupDate: "MONDAY, NOV 2",
    type: "message",
    title: "People of Acme",
    preview: "@[HR Team] Thank you for the warm welcome to the workspace...",
    timeAgo: "15 days ago",
    avatarText: "PE",
    avatarBg: "bg-green-700",
  },
  {
    id: "act-5",
    groupDate: "MONDAY, OCT 19",
    type: "message",
    title: "Acme Product & Tech Team",
    preview: "@[Sam Taylor] Let's align on the sprint delivery and next release...",
    timeAgo: "29 days ago",
    avatarText: "SN",
    avatarBg: "bg-blue-600",
  },
  {
    id: "act-6",
    groupDate: "THURSDAY, OCT 15",
    type: "message",
    title: "Acme Team",
    preview: "Name AWS Region proper s3 bucket for sample data storage...",
    timeAgo: "about 1 month ago",
    avatarText: "SN",
    avatarBg: "bg-indigo-600",
  },
  {
    id: "act-7",
    groupDate: "THURSDAY, AUG 13",
    type: "call",
    title: "Alex Morgan",
    preview: "Incoming call · 52:09",
    timeAgo: "3 months ago",
    avatarText: "AM",
    avatarBg: "bg-zinc-800",
    callType: "incoming-audio",
    callIcon: "phone",
  },
  {
    id: "act-8",
    groupDate: "TUESDAY, AUG 11",
    type: "call",
    title: "Priya Shah",
    preview: "Missed call",
    timeAgo: "3 months ago",
    avatarText: "PS",
    avatarBg: "bg-pink-600",
    callType: "missed-audio",
    callIcon: "phone",
    isMissed: true,
  },
];
