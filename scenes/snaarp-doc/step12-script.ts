import {
  chooseEditMenuItem,
  clickEditMenu,
  closeEditMenu,
  COPIED_EDITOR,
  hoverEditMenuItem,
  initEditor,
} from "@/components/docs/editor-timeline";
import type { Timeline } from "@/lib/timeline";
import { CAPTIONS, URLS } from "./step12-data";

/** Snaarp Doc, step 12 - Select all, delete and undo. Times are active milliseconds from the start of the step. */
export const STEP12_DURATION_MS = 17000;

export async function runStep12(tl: Timeline) {
  const narrow = window.matchMedia("(max-width: 899px)").matches;

  initEditor(tl, COPIED_EDITOR);
  tl.placeCursor(0.5, 0.45); // where step 11 left the cursor (middle of the page)
  tl.setUrl(URLS.editor);
  tl.setVar("intro", 1); // the editor fades in

  // Edit > Select all: the whole document turns blue
  await tl.at(800);
  tl.showCaption(CAPTIONS.selectAll);
  await clickEditMenu(tl, { ms: 600 });
  await chooseEditMenuItem(tl, "select-all", { ms: 400 });

  // Edit > Delete (active now): the page becomes empty
  await tl.at(4000);
  tl.showCaption(CAPTIONS.delete);
  await clickEditMenu(tl, { ms: 600 });
  await chooseEditMenuItem(tl, "delete", { ms: 400 });
  await tl.at(5500);
  tl.showCaption(CAPTIONS.deleted);

  // Edit > Undo: the document comes back and the status returns to All changes saved
  await tl.at(8000);
  tl.showCaption(CAPTIONS.undo);
  await clickEditMenu(tl, { ms: 600 });
  await chooseEditMenuItem(tl, "undo", { ms: 400 });
  await tl.at(10100);
  tl.showCaption(CAPTIONS.restored);

  // Redo is active now: hover it
  await tl.at(11800);
  tl.showCaption(CAPTIONS.redo);
  await clickEditMenu(tl, { ms: 600 });
  await hoverEditMenuItem(tl, "redo", { ms: 400 });
  tl.highlight("[data-tl=edit-item-redo]");

  // Close the menu with a click on an empty part of the canvas, then hold
  await tl.at(14500);
  tl.clearHighlight();
  tl.hover(null);
  await tl.moveCursorTo("[data-tl=editor-canvas]", { ms: 450, dx: narrow ? 0 : -330, dy: 120 });
  await tl.click("[data-tl=editor-canvas]");
  closeEditMenu(tl);

  // Quick white fade
  await tl.at(16600);
  tl.hideCaption();
  tl.setVar("fade", true);
  await tl.at(STEP12_DURATION_MS);
}
