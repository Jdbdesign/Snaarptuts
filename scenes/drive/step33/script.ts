import type { Timeline } from "@/lib/timeline";
import {
  beginDrive,
  finishDrive,
  hoverOn,
  pressOn,
} from "@/components/drive/drive-timeline";
import { DRIVE_URLS } from "@/components/drive/drive-data";
import { CAPTIONS } from "./data";

export const STEP33_DURATION_MS = 9000;

export async function runStep33(tl: Timeline) {
  beginDrive(tl, DRIVE_URLS.files, "files", [0.35, 0.35]);
  tl.setVar("driveFilesViewMode", "tiles");
  tl.setVar("driveFolderBrandLogosAdded", true);
  tl.setVar("driveFolderProjectFilesAdded", true);
  tl.setVar("driveFileQuarterlyReportAdded", true);
  tl.setVar("driveFileMeetingNotesAdded", true);
  tl.setVar("driveFileSampleTxtAdded", true);

  await tl.at(500);
  tl.showCaption(CAPTIONS.hoverFolder);
  await hoverOn(tl, "[data-tl=tile-folder-workspaces]", { ms: 600 });
  await tl.wait(300);

  await tl.at(2500);
  tl.showCaption(CAPTIONS.clickMenu);
  await hoverOn(tl, "[data-tl=btn-tile-menu-workspaces]", { ms: 500 });
  await tl.wait(150);
  await pressOn(tl, "[data-tl=btn-tile-menu-workspaces]");
  tl.setVar("driveItemMenuType", "folder");
  tl.setVar("driveItemMenuName", "Workspaces");
  tl.setVar("driveItemMenuTrigger", "[data-tl=btn-tile-menu-workspaces]");
  tl.setVar("driveItemMenuOpen", true);

  await tl.at(5000);
  tl.showCaption(CAPTIONS.reviewOptions);
  await hoverOn(tl, "[data-tl=item-menu-share]", { ms: 500 });
  await tl.wait(400);
  await hoverOn(tl, "[data-tl=item-menu-rename]", { ms: 400 });
  await tl.wait(400);
  tl.clearHighlight();

  await tl.at(8000);
  await finishDrive(tl, STEP33_DURATION_MS);
}
