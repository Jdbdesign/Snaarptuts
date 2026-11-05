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

export const STEP1_DURATION_MS = 11000;

export async function runStep1(tl: Timeline) {
  beginBooks(tl, BOOKS_URLS.dashboard, "home", [0.45, 0.35]);

  await tl.at(400);
  tl.showCaption(CAPTIONS.welcome);
  await tl.wait(1400);

  // Highlight suite rail
  tl.showCaption(CAPTIONS.suiteRail);
  await hoverOn(tl, "[data-tl=suite-left-rail]", { ms: 500 });
  await ring(tl, "[data-tl=suite-left-rail]", 1800);

  // Highlight left menu
  tl.showCaption(CAPTIONS.leftMenu);
  await hoverOn(tl, "[data-tl=books-left-nav]", { ms: 500 });
  await ring(tl, "[data-tl=books-left-nav]", 2000);

  // Highlight top bar
  tl.showCaption(CAPTIONS.topBar);
  await hoverOn(tl, "[data-tl=books-header]", { ms: 500 });
  await ring(tl, "[data-tl=books-header]", 1800);

  // Click search input, type "rice", clear it
  tl.showCaption(CAPTIONS.searchTry);
  await pressOn(tl, "[data-tl=books-search-input]");
  await tl.wait(200);
  await tl.typeText("[data-tl=books-search-input]", "rice", { msPerChar: 80 });
  tl.setVar("booksTopSearchQuery", "rice");
  await tl.wait(600);

  tl.showCaption(CAPTIONS.searchTyped);
  await tl.wait(800);
  tl.setVar("booksTopSearchQuery", "");
  await tl.wait(300);

  await finishBooks(tl, STEP1_DURATION_MS);
}
