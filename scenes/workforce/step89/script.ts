import type { Timeline } from "@/lib/timeline";
import {
  beginWorkforce,
  finishWorkforce,
  hoverOn,
  pressOn,
  ring,
} from "@/components/workforce/workforce-timeline";
import { CAPTIONS, URLS } from "./data";

export const STEP89_DURATION_MS = 16500;

export async function runStep89(tl: Timeline) {
  beginWorkforce(tl, URLS.compliance, "compliance", "overview", [0.35, 0.38], true);
  tl.setVar("wfComplianceView", "list");

  // 1. Click Engineering policies folder card
  await tl.at(500);
  tl.showCaption(CAPTIONS.clickEngineeringFolder);
  await pressOn(tl, "[data-tl=card-folder-engineering]", { ms: 600 });
  tl.setVar("wfComplianceView", "engineering-folder");
  tl.setUrl(URLS.complianceEngineering);
  await tl.wait(400);

  // 2. Click View on table row
  await tl.at(3000);
  tl.showCaption(CAPTIONS.clickViewPolicy);
  await pressOn(tl, "[data-tl=btn-view-eng-policy]", { ms: 600 });
  tl.setVar("wfComplianceView", "policy-details");
  tl.setUrl(URLS.compliancePolicyReview);
  await tl.wait(400);

  // 3. Click View / Download policy
  await tl.at(5500);
  tl.showCaption(CAPTIONS.viewDocument);
  await pressOn(tl, "[data-tl=btn-view-download-policy]", { ms: 600 });
  await tl.wait(400);

  // 4. View document for ~3s then close
  await tl.at(7000);
  await hoverOn(tl, "[data-tl=doc-viewer-canvas]", { ms: 600 });
  await tl.wait(2400);

  await tl.at(10500);
  tl.showCaption(CAPTIONS.closeViewer);
  await pressOn(tl, "[data-tl=doc-viewer-close]", { ms: 500 });
  await tl.wait(400);

  // 5. Ring HR review card
  await tl.at(12800);
  tl.showCaption(CAPTIONS.ringHrReview);
  await hoverOn(tl, "[data-tl=card-hr-review]", { ms: 500 });
  await ring(tl, "[data-tl=card-hr-review]", 2000);

  // Finish
  await tl.at(15800);
  await finishWorkforce(tl);
}
