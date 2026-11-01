import type { Timeline } from "@/lib/timeline";
import {
  beginWorkforce,
  finishWorkforce,
  hoverOn,
  pressOn,
  ring,
} from "@/components/workforce/workforce-timeline";
import { CAPTIONS, URLS } from "./data";

export const STEP76_DURATION_MS = 16500;

export async function runStep76(tl: Timeline) {
  beginWorkforce(tl, URLS.payroll, "payroll", "overview", [0.85, 0.28], true);
  tl.setVar("wfPayrollTab", "tax-pension-settings");
  tl.setVar("wfPensionEmployee", null);
  tl.setVar("wfPensionCalculated", false);

  // 1. Click Pension calculator tab
  await tl.at(500);
  tl.showCaption(CAPTIONS.clickPensionCalc);
  await pressOn(tl, "[data-tl=tab-pension-calculator]", { ms: 600 });
  tl.setVar("wfPayrollTab", "pension-calculator");
  await tl.wait(300);

  // 2. Select Alex Morgan (GBP)
  await tl.at(2800);
  tl.showCaption(CAPTIONS.selectEmployee);
  await pressOn(tl, "[data-tl=select-pension-employee]", { ms: 500 });
  tl.setVar("wfPensionEmployee", "Alex Morgan (GBP)");
  await tl.wait(300);

  // Ring salary breakdown
  await tl.at(5000);
  await hoverOn(tl, "[data-tl=block-pension-salary-breakdown]", { ms: 500 });
  await ring(tl, "[data-tl=block-pension-salary-breakdown]", 1600);

  // 3. Click Calculate pension
  await tl.at(7500);
  tl.showCaption(CAPTIONS.calculatePension);
  await pressOn(tl, "[data-tl=btn-calculate-pension]", { ms: 500 });
  tl.setVar("wfPensionCalculated", true);
  await tl.wait(300);

  // 4. Ring results cards
  await tl.at(10200);
  tl.showCaption(CAPTIONS.pensionResults);
  await hoverOn(tl, "[data-tl=pension-results-cards]", { ms: 500 });
  await ring(tl, "[data-tl=pension-results-cards]", 2400);

  await tl.at(13500);
  await hoverOn(tl, "[data-tl=card-pension-total-period]", { ms: 500 });
  await ring(tl, "[data-tl=card-pension-total-period]", 1600);

  // 5. Finish
  await tl.at(15800);
  finishWorkforce(tl);
}
