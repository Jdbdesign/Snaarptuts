import type { Timeline } from "@/lib/timeline";
import {
  beginBooks,
  finishBooks,
  pressOn,
} from "@/components/books/books-timeline";
import { BOOKS_URLS } from "@/components/books/books-data";
import { CAPTIONS } from "./data";

export const STEP7_DURATION_MS = 14000;

export async function runStep7(tl: Timeline) {
  beginBooks(tl, BOOKS_URLS.products, "products", [0.85, 0.12]);

  await tl.at(400);
  tl.showCaption(CAPTIONS.clickMore);
  await pressOn(tl, "[data-tl=btn-products-menu]");
  await tl.wait(400);

  tl.showCaption(CAPTIONS.clickSort);
  await pressOn(tl, "[data-tl=menu-opt-sort]");
  await tl.wait(600);

  // Sort by Name (asc)
  tl.showCaption(CAPTIONS.sortName);
  await pressOn(tl, "[data-tl=sort-opt-name]");
  await tl.wait(1800);

  // Sort by Selling Price (desc)
  tl.showCaption(CAPTIONS.sortSellingPrice);
  await pressOn(tl, "[data-tl=sort-opt-selling-price]");
  await tl.wait(1800);

  // Finish on Date Created (desc)
  tl.showCaption(CAPTIONS.sortDateCreated);
  await pressOn(tl, "[data-tl=sort-opt-date-created]");
  await tl.wait(1400);

  // Close drawer
  tl.showCaption(CAPTIONS.closeDrawer);
  await pressOn(tl, "[data-tl=books-sort-drawer-overlay]");
  tl.setVar("booksSortDrawerOpen", false);
  await tl.wait(1000);

  await finishBooks(tl, STEP7_DURATION_MS);
}
