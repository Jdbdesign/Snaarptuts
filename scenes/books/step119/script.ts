import type { Timeline } from "@/lib/timeline";
import {
  beginBooks,
  finishBooks,
  pressOn,
  ring,
} from "@/components/books/books-timeline";
import { BOOKS_URLS } from "@/components/books/books-data";
import { STEP119_CAPTIONS } from "./data";

export const STEP119_DURATION_MS = 7700;

export async function runStep119(tl: Timeline) {
  tl.setVar("__sceneId", "step119");
  beginBooks(tl, BOOKS_URLS.newPayment, "new-payment", [0.45, 0.35]);

  await tl.wait(400);
  tl.showCaption(STEP119_CAPTIONS.selectCustomer);
  await pressOn(tl, "[data-tl=select-payment-customer]");
  tl.setVar("booksPaymentCustomer", "Acme Foods Ltd");

  await tl.wait(600);
  tl.showCaption(STEP119_CAPTIONS.invoicesLoaded);
  await ring(tl, "[data-tl=row-unpaid-inv-1]", 1200);

  await tl.wait(800);
  await finishBooks(tl, STEP119_DURATION_MS);
}
