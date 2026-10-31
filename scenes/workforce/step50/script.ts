import type { Timeline } from "@/lib/timeline";
import {
  beginWorkforce,
  finishWorkforce,
  hoverOn,
  pressOn,
  ring,
} from "@/components/workforce/workforce-timeline";
import { CAPTIONS, URLS } from "./data";

export const STEP50_DURATION_MS = 17000;

export async function runStep50(tl: Timeline) {
  beginWorkforce(tl, URLS.learningCourse, "learning-course", "overview", [0.5, 0.6]);
  tl.setVar("wfLessonState", "ready");
  tl.setVar("wfLessonSeconds", 0);
  tl.setVar("wfLessonSpinner", false);

  // 1. Click play button
  await tl.at(500);
  tl.showCaption(CAPTIONS.clickPlay);
  await pressOn(tl, "[data-tl=player-play-btn]", { ms: 600 });
  tl.setVar("wfLessonState", "playing");

  // 2. Playback: Slide 1 (0:00 -> 0:45)
  await tl.at(1800);
  tl.setVar("wfLessonSeconds", 25);

  await tl.at(2800);
  tl.showCaption(CAPTIONS.slide1);
  tl.setVar("wfLessonSeconds", 45);

  // 3. Playback: Slide 2 (0:45 -> 1:30)
  await tl.at(4200);
  tl.setVar("wfLessonSeconds", 75);

  await tl.at(5400);
  tl.showCaption(CAPTIONS.slide2);
  tl.setVar("wfLessonSeconds", 90);

  // 4. Playback: Slide 3 (1:30 -> 2:10 -> 3:00)
  await tl.at(7000);
  tl.showCaption(CAPTIONS.slide3);
  tl.setVar("wfLessonSeconds", 130);

  await tl.at(8600);
  tl.setVar("wfLessonSeconds", 160);

  await tl.at(10000);
  tl.setVar("wfLessonSeconds", 180);
  tl.setVar("wfLessonState", "ended");

  // 5. Scroll panel down to reveal completion buttons
  await tl.at(10600);
  await tl.scrollPanelTo("[data-scroller=learning]", 320, 600);

  // 6. Ring Complete lesson button
  await tl.at(11800);
  tl.showCaption(CAPTIONS.completeLessonBtn);
  await hoverOn(tl, "[data-tl=btn-complete-lesson]", { ms: 500 });
  await ring(tl, "[data-tl=btn-complete-lesson]", 1400);

  // 7. Ring Complete course button
  await tl.at(13800);
  tl.showCaption(CAPTIONS.completeCourseBtn);
  await hoverOn(tl, "[data-tl=btn-complete-course]", { ms: 500 });
  await ring(tl, "[data-tl=btn-complete-course]", 1800);

  await finishWorkforce(tl, 16000, STEP50_DURATION_MS);
}
