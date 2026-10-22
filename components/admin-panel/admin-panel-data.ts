import type { IconName, LogoName } from "@/components/icons";

/** Far-left slim rail of the Admin Panel (the products an admin can jump to). */
export const PANEL_RAIL_ITEMS: { label: string; logo: LogoName }[] = [
  { label: "Mail", logo: "mail" },
  { label: "Meets", logo: "meet" },
  { label: "Teams", logo: "teams" },
  { label: "One Cards", logo: "onecard" },
  { label: "Sheets", logo: "sheet" },
  { label: "Docs", logo: "docs" },
  { label: "Slides", logo: "presentation" },
  { label: "PDF", logo: "pdf" },
  { label: "Lock", logo: "lock" },
  { label: "Sign", logo: "sign" },
  { label: "Drive", logo: "drive" },
];

/** Second column menu. `id` is used in selectors as [data-tl=panel-menu-<id>]. A `gap` row adds space above it. */
export const PANEL_MENU: { id: string; label: string; icon: IconName; gap?: boolean }[] = [
  { id: "dashboard", label: "Dashboard", icon: "grid4" },
  { id: "users", label: "Users", icon: "user" },
  { id: "bulk-users", label: "Bulk Users", icon: "users" },
  { id: "organization", label: "Organization", icon: "building" },
  { id: "profile", label: "Profile", icon: "user", gap: true },
  { id: "subscription", label: "Subscription", icon: "card" },
  { id: "upgrade", label: "Upgrade", icon: "arrowUpCircle" },
];
