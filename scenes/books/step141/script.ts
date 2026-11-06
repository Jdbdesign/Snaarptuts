import type { Timeline } from "@/lib/timeline";
import {
  beginBooks,
  finishBooks,
  pressOn,
} from "@/components/books/books-timeline";
import { BOOKS_URLS } from "@/components/books/books-data";
import { CAPTIONS } from "./data";

export const STEP141_DURATION_MS = 9000;

export async function runStep141(tl: Timeline) {
  beginBooks(tl, BOOKS_URLS.newVendor, "new-vendor", [0.45, 0.40]);
  tl.setVar("booksNewVendorSalutation", "Mr.");
  tl.setVar("booksNewVendorFirstName", "Daniel");
  tl.setVar("booksNewVendorLastName", "Brooks");
  tl.setVar("booksNewVendorCompanyName", "Harbour Logistics Ltd");
  tl.setVar("booksNewVendorDisplayName", "Harbour Logistics Ltd");
  tl.setVar("booksNewVendorEmail", "daniel@example.com");
  tl.setVar("booksNewVendorWorkPhone", "20 7946 0812");
  tl.setVar("booksNewVendorMobile", "7700 900543");
  tl.setVar("booksNewVendorTab", "other");

  await tl.at(400);
  tl.showCaption(CAPTIONS.selectTax);
  await pressOn(tl, "[data-tl=select-vendor-tax-rate]");
  tl.setVar("booksNewVendorTaxRate", "VAT Standard (20%)");
  await tl.wait(500);

  tl.showCaption(CAPTIONS.enterCompanyId);
  await pressOn(tl, "[data-tl=input-vendor-company-id]");
  tl.setVar("booksNewVendorCompanyId", "HL-2026");
  await tl.wait(400);

  tl.showCaption(CAPTIONS.selectAccountsPayable);
  await pressOn(tl, "[data-tl=select-vendor-accounts-payable]");
  tl.setVar("booksNewVendorAccountsPayable", "Accounts Payable");
  await tl.wait(400);

  tl.showCaption(CAPTIONS.enterBalance);
  await pressOn(tl, "[data-tl=input-vendor-opening-balance]");
  tl.setVar("booksNewVendorOpeningBalance", "1000");
  await tl.wait(400);

  tl.showCaption(CAPTIONS.selectTerms);
  await pressOn(tl, "[data-tl=select-vendor-new-payment-terms]");
  tl.setVar("booksNewVendorPaymentTerms", "Net 30");
  await tl.wait(400);

  tl.showCaption(CAPTIONS.enablePortal);
  await pressOn(tl, "[data-tl=check-vendor-enable-portal]");
  tl.setVar("booksNewVendorEnablePortal", true);
  await tl.wait(500);

  await finishBooks(tl, STEP141_DURATION_MS);
}
