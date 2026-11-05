import type { Timeline } from "@/lib/timeline";
import {
  beginBooks,
  finishBooks,
  hoverOn,
  pressOn,
  ring,
} from "@/components/books/books-timeline";
import {
  BOOKS_URLS,
  INITIAL_ACTIVE_CUSTOMERS,
} from "@/components/books/books-data";
import { CAPTIONS } from "./data";

export const STEP30_DURATION_MS = 11500;

export async function runStep30(tl: Timeline) {
  beginBooks(tl, BOOKS_URLS.customers, "customers", [0.25, 0.45]);

  // Click Casey Brown (row 6 in initial list)
  await tl.at(400);
  tl.showCaption(CAPTIONS.clickCustomer);
  await pressOn(tl, "[data-tl=link-customer-6]");
  tl.setVar("booksActiveCustomer", INITIAL_ACTIVE_CUSTOMERS[5]);
  tl.setVar("booksView", "customer-detail");
  tl.setUrl(`${BOOKS_URLS.customers}/cust-6`);
  await tl.wait(600);

  // Click Deactivate button
  tl.showCaption(CAPTIONS.clickDeactivate);
  await pressOn(tl, "[data-tl=btn-deactivate-customer]");
  await tl.wait(1000);

  // Switch status filter to Inactive
  tl.showCaption(CAPTIONS.filterInactive);
  await pressOn(tl, "[data-tl=select-customer-status]");
  tl.setVar("booksCustomerStatusDropdownOpen", true);
  await tl.wait(400);
  await pressOn(tl, "[data-tl=status-opt-inactive]");
  tl.setVar("booksCustomerFilter", "inactive");
  tl.setVar("booksCustomerStatusDropdownOpen", false);
  await tl.wait(800);

  // Verification
  tl.showCaption(CAPTIONS.verifyInactive);
  await hoverOn(tl, "[data-tl=row-customer-1]", { ms: 600 });
  await ring(tl, "[data-tl=badge-customer-status-1]", 1600);
  await tl.wait(800);

  await finishBooks(tl, STEP30_DURATION_MS);
}
