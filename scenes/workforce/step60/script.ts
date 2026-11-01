import type { Timeline } from "@/lib/timeline";
import {
  beginWorkforce,
  finishWorkforce,
  hoverOn,
  pressOn,
  ring,
} from "@/components/workforce/workforce-timeline";
import { CAPTIONS, URLS } from "./data";

export const STEP60_DURATION_MS = 15500;

export async function runStep60(tl: Timeline) {
  beginWorkforce(tl, URLS.appraisalManagement, "appraisal-management", "overview", [0.45, 0.15], true);
  tl.setVar("wfAppraisalTab", "overview");

  // 1. Click Assigned Reviews tab
  await tl.at(500);
  tl.showCaption(CAPTIONS.clickAssigned);
  await pressOn(tl, "[data-tl=tab-assigned]", { ms: 600 });
  tl.setVar("wfAppraisalTab", "assigned");
  await tl.wait(300);

  // 2. Ring assigned reviews list
  await tl.at(2800);
  tl.showCaption(CAPTIONS.trackReviews);
  await hoverOn(tl, "[data-tl=assigned-reviews-list]", { ms: 600 });
  await ring(tl, "[data-tl=assigned-reviews-list]", 2000);

  // 3. Hover Open task button on row 1
  await tl.at(6500);
  tl.showCaption(CAPTIONS.hoverTask);
  await hoverOn(tl, "[data-tl=btn-open-task-1]", { ms: 500 });
  await ring(tl, "[data-tl=btn-open-task-1]", 1400);

  // 4. Click View review on row 3 (Alex Morgan COMPLETED)
  await tl.at(9500);
  tl.showCaption(CAPTIONS.openCompleted);
  await pressOn(tl, "[data-tl=btn-view-review-3]", { ms: 600 });
  tl.setVar("wfPage", "admin-review-detail");
  tl.setUrl(URLS.reviewSample);
  await tl.wait(300);

  // 5. Finish
  await tl.at(14800);
  finishWorkforce(tl);
}
