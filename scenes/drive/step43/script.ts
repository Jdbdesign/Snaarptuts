import type { Timeline } from "@/lib/timeline";
import {
  beginDrive,
  finishDrive,
  hoverOn,
  pressOn,
} from "@/components/drive/drive-timeline";
import { DRIVE_URLS } from "@/components/drive/drive-data";
import { CAPTIONS } from "./data";

export const STEP43_DURATION_MS = 9000;

export async function runStep43(tl: Timeline) {
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
  tl.setVar("driveWorkspacesFolderColor", "#A855F7");

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
  tl.showCaption(CAPTIONS.clickDetails);
  await hoverOn(tl, "[data-tl=item-menu-details]", { ms: 600 });
  await tl.wait(150);
  await pressOn(tl, "[data-tl=item-menu-details]");
  tl.setVar("driveItemMenuOpen", false);
  tl.setVar("driveDetailsOpen", true);
  tl.setVar("driveDetailsItem", "Workspaces");

  await tl.at(5000);
  tl.showCaption(CAPTIONS.inspectMetadata);
  await hoverOn(tl, "[data-tl=details-drawer]", { ms: 600 });
  await tl.wait(1500);

  await finishDrive(tl, STEP43_DURATION_MS);
}
