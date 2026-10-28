import type { IconName } from "@/components/icons";
import { formatGBP } from "@/lib/money";
import { SHEET } from "./sheets-data";

/*
 * Copy, menus and sample content of the Snaarp Sheets Edit and View menus (steps 20-36).
 * Recording: ref/sheets/Snaarp_Sheets_edit_view.mp4 (git-ignored). Labels, order, groups, shortcut glyphs and ticks are read from it;
 * the recording's real data (domains, user names) is replaced by the Acme Studio budget. Edit here, not in the components.
 */

export type MenuRow = {
  id: string;
  label: string;
  icon?: IconName;
  /** Right-aligned glyphs as the recording shows them (macOS). */
  shortcut?: string;
  /** The same shortcut on Windows, for captions. */
  ctrl?: string;
  sub?: string;
  /** Greyed out: it can be hovered but never clicked. */
  disabled?: boolean;
  /** A small tooltip bubble shown beside a greyed row while it is hovered. */
  tip?: string;
};

export type MenuId = "edit" | "view";

export const EDIT_MENU: MenuRow[][] = [
  [
    { id: "undo", label: "Undo", icon: "edUndo", shortcut: "⌘Z", ctrl: "Ctrl+Z" },
    { id: "redo", label: "Redo", icon: "edRedo", shortcut: "⌘Y", ctrl: "Ctrl+Y" },
  ],
  [
    { id: "cut", label: "Cut", icon: "emCut", shortcut: "⌘X", ctrl: "Ctrl+X" },
    { id: "copy", label: "Copy", icon: "copy", shortcut: "⌘C", ctrl: "Ctrl+C" },
    { id: "paste", label: "Paste", icon: "emPaste", shortcut: "⌘V", ctrl: "Ctrl+V" },
    { id: "pastespecial", label: "Paste special", icon: "emPastePlain", sub: "paste" },
  ],
  [{ id: "delete", label: "Delete", icon: "trash", sub: "delete" }],
  [{ id: "find", label: "Find and replace", icon: "shSearch", shortcut: "⌘⇧H", ctrl: "Ctrl+Shift+H" }],
];

export const VIEW_MENU: MenuRow[][] = [
  [
    { id: "show", label: "Show", icon: "eye", sub: "show" },
    { id: "freeze", label: "Freeze", icon: "shFreeze", sub: "freeze" },
    { id: "group", label: "Group", icon: "shGroup", sub: "group" },
    { id: "comments", label: "Comments", icon: "edComment", sub: "comments" },
  ],
  [{ id: "hidden", label: "Hidden sheets", icon: "shHidden", sub: "hidden", disabled: true, tip: "No hidden sheets" }],
  [
    { id: "zoom", label: "Zoom", icon: "edZoom", sub: "zoom" },
    { id: "fullscreen", label: "Full screen", icon: "edFullscreen" },
  ],
];

export const MENUS: Record<MenuId, MenuRow[][]> = { edit: EDIT_MENU, view: VIEW_MENU };

export const ZOOM_LEVELS = [50, 75, 90, 100, 125, 150, 200];

export type SubRow = { id: string; label: string };
export const MENU_SUBS: Record<string, SubRow[]> = {
  paste: [
    { id: "paste-values", label: "Paste values only" },
    { id: "paste-format", label: "Paste formatting only" },
    { id: "paste-transposed", label: "Paste transposed" },
  ],
  delete: [
    { id: "delete-values", label: "Values" },
    { id: "delete-row", label: "Row" },
    { id: "delete-col", label: "Column" },
  ],
  show: [
    { id: "show-bar", label: "Formula bar" },
    { id: "show-grid", label: "Gridlines" },
    { id: "show-formulas", label: "Formulas" },
  ],
  freeze: [
    { id: "freeze-r0", label: "No rows" },
    { id: "freeze-r1", label: "1 row" },
    { id: "freeze-r2", label: "2 rows" },
    { id: "freeze-rcur", label: "Up to current row" },
    { id: "freeze-c0", label: "No columns" },
    { id: "freeze-c1", label: "1 column" },
    { id: "freeze-c2", label: "2 columns" },
    { id: "freeze-ccur", label: "Up to current column" },
  ],
  group: [
    { id: "group-rows", label: "Group rows" },
    { id: "group-cols", label: "Group columns" },
  ],
  comments: [
    { id: "comments-show", label: "Show comments" },
    { id: "comments-hide", label: "Hide comments" },
  ],
  hidden: [],
  zoom: ZOOM_LEVELS.map((z) => ({ id: `zoom-${z}`, label: `${z}%` })),
};

/** Shown in the Group submenu once a group exists (the recording adds "Ungroup rows" after grouping). */
export const UNGROUP_ROWS: SubRow = { id: "ungroup-rows", label: "Ungroup rows" };
export const UNGROUP_COLS: SubRow = { id: "ungroup-cols", label: "Ungroup columns" };

/* ---------------- Sample sheet ---------------- */

export const EDIT_SAMPLE = {
  /** The cell the Undo / Redo steps type into, and what they type (pounds go through formatGBP). */
  typedCell: "C2",
  typed: formatGBP(150, { whole: true }),
  /** Header row look: bold on a pale fill, so "values only" and "formatting only" show a difference. */
  headerFill: "#E7EDFB",
  totalLabel: "Total",
};

/* ---------------- Find and replace ---------------- */

export const FIND = {
  title: "Find and replace",
  find: "Find",
  replace: "Replace with",
  matchCase: "Match case",
  entire: "Match entire cell contents",
  within: "Search within",
  withinValue: "This sheet",
  findBtn: "Find",
  replaceBtn: "Replace",
  replaceAllBtn: "Replace all",
  done: "Done",
  query: "Paid",
  replacement: "Settled",
  count: (n: number) => (n === 1 ? "1 match found" : `${n} matches found`),
  replaced: (n: number) => (n === 1 ? "1 match replaced" : `${n} matches replaced`),
};

/* ---------------- Comments panel ---------------- */

export const COMMENTS = {
  title: "Comments",
  tabs: [
    { id: "all", label: "All comments" },
    { id: "you", label: "For you" },
  ],
  chips: ["All types", "All sheets"],
  empty: "Start a discussion",
  add: "Add comment",
  placeholder: "Write a comment",
  post: "Comment",
  cancel: "Cancel",
  author: SHEET.owner,
  initials: "AM",
  text: "Please confirm this cost",
  cell: "C3",
  time: "28/10/2026, 21:48",
};

/* ---------------- Full screen ---------------- */

export const FULLSCREEN = { banner: "sheets.snaarp.com – To exit full screen, press", key: "Esc" };
