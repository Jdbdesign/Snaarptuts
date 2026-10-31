import type { Timeline } from "@/lib/timeline";
import { beginWorkforce, finishWorkforce, hoverOn, pressOn, ring } from "@/components/workforce/workforce-timeline";
import { CAPTIONS, URLS } from "./data";

export const STEP24_DURATION_MS = 19500;

export async function runStep24(tl: Timeline) {
  beginWorkforce(tl, URLS.hrCases, "hr-cases", "hr-cases", [0.85, 0.4]);

  // 1. Click Submit grievance
  await tl.at(500);
  tl.showCaption(CAPTIONS.clickSubmitGrievance);
  await pressOn(tl, "[data-tl=btn-submit-grievance]", { ms: 600 });
  tl.setVar("wfSubmitGrievanceModalOpen", true);
  await tl.wait(250);

  // 2. Click Type select to open dropdown
  await tl.at(3000);
  tl.showCaption(CAPTIONS.clickType);
  await pressOn(tl, "[data-tl=select-grievance-type]", { ms: 500 });
  tl.setVar("wfGrievanceTypeDropdownOpen", true);
  await tl.wait(150);

  // 3. Hover and click "Pay dispute"
  await tl.at(5200);
  tl.showCaption(CAPTIONS.clickPayDispute);
  await hoverOn(tl, "[data-tl=type-opt-pay-dispute]", { ms: 400 });
  await pressOn(tl, "[data-tl=type-opt-pay-dispute]", { ms: 400 });
  tl.setVar("wfGrievanceType", "Pay dispute");
  tl.setVar("wfGrievanceTypeDropdownOpen", false);
  await tl.wait(200);

  // 4. Click Incident date field
  await tl.at(8000);
  tl.showCaption(CAPTIONS.clickDate);
  await pressOn(tl, "[data-tl=input-incident-date]", { ms: 500 });
  tl.setVar("wfGrievanceDatePickerOpen", true);
  await tl.wait(200);

  // 5. Pick day 28
  await tl.at(10500);
  tl.showCaption(CAPTIONS.pickDay28);
  await hoverOn(tl, "[data-tl=cal-day-28]", { ms: 400 });
  await pressOn(tl, "[data-tl=cal-day-28]", { ms: 400 });
  tl.setVar("wfGrievanceDate", "28/10/2026");
  tl.setVar("wfGrievanceDatePickerOpen", false);
  await tl.wait(200);

  // 6. Ring Description (do not type in it)
  await tl.at(13000);
  tl.showCaption(CAPTIONS.description);
  await hoverOn(tl, "[data-tl=textarea-grievance-desc]", { ms: 500 });
  await ring(tl, "[data-tl=textarea-grievance-desc]", 2200);

  // 7. Click Cancel to close modal without submitting
  await tl.at(16200);
  tl.showCaption(CAPTIONS.clickCancel);
  await pressOn(tl, "[data-tl=btn-cancel-grievance]", { ms: 500 });
  tl.setVar("wfSubmitGrievanceModalOpen", false);
  await tl.wait(250);

  // 8. Finish
  await finishWorkforce(tl, 18500, STEP24_DURATION_MS);
}
