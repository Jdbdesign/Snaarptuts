import type { Timeline } from "@/lib/timeline";
import {
  beginWorkforce,
  finishWorkforce,
  hoverOn,
  pressOn,
  ring,
} from "@/components/workforce/workforce-timeline";
import { CAPTIONS, URLS } from "./data";

export const STEP74_DURATION_MS = 17500;

export async function runStep74(tl: Timeline) {
  beginWorkforce(tl, URLS.payroll, "payroll", "overview", [0.85, 0.28], true);
  tl.setVar("wfPayrollTab", "import-export");
  tl.setVar("wfTaxEmployee", null);
  tl.setVar("wfTaxAdjustOpen", false);
  tl.setVar("wfTaxCalculated", false);

  // 1. Click Tax calculator tab
  await tl.at(500);
  tl.showCaption(CAPTIONS.clickTaxCalc);
  await pressOn(tl, "[data-tl=tab-tax-calculator]", { ms: 600 });
  tl.setVar("wfPayrollTab", "tax-calculator");
  await tl.wait(300);

  // 2. Select Alex Morgan (GBP)
  await tl.at(2800);
  tl.showCaption(CAPTIONS.selectAlex);
  await pressOn(tl, "[data-tl=select-tax-employee]", { ms: 500 });
  tl.setVar("wfTaxEmployee", "Alex Morgan (GBP)");
  await tl.wait(300);

  // Ring salary breakdown
  await tl.at(5000);
  await hoverOn(tl, "[data-tl=block-tax-salary-breakdown]", { ms: 500 });
  await ring(tl, "[data-tl=block-tax-salary-breakdown]", 1600);

  // 3. Toggle Adjust calculation
  await tl.at(7500);
  tl.showCaption(CAPTIONS.adjustCalculation);
  await pressOn(tl, "[data-tl=accordion-adjust-tax]", { ms: 500 });
  tl.setVar("wfTaxAdjustOpen", true);
  await tl.wait(400);
  await pressOn(tl, "[data-tl=accordion-adjust-tax]", { ms: 450 });
  tl.setVar("wfTaxAdjustOpen", false);

  // 4. Click Calculate tax
  await tl.at(10200);
  tl.showCaption(CAPTIONS.calculateTax);
  await pressOn(tl, "[data-tl=btn-calculate-tax]", { ms: 500 });
  tl.setVar("wfTaxCalculated", true);
  await tl.wait(300);

  // 5. Ring result cards
  await tl.at(12500);
  tl.showCaption(CAPTIONS.taxResults);
  await hoverOn(tl, "[data-tl=tax-results-cards]", { ms: 500 });
  await ring(tl, "[data-tl=tax-results-cards]", 2400);

  // 6. Finish
  await tl.at(16800);
  finishWorkforce(tl);
}
