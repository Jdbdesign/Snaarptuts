import type { Timeline } from "@/lib/timeline";
import {
  beginDrive,
  finishDrive,
  hoverOn,
  pressOn,
} from "@/components/drive/drive-timeline";
import { DRIVE_URLS } from "@/components/drive/drive-data";
import { CAPTIONS } from "./data";

export const STEP37_DURATION_MS = 8000;

export async function runStep37(tl: Timeline) {
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
  tl.showCaption(CAPTIONS.copyLink);
  await hoverOn(tl, "[data-tl=item-menu-copy-link]", { ms: 600 });
  await tl.wait(150);
  await pressOn(tl, "[data-tl=item-menu-copy-link]");
  tl.setVar("driveItemMenuOpen", false);
  tl.setVar("driveCopyLinkToastOpen", true);

  await tl.at(4800);
  tl.showCaption(CAPTIONS.toastConfirmed);
  await hoverOn(tl, "[data-tl=toast-link-copied]", { ms: 600 });
  await tl.wait(1000);

  await finishDrive(tl, STEP37_DURATION_MS);
}
