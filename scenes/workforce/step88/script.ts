import type { Timeline } from "@/lib/timeline";
import {
  beginWorkforce,
  finishWorkforce,
  hoverOn,
  pressOn,
  ring,
} from "@/components/workforce/workforce-timeline";
import { CAPTIONS, URLS } from "./data";

export const STEP88_DURATION_MS = 16500;

export async function runStep88(tl: Timeline) {
  beginWorkforce(tl, URLS.compliance, "compliance", "overview", [0.88, 0.1], true);
  tl.setVar("wfComplianceView", "list");
  tl.setVar("wfComplianceFolderDept", null);
  tl.setVar("wfComplianceFolderName", "");
  tl.setVar("wfComplianceSelectedUploaders", []);

  // 1. Click Create department folder
  await tl.at(500);
  tl.showCaption(CAPTIONS.clickCreateFolder);
  await pressOn(tl, "[data-tl=btn-create-compliance-folder]", { ms: 600 });
  tl.setVar("wfComplianceView", "new-folder");
  tl.setUrl(URLS.complianceFolderNew);
  await tl.wait(400);

  // 2. Select Department Engineering
  await tl.at(2800);
  tl.showCaption(CAPTIONS.selectDepartment);
  await pressOn(tl, "[data-tl=select-folder-department]", { ms: 500 });
  await tl.wait(300);

  await tl.at(4200);
  await pressOn(tl, "[data-tl=opt-folder-dept-eng]", { ms: 450 });
  tl.setVar("wfComplianceFolderDept", "Engineering");
  await tl.wait(400);

  // 3. Type folder name
  await tl.at(6200);
  tl.showCaption(CAPTIONS.typeFolderName);
  await pressOn(tl, "[data-tl=input-folder-name]", { ms: 500 });
  await tl.typeText("[data-tl=input-folder-name]", "Engineering policies", { ms: 60 });
  tl.setVar("wfComplianceFolderName", "Engineering policies");
  await tl.wait(400);

  // 4. Tick Alex Morgan
  await tl.at(9000);
  tl.showCaption(CAPTIONS.tagUploader);
  await pressOn(tl, "[data-tl=checkbox-uploader-alex]", { ms: 500 });
  tl.setVar("wfComplianceSelectedUploaders", ["Alex Morgan"]);
  await tl.wait(400);

  // 5. Ring viewing access block
  await tl.at(11200);
  tl.showCaption(CAPTIONS.ringAccess);
  await hoverOn(tl, "[data-tl=block-viewing-access]", { ms: 500 });
  await ring(tl, "[data-tl=block-viewing-access]", 1800);

  // 6. Click Back
  await tl.at(13800);
  tl.showCaption(CAPTIONS.clickBack);
  await pressOn(tl, "[data-tl=btn-back-compliance]", { ms: 600 });
  tl.setVar("wfComplianceView", "list");
  tl.setUrl(URLS.compliance);
  await tl.wait(400);

  // Finish
  await tl.at(15800);
  await finishWorkforce(tl);
}
