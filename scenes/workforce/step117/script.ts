import type { Timeline } from "@/lib/timeline";
import {
  beginWorkforce,
  finishWorkforce,
  pressOn,
  ring,
} from "@/components/workforce/workforce-timeline";
import { CAPTIONS, URLS } from "./data";

export const STEP117_DURATION_MS = 11000;

export async function runStep117(tl: Timeline) {
  beginWorkforce(tl, URLS.trainingAssignments, "training-assignments", "overview", [0.45, 0.28], true);
  tl.setVar("wfTrainingExpanded", true);
  tl.setVar("wfTrainingSub", "assignments");
  tl.setVar("wfAssignCourseDrawerOpen", false);
  tl.setVar("wfAssignSelectedAlex", false);

  // 1. Click + Assign Course
  await tl.at(500);
  tl.showCaption(CAPTIONS.assignCourse);
  await pressOn(tl, "[data-tl=btn-assign-course]", { ms: 600 });
  tl.setVar("wfAssignCourseDrawerOpen", true);
  await tl.wait(400);

  // 2. Select Alex Morgan
  await tl.at(3800);
  tl.showCaption(CAPTIONS.selectEmployee);
  await pressOn(tl, "[data-tl=checkbox-employee-alex]", { ms: 600 });
  tl.setVar("wfAssignSelectedAlex", true);
  await tl.wait(400);

  // 3. Ring Assign Course button
  await tl.at(7200);
  tl.showCaption(CAPTIONS.ringAssign);
  await ring(tl, "[data-tl=btn-submit-assign-course]", { ms: 1200 });
  await tl.wait(600);

  // Finish
  await tl.at(10400);
  await finishWorkforce(tl);
}
