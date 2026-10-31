import type { Timeline } from "@/lib/timeline";
import {
  beginWorkforce,
  finishWorkforce,
  hoverOn,
  pressOn,
  ring,
} from "@/components/workforce/workforce-timeline";
import { CAPTIONS, URLS } from "./data";

export const STEP51_DURATION_MS = 11600;

export async function runStep51(tl: Timeline) {
  beginWorkforce(tl, URLS.learningCourse, "learning-course", "overview", [0.85, 0.75]);
  tl.setVar("wfLessonState", "ended");
  tl.setVar("wfLessonSeconds", 180);
  tl.setVar("wfUnreadCount", 1);
  tl.setVar("wfLessonSpinner", false);
  tl.setVar("wfLessonCompleted", false);
  tl.setVar("wfCourseCompleted", false);

  // Start with panel scrolled down to buttons
  await tl.scrollPanelTo("[data-scroller=learning]", 320, 0);

  // 1. Click Complete lesson
  await tl.at(500);
  tl.showCaption(CAPTIONS.clickCompleteLesson);
  await pressOn(tl, "[data-tl=btn-complete-lesson]", { ms: 600 });
  tl.setVar("wfLessonSpinner", true);

  // 2. Spinner spins for 0.8s, then lesson chip gets tick
  await tl.wait(800);
  tl.setVar("wfLessonSpinner", false);
  tl.setVar("wfLessonCompleted", true);

  await tl.at(2200);
  tl.showCaption(CAPTIONS.lessonTicked);
  await hoverOn(tl, "[data-tl=chip-lesson-1]", { ms: 500 });
  await ring(tl, "[data-tl=chip-lesson-1]", 1200);

  // 3. Click Complete course and get certificate
  await tl.at(3800);
  tl.showCaption(CAPTIONS.clickCompleteCourse);
  await pressOn(tl, "[data-tl=btn-complete-course]", { ms: 600 });
  tl.setVar("wfCourseCompleted", true);
  tl.setVar("wfUnreadCount", 2);
  await tl.scrollPanelTo("[data-scroller=learning]", 0, 600);

  // 4. Ring completed panel
  await tl.at(6000);
  tl.showCaption(CAPTIONS.courseCompletedPanel);
  await hoverOn(tl, "[data-tl=course-completed-panel]", { ms: 500 });
  await ring(tl, "[data-tl=course-completed-panel]", 2000);

  // 5. Ring top bell badge
  await tl.at(8600);
  tl.showCaption(CAPTIONS.bellIncremented);
  await hoverOn(tl, "[data-tl=top-bell-badge]", { ms: 500 });
  await ring(tl, "[data-tl=top-bell-badge]", 1600);

  await finishWorkforce(tl, 10800, STEP51_DURATION_MS);
}
