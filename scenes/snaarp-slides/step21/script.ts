import { beginEiv, clickBlank } from "../eiv";
import { chooseRow, hoverRow, openMenu } from "@/components/slides/menu-timeline";
import type { Timeline } from "@/lib/timeline";
import { CAPTIONS } from "./data";

/** Snaarp Slides, step 21 - Select all. Starts in the editor on slide 2 with nothing selected. */
export const STEP21_DURATION_MS = 17000;

export async function runStep21(tl: Timeline) {
  beginEiv(tl);

  await tl.at(800);
  tl.showCaption(CAPTIONS.open);
  await openMenu(tl, "edit", { ms: 800 });

  await tl.at(3000);
  tl.showCaption(CAPTIONS.select);
  await hoverRow(tl, "edit", "selectall", { ms: 700 });
  tl.showCaption(CAPTIONS.hint);
  await tl.wait(1100);
  tl.showCaption(CAPTIONS.select);
  await chooseRow(tl, "edit", "selectall", { ms: 300 });

  await tl.at(7000);
  tl.showCaption(CAPTIONS.all);
  await tl.wait(3200);

  await tl.at(11500);
  tl.showCaption(CAPTIONS.clear);
  await clickBlank(tl);
  await tl.wait(1200);

  await tl.at(15500);
  tl.hideCaption();
  tl.setVar("fade", true);
  await tl.at(STEP21_DURATION_MS);
}
