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

export const STEP14_DURATION_MS = 12000;

export async function runStep14(tl: Timeline) {
  beginBooks(tl, BOOKS_URLS.products, "products", [0.45, 0.25]);
  tl.setVar("booksItems", [FOOD_FARM_ITEM, ...INITIAL_ACTIVE_ITEMS]);

  await tl.at(400);
  tl.showCaption(CAPTIONS.clickItem);
  await pressOn(tl, "[data-tl=link-item-1]");
  tl.setUrl(BOOKS_URLS.details);
  await tl.wait(600);

  // Read header
  tl.showCaption(CAPTIONS.detailsHeader);
  await hoverOn(tl, "[data-tl=detail-item-title]", { ms: 500 });
  await ring(tl, "[data-tl=btn-more-menu]", 1600);

  // Overview content
  tl.showCaption(CAPTIONS.readOverview);
  await hoverOn(tl, "[data-tl=content-details-overview]", { ms: 600 });
  await ring(tl, "[data-tl=content-details-overview]", 2000);
  await tl.wait(1200);

  // Click Back
  tl.showCaption(CAPTIONS.clickBack);
  await pressOn(tl, "[data-tl=breadcrumb-back]");
  tl.setUrl(BOOKS_URLS.products);
  await tl.wait(800);

  await finishBooks(tl, STEP14_DURATION_MS);
}
