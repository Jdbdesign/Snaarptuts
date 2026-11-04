import type { Timeline } from "@/lib/timeline";
import {
  beginDrive,
  finishDrive,
  hoverOn,
  pressOn,
} from "@/components/drive/drive-timeline";
import { DRIVE_URLS } from "@/components/drive/drive-data";
import { CAPTIONS } from "./data";

export const STEP39_DURATION_MS = 11000;

export async function runStep39(tl: Timeline) {
  beginDrive(tl, DRIVE_URLS.files, "files", [0.45, 0.45]);
  tl.setVar("driveFilesViewMode", "tiles");
  tl.setVar("driveFolderBrandLogosAdded", true);
  tl.setVar("driveFolderProjectFilesAdded", true);
  tl.setVar("driveFileQuarterlyReportAdded", true);
  tl.setVar("driveFileMeetingNotesAdded", true);
  tl.setVar("driveFileSampleTxtAdded", true);
  tl.setVar("driveShareModalOpen", true);

  await tl.at(500);
  tl.showCaption(CAPTIONS.clickSettings);
  await hoverOn(tl, "[data-tl=btn-share-settings]", { ms: 600 });
  await tl.wait(150);
  await pressOn(tl, "[data-tl=btn-share-settings]");
  tl.setVar("driveShareModalOpen", false);
  tl.setVar("driveLinkSettingsOpen", true);

  await tl.at(3000);
  tl.showCaption(CAPTIONS.linkAudience);
  await hoverOn(tl, "[data-tl=radio-link-anyone]", { ms: 600 });
  await tl.wait(800);
  await hoverOn(tl, "[data-tl=radio-link-existing]", { ms: 500 });
  await tl.wait(600);

  await tl.at(5500);
  tl.showCaption(CAPTIONS.moreSettings);
  await hoverOn(tl, "[data-tl=select-link-permission]", { ms: 600 });
  await tl.wait(1000);

  await tl.at(8000);
  tl.showCaption(CAPTIONS.closeSettings);
  await hoverOn(tl, "[data-tl=btn-link-settings-close]", { ms: 600 });
  await tl.wait(150);
  await pressOn(tl, "[data-tl=btn-link-settings-close]");
  tl.setVar("driveLinkSettingsOpen", false);

  await finishDrive(tl, STEP39_DURATION_MS);
}
