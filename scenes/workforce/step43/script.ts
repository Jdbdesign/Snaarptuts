import type { Timeline } from "@/lib/timeline";
import {
  beginWorkforce,
  finishWorkforce,
  hoverOn,
  pressOn,
  ring,
} from "@/components/workforce/workforce-timeline";
import { CAPTIONS, URLS } from "./data";

export const STEP43_DURATION_MS = 10500;

export async function runStep43(tl: Timeline) {
  beginWorkforce(tl, URLS.performance, "performance", "overview", [0.4, 0.2]);
  tl.setVar("wfAppraisalsTab", "my-reviews");

  // 1. Click Assigned Reviews tab
  await tl.at(500);
  tl.showCaption(CAPTIONS.clickTab);
  await pressOn(tl, "[data-tl=appraisals-tab-assigned]", { ms: 600 });
  tl.setVar("wfAppraisalsTab", "assigned-reviews");
  tl.setUrl(URLS.performanceAssigned);
  await tl.wait(250);

  // 2. Ring empty state
  await tl.at(2800);
  tl.showCaption(CAPTIONS.emptyState);
  await hoverOn(tl, "[data-tl=assigned-reviews-card]", { ms: 500 });
  await ring(tl, "[data-tl=assigned-reviews-card]", 3000);

  // Finish
  await finishWorkforce(tl, 9500, STEP43_DURATION_MS);
}
