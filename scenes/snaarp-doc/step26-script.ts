import { initEditor, SAMPLE_EDITOR } from "@/components/docs/editor-timeline";
import { chooseInsertSub, clickInsertMenu, hoverInsertItem } from "@/components/docs/insert-menu-timeline";
import { closeWatermarkPanel, typeWatermark } from "@/components/docs/insert-timeline";
import type { Timeline } from "@/lib/timeline";
import { CAPTIONS, URLS, WATERMARK_TEXT } from "./step26-data";

/** Snaarp Doc, step 26 - Add a watermark. Times are active milliseconds from the start of the step. */
export const STEP26_DURATION_MS = 27000;

export async function runStep26(tl: Timeline) {
  initEditor(tl, SAMPLE_EDITOR);
  tl.placeCursor(0.5, 0.45); // middle of the page
  tl.setUrl(URLS.editor);
  tl.setVar("intro", 1); // the editor fades in

  // Insert > Page elements > Watermark: the panel slides in from the right and the page shifts left
  await tl.at(800);
  tl.showCaption(CAPTIONS.open);
  await clickInsertMenu(tl);
  await hoverInsertItem(tl, "page-elements");
  await chooseInsertSub(tl, "watermark");

  // The Text tab is already selected
  await tl.at(4500);
  tl.showCaption(CAPTIONS.text);
  tl.highlight("[data-tl=wm-tab-text]");

  // Type the watermark text: it appears diagonally across the page as you type
  await tl.at(6000);
  tl.clearHighlight();
  tl.showCaption(CAPTIONS.type);
  await typeWatermark(tl, WATERMARK_TEXT);

  // Transparency (hover only)
  await tl.at(11000);
  tl.showCaption(CAPTIONS.transparency);
  await tl.moveCursorTo("[data-tl=wm-slider]", { ms: 800 });
  tl.highlight("[data-tl=wm-slider]");

  // Diagonal / Horizontal (hover only: the frames never change the layout)
  await tl.at(14000);
  tl.clearHighlight();
  tl.showCaption(CAPTIONS.layout);
  await tl.moveCursorTo("[data-tl=wm-radio-horizontal]", { ms: 700 });
  tl.hover("[data-tl=wm-radio-horizontal]");
  await tl.wait(900);
  await tl.moveCursorTo("[data-tl=wm-radio-diagonal]", { ms: 600 });
  tl.hover("[data-tl=wm-radio-diagonal]");

  // Remove watermark (hover only)
  await tl.at(17000);
  tl.showCaption(CAPTIONS.remove);
  await tl.moveCursorTo("[data-tl=wm-remove]", { ms: 900 });
  tl.hover("[data-tl=wm-remove]");

  // Close the panel: the page returns to the centre and the watermark stays
  await tl.at(20000);
  tl.hover(null);
  tl.showCaption(CAPTIONS.close);
  await tl.moveCursorTo("[data-tl=wm-close]", { ms: 900 });
  tl.highlight("[data-tl=wm-close]");
  await tl.wait(200);
  await tl.click("[data-tl=wm-close]");
  tl.clearHighlight();
  closeWatermarkPanel(tl);

  // Hold, then the quick white fade
  await tl.at(23500);
  tl.hideCaption();
  await tl.at(26600);
  tl.setVar("fade", true);
  await tl.at(STEP26_DURATION_MS);
}
