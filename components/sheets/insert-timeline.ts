import type { Timeline } from "@/lib/timeline";
import { beginEdit, chooseRow, chooseSub, setRows } from "./edit-timeline";
import { COLUMN_COUNT, ROW_COUNT } from "./sheets-data";
import { parseRef, single } from "./grid-state";
import { INSERT_BOOK, insertRows } from "./sheets-sample";
import { pressOn } from "./sheets-timeline";
import { defaultChart, moveSeries, patchSeries, type ChartState } from "./chart-state";

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
  resetChart(tl);
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

/* ---------------- Chart (steps 42-44) ---------------- */

export function resetChart(tl: Timeline) {
  tl.setVar("chart", null);
  tl.setVar("chartPanel", false);
  tl.setVar("chartTab", "setup");
  tl.setVar("chartAcc", "");
  tl.setVar("chartDrop", "");
  for (const k of ["chart", "h", "v"]) tl.setVar(`field:ct-${k}`, "");
  tl.setVar("focus", "");
}

export const getChart = (tl: Timeline) => tl.getVar<ChartState>("chart", defaultChart());
export const setChart = (tl: Timeline, next: ChartState) => tl.setVar("chart", next);
export const patchChart = (tl: Timeline, patch: Partial<ChartState>) => setChart(tl, { ...getChart(tl), ...patch });

/** Insert > Chart has just been clicked: the preview chart appears over the cells and the Chart editor opens on Setup. */
export function insertChart(tl: Timeline) {
  tl.setVar("chart", defaultChart());
  tl.setVar("chartTab", "setup");
  tl.setVar("chartAcc", "");
  tl.setVar("chartPanel", true);
}

/** Start state of the later chart steps: a chart already inserted (not yet placed), the editor open. */
export function startChart(tl: Timeline, patch: Partial<ChartState> = {}, tab: "setup" | "customize" = "setup", acc = "") {
  tl.setVar("chart", { ...defaultChart(), ...patch });
  tl.setVar("chartTab", tab);
  tl.setVar("chartAcc", acc);
  tl.setVar("chartPanel", true);
}

/** Click a tab of the Chart editor. Customize opens on Chart style, as in the recording. */
export async function clickChartTab(tl: Timeline, id: "setup" | "customize") {
  await pressOn(tl, `[data-tl=chart-tab-${id}]`, { ms: 700, ring: false });
  tl.setVar("chartTab", id);
  tl.setVar("chartAcc", id === "customize" ? "style" : "");
}

/** Click a Customize section header: it opens and the others close (click it again to close it). */
export async function openSection(tl: Timeline, id: string) {
  await pressOn(tl, `[data-tl=cs-sec-${id}]`, { ms: 650, ring: false });
  tl.setVar("chartAcc", tl.getVar("chartAcc", "") === id ? "" : id);
}

/** Open a select list of the Chart editor. */
export async function openSelect(tl: Timeline, id: string, opts: { ms?: number } = {}) {
  await pressOn(tl, `[data-tl=cs-${id}]`, { ms: opts.ms ?? 650, ring: false });
  tl.setVar("chartDrop", id);
  await tl.wait(250);
}

/** Open a select list, click one option and apply it to the chart. */
export async function chooseOption(tl: Timeline, id: string, option: string, apply: (c: ChartState) => ChartState, opts: { ms?: number; open?: boolean } = {}) {
  if (opts.open !== false) await openSelect(tl, id, { ms: opts.ms });
  const sel = `[data-tl=cd-${id}-${option.replace("#", "")}]`;
  await tl.moveCursorTo(sel, { ms: 420 });
  tl.hover(sel);
  await tl.wait(150);
  await tl.click(sel);
  tl.hover(null);
  setChart(tl, apply(getChart(tl)));
  tl.setVar("chartDrop", "");
  await tl.wait(500);
}

/** Click one of the Customize tick boxes and apply it. */
export async function clickCheck(tl: Timeline, id: string, apply: (c: ChartState) => ChartState) {
  await pressOn(tl, `[data-tl=cs-check-${id}]`, { ms: 600, ring: false });
  setChart(tl, apply(getChart(tl)));
  await tl.wait(450);
}

/** Tick or untick a series in the Setup list. */
export async function toggleSeries(tl: Timeline, id: string) {
  await pressOn(tl, `[data-tl=cs-tick-${id}]`, { ms: 600, ring: false });
  const c = getChart(tl);
  setChart(tl, patchSeries(c, id, { on: !c.series.find((x) => x.id === id)!.on }));
  await tl.wait(500);
}

/** Drag a series by its grip to the row of another series: it takes that place in the list. */
export async function dragSeries(tl: Timeline, id: string, onto: string) {
  await tl.moveCursorTo(`[data-tl=cs-grip-${id}]`, { ms: 650 });
  tl.hover(`[data-tl=cs-series-${id}]`);
  await tl.wait(250);
  await tl.moveCursorTo(`[data-tl=cs-grip-${onto}]`, { ms: 800 });
  const c = getChart(tl);
  const by = c.series.findIndex((x) => x.id === onto) - c.series.findIndex((x) => x.id === id);
  setChart(tl, moveSeries(c, id, by));
  tl.hover(null);
  await tl.wait(500);
}
