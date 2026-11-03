import type { Timeline } from "@/lib/timeline";
import {
  beginOneCardX,
  finishOneCardX,
  hoverOn,
  ring,
} from "@/components/onecardx/onecardx-timeline";
import { CAPTIONS, URLS } from "./data";

export const STEP18_DURATION_MS = 8000;

export async function runStep18(tl: Timeline) {
  beginOneCardX(tl, URLS.orgCards, "orgCards", [0.45, 0.45]);
  tl.setVar("ocxEngTeamPublished", false);
  tl.setVar("ocxAudienceModalOpen", false);

  // 1. Overview of Cards list
  await tl.at(600);
  tl.showCaption(CAPTIONS.cardListOverview);
  await hoverOn(tl, "[data-tl=stat-total-cards]", { ms: 600 });
  await ring(tl, "[data-tl=stat-total-cards]", 2000);

  // 2. Focus on Engineering Team draft row
  await tl.at(3200);
  tl.showCaption(CAPTIONS.engineeringTeamDraft);
  await hoverOn(tl, "[data-tl=org-card-row-engineering-team]", { ms: 600 });
  await ring(tl, "[data-tl=org-card-row-engineering-team]", 2000);

  // 3. Inspect actions
  await tl.at(5600);
  tl.showCaption(CAPTIONS.actionButtons);
  await hoverOn(tl, "[data-tl=btn-limit-audience-engineering-team]", { ms: 600 });

  // 4. Finish
  await finishOneCardX(tl, STEP18_DURATION_MS);
}
