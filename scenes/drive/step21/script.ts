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

export const STEP21_DURATION_MS = 6000;

export async function runStep21(tl: Timeline) {
  beginDrive(tl, DRIVE_URLS.workspaces, "workspaces", [0.18, 0.54]);

  await tl.at(500);
  tl.showCaption(CAPTIONS.clickHome);
  await hoverOn(tl, "[data-tl=nav-home]", { ms: 600 });

  await tl.at(1800);
  await pressOn(tl, "[data-tl=nav-home]");
  tl.setVar("drivePage", "home");
  tl.setVar("driveActiveNav", "home");
  tl.setUrl(DRIVE_URLS.dashboard);

  await tl.at(2800);
  await ring(tl, "[data-tl=recent-table]", 2200);

  await finishDrive(tl, STEP21_DURATION_MS);
}
