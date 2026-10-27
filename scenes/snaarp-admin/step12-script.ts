import type { Timeline } from "@/lib/timeline";
import { clickAway, hoverOn, press } from "./script-helpers";
import { CAPTIONS, URL_USERS } from "./steps-data";

/** Snaarp Admin, step 12 - Filter users by department (the last step). Times are active milliseconds from the start of the step. */
export const STEP12_DURATION_MS = 32000;

export async function runStep12(tl: Timeline) {
  tl.placeCursor(0.5, 0.45);
  tl.setUrl(URL_USERS);

  await tl.at(500);
  tl.showCaption(CAPTIONS.openDept);
  await press(tl, "[data-tl=filter-dept]", { ms: 1100 });
  await tl.wait(900);

  await tl.at(5000);
  tl.showCaption(CAPTIONS.tickDesign);
  await hoverOn(tl, "[data-tl=dept-opt-design]", { ms: 900, hold: 500 });
  tl.highlight("[data-tl=dept-opt-design]");
  await tl.wait(400);
  await tl.click("[data-tl=dept-opt-design]");
  tl.clearHighlight();
  tl.hover(null);
  await tl.wait(800);
  await clickAway(tl);

  await tl.at(13000);
  tl.showCaption(CAPTIONS.onlyDesign);
  tl.highlight("[data-tl=users-table]");
  await tl.moveCursorTo("[data-tl=row-ada]", { ms: 900, dx: 100 });
  await tl.wait(4500);
  tl.clearHighlight();

  await tl.at(21000);
  tl.showCaption(CAPTIONS.clearDept);
  await press(tl, "[data-tl=btn-clear-filters]", { ms: 900 });
  await tl.wait(2500);
  await tl.at(STEP12_DURATION_MS);
}
