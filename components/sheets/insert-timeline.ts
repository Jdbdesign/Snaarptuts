import type { Timeline } from "@/lib/timeline";
import { beginEdit, chooseRow, chooseSub, setRows } from "./edit-timeline";
import { COLUMN_COUNT, ROW_COUNT } from "./sheets-data";
import { parseRef, single } from "./grid-state";
import { INSERT_BOOK, insertRows } from "./sheets-sample";
import { pressOn } from "./sheets-timeline";

/*
 * Timeline helpers for the Insert steps (37-55). They sit on top of edit-timeline.ts (menus, cells, history) and add the
 * Insert-specific start state and clicks. Hooks: menu-item-ins-*, menu-sub-<id> (cells-down, row-above, col-left, img-cell, fn-sum...),
 * rowhead-<n>, colhead-<letter>, sheet-tab-<id>.
 */

/** The start of every Insert step: the sample sheet open, A1 selected, nothing open, 100% zoom. Extra variables are reset by the step helpers that add them. */
export function beginInsert(tl: Timeline, url: string, cursor?: [number, number]) {
  beginEdit(tl, url, cursor);
  tl.setVar("sheets", INSERT_BOOK.sheets);
  tl.setVar("activeSheet", INSERT_BOOK.sheets[0].id);
  tl.setVar("title", INSERT_BOOK.title);
}

/** The sample sheet again (between two demos in one step): A1 selected, no history. */
export function resetInsertSheet(tl: Timeline) {
  setRows(tl, insertRows());
  tl.setVar("history", { past: [], future: [] });
  tl.setVar("sel", single(0, 0));
}

/** Click a row header: the whole row is selected. */
export async function clickRowHead(tl: Timeline, row: number) {
  const sel = `[data-tl=rowhead-${row}]`;
  await pressOn(tl, sel, { ms: 700, ring: false });
  tl.setVar("sel", { r1: row - 1, c1: 0, r2: row - 1, c2: COLUMN_COUNT - 1 });
}

/** Click a column header: the whole column is selected. */
export async function clickColHead(tl: Timeline, letter: string) {
  const sel = `[data-tl=colhead-${letter.toLowerCase()}]`;
  await pressOn(tl, sel, { ms: 700, ring: false });
  const [, c] = parseRef(`${letter}1`);
  tl.setVar("sel", { r1: 0, c1: c, r2: ROW_COUNT - 1, c2: c });
}

/** Click an Insert menu row that has no submenu (the menu closes). */
export const chooseInsert = (tl: Timeline, id: string, opts: { ms?: number; keepOpen?: boolean } = {}) => chooseRow(tl, id, opts);

/** Open a row's submenu and click one of its rows. */
export const chooseInsertSub = chooseSub;
