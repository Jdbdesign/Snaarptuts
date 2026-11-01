import type { Timeline } from "@/lib/timeline";
import {
  beginWorkforce,
  finishWorkforce,
  hoverOn,
  pressOn,
} from "@/components/workforce/workforce-timeline";
import { CAPTIONS, URLS } from "./data";

export const STEP112_DURATION_MS = 10500;

export async function runStep112(tl: Timeline) {
  beginWorkforce(tl, URLS.trainingCourses, "training-courses", "overview", [0.82, 0.45], true);
  tl.setVar("wfTrainingExpanded", true);
  tl.setVar("wfTrainingSub", "courses");
  tl.setVar("wfCreateCourseDrawerOpen", true);
  tl.setVar("wfCourseTitleText", "Engineering Fundamentals");
  tl.setVar("wfCourseDescText", "Core engineering practices and workflow guidelines.");
  tl.setVar("wfLessonsModalOpen", false);

  // 1. Click Manage Lessons & Assessment
  await tl.at(500);
  tl.showCaption(CAPTIONS.manageLessons);
  await pressOn(tl, "[data-tl=btn-manage-lessons]", { ms: 600 });
  tl.setVar("wfLessonsModalOpen", true);
  await tl.wait(400);

  // 2. Hover Lessons
  await tl.at(3800);
  tl.showCaption(CAPTIONS.reviewSyllabus);
  await hoverOn(tl, "[data-tl=btn-add-lesson]", { ms: 600 });
  await tl.wait(600);

  // 3. Click Done
  await tl.at(7200);
  tl.showCaption(CAPTIONS.closeModal);
  await pressOn(tl, "[data-tl=btn-close-lessons-modal]", { ms: 600 });
  tl.setVar("wfLessonsModalOpen", false);
  tl.setVar("wfCreateCourseDrawerOpen", false);
  await tl.wait(400);

  // Finish
  await tl.at(9800);
  await finishWorkforce(tl);
}
