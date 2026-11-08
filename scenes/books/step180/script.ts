import type { Timeline } from "@/lib/timeline";
import {
  beginBooks,
  finishBooks,
  pressOn,
  ring,
} from "@/components/books/books-timeline";
import { BOOKS_URLS, INITIAL_MANUAL_JOURNALS } from "@/components/books/books-data";
import { CAPTIONS } from "./data";

export const STEP180_DURATION_MS = 9000;

export async function runStep180(tl: Timeline) {
  beginBooks(tl, BOOKS_URLS.manualJournals, "manual-journals", [0.4, 0.3], 180);

  tl.setVar("booksAccountantExpanded", true);

  await tl.at(400);
  tl.showCaption(CAPTIONS.clickJournalRow);
  await pressOn(tl, "[data-tl=row-journal-14]");
  tl.setVar("booksActiveJournal", INITIAL_MANUAL_JOURNALS[0]);
  tl.setVar("booksView", "manual-journal-detail");
  tl.setUrl(BOOKS_URLS.manualJournalDetails);
  await tl.wait(600);

  tl.showCaption(CAPTIONS.reviewMeta);
  await ring(tl, "[data-tl=badge-journal-detail-status]", 1000);
  await ring(tl, "[data-tl=card-journal-details]", 1200);
  await tl.wait(300);

  tl.showCaption(CAPTIONS.reviewLines);
  await ring(tl, "[data-tl=table-journal-entries]", 1200);
  await tl.wait(300);

  tl.showCaption(CAPTIONS.downloadPdf);
  await pressOn(tl, "[data-tl=btn-journal-download]");
  tl.toast("Journal document downloaded");
  await tl.wait(500);

  await finishBooks(tl, STEP180_DURATION_MS);
}
