import type { Timeline } from "@/lib/timeline";
import {
  beginDrive,
  finishDrive,
  hoverOn,
  pressOn,
} from "@/components/drive/drive-timeline";
import { DRIVE_URLS } from "@/components/drive/drive-data";
import { CAPTIONS } from "./data";

export const STEP36_DURATION_MS = 12000;

export async function runStep36(tl: Timeline) {
  beginDrive(tl, DRIVE_URLS.files, "files", [0.45, 0.45]);
  tl.setVar("driveFilesViewMode", "tiles");
  tl.setVar("driveFolderBrandLogosAdded", true);
  tl.setVar("driveFolderProjectFilesAdded", true);
  tl.setVar("driveFileQuarterlyReportAdded", true);
  tl.setVar("driveFileMeetingNotesAdded", true);
  tl.setVar("driveFileSampleTxtAdded", true);
  tl.setVar("driveShareModalOpen", true);

  await tl.at(500);
  tl.showCaption(CAPTIONS.typeEmail);
  await hoverOn(tl, "[data-tl=share-email-input]", { ms: 600 });
  await tl.wait(150);
  await pressOn(tl, "[data-tl=share-email-input]");

  await tl.at(1500);
  await tl.typeText("share-email-input", "design@acme.example");
  tl.setVar("driveShareEmailVal", "design@acme.example");

  await tl.at(3600);
  tl.setVar("driveShareHasChip", true);
  tl.setVar("driveShareEmailVal", "");

  await tl.at(4500);
  tl.showCaption(CAPTIONS.clickSend);
  await hoverOn(tl, "[data-tl=btn-share-send]", { ms: 600 });
  await tl.wait(150);
  await pressOn(tl, "[data-tl=btn-share-send]");
  tl.setVar("driveShareModalOpen", false);
  tl.setVar("driveShareConfirmOpen", true);

  await tl.at(7000);
  tl.showCaption(CAPTIONS.viewerLink);
  await hoverOn(tl, "[data-tl=btn-confirm-copy-link]", { ms: 600 });
  await tl.wait(600);

  await tl.at(9500);
  tl.showCaption(CAPTIONS.clickDone);
  await hoverOn(tl, "[data-tl=btn-confirm-done]", { ms: 600 });
  await tl.wait(150);
  await pressOn(tl, "[data-tl=btn-confirm-done]");
  tl.setVar("driveShareConfirmOpen", false);

  await finishDrive(tl, STEP36_DURATION_MS);
}
