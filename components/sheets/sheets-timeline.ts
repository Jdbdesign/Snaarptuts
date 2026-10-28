import type { Timeline } from "@/lib/timeline";
import { showDocToast } from "@/components/docs/doc-toast-timeline";
import { FILE_MENU, type FileSubId } from "./sheets-data";

/*
 * Timeline helpers that drive the Snaarp Sheets File menu and its dialogs. State lives in scene variables (see SheetsApp):
 * the helpers move the cursor, ring and click, and set the variables a click would set.
 */

const ITEM_SUB = new Map<string, FileSubId | undefined>(FILE_MENU.flat().map((i) => [i.id, i.sub]));

/** Move onto an element, ring it, click it and clear the ring. */
export async function pressOn(tl: Timeline, sel: string, opts: { ms?: number; dx?: number; dy?: number; ring?: boolean } = {}) {
  await tl.moveCursorTo(sel, { ms: opts.ms ?? 650, dx: opts.dx, dy: opts.dy });
  if (opts.ring !== false) tl.highlight(sel);
  await tl.wait(150);
  await tl.click(sel);
  tl.clearHighlight();
}

/** Move onto an element and hover it (the grey "hover" look), without clicking. */
export async function hoverOn(tl: Timeline, sel: string, opts: { ms?: number; dx?: number; dy?: number } = {}) {
  await tl.moveCursorTo(sel, { ms: opts.ms ?? 450, dx: opts.dx, dy: opts.dy });
  tl.hover(sel);
}

/** Move to "File" in the menu bar, ring it, click it and open the menu. */
export async function openFileMenu(tl: Timeline, opts: { ms?: number } = {}) {
  await pressOn(tl, "[data-tl=editor-menu-file]", { ms: opts.ms ?? 700 });
  tl.setVar("fileMenu", true);
}

export function closeFileMenu(tl: Timeline) {
  tl.hover(null);
  tl.setVar("fileSub", "");
  tl.setVar("fileMenu", false);
}

/** Move onto a File menu item and hover it. An item with a submenu opens it. */
export async function hoverItem(tl: Timeline, id: string, opts: { ms?: number } = {}) {
  const sel = `[data-tl=file-item-${id}]`;
  await tl.moveCursorTo(sel, { ms: opts.ms ?? 350, dx: -50 });
  tl.hover(sel);
  tl.setVar("fileSub", ITEM_SUB.get(id) ?? "");
}

/** Move onto a submenu row and hover it. */
export async function hoverSub(tl: Timeline, id: string, opts: { ms?: number } = {}) {
  const sel = `[data-tl=file-sub-${id}]`;
  await tl.moveCursorTo(sel, { ms: opts.ms ?? 320, dx: -50 });
  tl.hover(sel);
}

/** Click a File menu item that has no submenu, then close the menu. */
export async function chooseItem(tl: Timeline, id: string, opts: { ms?: number; keepOpen?: boolean } = {}) {
  const sel = `[data-tl=file-item-${id}]`;
  await tl.moveCursorTo(sel, { ms: opts.ms ?? 450, dx: -50 });
  tl.hover(sel);
  tl.highlight(sel);
  await tl.wait(150);
  await tl.click(sel);
  tl.clearHighlight();
  if (!opts.keepOpen) closeFileMenu(tl);
}

/** Open an item's submenu, click one of its rows and close the menu. */
export async function chooseSub(tl: Timeline, itemId: string, subId: string, opts: { ms?: number } = {}) {
  await hoverItem(tl, itemId, { ms: opts.ms ?? 450 });
  await tl.wait(220);
  const sel = `[data-tl=file-sub-${subId}]`;
  await tl.moveCursorTo(sel, { ms: 360, dx: -50 });
  tl.hover(sel);
  tl.highlight(sel);
  await tl.wait(150);
  await tl.click(sel);
  tl.clearHighlight();
  closeFileMenu(tl);
}

export const openDialog = (tl: Timeline, id: string) => tl.setVar("dialog", id);
export const closeDialog = (tl: Timeline) => {
  tl.hover(null);
  tl.setVar("focus", "");
  tl.setVar("dialog", "");
};

/** Click a text box, give it the focus and type into it. `id` is the box's field id (`field-<id>`). */
export async function typeInto(tl: Timeline, id: string, text: string, opts: { moveMs?: number; msPerChar?: number } = {}) {
  const sel = `[data-tl=field-${id}]`;
  await tl.moveCursorTo(sel, { ms: opts.moveMs ?? 550 });
  await tl.click(sel);
  tl.setVar("focus", id);
  await tl.typeText(id, text, { msPerChar: opts.msPerChar ?? 45 });
}

export const toast = (tl: Timeline, text: string, ms = 3200) => showDocToast(tl, text, "success", ms);

/** The green pill in the editor's header ("Opened ...", "Imported ..."). It hides itself after `ms` of active time. */
export function notice(tl: Timeline, text: string, ms = 4200) {
  tl.setVar("notice", text);
  tl.wait(ms)
    .then(() => tl.setVar("notice", ""))
    .catch(() => {}); // cancelled with the step
}

/** Ring an element for a moment (no click). */
export async function ring(tl: Timeline, sel: string, ms = 1200) {
  tl.highlight(sel);
  await tl.wait(ms);
  tl.clearHighlight();
}

/** The quick white fade every step ends with. */
export async function endFade(tl: Timeline, atMs: number, endMs: number) {
  await tl.at(atMs);
  tl.hideCaption();
  tl.setVar("fade", true);
  await tl.at(endMs);
}

/** Start of every Snaarp Sheets step: the cursor, the address and the fade-in of the editor. */
export function begin(tl: Timeline, url: string, cursor: [number, number] = [0.5, 0.42]) {
  tl.placeCursor(cursor[0], cursor[1]);
  tl.setUrl(url);
  tl.setVar("intro", 1);
}

/** Click a tab of the Open / Import dialog (or of the Move / Shortcut picker with `var: "locateTab"`). */
export async function pickTab(tl: Timeline, mode: string, id: string, opts: { ms?: number; var?: string } = {}) {
  await pressOn(tl, `[data-tl=${mode}-tab-${id}]`, { ms: opts.ms ?? 600, ring: false });
  tl.setVar(opts.var ?? "fileTab", id);
}

/** Swap the whole workbook behind a quick white fade (a new or opened file). */
export async function swapWorkbook(tl: Timeline, title: string, sheets: unknown, url: string) {
  tl.setVar("fade", true);
  await tl.wait(330);
  tl.setVar("title", title);
  tl.setVar("sheets", sheets);
  tl.setVar("activeSheet", (sheets as { id: string }[])[0].id);
  tl.setUrl(url);
  tl.setVar("fade", false);
  await tl.wait(450);
}
