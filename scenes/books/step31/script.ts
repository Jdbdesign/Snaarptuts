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
  type CustomerItem,
  INITIAL_ACTIVE_CUSTOMERS,
  INITIAL_INACTIVE_CUSTOMERS,
} from "@/components/books/books-data";
import { CAPTIONS } from "./data";

export const STEP31_DURATION_MS = 12000;

export async function runStep31(tl: Timeline) {
  beginBooks(tl, BOOKS_URLS.customers, "customers", [0.25, 0.28]);

  // Seeded inactive state with Casey Brown inactive
  const caseyInactive: CustomerItem = {
    ...INITIAL_ACTIVE_CUSTOMERS[5],
    status: "inactive",
  };
  tl.setVar("booksCustomerFilter", "inactive");
  tl.setVar("booksInactiveCustomers", [caseyInactive, ...INITIAL_INACTIVE_CUSTOMERS]);
  const activeWithoutCasey = INITIAL_ACTIVE_CUSTOMERS.filter((c) => c.id !== "cust-6");
  tl.setVar("booksCustomers", activeWithoutCasey);

  // Click Casey Brown
  await tl.at(400);
  tl.showCaption(CAPTIONS.openInactiveCustomer);
  await pressOn(tl, "[data-tl=link-customer-1]");
  tl.setVar("booksActiveCustomer", caseyInactive);
  tl.setVar("booksView", "customer-detail");
  tl.setUrl(`${BOOKS_URLS.customers}/cust-6`);
  await tl.wait(600);

  // Click Activate button
  tl.showCaption(CAPTIONS.clickActivate);
  await pressOn(tl, "[data-tl=btn-activate-customer]");
  await tl.wait(1000);

  // Switch status filter to Active
  tl.showCaption(CAPTIONS.filterActive);
  await pressOn(tl, "[data-tl=select-customer-status]");
  tl.setVar("booksCustomerStatusDropdownOpen", true);
  await tl.wait(400);
  await pressOn(tl, "[data-tl=status-opt-active]");
  tl.setVar("booksCustomerFilter", "active");
  tl.setVar("booksCustomerStatusDropdownOpen", false);
  await tl.wait(800);

  // Verification in Active list
  tl.showCaption(CAPTIONS.verifyReactivated);
  await hoverOn(tl, "[data-tl=row-customer-1]", { ms: 600 });
  await ring(tl, "[data-tl=badge-customer-status-1]", 1600);
  await tl.wait(800);

  await finishBooks(tl, STEP31_DURATION_MS);
}
