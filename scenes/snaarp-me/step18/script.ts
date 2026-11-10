import type { Timeline } from "@/lib/timeline";
import {
  beginMe,
  finishMe,
  pressOn,
  hoverOn,
} from "@/components/me/me-timeline";
import { ME_URLS, NOTIFY_ME_SAVED_WORKFLOW, type WorkflowItem } from "@/components/me/me-data";
import { STEP18_DATA } from "./data";

export const STEP18_DURATION_MS = STEP18_DATA.durationMs;

export async function runStep18(tl: Timeline) {
  beginMe(tl, `${ME_URLS.workflows}/notify-me`, "workflow-detail", [0.45, 0.35], 18);

  // Setup initial workflow list with Notify me active and saved, and empty logs for notify-me
  const cur = tl.getVar<WorkflowItem[]>("meWorkflows", []);
  tl.setVar("meWorkflows", [NOTIFY_ME_SAVED_WORKFLOW, ...cur.filter((w) => w.id !== NOTIFY_ME_SAVED_WORKFLOW.id)]);
  tl.setVar("meDetailWorkflowId", "notify-me");
  tl.setVar("meLogsWorkflowId", "notify-me");
  tl.setVar("meWorkflowLogs", []);

  // Beat 1: Click View Logs on notify-me
  await tl.at(400);
  tl.showCaption(STEP18_DATA.captions.viewLogs);
  await pressOn(tl, "[data-tl=me-detail-logs-btn]", { ms: 650 });
  await tl.wait(600);

  // Beat 2: Empty logs notice
  await tl.at(2500);
  tl.showCaption(STEP18_DATA.captions.emptyLogs);
  await hoverOn(tl, "[data-tl=me-logs-empty]", { ms: 600, ring: true });
  await tl.wait(1400);

  // Beat 3: All Workflows -> click Logs on Booking Confirmation
  await tl.at(5200);
  tl.showCaption(STEP18_DATA.captions.checkExisting);
  await pressOn(tl, "[data-tl=me-logs-all-workflows-btn]", { ms: 600 });
  await tl.wait(500);
  await pressOn(tl, "[data-tl=me-workflow-logs-booking-confirmation]", { ms: 650 });
  await tl.wait(600);

  // Beat 4: Filter by status
  await tl.at(9200);
  tl.showCaption(STEP18_DATA.captions.filterStatus);
  await pressOn(tl, "[data-tl=me-logs-status-select]", { ms: 600 });
  await tl.wait(400);
  await pressOn(tl, "[data-tl=me-logs-filter-pending]", { ms: 500 });
  await tl.wait(1800);

  // Finish
  await tl.at(13600);
  tl.hideCaption();
  tl.clearHighlight();
  await finishMe(tl);
}
