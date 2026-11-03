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

export const STEP20_DURATION_MS = 8000;

export async function runStep20(tl: Timeline) {
  beginDrive(tl, DRIVE_URLS.trash, "trash", [0.18, 0.54]);

  await tl.at(500);
  tl.showCaption(CAPTIONS.intro);

  await tl.at(2000);
  tl.showCaption(CAPTIONS.clickWorkspaces);
  await hoverOn(tl, "[data-tl=nav-workspaces]", { ms: 600 });

  await tl.at(3100);
  await pressOn(tl, "[data-tl=nav-workspaces]");
  tl.setVar("drivePage", "workspaces");
  tl.setVar("driveActiveNav", "workspaces");
  tl.setUrl(DRIVE_URLS.workspaces);

  await tl.at(4200);
  tl.showCaption(CAPTIONS.create);
  await hoverOn(tl, "[data-tl=btn-workspaces-create-card]", { ms: 600 });
  await ring(tl, "[data-tl=btn-workspaces-create-card]", 2400);

  await finishDrive(tl, STEP20_DURATION_MS);

}
