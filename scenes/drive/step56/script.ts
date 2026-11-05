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

export const STEP56_DURATION_MS = 12500;

export async function runStep56(tl: Timeline) {
  beginDrive(tl, DRIVE_URLS.shared, "shared", [0.4, 0.4]);
  tl.setVar("driveSharedTab", "by-you");

  await tl.at(500);
  tl.showCaption(CAPTIONS.selectRows);
  await hoverOn(tl, "[data-tl=checkbox-shared-row-2]", { ms: 600 });
  await tl.wait(150);
  await pressOn(tl, "[data-tl=checkbox-shared-row-2]");
  tl.setVar("driveSharedSelectedIds", ["shared-by-2"]);

  await tl.at(2200);
  await hoverOn(tl, "[data-tl=checkbox-shared-row-3]", { ms: 600 });
  await tl.wait(150);
  await pressOn(tl, "[data-tl=checkbox-shared-row-3]");
  tl.setVar("driveSharedSelectedIds", ["shared-by-2", "shared-by-3"]);

  await tl.at(4000);
  tl.showCaption(CAPTIONS.bulkBarAppears);
  await hoverOn(tl, "[data-tl=bar-shared-bulk-actions]", { ms: 600 });
  await ring(tl, "[data-tl=bar-shared-bulk-actions]", 1800);

  await tl.at(6200);
  tl.showCaption(CAPTIONS.bulkShortcut);
  await hoverOn(tl, "[data-tl=btn-shared-bulk-shortcut]", { ms: 600 });
  await tl.wait(150);
  await pressOn(tl, "[data-tl=btn-shared-bulk-shortcut]");
  tl.setVar("driveSharedShortcutToastOpen", true);

  await tl.at(9000);
  tl.showCaption(CAPTIONS.bulkHide);
  await hoverOn(tl, "[data-tl=btn-shared-bulk-hide]", { ms: 600 });
  await tl.wait(150);
  await pressOn(tl, "[data-tl=btn-shared-bulk-hide]");
  tl.setVar("driveSharedHideToastOpen", true);
  tl.setVar("driveSharedHideCount", 2);
  tl.setVar("driveSharedHiddenIds", ["shared-by-2", "shared-by-3"]);
  tl.setVar("driveSharedSelectedIds", []);

  await finishDrive(tl, STEP56_DURATION_MS);
}
