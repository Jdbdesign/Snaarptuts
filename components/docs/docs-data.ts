import type { IconName, LogoName } from "@/components/icons";

/** Copy and sample values of the Snaarp Doc shell (DocsLayout). Edit here, not in the layout code. */

/** Far-left app rail, top to bottom. `logo` is a name from PRODUCT_LOGOS. */
export const APP_RAIL_ITEMS: { id: string; label: string; logo: LogoName }[] = [
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
];

/** The app rail item that shows the light highlight. */
export const ACTIVE_APP = "docs";

export type DocsNavId = "documents" | "starred" | "trash";

export const NAV_ITEMS: { id: DocsNavId; label: string; icon: IconName }[] = [
  { id: "documents", label: "Documents", icon: "docFile" },
  { id: "starred", label: "Starred", icon: "star" },
  { id: "trash", label: "Trash", icon: "trash" },
];

export const SHELL = {
  appName: "Snaarp Doc",
  foldersLabel: "FOLDERS",
  allDocuments: "All Documents",
  reportBug: "Report a Bug",
  adminPanel: "Admin Panel",
  logout: "Logout",
  searchPlaceholder: "Search documents...",
  user: { name: "Jane Doe", email: "jane@acme-studio.com", initials: "JD" },
};
