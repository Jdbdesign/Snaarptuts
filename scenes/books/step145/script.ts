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

export const STEP145_DURATION_MS = 46000;

export async function runStep145(tl: Timeline) {
  beginBooks(tl, BOOKS_URLS.expenses, "expenses", [0.45, 0.35]);

  await tl.at(400);
  tl.showCaption(CAPTIONS.clickNew);
  await pressOn(tl, "[data-tl=btn-new-expense]");
  tl.setVar("booksView", "new-expense");
  tl.setUrl(BOOKS_URLS.newExpense);
  await tl.wait(700);

  tl.showCaption(CAPTIONS.clickMileageTab);
  await pressOn(tl, "[data-tl=tab-record-mileage]");
  tl.setVar("booksExpenseFormTab", "mileage");
  await tl.wait(600);

  tl.showCaption(CAPTIONS.pickDistanceMethod);
  await pressOn(tl, "[data-tl=radio-calc-distance]");
  tl.setVar("booksMileageCalcMethod", "distance");
  await tl.wait(500);

  tl.showCaption(CAPTIONS.typeDistance);
  await pressOn(tl, "[data-tl=input-mileage-distance]");
  await typeIntoVar(tl, "[data-tl=input-mileage-distance]", "booksMileageDistance", "20", { msPerChar: 65 });
  await tl.wait(600);

  tl.showCaption(CAPTIONS.reviewAmount);
  await ring(tl, "[data-tl=input-mileage-amount]", 1000);

  tl.showCaption(CAPTIONS.tryOdometer);
  await pressOn(tl, "[data-tl=radio-calc-odometer]");
  tl.setVar("booksMileageCalcMethod", "odometer");
  await tl.wait(600);

  tl.showCaption(CAPTIONS.restoreDistance);
  await pressOn(tl, "[data-tl=radio-calc-distance]");
  tl.setVar("booksMileageCalcMethod", "distance");
  await tl.wait(600);

  tl.showCaption(CAPTIONS.pickPaidThrough);
  await pressOn(tl, "[data-tl=select-mileage-paid-through]");
  tl.setVar("booksMileagePaidThroughOpen", true);
  await tl.wait(600);

  await pressOn(tl, "[data-tl=opt-mileage-paidthrough-advance]");
  tl.setVar("booksMileagePaidThrough", "Employee Advance");
  tl.setVar("booksMileagePaidThroughOpen", false);
  await tl.wait(500);

  tl.showCaption(CAPTIONS.pickTax);
  await pressOn(tl, "[data-tl=select-mileage-tax]");
  tl.setVar("booksMileageTaxOpen", true);
  await tl.wait(600);

  await pressOn(tl, "[data-tl=opt-mileage-tax-none]");
  tl.setVar("booksMileageTax", "No Tax");
  tl.setVar("booksMileageTaxOpen", false);
  await tl.wait(500);

  tl.showCaption(CAPTIONS.pickVendor);
  await pressOn(tl, "[data-tl=select-mileage-vendor]");
  tl.setVar("booksMileageVendorOpen", true);
  await tl.wait(600);

  await pressOn(tl, "[data-tl=opt-mileage-vendor-greenfield]");
  tl.setVar("booksMileageVendor", "Greenfield Packaging Ltd");
  tl.setVar("booksMileageVendorOpen", false);
  await tl.wait(600);

  tl.showCaption(CAPTIONS.saveAndNew);
  await ring(tl, "[data-tl=btn-save-mileage]", 600);
  await pressOn(tl, "[data-tl=btn-save-mileage]");
  tl.setVar("booksToastText", "Expense saved successfully");
  tl.setVar("booksToastOpen", true);
  tl.setVar("booksExpenseFormTab", "record");
  tl.setVar("booksMileageDistance", "");
  await tl.wait(1200);

  await finishBooks(tl, STEP145_DURATION_MS);
}
