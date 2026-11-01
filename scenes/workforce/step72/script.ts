import type { Timeline } from "@/lib/timeline";
import {
  beginWorkforce,
  finishWorkforce,
  hoverOn,
  pressOn,
  ring,
} from "@/components/workforce/workforce-timeline";
import { CAPTIONS, URLS } from "./data";

export const STEP72_DURATION_MS = 18500;

export async function runStep72(tl: Timeline) {
  beginWorkforce(tl, URLS.payroll, "payroll", "overview", [0.85, 0.28], true);
  tl.setVar("wfPayrollTab", "salary-advances");

  // 1. Click Import / Export tab
  await tl.at(500);
  tl.showCaption(CAPTIONS.clickImportExport);
  await pressOn(tl, "[data-tl=tab-import-export]", { ms: 600 });
  tl.setVar("wfPayrollTab", "import-export");
  await tl.wait(300);

  // 2. Ring template and export cards
  await tl.at(2800);
  tl.showCaption(CAPTIONS.templateCards);
  await hoverOn(tl, "[data-tl=card-import-template]", { ms: 500 });
  await ring(tl, "[data-tl=card-import-template]", 1800);

  await tl.at(5500);
  await hoverOn(tl, "[data-tl=card-export-payroll]", { ms: 500 });
  await ring(tl, "[data-tl=card-export-payroll]", 1800);

  // 3. Click CSV template button
  await tl.at(8000);
  tl.showCaption(CAPTIONS.downloadCsv);
  await pressOn(tl, "[data-tl=btn-csv-template]", { ms: 500 });
  tl.toast("Template downloaded");
  await tl.wait(300);

  // 4. Hover Excel template & export selects
  await tl.at(10500);
  tl.showCaption(CAPTIONS.exportOptions);
  await hoverOn(tl, "[data-tl=btn-excel-template]", { ms: 450 });
  await tl.wait(250);
  await hoverOn(tl, "[data-tl=select-export-config]", { ms: 450 });
  await tl.wait(250);
  await hoverOn(tl, "[data-tl=select-export-format]", { ms: 450 });
  await tl.wait(250);

  // 5. Scroll to Recent transfers & ring
  await tl.at(13500);
  tl.showCaption(CAPTIONS.recentTransfers);
  await hoverOn(tl, "[data-tl=section-recent-transfers]", { ms: 500 });
  await ring(tl, "[data-tl=section-recent-transfers]", 2200);

  // 6. Finish
  await tl.at(17800);
  finishWorkforce(tl);
}
