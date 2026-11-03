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

export const STEP10_DURATION_MS = 9000;

export async function runStep10(tl: Timeline) {
  beginDrive(tl, DRIVE_URLS.dashboard, "home", [0.18, 0.25]);

  await tl.at(500);
  tl.showCaption(CAPTIONS.intro);

  await tl.at(2000);
  tl.showCaption(CAPTIONS.clickCreate);
  await hoverOn(tl, "[data-tl=btn-sidebar-create]", { ms: 500 });

  await tl.at(2900);
  await pressOn(tl, "[data-tl=btn-sidebar-create]");
  tl.setVar("driveCreateMenuOpen", true);

  await tl.at(3700);
  tl.showCaption(CAPTIONS.items);
  await ring(tl, "[data-tl=create-upload-menu]", 2800);

  await tl.at(6800);
  await hoverOn(tl, "[data-tl=btn-sidebar-create]", { ms: 500 });

  await tl.at(7400);
  await pressOn(tl, "[data-tl=btn-sidebar-create]");
  tl.setVar("driveCreateMenuOpen", false);

  await finishDrive(tl, STEP10_DURATION_MS);

}
