import type { Timeline } from "@/lib/timeline";
import {
  beginBooks,
  finishBooks,
  pressOn,
  ring,
} from "@/components/books/books-timeline";
import { BOOKS_URLS } from "@/components/books/books-data";
import { CAPTIONS } from "./data";

export const STEP137_DURATION_MS = 8000;

export async function runStep137(tl: Timeline) {
  beginBooks(tl, BOOKS_URLS.vendors, "vendors", [0.45, 0.35]);

  await tl.at(400);
  tl.showCaption(CAPTIONS.openVendor);
  await pressOn(tl, "[data-tl=vendor-row-greenfield]");
  tl.setVar("booksView", "vendor-details");
  tl.setUrl(BOOKS_URLS.vendorDetails);
  await tl.wait(700);

  tl.showCaption(CAPTIONS.reviewFields);
  await ring(tl, "[data-tl=title-vendor-details]", 900);
  await ring(tl, "[data-tl=input-vendor-name]", 900);
  await ring(tl, "[data-tl=input-vendor-phone]", 900);

  tl.showCaption(CAPTIONS.checkDeactivate);
  await ring(tl, "[data-tl=btn-deactivate-vendor]", 1400);

  await finishBooks(tl, STEP137_DURATION_MS);
}
