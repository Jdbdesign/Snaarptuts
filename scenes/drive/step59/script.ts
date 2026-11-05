import type { Timeline } from "@/lib/timeline";
import {
  beginDrive,
  finishDrive,
  hoverOn,
  pressOn,
} from "@/components/drive/drive-timeline";
import { DRIVE_URLS } from "@/components/drive/drive-data";
import { CAPTIONS } from "./data";

export const STEP59_DURATION_MS = 11000;

export async function runStep59(tl: Timeline) {
  beginDrive(tl, DRIVE_URLS.shared, "shared", [0.25, 0.4]);
  tl.setVar("drivePage", "shared");
  tl.setVar("driveActiveNav", "shared");
  tl.setVar("driveSharedTab", "by-you");
  tl.setVar("driveSharedFilter", "All");
  tl.setVar("driveSharedSelectedIds", []);
  tl.setVar("driveSharedHiddenIds", []);

  // 1. Select row 2 (Client Files)
  await tl.at(500);
  tl.showCaption(CAPTIONS.selectSharedRows);
  await hoverOn(tl, "[data-tl=checkbox-shared-row-2]", { ms: 600 });
  await tl.wait(150);
  await pressOn(tl, "[data-tl=checkbox-shared-row-2]");
  tl.setVar("driveSharedSelectedIds", ["sb-2"]);

  // 2. Select row 3 (Budget.xlsx)
  await tl.at(2500);
  await hoverOn(tl, "[data-tl=checkbox-shared-row-3]", { ms: 500 });
  await tl.wait(150);
  await pressOn(tl, "[data-tl=checkbox-shared-row-3]");
  tl.setVar("driveSharedSelectedIds", ["sb-2", "sb-3"]);

  // 3. Click Add shortcut to My files on bulk action bar
  await tl.at(4600);
  tl.showCaption(CAPTIONS.addShortcut);
  await hoverOn(tl, "[data-tl=btn-shared-bulk-shortcut]", { ms: 600 });
  await tl.wait(150);
  await pressOn(tl, "[data-tl=btn-shared-bulk-shortcut]");
  tl.setVar("driveSharedShortcutToastOpen", true);

  // 4. Click Hide from Shared on bulk action bar
  await tl.at(7200);
  tl.showCaption(CAPTIONS.hideFromShared);
  await hoverOn(tl, "[data-tl=btn-shared-bulk-hide]", { ms: 600 });
  await tl.wait(150);
  await pressOn(tl, "[data-tl=btn-shared-bulk-hide]");
  tl.setVar("driveSharedHideCount", 2);
  tl.setVar("driveSharedHiddenIds", ["sb-2", "sb-3"]);
  tl.setVar("driveSharedSelectedIds", []);
  tl.setVar("driveSharedHideToastOpen", true);

  await tl.wait(1500);
  await finishDrive(tl, STEP59_DURATION_MS);
}
