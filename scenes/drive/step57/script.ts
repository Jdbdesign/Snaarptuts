import type { Timeline } from "@/lib/timeline";
import {
  beginDrive,
  finishDrive,
  hoverOn,
  pressOn,
} from "@/components/drive/drive-timeline";
import { DRIVE_URLS } from "@/components/drive/drive-data";
import { CAPTIONS } from "./data";

export const STEP57_DURATION_MS = 15000;

export async function runStep57(tl: Timeline) {
  beginDrive(tl, DRIVE_URLS.shared, "shared", [0.2, 0.3]);
  tl.setVar("drivePage", "shared");
  tl.setVar("driveActiveNav", "shared");
  tl.setVar("driveSharedTab", "with-you");
  tl.setVar("driveSharedFilter", "All");
  tl.setVar("driveSharedFilterText", "");
  tl.setVar("driveSharedSelectedIds", []);
  tl.setVar("driveSharedHiddenIds", []);

  // 1. Intro
  await tl.at(500);
  tl.showCaption(CAPTIONS.intro);

  // 2. Filter Folders chip
  await tl.at(2000);
  tl.showCaption(CAPTIONS.filterChips);
  await hoverOn(tl, "[data-tl=chip-shared-folders]", { ms: 500 });
  await tl.wait(150);
  await pressOn(tl, "[data-tl=chip-shared-folders]");
  tl.setVar("driveSharedFilter", "Folders");

  // 3. Filter Documents chip
  await tl.at(3800);
  await hoverOn(tl, "[data-tl=chip-shared-documents]", { ms: 500 });
  await tl.wait(150);
  await pressOn(tl, "[data-tl=chip-shared-documents]");
  tl.setVar("driveSharedFilter", "Documents");

  // 4. Reset to All
  await tl.at(5400);
  tl.showCaption(CAPTIONS.resetFilter);
  await hoverOn(tl, "[data-tl=chip-shared-all]", { ms: 500 });
  await tl.wait(150);
  await pressOn(tl, "[data-tl=chip-shared-all]");
  tl.setVar("driveSharedFilter", "All");

  // 5. Type "Alex" into filter input
  await tl.at(6800);
  tl.showCaption(CAPTIONS.filterAlex);
  await hoverOn(tl, "[data-tl=input-shared-filter]", { ms: 500 });
  await pressOn(tl, "[data-tl=input-shared-filter]");
  await tl.typeText("shared-filter-text", "Alex", { msPerChar: 70 });
  tl.setVar("driveSharedFilterText", "Alex");
  await tl.wait(1000);
  tl.setVar("driveSharedFilterText", "");

  // 6. Open three-dot menu on row 1 (Project brief.docx)
  await tl.at(9500);
  tl.showCaption(CAPTIONS.openMenu);
  await hoverOn(tl, "[data-tl=btn-shared-row-menu-1]", { ms: 500 });
  await tl.wait(150);
  await pressOn(tl, "[data-tl=btn-shared-row-menu-1]");
  tl.setVar("driveSharedRowMenuOpenId", "sw-1");

  // 7. Click Add shortcut to My files
  await tl.at(11000);
  tl.showCaption(CAPTIONS.addShortcut);
  await hoverOn(tl, "[data-tl=btn-shared-menu-shortcut]", { ms: 500 });
  await tl.wait(150);
  await pressOn(tl, "[data-tl=btn-shared-menu-shortcut]");
  tl.setVar("driveSharedRowMenuOpenId", "");
  tl.setVar("driveSharedShortcutToastOpen", true);
  tl.setVar("driveHasShortcutProjectBrief", true);

  // 8. Click My Files to see shortcut
  await tl.at(12600);
  tl.showCaption(CAPTIONS.clickMyFiles);
  await hoverOn(tl, "[data-tl=nav-files]", { ms: 600 });
  await tl.wait(150);
  await pressOn(tl, "[data-tl=nav-files]");
  tl.setVar("drivePage", "files");
  tl.setVar("driveActiveNav", "files");
  tl.setVar("driveFilesViewMode", "tiles");
  tl.setUrl(DRIVE_URLS.files);
  await tl.wait(400);
  await hoverOn(tl, "[data-tl=tile-file-shortcut-projectbrief]", { ms: 500 });

  await finishDrive(tl, STEP57_DURATION_MS);
}
