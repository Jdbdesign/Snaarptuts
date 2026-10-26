import { initEditor } from "@/components/docs/editor-timeline";
import { clickInBlock } from "@/components/docs/format-timeline";
import { setAlign } from "@/components/docs/format-state";
import type { Align } from "@/components/docs/editor-state";
import { clickTool, edit, initToolbar } from "@/components/docs/toolbar-timeline";
import type { Timeline } from "@/lib/timeline";
import { CAPTIONS, PRACTICE_ID, START_EDITOR, URLS } from "./step53-data";

/** Snaarp Doc, step 53 - Align your text. Times are active milliseconds from the start of the step. */
export const STEP53_DURATION_MS = 30000;

const align = (tl: Timeline, how: Align) => () => edit(tl, (s) => setAlign(s, how));

export async function runStep53(tl: Timeline) {
  initEditor(tl, START_EDITOR);
  initToolbar(tl);
  tl.placeCursor(0.5, 0.45); // middle of the page
  tl.setUrl(URLS.editor);
  tl.setVar("intro", 1); // the editor fades in

  await tl.at(800);
  tl.showCaption(CAPTIONS.click);
  await clickInBlock(tl, PRACTICE_ID, 40);

  await tl.at(3200);
  tl.showCaption(CAPTIONS.center);
  await clickTool(tl, "align-center", align(tl, "center"), { tipMs: 900 });
  await tl.at(7500);
  tl.showCaption(CAPTIONS.centered);

  await tl.at(9500);
  tl.showCaption(CAPTIONS.right);
  await clickTool(tl, "align-right", align(tl, "right"), { tipMs: 800 });

  await tl.at(14000);
  tl.showCaption(CAPTIONS.justify);
  await clickTool(tl, "align-justify", align(tl, "justify"), { tipMs: 800 });

  await tl.at(19000);
  tl.showCaption(CAPTIONS.left);
  await clickTool(tl, "align-left", align(tl, "left"), { tipMs: 800 });
  await tl.at(23500);
  tl.showCaption(CAPTIONS.done);
  tl.highlight(`[data-tl=doc-block-${PRACTICE_ID}]`);

  await tl.at(26500);
  tl.clearHighlight();
  tl.hideCaption();
  await tl.at(29600);
  tl.setVar("fade", true);
  await tl.at(STEP53_DURATION_MS);
}
