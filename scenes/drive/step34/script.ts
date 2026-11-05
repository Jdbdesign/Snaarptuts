import type { Timeline } from "@/lib/timeline";
import {
  beginDrive,
  finishDrive,
  hoverOn,
  pressOn,
} from "@/components/drive/drive-timeline";
import { DRIVE_URLS } from "@/components/drive/drive-data";
import { CAPTIONS } from "./data";

export const STEP34_DURATION_MS = 14000;

export async function runStep34(tl: Timeline) {
  beginDrive(tl, DRIVE_URLS.files, "files", [0.35, 0.35]);
  tl.setVar("driveFilesViewMode", "tiles");
  tl.setVar("driveFolderBrandLogosAdded", true);
  tl.setVar("driveFolderProjectFilesAdded", true);
  tl.setVar("driveFileQuarterlyReportAdded", true);
  tl.setVar("driveFileMeetingNotesAdded", true);
  tl.setVar("driveFileSampleTxtAdded", true);
  tl.setVar("driveItemMenuType", "folder");
  tl.setVar("driveItemMenuName", "Workspaces");
  tl.setVar("driveItemMenuTrigger", "[data-tl=btn-tile-menu-workspaces]");
  tl.setVar("driveItemMenuOpen", true);

  await tl.at(500);
  tl.showCaption(CAPTIONS.clickOpen);
  await hoverOn(tl, "[data-tl=item-menu-open]", { ms: 600 });
  await tl.wait(150);
  await pressOn(tl, "[data-tl=item-menu-open]");
  tl.setVar("driveItemMenuOpen", false);
  tl.setVar("driveCurrentBreadcrumb", ["Workspaces"]);
  tl.setUrl("drive.snaarp.com/files?folder=workspaces");

  await tl.at(3000);
  tl.showCaption(CAPTIONS.openSocial);
  await hoverOn(tl, "[data-tl=tile-folder-social-media]", { ms: 600 });
  await tl.wait(150);
  await pressOn(tl, "[data-tl=tile-folder-social-media]");
  tl.setVar("driveCurrentBreadcrumb", ["Workspaces", "Social media Resources"]);
  tl.setUrl("drive.snaarp.com/files?folder=social-media");

  await tl.at(5500);
  tl.showCaption(CAPTIONS.openVideos);
  await hoverOn(tl, "[data-tl=tile-folder-videos]", { ms: 600 });
  await tl.wait(150);
  await pressOn(tl, "[data-tl=tile-folder-videos]");
  tl.setVar("driveCurrentBreadcrumb", ["Workspaces", "Social media Resources", "Videos"]);
  tl.setUrl("drive.snaarp.com/files?folder=videos");

  await tl.at(8000);
  tl.showCaption(CAPTIONS.stepBackSocial);
  await hoverOn(tl, "[data-tl=breadcrumb-social]", { ms: 600 });
  await tl.wait(150);
  await pressOn(tl, "[data-tl=breadcrumb-social]");
  tl.setVar("driveCurrentBreadcrumb", ["Workspaces", "Social media Resources"]);
  tl.setUrl("drive.snaarp.com/files?folder=social-media");

  await tl.at(10500);
  tl.showCaption(CAPTIONS.backToFiles);
  await hoverOn(tl, "[data-tl=breadcrumb-my-files]", { ms: 600 });
  await tl.wait(150);
  await pressOn(tl, "[data-tl=breadcrumb-my-files]");
  tl.setVar("driveCurrentBreadcrumb", []);
  tl.setUrl(DRIVE_URLS.files);

  await finishDrive(tl, STEP34_DURATION_MS);
}
