import type { Timeline } from "@/lib/timeline";
import {
  beginBooks,
  finishBooks,
  pressOn,
  ring,
  typeIntoVar,
} from "@/components/books/books-timeline";
import { BOOKS_URLS, type BankAccount } from "@/components/books/books-data";
import { CAPTIONS } from "./data";

export const STEP173_DURATION_MS = 12500;

export async function runStep173(tl: Timeline) {
  beginBooks(tl, BOOKS_URLS.bankAccounts, "bank-accounts", [0.4, 0.4], 173);

  const jordanAccount: BankAccount = {
    id: "jordan-lee-savings",
    name: "Jordan Lee Savings",
    accountName: "Jordan Lee Savings",
    bankName: "Barclays Bank UK",
    accountNumber: "12345678",
    routingCode: "20-00-00",
    accountType: "Savings",
    currency: "GBP",
    balance: 2000.0,
    openingBalance: 2000.0,
    currentBalance: 2000.0,
    chartOfAccount: "1001 - Undeposited Funds",
    description: "Primary savings reserve account",
    status: "ACTIVE",
    reconciledBalance: 0,
    createdAt: "11/08/2026",
  };

  tl.setVar("booksBankingExpanded", true);
  tl.setVar("booksBankAccounts", [jordanAccount]);
  tl.setVar("booksActiveBankAccount", jordanAccount);

  await tl.at(400);
  tl.showCaption(CAPTIONS.openDetails);
  await pressOn(tl, "[data-tl=account-row-jordan-lee-savings]");
  tl.setVar("booksView", "bank-account-detail");
  tl.setUrl(BOOKS_URLS.bankAccountDetails.replace(":id", "jordan-lee-savings"));
  await tl.wait(400);

  tl.showCaption(CAPTIONS.reviewBalance);
  await ring(tl, "[data-tl=card-current-balance]", 1100);
  await tl.wait(200);

  tl.showCaption(CAPTIONS.reviewAccountInfo);
  await ring(tl, "[data-tl=card-account-info]", 1100);
  await tl.wait(300);

  tl.showCaption(CAPTIONS.clickEdit);
  await pressOn(tl, "[data-tl=btn-edit-account]");
  tl.setVar("booksEditAccountDescription", "Primary savings reserve account");
  tl.setVar("booksView", "edit-bank-account");
  tl.setUrl(BOOKS_URLS.editBankAccount.replace(":id", "jordan-lee-savings"));
  await tl.wait(400);

  tl.showCaption(CAPTIONS.editDescription);
  await pressOn(tl, "[data-tl=textarea-edit-description]");
  await typeIntoVar(
    tl,
    "[data-tl=textarea-edit-description]",
    "booksEditAccountDescription",
    "Primary business savings reserve account",
    { msPerChar: 20 }
  );
  await tl.wait(300);

  tl.showCaption(CAPTIONS.saveChanges);
  await pressOn(tl, "[data-tl=btn-save-edit-account]");
  tl.setVar("booksEditAccountSaving", true);
  await tl.wait(400);

  const updatedAccount: BankAccount = {
    ...jordanAccount,
    description: "Primary business savings reserve account",
  };
  tl.setVar("booksActiveBankAccount", updatedAccount);
  tl.setVar("booksBankAccounts", [updatedAccount]);
  tl.setVar("booksToastText", "Bank account updated successfully");
  tl.setVar("booksToastOpen", true);
  tl.setVar("booksEditAccountSaving", false);
  tl.setVar("booksView", "bank-account-detail");
  tl.setUrl(BOOKS_URLS.bankAccountDetails.replace(":id", "jordan-lee-savings"));
  await tl.wait(500);

  tl.showCaption(CAPTIONS.verifyUpdated);
  await ring(tl, "[data-tl=desc-account]", 1200);
  await tl.wait(500);

  await finishBooks(tl, STEP173_DURATION_MS);
}
