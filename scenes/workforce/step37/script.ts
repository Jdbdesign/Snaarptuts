import type { Timeline } from "@/lib/timeline";
import {
  beginWorkforce,
  finishWorkforce,
  hoverOn,
  pressOn,
  ring,
} from "@/components/workforce/workforce-timeline";
import { CAPTIONS, URLS } from "./data";

export const STEP37_DURATION_MS = 14500;

export async function runStep37(tl: Timeline) {
  beginWorkforce(tl, URLS.goals, "goals", "overview", [0.75, 0.35]);
  tl.setVar("wfGoalsTab", "goals");
  tl.setVar("wfEditGoalOpen", false);
  tl.setVar("wfGoalProgress", 54);

  // 1. Click pencil on row 1
  await tl.at(500);
  tl.showCaption(CAPTIONS.clickEdit);
  await pressOn(tl, "[data-tl=goal-action-edit]", { ms: 600 });
  tl.setVar("wfEditGoalOpen", true);
  await tl.wait(250);

  // 2. Ring title & target date
  await tl.at(3000);
  tl.showCaption(CAPTIONS.reviewFields);
  await hoverOn(tl, "[data-tl=goal-field-title]", { ms: 450 });
  await ring(tl, "[data-tl=goal-field-title]", 1600);

  await tl.at(5200);
  await hoverOn(tl, "[data-tl=goal-field-date]", { ms: 400 });
  await ring(tl, "[data-tl=goal-field-date]", 1500);

  // 3. Drag slider to 100%
  await tl.at(7400);
  tl.showCaption(CAPTIONS.dragProgress);
  await hoverOn(tl, "[data-tl=goal-progress-slider]", { ms: 450 });
  tl.setVar("wfGoalProgress", 75);
  await tl.wait(200);
  tl.setVar("wfGoalProgress", 90);
  await tl.wait(200);
  tl.setVar("wfGoalProgress", 100);
  await ring(tl, "[data-tl=goal-progress-label]", 2000);

  // 4. Click Cancel
  await tl.at(11000);
  tl.showCaption(CAPTIONS.cancel);
  await pressOn(tl, "[data-tl=goal-modal-cancel]", { ms: 500 });
  tl.setVar("wfEditGoalOpen", false);
  await tl.wait(250);

  // Finish
  await finishWorkforce(tl, 13500, STEP37_DURATION_MS);
}
