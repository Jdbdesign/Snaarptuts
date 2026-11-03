import type { Timeline } from "@/lib/timeline";
import {
  beginOneCardX,
  finishOneCardX,
  hoverOn,
  pressOn,
  ring,
} from "@/components/onecardx/onecardx-timeline";
import { CAPTIONS, URLS } from "./data";

export const STEP3_DURATION_MS = 10500;

export async function runStep3(tl: Timeline) {
  tl.setVar("ocxPart1Cards", true);
  beginOneCardX(tl, URLS.home, "home", [0.25, 0.28]);

  // 1. Click Quick Action: Create an Organization Card
  await tl.at(600);
  tl.showCaption(CAPTIONS.clickQuickAction);
  await pressOn(tl, "[data-tl=quick-action-org-card]", { ms: 650 });
  await tl.wait(250);

  // 2. Heading inspection
  await tl.at(3600);
  tl.showCaption(CAPTIONS.pageHeading);
  await hoverOn(tl, "[data-tl=org-cards-heading]", { ms: 600 });
  await ring(tl, "[data-tl=org-cards-heading]", 2200);

  // 3. Stats & New Card button
  await tl.at(6800);
  tl.showCaption(CAPTIONS.statsAndButton);
  await hoverOn(tl, "[data-tl=stat-total-cards]", { ms: 550 });
  await ring(tl, "[data-tl=btn-new-org-card]", 2000);

  // 4. Conclude
  await finishOneCardX(tl, STEP3_DURATION_MS);
}
