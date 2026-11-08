import type { Timeline } from "@/lib/timeline";
import {
  beginBooks,
  finishBooks,
  pressOn,
} from "@/components/books/books-timeline";
import {
  BOOKS_URLS,
  INITIAL_CHART_OF_ACCOUNTS,
  type ChartAccount,
} from "@/components/books/books-data";
import { CAPTIONS } from "./data";

export const STEP184_DURATION_MS = 9500;

export async function runStep184(tl: Timeline) {
  beginBooks(tl, BOOKS_URLS.chartOfAccounts, "chart-of-accounts", [0.4, 0.3], 184);

  tl.setVar("booksAccountantExpanded", true);

  const staffFloat: ChartAccount = {
    id: "coa-1002",
    name: "Staff Float",
    code: "1002",
    type: "Cash",
    parentAccountName: "1100 - Accounts Receivable",
    status: "Active",
    isSubAccount: true,
    description: "Staff float for minor expenses",
  };
  tl.setVar("booksChartOfAccounts", [
    ...INITIAL_CHART_OF_ACCOUNTS.slice(0, 3),
    staffFloat,
    ...INITIAL_CHART_OF_ACCOUNTS.slice(3),
  ]);
  tl.setVar("booksActiveAccount", staffFloat);

  await tl.at(400);
  tl.showCaption(CAPTIONS.clickEditAccount);
  await pressOn(tl, "[data-tl=btn-edit-account-1002]");
  tl.setVar("booksView", "account-detail");
  tl.setUrl(BOOKS_URLS.accountDetails);
  await tl.wait(500);

  tl.showCaption(CAPTIONS.clickName);
  await pressOn(tl, "[data-tl=input-account-name]");
  await tl.wait(300);

  tl.showCaption(CAPTIONS.typeName);
  await tl.typeText("[data-tl=input-account-name]", "Staff Petty Float");
  tl.setVar("booksEditAccountName", "Staff Petty Float");
  await tl.wait(300);

  tl.showCaption(CAPTIONS.clickDesc);
  await pressOn(tl, "[data-tl=input-account-desc]");
  await tl.wait(300);

  tl.showCaption(CAPTIONS.typeDesc);
  await tl.typeText("[data-tl=input-account-desc]", "Updated float account for minor office expenses");
  tl.setVar("booksEditAccountDesc", "Updated float account for minor office expenses");
  await tl.wait(300);

  tl.showCaption(CAPTIONS.updateAccount);
  await pressOn(tl, "[data-tl=btn-update-account]");
  tl.toast("Account updated successfully");

  const updatedStaffFloat: ChartAccount = {
    ...staffFloat,
    name: "Staff Petty Float",
    description: "Updated float account for minor office expenses",
  };
  tl.setVar("booksActiveAccount", updatedStaffFloat);
  await tl.wait(600);

  await finishBooks(tl, STEP184_DURATION_MS);
}
