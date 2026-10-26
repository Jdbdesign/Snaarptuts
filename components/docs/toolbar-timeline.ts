import type { Timeline } from "@/lib/timeline";
import { canRedo, redo, undo, type EditorState } from "./editor-state";
import { getEditor, markEdited, setEditor } from "./editor-timeline";

/*
 * Timeline helpers for the toolbar and header buttons (Snaarp Doc steps 45 to 64). The tooltip is the scene variable `tip`
 * (the hook name of the button), the open dropdown card is `toolMenu` (see ToolbarLayer.tsx). Every helper waits with the
 * timeline's own clock, so Pause freezes it.
 */

export const tool = (id: string) => `[data-tl=tool-${id}]`;

/** Call first in every script of steps 45 to 64: no tooltip, no card, the toolbar's own state back to its start. */
export function initToolbar(tl: Timeline) {
  tl.setVar("tip", "");
  tl.setVar("toolMenu", "");
  tl.setVar("zoomPct", 100);
  tl.setVar("lastColor", null);
  tl.setVar("lastHighlight", null);
  tl.setVar("sizeBox", null);
  tl.setVar("paint", null);
  tl.setVar("tablePick", null);
  tl.setVar("field:meet-code", "");
  tl.setVar("meetFocus", false);
}

/** Narrow screens: the toolbar scrolls sideways, so bring the tool into view before the cursor goes to it. */
function reveal(sel: string) {
  const root = document.querySelector("[data-scroller]");
  const bar = root?.querySelector<HTMLElement>("[data-tl=editor-toolbar]");
  const el = root?.querySelector<HTMLElement>(sel);
  if (!bar || !el || !bar.contains(el) || bar.scrollWidth <= bar.clientWidth) return;
  const b = bar.getBoundingClientRect();
  const e = el.getBoundingClientRect();
  if (e.left > b.left + 8 && e.right < b.right - 8) return;
  const k = b.width / bar.clientWidth; // on-screen px per scroll unit (scene scale and zoom)
  bar.scrollLeft += (e.left + e.width / 2 - (b.left + b.width / 2)) / k;
}

type Point = { ms?: number; dx?: number; dy?: number };

/** Move onto a button (hook name, e.g. "tool-print", "header-meet") and show its tooltip for `tipMs`. */
export async function pointAt(tl: Timeline, hook: string, opts: Point & { tipMs?: number } = {}) {
  const sel = `[data-tl=${hook}]`;
  reveal(sel);
  await tl.moveCursorTo(sel, { ms: opts.ms ?? 700, dx: opts.dx, dy: opts.dy });
  tl.hover(sel);
  tl.setVar("tip", hook);
  await tl.wait(opts.tipMs ?? 650);
}

export const pointAtTool = (tl: Timeline, id: string, opts: Point & { tipMs?: number } = {}) => pointAt(tl, `tool-${id}`, opts);

/** Ring the button, click it, and drop the tooltip. */
export async function pressButton(tl: Timeline, hook: string) {
  const sel = `[data-tl=${hook}]`;
  tl.highlight(sel);
  await tl.wait(150);
  await tl.click(sel);
  tl.clearHighlight();
  tl.hover(null);
  tl.setVar("tip", "");
}

/** Move onto a toolbar tool, show its tooltip, click it, and run what the tool does. */
export async function clickTool(tl: Timeline, id: string, run?: () => void, opts: Point & { tipMs?: number } = {}) {
  await pointAtTool(tl, id, opts);
  await pressButton(tl, `tool-${id}`);
  run?.();
}

/** Open a dropdown card from the button: move onto it, click it, the card fades in under it. */
export async function openMenu(tl: Timeline, menu: string, hook: string, opts: Point & { tipMs?: number } = {}) {
  await pointAt(tl, hook, { tipMs: opts.tipMs ?? 450, ...opts });
  await pressButton(tl, hook);
  tl.setVar("toolMenu", menu);
  await tl.wait(350);
}

export function closeMenu(tl: Timeline) {
  tl.hover(null);
  tl.setVar("toolMenu", "");
}

/** In an open card: glide to a row, hover it, ring it, click it, close the card and run what the row does. */
export async function chooseRow(tl: Timeline, rowHook: string, run?: () => void, opts: Point & { holdMs?: number } = {}) {
  const sel = `[data-tl=${rowHook}]`;
  await tl.moveCursorTo(sel, { ms: opts.ms ?? 500, dx: opts.dx ?? -6, dy: opts.dy });
  tl.hover(sel);
  tl.highlight(sel);
  await tl.wait(opts.holdMs ?? 380);
  await tl.click(sel);
  tl.clearHighlight();
  closeMenu(tl);
  run?.();
}

/** What a tool does to the editor state, plus the "Unsaved changes" blink in the header. */
export function edit(tl: Timeline, change: (s: EditorState) => EditorState) {
  setEditor(tl, change);
  markEdited(tl);
}

// ---- undo and redo (step 45) ---------------------------------------------------------------------------------

export function runUndo(tl: Timeline) {
  setEditor(tl, undo);
  markEdited(tl);
}

export function runRedo(tl: Timeline) {
  if (!canRedo(getEditor(tl))) return;
  setEditor(tl, redo);
  markEdited(tl);
}

/**
 * Type a new line of text under a block, one character at a time, and remember the document without it for Undo:
 * the typed line is one undo step. Returns the id of the new line.
 */
export async function typeNewLine(tl: Timeline, afterId: string, text: string, opts: { msPerChar?: number } = {}): Promise<string> {
  const before = getEditor(tl);
  const at = before.blocks.findIndex((b) => b.id === afterId);
  if (at < 0) throw new Error(`Editor: no block "${afterId}"`);
  const id = `typed-${before.nextId}`;
  setEditor(tl, (s) => ({
    ...s,
    blocks: [...s.blocks.slice(0, at + 1), { id, kind: "p" as const, text: "" }, ...s.blocks.slice(at + 1)],
    nextId: s.nextId + 1,
    sel: null,
    caret: { block: at + 1, offset: 0 },
  }));
  for (let n = 1; n <= text.length; n++) {
    await tl.wait(opts.msPerChar ?? 70);
    setEditor(tl, (s) => ({
      ...s,
      blocks: s.blocks.map((b) => (b.id === id ? { ...b, text: text.slice(0, n) } : b)),
      caret: { block: at + 1, offset: n },
    }));
  }
  // The finished line is one history step: Undo goes back to the document as it was before the line.
  setEditor(tl, (s) => ({ ...s, undo: [...s.undo, before.blocks], redo: [] }));
  markEdited(tl);
  return id;
}

/** The size box: click it, type a size one digit at a time (shown with a caret and a blue ring), press Enter. */
export async function typeSizeBox(tl: Timeline, text: string, apply: () => void, opts: { msPerChar?: number } = {}) {
  tl.setVar("sizeBox", "");
  for (let n = 1; n <= text.length; n++) {
    await tl.wait(opts.msPerChar ?? 260);
    tl.setVar("sizeBox", text.slice(0, n));
  }
  await tl.wait(450); // Enter
  tl.setVar("sizeBox", null);
  apply();
}

/**
 * Suggesting mode (step 60): type a phrase at the end of a block, one character at a time. Each typed character gets the
 * "suggest" mark (green, underlined), so the new words read as a suggestion rather than as part of the text.
 */
export async function typeSuggestion(tl: Timeline, blockId: string, text: string, opts: { msPerChar?: number } = {}) {
  const at = getEditor(tl).blocks.findIndex((b) => b.id === blockId);
  if (at < 0) throw new Error(`Editor: no block "${blockId}"`);
  const start = getEditor(tl).blocks[at].text.length;
  for (let n = 1; n <= text.length; n++) {
    await tl.wait(opts.msPerChar ?? 80);
    setEditor(tl, (s) => ({
      ...s,
      blocks: s.blocks.map((b, i) =>
        i === at
          ? {
              ...b,
              text: b.text.slice(0, start) + text.slice(0, n),
              formats: [...(b.formats ?? []).filter((f) => f.format !== "suggest"), { from: start, to: start + n, format: "suggest" as const }],
            }
          : b,
      ),
      caret: { block: at, offset: start + n },
    }));
  }
  markEdited(tl);
}
