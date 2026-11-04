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

export const STEP22_DURATION_MS = 8500;

export async function runStep22(tl: Timeline) {
  beginDrive(tl, DRIVE_URLS.dashboard, "home", [0.45, 0.4]);

  await tl.at(500);
  tl.showCaption(CAPTIONS.intro);

  await tl.at(2200);
  tl.showCaption(CAPTIONS.clickCreate);
  await hoverOn(tl, "[data-tl=btn-sidebar-create]", { ms: 600 });
  await tl.wait(150);
  await pressOn(tl, "[data-tl=btn-sidebar-create]");
  tl.setVar("driveCreateMenuOpen", true);

  await tl.at(4200);
  tl.showCaption(CAPTIONS.clickFolder);
  await hoverOn(tl, "[data-tl=menu-item-folder]", { ms: 500 });
  await tl.wait(150);
  await pressOn(tl, "[data-tl=menu-item-folder]");
  tl.setVar("driveCreateMenuOpen", false);
  tl.setVar("driveFolderModalOpen", true);

  await tl.at(6000);
  tl.showCaption(CAPTIONS.modalOpened);
  await hoverOn(tl, "[data-tl=modal-create-folder]", { ms: 600 });
  await ring(tl, "[data-tl=modal-create-folder]", 1800);

  await finishDrive(tl, STEP22_DURATION_MS);
}
