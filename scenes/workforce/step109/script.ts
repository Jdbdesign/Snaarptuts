import type { Timeline } from "@/lib/timeline";
import {
  beginWorkforce,
  finishWorkforce,
  hoverOn,
  pressOn,
} from "@/components/workforce/workforce-timeline";
import { CAPTIONS, URLS } from "./data";

export const STEP109_DURATION_MS = 8000;

export async function runStep109(tl: Timeline) {
  beginWorkforce(tl, URLS.holidays, "admin-holidays", "overview", [0.45, 0.28], true);
  tl.setVar("wfTrainingExpanded", true);

  // 1. Click Training Dashboard
  await tl.at(500);
  tl.showCaption(CAPTIONS.clickDashboard);
  await pressOn(tl, "[data-tl=subnav-training-dashboard]", { ms: 600 });
  tl.setVar("wfPage", "training-dashboard");
  tl.setVar("wfTrainingSub", "dashboard");
  tl.setUrl(URLS.trainingDashboard);
  await tl.wait(400);

  // 2. Hover stat card
  await tl.at(3800);
  tl.showCaption(CAPTIONS.reviewStats);
  await hoverOn(tl, "[data-tl=card-stat-courses]", { ms: 600 });
  await tl.wait(600);

  // Finish
  await tl.at(7400);
  await finishWorkforce(tl);
}
