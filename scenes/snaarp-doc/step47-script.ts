import { initEditor } from "@/components/docs/editor-timeline";
import { chooseRow, initToolbar, openMenu } from "@/components/docs/toolbar-timeline";
import type { Timeline } from "@/lib/timeline";
import { CAPTIONS, START_EDITOR, URLS } from "./step47-data";

/** Snaarp Doc, step 47 - Change the zoom. Times are active milliseconds from the start of the step. */
export const STEP47_DURATION_MS = 20000;

export async function runStep47(tl: Timeline) {
  initEditor(tl, START_EDITOR);
  initToolbar(tl);
  tl.placeCursor(0.5, 0.45); // middle of the page
  tl.setUrl(URLS.editor);
  tl.setVar("intro", 1); // the editor fades in

  // Open the zoom list and choose 150%
  await tl.at(800);
  tl.showCaption(CAPTIONS.box);
  await openMenu(tl, "zoom", "tool-zoom", { tipMs: 800 });
  await tl.at(3200);
  tl.showCaption(CAPTIONS.big);
  await chooseRow(tl, "tm-zoom-150", () => tl.setVar("zoomPct", 150));

  // The page scales up
  await tl.at(6500);
  tl.showCaption(CAPTIONS.bigger);
  tl.highlight("[data-tl=editor-page]");

  // Open it again and go back to 100%
  await tl.at(10000);
  tl.clearHighlight();
  tl.showCaption(CAPTIONS.again);
  await openMenu(tl, "zoom", "tool-zoom", { tipMs: 200 });
  await tl.at(12500);
  tl.showCaption(CAPTIONS.normal);
  await chooseRow(tl, "tm-zoom-100", () => tl.setVar("zoomPct", 100));

  // The footer shows the zoom as well
  await tl.at(15500);
  tl.showCaption(CAPTIONS.done);
  await tl.at(18000);
  tl.hideCaption();
  await tl.at(19600);
  tl.setVar("fade", true);
  await tl.at(STEP47_DURATION_MS);
}
