import type { Timeline } from "@/lib/timeline";
import {
  beginDrive,
  finishDrive,
  hoverOn,
  pressOn,
} from "@/components/drive/drive-timeline";
import { DRIVE_URLS } from "@/components/drive/drive-data";
import { CAPTIONS } from "./data";

export const STEP46_DURATION_MS = 8500;

export async function runStep46(tl: Timeline) {
  beginDrive(tl, DRIVE_URLS.files, "files", [0.45, 0.45]);
  tl.setVar("driveFilesViewMode", "tiles");
  tl.setVar("driveFolderBrandLogosAdded", true);
  tl.setVar("driveFolderProjectFilesAdded", true);

  await tl.at(500);
  tl.showCaption(CAPTIONS.selectItems);
  await hoverOn(tl, "[data-tl=checkbox-bulk-meeting-notes]", { ms: 600 });
  await tl.wait(150);
  await pressOn(tl, "[data-tl=checkbox-bulk-meeting-notes]");
  tl.setVar("driveBulkSelectedIds", ["meeting-notes"]);
  tl.setVar("driveBulkSelectedCount", 1);
  tl.setVar("driveBulkBarOpen", true);

  await tl.at(2200);
  await hoverOn(tl, "[data-tl=checkbox-bulk-project-brief]", { ms: 500 });
  await tl.wait(150);
  await pressOn(tl, "[data-tl=checkbox-bulk-project-brief]");
  tl.setVar("driveBulkSelectedIds", ["meeting-notes", "project-brief"]);
  tl.setVar("driveBulkSelectedCount", 2);

  await tl.at(3800);
  tl.showCaption(CAPTIONS.clickDelete);
  await hoverOn(tl, "[data-tl=btn-bulk-delete]", { ms: 600 });
  await tl.wait(150);
  await pressOn(tl, "[data-tl=btn-bulk-delete]");
  tl.setVar("driveBulkDeleteModalOpen", true);

  await tl.at(5500);
  tl.showCaption(CAPTIONS.confirmDelete);
  await hoverOn(tl, "[data-tl=btn-bulk-delete-confirm]", { ms: 600 });
  await tl.wait(150);
  await pressOn(tl, "[data-tl=btn-bulk-delete-confirm]");
  tl.setVar("driveIsBulkDeleting", true);

  await tl.wait(800);
  tl.setVar("driveIsBulkDeleting", false);
  tl.setVar("driveBulkDeleteModalOpen", false);
  tl.setVar("driveBulkBarOpen", false);
  tl.setVar("driveBulkSelectedIds", []);
  tl.setVar("driveBulkItemsDeleted", true);
  tl.setVar("driveBulkDeleteToastOpen", true);
  await tl.wait(1500);

  await finishDrive(tl, STEP46_DURATION_MS);
}
