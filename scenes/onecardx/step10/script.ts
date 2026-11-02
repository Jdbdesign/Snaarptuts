import type { Timeline } from "@/lib/timeline";
import {
  beginOneCardX,
  finishOneCardX,
  hoverOn,
  pressOn,
  ring,
} from "@/components/onecardx/onecardx-timeline";
import { CAPTIONS, URLS } from "./data";

export const STEP10_DURATION_MS = 11500;

export async function runStep10(tl: Timeline) {
  beginOneCardX(tl, URLS.editor, "editor", [0.25, 0.55]);
  tl.setVar("ocxActiveTab", "display");
  tl.setVar("ocxDesign", "classic");
  tl.setVar("ocxPhotoAdded", true);
  tl.setVar("ocxAccentColor", "#7014D9");

  // 1. Accent colors row
  await tl.at(600);
  tl.showCaption(CAPTIONS.colorsInspect);
  await hoverOn(tl, "[data-tl=accent-colors-row]", { ms: 600 });
  await ring(tl, "[data-tl=accent-colors-row]", 1800);

  // 2. Click Blue Swatch
  await tl.at(3400);
  tl.showCaption(CAPTIONS.clickBlueSwatch);
  await pressOn(tl, "[data-tl=swatch-blue]", { ms: 550 });
  await tl.wait(250);

  // 3. Inspect live preview color change
  await tl.at(5800);
  tl.showCaption(CAPTIONS.previewColorChange);
  await hoverOn(tl, "[data-tl=card-live-preview]", { ms: 600 });
  await ring(tl, "[data-tl=card-live-preview]", 2000);

  // 4. Font dropdown
  await tl.at(8800);
  tl.showCaption(CAPTIONS.fontDropdown);
  await hoverOn(tl, "[data-tl=select-font]", { ms: 550 });
  await ring(tl, "[data-tl=select-font]", 1800);

  // 5. Conclude
  await finishOneCardX(tl, STEP10_DURATION_MS);
}
