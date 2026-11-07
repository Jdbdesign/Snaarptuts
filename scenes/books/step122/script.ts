import type { Timeline } from "@/lib/timeline";
import {
  beginBooks,
  finishBooks,
  pressOn,
  ring,
} from "@/components/books/books-timeline";
import { BOOKS_URLS } from "@/components/books/books-data";
import { STEP122_CAPTIONS } from "./data";

export const STEP122_DURATION_MS = 8800;

export async function runStep122(tl: Timeline) {
  tl.setVar("__sceneId", "step122");
  beginBooks(tl, BOOKS_URLS.newPayment, "new-payment", [0.5, 0.55]);
  tl.setVar("booksPaymentCustomer", "Acme Foods Ltd");
  tl.setVar("booksPaymentAmount", "500.00");
  tl.setVar("booksPaymentMode", "Bank Transfer");
  tl.setVar("booksPaymentReference", "REF-2026-PAY");

  await tl.wait(400);
  tl.showCaption(STEP122_CAPTIONS.applyPayment);
  await pressOn(tl, "[data-tl=input-payment-applied-amount-0]");
  tl.setVar("booksPaymentAppliedAmount", "500.00");

  await tl.wait(600);
  tl.showCaption(STEP122_CAPTIONS.checkExcess);
  await ring(tl, "[data-tl=alert-amount-in-excess]", 1200);

  await tl.wait(800);
  await finishBooks(tl, STEP122_DURATION_MS);
}
