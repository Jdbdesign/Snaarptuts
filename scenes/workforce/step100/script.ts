import type { Timeline } from "@/lib/timeline";
import {
  beginWorkforce,
  finishWorkforce,
  hoverOn,
  pressOn,
} from "@/components/workforce/workforce-timeline";
import { CAPTIONS, URLS } from "./data";

export const STEP100_DURATION_MS = 10500;

export async function runStep100(tl: Timeline) {
  beginWorkforce(tl, URLS.hrCases, "admin-hr-cases", "overview", [0.45, 0.28], true);
  tl.setVar("wfHrAdminTab", "disciplinary");
  tl.setVar("wfAddDisciplinaryModalOpen", false);

  // 1. Click + Add Record
  await tl.at(500);
  tl.showCaption(CAPTIONS.addRecord);
  await pressOn(tl, "[data-tl=btn-add-disciplinary-record]", { ms: 600 });
  tl.setVar("wfAddDisciplinaryModalOpen", true);
  await tl.wait(400);

  // 2. Hover form fields
  await tl.at(3800);
  tl.showCaption(CAPTIONS.fillForm);
  await hoverOn(tl, "[data-tl=select-disc-type]", { ms: 600 });
  await tl.wait(600);

  // 3. Click Cancel
  await tl.at(7200);
  tl.showCaption(CAPTIONS.cancelForm);
  await pressOn(tl, "[data-tl=btn-cancel-disc-record]", { ms: 600 });
  tl.setVar("wfAddDisciplinaryModalOpen", false);
  await tl.wait(400);

  // Finish
  await tl.at(9800);
  await finishWorkforce(tl);
}
