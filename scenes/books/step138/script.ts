import type { Timeline } from "@/lib/timeline";
import {
  beginBooks,
  finishBooks,
  pressOn,
  typeIntoVar,
} from "@/components/books/books-timeline";
import { BOOKS_URLS } from "@/components/books/books-data";
import { CAPTIONS } from "./data";

export const STEP138_DURATION_MS = 42000;

export async function runStep138(tl: Timeline) {
  beginBooks(tl, BOOKS_URLS.newVendor, "new-vendor", [0.45, 0.35], 138);

  await tl.at(400);
  tl.showCaption(CAPTIONS.clickOtherDetails);
  await pressOn(tl, "[data-tl=tab-vendor-other-details]");
  tl.setVar("booksNewVendorTab", "other");
  await tl.wait(600);

  tl.showCaption(CAPTIONS.openTaxRate);
  await pressOn(tl, "[data-tl=select-vendor-tax-rate]");
  tl.setVar("booksNewVendorTaxRateOpen", true);
  await tl.wait(600);

  await pressOn(tl, "[data-tl=opt-tax-vat-20]");
  tl.setVar("booksNewVendorTaxRate", "VAT Standard (20%)");
  tl.setVar("booksNewVendorTaxRateOpen", false);
  await tl.wait(600);

  tl.showCaption(CAPTIONS.typeCompanyId);
  await pressOn(tl, "[data-tl=input-vendor-company-id]");
  await typeIntoVar(tl, "[data-tl=input-vendor-company-id]", "booksNewVendorCompanyId", "HL-2026", { msPerChar: 60 });
  await tl.wait(600);

  tl.showCaption(CAPTIONS.openAccountsPayable);
  await pressOn(tl, "[data-tl=select-vendor-accounts-payable]");
  tl.setVar("booksNewVendorAccountsPayableOpen", true);
  await tl.wait(600);

  await pressOn(tl, "[data-tl=opt-ap-accounts-payable]");
  tl.setVar("booksNewVendorAccountsPayable", "Accounts Payable");
  tl.setVar("booksNewVendorAccountsPayableOpen", false);
  await tl.wait(600);

  tl.showCaption(CAPTIONS.typeBalance);
  await pressOn(tl, "[data-tl=input-vendor-opening-balance]");
  await typeIntoVar(tl, "[data-tl=input-vendor-opening-balance]", "booksNewVendorOpeningBalance", "1000", { msPerChar: 65 });
  await tl.wait(600);

  tl.showCaption(CAPTIONS.openPaymentTerms);
  await pressOn(tl, "[data-tl=select-vendor-new-payment-terms]");
  tl.setVar("booksNewVendorPaymentTermsOpen", true);
  await tl.wait(600);

  await pressOn(tl, "[data-tl=opt-terms-net30]");
  tl.setVar("booksNewVendorPaymentTerms", "Net 30");
  tl.setVar("booksNewVendorPaymentTermsOpen", false);
  await tl.wait(600);

  tl.showCaption(CAPTIONS.tickPortal);
  await pressOn(tl, "[data-tl=check-vendor-enable-portal]");
  tl.setVar("booksNewVendorEnablePortal", true);
  await tl.wait(800);

  await finishBooks(tl, STEP138_DURATION_MS);
}
