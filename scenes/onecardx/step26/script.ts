import type { Timeline } from "@/lib/timeline";
import {
  beginOneCardX,
  finishOneCardX,
  hoverOn,
  ring,
} from "@/components/onecardx/onecardx-timeline";
import { CAPTIONS, URLS } from "./data";

export const STEP26_DURATION_MS = 8000;

export async function runStep26(tl: Timeline) {
  beginOneCardX(tl, URLS.editor, "editor", [0.45, 0.45]);
  tl.setVar("ocxActiveTab", "information");
  tl.setVar("ocxDesign", "modern");
  tl.setVar("ocxCardType", "id-card");
  tl.setVar("ocxPhotoAdded", true);
  tl.setVar("ocxLogoAdded", true);
  tl.setVar("ocxBadgeAdded", true);
  tl.setVar("ocxAccentColor", "#0D9488");
  tl.setVar("ocxUseOwnNameChecked", false);

  tl.setVar("field:prefix", "Mr");
  tl.setVar("field:first-name", "Alex");
  tl.setVar("field:last-name", "Morgan");
  tl.setVar("field:title", "Product Designer");
  tl.setVar("field:company", "Acme Ltd");

  // 1. Tick 'Use each person's own name'
  await tl.at(600);
  tl.showCaption(CAPTIONS.tickOwnName, { target: "[data-tl=checkbox-own-name]" });
  await tl.wait(100);
  await tl.moveCursorTo("[data-tl=checkbox-own-name]", { ms: 600 });
  await tl.click("[data-tl=checkbox-own-name]");
  tl.setVar("ocxUseOwnNameChecked", true);
  await tl.wait(200);

  // 2. Highlight explanation
  await tl.at(3000);
  tl.showCaption(CAPTIONS.explainOwnName, { target: "[data-tl=own-name-banner]" });
  await hoverOn(tl, "[data-tl=own-name-banner]", { ms: 500 });
  await ring(tl, "[data-tl=own-name-banner]", 1600);

  // 3. Untick checkbox
  await tl.at(5400);
  tl.showCaption(CAPTIONS.untickOwnName, { target: "[data-tl=checkbox-own-name]" });
  await tl.wait(100);
  await tl.moveCursorTo("[data-tl=checkbox-own-name]", { ms: 500 });
  await tl.click("[data-tl=checkbox-own-name]");
  tl.setVar("ocxUseOwnNameChecked", false);
  await tl.wait(200);

  // 4. Finish
  await finishOneCardX(tl, STEP26_DURATION_MS);
}
