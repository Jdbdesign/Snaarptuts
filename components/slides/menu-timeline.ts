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
import { alignSel, changeIndent, deleteSlide, distribute, restack, rotateSel, duplicateSlide, newSlide, playableSlides, setAlign, setSpacing, toggleFormat, toggleSkip } from "./slides-format";
import { pressOn } from "./slides-timeline";

/*
 * Timeline helpers for the Edit, View, Insert, Format, Slide, Arrange and Tools menus (Snaarp Slides steps 20-50). Same pattern as the File menu helpers in
 * slides-timeline.ts: the helpers move the cursor, ring and click, and then do what the click would do. The open menu is the
 * scene variable `menuOpen` (edit | view | insert), its open submenu `menuSub` and the greyed row showing its tooltip `menuTip`.
 */

const ROW_SUB = new Map<string, string | undefined>(
  (Object.keys(DROPDOWNS) as DropdownId[]).flatMap((m) => DROPDOWNS[m].flat().map((r) => [`${m}.${r.id}`, r.sub] as const)),
);

const item = (menu: DropdownId, id: string) => `[data-tl=${menu}-item-${id}]`;
const subRow = (menu: DropdownId, id: string) => `[data-tl=${menu}-sub-${id}]`;

/** Move to the menu label ("Edit", "View", "Format"...), ring it, click it and open the menu. */
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
ACTIONS["format.theme"] = (tl) => tl.setVar("toolMenu", "theme");
ACTIONS["format.background"] = (tl) => tl.setVar("toolMenu", "background");
ACTIONS["slide.new"] = newSlide;
ACTIONS["slide.duplicate"] = duplicateSlide;
ACTIONS["slide.delete"] = deleteSlide;
ACTIONS["slide.skip"] = toggleSkip;
ACTIONS["arrange.front"] = (tl) => restack(tl, "front");
ACTIONS["arrange.forward"] = (tl) => restack(tl, "forward");
ACTIONS["arrange.backward"] = (tl) => restack(tl, "backward");
ACTIONS["arrange.back"] = (tl) => restack(tl, "back");
ACTIONS["arrange.alignh.left"] = (tl) => alignSel(tl, "h", "start");
ACTIONS["arrange.alignh.center"] = (tl) => alignSel(tl, "h", "middle");
ACTIONS["arrange.alignh.right"] = (tl) => alignSel(tl, "h", "end");
ACTIONS["arrange.alignv.top"] = (tl) => alignSel(tl, "v", "start");
ACTIONS["arrange.alignv.middle"] = (tl) => alignSel(tl, "v", "middle");
ACTIONS["arrange.alignv.bottom"] = (tl) => alignSel(tl, "v", "end");
ACTIONS["arrange.disth"] = (tl) => distribute(tl, "h");
ACTIONS["arrange.distv"] = (tl) => distribute(tl, "v");
ACTIONS["arrange.rotcw"] = (tl) => rotateSel(tl, 1);
ACTIONS["arrange.rotccw"] = (tl) => rotateSel(tl, -1);
ACTIONS["format.bold"] = (tl) => toggleFormat(tl, "bold");
ACTIONS["format.italic"] = (tl) => toggleFormat(tl, "italic");
ACTIONS["format.underline"] = (tl) => toggleFormat(tl, "underline");
ACTIONS["format.strike"] = (tl) => toggleFormat(tl, "strike");
for (const a of ["left", "center", "right", "justify"] as const) ACTIONS[`format.align.${a}`] = (tl) => setAlign(tl, a);
ACTIONS["format.align.indent-more"] = (tl) => changeIndent(tl, 1);
ACTIONS["format.align.indent-less"] = (tl) => changeIndent(tl, -1);
for (const [id, n] of [["single", 1], ["s115", 1.15], ["s15", 1.5], ["double", 2]] as const) ACTIONS[`format.spacing.${id}`] = (tl) => setSpacing(tl, n);
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

/** In full screen: show an arrow key, press it and move to the next or previous slide (scene variables `fsArrow`, `fsPressed`, `fsSlide`). */
export async function pressFullScreenArrow(tl: Timeline, dir: "next" | "previous") {
  const deck = tl.getVar<{ skipped?: boolean }[]>("slides", []);
  const play = playableSlides(deck as never);
  const at = tl.getVar<number>("fsSlide", 1);
  tl.setVar("fsArrow", dir);
  await tl.wait(600);
  tl.setVar("fsPressed", true);
  await tl.wait(220);
  // Skipped slides are left out of the slideshow: step to the next (or previous) slide that is not skipped.
  const to = dir === "next" ? play.find((i) => i > at) : [...play].reverse().find((i) => i < at);
  tl.setVar("fsSlide", to ?? at);
  await tl.wait(260);
  tl.setVar("fsPressed", false);
  await tl.wait(450);
  tl.setVar("fsArrow", "");
}
