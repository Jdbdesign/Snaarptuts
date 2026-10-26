import { beginEiv } from "../eiv";
import { chooseSubRow, hoverRow, hoverSubRow, openMenu } from "@/components/slides/menu-timeline";
import { ring } from "@/components/slides/slides-timeline";
import type { Timeline } from "@/lib/timeline";
import { CAPTIONS } from "./data";

/** Snaarp Slides, step 32 - Insert shapes. Starts in the editor on slide 2. */
export const STEP32_DURATION_MS = 34000;

const SHAPES = ["rect", "ellipse", "triangle", "diamond", "star", "arrow"] as const;

export async function runStep32(tl: Timeline) {
  beginEiv(tl);

  await tl.at(800);
  tl.showCaption(CAPTIONS.open);
  await openMenu(tl, "insert", { ms: 800 });
  await hoverRow(tl, "insert", "shape", { ms: 600 });
  await tl.wait(500);
  tl.showCaption(CAPTIONS.six);
  await tl.wait(1000);

  // Hover all six
  for (const id of SHAPES) {
    tl.showCaption(CAPTIONS[id]);
    await hoverSubRow(tl, "insert", id, { ms: id === "rect" ? 450 : 300 });
    await tl.wait(650);
  }

  // Ellipse
  await tl.at(11500);
  tl.showCaption(CAPTIONS.pickEllipse);
  await chooseSubRow(tl, "insert", "shape", "ellipse", { ms: 500 });
  await tl.wait(500);
  tl.showCaption(CAPTIONS.added);
  await ring(tl, "[data-tl^=el-shape-]", 2000);

  // Star
  await tl.at(18500);
  tl.showCaption(CAPTIONS.again);
  await openMenu(tl, "insert", { ms: 800 });
  await chooseSubRow(tl, "insert", "shape", "star", { ms: 500 });
  await tl.wait(500);
  tl.showCaption(CAPTIONS.done);
  await tl.wait(2800);

  await tl.at(32500);
  tl.hideCaption();
  tl.setVar("fade", true);
  await tl.at(STEP32_DURATION_MS);
}
