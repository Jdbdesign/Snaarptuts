import type { Timeline } from "@/lib/timeline";
import { finish } from "../shared";
import { CAPTIONS, URLS } from "./data";
import { SMART_CHIPS as S } from "@/components/sheets/insert-data";
import { formatGBP } from "@/lib/money";
import { chooseRow, clickCell, openMenu } from "@/components/sheets/edit-timeline";
import { addHeader, beginInsert, widenColumn, chipBack, insertChip, openChipList, openChipType, pickSuggestion } from "@/components/sheets/insert-timeline";
import { pressOn, ring, typeInto } from "@/components/sheets/sheets-timeline";

/** Snaarp Sheets, step 53 - Smart chips: Date, Place, File, Finance and Event, one chip each in H2:H6 (the recording only shows People). */
export const STEP53_DURATION_MS = 58400;

async function startChip(tl: Timeline, ref: string, kind: string, caption: string) {
  tl.showCaption(CAPTIONS.open);
  await clickCell(tl, ref, { ms: 700 });
  await openMenu(tl, "insert", { ms: 650 });
  await chooseRow(tl, "ins-chips", { ms: 450 });
  openChipList(tl);
  await tl.wait(600);
  tl.showCaption(caption);
  await openChipType(tl, kind);
}

export async function runStep53(tl: Timeline) {
  beginInsert(tl, URLS.renamed);
  addHeader(tl, "h1", S.chipsHeader);
  widenColumn(tl, 7, 190);
  const price = formatGBP(S.finance.price);

  await tl.at(700);
  // Date
  await startChip(tl, S.chipCells.date, "date", CAPTIONS.date);
  await tl.wait(500);
  tl.showCaption(CAPTIONS.back);
  await chipBack(tl);
  await tl.wait(300);
  tl.showCaption(CAPTIONS.date);
  await openChipType(tl, "date");
  await pressOn(tl, `[data-tl=chip-day-${S.date.pick}]`, { ms: 700, ring: false });
  tl.setVar("chipValue", { label: S.date.value });
  await tl.wait(500);
  tl.showCaption(CAPTIONS.insert);
  await insertChip(tl, S.chipCells.date, "date", { label: S.date.value }, S.date.value, S.toastOther("Date"));
  await tl.wait(500);

  // Place
  await startChip(tl, S.chipCells.place, "place", CAPTIONS.place);
  await typeInto(tl, "chip-place", S.place.typed, { msPerChar: 150 });
  tl.setVar("chipSuggest", true);
  await tl.wait(500);
  await pickSuggestion(tl, 0, S.place.value, { label: S.place.value });
  tl.showCaption(CAPTIONS.insert);
  await insertChip(tl, S.chipCells.place, "place", { label: S.place.value }, S.place.value, S.toastOther("Place"));
  await tl.wait(500);

  // File
  await startChip(tl, S.chipCells.file, "file", CAPTIONS.file);
  await pressOn(tl, "[data-tl=chip-file-0]", { ms: 700, ring: false });
  tl.setVar("chipValue", { label: S.file.value });
  await tl.wait(500);
  tl.showCaption(CAPTIONS.insert);
  await insertChip(tl, S.chipCells.file, "file", { label: S.file.value }, S.file.value, S.toastOther("File"));
  await tl.wait(500);

  // Finance
  await startChip(tl, S.chipCells.finance, "finance", CAPTIONS.finance);
  await typeInto(tl, "chip-finance", S.finance.typed, { msPerChar: 150 });
  tl.setVar("chipSuggest", true);
  await tl.wait(500);
  await pickSuggestion(tl, 0, S.finance.ticker, { label: S.finance.ticker, sub: price });
  tl.showCaption(CAPTIONS.insert);
  await insertChip(tl, S.chipCells.finance, "finance", { label: S.finance.ticker, sub: price }, `${S.finance.ticker} ${price}`, S.toastOther("Finance"));
  await tl.wait(500);

  // Event
  await startChip(tl, S.chipCells.event, "event", CAPTIONS.event);
  await typeInto(tl, "chip-event", S.event.typed, { msPerChar: 150 });
  tl.setVar("chipSuggest", true);
  await tl.wait(500);
  await pickSuggestion(tl, 0, S.event.value, { label: S.event.value });
  tl.showCaption(CAPTIONS.insert);
  await insertChip(tl, S.chipCells.event, "event", { label: S.event.value }, S.event.value, S.toastOther("Event"));
  await tl.wait(600);
  tl.showCaption(CAPTIONS.done);
  await ring(tl, "[data-tl=cell-h2]", 1800);
  await finish(tl, 600);
}
