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

export const STEP26_DURATION_MS = 8500;

export async function runStep26(tl: Timeline) {
  beginDrive(tl, DRIVE_URLS.files, "files", [0.4, 0.6]);
  tl.setVar("driveFilesViewMode", "tiles");
  tl.setVar("driveFolderProjectFilesAdded", true);
  tl.setVar("driveFileQuarterlyReportAdded", true);
  tl.setVar("driveUploadToastOpen", true);
  tl.setVar("driveUploadToastCompleted", true);
  tl.setVar("driveUploadToastCount", 1);

  await tl.at(500);
  tl.showCaption(CAPTIONS.toastProgress);
  await hoverOn(tl, "[data-tl=upload-toast]", { ms: 600 });
  await ring(tl, "[data-tl=upload-toast]", 1800);

  await tl.at(2800);
  tl.showCaption(CAPTIONS.tileAppeared);
  await hoverOn(tl, "[data-tl=tile-file-quarterly-report]", { ms: 600 });
  await ring(tl, "[data-tl=tile-file-quarterly-report]", 2200);

  await tl.at(5500);
  tl.showCaption(CAPTIONS.clickDone);
  await hoverOn(tl, "[data-tl=btn-toast-done]", { ms: 600 });
  await tl.wait(150);
  await pressOn(tl, "[data-tl=btn-toast-done]");
  tl.setVar("driveUploadToastOpen", false);

  await finishDrive(tl, STEP26_DURATION_MS);
}
