import type { Timeline } from "@/lib/timeline";
import {
  beginBooks,
  finishBooks,
  pressOn,
  ring,
} from "@/components/books/books-timeline";
import { BOOKS_URLS, INITIAL_INVOICES } from "@/components/books/books-data";
import { STEP62_CAPTIONS } from "./data";

export const STEP62_DURATION_MS = 8500;

export async function runStep62(tl: Timeline) {
  tl.setVar("__sceneId", "step62");
  beginBooks(tl, BOOKS_URLS.invoiceDetails, "invoice-detail", [0.94, 0.15]);
  tl.setVar("booksActiveInvoice", INITIAL_INVOICES[3]); // INV10006

  await tl.wait(400);
  tl.showCaption(STEP62_CAPTIONS.clickEdit);
  await pressOn(tl, "[data-tl=btn-edit-invoice]");

  tl.setVar("booksView", "edit-invoice");
  tl.setUrl(BOOKS_URLS.editInvoice);

  await tl.wait(500);
  tl.showCaption(STEP62_CAPTIONS.addDelivery);
  await pressOn(tl, "[data-tl=btn-edit-add-row]");

  await tl.wait(500);
  tl.showCaption(STEP62_CAPTIONS.applyDiscount);
  await pressOn(tl, "[data-tl=input-edit-discount]");
  await tl.typeText("[data-tl=input-edit-discount]", "5");

  await tl.wait(600);
  tl.showCaption(STEP62_CAPTIONS.saveChanges);
  await pressOn(tl, "[data-tl=btn-save-invoice-changes]");

  await tl.wait(800);
  await ring(tl, "[data-tl=invoice-detail-title]", 1200);

  await finishBooks(tl, STEP62_DURATION_MS);
}
