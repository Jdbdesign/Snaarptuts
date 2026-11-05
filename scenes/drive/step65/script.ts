import type { Timeline } from "@/lib/timeline";
import {
  beginDrive,
  finishDrive,
  hoverOn,
  pressOn,
} from "@/components/drive/drive-timeline";
import { CAPTIONS } from "./data";

export const STEP65_DURATION_MS = 11500;

export async function runStep65(tl: Timeline) {
  beginDrive(tl, "drive.snaarp.com/workspaces/2172", "workspaces", [0.45, 0.45]);
  tl.setVar("drivePage", "workspaces");
  tl.setVar("driveActiveNav", "workspaces");
  tl.setVar("driveActiveWorkspaceId", "2172");
  tl.setVar("driveWorkspaceMarketingSpaceCreated", true);

  await tl.at(500);
  tl.showCaption(CAPTIONS.clickBrowseFiles);
  await hoverOn(tl, "[data-tl=card-browse-ws-files]", { ms: 600 });
  await tl.wait(150);
  await pressOn(tl, "[data-tl=card-browse-ws-files]");
  tl.setVar("drivePage", "files");
  tl.setVar("driveActiveNav", "files");
  tl.setVar("driveCurrentBreadcrumb", ["Workspaces", "Marketing Space"]);
  tl.setUrl("drive.snaarp.com/files?folder=2172");

  await tl.at(2800);
  tl.showCaption(CAPTIONS.clickCreateUpload);
  await hoverOn(tl, "[data-tl=btn-files-create]", { ms: 600 });
  await tl.wait(150);
  await pressOn(tl, "[data-tl=btn-files-create]");
  tl.setVar("driveCreateMenuOpen", true);

  await tl.at(4500);
  tl.showCaption(CAPTIONS.selectFolder);
  await hoverOn(tl, "[data-tl=menu-item-folder]", { ms: 500 });
  await tl.wait(150);
  await pressOn(tl, "[data-tl=menu-item-folder]");
  tl.setVar("driveCreateMenuOpen", false);
  tl.setVar("driveFolderModalOpen", true);

  await tl.at(6200);
  tl.showCaption(CAPTIONS.typeFolderName);
  await hoverOn(tl, "[data-tl=input-folder-name]", { ms: 500 });
  await tl.wait(150);
  await tl.click("[data-tl=input-folder-name]");
  await tl.typeText("folderName", "All videos", { msPerChar: 65 });

  await hoverOn(tl, "[data-tl=swatch-yellow]", { ms: 400 });
  await tl.wait(150);
  await pressOn(tl, "[data-tl=swatch-yellow]");
  tl.setVar("driveFolderColor", "yellow");

  await tl.at(9000);
  tl.showCaption(CAPTIONS.confirmCreateFolder);
  await hoverOn(tl, "[data-tl=btn-modal-create]", { ms: 500 });
  await tl.wait(150);
  await pressOn(tl, "[data-tl=btn-modal-create]");
  tl.setVar("driveIsCreatingFolder", true);

  await tl.wait(800);
  tl.setVar("driveIsCreatingFolder", false);
  tl.setVar("driveFolderModalOpen", false);
  tl.setVar("driveWorkspaceFolderAdded", true);
  await tl.wait(200);
  await hoverOn(tl, "[data-tl=tile-folder-all-videos]", { ms: 600 });
  await tl.wait(1500);

  await finishDrive(tl, STEP65_DURATION_MS);
}
