import type { Timeline } from "@/lib/timeline";
import {
  beginBooks,
  finishBooks,
  pressOn,
  ring,
} from "@/components/books/books-timeline";
import { BOOKS_URLS } from "@/components/books/books-data";
import { CAPTIONS } from "./data";

export const STEP149_DURATION_MS = 25300;

export async function runStep149(tl: Timeline) {
  beginBooks(tl, BOOKS_URLS.recurringExpenses, "recurring-expenses", [0.92, 0.12], 149);

  await tl.at(400);
  tl.showCaption(CAPTIONS.clickNew);
  await pressOn(tl, "[data-tl=btn-new-recurring-expense]");
  tl.setVar("booksView", "new-recurring-expense");
  tl.setUrl(BOOKS_URLS.newRecurringExpense);
  await tl.wait(600);

  tl.showCaption(CAPTIONS.typeProfileName);
  await pressOn(tl, "[data-tl=input-rec-profile-name]");
  await tl.typeText("Monthly Office Supplies", "[data-tl=input-rec-profile-name]");
  tl.setVar("booksRecProfileName", "Monthly Office Supplies");
  await tl.wait(500);

  tl.showCaption(CAPTIONS.selectEmployee);
  await pressOn(tl, "[data-tl=select-rec-employee]");
  await tl.wait(300);
  await pressOn(tl, "[data-tl=opt-rec-employee-jane]");
  tl.setVar("booksRecEmployee", "Jane Doe");
  await tl.wait(500);

  tl.showCaption(CAPTIONS.pickRepeatEvery);
  await pressOn(tl, "[data-tl=select-rec-repeat-every]");
  await tl.wait(300);
  await pressOn(tl, "[data-tl=opt-rec-repeat-month]");
  tl.setVar("booksRecRepeatEvery", "Month");
  await tl.wait(500);

  tl.showCaption(CAPTIONS.pickStartDate);
  await pressOn(tl, "[data-tl=input-rec-start-date]");
  await tl.wait(300);
  await pressOn(tl, "[data-tl=date-day-7]");
  tl.setVar("booksRecStartDate", "11/07/2026");
  await tl.wait(600);

  tl.showCaption(CAPTIONS.ringScheduleTerms);
  await ring(tl, "[data-tl=rec-schedule-helper]", 800);
  await ring(tl, "[data-tl=input-rec-ends-on]", 800);
  await ring(tl, "[data-tl=checkbox-rec-never-expires]", 800);
  await tl.wait(1000);

  await finishBooks(tl, STEP149_DURATION_MS);
}
