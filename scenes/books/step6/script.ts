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

export const STEP6_DURATION_MS = 14000;

export async function runStep6(tl: Timeline) {
  beginBooks(tl, BOOKS_URLS.dashboard, "home", [0.12, 0.12]);

  await tl.at(400);
  tl.showCaption(CAPTIONS.clickProducts);
  await pressOn(tl, "[data-tl=nav-books-products]");
  await tl.wait(600);

  tl.showCaption(CAPTIONS.activeList);
  await hoverOn(tl, "[data-tl=products-table]", { ms: 600 });
  await ring(tl, "[data-tl=products-table]", 1600);

  // Open status dropdown
  tl.showCaption(CAPTIONS.openFilter);
  await pressOn(tl, "[data-tl=btn-filter-dropdown]");
  await tl.wait(400);

  // Inactive items
  tl.showCaption(CAPTIONS.pickInactive);
  await pressOn(tl, "[data-tl=filter-opt-inactive]");
  await tl.wait(1400);

  // Open status dropdown
  await pressOn(tl, "[data-tl=btn-filter-dropdown]");
  await tl.wait(400);

  // All items
  tl.showCaption(CAPTIONS.pickAll);
  await pressOn(tl, "[data-tl=filter-opt-all]");
  await tl.wait(1400);

  // Back to Active items
  await pressOn(tl, "[data-tl=btn-filter-dropdown]");
  await tl.wait(400);
  tl.showCaption(CAPTIONS.backActive);
  await pressOn(tl, "[data-tl=filter-opt-active]");
  await tl.wait(800);

  // Click search icon
  tl.showCaption(CAPTIONS.searchMagnifier);
  await pressOn(tl, "[data-tl=btn-table-search]");
  await tl.wait(400);

  // Type "rice"
  tl.showCaption(CAPTIONS.typeSearch);
  await pressOn(tl, "[data-tl=input-table-search]");
  await tl.typeText("[data-tl=input-table-search]", "rice", { msPerChar: 80 });
  tl.setVar("booksSearchFilter", "rice");
  await tl.wait(1600);

  // Clear search
  tl.showCaption(CAPTIONS.clearSearch);
  tl.setVar("booksSearchFilter", "");
  await tl.wait(800);

  await finishBooks(tl, STEP6_DURATION_MS);
}
