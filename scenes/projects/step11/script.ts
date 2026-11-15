import type { Timeline } from "@/lib/timeline";
import {
  beginProjects,
  finishProjects,
  hoverOn,
  pressOn,
  typeIntoVar,
} from "@/components/projects/projects-timeline";
import { PROJECTS_URLS } from "@/components/projects/projects-data";

export const STEP11_DURATION_MS = 21000;

export async function runStep11(tl: Timeline) {
  beginProjects(tl, PROJECTS_URLS.sprints, "sprints", [0.45, 0.25], 11);

  // Beat 1: Click + New Sprint
  await tl.at(400);
  tl.showCaption("Click + New Sprint to plan and launch a development sprint.");
  await pressOn(tl, "[data-tl=sprints-new-sprint-btn]", { ms: 600 });
  await tl.wait(400);

  // Beat 2: Type sprint name
  await tl.at(2400);
  tl.showCaption("Enter the sprint title.");
  await pressOn(tl, "[data-tl=new-sprint-name-input]", { ms: 500 });
  await typeIntoVar(
    tl,
    "[data-tl=new-sprint-name-input]",
    "newSprintName",
    "Onboarding Flow",
    { msPerChar: 40 }
  );
  await tl.wait(300);

  // Beat 3: Type sprint goal
  await tl.at(4800);
  tl.showCaption("Describe the primary objective for this sprint.");
  await pressOn(tl, "[data-tl=new-sprint-goal-input]", { ms: 450 });
  await typeIntoVar(
    tl,
    "[data-tl=new-sprint-goal-input]",
    "newSprintGoal",
    "Build the whole authentication flow from get started to the Home screen",
    { msPerChar: 30 }
  );
  await tl.wait(400);

  // Beat 4: Select Start Date
  await tl.at(8200);
  tl.showCaption("Select the start date.");
  await pressOn(tl, "[data-tl=new-sprint-start-date-input]", { ms: 500 });
  await tl.wait(300);
  await pressOn(tl, "[data-tl=sprint-start-date-day-16]", { ms: 450 });
  await tl.wait(400);

  // Beat 5: Select End Date
  await tl.at(10500);
  tl.showCaption("Select the target end date.");
  await pressOn(tl, "[data-tl=new-sprint-end-date-input]", { ms: 500 });
  await tl.wait(300);
  await pressOn(tl, "[data-tl=sprint-end-date-day-18]", { ms: 450 });
  await tl.wait(400);

  // Beat 6: Story Point Capacity
  await tl.at(12800);
  tl.showCaption("Set the team's story point capacity.");
  await pressOn(tl, "[data-tl=new-sprint-capacity-input]", { ms: 450 });
  await typeIntoVar(
    tl,
    "[data-tl=new-sprint-capacity-input]",
    "newSprintCapacity",
    "40",
    { msPerChar: 80 }
  );
  await tl.wait(300);

  // Beat 7: Select Project
  await tl.at(14800);
  tl.showCaption("Assign the sprint to your project.");
  await pressOn(tl, "[data-tl=new-sprint-project-select]", { ms: 500 });
  await tl.wait(350);
  await pressOn(
    tl,
    "[data-tl=sprint-project-option-explore-snaarp-projects-]",
    { ms: 450 }
  );
  await tl.wait(400);

  // Beat 8: Submit Create Sprint
  await tl.at(17000);
  tl.showCaption("Click Create Sprint to initialize the iteration.");
  await pressOn(tl, "[data-tl=new-sprint-submit-btn]", { ms: 550 });
  await tl.wait(600);

  // Beat 9: Inspect created sprint row
  await tl.at(18800);
  tl.showCaption("The new sprint is created with status Planning.");
  await hoverOn(tl, "[data-tl=sprint-edit-btn-sprint-1]", { ms: 500 });
  await tl.wait(400);
  await hoverOn(tl, "[data-tl=sprint-delete-btn-sprint-1]", { ms: 450 });
  await tl.wait(700);

  // Finish
  await tl.at(20200);
  tl.hideCaption();
  tl.clearHighlight();
  await finishProjects(tl);
}
