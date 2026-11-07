import type { Timeline } from "@/lib/timeline";
import {
  beginBooks,
  finishBooks,
  pressOn,
  ring,
} from "@/components/books/books-timeline";
import { BOOKS_URLS } from "@/components/books/books-data";
import { STEP127_CAPTIONS } from "./data";

export const STEP127_DURATION_MS = 8700;

export async function runStep127(tl: Timeline) {
  tl.setVar("__sceneId", "step127");
  beginBooks(tl, BOOKS_URLS.creditNotes, "credit-notes", [0.88, 0.22]);

  await tl.wait(400);
  tl.showCaption(STEP127_CAPTIONS.createNew);
  await pressOn(tl, "[data-tl=btn-new-credit-note]");

  await tl.wait(600);
  tl.showCaption(STEP127_CAPTIONS.openForm);
  await ring(tl, "[data-tl=text-new-credit-note-title]", 1200);

  await tl.wait(800);
  await finishBooks(tl, STEP127_DURATION_MS);
}
