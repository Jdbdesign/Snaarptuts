import type { Timeline } from "@/lib/timeline";
import {
  beginDrive,
  finishDrive,
  hoverOn,
  pressOn,
} from "@/components/drive/drive-timeline";
import { DRIVE_URLS } from "@/components/drive/drive-data";
import { CAPTIONS } from "./data";

export const STEP37_DURATION_MS = 8500;

export async function runStep37(tl: Timeline) {
  beginDrive(tl, DRIVE_URLS.files, "files", [0.45, 0.45]);
  tl.setVar("driveFilesViewMode", "tiles");
  tl.setVar("driveFolderBrandLogosAdded", true);
  tl.setVar("driveFolderProjectFilesAdded", true);
  tl.setVar("driveFileQuarterlyReportAdded", true);
  tl.setVar("driveFileMeetingNotesAdded", true);
  tl.setVar("driveFileSampleTxtAdded", true);
  tl.setVar("driveFileSampleTxtTitle", "Sample.txt");

  await tl.at(500);
  tl.showCaption(CAPTIONS.clickFileMenu);
  await hoverOn(tl, "[data-tl=btn-tile-menu-sample-txt]", { ms: 600 });
  await tl.wait(150);
  await pressOn(tl, "[data-tl=btn-tile-menu-sample-txt]");
  tl.setVar("driveItemMenuType", "file");
  tl.setVar("driveItemMenuName", "Sample.txt");
  tl.setVar("driveItemMenuCoords", { top: 180, left: 450 });
  tl.setVar("driveItemMenuOpen", true);

  await tl.at(3000);
  tl.showCaption(CAPTIONS.fileActions);
  await hoverOn(tl, "[data-tl=item-menu-download]", { ms: 600 });
  await tl.wait(600);
  await hoverOn(tl, "[data-tl=item-menu-rename]", { ms: 500 });
  await tl.wait(600);

  await finishDrive(tl, STEP37_DURATION_MS);
}
