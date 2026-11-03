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

export const STEP13_DURATION_MS = 11000;

export async function runStep13(tl: Timeline) {
  beginDrive(tl, DRIVE_URLS.files, "files", [0.55, 0.2]);

  await tl.at(500);
  tl.showCaption(CAPTIONS.intro);

  await tl.at(2000);
  tl.showCaption(CAPTIONS.clickCompact);
  await hoverOn(tl, "[data-tl=btn-files-view-toggle]", { ms: 500 });

  await tl.at(2900);
  await pressOn(tl, "[data-tl=btn-files-view-toggle]");
  tl.setVar("driveViewMenuOpen", true);

  await tl.at(3600);
  await hoverOn(tl, "[data-tl=view-opt-compact]", { ms: 500 });

  await tl.at(4200);
  await pressOn(tl, "[data-tl=view-opt-compact]");
  tl.setVar("driveFilesViewMode", "compact");
  tl.setVar("driveViewMenuOpen", false);

  await tl.at(5200);
  tl.showCaption(CAPTIONS.clickTiles);

  await tl.at(5500);
  await hoverOn(tl, "[data-tl=btn-files-view-toggle]", { ms: 500 });

  await tl.at(6100);
  await pressOn(tl, "[data-tl=btn-files-view-toggle]");
  tl.setVar("driveViewMenuOpen", true);

  await tl.at(6800);
  await hoverOn(tl, "[data-tl=view-opt-tiles]", { ms: 500 });

  await tl.at(7400);
  await pressOn(tl, "[data-tl=view-opt-tiles]");
  tl.setVar("driveFilesViewMode", "tiles");
  tl.setVar("driveViewMenuOpen", false);

  await tl.at(8200);
  await ring(tl, "[data-tl=tiles-view-grid]", 2000);

  await finishDrive(tl, STEP13_DURATION_MS);

}
