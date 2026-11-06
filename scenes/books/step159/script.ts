import type { Timeline } from "@/lib/timeline";
import {
  beginBooks,
  finishBooks,
  pressOn,
} from "@/components/books/books-timeline";
import { BOOKS_URLS } from "@/components/books/books-data";
import { CAPTIONS } from "./data";

export const STEP159_DURATION_MS = 8000;

export async function runStep159(tl: Timeline) {
  beginBooks(tl, BOOKS_URLS.expenses, "expenses", [0.45, 0.35]);

  await tl.at(400);
  tl.showCaption(CAPTIONS.clickDelete);
  await pressOn(tl, "[data-tl=btn-delete-expense-0]");
  await tl.wait(500);

  tl.showCaption(CAPTIONS.confirmDelete, { target: "[data-tl=btn-confirm-expense-delete]" });
  await tl.wait(300);
  await pressOn(tl, "[data-tl=btn-confirm-expense-delete]", { ring: false });
  await tl.wait(1000);

  await finishBooks(tl, STEP159_DURATION_MS);
}
