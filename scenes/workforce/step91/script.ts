import type { Timeline } from "@/lib/timeline";
import {
  beginWorkforce,
  finishWorkforce,
  hoverOn,
  pressOn,
  ring,
} from "@/components/workforce/workforce-timeline";
import { CAPTIONS, URLS } from "./data";

export const STEP91_DURATION_MS = 16500;

export async function runStep91(tl: Timeline) {
  beginWorkforce(tl, URLS.onboardingAdmin, "lifecycle-onboarding", "overview", [0.92, 0.46], true);
  tl.setVar("wfLifecycleTab", "onboarding");
  tl.setVar("wfOnboardingPill", "dashboard");
  tl.setVar("wfOnboardingStatusFilter", "Completed");
  tl.setVar("wfOnboardingSubpage", "dashboard");
  tl.setVar("wfOnboardingRecordTab", "overview");

  // 1. Click View on Alex Morgan record
  await tl.at(500);
  tl.showCaption(CAPTIONS.clickViewRecord);
  await pressOn(tl, "[data-tl=btn-view-onboarding-record]", { ms: 600 });
  tl.setVar("wfOnboardingSubpage", "record");
  tl.setUrl(URLS.onboardingRecordAdmin);
  await tl.wait(400);

  // 2. Ring 100% completion card
  await tl.at(2800);
  tl.showCaption(CAPTIONS.ringCompletion);
  await hoverOn(tl, "[data-tl=card-record-completion]", { ms: 500 });
  await ring(tl, "[data-tl=card-record-completion]", 1800);

  // 3. Click Checklist tab and ring items
  await tl.at(5400);
  tl.showCaption(CAPTIONS.clickChecklist);
  await pressOn(tl, "[data-tl=tab-record-checklist]", { ms: 500 });
  tl.setVar("wfOnboardingRecordTab", "checklist");
  await tl.wait(300);
  await hoverOn(tl, "[data-tl=checklist-tasks-container]", { ms: 500 });
  await ring(tl, "[data-tl=checklist-tasks-container]", 2000);

  // 4. Click Documents tab and ring
  await tl.at(8800);
  tl.showCaption(CAPTIONS.clickDocuments);
  await pressOn(tl, "[data-tl=tab-record-documents]", { ms: 500 });
  tl.setVar("wfOnboardingRecordTab", "documents");
  await tl.wait(300);
  await hoverOn(tl, "[data-tl=documents-container]", { ms: 500 });
  await ring(tl, "[data-tl=documents-container]", 2000);

  // 5. Click Activity tab and ring
  await tl.at(12200);
  tl.showCaption(CAPTIONS.clickActivity);
  await pressOn(tl, "[data-tl=tab-record-activity]", { ms: 500 });
  tl.setVar("wfOnboardingRecordTab", "activity");
  await tl.wait(300);
  await hoverOn(tl, "[data-tl=activity-container]", { ms: 500 });
  await ring(tl, "[data-tl=activity-container]", 2000);

  // Finish
  await tl.at(15800);
  await finishWorkforce(tl);
}
