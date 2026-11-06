import type { Timeline } from "@/lib/timeline";
import {
  beginBooks,
  finishBooks,
  pressOn,
  ring,
} from "@/components/books/books-timeline";
import { BOOKS_URLS } from "@/components/books/books-data";
import { STEP112_CAPTIONS } from "./data";

export const STEP112_DURATION_MS = 5500;

export async function runStep112(tl: Timeline) {
  tl.setVar("__sceneId", "step112");
  beginBooks(tl, BOOKS_URLS.paymentsReceived, "payments", [0.35, 0.25]);

  await tl.wait(400);
  tl.showCaption(STEP112_CAPTIONS.search);
  await pressOn(tl, "[data-tl=input-search-payments]");
  tl.setVar("booksPaymentSearch", "Harvest");

  await tl.wait(600);
  tl.showCaption(STEP112_CAPTIONS.filtered);
  await ring(tl, "[data-tl=payment-row-pay-2]", 1200);

  await tl.wait(800);
  await finishBooks(tl, STEP112_DURATION_MS);
}
