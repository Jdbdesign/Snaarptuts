import type { Timeline } from "@/lib/timeline";
import {
  beginDrive,
  finishDrive,
  hoverOn,
  pressOn,
} from "@/components/drive/drive-timeline";
import { DRIVE_URLS } from "@/components/drive/drive-data";
import { CAPTIONS } from "./data";

export const STEP25_DURATION_MS = 8500;

export async function runStep25(tl: Timeline) {
  beginDrive(tl, DRIVE_URLS.files, "files", [0.5, 0.45]);
  tl.setVar("driveFilesViewMode", "tiles");
  tl.setVar("driveFolderProjectFilesAdded", true);

  await tl.at(500);
  tl.showCaption(CAPTIONS.clickCreate);
  await hoverOn(tl, "[data-tl=btn-files-create]", { ms: 600 });
  await tl.wait(150);
  await pressOn(tl, "[data-tl=btn-files-create]");
  tl.setVar("driveCreateMenuOpen", true);

  await tl.at(2600);
  tl.showCaption(CAPTIONS.clickUploadFile);
  await hoverOn(tl, "[data-tl=menu-item-file-upload]", { ms: 500 });
  await tl.wait(150);
  await pressOn(tl, "[data-tl=menu-item-file-upload]");
  tl.setVar("driveCreateMenuOpen", false);
  tl.setVar("driveFilePickerOpen", true);

  await tl.at(4800);
  tl.showCaption(CAPTIONS.chooseFile);
  await hoverOn(tl, "[data-tl=picker-item-file]", { ms: 500 });
  await tl.wait(400);
  await hoverOn(tl, "[data-tl=btn-picker-upload]", { ms: 500 });
  await tl.wait(150);
  await pressOn(tl, "[data-tl=btn-picker-upload]");
  tl.setVar("driveFilePickerOpen", false);
  tl.setVar("driveUploadToastOpen", true);
  tl.setVar("driveUploadToastCompleted", true);
  tl.setVar("driveUploadToastCount", 1);

  await finishDrive(tl, STEP25_DURATION_MS);
}
