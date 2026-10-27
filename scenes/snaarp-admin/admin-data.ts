import type { IconName, LogoName } from "@/components/icons";

/*
 * Snaarp Admin: "Add users and give them products". Shared sample data and copy for every step.
 * Recording: ref/admin/Snaarp_Admin_add_users.mp4 (1454x720, 3:13, git-ignored).
 * Sample data only: the real people, emails and domain in the recording are never used.
 */

export const URL_USERS = "login.snaarp.com/admin/users";

/** Initials in the avatar, top right of the Admin Panel. */
export const ADMIN_AVATAR = "JD";

/** The organisation's counts. Creating the user moves "Active users" from `before` to `after`. */
export const COUNTS = { before: 38, after: 39, suspended: 6, admins: 9 };

/** A sample date (DD/MM/YYYY) shown as "Granted ..." in Manage products. */
export const SAMPLE_DATE = "14/03/2026";

export const NEW_USER = {
  id: "sam",
  email: "sam@acme-studio.com",
  first: "Sam",
  last: "Carter",
  initials: "SC",
  username: "sam",
  job: "Designer",
  department: "Design",
  employee: "EMP-100",
  role: "Member",
  /** Typed as dots. A sample, never a real password. The "#" arrives after the length rule is already met. */
  password: "Welcomes#26",
};

export type Product = { id: string; name: string; logo?: LogoName; icon?: IconName };

/** Snaarp products only (the recording's internal names are left out). Identity has no logo yet, so it uses a glyph. */
export const PRODUCTS: Product[] = [
  { id: "mail", name: "Snaarp Mail", logo: "mail" },
  { id: "pdf", name: "Snaarp PDF", logo: "pdf" },
  { id: "drive", name: "Snaarp Drive", logo: "drive" },
  { id: "key", name: "SnaarpKey", logo: "lock" },
  { id: "books", name: "Snaarp Books", logo: "books" },
  { id: "crm", name: "Snaarp CRM", logo: "crm" },
  { id: "docs", name: "Snaarp Docs", logo: "docs" },
  { id: "identity", name: "Snaarp Identity", icon: "padlock" },
  { id: "me", name: "Snaarp Me", logo: "me" },
  { id: "meet", name: "Snaarp Meet", logo: "meet" },
  { id: "projects", name: "Snaarp Projects", logo: "projects" },
  { id: "sheet", name: "Snaarp Sheet", logo: "sheet" },
  { id: "sign", name: "Snaarp Sign", logo: "sign" },
  { id: "slides", name: "Snaarp Slides", logo: "presentation" },
  { id: "teams", name: "Snaarp Teams", logo: "teams" },
  { id: "workforce", name: "Snaarp Workforce", logo: "workforce" },
];

/** What a new user starts with, as in the recording. */
export const START_PRODUCTS = ["mail", "pdf", "drive", "key"];
export const PRODUCT_TO_ADD = "books";

export const productById = (id: string) => PRODUCTS.find((p) => p.id === id)!;

/** "Snaarp Mail" for one product, otherwise "5 products". */
export function productsLabel(ids: string[]) {
  return ids.length === 1 ? productById(ids[0]).name : `${ids.length} products`;
}

/** Only "Engineering" is visible in the recording; the other departments are assumed. */
export const DEPARTMENTS = ["No department", "Engineering", "Design", "Marketing", "Sales", "Support", "Operations"];
export const DEFAULT_DEPARTMENT = DEPARTMENTS[0];
/** Roles in the Create user dialog (as in the recording). */
export const DIALOG_ROLES = ["Member", "Admin", "Owner"];
/** Roles in the table's Role dropdown. */
export const ROW_ROLES = ["User", "Administrator", "Super Administrator"];

/** The password rules under the field. Each turns green when its test passes. */
export const PASSWORD_RULES: { id: string; label: string; test: (p: string) => boolean }[] = [
  { id: "length", label: "At least 8 characters", test: (p) => p.length >= 8 },
  { id: "upper", label: "One uppercase letter", test: (p) => /[A-Z]/.test(p) },
  { id: "lower", label: "One lowercase letter", test: (p) => /[a-z]/.test(p) },
  { id: "special", label: "One special character", test: (p) => /[^A-Za-z0-9]/.test(p) },
];

/** The row Actions menu, in the order of the recording. */
export const ROW_ACTIONS: { id: string; label: string; danger?: boolean; icon?: IconName; gap?: boolean }[] = [
  { id: "edit", label: "Edit Profile" },
  { id: "password", label: "Change Password" },
  { id: "deactivate", label: "Deactivate", danger: true, gap: true },
  { id: "delete", label: "Delete user", danger: true, icon: "trash" },
];

/** Screen copy that is not step-specific. */
export const COPY = {
  pageTitle: "Users",
  pageSubtitle: "Manage the people in your organization.",
  createEmail: "Create Email",
  createUser: "Create user",
  stats: { active: "Active Users", suspended: "Suspended Users", admins: "Administrators" },
  directory: "Users Directory",
  refresh: "Refresh",
  tabs: { active: "Active Users", suspended: "Suspended Users" },
  search: "Search users by name or email...",
  allDepartments: "All departments",
  allProducts: "All products",
  columns: { user: "User", email: "Email", role: "Role", status: "Status", products: "Products", lastActive: "Last active", actions: "Actions" },
  status: "Active",
  lastActive: "Never",
  rowsPerPage: "Rows per page",
  pageSize: 20,
  pageButtons: { previous: "Previous", next: "Next" },
  create: {
    title: "Create user",
    email: "Email",
    emailPlaceholder: "newuser@company.com",
    first: "First name",
    firstPlaceholder: "John",
    last: "Last name",
    lastPlaceholder: "Doe",
    username: "Username",
    usernamePlaceholder: "johndoe",
    job: "Job title",
    jobPlaceholder: "Engineer",
    department: "Department",
    employee: "Employee number",
    employeePlaceholder: "EMP-001",
    role: "Role",
    password: "Temporary password",
    passwordPlaceholder: "Minimum 8 characters",
    passwordHint: "Share this with the new user so they can sign in and change it.",
    optional: "(optional)",
    cancel: "Cancel",
    submit: "Create user",
    toast: (email: string) => `${email} created`,
  },
  product: {
    list: "ADD PRODUCT",
    remove: (name: string) => `Remove ${name}`,
    add: (name: string) => `Add ${name}`,
    added: (name: string, user: string) => `${name} added to ${user}`,
    removed: (name: string, user: string) => `${name} removed from ${user}`,
  },
  filters: {
    clear: "Clear filters",
    noResults: "No users match these filters.",
    roleChanged: (user: string, role: string) => `${user} is now ${role}`,
    moved: (user: string, dept: string) => `${user} moved to ${dept}`,
  },
};
