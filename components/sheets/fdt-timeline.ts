import type { Timeline } from "@/lib/timeline";
import { AUTOCOMPLETE, DATA, FILTER, MACRO, NAMED, NOTIF, PROTECT, SPELL } from "./fdt-data";
import { DROPDOWN } from "./insert-data";
import { openValidation } from "./insert-timeline";
import { clearFormatting, columnValues, lastRow, NO_FILTER, setLook, setNumberFormat, sortRange, sortRows, toggleFlag, type FilterState } from "./fdt-state";
import { DEFAULT_A11Y, DEFAULT_NOTIF, paletteResults, type A11yState, type Macro, type NotifState } from "./FdtDialogs";
import { colLabel, obj, parseRef, rangeRef, setCell, setCellText, single, sorted, type Range, type Rows } from "./grid-state";
import { EXTRA_ACTIONS, beginEdit, commit, getRows, runAction, setRows } from "./edit-timeline";
import { FDT_BOOK } from "./sheets-sample";
import { closeDialog, notice, openDialog, pressOn, toast } from "./sheets-timeline";

/*
 * Timeline helpers of the Format, Data, Tools, Extensions and Help steps (56-84). State lives in scene variables (see SheetsApp):
 * `filter`, `fviews`, `fvBar`, `fpCol`, `fpValues`, `fpOff`, `names`, `nameOpen`, `nrStart`, `protMsg`, `macros`, `macRec`, `macShown`,
 * `notif`, `a11y`, `acOn`, `spell`, `customKind`, `customNum`, `customPick`. Rows of the menus run through `runAction` (EXTRA_ACTIONS).
 */

const A1 = single(0, 0);
const getSel = (tl: Timeline) => sorted(tl.getVar<Range>("sel", A1));
const edit = (tl: Timeline, fn: (rows: Rows, s: Range) => Rows) => commit(tl, fn(getRows(tl), getSel(tl)));
const cellSel = (ref: string) => `[data-tl=cell-${ref.toLowerCase()}]`;

export type Named = { name: string; ref: string };
export type FView = { id: string; name: string; filter: FilterState };

/** Start of every Format, Data, Tools, Extensions and Help step: the sample sheet open, A1 selected, nothing open. */
export function beginFdt(tl: Timeline, url: string, cursor?: [number, number]) {
  beginEdit(tl, url, cursor);
  tl.setVar("title", FDT_BOOK.title);
  tl.setVar("sheets", FDT_BOOK.sheets);
  tl.setVar("activeSheet", FDT_BOOK.sheets[0].id);
  resetFdt(tl);
}

/** The sample sheet again and every variable of these menus back to its start. */
export function resetFdt(tl: Timeline) {
  setRows(tl, FDT_BOOK.sheets[0].rows);
  tl.setVar("sheets", FDT_BOOK.sheets);
  tl.setVar("history", { past: [], future: [] });
  tl.setVar("sel", A1);
  tl.setVar("rowHeights", {});
  tl.setVar("filter", NO_FILTER);
  tl.setVar("fviews", []);
  tl.setVar("fvBar", null);
  tl.setVar("fpCol", -1);
  tl.setVar("nameList", []);
  tl.setVar("nameOpen", false);
  tl.setVar("nameLabel", "");
  tl.setVar("protMsg", null);
  tl.setVar("macros", []);
  tl.setVar("macRec", "idle");
  tl.setVar("macShown", 0);
  tl.setVar("notif", DEFAULT_NOTIF);
  tl.setVar("a11y", DEFAULT_A11Y);
  tl.setVar("acOn", true);
  tl.setVar("spell", "fix");
  tl.setVar("dialog", "");
  tl.setVar("notice", "");
  tl.setVar("dvPanel", false);
  for (const f of ["custom-input", "nr-name", "nr-end", "pr-choice", "mac-name", "mac-desc", "mac-key", "kb-q", "pal-q", "fp-q"]) tl.setVar(`field:${f}`, "");
}

/** A step that starts with the macro already saved (it still works alone from the rail). */
export function seedMacro(tl: Timeline) {
  tl.setVar("macros", [{ id: "m1", name: MACRO.sampleName, desc: MACRO.sampleDesc, steps: MACRO.steps } satisfies Macro]);
}

/* ---------------- What the menu rows do ---------------- */

function fdtAction(tl: Timeline, id: string): boolean {
  const s = getSel(tl);
  switch (id) {
    case "fmt-bold": edit(tl, (r, g) => toggleFlag(r, g, "bold")); return true;
    case "fmt-italic": edit(tl, (r, g) => toggleFlag(r, g, "italic")); return true;
    case "fmt-underline": edit(tl, (r, g) => toggleFlag(r, g, "underline")); return true;
    case "fmt-strike": edit(tl, (r, g) => toggleFlag(r, g, "strike")); return true;
    case "fmt-clear": edit(tl, clearFormatting); return true;
    case "dat-az":
    case "sortsheet-az": return sortSheet(tl, s.c1, true);
    case "dat-za":
    case "sortsheet-za": return sortSheet(tl, s.c1, false);
    case "sortrange-az": edit(tl, (r, g) => sortRange(r, g, true)); return true;
    case "sortrange-za": edit(tl, (r, g) => sortRange(r, g, false)); return true;
    case "dat-filter": return toggleFilter(tl);
    case "fv-new": return newFilterView(tl);
    case "fv-remove": return removeFilters(tl);
    case "dat-validation": tl.setVar("dvRange", DATA.dvRange); openValidation(tl); return true;
    case "dat-named": return openNameRange(tl);
    case "dat-protect": tl.setVar("field:pr-choice", ""); openDialog(tl, "protect"); return true;
    case "tls-macro": openMacro(tl); return true;
    case "tls-manage": openDialog(tl, "macroManage"); return true;
    case "tls-spell": tl.setVar("spell", obj(getRows(tl)[parseRef(SPELL.cell)[0]]?.[parseRef(SPELL.cell)[1]]).text.includes(SPELL.word) ? "fix" : "done"); openDialog(tl, "spelling"); return true;
    case "tls-auto": toggleAutocomplete(tl); return true;
    case "tls-notif": openDialog(tl, "notif"); return true;
    case "tls-access": openDialog(tl, "a11y"); return true;
    case "hlp-search": tl.setVar("field:pal-q", ""); openDialog(tl, "palette"); return true;
    case "hlp-keys": tl.setVar("field:kb-q", ""); openDialog(tl, "shortcuts"); return true;
    case "hlp-about": openDialog(tl, "about"); return true;
  }
  if (id.startsWith("fs-")) return look(tl, { size: Number(id.slice(3)) });
  if (id.startsWith("al-")) {
    const v = id.slice(3);
    return look(tl, v === "top" || v === "middle" || v === "bottom" ? { valign: v } : { align: v as "left" | "center" | "right" });
  }
  if (id.startsWith("wr-")) return look(tl, { wrap: id.slice(3) as "overflow" | "wrap" | "clip" });
  if (id.startsWith("ro-")) return look(tl, { rotate: id === "ro-none" ? undefined : (id.slice(3) as "tiltup" | "tiltdown" | "stack" | "up") });
  if (id.startsWith("nf-")) {
    const nf = id.slice(3);
    if (nf.startsWith("custom-")) {
      tl.setVar("customKind", nf);
      tl.setVar("customPick", -1);
      tl.setVar("field:custom-input", "");
      const cell = obj(getRows(tl)[s.r1]?.[s.c1]);
      tl.setVar("customNum", cell.num ?? 1234.5);
      openDialog(tl, "custom");
    } else edit(tl, (r, g) => setNumberFormat(r, g, nf));
    return true;
  }
  if (id.startsWith("fv-view-")) return applyView(tl, id.slice(8));
  return false;
}
EXTRA_ACTIONS.push(fdtAction);

function look(tl: Timeline, patch: Parameters<typeof setLook>[2]) {
  edit(tl, (r, g) => setLook(r, g, patch));
  return true;
}

/* ---------------- Number: custom dialogs ---------------- */

/** Apply the pattern in the Custom dialog to the selection and close it. */
export function applyCustom(tl: Timeline) {
  const kind = tl.getVar("customKind", "custom-currency");
  const pattern = tl.getVar<string>("field:custom-input", "");
  edit(tl, (r, g) => setNumberFormat(r, g, kind, pattern));
  closeDialog(tl);
}

/** Click a preset row of the Custom dialog: it fills the pattern box. */
export async function pickPreset(tl: Timeline, n: number, pattern: string) {
  await pressOn(tl, `[data-tl=custom-preset-${n}]`, { ms: 600, ring: false });
  tl.setVar("customPick", n);
  tl.setVar("field:custom-input", pattern);
}

/* ---------------- Sorting and filters ---------------- */

function sortSheet(tl: Timeline, col: number, asc: boolean) {
  commit(tl, sortRows(getRows(tl), 1, lastRow(getRows(tl)), col, asc));
  return true;
}

const filterOf = (tl: Timeline) => tl.getVar<FilterState>("filter", NO_FILTER);

function toggleFilter(tl: Timeline) {
  if (filterOf(tl).on) removeFilters(tl);
  else tl.setVar("filter", { on: true, hidden: {} });
  return true;
}
function removeFilters(tl: Timeline) {
  tl.setVar("filter", NO_FILTER);
  tl.setVar("fvBar", null);
  tl.setVar("fviews", []);
  tl.setVar("fpCol", -1);
  return true;
}
function newFilterView(tl: Timeline) {
  tl.setVar("filter", { on: true, hidden: {} });
  tl.setVar("fvBar", FILTER.viewName);
  return true;
}
function applyView(tl: Timeline, id: string) {
  const v = tl.getVar<FView[]>("fviews", []).find((x) => x.id === id);
  if (!v) return true;
  tl.setVar("filter", v.filter);
  tl.setVar("fvBar", v.name);
  return true;
}

/** Click a header's filter button: its value list opens (nothing unticked yet, or what is already hidden). */
export async function openFilterPop(tl: Timeline, col: number) {
  await pressOn(tl, `[data-tl=filter-btn-${col}]`, { ms: 700, ring: false });
  tl.setVar("fpValues", columnValues(getRows(tl), col));
  tl.setVar("fpOff", filterOf(tl).hidden[col] ?? []);
  tl.setVar("field:fp-q", "");
  tl.setVar("fpCol", col);
}

/** Click a value in the open list: it is ticked or unticked. */
export async function toggleFilterValue(tl: Timeline, value: string) {
  const sel = `[data-tl=fp-val-${value.toLowerCase().replace(/\s+/g, "-")}]`;
  await tl.moveCursorTo(sel, { ms: 500 });
  tl.hover(sel);
  await tl.wait(150);
  await tl.click(sel);
  const off = tl.getVar<string[]>("fpOff", []);
  tl.setVar("fpOff", off.includes(value) ? off.filter((v) => v !== value) : [...off, value]);
  await tl.wait(250);
}

/** OK in the value list: the rows with an unticked value hide. */
export function confirmFilter(tl: Timeline) {
  const col = tl.getVar("fpCol", -1);
  const f = filterOf(tl);
  tl.setVar("filter", { ...f, hidden: { ...f.hidden, [col]: tl.getVar<string[]>("fpOff", []) } });
  tl.setVar("fpCol", -1);
}

/** The "Close" of the filter view bar: the view is saved under its name and every row shows again. */
export function closeFilterView(tl: Timeline, name: string) {
  const views = tl.getVar<FView[]>("fviews", []);
  tl.setVar("fviews", [...views, { id: `v${views.length + 1}`, name, filter: filterOf(tl) }]);
  tl.setVar("fvBar", null);
  tl.setVar("filter", NO_FILTER);
}

/* ---------------- Named ranges and protection ---------------- */

function openNameRange(tl: Timeline) {
  const s = getSel(tl);
  tl.setVar("nrStart", `${colLabel(s.c1)}${s.r1 + 1}`.toLowerCase());
  tl.setVar("field:nr-name", "");
  tl.setVar("field:nr-end", "");
  openDialog(tl, "nameRange");
  return true;
}

/** "Name" in the first dialog: on to the second. */
export const nameRangeNext = (tl: Timeline) => openDialog(tl, "rangeEnd");

/** "OK" in the second dialog: the range is named, selected, and listed in the Name box. */
export function nameRangeDone(tl: Timeline) {
  const name = tl.getVar<string>("field:nr-name", "").trim();
  const start = parseRef(tl.getVar("nrStart", NAMED.start));
  const endRef = tl.getVar<string>("field:nr-end", "").trim();
  const [r2, c2] = endRef ? parseRef(endRef) : start;
  const range = { r1: start[0], c1: start[1], r2, c2 };
  const ref = rangeRef(range);
  tl.setVar("nameList", [...tl.getVar<Named[]>("nameList", []), { name, ref }]);
  tl.setVar("sel", range);
  tl.setVar("nameLabel", name);
  closeDialog(tl);
  toast(tl, NAMED.toast(name, ref));
}

/** Open the Name box's list. */
export async function openNameBox(tl: Timeline) {
  await pressOn(tl, "[data-tl=name-box-arrow]", { ms: 700 });
  tl.setVar("nameOpen", true);
}

export function protectSheet(tl: Timeline, on: boolean) {
  const sheets = tl.getVar<{ id: string; locked?: boolean }[]>("sheets", []);
  tl.setVar("sheets", sheets.map((s, i) => (i === 0 ? { ...s, locked: on } : s)));
  closeDialog(tl);
  toast(tl, on ? PROTECT.toast : PROTECT.unprotect);
}

/** Click a cell and try to type: the protected sheet answers with its message. */
export async function tryTypeProtected(tl: Timeline, ref: string) {
  await tl.moveCursorTo(cellSel(ref), { ms: 650 });
  await tl.click(cellSel(ref));
  const [r, c] = parseRef(ref);
  tl.setVar("sel", single(r, c));
  tl.setVar("protMsg", { r, c });
  await tl.wait(1800);
}

/* ---------------- Macros ---------------- */

function openMacro(tl: Timeline) {
  for (const f of ["mac-name", "mac-desc", "mac-key"]) tl.setVar(`field:${f}`, "");
  tl.setVar("macRec", "idle");
  tl.setVar("macShown", 0);
  openDialog(tl, "macroNew");
}

/** Start Recording: the box turns to "Recording…" and lists the four steps one after another. */
export async function recordSteps(tl: Timeline, gapMs = 900) {
  await pressOn(tl, "[data-tl=mac-record]", { ms: 700 });
  tl.setVar("macRec", "rec");
  for (let i = 1; i <= MACRO.steps.length; i++) {
    await tl.wait(gapMs);
    tl.setVar("macShown", i);
  }
  await tl.wait(500);
  await pressOn(tl, "[data-tl=mac-record]", { ms: 600 });
  tl.setVar("macRec", "done");
}

export function saveMacro(tl: Timeline) {
  const name = tl.getVar<string>("field:mac-name", "").trim();
  const desc = tl.getVar<string>("field:mac-desc", "").trim();
  const list = tl.getVar<Macro[]>("macros", []);
  tl.setVar("macros", [...list, { id: `m${list.length + 1}`, name, desc, steps: MACRO.steps }]);
  closeDialog(tl);
  notice(tl, MACRO.created(name));
}

/** Run a macro: the header row A1:D1 turns bold with the grey fill. */
export function runMacro(tl: Timeline) {
  edit(tl, (r) => setLook(r, { r1: 0, c1: 0, r2: 0, c2: 3 }, { bold: true, fill: MACRO.fill }));
  closeDialog(tl);
}

export function deleteMacro(tl: Timeline, id: string) {
  tl.setVar("macros", tl.getVar<Macro[]>("macros", []).filter((m) => m.id !== id));
  notice(tl, MACRO.deleted);
}

/* ---------------- Spelling, autocomplete, settings ---------------- */

/** A misspelt cell the Spelling step starts from. */
export function seedTypo(tl: Timeline) {
  const [r, c] = parseRef(SPELL.cell);
  commit(tl, setCellText(getRows(tl), r, c, SPELL.typo));
  tl.setVar("history", { past: [], future: [] });
}

export function spellChange(tl: Timeline) {
  const [r, c] = parseRef(SPELL.cell);
  commit(tl, setCellText(getRows(tl), r, c, SPELL.fixed));
  tl.setVar("spell", "done");
}

function toggleAutocomplete(tl: Timeline) {
  const on = !tl.getVar("acOn", true);
  tl.setVar("acOn", on);
  notice(tl, on ? AUTOCOMPLETE.on : AUTOCOMPLETE.off);
}

/** Type a few letters into a cell and let the grey suggestion show; with `accept` the Tab key takes it. */
export async function typeWithSuggestion(tl: Timeline, ref: string, typed: string, accept: boolean) {
  const [r, c] = parseRef(ref);
  await tl.moveCursorTo(cellSel(ref), { ms: 650 });
  await tl.click(cellSel(ref));
  tl.setVar("sel", single(r, c));
  tl.setVar("field:cell", "");
  tl.setVar("cellEdit", { r, c });
  await tl.typeText("cell", typed, { msPerChar: 220 });
  await tl.wait(1500);
  const rows = getRows(tl);
  const ghost = tl.getVar("acOn", true) ? columnValues(rows, c).find((v) => v.toLowerCase().startsWith(typed.toLowerCase()) && v.length > typed.length) : undefined;
  const text = accept && ghost ? ghost : typed;
  if (accept && ghost) tl.setVar("field:cell", ghost);
  await tl.wait(400);
  commit(tl, setCellText(rows, r, c, text));
  tl.setVar("cellEdit", null);
  tl.setVar("field:cell", "");
}

export async function toggleSwitch(tl: Timeline, hook: string, apply: () => void, ms = 650) {
  await pressOn(tl, `[data-tl=${hook}]`, { ms, ring: false });
  apply();
  await tl.wait(450);
}
export function setNotif(tl: Timeline, patch: Partial<NotifState>) {
  tl.setVar("notif", { ...tl.getVar<NotifState>("notif", DEFAULT_NOTIF), ...patch });
}
export function flipNotif(tl: Timeline, key: Exclude<keyof NotifState, "freq">) {
  const n = tl.getVar<NotifState>("notif", DEFAULT_NOTIF);
  setNotif(tl, { [key]: !n[key] });
}
export function saveNotif(tl: Timeline) {
  closeDialog(tl);
  notice(tl, NOTIF.saved);
}
export function flipA11y(tl: Timeline, key: keyof A11yState) {
  const a = tl.getVar<A11yState>("a11y", DEFAULT_A11Y);
  tl.setVar("a11y", { ...a, [key]: !a[key] });
}

/* ---------------- Help ---------------- */

/** Enter in "Search the menus": the first result runs. */
export function runPaletteResult(tl: Timeline) {
  const q = tl.getVar<string>("field:pal-q", "").trim().toLowerCase();
  const hit = paletteResults(q)[0];
  closeDialog(tl);
  if (hit) runAction(tl, hit.id);
}

/** "Select all" / "Clear" in the open filter list. */
export async function filterAll(tl: Timeline, all: boolean) {
  await pressOn(tl, all ? "[data-tl=fp-all]" : "[data-tl=fp-clear]", { ms: 600, ring: false });
  tl.setVar("fpOff", all ? [] : tl.getVar<string[]>("fpValues", []));
  await tl.wait(500);
}

/** Cancel in the open filter list: nothing changes. */
export function cancelFilterPop(tl: Timeline) {
  tl.setVar("fpCol", -1);
}

/** Click the view's name in the bar and type a new one. */
export async function renameFilterView(tl: Timeline, name: string) {
  await pressOn(tl, "[data-tl=fv-name]", { ms: 650, ring: false });
  for (let i = 1; i <= name.length; i++) {
    tl.setVar("fvBar", name.slice(0, i));
    await tl.wait(120);
  }
  await tl.wait(300);
}

/** The cursor clicks a saved view's row in the open Filter views submenu. */
export async function chooseSavedView(tl: Timeline, id: string) {
  const sel = `[data-tl=menu-sub-fv-view-${id}]`;
  await tl.moveCursorTo(sel, { ms: 380, dx: -40 });
  tl.hover(sel);
  tl.highlight(sel);
  await tl.wait(150);
  await tl.click(sel);
  tl.clearHighlight();
  runAction(tl, `fv-view-${id}`);
  tl.hover(null);
  tl.setVar("esub", "");
  tl.setVar("emenu", "");
}

/** Done in the Data validation panel: the Status cells turn into coloured chips and the panel closes. */
export function applyStatusRule(tl: Timeline) {
  const dv = tl.getVar<{ items: { id: string; tone: string }[] }>("dv", { items: [] });
  const options = dv.items.map((i) => ({ label: tl.getVar<string>(`field:dv-${i.id}`, "").trim(), tone: i.tone })).filter((o) => o.label);
  let rows = getRows(tl);
  for (let r = 1; r <= lastRow(rows); r++) {
    const cell = obj(rows[r]?.[DATA.statusCol]);
    const hit = options.find((o) => o.label.toLowerCase() === cell.text.trim().toLowerCase());
    if (hit) rows = setCell(rows, r, DATA.statusCol, { ...cell, chip: { kind: "dropdown", label: hit.label, tone: hit.tone } });
  }
  commit(tl, rows);
  tl.setVar("ddOptions", options);
  tl.setVar("dvPanel", false);
  toast(tl, DROPDOWN.toast);
}

/** Next in the Protect dialog: choice 1 protects the sheet, or lifts the protection when it already has it. */
export function protectNext(tl: Timeline) {
  const locked = !!tl.getVar<{ locked?: boolean }[]>("sheets", [])[0]?.locked;
  protectSheet(tl, !locked);
}

/** Close the Name box's list again. */
export const closeNameBox = (tl: Timeline) => tl.setVar("nameOpen", false);
