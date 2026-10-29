import type { Timeline } from "@/lib/timeline";
import { showDocToast } from "@/components/docs/doc-toast-timeline";
import { COMMENTS, FIND, MENU_SUBS, type MenuId } from "./edit-view-data";
import { COLUMN_COUNT, ROW_COUNT } from "./sheets-data";
import {
  clearRange,
  copyCells,
  deleteCols,
  deleteRows,
  findCells,
  insertCellsDown,
  insertCellsRight,
  insertCols,
  insertRows,
  parseRef,
  pasteCells,
  replaceAll,
  setCellText,
  single,
  sorted,
  type PasteMode,
  type Range,
  type Rows,
} from "./grid-state";
import type { Groups } from "./SheetGrid";
import type { CommentThread } from "./EditViewPanels";
import { begin, pressOn } from "./sheets-timeline";
import { EDIT_BOOK, editRows, type SheetModel } from "./sheets-sample";

/*
 * Timeline helpers for the Edit and View steps (20-36). The sheet lives in the scene variable `sheets`; every helper moves the
 * cursor, rings and clicks like a person would, then applies what the click does through the pure functions in grid-state.ts.
 * Hooks: cell-<ref> (cell-b3), menu-item-<id>, menu-sub-<id>, editor-menu-edit / -view (see SheetMenu and SheetGrid).
 */

export type Clip = { range: Range; cells: Rows; cut: boolean };
export type EditHistory = { past: Rows[]; future: Rows[] };

const A1 = single(0, 0);
const NO_GROUPS: Groups = { rows: null, cols: null };

/* ---------------- Sheet state ---------------- */

export function getRows(tl: Timeline): Rows {
  return tl.getVar<SheetModel[]>("sheets", EDIT_BOOK.sheets)[0].rows;
}
export function setRows(tl: Timeline, rows: Rows) {
  const sheets = tl.getVar<SheetModel[]>("sheets", EDIT_BOOK.sheets);
  tl.setVar("sheets", [{ ...sheets[0], rows }, ...sheets.slice(1)]);
}
const getSel = (tl: Timeline) => sorted(tl.getVar<Range>("sel", A1));

/** Put a new version of the cells on screen and remember the old one for Undo. */
export function commit(tl: Timeline, next: Rows) {
  const h = tl.getVar<EditHistory>("history", { past: [], future: [] });
  tl.setVar("history", { past: [...h.past, getRows(tl)], future: [] });
  setRows(tl, next);
}
export function undoOp(tl: Timeline) {
  const h = tl.getVar<EditHistory>("history", { past: [], future: [] });
  if (!h.past.length) return;
  tl.setVar("history", { past: h.past.slice(0, -1), future: [getRows(tl), ...h.future] });
  setRows(tl, h.past[h.past.length - 1]);
}
export function redoOp(tl: Timeline) {
  const h = tl.getVar<EditHistory>("history", { past: [], future: [] });
  if (!h.future.length) return;
  tl.setVar("history", { past: [...h.past, getRows(tl)], future: h.future.slice(1) });
  setRows(tl, h.future[0]);
}

/** The sample sheet again, with nothing selected but A1 and no history (used to start a step and between sub-demos). */
export function resetSheet(tl: Timeline) {
  setRows(tl, editRows());
  tl.setVar("history", { past: [], future: [] });
  tl.setVar("sel", A1);
  tl.setVar("clip", null);
  tl.setVar("cellEdit", null);
  tl.setVar("field:cell", "");
}

/** Start of every Edit / View step: the sample sheet open, A1 selected, nothing open, 100% zoom, formula bar and gridlines on. */
export function beginEdit(tl: Timeline, url: string, cursor: [number, number] = [0.5, 0.42]) {
  begin(tl, url, cursor);
  tl.setVar("title", EDIT_BOOK.title);
  tl.setVar("sheets", EDIT_BOOK.sheets);
  tl.setVar("activeSheet", EDIT_BOOK.sheets[0].id);
  resetSheet(tl);
  tl.setVar("emenu", "");
  tl.setVar("esub", "");
  tl.setVar("vFormulaBar", true);
  tl.setVar("vGridlines", true);
  tl.setVar("vFormulas", false);
  tl.setVar("frozenRows", 0);
  tl.setVar("frozenCols", 0);
  tl.setVar("gridScrollRow", 0);
  tl.setVar("gridScrollCol", 0);
  tl.setVar("groups", NO_GROUPS);
  tl.setVar("zoomPct", 100);
  tl.setVar("commentsOpen", false);
  tl.setVar("comments", []);
  tl.setVar("commented", []);
  tl.setVar("findOpen", false);
  tl.setVar("findHits", null);
  tl.setVar("sheetFull", false);
  tl.setVar("fsBanner", false);
}

/* ---------------- Cells ---------------- */

const cellSel = (ref: string) => `[data-tl=cell-${ref.toLowerCase()}]`;

/** Move to a cell, click it and select it. */
export async function clickCell(tl: Timeline, ref: string, opts: { ms?: number; ring?: boolean } = {}) {
  await tl.moveCursorTo(cellSel(ref), { ms: opts.ms ?? 600 });
  if (opts.ring) tl.highlight(cellSel(ref));
  await tl.click(cellSel(ref));
  if (opts.ring) tl.clearHighlight();
  const [r, c] = parseRef(ref);
  tl.setVar("sel", single(r, c));
}

const centre = (ref: string) => {
  const b = document.querySelector(cellSel(ref))!.getBoundingClientRect();
  return { x: b.left + b.width / 2, y: b.top + b.height / 2 };
};

/** Press on one cell and drag to another: the range grows with the cursor. */
export async function dragSelect(tl: Timeline, from: string, to: string, opts: { ms?: number; moveMs?: number } = {}) {
  await tl.moveCursorTo(cellSel(from), { ms: opts.moveMs ?? 600 });
  await tl.click(cellSel(from));
  const [r1, c1] = parseRef(from);
  const [r2, c2] = parseRef(to);
  tl.setVar("sel", single(r1, c1));
  const a = centre(from);
  const b = centre(to);
  const len2 = (b.x - a.x) ** 2 + (b.y - a.y) ** 2 || 1;
  await tl.moveCursorTo(cellSel(to), {
    ms: opts.ms ?? 650,
    onMove: (x, y) => {
      const p = Math.max(0, Math.min(1, ((x - a.x) * (b.x - a.x) + (y - a.y) * (b.y - a.y)) / len2));
      tl.setVar("sel", { r1, c1, r2: Math.round(r1 + (r2 - r1) * p), c2: Math.round(c1 + (c2 - c1) * p) });
    },
  });
  tl.setVar("sel", { r1, c1, r2, c2 });
}

/** Click a cell and type into it, then press Enter: the cell takes the text (and the old value goes into Undo). */
export async function typeInCell(tl: Timeline, ref: string, text: string, opts: { msPerChar?: number } = {}) {
  await clickCell(tl, ref);
  const [r, c] = parseRef(ref);
  tl.setVar("field:cell", "");
  tl.setVar("cellEdit", { r, c });
  await tl.typeText("cell", text, { msPerChar: opts.msPerChar ?? 90 });
  await tl.wait(400);
  commit(tl, setCellText(getRows(tl), r, c, text));
  tl.setVar("cellEdit", null);
  tl.setVar("field:cell", "");
}

/** The same edit without the cursor (a step that starts "after" a typed value, so it still works alone from the rail). */
export function quickType(tl: Timeline, ref: string, text: string) {
  const [r, c] = parseRef(ref);
  commit(tl, setCellText(getRows(tl), r, c, text));
  tl.setVar("sel", single(r, c));
}

/** A range already selected and copied (or cut), for a step that starts "after" the Copy click. */
export function quickClip(tl: Timeline, from: string, to: string, cut = false) {
  const [r1, c1] = parseRef(from);
  const [r2, c2] = parseRef(to);
  const range = { r1, c1, r2, c2 };
  tl.setVar("sel", range);
  tl.setVar("clip", { range, cells: copyCells(getRows(tl), range), cut } satisfies Clip);
}

/* ---------------- Menus ---------------- */

export async function openMenu(tl: Timeline, id: MenuId, opts: { ms?: number } = {}) {
  await pressOn(tl, `[data-tl=editor-menu-${id}]`, { ms: opts.ms ?? 700 });
  tl.setVar("emenu", id);
}

export function closeMenus(tl: Timeline) {
  tl.hover(null);
  tl.setVar("esub", "");
  tl.setVar("emenu", "");
}

/** Move onto a menu row and hover it; a row with a submenu opens it. */
export async function hoverRow(tl: Timeline, id: string, opts: { ms?: number; sub?: string } = {}) {
  const sel = `[data-tl=menu-item-${id}]`;
  await tl.moveCursorTo(sel, { ms: opts.ms ?? 350, dx: -50 });
  tl.hover(sel);
  tl.setVar("esub", opts.sub ?? "");
}

/** Hover a row of an open submenu. */
export async function hoverSubRow(tl: Timeline, id: string, opts: { ms?: number } = {}) {
  const sel = `[data-tl=menu-sub-${id}]`;
  await tl.moveCursorTo(sel, { ms: opts.ms ?? 320, dx: -40 });
  tl.hover(sel);
}

/** Click a menu row without a submenu, run what it does and close the menu. */
export async function chooseRow(tl: Timeline, id: string, opts: { ms?: number; keepOpen?: boolean } = {}) {
  const sel = `[data-tl=menu-item-${id}]`;
  await tl.moveCursorTo(sel, { ms: opts.ms ?? 450, dx: -50 });
  tl.hover(sel);
  tl.highlight(sel);
  await tl.wait(150);
  await tl.click(sel);
  tl.clearHighlight();
  runAction(tl, id);
  if (!opts.keepOpen) closeMenus(tl);
}

/** Open a row's submenu, click one of its rows, run what it does and close the menu (or keep it open to click another). */
export async function chooseSub(tl: Timeline, itemId: string, subId: string, opts: { ms?: number; keepOpen?: boolean; hold?: number } = {}) {
  const sub = Object.keys(MENU_SUBS).find((k) => MENU_SUBS[k].some((s) => s.id === subId) || (k === "group" && subId.startsWith("ungroup"))) ?? "";
  await hoverRow(tl, itemId, { ms: opts.ms ?? 450, sub });
  await tl.wait(opts.hold ?? 220);
  const sel = `[data-tl=menu-sub-${subId}]`;
  await tl.moveCursorTo(sel, { ms: 360, dx: -40 });
  tl.hover(sel);
  tl.highlight(sel);
  await tl.wait(150);
  await tl.click(sel);
  tl.clearHighlight();
  runAction(tl, subId);
  if (!opts.keepOpen) closeMenus(tl);
}

/* ---------------- What each row does ---------------- */

function paste(tl: Timeline, mode: PasteMode) {
  const clip = tl.getVar<Clip | null>("clip", null);
  if (!clip) return;
  const s = getSel(tl);
  let rows = getRows(tl);
  if (clip.cut && mode === "all") rows = clearRange(rows, clip.range, true);
  commit(tl, pasteCells(rows, clip.cells, s.r1, s.c1, mode));
  if (clip.cut && mode === "all") tl.setVar("clip", null);
  const h = clip.cells.length;
  const w = clip.cells[0].length;
  const [rh, rw] = mode === "transposed" ? [w, h] : [h, w];
  tl.setVar("sel", { r1: s.r1, c1: s.c1, r2: s.r1 + rh - 1, c2: s.c1 + rw - 1 });
}

const toggle = (tl: Timeline, key: string, on: boolean) => tl.setVar(key, !tl.getVar(key, on));

export function toggleGroup(tl: Timeline, axis: "rows" | "cols") {
  const g = tl.getVar<Groups>("groups", NO_GROUPS);
  const span = g[axis];
  if (span) tl.setVar("groups", { ...g, [axis]: { ...span, collapsed: !span.collapsed } });
}

/** Menus built in later rounds (Format, Data, Tools...) register what their rows do here; a handler returns true when it took the row. */
export const EXTRA_ACTIONS: ((tl: Timeline, id: string) => boolean)[] = [];

export function runAction(tl: Timeline, id: string) {
  for (const handle of EXTRA_ACTIONS) if (handle(tl, id)) return;
  const rows = getRows(tl);
  const s = getSel(tl);
  const groups = tl.getVar<Groups>("groups", NO_GROUPS);
  switch (id) {
    case "undo": return undoOp(tl);
    case "redo": return redoOp(tl);
    case "cut":
    case "copy": return tl.setVar("clip", { range: s, cells: copyCells(rows, s), cut: id === "cut" } satisfies Clip);
    case "paste": return paste(tl, "all");
    case "paste-values": return paste(tl, "values");
    case "paste-format": return paste(tl, "format");
    case "paste-transposed": return paste(tl, "transposed");
    case "delete-values": return commit(tl, clearRange(rows, s));
    case "delete-row": return commit(tl, deleteRows(rows, s.r1, s.r2));
    case "delete-col": return commit(tl, deleteCols(rows, s.c1, s.c2));
    case "find": return tl.setVar("findOpen", true);
    case "cells-down": return commit(tl, insertCellsDown(rows, s));
    case "cells-right": return commit(tl, insertCellsRight(rows, s));
    case "row-above":
    case "row-below": {
      const at = id === "row-above" ? s.r1 : s.r2 + 1;
      const n = s.r2 - s.r1 + 1;
      commit(tl, insertRows(rows, at, n));
      return tl.setVar("sel", { r1: at, c1: 0, r2: at + n - 1, c2: COLUMN_COUNT - 1 });
    }
    case "col-left":
    case "col-right": {
      const at = id === "col-left" ? s.c1 : s.c2 + 1;
      const n = s.c2 - s.c1 + 1;
      commit(tl, insertCols(rows, at, n));
      return tl.setVar("sel", { r1: 0, c1: at, r2: ROW_COUNT - 1, c2: at + n - 1 });
    }
    case "show-bar": return toggle(tl, "vFormulaBar", true);
    case "show-grid": return toggle(tl, "vGridlines", true);
    case "show-formulas": return toggle(tl, "vFormulas", false);
    case "freeze-r0": return tl.setVar("frozenRows", 0);
    case "freeze-r1": return tl.setVar("frozenRows", 1);
    case "freeze-r2": return tl.setVar("frozenRows", 2);
    case "freeze-rcur": return tl.setVar("frozenRows", s.r1 + 1);
    case "freeze-c0": return tl.setVar("frozenCols", 0);
    case "freeze-c1": return tl.setVar("frozenCols", 1);
    case "freeze-c2": return tl.setVar("frozenCols", 2);
    case "freeze-ccur": return tl.setVar("frozenCols", s.c1 + 1);
    case "group-rows": return tl.setVar("groups", { ...groups, rows: { from: s.r1, to: s.r2, collapsed: false } });
    case "group-cols": return tl.setVar("groups", { ...groups, cols: { from: s.c1, to: s.c2, collapsed: false } });
    case "ungroup-rows": return tl.setVar("groups", { ...groups, rows: null });
    case "ungroup-cols": return tl.setVar("groups", { ...groups, cols: null });
    case "comments-show": return tl.setVar("commentsOpen", true);
    case "comments-hide": return tl.setVar("commentsOpen", false);
    case "fullscreen": return enterFullScreen(tl);
  }
  if (id.startsWith("zoom-")) tl.setVar("zoomPct", Number(id.slice(5)));
}

/* ---------------- View: scrolling, full screen, comments ---------------- */

/** Scroll the grid (unfrozen rows or columns) smoothly. */
export async function scrollGrid(tl: Timeline, axis: "row" | "col", to: number, ms = 900) {
  const key = axis === "row" ? "gridScrollRow" : "gridScrollCol";
  await tl.animateVar(key, tl.getVar(key, 0), to, ms);
}

export function enterFullScreen(tl: Timeline) {
  tl.setVar("sheetFull", true);
  tl.setVar("fsBanner", true);
}

/** Press Esc: the key on the banner dips, then the sheet comes back. */
export async function pressEsc(tl: Timeline) {
  tl.setVar("fsBanner", true);
  await tl.wait(350);
  tl.setVar("fsPressed", true);
  await tl.wait(220);
  tl.setVar("fsPressed", false);
  tl.setVar("sheetFull", false);
  await tl.wait(250);
  tl.setVar("fsBanner", false);
}

/** The comment thread the Comments step adds, in the panel and as a corner mark on the cell. */
export function postComment(tl: Timeline) {
  const thread: CommentThread = { id: "t1", author: COMMENTS.author, initials: COMMENTS.initials, text: COMMENTS.text, time: COMMENTS.time, cell: COMMENTS.cell };
  tl.setVar("comments", [thread]);
  tl.setVar("commented", [COMMENTS.cell]);
  tl.setVar("commentUi", "");
  tl.setVar("field:comment", "");
  tl.setVar("focus", "");
}

/* ---------------- Find and replace ---------------- */

const findOpts = (tl: Timeline) => ({ matchCase: tl.getVar("findCase", false), entire: tl.getVar("findEntire", false) });

export function runFind(tl: Timeline) {
  const hits = findCells(getRows(tl), tl.getVar("field:find", ""), findOpts(tl));
  tl.setVar("findHits", hits);
  tl.setVar("findNow", hits.length ? 0 : -1);
}

export function runReplaceAll(tl: Timeline) {
  const { rows, count } = replaceAll(getRows(tl), tl.getVar("field:find", ""), tl.getVar("field:replace", ""), findOpts(tl));
  if (count) commit(tl, rows);
  tl.setVar("findHits", null);
  tl.setVar("findNow", -1);
  showDocToast(tl, FIND.replaced(count), "success", 3000);
  return count;
}

export function closeFind(tl: Timeline) {
  tl.setVar("findOpen", false);
  tl.setVar("findHits", null);
  tl.setVar("findNow", -1);
  tl.setVar("focus", "");
}
