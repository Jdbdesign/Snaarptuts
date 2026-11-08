import type { Timeline } from "@/lib/timeline";
import {
  beginBooks,
  finishBooks,
  pressOn,
  ring,
} from "@/components/books/books-timeline";
import { BOOKS_URLS } from "@/components/books/books-data";
import { CAPTIONS } from "./data";

export const STEP170_DURATION_MS = 8500;

export async function runStep170(tl: Timeline) {
  beginBooks(tl, BOOKS_URLS.bankAccounts, "bank-accounts", [0.4, 0.3], 170);

  tl.setVar("booksBankingExpanded", true);
  tl.setVar("booksBankAccounts", []);

  await tl.at(400);
  tl.showCaption(CAPTIONS.viewBankAccounts);
  await ring(tl, "[data-tl=card-total-balance]", 1000);
  await tl.wait(200);

  tl.showCaption(CAPTIONS.ringCards);
  await ring(tl, "[data-tl=card-active-accounts]", 1000);
  await ring(tl, "[data-tl=card-quick-actions]", 1000);
  await tl.wait(300);

  tl.showCaption(CAPTIONS.ringFeeds);
  await ring(tl, "[data-tl=card-bank-feeds]", 1100);
  await tl.wait(300);

  tl.showCaption(CAPTIONS.emptyState);
  await ring(tl, "[data-tl=empty-bank-accounts]", 1200);
  await tl.wait(300);

  tl.showCaption(CAPTIONS.openAddAccount);
  await pressOn(tl, "[data-tl=btn-empty-add-account]");
  tl.setVar("booksView", "new-bank-account");
  tl.setUrl(BOOKS_URLS.newBankAccount);
  await tl.wait(400);

  await finishBooks(tl, STEP170_DURATION_MS);
}
