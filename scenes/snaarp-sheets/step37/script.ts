import type { Timeline } from "@/lib/timeline";
import { finish } from "../shared";
import { CAPTIONS, URLS } from "./data";
import { beginInsert } from "@/components/sheets/insert-timeline";
import { closeMenus, openMenu } from "@/components/sheets/edit-timeline";
import { ring } from "@/components/sheets/sheets-timeline";

/** Snaarp Sheets, step 37 - Meet the Insert menu: open it and walk through its five groups. */
export const STEP37_DURATION_MS = 17000;

export async function runStep37(tl: Timeline) {
  beginInsert(tl, URLS.renamed);
  await tl.at(800);
  tl.showCaption(CAPTIONS.open);
  await openMenu(tl, "insert", { ms: 900 });
  await tl.wait(500);
  tl.showCaption(CAPTIONS.menu);
  await ring(tl, "[data-tl=menu-insert]", 2000);
  const groups = [CAPTIONS.g0, CAPTIONS.g1, CAPTIONS.g2, CAPTIONS.g3, CAPTIONS.g4];
  for (let g = 0; g < groups.length; g++) {
    tl.showCaption(groups[g]);
    await ring(tl, `[data-tl=menu-insert-group-${g}]`, 1900);
  }
  tl.showCaption(CAPTIONS.later);
  await ring(tl, "[data-tl=menu-item-ins-pivot]", 1500);
  closeMenus(tl);
  await finish(tl, 700);
}
