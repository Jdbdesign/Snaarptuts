import type { Timeline } from "@/lib/timeline";
import {
  beginBooks,
  finishBooks,
  pressOn,
} from "@/components/books/books-timeline";
import { BOOKS_URLS } from "@/components/books/books-data";
import { STEP121_CAPTIONS } from "./data";

export const STEP121_DURATION_MS = 19700;

export async function runStep121(tl: Timeline) {
  tl.setVar("__sceneId", "step121");
  beginBooks(tl, BOOKS_URLS.newPayment, "new-payment", [0.45, 0.45]);
  tl.setVar("booksPaymentCustomer", "Acme Foods Ltd");
  tl.setVar("booksPaymentAmount", "500.00");

  await tl.wait(400);
  tl.showCaption(STEP121_CAPTIONS.configNumbering);
  await pressOn(tl, "[data-tl=btn-payment-numbering]");
  await tl.wait(400);
  await pressOn(tl, "[data-tl=btn-save-payment-numbering]");

  await tl.wait(400);
  await pressOn(tl, "[data-tl=select-payment-mode]");
  tl.setVar("booksPaymentMode", "Bank Transfer");

  await tl.wait(400);
  tl.showCaption(STEP121_CAPTIONS.enterRef);
  await pressOn(tl, "[data-tl=input-payment-reference]");
  tl.setVar("booksPaymentReference", "REF-2026-PAY");

  await tl.wait(800);
  await finishBooks(tl, STEP121_DURATION_MS);
}
