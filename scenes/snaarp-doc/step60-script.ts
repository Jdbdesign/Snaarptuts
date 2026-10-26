import { clickEndOfBlock, initEditor } from "@/components/docs/editor-timeline";
import { chooseRow, initToolbar, openMenu, typeSuggestion } from "@/components/docs/toolbar-timeline";
import type { Timeline } from "@/lib/timeline";
import { CAPTIONS, PRACTICE_ID, START_EDITOR, SUGGESTED, URLS } from "./step60-data";

/** Snaarp Doc, step 60 - Editing, Suggesting and Viewing modes. Times are active milliseconds from the start of the step. */
export const STEP60_DURATION_MS = 33000;

export async function runStep60(tl: Timeline) {
  initEditor(tl, START_EDITOR);
  initToolbar(tl);
  tl.setVar("mode", "editing");
  tl.placeCursor(0.5, 0.45); // middle of the page
  tl.setUrl(URLS.editor);
  tl.setVar("intro", 1); // the editor fades in

  // The pen at the end of the toolbar: Suggesting
  await tl.at(800);
  tl.showCaption(CAPTIONS.menu);
  await openMenu(tl, "mode", "tool-pen-menu", { tipMs: 900 });
  await tl.at(4000);
  tl.showCaption(CAPTIONS.suggesting);
  await chooseRow(tl, "tm-mode-suggesting", () => tl.setVar("mode", "suggesting"));
  await tl.at(7000);
  tl.showCaption(CAPTIONS.mode);
  tl.highlight("[data-tl=editor-mode]");

  // Type a sentence: it shows as a suggestion
  await tl.at(10000);
  tl.clearHighlight();
  tl.showCaption(CAPTIONS.click);
  await clickEndOfBlock(tl, PRACTICE_ID);
  await tl.at(12500);
  tl.showCaption(CAPTIONS.type);
  await typeSuggestion(tl, PRACTICE_ID, SUGGESTED, { msPerChar: 75 });
  await tl.at(17000);
  tl.showCaption(CAPTIONS.suggested);
  tl.highlight(`[data-tl=doc-block-${PRACTICE_ID}]`);

  // Back to Editing
  await tl.at(21000);
  tl.clearHighlight();
  tl.showCaption(CAPTIONS.again);
  await openMenu(tl, "mode", "tool-pen-menu", { tipMs: 200 });
  await tl.at(24000);
  tl.showCaption(CAPTIONS.editing);
  await chooseRow(tl, "tm-mode-editing", () => tl.setVar("mode", "editing"));
  await tl.at(27000);
  tl.showCaption(CAPTIONS.done);
  tl.highlight("[data-tl=editor-mode]");

  await tl.at(29500);
  tl.clearHighlight();
  tl.hideCaption();
  await tl.at(32600);
  tl.setVar("fade", true);
  await tl.at(STEP60_DURATION_MS);
}
