import { clearEditorSelection, getEditor, initEditor } from "@/components/docs/editor-timeline";
import { dragSelectText } from "@/components/docs/format-timeline";
import { copyLook, paintLook } from "@/components/docs/format-state";
import { clickTool, edit, initToolbar } from "@/components/docs/toolbar-timeline";
import type { Timeline } from "@/lib/timeline";
import { CAPTIONS, PRACTICE_ID, START_EDITOR, TARGETS, URLS } from "./step46-data";

/** Snaarp Doc, step 46 - Print and Paint format. Times are active milliseconds from the start of the step. */
export const STEP46_DURATION_MS = 27000;

export async function runStep46(tl: Timeline) {
  initEditor(tl, START_EDITOR);
  initToolbar(tl);
  tl.setVar("print", false);
  tl.placeCursor(0.5, 0.45); // middle of the page
  tl.setUrl(URLS.editor);
  tl.setVar("intro", 1); // the editor fades in

  // The Print button opens the print window
  await tl.at(800);
  tl.showCaption(CAPTIONS.print);
  await clickTool(tl, "print", () => tl.setVar("print", true), { tipMs: 900 });
  await tl.at(4000);
  tl.showCaption(CAPTIONS.opens);

  // Cancel closes it
  await tl.at(6000);
  tl.showCaption(CAPTIONS.cancel);
  await tl.moveCursorTo("[data-tl=print-cancel]", { ms: 800 });
  tl.highlight("[data-tl=print-cancel]");
  await tl.wait(200);
  await tl.click("[data-tl=print-cancel]");
  tl.clearHighlight();
  tl.setVar("print", false);

  // Select the bold blue words, then click Paint format
  await tl.at(9500);
  tl.showCaption(CAPTIONS.select);
  await dragSelectText(tl, PRACTICE_ID, TARGETS.source, { dragMs: 900 });
  await tl.at(12500);
  tl.showCaption(CAPTIONS.paint);
  const look = copyLook(getEditor(tl));
  await clickTool(tl, "paint", () => tl.setVar("paint", look), { tipMs: 900 });

  // Select other words: they take the style
  await tl.at(16000);
  tl.showCaption(CAPTIONS.apply);
  await dragSelectText(tl, PRACTICE_ID, TARGETS.target, { dragMs: 900 });
  edit(tl, (s) => paintLook(s, look));
  tl.setVar("paint", null);
  await tl.wait(500);
  clearEditorSelection(tl);

  // The result
  await tl.at(20500);
  tl.showCaption(CAPTIONS.done);
  tl.highlight(`[data-tl=doc-block-${PRACTICE_ID}]`);
  await tl.at(24000);
  tl.clearHighlight();
  tl.hideCaption();
  await tl.at(26600);
  tl.setVar("fade", true);
  await tl.at(STEP46_DURATION_MS);
}
