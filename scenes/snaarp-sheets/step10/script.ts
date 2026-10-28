import type { Timeline } from "@/lib/timeline";
import { SHEET } from "@/components/sheets/sheets-data";
import { chooseItem, closeDialog, openDialog, openFileMenu, pressOn, ring } from "@/components/sheets/sheets-timeline";
import { begin, finish } from "../shared";
import { CAPTIONS, URLS } from "./data";

/** Snaarp Sheets, step 10 - File > Rename. Starts on "Budget draft"; ends renamed "Acme Studio – Q3 Budget". */
export const STEP10_DURATION_MS = 14600;

export async function runStep10(tl: Timeline) {
  begin(tl, URLS.budget);

  await tl.at(800);
  tl.showCaption(CAPTIONS.open);
  await openFileMenu(tl, { ms: 900 });
  await tl.wait(500);
  await chooseItem(tl, "rename", { ms: 450 });
  tl.setVar("renameSelected", true);
  openDialog(tl, "rename");

  await tl.wait(900);
  tl.showCaption(CAPTIONS.selected);
  await ring(tl, "[data-tl=field-rename-name]", 1800);

  // Typing replaces the selected name
  tl.showCaption(CAPTIONS.type);
  await tl.moveCursorTo("[data-tl=field-rename-name]", { ms: 600 });
  await tl.click("[data-tl=field-rename-name]");
  tl.setVar("focus", "rename-name");
  tl.setVar("renameSelected", false);
  tl.setVar("field:rename-name", "");
  await tl.typeText("rename-name", SHEET.budget, { msPerChar: 55 });
  await tl.wait(700);

  tl.showCaption(CAPTIONS.rename);
  await pressOn(tl, "[data-tl=rename-go]", { ms: 700 });
  tl.setVar("title", SHEET.budget);
  tl.setUrl(URLS.renamed);
  closeDialog(tl);
  await tl.wait(500);
  tl.showCaption(CAPTIONS.done);
  await ring(tl, "[data-tl=sheet-title]", 2000);
  await finish(tl, 1200);
}
