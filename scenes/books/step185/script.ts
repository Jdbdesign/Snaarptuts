import type { Timeline } from "@/lib/timeline";
import {
  beginBooks,
  finishBooks,
  pressOn,
  ring,
} from "@/components/books/books-timeline";
import {
  BOOKS_URLS,
  INITIAL_CHART_OF_ACCOUNTS,
  type ChartAccount,
} from "@/components/books/books-data";
import { CAPTIONS } from "./data";

export const STEP185_DURATION_MS = 8500;

export async function runStep185(tl: Timeline) {
  beginBooks(tl, BOOKS_URLS.chartOfAccounts, "chart-of-accounts", [0.4, 0.3], 185);

  tl.setVar("booksAccountantExpanded", true);

  const staffPetty: ChartAccount = {
    id: "coa-1002",
    name: "Staff Petty Float",
    code: "1002",
    type: "Cash",
    parentAccountName: "1100 - Accounts Receivable",
    status: "Active",
    isSubAccount: true,
    description: "Updated float account",
  };
  tl.setVar("booksChartOfAccounts", [
    ...INITIAL_CHART_OF_ACCOUNTS.slice(0, 3),
    staffPetty,
    ...INITIAL_CHART_OF_ACCOUNTS.slice(3),
  ]);

  await tl.at(400);
  tl.showCaption(CAPTIONS.selectRow);
  await pressOn(tl, "[data-tl=chk-account-1002]");
  tl.setVar("booksCoaSelected", ["1002"]);
  await tl.wait(400);

  tl.showCaption(CAPTIONS.reviewBar);
  await ring(tl, "[data-tl=bar-coa-selection]", 1000);
  await tl.wait(300);

  tl.showCaption(CAPTIONS.clickDelete);
  await pressOn(tl, "[data-tl=btn-coa-delete]");
  tl.setVar("booksAccountConfirmOpen", true);
  await tl.wait(400);

  tl.showCaption(CAPTIONS.confirmDelete);
  await pressOn(tl, "[data-tl=btn-confirm-delete-account]");
  tl.setVar("booksAccountConfirmOpen", false);
  tl.setVar("booksCoaSelected", []);
  tl.setVar("booksChartOfAccounts", INITIAL_CHART_OF_ACCOUNTS);
  tl.toast("Account deleted successfully");
  await tl.wait(600);

  await finishBooks(tl, STEP185_DURATION_MS);
}
