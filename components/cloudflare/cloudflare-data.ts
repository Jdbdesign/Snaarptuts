import type { IconName } from "@/components/icons";

/*
 * Copy for the Cloudflare dashboard illustration (shared chrome). This is our own drawing of an older Cloudflare
 * dashboard, not Cloudflare's artwork: check it against the live dashboard before launch.
 */

export const BRAND = "CLOUDFLARE";

export const TOPBAR = {
  addSite: "Add site",
  support: "Support",
  language: "English (US)",
};

export const NOTE = "Illustration of the Cloudflare dashboard. Your screen may look slightly different.";

export type NavItem = { id: string; label: string; icon: IconName; caret?: boolean };

export const NAV: NavItem[] = [
  { id: "overview", label: "Overview", icon: "cfOverview" },
  { id: "analytics", label: "Analytics", icon: "cfAnalytics", caret: true },
  { id: "dns", label: "DNS", icon: "cfDns" },
  { id: "email", label: "Email", icon: "cfEmail" },
  { id: "ssl", label: "SSL/TLS", icon: "cfSsl", caret: true },
  { id: "firewall", label: "Firewall", icon: "cfFirewall", caret: true },
  { id: "access", label: "Access", icon: "cfAccess" },
  { id: "speed", label: "Speed", icon: "cfSpeed", caret: true },
  { id: "caching", label: "Caching", icon: "cfCaching", caret: true },
  { id: "workers", label: "Workers", icon: "cfWorkers" },
  { id: "rules", label: "Rules", icon: "cfRules", caret: true },
  { id: "network", label: "Network", icon: "cfNetwork" },
  { id: "traffic", label: "Traffic", icon: "cfTraffic", caret: true },
  { id: "pages", label: "Custom Pages", icon: "cfPages" },
  { id: "apps", label: "Apps", icon: "cfApps" },
];

/** The sub-items that open under DNS. */
export const DNS_SUBNAV = [
  { id: "records", label: "Records" },
  { id: "settings", label: "Settings" },
];

export type CfPage = "overview" | "dns";
