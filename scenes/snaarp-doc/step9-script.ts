import { clickFileMenu, closeFileMenu, hoverFileMenuItem } from "@/components/docs/file-menu-timeline";
import type { Timeline } from "@/lib/timeline";
import { CAPTIONS, SETTING_ORDER, URLS } from "./step9-data";

/** Snaarp Doc, step 9 - Print your document. Times are active milliseconds from the start of the step. */
export const STEP9_DURATION_MS = 13400;

export async function runStep9(tl: Timeline) {
  tl.placeCursor(0.5, 0.45); // where step 8 left the cursor (middle of the page)
  tl.setUrl(URLS.editor);
  tl.setVar("intro", 1); // the editor fades in

  // Click File
  await tl.at(800);
  tl.showCaption(CAPTIONS.clickFile);
  await clickFileMenu(tl);

  // Down to Print (its Ctrl+P shortcut is visible), ring on the item
  await tl.at(2400);
  tl.showCaption(CAPTIONS.print);
  await hoverFileMenuItem(tl, "print", { ms: 900 });
  tl.highlight("[data-tl=file-item-print]");

  // Click Print: the menu closes, the print panel opens
  await tl.at(4000);
  await tl.click("[data-tl=file-item-print]");
  tl.clearHighlight();
  closeFileMenu(tl);
  await tl.at(4800);
  tl.setVar("print", true);
  tl.showCaption(CAPTIONS.opens);

  // The settings: hover each for about 0.5 s
  await tl.at(6500);
  tl.showCaption(CAPTIONS.settings);
  tl.highlight("[data-tl=print-settings]");
  for (const id of SETTING_ORDER) {
    const sel = `[data-tl=print-setting-${id}]`;
    await tl.moveCursorTo(sel, { ms: 250, dx: 60 });
    tl.hover(sel);
    await tl.wait(250);
  }
  tl.hover(null);

  // Print or Cancel: ring on both buttons
  await tl.at(9500);
  tl.clearHighlight();
  tl.showCaption(CAPTIONS.buttons);
  tl.highlight("[data-tl=print-btn]");
  tl.highlight("[data-tl=print-cancel]");

  // Cancel
  await tl.at(11000);
  await tl.moveCursorTo("[data-tl=print-cancel]", { ms: 500 });
  await tl.click("[data-tl=print-cancel]");
  tl.clearHighlight();
  tl.setVar("print", false);

  // Hold on the editor, then the quick white fade
  await tl.at(13000);
  tl.hideCaption();
  tl.setVar("fade", true);
  await tl.at(STEP9_DURATION_MS);
}
