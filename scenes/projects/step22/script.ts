import type { Timeline } from "@/lib/timeline";
import {
  beginProjects,
  finishProjects,
  pressOn,
  pushProjectsToast,
} from "@/components/projects/projects-timeline";
import {
  PROJECTS_URLS,
  type AutomationRule,
} from "@/components/projects/projects-data";

export const STEP22_DURATION_MS = 21500;

export async function runStep22(tl: Timeline) {
  beginProjects(tl, PROJECTS_URLS.automations, "automations", [0.45, 0.35], 22);

  // Beat 1: Click History tab
  await tl.at(400);
  tl.showCaption("Click History to view automation audit logs.");
  await pressOn(tl, "[data-tl=auto-tab-history]", { ms: 600 });
  tl.setVar("automationsActiveTab", "history");
  await tl.wait(800);

  // Beat 2: Click Templates tab
  await tl.at(2800);
  tl.showCaption("Click Templates to discover prebuilt automation workflows.");
  await pressOn(tl, "[data-tl=auto-tab-templates]", { ms: 550 });
  tl.setVar("automationsActiveTab", "templates");
  await tl.wait(800);

  // Beat 3: Click Use on Triage new tasks
  await tl.at(5400);
  tl.showCaption("Click Use on Triage new tasks to prefill a new automation.");
  await pressOn(tl, "[data-tl=template-use-btn-tmpl-triage]", { ms: 550 });
  tl.setVar("automationFormMode", "create");
  tl.setVar("automationFormName", "Triage new tasks");
  tl.setVar("automationFormTrigger", "Task Created");
  tl.setVar("automationConditionsCount", 1);
  tl.setVar("automationActionsCount", 1);
  tl.setVar("automationsActiveTab", "rules");
  tl.setVar("isAutomationFormOpen", true);
  await tl.wait(600);

  // Beat 4: Click Create Automation
  await tl.at(7800);
  tl.showCaption("Click Create Automation to activate the template.");
  await pressOn(tl, "[data-tl=automation-submit-btn]", { ms: 500 });
  const existingRules = tl.getVar<AutomationRule[]>("automationRulesList", []);
  const triageRule: AutomationRule = {
    id: "rule-triage-tasks",
    name: "Triage new tasks",
    trigger: "Task Created",
    conditionsCount: 1,
    actionsCount: 1,
    enabled: true,
  };
  tl.setVar("automationRulesList", [...existingRules, triageRule]);
  tl.setVar("isAutomationFormOpen", false);
  pushProjectsToast(tl, "Automation created", "success");
  await tl.wait(700);

  // Beat 5: Toggle rule off, then on
  await tl.at(10400);
  tl.showCaption("Toggle Assign Task to Team off to pause execution.");
  await pressOn(tl, "[data-tl=auto-rule-toggle-rule-assign-team]", { ms: 500 });
  const r1 = tl.getVar<AutomationRule[]>("automationRulesList", []);
  tl.setVar(
    "automationRulesList",
    r1.map((r) => (r.id === "rule-assign-team" ? { ...r, enabled: false } : r))
  );
  await tl.wait(600);

  await tl.at(11800);
  await pressOn(tl, "[data-tl=auto-rule-toggle-rule-assign-team]", { ms: 450 });
  const r2 = tl.getVar<AutomationRule[]>("automationRulesList", []);
  tl.setVar(
    "automationRulesList",
    r2.map((r) => (r.id === "rule-assign-team" ? { ...r, enabled: true } : r))
  );
  await tl.wait(500);

  // Beat 6: Edit rule
  await tl.at(13400);
  tl.showCaption("Click the pencil icon to inspect and edit the automation conditions.");
  await pressOn(tl, "[data-tl=auto-rule-edit-rule-assign-team]", { ms: 500 });
  tl.setVar("automationFormMode", "edit");
  tl.setVar("automationFormName", "Assign Task to Team");
  tl.setVar("automationFormTrigger", "Task Created");
  tl.setVar("automationConditionsCount", 3);
  tl.setVar("automationActionsCount", 2);
  tl.setVar("isAutomationFormOpen", true);
  await tl.wait(800);

  await tl.at(15200);
  await pressOn(tl, "[data-tl=automation-form-close-btn]", { ms: 450 });
  tl.setVar("isAutomationFormOpen", false);
  await tl.wait(500);

  // Beat 7: Click delete on Assign Task to Team
  await tl.at(16800);
  tl.showCaption("Click Delete to remove obsolete automations.");
  await pressOn(tl, "[data-tl=auto-rule-delete-rule-assign-team]", { ms: 500 });
  tl.setVar("deleteAutomationRuleId", "rule-assign-team");
  await tl.wait(600);

  // Beat 8: Confirm deletion
  await tl.at(19000);
  tl.showCaption("Confirm deletion to clean up your rules.");
  await pressOn(tl, "[data-tl=delete-automation-confirm]", { ms: 500 });
  const r3 = tl.getVar<AutomationRule[]>("automationRulesList", []);
  tl.setVar(
    "automationRulesList",
    r3.filter((r) => r.id !== "rule-assign-team")
  );
  tl.setVar("deleteAutomationRuleId", null);
  pushProjectsToast(tl, "Automation deleted", "success");

  await finishProjects(tl, STEP22_DURATION_MS);
}
