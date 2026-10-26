import { BLANK_SLIDE, IMPORTED_SLIDES, IMPORT_DIALOG } from "@/components/slides/slides-data";
import { chooseItem, closeDialog, openDialog, openFileMenu, pressOn, toast } from "@/components/slides/slides-timeline";
import type { Timeline } from "@/lib/timeline";
import { begin } from "../shared";
import { CAPTIONS, URLS } from "./data";

/** Snaarp Slides, step 6 - Import slides (File > Import slides). Starts in the editor with "Acme Studio Pitch". */
export const STEP6_DURATION_MS = 31000;

export async function runStep6(tl: Timeline) {
  begin(tl, URLS.editor, [0.5, 0.5]);

  // File > Import slides
  await tl.at(800);
  tl.showCaption(CAPTIONS.open);
  await openFileMenu(tl, { ms: 800 });
  await chooseItem(tl, "import", { ms: 600 });
  openDialog(tl, "import");

  // The first tab
  await tl.at(4000);
  tl.showCaption(CAPTIONS.from);
  tl.highlight("[data-tl=import-tab-from]");

  // The Upload file tab
  await tl.at(6400);
  tl.clearHighlight();
  tl.showCaption(CAPTIONS.uploadTab);
  await pressOn(tl, "[data-tl=import-tab-upload]", { ms: 800 });
  tl.setVar("importTab", "upload");

  await tl.at(9000);
  tl.showCaption(CAPTIONS.browse);
  await tl.moveCursorTo("[data-tl=import-zone]", { ms: 800 });
  tl.hover("[data-tl=import-zone]");
  tl.highlight("[data-tl=import-zone]");

  // Choose the file (no operating-system picker: the file name simply appears)
  await tl.at(11300);
  tl.clearHighlight();
  tl.showCaption(CAPTIONS.choose);
  await tl.click("[data-tl=import-zone]");
  tl.hover(null);
  await tl.wait(500);
  tl.setVar("importPhase", "chosen");
  await tl.wait(100);
  tl.highlight("[data-tl=import-file]");

  await tl.at(14000);
  tl.clearHighlight();
  tl.showCaption(CAPTIONS.uploading);
  tl.setVar("importPhase", "uploading");

  await tl.at(16300);
  tl.showCaption(CAPTIONS.processing);
  tl.setVar("importPhase", "processing");

  await tl.at(19300);
  tl.showCaption(CAPTIONS.complete);
  tl.setVar("importPhase", "complete");

  // The slides arrive in the panel
  await tl.at(21000);
  closeDialog(tl);
  tl.setVar("slides", [BLANK_SLIDE, ...IMPORTED_SLIDES]);
  tl.setVar("selected", 1);
  tl.setVar("importPhase", "idle");
  await tl.wait(100);
  toast(tl, IMPORT_DIALOG.toast, 3200);
  tl.showCaption(CAPTIONS.panel);
  tl.highlight("[data-tl=slide-panel]");

  await tl.at(23500);
  tl.clearHighlight();
  tl.showCaption(CAPTIONS.pick);
  for (const n of [3, 4]) {
    await pressOn(tl, `[data-tl=thumb-${n}]`, { ms: 750 });
    tl.setVar("selected", n - 1);
    await tl.wait(700);
  }

  // Quick white fade
  await tl.at(29800);
  tl.hideCaption();
  tl.setVar("fade", true);
  await tl.at(STEP6_DURATION_MS);
}
