import type { Timeline } from "@/lib/timeline";
import {
  beginDrive,
  finishDrive,
  hoverOn,
  pressOn,
} from "@/components/drive/drive-timeline";
import { DRIVE_URLS } from "@/components/drive/drive-data";
import { CAPTIONS } from "./data";

export const STEP67_DURATION_MS = 9500;

export async function runStep67(tl: Timeline) {
  beginDrive(tl, "drive.snaarp.com/workspaces/2172", "workspaces", [0.7, 0.1]);
  tl.setVar("drivePage", "workspaces");
  tl.setVar("driveActiveNav", "workspaces");
  tl.setVar("driveActiveWorkspaceId", "2172");
  tl.setVar("driveWorkspaceMarketingSpaceCreated", true);

  await tl.at(500);
  tl.showCaption(CAPTIONS.clickDeleteWorkspace);
  await hoverOn(tl, "[data-tl=btn-ws-detail-delete]", { ms: 600 });
  await tl.wait(150);
  await pressOn(tl, "[data-tl=btn-ws-detail-delete]");
  tl.setVar("driveDeleteWorkspaceModalOpen", true);

  await tl.at(2800);
  tl.showCaption(CAPTIONS.confirmCheckbox);
  await hoverOn(tl, "[data-tl=checkbox-delete-ws-confirm]", { ms: 600 });
  await tl.wait(150);
  await pressOn(tl, "[data-tl=checkbox-delete-ws-confirm]");
  tl.setVar("driveDeleteWorkspaceConfirmChecked", true);

  await tl.at(5200);
  tl.showCaption(CAPTIONS.confirmDelete);
  await hoverOn(tl, "[data-tl=btn-delete-ws-confirm]", { ms: 600 });
  await tl.wait(150);
  await pressOn(tl, "[data-tl=btn-delete-ws-confirm]");
  tl.setVar("driveIsDeletingWorkspace", true);

  await tl.wait(800);
  tl.setVar("driveIsDeletingWorkspace", false);
  tl.setVar("driveDeleteWorkspaceModalOpen", false);
  tl.setVar("driveActiveWorkspaceId", "");
  tl.setVar("driveWorkspaceMarketingSpaceDeleted", true);
  tl.setUrl(DRIVE_URLS.workspaces);
  tl.setVar("driveWorkspaceDeletedToastOpen", true);
  await hoverOn(tl, "[data-tl=card-workspace-social-media]", { ms: 600 });
  await tl.wait(1500);

  await finishDrive(tl, STEP67_DURATION_MS);
}
