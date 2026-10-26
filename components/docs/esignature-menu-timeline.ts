import type { Timeline } from "@/lib/timeline";
import { createEditor, placeCaret, type EditorState } from "./editor-state";
import type { EsignItemId } from "./esignature-menu-data";
import { openEsignature } from "./insert-timeline";
import { SAMPLE_BLOCKS } from "./sample-document";

/*
 * Timeline helpers that drive the eSignature menu and the eSignature dialog's tabs (Snaarp Doc steps 41 to 44). The scene
 * variables are `esigMenu` (menu open), `insertDialog` = "esignature" (the dialog), `esigTab` (draw | type | upload | request),
 * `esigFocus` (the input with the dark border: "name" | "email" | "message" | ""), `field:esig-name`, `field:esig-email`,
 * `field:esig-message` (typed with tl.typeText). EditorStage reads them. Every helper waits with the timeline's own clock, so
 * Pause freezes it.
 */

/**
 * The sample document with a new empty line under the Contacts paragraph and the caret in it: where a signature goes (start of
 * steps 41 to 43). The signature is placed under that line, like the one of step 29.
 */
export const SIGN_SPOT_EDITOR: EditorState = placeCaret(
  createEditor([...SAMPLE_BLOCKS, { id: "sign-line", kind: "p", text: "" }]),
  { block: SAMPLE_BLOCKS.length, offset: 0 },
);

const item = (id: EsignItemId) => `[data-tl=esign-item-${id}]`;

export const openEsignatureMenu = (tl: Timeline) => tl.setVar("esigMenu", true);

export function closeEsignatureMenu(tl: Timeline) {
  tl.hover(null);
  tl.setVar("esigMenu", false);
}

/** Move to "eSignature" in the editor's menu row, ring it, click it and open the menu. */
export async function clickEsignatureMenu(tl: Timeline, opts: { ms?: number } = {}) {
  const sel = "[data-tl=editor-menu-esignature]";
  await tl.moveCursorTo(sel, { ms: opts.ms ?? 700 });
  tl.highlight(sel);
  await tl.wait(150);
  await tl.click(sel);
  tl.clearHighlight();
  openEsignatureMenu(tl);
}

/** Move onto an eSignature menu item and hover it. Signature history is greyed out (no hover fill). */
export async function hoverEsignatureItem(tl: Timeline, id: EsignItemId, opts: { ms?: number } = {}) {
  await tl.moveCursorTo(item(id), { ms: opts.ms ?? 450, dx: -20 });
  tl.hover(item(id));
}

/** Move onto Sign document or Request signature, ring it, click it, close the menu and open the dialog on its tab. */
export async function chooseEsignatureItem(tl: Timeline, id: Exclude<EsignItemId, "history">, opts: { ms?: number } = {}) {
  await hoverEsignatureItem(tl, id, { ms: opts.ms ?? 450 });
  tl.highlight(item(id));
  await tl.wait(150);
  await tl.click(item(id));
  tl.clearHighlight();
  closeEsignatureMenu(tl);
  openEsignature(tl, id === "request" ? "request" : "draw");
}

/** Click one of the dialog's tabs: glide to it, ring it, click it and switch the tab. */
export async function clickEsignatureTab(tl: Timeline, tab: "draw" | "type" | "upload" | "request", opts: { ms?: number } = {}) {
  const sel = `[data-tl=esig-tab-${tab}]`;
  await tl.moveCursorTo(sel, { ms: opts.ms ?? 700 });
  tl.highlight(sel);
  await tl.wait(150);
  await tl.click(sel);
  tl.clearHighlight();
  tl.setVar("esigTab", tab);
}

/** Click one of the dialog's inputs (it gets the dark border and the caret), then type into it, one character at a time. */
export async function typeInEsignatureField(
  tl: Timeline,
  field: "name" | "email" | "message",
  text: string,
  opts: { msPerChar?: number; moveMs?: number } = {},
) {
  const sel = `[data-tl=esig-${field}]`;
  await tl.moveCursorTo(sel, { ms: opts.moveMs ?? 700 });
  await tl.click(sel);
  tl.setVar("esigFocus", field);
  await tl.wait(250);
  await tl.typeText(`esig-${field}`, text, { msPerChar: opts.msPerChar ?? 110 });
}
