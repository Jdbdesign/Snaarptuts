import type { Timeline } from "@/lib/timeline";
import {
  beginMe,
  finishMe,
  pressOn,
} from "@/components/me/me-timeline";
import { ME_URLS, NOTIFY_ME_WORKFLOW, type WorkflowItem } from "@/components/me/me-data";
import { STEP16_DATA } from "./data";

export const STEP16_DURATION_MS = STEP16_DATA.durationMs;

export async function runStep16(tl: Timeline) {
  beginMe(tl, ME_URLS.workflows, "workflows", [0.45, 0.35], 16);

  // Setup initial workflow list with Notify me active
  const cur = tl.getVar<WorkflowItem[]>("meWorkflows", []);
  tl.setVar("meWorkflows", [NOTIFY_ME_WORKFLOW, ...cur.filter((w) => w.id !== NOTIFY_ME_WORKFLOW.id)]);

  // Beat 1: Toggle Off
  await tl.at(400);
  tl.showCaption(STEP16_DATA.captions.toggleOff);
  await pressOn(tl, "[data-tl=me-workflow-toggle-notify-me]", { ms: 650 });
  await tl.wait(1200);

  // Beat 2: Paused Notice
  await tl.at(3600);
  tl.showCaption(STEP16_DATA.captions.pausedNotice);
  await tl.wait(1800);

  // Beat 3: Toggle On
  await tl.at(5800);
  tl.showCaption(STEP16_DATA.captions.toggleOn);
  await pressOn(tl, "[data-tl=me-workflow-toggle-notify-me]", { ms: 650 });
  await tl.wait(1600);

  // Finish
  await tl.at(8800);
  tl.hideCaption();
  tl.clearHighlight();
  await finishMe(tl);
}
