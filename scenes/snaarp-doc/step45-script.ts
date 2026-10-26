import { clickEndOfBlock, initEditor } from "@/components/docs/editor-timeline";
import { clickTool, initToolbar, runRedo, runUndo, typeNewLine } from "@/components/docs/toolbar-timeline";
import type { Timeline } from "@/lib/timeline";
import { AFTER_ID, CAPTIONS, START_EDITOR, TYPED, URLS } from "./step45-data";

/** Snaarp Doc, step 45 - Undo and redo. Times are active milliseconds from the start of the step. */
export const STEP45_DURATION_MS = 22000;

export async function runStep45(tl: Timeline) {
  initEditor(tl, START_EDITOR);
  initToolbar(tl);
  tl.placeCursor(0.5, 0.45); // middle of the page
  tl.setUrl(URLS.editor);
  tl.setVar("intro", 1); // the editor fades in

  // Click at the end of the last paragraph and type a new line
  await tl.at(800);
  tl.showCaption(CAPTIONS.click);
  await clickEndOfBlock(tl, AFTER_ID);
  await tl.at(2600);
  tl.showCaption(CAPTIONS.type);
  const line = await typeNewLine(tl, AFTER_ID, TYPED);

  // Undo: the line disappears
  await tl.at(7000);
  tl.showCaption(CAPTIONS.undo);
  await clickTool(tl, "undo", () => runUndo(tl), { tipMs: 900 });
  await tl.at(10500);
  tl.showCaption(CAPTIONS.gone);

  // Redo: the line comes back (the Redo button was greyed until now)
  await tl.at(12500);
  tl.showCaption(CAPTIONS.redo);
  await clickTool(tl, "redo", () => runRedo(tl), { tipMs: 900 });
  await tl.at(16000);
  tl.showCaption(CAPTIONS.back);
  tl.highlight(`[data-tl=doc-block-${line}]`);

  // The shortcuts
  await tl.at(18500);
  tl.clearHighlight();
  tl.showCaption(CAPTIONS.keys);
  await tl.at(21000);
  tl.hideCaption();
  tl.setVar("fade", true);
  await tl.at(STEP45_DURATION_MS);
}
