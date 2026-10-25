import { initEditor, SAMPLE_EDITOR } from "@/components/docs/editor-timeline";
import { chooseInsertItem, clickInsertMenu } from "@/components/docs/insert-menu-timeline";
import {
  chooseSymbolCategory,
  clickEndAndNewLine,
  clickSymbol,
  closeInsertDialog,
  deselectObjects,
  insertObject,
} from "@/components/docs/insert-timeline";
import type { Timeline } from "@/lib/timeline";
import { ARROW_PICKS, CAPTIONS, CATEGORY_ORDER, HOVER_COLORS, HOVER_SIZE, LAST_BLOCK, URLS } from "./step30-data";

/** Snaarp Doc, step 30 - Draw and insert symbols. Times are active milliseconds from the start of the step. */
export const STEP30_DURATION_MS = 38000;

export async function runStep30(tl: Timeline) {
  initEditor(tl, SAMPLE_EDITOR);
  tl.placeCursor(0.5, 0.45); // middle of the page
  tl.setUrl(URLS.editor);
  tl.setVar("intro", 1); // the editor fades in

  // A new line under the Contacts paragraph, then Insert > Drawing
  await tl.at(800);
  tl.showCaption(CAPTIONS.click);
  await clickEndAndNewLine(tl, LAST_BLOCK);
  await tl.at(2500);
  tl.showCaption(CAPTIONS.insert);
  await clickInsertMenu(tl);
  await chooseInsertItem(tl, "drawing");

  // Colour and size dots (hover only; black stays selected)
  await tl.at(5500);
  tl.showCaption(CAPTIONS.pick);
  for (const i of HOVER_COLORS) {
    await tl.moveCursorTo(`[data-tl=draw-color-${i}]`, { ms: 450 });
    tl.hover(`[data-tl=draw-color-${i}]`);
    await tl.wait(220);
  }
  await tl.moveCursorTo(`[data-tl=draw-size-${HOVER_SIZE}]`, { ms: 450 });
  tl.hover(`[data-tl=draw-size-${HOVER_SIZE}]`);
  await tl.wait(220);
  tl.hover(null);

  // Draw: the cursor follows the sample doodle and the stroke appears behind it
  await tl.at(8000);
  tl.showCaption(CAPTIONS.draw);
  await tl.followPath("[data-tl=draw-stroke]", 3200, (p) => tl.setVar("drawProgress", p));

  // Insert: the dialog closes; the drawing is in the page with its handles and toolbar
  await tl.at(12000);
  tl.showCaption(CAPTIONS.button);
  await tl.moveCursorTo("[data-tl=draw-insert]", { ms: 800 });
  tl.highlight("[data-tl=draw-insert]");
  await tl.wait(200);
  await tl.click("[data-tl=draw-insert]");
  tl.clearHighlight();
  const below = insertObject(tl, "drawing", { trailingLine: true });

  // A new line below the drawing, then Insert > Symbols
  await tl.at(16000);
  tl.showCaption(CAPTIONS.symbols);
  await tl.moveCursorTo(`[data-tl=doc-end-${below}]`, { ms: 800, dx: 3 });
  await tl.click(`[data-tl=doc-end-${below}]`);
  deselectObjects(tl);
  await clickInsertMenu(tl);
  await chooseInsertItem(tl, "symbols");

  // Categories: Math, then back to Arrows
  await tl.at(19500);
  tl.showCaption(CAPTIONS.browse);
  for (const id of CATEGORY_ORDER) await chooseSymbolCategory(tl, id);

  // Five arrows, each added to the text behind the dialog
  await tl.at(23500);
  tl.showCaption(CAPTIONS.add);
  for (const i of ARROW_PICKS) {
    await clickSymbol(tl, i);
    await tl.wait(250);
  }

  // Close the window: the symbols stay in the text
  await tl.at(29000);
  tl.showCaption(CAPTIONS.close);
  await tl.moveCursorTo("[data-tl=sym-close]", { ms: 800 });
  tl.highlight("[data-tl=sym-close]");
  await tl.wait(200);
  await tl.click("[data-tl=sym-close]");
  tl.clearHighlight();
  closeInsertDialog(tl);

  // Hold, then the quick white fade
  await tl.at(32000);
  tl.hideCaption();
  await tl.at(35600);
  tl.setVar("fade", true);
  await tl.at(STEP30_DURATION_MS);
}
