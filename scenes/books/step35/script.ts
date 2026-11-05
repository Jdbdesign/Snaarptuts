import type { Timeline } from "@/lib/timeline";
import {
  beginBooks,
  finishBooks,
  pressOn,
} from "@/components/books/books-timeline";
import { BOOKS_URLS } from "@/components/books/books-data";
import { STEP35_CAPTIONS } from "./data";

export const STEP35_DURATION_MS = 10500;

export async function runStep35(tl: Timeline) {
  tl.setVar("__sceneId", "step35");
  beginBooks(tl, BOOKS_URLS.quotes, "quotes", [0.45, 0.22]);

  await tl.wait(400);
  tl.showCaption(STEP35_CAPTIONS.open);
  await pressOn(tl, "[data-tl=dropdown-quotes-status]");

  await tl.wait(300);
  tl.showCaption(STEP35_CAPTIONS.sent);
  await pressOn(tl, "[data-tl=status-opt-sent]");
  await tl.wait(1500);

  await pressOn(tl, "[data-tl=dropdown-quotes-status]");
  await tl.wait(300);
  tl.showCaption(STEP35_CAPTIONS.accepted);
  await pressOn(tl, "[data-tl=status-opt-accepted]");
  await tl.wait(1500);

  await pressOn(tl, "[data-tl=dropdown-quotes-status]");
  await tl.wait(300);
  tl.showCaption(STEP35_CAPTIONS.all);
  await pressOn(tl, "[data-tl=status-opt-all]");
  await tl.wait(1000);

  await finishBooks(tl, STEP35_DURATION_MS);
}
