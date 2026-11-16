import type { Timeline } from "@/lib/timeline";
import {
  beginProjects,
  finishProjects,
  pressOn,
  typeIntoVar,
} from "@/components/projects/projects-timeline";
import { PROJECTS_URLS } from "@/components/projects/projects-data";

export const STEP21_DURATION_MS = 19500;

export async function runStep21(tl: Timeline) {
  beginProjects(tl, PROJECTS_URLS.documents, "documents", [0.12, 0.45], 21);

  // Beat 1: Click Automations in the sidebar
  await tl.at(400);
  tl.showCaption("Click Automations in the sidebar to automate workflow rules.");
  await pressOn(tl, "[data-tl=nav-automations]", { ms: 600 });
  tl.setUrl(PROJECTS_URLS.automations);
  tl.setVar("projectsView", "automations");
  await tl.wait(500);

  // Beat 2: Click "+ New Automation"
  await tl.at(2500);
  tl.showCaption("Click New Automation to build a workflow rule.");
  await pressOn(tl, "[data-tl=new-automation-btn]", { ms: 600 });
  tl.setVar("automationFormMode", "create");
  tl.setVar("automationFormName", "");
  tl.setVar("automationFormTrigger", "Task Created");
  tl.setVar("automationConditionsCount", 0);
  tl.setVar("automationActionsCount", 1);
  tl.setVar("isAutomationFormOpen", true);
  await tl.wait(500);

  // Beat 3: Type name
  await tl.at(4800);
  tl.showCaption("Name the automation Assign Task to Team.");
  await pressOn(tl, "[data-tl=automation-name-input]", { ms: 500 });
  await typeIntoVar(
    tl,
    "[data-tl=automation-name-input]",
    "automationFormName",
    "Assign Task to Team",
    { msPerChar: 55 }
  );
  await tl.wait(500);

  // Beat 4: Select trigger
  await tl.at(7600);
  tl.showCaption("Set the trigger to Task Created.");
  await pressOn(tl, "[data-tl=automation-trigger-select]", { ms: 500 });
  tl.setVar("automationFormTrigger", "Task Created");
  await tl.wait(500);

  // Beat 5: Add conditions
  await tl.at(9800);
  tl.showCaption("Add conditions to target high-priority design tasks.");
  await pressOn(tl, "[data-tl=add-condition-btn]", { ms: 500 });
  tl.setVar("automationConditionsCount", 1);
  await tl.wait(400);

  await tl.at(11400);
  await pressOn(tl, "[data-tl=add-condition-btn]", { ms: 450 });
  tl.setVar("automationConditionsCount", 2);
  await tl.wait(400);

  await tl.at(13000);
  await pressOn(tl, "[data-tl=add-condition-btn]", { ms: 450 });
  tl.setVar("automationConditionsCount", 3);
  await tl.wait(500);

  // Beat 6: Add action
  await tl.at(14600);
  tl.showCaption("Add actions to assign team members and escalate priority.");
  await pressOn(tl, "[data-tl=add-action-btn]", { ms: 500 });
  tl.setVar("automationActionsCount", 2);
  await tl.wait(500);

  // Beat 7: Click Create Automation
  await tl.at(16800);
  tl.showCaption("Click Create Automation to save and activate your rule.");
  await pressOn(tl, "[data-tl=automation-submit-btn]", { ms: 500 });

  await finishProjects(tl, STEP21_DURATION_MS);
}
