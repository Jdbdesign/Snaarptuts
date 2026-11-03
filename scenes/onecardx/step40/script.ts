import type { Timeline } from "@/lib/timeline";
import {
  beginOneCardX,
  finishOneCardX,
  hoverOn,
  pressOn,
  ring,
} from "@/components/onecardx/onecardx-timeline";
import { CAPTIONS, URLS } from "./data";

export const STEP40_DURATION_MS = 8500;

export async function runStep40(tl: Timeline) {
  beginOneCardX(tl, URLS.backgrounds, "backgrounds", [0.75, 0.45]);
  tl.setVar("ocxBgLayout", "bottom-left");
  tl.setVar("ocxSelectedBg", "sunset-lake");
  tl.setVar("ocxShowName", true);
  tl.setVar("ocxShowTitle", true);
  tl.setVar("ocxShowCompany", true);
  tl.setVar("ocxShowQr", true);

  // 1. Click 'Beach Waves' background thumbnail
  await tl.at(600);
  tl.showCaption(CAPTIONS.pickBackground);
  await hoverOn(tl, "[data-tl=thumb-bg-beach-waves]", { ms: 600 });
  await pressOn(tl, "[data-tl=thumb-bg-beach-waves]", { ms: 300 });
  tl.setVar("ocxSelectedBg", "beach-waves");

  // 2. Click 'Bottom Right' layout
  await tl.at(2600);
  tl.showCaption(CAPTIONS.switchLayout);
  await hoverOn(tl, "[data-tl=layout-opt-bottom-right]", { ms: 600 });
  await pressOn(tl, "[data-tl=layout-opt-bottom-right]", { ms: 300 });
  tl.setVar("ocxBgLayout", "bottom-right");

  // 3. Toggle off Company detail checkbox
  await tl.at(4600);
  tl.showCaption(CAPTIONS.toggleDetails);
  await hoverOn(tl, "[data-tl=check-detail-company]", { ms: 500 });
  await pressOn(tl, "[data-tl=check-detail-company]", { ms: 300 });
  tl.setVar("ocxShowCompany", false);

  // 4. Highlight updated preview
  await tl.at(6400);
  tl.showCaption(CAPTIONS.previewUpdated);
  await hoverOn(tl, "[data-tl=bg-preview-card]", { ms: 600 });
  await ring(tl, "[data-tl=bg-preview-card]", 1600);

  // 5. Conclude
  await finishOneCardX(tl, STEP40_DURATION_MS);
}
