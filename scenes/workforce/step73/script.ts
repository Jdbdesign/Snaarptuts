import type { Timeline } from "@/lib/timeline";
import {
  beginWorkforce,
  finishWorkforce,
  hoverOn,
  pressOn,
  ring,
} from "@/components/workforce/workforce-timeline";
import { CAPTIONS, URLS } from "./data";

export const STEP73_DURATION_MS = 20500;

export async function runStep73(tl: Timeline) {
  beginWorkforce(tl, URLS.payroll, "payroll", "overview", [0.85, 0.28], true);
  tl.setVar("wfPayrollTab", "import-export");
  tl.setVar("wfImportSalariesModalOpen", false);
  tl.setVar("wfImportPayrollFile", null);
  tl.setVar("wfPayrollTransferModalOpen", false);
  tl.setVar("wfTransferConfirmed", false);
  tl.setVar("wfTransferToast", false);

  // 1. Click Import salaries button
  await tl.at(500);
  tl.showCaption(CAPTIONS.clickImportSalaries);
  await pressOn(tl, "[data-tl=btn-import-salaries]", { ms: 600 });
  tl.setVar("wfImportSalariesModalOpen", true);
  await tl.wait(300);

  // 2. Click file field and select CSV
  await tl.at(3000);
  tl.showCaption(CAPTIONS.chooseCsvFile);
  await pressOn(tl, "[data-tl=input-file-import]", { ms: 500 });
  await tl.wait(300);
  await pressOn(tl, "[data-tl=file-option-csv]", { ms: 500 });
  tl.setVar("wfImportPayrollFile", "payroll-template.csv");
  await tl.wait(300);

  // 3. Click Upload and validate
  await tl.at(6500);
  tl.showCaption(CAPTIONS.validateUpload);
  await pressOn(tl, "[data-tl=btn-upload-validate]", { ms: 600 });
  tl.setVar("wfImportSalariesModalOpen", false);
  tl.setVar("wfPayrollTransferModalOpen", true);
  await tl.wait(300);

  // 4. Ring transfer table & click confirmation checkbox
  await tl.at(9200);
  tl.showCaption(CAPTIONS.previewTransfer);
  await hoverOn(tl, "[data-tl=modal-payroll-transfer]", { ms: 500 });
  await ring(tl, "[data-tl=modal-payroll-transfer]", 2000);

  await tl.at(12200);
  await pressOn(tl, "[data-tl=cb-confirm-transfer]", { ms: 500 });
  tl.setVar("wfTransferConfirmed", true);
  await tl.wait(300);

  // 5. Click Confirm import
  await tl.at(14500);
  tl.showCaption(CAPTIONS.confirmImport);
  await pressOn(tl, "[data-tl=btn-confirm-import]", { ms: 600 });
  tl.setVar("wfPayrollTransferModalOpen", false);
  tl.setVar("wfTransferToast", true);
  tl.toast("Salary import completed: 12 records updated");
  await tl.wait(300);

  // 6. Ring completion card
  await tl.at(16800);
  await hoverOn(tl, "[data-tl=card-transfer-completed]", { ms: 500 });
  await ring(tl, "[data-tl=card-transfer-completed]", 1800);

  // 7. Finish
  await tl.at(19800);
  finishWorkforce(tl);
}
