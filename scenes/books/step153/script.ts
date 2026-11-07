import type { Timeline } from "@/lib/timeline";
import {
  beginBooks,
  finishBooks,
  pressOn,
  ring,
  scrollView,
} from "@/components/books/books-timeline";
import { BOOKS_URLS, INITIAL_BILLS } from "@/components/books/books-data";
import { CAPTIONS } from "./data";

export const STEP153_DURATION_MS = 64000;

export async function runStep153(tl: Timeline) {
  beginBooks(tl, BOOKS_URLS.bills, "bills", [0.45, 0.28], 153);

  await tl.at(400);
  tl.showCaption(CAPTIONS.openBill005);
  await pressOn(tl, "[data-tl=bill-row-BILL-005]");
  tl.setVar("booksActiveBill", INITIAL_BILLS[0]);
  tl.setVar("booksView", "bill-detail");
  tl.setUrl(BOOKS_URLS.billDetails);
  await tl.wait(600);

  tl.showCaption(CAPTIONS.ringApprovals);
  await ring(tl, "[data-tl=card-bill-approval]", 1200);

  tl.showCaption(CAPTIONS.scrollJournal);
  await scrollView(tl, 450, 1000);
  await tl.wait(400);
  await ring(tl, "[data-tl=section-bill-journal]", 1000);
  await scrollView(tl, 0, 600);
  await tl.wait(400);

  tl.showCaption(CAPTIONS.clickBackFrom005);
  await pressOn(tl, "[data-tl=btn-back-to-bills]");
  tl.setVar("booksView", "bills");
  tl.setUrl(BOOKS_URLS.bills);
  await tl.wait(600);

  tl.showCaption(CAPTIONS.openBill003);
  await pressOn(tl, "[data-tl=bill-row-BILL-003]");
  tl.setVar("booksActiveBill", INITIAL_BILLS[2]);
  tl.setVar("booksView", "bill-detail");
  tl.setUrl(BOOKS_URLS.billDetails);
  await tl.wait(600);

  tl.showCaption(CAPTIONS.ringOverdueBanner);
  await ring(tl, "[data-tl=banner-bill-overdue]", 1000);
  await ring(tl, "[data-tl=ribbon-bill-overdue]", 800);

  tl.showCaption(CAPTIONS.clickBackFrom003);
  await pressOn(tl, "[data-tl=btn-back-to-bills]");
  tl.setVar("booksView", "bills");
  tl.setUrl(BOOKS_URLS.bills);
  await tl.wait(600);

  tl.showCaption(CAPTIONS.openBill002);
  await pressOn(tl, "[data-tl=bill-row-BILL-002]");
  tl.setVar("booksActiveBill", INITIAL_BILLS[4]);
  tl.setVar("booksView", "bill-detail");
  tl.setUrl(BOOKS_URLS.billDetails);
  await tl.wait(600);

  tl.showCaption(CAPTIONS.ringPaidZeroBalance);
  await ring(tl, "[data-tl=badge-bill-status-paid]", 800);
  await ring(tl, "[data-tl=text-balance-due-zero]", 800);
  await tl.wait(1000);

  await finishBooks(tl, STEP153_DURATION_MS);
}
