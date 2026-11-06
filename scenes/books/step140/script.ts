import type { Timeline } from "@/lib/timeline";
import {
  beginBooks,
  finishBooks,
  pressOn,
} from "@/components/books/books-timeline";
import { BOOKS_URLS } from "@/components/books/books-data";
import { CAPTIONS } from "./data";

export const STEP140_DURATION_MS = 8500;

export async function runStep140(tl: Timeline) {
  beginBooks(tl, BOOKS_URLS.newVendor, "new-vendor", [0.45, 0.30]);
  tl.setVar("booksNewVendorSalutation", "Mr.");
  tl.setVar("booksNewVendorFirstName", "Daniel");
  tl.setVar("booksNewVendorLastName", "Brooks");

  await tl.at(400);
  tl.showCaption(CAPTIONS.enterCompany);
  await pressOn(tl, "[data-tl=input-vendor-company-name]");
  tl.setVar("booksNewVendorCompanyName", "Harbour Logistics Ltd");
  await tl.wait(500);

  tl.showCaption(CAPTIONS.clickSuggestion);
  await pressOn(tl, "[data-tl=bubble-vendor-display-name-suggestion]");
  tl.setVar("booksNewVendorDisplayName", "Harbour Logistics Ltd");
  await tl.wait(400);

  tl.showCaption(CAPTIONS.enterEmail);
  await pressOn(tl, "[data-tl=input-vendor-email-address]");
  tl.setVar("booksNewVendorEmail", "daniel@example.com");
  await tl.wait(400);

  tl.showCaption(CAPTIONS.enterWorkPhone);
  await pressOn(tl, "[data-tl=input-vendor-work-phone]");
  tl.setVar("booksNewVendorWorkPhone", "20 7946 0812");
  await tl.wait(300);

  tl.showCaption(CAPTIONS.enterMobile);
  await pressOn(tl, "[data-tl=input-vendor-mobile]");
  tl.setVar("booksNewVendorMobile", "7700 900543");
  await tl.wait(500);

  await finishBooks(tl, STEP140_DURATION_MS);
}
