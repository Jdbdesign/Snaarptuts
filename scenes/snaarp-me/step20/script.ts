import type { Timeline } from "@/lib/timeline";
import {
  beginMe,
  finishMe,
  pressOn,
  hoverOn,
} from "@/components/me/me-timeline";
import {
  ME_URLS,
  CREATED_CUSTOM_WORKFLOW,
  NOTIFY_ME_SAVED_WORKFLOW,
  type WorkflowItem,
} from "@/components/me/me-data";
import { STEP20_DATA } from "./data";

export const STEP20_DURATION_MS = STEP20_DATA.durationMs;

export async function runStep20(tl: Timeline) {
  beginMe(tl, ME_URLS.workflows, "workflows", [0.45, 0.35], 20);

  // Setup initial workflow list with both saved notify me and the created custom workflow
  const cur = tl.getVar<WorkflowItem[]>("meWorkflows", []);
  tl.setVar("meWorkflows", [
    NOTIFY_ME_SAVED_WORKFLOW,
    ...cur.filter((w) => w.id !== NOTIFY_ME_SAVED_WORKFLOW.id),
    CREATED_CUSTOM_WORKFLOW,
  ]);

  // Beat 1: Hover and click Delete on custom workflow
  await tl.at(400);
  tl.showCaption(STEP20_DATA.captions.clickDelete);
  await hoverOn(tl, "[data-tl=me-custom-workflow-card-custom-workflow-created]", { ms: 600, ring: false });
  await tl.wait(400);
  await pressOn(tl, "[data-tl=me-custom-workflow-delete-custom-workflow-created]", { ms: 600 });
  await tl.wait(600);

  // Beat 2: Confirm in modal
  await tl.at(3600);
  tl.showCaption(STEP20_DATA.captions.confirmModal);
  await pressOn(tl, "[data-tl=me-delete-workflow-confirm]", { ms: 650 });
  await tl.wait(800);

  // Beat 3: Deleted notice & banner
  await tl.at(6800);
  tl.showCaption(STEP20_DATA.captions.deletedNotice);
  await hoverOn(tl, "[data-tl=me-workflows-banner]", { ms: 500, ring: true });
  await tl.wait(1800);

  // Finish
  await tl.at(9800);
  tl.hideCaption();
  tl.clearHighlight();
  await finishMe(tl);
}
