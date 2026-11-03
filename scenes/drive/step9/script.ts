import type { Timeline } from "@/lib/timeline";
import {
  beginDrive,
  finishDrive,
  hoverOn,
  pressOn,
} from "@/components/drive/drive-timeline";
import { DRIVE_URLS } from "@/components/drive/drive-data";
import { CAPTIONS } from "./data";

export const STEP9_DURATION_MS = 10000;

export async function runStep9(tl: Timeline) {
  beginDrive(tl, DRIVE_URLS.dashboard, "home", [0.45, 0.3]);

  await tl.at(500);
  tl.showCaption(CAPTIONS.intro);

  await tl.at(2000);
  tl.showCaption(CAPTIONS.clickFolders);
  await hoverOn(tl, "[data-tl=filter-chip-folders]", { ms: 500 });

  await tl.at(2900);
  await pressOn(tl, "[data-tl=filter-chip-folders]");
  tl.setVar("driveRecentFilter", "folders");

  await tl.at(4200);
  tl.showCaption(CAPTIONS.clickPdf);
  await hoverOn(tl, "[data-tl=filter-chip-pdf]", { ms: 500 });

  await tl.at(5100);
  await pressOn(tl, "[data-tl=filter-chip-pdf]");
  tl.setVar("driveRecentFilter", "pdf");

  await tl.at(6300);
  await hoverOn(tl, "[data-tl=filter-chip-images]", { ms: 500 });

  await tl.at(6900);
  await pressOn(tl, "[data-tl=filter-chip-images]");
  tl.setVar("driveRecentFilter", "images");

  await tl.at(8000);
  await hoverOn(tl, "[data-tl=filter-chip-all]", { ms: 400 });

  await tl.at(8500);
  await pressOn(tl, "[data-tl=filter-chip-all]");
  tl.setVar("driveRecentFilter", "all");

  await finishDrive(tl, STEP9_DURATION_MS);

}
