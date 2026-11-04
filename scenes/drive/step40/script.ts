import type { Timeline } from "@/lib/timeline";
import {
  beginDrive,
  finishDrive,
  hoverOn,
  pressOn,
} from "@/components/drive/drive-timeline";
import { DRIVE_URLS } from "@/components/drive/drive-data";
import { CAPTIONS } from "./data";

export const STEP40_DURATION_MS = 10000;

export async function runStep40(tl: Timeline) {
  beginDrive(tl, DRIVE_URLS.files, "files", [0.35, 0.35]);
  tl.setVar("driveFilesViewMode", "tiles");
  tl.setVar("driveFolderBrandLogosAdded", true);
  tl.setVar("driveFolderProjectFilesAdded", true);
  tl.setVar("driveFileQuarterlyReportAdded", true);
  tl.setVar("driveFileMeetingNotesAdded", true);
  tl.setVar("driveFileSampleTxtAdded", true);

  await tl.at(500);
  tl.showCaption(CAPTIONS.clickMenu);
  await hoverOn(tl, "[data-tl=btn-tile-menu-workspaces]", { ms: 600 });
  await tl.wait(150);
  await pressOn(tl, "[data-tl=btn-tile-menu-workspaces]");
  tl.setVar("driveItemMenuType", "folder");
  tl.setVar("driveItemMenuName", "Workspaces");
  tl.setVar("driveItemMenuCoords", { top: 140, left: 450 });
  tl.setVar("driveItemMenuOpen", true);

  await tl.at(2500);
  tl.showCaption(CAPTIONS.clickDelete);
  await hoverOn(tl, "[data-tl=item-menu-delete]", { ms: 600 });
  await tl.wait(150);
  await pressOn(tl, "[data-tl=item-menu-delete]");
  tl.setVar("driveItemMenuOpen", false);
  tl.setVar("driveDeleteModalOpen", true);

  await tl.at(4800);
  tl.showCaption(CAPTIONS.confirmDelete);
  await hoverOn(tl, "[data-tl=btn-delete-confirm]", { ms: 600 });
  await tl.wait(150);
  await pressOn(tl, "[data-tl=btn-delete-confirm]");
  tl.setVar("driveIsDeletingFolder", true);

  await tl.at(6500);
  tl.setVar("driveIsDeletingFolder", false);
  tl.setVar("driveDeleteModalOpen", false);
  tl.setVar("driveFolderWorkspacesDeleted", true);
  tl.setVar("driveDeleteToastOpen", true);

  await tl.at(7800);
  tl.showCaption(CAPTIONS.folderDeleted);
  await hoverOn(tl, "[data-tl=toast-delete-success]", { ms: 600 });
  await tl.wait(1200);

  await finishDrive(tl, STEP40_DURATION_MS);
}
