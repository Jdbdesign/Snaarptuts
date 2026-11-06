import type { Timeline } from "@/lib/timeline";
import {
  beginBooks,
  finishBooks,
  pressOn,
} from "@/components/books/books-timeline";
import { BOOKS_URLS, INITIAL_PAYMENTS } from "@/components/books/books-data";
import { STEP117_CAPTIONS } from "./data";

export const STEP117_DURATION_MS = 7500;

export async function runStep117(tl: Timeline) {
  tl.setVar("__sceneId", "step117");
  beginBooks(tl, BOOKS_URLS.paymentDetails, "payment-details", [0.85, 0.25]);
  tl.setVar("booksActivePayment", INITIAL_PAYMENTS[1]);

  await tl.wait(400);
  tl.showCaption(STEP117_CAPTIONS.clickEdit);
  await pressOn(tl, "[data-tl=btn-edit-payment]");

  await tl.wait(600);
  tl.showCaption(STEP117_CAPTIONS.changeDeposit);
  await pressOn(tl, "[data-tl=select-edit-payment-deposit-to]");
  // Set value
  const selectEl = document.querySelector("[data-tl=select-edit-payment-deposit-to]") as HTMLSelectElement | null;
  if (selectEl) {
    selectEl.value = "Bank Account";
    selectEl.dispatchEvent(new Event("change", { bubbles: true }));
  }

  await tl.wait(500);
  tl.showCaption(STEP117_CAPTIONS.savePayment);
  await pressOn(tl, "[data-tl=btn-save-edit-payment]");

  await tl.wait(1000);
  await finishBooks(tl, STEP117_DURATION_MS);
}
