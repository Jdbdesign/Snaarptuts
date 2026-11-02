import type { LogoName } from "@/components/icons";

/**
 * Navigation URLs for OneCardX
 */
export const URLS = {
  home: "onecardx.snaarp.com/home",
  orgCards: "onecardx.snaarp.com/admin/organization-cards",
  editor: "onecardx.snaarp.com/admin/organization-cards/editor",
  cardDetail: "onecardx.snaarp.com/admin/organization-cards/engineering-team",
  publicPreview: "identity.snaarp.com/c/engineering-team-38805cae",
};

/**
 * Logged-in admin user: Sam Taylor (Acme Ltd)
 * Replaces real accounts per project rules.
 */
export const SAMPLE_ADMIN = {
  name: "Sam Taylor",
  email: "sam.taylor@snaarp.com",
  role: "Organization Admin",
  company: "Acme Ltd",
  avatarInitials: "ST",
};

/**
 * Snaarp suite left rail items (with One Cardx highlighted)
 */
export const SUITE_RAIL_ITEMS: { id: string; label: string; logo: LogoName }[] = [
  { id: "mail", label: "Mail", logo: "mail" },
  { id: "meets", label: "Meets", logo: "meet" },
  { id: "teams", label: "Teams", logo: "teams" },
  { id: "onecard", label: "One Cardx", logo: "onecard" },
  { id: "sheets", label: "Sheets", logo: "sheet" },
  { id: "docs", label: "Docs", logo: "docs" },
  { id: "slides", label: "Slides", logo: "presentation" },
  { id: "pdf", label: "PDF", logo: "pdf" },
  { id: "lock", label: "Lock", logo: "lock" },
  { id: "sign", label: "Sign", logo: "sign" },
  { id: "drive", label: "Drive", logo: "drive" },
  { id: "me", label: "Me", logo: "me" },
  { id: "crm", label: "CRM", logo: "crm" },
];

/**
 * OneCardX sidebar navigation definitions
 */
export type OneCardXNavId =
  | "home"
  | "id-cards"
  | "business-card"
  | "email-signatures"
  | "backgrounds"
  | "contacts"
  | "analytics"
  | "create-card"
  | "users";

export type SidebarGroup = {
  title: string;
  items: { id: OneCardXNavId; label: string; icon: string }[];
};

export const ONECARDX_SIDEBAR_GROUPS: SidebarGroup[] = [
  {
    title: "CREATE",
    items: [
      { id: "home", label: "Home", icon: "home" },
      { id: "id-cards", label: "ID Cards", icon: "id" },
      { id: "business-card", label: "Business Card", icon: "card" },
      { id: "email-signatures", label: "Email Signatures", icon: "pen" },
      { id: "backgrounds", label: "Backgrounds", icon: "image" },
    ],
  },
  {
    title: "NETWORK",
    items: [{ id: "contacts", label: "Contacts", icon: "users" }],
  },
  {
    title: "INSIGHTS",
    items: [{ id: "analytics", label: "Analytics", icon: "chart" }],
  },
  {
    title: "ADMIN",
    items: [
      { id: "create-card", label: "Create Card", icon: "plus" },
      { id: "users", label: "Users", icon: "userCheck" },
    ],
  },
];

/**
 * Sample organization cards table data
 */
export type OrgCardItem = {
  id: string;
  name: string;
  status: "Draft" | "Published";
  statusText: string;
  meta: string;
  views: number;
  shares: number;
};

export const SAMPLE_ORG_CARDS: OrgCardItem[] = [
  {
    id: "sales-team",
    name: "Sales Team",
    status: "Draft",
    statusText: "Draft — visible to organization admins only",
    meta: "Created by Sam Taylor · 6h ago",
    views: 0,
    shares: 0,
  },
  {
    id: "business-card",
    name: "Business Card",
    status: "Published",
    statusText: "Visible to 45 people",
    meta: "Created by Casey Brown · 24/09/2026",
    views: 42,
    shares: 18,
  },
  {
    id: "id-card",
    name: "ID Card",
    status: "Published",
    statusText: "Visible to 45 people",
    meta: "Created by Casey Brown · 24/09/2026",
    views: 89,
    shares: 34,
  },
];

/**
 * Card designs available in Display tab
 */
export const CARD_DESIGNS = [
  { id: "classic", name: "Classic", desc: "Top header wave" },
  { id: "flat", name: "Flat", desc: "Solid minimalist" },
  { id: "modern", name: "Modern", desc: "Clean geometric" },
  { id: "sleek", name: "Sleek", desc: "Contemporary card" },
  { id: "blend", name: "Blend", desc: "Soft gradient" },
  { id: "midnight", name: "Midnight", desc: "Dark theme" },
  { id: "hex", name: "Hex", desc: "Geometric pattern" },
  { id: "purple", name: "Purple", desc: "Brand signature" },
  { id: "qr-wave", name: "QR Wave", desc: "Prominent QR focus" },
];

/**
 * Swatch colors
 */
export const ACCENT_COLORS = [
  { id: "purple", name: "Snaarp Purple", hex: "#7014D9" },
  { id: "blue", name: "Ocean Blue", hex: "#2563EB" },
  { id: "indigo", name: "Royal Indigo", hex: "#4F46E5" },
  { id: "teal", name: "Teal Green", hex: "#0D9488" },
  { id: "rose", name: "Rose Pink", hex: "#E11D48" },
  { id: "amber", name: "Warm Amber", hex: "#D97706" },
  { id: "dark", name: "Near Black", hex: "#1F2937" },
];

/**
 * Sample image choices for in-app picker
 */
export const SAMPLE_PORTRAITS = [
  { id: "portrait-1", name: "Alex Morgan (Standard)", color: "#7014D9", initials: "AM" },
  { id: "portrait-2", name: "Alex Morgan (Formal)", color: "#2563EB", initials: "AM" },
  { id: "portrait-3", name: "Alex Morgan (Casual)", color: "#0D9488", initials: "AM" },
];

export const SAMPLE_LOGOS = [
  { id: "logo-acme", name: "Acme Ltd Logo", color: "#7014D9" },
  { id: "logo-tech", name: "Tech Team Mark", color: "#2563EB" },
];

/**
 * Additional Fields Categories and Chips
 */
export const FIELD_CATEGORIES = [
  {
    id: "popular",
    title: "Most Popular",
    fields: [
      { id: "website", label: "Website", icon: "globe", placeholder: "https://yourwebsite.com" },
      { id: "email", label: "Email", icon: "mail", placeholder: "alex.morgan@acme.com" },
      { id: "phone", label: "Phone", icon: "phone", placeholder: "+44 20 7946 0192" },
      { id: "linkedin", label: "LinkedIn", icon: "share", placeholder: "https://linkedin.com/in/username" },
      { id: "instagram", label: "Instagram", icon: "instagram", placeholder: "@username" },
    ],
  },
  {
    id: "communication",
    title: "Communication",
    fields: [
      { id: "whatsapp", label: "WhatsApp", icon: "chat", placeholder: "+44 7700 900123" },
      { id: "telegram", label: "Telegram", icon: "send", placeholder: "@username" },
    ],
  },
  {
    id: "conferencing",
    title: "Conferencing & Video",
    fields: [
      { id: "meets", label: "Snaarp Meets", icon: "video", placeholder: "https://meets.snaarp.com/room" },
      { id: "youtube", label: "YouTube", icon: "play", placeholder: "https://youtube.com/@channel" },
    ],
  },
];
