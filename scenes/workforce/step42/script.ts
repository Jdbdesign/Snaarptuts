import type { Timeline } from "@/lib/timeline";
import {
  beginWorkforce,
  finishWorkforce,
  hoverOn,
  pressOn,
  ring,
} from "@/components/workforce/workforce-timeline";
import { CAPTIONS, URLS } from "./data";

export const STEP42_DURATION_MS = 25500;

export async function runStep42(tl: Timeline) {
  beginWorkforce(tl, URLS.performanceReview, "performance-review", "overview", [0.4, 0.4]);
  tl.setVar("wfReviewObjectivesOpen", false);
  tl.setVar("wfReviewAnswers", {});
  tl.setVar("field:skills", "");
  tl.setVar("field:comments", "");
  tl.setVar("wfReviewSubmitting", false);

  // 1. Question 1 select rating
  await tl.at(500);
  tl.showCaption(CAPTIONS.selectRatings);
  await pressOn(tl, "[data-tl=review-select-1]", { ms: 600 });
  tl.setVar("wfActiveReviewSelect", 1);
  await tl.wait(250);

  await tl.at(2000);
  await pressOn(tl, "[data-tl=review-opt-1-2]", { ms: 400 });
  tl.setVar("wfReviewAnswers", { 1: "2 - Needs Improvement" });
  tl.setVar("wfActiveReviewSelect", null);
  await tl.wait(250);

  // 2. Question 2 select rating
  await tl.at(3600);
  await pressOn(tl, "[data-tl=review-select-2]", { ms: 450 });
  tl.setVar("wfActiveReviewSelect", 2);
  await tl.wait(200);

  await tl.at(4800);
  await pressOn(tl, "[data-tl=review-opt-2-4]", { ms: 400 });
  tl.setVar("wfReviewAnswers", {
    1: "2 - Needs Improvement",
    2: "4 - Exceeds Expectations",
  });
  tl.setVar("wfActiveReviewSelect", null);
  await tl.wait(200);

  // 3. Question 3 select rating
  await tl.at(6200);
  await pressOn(tl, "[data-tl=review-select-3]", { ms: 450 });
  tl.setVar("wfActiveReviewSelect", 3);
  await tl.wait(200);

  await tl.at(7400);
  await pressOn(tl, "[data-tl=review-opt-3-5]", { ms: 400 });
  tl.setVar("wfReviewAnswers", {
    1: "2 - Needs Improvement",
    2: "4 - Exceeds Expectations",
    3: "5 - Outstanding",
  });
  tl.setVar("wfActiveReviewSelect", null);
  await tl.wait(200);

  // 4. Fill remaining questions (4 to 16)
  await tl.at(8800);
  tl.showCaption(CAPTIONS.fillRemaining);
  await tl.scrollPanelTo(
    "[data-scroller=review-form]",
    "[data-tl=review-q-10]",
    600
  );
  tl.setVar("wfReviewAnswers", {
    1: "2 - Needs Improvement",
    2: "4 - Exceeds Expectations",
    3: "5 - Outstanding",
    4: "3 - Meets Expectations",
    5: "4 - Exceeds Expectations",
    6: "5 - Outstanding",
    7: "4 - Exceeds Expectations",
    8: "4 - Exceeds Expectations",
    9: "4 - Exceeds Expectations",
    10: "5 - Outstanding",
  });
  await tl.wait(600);

  await tl.at(11000);
  await tl.scrollPanelTo(
    "[data-scroller=review-form]",
    "[data-tl=review-skills-box]",
    600
  );
  tl.setVar("wfReviewAnswers", {
    1: "2 - Needs Improvement",
    2: "4 - Exceeds Expectations",
    3: "5 - Outstanding",
    4: "3 - Meets Expectations",
    5: "4 - Exceeds Expectations",
    6: "5 - Outstanding",
    7: "4 - Exceeds Expectations",
    8: "4 - Exceeds Expectations",
    9: "4 - Exceeds Expectations",
    10: "5 - Outstanding",
    11: "2 - Needs Improvement",
    12: "4 - Exceeds Expectations",
    13: "3 - Meets Expectations",
    14: "3 - Meets Expectations",
    15: "4 - Exceeds Expectations",
    16: "5 - Outstanding",
  });
  await tl.wait(300);

  // 5. Skills textarea
  await tl.at(12800);
  tl.showCaption(CAPTIONS.skills);
  await pressOn(tl, "[data-tl=review-skills-textarea]", { ms: 500 });
  await tl.typeText("skills", "System design", { msPerChar: 70 });
  await tl.wait(200);

  // 6. Comments textarea
  await tl.at(16200);
  tl.showCaption(CAPTIONS.comments);
  await pressOn(tl, "[data-tl=review-comments-textarea]", { ms: 450 });
  await tl.typeText("comments", "None", { msPerChar: 70 });
  await tl.wait(200);

  // 7. Hover Save draft
  await tl.at(18500);
  tl.showCaption(CAPTIONS.saveDraft);
  await hoverOn(tl, "[data-tl=review-save-draft]", { ms: 500 });
  await ring(tl, "[data-tl=review-save-draft]", 1500);

  // 8. Click Submit review
  await tl.at(21000);
  tl.showCaption(CAPTIONS.submitReview);
  await pressOn(tl, "[data-tl=review-submit-btn]", { ms: 500 });
  tl.setVar("wfReviewSubmitting", true);
  await tl.wait(1000);
  tl.setVar("wfReviewSubmitting", false);
  tl.setVar("wfPage", "performance");
  tl.setUrl(URLS.performance);
  await tl.wait(400);

  // Finish
  await finishWorkforce(tl, 24500, STEP42_DURATION_MS);
}
