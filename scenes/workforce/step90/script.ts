import type { Timeline } from "@/lib/timeline";
import {
  beginWorkforce,
  finishWorkforce,
  hoverOn,
  pressOn,
  ring,
} from "@/components/workforce/workforce-timeline";
import { CAPTIONS, URLS } from "./data";

export const STEP90_DURATION_MS = 14500;

export async function runStep90(tl: Timeline) {
  beginWorkforce(tl, URLS.compliancePolicyReview, "compliance", "overview", [0.12, 0.72], true);
  tl.setVar("wfComplianceView", "policy-details");
  tl.setVar("wfLifecycleTab", "onboarding");
  tl.setVar("wfOnboardingPill", "dashboard");
  tl.setVar("wfOnboardingStatusFilter", "Active");
  tl.setVar("wfOnboardingSubpage", "dashboard");

  // 1. Click Lifecycle in sidebar
  await tl.at(500);
  tl.showCaption(CAPTIONS.clickLifecycle);
  await pressOn(tl, "[data-tl=nav-lifecycle]", { ms: 600 });
  tl.setVar("wfPage", "lifecycle-onboarding");
  tl.setUrl(URLS.onboardingAdmin);
  await tl.wait(400);

  // 2. Ring stat cards
  await tl.at(3000);
  tl.showCaption(CAPTIONS.ringStatCards);
  await hoverOn(tl, "[data-tl=card-onboarding-active]", { ms: 500 });
  await ring(tl, "[data-tl=card-onboarding-active]", 1200);

  await tl.at(4800);
  await hoverOn(tl, "[data-tl=card-onboarding-awaiting]", { ms: 450 });
  await ring(tl, "[data-tl=card-onboarding-awaiting]", 1200);

  await tl.at(6500);
  await hoverOn(tl, "[data-tl=card-onboarding-overdue]", { ms: 450 });
  await ring(tl, "[data-tl=card-onboarding-overdue]", 1200);

  // 3. Open status filter and choose Completed
  await tl.at(8500);
  tl.showCaption(CAPTIONS.filterCompleted);
  await pressOn(tl, "[data-tl=select-onboarding-status]", { ms: 500 });
  await tl.wait(300);

  await tl.at(9800);
  await hoverOn(tl, "[data-tl=opt-status-completed]", { ms: 350 });
  await pressOn(tl, "[data-tl=opt-status-completed]", { ms: 400 });
  tl.setVar("wfOnboardingStatusFilter", "Completed");
  await tl.wait(400);

  // 4. Ring completed row
  await tl.at(11500);
  tl.showCaption(CAPTIONS.ringCompletedRow);
  await hoverOn(tl, "[data-tl=row-onboarding-alex]", { ms: 500 });
  await ring(tl, "[data-tl=row-onboarding-alex]", 1800);

  // Finish
  await tl.at(13800);
  await finishWorkforce(tl);
}
