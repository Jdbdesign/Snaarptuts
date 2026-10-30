import type { Timeline } from "@/lib/timeline";
import { beginTb, hoverTool } from "@/components/sheets/toolbar-timeline";
import { ring } from "@/components/sheets/sheets-timeline";
import { finish } from "../shared";
import { CAPTIONS, URL } from "./data";

/** Snaarp Sheets, step 85 - the toolbar, group by group. Starts on the sample budget with A1 selected. */
export const STEP85_DURATION_MS = 24000;

export async function runStep85(tl: Timeline) {
  beginTb(tl, "a1");
  tl.setUrl(URL);

  await tl.at(700);
  tl.showCaption(CAPTIONS.intro);
  await ring(tl, "[data-tl=sheet-toolbar]", 2400);
  for (const g of ["edit", "numbers", "style", "layout", "insert", "data"] as const) {
    tl.showCaption(CAPTIONS[g]);
    await ring(tl, `[data-tl=tool-group-${g}]`, 2600);
  }
  tl.showCaption(CAPTIONS.more);
  await hoverTool(tl, "more", { hold: 1600 });
  await finish(tl, 600);
}
