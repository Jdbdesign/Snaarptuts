import type { Timeline } from "@/lib/timeline";
import {
  beginDrive,
  finishDrive,
  hoverOn,
  pressOn,
} from "@/components/drive/drive-timeline";
import { DRIVE_URLS } from "@/components/drive/drive-data";
import { CAPTIONS } from "./data";

export const STEP40_DURATION_MS = 12500;

export async function runStep40(tl: Timeline) {
  beginDrive(tl, DRIVE_URLS.files, "files", [0.45, 0.45]);
  tl.setVar("driveFilesViewMode", "tiles");
  tl.setVar("driveFolderBrandLogosAdded", true);
  tl.setVar("driveFolderProjectFilesAdded", true);
  tl.setVar("driveFileQuarterlyReportAdded", true);
  tl.setVar("driveFileMeetingNotesAdded", true);
  tl.setVar("driveFileSampleTxtAdded", true);
  tl.setVar("driveFileSampleTxtTitle", "Sample notes.txt");

  await tl.at(500);
  tl.showCaption(CAPTIONS.clickFileMenu);
  await hoverOn(tl, "[data-tl=btn-tile-menu-sample-txt]", { ms: 600 });
  await tl.wait(150);
  await pressOn(tl, "[data-tl=btn-tile-menu-sample-txt]");
  tl.setVar("driveItemMenuType", "file");
  tl.setVar("driveItemMenuName", "Sample notes.txt");
  tl.setVar("driveItemMenuCoords", { top: 180, left: 450 });
  tl.setVar("driveItemMenuOpen", true);

  await tl.at(2500);
  tl.showCaption(CAPTIONS.clickCopy);
  await hoverOn(tl, "[data-tl=item-menu-copy-to]", { ms: 600 });
  await tl.wait(150);
  await pressOn(tl, "[data-tl=item-menu-copy-to]");
  tl.setVar("driveItemMenuOpen", false);
  tl.setVar("driveCopyModalOpen", true);

  await tl.at(4800);
  tl.showCaption(CAPTIONS.expandTarget);
  await hoverOn(tl, "[data-tl=tree-folder-workspaces]", { ms: 500 });
  await tl.wait(150);
  await pressOn(tl, "[data-tl=tree-folder-workspaces]");
  tl.setVar("driveTreeExpandWorkspaces", true);

  await tl.at(6500);
  await hoverOn(tl, "[data-tl=tree-folder-social]", { ms: 500 });
  await tl.wait(150);
  await pressOn(tl, "[data-tl=tree-folder-social]");
  tl.setVar("driveTreeExpandSocial", true);

  await tl.at(7800);
  await hoverOn(tl, "[data-tl=tree-folder-images]", { ms: 500 });
  await tl.wait(150);
  await pressOn(tl, "[data-tl=tree-folder-images]");
  tl.setVar("driveSelectedDestFolder", "Images");

  await tl.at(9200);
  tl.showCaption(CAPTIONS.confirmCopy);
  await hoverOn(tl, "[data-tl=btn-copy-submit]", { ms: 500 });
  await tl.wait(150);
  await pressOn(tl, "[data-tl=btn-copy-submit]");
  tl.setVar("driveIsCopying", true);

  await tl.at(10500);
  tl.setVar("driveIsCopying", false);
  tl.setVar("driveCopyModalOpen", false);
  tl.setVar("driveCopyToastOpen", true);

  await tl.at(11200);
  tl.showCaption(CAPTIONS.copyComplete);
  await hoverOn(tl, "[data-tl=toast-copy-success]", { ms: 500 });
  await tl.wait(1000);

  await finishDrive(tl, STEP40_DURATION_MS);
}
