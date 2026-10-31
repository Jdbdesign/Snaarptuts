import type { Timeline } from "@/lib/timeline";
import {
  beginWorkforce,
  finishWorkforce,
  hoverOn,
  pressOn,
  ring,
} from "@/components/workforce/workforce-timeline";
import { CAPTIONS, URLS } from "./data";

export const STEP36_DURATION_MS = 12500;

export async function runStep36(tl: Timeline) {
  beginWorkforce(tl, URLS.timeTracker, "time-tracker", "overview", [0.08, 0.5]);
  tl.setVar("wfGoalsTab", "goals");

  // 1. Click Goals in sidebar
  await tl.at(500);
  tl.showCaption(CAPTIONS.clickGoals);
  await pressOn(tl, "[data-tl=nav-goals]", { ms: 600 });
  tl.setVar("wfPage", "goals");
  tl.setUrl(URLS.goals);
  await tl.wait(250);

  // 2. Ring goals table
  await tl.at(2800);
  tl.showCaption(CAPTIONS.goalsTable);
  await hoverOn(tl, "[data-tl=goals-table]", { ms: 500 });
  await ring(tl, "[data-tl=goals-table]", 2200);

  // 3. Hover three action icons
  await tl.at(5600);
  tl.showCaption(CAPTIONS.actions);
  await hoverOn(tl, "[data-tl=goal-action-view]", { ms: 400 });
  await ring(tl, "[data-tl=goal-action-view]", 1000);

  await tl.at(7400);
  await hoverOn(tl, "[data-tl=goal-action-edit]", { ms: 400 });
  await ring(tl, "[data-tl=goal-action-edit]", 1000);

  await tl.at(9200);
  await hoverOn(tl, "[data-tl=goal-action-delete]", { ms: 400 });
  await ring(tl, "[data-tl=goal-action-delete]", 1000);

  // Finish
  await finishWorkforce(tl, 11500, STEP36_DURATION_MS);
}
