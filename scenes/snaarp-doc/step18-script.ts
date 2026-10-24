import { initEditor, SAMPLE_EDITOR } from "@/components/docs/editor-timeline";
import { chooseViewItem, clickViewMenu, hoverViewItem, pressEscFromFullScreen } from "@/components/docs/view-menu-timeline";
import type { Timeline } from "@/lib/timeline";
import { CAPTIONS, URLS } from "./step18-data";

/** Snaarp Doc, step 18 - Ruler and layout options. Times are active milliseconds from the start of the step. */
export const STEP18_DURATION_MS = 30000;

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

  // The greyed-out Show equation toolbar (hover only)
  await tl.at(14800);
  await clickViewMenu(tl);
  await tl.at(16000);
  tl.showCaption(CAPTIONS.greyed);
  await hoverViewItem(tl, "equation");

  // Full screen: the chrome fades out, the page shows on a dark background, the hint pill shows for 3 s
  await tl.at(18000);
  tl.showCaption(CAPTIONS.fullScreen);
  await chooseViewItem(tl, "fullscreen");
  await tl.at(22000);
  tl.showCaption(CAPTIONS.onlyDocument);

  // Esc: the key chip shows and is pressed; the normal editor returns
  await tl.at(25000);
  tl.showCaption(CAPTIONS.esc);
  await pressEscFromFullScreen(tl);

  // Hold, then the quick white fade
  await tl.at(29600);
  tl.hideCaption();
  tl.setVar("fade", true);
  await tl.at(STEP18_DURATION_MS);
}
