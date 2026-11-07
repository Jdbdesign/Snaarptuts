import type { Timeline } from "@/lib/timeline";
import {
  beginBooks,
  finishBooks,
  pressOn,
  ring,
  scrollView,
} from "@/components/books/books-timeline";
import { BOOKS_URLS } from "@/components/books/books-data";
import { STEP124_CAPTIONS } from "./data";

export const STEP124_DURATION_MS = 12800;

export async function runStep124(tl: Timeline) {
  tl.setVar("__sceneId", "step124");
  beginBooks(tl, BOOKS_URLS.newPayment, "new-payment", [0.75, 0.8]);
  tl.setVar("booksPaymentCustomer", "Acme Foods Ltd");
  tl.setVar("booksPaymentAmount", "500.00");
  tl.setVar("booksPaymentMode", "Bank Transfer");

  await scrollView(tl, 450);

  await tl.wait(400);
  tl.showCaption(STEP124_CAPTIONS.savePaid);
  await pressOn(tl, "[data-tl=btn-save-payment-paid]");

  await tl.wait(1000);
  tl.showCaption(STEP124_CAPTIONS.recordSuccess);
  await ring(tl, "[data-tl=card-payments-table]", 1200);

  await tl.wait(800);
  await finishBooks(tl, STEP124_DURATION_MS);
}
