import { initEditor, SAMPLE_EDITOR } from "@/components/docs/editor-timeline";
import { chooseInsertItem, chooseInsertSub, clickInsertMenu, hoverInsertItem, hoverInsertSub } from "@/components/docs/insert-menu-timeline";
import { clickStartOfBlock } from "@/components/docs/insert-timeline";
import type { Timeline } from "@/lib/timeline";
import { CAPTIONS, SPOTS, URLS } from "./step23-data";

/** Snaarp Doc, step 23 - Add a line or page break. Times are active milliseconds from the start of the step. */
export const STEP23_DURATION_MS = 30000;

export async function runStep23(tl: Timeline) {
  initEditor(tl, SAMPLE_EDITOR);
  tl.placeCursor(0.5, 0.45); // middle of the page
  tl.setUrl(URLS.editor);
  tl.setVar("intro", 1); // the editor fades in

  // Click under the heading, then Insert > Horizontal line
  await tl.at(800);
  tl.showCaption(CAPTIONS.clickLine);
  await clickStartOfBlock(tl, SPOTS.line);
  await tl.at(2500);
  tl.showCaption(CAPTIONS.insertLine);
  await clickInsertMenu(tl);
  await chooseInsertItem(tl, "hr");

  // The line
  await tl.at(5000);
  tl.showCaption(CAPTIONS.line);
  tl.highlight("[data-tl=page-rule]");

  // Click at the start of "Goals", then Insert > Break
  await tl.at(8000);
  tl.clearHighlight();
  tl.showCaption(CAPTIONS.clickPage);
  await clickStartOfBlock(tl, SPOTS.page);
  await tl.at(10000);
  tl.showCaption(CAPTIONS.insertBreak);
  await clickInsertMenu(tl);
  await hoverInsertItem(tl, "break");

  // The Break submenu: page break, then the two section breaks (hover only)
  await tl.at(12500);
  tl.showCaption(CAPTIONS.pageBreak);
  await hoverInsertSub(tl, "page-break");
  await tl.at(15000);
  tl.showCaption(CAPTIONS.sections);
  await hoverInsertSub(tl, "section-next");
  await tl.wait(900);
  await hoverInsertSub(tl, "section-continuous");

  // Back to Page break and click it: page 2 starts at "Goals"
  await tl.at(18500);
  await chooseInsertSub(tl, "page-break");
  await tl.at(21500);
  tl.showCaption(CAPTIONS.after);
  await tl.scrollPanelTo("[data-tl=editor-canvas]", "[data-tl=doc-block-p4]", 1800);

  // Hold, then the quick white fade
  await tl.at(29600);
  tl.setVar("fade", true);
  await tl.at(STEP23_DURATION_MS);
}
