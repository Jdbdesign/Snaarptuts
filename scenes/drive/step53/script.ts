import type { Timeline } from "@/lib/timeline";
import {
  beginDrive,
  finishDrive,
  hoverOn,
  pressOn,
} from "@/components/drive/drive-timeline";
import { DRIVE_URLS } from "@/components/drive/drive-data";
import { CAPTIONS } from "./data";

export const STEP53_DURATION_MS = 8500;

export async function runStep53(tl: Timeline) {
  beginDrive(tl, DRIVE_URLS.trash, "trash", [0.8, 0.35]);
  tl.setVar("drivePage", "trash");
  tl.setVar("driveActiveNav", "trash");

  await tl.at(500);
  tl.showCaption(CAPTIONS.clickRestore);
  await hoverOn(tl, "[data-tl=btn-trash-restore-trash-1]", { ms: 600 });
  await tl.wait(150);
  await pressOn(tl, "[data-tl=btn-trash-restore-trash-1]");
  tl.setVar("driveTrashRestoredId", "trash-1");
  tl.setVar("driveTrashRestoredToastOpen", true);

  await tl.at(3500);
  tl.showCaption(CAPTIONS.openMyFiles);
  await hoverOn(tl, "[data-tl=nav-files]", { ms: 600 });
  await tl.wait(150);
  await pressOn(tl, "[data-tl=nav-files]");
  tl.setVar("drivePage", "files");
  tl.setVar("driveActiveNav", "files");
  tl.setUrl(DRIVE_URLS.files);
  tl.setVar("driveFilesViewMode", "tiles");
  tl.setVar("driveBulkItemsDeleted", false);
  await tl.wait(2000);

  await finishDrive(tl, STEP53_DURATION_MS);
}
