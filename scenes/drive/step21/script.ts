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

export const STEP21_DURATION_MS = 8000;

export async function runStep21(tl: Timeline) {
  beginDrive(tl, DRIVE_URLS.workspaces, "workspaces", [0.18, 0.54]);

  await tl.at(500);
  tl.showCaption(CAPTIONS.intro);

  await tl.at(2000);
  tl.showCaption(CAPTIONS.clickHome);
  await hoverOn(tl, "[data-tl=nav-home]", { ms: 600 });

  await tl.at(3100);
  await pressOn(tl, "[data-tl=nav-home]");
  tl.setVar("drivePage", "home");
  tl.setVar("driveActiveNav", "home");
  tl.setUrl(DRIVE_URLS.dashboard);
  tl.setVar("driveHomeHasWorkspace", true);

  await tl.at(4200);
  tl.showCaption(CAPTIONS.done);
  await hoverOn(tl, "[data-tl=row-recent-workspace]", { ms: 600 });
  await ring(tl, "[data-tl=row-recent-workspace]", 2500);

  await finishDrive(tl, STEP21_DURATION_MS);

}
