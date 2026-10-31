import type { Timeline } from "@/lib/timeline";
import {
  beginWorkforce,
  finishWorkforce,
  hoverOn,
  pressOn,
  ring,
} from "@/components/workforce/workforce-timeline";
import { CAPTIONS, URLS } from "./data";

export const STEP44_DURATION_MS = 20500;

export async function runStep44(tl: Timeline) {
  beginWorkforce(tl, URLS.performance, "performance", "overview", [0.75, 0.45]);
  tl.setVar("wfAppraisalsTab", "my-reviews");

  // 1. Click View and acknowledge on row 2
  await tl.at(500);
  tl.showCaption(CAPTIONS.clickViewAcknowledge);
  await pressOn(tl, "[data-tl=review-action-view-2027]", { ms: 600 });
  tl.setVar("wfPage", "performance-result");
  tl.setUrl(URLS.performanceReview);
  await tl.wait(250);

  // 2. Ring overall rating
  await tl.at(2800);
  tl.showCaption(CAPTIONS.overallRating);
  await hoverOn(tl, "[data-tl=result-overall-strip]", { ms: 500 });
  await ring(tl, "[data-tl=result-overall-strip]", 1800);

  // 3. Hover Appeal result and PDF link
  await tl.at(5200);
  tl.showCaption(CAPTIONS.appealAndPdf);
  await hoverOn(tl, "[data-tl=result-appeal-btn]", { ms: 450 });
  await ring(tl, "[data-tl=result-appeal-btn]", 1000);

  await tl.at(6800);
  await hoverOn(tl, "[data-tl=result-download-pdf]", { ms: 450 });
  await ring(tl, "[data-tl=result-download-pdf]", 1000);

  // 4. Ring Acknowledge card
  await tl.at(8600);
  tl.showCaption(CAPTIONS.acknowledgeCard);
  await hoverOn(tl, "[data-tl=result-ack-card]", { ms: 500 });
  await ring(tl, "[data-tl=result-ack-card]", 2200);

  // 5. Scroll to Released result and ring it
  await tl.at(11600);
  tl.showCaption(CAPTIONS.releasedResult);
  await tl.scrollPanelTo(
    "[data-scroller=review-result]",
    "[data-tl=result-released-card]",
    600
  );
  await hoverOn(tl, "[data-tl=result-released-card]", { ms: 500 });
  await ring(tl, "[data-tl=result-released-card]", 2000);

  // 6. Scroll through both review cards
  await tl.at(14600);
  tl.showCaption(CAPTIONS.reviewCards);
  await hoverOn(tl, "[data-tl=result-self-card]", { ms: 500 });
  await ring(tl, "[data-tl=result-self-card]", 1800);

  await tl.at(17000);
  await tl.scrollPanelTo(
    "[data-scroller=review-result]",
    "[data-tl=result-manager-card]",
    600
  );
  await hoverOn(tl, "[data-tl=result-manager-card]", { ms: 500 });
  await ring(tl, "[data-tl=result-manager-card]", 2000);

  // Finish (after step 44, completion card will show)
  await finishWorkforce(tl, 19500, STEP44_DURATION_MS);
}
