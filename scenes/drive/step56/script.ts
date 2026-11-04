import type { Timeline } from "@/lib/timeline";
import {
  beginDrive,
  finishDrive,
  hoverOn,
  pressOn,
} from "@/components/drive/drive-timeline";
import { DRIVE_URLS } from "@/components/drive/drive-data";
import { CAPTIONS } from "./data";

export const STEP56_DURATION_MS = 8500;

export async function runStep56(tl: Timeline) {
  beginDrive(tl, DRIVE_URLS.dashboard, "home", [0.15, 0.45]);

  await tl.at(500);
  tl.showCaption(CAPTIONS.openShared);
  await hoverOn(tl, "[data-tl=nav-shared]", { ms: 600 });
  await tl.wait(150);
  await pressOn(tl, "[data-tl=nav-shared]");
  tl.setVar("drivePage", "shared");
  tl.setVar("driveActiveNav", "shared");
  tl.setUrl(DRIVE_URLS.shared);

  await tl.at(2500);
  tl.showCaption(CAPTIONS.filterChips);
  await hoverOn(tl, "[data-tl=chip-shared-folders]", { ms: 500 });
  await tl.wait(150);
  await pressOn(tl, "[data-tl=chip-shared-folders]");
  tl.setVar("driveSharedFilter", "Folders");

  await tl.at(4200);
  await hoverOn(tl, "[data-tl=chip-shared-documents]", { ms: 500 });
  await tl.wait(150);
  await pressOn(tl, "[data-tl=chip-shared-documents]");
  tl.setVar("driveSharedFilter", "Documents");

  await tl.at(6000);
  tl.showCaption(CAPTIONS.resetFilter);
  await hoverOn(tl, "[data-tl=chip-shared-all]", { ms: 500 });
  await tl.wait(150);
  await pressOn(tl, "[data-tl=chip-shared-all]");
  tl.setVar("driveSharedFilter", "All");
  await tl.wait(1500);

  await finishDrive(tl, STEP56_DURATION_MS);
}
