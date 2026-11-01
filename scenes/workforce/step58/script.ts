import type { Timeline } from "@/lib/timeline";
import {
  beginWorkforce,
  finishWorkforce,
  hoverOn,
  pressOn,
  ring,
} from "@/components/workforce/workforce-timeline";
import { CAPTIONS, URLS } from "./data";

export const STEP58_DURATION_MS = 18500;

export async function runStep58(tl: Timeline) {
  beginWorkforce(tl, URLS.cycleNew, "cycle-new", "overview", [0.5, 0.75], true);
  tl.setVar("wfCycleOverridesOpen", false);

  // 1. Scroll to Stage deadlines & open Self Review Due calendar
  await tl.at(500);
  tl.showCaption(CAPTIONS.selfReviewDue);
  await tl.scrollPanelTo("[data-scroller]", "[data-tl=card-stage-deadlines]", 600);
  await pressOn(tl, "[data-tl=input-self-due]", { ms: 600 });
  tl.setVar("wfCycleSelfDueOpen", true);
  await tl.wait(300);

  await tl.at(3200);
  await hoverOn(tl, "[data-tl=cal-day-30]", { ms: 500 });
  await ring(tl, "[data-tl=cal-day-30]", 1000);
  await pressOn(tl, "[data-tl=cal-day-30]", { ms: 400 });
  tl.setVar("wfCycleSelfDueOpen", false);
  await tl.wait(300);

  // 2. Fallback reviewer select
  await tl.at(6000);
  tl.showCaption(CAPTIONS.fallbackReviewer);
  await tl.scrollPanelTo("[data-scroller]", "[data-tl=select-fallback-reviewer]", 500);
  await pressOn(tl, "[data-tl=select-fallback-reviewer]", { ms: 500 });
  tl.setVar("wfCycleFallbackSelectOpen", true);
  await tl.wait(300);
  await hoverOn(tl, "[data-tl=fallback-opt-sam-taylor]", { ms: 450 });
  await tl.wait(300);
  await pressOn(tl, "[data-tl=fallback-opt-line-manager]", { ms: 450 });
  tl.setVar("wfCycleFallbackSelectOpen", false);

  // 3. Questions template select
  await tl.at(9500);
  tl.showCaption(CAPTIONS.questionsTemplate);
  await tl.scrollPanelTo("[data-scroller]", "[data-tl=card-review-questions]", 500);
  await pressOn(tl, "[data-tl=select-questions-template]", { ms: 500 });
  tl.setVar("wfCycleQuestionsSelectOpen", true);
  await tl.wait(300);
  await hoverOn(tl, "[data-tl=template-opt-annual]", { ms: 400 });
  await tl.wait(250);
  await hoverOn(tl, "[data-tl=template-opt-360]", { ms: 400 });
  await tl.wait(250);
  await pressOn(tl, "[data-tl=template-opt-standard]", { ms: 400 });
  tl.setVar("wfCycleQuestionsSelectOpen", false);

  // 4. Cancel button returns to Appraisal Management
  await tl.at(13500);
  tl.showCaption(CAPTIONS.cancelForm);
  await tl.scrollPanelTo("[data-scroller]", "[data-tl=btn-cycle-cancel]", 500);
  await pressOn(tl, "[data-tl=btn-cycle-cancel]", { ms: 600 });
  tl.setVar("wfPage", "appraisal-management");
  tl.setUrl(URLS.appraisalManagement);
  await tl.wait(300);

  // 5. Finish
  await tl.at(17800);
  finishWorkforce(tl);
}
