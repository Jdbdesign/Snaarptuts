import type { Timeline } from "@/lib/timeline";
import { NAME_VERSION } from "@/components/sheets/sheets-data";
import { closeDialog, closeFileMenu, hoverItem, hoverSub, openDialog, openFileMenu, pressOn, toast, typeInto } from "@/components/sheets/sheets-timeline";
import { begin, finish } from "../shared";
import { CAPTIONS, URLS, VERSION_NAME } from "./data";

/** Snaarp Sheets, step 14 - File > Version history > Name current version. Starts on "Acme Studio – Q3 Budget". */
export const STEP14_DURATION_MS = 14100;

export async function runStep14(tl: Timeline) {
  begin(tl, URLS.renamed);

  await tl.at(800);
  tl.showCaption(CAPTIONS.open);
  await openFileMenu(tl, { ms: 900 });
  await tl.wait(400);
  await hoverItem(tl, "history", { ms: 650 });
  await tl.wait(500);
  tl.showCaption(CAPTIONS.options);
  await hoverSub(tl, "see", { ms: 500 });
  await tl.wait(900);

  tl.showCaption(CAPTIONS.click);
  await hoverSub(tl, "name", { ms: 450 });
  tl.highlight("[data-tl=file-sub-name]");
  await tl.wait(400);
  await tl.click("[data-tl=file-sub-name]");
  tl.clearHighlight();
  closeFileMenu(tl);
  openDialog(tl, "nameVersion");

  await tl.wait(800);
  tl.showCaption(CAPTIONS.type);
  await typeInto(tl, "version-name", VERSION_NAME, { msPerChar: 60 });
  await tl.wait(600);
  tl.showCaption(CAPTIONS.save);
  await pressOn(tl, "[data-tl=version-save]", { ms: 700 });
  closeDialog(tl);
  await tl.wait(400);
  toast(tl, NAME_VERSION.toast, 3200);
  await finish(tl, 2800);
}
