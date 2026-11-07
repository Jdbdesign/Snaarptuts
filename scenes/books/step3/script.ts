import type { Timeline } from "@/lib/timeline";
import {
  beginBooks,
  finishBooks,
  hoverOn,
  pressOn,
  ring,
} from "@/components/books/books-timeline";
import { BOOKS_URLS } from "@/components/books/books-data";
import { CAPTIONS } from "./data";

export const STEP3_DURATION_MS = 21000;

export async function runStep3(tl: Timeline) {
  beginBooks(tl, BOOKS_URLS.dashboard, "home", [0.45, 0.4]);

  await tl.at(400);
  tl.showCaption(CAPTIONS.cashFlowIntro);
  await hoverOn(tl, "[data-tl=card-cash-flow]", { ms: 500 });
  await ring(tl, "[data-tl=card-cash-flow]", 1800);

  // Open period dropdown
  tl.showCaption(CAPTIONS.openPeriod);
  await pressOn(tl, "[data-tl=btn-cash-flow-period]");
  await tl.wait(500);

  // Pick Last Month
  tl.showCaption(CAPTIONS.pickLastMonth);
  await pressOn(tl, "[data-tl=opt-period-last-month]");
  await tl.wait(1200);

  // Open period dropdown again
  await pressOn(tl, "[data-tl=btn-cash-flow-period]");
  await tl.wait(500);

  // Pick This Quarter
  tl.showCaption(CAPTIONS.pickThisQuarter);
  await pressOn(tl, "[data-tl=opt-period-this-quarter]");
  await tl.wait(1200);

  // Open period dropdown again
  await pressOn(tl, "[data-tl=btn-cash-flow-period]");
  await tl.wait(500);

  // Back to This Month
  tl.showCaption(CAPTIONS.backThisMonth);
  await pressOn(tl, "[data-tl=opt-period-this-month]");
  await tl.wait(1000);

  // Hover over week 3 bar group to show tooltip
  tl.showCaption(CAPTIONS.hoverTooltip);
  await hoverOn(tl, "[data-tl=bar-group-2]", { ms: 500 });
  tl.setVar("booksCashFlowHoveredBar", 2);
  await tl.wait(2200);

  await finishBooks(tl, STEP3_DURATION_MS);
}
