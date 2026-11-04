import type { Timeline } from "@/lib/timeline";
import {
  beginDrive,
  finishDrive,
  hoverOn,
  pressOn,
} from "@/components/drive/drive-timeline";
import { DRIVE_URLS } from "@/components/drive/drive-data";
import { CAPTIONS } from "./data";

export const STEP32_DURATION_MS = 12500;

export async function runStep32(tl: Timeline) {
  beginDrive(tl, DRIVE_URLS.files, "files", [0.45, 0.45]);
  tl.setVar("driveFilesViewMode", "tiles");
  tl.setVar("driveFolderBrandLogosAdded", true);
  tl.setVar("driveFolderProjectFilesAdded", true);
  tl.setVar("driveFileQuarterlyReportAdded", true);
  tl.setVar("driveFileMeetingNotesAdded", true);
  tl.setVar("driveFileSampleTxtAdded", true);

  await tl.at(500);
  tl.showCaption(CAPTIONS.clickCreate);
  await hoverOn(tl, "[data-tl=btn-files-create]", { ms: 600 });
  await tl.wait(150);
  await pressOn(tl, "[data-tl=btn-files-create]");
  tl.setVar("driveCreateMenuOpen", true);

  await tl.at(2300);
  tl.showCaption(CAPTIONS.clickImport);
  await hoverOn(tl, "[data-tl=menu-item-import]", { ms: 500 });
  await tl.wait(150);
  await pressOn(tl, "[data-tl=menu-item-import]");
  tl.setVar("driveCreateMenuOpen", false);
  tl.setVar("driveImportModalOpen", true);

  await tl.at(4200);
  tl.showCaption(CAPTIONS.browseProviders);
  await hoverOn(tl, "[data-tl=btn-import-gdrive]", { ms: 500 });
  await tl.wait(150);
  await pressOn(tl, "[data-tl=btn-import-gdrive]");
  tl.setVar("driveImportStep", "connectGoogle");

  await tl.at(6200);
  tl.showCaption(CAPTIONS.connectAccount);
  await hoverOn(tl, "[data-tl=btn-import-connect-submit]", { ms: 600 });
  await tl.wait(150);
  await pressOn(tl, "[data-tl=btn-import-connect-submit]");
  tl.setVar("driveImportConnecting", true);

  await tl.at(7800);
  tl.setVar("driveImportConnecting", false);
  tl.setVar("driveImportModalOpen", false);
  tl.setVar("driveImportSuccessToast", true);
  tl.setVar("driveGoogleDriveFilesImported", true);

  await tl.at(9200);
  tl.showCaption(CAPTIONS.importComplete);
  await hoverOn(tl, "[data-tl=tile-file-imported-budget]", { ms: 600 });
  await tl.wait(1400);

  await finishDrive(tl, STEP32_DURATION_MS);
}
