import type { Timeline } from "@/lib/timeline";
import {
  beginBooks,
  finishBooks,
  pressOn,
  ring,
} from "@/components/books/books-timeline";
import { BOOKS_URLS, INITIAL_INVOICES } from "@/components/books/books-data";
import { STEP64_CAPTIONS } from "./data";

export const STEP64_DURATION_MS = 6500;

export async function runStep64(tl: Timeline) {
  tl.setVar("__sceneId", "step64");
  beginBooks(tl, BOOKS_URLS.invoiceDetails, "invoice-detail", [0.97, 0.15]);
  tl.setVar("booksActiveInvoice", INITIAL_INVOICES[5]); // INV10000

  await tl.wait(400);
  tl.showCaption(STEP64_CAPTIONS.clickDelete);
  await pressOn(tl, "[data-tl=btn-delete-invoice]");

  await tl.wait(500);
  tl.showCaption(STEP64_CAPTIONS.confirmDelete);
  await pressOn(tl, "[data-tl=btn-confirm-invoice-delete]");

  await tl.wait(800);
  tl.showCaption(STEP64_CAPTIONS.deletedSuccess);
  await ring(tl, "[data-tl=card-invoices-table]", 1200);

  await finishBooks(tl, STEP64_DURATION_MS);
}
