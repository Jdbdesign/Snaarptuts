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

export const STEP28_DURATION_MS = 9000;

export async function runStep28(tl: Timeline) {
  beginDrive(tl, DRIVE_URLS.files, "files", [0.4, 0.45]);
  tl.setVar("driveFilesViewMode", "tiles");
  tl.setVar("driveFolderBrandLogosAdded", true);
  tl.setVar("driveFolderProjectFilesAdded", true);
  tl.setVar("driveFileQuarterlyReportAdded", true);

  await tl.at(500);
  tl.showCaption(CAPTIONS.clickFolder);
  await hoverOn(tl, "[data-tl=tile-folder-brand-logos]", { ms: 600 });
  await tl.wait(150);
  await pressOn(tl, "[data-tl=tile-folder-brand-logos]");
  tl.setVar("driveInsideBrandLogosFolder", true);
  tl.setUrl("drive.snaarp.com/files?folder=brand-logos");

  await tl.at(3000);
  tl.showCaption(CAPTIONS.inspectFiles);
  await hoverOn(tl, "[data-tl=tile-file-logo-office]", { ms: 600 });
  await ring(tl, "[data-tl=tile-file-logo-office]", 2200);

  await tl.at(5800);
  tl.showCaption(CAPTIONS.clickBreadcrumb);
  await hoverOn(tl, "[data-tl=breadcrumb-my-files]", { ms: 600 });
  await tl.wait(150);
  await pressOn(tl, "[data-tl=breadcrumb-my-files]");
  tl.setVar("driveInsideBrandLogosFolder", false);
  tl.setUrl(DRIVE_URLS.files);

  await finishDrive(tl, STEP28_DURATION_MS);
}
