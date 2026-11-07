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

export const STEP139_DURATION_MS = 54800;

export async function runStep139(tl: Timeline) {
  beginBooks(tl, BOOKS_URLS.newVendor, "new-vendor", [0.45, 0.35], 139);

  await tl.at(400);
  tl.showCaption(CAPTIONS.clickAddressTab);
  await pressOn(tl, "[data-tl=tab-vendor-address]");
  tl.setVar("booksNewVendorTab", "address");
  await tl.wait(600);

  tl.showCaption(CAPTIONS.searchCountry);
  await pressOn(tl, "[data-tl=select-vendor-country]");
  await tl.wait(400);
  await pressOn(tl, "[data-tl=input-country-search]");
  await tl.typeText("countrySearch", "uni", { msPerChar: 65 });
  await tl.wait(500);

  tl.showCaption(CAPTIONS.pickCountry);
  await pressOn(tl, "[data-tl=country-opt-uk]");
  tl.setVar("booksNewVendorCountry", "United Kingdom");
  await tl.wait(600);

  tl.showCaption(CAPTIONS.typeStreet);
  await pressOn(tl, "[data-tl=input-vendor-street]");
  await typeIntoVar(tl, "[data-tl=input-vendor-street]", "booksNewVendorAddress", "42 Maritime Way", { msPerChar: 50 });
  await tl.wait(500);

  tl.showCaption(CAPTIONS.typeStreet2);
  await pressOn(tl, "[data-tl=input-vendor-street2]");
  await typeIntoVar(tl, "[data-tl=input-vendor-street2]", "booksNewVendorStreet2", "Quayside Business Park", { msPerChar: 45 });
  await tl.wait(500);

  tl.showCaption(CAPTIONS.typeCity);
  await pressOn(tl, "[data-tl=input-vendor-city]");
  await typeIntoVar(tl, "[data-tl=input-vendor-city]", "booksNewVendorCity", "London", { msPerChar: 60 });
  await tl.wait(500);

  tl.showCaption(CAPTIONS.pickState);
  await pressOn(tl, "[data-tl=select-vendor-state]");
  tl.setVar("booksNewVendorStateOpen", true);
  await tl.wait(600);

  await pressOn(tl, "[data-tl=opt-state-aberdeen]");
  tl.setVar("booksNewVendorState", "Aberdeen");
  tl.setVar("booksNewVendorStateOpen", false);
  await tl.wait(500);

  tl.showCaption(CAPTIONS.typeZip);
  await pressOn(tl, "[data-tl=input-vendor-zip]");
  await typeIntoVar(tl, "[data-tl=input-vendor-zip]", "booksNewVendorZip", "EC1A 1AA", { msPerChar: 60 });
  await tl.wait(500);

  tl.showCaption(CAPTIONS.typePhone);
  await pressOn(tl, "[data-tl=input-vendor-address-phone]");
  await typeIntoVar(tl, "[data-tl=input-vendor-address-phone]", "booksNewVendorAddressPhone", "020 7946 0912", { msPerChar: 55 });
  await tl.wait(500);

  tl.showCaption(CAPTIONS.typeFax);
  await pressOn(tl, "[data-tl=input-vendor-fax]");
  await typeIntoVar(tl, "[data-tl=input-vendor-fax]", "booksNewVendorFax", "020 7946 0913", { msPerChar: 55 });
  await tl.wait(600);

  tl.showCaption(CAPTIONS.reviewNote);
  await ring(tl, ".bg-\\[\\#FEFCE8\\]", 1200);

  await finishBooks(tl, STEP139_DURATION_MS);
}
