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

export const STEP12_DURATION_MS = 8500;

export async function runStep12(tl: Timeline) {
  beginDrive(tl, DRIVE_URLS.files, "files", [0.45, 0.2]);

  await tl.at(500);
  tl.showCaption(CAPTIONS.intro);

  await tl.at(2000);
  tl.showCaption(CAPTIONS.clickSort);
  await hoverOn(tl, "[data-tl=btn-files-sort]", { ms: 600 });

  await tl.at(3100);
  await pressOn(tl, "[data-tl=btn-files-sort]");
  tl.setVar("driveSortMenuOpen", true);

  await tl.at(4000);
  await ring(tl, "[data-tl=sort-dropdown-menu]", 2500);

  await tl.at(6700);
  await pressOn(tl, "[data-tl=btn-files-sort]");
  tl.setVar("driveSortMenuOpen", false);

  await finishDrive(tl, STEP12_DURATION_MS);

}
