import type { IconName, LogoName } from "@/components/icons";

export type ProductTile = { id: string; label: string; logo: LogoName };

/** Products home grid: 9 on the first row, 7 on the second. */
export const PRODUCT_TILES: ProductTile[] = [
  { id: "mail", label: "Mail", logo: "mail" },
  { id: "drive", label: "Drive", logo: "drive" },
  { id: "lock", label: "Lock", logo: "lock" },
  { id: "sheets", label: "Sheets", logo: "sheet" },
  { id: "slides", label: "Slides", logo: "presentation" },
  { id: "teams", label: "Teams", logo: "teams" },
  { id: "meets", label: "Meets", logo: "meet" },
  { id: "crm", label: "CRM", logo: "crm" },
  { id: "books", label: "Books", logo: "books" },
  { id: "me", label: "Me", logo: "me" },
  { id: "pdf", label: "PDF", logo: "pdf" },
  { id: "onecards", label: "One Cards", logo: "onecard" },
  { id: "workforce", label: "Workforce", logo: "workforce" },
  { id: "project", label: "Project", logo: "projects" },
  { id: "docs", label: "Docs", logo: "docs" },
  { id: "sign", label: "Sign", logo: "sign" },
];

export const ADMIN_FEATURES: { icon: IconName; title: string; text: string }[] = [
  {
    icon: "users",
    title: "Effortless Team Collaboration",
    text: "Easily manage and collaborate with your entire team. Secure email sharing and customizable permissions at your fingertips.",
  },
  {
    icon: "shield",
    title: "Stay Compliant, Always",
    text: "Our platform meets industry standards, including GDPR, HIPAA, and SOC2. Keep your communications secure with built-in compliance tools.",
  },
  {
    icon: "padlock",
    title: "Next-Level Security",
    text: "Your emails are fully protected with state-of-the-art encryption, two-factor authentication, and proactive threat defense.",
  },
];

export const ADMIN_FOOTER_LINKS = ["Terms of Service", "Privacy Policy", "Security", "Help Center"];

export type Stat = {
  id: string;
  value: number | null; // null = show `title` instead of a number
  title?: string;
  label: string;
  sub: string;
  icon: IconName;
  tile: string; // tailwind classes for the pastel icon tile
};

export const STATS: Stat[] = [
  { id: "domains", value: 0, label: "Domains", sub: "of 0 limit", icon: "globe", tile: "bg-[#E8F0FE] text-[#3B82F6]" },
  { id: "users", value: 1, label: "Organization Users", sub: "1 active", icon: "users", tile: "bg-[#E4F6EA] text-[#22A06B]" },
  { id: "inboxes", value: 0, label: "Inboxes", sub: "of 0 limit", icon: "inbox", tile: "bg-[#FEF5D3] text-[#D4A017]" },
  { id: "plan", value: null, title: "Business Plan", label: "Subscription", sub: "Active", icon: "key", tile: "bg-[#F1E8FD] text-[#8B5CF6]" },
];

export const MONTHS = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
export const Y_LABELS = ["25k", "19.5k", "13k", "6.5k", "0k"];
