import type { Timeline } from "@/lib/timeline";
import {
  beginBooks,
  finishBooks,
  pressOn,
} from "@/components/books/books-timeline";
import { BOOKS_URLS } from "@/components/books/books-data";
import { CAPTIONS } from "./data";

export const STEP139_DURATION_MS = 6500;

export async function runStep139(tl: Timeline) {
  beginBooks(tl, BOOKS_URLS.vendors, "vendors", [0.85, 0.15]);

  await tl.at(400);
  tl.showCaption(CAPTIONS.clickNew);
  await pressOn(tl, "[data-tl=btn-new-vendor]");
  tl.setVar("booksView", "new-vendor");
  tl.setUrl(BOOKS_URLS.newVendor);
  await tl.wait(500);

  tl.showCaption(CAPTIONS.selectSalutation);
  await pressOn(tl, "[data-tl=select-vendor-salutation]");
  tl.setVar("booksNewVendorSalutation", "Mr.");
  await tl.wait(400);

  tl.showCaption(CAPTIONS.enterFirstName);
  await pressOn(tl, "[data-tl=input-vendor-first-name]");
  tl.setVar("booksNewVendorFirstName", "Daniel");
  await tl.wait(300);

  tl.showCaption(CAPTIONS.enterLastName);
  await pressOn(tl, "[data-tl=input-vendor-last-name]");
  tl.setVar("booksNewVendorLastName", "Brooks");
  await tl.wait(500);

  await finishBooks(tl, STEP139_DURATION_MS);
}
