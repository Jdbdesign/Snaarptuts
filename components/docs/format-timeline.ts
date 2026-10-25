import type { Timeline } from "@/lib/timeline";
import { getEditor, markEdited, setEditor } from "./editor-timeline";
import { placeCaret } from "./editor-state";
import { ALIGN_OF, FORMAT_MENU, FORMAT_OF, STYLE_OF, type FormatItemId, type FormatSubItemId } from "./format-menu-data";
import type { FormatSub } from "./FormatMenu";
import { changeIndent, selectText, setAlign, setHeading, toggleFormat } from "./format-state";

/*
 * Timeline helpers that drive the Format menu and the formatting it does (Snaarp Doc steps 31 to 34). The scene
 * variables are `formatMenu` (menu open) and `formatSub` ("" | "text" | "paragraph" | "align" | "bullets": which
 * submenu is open); EditorStage reads them. Every helper waits with the timeline's own clock, so Pause freezes it.
 */

const item = (id: FormatItemId) => `[data-tl=format-item-${id}]`;
const subItem = (id: FormatSubItemId) => `[data-tl=format-sub-${id}]`;

const SUBMENU_OF = new Map(FORMAT_MENU.flat().map((it) => [it.id, it.submenu ?? ""] as const));

export const openFormatMenu = (tl: Timeline) => tl.setVar("formatMenu", true);

export function closeFormatMenu(tl: Timeline) {
  tl.hover(null);
  tl.setVar("formatSub", "");
  tl.setVar("formatMenu", false);
}

/** Call first in every script: the menu starts closed (a replay must not keep the last state). */
export function initFormatMenu(tl: Timeline) {
  tl.setVar("formatMenu", false);
  tl.setVar("formatSub", "");
}

/** Move to "Format" in the editor's menu row, ring it, click it and open the menu. */
export async function clickFormatMenu(tl: Timeline, opts: { ms?: number } = {}) {
  const sel = "[data-tl=editor-menu-format]";
  await tl.moveCursorTo(sel, { ms: opts.ms ?? 700 });
  tl.highlight(sel);
  await tl.wait(150);
  await tl.click(sel);
  tl.clearHighlight();
  openFormatMenu(tl);
}

/** Move onto a Format menu item and hover it. Hovering a row with a submenu opens it. Greyed-out items stay greyed. */
export async function hoverFormatItem(tl: Timeline, id: FormatItemId, opts: { ms?: number } = {}) {
  await tl.moveCursorTo(item(id), { ms: opts.ms ?? 450, dx: -30 });
  tl.hover(item(id));
  tl.setVar("formatSub", (SUBMENU_OF.get(id) ?? "") satisfies FormatSub);
}

/** Move onto a row of the open submenu and hover it. */
export async function hoverFormatSub(tl: Timeline, id: FormatSubItemId, opts: { ms?: number } = {}) {
  await tl.moveCursorTo(subItem(id), { ms: opts.ms ?? 350, dx: -20 });
  tl.hover(subItem(id));
}

/** What a submenu row does to the editor. Bullets & numbering rows do nothing yet (wired in a later round). */
function runSubAction(tl: Timeline, id: FormatSubItemId) {
  const format = FORMAT_OF[id];
  const level = STYLE_OF[id];
  const align = ALIGN_OF[id];
  if (format) setEditor(tl, (s) => toggleFormat(s, format));
  else if (level !== undefined) setEditor(tl, (s) => setHeading(s, level));
  else if (align) setEditor(tl, (s) => setAlign(s, align));
  else if (id === "indent-more") setEditor(tl, (s) => changeIndent(s, 1));
  else if (id === "indent-less") setEditor(tl, (s) => changeIndent(s, -1));
  else return;
  markEdited(tl);
}

/**
 * With the Format menu open: hover the parent row (its submenu opens), move onto the submenu row, ring it, click it,
 * close the menu and run the action.
 */
export async function chooseFormatSub(tl: Timeline, parent: FormatItemId, id: FormatSubItemId, opts: { ms?: number; parentMs?: number } = {}) {
  await hoverFormatItem(tl, parent, { ms: opts.parentMs ?? 450 });
  await tl.wait(120);
  await hoverFormatSub(tl, id, { ms: opts.ms ?? 450 });
  tl.highlight(subItem(id));
  await tl.wait(150);
  await tl.click(subItem(id));
  tl.clearHighlight();
  closeFormatMenu(tl);
  runSubAction(tl, id);
}

// ---- cursor and selection inside the text ---------------------------------------------------------

const ease = (t: number) => (t < 0.5 ? 4 * t * t * t : 1 - Math.pow(-2 * t + 2, 3) / 2);

/** Put an invisible cursor target at a text offset (so the cursor can point into the middle of a paragraph). */
async function addLandmark(tl: Timeline, id: string, block: number, offset: number) {
  setEditor(tl, (s) => ({ ...s, landmarks: [...s.landmarks.filter((l) => l.id !== id), { id, block, offset }] }));
  await tl.wait(60); // one frame, so the target is on the page
}

const blockIndex = (tl: Timeline, blockId: string) => {
  const i = getEditor(tl).blocks.findIndex((b) => b.id === blockId);
  if (i < 0) throw new Error(`Editor: no block "${blockId}"`);
  return i;
};

/** Where `context` sits in a block, as { from, to } offsets of the part [start, end) of it. */
export function locateText(tl: Timeline, blockId: string, target: { context: string; start: number; end: number }) {
  const block = getEditor(tl).blocks[blockIndex(tl, blockId)];
  const at = block.text.indexOf(target.context);
  if (at < 0) throw new Error(`Editor: "${target.context}" is not in block "${blockId}"`);
  return { from: at + target.start, to: at + target.end };
}

/**
 * Select a word (or a few letters) of a paragraph with the mouse: the cursor goes to the start, presses, and drags to
 * the end while the blue highlight grows with it. The floating selection toolbar appears over the word.
 */
export async function dragSelectText(
  tl: Timeline,
  blockId: string,
  target: { context: string; start: number; end: number },
  opts: { approachMs?: number; dragMs?: number } = {},
) {
  const { approachMs = 650, dragMs = 800 } = opts;
  const block = blockIndex(tl, blockId);
  const { from, to } = locateText(tl, blockId, target);
  await addLandmark(tl, "sel-from", block, from);
  await addLandmark(tl, "sel-to", block, to);
  const start = "[data-tl=doc-at-sel-from]";
  const end = "[data-tl=doc-at-sel-to]";

  await tl.moveCursorTo(start, { ms: approachMs });
  await tl.click(start);
  setEditor(tl, (s) => selectText(s, block, from, from));

  const t0 = tl.elapsed;
  let done = false;
  tl.moveCursorTo(end, { ms: dragMs, dx: 1 }).then(
    () => (done = true),
    () => (done = true), // cancelled with the step; the next wait() rejects too
  );
  while (!done) {
    await tl.wait(40);
    const p = ease(Math.min(1, (tl.elapsed - t0) / dragMs));
    setEditor(tl, (s) => selectText(s, block, from, from + Math.round((to - from) * p)));
  }
  setEditor(tl, (s) => selectText(s, block, from, to));
}

/** Click inside a paragraph, `offset` characters from its start: the selection clears and the caret blinks there. */
export async function clickInBlock(tl: Timeline, blockId: string, offset: number, opts: { ms?: number } = {}) {
  const block = blockIndex(tl, blockId);
  await addLandmark(tl, `click-${blockId}`, block, offset);
  const sel = `[data-tl=doc-at-click-${blockId}]`;
  await tl.moveCursorTo(sel, { ms: opts.ms ?? 800 });
  await tl.click(sel);
  setEditor(tl, (s) => placeCaret(s, { block, offset }));
}
