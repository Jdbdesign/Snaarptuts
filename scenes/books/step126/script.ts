import type { Timeline } from "@/lib/timeline";
import {
  beginBooks,
  finishBooks,
  pressOn,
  ring,
} from "@/components/books/books-timeline";
import { BOOKS_URLS } from "@/components/books/books-data";
import { STEP126_CAPTIONS } from "./data";

export const STEP126_DURATION_MS = 8300;

export async function runStep126(tl: Timeline) {
  tl.setVar("__sceneId", "step126");
  beginBooks(tl, BOOKS_URLS.creditNotes, "credit-notes", [0.15, 0.5]);

  await tl.wait(400);
  tl.showCaption(STEP126_CAPTIONS.openCreditNotes);
  await pressOn(tl, "[data-tl=nav-sales-credit-notes]");

  await tl.wait(600);
  tl.showCaption(STEP126_CAPTIONS.reviewList);
  await ring(tl, "[data-tl=credit-notes-title]", 1200);

  await tl.wait(800);
  await finishBooks(tl, STEP126_DURATION_MS);
}
