import type { Timeline } from "@/lib/timeline";
import { clickAway, hoverOn, press } from "./script-helpers";
import { CAPTIONS, SEARCH_NAME, URL_USERS } from "./steps-data";

/** Snaarp Admin, step 6 - Find users with filters and search. Times are active milliseconds from the start of the step. */
export const STEP6_DURATION_MS = 56000;

export async function runStep6(tl: Timeline) {
  tl.placeCursor(0.5, 0.45);
  tl.setUrl(URL_USERS);

  // Search box
  await tl.at(500);
  tl.showCaption(CAPTIONS.search);
  await tl.fill("[data-tl=field-usersearch]", "usersearch", SEARCH_NAME, { moveMs: 1000, msPerChar: 130 });
  tl.highlight("[data-tl=users-table]");
  await tl.wait(2200);
  tl.clearHighlight();
  tl.setVar("field:usersearch", "");
  tl.setVar("focus", "");

  // Department filter (multi-select)
  await tl.at(7500);
  tl.showCaption(CAPTIONS.dept);
  await press(tl, "[data-tl=filter-dept]", { ms: 900 });
  await tl.wait(500);
  await hoverOn(tl, "[data-tl=dept-opt-engineering]");
  await tl.click("[data-tl=dept-opt-engineering]");
  await tl.wait(500);
  await hoverOn(tl, "[data-tl=dept-opt-hr]", { hold: 300 });
  await tl.click("[data-tl=dept-opt-hr]");
  tl.hover(null);
  await tl.wait(500);
  await clickAway(tl);
  await tl.wait(2200);

  await tl.at(18500);
  tl.showCaption(CAPTIONS.deptClear);
  await press(tl, "[data-tl=btn-clear-filters]", { ms: 900 });
  await tl.wait(1200);

  // Product filter
  await tl.at(23500);
  tl.showCaption(CAPTIONS.product);
  await press(tl, "[data-tl=filter-product]", { ms: 900 });
  await tl.wait(500);
  await tl.moveCursorTo("[data-tl=product-opt-crm]", { ms: 600 });
  await tl.scrollPanelTo("[data-tl=product-filter-list]", "bottom", 1500);
  await tl.scrollPanelTo("[data-tl=product-filter-list]", "top", 900);
  await hoverOn(tl, "[data-tl=product-opt-books]");
  await tl.click("[data-tl=product-opt-books]");
  tl.hover(null);
  tl.highlight("[data-tl=users-table]");
  await tl.wait(2500);
  tl.clearHighlight();

  await tl.at(37000);
  tl.showCaption(CAPTIONS.productClear);
  await press(tl, "[data-tl=btn-clear-filters]", { ms: 900 });
  await tl.wait(1200);

  // Role dropdown on a row
  await tl.at(42500);
  tl.showCaption(CAPTIONS.role);
  await press(tl, "[data-tl=role-lena]", { ms: 1000 });
  await tl.wait(500);
  await hoverOn(tl, "[data-tl=role-opt-administrator]");
  await hoverOn(tl, "[data-tl=role-opt-super-administrator]", { hold: 700 });
  await clickAway(tl);
  await tl.at(STEP6_DURATION_MS);
}
