import type { Timeline } from "@/lib/timeline";
import {
  beginOneCardX,
  finishOneCardX,
  hoverOn,
  ring,
} from "@/components/onecardx/onecardx-timeline";
import { CAPTIONS, URLS } from "./data";

export const STEP24_DURATION_MS = 7500;

export async function runStep24(tl: Timeline) {
  beginOneCardX(tl, URLS.editor, "editor", [0.45, 0.45]);
  tl.setVar("ocxActiveTab", "display");
  tl.setVar("ocxDesign", "modern");
  tl.setVar("ocxCardType", "id-card");
  tl.setVar("ocxPhotoAdded", true);
  tl.setVar("ocxLogoAdded", true);
  tl.setVar("ocxBadgeAdded", true);
  tl.setVar("ocxAccentColor", "#2563EB");

  // 1. Hover and click Teal Accent Color
  await tl.at(600);
  tl.showCaption(CAPTIONS.pickTealAccent, { target: "[data-tl=swatch-teal]" });
  await tl.wait(100);
  await tl.moveCursorTo("[data-tl=swatch-teal]", { ms: 600 });
  await tl.click("[data-tl=swatch-teal]");
  tl.setVar("ocxAccentColor", "#0D9488");
  await ring(tl, "[data-tl=swatch-teal]", 1200);

  // 2. Highlight card live preview turning teal
  await tl.at(3000);
  tl.showCaption(CAPTIONS.previewAccent, { target: "[data-tl=card-live-preview]" });
  await hoverOn(tl, "[data-tl=card-live-preview]", { ms: 600 });
  await ring(tl, "[data-tl=card-live-preview]", 1500);

  // 3. Inspect logo & badge options
  await tl.at(5200);
  tl.showCaption(CAPTIONS.reviewDisplayOptions, { target: "[data-tl=btn-add-logo]" });
  await hoverOn(tl, "[data-tl=btn-add-logo]", { ms: 600 });
  await ring(tl, "[data-tl=btn-add-logo]", 1500);

  // 4. Finish
  await finishOneCardX(tl, STEP24_DURATION_MS);
}
