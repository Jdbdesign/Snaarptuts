import { clickPanel, initEditor, SAMPLE_EDITOR } from "@/components/docs/editor-timeline";
import { initTabs } from "@/components/docs/outline-timeline";
import { chooseToolsItem, clickToolsMenu, closeToolsMenu, hoverToolsItem } from "@/components/docs/tools-menu-timeline";
import type { Timeline } from "@/lib/timeline";
import { CAPTIONS, HOVER_FIRST, HOVER_LAST, URLS } from "./step39-data";

/** Snaarp Doc, step 39 - Explore the Tools menu. Times are active milliseconds from the start of the step. */
export const STEP39_DURATION_MS = 24000;

export async function runStep39(tl: Timeline) {
  initEditor(tl, SAMPLE_EDITOR);
  initTabs(tl); // one tab, the outline panel closed
  tl.placeCursor(0.5, 0.45); // middle of the page
  tl.setUrl(URLS.editor);
  tl.setVar("intro", 1); // the editor fades in

  // Open the Tools menu
  await tl.at(800);
  tl.showCaption(CAPTIONS.tools);
  await clickToolsMenu(tl);
  await tl.at(2500);
  tl.showCaption(CAPTIONS.menu);
  tl.highlight("[data-tl=tools-menu-card]");

  // A greyed-out item stays greyed
  await tl.at(4500);
  tl.clearHighlight();
  tl.showCaption(CAPTIONS.greyed);
  await hoverToolsItem(tl, HOVER_FIRST);

  // Word count (hover only: the next step opens it)
  await tl.at(7000);
  tl.showCaption(CAPTIONS.wordCount);
  await hoverToolsItem(tl, "word-count");

  // Document outline: the menu closes and the panel slides in on the left
  await tl.at(9500);
  tl.showCaption(CAPTIONS.outline);
  await chooseToolsItem(tl, "outline");
  await tl.at(12500);
  tl.showCaption(CAPTIONS.opened);

  // Back to the menu: the greyed items one after the other
  await tl.at(14500);
  tl.showCaption(CAPTIONS.again);
  await clickToolsMenu(tl);
  await tl.at(16500);
  tl.showCaption(CAPTIONS.unavailable);
  for (const id of HOVER_LAST) {
    await hoverToolsItem(tl, id, { ms: 450 });
    await tl.wait(450);
  }

  // The menu closes and the panel's back arrow closes the outline
  await tl.at(20000);
  closeToolsMenu(tl);
  tl.showCaption(CAPTIONS.close);
  await clickPanel(tl, "[data-tl=outline-close]", { ms: 800 });
  tl.setVar("outlineOpen", false);

  // Hold, then the quick white fade
  await tl.at(23000);
  tl.hideCaption();
  await tl.at(23600);
  tl.setVar("fade", true);
  await tl.at(STEP39_DURATION_MS);
}
