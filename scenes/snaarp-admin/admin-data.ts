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
export const COUNTS = { before: 40, after: 41, suspended: 1, admins: 9 };

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
  { id: "products", label: "Manage Products" },
  { id: "password", label: "Change Password" },
  { id: "deactivate", label: "Deactivate", danger: true, gap: true },
  { id: "delete", label: "Delete user", danger: true, icon: "trash" },
];

/** The 20 people on page 1 before the new user exists (sample names). */
export const DIRECTORY_USERS: { id: string; name: string; email: string; role: string; products: number | string }[] = [
  { id: "d1", name: "Priya Shah", email: "priya@acme-studio.com", role: "Administrator", products: 5 },
  { id: "d2", name: "Marcus Webb", email: "marcus@acme-studio.com", role: "Administrator", products: 12 },
  { id: "d3", name: "Elena Rossi", email: "elena@acme-studio.com", role: "User", products: 9 },
  { id: "d4", name: "Tom Okafor", email: "tom@acme-studio.com", role: "User", products: "Snaarp Mail" },
  { id: "d5", name: "Hannah Lowe", email: "hannah@acme-studio.com", role: "User", products: 4 },
  { id: "d6", name: "Ravi Menon", email: "ravi@acme-studio.com", role: "User", products: 6 },
  { id: "d7", name: "Chloe Martin", email: "chloe@acme-studio.com", role: "User", products: 3 },
  { id: "d8", name: "Daniel Ng", email: "daniel@acme-studio.com", role: "Administrator", products: 8 },
  { id: "d9", name: "Aisha Khan", email: "aisha@acme-studio.com", role: "User", products: 4 },
  { id: "d10", name: "Oscar Lind", email: "oscar@acme-studio.com", role: "User", products: 2 },
  { id: "d11", name: "Mia Fontaine", email: "mia@acme-studio.com", role: "User", products: 5 },
  { id: "d12", name: "Jonas Weber", email: "jonas@acme-studio.com", role: "User", products: 7 },
  { id: "d13", name: "Lucy Hart", email: "lucy@acme-studio.com", role: "User", products: 4 },
  { id: "d14", name: "Samir Patel", email: "samir@acme-studio.com", role: "User", products: 3 },
  { id: "d15", name: "Grace Adeyemi", email: "grace@acme-studio.com", role: "User", products: 6 },
  { id: "d16", name: "Leo Barnes", email: "leo@acme-studio.com", role: "User", products: 4 },
  { id: "d17", name: "Nina Volkov", email: "nina@acme-studio.com", role: "User", products: 9 },
  { id: "d18", name: "Ben Taylor", email: "ben@acme-studio.com", role: "User", products: 5 },
  { id: "d19", name: "Isla Murray", email: "isla@acme-studio.com", role: "User", products: 4 },
  { id: "d20", name: "Yusuf Ali", email: "yusuf@acme-studio.com", role: "User", products: 2 },
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
  manage: {
    title: "Manage Products",
    heading: (name: string) => `${name}'s products`,
    granted: (date: string) => `Granted ${date}`,
    makeAdmin: "Make admin",
    remove: "Remove",
    note: "promotes the user to admin for that product only. It takes effect on their next login or token refresh.",
    addTitle: "Add products",
    select: "Select a product...",
    search: "Search products...",
    noMatch: "No products found",
    add: "Add",
    hint: "Choose a product the user doesn't already have.",
    toast: "Added 1 product",
  },
};
