import type { Timeline } from "@/lib/timeline";
import {
  beginWorkforce,
  finishWorkforce,
  hoverOn,
  pressOn,
  ring,
} from "@/components/workforce/workforce-timeline";
import { CAPTIONS, URLS } from "./data";

export const STEP62_DURATION_MS = 16500;

export async function runStep62(tl: Timeline) {
  beginWorkforce(tl, URLS.appraisalManagement, "appraisal-management", "overview", [0.45, 0.15], true);
  tl.setVar("wfAppraisalTab", "assigned");

  // 1. Click Templates tab
  await tl.at(500);
  tl.showCaption(CAPTIONS.clickTemplates);
  await pressOn(tl, "[data-tl=tab-templates]", { ms: 600 });
  tl.setVar("wfAppraisalTab", "templates");
  await tl.wait(300);

  // 2. Ring templates grid
  await tl.at(2800);
  tl.showCaption(CAPTIONS.templatesGrid);
  await hoverOn(tl, "[data-tl=templates-grid]", { ms: 600 });
  await ring(tl, "[data-tl=templates-grid]", 2000);

  // 3. Open menu on Annual Employee Performance Review
  await tl.at(6500);
  tl.showCaption(CAPTIONS.openActions);
  await pressOn(tl, "[data-tl=template-menu-btn-annual]", { ms: 500 });
  tl.setVar("wfTemplateMenuOpen", "tmpl-4");
  await tl.wait(300);

  await tl.at(8200);
  await hoverOn(tl, "[data-tl=template-action-edit]", { ms: 400 });
  await tl.wait(250);
  await hoverOn(tl, "[data-tl=template-action-duplicate]", { ms: 400 });
  await tl.wait(250);
  await pressOn(tl, "[data-tl=template-menu-btn-annual]", { ms: 400 });
  tl.setVar("wfTemplateMenuOpen", null);

  // 4. Ring draft template card
  await tl.at(11500);
  tl.showCaption(CAPTIONS.draftTemplate);
  await hoverOn(tl, "[data-tl=template-card-probation]", { ms: 500 });
  await ring(tl, "[data-tl=template-card-probation]", 2200);

  // 5. Finish
  await tl.at(15800);
  finishWorkforce(tl);
}
