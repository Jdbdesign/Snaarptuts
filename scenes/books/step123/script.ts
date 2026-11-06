import type { Timeline } from "@/lib/timeline";
import {
  beginBooks,
  finishBooks,
  pressOn,
  scrollView,
} from "@/components/books/books-timeline";
import { BOOKS_URLS } from "@/components/books/books-data";
import { STEP123_CAPTIONS } from "./data";

export const STEP123_DURATION_MS = 8000;

export async function runStep123(tl: Timeline) {
  tl.setVar("__sceneId", "step123");
  beginBooks(tl, BOOKS_URLS.newPayment, "new-payment", [0.5, 0.6]);
  tl.setVar("booksPaymentCustomer", "Acme Foods Ltd");
  tl.setVar("booksPaymentAmount", "500.00");

  await scrollView(tl, 400);

  await tl.wait(400);
  tl.showCaption(STEP123_CAPTIONS.addNotes);
  await pressOn(tl, "[data-tl=textarea-payment-notes]");
  tl.setVar("booksPaymentNotes", "Payment received in full via bank transfer");

  await tl.wait(500);
  tl.showCaption(STEP123_CAPTIONS.attachProof);
  await pressOn(tl, "[data-tl=btn-payment-upload-file]");
  await tl.wait(400);
  await pressOn(tl, "[data-tl=file-option-remittance-advice]");
  await pressOn(tl, "[data-tl=btn-attach-payment-file]");

  await tl.wait(500);
  tl.showCaption(STEP123_CAPTIONS.sendThankYou);
  await pressOn(tl, "[data-tl=checkbox-payment-thank-you]");

  await tl.wait(800);
  await finishBooks(tl, STEP123_DURATION_MS);
}
