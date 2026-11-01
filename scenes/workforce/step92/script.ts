import type { Timeline } from "@/lib/timeline";
import {
  beginWorkforce,
  finishWorkforce,
  hoverOn,
  pressOn,
  ring,
} from "@/components/workforce/workforce-timeline";
import { CAPTIONS, URLS } from "./data";

export const STEP92_DURATION_MS = 18500;

export async function runStep92(tl: Timeline) {
  beginWorkforce(tl, URLS.onboardingAdmin, "lifecycle-onboarding", "overview", [0.88, 0.16], true);
  tl.setVar("wfLifecycleTab", "onboarding");
  tl.setVar("wfOnboardingPill", "dashboard");
  tl.setVar("wfOnboardingSubpage", "dashboard");
  tl.setVar("wfStartOnboardingEmployee", null);
  tl.setVar("wfStartOnboardingTemplate", null);
  tl.setVar("wfStartOnboardingHrOwner", null);
  tl.setVar("wfStartOnboardingManager", null);
  tl.setVar("wfStartOnboardingMessage", "");

  // 1. Click Start onboarding
  await tl.at(500);
  tl.showCaption(CAPTIONS.clickStartOnboarding);
  await pressOn(tl, "[data-tl=btn-start-onboarding]", { ms: 600 });
  tl.setVar("wfOnboardingSubpage", "start");
  tl.setUrl(URLS.onboardingStart);
  await tl.wait(400);

  // 2. Choose Jordan Lee in Employee
  await tl.at(3000);
  tl.showCaption(CAPTIONS.selectEmployee);
  await pressOn(tl, "[data-tl=select-start-employee]", { ms: 500 });
  await tl.wait(300);

  await tl.at(4400);
  await pressOn(tl, "[data-tl=opt-start-employee-jordan]", { ms: 450 });
  tl.setVar("wfStartOnboardingEmployee", "Jordan Lee");
  tl.setVar("wfStartOnboardingTemplate", "Standard onboarding");
  await tl.wait(400);

  // 3. Choose HR Task Owner and Manager
  await tl.at(6500);
  tl.showCaption(CAPTIONS.selectHrOwner);
  await pressOn(tl, "[data-tl=select-start-hr-owner]", { ms: 450 });
  await tl.wait(300);

  await tl.at(7800);
  await pressOn(tl, "[data-tl=opt-start-hr-jordan]", { ms: 450 });
  tl.setVar("wfStartOnboardingHrOwner", "Jordan Lee");
  await tl.wait(400);

  await tl.at(9200);
  await pressOn(tl, "[data-tl=select-start-manager]", { ms: 450 });
  await tl.wait(300);

  await tl.at(10500);
  await pressOn(tl, "[data-tl=opt-start-manager-jordan]", { ms: 450 });
  tl.setVar("wfStartOnboardingManager", "Jordan Lee");
  await tl.wait(400);

  // 4. Type instructions
  await tl.at(12000);
  tl.showCaption(CAPTIONS.typeWelcome);
  await pressOn(tl, "[data-tl=textarea-start-welcome]", { ms: 500 });
  await tl.typeText(
    "[data-tl=textarea-start-welcome]",
    "Welcome aboard! Your first day starts at 9am.",
    { ms: 60 }
  );
  tl.setVar("wfStartOnboardingMessage", "Welcome aboard! Your first day starts at 9am.");
  await tl.wait(400);

  // 5. Ring button
  await tl.at(14800);
  tl.showCaption(CAPTIONS.ringSubmit);
  await hoverOn(tl, "[data-tl=btn-submit-start-onboarding]", { ms: 500 });
  await ring(tl, "[data-tl=btn-submit-start-onboarding]", 1400);

  // 6. Click Back
  await tl.at(16800);
  tl.showCaption(CAPTIONS.clickBack);
  await pressOn(tl, "[data-tl=btn-back-onboarding-dashboard]", { ms: 500 });
  tl.setVar("wfOnboardingSubpage", "dashboard");
  tl.setUrl(URLS.onboardingAdmin);
  await tl.wait(300);

  // Finish
  await tl.at(17800);
  await finishWorkforce(tl);
}
