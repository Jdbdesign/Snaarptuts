import { NEW_USER, PRODUCTS } from "./admin-data";

/*
 * Snaarp Admin, steps 5-12: the sample organisation (Acme Studio) behind the Users page and the Organization
 * page. 44 members: 38 active + 6 suspended, 9 of them administrators (as in ref/admin/v179.mp4, which shows
 * 38 / 6 / 9 and "44 users total"). All names and emails are samples.
 */

export type Role = "User" | "Administrator" | "Super Administrator";

export type Person = {
  id: string;
  name: string;
  email: string;
  role: Role;
  /** Department name, or "" for none (shown as a dash). */
  dept: string;
  suspended: boolean;
  products: string[];
};

export type Department = { id: string; name: string; description: string; color: string };

/** Colour dots of the New Department dialog, in the recording's order. */
export const DEPT_COLORS = ["#6366F1", "#8B5CF6", "#3B82F6", "#10B981", "#F59E0B", "#EF4444", "#EC4899", "#14B8A6"];

/** The four departments of the recording. Sales is empty. */
export const START_DEPARTMENTS: Department[] = [
  { id: "engineering", name: "Engineering", description: "", color: "#8B5CF6" },
  { id: "hr", name: "HR", description: "", color: "#F59E0B" },
  { id: "human-resources", name: "Human Resources", description: "", color: "#EC4899" },
  { id: "sales", name: "Sales", description: "", color: "#22A06B" },
];

export const NEW_DEPARTMENT = { name: "Design", description: "Product and brand design", color: DEPT_COLORS[2] };

const NAMES = [
  "Jane Doe", "Alex Morgan", "Priya Shah", "Tom Reed", "Lena Fox", "Mia Ward", "Noah King", "Elena Rossi", "Marcus Webb",
  "Hannah Lowe", "Ravi Menon", "Chloe Martin", "Daniel Ng", "Aisha Khan", "Oscar Lind", "Jonas Weber", "Lucy Hart",
  "Samir Patel", "Grace Adeyemi", "Leo Barnes", "Nina Volkov", "Ben Taylor", "Isla Murray", "Yusuf Ali", "Freya Collins",
  "Omar Haddad", "Ella Brooks", "Kai Nakamura", "Zoe Bennett", "Ivan Petrov", "Maya Singh", "Finn Gallagher", "Rosa Alvarez",
  "Hugo Laurent", "Anna Kowalski", "Theo Grant", "Sara Lindqvist", "Dev Kapoor", "Holly Quinn", "Jack Ellis", "Nora Fischer",
  "Luca Moretti", "Ada Okoye", "Ruby Hayes",
];
const SUSPENDED = [3, 12, 17, 21, 30, 41];
const ADMINS = [0, 1, 5, 10, 15, 19, 24, 33, 40];
const COUNTS = [5, 12, 9, 1, 4, 6, 3, 8, 16, 2, 7, 10, 14, 0];

const slug = (name: string) => name.toLowerCase().replace(/[^a-z]+/g, ".");

/** Rotating slice of the product list, so the counts vary but every list is real. */
function productSlice(i: number, n: number) {
  return Array.from({ length: n }, (_, k) => PRODUCTS[(i + k) % PRODUCTS.length].id);
}

function dept(i: number) {
  if (i < 10) return "Engineering";
  if (i < 19) return "HR";
  if (i < 24) return "Human Resources";
  return "";
}

/** The person each product step uses. Priya has no Snaarp Books (step 7 adds it), Alex has it (step 8 removes it). */
export const ADD_PRODUCT_USER = "priya";
export const REMOVE_PRODUCT_USER = "alex";
export const PRODUCT_TO_ADD = "books";
export const PRODUCT_TO_REMOVE = "books";
const SPECIAL: Record<string, string[]> = {
  priya: ["mail", "pdf", "drive", "key", "crm", "sheet"],
  alex: ["mail", "pdf", "drive", "books", "docs", "slides"],
};

export const PEOPLE: Person[] = NAMES.map((name, i) => {
  const id = slug(name).split(".")[0];
  return {
    id,
    name,
    email: `${id}@acme-studio.com`,
    role: ADMINS.includes(i) ? "Administrator" : "User",
    dept: dept(i),
    suspended: SUSPENDED.includes(i),
    products: SPECIAL[id] ?? productSlice(i * 3, COUNTS[i % COUNTS.length]),
  };
});

/** Sam, once step 4 has created them. Only the first four steps show this state. */
export const SAM: Person = {
  id: NEW_USER.id,
  name: `${NEW_USER.first} ${NEW_USER.last}`,
  email: NEW_USER.email,
  role: "User",
  dept: "",
  suspended: false,
  products: ["mail", "pdf", "drive", "key"],
};

export const initials = (name: string) => name.split(" ").map((w) => w[0]).join("").slice(0, 2).toUpperCase();

/** Avatar tints (soft backgrounds with matching text), picked by the person's position. */
const TINTS = ["#8B5CF6", "#F59E0B", "#3B82F6", "#10B981", "#EC4899", "#14B8A6", "#EF4444", "#6366F1"];
export const tint = (id: string) => TINTS[[...id].reduce((a, c) => a + c.charCodeAt(0), 0) % TINTS.length];

/** "Snaarp Mail" for one product, "No products" for none, otherwise "5 products". */
export function productCount(ids: string[]) {
  if (ids.length === 0) return "No products";
  if (ids.length === 1) return PRODUCTS.find((p) => p.id === ids[0])!.name;
  return `${ids.length} products`;
}

/** Copy of the Bulk user dialog, the Organization page and the New Department dialog. */
export const PEOPLE_COPY = {
  bulkUser: "Bulk user",
  bulk: {
    title: "Bulk users",
    subtitle: "Create up to 500 users at once. Upload a CSV, then review and submit.",
    template: "CSV template",
    uploadTitle: "Upload a CSV file",
    uploadHelp: "Drag & drop or choose a file. Columns: email, password, role, firstName, lastName, username, jobTitle, department, employeeNumber.",
    choose: "Choose file",
    notSure: "Not sure of the format?",
    sampleLink: "Download the sample template",
    notSureEnd: ", fill in your users, then upload it here.",
    review: (n: number) => `Review & edit (${n})`,
    ready: (n: number) => `${n} ready`,
    needFixing: (n: number) => `${n} need fixing`,
    addRow: "Add row",
    clear: "Clear",
    empty: "No rows yet. Upload a CSV or add one manually.",
    willSubmit: (n: number) => `${n} valid ${n === 1 ? "row" : "rows"} will be submitted`,
    close: "Close",
    create: (n: number) => `Create ${n} ${n === 1 ? "user" : "users"}`,
    emailRequired: "Email is required.",
    ok: "Ready",
    columns: ["Status", "Email *", "Password *", "First name", "Last name", "Username", "Job title", "Department", "Employee #", "Role", ""],
    placeholders: ["user@company.com", "Secret1231", "John", "Doe", "johndoe", "Engineer", "Engineering", "EMP-001"],
    roles: ["Member", "Admin", "Owner"],
    templateToast: "Template downloaded: acme-team-template.csv",
    uploadedToast: (file: string, n: number) => `${file} read: ${n} rows`,
    createdToast: (n: number) => `${n} users created`,
  },
  org: {
    title: "Organization",
    subtitle: "Everyone in your organization, grouped by department.",
    refresh: "Refresh",
    filter: "Filter",
    newDepartment: "New Department",
    allMembers: "All members",
    allTitle: "All Organization Members",
    total: (n: number) => `${n} users total`,
    inDept: (n: number) => `${n} ${n === 1 ? "user" : "users"} in this department`,
    searchMembers: "Search members...",
    sort: "Sort: Name",
    columns: ["Name", "Email", "Role", "Department", "Status", "Last Active"],
    empty: "No members in this view",
    suspended: "Suspended",
    active: "Active",
    moveTo: "Move to department",
    deptToast: (name: string) => `Department "${name}" created`,
  },
  newDept: {
    title: "New Department",
    name: "Name *",
    namePlaceholder: "e.g. Engineering",
    description: "Description",
    descriptionPlaceholder: "Brief description",
    color: "Color",
    cancel: "Cancel",
    create: "Create",
  },
  bulkRows: {
    // acme-team.csv: three good rows
    file: "acme-team.csv",
    sampleFile: "acme-team-template.csv",
  },
};

export type BulkRow = {
  id: string;
  email: string;
  password: string;
  first: string;
  last: string;
  username: string;
  job: string;
  dept: string;
  employee: string;
  role: string;
};

/** What the sample file acme-team.csv holds. The third row has no email: it is the row that needs fixing. */
export const CSV_ROWS: BulkRow[] = [
  { id: "r1", email: "ines.duarte@acme-studio.com", password: "Welcome#2026", first: "Ines", last: "Duarte", username: "ines", job: "Designer", dept: "Design", employee: "EMP-201", role: "Member" },
  { id: "r2", email: "felix.baumann@acme-studio.com", password: "Welcome#2026", first: "Felix", last: "Baumann", username: "felix", job: "Engineer", dept: "Engineering", employee: "EMP-202", role: "Member" },
  { id: "r3", email: "", password: "Welcome#2026", first: "Tessa", last: "Clarke", username: "tessa", job: "Account Manager", dept: "Sales", employee: "EMP-203", role: "Member" },
];
/** Typed into the row that needs fixing. */
export const FIX_EMAIL = "tessa.clarke@acme-studio.com";
/** The row added by hand. */
export const MANUAL_ROW: Omit<BulkRow, "id"> = {
  email: "owen.pike@acme-studio.com", password: "Welcome#2026", first: "Owen", last: "Pike", username: "owen", job: "Producer", dept: "Operations", employee: "EMP-204", role: "Member",
};

export const bulkProblem = (r: BulkRow) => (r.email.trim() ? "" : PEOPLE_COPY.bulk.emailRequired);

/** The new users once created, in the order they are added (they appear first in the table). */
export const toPerson = (r: BulkRow): Person => ({
  id: r.username || r.email.split("@")[0],
  name: `${r.first} ${r.last}`,
  email: r.email,
  role: "User",
  dept: "",
  suspended: false,
  products: ["mail"],
});
