import type { Timeline } from "@/lib/timeline";
import {
  beginWorkforce,
  finishWorkforce,
  hoverOn,
  pressOn,
} from "@/components/workforce/workforce-timeline";
import { CAPTIONS, URLS } from "./data";

export const STEP113_DURATION_MS = 8000;

export async function runStep113(tl: Timeline) {
  beginWorkforce(tl, URLS.trainingCourses, "training-courses", "overview", [0.45, 0.28], true);
  tl.setVar("wfTrainingExpanded", true);
  tl.setVar("wfTrainingSub", "courses");

  // 1. Click Categories
  await tl.at(500);
  tl.showCaption(CAPTIONS.clickCategories);
  await pressOn(tl, "[data-tl=subnav-training-categories]", { ms: 600 });
  tl.setVar("wfPage", "training-categories");
  tl.setVar("wfTrainingSub", "categories");
  tl.setUrl(URLS.trainingCategories);
  await tl.wait(400);

  // 2. Hover Create Category
  await tl.at(3800);
  tl.showCaption(CAPTIONS.reviewCategories);
  await hoverOn(tl, "[data-tl=btn-create-category]", { ms: 600 });
  await tl.wait(600);

  // Finish
  await tl.at(7400);
  await finishWorkforce(tl);
}
