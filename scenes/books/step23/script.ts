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

export const STEP23_DURATION_MS = 12800;

export async function runStep23(tl: Timeline) {
  beginBooks(tl, BOOKS_URLS.dashboard, "home", [0.12, 0.42]);
  tl.setVar("booksSalesExpanded", false);

  await tl.at(400);
  tl.showCaption(CAPTIONS.clickSales);
  await pressOn(tl, "[data-tl=nav-books-sales]");
  tl.setVar("booksSalesExpanded", true);
  await tl.wait(500);

  tl.showCaption(CAPTIONS.clickCustomers);
  await pressOn(tl, "[data-tl=nav-sales-customers]");
  tl.setVar("booksView", "customers");
  tl.setUrl(BOOKS_URLS.customers);
  await tl.wait(600);

  tl.showCaption(CAPTIONS.viewList);
  await hoverOn(tl, "[data-tl=row-customer-1]", { ms: 600 });
  await ring(tl, "[data-tl=badge-customer-status-1]", 1400);
  await tl.wait(400);

  tl.showCaption(CAPTIONS.pointActions);
  await hoverOn(tl, "[data-tl=btn-delete-customer-1]", { ms: 500 });
  await ring(tl, "[data-tl=btn-delete-customer-1]", 1400);
  await tl.wait(800);

  await finishBooks(tl, STEP23_DURATION_MS);
}
