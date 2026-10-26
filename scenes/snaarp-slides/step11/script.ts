import { DECK } from "@/components/slides/slides-data";
import { chooseItem, openFileMenu } from "@/components/slides/slides-timeline";
import type { Timeline } from "@/lib/timeline";
import { begin } from "../shared";
import { CAPTIONS, URLS } from "./data";

/** Snaarp Slides, step 11 - Rename your presentation (File > Rename). Starts in the editor with "Acme Studio Pitch". */
export const STEP11_DURATION_MS = 20000;

export async function runStep11(tl: Timeline) {
  begin(tl, URLS.editor, [0.5, 0.5]);

  // File > Rename
  await tl.at(800);
  tl.showCaption(CAPTIONS.open);
  await openFileMenu(tl, { ms: 800 });
  await chooseItem(tl, "rename", { ms: 600 });

  // The title becomes a field with its text selected
  tl.setVar("titleEdit", "selected");
  await tl.wait(100);
  tl.showCaption(CAPTIONS.editable);
  tl.highlight("[data-tl=deck-title-field]");

  // Type the new name
  await tl.at(5200);
  tl.clearHighlight();
  tl.showCaption(CAPTIONS.type);
  tl.setVar("field:title", "");
  tl.setVar("titleEdit", "typing");
  await tl.typeText("title", DECK.renamed, { msPerChar: 70 });

  // Enter
  await tl.at(9800);
  tl.showCaption(CAPTIONS.enter);
  await tl.wait(1100);
  tl.setVar("title", DECK.renamed);
  tl.setVar("titleEdit", "");
  tl.setUrl(URLS.renamed);

  await tl.at(12600);
  tl.showCaption(CAPTIONS.done);
  await tl.wait(100);
  tl.highlight("[data-tl=deck-title]");

  // Quick white fade
  await tl.at(18600);
  tl.clearHighlight();
  tl.hideCaption();
  tl.setVar("fade", true);
  await tl.at(STEP11_DURATION_MS);
}
