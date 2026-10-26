import type { Timeline } from "@/lib/timeline";
import { BOOKMARK, PAGE_NUMBERS, SYMBOLS, TABLE } from "./insert-data";
import type { InsertDialogId } from "./InsertDialogs";
import { DEFAULT_WATERMARK, emptyTable, type BookmarkState, type ObjectState, type PageNumbersState, type TableState, type WatermarkState, type ZoneState } from "./insert-state";
import { showDocToast } from "./doc-toast-timeline";
import { placeCaret, type BlockKind } from "./editor-state";
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

/** Format > Headers & footers: both zones appear with their dotted lines; the caret is in the header. */
export function insertHeaderFooter(tl: Timeline) {
  setEditor(tl, (s) => ({ ...s, caret: null, sel: null }));
  tl.setVar("pageHeader", { text: "", focus: true } satisfies ZoneState);
  tl.setVar("pageFooter", { text: "", focus: false } satisfies ZoneState);
  markEdited(tl);
}

/** Scroll the page so the zone shows, glide to it and click: the caret moves into it (and leaves the other zone). */
export async function clickZone(tl: Timeline, kind: ZoneKind, opts: { ms?: number } = {}) {
  await tl.scrollPanelTo("[data-tl=editor-canvas]", kind === "header" ? "top" : "bottom", 900);
  const sel = `[data-tl=page-${kind}]`;
  await tl.moveCursorTo(sel, { ms: opts.ms ?? 800, dx: 40 });
  await tl.click(sel);
  (["header", "footer"] as const).forEach((k) => {
    const zone = getZone(tl, k);
    if (zone) tl.setVar(zoneVar(k), { ...zone, focus: k === kind });
  });
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

// ---- watermark ----------------------------------------------------------------------------------

const getWatermark = (tl: Timeline) => tl.getVar<WatermarkState>("watermark", DEFAULT_WATERMARK);

/** Insert > Page elements > Watermark: the panel slides in from the right and the page shifts left. */
export function openWatermarkPanel(tl: Timeline) {
  tl.setVar("wmTab", "text");
  tl.setVar("watermarkOpen", true);
}

export function closeWatermarkPanel(tl: Timeline) {
  tl.setVar("wmFocus", false);
  tl.setVar("watermarkOpen", false);
}

/** Click the panel's text input (the focus ring and caret show), then type into it: the watermark on the page follows live. */
export async function typeWatermark(tl: Timeline, text: string, opts: { msPerChar?: number; moveMs?: number } = {}) {
  await tl.moveCursorTo("[data-tl=wm-input]", { ms: opts.moveMs ?? 800 });
  await tl.click("[data-tl=wm-input]");
  tl.setVar("wmFocus", true);
  markEdited(tl);
  for (let n = 1; n <= text.length; n++) {
    await tl.wait(opts.msPerChar ?? 140);
    tl.setVar("watermark", { ...getWatermark(tl), text: text.slice(0, n) });
  }
}

// ---- dialogs that share the InsertDialog frame (steps 27 to 30) -------------------------------------

/** Open one of the Insert dialogs (scene variable `insertDialog`); only one is open at a time. */
export const openInsertDialog = (tl: Timeline, id: InsertDialogId) => tl.setVar("insertDialog", id);
export const closeInsertDialog = (tl: Timeline) => tl.setVar("insertDialog", "");

// ---- page numbers ---------------------------------------------------------------------------------------

/** Insert > Page elements > Page numbers: the dialog opens with the defaults of the frames (bottom, right, 1). */
export function openPageNumbers(tl: Timeline) {
  tl.setVar("pnPosition", PAGE_NUMBERS.defaults.position);
  tl.setVar("pnAlign", PAGE_NUMBERS.defaults.align);
  tl.setVar("pnStart", PAGE_NUMBERS.defaults.start);
  tl.setVar("pnFocus", false);
  openInsertDialog(tl, "pagenumbers");
}

/** Click one of the dialog's option buttons: glide to it, ring it, click it, then store the choice in the scene variable. */
export async function chooseDialogOption(tl: Timeline, selector: string, key: string, value: unknown, opts: { ms?: number } = {}) {
  await tl.moveCursorTo(selector, { ms: opts.ms ?? 650 });
  tl.highlight(selector);
  await tl.wait(150);
  await tl.click(selector);
  tl.clearHighlight();
  tl.setVar(key, value);
}

/** Apply: the dialog closes and the number shows on the page (small grey number at the chosen edge and alignment). */
export function applyPageNumbers(tl: Timeline) {
  tl.setVar("pageNumbers", {
    position: tl.getVar("pnPosition", PAGE_NUMBERS.defaults.position),
    align: tl.getVar("pnAlign", PAGE_NUMBERS.defaults.align),
    start: tl.getVar("pnStart", PAGE_NUMBERS.defaults.start),
  } satisfies PageNumbersState);
  tl.setVar("pnFocus", false);
  closeInsertDialog(tl);
  markEdited(tl);
}

// ---- block quote, checklist and code block (step 28) --------------------------------------------------

/** Add an empty paragraph under a block (what Enter does) and put the caret in it. Returns the new block's id. */
export function newLineAfter(tl: Timeline, blockId: string): string {
  const e = getEditor(tl);
  const at = e.blocks.findIndex((b) => b.id === blockId);
  if (at < 0) throw new Error(`Editor: no block "${blockId}"`);
  const id = `line-${e.nextId}`;
  setEditor(tl, (s) => ({
    ...s,
    blocks: [...s.blocks.slice(0, at + 1), { id, kind: "p" as const, text: "" }, ...s.blocks.slice(at + 1)],
    nextId: s.nextId + 1,
    sel: null,
    caret: { block: at + 1, offset: 0 },
  }));
  return id;
}

/** Click at the end of a paragraph, then press Enter: the caret moves to a new empty line below it. Returns the new line's id. */
export async function clickEndAndNewLine(tl: Timeline, blockId: string, opts: { ms?: number } = {}): Promise<string> {
  const sel = `[data-tl=doc-end-${blockId}]`;
  await tl.moveCursorTo(sel, { ms: opts.ms ?? 900, dx: 3 });
  await tl.click(sel);
  const e = getEditor(tl);
  const block = e.blocks.findIndex((b) => b.id === blockId);
  setEditor(tl, (s) => placeCaret(s, { block, offset: s.blocks[block].text.length }));
  await tl.wait(450);
  return newLineAfter(tl, blockId);
}

/** Change the style of one block (the text stays). */
export function setBlockKind(tl: Timeline, blockId: string, kind: BlockKind) {
  setEditor(tl, (s) => ({ ...s, blocks: s.blocks.map((b) => (b.id === blockId ? { ...b, kind } : b)) }));
  markEdited(tl);
}

/** Insert > Block quote / Checklist / Code block: the block the caret is in takes that style. */
export function convertCaretBlock(tl: Timeline, kind: BlockKind) {
  const e = getEditor(tl);
  if (!e.caret) throw new Error("Insert: place the caret first");
  setBlockKind(tl, e.blocks[e.caret.block].id, kind);
}

/** Type into a block one character at a time, the caret following the text. */
export async function typeInBlock(tl: Timeline, blockId: string, text: string, opts: { msPerChar?: number } = {}) {
  const at = getEditor(tl).blocks.findIndex((b) => b.id === blockId);
  if (at < 0) throw new Error(`Editor: no block "${blockId}"`);
  for (let n = 1; n <= text.length; n++) {
    await tl.wait(opts.msPerChar ?? 90);
    setEditor(tl, (s) => ({
      ...s,
      blocks: s.blocks.map((b, i) => (i === at ? { ...b, text: text.slice(0, n) } : b)),
      caret: { block: at, offset: n },
    }));
  }
  markEdited(tl);
}

// ---- eSignature and Drawing (steps 29 and 30) --------------------------------------------------------

/** Insert > eSignature: the dialog opens on the Draw tab with an empty canvas. */
export function openEsignature(tl: Timeline) {
  tl.setVar("esigProgress", 0);
  openInsertDialog(tl, "esignature");
}

/**
 * Put a signature or a drawing into the page right under the line the caret is on (the dialog closes). A drawing comes
 * selected (corner handles and floating toolbar). With `trailingLine`, an empty line is added under it for the caret.
 * Returns the id of that new line, or "" without one.
 */
export function insertObject(tl: Timeline, kind: ObjectState["kind"], opts: { trailingLine?: boolean } = {}): string {
  const e = getEditor(tl);
  if (!e.caret) throw new Error("Insert: place the caret first");
  const after = e.blocks[e.caret.block].id;
  const objects = tl.getVar<ObjectState[]>("pageObjects", []);
  tl.setVar("pageObjects", [...objects, { id: `${kind}-${objects.length + 1}`, kind, after, selected: kind === "drawing" }]);
  closeInsertDialog(tl);
  markEdited(tl);
  return opts.trailingLine ? newLineAfter(tl, after) : "";
}

/** Insert > Drawing: the dialog opens with an empty canvas (Pen, black, the second size). */
export function openDrawing(tl: Timeline) {
  tl.setVar("drawProgress", 0);
  openInsertDialog(tl, "drawing");
}

/** After a drawing is inserted it stays selected for a while; clicking elsewhere (or the next step) clears it. */
export function deselectObjects(tl: Timeline) {
  tl.setVar("pageObjects", tl.getVar<ObjectState[]>("pageObjects", []).map((o) => ({ ...o, selected: false })));
}

// ---- symbols -------------------------------------------------------------------------------------------

/** Insert > Symbols: the dialog opens on the default category (Arrows, as in the frames). */
export function openSymbols(tl: Timeline) {
  tl.setVar("symCategory", SYMBOLS.defaultCategory);
  openInsertDialog(tl, "symbols");
}

/** Click a category pill: glide to it, ring it, click it and switch the grid. */
export async function chooseSymbolCategory(tl: Timeline, id: string) {
  await chooseDialogOption(tl, `[data-tl=sym-cat-${id}]`, "symCategory", id);
  await tl.wait(250);
}

/** Click a symbol of the open category: it is added at the caret in the text behind the dialog, which stays open. */
export async function clickSymbol(tl: Timeline, index: number) {
  const category = tl.getVar<string>("symCategory", SYMBOLS.defaultCategory);
  const sel = `[data-tl=sym-${category}-${index}]`;
  const symbol = SYMBOLS.categories.find((c) => c.id === category)?.symbols[index];
  if (!symbol) throw new Error(`Symbols: no symbol ${index} in "${category}"`);
  await tl.moveCursorTo(sel, { ms: 520 });
  tl.hover(sel);
  await tl.wait(120);
  await tl.click(sel);
  tl.hover(null);
  const e = getEditor(tl);
  if (!e.caret) throw new Error("Insert: place the caret first");
  const { block, offset } = e.caret;
  setEditor(tl, (s) => ({
    ...s,
    blocks: s.blocks.map((b, i) => (i === block ? { ...b, text: b.text.slice(0, offset) + symbol + b.text.slice(offset) } : b)),
    caret: { block, offset: offset + symbol.length },
  }));
  markEdited(tl);
}
