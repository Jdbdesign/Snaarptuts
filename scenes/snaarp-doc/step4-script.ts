import { chooseFileMenuItem, clickFileMenu, hoverFileMenuItem } from "@/components/docs/file-menu-timeline";
import { showDocToast } from "@/components/docs/doc-toast-timeline";
import type { Timeline } from "@/lib/timeline";
import { CAPTIONS, TITLES, TOAST, URLS } from "./step4-data";

/** Snaarp Doc, step 4 - Make a copy. Times are active milliseconds from the start of the step. */
export const STEP4_DURATION_MS = 11400;

export async function runStep4(tl: Timeline) {
  tl.placeCursor(0.5, 0.45); // where step 3 left the cursor (middle of the page)
  tl.setUrl(URLS.editor);
  tl.setVar("intro", 1); // the editor fades in

  // Click File
  await tl.at(800);
  tl.showCaption(CAPTIONS.clickFile);
  await clickFileMenu(tl);

  // Open: hover only (the computer's file picker is not shown)
  await tl.at(2400);
  tl.showCaption(CAPTIONS.open);
  await hoverFileMenuItem(tl, "open", { ms: 500 });
  await tl.at(3600);

  // Click Make a copy
  await tl.at(4000);
  tl.showCaption(CAPTIONS.makeCopy);
  await chooseFileMenuItem(tl, "copy", { ms: 450 });

  // Loading state, the copy's address and the "Copy created" toast
  await tl.at(5000);
  tl.setVar("title", TITLES.copy);
  tl.setVar("loading", true);
  tl.setUrl(URLS.copy);
  tl.hideCaption();
  showDocToast(tl, TOAST, "success", 4500);

  // The copy opens
  await tl.at(7500);
  tl.setVar("loading", false);
  tl.showCaption(CAPTIONS.opened);
  tl.highlight("[data-tl=editor-title]");

  await tl.at(9500);
  tl.clearHighlight();

  // Quick white fade
  await tl.at(11000);
  tl.hideCaption();
  tl.setVar("fade", true);
  await tl.at(STEP4_DURATION_MS);
}
