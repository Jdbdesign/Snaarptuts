import type { Timeline } from "@/lib/timeline";
import {
  beginBooks,
  finishBooks,
  pressOn,
} from "@/components/books/books-timeline";
import { BOOKS_URLS } from "@/components/books/books-data";
import { CAPTIONS } from "./data";

export const STEP143_DURATION_MS = 8500;

export async function runStep143(tl: Timeline) {
  beginBooks(tl, BOOKS_URLS.newVendor, "new-vendor", [0.45, 0.40]);
  tl.setVar("booksNewVendorSalutation", "Mr.");
  tl.setVar("booksNewVendorFirstName", "Daniel");
  tl.setVar("booksNewVendorLastName", "Brooks");
  tl.setVar("booksNewVendorCompanyName", "Harbour Logistics Ltd");
  tl.setVar("booksNewVendorDisplayName", "Harbour Logistics Ltd");
  tl.setVar("booksNewVendorEmail", "daniel@example.com");
  tl.setVar("booksNewVendorWorkPhone", "20 7946 0812");
  tl.setVar("booksNewVendorMobile", "7700 900543");
  tl.setVar("booksNewVendorTaxRate", "VAT Standard (20%)");
  tl.setVar("booksNewVendorCompanyId", "HL-2026");
  tl.setVar("booksNewVendorAccountsPayable", "Accounts Payable");
  tl.setVar("booksNewVendorOpeningBalance", "1000");
  tl.setVar("booksNewVendorPaymentTerms", "Net 30");
  tl.setVar("booksNewVendorEnablePortal", true);
  tl.setVar("booksNewVendorCountry", "United Kingdom");
  tl.setVar("booksNewVendorAddress", "10 Acme Street");
  tl.setVar("booksNewVendorCity", "London");
  tl.setVar("booksNewVendorState", "Aberdeen");
  tl.setVar("booksNewVendorZip", "EC1A 1AA");

  await tl.at(400);
  tl.showCaption(CAPTIONS.openContactsTab);
  await pressOn(tl, "[data-tl=tab-vendor-contact-persons]");
  tl.setVar("booksNewVendorTab", "contacts");
  await tl.wait(400);

  tl.showCaption(CAPTIONS.enterContactName);
  await pressOn(tl, "[data-tl=input-cp-salutation-0]");
  await pressOn(tl, "[data-tl=input-cp-first-name-0]");
  await pressOn(tl, "[data-tl=input-cp-last-name-0]");
  await tl.wait(400);

  tl.showCaption(CAPTIONS.enterEmail);
  await pressOn(tl, "[data-tl=input-cp-email-0]");
  await tl.wait(400);

  tl.showCaption(CAPTIONS.enterPhones);
  await pressOn(tl, "[data-tl=input-cp-work-phone-0]");
  await pressOn(tl, "[data-tl=input-cp-mobile-0]");
  await tl.wait(600);

  await finishBooks(tl, STEP143_DURATION_MS);
}
