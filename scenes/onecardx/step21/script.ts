import type { Timeline } from "@/lib/timeline";
import {
  beginOneCardX,
  finishOneCardX,
  hoverOn,
  ring,
} from "@/components/onecardx/onecardx-timeline";
import { CAPTIONS, URLS } from "./data";

export const STEP21_DURATION_MS = 9500;

export async function runStep21(tl: Timeline) {
  beginOneCardX(tl, URLS.orgCards, "orgCards", [0.45, 0.45]);
  tl.setVar("ocxAudienceModalOpen", false);
  tl.setVar("ocxMemberLandscape", false);

  // 1. Click Preview on Engineering Team
  await tl.at(600);
  tl.showCaption(CAPTIONS.clickPreview, { target: "[data-tl=btn-preview-engineering-team]" });
  await tl.wait(100);
  await tl.moveCursorTo("[data-tl=btn-preview-engineering-team]", { ms: 600 });
  await tl.click("[data-tl=btn-preview-engineering-team]");
  tl.setUrl(URLS.memberView);
  tl.setVar("ocxPage", "memberView");
  await tl.wait(200);

  // 2. Highlight member notice banner
  await tl.at(3200);
  tl.showCaption(CAPTIONS.memberBanner);
  await hoverOn(tl, "[data-tl=member-view-banner]", { ms: 600 });
  await ring(tl, "[data-tl=member-view-banner]", 2000);

  // 3. Inspect Edit my details button
  await tl.at(5600);
  tl.showCaption(CAPTIONS.editDetailsButton, { target: "[data-tl=btn-edit-my-details]" });
  await hoverOn(tl, "[data-tl=btn-edit-my-details]", { ms: 600 });
  await ring(tl, "[data-tl=btn-edit-my-details]", 1800);

  // 4. Return to Cards list via breadcrumb
  await tl.at(7600);
  tl.showCaption(CAPTIONS.backToList, { target: "[data-tl=breadcrumb-cards]" });
  await tl.wait(100);
  await tl.moveCursorTo("[data-tl=breadcrumb-cards]", { ms: 500 });
  await tl.click("[data-tl=breadcrumb-cards]");
  tl.setUrl(URLS.orgCards);
  tl.setVar("ocxPage", "orgCards");

  // 5. Finish
  await finishOneCardX(tl, STEP21_DURATION_MS);
}
