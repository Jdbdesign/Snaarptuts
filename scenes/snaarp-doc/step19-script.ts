import { initEditor, SAMPLE_EDITOR } from "@/components/docs/editor-timeline";
import { clickInsertMenu, closeInsertMenu, hoverInsertItem } from "@/components/docs/insert-menu-timeline";
import type { Timeline } from "@/lib/timeline";
import { CAPTIONS, URLS } from "./step19-data";

/** Snaarp Doc, step 19 - Explore the Insert menu. Times are active milliseconds from the start of the step. */
export const STEP19_DURATION_MS = 17000;

export async function runStep19(tl: Timeline) {
  initEditor(tl, SAMPLE_EDITOR);
  tl.placeCursor(0.5, 0.45); // middle of the page
  tl.setUrl(URLS.editor);
  tl.setVar("intro", 1); // the editor fades in

  // Open the Insert menu
  await tl.at(800);
  tl.showCaption(CAPTIONS.insert);
  await clickInsertMenu(tl);
  await tl.at(2500);
  tl.showCaption(CAPTIONS.menu);
  tl.highlight("[data-tl=insert-menu-card]");

  // Break submenu
  await tl.at(5000);
  tl.clearHighlight();
  tl.showCaption(CAPTIONS.breaks);
  await hoverInsertItem(tl, "break");

  // Page elements submenu
  await tl.at(8000);
  tl.showCaption(CAPTIONS.pageElements);
  await hoverInsertItem(tl, "page-elements");

  // The greyed-out Comment (hover only)
  await tl.at(11000);
  tl.showCaption(CAPTIONS.comment);
  await hoverInsertItem(tl, "comment");

  // The menu closes, hold, then the quick white fade
  await tl.at(14000);
  closeInsertMenu(tl);
  tl.hideCaption();
  await tl.at(16600);
  tl.setVar("fade", true);
  await tl.at(STEP19_DURATION_MS);
}
