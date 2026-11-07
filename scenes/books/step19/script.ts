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

export const STEP19_DURATION_MS = 16800;

export async function runStep19(tl: Timeline) {
  beginBooks(tl, BOOKS_URLS.details, "item-detail", [0.85, 0.15]);
  tl.setVar("booksCurrentItem", FOOD_FARM_ITEM);
  tl.setVar("booksItemLocked", false);
  tl.setVar("booksDetailTab", "overview");

  await tl.at(400);
  tl.showCaption(CAPTIONS.openMore);
  await pressOn(tl, "[data-tl=btn-more-menu]");
  await tl.wait(400);

  // Lock Item
  tl.showCaption(CAPTIONS.clickLock);
  await pressOn(tl, "[data-tl=more-opt-toggle-lock]");
  await tl.wait(800);

  tl.showCaption(CAPTIONS.lockedBanner);
  await hoverOn(tl, "[data-tl=banner-item-locked]", { ms: 500 });
  await ring(tl, "[data-tl=banner-item-locked]", 1800);
  await tl.wait(800);

  // Unlock Item
  tl.showCaption(CAPTIONS.unlockMore);
  await pressOn(tl, "[data-tl=btn-more-menu]");
  await tl.wait(400);

  tl.showCaption(CAPTIONS.clickUnlock);
  await pressOn(tl, "[data-tl=more-opt-toggle-lock]");
  await tl.wait(800);

  tl.showCaption(CAPTIONS.unlockedReady);
  await hoverOn(tl, "[data-tl=detail-item-title]", { ms: 500 });
  await ring(tl, "[data-tl=btn-edit-item]", 1600);
  await tl.wait(1000);

  await finishBooks(tl, STEP19_DURATION_MS);
}
