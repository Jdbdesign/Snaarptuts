import { formatGBP } from "@/lib/money";
import { BUDGET_HEADER, BUDGET_ROWS, SHEET } from "./sheets-data";
import type { MenuRow, SubRow } from "./edit-view-data";

/*
 * Copy, menus and sample content of the Snaarp Sheets Insert menu (steps 37-55).
 * Recording: ref/sheets/Snaarp_Sheets_insert.mp4 (git-ignored). Labels, order, groups and shortcut glyphs are read from it; the
 * recording's real data (domains, user names, e-mail addresses, S3 addresses, photos) is replaced by the Acme Studio budget and
 * the bundled illustrations in /public/sheets-sample. Edit here, not in the components.
 */

export const INSERT_MENU: MenuRow[][] = [
  [
    { id: "ins-cells", label: "Cells", icon: "shInsCells", sub: "ins-cells" },
    { id: "ins-rows", label: "Rows", icon: "shInsRows", sub: "ins-rows" },
    { id: "ins-cols", label: "Columns", icon: "shInsCols", sub: "ins-cols" },
    { id: "ins-sheet", label: "Sheet", icon: "shInsSheet", shortcut: "⇧F11", ctrl: "Shift+F11" },
  ],
  [
    { id: "ins-chart", label: "Chart", icon: "shChart" },
    { id: "ins-pivot", label: "Pivot table", icon: "shPivot" },
    { id: "ins-image", label: "Image", icon: "shImage", sub: "ins-image" },
    { id: "ins-drawing", label: "Drawing", icon: "shDrawing" },
  ],
  [
    { id: "ins-function", label: "Function", icon: "shSigma", sub: "ins-function" },
    { id: "ins-link", label: "Link", icon: "shLink", shortcut: "⌘K", ctrl: "Ctrl+K" },
  ],
  [
    { id: "ins-checkbox", label: "Checkbox", icon: "shCheckbox" },
    { id: "ins-dropdown", label: "Dropdown", icon: "shDropdown" },
    { id: "ins-emoji", label: "Emoji", icon: "shEmoji" },
    { id: "ins-chips", label: "Smart chips", icon: "shChip" },
  ],
  [
    { id: "ins-comment", label: "Comment", icon: "edComment", shortcut: "⌘⌥M", ctrl: "Ctrl+Alt+M" },
    { id: "ins-note", label: "Note", icon: "shNote", shortcut: "⇧F2", ctrl: "Shift+F2" },
  ],
];

export const FUNCTION_IDS = ["sum", "average", "count", "max", "min", "if"] as const;
export type FunctionId = (typeof FUNCTION_IDS)[number];

export const INSERT_SUBS: Record<string, SubRow[]> = {
  "ins-cells": [
    { id: "cells-down", label: "Insert cells and shift down" },
    { id: "cells-right", label: "Insert cells and shift right" },
  ],
  "ins-rows": [
    { id: "row-above", label: "Row above" },
    { id: "row-below", label: "Row below" },
  ],
  "ins-cols": [
    { id: "col-left", label: "Column left" },
    { id: "col-right", label: "Column right" },
  ],
  "ins-image": [
    { id: "img-cell", label: "Insert image in cell" },
    { id: "img-over", label: "Insert image over cells" },
  ],
  "ins-function": [
    ...FUNCTION_IDS.map((id) => ({ id: `fn-${id}`, label: id.toUpperCase() })),
    { id: "fn-more", label: "More functions…" },
  ],
};

/* ---------------- Sample sheet ---------------- */

/** The Insert steps' sheet: the budget (Item | Owner | Cost | Status) plus what each item cost in July, August and September. */
export const INSERT_SAMPLE = {
  months: ["Jul", "Aug", "Sep"],
  /** Pounds per month for the four items (each row adds up to the Cost column). */
  monthly: [
    [40, 40, 40],
    [100, 110, 130],
    [20, 30, 35],
    [70, 60, 80],
  ],
  headerFill: "#E7EDFB",
  totalLabel: "Total",
  /** The second tab, so the Link step has sheets to point at. The Sheet step adds the next one. */
  tabs: { budget: SHEET.tab, forecast: "Forecast", added: "Sheet 3" },
};

export const INSERT_HEADER = [...BUDGET_HEADER, ...INSERT_SAMPLE.months];
export const INSERT_BODY = BUDGET_ROWS.map((r, i) => ({ ...r, months: INSERT_SAMPLE.monthly[i] }));
export const money = (n: number) => formatGBP(n, { whole: true });
export const INSERT_FORECAST_ROWS = [
  ["Month", "Planned"],
  ["October", money(1200)],
  ["November", money(1350)],
];

/** Insert > Cells, Rows, Columns: where the demo selects. */
export const STRUCTURE = {
  cellsRange: ["b3", "b4"] as const,
  shiftRightRange: ["d3", "d4"] as const,
  row: "a3",
  column: "c1",
};

/* ---------------- Chart (steps 42-44) ---------------- */

const opt = (id: string, label = id) => ({ id, label });

export const CHART = {
  title: "Chart editor",
  tabs: [opt("setup", "Setup"), opt("customize", "Customize")],
  type: "Chart type",
  types: [opt("column", "Column chart"), opt("line", "Line chart"), opt("pie", "Pie chart"), opt("area", "Area chart"), opt("scatter", "Scatter chart")],
  stacking: "Stacking",
  stackings: [opt("none", "None"), opt("standard", "Standard"), opt("percent", "100%")],
  dataRange: "Data range",
  xAxis: "X-axis",
  xAdd: "Add X-axis",
  series: "Series",
  cancel: "Cancel",
  insert: "Insert",
  update: "Update",
  sections: [opt("style", "Chart style"), opt("titles", "Chart & axis titles"), opt("series", "Series"), opt("legend", "Legend"), opt("haxis", "Horizontal axis"), opt("vaxis", "Vertical axis"), opt("grid", "Gridlines and ticks")],
  bgColor: "Background color",
  font: "Font",
  fonts: ["Theme Default", "Arial", "Roboto", "Times New Roman", "Courier New", "Georgia"].map((f) => opt(f)),
  border: "Chart border color",
  reset: "Reset layout",
  flags: [opt("maximize", "Maximize"), opt("threeD", "3D"), opt("compare", "Compare mode")],
  palette: "Color palette",
  titleKinds: [opt("chart", "Chart title"), opt("h", "Horizontal axis title"), opt("v", "Vertical axis title")],
  titleText: "Title text",
  titlePlaceholders: { chart: "Chart title", h: "Horizontal axis title", v: "Vertical axis title" },
  titleFont: "Title font",
  titleSize: "Title font size",
  sizes: ["Auto", "10", "12", "14", "18", "24"].map((f) => opt(f)),
  titleFormat: "Title format",
  titleColor: "Title text color",
  colourAuto: "Auto",
  format: "Format",
  fillColor: "Fill color",
  fillOpacity: "Fill opacity",
  lineColor: "Line color",
  lineOpacity: "Line opacity",
  opacities: ["100%", "75%", "50%", "25%", "0%"].map((f) => opt(f.replace("%", ""), f)),
  dash: "Line dash type",
  thickness: "Line thickness",
  thicknesses: [opt("0", "Auto"), opt("1", "1px"), opt("2", "2px"), opt("4", "4px")],
  axis: "Axis",
  axes: [opt("left", "Left axis"), opt("right", "Right axis")],
  dataPoint: "Format data point",
  add: "Add",
  checks: [opt("errorBars", "Error bars"), opt("dataLabels", "Data labels"), opt("trendline", "Trendline")],
  legendPos: "Position",
  legends: [opt("auto", "Auto"), opt("right", "Right"), opt("bottom", "Bottom"), opt("top", "Top"), opt("inside", "Inside"), opt("none", "None")],
  labelFont: "Label font",
  labelSize: "Label font size",
  labelFormat: "Label format",
  textColor: "Text color",
  showLine: "Show axis line",
  min: "Min",
  max: "Max",
  minPlaceholder: "Minimum value",
  maxPlaceholder: "Maximum value",
  scale: "Scale factor",
  scaleValue: "Default",
  log: "Log scale",
  numberFormat: "Number format",
  numberValue: "From source data",
  major: "Major gridlines",
  minor: "Minor gridlines",
  /** What the steps type and pick. */
  typed: { chart: "Q3 spend by item", h: "Item", v: "Spend (GBP)" },
  where: { row: 8, col: 0 },
};

/* ---------------- Images (steps 45-46) ---------------- */

export const IMAGE = {
  title: "Insert image",
  tabs: [opt("upload", "Upload"), opt("url", "By URL")],
  drop: "Click to upload an image",
  types: "PNG, JPG, GIF, SVG up to 5MB",
  chooser: "Choose an image",
  alt: "Alt text (optional)",
  altPlaceholder: "Describe the image",
  preview: "Preview",
  urlLabel: "Image URL",
  urlPlaceholder: "https://example.com/picture.png",
  urlHint: "Paste a link to a picture on the web",
  cancel: "Cancel",
  insert: "Insert",
  files: [
    { id: "desk", name: "studio-desk.svg", src: "/sheets-sample/studio-desk.svg", alt: "Acme Studio desk" },
    { id: "skyline", name: "acme-skyline.svg", src: "/sheets-sample/acme-skyline.svg", alt: "Acme skyline" },
    { id: "logo", name: "acme-logo.svg", src: "/sheets-sample/acme-logo.svg", alt: "Acme logo" },
  ],
  /** The cell the picture goes in, and the formula the formula bar keeps showing (the picture itself is drawn in the cell). */
  cell: "e8",
  cellFormula: '=IMAGE("https://example.com/sample.png","image")',
  tallRow: { row: 7, px: 64 },
  over: { r: 8, c: 0, w: 300, h: 200 },
  overResized: { w: 360, h: 240 },
  toastCell: "Image inserted in cell",
  toastOver: "Image inserted over cells",
};

/* ---------------- Function (step 47) and Link (step 48) ---------------- */

export const FUNCTIONS = {
  /** The numbers the functions work on, and where the results go: labels in column H, results in column I, from row 2. */
  range: "C2:C5",
  rangeCells: { r1: 1, c1: 2, r2: 4, c2: 2 },
  labelCol: 7,
  resultCol: 8,
  firstRow: 1,
  labels: { sum: "Sum", average: "Average", count: "Count", max: "Highest", min: "Lowest", if: `Over ${money(200)}?`, median: "Median" } as Record<string, string>,
  formulas: {
    sum: "=SUM(C2:C5)",
    average: "=AVERAGE(C2:C5)",
    count: "=COUNT(C2:C5)",
    max: "=MAX(C2:C5)",
    min: "=MIN(C2:C5)",
    if: '=IF(C2>200,"High","Low")',
    median: "=MEDIAN(C2:C5)",
  } as Record<string, string>,
  moreTitle: "Functions",
  moreSearch: "Search functions",
  moreQuery: "med",
  moreList: [
    { name: "ABS", desc: "Absolute value of a number" },
    { name: "CONCATENATE", desc: "Join pieces of text together" },
    { name: "LEN", desc: "Number of characters in text" },
    { name: "MEDIAN", desc: "Middle value of a range" },
    { name: "PRODUCT", desc: "Multiply the numbers in a range" },
    { name: "ROUND", desc: "Round a number to some decimals" },
    { name: "TODAY", desc: "Today's date" },
    { name: "UPPER", desc: "Text in capital letters" },
  ],
  moreNone: "No functions match",
};

export const LINK = {
  cell: "a2",
  urlCell: "a3",
  topPlaceholder: "Text",
  search: "Search or paste a link",
  apply: "Apply",
  footer: "Sheets and named ranges",
  url: "https://example.com",
  toast: "Link inserted",
  copy: "Copy link",
  edit: "Edit link",
  remove: "Remove link",
  /** The sheet the first link points at (a tab of the sample workbook). */
  sheetId: "s2",
};

/* ---------------- Checkbox, Dropdown, Emoji (steps 49-51) ---------------- */

export const CHECKBOX = {
  header: "Approved",
  headerCell: "h1",
  range: ["h2", "h5"] as const,
  tick: ["h2", "h4"] as const,
};

export const DROPDOWN = {
  title: "Data validation rules",
  rangeLabel: "Apply to range",
  range: "D2:D5",
  rangeText: `${SHEET.tab}!D2:D5`,
  rangeCells: { r1: 1, c1: 3, r2: 4, c2: 3 },
  criteria: "Criteria",
  criteriaValue: "Dropdown",
  add: "Add another item",
  multi: "Allow multiple selections",
  advanced: "Advanced options",
  remove: "Remove rule",
  done: "Done",
  pick: "Pick a color",
  custom: "Custom",
  /** The two items the rule starts with, what they are renamed to, and the third one added. */
  start: ["Option 1", "Option 2"],
  names: ["Paid", "Pending", "Overdue"],
  /** Item colours: the picker has 16; the steps choose these. */
  swatches: ["#E6E6E6", "#F4B6B6", "#FFE08A", "#C7E9B4", "#B7E1F4", "#D9C4F4", "#F7C6E3", "#F8D9B5", "#FFFFFF", "#EA4335", "#F29900", "#34A853", "#4285F4", "#9334E6", "#E8408F", "#8B5A2B"],
  colours: { paid: "#C7E9B4", pending: "#FFE08A", overdue: "#F4B6B6" },
  /** The cell whose own dropdown is opened afterwards, and the value picked. */
  cell: "d3",
  picked: "Overdue",
  toast: "Dropdown rule applied",
};

export const EMOJI = {
  title: "Insert emoji",
  search: "Search emojis...",
  tabs: ["Smileys", "Gestures", "Hearts", "Objects", "Symbols", "Nature"],
  query: "smile",
  cell: "d2",
  pick: "smiling-eyes",
  empty: "No emoji found",
  list: [
    ["Smileys", "grinning", "😀", "grinning face"],
    ["Smileys", "grinning-eyes", "😄", "grinning face with smiling eyes, smile"],
    ["Smileys", "smiling-eyes", "😊", "smiling face with smiling eyes, smile"],
    ["Smileys", "slight-smile", "🙂", "slightly smiling face, smile"],
    ["Smileys", "wink", "😉", "winking face"],
    ["Smileys", "heart-eyes", "😍", "smiling face with heart-eyes, smile"],
    ["Smileys", "sunglasses", "😎", "smiling face with sunglasses, smile"],
    ["Smileys", "joy", "😂", "face with tears of joy"],
    ["Smileys", "thinking", "🤔", "thinking face"],
    ["Smileys", "sleeping", "😴", "sleeping face"],
    ["Smileys", "crying", "😢", "crying face"],
    ["Smileys", "pouting", "😡", "pouting face"],
    ["Gestures", "thumbs-up", "👍", "thumbs up"],
    ["Gestures", "clap", "👏", "clapping hands"],
    ["Gestures", "pray", "🙏", "folded hands"],
    ["Gestures", "wave", "👋", "waving hand"],
    ["Gestures", "handshake", "🤝", "handshake"],
    ["Gestures", "victory", "✌️", "victory hand"],
    ["Gestures", "muscle", "💪", "flexed biceps"],
    ["Hearts", "red-heart", "❤️", "red heart"],
    ["Hearts", "blue-heart", "💙", "blue heart"],
    ["Hearts", "green-heart", "💚", "green heart"],
    ["Hearts", "yellow-heart", "💛", "yellow heart"],
    ["Hearts", "purple-heart", "💜", "purple heart"],
    ["Hearts", "broken-heart", "💔", "broken heart"],
    ["Objects", "bulb", "💡", "light bulb"],
    ["Objects", "paperclip", "📎", "paperclip"],
    ["Objects", "pushpin", "📌", "pushpin"],
    ["Objects", "key", "🔑", "key"],
    ["Objects", "calendar", "📅", "calendar"],
    ["Objects", "pound", "💷", "pound banknote"],
    ["Objects", "chart", "📈", "chart increasing"],
    ["Symbols", "check", "✅", "check mark button"],
    ["Symbols", "cross", "❌", "cross mark"],
    ["Symbols", "warning", "⚠️", "warning"],
    ["Symbols", "star", "⭐", "star"],
    ["Symbols", "question", "❓", "question mark"],
    ["Symbols", "bell", "🔔", "bell"],
    ["Nature", "seedling", "🌱", "seedling"],
    ["Nature", "blossom", "🌼", "blossom"],
    ["Nature", "sun", "🌞", "sun with face"],
    ["Nature", "fire", "🔥", "fire"],
    ["Nature", "earth", "🌍", "globe showing Europe-Africa"],
  ] as [string, string, string, string][],
};

/* ---------------- Smart chips (steps 52-53) ---------------- */

export const CHIP_TONES: Record<string, string> = { people: "#E8F0FE", date: "#E6F4EA", place: "#FCE8E6", file: "#F3E8FD", finance: "#FEF7E0", event: "#E0F2F1" };

export const SMART_CHIPS = {
  title: "Smart chips",
  search: "Search chip types...",
  back: "Back",
  insert: "Insert",
  preview: "Preview",
  types: [
    { id: "people", label: "People", desc: "Mention a person" },
    { id: "date", label: "Date", desc: "Insert a date chip" },
    { id: "place", label: "Place", desc: "Reference a location" },
    { id: "file", label: "File", desc: "Link to a file" },
    { id: "finance", label: "Finance", desc: "Stock or financial reference" },
    { id: "event", label: "Event", desc: "Reference a calendar event" },
  ],
  header: "Reviewer",
  headerCell: "h1",
  cell: "h2",
  /** Step 53 puts one chip of each of the other five kinds in column H. */
  chipsHeader: "Smart chips",
  chipCells: { date: "h2", place: "h3", file: "h4", finance: "h5", event: "h6" } as Record<string, string>,
  toast: "Person chip inserted",
  toastOther: (kind: string) => `${kind} chip inserted`,
  people: {
    title: "Insert People",
    label: "People",
    placeholder: "Enter name or email...",
    typed: "pri",
    person: { name: "Priya Shah", email: "priya.shah@example.com" },
    manage: "Manage addresses…",
  },
  date: { title: "Insert Date", label: "Date", month: "November 2026", days: ["Mo", "Tu", "We", "Th", "Fr", "Sa", "Su"], offset: 6, count: 30, pick: 14, value: "14/11/2026" },
  place: { title: "Insert Place", label: "Place", placeholder: "Search for a place", typed: "lon", options: ["London, UK", "Leeds, UK", "Manchester, UK"], value: "London, UK" },
  file: { title: "Insert File", label: "File", files: ["Q3 budget.xlsx", "Brand guidelines.pdf", "Team photo.png"], value: "Q3 budget.xlsx" },
  finance: { title: "Insert Finance", label: "Finance", placeholder: "Ticker or company", typed: "ac", name: "Acme Studio plc", ticker: "ACME", price: 12.4 },
  event: { title: "Insert Event", label: "Event", placeholder: "Event title", typed: "quar", value: "Quarterly review, 14/11/2026" },
};

/* ---------------- Comment and Note (steps 54-55) ---------------- */

export const COMMENT_INS = {
  cell: "c3",
  text: "Thank you",
  placeholder: "Comment or add others with @",
  cancel: "Cancel",
  post: "Comment",
  reply: "Reply",
  replyPlaceholder: "Reply",
  replyText: "You're welcome",
  time: "Just now",
  author: SHEET.owner,
  initials: "AM",
};

export const NOTE = {
  title: "Insert note",
  placeholder: "Type your note here...",
  hint: "Notes are attached to cells and visible on hover. Press ⌘+Enter to save.",
  cancel: "Cancel",
  insert: "Insert",
  cell: "d4",
  text: "Okay… Seen",
  toast: "Note added",
  author: "Note",
  initials: "N",
  time: "Just now",
};
