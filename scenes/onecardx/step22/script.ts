import type { Timeline } from "@/lib/timeline";
import {
  beginOneCardX,
  finishOneCardX,
  hoverOn,
  ring,
} from "@/components/onecardx/onecardx-timeline";
import { CAPTIONS, URLS } from "./data";

export const STEP22_DURATION_MS = 6000;

export async function runStep22(tl: Timeline) {
  beginOneCardX(tl, URLS.orgCards, "orgCards", [0.45, 0.45]);
  tl.setVar("ocxActiveTab", "card");
  tl.setVar("ocxCardType", "id-card");
  tl.setVar("ocxPhotoAdded", true);
  tl.setVar("ocxLogoAdded", true);
  tl.setVar("ocxBadgeAdded", true);
  tl.setVar("ocxAccentColor", "#2563EB");

  // 1. Click Edit design on Engineering Team
  await tl.at(600);
  tl.showCaption(CAPTIONS.clickEditDesign, { target: "[data-tl=btn-edit-design-engineering-team]" });
  await tl.wait(100);
  await tl.moveCursorTo("[data-tl=btn-edit-design-engineering-team]", { ms: 600 });
  await tl.click("[data-tl=btn-edit-design-engineering-team]");
  tl.setUrl(URLS.editor);
  tl.setVar("ocxPage", "editor");
  await tl.wait(200);

  // 2. Inspect Card Type options
  await tl.at(2800);
  tl.showCaption(CAPTIONS.cardTypeInfo, { target: "[data-tl=card-type-id-card]" });
  await hoverOn(tl, "[data-tl=card-type-id-card]", { ms: 600 });
  await ring(tl, "[data-tl=card-type-id-card]", 1800);

  // 3. Finish
  await finishOneCardX(tl, STEP22_DURATION_MS);
}
