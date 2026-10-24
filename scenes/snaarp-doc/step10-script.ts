import { clickEditMenu, closeEditMenu, hoverEditMenuItem, initEditor, SAMPLE_EDITOR } from "@/components/docs/editor-timeline";
import type { Timeline } from "@/lib/timeline";
import { CAPTIONS, URLS } from "./step10-data";

/** Snaarp Doc, step 10 - Explore the Edit menu. Times are active milliseconds from the start of the step. */
export const STEP10_DURATION_MS = 13400;

export async function runStep10(tl: Timeline) {
  const narrow = window.matchMedia("(max-width: 899px)").matches;

  initEditor(tl, SAMPLE_EDITOR);
  tl.placeCursor(0.5, 0.45); // where step 9 left the cursor (middle of the page)
  tl.setUrl(URLS.editor);
  tl.setVar("intro", 1); // the editor fades in

  // Click Edit: Redo, Delete, Cut and Copy are greyed out
  await tl.at(800);
  tl.showCaption(CAPTIONS.clickEdit);
  await clickEditMenu(tl);

  // Down the list: Undo, Cut, Copy, Paste (about 0.5 s each)
  await tl.at(2800);
  tl.showCaption(CAPTIONS.tools);
  for (const id of ["undo", "cut", "copy", "paste"] as const) {
    await hoverEditMenuItem(tl, id, { ms: 250 });
    await tl.wait(250);
  }

  // Paste without formatting
  await tl.at(6000);
  tl.showCaption(CAPTIONS.plain);
  await hoverEditMenuItem(tl, "paste-plain", { ms: 450 });

  // Greyed-out items: Redo, then Delete (they stay greyed)
  await tl.at(8000);
  tl.showCaption(CAPTIONS.greyed);
  tl.highlight("[data-tl=edit-item-redo]");
  tl.highlight("[data-tl=edit-item-delete]");
  await hoverEditMenuItem(tl, "redo", { ms: 500 });
  await tl.wait(500);
  await hoverEditMenuItem(tl, "delete", { ms: 400 });
  await tl.wait(300);
  tl.clearHighlight();

  // Find and replace
  await tl.at(10500);
  await hoverEditMenuItem(tl, "find", { ms: 450 });

  // Click an empty part of the canvas: the menu closes
  await tl.at(11500);
  tl.hover(null);
  await tl.moveCursorTo("[data-tl=editor-canvas]", { ms: 450, dx: narrow ? 0 : -330, dy: 120 });
  await tl.click("[data-tl=editor-canvas]");
  closeEditMenu(tl);

  // Quick white fade
  await tl.at(13000);
  tl.hideCaption();
  tl.setVar("fade", true);
  await tl.at(STEP10_DURATION_MS);
}
