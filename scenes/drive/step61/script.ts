import type { Timeline } from "@/lib/timeline";
import {
  beginDrive,
  finishDrive,
  hoverOn,
  pressOn,
} from "@/components/drive/drive-timeline";
import { DRIVE_URLS } from "@/components/drive/drive-data";
import { CAPTIONS } from "./data";

export const STEP61_DURATION_MS = 7500;

export async function runStep61(tl: Timeline) {
  beginDrive(tl, DRIVE_URLS.dashboard, "home", [0.15, 0.6]);

  await tl.at(500);
  tl.showCaption(CAPTIONS.openWorkspaces);
  await hoverOn(tl, "[data-tl=nav-workspaces]", { ms: 600 });
  await tl.wait(150);
  await pressOn(tl, "[data-tl=nav-workspaces]");
  tl.setVar("drivePage", "workspaces");
  tl.setVar("driveActiveNav", "workspaces");
  tl.setUrl(DRIVE_URLS.workspaces);
  tl.setVar("driveWorkspacesLoading", true);

  await tl.wait(650);
  tl.setVar("driveWorkspacesLoading", false);

  await tl.at(3000);
  tl.showCaption(CAPTIONS.inspectWorkspaces);
  await hoverOn(tl, "[data-tl=card-workspace-social-media]", { ms: 600 });
  await tl.wait(2000);

  await finishDrive(tl, STEP61_DURATION_MS);
}
