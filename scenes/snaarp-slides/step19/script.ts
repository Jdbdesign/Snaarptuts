import { DECK, TRASH, TRASH_DIALOG } from "@/components/slides/slides-data";
import { chooseItem, closeDialog, openDialog, openFileMenu, pressOn, ring, toast } from "@/components/slides/slides-timeline";
import type { Timeline } from "@/lib/timeline";
import { begin } from "../shared";
import { CAPTIONS, URLS } from "./data";

/** Snaarp Slides, step 19 - Move a presentation to Trash (File > Move to trash). Starts in the editor with "Acme Studio Pitch". */
export const STEP19_DURATION_MS = 30000;

export async function runStep19(tl: Timeline) {
  begin(tl, URLS.editor, [0.5, 0.5]);

  // File > Move to trash
  await tl.at(800);
  tl.showCaption(CAPTIONS.open);
  await openFileMenu(tl, { ms: 800 });
  await chooseItem(tl, "trash", { ms: 600 });
  openDialog(tl, "trash");

  await tl.at(4000);
  tl.showCaption(CAPTIONS.confirm);
  await ring(tl, "[data-tl=trash-dialog]", 1600);
  tl.showCaption(CAPTIONS.click);
  await pressOn(tl, "[data-tl=trash-confirm]", { ms: 800 });
  closeDialog(tl);
  toast(tl, TRASH_DIALOG.toast, 3000);

  // Land on the Trash page
  await tl.at(9300);
  tl.setVar("fade", true);
  await tl.wait(350);
  tl.setVar("trashItems", [{ name: DECK.title, meta: TRASH.deleted }]);
  tl.setVar("screen", "trash");
  tl.setVar("stage", "home");
  tl.setUrl(URLS.trash);
  tl.setVar("fade", false);
  await tl.wait(500);
  tl.showCaption(CAPTIONS.trash);
  tl.placeCursor(0.5, 0.4);
  await ring(tl, "[data-tl=trash-item-1]", 1800);

  await tl.at(13500);
  tl.showCaption(CAPTIONS.info);
  await ring(tl, "[data-tl=trash-title]", 2400);

  // Restore it
  await tl.at(17000);
  tl.showCaption(CAPTIONS.restore);
  await tl.moveCursorTo("[data-tl=trash-restore-1]", { ms: 900 });
  tl.hover("[data-tl=trash-restore-1]");
  tl.highlight("[data-tl=trash-restore-1]");
  await tl.wait(300);
  await tl.click("[data-tl=trash-restore-1]");
  tl.clearHighlight();
  tl.hover(null);
  tl.setVar("trashItems", []);
  toast(tl, TRASH_DIALOG.restoredToast(DECK.title), 3200);
  tl.showCaption(CAPTIONS.restored);

  // Quick white fade
  await tl.at(28800);
  tl.hideCaption();
  tl.setVar("fade", true);
  await tl.at(STEP19_DURATION_MS);
}
