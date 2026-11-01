import type { Timeline } from "@/lib/timeline";
import {
  beginWorkforce,
  finishWorkforce,
  hoverOn,
  pressOn,
  ring,
} from "@/components/workforce/workforce-timeline";
import { CAPTIONS, URLS } from "./data";

export const STEP94_DURATION_MS = 16500;

export async function runStep94(tl: Timeline) {
  beginWorkforce(tl, URLS.onboardingAdmin, "lifecycle-onboarding", "overview", [0.93, 0.08], true);
  tl.setVar("wfLifecycleTab", "onboarding");
  tl.setVar("wfOnboardingSubpage", "dashboard");
  tl.setVar("wfOffboardingSubTab", "dashboard");
  tl.setVar("wfOffboardingSubpage", "main");
  tl.setVar("wfInitiateExitEmployee", null);
  tl.setVar("wfInitiateExitReason", null);
  tl.setVar("wfInitiateExitDepartureType", "Voluntary");
  tl.setVar("wfInitiateExitChecklist", null);

  // 1. Click Offboarding toggle
  await tl.at(500);
  tl.showCaption(CAPTIONS.clickOffboardingToggle);
  await pressOn(tl, "[data-tl=toggle-lifecycle-offboarding]", { ms: 600 });
  tl.setVar("wfLifecycleTab", "offboarding");
  tl.setVar("wfPage", "lifecycle-offboarding");
  tl.setUrl(URLS.offboarding);
  await tl.wait(400);

  // 2. Click Initiate Exit
  await tl.at(2800);
  tl.showCaption(CAPTIONS.clickInitiateExit);
  await pressOn(tl, "[data-tl=btn-initiate-exit]", { ms: 600 });
  tl.setVar("wfOffboardingSubpage", "initiate");
  tl.setUrl(URLS.offboardingInitiate);
  await tl.wait(400);

  // 3. Choose Reason Personal Reasons
  await tl.at(5200);
  tl.showCaption(CAPTIONS.selectReason);
  await pressOn(tl, "[data-tl=select-exit-reason]", { ms: 500 });
  tl.setVar("wfInitiateExitReason", "Personal Reasons");
  await tl.wait(400);

  // 4. Departure type: hover options
  await tl.at(7400);
  await pressOn(tl, "[data-tl=select-exit-departure-type]", { ms: 450 });
  await tl.wait(300);
  await hoverOn(tl, "[data-tl=opt-departure-voluntary]", { ms: 350 });
  await tl.wait(200);
  await hoverOn(tl, "[data-tl=opt-departure-involuntary]", { ms: 350 });
  await tl.wait(200);
  await pressOn(tl, "[data-tl=opt-departure-voluntary]", { ms: 350 });
  tl.setVar("wfInitiateExitDepartureType", "Voluntary");
  await tl.wait(300);

  // 5. Choose Checklist IT Equipment Return
  await tl.at(10000);
  tl.showCaption(CAPTIONS.selectChecklist);
  await pressOn(tl, "[data-tl=select-exit-checklist]", { ms: 500 });
  tl.setVar("wfInitiateExitChecklist", "IT Equipment Return");
  await tl.wait(400);

  // 6. Ring Questionnaire
  await tl.at(11800);
  tl.showCaption(CAPTIONS.ringQuestionnaire);
  await hoverOn(tl, "[data-tl=select-exit-questionnaire]", { ms: 450 });
  await ring(tl, "[data-tl=select-exit-questionnaire]", 1600);

  // 7. Click Back to Offboarding
  await tl.at(14000);
  tl.showCaption(CAPTIONS.clickBack);
  await pressOn(tl, "[data-tl=btn-back-to-offboarding]", { ms: 600 });
  tl.setVar("wfOffboardingSubpage", "main");
  tl.setUrl(URLS.offboarding);
  await tl.wait(400);

  // Finish
  await tl.at(15800);
  await finishWorkforce(tl);
}
