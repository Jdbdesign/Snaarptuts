import type { Timeline } from "@/lib/timeline";
import {
  beginWorkforce,
  finishWorkforce,
  hoverOn,
  pressOn,
  ring,
} from "@/components/workforce/workforce-timeline";
import { CAPTIONS, URLS } from "./data";

export const STEP93_DURATION_MS = 15000;

export async function runStep93(tl: Timeline) {
  beginWorkforce(tl, URLS.onboardingAdmin, "lifecycle-onboarding", "overview", [0.42, 0.22], true);
  tl.setVar("wfLifecycleTab", "onboarding");
  tl.setVar("wfOnboardingPill", "dashboard");
  tl.setVar("wfOnboardingSubpage", "dashboard");

  // 1. Click Templates pill
  await tl.at(500);
  tl.showCaption(CAPTIONS.clickTemplatesPill);
  await pressOn(tl, "[data-tl=pill-onboarding-templates]", { ms: 600 });
  tl.setVar("wfOnboardingPill", "templates");
  await tl.wait(400);

  // 2. Click Standard onboarding card
  await tl.at(2800);
  tl.showCaption(CAPTIONS.clickStandardTemplate);
  await pressOn(tl, "[data-tl=card-template-standard]", { ms: 600 });
  tl.setVar("wfOnboardingSubpage", "template-detail");
  tl.setUrl(URLS.onboardingTemplateStandard);
  await tl.wait(400);

  // 3. Scroll through tasks ringing cards
  await tl.at(5400);
  tl.showCaption(CAPTIONS.scrollTasks);
  await hoverOn(tl, "[data-tl=card-task-1]", { ms: 500 });
  await ring(tl, "[data-tl=card-task-1]", 1200);

  await tl.at(7400);
  await hoverOn(tl, "[data-tl=card-task-2]", { ms: 500 });
  await ring(tl, "[data-tl=card-task-2]", 1200);

  await tl.at(9400);
  await tl.scrollPanelTo("[data-scroller=template-tasks]", 250, { ms: 800 });
  await tl.wait(200);
  await hoverOn(tl, "[data-tl=card-task-3]", { ms: 500 });
  await ring(tl, "[data-tl=card-task-3]", 1200);

  // 4. Click into Task 4 title
  await tl.at(12000);
  tl.showCaption(CAPTIONS.focusTaskTitle);
  await pressOn(tl, "[data-tl=input-task-4-title]", { ms: 500 });
  await tl.wait(1200);

  // Finish
  await tl.at(14200);
  await finishWorkforce(tl);
}
