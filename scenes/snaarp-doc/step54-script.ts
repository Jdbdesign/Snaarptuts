import { initEditor } from "@/components/docs/editor-timeline";
import { clickInBlock } from "@/components/docs/format-timeline";
import { setSpacing } from "@/components/docs/format-state";
import { chooseRow, edit, initToolbar, openMenu } from "@/components/docs/toolbar-timeline";
import type { Timeline } from "@/lib/timeline";
import { CAPTIONS, PRACTICE_ID, START_EDITOR, URLS } from "./step54-data";

/** Snaarp Doc, step 54 - Line spacing. Times are active milliseconds from the start of the step. */
export const STEP54_DURATION_MS = 27000;

export async function runStep54(tl: Timeline) {
  initEditor(tl, START_EDITOR);
  initToolbar(tl);
  tl.placeCursor(0.5, 0.45); // middle of the page
  tl.setUrl(URLS.editor);
  tl.setVar("intro", 1); // the editor fades in

  await tl.at(800);
  tl.showCaption(CAPTIONS.click);
  await clickInBlock(tl, PRACTICE_ID, 60);

  // 1.5
  await tl.at(3000);
  tl.showCaption(CAPTIONS.open);
  await openMenu(tl, "spacing", "tool-spacing", { tipMs: 900 });
  await tl.at(6000);
  tl.showCaption(CAPTIONS.pick);
  await chooseRow(tl, "tm-spacing-15", () => edit(tl, (s) => setSpacing(s, 1.5)));
  await tl.at(9500);
  tl.showCaption(CAPTIONS.wider);
  tl.highlight(`[data-tl=doc-block-${PRACTICE_ID}]`);

  // Double
  await tl.at(13000);
  tl.clearHighlight();
  tl.showCaption(CAPTIONS.again);
  await openMenu(tl, "spacing", "tool-spacing", { tipMs: 300 });
  await tl.at(16000);
  tl.showCaption(CAPTIONS.double);
  await chooseRow(tl, "tm-spacing-double", () => edit(tl, (s) => setSpacing(s, 2)));
  await tl.at(19500);
  tl.showCaption(CAPTIONS.done);
  tl.highlight(`[data-tl=doc-block-${PRACTICE_ID}]`);

  await tl.at(23000);
  tl.clearHighlight();
  tl.hideCaption();
  await tl.at(26600);
  tl.setVar("fade", true);
  await tl.at(STEP54_DURATION_MS);
}
