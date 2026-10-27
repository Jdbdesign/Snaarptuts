import { STACK_DECK, STACK_SPOTS } from "@/components/slides/slide-elements-data";
import { chooseRow, hoverRow, openMenu } from "@/components/slides/menu-timeline";
import { pickAt } from "@/components/slides/slides-format";
import { ring } from "@/components/slides/slides-timeline";
import type { Timeline } from "@/lib/timeline";
import { beginEiv } from "../eiv";
import { CAPTIONS } from "./data";

/** Snaarp Slides, step 44 - Change the stacking order. Starts on slide 2 with three overlapping squares. */
export const STEP44_DURATION_MS = 42000;

export async function runStep44(tl: Timeline) {
  beginEiv(tl, [0.55, 0.55], STACK_DECK);

  await tl.at(800);
  tl.showCaption(CAPTIONS.intro);
  await tl.wait(2600);

  // Orange: Bring to front
  await tl.at(4000);
  tl.showCaption(CAPTIONS.select);
  await pickAt(tl, "stack-a", STACK_SPOTS["stack-a"], 900);
  tl.showCaption(CAPTIONS.open);
  await openMenu(tl, "arrange", { ms: 750 });
  for (const id of ["front", "forward", "backward", "back"]) await hoverRow(tl, "arrange", id, { ms: 320 });
  await chooseRow(tl, "arrange", "front", { ms: 450 });
  await tl.wait(500);
  tl.showCaption(CAPTIONS.front);
  await tl.wait(1800);

  // Orange: Send backward
  await tl.at(15000);
  tl.showCaption(CAPTIONS.backward);
  await openMenu(tl, "arrange", { ms: 750 });
  await chooseRow(tl, "arrange", "backward", { ms: 500 });
  await tl.wait(500);
  tl.showCaption(CAPTIONS.middle);
  await tl.wait(1800);

  // Green: Bring forward
  await tl.at(23500);
  tl.showCaption(CAPTIONS.forward);
  await pickAt(tl, "stack-b", STACK_SPOTS["stack-b"], 850);
  await openMenu(tl, "arrange", { ms: 700 });
  await chooseRow(tl, "arrange", "forward", { ms: 500 });
  await tl.wait(500);
  tl.showCaption(CAPTIONS.forwardDone);
  await tl.wait(1500);

  // Purple: Send to back
  await tl.at(31500);
  tl.showCaption(CAPTIONS.back);
  await pickAt(tl, "stack-c", STACK_SPOTS["stack-c"], 850);
  await openMenu(tl, "arrange", { ms: 700 });
  await chooseRow(tl, "arrange", "back", { ms: 500 });
  await tl.wait(500);
  tl.showCaption(CAPTIONS.backDone);
  await ring(tl, "[data-tl=canvas-slide]", 1800);

  await tl.at(39500);
  tl.showCaption(CAPTIONS.done);
  await tl.at(40800);
  tl.hideCaption();
  tl.setVar("fade", true);
  await tl.at(STEP44_DURATION_MS);
}
