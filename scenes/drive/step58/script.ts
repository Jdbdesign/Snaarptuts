import type { Timeline } from "@/lib/timeline";
import {
  beginDrive,
  finishDrive,
  hoverOn,
  pressOn,
} from "@/components/drive/drive-timeline";
import { DRIVE_URLS } from "@/components/drive/drive-data";
import { CAPTIONS } from "./data";

export const STEP58_DURATION_MS = 13500;

export async function runStep58(tl: Timeline) {
  beginDrive(tl, DRIVE_URLS.shared, "shared", [0.25, 0.2]);
  tl.setVar("drivePage", "shared");
  tl.setVar("driveActiveNav", "shared");
  tl.setVar("driveSharedTab", "with-you");
  tl.setVar("driveSharedFilter", "All");
  tl.setVar("driveSharedSelectedIds", []);
  tl.setVar("driveSharedHiddenIds", []);

  // 1. Switch to "By you" tab
  await tl.at(500);
  tl.showCaption(CAPTIONS.clickByYou);
  await hoverOn(tl, "[data-tl=tab-shared-by-you]", { ms: 600 });
  await tl.wait(150);
  await pressOn(tl, "[data-tl=tab-shared-by-you]");
  tl.setVar("driveSharedTab", "by-you");

  // 2. Open row 1 menu (Q3 report.pdf)
  await tl.at(2400);
  tl.showCaption(CAPTIONS.openRowMenu1);
  await hoverOn(tl, "[data-tl=btn-shared-row-menu-1]", { ms: 500 });
  await tl.wait(150);
  await pressOn(tl, "[data-tl=btn-shared-row-menu-1]");
  tl.setVar("driveSharedRowMenuOpenId", "sb-1");

  // 3. Click Share
  await tl.at(4200);
  tl.showCaption(CAPTIONS.clickShare);
  await hoverOn(tl, "[data-tl=btn-shared-menu-share]", { ms: 500 });
  await tl.wait(150);
  await pressOn(tl, "[data-tl=btn-shared-menu-share]");
  tl.setVar("driveSharedRowMenuOpenId", "");
  tl.setVar("driveShareItemName", "Q3 report.pdf");
  tl.setVar("driveShareRole", "Can edit");
  tl.setVar("driveShareModalOpen", true);

  // 4. Send share invitation
  await tl.at(6200);
  tl.showCaption(CAPTIONS.sendShare);
  await hoverOn(tl, "[data-tl=btn-share-send]", { ms: 500 });
  await tl.wait(150);
  await pressOn(tl, "[data-tl=btn-share-send]");
  tl.setVar("driveShareModalOpen", false);
  tl.setVar("driveShareSuccessToastOpen", true);

  // 5. Open row 3 menu (Budget.xlsx)
  await tl.at(8200);
  tl.showCaption(CAPTIONS.openRowMenu3);
  await hoverOn(tl, "[data-tl=btn-shared-row-menu-3]", { ms: 500 });
  await tl.wait(150);
  await pressOn(tl, "[data-tl=btn-shared-row-menu-3]");
  tl.setVar("driveSharedRowMenuOpenId", "sb-3");

  // 6. Click Hide from Shared
  await tl.at(10200);
  tl.showCaption(CAPTIONS.hideFromShared);
  await hoverOn(tl, "[data-tl=btn-shared-menu-hide]", { ms: 500 });
  await tl.wait(150);
  await pressOn(tl, "[data-tl=btn-shared-menu-hide]");
  tl.setVar("driveSharedRowMenuOpenId", "");
  tl.setVar("driveSharedHideCount", 1);
  tl.setVar("driveSharedHiddenIds", ["sb-3"]);
  tl.setVar("driveSharedHideToastOpen", true);

  await tl.wait(1200);
  await finishDrive(tl, STEP58_DURATION_MS);
}
