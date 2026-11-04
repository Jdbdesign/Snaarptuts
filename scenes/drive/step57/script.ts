import type { Timeline } from "@/lib/timeline";
import {
  beginDrive,
  finishDrive,
  hoverOn,
  pressOn,
} from "@/components/drive/drive-timeline";
import { DRIVE_URLS } from "@/components/drive/drive-data";
import { CAPTIONS } from "./data";

export const STEP57_DURATION_MS = 9500;

export async function runStep57(tl: Timeline) {
  beginDrive(tl, DRIVE_URLS.shared, "shared", [0.25, 0.2]);
  tl.setVar("drivePage", "shared");
  tl.setVar("driveActiveNav", "shared");

  await tl.at(500);
  tl.showCaption(CAPTIONS.clickByYou);
  await hoverOn(tl, "[data-tl=tab-shared-by-you]", { ms: 600 });
  await tl.wait(150);
  await pressOn(tl, "[data-tl=tab-shared-by-you]");
  tl.setVar("driveSharedTab", "by-you");

  await tl.at(2500);
  tl.showCaption(CAPTIONS.openRowMenu);
  await hoverOn(tl, "[data-tl=btn-shared-row-menu-1]", { ms: 600 });
  await tl.wait(150);
  await pressOn(tl, "[data-tl=btn-shared-row-menu-1]");
  tl.setVar("driveSharedRowMenuOpenId", "s-1");

  await tl.at(4500);
  tl.showCaption(CAPTIONS.clickShare);
  await hoverOn(tl, "[data-tl=btn-shared-menu-share]", { ms: 600 });
  await tl.wait(150);
  await pressOn(tl, "[data-tl=btn-shared-menu-share]");
  tl.setVar("driveSharedRowMenuOpenId", "");
  tl.setVar("driveShareItemTitle", "Q3 report.xlsx");
  tl.setVar("driveShareEmailVal", "casey.brown@acme.example");
  tl.setVar("driveShareModalOpen", true);

  await tl.at(7000);
  tl.showCaption(CAPTIONS.confirmShare);
  await hoverOn(tl, "[data-tl=btn-share-send]", { ms: 600 });
  await tl.wait(150);
  await pressOn(tl, "[data-tl=btn-share-send]");
  tl.setVar("driveShareModalOpen", false);
  tl.setVar("driveLinkSettingsToastOpen", true);
  await tl.wait(1500);

  await finishDrive(tl, STEP57_DURATION_MS);
}
