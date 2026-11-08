import type { Timeline } from "@/lib/timeline";
import {
  beginBooks,
  finishBooks,
  pressOn,
  ring,
} from "@/components/books/books-timeline";
import { BOOKS_URLS } from "@/components/books/books-data";
import { CAPTIONS } from "./data";

export const STEP179_DURATION_MS = 10000;

export async function runStep179(tl: Timeline) {
  beginBooks(tl, BOOKS_URLS.manualJournals, "manual-journals", [0.4, 0.3], 179);

  tl.setVar("booksAccountantExpanded", true);

  await tl.at(400);
  tl.showCaption(CAPTIONS.viewJournals);
  await ring(tl, "[data-tl=btn-journals-view]", 1000);
  await tl.wait(200);

  tl.showCaption(CAPTIONS.openViewFilter);
  await pressOn(tl, "[data-tl=btn-journals-view]");
  tl.setVar("booksJournalsViewOpen", true);
  await tl.wait(400);

  tl.showCaption(CAPTIONS.filterDrafts);
  await pressOn(tl, "[data-tl=opt-view-draft]");
  tl.setVar("booksJournalsView", "Draft");
  tl.setVar("booksJournalsViewOpen", false);
  await tl.wait(500);

  tl.showCaption(CAPTIONS.emptyDrafts);
  await ring(tl, "[data-tl=empty-draft-journals]", 1200);
  await tl.wait(300);

  tl.showCaption(CAPTIONS.openViewFilterBack);
  await pressOn(tl, "[data-tl=btn-journals-view]");
  tl.setVar("booksJournalsViewOpen", true);
  await tl.wait(400);

  tl.showCaption(CAPTIONS.filterAll);
  await pressOn(tl, "[data-tl=opt-view-all]");
  tl.setVar("booksJournalsView", "All");
  tl.setVar("booksJournalsViewOpen", false);
  await tl.wait(500);

  tl.showCaption(CAPTIONS.searchJournal);
  await pressOn(tl, "[data-tl=input-journals-search]");
  await tl.wait(300);

  tl.showCaption(CAPTIONS.typeSearch);
  await tl.typeText("[data-tl=input-journals-search]", "JRN-0014");
  tl.setVar("booksJournalsSearch", "JRN-0014");
  await tl.wait(500);

  await ring(tl, "[data-tl=row-journal-14]", 1000);

  await finishBooks(tl, STEP179_DURATION_MS);
}
