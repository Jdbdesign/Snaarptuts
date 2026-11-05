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
  FOOD_FARM_ITEM,
  INITIAL_ACTIVE_ITEMS,
  INITIAL_INACTIVE_ITEMS,
} from "@/components/books/books-data";
import { CAPTIONS } from "./data";

export const STEP18_DURATION_MS = 18000;

export async function runStep18(tl: Timeline) {
  const farmCopy = {
    ...FOOD_FARM_ITEM,
    id: "food-farm-copy",
    name: "Food Farm (Copy)",
  };

  beginBooks(tl, BOOKS_URLS.details, "item-detail", [0.85, 0.15]);
  tl.setVar("booksItems", [farmCopy, FOOD_FARM_ITEM, ...INITIAL_ACTIVE_ITEMS]);
  tl.setVar("booksInactiveItems", INITIAL_INACTIVE_ITEMS);
  tl.setVar("booksCurrentItem", farmCopy);
  tl.setVar("booksItemStatus", "active");
  tl.setVar("booksDetailTab", "overview");

  await tl.at(400);
  tl.showCaption(CAPTIONS.openMore);
  await pressOn(tl, "[data-tl=btn-more-menu]");
  await tl.wait(400);

  // Mark as Inactive
  tl.showCaption(CAPTIONS.markInactive);
  await pressOn(tl, "[data-tl=more-opt-toggle-active]");
  await tl.wait(800);

  tl.showCaption(CAPTIONS.statusInactive);
  await hoverOn(tl, "[data-tl=content-details-overview]", { ms: 500 });
  await ring(tl, "[data-tl=content-details-overview]", 1400);

  // Return to list
  tl.showCaption(CAPTIONS.backToList);
  await pressOn(tl, "[data-tl=breadcrumb-back]");
  tl.setUrl(BOOKS_URLS.products);
  await tl.wait(800);

  // Filter Inactive items
  tl.showCaption(CAPTIONS.filterInactive);
  await pressOn(tl, "[data-tl=btn-filter-dropdown]");
  await tl.wait(400);
  await pressOn(tl, "[data-tl=filter-opt-inactive]");
  await tl.wait(800);

  // Open inactive item details
  tl.showCaption(CAPTIONS.openInactiveItem);
  await pressOn(tl, "[data-tl=link-item-1]");
  tl.setUrl(BOOKS_URLS.details);
  await tl.wait(800);

  // Mark as Active again
  await pressOn(tl, "[data-tl=btn-more-menu]");
  await tl.wait(400);
  tl.showCaption(CAPTIONS.markActive);
  await pressOn(tl, "[data-tl=more-opt-toggle-active]");
  await tl.wait(800);

  // Return to Active list
  tl.showCaption(CAPTIONS.restoredActive);
  await pressOn(tl, "[data-tl=breadcrumb-back]");
  tl.setUrl(BOOKS_URLS.products);
  await tl.wait(500);

  await pressOn(tl, "[data-tl=btn-filter-dropdown]");
  await tl.wait(400);
  await pressOn(tl, "[data-tl=filter-opt-active]");
  await tl.wait(800);

  await hoverOn(tl, "[data-tl=row-item-1]", { ms: 500 });
  await ring(tl, "[data-tl=row-item-1]", 1600);
  await tl.wait(1000);

  await finishBooks(tl, STEP18_DURATION_MS);
}
