import { DISTRIBUTE_DECK } from "@/components/slides/slide-elements-data";
import { chooseRow, closeMenu, hoverRow, openMenu } from "@/components/slides/menu-timeline";
import { pickAt, shiftSelect } from "@/components/slides/slides-format";
import { ring } from "@/components/slides/slides-timeline";
import type { Timeline } from "@/lib/timeline";
import { beginEiv } from "../eiv";
import { CAPTIONS } from "./data";

/** Snaarp Slides, step 46 - Distribute objects. Starts on slide 2 with a title and three unevenly spaced squares. */
export const STEP46_DURATION_MS = 36000;

// A spot on each square (cqw): the centre of each, nothing else covers them.
const A = { id: "dist-a", x: 12.5, y: 22.5 };
const B = { id: "dist-b", x: 28.5, y: 28.5 };
const C = { id: "dist-c", x: 74.5, y: 50.5 };

export async function runStep46(tl: Timeline) {
  beginEiv(tl, [0.55, 0.55], DISTRIBUTE_DECK);

  await tl.at(800);
  tl.showCaption(CAPTIONS.intro);
  await tl.wait(2200);

  // With only one square selected, Distribute is greyed out
  await tl.at(3600);
  tl.showCaption(CAPTIONS.select);
  await pickAt(tl, A.id, A, 900);
  await openMenu(tl, "arrange", { ms: 700 });
  tl.showCaption(CAPTIONS.greyed);
  await hoverRow(tl, "arrange", "disth", { ms: 450 });
  await tl.wait(1300);
  closeMenu(tl);

  // Shift-click the other two
  await tl.at(10200);
  tl.showCaption(CAPTIONS.select);
  await shiftSelect(tl, [A, B, C], 700);
  tl.showCaption(CAPTIONS.selected);
  await tl.wait(1200);

  // Distribute horizontally
  await tl.at(16000);
  tl.showCaption(CAPTIONS.open);
  await openMenu(tl, "arrange", { ms: 700 });
  await chooseRow(tl, "arrange", "disth", { ms: 500 });
  await tl.wait(500);
  tl.showCaption(CAPTIONS.horizontal);
  await tl.wait(2400);

  // Distribute vertically
  await tl.at(23500);
  tl.showCaption(CAPTIONS.openV);
  await openMenu(tl, "arrange", { ms: 700 });
  await chooseRow(tl, "arrange", "distv", { ms: 500 });
  await tl.wait(500);
  tl.showCaption(CAPTIONS.vertical);
  await ring(tl, "[data-tl=canvas-slide]", 2200);

  await tl.at(32500);
  tl.showCaption(CAPTIONS.done);
  await tl.at(34800);
  tl.hideCaption();
  tl.setVar("fade", true);
  await tl.at(STEP46_DURATION_MS);
}
