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

export const STEP24_DURATION_MS = 8500;

export async function runStep24(tl: Timeline) {
  beginDrive(tl, DRIVE_URLS.dashboard, "home", [0.4, 0.45]);
  tl.setVar("driveHomeHasProjectFiles", true);
  tl.setVar("driveFolderProjectFilesAdded", true);

  await tl.at(500);
  tl.showCaption(CAPTIONS.recentFolder);
  await hoverOn(tl, "[data-tl=row-recent-project-files]", { ms: 600 });
  await ring(tl, "[data-tl=row-recent-project-files]", 1800);

  await tl.at(2800);
  tl.showCaption(CAPTIONS.clickMyFiles);
  await hoverOn(tl, "[data-tl=nav-files]", { ms: 600 });
  await tl.wait(150);
  await pressOn(tl, "[data-tl=nav-files]");
  tl.setVar("drivePage", "files");
  tl.setVar("driveActiveNav", "files");
  tl.setUrl(DRIVE_URLS.files);
  tl.setVar("driveFilesViewMode", "tiles");

  await tl.at(4800);
  tl.showCaption(CAPTIONS.tilesViewRedFolder);
  await hoverOn(tl, "[data-tl=tile-folder-project-files]", { ms: 600 });
  await ring(tl, "[data-tl=tile-folder-project-files]", 2600);

  await finishDrive(tl, STEP24_DURATION_MS);
}
