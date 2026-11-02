import type { Timeline } from "@/lib/timeline";
import {
  beginOneCardX,
  finishOneCardX,
  hoverOn,
  pressOn,
  ring,
} from "@/components/onecardx/onecardx-timeline";
import { CAPTIONS, URLS } from "./data";

export const STEP12_DURATION_MS = 10500;

export async function runStep12(tl: Timeline) {
  beginOneCardX(tl, URLS.editor, "editor", [0.40, 0.70]);
  tl.setVar("ocxActiveTab", "display");
  tl.setVar("ocxDesign", "classic");
  tl.setVar("ocxPhotoAdded", true);
  tl.setVar("ocxLogoAdded", true);
  tl.setVar("ocxAccentColor", "#2563EB");
  tl.setVar("ocxBadgeAdded", false);

  // 1. Click Add Badge
  await tl.at(600);
  tl.showCaption(CAPTIONS.clickAddBadge, { target: "[data-tl=btn-add-badge]" });
  await tl.wait(100);
  await tl.moveCursorTo("[data-tl=btn-add-badge]", { ms: 600 });
  await tl.click("[data-tl=btn-add-badge]");
  tl.setVar("ocxBadgeModalOpen", true);
  await tl.wait(150);

  // 2. Select Verified badge
  await tl.at(3400);
  tl.showCaption(CAPTIONS.pickBadge);
  await pressOn(tl, "[data-tl=btn-badge-verified]", { ms: 600 });
  tl.setVar("ocxBadgeAdded", true);
  tl.setVar("ocxBadgeModalOpen", false);
  await tl.wait(300);

  // 3. Inspect badge in preview
  await tl.at(6600);
  tl.showCaption(CAPTIONS.badgeUpdated);
  await hoverOn(tl, "[data-tl=card-live-preview]", { ms: 600 });
  await ring(tl, "[data-tl=card-live-preview]", 2200);

  // 4. Conclude
  await finishOneCardX(tl, STEP12_DURATION_MS);
}
