import type { Timeline } from "@/lib/timeline";
import {
  beginWorkforce,
  finishWorkforce,
  hoverOn,
  pressOn,
} from "@/components/workforce/workforce-timeline";
import { CAPTIONS, URLS } from "./data";

export const STEP116_DURATION_MS = 10500;

export async function runStep116(tl: Timeline) {
  beginWorkforce(tl, URLS.trainingAssignments, "training-assignments", "overview", [0.45, 0.28], true);
  tl.setVar("wfTrainingExpanded", true);
  tl.setVar("wfTrainingSub", "assignments");
  tl.setVar("wfViewProgressModalOpen", false);

  // 1. Click View Progress on Jordan Lee
  await tl.at(500);
  tl.showCaption(CAPTIONS.viewProgress);
  await pressOn(tl, "[data-tl=btn-view-progress-jordan]", { ms: 600 });
  tl.setVar("wfViewProgressModalOpen", true);
  await tl.wait(400);

  // 2. Hover modal details
  await tl.at(3800);
  tl.showCaption(CAPTIONS.inspectProgress);
  await hoverOn(tl, "[data-tl=modal-view-progress]", { ms: 600 });
  await tl.wait(600);

  // 3. Click Close
  await tl.at(7200);
  tl.showCaption(CAPTIONS.closeProgress);
  await pressOn(tl, "[data-tl=btn-close-progress-modal]", { ms: 600 });
  tl.setVar("wfViewProgressModalOpen", false);
  await tl.wait(400);

  // Finish
  await tl.at(9800);
  await finishWorkforce(tl);
}
