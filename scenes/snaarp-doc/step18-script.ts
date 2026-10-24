import { initEditor, SAMPLE_EDITOR } from "@/components/docs/editor-timeline";
import { chooseViewItem, clickViewMenu, closeViewMenu, hoverViewItem } from "@/components/docs/view-menu-timeline";
import type { Timeline } from "@/lib/timeline";
import { CAPTIONS, URLS } from "./step18-data";

/** Snaarp Doc, step 18 - Ruler and layout options. Times are active milliseconds from the start of the step. */
export const STEP18_DURATION_MS = 29000;

export async function runStep18(tl: Timeline) {
  initEditor(tl, SAMPLE_EDITOR);
  tl.placeCursor(0.5, 0.45); // where step 17 left the cursor (middle of the page)
  tl.setUrl(URLS.editor);
  tl.setVar("intro", 1); // the editor fades in

  // View menu; Show print layout is checked (hover only: it does not change what the page looks like here)
  await tl.at(800);
  tl.showCaption(CAPTIONS.view);
  await clickViewMenu(tl);
  await tl.at(2200);
  tl.showCaption(CAPTIONS.printLayout);
  await hoverViewItem(tl, "print-layout");

  // Show ruler: the ruler row disappears, then comes back
  await tl.at(4500);
  tl.showCaption(CAPTIONS.hideRuler);
  await chooseViewItem(tl, "ruler");
  await tl.at(7500);
  tl.showCaption(CAPTIONS.showRuler);
  await clickViewMenu(tl);
  await chooseViewItem(tl, "ruler");

  // Show non-printing characters: dots for spaces and paragraph marks appear
  await tl.at(11000);
  tl.showCaption(CAPTIONS.nonPrinting);
  await clickViewMenu(tl);
  await hoverViewItem(tl, "non-printing");
  await tl.wait(700);
  await chooseViewItem(tl, "non-printing");

  // The greyed-out Show equation toolbar and Full screen (hover only)
  await tl.at(14800);
  await clickViewMenu(tl);
  await tl.at(16000);
  tl.showCaption(CAPTIONS.greyed);
  await hoverViewItem(tl, "equation");
  await tl.at(19000);
  tl.showCaption(CAPTIONS.fullScreen);
  await hoverViewItem(tl, "fullscreen");

  // Turn the marks off again
  await tl.at(22000);
  tl.showCaption(CAPTIONS.hideMarks);
  await chooseViewItem(tl, "non-printing");
  closeViewMenu(tl);

  // Hold, then the quick white fade
  await tl.at(28400);
  tl.hideCaption();
  tl.setVar("fade", true);
  await tl.at(STEP18_DURATION_MS);
}
