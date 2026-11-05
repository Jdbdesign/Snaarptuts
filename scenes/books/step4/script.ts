import type { Timeline } from "@/lib/timeline";
import {
  beginBooks,
  finishBooks,
  hoverOn,
  pressOn,
  ring,
} from "@/components/books/books-timeline";
import { BOOKS_URLS } from "@/components/books/books-data";
import { CAPTIONS } from "./data";

export const STEP4_DURATION_MS = 12000;

export async function runStep4(tl: Timeline) {
  beginBooks(tl, BOOKS_URLS.dashboard, "home", [0.45, 0.4]);

  await tl.at(400);
  tl.showCaption(CAPTIONS.scrollDown);
  await tl.scrollTo("[data-tl=card-quick-actions]", { duration: 600 });
  await tl.wait(600);

  // Quick actions
  tl.showCaption(CAPTIONS.quickActions);
  await hoverOn(tl, "[data-tl=card-quick-actions]", { ms: 500 });
  await ring(tl, "[data-tl=card-quick-actions]", 1500);

  // Bank accounts
  tl.showCaption(CAPTIONS.bankAccounts);
  await hoverOn(tl, "[data-tl=card-bank-accounts]", { ms: 500 });
  await ring(tl, "[data-tl=card-bank-accounts]", 1500);

  // Account Watchlist
  tl.showCaption(CAPTIONS.watchlist);
  await hoverOn(tl, "[data-tl=card-account-watchlist]", { ms: 500 });
  await ring(tl, "[data-tl=card-account-watchlist]", 1800);

  // Switch to Cash
  tl.showCaption(CAPTIONS.switchCash);
  await pressOn(tl, "[data-tl=btn-watchlist-basis]");
  await tl.wait(400);
  await pressOn(tl, "[data-tl=opt-basis-cash]");
  await tl.wait(1400);

  // Switch back to Accrual
  tl.showCaption(CAPTIONS.switchAccrual);
  await pressOn(tl, "[data-tl=btn-watchlist-basis]");
  await tl.wait(400);
  await pressOn(tl, "[data-tl=opt-basis-accrual]");
  await tl.wait(1400);

  await finishBooks(tl, STEP4_DURATION_MS);
}
