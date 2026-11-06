import type { Timeline } from "@/lib/timeline";
import {
  beginBooks,
  finishBooks,
  pressOn,
  ring,
  typeIntoVar,
} from "@/components/books/books-timeline";
import { BOOKS_URLS } from "@/components/books/books-data";
import { CAPTIONS } from "./data";

export const STEP137_DURATION_MS = 48000;

export async function runStep137(tl: Timeline) {
  beginBooks(tl, BOOKS_URLS.vendors, "vendors", [0.45, 0.35]);

  await tl.at(400);
  tl.showCaption(CAPTIONS.clickNew);
  await pressOn(tl, "[data-tl=btn-new-vendor]");
  tl.setVar("booksView", "new-vendor");
  tl.setUrl(BOOKS_URLS.newVendor);
  await tl.wait(800);

  tl.showCaption(CAPTIONS.openSalutation);
  await pressOn(tl, "[data-tl=select-vendor-salutation]");
  tl.setVar("booksNewVendorSalutationOpen", true);
  await tl.wait(600);

  await pressOn(tl, "[data-tl=opt-salutation-mr]");
  tl.setVar("booksNewVendorSalutation", "Mr.");
  tl.setVar("booksNewVendorSalutationOpen", false);
  await tl.wait(600);

  tl.showCaption(CAPTIONS.typeFirst);
  await pressOn(tl, "[data-tl=input-vendor-first-name]");
  await typeIntoVar(tl, "[data-tl=input-vendor-first-name]", "booksNewVendorFirstName", "Daniel", { msPerChar: 55 });
  await tl.wait(500);

  tl.showCaption(CAPTIONS.typeLast);
  await pressOn(tl, "[data-tl=input-vendor-last-name]");
  await typeIntoVar(tl, "[data-tl=input-vendor-last-name]", "booksNewVendorLastName", "Brooks", { msPerChar: 55 });
  await tl.wait(500);

  tl.showCaption(CAPTIONS.typeCompany);
  await pressOn(tl, "[data-tl=input-vendor-company-name]");
  await typeIntoVar(tl, "[data-tl=input-vendor-company-name]", "booksNewVendorCompanyName", "Harbour Logistics Ltd", { msPerChar: 50 });
  await tl.wait(600);

  tl.showCaption(CAPTIONS.clickSuggestion);
  await ring(tl, "[data-tl=bubble-vendor-display-name-suggestion]", 600);
  await pressOn(tl, "[data-tl=bubble-vendor-display-name-suggestion]");
  tl.setVar("booksNewVendorDisplayName", "Harbour Logistics Ltd");
  await tl.wait(600);

  tl.showCaption(CAPTIONS.typeEmail);
  await pressOn(tl, "[data-tl=input-vendor-email-address]");
  await typeIntoVar(tl, "[data-tl=input-vendor-email-address]", "booksNewVendorEmail", "billing@harbourlogistics.co.uk", { msPerChar: 45 });
  await tl.wait(500);

  tl.showCaption(CAPTIONS.openCountryCode);
  await pressOn(tl, "[data-tl=btn-vendor-phone-country]");
  tl.setVar("booksNewVendorPhoneCountryOpen", true);
  await tl.wait(600);
  await pressOn(tl, "[data-tl=opt-country-gb]");
  tl.setVar("booksNewVendorPhoneCountryOpen", false);
  await tl.wait(500);

  tl.showCaption(CAPTIONS.typeWorkPhone);
  await pressOn(tl, "[data-tl=input-vendor-work-phone]");
  await typeIntoVar(tl, "[data-tl=input-vendor-work-phone]", "booksNewVendorWorkPhone", "020 7946 0812", { msPerChar: 55 });
  await tl.wait(500);

  tl.showCaption(CAPTIONS.typeMobile);
  await pressOn(tl, "[data-tl=input-vendor-mobile]");
  await typeIntoVar(tl, "[data-tl=input-vendor-mobile]", "booksNewVendorMobile", "07700 900543", { msPerChar: 55 });
  await tl.wait(800);

  await finishBooks(tl, STEP137_DURATION_MS);
}
