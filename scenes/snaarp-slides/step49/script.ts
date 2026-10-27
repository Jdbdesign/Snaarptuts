import { chooseRow, openMenu } from "@/components/slides/menu-timeline";
import { ring, typeInto } from "@/components/slides/slides-timeline";
import { EXPLORE } from "@/components/slides/slides-tools-data";
import type { Timeline } from "@/lib/timeline";
import { beginEiv } from "../eiv";
import { CAPTIONS } from "./data";

/** Snaarp Slides, step 49 - Explore ideas. Starts in the editor on slide 2. */
export const STEP49_DURATION_MS = 42000;

/** Move to a suggestion, ring it, click it (the click puts it on the slide). */
async function pick(tl: Timeline, sel: string, ms = 800) {
  await tl.moveCursorTo(sel, { ms });
  tl.hover(sel);
  tl.highlight(sel);
  await tl.wait(250);
  await tl.click(sel);
  tl.clearHighlight();
  tl.hover(null);
}

export async function runStep49(tl: Timeline) {
  beginEiv(tl);
  tl.setVar("explore", false);

  // Tools > Explore
  await tl.at(800);
  tl.showCaption(CAPTIONS.open);
  await openMenu(tl, "tools", { ms: 800 });
  await chooseRow(tl, "tools", "explore", { ms: 600 });
  await tl.wait(600);
  tl.showCaption(CAPTIONS.panel);
  await ring(tl, "[data-tl=explore-heading]", 1800);

  // Search
  await tl.at(7000);
  tl.showCaption(CAPTIONS.type);
  await typeInto(tl, "explore", EXPLORE.query, { moveMs: 800, msPerChar: 70 });
  await tl.wait(500);
  tl.setVar("exploreDone", true);
  tl.setVar("focus", "");
  await tl.wait(300);
  tl.showCaption(CAPTIONS.results);
  await ring(tl, "[data-tl=explore-results]", 2200);

  // An image
  await tl.at(15500);
  tl.showCaption(CAPTIONS.image);
  await pick(tl, "[data-tl=explore-image-desk]");
  await tl.wait(500);
  tl.showCaption(CAPTIONS.imageDone);
  await tl.wait(2200);

  // A related topic
  await tl.at(23500);
  tl.showCaption(CAPTIONS.topic);
  await pick(tl, "[data-tl=explore-topic-logo]", 800);
  await tl.wait(500);
  tl.showCaption(CAPTIONS.topicDone);
  await tl.wait(2200);

  // A layout idea
  await tl.at(31500);
  tl.showCaption(CAPTIONS.layout);
  await pick(tl, "[data-tl=explore-layout-number]", 800);
  await tl.wait(500);
  tl.showCaption(CAPTIONS.layoutDone);
  await tl.wait(2200);

  await tl.at(39500);
  tl.showCaption(CAPTIONS.done);
  await tl.at(40800);
  tl.hideCaption();
  tl.setVar("fade", true);
  await tl.at(STEP49_DURATION_MS);
}
