import type { Timeline } from "@/lib/timeline";
import { beginEdit, closeMenus, hoverRow, openMenu } from "@/components/sheets/edit-timeline";
import { finish } from "../shared";
import { CAPTIONS, URLS } from "./data";

/** Snaarp Sheets, step 29 - Meet the View menu. Starts on the sample budget with A1 selected. */
export const STEP29_DURATION_MS = 17500;

export async function runStep29(tl: Timeline) {
  beginEdit(tl, URLS.renamed);

  await tl.at(800);
  tl.showCaption(CAPTIONS.open);
  await openMenu(tl, "view", { ms: 900 });

  await tl.at(3400);
  tl.showCaption(CAPTIONS.menu);
  tl.highlight("[data-tl=menu-view]");
  await tl.wait(2200);
  tl.clearHighlight();

  // One beat per group of the menu: a ring around the group and a short caption.
  const beats: [number, string, string, string?][] = [
    [0, "show", CAPTIONS.show, "show"],
    [1, "hidden", CAPTIONS.hidden],
    [2, "zoom", CAPTIONS.zoom, "zoom"],
  ];
  for (const [group, item, text, sub] of beats) {
    tl.showCaption(text);
    await hoverRow(tl, item, { ms: 600, sub });
    tl.highlight(`[data-tl=menu-view-group-${group}]`);
    await tl.wait(1900);
    tl.clearHighlight();
  }

  closeMenus(tl);
  tl.showCaption(CAPTIONS.done);
  await finish(tl, 1800);
}
