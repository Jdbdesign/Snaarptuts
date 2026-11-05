import type { Timeline } from "@/lib/timeline";
import {
  beginBooks,
  finishBooks,
  pressOn,
  ring,
} from "@/components/books/books-timeline";
import { BOOKS_URLS } from "@/components/books/books-data";
import { STEP33_CAPTIONS } from "./data";

export const STEP33_DURATION_MS = 10000;

export async function runStep33(tl: Timeline) {
  tl.setVar("__sceneId", "step33");
  beginBooks(tl, BOOKS_URLS.dashboard, "home", [0.08, 0.38]);
  tl.setVar("booksSalesExpanded", false);

  await tl.wait(400);
  tl.showCaption(STEP33_CAPTIONS.sales);
  await pressOn(tl, "[data-tl=nav-books-sales]");

  await tl.wait(400);
  tl.showCaption(STEP33_CAPTIONS.quotes);
  await pressOn(tl, "[data-tl=nav-sales-quotes]");

  await tl.wait(400);
  tl.showCaption(STEP33_CAPTIONS.overview);
  await ring(tl, "[data-tl=quotes-header-title]", 1000);
  await ring(tl, "[data-tl=input-search-quotes]", 1000);
  await ring(tl, "[data-tl=dropdown-quotes-status]", 1000);
  await ring(tl, "[data-tl=btn-new-quote]", 1000);
  await ring(tl, "[data-tl=quotes-table-card]", 1500);

  await finishBooks(tl, STEP33_DURATION_MS);
}
