import type { Timeline } from "@/lib/timeline";
import {
  beginWorkforce,
  finishWorkforce,
  hoverOn,
  pressOn,
  ring,
} from "@/components/workforce/workforce-timeline";
import { CAPTIONS, URLS } from "./data";

export const STEP45_DURATION_MS = 12600;

export async function runStep45(tl: Timeline) {
  beginWorkforce(tl, URLS.performance, "performance", "overview", [0.1, 0.58]);

  // 1. Click Policies in the sidebar
  await tl.at(500);
  tl.showCaption(CAPTIONS.clickPolicies);
  await pressOn(tl, "[data-tl=nav-policies]", { ms: 600 });
  tl.setVar("wfPage", "policies");
  tl.setUrl(URLS.policies);
  await tl.wait(200);

  // 2. Ring header
  await tl.at(2500);
  tl.showCaption(CAPTIONS.approvedPolicies);
  await hoverOn(tl, "[data-tl=policies-header]", { ms: 500 });
  await ring(tl, "[data-tl=policies-header]", 1600);

  // 3. Hover search box
  await tl.at(4800);
  tl.showCaption(CAPTIONS.searchFolders);
  await hoverOn(tl, "[data-tl=input-search-folders]", { ms: 500 });
  await ring(tl, "[data-tl=input-search-folders]", 1200);

  // 4. Ring Engineering folder card
  await tl.at(7000);
  tl.showCaption(CAPTIONS.folderCard);
  await hoverOn(tl, "[data-tl=policy-folder-engineering]", { ms: 500 });
  await ring(tl, "[data-tl=policy-folder-engineering]", 1600);

  // 5. Click the folder card
  await tl.at(9400);
  tl.showCaption(CAPTIONS.clickFolder);
  await pressOn(tl, "[data-tl=policy-folder-engineering]", { ms: 600 });
  tl.setVar("wfPage", "policies-folder");
  tl.setUrl(URLS.policiesEngineering);
  await tl.wait(250);

  await finishWorkforce(tl, 11600, STEP45_DURATION_MS);
}
