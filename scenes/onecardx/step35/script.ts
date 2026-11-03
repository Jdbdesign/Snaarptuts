import type { Timeline } from "@/lib/timeline";
import {
  beginOneCardX,
  finishOneCardX,
  hoverOn,
  pressOn,
  ring,
} from "@/components/onecardx/onecardx-timeline";
import { CAPTIONS, URLS } from "./data";

export const STEP35_DURATION_MS = 7500;

export async function runStep35(tl: Timeline) {
  beginOneCardX(tl, URLS.editor, "editor", [0.48, 0.22]);
  tl.setVar("ocxCardType", "business");
  tl.setVar("ocxActiveTab", "card");
  tl.setVar("ocxBusinessStyle", "profile");
  tl.setVar("ocxAccentColor", "#0D9488");

  // 1. Click 'Display' tab
  await tl.at(600);
  tl.showCaption(CAPTIONS.clickDisplayTab);
  await pressOn(tl, "[data-tl=tab-display]", { ms: 600 });
  tl.setVar("ocxActiveTab", "display");

  // 2. Click 'Split' in Business Card Style grid
  await tl.at(2600);
  tl.showCaption(CAPTIONS.chooseSplitStyle);
  await hoverOn(tl, "[data-tl=business-style-split]", { ms: 600 });
  await pressOn(tl, "[data-tl=business-style-split]", { ms: 300 });
  tl.setVar("ocxBusinessStyle", "split");

  // 3. Highlight landscape card preview
  await tl.at(4200);
  tl.showCaption(CAPTIONS.previewLandscape);
  await hoverOn(tl, "[data-tl=card-live-preview]", { ms: 600 });
  await ring(tl, "[data-tl=card-live-preview]", 1800);

  // 4. Conclude
  await finishOneCardX(tl, STEP35_DURATION_MS);
}
