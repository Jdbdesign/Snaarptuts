import { initEditor, SAMPLE_EDITOR } from "@/components/docs/editor-timeline";
import { chooseInsertSub, clickInsertMenu, hoverInsertItem } from "@/components/docs/insert-menu-timeline";
import { applyPageNumbers, chooseDialogOption } from "@/components/docs/insert-timeline";
import type { Timeline } from "@/lib/timeline";
import { CAPTIONS, URLS } from "./step27-data";

/** Snaarp Doc, step 27 - Add page numbers. Times are active milliseconds from the start of the step. */
export const STEP27_DURATION_MS = 24000;

export async function runStep27(tl: Timeline) {
  initEditor(tl, SAMPLE_EDITOR);
  tl.placeCursor(0.5, 0.45); // middle of the page
  tl.setUrl(URLS.editor);
  tl.setVar("intro", 1); // the editor fades in

  // Insert > Page elements > Page numbers: the dialog opens
  await tl.at(800);
  tl.showCaption(CAPTIONS.insertPageElements);
  await clickInsertMenu(tl);
  await hoverInsertItem(tl, "page-elements");
  await tl.at(3000);
  tl.showCaption(CAPTIONS.choose);
  await chooseInsertSub(tl, "page-numbers");

  // Position: hover Top, then click Bottom (already the default in the recording)
  await tl.at(5000);
  tl.showCaption(CAPTIONS.position);
  await tl.moveCursorTo("[data-tl=pn-pos-top]", { ms: 700 });
  tl.hover("[data-tl=pn-pos-top]");
  await tl.wait(700);
  tl.hover(null);
  await chooseDialogOption(tl, "[data-tl=pn-pos-bottom]", "pnPosition", "bottom");

  // Alignment: Right
  await tl.at(8000);
  tl.showCaption(CAPTIONS.alignment);
  await chooseDialogOption(tl, "[data-tl=pn-align-right]", "pnAlign", "right");

  // Start numbering at 1 (the grey hint shows under the input)
  await tl.at(10500);
  tl.showCaption(CAPTIONS.start);
  await tl.moveCursorTo("[data-tl=pn-start]", { ms: 800 });
  tl.highlight("[data-tl=pn-start]");

  // Apply: the dialog closes and the number appears at the bottom right of the page
  await tl.at(13500);
  tl.clearHighlight();
  tl.showCaption(CAPTIONS.apply);
  await tl.moveCursorTo("[data-tl=pn-apply]", { ms: 800 });
  tl.highlight("[data-tl=pn-apply]");
  await tl.wait(200);
  await tl.click("[data-tl=pn-apply]");
  tl.clearHighlight();
  applyPageNumbers(tl);

  // The page scrolls down to the foot of the page, where the number is
  await tl.wait(500);
  await tl.scrollPanelTo("[data-tl=editor-canvas]", "bottom", 1500);
  await tl.at(16500);
  tl.showCaption(CAPTIONS.footer);
  tl.highlight("[data-tl=page-number]");

  // Hold, then the quick white fade
  await tl.at(20000);
  tl.clearHighlight();
  tl.hideCaption();
  await tl.at(23600);
  tl.setVar("fade", true);
  await tl.at(STEP27_DURATION_MS);
}
