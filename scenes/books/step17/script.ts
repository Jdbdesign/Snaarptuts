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

export const STEP17_DURATION_MS = 17300;

export async function runStep17(tl: Timeline) {
  beginBooks(tl, BOOKS_URLS.details, "item-detail", [0.85, 0.15]);
  tl.setVar("booksItems", [FOOD_FARM_ITEM, ...INITIAL_ACTIVE_ITEMS]);
  tl.setVar("booksCurrentItem", FOOD_FARM_ITEM);
  tl.setVar("booksDetailTab", "overview");

  await tl.at(400);
  tl.showCaption(CAPTIONS.clickMore);
  await pressOn(tl, "[data-tl=btn-more-menu]");
  await tl.wait(400);

  tl.showCaption(CAPTIONS.clickClone);
  await pressOn(tl, "[data-tl=more-opt-clone]");
  await tl.wait(800);

  tl.showCaption(CAPTIONS.cloneOpened);
  await hoverOn(tl, "[data-tl=detail-item-title]", { ms: 500 });
  await ring(tl, "[data-tl=detail-item-title]", 1600);
  await tl.wait(800);

  // Click Back
  tl.showCaption(CAPTIONS.clickBack);
  await pressOn(tl, "[data-tl=breadcrumb-back]");
  tl.setUrl(BOOKS_URLS.products);
  await tl.wait(800);

  await hoverOn(tl, "[data-tl=row-item-1]", { ms: 500 });
  await ring(tl, "[data-tl=row-item-1]", 1600);
  await hoverOn(tl, "[data-tl=row-item-2]", { ms: 500 });
  await ring(tl, "[data-tl=row-item-2]", 1600);
  await tl.wait(1000);

  await finishBooks(tl, STEP17_DURATION_MS);
}
