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
} from "@/components/books/books-data";
import { CAPTIONS } from "./data";

export const STEP32_DURATION_MS = 15500;

export async function runStep32(tl: Timeline) {
  beginBooks(tl, BOOKS_URLS.customers, "customers", [0.93, 0.28]);

  // Seed Summit Cycles as the top row
  const summitCust: CustomerItem = {
    id: "cust-summit-del",
    type: "business",
    companyName: "Summit Cycles",
    displayName: "Summit Cycles",
    email: "sales@summitcycles.example",
    phoneCode: "+44",
    phone: "7700 900162",
    status: "active",
    createdAt: "2026-11-05T12:02:00Z",
  };
  tl.setVar("booksCustomers", [summitCust, ...INITIAL_ACTIVE_CUSTOMERS]);

  // Click trash icon for Summit Cycles
  await tl.at(400);
  tl.showCaption(CAPTIONS.clickDelete);
  await pressOn(tl, "[data-tl=btn-delete-customer-summit]");
  await tl.wait(600);

  // In-app confirmation dialog
  tl.showCaption(CAPTIONS.confirmDialog);
  await hoverOn(tl, "[data-tl=books-confirm-card]", { ms: 500 });
  await ring(tl, "[data-tl=books-confirm-card]", 1400);

  // Click Delete button
  tl.showCaption(CAPTIONS.clickConfirmDelete);
  await pressOn(tl, "[data-tl=btn-confirm-delete]");
  await tl.wait(1200);

  // Verification
  tl.showCaption(CAPTIONS.deleteComplete);
  await hoverOn(tl, "[data-tl=customers-table]", { ms: 600 });
  await ring(tl, "[data-tl=customers-table]", 1600);
  await tl.wait(800);

  await finishBooks(tl, STEP32_DURATION_MS);
}
