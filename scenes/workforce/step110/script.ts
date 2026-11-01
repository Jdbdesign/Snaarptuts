import type { Timeline } from "@/lib/timeline";
import {
  beginWorkforce,
  finishWorkforce,
  hoverOn,
  pressOn,
} from "@/components/workforce/workforce-timeline";
import { CAPTIONS, URLS } from "./data";

export const STEP110_DURATION_MS = 8000;

export async function runStep110(tl: Timeline) {
  beginWorkforce(tl, URLS.trainingDashboard, "training-dashboard", "overview", [0.45, 0.28], true);
  tl.setVar("wfTrainingExpanded", true);
  tl.setVar("wfTrainingSub", "dashboard");

  // 1. Click Courses
  await tl.at(500);
  tl.showCaption(CAPTIONS.clickCourses);
  await pressOn(tl, "[data-tl=subnav-training-courses]", { ms: 600 });
  tl.setVar("wfPage", "training-courses");
  tl.setVar("wfTrainingSub", "courses");
  tl.setUrl(URLS.trainingCourses);
  await tl.wait(400);

  // 2. Hover course card
  await tl.at(3800);
  tl.showCaption(CAPTIONS.reviewCourses);
  await hoverOn(tl, "[data-tl=course-card-engineering]", { ms: 600 });
  await tl.wait(600);

  // Finish
  await tl.at(7400);
  await finishWorkforce(tl);
}
