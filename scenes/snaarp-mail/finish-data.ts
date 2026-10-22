import { STATS, type Stat } from "@/scenes/snaarp-360/step3/step3-data";

/*
 * Snaarp Mail step 9 - Finish setup. All copy, the dashboard values and captions live here.
 * Screen A is "Setup Completed!" (login.snaarp.com/onboarding/complete); screen B is the email admin dashboard,
 * the same AdminLayout dashboard as 360 step 3 with these four stat cards.
 */

export const URLS = {
  complete: "login.snaarp.com/onboarding/complete",
  dashboard: "admin.snaarp.com/admin",
};

export const PAGE = {
  title: "Setup Completed!",
  text: "Congratulations! Your email configuration is complete and ready to use. All DNS records have been verified.",
  chips: ["MX Records", "SPF Record", "DKIM", "DMARC"],
  nextTitle: "What's Next?",
  next: [
    "Access your admin dashboard to manage users and settings",
    "Start sending and receiving emails with your domain",
    "Monitor email delivery and security reports",
  ],
  go: "Go to Admin Dashboard",
  download: "Download Summary",
};

/** The 360 stat cards with the Snaarp Mail values (same icons and colours). */
const VALUES: Record<string, Partial<Stat>> = {
  domains: { value: 1, label: "Domains", sub: "1 verified" },
  users: { value: 2, label: "Organization Users", sub: "2 total" },
  inboxes: { value: 1, label: "Inboxes", sub: "1 created" },
  plan: { title: "Growth Plan", label: "Subscription", sub: "14-day free trial" },
};
export const MAIL_STATS: Stat[] = STATS.map((s) => ({ ...s, ...VALUES[s.id] }));

export const CAPTIONS = {
  done: "All set. Your four email records are verified",
  go: "Click Go to Admin Dashboard",
  dashboard: "This is your email admin dashboard",
  menu: "Manage users, domains and mail settings from here",
};
