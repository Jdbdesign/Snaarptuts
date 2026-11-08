import type { Timeline } from "@/lib/timeline";
import {
  beginBooks,
  finishBooks,
  pressOn,
  ring,
  typeIntoVar,
} from "@/components/books/books-timeline";
import {
  BOOKS_URLS,
  INITIAL_BANK_TRANSACTIONS,
  type BankTransaction,
} from "@/components/books/books-data";
import { CAPTIONS } from "./data";

export const STEP177_DURATION_MS = 9500;

export async function runStep177(tl: Timeline) {
  beginBooks(tl, BOOKS_URLS.bankTransactions, "bank-transactions", [0.4, 0.3], 177);

  const newTx: BankTransaction = {
    id: "tx-new-dep",
    accountId: "acct-1",
    accountName: "Main Business Account",
    bankName: "Barclays Bank UK",
    type: "Deposit",
    date: "11/08/2026",
    description: "Client retainers deposit",
    payee: "Acme Client Corp",
    categoryAccount: "1100 - Accounts Receivable (ASSET)",
    reference: "DEP-2026-089",
    status: "Matched",
    amount: 1500.0,
    currency: "GBP",
    bankAccount: "Main Business Account",
  };

  tl.setVar("booksBankingExpanded", true);
  tl.setVar("booksBankTransactions", [newTx, ...INITIAL_BANK_TRANSACTIONS]);

  await tl.at(400);
  tl.showCaption(CAPTIONS.findUnmatched);
  await ring(tl, "[data-tl=badge-tx-status-tx-1]", 1000);
  await pressOn(tl, "[data-tl=btn-categorize-row-tx-1]");
  tl.setVar("booksCategorizeTargetTxId", "tx-1");
  tl.setVar("booksCategorizePopoverOpen", true);
  await tl.wait(400);

  tl.showCaption(CAPTIONS.searchCategory);
  await pressOn(tl, "[data-tl=input-category-search]");
  await typeIntoVar(
    tl,
    "[data-tl=input-category-search]",
    "booksCategorizeSearch",
    "1302",
    { msPerChar: 30 }
  );
  await tl.wait(300);

  await pressOn(tl, "[data-tl=opt-cat-1302]");
  const updatedTxs = [newTx, ...INITIAL_BANK_TRANSACTIONS].map((t) =>
    t.id === "tx-1"
      ? {
          ...t,
          categoryAccount: "1302 - Employee Advance",
          status: "Matched" as const,
        }
      : t
  );
  tl.setVar("booksBankTransactions", updatedTxs);
  tl.setVar("booksCategorizePopoverOpen", false);
  tl.setVar("booksCategorizeTargetTxId", null);
  tl.setVar("booksToastText", "Categorized and journal posted");
  tl.setVar("booksToastOpen", true);
  await tl.wait(500);

  tl.showCaption(CAPTIONS.verifyCategorized);
  await ring(tl, "[data-tl=badge-tx-status-tx-1]", 1100);
  await tl.wait(300);

  tl.showCaption(CAPTIONS.hoverDelete);
  await tl.moveCursorTo("[data-tl=btn-delete-row-tx-1]", { ms: 600 });
  await ring(tl, "[data-tl=btn-delete-row-tx-1]", 1000);
  await tl.wait(500);

  await finishBooks(tl, STEP177_DURATION_MS);
}
