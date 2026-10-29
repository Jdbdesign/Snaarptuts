import type { Timeline } from "@/lib/timeline";
import { beginTb, hoverHeader, pressHeader } from "@/components/sheets/toolbar-timeline";
import { pressOn, ring } from "@/components/sheets/sheets-timeline";
import { finish } from "../shared";
import { CAPTIONS, URLS } from "./data";

/** Snaarp Sheets, step 112 - the clock icon opens the same Version history page as File > Version history (step 15). Starts with A1 selected. */
export const STEP112_DURATION_MS = 24000;

export async function runStep112(tl: Timeline) {
  beginTb(tl, "a1");
  tl.setVar("showChanges", false);

  await tl.at(600);
  tl.showCaption(CAPTIONS.hover);
  await hoverHeader(tl, "history", { hold: 1400 });
  tl.showCaption(CAPTIONS.open);
  await pressHeader(tl, "history", undefined, { ms: 300 });
  tl.setVar("screen", "versions");
  tl.setUrl(URLS.versions);
  await tl.wait(900);
  tl.showCaption(CAPTIONS.intro);
  await tl.wait(1800);
  tl.showCaption(CAPTIONS.earlier);
  await pressOn(tl, "[data-tl=version-v2]", { ms: 700 });
  tl.setVar("versionSel", "v2");
  await tl.wait(1400);
  tl.showCaption(CAPTIONS.changes);
  await pressOn(tl, "[data-tl=versions-show-changes]", { ms: 800 });
  tl.setVar("showChanges", true);
  await tl.wait(500);
  await ring(tl, "[data-tl=versions-sheet]", 1800);
  tl.showCaption(CAPTIONS.back);
  await pressOn(tl, "[data-tl=versions-back]", { ms: 800 });
  tl.setVar("screen", "editor");
  tl.setUrl(URLS.renamed);
  await finish(tl, 1000);
}
