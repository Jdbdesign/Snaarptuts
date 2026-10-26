import { initEditor, SAMPLE_EDITOR } from "@/components/docs/editor-timeline";
import { closeInsertDialog } from "@/components/docs/insert-timeline";
import { chooseToolsItem, clickToolsMenu } from "@/components/docs/tools-menu-timeline";
import type { Timeline } from "@/lib/timeline";
import { CAPTIONS, ROWS, URLS } from "./step40-data";

/** Snaarp Doc, step 40 - Check your word count. Times are active milliseconds from the start of the step. */
export const STEP40_DURATION_MS = 18400;

export async function runStep40(tl: Timeline) {
  initEditor(tl, SAMPLE_EDITOR);
  tl.placeCursor(0.5, 0.45); // middle of the page
  tl.setUrl(URLS.editor);
  tl.setVar("intro", 1); // the editor fades in

  // Tools > Word count: the dialog opens with the live numbers
  await tl.at(800);
  tl.showCaption(CAPTIONS.open);
  await clickToolsMenu(tl, { ms: 600 });
  await chooseToolsItem(tl, "word-count");

  // The four rows, one after the other
  await tl.at(4000);
  tl.showCaption(CAPTIONS.rows);
  for (const id of ROWS) {
    await tl.moveCursorTo(`[data-tl=wc-row-${id}]`, { ms: 500, dx: 40 });
    tl.highlight(`[data-tl=wc-row-${id}]`);
    await tl.wait(750);
    tl.clearHighlight();
  }

  // The shortcut
  await tl.at(9000);
  tl.showCaption(CAPTIONS.shortcut);
  tl.highlight("[data-tl=wc-card]");

  // Done closes the dialog
  await tl.at(12500);
  tl.clearHighlight();
  tl.showCaption(CAPTIONS.done);
  await tl.moveCursorTo("[data-tl=wc-done]", { ms: 800 });
  tl.highlight("[data-tl=wc-done]");
  await tl.wait(200);
  await tl.click("[data-tl=wc-done]");
  tl.clearHighlight();
  closeInsertDialog(tl);

  // Hold, then the quick white fade
  await tl.at(15500);
  tl.hideCaption();
  await tl.at(18000);
  tl.setVar("fade", true);
  await tl.at(STEP40_DURATION_MS);
}
