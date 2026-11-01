import type { Timeline } from "@/lib/timeline";
import {
  beginWorkforce,
  finishWorkforce,
  hoverOn,
  pressOn,
  ring,
} from "@/components/workforce/workforce-timeline";
import { CAPTIONS, URLS } from "./data";

export const STEP57_DURATION_MS = 21000;

export async function runStep57(tl: Timeline) {
  beginWorkforce(tl, URLS.cycleNew, "cycle-new", "overview", [0.5, 0.45], true);
  tl.setVar("wfCycleOverridesOpen", false);

  // 1. Open reviewer overrides accordion
  await tl.at(500);
  tl.showCaption(CAPTIONS.openOverrides);
  await pressOn(tl, "[data-tl=accordion-overrides-btn]", { ms: 600 });
  tl.setVar("wfCycleOverridesOpen", true);
  await tl.wait(300);

  // 2. Scroll to filters card & ring
  await tl.at(2800);
  tl.showCaption(CAPTIONS.filtersAndSchedule);
  await tl.scrollPanelTo("[data-scroller]", "[data-tl=card-assignment-filters]", 600);
  await hoverOn(tl, "[data-tl=card-assignment-filters]", { ms: 500 });
  await ring(tl, "[data-tl=card-assignment-filters]", 1600);

  // 3. Work location accordion
  await tl.at(5600);
  tl.showCaption(CAPTIONS.workLocation);
  await pressOn(tl, "[data-tl=accordion-work-location]", { ms: 500 });
  tl.setVar("wfWorkLocationSelectOpen", true);
  await tl.wait(400);
  await hoverOn(tl, "[data-tl=select-work-location-emp]", { ms: 450 });
  await tl.wait(300);
  await pressOn(tl, "[data-tl=accordion-work-location]", { ms: 450 });
  tl.setVar("wfWorkLocationSelectOpen", false);

  // 4. Repeat cadence select
  await tl.at(8400);
  tl.showCaption(CAPTIONS.repeatCadence);
  await pressOn(tl, "[data-tl=select-repeat]", { ms: 500 });
  tl.setVar("wfRepeatSelectOpen", true);
  await tl.wait(300);
  await hoverOn(tl, "[data-tl=repeat-opt-1]", { ms: 400 });
  await tl.wait(250);
  await pressOn(tl, "[data-tl=repeat-opt-none]", { ms: 400 });
  tl.setVar("wfRepeatSelectOpen", false);

  // 5. Scroll to peer feedback card & ring
  await tl.at(11000);
  tl.showCaption(CAPTIONS.peerFeedback);
  await tl.scrollPanelTo("[data-scroller]", "[data-tl=card-peer-feedback]", 600);
  await hoverOn(tl, "[data-tl=card-peer-feedback]", { ms: 500 });
  await ring(tl, "[data-tl=card-peer-feedback]", 1600);

  // 6. Approval reviewer select
  await tl.at(13800);
  tl.showCaption(CAPTIONS.approvalReviewer);
  await pressOn(tl, "[data-tl=select-appraisal-reviewer]", { ms: 500 });
  tl.setVar("wfAppraisalReviewerSelectOpen", true);
  await tl.wait(300);
  await hoverOn(tl, "[data-tl=reviewer-opt-sam]", { ms: 400 });
  await tl.wait(250);
  await pressOn(tl, "[data-tl=reviewer-opt-sam]", { ms: 400 });
  tl.setVar("wfAppraisalReviewerSelectOpen", false);

  // 7. Scroll to reminders card & ring
  await tl.at(16800);
  tl.showCaption(CAPTIONS.reminders);
  await tl.scrollPanelTo("[data-scroller]", "[data-tl=card-reminders]", 600);
  await hoverOn(tl, "[data-tl=card-reminders]", { ms: 500 });
  await ring(tl, "[data-tl=card-reminders]", 2200);

  // 8. Finish
  await tl.at(20200);
  finishWorkforce(tl);
}
