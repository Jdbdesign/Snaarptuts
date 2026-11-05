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

export const STEP16_DURATION_MS = 12000;

export async function runStep16(tl: Timeline) {
  beginBooks(tl, BOOKS_URLS.details, "item-detail", [0.85, 0.15]);
  tl.setVar("booksCurrentItem", FOOD_FARM_ITEM);
  tl.setVar("booksDetailTab", "overview");

  await tl.at(400);
  tl.showCaption(CAPTIONS.clickEdit);
  await pressOn(tl, "[data-tl=btn-edit-item]");
  tl.setUrl(BOOKS_URLS.edit);
  await tl.wait(600);

  tl.showCaption(CAPTIONS.editPage);
  await hoverOn(tl, "[data-tl=form-title]", { ms: 400 });
  await ring(tl, "[data-tl=form-title]", 1200);

  // Change Selling Price to 220
  tl.showCaption(CAPTIONS.changePrice);
  await pressOn(tl, "[data-tl=input-selling-price]");
  tl.fill("[data-tl=input-selling-price]", "");
  await tl.typeText("[data-tl=input-selling-price]", "220", 70);
  tl.setVar("booksFormSellingPrice", "220");
  await tl.wait(600);

  // Save
  tl.showCaption(CAPTIONS.saveEdit);
  await pressOn(tl, "[data-tl=btn-save-item]");
  tl.setUrl(BOOKS_URLS.details);
  await tl.wait(1000);

  await hoverOn(tl, "[data-tl=detail-item-title]", { ms: 500 });
  await ring(tl, "[data-tl=content-details-overview]", 1800);
  await tl.wait(1200);

  await finishBooks(tl, STEP16_DURATION_MS);
}
