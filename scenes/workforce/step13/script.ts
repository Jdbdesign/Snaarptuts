import type { Timeline } from "@/lib/timeline";
import { beginWorkforce, finishWorkforce, hoverOn, pressOn, ring } from "@/components/workforce/workforce-timeline";
import { CAPTIONS, URLS } from "./data";

export const STEP13_DURATION_MS = 18000;

export async function runStep13(tl: Timeline) {
  beginWorkforce(tl, URLS.onboardingRecord, "onboarding-record");
  tl.setVar("wfActiveRecordTab", "checklist");

  // 1. Checklist tab overview
  await tl.at(500);
  tl.showCaption(CAPTIONS.checklist);
  await hoverOn(tl, "[data-tl=tab-rec-checklist]", { ms: 600 });
  await ring(tl, "[data-tl=rec-checklist-content]", 2400);

  // 2. Click Upload identity document
  await tl.at(4500);
  tl.showCaption(CAPTIONS.openTask);
  await pressOn(tl, "[data-tl=rec-task-upload-id]", { ms: 600 });
  tl.setVar("wfPage", "task-detail");
  tl.setUrl(URLS.taskDetail);
  await tl.wait(250);

  // 3. Task detail page
  await tl.at(8500);
  tl.showCaption(CAPTIONS.taskDetail);
  await hoverOn(tl, "[data-tl=card-task-detail]", { ms: 600 });
  await ring(tl, "[data-tl=card-task-detail]", 1800);

  await tl.at(11200);
  await hoverOn(tl, "[data-tl=btn-view-identity-pdf]", { ms: 550 });
  await ring(tl, "[data-tl=btn-view-identity-pdf]", 1600);

  // 4. Click Back
  await tl.at(14000);
  tl.showCaption(CAPTIONS.back);
  await pressOn(tl, "[data-tl=btn-back-task-detail]", { ms: 600 });
  tl.setVar("wfPage", "onboarding-record");
  tl.setVar("wfActiveRecordTab", "checklist");
  tl.setUrl(URLS.onboardingRecord);
  await tl.wait(250);

  // 5. End fade
  await finishWorkforce(tl, 17200, STEP13_DURATION_MS);
}
