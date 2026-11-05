import type { Timeline } from "@/lib/timeline";
import {
  beginDrive,
  finishDrive,
  hoverOn,
  pressOn,
} from "@/components/drive/drive-timeline";
import { DRIVE_URLS } from "@/components/drive/drive-data";
import { CAPTIONS } from "./data";

export const STEP44_DURATION_MS = 7000;

export async function runStep44(tl: Timeline) {
  beginDrive(tl, DRIVE_URLS.files, "files", [0.4, 0.4]);
  tl.setVar("driveFilesViewMode", "tiles");
  tl.setVar("driveFolderBrandLogosAdded", true);
  tl.setVar("driveFolderProjectFilesAdded", true);

  await tl.at(500);
  tl.showCaption(CAPTIONS.selectFirst);
  await hoverOn(tl, "[data-tl=checkbox-bulk-payslip]", { ms: 600 });
  await tl.wait(150);
  await pressOn(tl, "[data-tl=checkbox-bulk-payslip]");
  tl.setVar("driveBulkSelectedIds", ["payslip"]);
  tl.setVar("driveBulkSelectedCount", 1);
  tl.setVar("driveBulkBarOpen", true);

  await tl.at(2400);
  tl.showCaption(CAPTIONS.selectMore);
  await hoverOn(tl, "[data-tl=checkbox-bulk-meeting-notes]", { ms: 500 });
  await tl.wait(100);
  await pressOn(tl, "[data-tl=checkbox-bulk-meeting-notes]");
  tl.setVar("driveBulkSelectedIds", ["payslip", "meeting-notes"]);
  tl.setVar("driveBulkSelectedCount", 2);

  await tl.at(4800);
  tl.showCaption(CAPTIONS.bulkBar);
  await hoverOn(tl, "[data-tl=bar-bulk-actions]", { ms: 700 });
  await tl.wait(1500);

  await finishDrive(tl, STEP44_DURATION_MS);
}
