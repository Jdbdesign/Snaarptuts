import type { Timeline } from "@/lib/timeline";
import { closeFileMenu, hoverItem, hoverSub, openFileMenu, pressOn, ring } from "@/components/sheets/sheets-timeline";
import { begin, finish } from "../shared";
import { CAPTIONS, URLS, VERSION_NAME } from "./data";

/** Snaarp Sheets, step 15 - File > Version history > See version history. Starts on "Acme Studio – Q3 Budget" (current version named "Final budget"). */
export const STEP15_DURATION_MS = 18900;

export async function runStep15(tl: Timeline) {
  begin(tl, URLS.renamed);
  tl.setVar("field:version-name", VERSION_NAME);
  tl.setVar("showChanges", false);

  await tl.at(800);
  tl.showCaption(CAPTIONS.open);
  await openFileMenu(tl, { ms: 900 });
  await tl.wait(400);
  await hoverItem(tl, "history", { ms: 650 });
  await tl.wait(500);
  tl.showCaption(CAPTIONS.click);
  await hoverSub(tl, "see", { ms: 450 });
  tl.highlight("[data-tl=file-sub-see]");
  await tl.wait(400);
  await tl.click("[data-tl=file-sub-see]");
  tl.clearHighlight();
  closeFileMenu(tl);

  // The version page
  await tl.wait(300);
  tl.setVar("screen", "versions");
  tl.setUrl(URLS.versions);
  await tl.wait(800);
  tl.showCaption(CAPTIONS.intro);
  await tl.wait(1800);
  tl.showCaption(CAPTIONS.current);
  await ring(tl, "[data-tl=version-v1]", 1800);

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
  await finish(tl, 1400);
}
