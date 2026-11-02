import type { Timeline } from "@/lib/timeline";
import {
  beginOneCardX,
  finishOneCardX,
  hoverOn,
  ring,
} from "@/components/onecardx/onecardx-timeline";
import { CAPTIONS, URLS } from "./data";

export const STEP7_DURATION_MS = 10500;

export async function runStep7(tl: Timeline) {
  beginOneCardX(tl, URLS.editor, "editor", [0.45, 0.35]);
  tl.setVar("ocxActiveTab", "card");
  tl.setVar("ocxCardType", "id-card");

  // 1. Live preview card
  await tl.at(600);
  tl.showCaption(CAPTIONS.previewNotice);
  await hoverOn(tl, "[data-tl=card-live-preview]", { ms: 650 });
  await ring(tl, "[data-tl=card-live-preview]", 2000);

  // 2. ID Card selected
  await tl.at(3600);
  tl.showCaption(CAPTIONS.idCardType);
  await hoverOn(tl, "[data-tl=card-type-id-card]", { ms: 600 });
  await ring(tl, "[data-tl=card-type-id-card]", 1800);

  // 3. Hover Business Card option
  await tl.at(6600);
  tl.showCaption(CAPTIONS.businessCardType);
  await hoverOn(tl, "[data-tl=card-type-business]", { ms: 600 });
  await ring(tl, "[data-tl=card-type-business]", 2000);
  await hoverOn(tl, "[data-tl=card-type-id-card]", { ms: 500 });

  // 4. Conclude
  await finishOneCardX(tl, STEP7_DURATION_MS);
}
