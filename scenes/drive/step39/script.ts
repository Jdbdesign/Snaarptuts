import type { Timeline } from "@/lib/timeline";
import {
  beginDrive,
  finishDrive,
  hoverOn,
  pressOn,
} from "@/components/drive/drive-timeline";
import { DRIVE_URLS } from "@/components/drive/drive-data";
import { CAPTIONS } from "./data";

export const STEP39_DURATION_MS = 13000;

export async function runStep39(tl: Timeline) {
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
  tl.showCaption(CAPTIONS.clickMove);
  await hoverOn(tl, "[data-tl=item-menu-move-to]", { ms: 600 });
  await tl.wait(150);
  await pressOn(tl, "[data-tl=item-menu-move-to]");
  tl.setVar("driveItemMenuOpen", false);
  tl.setVar("driveSelectedDestFolder", "Brand Logos");
  tl.setVar("driveMoveModalOpen", true);

  await tl.at(5000);
  tl.showCaption(CAPTIONS.pickFolder);
  await hoverOn(tl, "[data-tl=tree-folder-brand-logos]", { ms: 500 });
  await tl.wait(150);
  await pressOn(tl, "[data-tl=tree-folder-brand-logos]");
  await tl.wait(400);

  await tl.at(6500);
  await hoverOn(tl, "[data-tl=btn-move-submit]", { ms: 500 });
  await tl.wait(150);
  await pressOn(tl, "[data-tl=btn-move-submit]");
  tl.setVar("driveIsMoving", true);
  tl.setVar("driveMoveModalOpen", false);
  tl.setVar("driveMoveToastOpen", true);
  tl.setVar("driveFileSampleTxtMoved", true);

  await tl.at(8500);
  tl.showCaption(CAPTIONS.undoMove);
  await hoverOn(tl, "[data-tl=btn-move-undo]", { ms: 600 });
  await tl.wait(150);
  await pressOn(tl, "[data-tl=btn-move-undo]");
  tl.setVar("driveFileSampleTxtMoved", false);
  tl.setVar("driveMoveToastOpen", false);

  await tl.at(10500);
  tl.showCaption(CAPTIONS.restored);
  await hoverOn(tl, "[data-tl=tile-file-sample-txt]", { ms: 600 });
  await tl.wait(1000);

  await finishDrive(tl, STEP39_DURATION_MS);
}
