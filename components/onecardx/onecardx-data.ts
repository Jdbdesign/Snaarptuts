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
  memberView: "onecardx.snaarp.com/cards/engineering-team",
  idCards: "onecardx.snaarp.com/id-cards",
  users: "onecardx.snaarp.com/admin/users",
  backgrounds: "onecardx.snaarp.com/backgrounds",
  emailSignatures: "identity.snaarp.com/email-signatures",
  mailInbox: "m.snaarp.com/#inbox",
  mailSettings: "m.snaarp.com/#settings",
  contacts: "identity.snaarp.com/contacts",
  contactDetail: "identity.snaarp.com/contacts/f98616ee-af2c-40ca-b9d9-a7c3d2722e26",
  analytics: "identity.snaarp.com/analytics",
};

/**
 * Sample contact data for OneCardX Part 4 (Contacts module)
 */
export const SAMPLE_CONTACT = {
  firstName: "Alex",
  lastName: "Morgan",
  name: "Alex Morgan",
  phone: "+44 7700 900123",
  phoneCountry: "GB +44",
  phoneType: "mobile",
  emailPersonal: "alex.morgan@acme.example",
  emailWork: "alex@acme.example",
  prefix: "Mr",
  middleName: "James",
  accreditations: "MBA",
  pronouns: "he/him",
  company: "Acme Ltd",
  title: "Product Designer",
  department: "Engineering",
  website: "www.acme.example",
  spotify: "www.spotify.com/music",
  addedDate: "03/11/2026",
  source: "manual",
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
export const BUSINESS_CARD_STYLES = [
  { id: "profile", name: "Profile" },
  { id: "portrait", name: "Portrait" },
  { id: "midnight", name: "Midnight" },
  { id: "qr-rail", name: "QR Rail" },
  { id: "orbit", name: "Orbit" },
  { id: "hex", name: "Hex" },
  { id: "split", name: "Split" },
  { id: "minimal", name: "Minimal" },
  { id: "wave", name: "Wave" },
];

export const BACKGROUND_COLOR_SWATCHES = [
  { id: "white", hex: "#FFFFFF" },
  { id: "dark-purple", hex: "#3B0764" },
  { id: "navy", hex: "#0F172A" },
  { id: "blue", hex: "#2563EB" },
  { id: "teal", hex: "#0D9488" },
  { id: "red", hex: "#DC2626" },
];

export const FONT_COLOR_SWATCHES = [
  { id: "navy", hex: "#0F172A" },
  { id: "black", hex: "#000000" },
  { id: "purple", hex: "#7014D9" },
  { id: "indigo", hex: "#4F46E5" },
  { id: "teal", hex: "#0D9488" },
  { id: "red", hex: "#DC2626" },
];

export const AUDIENCE_PEOPLE = [
  { id: "alex-morgan", name: "Alex Morgan", email: "alex.morgan@snaarp.com" },
  { id: "jordan-lee", name: "Jordan Lee", email: "jordan.lee@snaarp.com" },
  { id: "casey-brown", name: "Casey Brown", email: "casey.brown@snaarp.com" },
  { id: "taylor-reed", name: "Taylor Reed", email: "taylor.reed@snaarp.com" },
  { id: "morgan-blake", name: "Morgan Blake", email: "morgan.blake@snaarp.com" },
  { id: "riley-cole", name: "Riley Cole", email: "riley.cole@snaarp.com" },
];

export const DIRECTORY_USERS = [
  { id: "u-1", name: "Alex Morgan", email: "alex.morgan@snaarp.com", dept: "Engineering", status: "Active" },
  { id: "u-2", name: "Jordan Lee", email: "jordan.lee@snaarp.com", dept: "Engineering", status: "Active" },
  { id: "u-3", name: "Casey Brown", email: "casey.brown@snaarp.com", dept: "Engineering", status: "Active" },
  { id: "u-4", name: "Sam Taylor", email: "sam.taylor@snaarp.com", dept: "Engineering", status: "Active" },
  { id: "u-5", name: "Taylor Reed", email: "taylor.reed@snaarp.com", dept: "HR", status: "Active" },
  { id: "u-6", name: "Morgan Blake", email: "morgan.blake@snaarp.com", dept: "Engineering", status: "Active" },
  { id: "u-7", name: "Riley Cole", email: "riley.cole@snaarp.com", dept: "Engineering", status: "Active" },
  { id: "u-8", name: "Drew Hart", email: "drew.hart@snaarp.com", dept: "Engineering", status: "Active" },
];

export const VIRTUAL_BACKGROUNDS_CATEGORIES = [
  {
    id: "featured",
    name: "Featured",
    items: [
      { id: "sunset-lake", name: "Sunset Lake", gradient: "from-amber-600 via-orange-500 to-rose-900" },
      { id: "beach-waves", name: "Beach Waves", gradient: "from-cyan-500 via-sky-400 to-blue-700" },
      { id: "golden-meadow", name: "Golden Meadow", gradient: "from-yellow-500 via-amber-600 to-orange-800" },
      { id: "deep-ocean", name: "Deep Ocean", gradient: "from-blue-700 via-indigo-800 to-slate-950" },
    ],
  },
  {
    id: "abstract",
    name: "Abstract",
    items: [
      { id: "purple-flow", name: "Purple Flow", gradient: "from-purple-800 via-purple-600 to-indigo-900" },
      { id: "pastel-mesh", name: "Pastel Mesh", gradient: "from-pink-300 via-yellow-200 to-cyan-300" },
      { id: "curved-lines", name: "Curved Lines", gradient: "from-slate-200 via-gray-300 to-slate-400" },
      { id: "abstract-3", name: "Abstract 3", gradient: "from-violet-600 via-purple-500 to-fuchsia-600" },
    ],
  },
  {
    id: "city",
    name: "City",
    items: [
      { id: "skyline-night", name: "Skyline Night", gradient: "from-slate-900 via-indigo-950 to-blue-900" },
      { id: "aerial-view", name: "Aerial View", gradient: "from-blue-900 via-slate-800 to-zinc-900" },
      { id: "city-sunset", name: "City Sunset", gradient: "from-orange-700 via-rose-700 to-purple-900" },
      { id: "modern-bridge", name: "Modern Bridge", gradient: "from-sky-700 via-slate-700 to-gray-800" },
    ],
  },
];

export type MailItem = {
  id: string;
  sender: string;
  senderCount?: number;
  subject: string;
  snippet: string;
  date: string;
  isUnread?: boolean;
};

export const SAMPLE_MAIL_UNREAD: MailItem[] = [
  { id: "m-1", sender: "Acme AI Assistant", subject: "Use AI to make life easier", snippet: "Generate, refine, and export in minutes. Just tap or type to start. See everything Acme AI can do for your team.", date: "Yesterday", isUnread: true },
  { id: "m-2", sender: "Acme AI Assistant", senderCount: 2, subject: "4 new portrait styles to try", snippet: "Y2K digicam or 70s portrait? See your photos in a fresh new way. Pick an idea below and explore.", date: "Oct 31", isUnread: true },
  { id: "m-3", sender: "Jordan Lee", subject: "Easy self-care you can start today", snippet: "Take a quick break and review the team sprint deck before tomorrow's all-hands.", date: "Oct 30", isUnread: true },
  { id: "m-4", sender: "Casey Brown", subject: "Design system updates for Q4", snippet: "Preview the new components and tokens in Figma. Feedback requested by end of day Friday.", date: "Oct 29", isUnread: true },
  { id: "m-5", sender: "Product Updates", subject: "When an edit feels off", snippet: "Turn feedback on a photo into a clear prompt. We are rolling out improvements across Snaarp OneCard.", date: "Oct 26", isUnread: true },
  { id: "m-6", sender: "Security Team", subject: "Updates to our Privacy Policy", snippet: "Updates to Open Security Policy - We are updating our policy to include enhanced encryption.", date: "Oct 22", isUnread: true },
  { id: "m-7", sender: "Alex Morgan", subject: "Re: Digital card review", snippet: "Hello Sam, the new business card templates look great. Thank you for sending the preview.", date: "Oct 19", isUnread: true },
  { id: "m-8", sender: "Acme HR", subject: "Re: Outstanding Onboarding Tasks", snippet: "Payment details and equipment confirmation have been verified for all Q4 joiners.", date: "Oct 15", isUnread: true },
  { id: "m-9", sender: "Design Systems Hub", subject: "New in component tokens and exports", snippet: "What we shipped in October: updated typography scales, elevation shadows, and export presets.", date: "Oct 13", isUnread: true },
  { id: "m-10", sender: "Acme HR", subject: "Re: Brand logo asset pack", snippet: "Thank you for the update. All approved vectors have been synced to the team drive.", date: "Oct 12", isUnread: true },
  { id: "m-11", sender: "Security Alert", subject: "New device signed in to your account", snippet: "A new device just signed in to your Snaarp account. If this was not you, review active sessions.", date: "Oct 8", isUnread: true },
  { id: "m-12", sender: "Team Digest", senderCount: 2, subject: "Translate anything, your way", snippet: "Use text, voice, and images. New multilingual support now active across products.", date: "Oct 7", isUnread: true },
  { id: "m-13", sender: "Acme HR", subject: "Upcoming Public Holiday Notice", snippet: "Please be informed that the office will be closed on Friday for the national holiday.", date: "Sep 30", isUnread: true },
  { id: "m-14", sender: "Acme Billing", subject: "Invoice #INV-2026-1049 ready for download", snippet: "Your invoice for September 2026 is ready. Click below to download your statement.", date: "Sep 30", isUnread: true },
  { id: "m-15", sender: "Acme Billing", subject: "Payment Receipt for Acme Studio", snippet: "Payment received with thanks. Transaction reference #SNAARP-9921.", date: "Sep 28", isUnread: true },
  { id: "m-16", sender: "Morgan Taylor", subject: "Re: Digital ID card rollouts", snippet: "Thank you for sending the video. 45 team members now have their badges active.", date: "Sep 28", isUnread: true },
  { id: "m-17", sender: "Morgan Taylor", senderCount: 5, subject: "Re: Virtual backgrounds templates", snippet: "The high-resolution 16:9 backgrounds are ready for the executive team.", date: "Sep 28", isUnread: true },
  { id: "m-18", sender: "Jordan Lee", subject: "Sprint notes & design handoff", snippet: "Handoff notes for OneCardX email signatures and integration workflow.", date: "Aug 28", isUnread: true },
  { id: "m-19", sender: "Acme Cloud", subject: "Production deployment successful", snippet: "Deployment completed to snaarp.com production edge servers.", date: "Aug 27", isUnread: true },
];

export const SAMPLE_MAIL_READ: MailItem[] = [
  { id: "m-20", sender: "Akin Bayo", subject: "Recording sync notes", snippet: "Recording audio and visual review notes from Monday session.", date: "Oct 15", isUnread: false },
  { id: "m-21", sender: "Casey Brown", subject: "Equipment request confirmation", snippet: "Your requested studio monitor has been approved and dispatched.", date: "Oct 11", isUnread: false },
  { id: "m-22", sender: "Alex Morgan", subject: "Contract agreement finalized", snippet: "All documents signed via Snaarp Sign. Copies stored in Snaarp Drive.", date: "Oct 10", isUnread: false },
];
