import type { Timeline } from "@/lib/timeline";
import {
  beginWorkforce,
  finishWorkforce,
  hoverOn,
  pressOn,
  ring,
} from "@/components/workforce/workforce-timeline";
import { CAPTIONS, URLS } from "./data";

export const STEP49_DURATION_MS = 12000;

export async function runStep49(tl: Timeline) {
  beginWorkforce(tl, URLS.learningCategory, "learning", "overview", [0.45, 0.35]);
  tl.setVar("wfLearningCategoryOpen", true);
  tl.setVar("wfLearningTab", "hub");

  // 1. Click course card in Engineering category
  await tl.at(500);
  tl.showCaption(CAPTIONS.clickCourse);
  await pressOn(tl, "[data-tl=course-card-engineering]", { ms: 600 });
  tl.setVar("wfPage", "learning-course");
  tl.setVar("wfLessonSpinner", true);
  tl.setUrl(URLS.learningCourse);
  await tl.wait(250);

  // 2. Ring progress card
  await tl.at(2400);
  tl.showCaption(CAPTIONS.progressCard);
  await hoverOn(tl, "[data-tl=course-progress-card]", { ms: 500 });
  await ring(tl, "[data-tl=course-progress-card]", 1800);

  // Spinner ends at 3800
  await tl.at(3800);
  tl.setVar("wfLessonSpinner", false);
  tl.setVar("wfLessonState", "ready");

  // 3. Ring lesson chip
  await tl.at(4800);
  tl.showCaption(CAPTIONS.lessonChip);
  await hoverOn(tl, "[data-tl=chip-lesson-1]", { ms: 500 });
  await ring(tl, "[data-tl=chip-lesson-1]", 1400);

  // 4. Hover Open in new tab button
  await tl.at(6800);
  tl.showCaption(CAPTIONS.openTab);
  await hoverOn(tl, "[data-tl=btn-open-tab]", { ms: 500 });
  await ring(tl, "[data-tl=btn-open-tab]", 1200);

  // 5. Ring play button on player
  await tl.at(8800);
  tl.showCaption(CAPTIONS.videoPlayer);
  await hoverOn(tl, "[data-tl=player-play-btn]", { ms: 500 });
  await ring(tl, "[data-tl=player-play-btn]", 1600);

  await finishWorkforce(tl, 11200, STEP49_DURATION_MS);
}
