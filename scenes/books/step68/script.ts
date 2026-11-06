import type { Timeline } from "@/lib/timeline";
import {
  beginBooks,
  finishBooks,
  pressOn,
  ring,
} from "@/components/books/books-timeline";
import { BOOKS_URLS } from "@/components/books/books-data";
import { STEP68_CAPTIONS } from "./data";

export const STEP68_DURATION_MS = 7000;

export async function runStep68(tl: Timeline) {
  tl.setVar("__sceneId", "step68");
  beginBooks(tl, BOOKS_URLS.newInvoice, "new-invoice", [0.45, 0.45]);
  tl.setVar("booksInvoiceCustomer", "Sterling Interiors");
  tl.setVar("booksInvoiceNumber", "INV10013");
  tl.setVar("booksInvoiceOrderNumber", "PO-8820");
  tl.setVar("booksInvoiceTerms", "Net 30");

  await tl.wait(400);
  tl.showCaption(STEP68_CAPTIONS.chooseSalesperson);
  await pressOn(tl, "[data-tl=select-invoice-salesperson]");
  await tl.wait(300);
  await pressOn(tl, "[data-tl=salesperson-opt-sam-taylor]");

  await tl.wait(500);
  tl.showCaption(STEP68_CAPTIONS.typeSubject);
  await pressOn(tl, "[data-tl=input-invoice-subject]");
  await tl.typeText(
    "[data-tl=input-invoice-subject]",
    "Office furniture and supplies order"
  );
  tl.setVar(
    "booksInvoiceSubject",
    "Office furniture and supplies order"
  );

  await tl.wait(600);
  await ring(tl, "[data-tl=input-invoice-subject]", 1200);

  await finishBooks(tl, STEP68_DURATION_MS);
}
