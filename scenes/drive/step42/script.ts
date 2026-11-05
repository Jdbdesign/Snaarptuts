import type { Timeline } from "@/lib/timeline";
import {
  beginDrive,
  finishDrive,
  hoverOn,
  pressOn,
} from "@/components/drive/drive-timeline";
import { DRIVE_URLS } from "@/components/drive/drive-data";
import { CAPTIONS } from "./data";

export const STEP42_DURATION_MS = 10500;

export async function runStep42(tl: Timeline) {
  beginDrive(tl, DRIVE_URLS.files, "files", [0.35, 0.35]);
  tl.setVar("driveFilesViewMode", "tiles");
  tl.setVar("driveFolderBrandLogosAdded", true);
  tl.setVar("driveFolderProjectFilesAdded", true);
  tl.setVar("driveFileQuarterlyReportAdded", true);
  tl.setVar("driveFileMeetingNotesAdded", true);
  tl.setVar("driveFileSampleTxtAdded", true);
  tl.setVar("driveFileSampleTxtTitle", "Sample notes.txt");
  tl.setVar("driveItemIsPinned", true);
  tl.setVar("driveItemIsFavorite", true);

  await tl.at(500);
  tl.showCaption(CAPTIONS.clickFolderMenu);
  await hoverOn(tl, "[data-tl=btn-tile-menu-workspaces]", { ms: 600 });
  await tl.wait(150);
  await pressOn(tl, "[data-tl=btn-tile-menu-workspaces]");
  tl.setVar("driveItemMenuType", "folder");
  tl.setVar("driveItemMenuName", "Workspaces");
  tl.setVar("driveItemMenuTrigger", "[data-tl=btn-tile-menu-workspaces]");
  tl.setVar("driveItemMenuOpen", true);

  await tl.at(2500);
  tl.showCaption(CAPTIONS.clickFolderColor);
  await hoverOn(tl, "[data-tl=item-menu-folder-color]", { ms: 600 });
  await tl.wait(150);
  await pressOn(tl, "[data-tl=item-menu-folder-color]");
  tl.setVar("driveItemMenuOpen", false);
  tl.setVar("driveFolderColorModalOpen", true);

  await tl.at(4800);
  tl.showCaption(CAPTIONS.pickPurple);
  await hoverOn(tl, "[data-tl=color-swatch-purple]", { ms: 600 });
  await tl.wait(150);
  await pressOn(tl, "[data-tl=color-swatch-purple]");
  tl.setVar("driveFolderSelectedColor", "purple");
  tl.setVar("driveWorkspacesFolderColor", "#A855F7");

  await tl.at(7000);
  tl.showCaption(CAPTIONS.applyColor);
  await hoverOn(tl, "[data-tl=btn-color-apply]", { ms: 600 });
  await tl.wait(150);
  await pressOn(tl, "[data-tl=btn-color-apply]");
  tl.setVar("driveIsApplyingColor", true);

  await tl.at(8200);
  tl.setVar("driveIsApplyingColor", false);
  tl.setVar("driveFolderColorModalOpen", false);

  await tl.at(9000);
  tl.showCaption(CAPTIONS.colorApplied);
  await hoverOn(tl, "[data-tl=tile-folder-workspaces]", { ms: 600 });
  await tl.wait(1000);

  await finishDrive(tl, STEP42_DURATION_MS);
}
