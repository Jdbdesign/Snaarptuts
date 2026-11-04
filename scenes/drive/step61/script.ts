import type { Timeline } from "@/lib/timeline";
import {
  beginDrive,
  finishDrive,
  hoverOn,
  pressOn,
} from "@/components/drive/drive-timeline";
import { DRIVE_URLS } from "@/components/drive/drive-data";
import { CAPTIONS } from "./data";

export const STEP61_DURATION_MS = 10500;

export async function runStep61(tl: Timeline) {
  beginDrive(tl, DRIVE_URLS.workspaces, "workspaces", [0.85, 0.15]);
  tl.setVar("drivePage", "workspaces");
  tl.setVar("driveActiveNav", "workspaces");

  await tl.at(500);
  tl.showCaption(CAPTIONS.clickCreateWorkspace);
  await hoverOn(tl, "[data-tl=btn-workspaces-create-top]", { ms: 600 });
  await tl.wait(150);
  await pressOn(tl, "[data-tl=btn-workspaces-create-top]");
  tl.setVar("driveCreateWorkspaceModalOpen", true);

  await tl.at(2500);
  tl.showCaption(CAPTIONS.typeName);
  await hoverOn(tl, "[data-tl=input-workspace-name]", { ms: 500 });
  await tl.wait(150);
  await tl.click("[data-tl=input-workspace-name]");
  await tl.typeText("workspaceName", "Marketing Space", { msPerChar: 65 });

  await tl.at(5200);
  tl.showCaption(CAPTIONS.typeDesc);
  await hoverOn(tl, "[data-tl=input-workspace-desc]", { ms: 500 });
  await tl.wait(150);
  await tl.click("[data-tl=input-workspace-desc]");
  await tl.typeText("workspaceDesc", "Campaign assets and planning", { msPerChar: 45 });

  await tl.at(7600);
  tl.showCaption(CAPTIONS.submitCreate);
  await hoverOn(tl, "[data-tl=btn-create-ws-submit]", { ms: 600 });
  await tl.wait(150);
  await pressOn(tl, "[data-tl=btn-create-ws-submit]");
  tl.setVar("driveIsCreatingWorkspace", true);

  await tl.wait(800);
  tl.setVar("driveIsCreatingWorkspace", false);
  tl.setVar("driveCreateWorkspaceModalOpen", false);
  tl.setVar("driveWorkspaceMarketingSpaceCreated", true);
  tl.setVar("driveWorkspaceCreatedToastOpen", true);
  await tl.wait(200);
  await hoverOn(tl, "[data-tl=card-workspace-marketing-space]", { ms: 600 });
  await tl.wait(1500);

  await finishDrive(tl, STEP61_DURATION_MS);
}
