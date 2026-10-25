/*
 * What the Insert menu has added to the page (Snaarp Doc steps 20 to 26). It lives next to the editor state, not in it,
 * so the text logic of steps 10 to 18 stays untouched. EditorStage reads the scene variables `pageImage`, `pageTable`,
 * `pageRules`, `pageBreak`, `pageBookmarks`, `pageHeader`, `pageFooter` and `watermark` (null / empty = nothing
 * inserted) and DocumentView / PageDecor draw them.
 */

export type ImageState = {
  /** Four blue corner handles and the floating image toolbar show. */
  selected: boolean;
};

export type TableState = {
  /** Id of the text block the table sits under. */
  after: string;
  /** Header row first. */
  cells: string[][];
  /** The cell that has the caret and the focus outline. */
  focus: { row: number; col: number } | null;
};

/** A bookmark marker at the start of a text block. */
export type BookmarkState = { id: string; before: string; name: string };

/** The header or footer text zone of the page. `focus`: the caret blinks in it. */
export type ZoneState = { text: string; focus: boolean };

export type WatermarkState = {
  text: string;
  /** The Transparency slider, 0 to 100 (higher = fainter). */
  transparency: number;
  layout: "diagonal" | "horizontal";
};

export type PageInserts = {
  image: ImageState | null;
  table: TableState | null;
  /** Ids of the text blocks a horizontal line sits right before. */
  rules: string[];
  /** Id of the text block a page break sits right before (that block and everything after it is on page 2). */
  pageBreakBefore: string | null;
  bookmarks: BookmarkState[];
  header: ZoneState | null;
  footer: ZoneState | null;
  watermark: WatermarkState;
};

export const DEFAULT_WATERMARK: WatermarkState = { text: "", transparency: 75, layout: "diagonal" };

export const NO_INSERTS: PageInserts = {
  image: null,
  table: null,
  rules: [],
  pageBreakBefore: null,
  bookmarks: [],
  header: null,
  footer: null,
  watermark: DEFAULT_WATERMARK,
};

/** An empty table of the given size. */
export function emptyTable(after: string, rows: number, cols: number): TableState {
  return { after, cells: Array.from({ length: rows }, () => Array.from({ length: cols }, () => "")), focus: { row: 0, col: 0 } };
}

export const tableWords = (t: TableState | null) =>
  t ? t.cells.flat().reduce((n, c) => n + (c.trim() ? c.trim().split(/\s+/).length : 0), 0) : 0;

/** How many pages the document has: 2 after a page break. */
export const pageCount = (i: Pick<PageInserts, "pageBreakBefore">) => (i.pageBreakBefore ? 2 : 1);

/** The padding above the text of a page (DocEditor), and the height of page 1's text area once a page break splits the document. */
export const PAGE_TOP_PAD = 52;
export const PAGE_BODY_MIN = 740;
