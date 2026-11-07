import type { Timeline } from "@/lib/timeline";
import {
  beginBooks,
  finishBooks,
  pressOn,
  ring,
} from "@/components/books/books-timeline";
import { BOOKS_URLS, INITIAL_INVOICES } from "@/components/books/books-data";
import { STEP59_CAPTIONS } from "./data";

export const STEP59_DURATION_MS = 15000;

export async function runStep59(tl: Timeline) {
  tl.setVar("__sceneId", "step59");
  beginBooks(tl, BOOKS_URLS.invoiceDetails, "invoice-detail", [0.75, 0.15]);
  tl.setVar("booksActiveInvoice", INITIAL_INVOICES[1]); // INV10008

  await tl.wait(400);
  tl.showCaption(STEP59_CAPTIONS.clickMarkPaid);
  await pressOn(tl, "[data-tl=btn-mark-as-paid]");

  await tl.wait(500);
  tl.showCaption(STEP59_CAPTIONS.confirmDialog);
  await pressOn(tl, "[data-tl=btn-confirm-mark-paid]");

  await tl.wait(600);
  tl.showCaption(STEP59_CAPTIONS.paidUpdated);
  await ring(tl, "[data-tl=invoice-detail-status]", 1200);
  await ring(tl, "[data-tl=detail-balance-due]", 1200);
  await tl.wait(600);

  await finishBooks(tl, STEP59_DURATION_MS);
}
