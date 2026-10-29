import type { Timeline } from "@/lib/timeline";
import { finish } from "../shared";
import { CAPTIONS, URLS } from "./data";
import { NOTE } from "@/components/sheets/insert-data";
import { chooseRow, chooseSub, clickCell, openMenu } from "@/components/sheets/edit-timeline";
import { beginInsert, hoverNote, openNoteDialog, placeNote } from "@/components/sheets/insert-timeline";
import { pressOn, ring, typeInto } from "@/components/sheets/sheets-timeline";

/** Snaarp Sheets, step 55 - Insert > Note (Shift+F2) on D4: type "Okay… Seen", Insert, hover for the tip, then View > Comments shows it. */
export const STEP55_DURATION_MS = 22000;

export async function runStep55(tl: Timeline) {
  beginInsert(tl, URLS.renamed);

  await tl.at(700);
  tl.showCaption(CAPTIONS.select);
  await clickCell(tl, NOTE.cell, { ms: 800 });
  tl.showCaption(CAPTIONS.open);
  await openMenu(tl, "insert", { ms: 800 });
  await chooseRow(tl, "ins-note", { ms: 500 });
  openNoteDialog(tl, NOTE.cell);
  await tl.wait(700);
  tl.showCaption(CAPTIONS.dialog);
  await ring(tl, "[data-tl=note-dialog]", 1300);
  tl.showCaption(CAPTIONS.type);
  await typeInto(tl, "note-text", NOTE.text, { msPerChar: 90 });
  await tl.wait(400);
  tl.showCaption(CAPTIONS.insert);
  await pressOn(tl, "[data-tl=note-insert]", { ms: 700 });
  placeNote(tl, NOTE.cell, NOTE.text);
  await tl.wait(900);
  tl.showCaption(CAPTIONS.marker);
  await ring(tl, `[data-tl=cell-${NOTE.cell}]`, 1600);
  tl.showCaption(CAPTIONS.hover);
  await hoverNote(tl, NOTE.cell, NOTE.text);
  await tl.wait(1800);
  tl.hover(null);
  tl.setVar("noteTip", null);
  tl.showCaption(CAPTIONS.panel);
  await openMenu(tl, "view", { ms: 800 });
  await chooseSub(tl, "comments", "comments-show", { ms: 450 });
  await tl.wait(800);
  tl.showCaption(CAPTIONS.listed);
  await ring(tl, "[data-tl=comment-n1]", 1800);
  await finish(tl, 600);
}
