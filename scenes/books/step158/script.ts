import type { Timeline } from "@/lib/timeline";
import {
  beginBooks,
  finishBooks,
  pressOn,
  ring,
} from "@/components/books/books-timeline";
import { BOOKS_URLS, INITIAL_BILLS, type Bill } from "@/components/books/books-data";
import { CAPTIONS } from "./data";

export const STEP158_DURATION_MS = 36000;

export async function runStep158(tl: Timeline) {
  beginBooks(tl, BOOKS_URLS.bills, "bills", [0.92, 0.35], 158);

  await tl.at(400);
  tl.showCaption(CAPTIONS.clickDeleteBill004);
  await pressOn(tl, "[data-tl=btn-delete-bill-BILL-004]");
  tl.setVar("booksBillConfirmOpen", true);
  await tl.wait(600);

  tl.showCaption(CAPTIONS.ringConfirmDialog);
  await ring(tl, "[data-tl=modal-bill-confirm]", 1000);

  tl.showCaption(CAPTIONS.confirmDelete);
  await pressOn(tl, "[data-tl=btn-confirm-bill-delete]");
  tl.setVar("booksBillConfirmOpen", false);

  const currentBills = tl.getVar<Bill[]>("booksBills", INITIAL_BILLS);
  const remaining = currentBills.filter(
    (b) => b.billNumber !== "BILL-004" && b.id !== "BILL-004"
  );
  tl.setVar("booksBills", remaining);
  tl.setVar("booksToastText", "Bill deleted");
  tl.setVar("booksToastOpen", true);

  tl.showCaption(CAPTIONS.verifyDeleted);
  await tl.wait(2200);

  await finishBooks(tl, STEP158_DURATION_MS);
}
