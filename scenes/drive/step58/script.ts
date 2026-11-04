import type { Timeline } from "@/lib/timeline";
import {
  beginDrive,
  finishDrive,
  hoverOn,
  pressOn,
} from "@/components/drive/drive-timeline";
import { DRIVE_URLS } from "@/components/drive/drive-data";
import { CAPTIONS } from "./data";

export const STEP58_DURATION_MS = 9500;

export async function runStep58(tl: Timeline) {
  beginDrive(tl, DRIVE_URLS.shared, "shared", [0.25, 0.4]);
  tl.setVar("drivePage", "shared");
  tl.setVar("driveActiveNav", "shared");
  tl.setVar("driveSharedTab", "by-you");

  await tl.at(500);
  tl.showCaption(CAPTIONS.selectSharedRows);
  await hoverOn(tl, "[data-tl=checkbox-shared-row-2]", { ms: 600 });
  await tl.wait(150);
  await pressOn(tl, "[data-tl=checkbox-shared-row-2]");
  tl.setVar("driveSharedSelectedIds", ["s-2"]);

  await tl.at(2200);
  await hoverOn(tl, "[data-tl=checkbox-shared-row-3]", { ms: 500 });
  await tl.wait(150);
  await pressOn(tl, "[data-tl=checkbox-shared-row-3]");
  tl.setVar("driveSharedSelectedIds", ["s-2", "s-3"]);

  await tl.at(4200);
  tl.showCaption(CAPTIONS.addShortcut);
  await hoverOn(tl, "[data-tl=btn-shared-bulk-shortcut]", { ms: 600 });
  await tl.wait(150);
  await pressOn(tl, "[data-tl=btn-shared-bulk-shortcut]");
  tl.setVar("driveSharedShortcutToastOpen", true);

  await tl.at(6500);
  tl.showCaption(CAPTIONS.hideFromShared);
  await hoverOn(tl, "[data-tl=btn-shared-bulk-hide]", { ms: 600 });
  await tl.wait(150);
  await pressOn(tl, "[data-tl=btn-shared-bulk-hide]");
  tl.setVar("driveSharedHiddenIds", ["s-2", "s-3"]);
  tl.setVar("driveSharedSelectedIds", []);
  tl.setVar("driveSharedHideToastOpen", true);
  await tl.wait(1500);

  await finishDrive(tl, STEP58_DURATION_MS);
}
