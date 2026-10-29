import type { MenuRow } from "./edit-view-data";

/*
 * Copy, menus and sample content of the Snaarp Sheets Format, Data, Tools, Extensions and Help menus (steps 56-84).
 * Recording: ref/sheets/Snaarp_Sheets_format_data_tools_help.mp4 (git-ignored). Labels, order, groups and shortcut glyphs are read from it;
 * the recording's real data (domains, user names) is replaced by the Acme Studio budget. Edit here, not in the components.
 */

const NA = "Not available yet";

export const FORMAT_MENU: MenuRow[][] = [
  [
    { id: "fmt-theme", label: "Theme", icon: "edHighlight", sub: "fmt-theme", disabled: true, tip: NA },
    { id: "fmt-number", label: "Number", icon: "fmHash", sub: "number" },
  ],
  [
    { id: "fmt-bold", label: "Bold", icon: "edBold", shortcut: "⌘B", ctrl: "Ctrl+B" },
    { id: "fmt-italic", label: "Italic", icon: "edItalic", shortcut: "⌘I", ctrl: "Ctrl+I" },
    { id: "fmt-underline", label: "Underline", icon: "edUnderline", shortcut: "⌘U", ctrl: "Ctrl+U" },
    { id: "fmt-strike", label: "Strikethrough", icon: "edStrike", shortcut: "⌥⇧5", ctrl: "Alt+Shift+5" },
  ],
  [
    { id: "fmt-fontsize", label: "Font size", icon: "fmText", sub: "fontsize" },
    { id: "fmt-align", label: "Alignment", icon: "edAlignL", sub: "align" },
    { id: "fmt-wrap", label: "Wrapping", icon: "shWrap", sub: "wrapping" },
    { id: "fmt-rotate", label: "Rotation", icon: "shRotate", sub: "rotation" },
  ],
  [
    { id: "fmt-cond", label: "Conditional formatting", icon: "edPaintFormat", disabled: true, tip: NA },
    { id: "fmt-alt", label: "Alternating colors", icon: "shGrid", disabled: true, tip: NA },
  ],
  [{ id: "fmt-clear", label: "Clear formatting", icon: "emPastePlain", shortcut: "⌘\\", ctrl: "Ctrl+\\" }],
];

export const DATA_MENU: MenuRow[][] = [
  [
    { id: "dat-sortsheet", label: "Sort sheet", icon: "listView", sub: "sortsheet" },
    { id: "dat-sortrange", label: "Sort range", icon: "listView", sub: "sortrange" },
  ],
  [
    { id: "dat-az", label: "Sort A → Z", icon: "listView" },
    { id: "dat-za", label: "Sort Z → A", icon: "listView" },
  ],
  [
    { id: "dat-filter", label: "Create a filter", icon: "shFilter" },
    { id: "dat-views", label: "Filter views", icon: "shFilter", sub: "fviews" },
  ],
  [
    { id: "dat-validation", label: "Data validation", icon: "circleCheck" },
    { id: "dat-named", label: "Named ranges", icon: "shGrid" },
    { id: "dat-protect", label: "Protected sheets and ranges", icon: "lock" },
  ],
];

export const TOOLS_MENU: MenuRow[][] = [
  [
    { id: "tls-macro", label: "Create new macro", icon: "imCode" },
    { id: "tls-manage", label: "Manage macros", icon: "gear" },
  ],
  [
    { id: "tls-spell", label: "Spelling", icon: "tlSpell" },
    { id: "tls-auto", label: "Autocomplete ✓", icon: "sparkle" },
  ],
  [
    { id: "tls-notif", label: "Notification settings", icon: "bell" },
    { id: "tls-access", label: "Accessibility", icon: "tlAccess" },
  ],
];

export const EXT_MENU: MenuRow[][] = [
  [
    { id: "ext-addons", label: "Add-ons", icon: "layers", disabled: true, tip: NA },
    { id: "ext-script", label: "Apps Script", icon: "imCode", disabled: true, tip: NA },
    { id: "ext-macros", label: "Macros", icon: "play", sub: "ext-macros", disabled: true, tip: NA },
  ],
];

export const HELP_MENU: MenuRow[][] = [
  [
    { id: "hlp-search", label: "Search the menus", icon: "shSearch", shortcut: "⌥/", ctrl: "Alt+/" },
    { id: "hlp-help", label: "Sheets Help", icon: "shHelp", disabled: true, tip: NA },
    { id: "hlp-training", label: "Training", icon: "fmInfo", disabled: true, tip: NA },
    { id: "hlp-updates", label: "Updates", icon: "bell", disabled: true, tip: NA },
  ],
  [
    { id: "hlp-keys", label: "Keyboard shortcuts", icon: "shShortcut", shortcut: "⌘/", ctrl: "Ctrl+/" },
    { id: "hlp-report", label: "Report a problem", icon: "warning", disabled: true, tip: NA },
    { id: "hlp-about", label: "About", icon: "fmInfo" },
  ],
];

/** Number formats, in the order the recording lists them. */
export const NUMBER_FORMATS: { id: string; label: string }[] = [
  { id: "automatic", label: "Automatic" },
  { id: "plain", label: "Plain text" },
  { id: "number", label: "Number" },
  { id: "percent", label: "Percent" },
  { id: "scientific", label: "Scientific" },
  { id: "accounting", label: "Accounting" },
  { id: "financial", label: "Financial" },
  { id: "currency", label: "Currency" },
  { id: "currencyround", label: "Currency rounded" },
  { id: "date", label: "Date" },
  { id: "time", label: "Time" },
  { id: "datetime", label: "Date time" },
  { id: "duration", label: "Duration" },
  { id: "custom-currency", label: "Custom currency" },
  { id: "custom-datetime", label: "Custom date and time" },
  { id: "custom-number", label: "Custom number format" },
];

export const FONT_SIZES = [6, 8, 9, 10, 11, 12, 14, 18, 24, 36];
export const ALIGN_ROWS = [
  { id: "left", label: "Left" },
  { id: "center", label: "Center" },
  { id: "right", label: "Right" },
  { id: "top", label: "Top" },
  { id: "middle", label: "Middle" },
  { id: "bottom", label: "Bottom" },
];
export const WRAP_ROWS = [
  { id: "overflow", label: "Overflow" },
  { id: "wrap", label: "Wrap" },
  { id: "clip", label: "Clip" },
];
export const ROTATE_ROWS = [
  { id: "none", label: "None" },
  { id: "tiltup", label: "Tilt up" },
  { id: "tiltdown", label: "Tilt down" },
  { id: "stack", label: "Stack vertically" },
  { id: "up", label: "Rotate up" },
];

/** The submenus of these menus (key = the row's `sub`). Each row id is `menu-sub-<id>`. */
export const FDT_SUBS: Record<string, { id: string; label: string }[]> = {
  number: NUMBER_FORMATS.map((f) => ({ id: `nf-${f.id}`, label: f.label })),
  fontsize: FONT_SIZES.map((s) => ({ id: `fs-${s}`, label: String(s) })),
  align: ALIGN_ROWS.map((r) => ({ id: `al-${r.id}`, label: r.label })),
  wrapping: WRAP_ROWS.map((r) => ({ id: `wr-${r.id}`, label: r.label })),
  rotation: ROTATE_ROWS.map((r) => ({ id: `ro-${r.id}`, label: r.label })),
  sortsheet: [
    { id: "sortsheet-az", label: "Sort sheet A → Z" },
    { id: "sortsheet-za", label: "Sort sheet Z → A" },
  ],
  sortrange: [
    { id: "sortrange-az", label: "Sort range A → Z" },
    { id: "sortrange-za", label: "Sort range Z → A" },
  ],
  fviews: [
    { id: "fv-new", label: "Create new filter view" },
    { id: "fv-remove", label: "Remove filter" },
  ],
};

/** What the Format steps change and the sample sheet they change it on. */
export const FDT = {
  tab: "Sheet1",
  header: ["Item", "Owner", "Cost", "Status", "Due date", "Amount", "Rate", "Length", "Note"],
  /** Column widths in px (A..I). Note is narrow on purpose: it is the text that wraps, spills and is cut off. */
  widths: [110, 100, 80, 86, 150, 86, 70, 80, 130],
  /** 14/11/2026 12:30 as a serial day count (days since 30/12/1899), and 12 h 30 min as a fraction of a day. */
  dueSerial: 46340.6041667,
  lengthDay: 0.5208333,
  body: [
    { item: "Design tools", owner: "Priya Shah", cost: 120, status: "Paid", due: 46340.6041667, amount: 1234.5, rate: 0.15, note: "Annual licences for the design team, renewed every November" },
    { item: "Cloud hosting", owner: "Alex Morgan", cost: 340, status: "Pending", due: 46328, amount: 980, rate: 0.2, note: "Hosting for the website and the staging server" },
    { item: "Team lunch", owner: "Sam Taylor", cost: 210, status: "Overdue", due: 46323, amount: 210, rate: 0.1, note: "Quarterly team lunch at the studio" },
    { item: "Stock photos", owner: "Jordan Lee", cost: 85, status: "Paid", due: 46335, amount: 85, rate: 0.05, note: "Image library subscription" },
    { item: "Cloud hosting", owner: "Jordan Lee", cost: 340, status: "Pending", due: 46345, amount: 340, rate: 0.2, note: "Backup storage for client files" },
  ],
  headerFill: "#F3F4F6",
};

/** Sample cells that the Number step works on (A1 refs). */
export const NUM_CELLS = { amount: "f2", rate: "g2", due: "e2", length: "h2" };

/* ---------------- Dialogs ---------------- */

export const CUSTOM_FMT = {
  "custom-currency": { title: "Custom currency", hint: "Pick a pattern or type your own.", presets: ["£#,##0.00", "£#,##0", "£#,##0.0"], pick: "£#,##0.00", placeholder: "£#,##0.00" },
  "custom-datetime": { title: "Custom date and time", hint: "Pick a pattern or type your own.", presets: ["dd/mm/yyyy", "dd mmmm yyyy", "hh:mm", "dd/mm/yyyy hh:mm"], pick: "dd mmmm yyyy", placeholder: "dd/mm/yyyy" },
  "custom-number": { title: "Custom number format", hint: "Pick a pattern or type your own.", presets: ["#,##0.00", "#,##0", "0.000", "00000"], pick: "0.000", placeholder: "#,##0.00" },
} as Record<string, { title: string; hint: string; presets: string[]; pick: string; placeholder: string }>;
export const CUSTOM_COPY = { preview: "Preview", cancel: "Cancel", apply: "Apply" };

export const NAMED = {
  nameTitle: "Name range",
  nameLabel: (start: string) => `Name this range (starting at ${start})`,
  endTitle: "Range end",
  endLabel: "End cell (e.g., D10): leave empty for a single cell",
  endPlaceholder: "D10",
  cancel: "Cancel",
  name: "Name",
  ok: "OK",
  value: "Q3_Costs",
  end: "C5",
  start: "a2",
  toast: (name: string, ref: string) => `Named range "${name}" created for ${ref}`,
};

export const PROTECT = {
  title: "Protect",
  sub: "Enter 1 for the entire sheet, or 2 for a specific range",
  label: "Choice (1 or 2)",
  cancel: "Cancel",
  next: "Next",
  toast: `Sheet "${FDT.tab}" is now protected. Editing is restricted.`,
  blocked: "This sheet is protected",
  blockedSub: "Unprotect it to make changes.",
  unprotect: `Sheet "${FDT.tab}" is no longer protected.`,
};

export const FILTER = {
  search: "Search",
  all: "Select all",
  clear: "Clear",
  ok: "OK",
  cancel: "Cancel",
  viewName: "Filter view 1",
  viewRenamed: "Unpaid",
  close: "Close",
  hide: "Paid",
};

export const MACRO = {
  title: "Create New Macro",
  name: "Macro name",
  namePlaceholder: "e.g., Format Header Row",
  desc: "Description (optional)",
  descPlaceholder: "What does this macro do?",
  key: "Keyboard shortcut (optional)",
  keyPlaceholder: "e.g., ⌘⇧1",
  record: "Record actions",
  idle: "Click record to start capturing spreadsheet actions",
  start: "Start Recording",
  recording: "Recording…",
  stop: "Stop",
  stopped: (n: number) => `Recorded ${n} steps`,
  cancel: "Cancel",
  save: "Save Macro",
  sampleName: "Format Header Row",
  sampleDesc: "Bolds and shades the header row",
  steps: ['Set value "Header"', "Apply bold formatting", "Select range A1:D1", "Set background color #f3f4f6"],
  created: (n: string) => `Macro "${n}" created`,
  manageTitle: "Manage Macros",
  none: "No macros yet",
  noneSub: "Create a macro to automate repetitive tasks",
  date: "29/10/2026",
  stepCount: (n: number) => `${n} steps`,
  deleted: "Macro deleted",
  fill: "#F3F4F6",
};

export const SPELL = {
  title: "Spelling",
  typo: "Quartrly review",
  fixed: "Quarterly review",
  word: "Quartrly",
  suggestion: "Quarterly",
  notIn: "Not in dictionary",
  change: "Change",
  ignore: "Ignore",
  doneTitle: "Spell check complete",
  doneSub: "No spelling issues found.",
  done: "Done",
  cell: "a7",
};

export const AUTOCOMPLETE = { on: "Autocomplete enabled", off: "Autocomplete disabled", typed: "Pa", ghost: "id", cell: "d7" };

export const NOTIF = {
  title: "Notification Settings",
  intro: "Choose how you want to be notified about activity in this spreadsheet",
  rows: [
    { id: "email", label: "Email notifications", sub: "Receive email for all activity", on: true },
    { id: "replies", label: "Comment replies", sub: "When someone replies to your comments", on: true },
    { id: "mentions", label: "Mentions", sub: "When someone mentions you with @", on: true },
    { id: "edits", label: "Edit notifications", sub: "When someone edits the spreadsheet", on: false },
    { id: "sharing", label: "Sharing changes", sub: "When sharing permissions are modified", on: true },
  ],
  freqLabel: "Notification frequency",
  freqs: [
    { id: "instant", label: "Instant" },
    { id: "daily", label: "Daily" },
    { id: "weekly", label: "Weekly" },
    { id: "none", label: "None" },
  ],
  cancel: "Cancel",
  save: "Save",
  saved: "Notification settings saved",
};

export const ACCESS = {
  title: "Accessibility",
  intro: "Configure accessibility options to improve your experience with assistive technologies.",
  sections: [
    {
      label: "SCREEN READER",
      rows: [
        { id: "reader", label: "Screen reader mode", sub: "Optimize the interface for screen readers (JAWS, NVDA, VoiceOver)", on: false },
        { id: "announce", label: "Cell announcements", sub: "Announce cell content, position, and formatting as you navigate", on: true },
      ],
    },
    {
      label: "VISUAL",
      rows: [
        { id: "contrast", label: "High contrast", sub: "Increase contrast between text and background", on: false },
        { id: "large", label: "Large text", sub: "Increase the base font size in the spreadsheet", on: false },
        { id: "motion", label: "Reduce motion", sub: "Minimize animations and transitions", on: false },
      ],
    },
    { label: "NAVIGATION", rows: [{ id: "keyboard", label: "Enhanced keyboard navigation", sub: "Navigate cells, menus, and dialogs with keyboard shortcuts", on: true }] },
  ],
  quick: "QUICK REFERENCE",
  keys: [
    ["Next cell", "Tab"],
    ["Previous cell", "Shift+Tab"],
    ["Cell below", "Enter"],
    ["Exit edit mode", "Esc"],
    ["Shortcuts help", "Ctrl+/"],
    ["Edit cell", "F2"],
  ],
  done: "Done",
};

export const SHORTCUTS = {
  title: "Keyboard shortcuts",
  search: "Search shortcuts",
  empty: "No shortcuts match.",
  done: "Got it",
  groups: [
    { label: "Editing", rows: [["Undo", "⌘Z"], ["Redo", "⌘Y"], ["Cut", "⌘X"], ["Copy", "⌘C"], ["Paste", "⌘V"], ["Find and replace", "⌘⇧H"]] },
    { label: "Formatting", rows: [["Bold", "⌘B"], ["Italic", "⌘I"], ["Underline", "⌘U"], ["Strikethrough", "⌥⇧5"], ["Clear formatting", "⌘\\"]] },
    { label: "Insert", rows: [["Insert link", "⌘K"], ["Insert sheet", "⇧F11"], ["Insert comment", "⌘⌥M"], ["Insert note", "⇧F2"]] },
    { label: "File and help", rows: [["Open", "⌘O"], ["Print", "⌘P"], ["Search the menus", "⌥/"], ["Keyboard shortcuts", "⌘/"]] },
  ] as { label: string; rows: string[][] }[],
};

export const ABOUT = { title: "Snaarp Sheets", version: "Version 1.0", copy: "© 2026 Snaarp. All rights reserved.", close: "Close" };

export const PALETTE = { placeholder: "Search the menus", empty: "No menu items match.", hint: "Press Enter to run the first result", query: "bold" };

/** Sample constants for the data steps. */
export const DATA = {
  statusCol: 3,
  costCol: 2,
  itemCol: 0,
  rangeSort: { r1: 1, c1: 0, r2: 3, c2: 3 },
  dvRange: `${FDT.tab}!D2:D6`,
};
