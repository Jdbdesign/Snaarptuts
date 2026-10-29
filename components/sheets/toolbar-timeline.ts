import type { Timeline } from "@/lib/timeline";
import { commit, dragSelect, getRows, setRows } from "./edit-timeline";
import { beginFdt } from "./fdt-timeline";
import { resetChart, resetFunctionLink, resetNotes } from "./insert-timeline";
import { defaultChart, makeSeries, type ChartState } from "./chart-state";
import { obj, parseRef, setCell, single, sorted, type CellObj, type Range } from "./grid-state";
import { TB_BOOK } from "./sheets-sample";
import { closeDialog, pressOn } from "./sheets-timeline";
import { setLook } from "./fdt-state";
import { bumpDecimals, copyLook, mergeCells, paintLook, setBorders, setColour, setTbFormat, type Look } from "./toolbar-state";
import { BORDER_COLOR, TB_SAMPLE, TB_URL } from "./toolbar-data";
import { formatValue } from "./number-format";
import type { BorderLine } from "./sheets-data";

/*
 * Timeline helpers of the toolbar and header-tool steps (85-116). A step starts from `beginTb` (the sample sheet, a cell or range selected,
 * nothing open). Each helper moves the cursor, rings and clicks like a person would, then applies what the click does through the pure
 * functions in toolbar-state.ts. Hooks: tool-<id>, hdr-<id>, tm-<menu>-<row>, tool-tip, cur-*, meet-*, join-*.
 */

export { TB_URL };
const A1 = single(0, 0);
const selOf = (tl: Timeline) => sorted(tl.getVar<Range>("sel", A1));
const cellSel = (ref: string) => `[data-tl=cell-${ref.toLowerCase()}]`;

/** Select a cell or a range ("d2" or "d2:d10") without the cursor (a start state). */
export function setSel(tl: Timeline, ref: string) {
  const [a, b] = ref.split(":");
  const [r1, c1] = parseRef(a);
  const [r2, c2] = b ? parseRef(b) : [r1, c1];
  tl.setVar("sel", { r1, c1, r2, c2 });
}

/** Start of every toolbar / header step: the sample sheet open, `sel` selected, nothing open. */
export function beginTb(tl: Timeline, sel = "a1", cursor?: [number, number]) {
  beginFdt(tl, TB_URL, cursor);
  resetChart(tl);
  resetFunctionLink(tl);
  resetNotes(tl);
  tl.setVar("title", TB_BOOK.title);
  tl.setVar("sheets", TB_BOOK.sheets);
  tl.setVar("activeSheet", TB_BOOK.sheets[0].id);
  setRows(tl, TB_BOOK.sheets[0].rows);
  tl.setVar("history", { past: [], future: [] });
  for (const [k, v] of Object.entries({ tbMenu: "", tbSub: "", tbTip: "", hdrMenu: "", tbPaint: null, tbCollapsed: false, borderStyle: "solid", borderColor: BORDER_COLOR, curPick: "USD", meetCopied: false, findOpen: false, findScopeOpen: false, findScope: "All sheets", findCase: false, findEntire: false, findRegex: false, findFormulas: false, findLinks: false, screen: "editor", commentsOpen: false, comments: [], commented: [], zoomPct: 100 })) tl.setVar(k, v);
  for (const f of ["find", "replace", "cur-search", "join"]) tl.setVar(`field:${f}`, "");
  setSel(tl, sel);
}

/** Give a start state a different look to the Cost column etc. without the cursor. */
export function seed(tl: Timeline, fn: (rows: ReturnType<typeof getRows>) => ReturnType<typeof getRows>) {
  setRows(tl, fn(getRows(tl)));
}

/* ---------------- Pointing at tools ---------------- */

/** Move onto a tool, hover it and show its tooltip for `hold` ms. */
export async function hoverTool(tl: Timeline, id: string, opts: { ms?: number; hold?: number } = {}) {
  const sel = `[data-tl=tool-${id}]`;
  await tl.moveCursorTo(sel, { ms: opts.ms ?? 600 });
  tl.hover(sel);
  await tl.wait(300);
  tl.setVar("tbTip", id);
  await tl.wait(opts.hold ?? 1100);
}
export const hideTip = (tl: Timeline) => tl.setVar("tbTip", "");

/** Click a tool (hover first when the cursor is not on it yet). The tooltip goes away. */
export async function pressTool(tl: Timeline, id: string, opts: { ms?: number; ring?: boolean } = {}) {
  hideTip(tl);
  await pressOn(tl, `[data-tl=tool-${id}]`, { ms: opts.ms ?? 450, ring: opts.ring });
}

/** Hover a tool (tooltip), click it and open its dropdown. */
export async function openTool(tl: Timeline, id: string, opts: { menu?: string; hold?: number; ms?: number } = {}) {
  await hoverTool(tl, id, { hold: opts.hold ?? 800, ms: opts.ms });
  await pressTool(tl, id, { ms: 300 });
  tl.setVar("tbMenu", opts.menu ?? id);
  await tl.wait(300);
}

export function closeToolMenu(tl: Timeline) {
  tl.hover(null);
  tl.setVar("tbMenu", "");
  tl.setVar("tbSub", "");
}

/** Move onto a dropdown row, hover it, click it. `apply` does what the row does; the menu closes unless `keepOpen`. */
export async function pickRow(tl: Timeline, menu: string, row: string, apply: () => void, opts: { ms?: number; keepOpen?: boolean; hover?: number } = {}) {
  const sel = `[data-tl=tm-${menu}-${row}]`;
  await tl.moveCursorTo(sel, { ms: opts.ms ?? 450 });
  tl.hover(sel);
  tl.highlight(sel);
  await tl.wait(opts.hover ?? 250);
  await tl.click(sel);
  tl.clearHighlight();
  apply();
  if (!opts.keepOpen) closeToolMenu(tl);
  else tl.hover(null);
  await tl.wait(400);
}

/** Only hover a row (no click). */
export async function hoverRow(tl: Timeline, menu: string, row: string, ms = 380, wait = 500) {
  const sel = `[data-tl=tm-${menu}-${row}]`;
  await tl.moveCursorTo(sel, { ms });
  tl.hover(sel);
  await tl.wait(wait);
}

/* ---------------- What the tools do ---------------- */

const edit = (tl: Timeline, fn: (rows: ReturnType<typeof getRows>, r: Range) => ReturnType<typeof getRows>) => commit(tl, fn(getRows(tl), selOf(tl)));
export const doFormat = (tl: Timeline, nf: string, dp?: number) => edit(tl, (r, g) => setTbFormat(r, g, nf, dp));
export const doDecimals = (tl: Timeline, d: 1 | -1) => edit(tl, (r, g) => bumpDecimals(r, g, d));
export const doColour = (tl: Timeline, key: "color" | "fill", hex?: string) => edit(tl, (r, g) => setColour(r, g, key, hex));
export const doBorders = (tl: Timeline, id: string) =>
  edit(tl, (r, g) => setBorders(r, g, id, { style: tl.getVar<BorderLine["style"]>("borderStyle", "solid"), color: tl.getVar<string>("borderColor", BORDER_COLOR) }));
export const doMerge = (tl: Timeline, mode: "all" | "vertical" | "horizontal" | "unmerge") => edit(tl, (r, g) => mergeCells(r, g, mode));
export const doLook = (tl: Timeline, patch: Partial<CellObj>) => edit(tl, (r, g) => setLook(r, g, patch));
export function doToggle(tl: Timeline, key: "bold" | "italic" | "underline" | "strike") {
  const g = selOf(tl);
  const all = (() => {
    const rows = getRows(tl);
    for (let r = g.r1; r <= g.r2; r++) for (let c = g.c1; c <= g.c2; c++) if (!obj(rows[r]?.[c])[key]) return false;
    return true;
  })();
  doLook(tl, { [key]: !all });
}
export function bumpSize(tl: Timeline, delta: number) {
  const cur = obj(getRows(tl)[selOf(tl).r1]?.[selOf(tl).c1]).size ?? 10;
  doLook(tl, { size: Math.max(6, cur + delta) });
}

/** Paint format: pick up the look of the selected cell, then paint it on a range. */
export function pickUpLook(tl: Timeline) {
  const g = selOf(tl);
  tl.setVar("tbPaint", copyLook(obj(getRows(tl)[g.r1]?.[g.c1])) satisfies Look);
}
export function dropLook(tl: Timeline) {
  const look = tl.getVar<Look | null>("tbPaint", null);
  if (look) edit(tl, (r, g) => paintLook(r, g, look));
  tl.setVar("tbPaint", null);
}

/* ---------------- Selecting with the cursor ---------------- */

export { dragSelect };
export async function clickCellTb(tl: Timeline, ref: string, ms = 600) {
  await tl.moveCursorTo(cellSel(ref), { ms });
  await tl.click(cellSel(ref));
  const [r, c] = parseRef(ref);
  tl.setVar("sel", single(r, c));
}

/* ---------------- Formulas ---------------- */

/** Type a formula into a cell (it shows while typed), then it takes its live value. `label` goes in the cell on its left. */
export async function enterFormula(tl: Timeline, ref: string, formula: string, opts: { label?: [string, string]; nf?: string; refRange?: Range } = {}) {
  const [r, c] = parseRef(ref);
  await clickCellTb(tl, ref);
  if (opts.refRange) tl.setVar("refRange", opts.refRange);
  tl.setVar("field:cell", "");
  tl.setVar("cellEdit", { r, c });
  await tl.typeText("cell", formula, { msPerChar: 40 });
  await tl.wait(350);
  let rows = getRows(tl);
  if (opts.label) rows = setCell(rows, ...parseRef(opts.label[0]), opts.label[1]);
  rows = setCell(rows, r, c, { text: "", formula, fx: true, align: "right", nf: opts.nf });
  commit(tl, rows);
  tl.setVar("cellEdit", null);
  tl.setVar("field:cell", "");
  tl.setVar("refRange", null);
}

/** Copy a formula down a column: its row references move with each row. */
export function fillDown(tl: Timeline, col: number, fromRow: number, toRow: number) {
  const src = obj(getRows(tl)[fromRow]?.[col]);
  let rows = getRows(tl);
  for (let r = fromRow + 1; r <= toRow; r++) {
    const f = src.formula!.replace(/([A-Z]+)(\d+)/g, (_, l: string, n: string) => `${l}${Number(n) + (r - fromRow)}`);
    rows = setCell(rows, r, col, { ...src, formula: f });
  }
  commit(tl, rows);
}

/* ---------------- Chart ---------------- */

/** The toolbar chart: Item and Cost, eight rows, placed under the table. */
export function startTbChart(tl: Timeline) {
  const chart: ChartState = { ...defaultChart(), range: "A1:D9", xAxis: "A2:A9", series: [makeSeries("Cost", TB_SAMPLE.costCol, true)], seriesSel: "cost", rowCount: 8, catCol: 0, at: { row: 11, col: 4 } };
  tl.setVar("chart", chart);
  tl.setVar("chartTab", "setup");
  tl.setVar("chartAcc", "");
  tl.setVar("chartPanel", true);
}

/* ---------------- Dialogs and the header ---------------- */

export { closeDialog };
export async function pressHeader(tl: Timeline, id: string, menu?: string, opts: { ms?: number } = {}) {
  hideTip(tl);
  await pressOn(tl, `[data-tl=hdr-${id}]`, { ms: opts.ms ?? 600 });
  if (menu) tl.setVar("hdrMenu", menu);
  await tl.wait(300);
}
export async function hoverHeader(tl: Timeline, id: string, opts: { ms?: number; hold?: number } = {}) {
  const sel = `[data-tl=hdr-${id}]`;
  await tl.moveCursorTo(sel, { ms: opts.ms ?? 600 });
  tl.hover(sel);
  await tl.wait(300);
  tl.setVar("tbTip", `hdr-${id}`);
  await tl.wait(opts.hold ?? 1100);
}
export function closeHeaderMenu(tl: Timeline) {
  tl.hover(null);
  tl.setVar("hdrMenu", "");
}

/** Click a cell and type a number into it: the cell keeps its format (so £400.00 stays a pound amount) and the Total follows. */
export async function typeNumber(tl: Timeline, ref: string, value: number, opts: { msPerChar?: number } = {}) {
  const [r, c] = parseRef(ref);
  await clickCellTb(tl, ref);
  tl.setVar("field:cell", "");
  tl.setVar("cellEdit", { r, c });
  await tl.typeText("cell", String(value), { msPerChar: opts.msPerChar ?? 140 });
  await tl.wait(350);
  const old = obj(getRows(tl)[r]?.[c]);
  commit(tl, setCell(getRows(tl), r, c, { ...old, num: value, text: formatValue(value, old.nf ?? "automatic", old.dp) }));
  tl.setVar("cellEdit", null);
  tl.setVar("field:cell", "");
}
