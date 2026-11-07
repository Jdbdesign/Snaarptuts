import type { Timeline } from "@/lib/timeline";
import {
  beginBooks,
  finishBooks,
  pressOn,
  ring,
} from "@/components/books/books-timeline";
import { BOOKS_URLS, INITIAL_PAYMENTS } from "@/components/books/books-data";
import { STEP113_CAPTIONS } from "./data";

export const STEP113_DURATION_MS = 8200;

export async function runStep113(tl: Timeline) {
  tl.setVar("__sceneId", "step113");
  beginBooks(tl, BOOKS_URLS.paymentsReceived, "payments", [0.45, 0.35]);
  tl.setVar("booksActivePayment", INITIAL_PAYMENTS[1]);

  await tl.wait(400);
  tl.showCaption(STEP113_CAPTIONS.clickRow);
  await pressOn(tl, "[data-tl=link-payment-pay-2]");

  await tl.wait(600);
  tl.showCaption(STEP113_CAPTIONS.viewDetails);
  await ring(tl, "[data-tl=text-payment-title]", 1200);

  await tl.wait(800);
  await finishBooks(tl, STEP113_DURATION_MS);
}
