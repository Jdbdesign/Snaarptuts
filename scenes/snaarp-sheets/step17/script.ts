import type { Timeline } from "@/lib/timeline";
import { DETAILS } from "@/components/sheets/sheets-data";
import { chooseItem, hoverOn, openFileMenu, pressOn } from "@/components/sheets/sheets-timeline";
import { begin, finish } from "../shared";
import { CAPTIONS, URLS } from "./data";

/** Snaarp Sheets, step 17 - File > Details. Starts on "Acme Studio – Q3 Budget". */
export const STEP17_DURATION_MS = 17800;

export async function runStep17(tl: Timeline) {
  begin(tl, URLS.renamed);

  await tl.at(800);
  tl.showCaption(CAPTIONS.open);
  await openFileMenu(tl, { ms: 900 });
  await tl.wait(400);
  await chooseItem(tl, "details", { ms: 500 });
  tl.setVar("detailsOpen", true);

  await tl.wait(900);
  tl.showCaption(CAPTIONS.intro);
  await tl.wait(1400);
  tl.showCaption(CAPTIONS.rows);
  for (const row of ["type", "location", "owner", "modified"]) {
    await hoverOn(tl, `[data-tl=details-row-${row}]`, { ms: 500, dx: -40 });
    await tl.wait(650);
  }
  tl.hover(null);

  // Describe the file
  tl.showCaption(CAPTIONS.describe);
  await pressOn(tl, "[data-tl=details-description]", { ms: 700 });
  tl.setVar("focus", "details-desc");
  await tl.wait(500);
  tl.showCaption(CAPTIONS.type);
  await tl.typeText("details-desc", DETAILS.sample, { msPerChar: 50 });
  await tl.wait(900);
  tl.setVar("focus", "");

  tl.showCaption(CAPTIONS.close);
  await pressOn(tl, "[data-tl=details-close]", { ms: 800 });
  tl.setVar("detailsOpen", false);
  await finish(tl, 1200);
}
