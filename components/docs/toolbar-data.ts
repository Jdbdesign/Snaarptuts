import type { LogoName } from "@/components/icons";
import type { EditorMode } from "./editor-data";

/*
 * Copy, option lists and sample values of the toolbar and header tools (Snaarp Doc steps 45 to 64). Edit here, not in
 * the components. Recording: ref/docs/Snaarp_Doc_toolbar.mp4 (tooltips 0:00-0:45, header buttons 0:45-1:23).
 * `seen` marks tooltips that read clearly in the recording; the rest are inferred from the button (the cursor left
 * before a tooltip showed).
 */

/** Tooltip of each toolbar tool: the text the dark bubble shows. */
export const TOOL_TIPS: Record<string, string> = {
  search: "Search the menus (Alt+/)",
  undo: "Undo (Ctrl+Z)",
  redo: "Redo (Ctrl+Y)",
  print: "Print (Ctrl+P)", // seen
  paint: "Paint format",
  zoom: "Zoom", // seen
  style: "Paragraph styles",
  font: "Font",
  "size-down": "Decrease font size",
  size: "Font size",
  "size-up": "Increase font size",
  bold: "Bold (Ctrl+B)", // seen
  italic: "Italic (Ctrl+I)", // seen
  underline: "Underline (Ctrl+U)", // seen
  color: "Text color", // seen
  highlight: "Highlight color", // seen
  link: "Insert link (Ctrl+K)", // seen
  image: "Insert image",
  "align-left": "Align left", // seen
  "align-center": "Align center", // seen
  "align-right": "Align right", // seen
  "align-justify": "Justify", // seen
  spacing: "Line & paragraph spacing", // seen
  bullets: "Bullet list", // seen
  numbers: "Numbered list", // seen
  indent: "Increase indent (Tab)", // seen
  outdent: "Decrease indent (Shift+Tab)",
  clear: "Clear formatting", // seen (the button with the crossed S)
  sup: "Superscript", // seen
  sub: "Subscript", // seen
  quote: "Block quote",
  rule: "Horizontal rule", // seen
  table: "Table", // seen
  fullscreen: "Full screen", // seen
  esign: "eSignature", // seen
  drawing: "Drawing", // seen
  emoji: "Symbols & Emoji", // seen
  shortcuts: "Keyboard shortcuts", // seen
  "pen-menu": "Editing mode", // seen
};

/** Tooltips of the header buttons. */
export const HEADER_TIPS: Record<string, string> = {
  outline: "Document outline",
  comments: "Comments",
  history: "Version history", // seen
  meet: "Meet",
  apps: "Snaarp apps", // seen
  share: "Share document", // seen
};

// ---- zoom, style, font, size ---------------------------------------------------------------------------

export const ZOOM_OPTIONS = [50, 75, 90, 100, 125, 150, 200];

export const FONT_MENU = {
  search: "Search fonts...",
  /** The list is sample fonts every computer has. Arial is the document's font and shows a tick. */
  fonts: ["Arial", "Georgia", "Times New Roman", "Verdana", "Trebuchet MS", "Courier New", "Tahoma", "Palatino", "Garamond"],
  /** The CSS stack each font is drawn in (the name itself is the list label). */
  stacks: {
    Arial: "Arial, Helvetica, sans-serif",
    Georgia: "Georgia, 'Times New Roman', serif",
    "Times New Roman": "'Times New Roman', Times, serif",
    Verdana: "Verdana, Geneva, sans-serif",
    "Trebuchet MS": "'Trebuchet MS', Helvetica, sans-serif",
    "Courier New": "'Courier New', Courier, monospace",
    Tahoma: "Tahoma, Geneva, sans-serif",
    Palatino: "'Palatino Linotype', Palatino, serif",
    Garamond: "Garamond, 'Times New Roman', serif",
  } as Record<string, string>,
  default: "Arial",
};

/** The size list (pt). The recording's list starts at 8. */
export const SIZE_OPTIONS = [8, 9, 10, 11, 12, 14, 18, 24, 30, 36, 48, 60, 72, 96];

// ---- colours ---------------------------------------------------------------------------------------------

/** The text colour palette: four rows of eight, from greys to strong, pale and dark tones. The first swatch is the document's black. */
export const TEXT_COLORS = [
  ["#111111", "#444B57", "#6B7280", "#9AA0AB", "#C4C8D0", "#E3E5EA", "#F3F4F7", "#FFFFFF"],
  ["#D92D20", "#E8803A", "#F2B600", "#2E9E5B", "#14A3A3", "#1D63D9", "#5B3CC4", "#C2338F"],
  ["#F4B8B2", "#F7D0B0", "#FBE9A6", "#B7E0C4", "#B3E1E1", "#B8CFF5", "#CFC3F0", "#EEB9DC"],
  ["#A32117", "#B25A1D", "#B38600", "#1F7340", "#0E7676", "#1348A3", "#432A94", "#8F2468"],
];

/** The highlight palette: pale tones that keep text readable. */
export const HIGHLIGHT_COLORS = [
  ["#FDE047", "#FDBA74", "#FCA5A5", "#F9A8D4", "#C4B5FD", "#93C5FD", "#86EFAC", "#67E8F9"],
  ["#FEF08A", "#FED7AA", "#FECACA", "#FBCFE8", "#DDD6FE", "#BFDBFE", "#BBF7D0", "#A5F3FC"],
];

export const COLOR_MENU = { reset: "Reset", resetHighlight: "None", textTitle: "Text color", highlightTitle: "Highlight color" };

// ---- spacing, lists, modes ---------------------------------------------------------------------------------

export const SPACING_MENU = {
  options: [
    { value: 1, label: "Single" },
    { value: 1.15, label: "1.15" },
    { value: 1.5, label: "1.5" },
    { value: 2, label: "Double" },
  ],
  /** The two rows under the divider are shown but not wired (the recording never opens this menu). */
  extras: ["Add space before paragraph", "Add space after paragraph"],
  default: 1.15,
};

export const LIST_MENU = {
  bullets: [
    { id: "bullet", label: "Bullet list" },
    { id: "check", label: "Checklist" },
  ],
  numbers: [
    { id: "number", label: "1. 2. 3." },
    { id: "alpha", label: "a. b. c." },
    { id: "roman", label: "i. ii. iii." },
  ],
};

export const MODE_DROPDOWN: { id: EditorMode; label: string; hint: string }[] = [
  { id: "editing", label: "Editing", hint: "Edit the document directly" },
  { id: "suggesting", label: "Suggesting", hint: "Your edits become suggestions" },
  { id: "viewing", label: "Viewing", hint: "Read the final document" },
];

/** The table size picker (Table dropdown): squares across and down. */
export const TABLE_PICKER = { cols: 6, rows: 5, label: (r: number, c: number) => `${r} x ${c}` };

// ---- Meet, apps, share ---------------------------------------------------------------------------------------

export const MEET = {
  items: [
    { id: "start", label: "Start new meeting" },
    { id: "join", label: "Join with link" },
  ],
  join: {
    title: "Have a meeting code?",
    text: "Enter the meeting code or link to join the meeting",
    placeholder: "Enter the meeting code or link",
    continue: "Continue",
  },
  /** Sample code typed in step 61. No real meeting starts. */
  sampleCode: "abc-defg-hij",
  toast: "Meeting ready (sample)",
};

export const APPS = {
  title: "Snaarp apps",
  /** The tiles, left to right, three to a row: the first nine show; the panel scrolls for the rest. */
  tiles: [
    { id: "mail", label: "Mail", logo: "mail" },
    { id: "meet", label: "Meet", logo: "meet" },
    { id: "teams", label: "Teams", logo: "teams" },
    { id: "onecard", label: "One Card", logo: "onecard" },
    { id: "sheets", label: "Sheets", logo: "sheet" },
    { id: "docs", label: "Docs", logo: "docs", current: true },
    { id: "slides", label: "Slides", logo: "presentation" },
    { id: "pdf", label: "PDF", logo: "pdf" },
    { id: "lock", label: "Lock", logo: "lock" },
    { id: "sign", label: "Sign", logo: "sign" },
    { id: "drive", label: "Drive", logo: "drive" },
    { id: "me", label: "Me", logo: "me" },
    { id: "crm", label: "CRM", logo: "crm" },
    { id: "books", label: "Books", logo: "books" },
    { id: "workforce", label: "Workforce", logo: "workforce" },
    { id: "projects", label: "Project", logo: "projects" },
    { id: "zeus", label: "Zeus", logo: "zeus" },
    { id: "verifyrit", label: "Verifyrit", logo: "verifyrit" },
    { id: "360", label: "360", logo: "360" },
  ] as { id: string; label: string; logo: LogoName; current?: boolean }[],
};

/** Sample saved versions of the Version history page (step 62). The first is the current version. */
export const VERSIONS = [
  { group: "Today", items: [{ time: "Today, 2:13 AM", current: true }, { time: "Today, 2:00 AM" }] },
  { group: "Yesterday", items: [{ time: "Yesterday, 6:01 PM" }, { time: "Yesterday, 1:16 PM" }, { time: "Yesterday, 1:05 PM" }] },
  { group: "October 24", items: [{ time: "October 24, 5:00 AM" }, { time: "October 24, 3:52 AM" }] },
];
export const VERSION_AUTHOR = "Jane Doe";
export const VERSION_CURRENT = "Current version";
export const VERSION_NOTE = "Changes since the previous version are highlighted.";

/** The emoji picker uses the Symbols dialog's Emoji category; step 59 inserts this one. */
export const EMOJI_PICK = "👍";
