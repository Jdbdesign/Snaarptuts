import type { Timeline } from "@/lib/timeline";
import {
  beginBooks,
  finishBooks,
  pressOn,
} from "@/components/books/books-timeline";
import { BOOKS_URLS } from "@/components/books/books-data";
import { STEP120_CAPTIONS } from "./data";

export const STEP120_DURATION_MS = 6000;

export async function runStep120(tl: Timeline) {
  tl.setVar("__sceneId", "step120");
  beginBooks(tl, BOOKS_URLS.newPayment, "new-payment", [0.65, 0.35]);
  tl.setVar("booksPaymentCustomer", "Acme Foods Ltd");

  await tl.wait(400);
  tl.showCaption(STEP120_CAPTIONS.enterAmount);
  await pressOn(tl, "[data-tl=input-payment-amount]");
  tl.setVar("booksPaymentAmount", "500.00");

  await tl.wait(600);
  tl.showCaption(STEP120_CAPTIONS.enterBankCharges);
  await pressOn(tl, "[data-tl=input-payment-bank-charges]");
  tl.setVar("booksPaymentBankCharges", "0.00");

  await tl.wait(800);
  await finishBooks(tl, STEP120_DURATION_MS);
}
