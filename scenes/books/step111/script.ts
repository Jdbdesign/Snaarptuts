import type { Timeline } from "@/lib/timeline";
import {
  beginBooks,
  finishBooks,
  pressOn,
  ring,
} from "@/components/books/books-timeline";
import { BOOKS_URLS } from "@/components/books/books-data";
import { STEP111_CAPTIONS } from "./data";

export const STEP111_DURATION_MS = 8200;

export async function runStep111(tl: Timeline) {
  tl.setVar("__sceneId", "step111");
  beginBooks(tl, BOOKS_URLS.paymentsReceived, "payments", [0.15, 0.45]);

  await tl.wait(400);
  tl.showCaption(STEP111_CAPTIONS.open);
  await pressOn(tl, "[data-tl=nav-sales-payments]");

  await tl.wait(600);
  tl.showCaption(STEP111_CAPTIONS.review);
  await ring(tl, "[data-tl=payments-title]", 1200);

  await tl.wait(800);
  await finishBooks(tl, STEP111_DURATION_MS);
}
