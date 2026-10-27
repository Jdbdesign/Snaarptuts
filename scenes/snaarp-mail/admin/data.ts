import { MENU_ITEMS } from "@/components/admin/admin-data";

/*
 * Snaarp Mail admin, steps 10-17: the email administration (admin.snaarp.com/admin/...) in the owner portal shell.
 * Recordings: ref/admin/v306.mp4 (overview), v211.mp4 (detail), v33.mp4 (Create New Group). Sample data only.
 */

export const URL_ADMIN_USERS = "admin.snaarp.com/admin/users";
export const URL_ADMIN_GROUPS = "admin.snaarp.com/admin/groups";
export const URL_ADMIN_FORWARDING = "admin.snaarp.com/admin/email-forwarding";
export const URL_MAILBOX = "mail.snaarp.com/inbox";
export const DOMAIN = "acme-studio.com";

/** Sidebar of the email admin: the portal menu plus Migration (as in the recordings). */
export const MAIL_MENU: typeof MENU_ITEMS = [
  ...MENU_ITEMS.slice(0, MENU_ITEMS.findIndex((m) => m.id === "subscription")),
  { id: "migration", label: "Migration", icon: "refresh" },
  ...MENU_ITEMS.slice(MENU_ITEMS.findIndex((m) => m.id === "subscription")),
];

export const DEPT_STYLE: Record<string, { bg: string; fg: string }> = {
  Engineering: { bg: "#EDE4FD", fg: "#7C3AED" },
  HR: { bg: "#FFF1D6", fg: "#D97706" },
  "Human Resources": { bg: "#FDE4EE", fg: "#DB2777" },
  Sales: { bg: "#DDF5E8", fg: "#1B7F4B" },
};
export const DEPARTMENTS = ["Engineering", "HR", "Human Resources", "Sales"];

export type MUser = {
  id: string;
  name: string;
  email: string;
  dept: string;
  storage: string;
  last: string;
  aliases: string[];
  signature: string;
};

const person = (name: string, dept: string, storage: string, last: string): MUser => {
  const id = name.split(" ")[0].toLowerCase();
  return { id, name, email: `${id}@${DOMAIN}`, dept, storage, last, aliases: [], signature: "" };
};

/** 14 active users, sorted A-Z as in the recording (Sort by Name). */
export const MAIL_USERS: MUser[] = [
  person("Alex Morgan", "Engineering", "29.0 MB", "21/10/2026"),
  person("Chloe Martin", "Engineering", "305.0 MB", "30 minutes ago"),
  person("Daniel Ng", "Engineering", "157.0 MB", "1 day ago"),
  person("Elena Rossi", "Human Resources", "87.0 MB", "12/10/2026"),
  person("Hannah Lowe", "HR", "2.4 GB", "6 hours ago"),
  person("Jane Doe", "Engineering", "15.0 MB", "12/10/2026"),
  person("Lena Fox", "Engineering", "38.0 MB", "21/10/2026"),
  person("Marcus Webb", "Engineering", "305.0 MB", "06/10/2026"),
  person("Mia Ward", "Engineering", "4.0 MB", "21 hours ago"),
  person("Noah King", "Sales", "195.0 MB", "19 hours ago"),
  person("Priya Shah", "Engineering", "72.0 MB", "1 hour ago"),
  person("Ravi Menon", "", "4.0 MB", "1 day ago"),
  person("Sam Carter", "Human Resources", "7.9 GB", "6 hours ago"),
  person("Tom Reed", "Engineering", "573.0 MB", "22/10/2026"),
];

/** What acme-users.csv adds in step 10. */
export const CSV_USERS: MUser[] = [
  { ...person("Ines Duarte", "", "0.0 MB", "Never") },
  { ...person("Felix Baumann", "", "0.0 MB", "Never") },
  { ...person("Tessa Clarke", "", "0.0 MB", "Never") },
];

export const STATS = { active: 14, inactive: 10, admins: 0, storage: "12.1 GB" };

export const COPY = {
  title: "User Management",
  bulkSignature: "Bulk Signature",
  bulkUpload: "Bulk User Upload",
  addUser: "Add User",
  filters: [
    ["Department", "All members"],
    ["Role", "All Roles"],
    ["Domains", DOMAIN],
    ["Sort by", "Name (A-Z)"],
  ] as const,
  directory: "Users Directory",
  tabs: { active: "Active Users", suspended: "Suspended Users" },
  search: "Search users by name or email...",
  columns: ["User", "Email", "Department", "Status", "Storage", "Last active", "Actions"],
  stats: ["Active Users", "Inactive Users", "Administrators", "Total Storage Used"],
  rowMenu: [
    { id: "details", label: "View Details" },
    { id: "edit", label: "Edit" },
    { id: "password", label: "Update Password" },
    { id: "permissions", label: "Manage Permissions" },
    { id: "aliases", label: "Aliases" },
    { id: "signature", label: "Manage Signature" },
    { id: "suspend", label: "Suspend User", danger: true },
    { id: "delete", label: "Delete", danger: true },
  ],
  moveToDept: "Move to Dept",
  moved: (name: string, dept: string) => `${name} moved to ${dept}`,
};

export const BULK_UPLOAD = {
  title: "Bulk Upload Users",
  subtitle: "Upload a CSV file to create multiple inboxes at once",
  template: "Download Template",
  templateToast: "Template downloaded: acme-users-template.csv",
  drop: "Drag & drop your CSV file here or",
  browse: "Browse Files",
  file: "acme-users.csv",
  fileInfo: (n: number) => `${n} users found`,
  formatTitle: "CSV Format Requirements",
  formatIntro: "Your CSV file must include the following columns:",
  required: "Required",
  columns: [
    { name: "firstName", help: "The user's first name", example: "Example: John" },
    { name: "lastName", help: "The user's last name", example: "Example: Doe" },
    { name: "email", help: "The user's full email address", example: `Example: john.doe@${DOMAIN}` },
    { name: "password", help: "Password for the inbox (minimum 15 characters)", example: "Example: SecurePass123456" },
  ],
  notesTitle: "Important Notes:",
  notes: [
    "Email addresses must use a domain belonging to your organization",
    "The email username can contain dots, hyphens, and underscores",
    "Passwords must be at least 15 characters long",
    "Duplicate inboxes will be skipped with an error message",
  ],
  tip: "Tip: Make sure your CSV file uses comma separators and includes column headers in the first row.",
  cancel: "Cancel",
  upload: "Upload Users",
  done: (n: number) => `${n} users created`,
};

export const BULK_SIGNATURE = {
  title: "Bulk Signature Update",
  subtitle: "Apply the same signature to multiple inboxes",
  select: (n: number, total: number) => `Select Users (${n}/${total})`,
  deselectAll: "Deselect all",
  selectAll: "Select all",
  signature: "Signature",
  placeholder: "Enter signature to apply to all selected users...",
  size: "Size",
  insertImage: "Insert Image URL",
  mobile: "Mobile Signature (plain text)",
  mobilePlaceholder: "Plain text signature for mobile...",
  apply: ["New emails", "Replies", "Forwards"],
  cancel: "Cancel",
  applyTo: (n: number) => `Apply to ${n} ${n === 1 ? "User" : "Users"}`,
  sample: `Jane Doe, Acme Studio, jane@${DOMAIN}`,
  toast: (n: number) => `Signature applied to ${n} users`,
};

export const ALIASES = {
  title: (name: string) => `Manage Aliases — ${name}`,
  tabs: { list: (n: number) => `Aliases (${n})`, add: "Add Alias", bulk: "Bulk Upload" },
  configured: (n: number) => `${n} ${n === 1 ? "alias" : "aliases"} configured`,
  empty: "No aliases configured for this user",
  addFirst: "Add First Alias",
  refresh: "Refresh",
  selectAll: "SELECT ALL",
  label: "Email alias",
  placeholder: "alias",
  back: "Back",
  add: "Add Alias",
  sample: "hello",
  addedToast: (alias: string) => `Alias ${alias} added`,
  bulk: {
    howTitle: "How to use bulk upload:",
    steps: ["1. Download the CSV template", "2. Fill in the inboxEmail and aliasEmail columns", "3. Upload the completed CSV file"],
    template: "Download CSV Template",
    uploadLabel: "Upload CSV File",
    choose: "Choose CSV file",
    file: "acme-aliases.csv",
    cancel: "Cancel",
    process: "Upload & Process",
    toast: (n: number) => `${n} aliases added`,
  },
};
/** acme-aliases.csv: three aliases for three people. */
export const CSV_ALIASES: { userId: string; alias: string }[] = [
  { userId: "priya", alias: "design" },
  { userId: "sam", alias: "billing" },
  { userId: "tom", alias: "jobs" },
];

export const SIGNATURE = {
  title: "Manage Signature",
  subtitle: (name: string, email: string) => `Set email signature for ${name} (${email})`,
  html: "HTML Signature",
  placeholder: "Enter signature...",
  insertImage: "Insert Image URL",
  mobile: "Mobile Signature (plain text)",
  mobilePlaceholder: "Plain text signature for mobile...",
  applyTo: "Apply signature to",
  apply: ["New emails", "Replies", "Forwards"],
  preview: "Preview",
  none: "No signature set",
  clear: "Clear Signature",
  cancel: "Cancel",
  save: "Save Signature",
  sample: (name: string) => `${name}, Acme Studio`,
  toast: "Signature saved",
};

export type Group = { id: string; name: string; description: string; email: string; type: string; visibility: string; members: string[] };

export const GROUPS = {
  title: "Group Management",
  subtitle: "Manage distribution lists, shared mailboxes, and security groups",
  bulkImport: "Bulk Import",
  create: "Create Group",
  stats: ["Distribution Lists", "Shared Mailboxes", "Active Groups", "Public Groups"],
  search: "Search groups...",
  filters: ["All Types", "All Statuses", "All Visibility"],
  count: (shown: number, total: number) => `${shown} of ${total} groups`,
  export: "Export",
  refresh: "Refresh",
  columns: ["Group", "Type", "Members", "Visibility", "Last Active", "Actions"],
  empty: "No groups found",
  name: "Support",
  description: "Support for tickets",
  email: `support@${DOMAIN}`,
  toast: (name: string) => `Group ${name} created`,
};

export const WIZARD = {
  title: "Create New Group",
  subtitle: "Set up a new group for your organization",
  steps: [
    { title: "Basic Information", help: "Enter the group name and description" },
    { title: "Primary Inbox", help: "Choose the inbox whose address the whole group will send mail as. You'll add the other members after the group is created." },
    { title: "Group Settings", help: "Configure group type and permissions" },
  ],
  name: "Group Name *",
  namePlaceholder: "Engineering Team",
  description: "Description *",
  descriptionPlaceholder: "Describe the purpose of this group...",
  inbox: "Primary Inbox *",
  inboxPlaceholder: "Select an inbox",
  inboxHelp: (email: string) => `The group sends mail as ${email}. Members you add later will be able to send as this address.`,
  type: "Group Type *",
  types: [
    { id: "Distribution List", help: "Send emails to multiple recipients at once" },
    { id: "Shared Mailbox", help: "Shared email account accessible by multiple users" },
    { id: "Security Group", help: "Control access to resources and permissions" },
  ],
  visibility: "Visibility *",
  visibilityValue: "Public - Visible to all",
  quota: "Storage Quota (MB)",
  quotaValue: "1000",
  back: "Back",
  cancel: "Cancel",
  next: "Next",
  createGroup: "Create Group",
};
/** Inboxes in the Primary Inbox list (support@ is the one chosen). */
export const INBOXES = [`alex@${DOMAIN}`, `hello@${DOMAIN}`, `hr@${DOMAIN}`, `sales@${DOMAIN}`, `support@${DOMAIN}`, `team@${DOMAIN}`];

export const GROUP_PAGE = {
  back: "Back",
  refresh: "Refresh",
  edit: "Edit",
  addMembers: "Add Members",
  stats: ["Members", "Emails Sent", "Last Activity", "Storage Used"],
  tabs: ["Overview", "Members", "Activity", "Settings"],
  info: "Group Information",
  fields: ["Type", "Status", "Visibility", "Created", "Primary Email"],
  active: "Active",
  created: "Today at 16:45",
  recent: "Recent Members",
  viewAll: "View All",
  member: "Member",
  never: "Never",
  addTitle: "Add Members",
  addHelp: "Choose the people who can send and receive as this group.",
  addCancel: "Cancel",
  add: (n: number) => `Add ${n} ${n === 1 ? "member" : "members"}`,
  addedToast: (n: number) => `${n} members added to Support`,
  pick: ["jane", "alex", "sam", "priya"],
};

export const MAILBOX = {
  compose: "Compose",
  nav: ["Inbox", "Starred", "Snoozed", "Sent", "Drafts", "All Mail", "Spam", "Trash"],
  searchPlaceholder: "Search in inbox",
  newMessage: "New Message",
  from: "From",
  to: "To",
  subject: "Subject",
  subjectSample: "Your ticket has been received",
  send: "Send",
  fromOwn: `Jane Doe <jane@${DOMAIN}>`,
  fromGroup: `Support <support@${DOMAIN}>`,
  messages: [
    ["Priya Shah", "Design review notes", "Thanks for joining the call, here are the notes."],
    ["Acme Billing", "Invoice for October", "Your invoice is attached."],
    ["Tom Reed", "Re: Launch checklist", "I have ticked off the first four items."],
    ["Alex Morgan", "Welcome to the team", "Glad to have you on board."],
    ["Lena Fox", "Question about the brief", "Can we move the call to Thursday?"],
  ],
};

export const FORWARDING = {
  title: "Email Forwarding",
  subtitle: "Manage email monitoring and forwarding for user inboxes",
  about: "About Email Forwarding",
  aboutText: "Email forwarding allows a supervisor to automatically receive copies of all emails sent to and from a user's inbox. The original emails remain in the user's inbox.",
  aboutList: [
    "Used for compliance, training or oversight purposes",
    "Supervisor receives exact copies via BCC",
    "Only one supervisor per inbox",
    "Can be enabled or disabled at any time",
  ],
  select: "Select Users",
  department: "Department",
  allMembers: "All members",
  search: "Search users...",
  selectAll: "Select All",
  clear: "Clear",
  selected: (n: number) => `${n} selected`,
  config: "Forwarding Configuration",
  empty: "Select one or more users to configure email monitoring",
  emptyHelp: "Use checkboxes to select multiple users",
  selectedUsers: (n: number) => `Selected Users (${n})`,
  enableAll: "Enable Forwarding for All Selected Users",
  supervisor: "Select Supervisor",
  supervisorPlaceholder: "Choose a supervisor to monitor these inboxes",
  supervisorHelp: "The supervisor will receive copies of all emails for the selected inboxes",
  enable: (n: number) => `Enable Forwarding for ${n} User(s)`,
  monitoring: (n: number) => `Currently monitoring ${n} inbox(es)`,
  status: "Forwarding Status",
  statusOn: "Enabled",
  statusOff: "Disabled",
  toast: (n: number, sup: string) => `Forwarding enabled for ${n} users, supervised by ${sup}`,
  pickUsers: ["mia", "noah"],
  supervisorPick: "jane",
};

export const CAPTIONS = {
  // 10
  bulkOpen: "Click Bulk User Upload",
  template: "Click Download Template",
  read: "Read the CSV format requirements",
  browse: "Click Browse Files and pick acme-users.csv",
  upload: "Click Upload Users",
  uploaded: "The new users are in the directory",
  // 11
  sigOpen: "Click Bulk Signature",
  sigType: "Type the signature",
  sigUntick: "Untick the people who should not get it",
  sigApply: "Click Apply to 12 Users",
  // 12
  menuOpen: "Open the three dots on the user's row",
  aliasesItem: "Choose Aliases",
  addFirst: "Click Add First Alias",
  aliasType: "Type the alias and keep @acme-studio.com",
  aliasAdd: "Click Add Alias",
  aliasDone: "The alias is listed under Aliases (1)",
  // 13
  bulkTab: "Open the Bulk Upload tab",
  howTo: "Follow the three steps in the blue box",
  aliasTemplate: "Click Download CSV Template",
  aliasChoose: "Click Choose CSV file and pick acme-aliases.csv",
  aliasProcess: "Click Upload & Process",
  aliasesAdded: "The aliases are now on the users",
  // 14
  sigMenu: "Open the three dots, then choose Manage Signature",
  sigTypeOne: "Type the signature",
  sigPreview: "The preview updates as you type",
  sigSave: "Click Save Signature",
  // 15
  groupsMenu: "Click Groups",
  createGroup: "Click Create Group",
  groupName: "Type the group name and description",
  next: "Click Next",
  inbox: "Choose support@acme-studio.com as the Primary Inbox",
  settings: "Choose the group type and visibility",
  createIt: "Click Create Group",
  openGroup: "Click the new group to open it",
  // 16
  addMembers: "Click Add Members",
  pickMembers: "Tick Jane, Alex, Sam and Priya",
  confirmAdd: "Click Add 4 members",
  recent: "The members appear under Recent Members",
  mailbox: "Members can now send mail as the group",
  composeFrom: "Open the From list and choose the group address",
  // 17
  forwardingMenu: "Click Email Forwarding",
  about: "Open About Email Forwarding to read how it works",
  tick: "Tick the two users",
  supervisor: "Choose a supervisor",
  enable: "Click Enable Forwarding for 2 User(s)",
  status: "Forwarding is now enabled",
};
