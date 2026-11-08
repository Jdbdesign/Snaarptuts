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

export const STEP183_DURATION_MS = 14000;

export async function runStep183(tl: Timeline) {
  beginBooks(tl, BOOKS_URLS.chartOfAccounts, "chart-of-accounts", [0.4, 0.3], 183);

  tl.setVar("booksAccountantExpanded", true);

  await tl.at(400);
  tl.showCaption(CAPTIONS.viewCoa);
  await ring(tl, "[data-tl=btn-coa-view]", 1000);
  await tl.wait(200);

  tl.showCaption(CAPTIONS.openViewFilter);
  await pressOn(tl, "[data-tl=btn-coa-view]");
  tl.setVar("booksCoaViewOpen", true);
  await tl.wait(400);

  tl.showCaption(CAPTIONS.filterInactive);
  await pressOn(tl, "[data-tl=opt-coa-inactive]");
  tl.setVar("booksCoaView", "Inactive Accounts");
  tl.setVar("booksCoaViewOpen", false);
  await tl.wait(500);

  tl.showCaption(CAPTIONS.openViewFilterBack);
  await pressOn(tl, "[data-tl=btn-coa-view]");
  tl.setVar("booksCoaViewOpen", true);
  await tl.wait(400);

  tl.showCaption(CAPTIONS.filterActive);
  await pressOn(tl, "[data-tl=opt-coa-active]");
  tl.setVar("booksCoaView", "Active Accounts");
  tl.setVar("booksCoaViewOpen", false);
  await tl.wait(500);

  tl.showCaption(CAPTIONS.openNewAccount);
  await pressOn(tl, "[data-tl=btn-new-account]");
  tl.setVar("booksCreateAccountModalOpen", true);
  await tl.wait(500);

  tl.showCaption(CAPTIONS.openTypeSelect);
  await pressOn(tl, "[data-tl=select-modal-account-type]");
  tl.setVar("booksNewAccountTypeOpen", true);
  await tl.wait(400);

  tl.showCaption(CAPTIONS.selectCashType);
  await pressOn(tl, "[data-tl=opt-type-cash]");
  tl.setVar("booksNewAccountType", "Cash");
  tl.setVar("booksNewAccountTypeOpen", false);
  await tl.wait(400);

  tl.showCaption(CAPTIONS.clickName);
  await pressOn(tl, "[data-tl=input-modal-account-name]");
  await tl.wait(300);

  tl.showCaption(CAPTIONS.typeName);
  await tl.typeText("[data-tl=input-modal-account-name]", "Staff Float");
  tl.setVar("booksNewAccountName", "Staff Float");
  await tl.wait(300);

  tl.showCaption(CAPTIONS.checkSubAccount);
  await pressOn(tl, "[data-tl=chk-modal-sub-account]");
  tl.setVar("booksNewAccountIsSub", true);
  await tl.wait(400);

  tl.showCaption(CAPTIONS.openParentSelect);
  await pressOn(tl, "[data-tl=select-modal-parent-account]");
  tl.setVar("booksNewAccountParentOpen", true);
  await tl.wait(400);

  tl.showCaption(CAPTIONS.selectParentAr);
  await pressOn(tl, "[data-tl=opt-parent-ar]");
  tl.setVar("booksNewAccountParent", "1100 — Accounts Receivable");
  tl.setVar("booksNewAccountParentOpen", false);
  await tl.wait(300);

  tl.showCaption(CAPTIONS.clickCode);
  await pressOn(tl, "[data-tl=input-modal-account-code]");
  await tl.wait(300);

  tl.showCaption(CAPTIONS.typeCode);
  await tl.typeText("[data-tl=input-modal-account-code]", "1002");
  tl.setVar("booksNewAccountCode", "1002");
  await tl.wait(300);

  tl.showCaption(CAPTIONS.clickDesc);
  await pressOn(tl, "[data-tl=input-modal-account-desc]");
  await tl.wait(300);

  tl.showCaption(CAPTIONS.typeDesc);
  await tl.typeText("[data-tl=input-modal-account-desc]", "Staff float for minor expenses");
  tl.setVar("booksNewAccountDescription", "Staff float for minor expenses");
  await tl.wait(300);

  tl.showCaption(CAPTIONS.saveAccount);
  await pressOn(tl, "[data-tl=btn-modal-save-account]");
  tl.setVar("booksCreateAccountModalOpen", false);
  tl.toast("Account created successfully");

  const newAccount: ChartAccount = {
    id: "coa-1002",
    name: "Staff Float",
    code: "1002",
    type: "Cash",
    parentAccountName: "1100 — Accounts Receivable",
    status: "Active",
    isSubAccount: true,
    description: "Staff float for minor expenses",
  };
  tl.setVar("booksChartOfAccounts", [
    ...INITIAL_CHART_OF_ACCOUNTS.slice(0, 3),
    newAccount,
    ...INITIAL_CHART_OF_ACCOUNTS.slice(3),
  ]);
  await tl.wait(600);

  await ring(tl, "[data-tl=row-account-1002]", 1200);

  await finishBooks(tl, STEP183_DURATION_MS);
}
