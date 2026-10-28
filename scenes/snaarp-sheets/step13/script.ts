import type { Timeline } from "@/lib/timeline";
import { showDocToast } from "@/components/docs/doc-toast-timeline";
import { TRASH } from "@/components/sheets/sheets-data";
import { chooseItem, hoverItem, openFileMenu, pressOn } from "@/components/sheets/sheets-timeline";
import { begin, finish } from "../shared";
import { CAPTIONS, URLS } from "./data";

/** Snaarp Sheets, step 13 - File > Move to trash, then Undo. Starts on "Acme Studio – Q3 Budget"; ends with the file restored. */
export const STEP13_DURATION_MS = 11700;

export async function runStep13(tl: Timeline) {
  begin(tl, URLS.renamed);

  await tl.at(800);
  tl.showCaption(CAPTIONS.open);
  await openFileMenu(tl, { ms: 900 });
  await tl.wait(400);
  await hoverItem(tl, "trash", { ms: 600 });
  tl.highlight("[data-tl=file-item-trash]");
  tl.showCaption(CAPTIONS.hover);
  await tl.wait(1800);
  tl.clearHighlight();

  tl.showCaption(CAPTIONS.click);
  await chooseItem(tl, "trash", { ms: 350 });
  await tl.wait(300);
  tl.setVar("trashed", true);
  showDocToast(tl, TRASH.toast, "success", 9000, TRASH.undo);
  await tl.wait(900);

  // Undo: the file comes back
  tl.showCaption(CAPTIONS.undo);
  await pressOn(tl, "[data-tl=toast-action]", { ms: 800 });
  tl.setVar("trashed", false);
  showDocToast(tl, TRASH.restored, "success", 2800);
  await tl.wait(600);
  tl.showCaption(CAPTIONS.restored);
  await finish(tl, 2400);
}
