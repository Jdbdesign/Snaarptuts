import type { Timeline } from "@/lib/timeline";
import {
  beginDrive,
  finishDrive,
  hoverOn,
  pressOn,
  ring,
} from "@/components/drive/drive-timeline";
import { DRIVE_URLS, DEFAULT_SHARE_PEOPLE } from "@/components/drive/drive-data";
import { CAPTIONS } from "./data";

export const STEP50_DURATION_MS = 10500;

export async function runStep50(tl: Timeline) {
  beginDrive(tl, DRIVE_URLS.files, "files", [0.45, 0.45]);
  tl.setVar("driveFilesViewMode", "tiles");
  tl.setVar("driveShareModalOpen", true);
  tl.setVar("driveShareItemName", "Q3 report.pdf");
  tl.setVar("driveSharePeople", DEFAULT_SHARE_PEOPLE);

  await tl.at(500);
  tl.showCaption(CAPTIONS.clickSettings);
  await hoverOn(tl, "[data-tl=btn-share-settings]", { ms: 600 });
  await tl.wait(150);
  await pressOn(tl, "[data-tl=btn-share-settings]");
  tl.setVar("driveShareModalOpen", false);
  tl.setVar("driveLinkSettingsOpen", true);

  await tl.at(2800);
  tl.showCaption(CAPTIONS.selectAnyone);
  await hoverOn(tl, "[data-tl=radio-link-anyone]", { ms: 600 });
  await tl.wait(150);
  await pressOn(tl, "[data-tl=radio-link-anyone]");
  tl.setVar("driveLinkScope", "anyone");

  await tl.at(5200);
  tl.showCaption(CAPTIONS.applySettings);
  await hoverOn(tl, "[data-tl=btn-link-settings-apply]", { ms: 600 });
  await tl.wait(150);
  await pressOn(tl, "[data-tl=btn-link-settings-apply]");
  tl.setVar("driveLinkSettingsOpen", false);
  tl.setVar("driveShareModalOpen", true);
  tl.setVar("driveShareLinkFooterText", "Anyone with the link can view.");
  tl.setVar("driveLinkSettingsToastOpen", true);

  await tl.at(7800);
  tl.showCaption(CAPTIONS.settingsApplied);
  await hoverOn(tl, "[data-tl=btn-share-copy-link]", { ms: 600 });
  await ring(tl, "[data-tl=btn-share-copy-link]", 2000);

  await finishDrive(tl, STEP50_DURATION_MS);
}
