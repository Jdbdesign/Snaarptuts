import type { Timeline } from "@/lib/timeline";
import {
  beginWorkforce,
  finishWorkforce,
  hoverOn,
  pressOn,
  ring,
} from "@/components/workforce/workforce-timeline";
import { CAPTIONS, URLS } from "./data";

export const STEP87_DURATION_MS = 14000;

export async function runStep87(tl: Timeline) {
  beginWorkforce(tl, URLS.emailTemplates, "email-templates", "overview", [0.12, 0.68], true);
  tl.setVar("wfComplianceView", "list");
  tl.setVar("wfComplianceMenuOpen", false);

  // 1. Click Compliance in sidebar
  await tl.at(500);
  tl.showCaption(CAPTIONS.clickCompliance);
  await pressOn(tl, "[data-tl=nav-compliance]", { ms: 600 });
  tl.setVar("wfPage", "compliance");
  tl.setUrl(URLS.compliance);
  await tl.wait(400);

  // 2. Click ... on Engineering folder
  await tl.at(3000);
  tl.showCaption(CAPTIONS.openFolderMenu);
  await pressOn(tl, "[data-tl=btn-menu-folder-engineering]", { ms: 500 });
  tl.setVar("wfComplianceMenuOpen", true);
  await tl.wait(400);

  // Hover menu items
  await tl.at(4800);
  await hoverOn(tl, "[data-tl=menu-folder-delete]", { ms: 400 });
  await tl.wait(250);
  await hoverOn(tl, "[data-tl=menu-folder-settings]", { ms: 350 });
  await tl.wait(250);
  await hoverOn(tl, "[data-tl=menu-folder-copy]", { ms: 350 });
  await tl.wait(250);
  await hoverOn(tl, "[data-tl=menu-folder-open]", { ms: 350 });
  await tl.wait(300);

  // Close menu
  await tl.at(7500);
  await pressOn(tl, "[data-tl=btn-menu-folder-engineering]", { ms: 400 });
  tl.setVar("wfComplianceMenuOpen", false);
  await tl.wait(300);

  // 3. Ring awaiting approval card
  await tl.at(9200);
  tl.showCaption(CAPTIONS.ringAwaitingApproval);
  await hoverOn(tl, "[data-tl=card-awaiting-approval]", { ms: 500 });
  await ring(tl, "[data-tl=card-awaiting-approval]", 2200);

  // Finish
  await tl.at(13200);
  await finishWorkforce(tl);
}
