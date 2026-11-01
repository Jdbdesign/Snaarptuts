import type { Timeline } from "@/lib/timeline";
import {
  beginWorkforce,
  finishWorkforce,
  pressOn,
} from "@/components/workforce/workforce-timeline";
import { CAPTIONS, URLS } from "./data";

export const STEP111_DURATION_MS = 11500;

export async function runStep111(tl: Timeline) {
  beginWorkforce(tl, URLS.trainingCourses, "training-courses", "overview", [0.45, 0.28], true);
  tl.setVar("wfTrainingExpanded", true);
  tl.setVar("wfTrainingSub", "courses");
  tl.setVar("wfCreateCourseDrawerOpen", false);
  tl.setVar("wfCourseTitleText", "");
  tl.setVar("wfCourseDescText", "");

  // 1. Click + Create Course
  await tl.at(500);
  tl.showCaption(CAPTIONS.createCourse);
  await pressOn(tl, "[data-tl=btn-create-course]", { ms: 600 });
  tl.setVar("wfCreateCourseDrawerOpen", true);
  await tl.wait(400);

  // 2. Type Course Title
  await tl.at(3200);
  tl.showCaption(CAPTIONS.typeTitle);
  await pressOn(tl, "[data-tl=input-course-title]", { ms: 500 });
  tl.setVar("wfCourseTitleText", "Engineering Fundamentals");
  await tl.typeText("[data-tl=input-course-title]", "Engineering Fundamentals", { msPerChar: 40 });
  await tl.wait(400);

  // 3. Type Description
  await tl.at(6800);
  tl.showCaption(CAPTIONS.typeDesc);
  await pressOn(tl, "[data-tl=textarea-course-desc]", { ms: 500 });
  tl.setVar("wfCourseDescText", "Core engineering practices and workflow guidelines.");
  await tl.typeText(
    "[data-tl=textarea-course-desc]",
    "Core engineering practices and workflow guidelines.",
    { msPerChar: 35 }
  );
  await tl.wait(400);

  // Finish
  await tl.at(10800);
  await finishWorkforce(tl);
}
