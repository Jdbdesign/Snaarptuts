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
  INITIAL_ACTIVE_ITEMS,
} from "@/components/books/books-data";
import { CAPTIONS } from "./data";

export const STEP21_DURATION_MS = 14000;

export async function runStep21(tl: Timeline) {
  beginBooks(tl, BOOKS_URLS.products, "products", [0.45, 0.25]);
  tl.setVar("booksItems", INITIAL_ACTIVE_ITEMS);
  tl.setVar("booksSelectedIds", []);

  await tl.at(400);
  tl.showCaption(CAPTIONS.tickFirst);
  await pressOn(tl, "[data-tl=row-checkbox-1]");
  await tl.wait(600);

  tl.showCaption(CAPTIONS.tickSecond);
  await pressOn(tl, "[data-tl=row-checkbox-2]");
  await tl.wait(600);

  await hoverOn(tl, "[data-tl=bulk-action-bar]", { ms: 400 });
  await ring(tl, "[data-tl=bulk-action-bar]", 1400);

  // Select all via header checkbox
  tl.showCaption(CAPTIONS.selectAll);
  await pressOn(tl, "[data-tl=th-checkbox]");
  await tl.wait(1200);

  // Deselect all
  tl.showCaption(CAPTIONS.deselectAll);
  await pressOn(tl, "[data-tl=th-checkbox]");
  await tl.wait(1000);

  // Select 3 items: Notebook A5 (row 10), Cold Pressed Juice 1L (row 13), Storage Jars (row 14)
  tl.showCaption(CAPTIONS.selectThree);
  await pressOn(tl, "[data-tl=row-checkbox-10]");
  await tl.wait(400);
  await pressOn(tl, "[data-tl=row-checkbox-13]");
  await tl.wait(400);
  await pressOn(tl, "[data-tl=row-checkbox-14]");
  await tl.wait(600);

  tl.showCaption(CAPTIONS.explainCounter);
  await hoverOn(tl, "[data-tl=bulk-selected-count]", { ms: 500 });
  await ring(tl, "[data-tl=bulk-action-bar]", 1800);
  await tl.wait(1200);

  await finishBooks(tl, STEP21_DURATION_MS);
}
