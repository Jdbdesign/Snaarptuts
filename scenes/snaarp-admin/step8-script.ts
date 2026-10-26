import type { Timeline } from "@/lib/timeline";
import { CAPTIONS, PRODUCT_TO_ADD, URL } from "./step8-data";

/** Snaarp Admin, step 8 - Confirm the new access. Times are active milliseconds from the start of the step. */
export const STEP8_DURATION_MS = 17500;

export async function runStep8(tl: Timeline) {
  tl.placeCursor(0.5, 0.62);
  tl.setUrl(URL);

  // The new product is in the dialog's list
  await tl.at(400);
  tl.showCaption(CAPTIONS.added);
  tl.highlight(`[data-tl=mp-row-${PRODUCT_TO_ADD}]`);
  await tl.at(2800);
  tl.clearHighlight();

  // Close the dialog
  tl.showCaption(CAPTIONS.close);
  await tl.moveCursorTo("[data-tl=btn-close-manage]", { ms: 1000 });
  tl.highlight("[data-tl=btn-close-manage]");
  await tl.wait(350);
  await tl.click("[data-tl=btn-close-manage]");
  tl.clearHighlight();

  // The Products column
  await tl.at(6200);
  tl.showCaption(CAPTIONS.count);
  tl.highlight("[data-tl=products-sam]");
  await tl.at(8800);
  tl.clearHighlight();

  // Open it: Snaarp Books is there
  tl.showCaption(CAPTIONS.open);
  await tl.moveCursorTo("[data-tl=products-sam]", { ms: 800 });
  await tl.click("[data-tl=products-sam]");
  await tl.wait(500);
  tl.showCaption(CAPTIONS.done);
  tl.highlight(`[data-tl=products-item-${PRODUCT_TO_ADD}]`);
  await tl.moveCursorTo(`[data-tl=products-item-${PRODUCT_TO_ADD}]`, { ms: 700 });
  await tl.at(15400);
  tl.clearHighlight();
  await tl.at(STEP8_DURATION_MS);
}
