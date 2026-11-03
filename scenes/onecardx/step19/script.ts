import type { Timeline } from "@/lib/timeline";
import {
  beginOneCardX,
  finishOneCardX,
  hoverOn,
  ring,
} from "@/components/onecardx/onecardx-timeline";
import { CAPTIONS, URLS } from "./data";

export const STEP19_DURATION_MS = 8000;

export async function runStep19(tl: Timeline) {
  beginOneCardX(tl, URLS.orgCards, "orgCards", [0.45, 0.45]);
  tl.setVar("ocxAudienceModalOpen", false);
  tl.setVar("ocxAudienceMode", "everyone");

  // 1. Click Limit audience on Engineering Team
  await tl.at(600);
  tl.showCaption(CAPTIONS.clickLimitAudience, { target: "[data-tl=btn-limit-audience-engineering-team]" });
  await tl.wait(100);
  await tl.moveCursorTo("[data-tl=btn-limit-audience-engineering-team]", { ms: 600 });
  await tl.click("[data-tl=btn-limit-audience-engineering-team]");
  tl.setVar("ocxAudienceModalOpen", true);
  await tl.wait(200);

  // 2. Overview of Everyone option
  await tl.at(3200);
  tl.showCaption(CAPTIONS.audienceModalOverview);
  await hoverOn(tl, "[data-tl=audience-opt-everyone]", { ms: 600 });
  await ring(tl, "[data-tl=audience-opt-everyone]", 1800);

  // 3. Hover Specific people option
  await tl.at(5600);
  tl.showCaption(CAPTIONS.reviewOptions);
  await hoverOn(tl, "[data-tl=audience-opt-specific]", { ms: 600 });
  await ring(tl, "[data-tl=audience-opt-specific]", 1800);

  // 4. Finish
  await finishOneCardX(tl, STEP19_DURATION_MS);
}
