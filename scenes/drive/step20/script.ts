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

export const STEP20_DURATION_MS = 6000;

export async function runStep20(tl: Timeline) {
  beginDrive(tl, DRIVE_URLS.trash, "trash", [0.18, 0.54]);

  await tl.at(500);
  tl.showCaption(CAPTIONS.clickWorkspaces);
  await hoverOn(tl, "[data-tl=nav-workspaces]", { ms: 600 });

  await tl.at(1800);
  await pressOn(tl, "[data-tl=nav-workspaces]");
  tl.setVar("drivePage", "workspaces");
  tl.setVar("driveActiveNav", "workspaces");
  tl.setUrl(DRIVE_URLS.workspaces);

  await tl.at(2800);
  await ring(tl, "[data-tl=workspaces-view]", 2200);

  await finishDrive(tl, STEP20_DURATION_MS);
}
