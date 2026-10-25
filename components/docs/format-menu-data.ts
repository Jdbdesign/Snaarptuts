import type { IconName } from "@/components/icons";
import type { Align, HeadingLevel, TextFormat } from "./editor-state";

/** Items, groups, shortcuts, submenus and greyed-out flags of the Format menu. Edit here, not in FormatMenu.tsx. */

export type FormatItemId =
  | "text"
  | "paragraph"
  | "align"
  | "bullets"
  | "headers"
  | "page-numbers"
  | "orientation"
  | "columns"
  | "clear";

/** The submenus that open to the right of a row. */
export type FormatSubId = "text" | "paragraph" | "align" | "bullets";

export type FormatMenuItem = {
  id: FormatItemId;
  label: string;
  icon?: IconName;
  shortcut?: string;
  /** Greyed out: no hover, no click. */
  disabled?: boolean;
  /** Opens this submenu (right chevron). */
  submenu?: FormatSubId;
};

/** Groups are separated by a thin divider. Clear formatting has no icon (as in the recording). */
export const FORMAT_MENU: FormatMenuItem[][] = [
  [
    { id: "text", label: "Text", icon: "fmText", submenu: "text" },
    { id: "paragraph", label: "Paragraph styles", icon: "fmHeading", submenu: "paragraph" },
    { id: "align", label: "Align & indent", icon: "fmAlign", submenu: "align" },
    { id: "bullets", label: "Bullets & numbering", icon: "fmList", submenu: "bullets" },
  ],
  [
    { id: "headers", label: "Headers & footers", icon: "fmHeaderFooter" },
    { id: "page-numbers", label: "Page numbers", icon: "fmHash" },
    { id: "orientation", label: "Page orientation", icon: "fmOrientation" },
    { id: "columns", label: "Columns", icon: "fmColumns", disabled: true },
  ],
  [{ id: "clear", label: "Clear formatting", shortcut: "Ctrl+\\" }],
];

export type FormatSubItemId =
  | "bold"
  | "italic"
  | "underline"
  | "strike"
  | "sup"
  | "sub"
  | "style-normal"
  | "style-h1"
  | "style-h2"
  | "style-h3"
  | "style-h4"
  | "style-h5"
  | "style-h6"
  | "align-left"
  | "align-center"
  | "align-right"
  | "align-justify"
  | "indent-more"
  | "indent-less"
  | "bullet-list"
  | "numbered-list"
  | "checklist";

export type FormatSubItem = {
  id: FormatSubItemId;
  label: string;
  shortcut?: string;
  /** Paragraph styles show each label in its own style: font size in px and weight. */
  font?: { size: number; weight: number };
  /** Row height in px (default 24). The recording spaces the headings out a little more. */
  height?: number;
};

/** Each submenu is a list of groups, separated by a thin divider. */
export const FORMAT_SUBMENUS: Record<FormatSubId, FormatSubItem[][]> = {
  text: [
    [
      { id: "bold", label: "Bold", shortcut: "Ctrl+B" },
      { id: "italic", label: "Italic", shortcut: "Ctrl+I" },
      { id: "underline", label: "Underline", shortcut: "Ctrl+U" },
      { id: "strike", label: "Strikethrough" },
      { id: "sup", label: "Superscript" },
      { id: "sub", label: "Subscript" },
    ],
  ],
  paragraph: [
    [{ id: "style-normal", label: "Normal text", font: { size: 11, weight: 400 } }],
    [
      { id: "style-h1", label: "Heading 1", font: { size: 15, weight: 700 }, height: 32 },
      { id: "style-h2", label: "Heading 2", font: { size: 14, weight: 700 }, height: 30 },
      { id: "style-h3", label: "Heading 3", font: { size: 12.5, weight: 700 }, height: 26 },
      { id: "style-h4", label: "Heading 4", font: { size: 12, weight: 700 }, height: 24 },
      { id: "style-h5", label: "Heading 5", font: { size: 10.5, weight: 700 }, height: 22 },
      { id: "style-h6", label: "Heading 6", font: { size: 9, weight: 700 }, height: 22 },
    ],
  ],
  align: [
    [
      { id: "align-left", label: "Left" },
      { id: "align-center", label: "Center" },
      { id: "align-right", label: "Right" },
      { id: "align-justify", label: "Justify" },
    ],
    [
      { id: "indent-more", label: "Increase indent" },
      { id: "indent-less", label: "Decrease indent" },
    ],
  ],
  bullets: [
    [
      { id: "bullet-list", label: "Bullet list" },
      { id: "numbered-list", label: "Numbered list" },
      { id: "checklist", label: "Checklist" },
    ],
  ],
};

/** What each submenu row changes. Read by format-timeline.ts. */
export const FORMAT_OF: Partial<Record<FormatSubItemId, TextFormat>> = {
  bold: "bold",
  italic: "italic",
  underline: "underline",
  strike: "strike",
  sup: "sup",
  sub: "sub",
};

/** Paragraph style rows: 0 is Normal text. */
export const STYLE_OF: Partial<Record<FormatSubItemId, HeadingLevel | 0>> = {
  "style-normal": 0,
  "style-h1": 1,
  "style-h2": 2,
  "style-h3": 3,
  "style-h4": 4,
  "style-h5": 5,
  "style-h6": 6,
};

export const ALIGN_OF: Partial<Record<FormatSubItemId, Align>> = {
  "align-left": "left",
  "align-center": "center",
  "align-right": "right",
  "align-justify": "justify",
};

/** One indent step moves a paragraph this many px (0.5 inch on the sample page). */
export const INDENT_PX = 36;
/** Most indent steps a paragraph can take. */
export const INDENT_MAX = 8;

/** What the toolbar's style box says. */
export const STYLE_LABELS: Record<HeadingLevel | 0, string> = {
  0: "Normal text",
  1: "Heading 1",
  2: "Heading 2",
  3: "Heading 3",
  4: "Heading 4",
  5: "Heading 5",
  6: "Heading 6",
};
