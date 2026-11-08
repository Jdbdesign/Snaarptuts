import type { Timeline } from "@/lib/timeline";
import {
  beginBooks,
  finishBooks,
  pressOn,
  ring,
} from "@/components/books/books-timeline";
import { BOOKS_URLS, INITIAL_MANUAL_JOURNALS } from "@/components/books/books-data";
import { CAPTIONS } from "./data";

export const STEP181_DURATION_MS = 9500;

export async function runStep181(tl: Timeline) {
  beginBooks(tl, BOOKS_URLS.manualJournalDetails, "manual-journal-detail", [0.4, 0.3], 181);

  tl.setVar("booksAccountantExpanded", true);
  tl.setVar("booksActiveJournal", INITIAL_MANUAL_JOURNALS[0]);

  await tl.at(400);
  tl.showCaption(CAPTIONS.clickScheduleReverse);
  await pressOn(tl, "[data-tl=btn-schedule-reverse]");
  tl.setVar("booksReversePanelOpen", true);
  await tl.wait(400);

  tl.showCaption(CAPTIONS.openCalendar);
  await pressOn(tl, "[data-tl=input-reverse-date]");
  tl.setVar("booksReverseDatePickerOpen", true);
  await tl.wait(400);

  tl.showCaption(CAPTIONS.selectDate);
  await pressOn(tl, "[data-tl=date-day-30]");
  tl.setVar("booksReverseDate", "11/30/2026");
  tl.setVar("booksReverseDatePickerOpen", false);
  await tl.wait(400);

  tl.showCaption(CAPTIONS.togglePublish);
  await pressOn(tl, "[data-tl=check-publish-on-reverse-date]");
  tl.setVar("booksPublishOnReverseDate", true);
  await tl.wait(400);

  tl.showCaption(CAPTIONS.confirmSchedule);
  await pressOn(tl, "[data-tl=btn-confirm-reverse]");
  tl.setVar("booksReversePanelOpen", false);
  const updated = {
    ...INITIAL_MANUAL_JOURNALS[0],
    reverseDate: "30 Nov 2026",
    publishOnReverseDate: true,
  };
  tl.setVar("booksActiveJournal", updated);
  tl.toast("Reverse journal scheduled on 30 Nov 2026");
  await tl.wait(500);

  tl.showCaption(CAPTIONS.reviewChip);
  await ring(tl, "[data-tl=chip-reverse-date]", 1200);

  await finishBooks(tl, STEP181_DURATION_MS);
}
