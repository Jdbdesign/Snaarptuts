import { COPY_DIALOGS, DECK } from "@/components/slides/slides-data";
import { chooseSub, hoverItem, hoverSub, openFileMenu, pressOn, toast } from "@/components/slides/slides-timeline";
import type { Timeline } from "@/lib/timeline";
import { begin } from "../shared";
import { CAPTIONS, URLS } from "./data";

/** Snaarp Slides, step 7 - Make a copy (File > Make a copy). Starts in the editor with "Acme Studio Pitch". */
export const STEP7_DURATION_MS = 28000;

export async function runStep7(tl: Timeline) {
  begin(tl, URLS.editor, [0.5, 0.5]);

  // File > Make a copy
  await tl.at(800);
  tl.showCaption(CAPTIONS.open);
  await openFileMenu(tl, { ms: 800 });
  await hoverItem(tl, "copy", { ms: 600 });
  tl.highlight("[data-tl=file-item-copy]");

  await tl.at(4000);
  tl.clearHighlight();
  tl.showCaption(CAPTIONS.entire);
  await hoverSub(tl, "entire", { ms: 550 });

  // Entire presentation
  await tl.at(6500);
  tl.showCaption(CAPTIONS.entireClick);
  await chooseSub(tl, "copy", "entire", { ms: 300 });
  toast(tl, COPY_DIALOGS.entireToast(DECK.title), 3400);
  tl.showCaption(CAPTIONS.copied);

  // Pick a slide in the panel, then Selected slides
  await tl.at(11000);
  tl.showCaption(CAPTIONS.select);
  await pressOn(tl, "[data-tl=thumb-1]", { ms: 800 });
  tl.setVar("selected", 0);

  await tl.at(14000);
  tl.showCaption(CAPTIONS.again);
  await openFileMenu(tl, { ms: 800 });
  await hoverItem(tl, "copy", { ms: 500 });

  await tl.at(17500);
  tl.showCaption(CAPTIONS.selected);
  await hoverSub(tl, "selected", { ms: 500 });
  tl.highlight("[data-tl=file-sub-selected]");

  await tl.at(20000);
  tl.clearHighlight();
  tl.showCaption(CAPTIONS.selectedClick);
  await chooseSub(tl, "copy", "selected", { ms: 300 });
  toast(tl, COPY_DIALOGS.selectedToast(DECK.title, 1), 3400);
  tl.showCaption(CAPTIONS.copied);

  // Quick white fade
  await tl.at(26800);
  tl.hideCaption();
  tl.setVar("fade", true);
  await tl.at(STEP7_DURATION_MS);
}
