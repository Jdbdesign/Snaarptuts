import { beginEiv } from "../eiv";
import { chooseSubRow, hoverRow, hoverSubRow, openMenu } from "@/components/slides/menu-timeline";
import { pressOn, ring } from "@/components/slides/slides-timeline";
import type { Timeline } from "@/lib/timeline";
import { CAPTIONS } from "./data";

/** Snaarp Slides, step 35 - Insert a chart. Starts in the editor on slide 2. */
export const STEP35_DURATION_MS = 30500;

export async function runStep35(tl: Timeline) {
  beginEiv(tl);

  await tl.at(800);
  tl.showCaption(CAPTIONS.open);
  await openMenu(tl, "insert", { ms: 800 });
  await hoverRow(tl, "insert", "chart", { ms: 600 });
  await tl.wait(500);
  tl.showCaption(CAPTIONS.three);
  await tl.wait(900);
  for (const id of ["bar", "line", "pie"] as const) {
    tl.showCaption(CAPTIONS[id]);
    await hoverSubRow(tl, "insert", id, { ms: id === "bar" ? 450 : 300 });
    await tl.wait(700);
  }

  // Insert the bar chart
  await tl.at(8500);
  tl.showCaption(CAPTIONS.pickBar);
  await chooseSubRow(tl, "insert", "chart", "bar", { ms: 500 });
  await tl.wait(500);
  tl.showCaption(CAPTIONS.landed);
  await tl.wait(2200);
  tl.showCaption(CAPTIONS.panel);
  await ring(tl, "[data-tl=chart-panel]", 2200);

  // Switch the type
  await tl.at(16500);
  tl.showCaption(CAPTIONS.switchLine);
  await pressOn(tl, "[data-tl=chart-type-line]", { ms: 900 });
  await tl.wait(2600);
  tl.showCaption(CAPTIONS.switchPie);
  await pressOn(tl, "[data-tl=chart-type-pie]", { ms: 700 });
  await tl.wait(2600);
  tl.showCaption(CAPTIONS.back);
  await pressOn(tl, "[data-tl=chart-type-bar]", { ms: 700 });
  await tl.wait(1200);
  tl.showCaption(CAPTIONS.done);
  await tl.wait(1500);

  await tl.at(29000);
  tl.hideCaption();
  tl.setVar("fade", true);
  await tl.at(STEP35_DURATION_MS);
}
