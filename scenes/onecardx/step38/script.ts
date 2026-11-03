import type { Timeline } from "@/lib/timeline";
import {
  beginOneCardX,
  finishOneCardX,
  hoverOn,
  ring,
} from "@/components/onecardx/onecardx-timeline";
import { CAPTIONS, URLS } from "./data";

export const STEP38_DURATION_MS = 7500;

export async function runStep38(tl: Timeline) {
  beginOneCardX(tl, URLS.memberView, "memberView", [0.5, 0.16]);
  tl.setVar("ocxMemberLandscape", true);
  tl.setVar("ocxMemberViews", 2);
  tl.setVar("ocxMemberShares", 1);

  // 1. Highlight member explanation banner
  await tl.at(600);
  tl.showCaption(CAPTIONS.memberNotice);
  await hoverOn(tl, "[data-tl=member-view-banner]", { ms: 600 });
  await ring(tl, "[data-tl=member-view-banner]", 1600);

  // 2. Highlight 'Edit my details' button
  await tl.at(2800);
  tl.showCaption(CAPTIONS.editDetailsBtn);
  await hoverOn(tl, "[data-tl=btn-edit-my-details]", { ms: 600 });
  await ring(tl, "[data-tl=btn-edit-my-details]", 1400);

  // 3. Highlight landscape card preview
  await tl.at(4800);
  tl.showCaption(CAPTIONS.landscapeReview);
  await hoverOn(tl, "[data-tl=member-landscape-card]", { ms: 600 });
  await ring(tl, "[data-tl=member-landscape-card]", 1600);

  // 4. Conclude
  await finishOneCardX(tl, STEP38_DURATION_MS);
}
