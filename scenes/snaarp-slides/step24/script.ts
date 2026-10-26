import { beginEiv } from "../eiv";
import { chooseRow, openMenu } from "@/components/slides/menu-timeline";
import { FIND_SLIDES } from "@/components/slides/slide-elements-data";
import { closeFind, replaceEverything, stepFind } from "@/components/slides/slides-edit";
import { pressOn } from "@/components/slides/slides-timeline";
import type { Timeline } from "@/lib/timeline";
import { CAPTIONS } from "./data";

/** Snaarp Slides, step 24 - Find and replace. Starts in the editor on slide 2. */
export const STEP24_DURATION_MS = 38000;

/** Click into a box of the Find panel and type: the box gets the caret (scene variable `focus`). */
async function typeIn(tl: Timeline, box: "find" | "replace", text: string) {
  const sel = `[data-tl=${box}-input]`;
  await tl.moveCursorTo(sel, { ms: 650 });
  await tl.click(sel);
  tl.setVar("focus", box);
  await tl.typeText(box, text, { msPerChar: 75 });
}

export async function runStep24(tl: Timeline) {
  beginEiv(tl);

  await tl.at(800);
  tl.showCaption(CAPTIONS.open);
  await openMenu(tl, "edit", { ms: 800 });
  await chooseRow(tl, "edit", "find", { ms: 700 });
  await tl.wait(500);

  // Find
  await tl.at(5000);
  tl.showCaption(CAPTIONS.find);
  await typeIn(tl, "find", FIND_SLIDES.query);
  await tl.wait(500);
  tl.showCaption(CAPTIONS.matches);
  tl.highlight("[data-tl=find-result]");
  await tl.wait(2400);
  tl.clearHighlight();

  // Next and Previous
  await tl.at(12000);
  tl.showCaption(CAPTIONS.next);
  await pressOn(tl, "[data-tl=find-btn-next]", { ms: 800 });
  stepFind(tl, 1);
  await tl.wait(2000);
  tl.showCaption(CAPTIONS.previous);
  await pressOn(tl, "[data-tl=find-btn-previous]", { ms: 700 });
  stepFind(tl, -1);
  await tl.wait(1200);

  // Replace
  await tl.at(19500);
  tl.showCaption(CAPTIONS.replace);
  await typeIn(tl, "replace", FIND_SLIDES.replacement);
  await tl.wait(600);
  tl.showCaption(CAPTIONS.all);
  await pressOn(tl, "[data-tl=find-btn-replace-all]", { ms: 800 });
  tl.setVar("focus", "");
  replaceEverything(tl);
  await tl.wait(500);

  await tl.at(27500);
  tl.showCaption(CAPTIONS.done);
  await tl.wait(2800);
  tl.showCaption(CAPTIONS.close);
  await pressOn(tl, "[data-tl=find-close]", { ms: 800 });
  closeFind(tl);

  await tl.at(36500);
  tl.hideCaption();
  tl.setVar("fade", true);
  await tl.at(STEP24_DURATION_MS);
}

