import type { Timeline } from "@/lib/timeline";
import { clickAway, hoverOn, press } from "./script-helpers";
import { CAPTIONS, SEARCH_ALEX, URL_USERS } from "./steps-data";

/** Snaarp Admin, step 8 - Remove a product from a user (Alex Morgan, 6 products to 5). Times are active milliseconds from the start of the step. */
export const STEP8_DURATION_MS = 36000;

export async function runStep8(tl: Timeline) {
  tl.placeCursor(0.5, 0.45);
  tl.setUrl(URL_USERS);

  await tl.at(500);
  tl.showCaption(CAPTIONS.findAlex);
  await tl.fill("[data-tl=field-usersearch]", "usersearch", SEARCH_ALEX, { moveMs: 1000, msPerChar: 130 });
  tl.setVar("focus", "");
  await tl.wait(1200);

  await tl.at(6500);
  tl.showCaption(CAPTIONS.openProducts);
  await press(tl, "[data-tl=products-alex]", { ms: 1000 });
  await tl.wait(1500);

  await tl.at(11500);
  tl.showCaption(CAPTIONS.removeBooks);
  await hoverOn(tl, "[data-tl=pp-remove-books]", { ms: 900, hold: 500 });
  tl.highlight("[data-tl=pp-remove-books]");
  await tl.wait(500);
  await tl.click("[data-tl=pp-remove-books]");
  tl.clearHighlight();
  tl.hover(null);
  await tl.wait(1800);

  await tl.at(20500);
  tl.showCaption(CAPTIONS.removedBooks);
  await clickAway(tl);
  tl.highlight("[data-tl=products-alex]");
  await tl.moveCursorTo("[data-tl=products-alex]", { ms: 800 });
  await tl.wait(3500);
  tl.clearHighlight();
  await tl.at(STEP8_DURATION_MS);
}
