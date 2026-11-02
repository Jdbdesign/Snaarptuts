import type { Timeline } from "@/lib/timeline";
import {
  beginOneCardX,
  finishOneCardX,
  hoverOn,
  ring,
} from "@/components/onecardx/onecardx-timeline";
import { CAPTIONS, URLS } from "./data";

export const STEP4_DURATION_MS = 11000;

export async function runStep4(tl: Timeline) {
  beginOneCardX(tl, URLS.orgCards, "orgCards", [0.45, 0.40]);

  // 1. Hover Draft Card: Sales Team
  await tl.at(600);
  tl.showCaption(CAPTIONS.hoverDraft);
  await hoverOn(tl, "[data-tl=org-card-row-sales-team]", { ms: 600 });
  await ring(tl, "[data-tl=status-pill-sales-team]", 1400);
  await hoverOn(tl, "[data-tl=btn-publish-toggle-sales-team]", { ms: 500 });
  await ring(tl, "[data-tl=btn-publish-toggle-sales-team]", 1400);

  // 2. Hover Published Card: Business Card
  await tl.at(4200);
  tl.showCaption(CAPTIONS.hoverPublished);
  await hoverOn(tl, "[data-tl=org-card-row-business-card]", { ms: 600 });
  await ring(tl, "[data-tl=status-pill-business-card]", 1400);
  await hoverOn(tl, "[data-tl=btn-publish-toggle-business-card]", { ms: 500 });
  await ring(tl, "[data-tl=btn-publish-toggle-business-card]", 1400);

  // 3. Hover Actions on ID Card
  await tl.at(7600);
  tl.showCaption(CAPTIONS.hoverActions);
  await hoverOn(tl, "[data-tl=org-card-row-id-card]", { ms: 600 });
  await ring(tl, "[data-tl=row-actions-id-card]", 2000);

  // 4. Conclude
  await finishOneCardX(tl, STEP4_DURATION_MS);
}
