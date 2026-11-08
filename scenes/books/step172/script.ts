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

export const STEP172_DURATION_MS = 11500;

export async function runStep172(tl: Timeline) {
  beginBooks(tl, BOOKS_URLS.newBankAccount, "new-bank-account", [0.4, 0.4], 172);

  tl.setVar("booksBankingExpanded", true);

  await tl.at(400);
  tl.showCaption(CAPTIONS.enterFinancial);
  await ring(tl, "[data-tl=card-financial-details]", 1000);
  await tl.wait(200);

  tl.showCaption(CAPTIONS.typeOpeningBalance);
  await pressOn(tl, "[data-tl=input-opening-balance]");
  await typeIntoVar(
    tl,
    "[data-tl=input-opening-balance]",
    "booksNewAccountOpeningBalance",
    "2000.00",
    { msPerChar: 25 }
  );
  await tl.wait(300);

  tl.showCaption(CAPTIONS.selectCoa);
  await pressOn(tl, "[data-tl=select-chart-of-account]");
  tl.setVar("booksNewAccountCoaDropdownOpen", true);
  await tl.wait(200);
  await pressOn(tl, "[data-tl=opt-coa-1001]");
  tl.setVar("booksNewAccountChartOfAccount", "1001 - Undeposited Funds");
  tl.setVar("booksNewAccountCoaDropdownOpen", false);
  await tl.wait(300);

  tl.showCaption(CAPTIONS.typeDescription);
  await pressOn(tl, "[data-tl=textarea-account-description]");
  await typeIntoVar(
    tl,
    "[data-tl=textarea-account-description]",
    "booksNewAccountDescription",
    "Primary savings reserve account",
    { msPerChar: 20 }
  );
  await tl.wait(400);

  tl.showCaption(CAPTIONS.clickSave);
  await pressOn(tl, "[data-tl=btn-save-account]");
  tl.setVar("booksNewAccountSaving", true);
  await tl.wait(400);

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

  tl.setVar("booksBankAccounts", [jordanAccount]);
  tl.setVar("booksToastText", "Bank account created successfully");
  tl.setVar("booksToastOpen", true);
  tl.setVar("booksNewAccountSaving", false);
  tl.setVar("booksView", "bank-accounts");
  tl.setUrl(BOOKS_URLS.bankAccounts);
  await tl.wait(600);

  tl.showCaption(CAPTIONS.verifyCreated);
  await ring(tl, "[data-tl=account-row-jordan-lee-savings]", 1200);
  await tl.wait(600);

  await finishBooks(tl, STEP172_DURATION_MS);
}
