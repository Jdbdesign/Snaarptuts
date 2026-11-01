import type { Timeline } from "@/lib/timeline";
import {
  beginWorkforce,
  finishWorkforce,
  hoverOn,
  pressOn,
  ring,
} from "@/components/workforce/workforce-timeline";
import { CAPTIONS, URLS } from "./data";

export const STEP95_DURATION_MS = 16500;

export async function runStep95(tl: Timeline) {
  beginWorkforce(tl, URLS.offboarding, "lifecycle-offboarding", "overview", [0.45, 0.42], true);
  tl.setVar("wfLifecycleTab", "offboarding");
  tl.setVar("wfOffboardingSubTab", "dashboard");
  tl.setVar("wfOffboardingSubpage", "main");
  tl.setVar("wfResignationMenuOpen", false);
  tl.setVar("wfResignationDetailModalOpen", false);

  // 1. Ring Casey Brown in-progress exit row & hover action buttons
  await tl.at(500);
  tl.showCaption(CAPTIONS.ringDashboardRow);
  await ring(tl, "[data-tl=row-exit-casey]", 1600);
  await hoverOn(tl, "[data-tl=btn-view-exit-record]", { ms: 400 });
  await tl.wait(250);
  await hoverOn(tl, "[data-tl=btn-cancel-exit-record]", { ms: 400 });
  await tl.wait(300);

  // 2. Click Resignations sub-tab
  await tl.at(3600);
  tl.showCaption(CAPTIONS.clickResignations);
  await pressOn(tl, "[data-tl=tab-offboarding-resignations]", { ms: 600 });
  tl.setVar("wfOffboardingSubTab", "resignations");
  await tl.wait(400);

  // 3. Open Alex Morgan resignation menu
  await tl.at(6200);
  tl.showCaption(CAPTIONS.openResignationMenu);
  await pressOn(tl, "[data-tl=btn-menu-resignation-alex]", { ms: 600 });
  tl.setVar("wfResignationMenuOpen", true);
  await tl.wait(400);

  // 4. Click View to open modal
  await tl.at(8400);
  tl.showCaption(CAPTIONS.viewDetails);
  await pressOn(tl, "[data-tl=menu-resignation-view]", { ms: 500 });
  tl.setVar("wfResignationMenuOpen", false);
  tl.setVar("wfResignationDetailModalOpen", true);
  await tl.wait(500);

  // 5. Ring dates and resignation reason
  await tl.at(10800);
  tl.showCaption(CAPTIONS.ringDatesAndReason);
  await hoverOn(tl, "[data-tl=text-resignation-approved-lwd]", { ms: 450 });
  await ring(tl, "[data-tl=box-resignation-reason]", 1800);
  await tl.wait(400);

  // 6. Dismiss modal
  await tl.at(13600);
  tl.showCaption(CAPTIONS.closeModal);
  await pressOn(tl, "[data-tl=btn-dismiss-resignation-details]", { ms: 600 });
  tl.setVar("wfResignationDetailModalOpen", false);
  await tl.wait(400);

  // Finish
  await tl.at(15800);
  await finishWorkforce(tl);
}
