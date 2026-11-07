import type { Timeline } from "@/lib/timeline";
import {
  beginBooks,
  finishBooks,
  pressOn,
} from "@/components/books/books-timeline";
import { BOOKS_URLS, INITIAL_PAYMENTS } from "@/components/books/books-data";
import { STEP125_CAPTIONS } from "./data";

export const STEP125_DURATION_MS = 11500;

export async function runStep125(tl: Timeline) {
  tl.setVar("__sceneId", "step125");
  beginBooks(tl, BOOKS_URLS.paymentsReceived, "payments", [0.9, 0.45]);
  tl.setVar("booksActivePayment", INITIAL_PAYMENTS[1]);

  await tl.wait(400);
  tl.showCaption(STEP125_CAPTIONS.deletePayment);
  await pressOn(tl, "[data-tl=btn-delete-payment-pay-2]");

  await tl.wait(600);
  tl.showCaption(STEP125_CAPTIONS.confirmDelete);
  await pressOn(tl, "[data-tl=btn-confirm-payment-delete]");

  await tl.wait(1000);
  await finishBooks(tl, STEP125_DURATION_MS);
}
