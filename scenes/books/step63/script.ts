import type { Timeline } from "@/lib/timeline";
import {
  beginBooks,
  finishBooks,
  ring,
} from "@/components/books/books-timeline";
import { BOOKS_URLS, INITIAL_INVOICES } from "@/components/books/books-data";
import { STEP63_CAPTIONS } from "./data";

export const STEP63_DURATION_MS = 6500;

export async function runStep63(tl: Timeline) {
  tl.setVar("__sceneId", "step63");
  beginBooks(tl, BOOKS_URLS.invoiceDetails, "invoice-detail", [0.5, 0.4]);
  tl.setVar("booksActiveInvoice", INITIAL_INVOICES[4]); // INV10003

  await tl.wait(400);
  tl.showCaption(STEP63_CAPTIONS.viewPlan);
  await tl.scrollTo("[data-scroller=true]", 320);

  await tl.wait(600);
  tl.showCaption(STEP63_CAPTIONS.installments);
  await ring(tl, "[data-tl=card-payment-plan]", 1800);
  await tl.wait(800);

  await finishBooks(tl, STEP63_DURATION_MS);
}
