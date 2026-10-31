import type { Timeline } from "@/lib/timeline";
import { beginWorkforce, finishWorkforce, hoverOn, pressOn, ring } from "@/components/workforce/workforce-timeline";
import { CAPTIONS, URLS } from "./data";

export const STEP19_DURATION_MS = 21000;

export async function runStep19(tl: Timeline) {
  beginWorkforce(tl, URLS.salaryAdvances, "salary-advances", "salary-advances", [0.88, 0.62]);

  // 1. Hover "..." in Actions
  await tl.at(500);
  tl.showCaption(CAPTIONS.hoverActions);
  await hoverOn(tl, "[data-tl=btn-advance-actions-1]", { ms: 600 });
  tl.setVar("wfAdvanceMenuOpen", true);
  await tl.wait(150);

  // 2. Click "View details"
  await tl.at(2800);
  tl.showCaption(CAPTIONS.clickViewDetails);
  await pressOn(tl, "[data-tl=menu-view-details]", { ms: 500 });
  tl.setVar("wfAdvanceMenuOpen", false);
  tl.setVar("wfSalaryAdvanceModalOpen", true);
  tl.setUrl(`${URLS.salaryAdvances}?advance=sample`);
  await tl.wait(250);

  // 3. Ring amount and status
  await tl.at(5500);
  tl.showCaption(CAPTIONS.amountAndStatus);
  await hoverOn(tl, "[data-tl=modal-advance-amount]", { ms: 600 });
  await ring(tl, "[data-tl=modal-advance-amount]", 2000);

  // 4. Scroll to Proposed repayments and ring
  await tl.at(9000);
  tl.showCaption(CAPTIONS.repayments);
  await tl.scrollPanelTo("[data-tl=advance-modal-scrollable]", 160, 600);
  await hoverOn(tl, "[data-tl=modal-repayments-section]", { ms: 500 });
  await ring(tl, "[data-tl=modal-repayments-section]", 2200);

  // 5. Scroll to History and ring
  await tl.at(12500);
  tl.showCaption(CAPTIONS.history);
  await tl.scrollPanelTo("[data-tl=advance-modal-scrollable]", 320, 600);
  await hoverOn(tl, "[data-tl=modal-history-section]", { ms: 500 });
  await ring(tl, "[data-tl=modal-history-section]", 2200);

  // 6. Scroll back up
  await tl.at(16000);
  await tl.scrollPanelTo("[data-tl=advance-modal-scrollable]", 0, 500);
  await tl.wait(200);

  // 7. Click X to close
  await tl.at(17200);
  tl.showCaption(CAPTIONS.closeModal);
  await pressOn(tl, "[data-tl=btn-close-advance-modal]", { ms: 500 });
  tl.setVar("wfSalaryAdvanceModalOpen", false);
  tl.setUrl(URLS.salaryAdvances);
  await tl.wait(250);

  // 8. Finish
  await finishWorkforce(tl, 20200, STEP19_DURATION_MS);
}
