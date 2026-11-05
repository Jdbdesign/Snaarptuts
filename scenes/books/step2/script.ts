import type { Timeline } from "@/lib/timeline";
import {
  beginBooks,
  finishBooks,
  hoverOn,
  ring,
} from "@/components/books/books-timeline";
import { BOOKS_URLS } from "@/components/books/books-data";
import { CAPTIONS } from "./data";

export const STEP2_DURATION_MS = 10000;

export async function runStep2(tl: Timeline) {
  beginBooks(tl, BOOKS_URLS.dashboard, "home", [0.45, 0.25]);

  await tl.at(400);
  tl.showCaption(CAPTIONS.greeting);
  await hoverOn(tl, "[data-tl=home-greeting-section]", { ms: 500 });
  await ring(tl, "[data-tl=home-greeting-section]", 1400);

  // Receivables
  tl.showCaption(CAPTIONS.receivables);
  await hoverOn(tl, "[data-tl=val-receivables-unpaid]", { ms: 500 });
  await ring(tl, "[data-tl=card-total-receivables]", 1800);

  tl.showCaption(CAPTIONS.receivablesSplit);
  await hoverOn(tl, "[data-tl=val-receivables-overdue]", { ms: 400 });
  await tl.wait(1400);

  // Payables
  tl.showCaption(CAPTIONS.payables);
  await hoverOn(tl, "[data-tl=val-payables-unpaid]", { ms: 500 });
  await ring(tl, "[data-tl=card-total-payables]", 1800);

  tl.showCaption(CAPTIONS.payablesSplit);
  await hoverOn(tl, "[data-tl=val-payables-overdue]", { ms: 400 });
  await tl.wait(1400);

  await finishBooks(tl, STEP2_DURATION_MS);
}
