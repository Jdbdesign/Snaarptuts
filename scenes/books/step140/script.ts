import type { Timeline } from "@/lib/timeline";
import {
  beginBooks,
  finishBooks,
  pressOn,
  ring,
  typeIntoVar,
} from "@/components/books/books-timeline";
import { BOOKS_URLS, INITIAL_VENDORS } from "@/components/books/books-data";
import { CAPTIONS } from "./data";

export const STEP140_DURATION_MS = 49000;

export async function runStep140(tl: Timeline) {
  beginBooks(tl, BOOKS_URLS.newVendor, "new-vendor", [0.45, 0.35], 140);

  await tl.at(400);
  tl.showCaption(CAPTIONS.clickContactsTab);
  await pressOn(tl, "[data-tl=tab-vendor-contact-persons]");
  tl.setVar("booksNewVendorTab", "contacts");
  await tl.wait(600);

  tl.showCaption(CAPTIONS.addContact);
  await pressOn(tl, "[data-tl=btn-add-contact-person]");
  await tl.wait(600);

  tl.showCaption(CAPTIONS.openSalutation);
  await pressOn(tl, "[data-tl=select-cp-salutation-0]");
  tl.setVar("booksNewVendorCpSalutationOpen", true);
  await tl.wait(600);

  await pressOn(tl, "[data-tl=opt-cp-salutation-mr]");
  tl.setVar("booksCpSalutation", "Mr.");
  tl.setVar("booksNewVendorCpSalutationOpen", false);
  await tl.wait(500);

  tl.showCaption(CAPTIONS.typeFirst);
  await pressOn(tl, "[data-tl=input-cp-first-name-0]");
  await typeIntoVar(tl, "[data-tl=input-cp-first-name-0]", "booksCpFirstName", "Jane", { msPerChar: 60 });
  await tl.wait(500);

  tl.showCaption(CAPTIONS.typeLast);
  await pressOn(tl, "[data-tl=input-cp-last-name-0]");
  await typeIntoVar(tl, "[data-tl=input-cp-last-name-0]", "booksCpLastName", "Doe", { msPerChar: 60 });
  await tl.wait(500);

  tl.showCaption(CAPTIONS.typeEmail);
  await pressOn(tl, "[data-tl=input-cp-email-0]");
  await typeIntoVar(tl, "[data-tl=input-cp-email-0]", "booksCpEmail", "jane@example.com", { msPerChar: 50 });
  await tl.wait(500);

  tl.showCaption(CAPTIONS.typeWorkPhone);
  await pressOn(tl, "[data-tl=input-cp-work-phone-0]");
  await typeIntoVar(tl, "[data-tl=input-cp-work-phone-0]", "booksCpWorkPhone", "020 7946 0998", { msPerChar: 55 });
  await tl.wait(500);

  tl.showCaption(CAPTIONS.typeMobile);
  await pressOn(tl, "[data-tl=input-cp-mobile-0]");
  await typeIntoVar(tl, "[data-tl=input-cp-mobile-0]", "booksCpMobile", "07700 900888", { msPerChar: 55 });
  await tl.wait(700);

  tl.showCaption(CAPTIONS.clickSave);
  await ring(tl, "[data-tl=btn-save-vendor]", 600);
  await pressOn(tl, "[data-tl=btn-save-vendor]");
  tl.setVar("booksToastText", "Vendor created successfully");
  tl.setVar("booksToastOpen", true);
  tl.setVar("booksVendors", [
    {
      id: "vend-harbour",
      name: "Harbour Logistics Ltd",
      email: "billing@harbourlogistics.co.uk",
      phone: "+44 20 7946 0812",
      paymentTerms: "Net 30",
      status: "Active",
    },
    ...INITIAL_VENDORS,
  ]);
  tl.setVar("booksView", "vendors");
  tl.setUrl(BOOKS_URLS.vendors);
  await tl.wait(800);

  tl.showCaption(CAPTIONS.vendorListed);
  await ring(tl, "[data-tl=vendor-row-harbour]", 1400);

  await finishBooks(tl, STEP140_DURATION_MS);
}
