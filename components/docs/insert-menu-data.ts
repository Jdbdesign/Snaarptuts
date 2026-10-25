import type { IconName } from "@/components/icons";

/** Items, groups, shortcuts, submenus and greyed-out flags of the Insert menu. Edit here, not in InsertMenu.tsx. */

export type InsertItemId =
  | "image"
  | "table"
  | "link"
  | "hr"
  | "break"
  | "bookmark"
  | "page-elements"
  | "quote"
  | "checklist"
  | "code"
  | "esignature"
  | "drawing"
  | "symbols"
  | "comment";

/** The submenus that open to the right of a row. */
export type InsertSubId = "break" | "page-elements";

export type InsertMenuItem = {
  id: InsertItemId;
  label: string;
  icon: IconName;
  shortcut?: string;
  /** Greyed out: no hover, no click. */
  disabled?: boolean;
  /** Opens this submenu (right chevron). */
  submenu?: InsertSubId;
};

/** Groups are separated by a thin divider. */
export const INSERT_MENU: InsertMenuItem[][] = [
  [
    { id: "image", label: "Image", icon: "edImage" },
    { id: "table", label: "Table", icon: "edTable" },
    { id: "link", label: "Link", icon: "edLink", shortcut: "Ctrl+K" },
    { id: "hr", label: "Horizontal line", icon: "edHr" },
  ],
  [
    { id: "break", label: "Break", icon: "imBreak", submenu: "break" },
    { id: "bookmark", label: "Bookmark", icon: "imBookmark" },
    { id: "page-elements", label: "Page elements", icon: "docFile", submenu: "page-elements" },
  ],
  [
    { id: "quote", label: "Block quote", icon: "edQuote" },
    { id: "checklist", label: "Checklist", icon: "imChecklist" },
    { id: "code", label: "Code block", icon: "imCode" },
  ],
  [
    { id: "esignature", label: "eSignature", icon: "edPen" },
    { id: "drawing", label: "Drawing", icon: "imDrawing" },
    { id: "symbols", label: "Symbols", icon: "edEmoji" },
  ],
  [{ id: "comment", label: "Comment", icon: "edComment", shortcut: "Ctrl+Alt+M", disabled: true }],
];

export type InsertSubItemId =
  | "page-break"
  | "section-next"
  | "section-continuous"
  | "toc"
  | "toc-links"
  | "toc-plain"
  | "toc-update"
  | "header"
  | "footer"
  | "watermark"
  | "page-numbers"
  | "footnote";

export type InsertSubItem = {
  id: InsertSubItemId;
  label: string;
  shortcut?: string;
  /** A third-level card (right chevron). Groups inside it are separated by a thin divider. */
  nested?: InsertSubItem[][];
};

/** The submenus. The recording shows the Page break shortcut with the Mac key; the sample uses "Ctrl+Enter". */
export const INSERT_SUBMENUS: Record<InsertSubId, InsertSubItem[]> = {
  break: [
    { id: "page-break", label: "Page break", shortcut: "Ctrl+Enter" },
    { id: "section-next", label: "Section break (next page)" },
    { id: "section-continuous", label: "Section break (continuous)" },
  ],
  "page-elements": [
    {
      id: "toc",
      label: "Table of contents",
      nested: [
        [
          { id: "toc-links", label: "With links (blue)" },
          { id: "toc-plain", label: "Plain text" },
        ],
        [{ id: "toc-update", label: "Update table of contents" }],
      ],
    },
    { id: "header", label: "Header" },
    { id: "footer", label: "Footer" },
    { id: "watermark", label: "Watermark" },
    { id: "page-numbers", label: "Page numbers" },
    { id: "footnote", label: "Footnote" },
  ],
};
