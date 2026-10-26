import { MOVE_DIALOG } from "@/components/slides/slides-data";
import { chooseItem, closeDialog, openDialog, openFileMenu, pressOn, toast } from "@/components/slides/slides-timeline";
import type { Timeline } from "@/lib/timeline";
import { begin } from "../shared";
import { CAPTIONS, URLS } from "./data";

/** Snaarp Slides, step 12 - Move it to a folder (File > Move). Starts in the editor with "Acme Studio Pitch". */
export const STEP12_DURATION_MS = 22000;

export async function runStep12(tl: Timeline) {
  begin(tl, URLS.editor, [0.5, 0.5]);

  // File > Move
  await tl.at(800);
  tl.showCaption(CAPTIONS.open);
  await openFileMenu(tl, { ms: 800 });
  await chooseItem(tl, "move", { ms: 600 });
  openDialog(tl, "move");

  // The folder picker
  await tl.at(4000);
  tl.showCaption(CAPTIONS.picker);
  for (const id of ["all", "client", "archive"]) {
    await tl.moveCursorTo(`[data-tl=move-folder-${id}]`, { ms: 600 });
    tl.hover(`[data-tl=move-folder-${id}]`);
    await tl.wait(600);
  }

  await tl.at(8800);
  tl.showCaption(CAPTIONS.pick);
  await tl.moveCursorTo("[data-tl=move-folder-client]", { ms: 600 });
  tl.highlight("[data-tl=move-folder-client]");
  await tl.wait(250);
  await tl.click("[data-tl=move-folder-client]");
  tl.clearHighlight();
  tl.setVar("moveChoice", "client");

  await tl.at(11500);
  tl.hover(null);
  tl.showCaption(CAPTIONS.newFolder);
  await tl.moveCursorTo("[data-tl=move-new-folder]", { ms: 650 });
  tl.hover("[data-tl=move-new-folder]");
  tl.highlight("[data-tl=move-new-folder]");

  await tl.at(14200);
  tl.hover(null);
  tl.clearHighlight();
  tl.showCaption(CAPTIONS.move);
  await pressOn(tl, "[data-tl=move-ok]", { ms: 750 });
  closeDialog(tl);
  tl.setVar("moveCurrent", "client");
  toast(tl, MOVE_DIALOG.toast("Client work"), 3400);
  tl.showCaption(CAPTIONS.done);

  // Quick white fade
  await tl.at(20800);
  tl.hideCaption();
  tl.setVar("fade", true);
  await tl.at(STEP12_DURATION_MS);
}
