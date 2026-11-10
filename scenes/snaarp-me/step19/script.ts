import type { Timeline } from "@/lib/timeline";
import {
  beginMe,
  finishMe,
  pressOn,
  typeIntoVar,
  hoverOn,
} from "@/components/me/me-timeline";
import { ME_URLS, NOTIFY_ME_SAVED_WORKFLOW, type WorkflowItem } from "@/components/me/me-data";
import { STEP19_DATA } from "./data";

export const STEP19_DURATION_MS = STEP19_DATA.durationMs;

export async function runStep19(tl: Timeline) {
  beginMe(tl, ME_URLS.workflows, "workflows", [0.45, 0.35], 19);

  // Setup initial workflow list
  const cur = tl.getVar<WorkflowItem[]>("meWorkflows", []);
  tl.setVar("meWorkflows", [NOTIFY_ME_SAVED_WORKFLOW, ...cur.filter((w) => w.id !== NOTIFY_ME_SAVED_WORKFLOW.id)]);

  // Beat 1: Click Custom workflow
  await tl.at(400);
  tl.showCaption(STEP19_DATA.captions.clickCustom);
  await pressOn(tl, "[data-tl=me-workflows-custom-btn]", { ms: 650 });
  await tl.wait(600);

  // Beat 2: Set Trigger -> Meeting Started
  await tl.at(2600);
  tl.showCaption(STEP19_DATA.captions.setTrigger);
  await pressOn(tl, "[data-tl=me-editor-trigger-select]", { ms: 600 });
  await tl.wait(350);
  await pressOn(tl, "[data-tl=me-editor-trigger-meeting-started]", { ms: 500 });
  await tl.wait(600);

  // Beat 3: Set Recipient -> Both
  await tl.at(5500);
  tl.showCaption(STEP19_DATA.captions.setRecipient);
  await pressOn(tl, "[data-tl=me-editor-recipient-select]", { ms: 550 });
  await tl.wait(350);
  await pressOn(tl, "[data-tl=me-editor-recipient-both]", { ms: 500 });
  await tl.wait(600);

  // Beat 4: Set Subject
  await tl.at(8200);
  tl.showCaption(STEP19_DATA.captions.setSubject);
  await pressOn(tl, "[data-tl=me-editor-subject-input]", { ms: 500 });
  await typeIntoVar(tl, "[data-tl=me-editor-subject-input]", "meEditorSubject", "Your {{event_title}}", { msPerChar: 35 });
  await tl.wait(600);

  // Beat 5: Click Create Workflow
  await tl.at(10800);
  tl.showCaption(STEP19_DATA.captions.createWorkflow);
  await pressOn(tl, "[data-tl=me-editor-create-btn]", { ms: 650 });
  await tl.wait(600);

  await hoverOn(tl, "[data-tl=me-custom-workflow-card-custom-workflow-created]", { ms: 600, ring: true });
  await tl.wait(1200);

  // Finish
  await tl.at(13500);
  tl.hideCaption();
  tl.clearHighlight();
  await finishMe(tl);
}
