import type { Timeline } from "@/lib/timeline";
import { CONTACTS_FILE, IMPORT_DIALOG } from "@/components/sheets/sheets-data";
import { BUDGET_BOOK, CONTACTS_SHEET, type SheetModel } from "@/components/sheets/sheets-sample";
import { closeDialog, hoverOn, notice, pressOn, ring } from "@/components/sheets/sheets-timeline";
import { begin, finish } from "../shared";
import { CAPTIONS, URLS } from "./data";

/** Snaarp Sheets, step 5 - Import location. Starts on "Budget draft" with the Import location screen open for acme-contacts.csv. */
export const STEP5_DURATION_MS = 17300;

export async function runStep5(tl: Timeline) {
  begin(tl, URLS.budget);
  tl.setVar("dialog", "importLocation");

  await tl.at(1200);
  tl.showCaption(CAPTIONS.intro);
  await ring(tl, "[data-tl=import-chip]", 1500);

  tl.showCaption(CAPTIONS.options);
  for (const id of ["new", "insert", "replace", "append"]) {
    await hoverOn(tl, `[data-tl=import-option-${id}]`, { ms: 600 });
    await tl.wait(1000);
  }
  tl.hover(null);

  tl.showCaption(CAPTIONS.pick);
  await pressOn(tl, "[data-tl=import-option-insert]", { ms: 700 });
  tl.setVar("importChoice", "insert");
  await tl.wait(900);

  tl.showCaption(CAPTIONS.go);
  await pressOn(tl, "[data-tl=import-go]", { ms: 700 });
  closeDialog(tl);
  await tl.wait(500);
  const sheets = tl.getVar<SheetModel[]>("sheets", BUDGET_BOOK.sheets);
  tl.setVar("sheets", [...sheets, CONTACTS_SHEET]);
  tl.setVar("activeSheet", CONTACTS_SHEET.id);
  notice(tl, IMPORT_DIALOG.imported(CONTACTS_FILE.name), 4500);
  tl.showCaption(CAPTIONS.done);
  await tl.wait(700);
  await ring(tl, `[data-tl=sheet-tab-${CONTACTS_SHEET.id}]`, 1600);
  await finish(tl, 1200);
}
