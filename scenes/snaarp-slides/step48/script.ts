import { SPELL_DECK } from "@/components/slides/slide-elements-data";
import { chooseRow, openMenu } from "@/components/slides/menu-timeline";
import { ring } from "@/components/slides/slides-timeline";
import { fixSpelling } from "@/components/slides/slides-tools";
import type { Timeline } from "@/lib/timeline";
import { beginEiv } from "../eiv";
import { CAPTIONS } from "./data";

/** Snaarp Slides, step 48 - Check your spelling. Starts on slide 2 with the title misspelt ("Our serivces"). */
export const STEP48_DURATION_MS = 30000;

export async function runStep48(tl: Timeline) {
  beginEiv(tl, [0.55, 0.55], SPELL_DECK);
  tl.setVar("spell", null);

  await tl.at(800);
  tl.showCaption(CAPTIONS.mistake);
  await ring(tl, "[data-tl=canvas-slide]", 2200);

  // Tools > Spelling
  await tl.at(4000);
  tl.showCaption(CAPTIONS.open);
  await openMenu(tl, "tools", { ms: 800 });
  await chooseRow(tl, "tools", "spelling", { ms: 600 });
  await tl.wait(500);
  tl.showCaption(CAPTIONS.marked);
  await ring(tl, "[data-tl=spell-word]", 2000);
  tl.showCaption(CAPTIONS.suggest);
  await tl.wait(1800);

  // Accept the suggestion
  await tl.at(12000);
  tl.showCaption(CAPTIONS.fix);
  await tl.moveCursorTo("[data-tl=spell-fix]", { ms: 900 });
  tl.hover("[data-tl=spell-fix]");
  tl.highlight("[data-tl=spell-fix]");
  await tl.wait(250);
  await tl.click("[data-tl=spell-fix]");
  tl.clearHighlight();
  tl.hover(null);
  fixSpelling(tl);
  await tl.wait(500);
  tl.showCaption(CAPTIONS.fixed);
  await ring(tl, "[data-tl=canvas-slide]", 2000);

  // Nothing left to fix
  await tl.at(20500);
  tl.showCaption(CAPTIONS.again);
  await openMenu(tl, "tools", { ms: 700 });
  await chooseRow(tl, "tools", "spelling", { ms: 500 });
  await tl.wait(700);
  tl.showCaption(CAPTIONS.clean);
  await tl.wait(2400);
  tl.showCaption(CAPTIONS.done);

  await tl.at(28500);
  tl.hideCaption();
  tl.setVar("fade", true);
  await tl.at(STEP48_DURATION_MS);
}
