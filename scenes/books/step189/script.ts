import type { Timeline } from "@/lib/timeline";
import {
  beginBooks,
  finishBooks,
  pressOn,
  ring,
} from "@/components/books/books-timeline";
import { BOOKS_URLS } from "@/components/books/books-data";
import { CAPTIONS } from "./data";

export const STEP189_DURATION_MS = 8500;

export async function runStep189(tl: Timeline) {
  beginBooks(tl, BOOKS_URLS.transactionLocking, "transaction-locking", [0.4, 0.3], 189);

  tl.setVar("booksAccountantExpanded", true);

  await tl.at(400);
  tl.showCaption(CAPTIONS.viewLocking);
  await ring(tl, "[data-tl=btn-lock-all]", 1000);
  await tl.wait(200);

  tl.showCaption(CAPTIONS.ringModules);
  await ring(tl, "[data-tl=btn-lock-sales]", 800);
  await ring(tl, "[data-tl=btn-lock-purchases]", 800);
  await ring(tl, "[data-tl=btn-lock-banking]", 800);
  await ring(tl, "[data-tl=btn-lock-accountant]", 800);
  await tl.wait(300);

  tl.showCaption(CAPTIONS.lockPurchases);
  await pressOn(tl, "[data-tl=btn-lock-purchases]");
  tl.toast("Purchases transactions locked");
  await tl.wait(600);

  await finishBooks(tl, STEP189_DURATION_MS);
}
