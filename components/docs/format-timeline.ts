import type { Timeline } from "@/lib/timeline";
import { getEditor, markEdited, setEditor } from "./editor-timeline";
import { placeCaret, selectRange } from "./editor-state";
import { ALIGN_OF, FORMAT_MENU, FORMAT_OF, STYLE_OF, type FormatItemId, type FormatSubItemId, type Orientation } from "./format-menu-data";
import type { FormatSub } from "./FormatMenu";
import { insertHeaderFooter, openInsertDialog, openPageNumbers } from "./insert-timeline";
import { changeIndent, clearFormats, selectText, setAlign, setHeading, setList, toggleFormat } from "./format-state";

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

/** What a submenu row does to the editor. */
function runSubAction(tl: Timeline, id: FormatSubItemId) {
  const format = FORMAT_OF[id];
  const level = STYLE_OF[id];
  const align = ALIGN_OF[id];
  if (format) setEditor(tl, (s) => toggleFormat(s, format));
  else if (level !== undefined) setEditor(tl, (s) => setHeading(s, level));
  else if (align) setEditor(tl, (s) => setAlign(s, align));
  else if (id === "indent-more") setEditor(tl, (s) => changeIndent(s, 1));
  else if (id === "indent-less") setEditor(tl, (s) => changeIndent(s, -1));
  else if (id === "bullet-list") setEditor(tl, (s) => setList(s, "bullet"));
  else if (id === "numbered-list") setEditor(tl, (s) => setList(s, "number"));
  else if (id === "checklist") setEditor(tl, (s) => setList(s, "check"));
  else return;
  markEdited(tl);
}

/**
 * With the Format menu open: hover the parent row (its submenu opens), move onto the submenu row, ring it, click it,
 * close the menu and run the action.
 */
export async function chooseFormatSub(
  tl: Timeline,
  parent: FormatItemId,
  id: FormatSubItemId,
  opts: { ms?: number; parentMs?: number; /** The submenu is already open and hovered: go straight to its row. */ stay?: boolean } = {},
) {
  if (!opts.stay) {
    await hoverFormatItem(tl, parent, { ms: opts.parentMs ?? 450 });
    await tl.wait(120);
  }
  await hoverFormatSub(tl, id, { ms: opts.ms ?? 450 });
  tl.highlight(subItem(id));
  await tl.wait(150);
  await tl.click(subItem(id));
  tl.clearHighlight();
  closeFormatMenu(tl);
  runSubAction(tl, id);
}

// ---- Page orientation --------------------------------------------------------------------------------------

/** Format > Page orientation: the dialog opens with the page's current orientation selected. */
export function openPageOrientation(tl: Timeline) {
  tl.setVar("poChoice", tl.getVar<Orientation>("pageOrientation", "portrait"));
  openInsertDialog(tl, "orientation");
}

/** Click one of the two radio options: glide to it, click it, and the radio switches. */
export async function chooseOrientation(tl: Timeline, value: Orientation, opts: { ms?: number } = {}) {
  const sel = `[data-tl=po-${value}]`;
  await tl.moveCursorTo(sel, { ms: opts.ms ?? 700, dx: -12 });
  await tl.click(sel);
  tl.setVar("poChoice", value);
}

/** OK: glide to the button, ring it, click it; the dialog closes and the page takes the chosen orientation. */
export async function clickOrientationOk(tl: Timeline, opts: { ms?: number } = {}) {
  const sel = "[data-tl=po-ok]";
  await tl.moveCursorTo(sel, { ms: opts.ms ?? 700 });
  tl.highlight(sel);
  await tl.wait(150);
  await tl.click(sel);
  tl.clearHighlight();
  tl.setVar("pageOrientation", tl.getVar<Orientation>("poChoice", "portrait"));
  tl.setVar("insertDialog", "");
}

/** What a top-level Format menu item does (the ones without a submenu). Columns is greyed out and does nothing. */
function runItemAction(tl: Timeline, id: FormatItemId) {
  if (id === "headers") insertHeaderFooter(tl);
  if (id === "page-numbers") openPageNumbers(tl);
  if (id === "orientation") openPageOrientation(tl);
  if (id === "clear") {
    setEditor(tl, clearFormats);
    markEdited(tl);
  }
}

/** With the Format menu open: move onto an item that has no submenu, ring it, click it, close the menu and run it. */
export async function chooseFormatItem(tl: Timeline, id: FormatItemId, opts: { ms?: number } = {}) {
  if (id === "columns") throw new Error('Format menu: "columns" is greyed out');
  await hoverFormatItem(tl, id, { ms: opts.ms ?? 450 });
  tl.highlight(item(id));
  await tl.wait(150);
  await tl.click(item(id));
  tl.clearHighlight();
  closeFormatMenu(tl);
  runItemAction(tl, id);
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

/**
 * Select whole paragraphs with the mouse: the cursor goes to the start of the first one, presses, and drags to the end of
 * the last one while the blue highlight grows over the text in between. `soft`: a light see-through blue (colours show).
 */
export async function dragSelectBlocks(tl: Timeline, blockIds: string[], opts: { approachMs?: number; dragMs?: number; soft?: boolean } = {}) {
  const { approachMs = 750, dragMs = 1500, soft = false } = opts;
  const first = blockIndex(tl, blockIds[0]);
  const last = blockIndex(tl, blockIds[blockIds.length - 1]);
  const lens = getEditor(tl).blocks.slice(first, last + 1).map((b) => b.text.length);
  const total = lens.reduce((a, b) => a + b, 0);
  const start = `[data-tl=doc-start-${blockIds[0]}]`;
  const end = `[data-tl=doc-end-${blockIds[blockIds.length - 1]}]`;
  const show = (chars: number) => {
    // Walk the characters across the paragraphs to find where the drag has got to.
    let left = chars;
    let block = first;
    while (block < last && left > lens[block - first]) {
      left -= lens[block - first];
      block++;
    }
    setEditor(tl, (s) => ({
      ...selectRange(s, { block: first, offset: 0 }, { block, offset: Math.min(left, lens[block - first]) }, true),
      sel: { start: { block: first, offset: 0 }, end: { block, offset: Math.min(left, lens[block - first]) }, toolbar: true, soft },
    }));
  };

  await tl.moveCursorTo(start, { ms: approachMs });
  await tl.click(start);
  show(0);

  const t0 = tl.elapsed;
  let done = false;
  tl.moveCursorTo(end, { ms: dragMs, dx: 4 }).then(
    () => (done = true),
    () => (done = true), // cancelled with the step; the next wait() rejects too
  );
  while (!done) {
    await tl.wait(40);
    show(Math.round(total * ease(Math.min(1, (tl.elapsed - t0) / dragMs))));
  }
  show(total);
}
