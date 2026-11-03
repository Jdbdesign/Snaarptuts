import type { Timeline } from "@/lib/timeline";
import {
  beginOneCardX,
  finishOneCardX,
  hoverOn,
  pressOn,
  ring,
} from "@/components/onecardx/onecardx-timeline";
import { CAPTIONS, URLS } from "./data";

export const STEP34_DURATION_MS = 7200;

export async function runStep34(tl: Timeline) {
  beginOneCardX(tl, URLS.orgCards, "orgCards", [0.45, 0.46]);

  // 1. Click 'Edit design' on Engineering Team
  await tl.at(500);
  tl.showCaption(CAPTIONS.clickEditDesign);
  await pressOn(tl, "[data-tl=btn-edit-design-engineering-team]", { ms: 600 });
  tl.setUrl(URLS.editor);
  tl.setVar("ocxPage", "editor");
  tl.setVar("ocxActiveTab", "card");
  tl.setVar("ocxCardType", "id-card");

  // 2. Click 'Business' card type
  await tl.at(2200);
  tl.showCaption(CAPTIONS.clickBusinessCard);
  await hoverOn(tl, "[data-tl=card-type-business]", { ms: 600 });
  await pressOn(tl, "[data-tl=card-type-business]", { ms: 300 });
  tl.setVar("ocxCardType", "business");

  // 3. Highlight updated live preview
  await tl.at(3800);
  tl.showCaption(CAPTIONS.previewSwitched);
  await hoverOn(tl, "[data-tl=card-live-preview]", { ms: 600 });
  await ring(tl, "[data-tl=card-live-preview]", 1800);

  // 4. Conclude
  await finishOneCardX(tl, STEP34_DURATION_MS);
}
