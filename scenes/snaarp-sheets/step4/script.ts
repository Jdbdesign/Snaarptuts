import type { Timeline } from "@/lib/timeline";
import { CONTACTS_FILE } from "@/components/sheets/sheets-data";
import { chooseItem, hoverOn, openDialog, openFileMenu, pickTab, pressOn, ring } from "@/components/sheets/sheets-timeline";
import { begin, finish } from "../shared";
import { CAPTIONS, URLS } from "./data";

/** Snaarp Sheets, step 4 - File > Import. Starts on "Budget draft"; ends with the Import location screen ready for step 5. */
export const STEP4_DURATION_MS = 20800;

export async function runStep4(tl: Timeline) {
  begin(tl, URLS.budget);

  await tl.at(800);
  tl.showCaption(CAPTIONS.open);
  await openFileMenu(tl, { ms: 900 });
  await tl.wait(500);
  await chooseItem(tl, "import", { ms: 450 });
  tl.setVar("fileLoading", true);
  openDialog(tl, "import");
  await tl.wait(1100);
  tl.setVar("fileLoading", false);
  tl.showCaption(CAPTIONS.intro);
  await tl.wait(1800);

  // My Drive: the files you saved
  tl.showCaption(CAPTIONS.drive);
  await pickTab(tl, "import", "drive");
  for (const n of [1, 2]) {
    await hoverOn(tl, `[data-tl=import-drive-${n}]`, { ms: 600 });
    await tl.wait(600);
  }
  tl.hover(null);

  // Upload: the drop zone and "browse"
  tl.showCaption(CAPTIONS.upload);
  await pickTab(tl, "import", "upload");
  await tl.wait(400);
  tl.showCaption(CAPTIONS.zone);
  await ring(tl, "[data-tl=import-zone]", 1800);
  tl.showCaption(CAPTIONS.browse);
  await pressOn(tl, "[data-tl=import-browse]", { ms: 700 });
  tl.setVar("fileChooser", true);
  await tl.wait(600);
  tl.showCaption(CAPTIONS.choose);
  await hoverOn(tl, "[data-tl=import-local-2]", { ms: 700 });
  await tl.wait(500);
  await tl.click("[data-tl=import-local-2]");
  tl.setVar("fileChosen", CONTACTS_FILE.name);
  tl.setVar("fileChooser", false);
  tl.hover(null);
  await tl.wait(600);

  // Next: choose where the data goes
  tl.showCaption(CAPTIONS.next);
  await pressOn(tl, "[data-tl=import-primary]", { ms: 700 });
  openDialog(tl, "importLocation");
  await finish(tl, 1500);
}
