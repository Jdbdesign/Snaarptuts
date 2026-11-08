import type { Timeline } from "@/lib/timeline";
import {
  beginBooks,
  finishBooks,
  pressOn,
  ring,
  scrollView,
} from "@/components/books/books-timeline";
import { BOOKS_URLS, INITIAL_BANK_TRANSACTIONS } from "@/components/books/books-data";
import { CAPTIONS } from "./data";

export const STEP175_DURATION_MS = 15000;

export async function runStep175(tl: Timeline) {
  beginBooks(tl, BOOKS_URLS.bankAccounts, "bank-accounts", [0.1, 0.45], 175);

  tl.setVar("booksBankingExpanded", true);
  tl.setVar("booksBankTransactions", INITIAL_BANK_TRANSACTIONS);

  await tl.at(400);
  tl.showCaption(CAPTIONS.navTransactions);
  await pressOn(tl, "[data-tl=nav-banking-transactions]");
  tl.setVar("booksView", "bank-transactions");
  tl.setUrl(BOOKS_URLS.bankTransactions);
  await tl.wait(500);

  tl.showCaption(CAPTIONS.reviewSummary);
  await ring(tl, "[data-tl=strip-transactions-summary]", 1200);
  await tl.wait(300);

  tl.showCaption(CAPTIONS.filterAccount);
  await pressOn(tl, "[data-tl=select-transactions-account]");
  tl.setVar("booksTransactionsAccountFilterOpen", true);
  await tl.wait(200);
  await pressOn(tl, "[data-tl=opt-tx-account-main]");
  tl.setVar("booksTransactionsAccountFilter", "Main Business Account");
  tl.setVar("booksTransactionsAccountFilterOpen", false);
  await tl.wait(300);

  tl.showCaption(CAPTIONS.filterType);
  await pressOn(tl, "[data-tl=select-transactions-type]");
  tl.setVar("booksTransactionsTypeFilterOpen", true);
  await tl.wait(200);
  await pressOn(tl, "[data-tl=opt-tx-type-withdrawal]");
  tl.setVar("booksTransactionsTypeFilter", "Withdrawal");
  tl.setVar("booksTransactionsTypeFilterOpen", false);
  await tl.wait(400);

  tl.showCaption(CAPTIONS.resetFilters);
  await pressOn(tl, "[data-tl=select-transactions-type]");
  tl.setVar("booksTransactionsTypeFilterOpen", true);
  await tl.wait(200);
  await pressOn(tl, "[data-tl=opt-tx-type-all]");
  tl.setVar("booksTransactionsTypeFilter", "All Types");
  tl.setVar("booksTransactionsTypeFilterOpen", false);
  await tl.wait(200);

  await pressOn(tl, "[data-tl=select-transactions-account]");
  tl.setVar("booksTransactionsAccountFilterOpen", true);
  await tl.wait(200);
  await pressOn(tl, "[data-tl=opt-tx-account-all]");
  tl.setVar("booksTransactionsAccountFilter", "All Accounts");
  tl.setVar("booksTransactionsAccountFilterOpen", false);
  await tl.wait(400);

  tl.showCaption(CAPTIONS.openTxDetail);
  await pressOn(tl, "[data-tl=transaction-row-tx-1]");
  tl.setVar("booksActiveTransaction", INITIAL_BANK_TRANSACTIONS[0]);
  tl.setVar("booksView", "bank-transaction-detail");
  tl.setUrl(BOOKS_URLS.bankTransactionDetails.replace(":id", "tx-1"));
  await tl.wait(500);

  await ring(tl, "[data-tl=card-tx-amount-status]", 1000);
  await ring(tl, "[data-tl=card-tx-information]", 1000);
  await tl.wait(200);

  tl.showCaption(CAPTIONS.returnToList);
  await pressOn(tl, "[data-tl=btn-back-to-transactions]");
  tl.setVar("booksView", "bank-transactions");
  tl.setUrl(BOOKS_URLS.bankTransactions);
  await tl.wait(500);

  tl.showCaption(CAPTIONS.reviewPagination);
  await scrollView(tl, 180);
  await ring(tl, "[data-tl=pagination-transactions]", 1200);
  await tl.wait(400);

  await finishBooks(tl, STEP175_DURATION_MS);
}
