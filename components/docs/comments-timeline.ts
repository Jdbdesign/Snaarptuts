import type { Timeline } from "@/lib/timeline";
import { SAMPLE_COMMENTS } from "./comments-data";
import { EMPTY_COMMENTS, type CommentsState, type FilterId } from "./comments-state";
import { clickPanel, getEditor, markEdited, setEditor } from "./editor-timeline";

/*
 * Timeline helpers that drive the Comments panel (Snaarp Doc steps 15 to 18). The state lives in the scene variable
 * `comments` (see comments-state.ts); the panel is open while `commentsOpen` is true. Call initComments first in every
 * script that shows the panel. Every helper waits with the timeline's own clock, so Pause freezes it.
 */

// ---- start states ----------------------------------------------------------------

/** The panel after step 15: the first comment, no highlight in the text. */
export const ONE_THREAD: CommentsState = { ...EMPTY_COMMENTS, threads: [{ id: "t1", text: SAMPLE_COMMENTS.first }] };

/** The panel after step 16: the second comment (made on selected text) on top of the first. */
export const TWO_THREADS: CommentsState = {
  ...EMPTY_COMMENTS,
  threads: [{ id: "t2", text: SAMPLE_COMMENTS.second, anchorId: "t2" }, ...ONE_THREAD.threads],
};

// ---- state -----------------------------------------------------------------------

const KEY = "comments";

export const getComments = (tl: Timeline) => tl.getVar<CommentsState>(KEY, EMPTY_COMMENTS);

export function setComments(tl: Timeline, next: CommentsState | ((s: CommentsState) => CommentsState)) {
  tl.setVar(KEY, typeof next === "function" ? next(getComments(tl)) : next);
}

/** Call first in every script that shows the panel: the comments it starts with, and whether it is open. */
export function initComments(tl: Timeline, state: CommentsState, open: boolean) {
  tl.setVar(KEY, state);
  tl.setVar("commentsOpen", open);
}

export const closeCommentsPanel = (tl: Timeline) => {
  setComments(tl, (s) => ({ ...s, menuFor: null, filterOpen: false, replyFocus: null }));
  tl.setVar("commentsOpen", false);
};

// ---- writing a comment ---------------------------------------------------------------

/** Click the blue "Add comment" button of the empty panel: the composer card appears with the input focused. */
export async function clickAddComment(tl: Timeline) {
  await clickPanel(tl, "[data-tl=comments-add]", { ms: 800 });
  setComments(tl, (s) => ({ ...s, composer: { text: "" } }));
}

/** Click the comment icon of the floating selection toolbar: a composer card starts a comment on the selected text. */
export async function clickSelectionComment(tl: Timeline) {
  await clickPanel(tl, "[data-tl=selection-comment]", { ms: 800 });
  const sel = getEditor(tl).sel;
  if (!sel) throw new Error("Comments: no selected text to comment on");
  setComments(tl, (s) => ({
    ...s,
    composer: { text: "", anchor: { block: sel.start.block, from: sel.start.offset, to: sel.end.offset } },
  }));
}

/** Type into the composer, one character at a time. The Comment button turns solid blue with the first character. */
export async function typeComment(tl: Timeline, text: string, opts: { msPerChar?: number } = {}) {
  for (let n = 1; n <= text.length; n++) {
    await tl.wait(opts.msPerChar ?? 100);
    const part = text.slice(0, n);
    setComments(tl, (s) => (s.composer ? { ...s, composer: { ...s.composer, text: part } } : s));
  }
}

/** Click Comment: the card becomes a thread at the top of the list. Text-anchored comments also highlight the text. */
export async function clickSubmitComment(tl: Timeline) {
  await clickPanel(tl, "[data-tl=comments-composer-submit]", { ms: 700 });
  const s = getComments(tl);
  const c = s.composer;
  if (!c) return;
  const id = `t${s.threads.length + 1}`;
  setComments(tl, { ...s, composer: null, threads: [{ id, text: c.text, anchorId: c.anchor ? id : undefined }, ...s.threads] });
  if (c.anchor) {
    const { block, from, to } = c.anchor;
    setEditor(tl, (e) => ({ ...e, anchors: [...e.anchors, { id, block, from, to }], sel: null, caret: null }));
    markEdited(tl);
  }
}

// ---- threads ---------------------------------------------------------------------------

/** Click a thread's reply input: blue border and a pale send icon. */
export async function clickReply(tl: Timeline, threadId: string) {
  await clickPanel(tl, `[data-tl=thread-reply-${threadId}]`, { ms: 800 });
  setComments(tl, (s) => ({ ...s, replyFocus: threadId }));
}

/** Click a thread's three dots: the small card with Resolve and Delete opens. */
export async function openThreadMenu(tl: Timeline, threadId: string) {
  await clickPanel(tl, `[data-tl=thread-menu-${threadId}]`, { ms: 900 });
  setComments(tl, (s) => ({ ...s, menuFor: threadId }));
}

/** Move onto Resolve or Delete and hover it (no click). */
export async function hoverThreadMenuItem(tl: Timeline, item: "resolve" | "delete", opts: { ms?: number } = {}) {
  const sel = `[data-tl=thread-menu-item-${item}]`;
  await tl.moveCursorTo(sel, { ms: opts.ms ?? 450, dx: -10 });
  tl.hover(sel);
}

/** Click an empty part of the panel: an open card closes. */
export async function clickEmptyPanel(tl: Timeline, opts: { ms?: number } = {}) {
  await tl.moveCursorTo("[data-tl=comments-body]", { ms: opts.ms ?? 600, dy: 110 });
  tl.hover(null);
  await tl.click("[data-tl=comments-body]");
  setComments(tl, (s) => ({ ...s, menuFor: null, filterOpen: false }));
}

// ---- filter ----------------------------------------------------------------------------

export async function openFilter(tl: Timeline) {
  await clickPanel(tl, "[data-tl=comments-filter]", { ms: 800 });
  setComments(tl, (s) => ({ ...s, filterOpen: true }));
}

export async function hoverFilterItem(tl: Timeline, id: FilterId, opts: { ms?: number } = {}) {
  const sel = `[data-tl=comments-filter-${id}]`;
  await tl.moveCursorTo(sel, { ms: opts.ms ?? 400, dx: -8 });
  tl.hover(sel);
}

/** Click a filter item: it gets the check, the dropdown closes. */
export async function chooseFilter(tl: Timeline, id: FilterId) {
  await hoverFilterItem(tl, id, { ms: 400 });
  tl.highlight(`[data-tl=comments-filter-${id}]`);
  await tl.wait(150);
  await tl.click(`[data-tl=comments-filter-${id}]`);
  tl.clearHighlight();
  tl.hover(null);
  setComments(tl, (s) => ({ ...s, filter: id, filterOpen: false }));
}

// ---- closing -----------------------------------------------------------------------------

/** Click the X: the panel slides out and the page centres again. */
export async function clickClosePanelX(tl: Timeline) {
  await clickPanel(tl, "[data-tl=comments-close]", { ms: 800 });
  closeCommentsPanel(tl);
}
