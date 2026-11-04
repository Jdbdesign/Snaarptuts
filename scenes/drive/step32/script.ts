import type { Timeline } from "@/lib/timeline";
import {
  beginDrive,
  finishDrive,
  hoverOn,
  pressOn,
} from "@/components/drive/drive-timeline";
import { DRIVE_URLS } from "@/components/drive/drive-data";
import { CAPTIONS } from "./data";

export const STEP32_DURATION_MS = 11500;

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

  await tl.at(2500);
  tl.showCaption(CAPTIONS.clickImport);
  await hoverOn(tl, "[data-tl=menu-item-import]", { ms: 500 });
  await tl.wait(150);
  await pressOn(tl, "[data-tl=menu-item-import]");
  tl.setVar("driveCreateMenuOpen", false);
  tl.setVar("driveImportModalOpen", true);

  await tl.at(4800);
  tl.showCaption(CAPTIONS.browseProviders);
  await hoverOn(tl, "[data-tl=btn-import-gdrive]", { ms: 500 });
  await tl.wait(350);
  await hoverOn(tl, "[data-tl=btn-import-dropbox]", { ms: 400 });
  await tl.wait(350);
  await hoverOn(tl, "[data-tl=btn-import-onedrive]", { ms: 400 });
  await tl.wait(350);
  await hoverOn(tl, "[data-tl=btn-import-gphotos]", { ms: 400 });
  await tl.wait(350);

  await tl.at(8800);
  tl.showCaption(CAPTIONS.clickLater);
  await hoverOn(tl, "[data-tl=btn-import-later]", { ms: 500 });
  await tl.wait(150);
  await pressOn(tl, "[data-tl=btn-import-later]");
  tl.setVar("driveImportModalOpen", false);

  await finishDrive(tl, STEP32_DURATION_MS);
}
