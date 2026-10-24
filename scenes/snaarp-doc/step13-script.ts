import {
  chooseEditMenuItem,
  clickClosePanel,
  clickEditMenu,
  clickReplaceAll,
  clickStep,
  initEditor,
  SAMPLE_EDITOR,
  toggleMatchCase,
  typeInPanel,
} from "@/components/docs/editor-timeline";
import type { Timeline } from "@/lib/timeline";
import { CAPTIONS, FIND_WORD, REPLACE_WORD, URLS } from "./step13-data";

/** Snaarp Doc, step 13 - Find and replace. Times are active milliseconds from the start of the step. */
export const STEP13_DURATION_MS = 30000;

export async function runStep13(tl: Timeline) {
  initEditor(tl, SAMPLE_EDITOR);
  tl.placeCursor(0.5, 0.45); // where step 12 left the cursor (middle of the page)
  tl.setUrl(URLS.editor);
  tl.setVar("intro", 1); // the editor fades in

  // Edit > Find and replace: the panel opens at the top right
  await tl.at(800);
  tl.showCaption(CAPTIONS.open);
  await clickEditMenu(tl, { ms: 600 });
  await chooseEditMenuItem(tl, "find", { ms: 400 });

  // Type the word: matches highlight live, the count updates
  await tl.at(3500);
  tl.showCaption(CAPTIONS.find);
  await typeInPanel(tl, "find", FIND_WORD, { msPerChar: 220 });

  // Next, twice: the green highlight moves from match to match
  await tl.at(7500);
  tl.showCaption(CAPTIONS.matches);
  await clickStep(tl, 1, { ms: 600 });
  await tl.wait(500);
  await clickStep(tl, 1, { ms: 300 });

  // Replace with
  await tl.at(11000);
  tl.showCaption(CAPTIONS.replaceWith);
  await typeInPanel(tl, "replace", REPLACE_WORD, { msPerChar: 220 });

  // Match case: the count drops
  await tl.at(14000);
  tl.showCaption(CAPTIONS.matchCase);
  await toggleMatchCase(tl);

  // Replace all: only the exact "Acme" changes; "acme" and "ACME" stay
  await tl.at(18000);
  tl.showCaption(CAPTIONS.replaceAll);
  await clickReplaceAll(tl);
  await tl.at(22500);
  tl.showCaption(CAPTIONS.done);

  // Close the panel
  await tl.at(24500);
  tl.showCaption(CAPTIONS.close);
  await clickClosePanel(tl);

  // Hold on the changed document, then the quick white fade
  await tl.at(29600);
  tl.hideCaption();
  tl.setVar("fade", true);
  await tl.at(STEP13_DURATION_MS);
}
