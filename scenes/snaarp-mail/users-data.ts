import type { IconName } from "@/components/icons";
import { DOMAIN } from "./dns-data";

/*
 * Snaarp Mail step 8 - Add your team. All copy, sample people and captions live here.
 * NEW_USER has the same shape as the 360 Add User modal's data, so it is passed to that modal as a setting.
 * All people are sample data.
 */

export const NEW_USER = {
  first: "Sam",
  last: "Lee",
  initials: "SL",
  email: `sam.lee@${DOMAIN}`,
  /** The part before the @, as chosen from the suggestion chips. */
  emailName: "sam.lee",
  recovery: "sam.recovery@example.com",
  /** Fake generated password. */
  password: "Wd7#kQ2mPz9a",
  domain: DOMAIN,
};

export type TeamUser = {
  name: string;
  email: string;
  role: "User" | "Admin";
  status: "Pending" | "Active";
  initials: string;
  /** Avatar colour. */
  color: string;
};

/** The row the tutorial adds. */
export const SAM: TeamUser = {
  name: `${NEW_USER.first} ${NEW_USER.last}`,
  email: NEW_USER.email,
  role: "User",
  status: "Pending",
  initials: NEW_USER.initials,
  color: "#2BA84A",
};

export type TeamOption = { id: string; title: string; text: string; icon: IconName; selected?: boolean; badge?: string };

export const PAGE = {
  title: "Add your team members",
  intro: "Invite your team to join Snaarp. You can add users manually, import from CSV, or sync with Google Workspace.",
  options: [
    { id: "manual", title: "Add Manually", text: "Add team members one by one with custom roles", icon: "userPlus", selected: true, badge: "Recommended" },
    { id: "csv", title: "Import CSV", text: "Bulk import users from a CSV file", icon: "csvFile" },
    { id: "google", title: "Sync Google Workspace", text: "Automatically sync users and groups", icon: "googleG" },
  ] satisfies TeamOption[],
  team: "Team Members",
  total: (n: number) => `Total: ${n} ${n === 1 ? "user" : "users"}`,
  export: "Export",
  addUser: "Add User",
  columns: ["NAME", "EMAIL", "ROLE", "STATUS", "ACTIONS"],
  empty: "No team members yet",
  menu: ["Copy link", "Edit", "Delete"],
  back: "Back",
  continue: "Continue",
};

export const TOASTS = {
  created: (email: string) => `User inbox ${email} created successfully!`,
};

export const CAPTIONS = {
  manual: "Choose Add Manually. It is the recommended way",
  addUser: "Click Add User",
  name: "Enter the new user's name",
  email: "Choose an email name on your verified domain",
  recovery: "Add a recovery email",
  welcome: "Keep both welcome email options on",
  password: "Copy the generated password and keep it safe",
  create: "Click Create User",
  added: "Your first user is added",
  menu: "Use Copy link to share the setup link with your user",
  continue: "Click Continue",
};
