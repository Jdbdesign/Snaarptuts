import type { Timeline } from "@/lib/timeline";
import {
  beginWorkforce,
  finishWorkforce,
  hoverOn,
  pressOn,
  ring,
} from "@/components/workforce/workforce-timeline";
import { CAPTIONS, URLS } from "./data";

export const STEP71_DURATION_MS = 17500;

export async function runStep71(tl: Timeline) {
  beginWorkforce(tl, URLS.payroll, "payroll", "overview", [0.85, 0.28], true);
  tl.setVar("wfPayrollTab", "salary-advances");
  tl.setVar("wfPayrollSubview", "main");

  // 1. Click Advance policy
  await tl.at(500);
  tl.showCaption(CAPTIONS.clickPolicy);
  await pressOn(tl, "[data-tl=btn-advance-policy]", { ms: 600 });
  tl.setVar("wfAdvancePolicyModalOpen", true);
  await tl.wait(300);

  // 2. Ring policy fields
  await tl.at(2800);
  tl.showCaption(CAPTIONS.policyModal);
  await hoverOn(tl, "[data-tl=input-max-gross-pct]", { ms: 500 });
  await tl.wait(300);
  await hoverOn(tl, "[data-tl=input-max-instalments]", { ms: 450 });
  await tl.wait(300);

  // 3. Hover minimum service field
  await tl.at(5500);
  tl.showCaption(CAPTIONS.minService);
  await hoverOn(tl, "[data-tl=input-min-service]", { ms: 500 });
  await ring(tl, "[data-tl=input-min-service]", 1400);

  // 4. Click Cancel on policy modal
  await tl.at(8200);
  await pressOn(tl, "[data-tl=btn-cancel-advance-policy]", { ms: 500 });
  tl.setVar("wfAdvancePolicyModalOpen", false);
  await tl.wait(300);

  // 5. Click My requests
  await tl.at(10500);
  tl.showCaption(CAPTIONS.myRequests);
  await pressOn(tl, "[data-tl=btn-my-requests]", { ms: 500 });
  tl.setVar("wfPayrollSubview", "my-requests");
  await tl.wait(300);

  // 6. Ring request limit card and empty state
  await tl.at(12500);
  await hoverOn(tl, "[data-tl=card-my-advance-limit]", { ms: 500 });
  await ring(tl, "[data-tl=card-my-advance-limit]", 1400);

  // 7. Click Back to return to admin
  await tl.at(14800);
  tl.showCaption(CAPTIONS.returnAdmin);
  await pressOn(tl, "[data-tl=btn-my-requests-back]", { ms: 500 });
  tl.setVar("wfPayrollSubview", "main");
  await tl.wait(300);

  // 8. Finish
  await tl.at(16800);
  finishWorkforce(tl);
}
