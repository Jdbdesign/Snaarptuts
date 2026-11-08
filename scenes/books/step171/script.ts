import type { Timeline } from "@/lib/timeline";
import {
  beginBooks,
  finishBooks,
  pressOn,
  ring,
  typeIntoVar,
  scrollView,
} from "@/components/books/books-timeline";
import { BOOKS_URLS } from "@/components/books/books-data";
import { CAPTIONS } from "./data";

export const STEP171_DURATION_MS = 12500;

export async function runStep171(tl: Timeline) {
  beginBooks(tl, BOOKS_URLS.newBankAccount, "new-bank-account", [0.4, 0.3], 171);

  tl.setVar("booksBankingExpanded", true);

  await tl.at(400);
  tl.showCaption(CAPTIONS.enterDetails);
  await ring(tl, "[data-tl=card-account-details]", 1000);
  await tl.wait(200);

  tl.showCaption(CAPTIONS.typeAccountName);
  await pressOn(tl, "[data-tl=input-account-name]");
  await typeIntoVar(
    tl,
    "[data-tl=input-account-name]",
    "booksNewAccountName",
    "Jordan Lee Savings",
    { msPerChar: 25 }
  );
  await tl.wait(300);

  tl.showCaption(CAPTIONS.typeBankName);
  await pressOn(tl, "[data-tl=input-bank-name]");
  await typeIntoVar(
    tl,
    "[data-tl=input-bank-name]",
    "booksNewAccountBankName",
    "Barclays Bank UK",
    { msPerChar: 25 }
  );
  await tl.wait(300);

  tl.showCaption(CAPTIONS.typeAccountNumber);
  await pressOn(tl, "[data-tl=input-account-number]");
  await typeIntoVar(
    tl,
    "[data-tl=input-account-number]",
    "booksNewAccountNumber",
    "12345678",
    { msPerChar: 25 }
  );
  await tl.wait(200);

  await pressOn(tl, "[data-tl=input-routing-code]");
  await typeIntoVar(
    tl,
    "[data-tl=input-routing-code]",
    "booksNewAccountRoutingCode",
    "20-00-00",
    { msPerChar: 25 }
  );
  await tl.wait(300);

  tl.showCaption(CAPTIONS.selectAccountType);
  await pressOn(tl, "[data-tl=select-account-type]");
  tl.setVar("booksNewAccountTypeDropdownOpen", true);
  await tl.wait(200);
  await pressOn(tl, "[data-tl=opt-account-type-Savings]");
  tl.setVar("booksNewAccountType", "Savings");
  tl.setVar("booksNewAccountTypeDropdownOpen", false);
  await tl.wait(300);

  tl.showCaption(CAPTIONS.selectCurrency);
  await pressOn(tl, "[data-tl=select-currency]");
  tl.setVar("booksNewAccountCurrencyDropdownOpen", true);
  await tl.wait(200);
  await pressOn(tl, "[data-tl=opt-currency-GBP]");
  tl.setVar("booksNewAccountCurrency", "GBP");
  tl.setVar("booksNewAccountCurrencyDropdownOpen", false);
  await tl.wait(300);

  tl.showCaption(CAPTIONS.proceedToFinancial);
  await scrollView(tl, 260);
  await tl.wait(600);

  await finishBooks(tl, STEP171_DURATION_MS);
}
