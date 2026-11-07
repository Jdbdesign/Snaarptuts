import type { Timeline } from "@/lib/timeline";
import {
  beginBooks,
  finishBooks,
  pressOn,
} from "@/components/books/books-timeline";
import { BOOKS_URLS, INITIAL_RECEIPTS } from "@/components/books/books-data";
import { STEP84_CAPTIONS } from "./data";

export const STEP84_DURATION_MS = 14000;

export async function runStep84(tl: Timeline) {
  tl.setVar("__sceneId", "step84");
  beginBooks(tl, BOOKS_URLS.receiptDetails, "receipt-detail", [0.88, 0.15]);
  tl.setVar("booksActiveReceipt", INITIAL_RECEIPTS[0]);

  await tl.wait(400);
  tl.showCaption(STEP84_CAPTIONS.edit);
  await pressOn(tl, "[data-tl=btn-edit-receipt]");

  await tl.wait(600);
  tl.showCaption(STEP84_CAPTIONS.deposit);
  await pressOn(tl, "[data-tl=select-edit-deposit-to]");
  await pressOn(tl, "[data-tl=deposit-opt-bank-account]");

  await tl.wait(400);
  tl.showCaption(STEP84_CAPTIONS.save);
  await pressOn(tl, "[data-tl=textarea-edit-receipt-notes]");
  await pressOn(tl, "[data-tl=btn-save-receipt-changes]");

  await tl.wait(1200);
  await finishBooks(tl, STEP84_DURATION_MS);
}
