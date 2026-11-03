import type { Timeline } from "@/lib/timeline";
import {
  beginOneCardX,
  finishOneCardX,
  hoverOn,
  pressOn,
} from "@/components/onecardx/onecardx-timeline";
import { CAPTIONS, URLS } from "./data";

export const STEP66_DURATION_MS = 6500;

export async function runStep66(tl: Timeline) {
  beginOneCardX(tl, URLS.analytics, "analytics", [0.1, 0.92]);
  tl.setVar("ocxBugModalOpen", false);
  tl.setVar("ocxBugCategoryOpen", false);
  tl.setVar("ocxBugCategory", "Bug");

  // 1. Click Report a Bug in sidebar
  await tl.at(400);
  tl.showCaption(CAPTIONS.clickReportBug);
  await hoverOn(tl, "[data-tl=nav-report-bug]", { ms: 600 });
  await pressOn(tl, "[data-tl=nav-report-bug]", { ms: 300 });
  tl.setVar("ocxBugModalOpen", true);
  await tl.wait(200);

  // 2. Open Category Dropdown
  await tl.at(1800);
  tl.showCaption(CAPTIONS.openCategoryDropdown);
  await hoverOn(tl, "[data-tl=dropdown-bug-category]", { ms: 500 });
  await pressOn(tl, "[data-tl=dropdown-bug-category]", { ms: 250 });
  tl.setVar("ocxBugCategoryOpen", true);
  await tl.wait(200);

  // 3. Choose Other
  await tl.at(3000);
  tl.showCaption(CAPTIONS.chooseOther);
  await hoverOn(tl, "[data-tl=option-bug-category-other]", { ms: 400 });
  await pressOn(tl, "[data-tl=option-bug-category-other]", { ms: 200 });
  tl.setVar("ocxBugCategory", "Other");
  tl.setVar("ocxBugCategoryOpen", false);
  await tl.wait(200);

  // 4. Click Cancel to close modal
  await tl.at(4400);
  tl.showCaption(CAPTIONS.closeBugModal);
  await hoverOn(tl, "[data-tl=btn-bug-cancel]", { ms: 500 });
  await pressOn(tl, "[data-tl=btn-bug-cancel]", { ms: 250 });
  tl.setVar("ocxBugModalOpen", false);
  await tl.wait(200);

  // 5. Finish (Completion Card follows)
  await finishOneCardX(tl, STEP66_DURATION_MS);
}
