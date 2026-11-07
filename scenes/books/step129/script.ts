import type { Timeline } from "@/lib/timeline";
import {
  beginBooks,
  finishBooks,
  pressOn,
} from "@/components/books/books-timeline";
import { BOOKS_URLS } from "@/components/books/books-data";
import { STEP129_CAPTIONS } from "./data";

export const STEP129_DURATION_MS = 15800;

export async function runStep129(tl: Timeline) {
  tl.setVar("__sceneId", "step129");
  beginBooks(tl, BOOKS_URLS.newCreditNote, "new-credit-note", [0.65, 0.35]);
  tl.setVar("booksCreditNoteCustomer", "Harvest Tables Ltd");

  await tl.wait(400);
  tl.showCaption(STEP129_CAPTIONS.configNumbering);
  await pressOn(tl, "[data-tl=btn-credit-note-numbering]");
  await tl.wait(400);
  await pressOn(tl, "[data-tl=btn-save-credit-note-numbering]");

  await tl.wait(400);
  await pressOn(tl, "[data-tl=input-credit-note-reference]");
  tl.setVar("booksCreditNoteReference", "RET-2026-004");

  await tl.wait(400);
  tl.showCaption(STEP129_CAPTIONS.setSalesperson);
  await pressOn(tl, "[data-tl=select-credit-note-salesperson]");
  tl.setVar("booksCreditNoteSalesperson", "Sam Taylor");

  await tl.wait(400);
  await pressOn(tl, "[data-tl=textarea-credit-note-subject]");
  tl.setVar("booksCreditNoteSubject", "Return allowance for damaged items");

  await tl.wait(800);
  await finishBooks(tl, STEP129_DURATION_MS);
}
