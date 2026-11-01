import type { Timeline } from "@/lib/timeline";
import {
  beginWorkforce,
  finishWorkforce,
  hoverOn,
  pressOn,
  ring,
} from "@/components/workforce/workforce-timeline";
import { CAPTIONS, URLS } from "./data";

export const STEP75_DURATION_MS = 19500;

export async function runStep75(tl: Timeline) {
  beginWorkforce(tl, URLS.payroll, "payroll", "overview", [0.85, 0.28], true);
  tl.setVar("wfPayrollTab", "tax-calculator");

  // 1. Click Tax & Pension settings tab
  await tl.at(500);
  tl.showCaption(CAPTIONS.clickSettings);
  await pressOn(tl, "[data-tl=tab-tax-pension-settings]", { ms: 600 });
  tl.setVar("wfPayrollTab", "tax-pension-settings");
  await tl.wait(300);

  // 2. Ring income tax brackets table
  await tl.at(2800);
  tl.showCaption(CAPTIONS.bracketsTable);
  await hoverOn(tl, "[data-tl=input-bracket-limit-1]", { ms: 500 });
  await ring(tl, "[data-tl=input-bracket-limit-1]", 1400);

  // 3. Scroll to Allowances and reliefs & ring
  await tl.at(6200);
  tl.showCaption(CAPTIONS.allowancesAndReliefs);
  await tl.scrollPanelTo("[data-scroller]", "[data-tl=card-allowances]", 600);
  await hoverOn(tl, "[data-tl=card-allowances]", { ms: 500 });
  await ring(tl, "[data-tl=card-allowances]", 1800);

  // 4. Scroll to Pension contributions & ring
  await tl.at(9800);
  tl.showCaption(CAPTIONS.pensionContributions);
  await tl.scrollPanelTo("[data-scroller]", "[data-tl=card-pension-contributions]", 600);
  await hoverOn(tl, "[data-tl=card-pension-contributions]", { ms: 500 });
  await ring(tl, "[data-tl=card-pension-contributions]", 1800);

  // 5. Scroll to Component taxability toggles & Reason for change
  await tl.at(13500);
  tl.showCaption(CAPTIONS.componentTaxability);
  await tl.scrollPanelTo("[data-scroller]", "[data-tl=card-tax-components]", 600);
  await hoverOn(tl, "[data-tl=card-tax-components]", { ms: 500 });
  await ring(tl, "[data-tl=card-tax-components]", 1600);

  await tl.at(16200);
  await hoverOn(tl, "[data-tl=textarea-reason-change]", { ms: 450 });
  await ring(tl, "[data-tl=textarea-reason-change]", 1600);

  // 6. Finish
  await tl.at(18800);
  finishWorkforce(tl);
}
