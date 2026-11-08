import type { Timeline } from "@/lib/timeline";
import {
  beginBooks,
  finishBooks,
  pressOn,
} from "@/components/books/books-timeline";
import { BOOKS_URLS } from "@/components/books/books-data";
import { CAPTIONS } from "./data";

export const STEP189_DURATION_MS = 11500;

export async function runStep189(tl: Timeline) {
  beginBooks(tl, BOOKS_URLS.transactionLocking, "transaction-locking", [0.4, 0.3], 189);

  tl.setVar("booksAccountantExpanded", true);
  tl.setVar("booksLockMode", "all");

  await tl.at(400);
  tl.showCaption(CAPTIONS.viewLocking);
  await tl.wait(1500);

  tl.showCaption(CAPTIONS.lockAllRow);
  await tl.moveCursorTo("[data-tl=btn-lock-all-link]", { ms: 650 });
  await tl.wait(600);

  tl.showCaption(CAPTIONS.clickIndividual);
  await pressOn(tl, "[data-tl=link-lock-individual-modules]");
  tl.setVar("booksLockMode", "modules");
  await tl.wait(350);

  tl.showCaption(CAPTIONS.hoverModules);
  await tl.moveCursorTo("[data-tl=link-lock-sales]", { ms: 550 });
  await tl.wait(300);
  await tl.moveCursorTo("[data-tl=link-lock-purchases]", { ms: 450 });
  await tl.wait(300);
  await tl.moveCursorTo("[data-tl=link-lock-banking]", { ms: 450 });
  await tl.wait(300);
  await tl.moveCursorTo("[data-tl=link-lock-accountant]", { ms: 450 });
  await tl.wait(400);

  tl.showCaption(CAPTIONS.switchAll);
  await tl.moveCursorTo("[data-tl=link-switch-lock-all]", { ms: 600 });
  await tl.wait(1500);

  await finishBooks(tl, STEP189_DURATION_MS);
}
