import type { Timeline } from "@/lib/timeline";
import {
  beginDrive,
  finishDrive,
  hoverOn,
  pressOn,
} from "@/components/drive/drive-timeline";
import { DRIVE_URLS } from "@/components/drive/drive-data";
import { CAPTIONS } from "./data";

export const STEP23_DURATION_MS = 10500;

export async function runStep23(tl: Timeline) {
  beginDrive(tl, DRIVE_URLS.dashboard, "home", [0.5, 0.45]);
  tl.setVar("driveFolderModalOpen", true);

  await tl.at(500);
  tl.showCaption(CAPTIONS.typeName);
  await hoverOn(tl, "[data-tl=input-folder-name]", { ms: 500 });
  await tl.wait(150);
  await tl.click("[data-tl=input-folder-name]");
  await tl.typeText("folderName", "Project Files", { msPerChar: 65 });

  await tl.at(3600);
  tl.showCaption(CAPTIONS.browseColors);
  await hoverOn(tl, "[data-tl=swatch-orange]", { ms: 500 });
  await tl.wait(300);
  await hoverOn(tl, "[data-tl=swatch-yellow]", { ms: 400 });
  await tl.wait(300);

  await tl.at(5500);
  tl.showCaption(CAPTIONS.clickRed);
  await hoverOn(tl, "[data-tl=swatch-red]", { ms: 500 });
  await tl.wait(150);
  await pressOn(tl, "[data-tl=swatch-red]");
  tl.setVar("driveFolderColor", "red");

  await tl.at(7500);
  tl.showCaption(CAPTIONS.clickCreate);
  await hoverOn(tl, "[data-tl=btn-modal-create]", { ms: 600 });
  await tl.wait(150);
  await pressOn(tl, "[data-tl=btn-modal-create]");
  tl.setVar("driveFolderModalOpen", false);
  tl.setVar("driveHomeHasProjectFiles", true);
  tl.setVar("driveFolderProjectFilesAdded", true);

  await finishDrive(tl, STEP23_DURATION_MS);
}
