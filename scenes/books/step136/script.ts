import type { Timeline } from "@/lib/timeline";
import {
  beginBooks,
  finishBooks,
  pressOn,
  ring,
} from "@/components/books/books-timeline";
import { BOOKS_URLS } from "@/components/books/books-data";
import { CAPTIONS } from "./data";

export const STEP136_DURATION_MS = 8500;

export async function runStep136(tl: Timeline) {
  beginBooks(tl, BOOKS_URLS.vendors, "vendors", [0.45, 0.25]);

  await tl.at(400);
  tl.showCaption(CAPTIONS.typeSearch);
  await pressOn(tl, "[data-tl=input-vendors-search]");
  tl.setVar("booksVendorSearchQuery", "green");
  await tl.wait(800);

  tl.showCaption(CAPTIONS.clearSearch);
  tl.setVar("booksVendorSearchQuery", "");
  await tl.wait(600);

  tl.showCaption(CAPTIONS.filterInactive);
  await pressOn(tl, "[data-tl=select-vendors-status]");
  tl.setVar("booksVendorStatusFilter", "Inactive");
  await tl.wait(500);
  await ring(tl, "[data-tl=vendor-row-northgate]", 1200);

  tl.showCaption(CAPTIONS.restoreActive);
  await pressOn(tl, "[data-tl=select-vendors-status]");
  tl.setVar("booksVendorStatusFilter", "Active");
  await tl.wait(800);

  await finishBooks(tl, STEP136_DURATION_MS);
}
