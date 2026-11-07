import type { Timeline } from "@/lib/timeline";
import {
  beginBooks,
  finishBooks,
  pressOn,
  ring,
} from "@/components/books/books-timeline";
import { BOOKS_URLS } from "@/components/books/books-data";
import { CAPTIONS } from "./data";

export const STEP152_DURATION_MS = 60000;

export async function runStep152(tl: Timeline) {
  beginBooks(tl, BOOKS_URLS.recurringExpenses, "recurring-expenses", [0.1, 0.48], 152);

  await tl.at(400);
  tl.showCaption(CAPTIONS.openBills);
  await pressOn(tl, "[data-tl=nav-purchases-bills]");
  tl.setVar("booksView", "bills");
  tl.setUrl(BOOKS_URLS.bills);
  await tl.wait(600);

  tl.showCaption(CAPTIONS.ringToolbar);
  await ring(tl, "[data-tl=btn-new-bill]", 600);
  await ring(tl, "[data-tl=btn-view-list]", 600);
  await ring(tl, "[data-tl=btn-view-calendar]", 600);
  await ring(tl, "[data-tl=input-bills-search]", 600);
  await ring(tl, "[data-tl=select-bills-status-filter]", 600);

  tl.showCaption(CAPTIONS.filterStatusPaid);
  await pressOn(tl, "[data-tl=select-bills-status-filter]");
  await tl.wait(300);
  await pressOn(tl, "[data-tl=opt-status-paid]");
  tl.setVar("booksBillStatusFilter", "Paid");
  await tl.wait(800);

  tl.showCaption(CAPTIONS.clearStatusFilter);
  await pressOn(tl, "[data-tl=select-bills-status-filter]");
  await tl.wait(300);
  await pressOn(tl, "[data-tl=opt-status-all]");
  tl.setVar("booksBillStatusFilter", "Status");
  await tl.wait(600);

  tl.showCaption(CAPTIONS.switchCalendarView);
  await pressOn(tl, "[data-tl=btn-view-calendar]");
  tl.setVar("booksBillViewMode", "calendar");
  await tl.wait(800);

  tl.showCaption(CAPTIONS.switchMonths);
  await pressOn(tl, "[data-tl=tab-calendar-oct-2026]");
  tl.setVar("booksBillCalendarMonth", "Oct 2026");
  await tl.wait(900);
  await pressOn(tl, "[data-tl=tab-calendar-nov-2026]");
  tl.setVar("booksBillCalendarMonth", "Nov 2026");
  await tl.wait(900);

  tl.showCaption(CAPTIONS.switchListView);
  await pressOn(tl, "[data-tl=btn-view-list]");
  tl.setVar("booksBillViewMode", "list");
  await tl.wait(700);

  tl.showCaption(CAPTIONS.filterOverdueView);
  await pressOn(tl, "[data-tl=dropdown-all-bills]");
  await tl.wait(300);
  await pressOn(tl, "[data-tl=opt-view-overdue]");
  tl.setVar("booksAllBillsView", "Overdue");
  await tl.wait(800);

  tl.showCaption(CAPTIONS.returnAllBills);
  await pressOn(tl, "[data-tl=dropdown-all-bills]");
  await tl.wait(300);
  await pressOn(tl, "[data-tl=opt-view-all]");
  tl.setVar("booksAllBillsView", "All");
  await tl.wait(1000);

  await finishBooks(tl, STEP152_DURATION_MS);
}
