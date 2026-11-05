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

export const STEP29_DURATION_MS = 14500;

export async function runStep29(tl: Timeline) {
  beginBooks(tl, BOOKS_URLS.customers, "customers", [0.25, 0.28]);

  // Click Brightway Stores (row 2)
  await tl.at(400);
  tl.showCaption(CAPTIONS.clickCustomer);
  await pressOn(tl, "[data-tl=link-customer-2]");
  tl.setVar("booksActiveCustomer", INITIAL_ACTIVE_CUSTOMERS[1]);
  tl.setVar("booksView", "customer-detail");
  tl.setUrl(BOOKS_URLS.customerDetails);
  await tl.wait(600);

  // Review fields
  tl.showCaption(CAPTIONS.viewDetails);
  await hoverOn(tl, "[data-tl=input-detail-tax-id]", { ms: 500 });
  await ring(tl, "[data-tl=input-detail-tax-id]", 1200);
  await tl.wait(300);

  // Edit Phone
  tl.showCaption(CAPTIONS.editPhone);
  await pressOn(tl, "[data-tl=input-detail-phone]");
  await tl.typeText("[data-tl=input-detail-phone]", "7700 900199", { msPerChar: 50 });
  tl.setVar("booksDetailPhone", "7700 900199");
  await tl.wait(300);

  // Edit Notes
  tl.showCaption(CAPTIONS.editNotes);
  await pressOn(tl, "[data-tl=input-detail-notes]");
  await tl.typeText(
    "[data-tl=input-detail-notes]",
    "Pays by bank transfer. Orders weekly. Prefers email invoices.",
    { msPerChar: 30 }
  );
  tl.setVar(
    "booksDetailNotes",
    "Pays by bank transfer. Orders weekly. Prefers email invoices."
  );
  await tl.wait(400);

  // Click Update Customer
  tl.showCaption(CAPTIONS.clickUpdate);
  await pressOn(tl, "[data-tl=btn-update-customer]");
  await tl.wait(1200);

  // Return to list
  tl.showCaption(CAPTIONS.backToList);
  await pressOn(tl, "[data-tl=btn-back-to-customers]");
  tl.setVar("booksView", "customers");
  tl.setUrl(BOOKS_URLS.customers);
  await tl.wait(600);

  // Re-open to confirm
  tl.showCaption(CAPTIONS.verifySaved);
  await pressOn(tl, "[data-tl=link-customer-2]");
  tl.setVar("booksView", "customer-detail");
  tl.setUrl(BOOKS_URLS.customerDetails);
  await hoverOn(tl, "[data-tl=input-detail-phone]", { ms: 500 });
  await ring(tl, "[data-tl=input-detail-phone]", 1200);
  await tl.wait(800);

  await finishBooks(tl, STEP29_DURATION_MS);
}
