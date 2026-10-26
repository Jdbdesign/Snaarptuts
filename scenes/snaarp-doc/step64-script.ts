import { showDocToast } from "@/components/docs/doc-toast-timeline";
import { initEditor } from "@/components/docs/editor-timeline";
import { initToolbar, pointAt, pressButton } from "@/components/docs/toolbar-timeline";
import type { Timeline } from "@/lib/timeline";
import { CAPTIONS, COPIED, START_EDITOR, URLS } from "./step64-data";

/** Snaarp Doc, step 64 - Share your document (the last step). Times are active milliseconds from the start of the step. */
export const STEP64_DURATION_MS = 27000;

/** Move onto a small dropdown option (hover it), then click it. */
async function pick(tl: Timeline, sel: string, ms = 450) {
  await tl.moveCursorTo(sel, { ms });
  tl.hover(sel);
  await tl.wait(350);
  await tl.click(sel);
  tl.hover(null);
}

export async function runStep64(tl: Timeline) {
  initEditor(tl, START_EDITOR);
  initToolbar(tl);
  // The recording's dialog already says Anyone with the link, Editor.
  tl.setVar("share", false);
  tl.setVar("shareAccess", "link");
  tl.setVar("shareRole", "editor");
  tl.setVar("shareMenu", "");
  tl.setVar("shareFocus", false);
  tl.placeCursor(0.5, 0.45); // middle of the page
  tl.setUrl(URLS.editor);
  tl.setVar("intro", 1); // the editor fades in

  // The Share button
  await tl.at(800);
  tl.showCaption(CAPTIONS.share);
  await pointAt(tl, "editor-share", { tipMs: 1000 });
  await pressButton(tl, "editor-share");
  tl.setVar("share", true);
  tl.setVar("shareFocus", true);

  // The dialog
  await tl.at(5000);
  tl.showCaption(CAPTIONS.dialog);
  tl.highlight("[data-tl=share-input]");
  await tl.at(8000);
  tl.clearHighlight();
  tl.setVar("shareFocus", false);
  tl.showCaption(CAPTIONS.access);
  tl.highlight("[data-tl=share-access-row]");

  // The role list: Viewer, Commenter, Editor (ticked)
  await tl.at(11000);
  tl.clearHighlight();
  tl.showCaption(CAPTIONS.role);
  await tl.moveCursorTo("[data-tl=share-role-trigger]", { ms: 700 });
  await tl.click("[data-tl=share-role-trigger]");
  tl.setVar("shareMenu", "role");
  await tl.wait(500);
  await tl.moveCursorTo("[data-tl=share-role-opt-commenter]", { ms: 450 });
  tl.hover("[data-tl=share-role-opt-commenter]");
  await tl.wait(500);
  await pick(tl, "[data-tl=share-role-opt-editor]", 350);
  tl.setVar("shareMenu", "");

  // Copy link
  await tl.at(15500);
  tl.showCaption(CAPTIONS.copy);
  await tl.moveCursorTo("[data-tl=share-copy]", { ms: 700 });
  tl.highlight("[data-tl=share-copy]");
  await tl.wait(250);
  await tl.click("[data-tl=share-copy]");
  tl.clearHighlight();
  showDocToast(tl, COPIED, "success", 3500);
  await tl.at(19000);
  tl.showCaption(CAPTIONS.copied);

  // Done
  await tl.at(21000);
  tl.showCaption(CAPTIONS.done);
  await tl.moveCursorTo("[data-tl=share-done]", { ms: 650 });
  tl.highlight("[data-tl=share-done]");
  await tl.wait(200);
  await tl.click("[data-tl=share-done]");
  tl.clearHighlight();
  tl.setVar("share", false);

  await tl.at(24500);
  tl.hideCaption();
  await tl.at(26600);
  tl.setVar("fade", true);
  await tl.at(STEP64_DURATION_MS);
}
