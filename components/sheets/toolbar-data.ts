import type { LogoName } from "@/components/icons";
import { toSerial } from "./number-format";

/*
 * Copy, menus and sample data of the toolbar and header-tool steps (85-116). Recording: ref/sheets/Snaarp_Sheets_toolbar.mp4
 * (git-ignored). Labels and lists are read from the recording; where the recording shows nothing (a tooltip that was never hovered,
 * the end of a long list) the text follows the same style and is listed in docs/DECISIONS-AND-DEVIATIONS.md.
 * Money is numbers (pounds) and goes through number-format.ts; dates are DD/MM/YYYY.
 */

export const TB_URL = "sheets.snaarp.com/sheet/acme-studio-q3-budget"; // placeholder, the address in the recording is a real id

/* ---------------- Sample sheet ---------------- */

const due = (d: number, m: number) => toSerial(2026, m, d);

/** Item | Owner | Region | Cost | Qty | Status | Due date | Margin | Code | Reference | Note | Link | Action. Row 10 is the Total. */
export const TB_SAMPLE = {
  title: "Acme Studio – Q3 Budget",
  tab: "Sheet1",
  vendorsTab: "Vendors",
  header: ["Item", "Owner", "Region", "Cost", "Qty", "Status", "Due date", "Margin", "Code", "Reference", "Note", "Link", "Action"],
  widths: [152, 92, 92, 84, 60, 76, 86, 66, 56, 104, 200, 88, 84],
  totalLabel: "Total",
  /** The Cost column, the Qty column... The cost of each row; the Total (=SUM(D2:D9)) is worked out by the sheet. */
  body: [
    { item: "Design tools", owner: "Priya Shah", region: "London", cost: 120, qty: 12, status: "Paid", due: due(5, 11), margin: 0.15, code: "007", ref: 1234567890, note: "Annual licence for the design team, includes five seats and the shared font library" },
    { item: "Cloud hosting", owner: "Alex Morgan", region: "Leeds", cost: 340.5, qty: 1, status: "Overdue", due: due(14, 11), margin: 0.075, code: "012", ref: 1234567891, note: "Production and staging servers, billed monthly in advance" },
    { item: "Team lunch", owner: "Sam Taylor", region: "London", cost: 85, qty: 18, status: "Paid", due: due(21, 11), margin: 0.2, code: "015", ref: 1234567892, note: "Friday lunch for the whole team" },
    { item: "Cloud backup", owner: "Jordan Lee", region: "Manchester", cost: 210, qty: 2, status: "Pending", due: due(28, 11), margin: 0.125, code: "021", ref: 1234567893, note: "Nightly backups" },
    { item: "Domain renewal", owner: "Priya Shah", region: "London", cost: 45, qty: 3, status: "Paid", due: due(3, 12), margin: 0.1, code: "024", ref: 1234567894, note: "Three domains" },
    { item: "Stock photos", owner: "Jordan Lee", region: "Leeds", cost: 180, qty: 1200, status: "Pending", due: due(10, 12), margin: 0.3, code: "031", ref: 1234567895, note: "Image pack, 1,200 licences" },
    { item: "Event ticket – cancelled", owner: "Sam Taylor", region: "Manchester", cost: 250, qty: 4, status: "Overdue", due: due(15, 12), margin: 0.05, code: "040", ref: 1234567896, note: "Refund requested" },
    { item: "Cloud storage", owner: "Alex Morgan", region: "Leeds", cost: 200, qty: 5, status: "Paid", due: due(19, 12), margin: 0.25, code: "046", ref: 1234567897, note: "Shared drive" },
  ],
  /** Text of the two cells the link steps use (L2 and L3). */
  linkCells: ["Vendor site", "Vendors list"],
  vendors: { header: ["Vendor", "Website"], rows: [["Cloudbase", "cloudbase.example.com"], ["Pixel Pack", "pixelpack.example.com"]] },
  /** Where the Total sits and what it adds up. */
  totalRow: 9,
  costCol: 3,
  statusCol: 5,
  dueCol: 6,
  marginCol: 7,
  qtyCol: 4,
  codeCol: 8,
  refCol: 9,
  noteCol: 10,
  actionCol: 12,
};

/* ---------------- Tooltips ---------------- */

/** The tooltip of each tool. Those marked * were hovered in the recording; the rest follow the same style. */
export const TOOL_TIPS: Record<string, string> = {
  search: "Search", // assumed
  undo: "Undo (Ctrl+Z)", // *
  redo: "Redo (Ctrl+Y)", // *
  print: "Print (Ctrl+P)", // assumed
  paint: "Paint format", // *
  zoom: "Zoom", // assumed
  currency: "Format as currency", // assumed
  percent: "Format as percent", // *
  decrease: "Decrease decimal places", // *
  increase: "Increase decimal places", // *
  formats: "More formats", // assumed
  font: "Font", // assumed
  "size-minus": "Decrease font size", // assumed
  size: "Font size", // assumed
  "size-plus": "Increase font size", // assumed
  bold: "Bold (Ctrl+B)", // *
  italic: "Italic (Ctrl+I)", // assumed
  strike: "Strikethrough (Alt+Shift+5)", // *
  underline: "Underline (Ctrl+U)", // *
  textcolor: "Text color", // *
  highlight: "Fill color", // *
  borders: "Borders", // *
  merge: "Merge cells", // assumed
  halign: "Horizontal align", // assumed
  valign: "Vertical align", // assumed
  wrap: "Text wrapping", // assumed
  rotate: "Text rotation", // assumed
  link: "Insert link (Ctrl+K)", // *
  comment: "Insert comment (Ctrl+Alt+M)", // assumed
  chart: "Insert chart", // *
  filter: "Create a filter", // *
  functions: "Functions", // assumed
  more: "More", // assumed
  "hdr-apps": "Snaarp apps", // assumed
  "hdr-history": "Version history", // assumed
  "hdr-comments": "Comments", // assumed
  "hdr-video": "Start video call", // *
  "hdr-lock": "Restricted", // assumed
};

/* ---------------- Dropdowns ---------------- */

export const ZOOM_CHOICES = [50, 75, 90, 100, 125, 150, 200];

/** The Currency dropdown: the seven currencies of the recording and "Custom currency...". */
export const CURRENCY_QUICK = ["USD", "EUR", "GBP", "JPY", "INR", "NGN", "BRL"];
export const CURRENCY_CUSTOM_LABEL = "Custom currency...";

/** The Custom currencies dialog: long list, in the recording's order. */
export const CUSTOM_CURRENCIES: { name: string; code: string }[] = [
  ["US Dollar", "USD"], ["British Pound Sterling", "GBP"], ["Euro", "EUR"], ["Japanese Yen", "JPY"], ["Swiss Franc", "CHF"], ["Canadian Dollar", "CAD"], ["Australian Dollar", "AUD"], ["Chinese Yuan", "CNY"], ["Indian Rupee", "INR"], ["Brazilian Real", "BRL"],
  ["South Korean Won", "KRW"], ["Russian Ruble", "RUB"], ["Mexican Peso", "MXN"], ["Singapore Dollar", "SGD"], ["Hong Kong Dollar", "HKD"], ["Norwegian Krone", "NOK"], ["Swedish Krona", "SEK"], ["Danish Krone", "DKK"], ["New Zealand Dollar", "NZD"], ["South African Rand", "ZAR"],
  ["Turkish Lira", "TRY"], ["Thai Baht", "THB"], ["Indonesian Rupiah", "IDR"], ["Malaysian Ringgit", "MYR"], ["Philippine Peso", "PHP"], ["Polish Zloty", "PLN"], ["Czech Koruna", "CZK"], ["Hungarian Forint", "HUF"], ["Israeli Shekel", "ILS"], ["Chilean Peso", "CLP"],
  ["Colombian Peso", "COP"], ["Argentine Peso", "ARS"], ["Peruvian Sol", "PEN"], ["Saudi Riyal", "SAR"], ["UAE Dirham", "AED"], ["Qatari Riyal", "QAR"], ["Kuwaiti Dinar", "KWD"], ["Bahraini Dinar", "BHD"], ["Omani Rial", "OMR"], ["Egyptian Pound", "EGP"],
  ["Nigerian Naira", "NGN"], ["Kenyan Shilling", "KES"], ["Ghanaian Cedi", "GHS"], ["Tanzanian Shilling", "TZS"], ["Ugandan Shilling", "UGX"], ["Moroccan Dirham", "MAD"], ["Afghan Afghani", "AFN"], ["Albanian Lek", "ALL"], ["Algerian Dinar", "DZD"], ["Angolan Kwanza", "AOA"],
  ["Armenian Dram", "AMD"], ["Aruban Florin", "AWG"], ["Bangladeshi Taka", "BDT"], ["Barbadian Dollar", "BBD"], ["Belarusian Ruble", "BYN"], ["Belize Dollar", "BZD"], ["Bermudian Dollar", "BMD"], ["Bolivian Boliviano", "BOB"], ["Bosnia Mark", "BAM"], ["Botswana Pula", "BWP"],
  ["Bulgarian Lev", "BGN"], ["Cambodian Riel", "KHR"], ["Costa Rican Colón", "CRC"], ["Croatian Kuna", "HRK"], ["Cuban Peso", "CUP"], ["Dominican Peso", "DOP"], ["Ethiopian Birr", "ETB"], ["Fijian Dollar", "FJD"], ["Georgian Lari", "GEL"], ["Guatemalan Quetzal", "GTQ"],
  ["Haitian Gourde", "HTG"], ["Honduran Lempira", "HNL"], ["Icelandic Króna", "ISK"], ["Iraqi Dinar", "IQD"], ["Jamaican Dollar", "JMD"], ["Jordanian Dinar", "JOD"], ["Kazakhstani Tenge", "KZT"], ["Lao Kip", "LAK"], ["Lebanese Pound", "LBP"], ["Libyan Dinar", "LYD"],
  ["Macanese Pataca", "MOP"], ["Maldivian Rufiyaa", "MVR"], ["Mauritian Rupee", "MUR"], ["Moldovan Leu", "MDL"], ["Mongolian Tugrik", "MNT"], ["Mozambican Metical", "MZN"], ["Myanmar Kyat", "MMK"], ["Namibian Dollar", "NAD"], ["Nepalese Rupee", "NPR"], ["Nicaraguan Córdoba", "NIO"],
  ["North Macedonian Denar", "MKD"], ["Pakistani Rupee", "PKR"], ["Panamanian Balboa", "PAB"], ["Paraguayan Guarani", "PYG"], ["Romanian Leu", "RON"], ["Serbian Dinar", "RSD"], ["Sri Lankan Rupee", "LKR"], ["Taiwanese Dollar", "TWD"], ["Tunisian Dinar", "TND"], ["Ukrainian Hryvnia", "UAH"],
  ["Uruguayan Peso", "UYU"], ["Uzbekistani Som", "UZS"], ["Venezuelan Bolivar", "VES"], ["Vietnamese Dong", "VND"], ["West African CFA Franc", "XOF"], ["Zambian Kwacha", "ZMW"], ["Zimbabwean Dollar", "ZWL"],
].map(([name, code]) => ({ name, code }));

export const CUSTOM_CURRENCY = { title: "Custom currencies", search: "Search currencies…", apply: "Apply", sample: 1000, listSample: 1000.12, empty: "No currency found" };

/** The 123 dropdown (Number is ticked in the recording). */
export const NUMBER_FORMATS: { id: string; label: string }[] = [
  { id: "automatic", label: "Automatic" },
  { id: "number", label: "Number" },
  { id: "currency:GBP", label: "Currency" },
  { id: "percent", label: "Percent" },
  { id: "date", label: "Date" },
  { id: "time", label: "Time" },
  { id: "scientific", label: "Scientific" },
  { id: "plain", label: "Plain text" },
];

/** The font list, in the recording's order (the list scrolls; the last four are not visible in it). */
export const FONTS = ["Arial", "Arial Black", "Calibri", "Cambria", "Comic Sans MS", "Consolas", "Courier New", "Garamond", "Georgia", "Helvetica", "Impact", "Lato", "Lucida Console", "Montserrat", "Open Sans", "Oswald", "Palatino Linotype", "Playfair Display", "Roboto", "Times New Roman", "Trebuchet MS", "Verdana"];
/** CSS stack that draws each font (the real font when the machine has it, a close one otherwise). */
export const FONT_CSS: Record<string, string> = {
  "Arial Black": '"Arial Black", Arial, sans-serif', Calibri: 'Calibri, Carlito, "Segoe UI", sans-serif', Cambria: 'Cambria, Georgia, serif', "Comic Sans MS": '"Comic Sans MS", "Comic Neue", cursive', Consolas: 'Consolas, "Courier New", monospace',
  "Courier New": '"Courier New", monospace', Garamond: 'Garamond, "EB Garamond", Georgia, serif', Georgia: "Georgia, serif", Helvetica: "Helvetica, Arial, sans-serif", Impact: "Impact, Haettenschweiler, sans-serif", Lato: "Lato, Arial, sans-serif",
  "Lucida Console": '"Lucida Console", monospace', Montserrat: "Montserrat, Arial, sans-serif", "Open Sans": '"Open Sans", Arial, sans-serif', Oswald: "Oswald, Impact, sans-serif", "Palatino Linotype": '"Palatino Linotype", Palatino, serif',
  "Playfair Display": '"Playfair Display", Georgia, serif', Roboto: "Roboto, Arial, sans-serif", "Times New Roman": '"Times New Roman", Times, serif', "Trebuchet MS": '"Trebuchet MS", sans-serif', Verdana: "Verdana, sans-serif", Arial: "Arial, Helvetica, sans-serif",
};
export const DEFAULT_FONT = "Arial";

export const FONT_SIZES = [6, 7, 8, 9, 10, 11, 12, 14, 18, 24, 36];
export const DEFAULT_SIZE = 10;

/** The colour grid: a row of greys, the strong colours, then lighter tints (names are what the tooltips would say). */
export const PALETTE: { name: string; hex: string }[][] = [
  ["black", "dark gray 4", "dark gray 3", "dark gray 2", "dark gray 1", "gray", "light gray 1", "light gray 2", "light gray 3", "white"].map((name, i) => ({ name, hex: ["#000000", "#434343", "#666666", "#999999", "#B7B7B7", "#CCCCCC", "#D9D9D9", "#EFEFEF", "#F3F3F3", "#FFFFFF"][i] })),
  ["red berry", "red", "orange", "yellow", "green", "cyan", "cornflower blue", "blue", "purple", "magenta"].map((name, i) => ({ name, hex: ["#980000", "#FF0000", "#FF9900", "#FFFF00", "#00FF00", "#00FFFF", "#4A86E8", "#0000FF", "#9900FF", "#FF00FF"][i] })),
  ["light red berry 2", "light red 2", "light orange 2", "light yellow 2", "light green 2", "light cyan 2", "light cornflower blue 2", "light blue 2", "light purple 2", "light magenta 2"].map((name, i) => ({ name, hex: ["#DD7E6B", "#EA9999", "#F9CB9C", "#FFE599", "#B6D7A8", "#A2C4C9", "#A4C2F4", "#9FC5E8", "#B4A7D6", "#D5A6BD"][i] })),
  ["light red berry 3", "light red 3", "light orange 3", "light yellow 3", "light green 3", "light cyan 3", "light cornflower blue 3", "light blue 3", "light purple 3", "light magenta 3"].map((name, i) => ({ name, hex: ["#E6B8AF", "#F4CCCC", "#FCE5CD", "#FFF2CC", "#D9EAD3", "#D0E0E3", "#C9DAF8", "#CFE2F3", "#D9D2E9", "#EAD1DC"][i] })),
];
export const COLORS = { reset: "Reset", custom: "Custom", red: "#FF0000", yellowLight: "#FFF2CC", greenLight: "#D9EAD3", headerFill: "#FFF2CC", textDefault: "#202124" };

/** Borders dropdown: two rows of five, as in the recording (the pencil and the line style sit at the end of each row). */
export const BORDER_ICONS: { id: string; label: string }[][] = [
  [{ id: "all", label: "All borders" }, { id: "inner", label: "Inner borders" }, { id: "horizontal", label: "Horizontal borders" }, { id: "vertical", label: "Vertical borders" }, { id: "outer", label: "Outer borders" }],
  [{ id: "top", label: "Top border" }, { id: "bottom", label: "Bottom border" }, { id: "left", label: "Left border" }, { id: "right", label: "Right border" }, { id: "clear", label: "Clear borders" }],
];
export const BORDER_STYLES: { id: string; label: string }[] = [
  { id: "solid", label: "Solid" }, { id: "medium", label: "Medium" }, { id: "thick", label: "Thick" }, { id: "dotted", label: "Dotted" }, { id: "dashed", label: "Dashed" }, { id: "double", label: "Double" },
];
export const BORDER_COLOR = "#000000";

export const MERGE_ROWS = [{ id: "all", label: "Merge all" }, { id: "vertical", label: "Merge vertically" }, { id: "horizontal", label: "Merge horizontally" }, { id: "unmerge", label: "Unmerge" }];
export const HALIGN_ROWS = [{ id: "left", label: "Left" }, { id: "center", label: "Center" }, { id: "right", label: "Right" }];
export const VALIGN_ROWS = [{ id: "top", label: "Top" }, { id: "middle", label: "Middle" }, { id: "bottom", label: "Bottom" }];
export const WRAP_ROWS = [{ id: "overflow", label: "Overflow" }, { id: "wrap", label: "Wrap" }, { id: "clip", label: "Clip" }];
export const ROTATE_ROWS = [{ id: "none", label: "None" }, { id: "tiltup", label: "Tilt up" }, { id: "tiltdown", label: "Tilt down" }, { id: "stack", label: "Vertical" }, { id: "up", label: "Rotate up" }];

/* ---------------- Functions ---------------- */

export const FUNCTIONS_QUICK = ["SUM", "AVERAGE", "COUNT", "MAX", "MIN"];

/** The category lists, read from the recording (Math & Trig and Statistical end beyond what it shows). */
export const FUNCTION_CATEGORIES: { id: string; label: string; fns: string[] }[] = [
  { id: "array", label: "Array", fns: ["ARRAYFORMULA", "FLATTEN", "MMULT", "SEQUENCE", "TOCOL", "TOROW", "TRANSPOSE", "WRAPCOLS", "WRAPROWS"] },
  { id: "database", label: "Database", fns: ["DAVERAGE", "DCOUNT", "DGET", "DMAX", "DMIN", "DSUM"] },
  { id: "datetime", label: "Date & Time", fns: ["DATE", "DATEDIF", "DATEVALUE", "DAY", "EDATE", "EOMONTH", "HOUR", "MINUTE", "MONTH", "NETWORKDAYS", "NOW", "SECOND", "TIME", "TODAY", "WEEKDAY", "WEEKNUM", "WORKDAY", "YEAR"] },
  { id: "engineering", label: "Engineering", fns: ["BIN2DEC", "DEC2BIN", "DEC2HEX", "HEX2DEC"] },
  { id: "financial", label: "Financial", fns: ["DDB", "FV", "IRR", "NPER", "NPV", "PMT", "PV", "RATE", "SLN", "XIRR", "XNPV"] },
  { id: "web", label: "Google / Web", fns: ["DETECTLANGUAGE", "GOOGLEFINANCE", "GOOGLETRANSLATE", "IMPORTDATA", "IMPORTFEED", "IMPORTHTML", "IMPORTRANGE", "IMPORTXML", "SPARKLINE"] },
  { id: "info", label: "Info", fns: ["CELL", "ISBLANK", "ISEMAIL", "ISERROR", "ISFORMULA", "ISLOGICAL", "ISNA", "ISNUMBER", "ISTEXT", "ISURL", "N", "NA", "TYPE"] },
  { id: "logical", label: "Logical", fns: ["AND", "FALSE", "IF", "IFERROR", "IFNA", "IFS", "NOT", "OR", "SWITCH", "TRUE", "XOR"] },
  { id: "lookup", label: "Lookup & Reference", fns: ["ADDRESS", "CHOOSE", "COLUMN", "COLUMNS", "FILTER", "GETPIVOTDATA", "HLOOKUP", "INDEX", "INDIRECT", "LOOKUP", "MATCH", "OFFSET", "QUERY", "ROW", "ROWS", "SORT", "SORTN", "UNIQUE", "VLOOKUP"] },
  { id: "math", label: "Math & Trig", fns: ["ABS", "AVERAGE", "CEILING", "EXP", "FLOOR", "INT", "LN", "LOG", "MOD", "POWER", "RAND", "RANDBETWEEN", "ROUND", "ROUNDDOWN", "ROUNDUP", "SQRT", "SUMIF", "SUMIFS", "SUMPRODUCT", "TRUNC"] },
  { id: "statistical", label: "Statistical", fns: ["AVERAGEIF", "AVERAGEIFS", "COUNTA", "COUNTIF", "COUNTIFS", "LARGE", "MAX", "MEDIAN", "MIN", "MODE", "RANK", "SMALL", "STDEV"] },
];
/** "All" is every function above and the five quick ones, A to Z. */
export const FUNCTIONS_ALL = [...new Set([...FUNCTIONS_QUICK, ...FUNCTION_CATEGORIES.flatMap((c) => c.fns)])].sort();

/** The functions that really work in the tutorial, and the formula each puts in its result cell. `{range}` is the Cost column rows. */
export const FUNCTION_RUN = {
  /** First result row (index) and the label / value columns of the little results block under the Total. */
  firstRow: 11,
  labelCol: 2,
  valueCol: 3,
  range: "D2:D9",
  quick: { SUM: "Sum", AVERAGE: "Average", COUNT: "Count", MAX: "Highest", MIN: "Lowest" } as Record<string, string>,
  logical: { formula: '=IF(F2="Overdue","Chase","OK")', header: "Action" },
  today: { label: "Today", formula: "=TODAY()", row: 11 },
  lookup: { label: "Team lunch cost", formula: '=VLOOKUP("Team lunch",A2:D9,4,FALSE)', row: 12 },
  indexMatch: { label: "Cloud hosting cost", formula: '=INDEX(D2:D9,MATCH("Cloud hosting",A2:A9,0))', row: 13 },
};

/* ---------------- Find and replace (shared by Edit > Find and replace and the Search tool) ---------------- */

export const FIND_DIALOG = {
  title: "Find and replace",
  find: "Find",
  replace: "Replace with",
  search: "Search",
  scopes: ["All sheets", "This sheet"],
  options: [
    { id: "case", label: "Match case" },
    { id: "entire", label: "Match entire cell contents" },
    { id: "regex", label: "Search using regular expressions", help: "Help" },
    { id: "formulas", label: "Also search within formulas" },
    { id: "links", label: "Also search within links" },
  ],
  buttons: { find: "Find", replace: "Replace", replaceAll: "Replace all", done: "Done" },
  /** "2 of 3" under the Find box. */
  count: (now: number, total: number) => (total === 0 ? "No results" : `${now} of ${total}`),
  replaced: (n: number) => (n === 1 ? "1 match replaced" : `${n} matches replaced`),
};

/* ---------------- Link, comment, filter, more ---------------- */

export const TB_LINK = { text: "Vendor site", href: "https://example.com", secondSheet: "Vendors" };
export const TB_COMMENT = { text: "Please confirm this cost", mention: "@Priya Shah", cell: "D3" };
export const MORE_HIDDEN_FROM = 9; // tools from "Borders" on are tucked away when the toolbar is collapsed

/* ---------------- Header tools ---------------- */

export const HEADER_APPS: { id: string; name: string; logo: LogoName }[] = [
  { id: "360", name: "Snaarp 360", logo: "360" },
  { id: "mail", name: "Snaarp Mail", logo: "mail" },
  { id: "doc", name: "Snaarp Doc", logo: "docs" },
  { id: "slides", name: "Snaarp Slides", logo: "presentation" },
  { id: "sheets", name: "Snaarp Sheets", logo: "sheet" },
  { id: "admin", name: "Snaarp Admin", logo: "snaarp" },
];
export const HEADER_COPY = {
  appsTitle: "Snaarp apps",
  current: "Current",
  meetStart: "Start new meeting",
  meetJoin: "Join with link",
  meetDialog: { title: "Meeting started", text: "Share this link so others can join", link: "https://meet.example.com/acme-q3-review", copy: "Copy", copied: "Link copied", done: "Done" },
  joinDialog: { title: "Have a meeting code?", text: "Enter the meeting code or link to join the meeting", placeholder: "Enter the meeting code or link", sample: "https://meet.example.com/acme-q3-review", button: "Continue" },
  lock: { title: "Restricted", text: "Only people you add can open this spreadsheet", change: "Change" },
  account: { name: "Alex Morgan", email: "alex.morgan@example.com", initials: "AM", manage: "Manage your account", signOut: "Sign out" },
  versionsToast: "Version history opened",
};
