import type { Timeline } from "@/lib/timeline";
import {
  beginBooks,
  finishBooks,
  pressOn,
  ring,
} from "@/components/books/books-timeline";
import { BOOKS_URLS } from "@/components/books/books-data";
import { CAPTIONS } from "./data";

export const STEP156_DURATION_MS = 9500;

export async function runStep156(tl: Timeline) {
  beginBooks(tl, BOOKS_URLS.newExpense, "new-expense", [0.45, 0.20]);

  await tl.at(400);
  tl.showCaption(CAPTIONS.openMileageTab);
  await pressOn(tl, "[data-tl=tab-record-mileage]");
  tl.setVar("booksExpenseFormTab", "mileage");
  await tl.wait(500);

  tl.showCaption(CAPTIONS.selectCalcMethod);
  await pressOn(tl, "[data-tl=radio-calc-distance]");
  tl.setVar("booksMileageCalcMethod", "distance");
  await tl.wait(400);

  tl.showCaption(CAPTIONS.enterDistance);
  await pressOn(tl, "[data-tl=input-mileage-distance]");
  tl.setVar("booksMileageDistance", "20");
  await tl.wait(400);
  await ring(tl, "[data-tl=input-mileage-amount]", 800);

  tl.showCaption(CAPTIONS.toggleCalc);
  await pressOn(tl, "[data-tl=radio-calc-odometer]");
  tl.setVar("booksMileageCalcMethod", "odometer");
  await tl.wait(400);
  await pressOn(tl, "[data-tl=radio-calc-distance]");
  tl.setVar("booksMileageCalcMethod", "distance");
  await tl.wait(400);

  tl.showCaption(CAPTIONS.selectAccountVendor);
  await pressOn(tl, "[data-tl=select-mileage-paid-through]");
  tl.setVar("booksMileagePaidThrough", "Employee Advance");
  await pressOn(tl, "[data-tl=select-mileage-tax]");
  tl.setVar("booksMileageTax", "No Tax");
  await pressOn(tl, "[data-tl=select-mileage-vendor]");
  tl.setVar("booksMileageVendor", "Greenfield Packaging Ltd");
  await tl.wait(800);

  await finishBooks(tl, STEP156_DURATION_MS);
}
