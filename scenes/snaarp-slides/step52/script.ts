import { LAYOUT_DECK, LAYOUT_SELECTED } from "@/components/slides/slide-elements-data";
import { LAYOUT_LIST } from "@/components/slides/slides-toolbar-data";
import { ring } from "@/components/slides/slides-timeline";
import { chooseOption, hoverOption, openToolbar } from "@/components/slides/toolbar-timeline";
import type { Timeline } from "@/lib/timeline";
import { beginEiv } from "../eiv";
import { CAPTIONS } from "./data";

/** Snaarp Slides, step 52 - Pick a layout. Starts on a new, empty slide 4 (a title slide's placeholders). */
export const STEP52_DURATION_MS = 34000;

export async function runStep52(tl: Timeline) {
  beginEiv(tl, [0.55, 0.55], LAYOUT_DECK);
  tl.setVar("selected", LAYOUT_SELECTED);

  await tl.at(800);
  tl.showCaption(CAPTIONS.intro);
  await ring(tl, "[data-tl=canvas-slide]", 1800);

  // The Layout list
  await tl.at(3200);
  tl.showCaption(CAPTIONS.open);
  await openToolbar(tl, "layout", { ms: 800 });
  tl.showCaption(CAPTIONS.rows);
  for (const l of LAYOUT_LIST) await hoverOption(tl, "layout", l.id, { ms: 300 });
  await tl.wait(300);

  // Title and content
  tl.showCaption(CAPTIONS.first);
  await chooseOption(tl, "layout", "title-content", { ms: 500 });
  await tl.wait(500);
  tl.showCaption(CAPTIONS.firstDone);
  await tl.wait(2600);

  // Two content
  await tl.at(15500);
  tl.showCaption(CAPTIONS.second);
  await openToolbar(tl, "layout", { ms: 700 });
  await chooseOption(tl, "layout", "two-content", { ms: 500 });
  await tl.wait(500);
  tl.showCaption(CAPTIONS.secondDone);
  await tl.wait(2600);

  // Section header
  await tl.at(24000);
  tl.showCaption(CAPTIONS.third);
  await openToolbar(tl, "layout", { ms: 700 });
  await chooseOption(tl, "layout", "section", { ms: 500 });
  await tl.wait(500);
  tl.showCaption(CAPTIONS.thirdDone);
  await tl.wait(2400);

  await tl.at(31500);
  tl.showCaption(CAPTIONS.done);
  await tl.at(32800);
  tl.hideCaption();
  tl.setVar("fade", true);
  await tl.at(STEP52_DURATION_MS);
}
