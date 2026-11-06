import type { Timeline } from "@/lib/timeline";
import {
  beginBooks,
  finishBooks,
  pressOn,
  ring,
} from "@/components/books/books-timeline";
import { BOOKS_URLS } from "@/components/books/books-data";
import { STEP118_CAPTIONS } from "./data";

export const STEP118_DURATION_MS = 5500;

export async function runStep118(tl: Timeline) {
  tl.setVar("__sceneId", "step118");
  beginBooks(tl, BOOKS_URLS.paymentsReceived, "payments", [0.88, 0.22]);

  await tl.wait(400);
  tl.showCaption(STEP118_CAPTIONS.openNew);
  await pressOn(tl, "[data-tl=btn-new-payment]");

  await tl.wait(600);
  tl.showCaption(STEP118_CAPTIONS.viewForm);
  await ring(tl, "[data-tl=text-record-payment-title]", 1200);

  await tl.wait(800);
  await finishBooks(tl, STEP118_DURATION_MS);
}
