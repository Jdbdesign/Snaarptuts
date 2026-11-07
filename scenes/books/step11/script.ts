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

export const STEP11_DURATION_MS = 17800;

export async function runStep11(tl: Timeline) {
  beginBooks(tl, BOOKS_URLS.products, "products", [0.85, 0.12]);

  await tl.at(400);
  tl.showCaption(CAPTIONS.clickMore);
  await pressOn(tl, "[data-tl=btn-products-menu]");
  await tl.wait(400);

  tl.showCaption(CAPTIONS.refreshList);
  await pressOn(tl, "[data-tl=menu-opt-refresh]");
  tl.showCaption(CAPTIONS.reloading);
  await tl.wait(1000);

  // Show newly arrived item
  tl.showCaption(CAPTIONS.refreshedItem);
  await hoverOn(tl, "[data-tl=row-item-1]", { ms: 600 });
  await ring(tl, "[data-tl=row-item-1]", 2000);
  await tl.wait(1400);

  await finishBooks(tl, STEP11_DURATION_MS);
}
