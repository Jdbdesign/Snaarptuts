import type { Timeline } from "@/lib/timeline";
import { press } from "./script-helpers";
import { CAPTIONS, FIX_EMAIL, MANUAL_ROW, URL_USERS } from "./steps-data";

/** Snaarp Admin, step 5 - Add many users with Bulk user. Times are active milliseconds from the start of the step. */
export const STEP5_DURATION_MS = 52000;

const SCROLL = "[data-tl=bulk-scroll]";

export async function runStep5(tl: Timeline) {
  tl.placeCursor(0.5, 0.4);
  tl.setUrl(URL_USERS);

  await tl.at(500);
  tl.showCaption(CAPTIONS.bulkOpen);
  await press(tl, "[data-tl=btn-bulk-user]", { ms: 1100 });
  await tl.wait(900);

  await tl.at(4000);
  tl.showCaption(CAPTIONS.bulkTemplate);
  await press(tl, "[data-tl=btn-csv-template]", { ms: 1000 });
  await tl.wait(1400);

  await tl.at(8500);
  tl.showCaption(CAPTIONS.bulkChoose);
  await press(tl, "[data-tl=btn-choose-file]", { ms: 900 });
  await tl.wait(900);
  await tl.scrollPanelTo(SCROLL, "bottom", 700);

  await tl.at(14000);
  tl.showCaption(CAPTIONS.bulkReview);
  tl.highlight("[data-tl=bulk-row-r3]");
  await tl.moveCursorTo("[data-tl=bulk-row-r3]", { ms: 900, dx: -150 });
  await tl.wait(2200);
  tl.clearHighlight();

  await tl.at(18500);
  tl.showCaption(CAPTIONS.bulkFix);
  await tl.fill("[data-tl=field-bulk-r3-email]", "bulk-r3-email", FIX_EMAIL, { moveMs: 800, msPerChar: 55 });
  tl.setVar("focus", "");
  await tl.wait(1200);

  await tl.at(24500);
  tl.showCaption(CAPTIONS.bulkAddRow);
  await tl.scrollPanelTo(SCROLL, "top", 500);
  await press(tl, "[data-tl=btn-add-row]", { ms: 900 });
  await tl.wait(500);
  await tl.scrollPanelTo(SCROLL, "bottom", 600);

  await tl.at(29500);
  tl.showCaption(CAPTIONS.bulkManual);
  await tl.fill("[data-tl=field-bulk-m4-email]", "bulk-m4-email", MANUAL_ROW.email, { moveMs: 800, msPerChar: 50 });
  await tl.fill("[data-tl=field-bulk-m4-first]", "bulk-m4-first", MANUAL_ROW.first, { moveMs: 500, msPerChar: 70 });
  await tl.fill("[data-tl=field-bulk-m4-last]", "bulk-m4-last", MANUAL_ROW.last, { moveMs: 450, msPerChar: 70 });
  tl.setVar("focus", "");
  await tl.wait(900);

  await tl.at(39000);
  tl.showCaption(CAPTIONS.bulkCreate);
  await press(tl, "[data-tl=btn-bulk-create]", { ms: 1000 });
  await tl.wait(1200);

  await tl.at(44000);
  tl.showCaption(CAPTIONS.bulkDone);
  tl.highlight("[data-tl=row-ines]");
  await tl.moveCursorTo("[data-tl=row-ines]", { ms: 900, dx: 120 });
  await tl.wait(3500);
  tl.clearHighlight();
  await tl.at(STEP5_DURATION_MS);
}
