import type { IconName } from "@/components/icons";

/** Copy, menu names and toolbar order of the Snaarp Doc editor (DocEditor). Edit here, not in the layout code. */

export const EDITOR = {
  badge: ".DOCX",
  saved: "All changes saved",
  unsaved: "Unsaved changes",
  save: "Save",
  editing: "Editing",
  suggesting: "Suggesting",
  share: "Share",
  footerPages: "1 page",
  footerWords: "0 words",
  wordsLabel: "words",
  footerZoom: "Zoom: 100%",
  footerVersion: "v1",
  user: { initials: "JD" },
};

/** `early` menus are already shown while the document is still loading. */
export const MENUS: { id: string; label: string; early: boolean }[] = [
  { id: "file", label: "File", early: true },
  { id: "edit", label: "Edit", early: true },
  { id: "view", label: "View", early: true },
  { id: "insert", label: "Insert", early: false },
  { id: "format", label: "Format", early: false },
  { id: "tools", label: "Tools", early: true },
  { id: "help", label: "Help", early: true },
  { id: "esignature", label: "eSignature", early: false },
];

/** Icon buttons between the Editing/Suggesting toggle and the Share button. */
export const HEADER_ICONS: { id: string; icon: IconName; label: string }[] = [
  { id: "outline", icon: "listView", label: "Outline" },
  { id: "comments", icon: "edComment", label: "Comments" },
  { id: "history", icon: "edHistory", label: "Version history" },
];

export type ToolItem = {
  id: string;
  /** A button shows only its icon; a select shows `label` (and a chevron). */
  icon?: IconName;
  label?: string;
  chevron?: boolean;
  /** Width in design px of a select. */
  width?: number;
  disabled?: boolean;
  /** Colour of the bar under the icon (text colour, highlight). */
  bar?: string;
};

/** The toolbar, left to right. A thin divider sits between groups. */
export const TOOLBAR: ToolItem[][] = [
  [
    { id: "search", icon: "search" },
    { id: "undo", icon: "edUndo", disabled: true },
    { id: "redo", icon: "edRedo", disabled: true },
  ],
  [
    { id: "print", icon: "edPrint" },
    { id: "paint", icon: "edPaintFormat" },
  ],
  [{ id: "zoom", icon: "edZoom", label: "100%", chevron: true, width: 62 }],
  [{ id: "style", label: "Normal text", chevron: true, width: 92 }],
  [{ id: "font", label: "Arial", chevron: true, width: 82 }],
  [
    { id: "size-down", icon: "edMinus" },
    { id: "size", label: "11", chevron: true, width: 34 },
    { id: "size-up", icon: "plus" },
  ],
  [
    { id: "bold", icon: "edBold" },
    { id: "italic", icon: "edItalic" },
    { id: "underline", icon: "edUnderline" },
  ],
  [
    { id: "color", icon: "edTextColor", bar: "#111111" },
    { id: "highlight", icon: "edHighlight", bar: "#FACC15" },
  ],
  [
    { id: "link", icon: "edLink" },
    { id: "image", icon: "edImage" },
  ],
  [
    { id: "align-left", icon: "edAlignL" },
    { id: "align-center", icon: "edAlignC" },
    { id: "align-right", icon: "edAlignR" },
    { id: "align-justify", icon: "edAlignJ" },
  ],
  [
    { id: "spacing", icon: "edLineSpacing", chevron: true },
    { id: "bullets", icon: "edBullets", chevron: true },
    { id: "numbers", icon: "edNumbers", chevron: true },
  ],
  [
    { id: "indent", icon: "edIndent" },
    { id: "outdent", icon: "edOutdent" },
  ],
  [{ id: "strike", icon: "edStrike" }],
  [
    { id: "sup", icon: "edSup" },
    { id: "sub", icon: "edSub" },
  ],
  [
    { id: "quote", icon: "edQuote" },
    { id: "rule", icon: "edHr" },
    { id: "table", icon: "edTable", chevron: true },
  ],
  [{ id: "fullscreen", icon: "edFullscreen" }],
  [
    { id: "pen", icon: "edPen" },
    { id: "pen-tag", icon: "edPenTag" },
    { id: "emoji", icon: "edEmoji" },
    { id: "signature", icon: "edSignature" },
  ],
  [{ id: "pen-menu", icon: "edPen", chevron: true }],
];
