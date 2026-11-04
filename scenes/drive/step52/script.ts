import type { Timeline } from "@/lib/timeline";
import {
  beginDrive,
  finishDrive,
  hoverOn,
  pressOn,
} from "@/components/drive/drive-timeline";
import { DRIVE_URLS } from "@/components/drive/drive-data";
import { CAPTIONS } from "./data";

export const STEP52_DURATION_MS = 7500;

export async function runStep52(tl: Timeline) {
  beginDrive(tl, DRIVE_URLS.files, "files", [0.15, 0.45]);
  tl.setVar("driveBulkItemsDeleted", true);

  await tl.at(500);
  tl.showCaption(CAPTIONS.clickRecycleBin);
  await hoverOn(tl, "[data-tl=nav-trash]", { ms: 600 });
  await tl.wait(150);
  await pressOn(tl, "[data-tl=nav-trash]");
  tl.setVar("drivePage", "trash");
  tl.setVar("driveActiveNav", "trash");
  tl.setUrl(DRIVE_URLS.trash);

  await tl.at(2500);
  tl.showCaption(CAPTIONS.inspectTrash);
  await hoverOn(tl, "[data-tl=row-trash-trash-1]", { ms: 600 });
  await tl.wait(500);
  await hoverOn(tl, "[data-tl=row-trash-trash-2]", { ms: 600 });
  await tl.wait(1500);

  await finishDrive(tl, STEP52_DURATION_MS);
}
