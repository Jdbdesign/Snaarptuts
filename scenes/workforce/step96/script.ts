import type { Timeline } from "@/lib/timeline";
import {
  beginWorkforce,
  finishWorkforce,
  hoverOn,
  pressOn,
} from "@/components/workforce/workforce-timeline";
import { CAPTIONS, URLS } from "./data";

export const STEP96_DURATION_MS = 15500;

export async function runStep96(tl: Timeline) {
  beginWorkforce(tl, URLS.offboarding, "lifecycle-offboarding", "overview", [0.38, 0.22], true);
  tl.setVar("wfLifecycleTab", "offboarding");
  tl.setVar("wfOffboardingSubTab", "resignations");
  tl.setVar("wfOffboardingSubpage", "main");
  tl.setVar("wfStandardExitModalOpen", false);

  // 1. Click Templates sub-tab
  await tl.at(500);
  tl.showCaption(CAPTIONS.clickTemplatesTab);
  await pressOn(tl, "[data-tl=tab-offboarding-templates]", { ms: 600 });
  tl.setVar("wfOffboardingSubTab", "templates");
  await tl.wait(400);

  // 2. Click Preview on Standard Exit Checklist card
  await tl.at(3400);
  tl.showCaption(CAPTIONS.previewStandardExit);
  await pressOn(tl, "[data-tl=btn-preview-standard-exit]", { ms: 600 });
  tl.setVar("wfStandardExitModalOpen", true);
  await tl.wait(500);

  // 3. Hover sequential checklist items
  await tl.at(6200);
  tl.showCaption(CAPTIONS.hoverItems);
  await hoverOn(tl, "[data-tl=item-exit-1]", { ms: 450 });
  await tl.wait(400);
  await hoverOn(tl, "[data-tl=item-exit-2]", { ms: 450 });
  await tl.wait(400);

  // 4. Hover Use Template
  await tl.at(9600);
  tl.showCaption(CAPTIONS.hoverUseTemplate);
  await hoverOn(tl, "[data-tl=btn-modal-use-template]", { ms: 500 });
  await tl.wait(400);

  // 5. Dismiss modal
  await tl.at(12200);
  tl.showCaption(CAPTIONS.closeModal);
  await pressOn(tl, "[data-tl=btn-dismiss-standard-exit]", { ms: 600 });
  tl.setVar("wfStandardExitModalOpen", false);
  await tl.wait(400);

  // Finish
  await tl.at(14800);
  await finishWorkforce(tl);
}
