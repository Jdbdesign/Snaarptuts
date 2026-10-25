import type { Timeline } from "@/lib/timeline";
import { TABLE } from "./insert-data";
import { emptyTable, type TableState } from "./insert-state";
import { placeCaret } from "./editor-state";
import { markEdited, SAMPLE_EDITOR, setEditor } from "./editor-timeline";
import { SAMPLE_BLOCKS } from "./sample-document";

/*
 * Timeline helpers for what the Insert menu adds to the page (Snaarp Doc steps 20 to 22). The scene variables are
 * `pageImage`, `pageTable` (EditorStage draws them) and the Insert Link dialog's own (see LinkDialog.tsx).
 * Every helper waits with the timeline's own clock, so Pause freezes it.
 */

// ---- start states ----------------------------------------------------------------

/** The sample document with the caret at the end of the intro paragraph: where the table will go (start of step 21). */
export const TABLE_SPOT_EDITOR = (() => {
  const block = SAMPLE_BLOCKS.findIndex((b) => b.id === TABLE.after);
  return placeCaret(SAMPLE_EDITOR, { block, offset: SAMPLE_BLOCKS[block].text.length });
})();

// ---- table -------------------------------------------------------------------------

const cell = (row: number, col: number) => `[data-tl=table-cell-${row}-${col}]`;

const getTable = (tl: Timeline) => tl.getVar<TableState | null>("pageTable", null);

function setTable(tl: Timeline, next: (t: TableState) => TableState) {
  const t = getTable(tl);
  if (t) tl.setVar("pageTable", next(t));
}

/** Insert the empty table under its block: the first header cell has the focus and the editor's caret goes away. */
export function insertTable(tl: Timeline, rows: number, cols: number) {
  tl.setVar("pageTable", emptyTable(TABLE.after, rows, cols));
  setEditor(tl, (s) => ({ ...s, caret: null, sel: null }));
  markEdited(tl);
}

/** Glide to a cell and click it: the cell gets the focus outline and the caret. */
export async function clickCell(tl: Timeline, row: number, col: number, opts: { ms?: number } = {}) {
  await tl.moveCursorTo(cell(row, col), { ms: opts.ms ?? 600, dx: -20 });
  await tl.click(cell(row, col));
  setTable(tl, (t) => ({ ...t, focus: { row, col } }));
}

/** Click a cell and type into it, one character at a time. */
export async function typeInCell(
  tl: Timeline,
  row: number,
  col: number,
  text: string,
  opts: { msPerChar?: number; moveMs?: number } = {},
) {
  await clickCell(tl, row, col, { ms: opts.moveMs });
  for (let n = 1; n <= text.length; n++) {
    await tl.wait(opts.msPerChar ?? 90);
    const part = text.slice(0, n);
    setTable(tl, (t) => ({ ...t, cells: t.cells.map((r, ri) => r.map((c, ci) => (ri === row && ci === col ? part : c))) }));
  }
  markEdited(tl);
}

export const clearTableFocus = (tl: Timeline) => setTable(tl, (t) => ({ ...t, focus: null }));
