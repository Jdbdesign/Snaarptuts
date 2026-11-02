import type { Timeline } from "@/lib/timeline";
import {
  beginOneCardX,
  finishOneCardX,
  hoverOn,
  pressOn,
  ring,
} from "@/components/onecardx/onecardx-timeline";
import { CAPTIONS, URLS } from "./data";

export const STEP8_DURATION_MS = 11000;

export async function runStep8(tl: Timeline) {
  beginOneCardX(tl, URLS.editor, "editor", [0.18, 0.12]);
  tl.setVar("ocxActiveTab", "card");
  tl.setVar("ocxDesign", "classic");

  // 1. Click Display tab
  await tl.at(600);
  tl.showCaption(CAPTIONS.clickDisplayTab);
  await pressOn(tl, "[data-tl=tab-display]", { ms: 600 });
  await tl.wait(150);

  // 2. Inspect Design grid
  await tl.at(3200);
  tl.showCaption(CAPTIONS.designGrid);
  await hoverOn(tl, "[data-tl=design-grid]", { ms: 550 });
  await ring(tl, "[data-tl=design-grid]", 2000);

  // 3. Hover designs and keep Classic
  await tl.at(6500);
  tl.showCaption(CAPTIONS.hoverDesigns);
  await hoverOn(tl, "[data-tl=design-modern]", { ms: 600 });
  await tl.wait(1000);
  await hoverOn(tl, "[data-tl=design-sleek]", { ms: 600 });
  await tl.wait(1000);
  await hoverOn(tl, "[data-tl=design-classic]", { ms: 600 });
  await ring(tl, "[data-tl=design-classic]", 1500);

  // 4. Conclude
  await finishOneCardX(tl, STEP8_DURATION_MS);
}
