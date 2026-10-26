import { initEditor, SAMPLE_EDITOR } from "@/components/docs/editor-timeline";
import { chooseFormatItem, chooseOrientation, clickFormatMenu, clickOrientationOk, initFormatMenu } from "@/components/docs/format-timeline";
import type { Timeline } from "@/lib/timeline";
import { CAPTIONS, URLS } from "./step37-data";

/** Snaarp Doc, step 37 - Change page orientation. Times are active milliseconds from the start of the step. */
export const STEP37_DURATION_MS = 27000;

export async function runStep37(tl: Timeline) {
  initEditor(tl, SAMPLE_EDITOR);
  initFormatMenu(tl);
  tl.placeCursor(0.5, 0.45); // middle of the page
  tl.setUrl(URLS.editor);
  tl.setVar("intro", 1); // the editor fades in

  // Format > Page orientation: the dialog opens with Portrait selected
  await tl.at(800);
  tl.showCaption(CAPTIONS.orientation);
  await clickFormatMenu(tl);
  await chooseFormatItem(tl, "orientation");

  // The "Apply to" box
  await tl.at(4000);
  tl.showCaption(CAPTIONS.applyTo);
  await tl.moveCursorTo("[data-tl=po-apply-to]", { ms: 800 });
  tl.highlight("[data-tl=po-apply-to]");

  // Landscape, then OK: the page becomes wide
  await tl.at(6500);
  tl.clearHighlight();
  tl.showCaption(CAPTIONS.landscape);
  await chooseOrientation(tl, "landscape");
  await tl.at(9500);
  tl.showCaption(CAPTIONS.ok);
  await clickOrientationOk(tl);

  // Look at the wide page
  await tl.at(13000);
  tl.showCaption(CAPTIONS.wide);
  tl.highlight("[data-tl=editor-page]");

  // Switch back to Portrait
  await tl.at(16500);
  tl.clearHighlight();
  tl.showCaption(CAPTIONS.back);
  await clickFormatMenu(tl);
  await chooseFormatItem(tl, "orientation");
  await tl.at(19500);
  await chooseOrientation(tl, "portrait");
  await tl.wait(300);
  await clickOrientationOk(tl);

  // Hold, then the quick white fade
  await tl.at(24000);
  tl.hideCaption();
  await tl.at(26600);
  tl.setVar("fade", true);
  await tl.at(STEP37_DURATION_MS);
}
