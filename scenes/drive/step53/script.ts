import type { Timeline } from "@/lib/timeline";
import {
  beginDrive,
  finishDrive,
  hoverOn,
  pressOn,
  ring,
} from "@/components/drive/drive-timeline";
import { DRIVE_URLS } from "@/components/drive/drive-data";
import { CAPTIONS } from "./data";

export const STEP53_DURATION_MS = 16500;

export async function runStep53(tl: Timeline) {
  beginDrive(tl, DRIVE_URLS.shared, "shared", [0.5, 0.35]);
  tl.setVar("driveSharedTab", "with-you");

  await tl.at(500);
  tl.showCaption(CAPTIONS.clickMenu);
  await hoverOn(tl, "[data-tl=btn-shared-row-menu-1]", { ms: 600 });
  await tl.wait(150);
  await pressOn(tl, "[data-tl=btn-shared-row-menu-1]");
  tl.setVar("driveSharedRowMenuOpenId", "shared-with-1");

  await tl.at(2800);
  tl.showCaption(CAPTIONS.addShortcut);
  await hoverOn(tl, "[data-tl=btn-shared-menu-shortcut]", { ms: 600 });
  await tl.wait(150);
  await pressOn(tl, "[data-tl=btn-shared-menu-shortcut]");
  tl.setVar("driveSharedRowMenuOpenId", "");
  tl.setVar("driveSharedShortcutToastOpen", true);
  tl.setVar("driveHasShortcutProjectBrief", true);

  await tl.at(5500);
  tl.showCaption(CAPTIONS.viewShortcut);
  await hoverOn(tl, "[data-tl=nav-files]", { ms: 600 });
  await tl.wait(150);
  await pressOn(tl, "[data-tl=nav-files]");
  tl.setVar("drivePage", "files");
  tl.setVar("driveActiveNav", "files");
  tl.setVar("driveFilesViewMode", "tiles");
  tl.setUrl(DRIVE_URLS.files);

  await tl.at(7500);
  await hoverOn(tl, "[data-tl=tile-file-shortcut-projectbrief]", { ms: 600 });
  await ring(tl, "[data-tl=tile-file-shortcut-projectbrief]", 2000);

  await tl.at(9800);
  tl.showCaption(CAPTIONS.backToShared);
  await hoverOn(tl, "[data-tl=nav-shared]", { ms: 600 });
  await tl.wait(150);
  await pressOn(tl, "[data-tl=nav-shared]");
  tl.setVar("drivePage", "shared");
  tl.setVar("driveActiveNav", "shared");
  tl.setUrl(DRIVE_URLS.shared);

  await tl.at(12000);
  tl.showCaption(CAPTIONS.hideItem);
  await hoverOn(tl, "[data-tl=btn-shared-row-menu-2]", { ms: 600 });
  await tl.wait(150);
  await pressOn(tl, "[data-tl=btn-shared-row-menu-2]");
  tl.setVar("driveSharedRowMenuOpenId", "shared-with-2");

  await tl.at(13800);
  await hoverOn(tl, "[data-tl=btn-shared-menu-hide]", { ms: 600 });
  await tl.wait(150);
  await pressOn(tl, "[data-tl=btn-shared-menu-hide]");
  tl.setVar("driveSharedRowMenuOpenId", "");
  tl.setVar("driveSharedHideCount", 1);
  tl.setVar("driveSharedHiddenIds", ["shared-with-2"]);
  tl.setVar("driveSharedHideToastOpen", true);

  await finishDrive(tl, STEP53_DURATION_MS);
}
