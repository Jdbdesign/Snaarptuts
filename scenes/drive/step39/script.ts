import type { Timeline } from "@/lib/timeline";
import {
  beginDrive,
  finishDrive,
  hoverOn,
  pressOn,
} from "@/components/drive/drive-timeline";
import { DRIVE_URLS } from "@/components/drive/drive-data";
import { CAPTIONS } from "./data";

export const STEP39_DURATION_MS = 11500;

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

  await tl.at(2800);
  tl.showCaption(CAPTIONS.linkAudience);
  await hoverOn(tl, "[data-tl=radio-link-anyone]", { ms: 600 });
  await tl.wait(150);
  await pressOn(tl, "[data-tl=radio-link-anyone]");
  tl.setVar("driveLinkScope", "anyone");
  await tl.wait(500);

  await tl.at(5200);
  tl.showCaption(CAPTIONS.moreSettings);
  await hoverOn(tl, "[data-tl=select-link-permission]", { ms: 600 });
  await tl.wait(800);

  await tl.at(7200);
  tl.showCaption(CAPTIONS.applySettings);
  await hoverOn(tl, "[data-tl=btn-link-settings-apply]", { ms: 600 });
  await tl.wait(150);
  await pressOn(tl, "[data-tl=btn-link-settings-apply]");
  tl.setVar("driveLinkSettingsOpen", false);
  tl.setVar("driveShareModalOpen", true);
  tl.setVar("driveShareLinkFooterText", "Anyone with the link can view.");
  tl.setVar("driveLinkSettingsToastOpen", true);

  await tl.at(9200);
  tl.showCaption(CAPTIONS.settingsSaved);
  await hoverOn(tl, "[data-tl=btn-share-copy-link]", { ms: 600 });
  await tl.wait(1000);

  await finishDrive(tl, STEP39_DURATION_MS);
}
