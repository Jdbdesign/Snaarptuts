import { clickEndOfBlock, initEditor } from "@/components/docs/editor-timeline";
import { dragSelectText } from "@/components/docs/format-timeline";
import { clearFormats, toggleFormat } from "@/components/docs/format-state";
import { clickTool, edit, initToolbar } from "@/components/docs/toolbar-timeline";
import type { Timeline } from "@/lib/timeline";
import { CAPTIONS, PRACTICE_ID, START_EDITOR, TARGETS, URLS } from "./step57-data";

/** Snaarp Doc, step 57 - Clear formatting, superscript and subscript. Times are active milliseconds from the start of the step. */
export const STEP57_DURATION_MS = 31000;

export async function runStep57(tl: Timeline) {
  initEditor(tl, START_EDITOR);
  initToolbar(tl);
  tl.placeCursor(0.5, 0.45); // middle of the page
  tl.setUrl(URLS.editor);
  tl.setVar("intro", 1); // the editor fades in

  // Clear formatting
  await tl.at(800);
  tl.showCaption(CAPTIONS.select);
  await dragSelectText(tl, PRACTICE_ID, TARGETS.styled, { dragMs: 1200 });
  await tl.at(3800);
  tl.showCaption(CAPTIONS.clear);
  await clickTool(tl, "clear", () => edit(tl, (s) => clearFormats(s)), { tipMs: 900 });
  await tl.at(7500);
  tl.showCaption(CAPTIONS.cleared);

  // Superscript
  await tl.at(10000);
  tl.showCaption(CAPTIONS.supSelect);
  await dragSelectText(tl, PRACTICE_ID, TARGETS.sup, { dragMs: 500 });
  await tl.at(12500);
  tl.showCaption(CAPTIONS.sup);
  await clickTool(tl, "sup", () => edit(tl, (s) => toggleFormat(s, "sup")), { tipMs: 900 });

  // Subscript
  await tl.at(17500);
  tl.showCaption(CAPTIONS.subSelect);
  await dragSelectText(tl, PRACTICE_ID, TARGETS.sub, { dragMs: 500 });
  await tl.at(20000);
  tl.showCaption(CAPTIONS.sub);
  await clickTool(tl, "sub", () => edit(tl, (s) => toggleFormat(s, "sub")), { tipMs: 900 });

  // Click away to see the result
  await tl.at(24500);
  await clickEndOfBlock(tl, PRACTICE_ID);
  tl.showCaption(CAPTIONS.done);
  tl.highlight(`[data-tl=doc-block-${PRACTICE_ID}]`);
  await tl.at(28000);
  tl.clearHighlight();
  tl.hideCaption();
  await tl.at(30600);
  tl.setVar("fade", true);
  await tl.at(STEP57_DURATION_MS);
}
