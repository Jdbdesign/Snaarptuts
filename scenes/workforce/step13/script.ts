import type { Timeline } from "@/lib/timeline";
import { beginWorkforce } from "@/components/workforce/workforce-timeline";
import { CAPTIONS, URLS } from "./data";

export const STEP13_DURATION_MS = 18000;

export async function runStep13(tl: Timeline) {
  beginWorkforce(tl, URLS.onboardingRecord, "onboarding-record");
  tl.setVar("wfActiveRecordTab", "checklist");

  // 1. Checklist tab overview
  await tl.at(500);
  tl.showCaption(CAPTIONS.checklist);
  await tl.moveCursorTo("[data-tl=tab-rec-checklist]", { ms: 600 });
  tl.highlight("[data-tl=rec-checklist-content]");

  // 2. Click Upload identity document
  await tl.at(4500);
  tl.clearHighlight();
  tl.showCaption(CAPTIONS.openTask);
  await tl.moveCursorTo("[data-tl=rec-task-upload-id]", { ms: 600 });
  await tl.click("[data-tl=rec-task-upload-id]");
  tl.setVar("wfPage", "task-detail");
  tl.setUrl(URLS.taskDetail);

  // 3. Task detail page
  await tl.at(8500);
  tl.showCaption(CAPTIONS.taskDetail);
  await tl.moveCursorTo("[data-tl=card-task-detail]", { ms: 600 });
  tl.highlight("[data-tl=card-task-detail]");

  await tl.at(11500);
  await tl.moveCursorTo("[data-tl=btn-view-identity-pdf]", { ms: 600 });

  // 4. Click Back
  await tl.at(14000);
  tl.clearHighlight();
  tl.showCaption(CAPTIONS.back);
  await tl.moveCursorTo("[data-tl=btn-back-task-detail]", { ms: 600 });
  await tl.click("[data-tl=btn-back-task-detail]");
  tl.setVar("wfPage", "onboarding-record");
  tl.setVar("wfActiveRecordTab", "checklist");
  tl.setUrl(URLS.onboardingRecord);

  await tl.at(17200);
  tl.hideCaption();
  await tl.at(STEP13_DURATION_MS);
}
