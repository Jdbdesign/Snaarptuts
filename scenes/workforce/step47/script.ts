import type { Timeline } from "@/lib/timeline";
import {
  beginWorkforce,
  finishWorkforce,
  hoverOn,
  pressOn,
  ring,
} from "@/components/workforce/workforce-timeline";
import { CAPTIONS, URLS } from "./data";

export const STEP47_DURATION_MS = 15000;

export async function runStep47(tl: Timeline) {
  beginWorkforce(tl, URLS.policiesEngineering, "policies-folder", "overview", [0.85, 0.35]);

  // 1. Click View button
  await tl.at(500);
  tl.showCaption(CAPTIONS.clickView);
  await pressOn(tl, "[data-tl=btn-view-policy]", { ms: 600 });
  tl.setVar("wfPage", "policy-details");
  tl.setUrl(URLS.policyDetails);
  await tl.wait(250);

  // 2. Ring header and Approved badge
  await tl.at(2500);
  tl.showCaption(CAPTIONS.policyHeading);
  await hoverOn(tl, "[data-tl=policy-detail-header]", { ms: 500 });
  await ring(tl, "[data-tl=policy-detail-header]", 1600);

  // 3. Ring details card
  await tl.at(4800);
  tl.showCaption(CAPTIONS.detailsCard);
  await hoverOn(tl, "[data-tl=policy-detail-card]", { ms: 500 });
  await ring(tl, "[data-tl=policy-detail-card]", 1800);

  // 4. Click View / Download policy button
  await tl.at(7200);
  tl.showCaption(CAPTIONS.clickDownload);
  await pressOn(tl, "[data-tl=btn-view-download-policy]", { ms: 600 });
  tl.setVar("wfPolicyViewerOpen", true);
  await tl.wait(250);

  // 5. Ring viewer title in dark toolbar
  await tl.at(9400);
  tl.showCaption(CAPTIONS.documentViewer);
  await hoverOn(tl, "[data-tl=doc-viewer-title]", { ms: 500 });
  await ring(tl, "[data-tl=doc-viewer-title]", 1200);

  // 6. Scroll document page slightly
  await tl.at(11200);
  await tl.scrollPanelTo("[data-scroller=doc-viewer]", 140, 600);

  // 7. Close document viewer
  await tl.at(12400);
  tl.showCaption(CAPTIONS.closeViewer);
  await pressOn(tl, "[data-tl=doc-viewer-close]", { ms: 500 });
  tl.setVar("wfPolicyViewerOpen", false);
  await tl.wait(250);

  await finishWorkforce(tl, 14000, STEP47_DURATION_MS);
}
