import type { IconName, LogoName } from "@/components/icons";

/** Far-left icon rail of the admin portal. */
export const RAIL_ITEMS: { label: string; logo: LogoName }[] = [
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
  { label: "Me", logo: "me" },
];

/** Second sidebar menu. `id` is used in selectors as [data-tl=menu-<id>]. */
export const MENU_ITEMS: { id: string; label: string; icon: IconName }[] = [
  { id: "dashboard", label: "Dashboard", icon: "grid4" },
  { id: "user", label: "User", icon: "users" },
  { id: "organization", label: "Organization", icon: "building" },
  { id: "domains", label: "Domains", icon: "globe" },
  { id: "groups", label: "Groups", icon: "layers" },
  { id: "profile", label: "Profile", icon: "building" },
  { id: "forwarding", label: "Email Forwarding", icon: "eye" },
  { id: "subscription", label: "Subscription", icon: "card" },
];
