import type { IconName } from "@/components/icons";

/*
 * Copy, menus and sample content of Snaarp Sheets (the editor shell, the File menu and its dialogs).
 * Recording: ref/sheets/Snaarp_Sheets_file.mp4 (git-ignored). The recording shows real files, names and an e-mail address;
 * sample data is used instead. Edit here, not in the components.
 * Money is kept as numbers (pounds) and formatted through formatGBP; dates are DD/MM/YYYY and times use the 24-hour clock.
 */

export const SHEETS_URLS = {
  blank: "sheets.snaarp.com/sheet/untitled", // placeholder, the address in the recording is a real id
  budget: "sheets.snaarp.com/sheet/budget-draft", // placeholder
  renamed: "sheets.snaarp.com/sheet/acme-studio-q3-budget", // placeholder
  versions: "sheets.snaarp.com/sheet/acme-studio-q3-budget/history", // placeholder
};

/** Names a step starts with. */
export const SHEET = {
  untitled: "Untitled spreadsheet",
  draft: "Budget draft",
  budget: "Acme Studio – Q3 Budget",
  owner: "Alex Morgan",
  ownerShort: "me",
  tab: "Sheet1",
};

/** `fill` is a background colour, `formula` the text shown when View > Show > Formulas is on (the value stays in `text`). */
export type CellChip = { kind: "dropdown" | "people" | "date" | "place" | "file" | "finance" | "event"; label: string; tone?: string; sub?: string };
/**
 * `image` is a picture drawn inside the cell (its source stays in `formula` as the =IMAGE(...) the formula bar shows), `box` a
 * checkbox, `chip` a dropdown or smart chip, `link` the label of a link chip and `note` the text of a note (a small marker on the cell).
 */
export type Cell = string | { text: string; bold?: boolean; align?: "right"; fill?: string; formula?: string; image?: string; box?: "on" | "off"; chip?: CellChip; link?: string; note?: string };

/** Budget: columns Item | Owner | Cost | Status. Costs are numbers, shown with formatGBP. */
export const BUDGET_ROWS: { item: string; owner: string; cost: number; status: string }[] = [
  { item: "Design tools", owner: "Priya Shah", cost: 120, status: "Paid" },
  { item: "Cloud hosting", owner: "Alex Morgan", cost: 340, status: "Pending" },
  { item: "Stock photos", owner: "Jordan Lee", cost: 85, status: "Paid" },
  { item: "Team lunch", owner: "Sam Taylor", cost: 210, status: "Pending" },
];
export const BUDGET_HEADER = ["Item", "Owner", "Cost", "Status"];

/** The earlier version in Version history: two costs were different. */
export const EARLIER_COSTS = [100, 340, 65, 210];

/** Contacts: the sample file for Import. Phones are from Ofcom's reserved drama range. */
export const CONTACTS_FILE = { name: "acme-contacts.csv", size: "0.1 KB", tab: "acme-contacts" };
export const CONTACTS_HEADER = ["name", "email", "phone"];
export const CONTACTS_ROWS: string[][] = [
  ["Priya Shah", "priya.shah@example.com", "+44 7700 900123"],
  ["Jordan Lee", "jordan.lee@example.com", "+44 7700 900456"],
  ["Sam Taylor", "sam.taylor@example.com", "+44 7700 900789"],
];

export type SheetTab = { id: string; name: string };

export const COLUMN_COUNT = 18;
export const ROW_COUNT = 60;

export const HEADER = {
  lastEdit: "Last edit was seconds ago",
  share: "Share",
  menus: [
    { id: "file", label: "File" },
    { id: "edit", label: "Edit" },
    { id: "view", label: "View" },
    { id: "insert", label: "Insert" },
    { id: "format", label: "Format" },
    { id: "data", label: "Data" },
    { id: "tools", label: "Tools" },
    { id: "extensions", label: "Extensions" },
    { id: "help", label: "Help" },
  ],
  avatar: "AM",
  trashed: "In trash",
  offlineTip: "Available offline",
};

/* ---------------- File menu ---------------- */

export type FileSubId = "download" | "history";
export type FileItem = { id: string; label: string; icon: IconName; shortcut?: string; sub?: FileSubId; disabled?: boolean; toggle?: boolean };

/** Seven groups, as the separators in the recording show. */
export const FILE_MENU: FileItem[][] = [
  [
    { id: "new", label: "New", icon: "fmNew" },
    { id: "open", label: "Open", icon: "fmOpen", shortcut: "Ctrl+O" },
    { id: "import", label: "Import", icon: "shImport" },
  ],
  [{ id: "copy", label: "Make a copy", icon: "copy" }],
  [
    { id: "share", label: "Share", icon: "shShare" },
    { id: "email", label: "Email", icon: "fmEmail" },
    { id: "download", label: "Download", icon: "download", sub: "download" },
  ],
  [
    { id: "rename", label: "Rename", icon: "pencil" },
    { id: "move", label: "Move", icon: "fmMove" },
    { id: "shortcut", label: "Add shortcut to Drive", icon: "shShortcut" },
    { id: "trash", label: "Move to trash", icon: "trash" },
  ],
  [
    { id: "history", label: "Version history", icon: "clock", sub: "history" },
    { id: "offline", label: "Make available offline", icon: "shOffline", toggle: true },
  ],
  [
    { id: "details", label: "Details", icon: "fmInfo" },
    { id: "settings", label: "Settings", icon: "shGear", disabled: true },
  ],
  [{ id: "print", label: "Print", icon: "edPrint", shortcut: "Ctrl+P" }],
];

export const FILE_SUBS: Record<FileSubId, { id: string; label: string; ext?: string }[]> = {
  download: [
    { id: "xlsx", ext: "xlsx", label: "Microsoft Excel (.xlsx)" },
    { id: "csv", ext: "csv", label: "CSV (current sheet)" },
    { id: "tsv", ext: "tsv", label: "TSV (current sheet)" },
    { id: "txt", ext: "txt", label: "Plain Text (.txt)" },
    { id: "html", ext: "html", label: "HTML Table (.html)" },
    { id: "pdf", ext: "pdf", label: "PDF Document (.pdf)" },
  ],
  history: [
    { id: "name", label: "Name current version" },
    { id: "see", label: "See version history" },
  ],
};

/* ---------------- Open and Import ---------------- */

export type FileTabId = "recent" | "drive" | "shared" | "starred" | "computers" | "upload";

export const FILE_TABS: { id: FileTabId; label: string }[] = [
  { id: "recent", label: "Recent" },
  { id: "drive", label: "My Drive" },
  { id: "shared", label: "Shared with me" },
  { id: "starred", label: "Starred" },
  { id: "computers", label: "Computers" },
  { id: "upload", label: "Upload" },
];

export const OPEN_DIALOG = {
  openTitle: "Open a file",
  importTitle: "Import file",
  search: "Search in Drive or paste URL",
  recent: "Recent",
  driveHeading: "My Drive",
  groups: [
    { group: "Today", files: ["Acme Studio – Q3 Budget", "Budget draft"] },
    { group: "Older", files: ["Acme Studio – Q2 Budget", "Hosting costs 2026", "Client list"] },
  ],
  loading: "Loading…",
  starredHeading: "Starred files",
  starredEmpty: "No starred files in your drive.",
  unavailable: (tab: string) => `${tab} is not available yet.`,
  unavailableNote: "Use the Upload tab to select a file from your computer.",
  dropHere: "Drag a file here, or",
  browse: "browse",
  supported: ".xlsx, .xls, .ods, .csv, .tsv, .txt, .html, .htm, .xml · max 50 MB",
  different: "Choose a different file",
  chooser: "Choose a file",
  open: "Open",
  next: "Next",
  /** My Drive list: name, folder label and the two date lines. */
  driveFiles: [
    { name: "Acme Studio – Q3 Budget.xlsx", folder: "documents", size: "0.01 MB", created: "Created: 28/10/2026, 21:03", modified: "Modified: 28/10/2026, 21:03" },
    { name: "Budget draft.xlsx", folder: "documents", size: "0.01 MB", created: "Created: 28/10/2026, 20:41", modified: "Modified: 28/10/2026, 21:00" },
    { name: "Acme Studio – Q2 Budget.xlsx", folder: "documents", size: "0.02 MB", created: "Created: 04/09/2026, 11:12", modified: "Modified: 04/09/2026, 11:12" },
    { name: "Hosting costs 2026.xlsx", folder: "documents", size: "0.01 MB", created: "Created: 24/08/2026, 16:20", modified: "Modified: 24/08/2026, 16:20" },
    { name: "Client list.xlsx", folder: "documents", size: "0.01 MB", created: "Created: 16/09/2026, 09:05", modified: "Modified: 16/09/2026, 09:05" },
  ],
  opened: (name: string) => `Opened “${name}”`,
};

export const IMPORT_DIALOG = {
  title: "Import location",
  label: "Import location",
  options: [
    { id: "new", label: "Create new spreadsheet", note: "Import into a brand new spreadsheet" },
    { id: "insert", label: "Insert new sheet(s)", note: "Add as new tabs in the current workbook" },
    { id: "replace", label: "Replace current sheet", note: "Replace the active sheet with imported data" },
    { id: "append", label: "Append to current sheet", note: "Add rows to the bottom of the active sheet" },
  ],
  back: "Back",
  import: "Import",
  imported: (name: string) => `Imported “${name}”`,
};

/* ---------------- Copy, Share, Email ---------------- */

export const COPY_DIALOG = {
  title: "Copy document",
  name: "Name",
  copyOf: (title: string) => `Copy of ${title}`,
  folder: "Folder",
  drive: "My Drive",
  sameShare: "Share it with the same people",
  comments: "Copy comments",
  resolved: "Include resolved comments",
  cancel: "Cancel",
  make: "Make a copy",
  toast: "Copy created in My Drive",
};

export const SHARE_DIALOG = {
  title: (name: string) => `Share “${name}”`,
  add: "Add people, groups, spaces, and calendar events",
  people: "People with access",
  loading: "Loading…",
  general: "General access",
  restricted: { label: "Restricted", note: "Only people with access can open with the link" },
  anyone: { label: "Anyone with the link", note: "Anyone on the internet with the link can view" },
  person: { name: "Priya Shah", email: "priya.shah@example.com", role: "Editor" },
  owner: { name: SHEET.owner, email: "alex@example.com", role: "Owner" },
  suggest: "Priya Shah",
  copyLink: "Copy link",
  copied: "Link copied",
  done: "Done",
  settings: {
    title: (name: string) => `Settings for “${name}”`,
    access: "Access",
    editorsChange: "Allow editors to change permissions and share",
    learn: "Learn more about editors sharing settings",
    download: "People who can download, copy and print",
    editors: "Editors",
    viewers: "Commenters and viewers",
  },
};

export const EMAIL_DIALOG = {
  title: "Email this file",
  to: "To",
  sendCopy: "Send yourself a copy",
  subject: "Subject",
  message: "Message",
  fileType: "File type",
  types: ["PDF", "Microsoft Excel (.xlsx)", "CSV (.csv)", "HTML (.html)"],
  cancel: "Cancel",
  send: "Send",
  toast: "Email sent",
};

/* ---------------- Download, Rename, Move, Shortcut ---------------- */

export const DOWNLOAD = {
  starting: (label: string) => `Downloading ${label}…`,
  done: (name: string) => `${name} downloaded`,
};

export const RENAME_DIALOG = { title: "Rename workbook", name: "Name", cancel: "Cancel", rename: "Rename" };

export const LOCATE_TABS = [
  { id: "suggested", label: "Suggested" },
  { id: "starred", label: "Starred" },
  { id: "all", label: "All locations" },
] as const;
export type LocateTabId = (typeof LOCATE_TABS)[number]["id"];

export const LOCATE = {
  moveTitle: (name: string) => `Move “${name}”`,
  shortcutTitle: "Add shortcut to Drive",
  shortcutNote: (name: string) => `Choose where to add a shortcut to “${name}”`,
  current: "Current location:",
  currentName: "My Drive",
  suggested: "Connect your drive to see suggested folders.",
  starredEmpty: "No starred items. Star files or folders to see them here.",
  hint: "Select a location to show the folder path",
  all: [
    { id: "drive", label: "My Drive", icon: "shFolderOutline" as IconName },
    { id: "shared-drives", label: "Shared drives", icon: "shSharedDrive" as IconName },
    { id: "computers", label: "Computers", icon: "shComputer" as IconName },
    { id: "shared-with-me", label: "Shared with me", icon: "users" as IconName },
  ],
  cancel: "Cancel",
  move: "Move",
  addShortcut: "Add shortcut",
  movedToast: "Moved to My Drive",
  shortcutToast: "Shortcut added to My Drive",
};

/* ---------------- Trash, offline, versions, details, print ---------------- */

export const TRASH = { toast: "Moved to trash", undo: "Undo", restored: "Restored from trash" };
export const OFFLINE = { toast: "Available offline" };

export const NAME_VERSION = { title: "Name current version", label: "Version name", placeholder: "Name this version", cancel: "Cancel", save: "Save", toast: "Version named" };

export type VersionRow = { id: string; group: string; name?: string; time: string; current?: boolean; author: string; changes: number; earlier?: boolean };
export const VERSIONS = {
  panelTitle: "Version history",
  currentLabel: "Current version",
  showChanges: "Show changes",
  changes: (n: number) => (n === 1 ? "1 change" : `${n} changes`),
  /** Newest first. The current one gets the name typed in the Name current version dialog (or "Final budget" if none). */
  rows: [
    { id: "v1", group: "Today", name: "Final budget", time: "Today, 21:42", current: true, author: SHEET.owner, changes: 0 },
    { id: "v2", group: "Today", time: "Today, 14:10", author: "Priya Shah", changes: 2, earlier: true },
  ] satisfies VersionRow[],
};

export const DETAILS = {
  title: "FILE DETAILS",
  rows: [
    { label: "Type", value: "Snaarp Sheets", link: false },
    { label: "Size", value: "12 KB", link: false },
    { label: "Storage used", value: "12 KB", link: false },
    { label: "Location", value: "My Drive", link: true },
    { label: "Owner", value: SHEET.ownerShort, link: false },
    { label: "Modified", value: "28/10/2026 by me", link: false },
    { label: "Opened", value: "21:43 by me", link: false },
    { label: "Created", value: "28/10/2026", link: false },
  ],
  description: "DESCRIPTION",
  add: "Add a description",
  sample: "Quarterly budget for Acme Studio",
};

export const PRINT = {
  title: "Print",
  sheets: "1 sheet of paper",
  destination: "Destination",
  destinationValue: "Save as PDF",
  pages: "Pages",
  pagesValue: "All",
  layout: "Layout",
  layouts: ["Portrait", "Landscape"],
  color: "Color",
  colorValue: "Color",
  more: "More settings",
  print: "Print",
  cancel: "Cancel",
  toast: "Sent to print",
};

export const TOAST = { downloaded: "Downloaded" };

/** Toolbar glyph hints (draw only; nothing here is interactive). */
export const TOOLBAR = { zoom: "100%", font: "Arial", size: "10", format123: "123" };
