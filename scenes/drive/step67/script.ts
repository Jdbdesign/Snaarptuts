import type { Timeline } from "@/lib/timeline";
import {
  beginDrive,
  finishDrive,
  hoverOn,
  pressOn,
} from "@/components/drive/drive-timeline";
import { CAPTIONS } from "./data";

export const STEP67_DURATION_MS = 11000;

export async function runStep67(tl: Timeline) {
  beginDrive(tl, "drive.snaarp.com/files?folder=2172", "files", [0.45, 0.45]);
  tl.setVar("drivePage", "files");
  tl.setVar("driveActiveNav", "files");
  tl.setVar("driveFilesViewMode", "tiles");
  tl.setVar("driveCurrentBreadcrumb", ["Workspaces", "Marketing Space"]);
  tl.setVar("driveWorkspaceMarketingSpaceCreated", true);
  tl.setVar("driveWorkspaceFolderAdded", true);

  await tl.at(500);
  tl.showCaption(CAPTIONS.openVideosFolder);
  await hoverOn(tl, "[data-tl=tile-folder-all-videos]", { ms: 600 });
  await tl.wait(150);
  await pressOn(tl, "[data-tl=tile-folder-all-videos]");
  tl.setVar("driveCurrentBreadcrumb", ["Workspaces", "Marketing Space", "All videos"]);
  tl.setUrl("drive.snaarp.com/files?folder=2173");

  await tl.at(2800);
  tl.showCaption(CAPTIONS.clickUpload);
  await hoverOn(tl, "[data-tl=btn-files-create]", { ms: 600 });
  await tl.wait(150);
  await pressOn(tl, "[data-tl=btn-files-create]");
  tl.setVar("driveCreateMenuOpen", true);

  await tl.at(4500);
  await hoverOn(tl, "[data-tl=menu-item-file-upload]", { ms: 500 });
  await tl.wait(150);
  await pressOn(tl, "[data-tl=menu-item-file-upload]");
  tl.setVar("driveCreateMenuOpen", false);
  tl.setVar("driveUploadToastOpen", true);
  tl.setVar("driveUploadToastExpanded", true);
  tl.setVar("driveUploadFileName", "Launch video.mp4");
  tl.setVar("driveUploadToastCompleted", false);

  await tl.at(6500);
  tl.showCaption(CAPTIONS.uploadProgress);
  await tl.wait(1500);
  tl.setVar("driveUploadToastCompleted", true);

  await tl.at(8500);
  tl.showCaption(CAPTIONS.finishUpload);
  await hoverOn(tl, "[data-tl=btn-toast-done]", { ms: 500 });
  await tl.wait(150);
  await pressOn(tl, "[data-tl=btn-toast-done]");
  tl.setVar("driveUploadToastOpen", false);
  tl.setVar("driveWorkspaceFileUploaded", true);
  await tl.wait(200);
  await hoverOn(tl, "[data-tl=tile-file-launch-video]", { ms: 600 });
  await tl.wait(1500);

  await finishDrive(tl, STEP67_DURATION_MS);
}
