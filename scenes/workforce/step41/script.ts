import type { Timeline } from "@/lib/timeline";
import {
  beginWorkforce,
  finishWorkforce,
  hoverOn,
  pressOn,
  ring,
} from "@/components/workforce/workforce-timeline";
import { CAPTIONS, URLS } from "./data";

export const STEP41_DURATION_MS = 14500;

export async function runStep41(tl: Timeline) {
  beginWorkforce(tl, URLS.performance, "performance", "overview", [0.75, 0.4]);
  tl.setVar("wfAppraisalsTab", "my-reviews");

  // 1. Click Open review on Q4 cycle row
  await tl.at(500);
  tl.showCaption(CAPTIONS.clickOpenReview);
  await pressOn(tl, "[data-tl=review-action-open-q4]", { ms: 600 });
  tl.setVar("wfPage", "performance-review");
  tl.setUrl(URLS.performanceReview);
  tl.setVar("wfReviewObjectivesOpen", false);
  await tl.wait(250);

  // 2. Expand agreed objectives
  await tl.at(3000);
  tl.showCaption(CAPTIONS.expandObjectives);
  await pressOn(tl, "[data-tl=review-objectives-toggle]", { ms: 500 });
  tl.setVar("wfReviewObjectivesOpen", true);
  await tl.wait(250);
  await ring(tl, "[data-tl=review-objectives-content]", 2000);

  // 3. Ring stage line
  await tl.at(6200);
  tl.showCaption(CAPTIONS.stageLine);
  await hoverOn(tl, "[data-tl=review-stage-line]", { ms: 450 });
  await ring(tl, "[data-tl=review-stage-line]", 1800);

  // 4. Ring info strip
  await tl.at(8800);
  tl.showCaption(CAPTIONS.infoStrip);
  await hoverOn(tl, "[data-tl=review-info-strip]", { ms: 450 });
  await ring(tl, "[data-tl=review-info-strip]", 1800);

  // 5. Ring counter
  await tl.at(11400);
  tl.showCaption(CAPTIONS.counter);
  await hoverOn(tl, "[data-tl=review-answers-count]", { ms: 450 });
  await ring(tl, "[data-tl=review-answers-count]", 1800);

  // Finish
  await finishWorkforce(tl, 13500, STEP41_DURATION_MS);
}
