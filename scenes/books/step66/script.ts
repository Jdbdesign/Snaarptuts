import type { Timeline } from "@/lib/timeline";
import {
  beginBooks,
  finishBooks,
  pressOn,
  ring,
} from "@/components/books/books-timeline";
import { BOOKS_URLS } from "@/components/books/books-data";
import { STEP66_CAPTIONS } from "./data";

export const STEP66_DURATION_MS = 17800;

export async function runStep66(tl: Timeline) {
  tl.setVar("__sceneId", "step66");
  beginBooks(tl, BOOKS_URLS.newInvoice, "new-invoice", [0.45, 0.25]);
  tl.setVar("booksInvoiceCustomer", "Sterling Interiors");

  await tl.wait(400);
  tl.showCaption(STEP66_CAPTIONS.clickGear);
  await pressOn(tl, "[data-tl=btn-configure-numbering]");

  await tl.wait(500);
  tl.showCaption(STEP66_CAPTIONS.typeNumber);
  await pressOn(tl, "[data-tl=input-invoice-next-number]");
  tl.setVar("booksInvoiceNextNumber", "10013");

  await tl.wait(500);
  tl.showCaption(STEP66_CAPTIONS.saveNumbering);
  await pressOn(tl, "[data-tl=btn-save-invoice-numbering]");

  await tl.wait(800);
  await ring(tl, "[data-tl=input-invoice-number]", 1200);

  await finishBooks(tl, STEP66_DURATION_MS);
}
