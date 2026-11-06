import type { Timeline } from "@/lib/timeline";
import {
  beginBooks,
  finishBooks,
  pressOn,
} from "@/components/books/books-timeline";
import { BOOKS_URLS } from "@/components/books/books-data";
import { CAPTIONS } from "./data";

export const STEP142_DURATION_MS = 9000;

export async function runStep142(tl: Timeline) {
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

  await tl.at(400);
  tl.showCaption(CAPTIONS.openAddressTab);
  await pressOn(tl, "[data-tl=tab-vendor-address]");
  tl.setVar("booksNewVendorTab", "address");
  await tl.wait(400);

  tl.showCaption(CAPTIONS.selectCountry);
  await pressOn(tl, "[data-tl=select-vendor-country]");
  await tl.wait(300);
  await pressOn(tl, "[data-tl=country-opt-uk]");
  tl.setVar("booksNewVendorCountry", "United Kingdom");
  await tl.wait(300);

  tl.showCaption(CAPTIONS.enterAddress);
  await pressOn(tl, "[data-tl=input-vendor-street]");
  tl.setVar("booksNewVendorAddress", "10 Acme Street");
  await tl.wait(300);

  tl.showCaption(CAPTIONS.enterCityState);
  await pressOn(tl, "[data-tl=input-vendor-city]");
  tl.setVar("booksNewVendorCity", "London");
  await pressOn(tl, "[data-tl=select-vendor-state]");
  tl.setVar("booksNewVendorState", "Aberdeen");
  await tl.wait(300);

  tl.showCaption(CAPTIONS.enterZipPhone);
  await pressOn(tl, "[data-tl=input-vendor-zip]");
  tl.setVar("booksNewVendorZip", "EC1A 1AA");
  await pressOn(tl, "[data-tl=input-vendor-address-phone]");
  tl.setVar("booksNewVendorAddressPhone", "20 7946 0812");
  await tl.wait(300);

  tl.showCaption(CAPTIONS.enterFax);
  await pressOn(tl, "[data-tl=input-vendor-fax]");
  tl.setVar("booksNewVendorFax", "020 7946 0999");
  await tl.wait(500);

  await finishBooks(tl, STEP142_DURATION_MS);
}
