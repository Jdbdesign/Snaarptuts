import type { Timeline } from "@/lib/timeline";
import {
  beginWorkforce,
  finishWorkforce,
  hoverOn,
  pressOn,
  ring,
} from "@/components/workforce/workforce-timeline";
import { CAPTIONS, URLS } from "./data";

export const STEP56_DURATION_MS = 17500;

export async function runStep56(tl: Timeline) {
  beginWorkforce(tl, URLS.appraisalManagement, "appraisal-management", "overview", [0.85, 0.42], true);

  // 1. Click Create Cycle
  await tl.at(500);
  tl.showCaption(CAPTIONS.clickCreateCycle);
  await pressOn(tl, "[data-tl=btn-create-cycle]", { ms: 600 });
  tl.setVar("wfPage", "cycle-new");
  tl.setUrl(URLS.cycleNew);
  await tl.wait(300);

  // 2. Cycle type select: open, hover Annual, click Probation
  await tl.at(3000);
  tl.showCaption(CAPTIONS.chooseCycleType);
  await pressOn(tl, "[data-tl=select-cycle-type]", { ms: 600 });
  tl.setVar("wfCycleTypeSelectOpen", true);
  await tl.wait(200);

  await tl.at(4600);
  await hoverOn(tl, "[data-tl=cycle-type-annual]", { ms: 450 });
  await tl.wait(250);

  await tl.at(5500);
  await pressOn(tl, "[data-tl=cycle-type-probation]", { ms: 450 });
  tl.setVar("wfCycleType", "PROBATION");
  tl.setVar("wfCycleTypeSelectOpen", false);
  await tl.wait(300);

  // 3. Select participants: Specific individuals -> Departments -> All employees
  await tl.at(7500);
  tl.showCaption(CAPTIONS.selectParticipants);
  await pressOn(tl, "[data-tl=radio-specific-individuals]", { ms: 500 });
  tl.setVar("wfCycleParticipants", "specific");
  await tl.wait(500);

  await tl.at(9500);
  await pressOn(tl, "[data-tl=radio-departments]", { ms: 500 });
  tl.setVar("wfCycleParticipants", "departments");
  await tl.wait(500);

  await tl.at(11500);
  await pressOn(tl, "[data-tl=radio-all-employees]", { ms: 500 });
  tl.setVar("wfCycleParticipants", "all");
  await tl.wait(400);

  // 4. Scroll to review stages card & ring
  await tl.at(13500);
  tl.showCaption(CAPTIONS.stagesAndDeadlines);
  await tl.scrollPanelTo("[data-scroller]", "[data-tl=card-review-stages]", 800);
  await hoverOn(tl, "[data-tl=card-review-stages]", { ms: 500 });
  await ring(tl, "[data-tl=card-review-stages]", 2000);

  // 5. Finish
  await tl.at(16800);
  finishWorkforce(tl);
}
