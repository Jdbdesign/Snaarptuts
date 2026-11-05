import type { Timeline } from "@/lib/timeline";
import {
  beginBooks,
  finishBooks,
  hoverOn,
  pressOn,
  ring,
} from "@/components/books/books-timeline";
import { BOOKS_URLS } from "@/components/books/books-data";
import { CAPTIONS } from "./data";

export const STEP24_DURATION_MS = 14500;

export async function runStep24(tl: Timeline) {
  beginBooks(tl, BOOKS_URLS.customers, "customers", [0.24, 0.16]);

  // Search by name
  await tl.at(400);
  tl.showCaption(CAPTIONS.clickSearch);
  await pressOn(tl, "[data-tl=input-customer-search]");
  await tl.typeText("[data-tl=input-customer-search]", "bright", { msPerChar: 70 });
  tl.setVar("booksCustomerSearch", "bright");
  await tl.wait(500);

  tl.showCaption(CAPTIONS.searchResult);
  await hoverOn(tl, "[data-tl=row-customer-1]", { ms: 500 });
  await ring(tl, "[data-tl=row-customer-1]", 1200);
  await tl.wait(400);

  // Clear search
  tl.showCaption(CAPTIONS.clearSearch);
  tl.setVar("booksCustomerSearch", "");
  await tl.wait(600);

  // Status Filter -> Inactive
  tl.showCaption(CAPTIONS.openStatus);
  await pressOn(tl, "[data-tl=select-customer-status]");
  tl.setVar("booksCustomerStatusDropdownOpen", true);
  await tl.wait(400);

  tl.showCaption(CAPTIONS.pickInactive);
  await pressOn(tl, "[data-tl=status-opt-inactive]");
  tl.setVar("booksCustomerFilter", "inactive");
  tl.setVar("booksCustomerStatusDropdownOpen", false);
  await tl.wait(1000);

  // Status Filter -> All
  await pressOn(tl, "[data-tl=select-customer-status]");
  tl.setVar("booksCustomerStatusDropdownOpen", true);
  await tl.wait(400);

  tl.showCaption(CAPTIONS.pickAll);
  await pressOn(tl, "[data-tl=status-opt-all]");
  tl.setVar("booksCustomerFilter", "all");
  tl.setVar("booksCustomerStatusDropdownOpen", false);
  await tl.wait(1000);

  // Status Filter -> Active
  await pressOn(tl, "[data-tl=select-customer-status]");
  tl.setVar("booksCustomerStatusDropdownOpen", true);
  await tl.wait(400);

  tl.showCaption(CAPTIONS.pickActive);
  await pressOn(tl, "[data-tl=status-opt-active]");
  tl.setVar("booksCustomerFilter", "active");
  tl.setVar("booksCustomerStatusDropdownOpen", false);
  await tl.wait(1000);

  await finishBooks(tl, STEP24_DURATION_MS);
}
