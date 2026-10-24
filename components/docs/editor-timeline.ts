import type { Timeline } from "@/lib/timeline";
import { editItemDisabled, type EditItemId } from "./edit-menu-data";
import {
  clearSelection,
  copy,
  createEditor,
  cut,
  deleteSelection,
  paste,
  patchFind,
  placeCaret,
  redo,
  replaceAll,
  replaceCurrent,
  selectAll,
  selectBlock,
  selectRange,
  stepMatch,
  undo,
  type EditorState,
} from "./editor-state";
import { BLOCK_IDS, SAMPLE_BLOCKS } from "./sample-document";

/*
 * Timeline helpers that drive the Snaarp Doc editor of steps 10 to 13 (EditorStage with `startDocument`).
 * The editor state lives in the scene variable `editor` (see editor-state.ts); the Edit menu in `editMenu`;
 * the header status in `saveStatus`. Every helper waits with the timeline's own clock, so Pause freezes it.
 */

// ---- start states ----------------------------------------------------------------

/** The sample document, nothing selected (start of steps 10, 11 and 13). */
export const SAMPLE_EDITOR: EditorState = createEditor(SAMPLE_BLOCKS);

/** The sample document with the copied paragraph pasted under the last one (end of step 11, start of step 12). */
export const COPIED_EDITOR: EditorState = (() => {
  const last = SAMPLE_BLOCKS.length - 1;
  let s = selectBlock(SAMPLE_EDITOR, SAMPLE_BLOCKS.findIndex((b) => b.id === BLOCK_IDS.copied), false);
  s = copy(s);
  s = placeCaret(s, { block: last, offset: SAMPLE_BLOCKS[last].text.length });
  return { ...paste(s), flash: null };
})();

// ---- state ---------------------------------------------------------------------------

const KEY = "editor";

export const getEditor = (tl: Timeline) => tl.getVar<EditorState>(KEY, SAMPLE_EDITOR);

export function setEditor(tl: Timeline, next: EditorState | ((s: EditorState) => EditorState)) {
  tl.setVar(KEY, typeof next === "function" ? next(getEditor(tl)) : next);
}

/** Call first in every script: the editor state a step starts from. */
export function initEditor(tl: Timeline, start: EditorState) {
  tl.setVar(KEY, start);
  tl.setVar("saveStatus", "saved");
  tl.setVar("editMenu", false);
}

const blockIndex = (tl: Timeline, id: string) => {
  const i = getEditor(tl).blocks.findIndex((b) => b.id === id);
  if (i < 0) throw new Error(`Editor: no block "${id}"`);
  return i;
};

// ---- header status: "All changes saved" <-> "Unsaved changes" ----------------------------

/** Show "Unsaved changes", then "All changes saved" again after `ms` of active time. */
export function markEdited(tl: Timeline, ms = 1500) {
  const tick = tl.getVar("saveTick", 0) + 1;
  tl.setVar("saveTick", tick);
  tl.setVar("saveStatus", "unsaved");
  tl.wait(ms)
    .then(() => {
      if (tl.getVar("saveTick", 0) === tick) tl.setVar("saveStatus", "saved");
    })
    .catch(() => {}); // cancelled with the step
}

function markSaved(tl: Timeline) {
  tl.setVar("saveTick", tl.getVar("saveTick", 0) + 1);
  tl.setVar("saveStatus", "saved");
}

/** Clear the soft highlight of a pasted paragraph after `ms`. */
function clearFlashLater(tl: Timeline, ms = 1600) {
  const id = getEditor(tl).flash;
  if (!id) return;
  tl.wait(ms)
    .then(() => setEditor(tl, (s) => (s.flash === id ? { ...s, flash: null } : s)))
    .catch(() => {});
}

// ---- selection and caret ----------------------------------------------------------------

const ease = (t: number) => (t < 0.5 ? 4 * t * t * t : 1 - Math.pow(-2 * t + 2, 3) / 2);

/**
 * Select a whole paragraph with the mouse: the cursor goes to the start of its text, presses, and drags to the end
 * while the blue highlight grows with it. The floating selection toolbar appears with the selection.
 */
export async function dragSelectBlock(tl: Timeline, blockId: string, opts: { approachMs?: number; dragMs?: number } = {}) {
  const { approachMs = 800, dragMs = 1300 } = opts;
  const block = blockIndex(tl, blockId);
  const len = getEditor(tl).blocks[block].text.length;
  const start = `[data-tl=doc-start-${blockId}]`;
  const end = `[data-tl=doc-end-${blockId}]`;

  await tl.moveCursorTo(start, { ms: approachMs });
  await tl.click(start);
  setEditor(tl, (s) => selectRange(s, { block, offset: 0 }, { block, offset: 0 }, true));

  const t0 = tl.elapsed;
  let done = false;
  tl.moveCursorTo(end, { ms: dragMs, dx: 4 }).then(
    () => (done = true),
    () => (done = true), // cancelled with the step; the next wait() rejects too
  );
  while (!done) {
    await tl.wait(40);
    const p = ease(Math.min(1, (tl.elapsed - t0) / dragMs));
    setEditor(tl, (s) => selectRange(s, { block, offset: 0 }, { block, offset: Math.round(len * p) }, true));
  }
  setEditor(tl, (s) => selectRange(s, { block, offset: 0 }, { block, offset: len }, true));
}

/** Click at the end of a paragraph's text: the selection clears and the caret blinks there. */
export async function clickEndOfBlock(tl: Timeline, blockId: string, opts: { ms?: number } = {}) {
  const block = blockIndex(tl, blockId);
  const sel = `[data-tl=doc-end-${blockId}]`;
  await tl.moveCursorTo(sel, { ms: opts.ms ?? 900, dx: 3 });
  await tl.click(sel);
  setEditor(tl, (s) => placeCaret(s, { block, offset: s.blocks[block].text.length }));
}

export const clearEditorSelection = (tl: Timeline) => setEditor(tl, clearSelection);

// ---- Edit menu -------------------------------------------------------------------------

export const openEditMenu = (tl: Timeline) => tl.setVar("editMenu", true);

export function closeEditMenu(tl: Timeline) {
  tl.hover(null);
  tl.setVar("editMenu", false);
}

const editItem = (id: EditItemId) => `[data-tl=edit-item-${id}]`;

/** Move onto an Edit menu item and hover it. */
export async function hoverEditMenuItem(tl: Timeline, id: EditItemId, opts: { ms?: number } = {}) {
  await tl.moveCursorTo(editItem(id), { ms: opts.ms ?? 300, dx: -30 });
  tl.hover(editItem(id));
}

/** Move to "Edit" in the editor's menu row, ring it, click it and open the menu. */
export async function clickEditMenu(tl: Timeline, opts: { ms?: number } = {}) {
  const sel = "[data-tl=editor-menu-edit]";
  await tl.moveCursorTo(sel, { ms: opts.ms ?? 700 });
  tl.highlight(sel);
  await tl.wait(150);
  await tl.click(sel);
  tl.clearHighlight();
  openEditMenu(tl);
}

/** What an Edit menu item does to the editor. Items that are greyed out do nothing. */
function runEditAction(tl: Timeline, id: EditItemId) {
  switch (id) {
    case "undo":
      setEditor(tl, undo);
      markSaved(tl); // the document is back to what was saved
      break;
    case "redo":
      setEditor(tl, redo);
      markEdited(tl);
      break;
    case "copy":
      setEditor(tl, copy);
      break;
    case "cut":
      setEditor(tl, cut);
      markEdited(tl);
      break;
    case "paste":
    case "paste-plain": // the sample text has no formatting, so both paste the same text
      setEditor(tl, paste);
      markEdited(tl);
      clearFlashLater(tl);
      break;
    case "select-all":
      setEditor(tl, selectAll);
      break;
    case "delete":
      setEditor(tl, deleteSelection);
      markEdited(tl);
      break;
    case "find":
      setEditor(tl, (s) => patchFind(s, { open: true, focus: "find" }));
      break;
  }
}

/** Move onto an Edit menu item, ring it, click it, close the menu and run the item's action. */
export async function chooseEditMenuItem(tl: Timeline, id: EditItemId, opts: { ms?: number } = {}) {
  if (editItemDisabled(id, getEditor(tl))) throw new Error(`Edit menu: "${id}" is greyed out in this state`);
  const sel = editItem(id);
  await tl.moveCursorTo(sel, { ms: opts.ms ?? 500, dx: -30 });
  tl.hover(sel);
  tl.highlight(sel);
  await tl.wait(150);
  await tl.click(sel);
  tl.clearHighlight();
  closeEditMenu(tl);
  runEditAction(tl, id);
}

// ---- Find and replace ---------------------------------------------------------------------

export const closeFindPanel = (tl: Timeline) => setEditor(tl, (s) => patchFind(s, { open: false, focus: null }));

/** Glide to a panel element, ring it and click it. */
export async function clickPanel(tl: Timeline, sel: string, opts: { ms?: number } = {}) {
  await tl.moveCursorTo(sel, { ms: opts.ms ?? 600 });
  tl.highlight(sel);
  await tl.wait(150);
  await tl.click(sel);
  tl.clearHighlight();
}

/** Click one of the two inputs (it gets the dark border and the caret), then type into it live. */
export async function typeInPanel(tl: Timeline, field: "find" | "replace", text: string, opts: { msPerChar?: number; moveMs?: number } = {}) {
  await clickPanel(tl, `[data-tl=${field}-input]`, { ms: opts.moveMs ?? 600 });
  setEditor(tl, (s) => patchFind(s, { focus: field }));
  for (let n = 1; n <= text.length; n++) {
    await tl.wait(opts.msPerChar ?? 140);
    const part = text.slice(0, n);
    setEditor(tl, (s) => patchFind(s, field === "find" ? { query: part, current: 0 } : { replacement: part }));
  }
}

export async function toggleMatchCase(tl: Timeline) {
  await clickPanel(tl, "[data-tl=find-match-case]");
  setEditor(tl, (s) => patchFind(s, { matchCase: !s.find.matchCase, current: 0, focus: null }));
}

/** Click Next or Previous: the green highlight moves to the next match, and the page scrolls to it if needed. */
export async function clickStep(tl: Timeline, dir: 1 | -1, opts: { ms?: number } = {}) {
  await clickPanel(tl, `[data-tl=find-btn-${dir === 1 ? "next" : "previous"}]`, { ms: opts.ms ?? 500 });
  setEditor(tl, (s) => stepMatch(s, dir));
  await tl.wait(60);
  await tl.scrollPanelTo("[data-tl=editor-canvas]", "[data-tl=doc-match-current]", 400);
}

export async function clickReplaceAll(tl: Timeline) {
  await clickPanel(tl, "[data-tl=find-btn-replace-all]");
  setEditor(tl, (s) => ({ ...replaceAll(s), caret: null, sel: null }));
  markEdited(tl);
}

export async function clickReplace(tl: Timeline) {
  await clickPanel(tl, "[data-tl=find-btn-replace]");
  setEditor(tl, replaceCurrent);
  markEdited(tl);
}

export async function clickClosePanel(tl: Timeline) {
  await clickPanel(tl, "[data-tl=find-close]", { ms: 700 });
  closeFindPanel(tl);
}
