import type { Timeline } from "@/lib/timeline";
import { beginCrm, finishCrm, pressOn, hoverOn } from "@/components/crm/crm-timeline";

export const STEP25_DURATION_MS = 26000;

export async function runStep25(tl: Timeline) {
  beginCrm(tl, "crm-workflow-automation", {
    activeNav: "automations",
    workflowName: "New Contact Follow-up",
    selectedNodeId: "send-email",
    selectedAutomationTemplate: "Email 3 — Understand customer needs",
    isWorkflowSaved: false,
  });

  // Beat 1: Overview & Top bar
  await tl.at(400);
  tl.showCaption("Navigate to Automations to build event-driven workflows with a visual canvas.");
  await hoverOn(tl, "[data-tl=crm-workflow-name-input]", { ms: 600 });
  await tl.wait(1500);
  await hoverOn(tl, "[data-tl=crm-ai-automation-btn]", { ms: 500 });
  await tl.wait(1500);

  // Beat 2: Inspect Trigger Node
  await tl.at(5200);
  tl.showCaption("Examine the Trigger node configured to fire whenever a new contact record is created.");
  await pressOn(tl, "[data-tl=crm-node-record-created]");
  await tl.wait(2500);

  // Beat 3: Select and configure Send Email Action Node
  await tl.at(10500);
  tl.showCaption("Select the Send Email action node to configure recipient and email template settings.");
  await pressOn(tl, "[data-tl=crm-node-send-email]");
  await tl.wait(1500);
  await hoverOn(tl, "[data-tl=crm-automation-template-select]", { ms: 600 });
  await tl.wait(1500);
  await hoverOn(tl, "[data-tl=crm-automation-recipient-select]", { ms: 600 });
  await tl.wait(2000);

  // Beat 4: Inspect End Node
  await tl.at(17800);
  tl.showCaption("Inspect the End node terminating workflow execution after notification delivery.");
  await pressOn(tl, "[data-tl=crm-node-end]");
  await tl.wait(2500);

  // Beat 5: Save Workflow
  await tl.at(22000);
  tl.showCaption("Click Save Workflow to store your automation in the tutorial workspace.");
  await pressOn(tl, "[data-tl=crm-save-workflow-btn]");
  await tl.wait(2000);

  await finishCrm(tl);
}
