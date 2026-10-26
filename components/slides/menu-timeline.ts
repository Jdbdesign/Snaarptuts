import type { Timeline } from "@/lib/timeline";
import { enterFullScreen } from "@/components/docs/view-menu-timeline";
import {
  copySel,
  cutSel,
  deleteSel,
  duplicateSel,
  flip,
  insertChart,
  insertLine,
  insertShape,
  insertTable,
  openFind,
  pasteClip,
  redo,
  selectAll,
  undo,
} from "./slides-edit";
import type { ChartKind, ShapeKind } from "./slide-elements";
import { DROPDOWNS, type DropdownId } from "./slides-menus-data";
import { pressOn } from "./slides-timeline";

/*
 * Timeline helpers for the Edit, View and Insert menus (Snaarp Slides steps 20-36). Same pattern as the File menu helpers in
 * slides-timeline.ts: the helpers move the cursor, ring and click, and then do what the click would do. The open menu is the
 * scene variable `menuOpen` (edit | view | insert), its open submenu `menuSub` and the greyed row showing its tooltip `menuTip`.
 */

const ROW_SUB = new Map<string, string | undefined>(
  (Object.keys(DROPDOWNS) as DropdownId[]).flatMap((m) => DROPDOWNS[m].flat().map((r) => [`${m}.${r.id}`, r.sub] as const)),
);

const item = (menu: DropdownId, id: string) => `[data-tl=${menu}-item-${id}]`;
const subRow = (menu: DropdownId, id: string) => `[data-tl=${menu}-sub-${id}]`;

/** Move to the menu label ("Edit", "View" or "Insert"), ring it, click it and open the menu. */
export async function openMenu(tl: Timeline, menu: DropdownId, opts: { ms?: number } = {}) {
  await pressOn(tl, `[data-tl=editor-menu-${menu}]`, { ms: opts.ms ?? 700 });
  tl.setVar("menuSub", "");
  tl.setVar("menuTip", "");
  tl.setVar("menuOpen", menu);
}

export function closeMenu(tl: Timeline) {
  tl.hover(null);
  tl.setVar("menuTip", "");
  tl.setVar("menuSub", "");
  tl.setVar("menuOpen", "");
}

/** Move onto a row and hover it. A row with a submenu opens it; a greyed "Coming soon" row (with `tip`) shows its tooltip. */
export async function hoverRow(tl: Timeline, menu: DropdownId, id: string, opts: { ms?: number; tip?: boolean } = {}) {
  await tl.moveCursorTo(item(menu, id), { ms: opts.ms ?? 350, dx: -50 });
  tl.hover(item(menu, id));
  tl.setVar("menuSub", ROW_SUB.get(`${menu}.${id}`) ?? "");
  tl.setVar("menuTip", opts.tip ? id : "");
}

export async function hoverSubRow(tl: Timeline, menu: DropdownId, id: string, opts: { ms?: number } = {}) {
  await tl.moveCursorTo(subRow(menu, id), { ms: opts.ms ?? 300, dx: -30 });
  tl.hover(subRow(menu, id));
}

/** What choosing a row does. Keys are "<menu>.<row>" or "<menu>.<row>.<sub row>". */
const ACTIONS: Record<string, (tl: Timeline) => void> = {
  "edit.undo": undo,
  "edit.redo": redo,
  "edit.cut": cutSel,
  "edit.copy": copySel,
  "edit.paste": pasteClip,
  "edit.delete": deleteSel,
  "edit.duplicate": duplicateSel,
  "edit.find": openFind,
  "edit.selectall": selectAll,
  "view.notes": (tl) => flip(tl, "notesOpen"),
  "view.ruler": (tl) => flip(tl, "rulers"),
  "view.guides": (tl) => flip(tl, "guides"),
  "view.fullscreen": (tl) => {
    tl.setVar("fsSlide", tl.getVar<number>("selected", 1));
    enterFullScreen(tl);
  },
  "insert.textbox": (tl) => tl.setVar("tool", "text"),
  "insert.image": (tl) => tl.setVar("dialog", "insertImage"),
  "insert.line": insertLine,
  "insert.table": insertTable,
};
for (const z of ["50", "75", "100", "125", "150", "200", "fit"]) ACTIONS[`view.zoom.${z}`] = (tl) => tl.setVar("zoom", z);
for (const s of ["rect", "ellipse", "triangle", "diamond", "star", "arrow"] as ShapeKind[]) ACTIONS[`insert.shape.${s}`] = (tl) => insertShape(tl, s);
for (const c of ["bar", "line", "pie"] as ChartKind[]) ACTIONS[`insert.chart.${c}`] = (tl) => insertChart(tl, c);

function run(tl: Timeline, key: string) {
  const act = ACTIONS[key];
  if (!act) throw new Error(`Slides menus: no action for "${key}"`);
  act(tl);
}

/** Move onto a row, ring it, click it, close the menu and do what the row does. */
export async function chooseRow(tl: Timeline, menu: DropdownId, id: string, opts: { ms?: number } = {}) {
  await tl.moveCursorTo(item(menu, id), { ms: opts.ms ?? 450, dx: -50 });
  tl.hover(item(menu, id));
  tl.highlight(item(menu, id));
  await tl.wait(150);
  await tl.click(item(menu, id));
  tl.clearHighlight();
  closeMenu(tl);
  run(tl, `${menu}.${id}`);
}

/** Open a row's submenu, click one of its rows, close the menu and do what that row does. */
export async function chooseSubRow(tl: Timeline, menu: DropdownId, id: string, subId: string, opts: { ms?: number } = {}) {
  await hoverRow(tl, menu, id, { ms: opts.ms ?? 450 });
  await tl.wait(220);
  await tl.moveCursorTo(subRow(menu, subId), { ms: 360, dx: -30 });
  tl.hover(subRow(menu, subId));
  tl.highlight(subRow(menu, subId));
  await tl.wait(150);
  await tl.click(subRow(menu, subId));
  tl.clearHighlight();
  closeMenu(tl);
  run(tl, `${menu}.${id}.${subId}`);
}
