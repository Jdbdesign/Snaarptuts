import type { Timeline } from "@/lib/timeline";
import { clickAway, hoverOn, press } from "./script-helpers";
import { CAPTIONS, SEARCH_PRIYA, URL_USERS } from "./steps-data";

/** Snaarp Admin, step 7 - Add a product to a user (Priya Shah, 6 products to 7). Times are active milliseconds from the start of the step. */
export const STEP7_DURATION_MS = 40000;

const LIST = "[data-tl=pp-scroll]";

export async function runStep7(tl: Timeline) {
  tl.placeCursor(0.5, 0.45);
  tl.setUrl(URL_USERS);

  await tl.at(500);
  tl.showCaption(CAPTIONS.findPriya);
  await tl.fill("[data-tl=field-usersearch]", "usersearch", SEARCH_PRIYA, { moveMs: 1000, msPerChar: 130 });
  tl.setVar("focus", "");
  await tl.wait(1200);

  await tl.at(6500);
  tl.showCaption(CAPTIONS.openProducts);
  await press(tl, "[data-tl=products-priya]", { ms: 1000 });
  await tl.wait(1500);

  await tl.at(11500);
  tl.showCaption(CAPTIONS.scrollAdd);
  await tl.moveCursorTo("[data-tl=pp-item-crm]", { ms: 700 });
  await tl.scrollPanelTo(LIST, "[data-tl=pp-other-books]", 1500);
  await tl.wait(500);

  await tl.at(16500);
  tl.showCaption(CAPTIONS.addBooks);
  await hoverOn(tl, "[data-tl=pp-add-books]", { ms: 900, hold: 400 });
  tl.highlight("[data-tl=pp-add-books]");
  await tl.wait(500);
  await tl.click("[data-tl=pp-add-books]");
  tl.clearHighlight();
  tl.hover(null);
  await tl.wait(1500);

  await tl.at(24000);
  tl.showCaption(CAPTIONS.addedBooks);
  await clickAway(tl);
  tl.highlight("[data-tl=products-priya]");
  await tl.moveCursorTo("[data-tl=products-priya]", { ms: 800 });
  await tl.wait(3500);
  tl.clearHighlight();
  await tl.at(STEP7_DURATION_MS);
}
