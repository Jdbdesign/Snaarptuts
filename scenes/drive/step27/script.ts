import type { Timeline } from "@/lib/timeline";
import {
  beginDrive,
  finishDrive,
  hoverOn,
  pressOn,
  ring,
} from "@/components/drive/drive-timeline";
import { DRIVE_URLS } from "@/components/drive/drive-data";
import { CAPTIONS } from "./data";

export const STEP27_DURATION_MS = 10000;

export async function runStep27(tl: Timeline) {
  beginDrive(tl, DRIVE_URLS.files, "files", [0.45, 0.45]);
  tl.setVar("driveFilesViewMode", "tiles");
  tl.setVar("driveFolderProjectFilesAdded", true);
  tl.setVar("driveFileQuarterlyReportAdded", true);

  await tl.at(500);
  tl.showCaption(CAPTIONS.clickCreate);
  await hoverOn(tl, "[data-tl=btn-files-create]", { ms: 600 });
  await tl.wait(150);
  await pressOn(tl, "[data-tl=btn-files-create]");
  tl.setVar("driveCreateMenuOpen", true);

  await tl.at(2500);
  tl.showCaption(CAPTIONS.clickFolderUpload);
  await hoverOn(tl, "[data-tl=menu-item-folder-upload]", { ms: 500 });
  await tl.wait(150);
  await pressOn(tl, "[data-tl=menu-item-folder-upload]");
  tl.setVar("driveCreateMenuOpen", false);
  tl.setVar("driveFolderPickerOpen", true);

  await tl.at(4600);
  tl.showCaption(CAPTIONS.chooseFolder);
  await hoverOn(tl, "[data-tl=picker-item-folder]", { ms: 500 });
  await tl.wait(400);
  await hoverOn(tl, "[data-tl=btn-picker-upload-folder]", { ms: 500 });
  await tl.wait(150);
  await pressOn(tl, "[data-tl=btn-picker-upload-folder]");
  tl.setVar("driveFolderPickerOpen", false);
  tl.setVar("driveUploadToastOpen", true);
  tl.setVar("driveUploadToastExpanded", true);
  tl.setVar("driveUploadToastCompleted", true);
  tl.setVar("driveUploadToastCount", 6);
  tl.setVar("driveFolderBrandLogosAdded", true);

  await tl.at(7200);
  tl.showCaption(CAPTIONS.folderUploaded);
  await hoverOn(tl, "[data-tl=tile-folder-brand-logos]", { ms: 600 });
  await ring(tl, "[data-tl=tile-folder-brand-logos]", 2200);

  await finishDrive(tl, STEP27_DURATION_MS);
}
