import type { Timeline } from "@/lib/timeline";
import {
  beginBooks,
  finishBooks,
  pressOn,
  ring,
} from "@/components/books/books-timeline";
import { BOOKS_URLS } from "@/components/books/books-data";
import { STEP55_CAPTIONS } from "./data";

export const STEP55_DURATION_MS = 6500;

export async function runStep55(tl: Timeline) {
  tl.setVar("__sceneId", "step55");
  beginBooks(tl, BOOKS_URLS.invoices, "invoices", [0.4, 0.2]);

  await tl.wait(400);
  tl.showCaption(STEP55_CAPTIONS.openFilter);
  await pressOn(tl, "[data-tl=btn-invoice-status-filter]");

  await tl.wait(400);
  tl.showCaption(STEP55_CAPTIONS.selectUnpaid);
  await pressOn(tl, "[data-tl=filter-invoice-status-unpaid]");

  await tl.wait(600);
  tl.showCaption(STEP55_CAPTIONS.viewFiltered);
  await ring(tl, "[data-tl=invoices-table-header]", 1500);
  await tl.wait(600);

  // Reset to all
  tl.setVar("booksInvoiceFilter", "all");

  await finishBooks(tl, STEP55_DURATION_MS);
}
