import type { Timeline } from "@/lib/timeline";
import {
  beginProjects,
  finishProjects,
  hoverOn,
  pressOn,
  typeIntoVar,
} from "@/components/projects/projects-timeline";
import { PROJECTS_URLS } from "@/components/projects/projects-data";

export const STEP13_DURATION_MS = 21000;

export async function runStep13(tl: Timeline) {
  beginProjects(tl, PROJECTS_URLS.sprints, "sprints", [0.45, 0.25], 13);

  // Beat 1: Click Goals tab
  await tl.at(400);
  tl.showCaption("Click Goals to define strategic deliverables and key results.");
  await pressOn(tl, "[data-tl=sprints-tab-goals]", { ms: 600 });
  await tl.wait(400);

  // Beat 2: Click Create Goal
  await tl.at(2400);
  tl.showCaption("Click Create Goal to start tracking progress toward a milestone.");
  await pressOn(tl, "[data-tl=goals-create-goal-empty-btn]", { ms: 550 });
  await tl.wait(500);

  // Beat 3: Type Goal Name
  await tl.at(4600);
  tl.showCaption("Enter the objective name.");
  await pressOn(tl, "[data-tl=create-goal-name-input]", { ms: 500 });
  await typeIntoVar(
    tl,
    "[data-tl=create-goal-name-input]",
    "goalName",
    "Authentication Completion",
    { msPerChar: 40 }
  );
  await tl.wait(300);

  // Beat 4: Type Description
  await tl.at(7400);
  tl.showCaption("Provide details and scope for the objective.");
  await pressOn(tl, "[data-tl=create-goal-description-input]", { ms: 450 });
  await typeIntoVar(
    tl,
    "[data-tl=create-goal-description-input]",
    "goalDescription",
    "The full authentication must be completed so users can test it",
    { msPerChar: 30 }
  );
  await tl.wait(400);

  // Beat 5: Target Type: Percentage
  await tl.at(10800);
  tl.showCaption("Select Percentage as the measurement target type.");
  await pressOn(tl, "[data-tl=create-goal-target-type-select]", { ms: 500 });
  await tl.wait(300);
  await pressOn(tl, "[data-tl=target-type-option-percentage]", { ms: 450 });
  await tl.wait(400);

  // Beat 6: Target Value: 100
  await tl.at(12800);
  tl.showCaption("Set the target goal value.");
  await pressOn(tl, "[data-tl=create-goal-target-value-input]", { ms: 450 });
  await typeIntoVar(
    tl,
    "[data-tl=create-goal-target-value-input]",
    "goalTargetValue",
    "100",
    { msPerChar: 60 }
  );
  await tl.wait(300);

  // Beat 7: Due Date: pick 18
  await tl.at(14800);
  tl.showCaption("Select the target completion deadline.");
  await pressOn(tl, "[data-tl=create-goal-due-date-input]", { ms: 500 });
  await tl.wait(300);
  await pressOn(tl, "[data-tl=goal-date-day-18]", { ms: 450 });
  await tl.wait(400);

  // Beat 8: Submit Create Goal
  await tl.at(17000);
  tl.showCaption("Click Create Goal to save the objective.");
  await pressOn(tl, "[data-tl=create-goal-submit-btn]", { ms: 550 });
  await tl.wait(700);

  // Beat 9: Hover created goal card
  await tl.at(18800);
  tl.showCaption("The active goal card tracks target percentage and timeline.");
  await hoverOn(tl, "[data-tl=goal-card-goal-1]", { ms: 500 });
  await tl.wait(800);

  // Finish
  await tl.at(20200);
  tl.hideCaption();
  tl.clearHighlight();
  await finishProjects(tl);
}
