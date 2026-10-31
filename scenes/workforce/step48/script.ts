import type { Timeline } from "@/lib/timeline";
import {
  beginWorkforce,
  finishWorkforce,
  hoverOn,
  pressOn,
  ring,
} from "@/components/workforce/workforce-timeline";
import { CAPTIONS, URLS } from "./data";

export const STEP48_DURATION_MS = 13000;

export async function runStep48(tl: Timeline) {
  beginWorkforce(tl, URLS.policyDetails, "policy-details", "overview", [0.1, 0.62]);

  // 1. Click Learning Hub in the sidebar
  await tl.at(500);
  tl.showCaption(CAPTIONS.clickLearning);
  await pressOn(tl, "[data-tl=nav-learning-hub]", { ms: 600 });
  tl.setVar("wfPage", "learning");
  tl.setVar("wfLearningTab", "hub");
  tl.setVar("wfLearningCategoryOpen", false);
  tl.setUrl(URLS.learning);
  await tl.wait(250);

  // 2. Ring Assigned Courses section
  await tl.at(2500);
  tl.showCaption(CAPTIONS.assignedCourses);
  await hoverOn(tl, "[data-tl=section-assigned-courses]", { ms: 500 });
  await ring(tl, "[data-tl=section-assigned-courses]", 1800);

  // 3. Ring Categories section
  await tl.at(4800);
  tl.showCaption(CAPTIONS.categories);
  await hoverOn(tl, "[data-tl=section-categories]", { ms: 500 });
  await ring(tl, "[data-tl=section-categories]", 1800);

  // 4. Hover Health tile
  await tl.at(7000);
  tl.showCaption(CAPTIONS.hoverHealth);
  await hoverOn(tl, "[data-tl=cat-tile-health]", { ms: 500 });
  await ring(tl, "[data-tl=cat-tile-health]", 1000);

  // 5. Click Engineering tile
  await tl.at(8600);
  tl.showCaption(CAPTIONS.clickEngineering);
  await pressOn(tl, "[data-tl=cat-tile-engineering]", { ms: 500 });
  tl.setVar("wfLearningCategoryOpen", true);
  tl.setVar("wfLearningLoading", true);
  tl.setUrl(URLS.learningCategory);

  // Short 0.8s loading
  await tl.wait(800);
  tl.setVar("wfLearningLoading", false);

  // 6. Ring course card inside category
  await tl.at(10200);
  tl.showCaption(CAPTIONS.categoryCourses);
  await hoverOn(tl, "[data-tl=course-card-engineering]", { ms: 500 });
  await ring(tl, "[data-tl=course-card-engineering]", 1600);

  await finishWorkforce(tl, 12200, STEP48_DURATION_MS);
}
