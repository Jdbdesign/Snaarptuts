import type { Timeline } from "@/lib/timeline";
import {
  beginWorkforce,
  finishWorkforce,
  hoverOn,
  pressOn,
  ring,
} from "@/components/workforce/workforce-timeline";
import { CAPTIONS, URLS } from "./data";

export const STEP53_DURATION_MS = 12000;

export async function runStep53(tl: Timeline) {
  beginWorkforce(tl, URLS.learningCourse, "learning-course", "overview", [0.1, 0.62]);
  tl.setVar("wfCourseCompleted", true);
  tl.setVar("wfLessonCompleted", true);

  // 1. Click Learning Hub in sidebar (opens on Engineering category)
  await tl.at(500);
  tl.showCaption(CAPTIONS.clickLearning);
  await pressOn(tl, "[data-tl=nav-learning-hub]", { ms: 600 });
  tl.setVar("wfPage", "learning");
  tl.setVar("wfLearningCategoryOpen", true);
  tl.setVar("wfLearningTab", "hub");
  tl.setUrl(URLS.learningCategory);
  await tl.wait(250);

  // 2. Click Learning Record tab
  await tl.at(2500);
  tl.showCaption(CAPTIONS.clickRecordTab);
  await pressOn(tl, "[data-tl=tab-learning-record]", { ms: 600 });
  tl.setVar("wfLearningTab", "record");
  tl.setUrl(URLS.learningRecord);
  await tl.wait(250);

  // 3. Ring Tracked Learning Hours card
  await tl.at(4600);
  tl.showCaption(CAPTIONS.trackedHours);
  await hoverOn(tl, "[data-tl=card-tracked-hours]", { ms: 500 });
  await ring(tl, "[data-tl=card-tracked-hours]", 1800);

  // 4. Ring completed row
  await tl.at(6800);
  tl.showCaption(CAPTIONS.completedCourses);
  await hoverOn(tl, "[data-tl=row-completed-course]", { ms: 500 });
  await ring(tl, "[data-tl=row-completed-course]", 2000);

  // 5. Hover Download certificate button (no click)
  await tl.at(9200);
  tl.showCaption(CAPTIONS.hoverDownloadCert);
  await hoverOn(tl, "[data-tl=btn-record-download-cert]", { ms: 500 });
  await ring(tl, "[data-tl=btn-record-download-cert]", 1400);

  await finishWorkforce(tl, 11000, STEP53_DURATION_MS);
}
