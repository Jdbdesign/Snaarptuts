import type { Timeline } from "@/lib/timeline";
import {
  beginDrive,
  finishDrive,
  hoverOn,
  pressOn,
} from "@/components/drive/drive-timeline";
import { DRIVE_URLS } from "@/components/drive/drive-data";
import { CAPTIONS } from "./data";

export const STEP40_DURATION_MS = 8500;

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

  await tl.at(5000);
  tl.showCaption(CAPTIONS.clickCancel);
  await hoverOn(tl, "[data-tl=btn-delete-cancel]", { ms: 600 });
  await tl.wait(150);
  await pressOn(tl, "[data-tl=btn-delete-cancel]");
  tl.setVar("driveDeleteModalOpen", false);

  await finishDrive(tl, STEP40_DURATION_MS);
}
