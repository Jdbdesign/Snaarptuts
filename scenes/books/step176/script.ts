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

export const STEP176_DURATION_MS = 14500;

export async function runStep176(tl: Timeline) {
  beginBooks(tl, BOOKS_URLS.bankTransactions, "bank-transactions", [0.75, 0.2], 176);

  tl.setVar("booksBankingExpanded", true);
  tl.setVar("booksBankTransactions", INITIAL_BANK_TRANSACTIONS);

  await tl.at(400);
  tl.showCaption(CAPTIONS.clickAddTx);
  await pressOn(tl, "[data-tl=btn-add-transaction]");
  tl.setVar("booksView", "new-bank-transaction");
  tl.setUrl(BOOKS_URLS.newBankTransaction);
  await tl.wait(500);

  tl.showCaption(CAPTIONS.selectAccountAndType);
  await pressOn(tl, "[data-tl=select-tx-bank-account]");
  tl.setVar("booksNewTxBankAccountOpen", true);
  await tl.wait(200);
  await pressOn(tl, "[data-tl=opt-tx-account-main]");
  tl.setVar("booksNewTxBankAccount", "Main Business Account");
  tl.setVar("booksNewTxBankAccountOpen", false);
  await tl.wait(200);

  await pressOn(tl, "[data-tl=select-tx-type]");
  tl.setVar("booksNewTxTypeOpen", true);
  await tl.wait(200);
  await pressOn(tl, "[data-tl=opt-tx-type-deposit]");
  tl.setVar("booksNewTxType", "Deposit");
  tl.setVar("booksNewTxTypeOpen", false);
  await tl.wait(300);

  tl.showCaption(CAPTIONS.enterDetails);
  await pressOn(tl, "[data-tl=input-tx-date]");
  await typeIntoVar(
    tl,
    "[data-tl=input-tx-date]",
    "booksNewTxDate",
    "11/08/2026",
    { msPerChar: 25 }
  );
  await tl.wait(200);

  await pressOn(tl, "[data-tl=input-tx-amount]");
  await typeIntoVar(
    tl,
    "[data-tl=input-tx-amount]",
    "booksNewTxAmount",
    "1500.00",
    { msPerChar: 25 }
  );
  await tl.wait(200);

  await pressOn(tl, "[data-tl=input-tx-payee]");
  await typeIntoVar(
    tl,
    "[data-tl=input-tx-payee]",
    "booksNewTxPayee",
    "Acme Client Corp",
    { msPerChar: 25 }
  );
  await tl.wait(200);

  await pressOn(tl, "[data-tl=input-tx-reference]");
  await typeIntoVar(
    tl,
    "[data-tl=input-tx-reference]",
    "booksNewTxReference",
    "DEP-2026-089",
    { msPerChar: 25 }
  );
  await tl.wait(200);

  await pressOn(tl, "[data-tl=input-tx-description]");
  await typeIntoVar(
    tl,
    "[data-tl=input-tx-description]",
    "booksNewTxDescription",
    "Client retainers deposit",
    { msPerChar: 20 }
  );
  await tl.wait(300);

  tl.showCaption(CAPTIONS.assignCategory);
  await pressOn(tl, "[data-tl=select-tx-category-account]");
  tl.setVar("booksNewTxCategoryAccountOpen", true);
  await tl.wait(200);
  await pressOn(tl, "[data-tl=opt-tx-cat-1100]");
  tl.setVar("booksNewTxCategoryAccount", "1100 - Accounts Receivable (ASSET)");
  tl.setVar("booksNewTxCategoryAccountOpen", false);
  await tl.wait(200);

  await pressOn(tl, "[data-tl=input-tx-notes]");
  await typeIntoVar(
    tl,
    "[data-tl=input-tx-notes]",
    "booksNewTxNotes",
    "Monthly retainer November",
    { msPerChar: 20 }
  );
  await tl.wait(300);

  tl.showCaption(CAPTIONS.clickRecord);
  await pressOn(tl, "[data-tl=btn-record-transaction]");
  tl.setVar("booksNewTxSaving", true);
  await tl.wait(400);

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

  tl.setVar("booksBankTransactions", [newTx, ...INITIAL_BANK_TRANSACTIONS]);
  tl.setVar("booksToastText", "Transaction recorded successfully");
  tl.setVar("booksToastOpen", true);
  tl.setVar("booksNewTxSaving", false);
  tl.setVar("booksView", "bank-transactions");
  tl.setUrl(BOOKS_URLS.bankTransactions);
  await tl.wait(500);

  tl.showCaption(CAPTIONS.verifyRecorded);
  await ring(tl, "[data-tl=transaction-row-tx-new-dep]", 1200);
  await tl.wait(500);

  await finishBooks(tl, STEP176_DURATION_MS);
}
