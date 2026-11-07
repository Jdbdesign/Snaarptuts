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
} from "@/components/books/books-data";
import { CAPTIONS } from "./data";

export const STEP20_DURATION_MS = 18300;

export async function runStep20(tl: Timeline) {
  const farmCopy = {
    ...FOOD_FARM_ITEM,
    id: "food-farm-copy",
    name: "Food Farm (Copy)",
  };

  beginBooks(tl, BOOKS_URLS.details, "item-detail", [0.85, 0.15]);
  tl.setVar("booksItems", [farmCopy, FOOD_FARM_ITEM, ...INITIAL_ACTIVE_ITEMS]);
  tl.setVar("booksCurrentItem", farmCopy);
  tl.setVar("booksDetailTab", "overview");

  await tl.at(400);
  tl.showCaption(CAPTIONS.openMore);
  await pressOn(tl, "[data-tl=btn-more-menu]");
  await tl.wait(400);

  // Click Delete
  tl.showCaption(CAPTIONS.clickDelete);
  await pressOn(tl, "[data-tl=more-opt-delete]");
  await tl.wait(600);

  // Confirmation dialog
  tl.showCaption(CAPTIONS.confirmDialog);
  await hoverOn(tl, "[data-tl=books-confirm-card]", { ms: 500 });
  await ring(tl, "[data-tl=books-confirm-card]", 1800);

  // Click OK
  tl.showCaption(CAPTIONS.clickConfirm);
  await pressOn(tl, "[data-tl=btn-confirm-ok]");
  tl.setUrl(BOOKS_URLS.products);
  await tl.wait(1200);

  tl.showCaption(CAPTIONS.deletedResult);
  await hoverOn(tl, "[data-tl=row-item-1]", { ms: 500 });
  await ring(tl, "[data-tl=row-item-1]", 1600);
  await tl.wait(1000);

  await finishBooks(tl, STEP20_DURATION_MS);
}
