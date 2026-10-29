import type { Timeline } from "@/lib/timeline";
import { phoneScroll } from "@/components/sheets/insert-timeline";
import { finish } from "../shared";
import { CAPTIONS, URLS } from "./data";
import { chooseSub, clickCell, hoverRow, openMenu } from "@/components/sheets/edit-timeline";
import { applyCustom, beginFdt, pickPreset } from "@/components/sheets/fdt-timeline";
import { CUSTOM_FMT, NUM_CELLS } from "@/components/sheets/fdt-data";
import { closeDialog, pressOn, ring, typeInto } from "@/components/sheets/sheets-timeline";

/** Snaarp Sheets, step 57 - Format > Number: each format on the cell it suits (before and after), then the three Custom dialogs (the currency one is applied). */
export const STEP57_DURATION_MS = 90600;

/** Select nothing new: open Format > Number, click one format, close, and ring the result. */
async function applyNumber(tl: Timeline, cell: string, nf: string, caption: string) {
  await openMenu(tl, "format", { ms: 500 });
  tl.showCaption(caption);
  await chooseSub(tl, "fmt-number", `nf-${nf}`, { ms: 350, hold: 120 });
  await tl.wait(200);
  await ring(tl, `[data-tl=cell-${cell}]`, 650);
}

export async function runStep57(tl: Timeline) {
  beginFdt(tl, URLS.renamed);
  phoneScroll(tl, 4);

  await tl.at(600);
  tl.showCaption(CAPTIONS.selectAmount);
  await clickCell(tl, NUM_CELLS.amount, { ring: true });
  tl.showCaption(CAPTIONS.open);
  await openMenu(tl, "format", { ms: 650 });
  await hoverRow(tl, "fmt-number", { sub: "number", ms: 450 });
  tl.showCaption(CAPTIONS.list);
  await ring(tl, "[data-tl=menu-item-fmt-number]", 1300);
  await chooseSub(tl, "fmt-number", "nf-number", { ms: 350, hold: 120 });
  tl.showCaption(CAPTIONS.number);
  await tl.wait(200);
  await ring(tl, `[data-tl=cell-${NUM_CELLS.amount}]`, 1000);

  await applyNumber(tl, NUM_CELLS.amount, "scientific", CAPTIONS.scientific);
  await applyNumber(tl, NUM_CELLS.amount, "accounting", CAPTIONS.accounting);
  await applyNumber(tl, NUM_CELLS.amount, "financial", CAPTIONS.financial);
  await applyNumber(tl, NUM_CELLS.amount, "currency", CAPTIONS.currency);
  await applyNumber(tl, NUM_CELLS.amount, "currencyround", CAPTIONS.currencyround);

  tl.showCaption(CAPTIONS.selectRate);
  await clickCell(tl, NUM_CELLS.rate, { ring: true });
  await applyNumber(tl, NUM_CELLS.rate, "percent", CAPTIONS.percent);

  tl.showCaption(CAPTIONS.selectDue);
  await clickCell(tl, NUM_CELLS.due, { ring: true });
  await applyNumber(tl, NUM_CELLS.due, "time", CAPTIONS.time);
  await applyNumber(tl, NUM_CELLS.due, "datetime", CAPTIONS.datetime);
  await applyNumber(tl, NUM_CELLS.due, "date", CAPTIONS.date);

  await openMenu(tl, "format", { ms: 500 });
  tl.showCaption(CAPTIONS.customDate);
  await chooseSub(tl, "fmt-number", "nf-custom-datetime", { ms: 350, hold: 120 });
  await tl.wait(500);
  tl.showCaption(CAPTIONS.customPick);
  await pickPreset(tl, 1, CUSTOM_FMT["custom-datetime"].presets[1]);
  await tl.wait(1200);
  tl.showCaption(CAPTIONS.cancel);
  await pressOn(tl, "[data-tl=custom-cancel]", { ms: 600 });
  closeDialog(tl);
  await tl.wait(400);

  tl.showCaption(CAPTIONS.selectLength);
  await clickCell(tl, NUM_CELLS.length, { ring: true });
  await applyNumber(tl, NUM_CELLS.length, "duration", CAPTIONS.duration);

  tl.showCaption(CAPTIONS.selectAmount2);
  await clickCell(tl, NUM_CELLS.amount, { ring: true });
  await applyNumber(tl, NUM_CELLS.amount, "plain", CAPTIONS.plain);

  await openMenu(tl, "format", { ms: 500 });
  tl.showCaption(CAPTIONS.customNumber);
  await chooseSub(tl, "fmt-number", "nf-custom-number", { ms: 350, hold: 120 });
  await tl.wait(1300);
  await pressOn(tl, "[data-tl=custom-cancel]", { ms: 600 });
  closeDialog(tl);
  await tl.wait(400);

  await openMenu(tl, "format", { ms: 500 });
  tl.showCaption(CAPTIONS.customCurrency);
  await chooseSub(tl, "fmt-number", "nf-custom-currency", { ms: 350, hold: 120 });
  await tl.wait(500);
  tl.showCaption(CAPTIONS.typePattern);
  await typeInto(tl, "custom-input", CUSTOM_FMT["custom-currency"].pick, { msPerChar: 70 });
  await tl.wait(900);
  tl.showCaption(CAPTIONS.apply);
  await pressOn(tl, "[data-tl=custom-apply]", { ms: 650 });
  applyCustom(tl);
  await tl.wait(500);
  await ring(tl, `[data-tl=cell-${NUM_CELLS.amount}]`, 1400);
  await finish(tl, 400);
}
