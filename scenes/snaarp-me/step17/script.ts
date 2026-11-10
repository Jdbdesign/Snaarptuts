import type { Timeline } from "@/lib/timeline";
import {
  beginMe,
  finishMe,
  pressOn,
} from "@/components/me/me-timeline";
import { ME_URLS, NOTIFY_ME_WORKFLOW, type WorkflowItem } from "@/components/me/me-data";
import { STEP17_DATA } from "./data";

export const STEP17_DURATION_MS = STEP17_DATA.durationMs;

export async function runStep17(tl: Timeline) {
  beginMe(tl, ME_URLS.workflows, "workflows", [0.45, 0.35], 17);

  // Setup initial workflow list with Notify me active
  const cur = tl.getVar<WorkflowItem[]>("meWorkflows", []);
  tl.setVar("meWorkflows", [NOTIFY_ME_WORKFLOW, ...cur.filter((w) => w.id !== NOTIFY_ME_WORKFLOW.id)]);

  // Beat 1: Click Edit emails
  await tl.at(400);
  tl.showCaption(STEP17_DATA.captions.clickEdit);
  await pressOn(tl, "[data-tl=me-workflow-edit-notify-me]", { ms: 650 });
  await tl.wait(600);

  // Beat 2: Enable 3 reminder toggles
  await tl.at(2500);
  tl.showCaption(STEP17_DATA.captions.turnOnReminders);
  await pressOn(tl, "[data-tl=me-detail-toggle-24h]", { ms: 500 });
  await tl.wait(250);
  await pressOn(tl, "[data-tl=me-detail-toggle-1h]", { ms: 450 });
  await tl.wait(250);
  await pressOn(tl, "[data-tl=me-detail-toggle-15m]", { ms: 450 });
  await tl.wait(600);

  // Beat 3: Recipient dropdown -> Both
  await tl.at(6500);
  tl.showCaption(STEP17_DATA.captions.chooseRecipient);
  await pressOn(tl, "[data-tl=me-detail-recipient-select]", { ms: 600 });
  await tl.wait(400);
  await pressOn(tl, "[data-tl=me-detail-recipient-both]", { ms: 500 });
  await tl.wait(800);

  // Beat 4: Click Save changes
  await tl.at(9800);
  tl.showCaption(STEP17_DATA.captions.saveChanges);
  await pressOn(tl, "[data-tl=me-detail-save-btn]", { ms: 650 });
  await tl.wait(800);

  // Beat 5: Saved notice
  await tl.at(12200);
  tl.showCaption(STEP17_DATA.captions.saved);
  await tl.wait(1400);

  // Finish
  await tl.at(13900);
  tl.hideCaption();
  tl.clearHighlight();
  await finishMe(tl);
}
