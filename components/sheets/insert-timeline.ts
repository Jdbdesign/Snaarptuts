import type { Timeline } from "@/lib/timeline";
import { beginEdit, chooseRow, chooseSub, commit, getRows, setRows } from "./edit-timeline";
import { CHECKBOX, DROPDOWN, EMOJI, FUNCTIONS, IMAGE, INSERT_SAMPLE, LINK } from "./insert-data";
import { DEFAULT_DV, type DvState } from "./InsertPanels";
import type { FloatingImage } from "./SheetsApp";
import { toast } from "./sheets-timeline";
import { COLUMN_COUNT, ROW_COUNT } from "./sheets-data";
import { obj, parseRef, refOf, setCell, single } from "./grid-state";
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
  resetImage(tl);
  resetFunctionLink(tl);
  resetControls(tl);
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

/* ---------------- Images (steps 45-46) ---------------- */

export function resetImage(tl: Timeline) {
  tl.setVar("dialog", "");
  tl.setVar("imgTab", "upload");
  tl.setVar("imgChooser", false);
  tl.setVar("imgChosen", "");
  tl.setVar("field:img-alt", "");
  tl.setVar("field:img-url", "");
  tl.setVar("imgOver", null);
  tl.setVar("rowHeights", {});
  tl.setVar("focus", "");
}

export const openImageDialog = (tl: Timeline) => tl.setVar("dialog", "insertImage");
export const closeImageDialog = (tl: Timeline) => {
  tl.hover(null);
  tl.setVar("focus", "");
  tl.setVar("dialog", "");
};

/** Click the drop area, then pick one of the sample pictures in the chooser: the preview appears. */
export async function chooseImageFile(tl: Timeline, id: string) {
  await pressOn(tl, "[data-tl=img-drop]", { ms: 700, ring: false });
  tl.setVar("imgChooser", true);
  await tl.wait(500);
  const sel = `[data-tl=img-file-${id}]`;
  await tl.moveCursorTo(sel, { ms: 550 });
  tl.hover(sel);
  await tl.wait(250);
  await tl.click(sel);
  tl.hover(null);
  tl.setVar("imgChooser", false);
  tl.setVar("imgChosen", id);
  await tl.wait(600);
}

/** Insert in cell: the cell shows the picture (its row grows), the formula bar keeps the =IMAGE(...) text. */
export function placeImageInCell(tl: Timeline, id: string) {
  const file = IMAGE.files.find((f) => f.id === id)!;
  const [r, c] = parseRef(IMAGE.cell);
  commit(tl, setCell(getRows(tl), r, c, { text: "", image: file.src, formula: IMAGE.cellFormula }));
  tl.setVar("rowHeights", { [IMAGE.tallRow.row]: IMAGE.tallRow.px });
  tl.setVar("sel", single(r, c));
  closeImageDialog(tl);
  toast(tl, IMAGE.toastCell);
}

/** Insert over cells: the picture floats over the grid, selected, with its handles. */
export function placeImageOver(tl: Timeline, id: string) {
  const file = IMAGE.files.find((f) => f.id === id)!;
  const fi: FloatingImage = { ...IMAGE.over, src: file.src, alt: file.alt, selected: true };
  tl.setVar("imgOver", fi);
  closeImageDialog(tl);
  toast(tl, IMAGE.toastOver);
}

/** Drag the picture's bottom-right handle: the picture grows with the cursor, to the final size. */
export async function resizeFloatingImage(tl: Timeline, to: { w: number; h: number }) {
  const start = tl.getVar<FloatingImage>("imgOver", null as unknown as FloatingImage);
  const box = document.querySelector("[data-tl=float-img]")!.getBoundingClientRect();
  const scale = box.width / start.w;
  const handle = "[data-tl=float-img-handle]";
  await tl.moveCursorTo(handle, { ms: 700 });
  const hb = document.querySelector(handle)!.getBoundingClientRect();
  const x0 = hb.left + hb.width / 2;
  const y0 = hb.top + hb.height / 2;
  await tl.moveCursorTo(handle, {
    ms: 1000,
    dx: (to.w - start.w) * scale,
    dy: (to.h - start.h) * scale,
    onMove: (x, y) => tl.setVar("imgOver", { ...start, w: start.w + (x - x0) / scale, h: start.h + (y - y0) / scale }),
  });
  tl.setVar("imgOver", { ...start, w: to.w, h: to.h });
}

/* ---------------- Function and Link (steps 47-48) ---------------- */

export function resetFunctionLink(tl: Timeline) {
  tl.setVar("refRange", null);
  tl.setVar("fnOpen", false);
  tl.setVar("field:fn-search", "");
  tl.setVar("linkPop", null);
  tl.setVar("linkChip", null);
  tl.setVar("field:link-search", "");
}

/** The function has been clicked: its formula is typed into the next result cell (the cells it reads are outlined) and the value appears. */
export async function applyFunction(tl: Timeline, id: string, index: number) {
  const r = FUNCTIONS.firstRow + index;
  const c = FUNCTIONS.resultCol;
  tl.setVar("refRange", FUNCTIONS.rangeCells);
  tl.setVar("sel", single(r, c));
  tl.setVar("field:cell", "");
  tl.setVar("cellEdit", { r, c });
  await tl.typeText("cell", FUNCTIONS.formulas[id], { msPerChar: 38 });
  await tl.wait(400);
  let rows = setCell(getRows(tl), r, FUNCTIONS.labelCol, FUNCTIONS.labels[id]);
  rows = setCell(rows, r, c, { text: "", formula: FUNCTIONS.formulas[id], fx: true, align: "right" });
  commit(tl, rows);
  tl.setVar("cellEdit", null);
  tl.setVar("field:cell", "");
}

/** Insert > Link on the selected cell: the popover opens under it showing the cell's text. */
export async function openLinkPopover(tl: Timeline, ref: string) {
  const [r, c] = parseRef(ref);
  const text = obj(getRows(tl)[r]?.[c]).text;
  tl.setVar("field:link-search", "");
  tl.setVar("linkChip", null);
  tl.setVar("linkPop", { r, c, text });
  await tl.wait(500);
}

/** The cell becomes a link: its text turns blue and underlined, the popover closes and the chip appears under it. */
export function placeLink(tl: Timeline, ref: string, label: string, href: string) {
  const [r, c] = parseRef(ref);
  const cell = obj(getRows(tl)[r]?.[c]);
  commit(tl, setCell(getRows(tl), r, c, { ...cell, link: href }));
  tl.setVar("linkPop", null);
  tl.setVar("linkChip", { r, c, label });
  tl.setVar("field:link-search", "");
  tl.setVar("focus", "");
  toast(tl, LINK.toast);
}

export const linkRef = (r: number, c: number) => refOf(r, c).toLowerCase();

/* ---------------- Checkbox, Dropdown, Emoji (steps 49-51) ---------------- */

export function resetControls(tl: Timeline) {
  tl.setVar("dvPanel", false);
  tl.setVar("dv", DEFAULT_DV);
  DROPDOWN.start.forEach((t, i) => tl.setVar(`field:dv-i${i + 1}`, t));
  tl.setVar("field:dv-i3", "");
  tl.setVar("ddPop", null);
  tl.setVar("ddOptions", []);
  tl.setVar("emojiTab", EMOJI.tabs[0]);
  tl.setVar("field:emoji-search", "");
}

const cellAt = (tl: Timeline, ref: string) => {
  const [r, c] = parseRef(ref);
  return { r, c, cell: obj(getRows(tl)[r]?.[c]) };
};

/** A header cell in the style of the sample's header row (used where a step needs a new column). */
export function addHeader(tl: Timeline, ref: string, text: string) {
  const [r, c] = parseRef(ref);
  setRows(tl, setCell(getRows(tl), r, c, { text, bold: true, fill: INSERT_SAMPLE.headerFill }));
}

/** Insert > Checkbox on the selected range: every cell gets an empty tick box. */
export function applyCheckboxes(tl: Timeline) {
  const s = tl.getVar("sel", single(0, 0));
  let rows = getRows(tl);
  for (let r = Math.min(s.r1, s.r2); r <= Math.max(s.r1, s.r2); r++)
    for (let c = Math.min(s.c1, s.c2); c <= Math.max(s.c1, s.c2); c++) rows = setCell(rows, r, c, { text: "FALSE", box: "off" });
  commit(tl, rows);
}

/** Click a checkbox cell: it ticks or unticks. */
export async function clickBox(tl: Timeline, ref: string) {
  await pressOn(tl, `[data-tl=cell-${ref}]`, { ms: 650, ring: false });
  const { r, c, cell } = cellAt(tl, ref);
  const on = cell.box !== "on";
  commit(tl, setCell(getRows(tl), r, c, { ...cell, text: on ? "TRUE" : "FALSE", box: on ? "on" : "off" }));
  tl.setVar("sel", single(r, c));
  await tl.wait(500);
}

export const getDv = (tl: Timeline) => tl.getVar<DvState>("dv", DEFAULT_DV);
const dvLabel = (tl: Timeline, id: string) => tl.getVar<string>(`field:dv-${id}`, "").trim();

/** Insert > Dropdown has been clicked: the Data validation rules panel opens. */
export const openValidation = (tl: Timeline) => {
  tl.setVar("dv", DEFAULT_DV);
  tl.setVar("dvPanel", true);
};

/** Click an item's text box, clear it and type a new name. */
export async function renameItem(tl: Timeline, id: string, text: string) {
  const sel = `[data-tl=field-dv-${id}]`;
  await tl.moveCursorTo(sel, { ms: 600 });
  await tl.click(sel);
  tl.setVar("focus", `dv-${id}`);
  tl.setVar("field:dv-" + id, "");
  await tl.typeText(`dv-${id}`, text, { msPerChar: 70 });
  await tl.wait(300);
}

/** Open an item's colour picker and click a colour. */
export async function pickItemColour(tl: Timeline, id: string, hex: string) {
  await pressOn(tl, `[data-tl=dv-dot-${id}]`, { ms: 650, ring: false });
  tl.setVar("dv", { ...getDv(tl), pick: id });
  await tl.wait(450);
  const sel = `[data-tl=dv-color-${hex.replace("#", "")}]`;
  await tl.moveCursorTo(sel, { ms: 500 });
  tl.hover(sel);
  await tl.wait(200);
  await tl.click(sel);
  tl.hover(null);
  const dv = getDv(tl);
  tl.setVar("dv", { items: dv.items.map((i) => (i.id === id ? { ...i, tone: hex } : i)), pick: "" });
  await tl.wait(400);
}

/** "Add another item": a third row appears. */
export async function addItem(tl: Timeline) {
  await pressOn(tl, "[data-tl=dv-add]", { ms: 650, ring: false });
  const dv = getDv(tl);
  tl.setVar("dv", { ...dv, items: [...dv.items, { id: `i${dv.items.length + 1}`, tone: "#E6E6E6" }] });
  await tl.wait(500);
}

/** Done: the rule is applied. Cells in the range whose text matches an item turn into that item's coloured chip. */
export function applyDropdownRule(tl: Timeline) {
  const dv = getDv(tl);
  const options = dv.items.map((i) => ({ label: dvLabel(tl, i.id), tone: i.tone })).filter((o) => o.label);
  const { r1, c1, r2, c2 } = DROPDOWN.rangeCells;
  let rows = getRows(tl);
  for (let r = r1; r <= r2; r++)
    for (let c = c1; c <= c2; c++) {
      const cell = obj(rows[r]?.[c]);
      const hit = options.find((o) => o.label.toLowerCase() === cell.text.trim().toLowerCase());
      if (hit) rows = setCell(rows, r, c, { ...cell, chip: { kind: "dropdown", label: hit.label, tone: hit.tone } });
    }
  commit(tl, rows);
  tl.setVar("ddOptions", options);
  tl.setVar("dvPanel", false);
  toast(tl, DROPDOWN.toast);
}

/** Click a dropdown cell: its list opens under it. */
export async function openCellDropdown(tl: Timeline, ref: string) {
  await pressOn(tl, `[data-tl=cell-${ref}]`, { ms: 700, ring: false });
  const { r, c } = cellAt(tl, ref);
  tl.setVar("sel", single(r, c));
  tl.setVar("ddPop", { r, c });
  await tl.wait(600);
}

/** Pick one value from the open list: the cell shows that chip. */
export async function pickDropdownValue(tl: Timeline, label: string) {
  const sel = `[data-tl=dd-item-${label.toLowerCase()}]`;
  await tl.moveCursorTo(sel, { ms: 600 });
  tl.hover(sel);
  await tl.wait(250);
  await tl.click(sel);
  tl.hover(null);
  const pop = tl.getVar<{ r: number; c: number }>("ddPop", { r: 0, c: 0 });
  const opt = tl.getVar<{ label: string; tone: string }[]>("ddOptions", []).find((o) => o.label === label)!;
  const cell = obj(getRows(tl)[pop.r]?.[pop.c]);
  commit(tl, setCell(getRows(tl), pop.r, pop.c, { ...cell, text: label, chip: { kind: "dropdown", label, tone: opt.tone } }));
  tl.setVar("ddPop", null);
  await tl.wait(500);
}

/** Pick an emoji: it is added to the selected cell's text and the picker closes. */
export function insertEmoji(tl: Timeline, ref: string, id: string) {
  const ch = EMOJI.list.find((e) => e[1] === id)![2];
  const { r, c, cell } = cellAt(tl, ref);
  commit(tl, setCell(getRows(tl), r, c, { ...cell, text: `${cell.text} ${ch}`.trim() }));
  tl.setVar("dialog", "");
  tl.setVar("focus", "");
}

export const checkboxCells = CHECKBOX;
