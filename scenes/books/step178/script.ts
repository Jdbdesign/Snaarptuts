import type { Timeline } from "@/lib/timeline";
import {
  beginBooks,
  finishBooks,
  pressOn,
  ring,
} from "@/components/books/books-timeline";
import {
  BOOKS_URLS,
  INITIAL_BANK_TRANSACTIONS,
  type BankTransaction,
} from "@/components/books/books-data";
import { CAPTIONS } from "./data";

export const STEP178_DURATION_MS = 10500;

export async function runStep178(tl: Timeline) {
  beginBooks(tl, BOOKS_URLS.bankTransactions, "bank-transactions", [0.65, 0.2], 178);

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

  const updatedTxs = [newTx, ...INITIAL_BANK_TRANSACTIONS].map((t) =>
    t.id === "tx-1"
      ? {
          ...t,
          categoryAccount: "1302 - Employee Advance",
          status: "Matched" as const,
        }
      : t
  );

  tl.setVar("booksBankingExpanded", true);
  tl.setVar("booksBankTransactions", updatedTxs);

  await tl.at(400);
  tl.showCaption(CAPTIONS.clickImport);
  await pressOn(tl, "[data-tl=btn-import-statement]");
  tl.setVar("booksImportDrawerOpen", true);
  await tl.wait(500);

  tl.showCaption(CAPTIONS.selectTargetAccount);
  await pressOn(tl, "[data-tl=select-import-account]");
  tl.setVar("booksImportAccountDropdownOpen", true);
  await tl.wait(200);
  await pressOn(tl, "[data-tl=opt-import-account-main]");
  tl.setVar("booksImportAccount", "Main Business Account");
  tl.setVar("booksImportAccountDropdownOpen", false);
  await tl.wait(400);

  tl.showCaption(CAPTIONS.inspectTemplate);
  await tl.moveCursorTo("[data-tl=link-download-csv-template]", { ms: 600 });
  await ring(tl, "[data-tl=link-download-csv-template]", 1000);
  await tl.wait(400);

  tl.showCaption(CAPTIONS.inspectDropzone);
  await tl.moveCursorTo("[data-tl=dropzone-statement-files]", { ms: 600 });
  await ring(tl, "[data-tl=dropzone-statement-files]", 1100);
  await tl.wait(400);

  tl.showCaption(CAPTIONS.closeDrawer);
  await pressOn(tl, "[data-tl=btn-close-import-statement]");
  tl.setVar("booksImportDrawerOpen", false);
  await tl.wait(500);

  tl.showCaption(CAPTIONS.tourComplete);
  await tl.wait(1000);

  await finishBooks(tl, STEP178_DURATION_MS);
}
