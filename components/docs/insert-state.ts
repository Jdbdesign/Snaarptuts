/*
 * What the Insert menu has added to the page (Snaarp Doc steps 20 to 22). It lives next to the editor state, not in it,
 * so the text logic of steps 10 to 18 stays untouched. EditorStage reads the scene variables `pageImage` and
 * `pageTable` (null = nothing inserted) and DocumentView draws them.
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

export type PageInserts = {
  image: ImageState | null;
  table: TableState | null;
};

export const NO_INSERTS: PageInserts = { image: null, table: null };

/** An empty table of the given size. */
export function emptyTable(after: string, rows: number, cols: number): TableState {
  return { after, cells: Array.from({ length: rows }, () => Array.from({ length: cols }, () => "")), focus: { row: 0, col: 0 } };
}

export const tableWords = (t: TableState | null) =>
  t ? t.cells.flat().reduce((n, c) => n + (c.trim() ? c.trim().split(/\s+/).length : 0), 0) : 0;
