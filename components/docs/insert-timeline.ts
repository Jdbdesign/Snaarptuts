import type { Timeline } from "@/lib/timeline";
import { BOOKMARK, TABLE } from "./insert-data";
import { emptyTable, type BookmarkState, type TableState, type ZoneState } from "./insert-state";
import { showDocToast } from "./doc-toast-timeline";
import { placeCaret } from "./editor-state";
import { getEditor, markEdited, SAMPLE_EDITOR, setEditor } from "./editor-timeline";
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

// ---- link ---------------------------------------------------------------------------

/** Open the Insert Link dialog with the URL input focused (the address is typed with tl.typeText("link-url", ...)). */
export function openLinkDialog(tl: Timeline) {
  tl.setVar("field:link-url", "");
  tl.setVar("linkNewTab", true);
  tl.setVar("linkFocus", true);
  tl.setVar("linkDialog", true);
}

export function closeLinkDialog(tl: Timeline) {
  tl.setVar("linkFocus", false);
  tl.setVar("linkDialog", false);
}

/** Turn the selected text into a link: it gets the blue, underlined look and the selection clears. */
export function applyLink(tl: Timeline, id: string) {
  setEditor(tl, (s) => {
    if (!s.sel) return s;
    const { start, end } = s.sel;
    return { ...s, links: [...s.links, { id, block: start.block, from: start.offset, to: end.offset }], sel: null, caret: null };
  });
  markEdited(tl);
}

// ---- caret, line and page break -----------------------------------------------------------

/** Click at the very start of a text block: the selection clears and the caret blinks there. */
export async function clickStartOfBlock(tl: Timeline, blockId: string, opts: { ms?: number } = {}) {
  const block = getEditor(tl).blocks.findIndex((b) => b.id === blockId);
  if (block < 0) throw new Error(`Editor: no block "${blockId}"`);
  const sel = `[data-tl=doc-start-${blockId}]`;
  await tl.moveCursorTo(sel, { ms: opts.ms ?? 900, dx: 4 });
  await tl.click(sel);
  setEditor(tl, (s) => placeCaret(s, { block, offset: 0 }));
}

/** The id of the block that a line or break at the caret goes right before: the caret's own block at its start, else the next one. */
function blockAfterCaret(tl: Timeline): string {
  const e = getEditor(tl);
  if (!e.caret) throw new Error("Insert: place the caret first (clickStartOfBlock)");
  const target = e.blocks[e.caret.offset === 0 ? e.caret.block : e.caret.block + 1];
  if (!target) throw new Error("Insert: nothing after the caret to put the line before");
  return target.id;
}

/** Insert > Horizontal line: a thin grey line at the caret. */
export function insertRule(tl: Timeline) {
  const id = blockAfterCaret(tl);
  tl.setVar("pageRules", [...tl.getVar<string[]>("pageRules", []), id]);
  markEdited(tl);
}

/** Insert > Break > Page break: the text from the caret on moves to a new page and the footer says "2 pages". */
export function insertPageBreak(tl: Timeline) {
  tl.setVar("pageBreak", blockAfterCaret(tl));
  markEdited(tl);
}

// ---- bookmark -------------------------------------------------------------------------------

/** Insert > Bookmark: the dialog opens with the name input focused (the name is typed with tl.typeText("bookmark-name", ...)). */
export function openBookmarkDialog(tl: Timeline) {
  tl.setVar("field:bookmark-name", "");
  tl.setVar("bookmarkFocus", true);
  tl.setVar("bookmarkDialog", true);
}

export function closeBookmarkDialog(tl: Timeline) {
  tl.setVar("bookmarkFocus", false);
  tl.setVar("bookmarkDialog", false);
}

/** OK in the dialog: the dialog closes, a marker appears at the start of the caret's block and the toast says "Bookmark added". */
export function addBookmark(tl: Timeline, name: string) {
  const e = getEditor(tl);
  if (!e.caret) throw new Error("Insert: place the caret first (clickStartOfBlock)");
  const marker: BookmarkState = { id: `${BOOKMARK.id}-${tl.getVar<BookmarkState[]>("pageBookmarks", []).length + 1}`, before: e.blocks[e.caret.block].id, name };
  closeBookmarkDialog(tl);
  tl.setVar("pageBookmarks", [...tl.getVar<BookmarkState[]>("pageBookmarks", []), marker]);
  markEdited(tl);
  showDocToast(tl, BOOKMARK.added, "success", 2800);
  return marker.id;
}

// ---- header and footer ------------------------------------------------------------------------

type ZoneKind = "header" | "footer";
const zoneVar = (kind: ZoneKind) => (kind === "header" ? "pageHeader" : "pageFooter");
const getZone = (tl: Timeline, kind: ZoneKind) => tl.getVar<ZoneState | null>(zoneVar(kind), null);

/** Insert > Page elements > Header / Footer: the zone appears with its dotted line and the caret inside it. */
export function insertZone(tl: Timeline, kind: ZoneKind) {
  setEditor(tl, (s) => ({ ...s, caret: null, sel: null }));
  tl.setVar(zoneVar(kind), { text: "", focus: true } satisfies ZoneState);
  markEdited(tl);
}

/** Type into the header or footer, one character at a time. */
export async function typeInZone(tl: Timeline, kind: ZoneKind, text: string, opts: { msPerChar?: number } = {}) {
  for (let n = 1; n <= text.length; n++) {
    await tl.wait(opts.msPerChar ?? 100);
    const zone = getZone(tl, kind);
    if (zone) tl.setVar(zoneVar(kind), { ...zone, text: text.slice(0, n) });
  }
  markEdited(tl);
}

/** The caret leaves the header and footer (the text stays). */
export function leaveZones(tl: Timeline) {
  (["header", "footer"] as const).forEach((kind) => {
    const zone = getZone(tl, kind);
    if (zone) tl.setVar(zoneVar(kind), { ...zone, focus: false });
  });
}
