import type { Timeline } from "@/lib/timeline";
import {
  beginBooks,
  finishBooks,
  pressOn,
  ring,
} from "@/components/books/books-timeline";
import { BOOKS_URLS } from "@/components/books/books-data";
import { CAPTIONS } from "./data";

export const STEP167_DURATION_MS = 29800;

export async function runStep167(tl: Timeline) {
  beginBooks(tl, BOOKS_URLS.vendorCredits, "vendor-credits", [0.92, 0.12], 167);

  await tl.at(400);
  tl.showCaption(CAPTIONS.clickNewVendorCredit);
  await pressOn(tl, "[data-tl=btn-new-vendor-credit]");
  tl.setVar("booksView", "new-vendor-credit");
  tl.setUrl(BOOKS_URLS.newVendorCredit);
  await tl.wait(600);

  tl.showCaption(CAPTIONS.selectVendor);
  await pressOn(tl, "[data-tl=select-vendor-credit-vendor]");
  tl.setVar("booksVcVendorDropdownOpen", true);
  await tl.wait(400);
  await pressOn(tl, "[data-tl=opt-vendor-credit-vendor-greenfield]");
  tl.setVar("booksNewVendorCreditVendor", "Greenfield Packaging Ltd");
  tl.setVar("booksVcVendorDropdownOpen", false);
  await tl.wait(600);

  tl.showCaption(CAPTIONS.ringCreditNoteNumber);
  await ring(tl, "[data-tl=input-credit-note-number]", 1200);
  await tl.wait(400);

  tl.showCaption(CAPTIONS.typeOrderNumber);
  await pressOn(tl, "[data-tl=input-vendor-credit-order-number]");
  await tl.typeText("PO-7781", "[data-tl=input-vendor-credit-order-number]");
  tl.setVar("booksNewVendorCreditOrderNumber", "PO-7781");
  await tl.wait(500);

  tl.showCaption(CAPTIONS.confirmCreditDate);
  await pressOn(tl, "[data-tl=input-vendor-credit-date]");
  tl.setVar("booksNewVendorCreditDate", "11/08/2026");
  await tl.wait(500);

  tl.showCaption(CAPTIONS.typeSubject);
  await pressOn(tl, "[data-tl=input-vendor-credit-subject]");
  await tl.typeText("Returned packaging", "[data-tl=input-vendor-credit-subject]");
  tl.setVar("booksNewVendorCreditSubject", "Returned packaging");
  await tl.wait(500);

  tl.showCaption(CAPTIONS.selectAccountsPayable);
  await pressOn(tl, "[data-tl=select-vendor-credit-ap]");
  tl.setVar("booksVcApDropdownOpen", true);
  await tl.wait(400);
  await pressOn(tl, "[data-tl=opt-ap-accounts-payable]");
  tl.setVar("booksNewVendorCreditAccountsPayable", "Accounts Payable");
  tl.setVar("booksVcApDropdownOpen", false);
  await tl.wait(500);

  tl.showCaption(CAPTIONS.selectTaxModeAndLevel);
  await pressOn(tl, "[data-tl=select-vendor-credit-tax-mode]");
  tl.setVar("booksVcTaxModeDropdownOpen", true);
  await tl.wait(300);
  await pressOn(tl, "[data-tl=opt-tax-inclusive]");
  tl.setVar("booksNewVendorCreditTaxMode", "Tax Inclusive");
  tl.setVar("booksVcTaxModeDropdownOpen", false);
  await tl.wait(400);

  await pressOn(tl, "[data-tl=select-vendor-credit-tax-level]");
  tl.setVar("booksVcTaxLevelDropdownOpen", true);
  await tl.wait(300);
  await pressOn(tl, "[data-tl=opt-at-transaction-level]");
  tl.setVar("booksNewVendorCreditTaxLevel", "At Transaction Level");
  tl.setVar("booksVcTaxLevelDropdownOpen", false);
  await tl.wait(1000);

  await finishBooks(tl, STEP167_DURATION_MS);
}
