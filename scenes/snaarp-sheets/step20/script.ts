import type { Timeline } from "@/lib/timeline";
import { beginEdit, closeMenus, hoverRow, openMenu } from "@/components/sheets/edit-timeline";
import { finish } from "../shared";
import { CAPTIONS, URLS } from "./data";

/** Snaarp Sheets, step 20 - Meet the Edit menu. Starts on the sample budget with A1 selected. */
export const STEP20_DURATION_MS = 19800;

export async function runStep20(tl: Timeline) {
  beginEdit(tl, URLS.renamed);

  await tl.at(800);
  tl.showCaption(CAPTIONS.open);
  await openMenu(tl, "edit", { ms: 900 });

  await tl.at(3400);
  tl.showCaption(CAPTIONS.menu);
  tl.highlight("[data-tl=menu-edit]");
  await tl.wait(2200);
  tl.clearHighlight();

  // One beat per group of the menu: a ring around the group and a short caption.
  const beats: [number, string, string][] = [
    [0, "undo", CAPTIONS.history],
    [1, "cut", CAPTIONS.clipboard],
    [2, "delete", CAPTIONS.remove],
    [3, "find", CAPTIONS.find],
  ];
  for (const [group, item, text] of beats) {
    tl.showCaption(text);
    await hoverRow(tl, item, { ms: 600 });
    tl.highlight(`[data-tl=menu-edit-group-${group}]`);
    await tl.wait(1700);
    tl.clearHighlight();
  }

  closeMenus(tl);
  tl.showCaption(CAPTIONS.done);
  await finish(tl, 1800);
}
