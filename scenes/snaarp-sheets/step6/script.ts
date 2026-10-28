import type { Timeline } from "@/lib/timeline";
import { COPY_DIALOG } from "@/components/sheets/sheets-data";
import { chooseItem, closeDialog, openDialog, openFileMenu, pressOn, ring, toast } from "@/components/sheets/sheets-timeline";
import { begin, finish } from "../shared";
import { CAPTIONS, URLS } from "./data";

/** Snaarp Sheets, step 6 - File > Make a copy. Starts on "Budget draft". */
export const STEP6_DURATION_MS = 16400;

export async function runStep6(tl: Timeline) {
  begin(tl, URLS.budget);

  await tl.at(800);
  tl.showCaption(CAPTIONS.open);
  await openFileMenu(tl, { ms: 900 });
  await tl.wait(500);
  await chooseItem(tl, "copy", { ms: 450 });
  openDialog(tl, "copy");

  await tl.wait(700);
  tl.showCaption(CAPTIONS.name);
  await ring(tl, "[data-tl=field-copy-name]", 1800);
  tl.showCaption(CAPTIONS.folder);
  await ring(tl, "[data-tl=copy-folder]", 1500);

  tl.showCaption(CAPTIONS.same);
  await pressOn(tl, "[data-tl=copy-same]", { ms: 650, dx: -60 });
  tl.setVar("copySame", true);
  await tl.wait(600);
  tl.showCaption(CAPTIONS.comments);
  await pressOn(tl, "[data-tl=copy-comments]", { ms: 650, dx: -50 });
  tl.setVar("copyComments", true);
  await tl.wait(1200);

  tl.showCaption(CAPTIONS.make);
  await pressOn(tl, "[data-tl=copy-make]", { ms: 700 });
  closeDialog(tl);
  await tl.wait(400);
  toast(tl, COPY_DIALOG.toast, 3400);
  tl.showCaption(CAPTIONS.done);
  await finish(tl, 2800);
}
