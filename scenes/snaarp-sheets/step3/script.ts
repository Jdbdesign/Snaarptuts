import type { Timeline } from "@/lib/timeline";
import { NAMED_BOOK } from "@/components/sheets/sheets-sample";
import { OPEN_DIALOG } from "@/components/sheets/sheets-data";
import { chooseItem, closeDialog, notice, openDialog, openFileMenu, pickTab, pressOn, swapWorkbook } from "@/components/sheets/sheets-timeline";
import { begin, finish } from "../shared";
import { CAPTIONS, URLS } from "./data";

/** Snaarp Sheets, step 3 - File > Open. Starts on a blank "Untitled spreadsheet"; ends with "Acme Studio – Q3 Budget" opened. */
export const STEP3_DURATION_MS = 24200;

export async function runStep3(tl: Timeline) {
  begin(tl, URLS.blank);

  await tl.at(800);
  tl.showCaption(CAPTIONS.open);
  await openFileMenu(tl, { ms: 900 });
  await tl.wait(500);
  await chooseItem(tl, "open", { ms: 450 });
  tl.setVar("fileLoading", true);
  openDialog(tl, "open");

  // Recent: spinner, then the files
  await tl.wait(1100);
  tl.setVar("fileLoading", false);
  tl.showCaption(CAPTIONS.recent);
  await tl.wait(500);
  for (const n of [1, 2, 4]) {
    await tl.moveCursorTo(`[data-tl=open-recent-${n}]`, { ms: 600 });
    tl.hover(`[data-tl=open-recent-${n}]`);
    await tl.wait(700);
  }
  tl.hover(null);

  // Starred: an empty state
  tl.showCaption(CAPTIONS.starred);
  await pickTab(tl, "open", "starred");
  await tl.wait(500);
  tl.showCaption(CAPTIONS.starredNone);
  tl.highlight("[data-tl=open-dialog] p.text-center");
  await tl.wait(1800);
  tl.clearHighlight();

  // Upload: the drop zone
  tl.showCaption(CAPTIONS.upload);
  await pickTab(tl, "open", "upload");
  await tl.wait(500);
  tl.showCaption(CAPTIONS.uploadInfo);
  tl.highlight("[data-tl=open-zone]");
  await tl.wait(2200);
  tl.clearHighlight();

  // Back to Recent and open the budget
  tl.showCaption(CAPTIONS.back);
  await pickTab(tl, "open", "recent");
  await tl.wait(400);
  tl.showCaption(CAPTIONS.pick);
  await pressOn(tl, "[data-tl=open-recent-1]", { ms: 700 });
  closeDialog(tl);
  await tl.wait(500);
  await swapWorkbook(tl, NAMED_BOOK.title, NAMED_BOOK.sheets, URLS.renamed);
  notice(tl, OPEN_DIALOG.opened(NAMED_BOOK.title), 4500);
  tl.showCaption(CAPTIONS.done);
  await finish(tl, 2600);
}
