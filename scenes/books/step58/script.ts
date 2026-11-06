import type { Timeline } from "@/lib/timeline";
import {
  beginBooks,
  finishBooks,
  pressOn,
  ring,
} from "@/components/books/books-timeline";
import { BOOKS_URLS, INITIAL_INVOICES } from "@/components/books/books-data";
import { STEP58_CAPTIONS } from "./data";

export const STEP58_DURATION_MS = 6000;

export async function runStep58(tl: Timeline) {
  tl.setVar("__sceneId", "step58");
  beginBooks(tl, BOOKS_URLS.invoiceDetails, "invoice-detail", [0.65, 0.15]);
  tl.setVar("booksActiveInvoice", INITIAL_INVOICES[1]); // INV10008

  await tl.wait(400);
  tl.showCaption(STEP58_CAPTIONS.clickSend);
  await pressOn(tl, "[data-tl=btn-send-invoice]");

  await tl.wait(1000);
  tl.showCaption(STEP58_CAPTIONS.sentSuccess);
  await ring(tl, "[data-tl=invoice-detail-status]", 1500);
  await tl.wait(800);

  await finishBooks(tl, STEP58_DURATION_MS);
}
