import type { Timeline } from "@/lib/timeline";
import {
  beginBooks,
  finishBooks,
  pressOn,
  ring,
} from "@/components/books/books-timeline";
import { BOOKS_URLS } from "@/components/books/books-data";
import { STEP65_CAPTIONS } from "./data";

export const STEP65_DURATION_MS = 13500;

export async function runStep65(tl: Timeline) {
  tl.setVar("__sceneId", "step65");
  beginBooks(tl, BOOKS_URLS.invoices, "invoices", [0.94, 0.2]);

  await tl.wait(400);
  tl.showCaption(STEP65_CAPTIONS.clickNew);
  await pressOn(tl, "[data-tl=btn-new-invoice]");

  tl.setVar("booksView", "new-invoice");
  tl.setUrl(BOOKS_URLS.newInvoice);

  await tl.wait(500);
  tl.showCaption(STEP65_CAPTIONS.openCustomer);
  await pressOn(tl, "[data-tl=select-invoice-customer]");

  await tl.wait(500);
  tl.showCaption(STEP65_CAPTIONS.selectCustomer);
  await pressOn(tl, "[data-tl=customer-opt-sterling]");

  await tl.wait(600);
  await ring(tl, "[data-tl=select-invoice-customer]", 1200);

  await finishBooks(tl, STEP65_DURATION_MS);
}
