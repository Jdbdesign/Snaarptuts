import type { Timeline } from "@/lib/timeline";
import {
  beginOneCardX,
  finishOneCardX,
  hoverOn,
  pressOn,
  ring,
} from "@/components/onecardx/onecardx-timeline";
import { CAPTIONS, URLS } from "./data";

export const STEP36_DURATION_MS = 7200;

export async function runStep36(tl: Timeline) {
  beginOneCardX(tl, URLS.editor, "editor", [0.72, 0.45]);
  tl.setVar("ocxCardType", "business");
  tl.setVar("ocxActiveTab", "display");
  tl.setVar("ocxBusinessStyle", "split");
  tl.setVar("ocxAccentColor", "#0D9488");

  // 1. Click near-black/navy swatch
  await tl.at(600);
  tl.showCaption(CAPTIONS.chooseAccentColor);
  await hoverOn(tl, "[data-tl=swatch-dark]", { ms: 600 });
  await pressOn(tl, "[data-tl=swatch-dark]", { ms: 300 });
  tl.setVar("ocxAccentColor", "#1F2937");

  // 2. Inspect colors
  await tl.at(2600);
  tl.showCaption(CAPTIONS.inspectColors);
  await hoverOn(tl, "[data-tl=accent-colors-row]", { ms: 600 });
  await ring(tl, "[data-tl=accent-colors-row]", 1400);

  // 3. Highlight updated landscape preview
  await tl.at(4600);
  tl.showCaption(CAPTIONS.previewUpdated);
  await hoverOn(tl, "[data-tl=card-live-preview]", { ms: 600 });
  await ring(tl, "[data-tl=card-live-preview]", 1500);

  // 4. Conclude
  await finishOneCardX(tl, STEP36_DURATION_MS);
}
