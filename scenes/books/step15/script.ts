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
} from "@/components/books/books-data";
import { CAPTIONS } from "./data";

export const STEP15_DURATION_MS = 10000;

export async function runStep15(tl: Timeline) {
  beginBooks(tl, BOOKS_URLS.details, "item-detail", [0.45, 0.25]);
  tl.setVar("booksCurrentItem", FOOD_FARM_ITEM);
  tl.setVar("booksDetailTab", "overview");

  await tl.at(400);
  tl.showCaption(CAPTIONS.clickTransactions);
  await pressOn(tl, "[data-tl=tab-details-transactions]");
  await tl.wait(500);

  tl.showCaption(CAPTIONS.readTransactions);
  await hoverOn(tl, "[data-tl=content-details-transactions]", { ms: 600 });
  await ring(tl, "[data-tl=content-details-transactions]", 2200);

  // Click History
  tl.showCaption(CAPTIONS.clickHistory);
  await pressOn(tl, "[data-tl=tab-details-history]");
  await tl.wait(500);

  tl.showCaption(CAPTIONS.readHistory);
  await hoverOn(tl, "[data-tl=content-details-history]", { ms: 600 });
  await ring(tl, "[data-tl=content-details-history]", 2200);
  await tl.wait(1200);

  await finishBooks(tl, STEP15_DURATION_MS);
}
