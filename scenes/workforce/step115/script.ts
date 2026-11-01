import type { Timeline } from "@/lib/timeline";
import {
  beginWorkforce,
  finishWorkforce,
  hoverOn,
  pressOn,
} from "@/components/workforce/workforce-timeline";
import { CAPTIONS, URLS } from "./data";

export const STEP115_DURATION_MS = 8000;

export async function runStep115(tl: Timeline) {
  beginWorkforce(tl, URLS.trainingCategories, "training-categories", "overview", [0.45, 0.28], true);
  tl.setVar("wfTrainingExpanded", true);
  tl.setVar("wfTrainingSub", "categories");

  // 1. Click Assignments
  await tl.at(500);
  tl.showCaption(CAPTIONS.clickAssignments);
  await pressOn(tl, "[data-tl=subnav-training-assignments]", { ms: 600 });
  tl.setVar("wfPage", "training-assignments");
  tl.setVar("wfTrainingSub", "assignments");
  tl.setUrl(URLS.trainingAssignments);
  await tl.wait(400);

  // 2. Hover filters
  await tl.at(3800);
  tl.showCaption(CAPTIONS.reviewFilters);
  await hoverOn(tl, "[data-tl=filter-assignment-status]", { ms: 600 });
  await tl.wait(600);

  // Finish
  await tl.at(7400);
  await finishWorkforce(tl);
}
