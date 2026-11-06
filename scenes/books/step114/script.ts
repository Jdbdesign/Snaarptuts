import type { Timeline } from "@/lib/timeline";
import {
  beginBooks,
  finishBooks,
  pressOn,
} from "@/components/books/books-timeline";
import { BOOKS_URLS, INITIAL_PAYMENTS } from "@/components/books/books-data";
import { STEP114_CAPTIONS } from "./data";

export const STEP114_DURATION_MS = 5500;

export async function runStep114(tl: Timeline) {
  tl.setVar("__sceneId", "step114");
  beginBooks(tl, BOOKS_URLS.paymentDetails, "payment-details", [0.55, 0.25]);
  tl.setVar("booksActivePayment", INITIAL_PAYMENTS[1]);

  await tl.wait(400);
  tl.showCaption(STEP114_CAPTIONS.sendReceipt);
  await pressOn(tl, "[data-tl=btn-send-payment-receipt]");

  await tl.wait(600);
  tl.showCaption(STEP114_CAPTIONS.receiptSent);

  await tl.wait(1000);
  await finishBooks(tl, STEP114_DURATION_MS);
}
