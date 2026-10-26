import { initEditor, SAMPLE_EDITOR } from "@/components/docs/editor-timeline";
import { chooseFormatItem, clickFormatMenu, initFormatMenu } from "@/components/docs/format-timeline";
import { applyPageNumbers, chooseDialogOption, clickZone, typeInZone } from "@/components/docs/insert-timeline";
import type { Timeline } from "@/lib/timeline";
import { CAPTIONS, TEXTS, URLS } from "./step36-data";

/** Snaarp Doc, step 36 - Headers, footers and page numbers. Times are active milliseconds from the start of the step. */
export const STEP36_DURATION_MS = 32000;

export async function runStep36(tl: Timeline) {
  initEditor(tl, SAMPLE_EDITOR);
  initFormatMenu(tl);
  tl.placeCursor(0.5, 0.45); // middle of the page
  tl.setUrl(URLS.editor);
  tl.setVar("intro", 1); // the editor fades in

  // Format > Headers & footers: both areas appear, the caret is in the header
  await tl.at(800);
  tl.showCaption(CAPTIONS.headers);
  await clickFormatMenu(tl);
  await chooseFormatItem(tl, "headers");

  // Type the header
  await tl.at(4500);
  tl.showCaption(CAPTIONS.typeHeader);
  await typeInZone(tl, "header", TEXTS.header, { msPerChar: 110 });

  // Click the footer (the page scrolls to the foot) and type
  await tl.at(8500);
  tl.showCaption(CAPTIONS.clickFooter);
  await clickZone(tl, "footer");
  await tl.at(10000);
  tl.showCaption(CAPTIONS.typeFooter);
  await typeInZone(tl, "footer", TEXTS.footer, { msPerChar: 110 });

  // Format > Page numbers: the dialog opens
  await tl.at(14000);
  tl.showCaption(CAPTIONS.pageNumbers);
  await clickFormatMenu(tl);
  await chooseFormatItem(tl, "page-numbers");

  // Position and alignment
  await tl.at(17000);
  tl.showCaption(CAPTIONS.choose);
  await chooseDialogOption(tl, "[data-tl=pn-pos-bottom]", "pnPosition", "bottom", { ms: 700 });
  await chooseDialogOption(tl, "[data-tl=pn-align-right]", "pnAlign", "right", { ms: 600 });

  // Apply: the dialog closes and "1" appears at the right of the footer
  await tl.at(21000);
  tl.showCaption(CAPTIONS.apply);
  await tl.moveCursorTo("[data-tl=pn-apply]", { ms: 800 });
  tl.highlight("[data-tl=pn-apply]");
  await tl.wait(200);
  await tl.click("[data-tl=pn-apply]");
  tl.clearHighlight();
  applyPageNumbers(tl);

  // Ring the header, the footer text and the number in turn
  await tl.at(24000);
  tl.showCaption(CAPTIONS.done);
  await tl.scrollPanelTo("[data-tl=editor-canvas]", "top", 900);
  tl.highlight("[data-tl=page-header-text]");
  await tl.wait(1200);
  tl.clearHighlight();
  await tl.scrollPanelTo("[data-tl=editor-canvas]", "bottom", 900);
  tl.highlight("[data-tl=page-footer-text]");
  await tl.wait(1100);
  tl.clearHighlight();
  tl.highlight("[data-tl=page-number]");

  // Hold, then the quick white fade
  await tl.at(28000);
  tl.clearHighlight();
  tl.hideCaption();
  await tl.at(31600);
  tl.setVar("fade", true);
  await tl.at(STEP36_DURATION_MS);
}
