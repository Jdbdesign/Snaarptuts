import type { Timeline } from "@/lib/timeline";
import {
  beginBooks,
  finishBooks,
  pressOn,
} from "@/components/books/books-timeline";
import { BOOKS_URLS } from "@/components/books/books-data";
import { CAPTIONS } from "./data";

export const STEP160_DURATION_MS = 31800;

export async function runStep160(tl: Timeline) {
  beginBooks(tl, BOOKS_URLS.recurringBills, "recurring-bills", [0.92, 0.12], 160);

  await tl.at(400);
  tl.showCaption(CAPTIONS.clickNewRecurringBill);
  await pressOn(tl, "[data-tl=btn-new-recurring-bill]");
  tl.setVar("booksView", "new-recurring-bill");
  tl.setUrl(BOOKS_URLS.newRecurringBill);
  await tl.wait(600);

  tl.showCaption(CAPTIONS.selectVendor);
  await pressOn(tl, "[data-tl=select-rec-bill-vendor]");
  tl.setVar("booksRecBillVendorDropdownOpen", true);
  await tl.wait(400);
  await pressOn(tl, "[data-tl=opt-rec-bill-vendor-greenfield]");
  tl.setVar("booksNewRecBillVendor", "Greenfield Packaging Ltd");
  tl.setVar("booksRecBillVendorDropdownOpen", false);
  await tl.wait(600);

  tl.showCaption(CAPTIONS.typeProfileName);
  await pressOn(tl, "[data-tl=input-rec-bill-profile-name]");
  await tl.typeText("Monthly Packaging Supplies", "[data-tl=input-rec-bill-profile-name]");
  tl.setVar("booksNewRecBillProfileName", "Monthly Packaging Supplies");
  await tl.wait(600);

  tl.showCaption(CAPTIONS.selectRepeatEvery);
  await pressOn(tl, "[data-tl=select-rec-bill-repeat-every]");
  tl.setVar("booksRecBillRepeatDropdownOpen", true);
  await tl.wait(400);
  await pressOn(tl, "[data-tl=opt-repeat-every-month]");
  tl.setVar("booksNewRecBillRepeatEvery", "Month");
  tl.setVar("booksRecBillRepeatDropdownOpen", false);
  await tl.wait(600);

  tl.showCaption(CAPTIONS.setScheduleDates);
  await pressOn(tl, "[data-tl=input-rec-bill-start-date]");
  tl.setVar("booksNewRecBillStartDate", "11/08/2026");
  await tl.wait(400);
  await pressOn(tl, "[data-tl=toggle-rec-bill-never-expires]");
  tl.setVar("booksNewRecBillNeverExpires", true);
  await tl.wait(600);

  tl.showCaption(CAPTIONS.selectAccountsPayable);
  await pressOn(tl, "[data-tl=select-rec-bill-ap]");
  tl.setVar("booksRecBillApDropdownOpen", true);
  await tl.wait(400);
  await pressOn(tl, "[data-tl=opt-ap-accounts-payable]");
  tl.setVar("booksNewRecBillAccountsPayable", "Accounts Payable");
  tl.setVar("booksRecBillApDropdownOpen", false);
  await tl.wait(600);

  tl.showCaption(CAPTIONS.selectPaymentTerms);
  await pressOn(tl, "[data-tl=select-rec-bill-terms]");
  tl.setVar("booksRecBillTermsDropdownOpen", true);
  await tl.wait(400);
  await pressOn(tl, "[data-tl=opt-terms-net-30]");
  tl.setVar("booksNewRecBillPaymentTerms", "Net 30");
  tl.setVar("booksRecBillTermsDropdownOpen", false);
  await tl.wait(600);

  tl.showCaption(CAPTIONS.selectTaxModeAndLevel);
  await pressOn(tl, "[data-tl=select-rec-bill-tax-mode]");
  tl.setVar("booksRecBillTaxModeDropdownOpen", true);
  await tl.wait(300);
  await pressOn(tl, "[data-tl=opt-tax-exclusive]");
  tl.setVar("booksNewRecBillTaxMode", "Tax Exclusive");
  tl.setVar("booksRecBillTaxModeDropdownOpen", false);
  await tl.wait(400);

  await pressOn(tl, "[data-tl=select-rec-bill-tax-level]");
  tl.setVar("booksRecBillTaxLevelDropdownOpen", true);
  await tl.wait(300);
  await pressOn(tl, "[data-tl=opt-at-transaction-level]");
  tl.setVar("booksNewRecBillTaxLevel", "At Transaction Level");
  tl.setVar("booksRecBillTaxLevelDropdownOpen", false);
  await tl.wait(1000);

  await finishBooks(tl, STEP160_DURATION_MS);
}
