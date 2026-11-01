import type { Timeline } from "@/lib/timeline";
import {
  beginWorkforce,
  finishWorkforce,
  hoverOn,
  pressOn,
  ring,
} from "@/components/workforce/workforce-timeline";
import { CAPTIONS, URLS } from "./data";

export const STEP61_DURATION_MS = 21000;

export async function runStep61(tl: Timeline) {
  beginWorkforce(tl, URLS.reviewSample, "admin-review-detail", "overview", [0.85, 0.45], true);

  // 1. Ring status block
  await tl.at(500);
  tl.showCaption(CAPTIONS.statusBlock);
  await hoverOn(tl, "[data-tl=btn-review-back]", { ms: 500 });
  await ring(tl, "[data-tl=block-employee-appeals]", 1800);

  // 2. Ring rating outcome banner
  await tl.at(3000);
  tl.showCaption(CAPTIONS.ratingBanner);
  await hoverOn(tl, "[data-tl=strip-overall-rating]", { ms: 500 });
  await ring(tl, "[data-tl=strip-overall-rating]", 1800);

  // 3. Hover top buttons: Back, Upload result, Reopen
  await tl.at(5500);
  tl.showCaption(CAPTIONS.topActions);
  await hoverOn(tl, "[data-tl=btn-back-to-reviews]", { ms: 450 });
  await tl.wait(250);
  await hoverOn(tl, "[data-tl=btn-upload-result]", { ms: 450 });
  await tl.wait(250);
  await hoverOn(tl, "[data-tl=btn-reopen-correction]", { ms: 450 });
  await tl.wait(250);

  // 4. Scroll to agreed objectives & ring
  await tl.at(8000);
  tl.showCaption(CAPTIONS.agreedObjectives);
  await tl.scrollPanelTo("[data-scroller]", "[data-tl=accordion-agreed-objectives]", 600);
  await hoverOn(tl, "[data-tl=accordion-agreed-objectives]", { ms: 500 });
  await ring(tl, "[data-tl=accordion-agreed-objectives]", 1600);

  // 5. Scroll to self review card & ring
  await tl.at(11000);
  tl.showCaption(CAPTIONS.selfReview);
  await tl.scrollPanelTo("[data-scroller]", "[data-tl=card-self-review-submitted]", 600);
  await hoverOn(tl, "[data-tl=card-self-review-submitted]", { ms: 500 });
  await ring(tl, "[data-tl=card-self-review-submitted]", 2000);

  // 6. Scroll to manager review card & ring
  await tl.at(14000);
  tl.showCaption(CAPTIONS.managerReview);
  await tl.scrollPanelTo("[data-scroller]", "[data-tl=card-manager-review-submitted]", 600);
  await hoverOn(tl, "[data-tl=card-manager-review-submitted]", { ms: 500 });
  await ring(tl, "[data-tl=card-manager-review-submitted]", 2000);

  // 7. Click bottom Back to reviews button
  await tl.at(17200);
  tl.showCaption(CAPTIONS.backToReviews);
  await tl.scrollPanelTo("[data-scroller]", "[data-tl=btn-bottom-back-to-reviews]", 500);
  await pressOn(tl, "[data-tl=btn-bottom-back-to-reviews]", { ms: 600 });
  tl.setVar("wfPage", "appraisal-management");
  tl.setVar("wfAppraisalTab", "assigned");
  tl.setUrl(URLS.appraisalManagement);
  await tl.wait(300);

  // 8. Finish
  await tl.at(20400);
  finishWorkforce(tl);
}
