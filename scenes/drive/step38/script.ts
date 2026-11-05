import type { Timeline } from "@/lib/timeline";
import {
  beginDrive,
  finishDrive,
  hoverOn,
  pressOn,
} from "@/components/drive/drive-timeline";
import { DRIVE_URLS } from "@/components/drive/drive-data";
import { CAPTIONS } from "./data";

export const STEP38_DURATION_MS = 11000;

export async function runStep38(tl: Timeline) {
  beginDrive(tl, DRIVE_URLS.files, "files", [0.45, 0.45]);
  tl.setVar("driveFilesViewMode", "tiles");
  tl.setVar("driveFolderBrandLogosAdded", true);
  tl.setVar("driveFolderProjectFilesAdded", true);
  tl.setVar("driveFileQuarterlyReportAdded", true);
  tl.setVar("driveFileMeetingNotesAdded", true);
  tl.setVar("driveFileSampleTxtAdded", true);
  tl.setVar("driveFileSampleTxtTitle", "Sample.txt");
  tl.setVar("driveItemMenuType", "file");
  tl.setVar("driveItemMenuName", "Sample.txt");
  tl.setVar("driveItemMenuCoords", { top: 180, left: 450 });
  tl.setVar("driveItemMenuOpen", true);

  await tl.at(500);
  tl.showCaption(CAPTIONS.clickRename);
  await hoverOn(tl, "[data-tl=item-menu-rename]", { ms: 600 });
  await tl.wait(150);
  await pressOn(tl, "[data-tl=item-menu-rename]");
  tl.setVar("driveItemMenuOpen", false);
  tl.setVar("driveRenameItemType", "file");
  tl.setVar("driveRenameValue", "Sample.txt");
  tl.setVar("driveRenameModalOpen", true);

  await tl.at(2500);
  tl.showCaption(CAPTIONS.typeNewName);
  await hoverOn(tl, "[data-tl=input-rename]", { ms: 500 });
  await tl.wait(150);
  await pressOn(tl, "[data-tl=input-rename]");
  await tl.wait(400);
  tl.setVar("driveRenameValue", "Sample notes.txt");

  await tl.at(5000);
  tl.showCaption(CAPTIONS.applyRename);
  await hoverOn(tl, "[data-tl=btn-rename-submit]", { ms: 500 });
  await tl.wait(150);
  await pressOn(tl, "[data-tl=btn-rename-submit]");
  tl.setVar("driveIsRenaming", true);

  await tl.at(6500);
  tl.setVar("driveIsRenaming", false);
  tl.setVar("driveRenameModalOpen", false);
  tl.setVar("driveFileSampleTxtTitle", "Sample notes.txt");

  await tl.at(8000);
  tl.showCaption(CAPTIONS.renameDone);
  await hoverOn(tl, "[data-tl=tile-file-sample-txt]", { ms: 600 });
  await tl.wait(1000);

  await finishDrive(tl, STEP38_DURATION_MS);
}
