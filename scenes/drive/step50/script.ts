import type { Timeline } from "@/lib/timeline";
import {
  beginDrive,
  finishDrive,
  hoverOn,
  pressOn,
} from "@/components/drive/drive-timeline";
import { DRIVE_URLS } from "@/components/drive/drive-data";
import { CAPTIONS } from "./data";

export const STEP50_DURATION_MS = 10500;

export async function runStep50(tl: Timeline) {
  beginDrive(tl, DRIVE_URLS.files, "files", [0.5, 0.9]);
  tl.setVar("driveFilesViewMode", "tiles");
  tl.setVar("driveFolderBrandLogosAdded", true);
  tl.setVar("driveFolderProjectFilesAdded", true);
  tl.setVar("driveBulkSelectedIds", ["payslip", "meeting-notes", "project-brief"]);
  tl.setVar("driveBulkSelectedCount", 3);
  tl.setVar("driveBulkBarOpen", true);

  await tl.at(500);
  tl.showCaption(CAPTIONS.clickMove, { target: "[data-tl=btn-bulk-move]" });
  await hoverOn(tl, "[data-tl=btn-bulk-move]", { ms: 600 });
  await tl.wait(150);
  await pressOn(tl, "[data-tl=btn-bulk-move]");
  tl.setVar("driveBulkMoveModalOpen", true);

  await tl.at(2500);
  tl.showCaption(CAPTIONS.selectDestination);
  await hoverOn(tl, "[data-tl=item-folder-project-notes]", { ms: 600 });
  await tl.wait(150);
  await pressOn(tl, "[data-tl=item-folder-project-notes]");
  tl.setVar("driveBulkMoveTargetFolder", "Project Notes");

  await tl.at(4500);
  tl.showCaption(CAPTIONS.clickMoveHere);
  await hoverOn(tl, "[data-tl=btn-bulk-move-confirm]", { ms: 500 });
  await tl.wait(150);
  await pressOn(tl, "[data-tl=btn-bulk-move-confirm]");
  tl.setVar("driveIsBulkMoving", true);

  await tl.wait(800);
  tl.setVar("driveIsBulkMoving", false);
  tl.setVar("driveBulkMoveModalOpen", false);
  tl.setVar("driveBulkBarOpen", false);
  tl.setVar("driveBulkSelectedIds", []);
  tl.setVar("driveBulkItemsMoved", true);
  tl.setVar("driveBulkMoveToastOpen", true);

  await tl.at(7200);
  tl.showCaption(CAPTIONS.openTargetFolder);
  await hoverOn(tl, "[data-tl=tile-folder-project-notes]", { ms: 600 });
  await tl.wait(150);
  await pressOn(tl, "[data-tl=tile-folder-project-notes]");
  tl.setVar("driveInsideProjectNotesFolder", true);
  tl.setUrl("drive.snaarp.com/files?folder=project-notes");
  await tl.wait(1500);

  await finishDrive(tl, STEP50_DURATION_MS);
}
