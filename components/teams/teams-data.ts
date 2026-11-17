/**
 * Data structures and sample datasets for Snaarp Teams tutorial.
 * Pure sample data: Jane Doe, Acme Studio, all @example.com, UK locale.
 */

export const TEAMS_URLS = {
  chat: "teams.snaarp.com/chat",
  meet: "teams.snaarp.com/meet",
  people: "teams.snaarp.com/people",
  calendar: "teams.snaarp.com/calendar",
  activity: "teams.snaarp.com/activity",
  prejoin: "meet.snaarp.com/meet/ukr-vmvj-pfa",
} as const;

export type TeamsNav = "chat" | "meet" | "people" | "calendar" | "activity";
export type ChatFilterTab = "all" | "unread" | "group";
export type ChatSubTab = "chat" | "files" | "photos";
export type MeetSubTab = "links" | "scheduled" | "calls";

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
