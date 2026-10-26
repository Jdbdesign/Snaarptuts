import { beginEiv } from "../eiv";
import { chooseRow, hoverRow, openMenu } from "@/components/slides/menu-timeline";
import { EIV_SHAPE_ID } from "@/components/slides/slide-elements-data";
import { pressOn, ring } from "@/components/slides/slides-timeline";
import type { Timeline } from "@/lib/timeline";
import { CAPTIONS } from "./data";

/** Snaarp Slides, step 23 - Duplicate and delete. Starts in the editor on slide 2 with nothing selected. */
export const STEP23_DURATION_MS = 25000;

export async function runStep23(tl: Timeline) {
  beginEiv(tl);

  await tl.at(800);
  tl.showCaption(CAPTIONS.select);
  await pressOn(tl, `[data-tl=el-${EIV_SHAPE_ID}]`, { ms: 900 });

  await tl.at(3200);
  tl.showCaption(CAPTIONS.open);
  await openMenu(tl, "edit", { ms: 800 });
  tl.showCaption(CAPTIONS.duplicate);
  await chooseRow(tl, "edit", "duplicate", { ms: 800 });
  await tl.wait(500);
  tl.showCaption(CAPTIONS.copy);
  await ring(tl, "[data-tl^=el-shapec]", 2200);

  await tl.at(11000);
  tl.showCaption(CAPTIONS.again);
  await openMenu(tl, "edit", { ms: 800 });
  tl.showCaption(CAPTIONS.hint);
  tl.highlight("[data-tl=edit-item-delete]");
  await hoverRow(tl, "edit", "delete", { ms: 600 });
  await tl.wait(1400);
  tl.clearHighlight();
  tl.showCaption(CAPTIONS.delete);
  await chooseRow(tl, "edit", "delete", { ms: 400 });
  await tl.wait(400);
  tl.showCaption(CAPTIONS.done);
  await ring(tl, `[data-tl=el-${EIV_SHAPE_ID}]`, 2500);

  await tl.at(23500);
  tl.hideCaption();
  tl.setVar("fade", true);
  await tl.at(STEP23_DURATION_MS);
}
