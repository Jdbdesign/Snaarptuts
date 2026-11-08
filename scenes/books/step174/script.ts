import type { Timeline } from "@/lib/timeline";
import {
  beginBooks,
  finishBooks,
  pressOn,
  ring,
} from "@/components/books/books-timeline";
import { BOOKS_URLS, type BankAccount } from "@/components/books/books-data";
import { CAPTIONS } from "./data";

export const STEP174_DURATION_MS = 14500;

export async function runStep174(tl: Timeline) {
  beginBooks(
    tl,
    BOOKS_URLS.bankAccountDetails.replace(":id", "jordan-lee-savings"),
    "bank-account-detail",
    [0.5, 0.3],
    174
  );

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
    description: "Primary business savings reserve account",
    status: "ACTIVE",
    reconciledBalance: 0,
    createdAt: "11/08/2026",
  };

  tl.setVar("booksBankingExpanded", true);
  tl.setVar("booksBankAccounts", [jordanAccount]);
  tl.setVar("booksActiveBankAccount", jordanAccount);

  await tl.at(400);
  tl.showCaption(CAPTIONS.clickDeactivate);
  await pressOn(tl, "[data-tl=btn-deactivate-account]");
  tl.setVar("booksAccountDeactivating", true);
  await tl.wait(400);

  const deactivated: BankAccount = { ...jordanAccount, status: "INACTIVE" };
  tl.setVar("booksActiveBankAccount", deactivated);
  tl.setVar("booksBankAccounts", [deactivated]);
  tl.setVar("booksToastText", "Bank account deactivated successfully");
  tl.setVar("booksToastOpen", true);
  tl.setVar("booksAccountDeactivating", false);
  await tl.wait(500);

  tl.showCaption(CAPTIONS.verifyInactive);
  await ring(tl, "[data-tl=banner-account-inactive]", 1200);
  await ring(tl, "[data-tl=badge-account-status]", 1000);
  await tl.wait(300);

  tl.showCaption(CAPTIONS.returnToList);
  await pressOn(tl, "[data-tl=link-breadcrumb-bank-accounts]");
  tl.setVar("booksView", "bank-accounts");
  tl.setUrl(BOOKS_URLS.bankAccounts);
  await tl.wait(500);

  tl.showCaption(CAPTIONS.filterInactive);
  await pressOn(tl, "[data-tl=select-bank-accounts-status]");
  tl.setVar("booksBankAccountsStatusFilterOpen", true);
  await tl.wait(200);
  await pressOn(tl, "[data-tl=opt-status-inactive]");
  tl.setVar("booksBankAccountsStatusFilter", "Inactive");
  tl.setVar("booksBankAccountsStatusFilterOpen", false);
  await ring(tl, "[data-tl=badge-status-jordan-lee-savings]", 1000);
  await tl.wait(300);

  tl.showCaption(CAPTIONS.filterSavings);
  await pressOn(tl, "[data-tl=select-bank-accounts-type]");
  tl.setVar("booksBankAccountsTypeFilterOpen", true);
  await tl.wait(200);
  await pressOn(tl, "[data-tl=opt-type-savings]");
  tl.setVar("booksBankAccountsTypeFilter", "Savings");
  tl.setVar("booksBankAccountsTypeFilterOpen", false);
  await tl.wait(400);

  tl.showCaption(CAPTIONS.resetFilters);
  await pressOn(tl, "[data-tl=select-bank-accounts-status]");
  tl.setVar("booksBankAccountsStatusFilterOpen", true);
  await tl.wait(200);
  await pressOn(tl, "[data-tl=opt-status-all]");
  tl.setVar("booksBankAccountsStatusFilter", "Status");
  tl.setVar("booksBankAccountsStatusFilterOpen", false);
  await tl.wait(200);

  await pressOn(tl, "[data-tl=select-bank-accounts-type]");
  tl.setVar("booksBankAccountsTypeFilterOpen", true);
  await tl.wait(200);
  await pressOn(tl, "[data-tl=opt-type-all]");
  tl.setVar("booksBankAccountsTypeFilter", "Account Type");
  tl.setVar("booksBankAccountsTypeFilterOpen", false);
  await tl.wait(400);

  await finishBooks(tl, STEP174_DURATION_MS);
}
