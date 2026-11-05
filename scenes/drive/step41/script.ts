import type { Timeline } from "@/lib/timeline";
import {
  beginDrive,
  finishDrive,
  hoverOn,
  pressOn,
} from "@/components/drive/drive-timeline";
import { DRIVE_URLS } from "@/components/drive/drive-data";
import { CAPTIONS } from "./data";

export const STEP41_DURATION_MS = 14000;

export async function runStep41(tl: Timeline) {
  beginDrive(tl, DRIVE_URLS.files, "files", [0.45, 0.45]);
  tl.setVar("driveFilesViewMode", "tiles");
  tl.setVar("driveFolderBrandLogosAdded", true);
  tl.setVar("driveFolderProjectFilesAdded", true);
  tl.setVar("driveFileQuarterlyReportAdded", true);
  tl.setVar("driveFileMeetingNotesAdded", true);
  tl.setVar("driveFileSampleTxtAdded", true);
  tl.setVar("driveFileSampleTxtTitle", "Sample notes.txt");

  await tl.at(500);
  tl.showCaption(CAPTIONS.addFavorites);
  await hoverOn(tl, "[data-tl=btn-tile-menu-sample-txt]", { ms: 600 });
  await tl.wait(150);
  await pressOn(tl, "[data-tl=btn-tile-menu-sample-txt]");
  tl.setVar("driveItemMenuType", "file");
  tl.setVar("driveItemMenuName", "Sample notes.txt");
  tl.setVar("driveItemMenuTrigger", "[data-tl=btn-tile-menu-sample-notes]");
  tl.setVar("driveItemMenuOpen", true);

  await tl.at(2000);
  await hoverOn(tl, "[data-tl=item-menu-add-favorites]", { ms: 500 });
  await tl.wait(150);
  await pressOn(tl, "[data-tl=item-menu-add-favorites]");
  tl.setVar("driveItemIsFavorite", true);
  tl.setVar("driveItemMenuOpen", false);

  await tl.at(3500);
  tl.showCaption(CAPTIONS.pinToTop);
  await hoverOn(tl, "[data-tl=btn-tile-menu-sample-txt]", { ms: 500 });
  await tl.wait(150);
  await pressOn(tl, "[data-tl=btn-tile-menu-sample-txt]");
  tl.setVar("driveItemMenuType", "file");
  tl.setVar("driveItemMenuName", "Sample notes.txt");
  tl.setVar("driveItemMenuTrigger", "[data-tl=btn-tile-menu-sample-notes]");
  tl.setVar("driveItemMenuOpen", true);

  await tl.at(5000);
  await hoverOn(tl, "[data-tl=item-menu-pin-to-top]", { ms: 500 });
  await tl.wait(150);
  await pressOn(tl, "[data-tl=item-menu-pin-to-top]");
  tl.setVar("driveItemIsPinned", true);
  tl.setVar("driveItemMenuOpen", false);

  await tl.at(7000);
  tl.showCaption(CAPTIONS.viewFavorites);
  await hoverOn(tl, "[data-tl=nav-favorites]", { ms: 600 });
  await tl.wait(150);
  await pressOn(tl, "[data-tl=nav-favorites]");
  tl.setVar("drivePage", "favorites");
  tl.setVar("driveActiveNav", "favorites");
  tl.setUrl(DRIVE_URLS.favorites);

  await tl.at(9500);
  tl.showCaption(CAPTIONS.favoriteTableRow);
  await hoverOn(tl, "[data-tl=row-fav-sample-txt]", { ms: 600 });
  await tl.wait(1200);

  await tl.at(11500);
  tl.showCaption(CAPTIONS.returnFiles);
  await hoverOn(tl, "[data-tl=nav-files]", { ms: 600 });
  await tl.wait(150);
  await pressOn(tl, "[data-tl=nav-files]");
  tl.setVar("drivePage", "files");
  tl.setVar("driveActiveNav", "files");
  tl.setUrl(DRIVE_URLS.files);

  await finishDrive(tl, STEP41_DURATION_MS);
}
