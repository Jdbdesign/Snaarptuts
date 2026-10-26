import type { Timeline } from "@/lib/timeline";
import { showDocToast } from "@/components/docs/doc-toast-timeline";
import {
  cloneEl,
  elementsOf,
  findMatches,
  freeSpot,
  newId,
  replaceAll,
  replaceOne,
  snapTo,
  withElements,
  type ChartKind,
  type FindMatch,
  type ShapeKind,
  type SlideEl,
} from "./slide-elements";
import { BLUE, CHART_SAMPLE, EIV_DECK, EIV_SELECTED, FIND_SLIDES, INSERTS, NEW_TABLE } from "./slide-elements-data";
import type { SlideData } from "./slides-data";

/*
 * What the Edit, View and Insert menus DO to the deck (Snaarp Slides steps 20-36). State lives in scene variables (see SlidesApp):
 * `slides`, `selected` (slide index), `sel` (selected element ids), `clip`, `undoStack` / `redoStack`, `textEdit`, `cellEdit`, `findOpen`...
 * Every function here reads and writes those variables, so a script is a list of moves and calls.
 */

type Snapshot = { slides: SlideData[]; selected: number };
export type TextEdit = { id: string; mode: "append" | "replace" | "new"; box?: { x: number; y: number; w: number; h: number } };
export type CellEdit = { id: string; row: number; col: number };

export const getSlides = (tl: Timeline) => tl.getVar<SlideData[]>("slides", EIV_DECK);
export const getSlideIndex = (tl: Timeline) => tl.getVar<number>("selected", EIV_SELECTED);
export const getSel = (tl: Timeline) => tl.getVar<string[]>("sel", []);
export const getRatio = (tl: Timeline) => tl.getVar<number>("ratio", 16 / 9);
const currentEls = (tl: Timeline) => elementsOf(getSlides(tl), getSlideIndex(tl));

/** Start state of every step: the three-slide deck with slide 2 selected, nothing selected, empty history. */
export function initDeck(tl: Timeline) {
  tl.setVar("slides", EIV_DECK);
  tl.setVar("selected", EIV_SELECTED);
  tl.setVar("sel", []);
  tl.setVar("undoStack", []);
  tl.setVar("redoStack", []);
}

export const setSel = (tl: Timeline, ids: string[]) => tl.setVar("sel", ids);

/* ---------------------------------------------------------------- history */

/** Replace the deck and remember the old one for Undo. */
export function commit(tl: Timeline, next: SlideData[], before: SlideData[] = getSlides(tl)) {
  const stack = tl.getVar<Snapshot[]>("undoStack", []);
  tl.setVar("undoStack", [...stack, { slides: before, selected: getSlideIndex(tl) }]);
  tl.setVar("redoStack", []);
  tl.setVar("slides", next);
}

export function undo(tl: Timeline) {
  const stack = tl.getVar<Snapshot[]>("undoStack", []);
  const top = stack[stack.length - 1];
  if (!top) return;
  tl.setVar("redoStack", [...tl.getVar<Snapshot[]>("redoStack", []), { slides: getSlides(tl), selected: getSlideIndex(tl) }]);
  tl.setVar("undoStack", stack.slice(0, -1));
  tl.setVar("slides", top.slides);
  tl.setVar("selected", top.selected);
  setSel(tl, []);
}

export function redo(tl: Timeline) {
  const stack = tl.getVar<Snapshot[]>("redoStack", []);
  const top = stack[stack.length - 1];
  if (!top) return;
  tl.setVar("undoStack", [...tl.getVar<Snapshot[]>("undoStack", []), { slides: getSlides(tl), selected: getSlideIndex(tl) }]);
  tl.setVar("redoStack", stack.slice(0, -1));
  tl.setVar("slides", top.slides);
  tl.setVar("selected", top.selected);
  setSel(tl, []);
}

/* ------------------------------------------------------------- edit menu */

export function selectAll(tl: Timeline) {
  setSel(tl, currentEls(tl).map((e) => e.id));
}

export function copySel(tl: Timeline) {
  const ids = getSel(tl);
  tl.setVar("clip", currentEls(tl).filter((e) => ids.includes(e.id)).map((e) => structuredClone(e)));
}

export function deleteSel(tl: Timeline) {
  const ids = getSel(tl);
  if (!ids.length) return;
  const slides = getSlides(tl);
  const idx = getSlideIndex(tl);
  commit(tl, withElements(slides, idx, elementsOf(slides, idx).filter((e) => !ids.includes(e.id))));
  setSel(tl, []);
}

export function cutSel(tl: Timeline) {
  copySel(tl);
  deleteSel(tl);
}

export function pasteClip(tl: Timeline) {
  const clip = tl.getVar<SlideEl[] | null>("clip", null);
  if (!clip?.length) return;
  addCopies(tl, clip, true);
}

export function duplicateSel(tl: Timeline) {
  const ids = getSel(tl);
  if (!ids.length) return;
  addCopies(tl, currentEls(tl).filter((e) => ids.includes(e.id)), false);
}

/** Add copies of `source` to the current slide. A paste lands on its old spot unless something is already there; a duplicate is always nudged. */
function addCopies(tl: Timeline, source: SlideEl[], pasting: boolean) {
  const slides = getSlides(tl);
  const idx = getSlideIndex(tl);
  const existing = elementsOf(slides, idx);
  let working = slides;
  const made: SlideEl[] = [];
  for (const el of source) {
    const { dx, dy } = pasting ? freeSpot(existing, el) : { dx: 3, dy: 3 };
    const copy = cloneEl(working, el, dx, dy);
    made.push(copy);
    working = withElements(working, idx, [...elementsOf(working, idx), copy]);
  }
  commit(tl, working, slides);
  setSel(tl, made.map((e) => e.id));
}

/* ---------------------------------------------------------------- insert */

export function insertElement(tl: Timeline, el: SlideEl) {
  const slides = getSlides(tl);
  const idx = getSlideIndex(tl);
  commit(tl, withElements(slides, idx, [...elementsOf(slides, idx), el]), slides);
  setSel(tl, [el.id]);
  tl.setVar("tool", "select");
}

export function insertShape(tl: Timeline, shape: ShapeKind) {
  insertElement(tl, { id: newId(getSlides(tl), "shape"), kind: "shape", shape, fill: BLUE, ...INSERTS.shapes[shape] });
}

export function insertLine(tl: Timeline) {
  insertElement(tl, { id: newId(getSlides(tl), "line"), kind: "line", ...INSERTS.line });
}

export function insertTable(tl: Timeline) {
  insertElement(tl, { id: newId(getSlides(tl), "table"), kind: "table", ...INSERTS.table, cells: NEW_TABLE.cells.map((r) => [...r]) });
}

export function insertChart(tl: Timeline, chart: ChartKind) {
  insertElement(tl, { id: newId(getSlides(tl), "chart"), kind: "chart", chart, ...INSERTS.chart, title: CHART_SAMPLE.title, data: CHART_SAMPLE.data.map((d) => ({ ...d })) });
}

export function insertImage(tl: Timeline, key: string, alt: string) {
  insertElement(tl, { id: newId(getSlides(tl), "image"), kind: "image", ...INSERTS.image, src: key, alt });
}

/** Change the type of the selected chart (the Chart properties switch). */
export function setChartType(tl: Timeline, chart: ChartKind) {
  const slides = getSlides(tl);
  const idx = getSlideIndex(tl);
  const ids = getSel(tl);
  commit(tl, withElements(slides, idx, elementsOf(slides, idx).map((e) => (e.kind === "chart" && ids.includes(e.id) ? { ...e, chart } : e))), slides);
}

/* ---------------------------------------------------------- text editing */

/** Put a text box into typing mode: what `tl.typeText("slideText", ...)` types shows in it with a caret. */
export function beginTextEdit(tl: Timeline, edit: TextEdit) {
  tl.setVar("field:slideText", "");
  tl.setVar("textEdit", edit);
  if (edit.mode !== "new") setSel(tl, [edit.id]);
}

/** Finish typing: the typed line joins the text box (or the new box joins the slide) and Undo can take it back. */
export function endTextEdit(tl: Timeline) {
  const edit = tl.getVar<TextEdit | null>("textEdit", null);
  const typed = tl.getVar<string>("field:slideText", "");
  tl.setVar("textEdit", null);
  tl.setVar("field:slideText", "");
  if (!edit || !typed) return;
  const slides = getSlides(tl);
  const idx = getSlideIndex(tl);
  if (edit.mode === "new" && edit.box) {
    const el: SlideEl = { id: newId(slides, "text"), kind: "text", style: "box", paras: [typed], ...edit.box };
    commit(tl, withElements(slides, idx, [...elementsOf(slides, idx), el]), slides);
    setSel(tl, [el.id]);
    tl.setVar("tool", "select");
    return;
  }
  commit(
    tl,
    withElements(slides, idx, elementsOf(slides, idx).map((e) => (e.kind === "text" && e.id === edit.id ? { ...e, paras: edit.mode === "append" ? [...e.paras, typed] : [typed] } : e))),
    slides,
  );
}

export function beginCellEdit(tl: Timeline, edit: CellEdit) {
  tl.setVar("field:slideCell", "");
  tl.setVar("cellEdit", edit);
}

export function endCellEdit(tl: Timeline) {
  const edit = tl.getVar<CellEdit | null>("cellEdit", null);
  const typed = tl.getVar<string>("field:slideCell", "");
  tl.setVar("cellEdit", null);
  tl.setVar("field:slideCell", "");
  if (!edit) return;
  const slides = getSlides(tl);
  const idx = getSlideIndex(tl);
  commit(
    tl,
    withElements(
      slides,
      idx,
      elementsOf(slides, idx).map((e) =>
        e.kind === "table" && e.id === edit.id ? { ...e, cells: e.cells.map((row, r) => row.map((cell, c) => (r === edit.row && c === edit.col ? typed : cell))) } : e,
      ),
    ),
    slides,
  );
}

/* --------------------------------------------------------- find and replace */

export const FIND_VARS = { open: "findOpen", origin: "findOrigin", index: "findIndex", matchCase: "findMatchCase" } as const;

export function openFind(tl: Timeline) {
  tl.setVar("field:find", "");
  tl.setVar("field:replace", "");
  tl.setVar(FIND_VARS.origin, getSlideIndex(tl));
  tl.setVar(FIND_VARS.index, 0);
  tl.setVar(FIND_VARS.open, true);
}

export function closeFind(tl: Timeline) {
  tl.setVar(FIND_VARS.open, false);
  tl.setVar("focus", "");
}

export function currentMatches(tl: Timeline): FindMatch[] {
  return findMatches(getSlides(tl), tl.getVar<number>(FIND_VARS.origin, getSlideIndex(tl)), tl.getVar<string>("field:find", ""), tl.getVar<boolean>(FIND_VARS.matchCase, false));
}

/** Go to the next (+1) or previous (-1) match; the slide that holds it comes up on the canvas. */
export function stepFind(tl: Timeline, dir: 1 | -1) {
  const matches = currentMatches(tl);
  if (!matches.length) return;
  const i = (tl.getVar<number>(FIND_VARS.index, 0) + dir + matches.length) % matches.length;
  tl.setVar(FIND_VARS.index, i);
  tl.setVar("selected", matches[i].slide);
  setSel(tl, []);
}

export function replaceCurrent(tl: Timeline) {
  const matches = currentMatches(tl);
  const i = Math.min(tl.getVar<number>(FIND_VARS.index, 0), matches.length - 1);
  if (i < 0) return;
  const slides = getSlides(tl);
  commit(tl, replaceOne(slides, matches[i], tl.getVar<string>("field:find", ""), tl.getVar<string>("field:replace", "")), slides);
  tl.setVar(FIND_VARS.index, 0);
}

export function replaceEverything(tl: Timeline) {
  const n = currentMatches(tl).length;
  const slides = getSlides(tl);
  commit(tl, replaceAll(slides, tl.getVar<string>("field:find", ""), tl.getVar<string>("field:replace", ""), tl.getVar<boolean>(FIND_VARS.matchCase, false)), slides);
  tl.setVar(FIND_VARS.index, 0);
  showDocToast(tl, FIND_SLIDES.doneToast(n), "success", 3200);
}

/* ------------------------------------------------------------ view menu */

export const flip = (tl: Timeline, key: string, fallback = false) => tl.setVar(key, !tl.getVar<boolean>(key, fallback));

/* ------------------------------------------------- moving things with the cursor */

/** The slide on the canvas as a rectangle in client pixels, plus the conversion from the cursor to cqw (100 = the slide's width). */
function canvasGeometry() {
  const slide = document.querySelector<HTMLElement>("[data-tl=canvas-slide]");
  if (!slide) throw new Error("slides-edit: no canvas-slide");
  const r = slide.getBoundingClientRect();
  return { toCq: (cx: number, cy: number) => ({ x: ((cx - r.left) / r.width) * 100, y: ((cy - r.top) / r.width) * 100 }) };
}

const setMarker = async (tl: Timeline, x: number, y: number) => {
  tl.setVar("marker", { x, y });
  await tl.wait(60); // let the marker mount before the cursor looks for it
};

/** Glide the cursor over the slide to a spot (cqw). While it moves, the rulers' tick follows it (scene variable `rulerMark`). */
export async function sweepTo(tl: Timeline, x: number, y: number, ms: number) {
  await setMarker(tl, x, y);
  const { toCq } = canvasGeometry();
  await tl.moveCursorTo("[data-tl=slide-marker]", { ms, onMove: (cx, cy) => tl.setVar("rulerMark", toCq(cx, cy)) });
}

/**
 * Click an element to grab it and drag it by (dx, dy) cqw. The element follows the cursor; with guides on, its centre snaps to a
 * guide when it comes within reach (the guide turns solid blue). The move is one step in the history.
 */
export async function dragElementBy(tl: Timeline, id: string, dx: number, dy: number, ms = 1500) {
  const slides = getSlides(tl);
  const idx = getSlideIndex(tl);
  const el = elementsOf(slides, idx).find((e) => e.id === id);
  if (!el) throw new Error(`slides-edit: no element ${id}`);
  const sel = `[data-tl=el-${id}]`;
  await tl.moveCursorTo(sel, { ms: 700 });
  await tl.click(sel);
  await tl.wait(250);
  const cx0 = el.x + el.w / 2;
  const cy0 = el.y + el.h / 2;
  await setMarker(tl, cx0 + dx, cy0 + dy);
  const { toCq } = canvasGeometry();
  const ratio = getRatio(tl);
  const guides = tl.getVar<boolean>("guides", false);
  await tl.moveCursorTo("[data-tl=slide-marker]", {
    ms,
    onMove: (cx, cy) => {
      const p = toCq(cx, cy);
      let next = { ...el, x: el.x + (p.x - cx0), y: el.y + (p.y - cy0) };
      if (guides) {
        const s = snapTo(next, ratio);
        next = { ...next, x: s.x, y: s.y };
        tl.setVar("snap", s.v !== undefined || s.h !== undefined ? { v: s.v, h: s.h } : null);
      }
      tl.setVar("slides", withElements(slides, idx, elementsOf(slides, idx).map((e) => (e.id === id ? next : e))));
    },
  });
  commit(tl, getSlides(tl), slides);
  tl.setVar("marker", null);
  await tl.wait(450);
  tl.setVar("snap", null);
}

/** Draw a text box: press at (x, y), drag to (x + w, y + h) with a dashed outline following the cursor, then start typing in it. */
export async function drawTextBox(tl: Timeline, box: { x: number; y: number; w: number; h: number }, ms = 1100) {
  await setMarker(tl, box.x, box.y);
  await tl.moveCursorTo("[data-tl=slide-marker]", { ms: 800 });
  tl.setVar("draw", { x: box.x, y: box.y, w: 0, h: 0 });
  await setMarker(tl, box.x + box.w, box.y + box.h);
  const { toCq } = canvasGeometry();
  await tl.moveCursorTo("[data-tl=slide-marker]", {
    ms,
    onMove: (cx, cy) => {
      const p = toCq(cx, cy);
      tl.setVar("draw", { x: box.x, y: box.y, w: Math.max(0, p.x - box.x), h: Math.max(0, p.y - box.y) });
    },
  });
  tl.setVar("draw", null);
  tl.setVar("marker", null);
  beginTextEdit(tl, { id: "new", mode: "new", box });
}

/** Drag the bottom-right handle of the selected element so it grows by `dw` cqw (keeping its shape). */
export async function resizeElementBy(tl: Timeline, id: string, dw: number, ms = 1100) {
  const slides = getSlides(tl);
  const idx = getSlideIndex(tl);
  const el = elementsOf(slides, idx).find((e) => e.id === id);
  if (!el) throw new Error(`slides-edit: no element ${id}`);
  const handle = `[data-tl=handle-${id}-se]`;
  await tl.moveCursorTo(handle, { ms: 700 });
  const hx = el.x + el.w;
  const hy = el.y + el.h;
  const k = el.h / el.w;
  await setMarker(tl, hx + dw, hy + dw * k);
  const { toCq } = canvasGeometry();
  await tl.moveCursorTo("[data-tl=slide-marker]", {
    ms,
    onMove: (cx, cy) => {
      const p = toCq(cx, cy);
      const w = Math.max(6, el.w + (p.x - hx));
      tl.setVar("slides", withElements(slides, idx, elementsOf(slides, idx).map((e) => (e.id === id ? { ...e, w, h: w * k } : e))));
    },
  });
  commit(tl, getSlides(tl), slides);
  tl.setVar("marker", null);
}
