import type { Timeline } from "@/lib/timeline";
import { finish } from "../shared";
import { CAPTIONS, URLS } from "./data";
import { SMART_CHIPS } from "@/components/sheets/insert-data";
import { chooseRow, clickCell, openMenu } from "@/components/sheets/edit-timeline";
import { addHeader, beginInsert, widenColumn, insertChip, openChipList, openChipType, pickSuggestion } from "@/components/sheets/insert-timeline";
import { ring, typeInto } from "@/components/sheets/sheets-timeline";

/** Snaarp Sheets, step 52 - Insert > Smart chips > People: type "pri", pick Priya Shah, Insert; the cell H2 shows the chip. */
export const STEP52_DURATION_MS = 19100;

export async function runStep52(tl: Timeline) {
  beginInsert(tl, URLS.renamed);
  addHeader(tl, SMART_CHIPS.headerCell, SMART_CHIPS.header);
  widenColumn(tl, 7, 190);
  const P = SMART_CHIPS.people.person;

  await tl.at(700);
  tl.showCaption(CAPTIONS.select);
  await clickCell(tl, SMART_CHIPS.cell, { ms: 800 });
  tl.showCaption(CAPTIONS.open);
  await openMenu(tl, "insert", { ms: 800 });
  await chooseRow(tl, "ins-chips", { ms: 500 });
  openChipList(tl);
  await tl.wait(700);
  tl.showCaption(CAPTIONS.list);
  await ring(tl, "[data-tl=chips-dialog]", 2400);
  tl.showCaption(CAPTIONS.people);
  await openChipType(tl, "people");
  tl.showCaption(CAPTIONS.type);
  await typeInto(tl, "chip-people", SMART_CHIPS.people.typed, { msPerChar: 160 });
  tl.setVar("chipSuggest", true);
  await tl.wait(700);
  tl.showCaption(CAPTIONS.suggest);
  await pickSuggestion(tl, 0, P.email, { label: P.name });
  tl.showCaption(CAPTIONS.preview);
  await ring(tl, "[data-tl=chip-preview]", 1300);
  await insertChip(tl, SMART_CHIPS.cell, "people", { label: P.name }, `${P.name} (${P.email})`, SMART_CHIPS.toast);
  await tl.wait(700);
  tl.showCaption(CAPTIONS.done);
  await ring(tl, `[data-tl=cell-${SMART_CHIPS.cell}]`, 1800);
  await finish(tl, 600);
}
