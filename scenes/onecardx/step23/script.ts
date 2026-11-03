import type { Timeline } from "@/lib/timeline";
import {
  beginOneCardX,
  finishOneCardX,
  hoverOn,
  ring,
} from "@/components/onecardx/onecardx-timeline";
import { CAPTIONS, URLS } from "./data";

export const STEP23_DURATION_MS = 7500;

export async function runStep23(tl: Timeline) {
  beginOneCardX(tl, URLS.editor, "editor", [0.45, 0.45]);
  tl.setVar("ocxActiveTab", "card");
  tl.setVar("ocxDesign", "classic");
  tl.setVar("ocxCardType", "id-card");
  tl.setVar("ocxPhotoAdded", true);
  tl.setVar("ocxLogoAdded", true);
  tl.setVar("ocxBadgeAdded", true);
  tl.setVar("ocxAccentColor", "#2563EB");

  // 1. Click Display tab
  await tl.at(600);
  tl.showCaption(CAPTIONS.clickDisplayTab, { target: "[data-tl=tab-display]" });
  await tl.wait(100);
  await tl.moveCursorTo("[data-tl=tab-display]", { ms: 600 });
  await tl.click("[data-tl=tab-display]");
  tl.setVar("ocxActiveTab", "display");
  await tl.wait(200);

  // 2. Hover and click Modern style
  await tl.at(2800);
  tl.showCaption(CAPTIONS.pickModern, { target: "[data-tl=design-modern]" });
  await tl.wait(100);
  await tl.moveCursorTo("[data-tl=design-modern]", { ms: 600 });
  await tl.click("[data-tl=design-modern]");
  tl.setVar("ocxDesign", "modern");
  await ring(tl, "[data-tl=design-modern]", 1200);

  // 3. Highlight preview update
  await tl.at(5200);
  tl.showCaption(CAPTIONS.previewUpdates, { target: "[data-tl=card-live-preview]" });
  await hoverOn(tl, "[data-tl=card-live-preview]", { ms: 600 });
  await ring(tl, "[data-tl=card-live-preview]", 1500);

  // 4. Finish
  await finishOneCardX(tl, STEP23_DURATION_MS);
}
