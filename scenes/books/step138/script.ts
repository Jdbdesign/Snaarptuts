import type { Timeline } from "@/lib/timeline";
import {
  beginBooks,
  finishBooks,
  pressOn,
} from "@/components/books/books-timeline";
import { BOOKS_URLS, INITIAL_VENDORS } from "@/components/books/books-data";
import { CAPTIONS } from "./data";

export const STEP138_DURATION_MS = 8000;

export async function runStep138(tl: Timeline) {
  beginBooks(tl, BOOKS_URLS.vendorDetails, "vendor-details", [0.45, 0.40]);
  tl.setVar("booksActiveVendor", INITIAL_VENDORS[0]);

  await tl.at(400);
  tl.showCaption(CAPTIONS.setTerms);
  await pressOn(tl, "[data-tl=select-vendor-payment-terms]");
  tl.setVar("booksVendorPaymentTerms", "Net 30");
  await tl.wait(600);

  tl.showCaption(CAPTIONS.addNotes);
  await pressOn(tl, "[data-tl=input-vendor-notes]");
  tl.setVar("booksVendorNotes", "Pays within 30 days");
  await tl.wait(700);

  tl.showCaption(CAPTIONS.clickUpdate);
  await pressOn(tl, "[data-tl=btn-update-vendor]");
  await tl.wait(1000);

  await finishBooks(tl, STEP138_DURATION_MS);
}
