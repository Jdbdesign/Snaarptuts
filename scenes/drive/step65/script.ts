import type { Timeline } from "@/lib/timeline";
import {
  beginDrive,
  finishDrive,
  hoverOn,
  pressOn,
} from "@/components/drive/drive-timeline";
import { CAPTIONS } from "./data";

export const STEP65_DURATION_MS = 10500;

export async function runStep65(tl: Timeline) {
  beginDrive(tl, "drive.snaarp.com/workspaces/2172", "workspaces", [0.65, 0.55]);
  tl.setVar("drivePage", "workspaces");
  tl.setVar("driveActiveNav", "workspaces");
  tl.setVar("driveActiveWorkspaceId", "2172");
  tl.setVar("driveWorkspaceMarketingSpaceCreated", true);
  tl.setVar("driveWorkspaceMembersInvited", true);
  tl.setVar("driveAlexMemberRole", "viewer");

  await tl.at(500);
  tl.showCaption(CAPTIONS.openAlexMenu);
  await hoverOn(tl, "[data-tl=btn-member-menu-alex]", { ms: 600 });
  await tl.wait(150);
  await pressOn(tl, "[data-tl=btn-member-menu-alex]");
  tl.setVar("driveMemberMenuOpenId", "alex");

  await tl.at(2500);
  tl.showCaption(CAPTIONS.setMemberRole);
  await hoverOn(tl, "[data-tl=btn-role-set-member]", { ms: 500 });
  await tl.wait(150);
  await pressOn(tl, "[data-tl=btn-role-set-member]");
  tl.setVar("driveAlexMemberRole", "member");
  tl.setVar("driveMemberMenuOpenId", "");
  tl.setVar("driveMemberRoleToastOpen", true);

  await tl.at(5500);
  tl.showCaption(CAPTIONS.openJordanMenu);
  await hoverOn(tl, "[data-tl=btn-member-menu-jordan]", { ms: 600 });
  await tl.wait(150);
  await pressOn(tl, "[data-tl=btn-member-menu-jordan]");
  tl.setVar("driveMemberMenuOpenId", "jordan");

  await tl.at(7500);
  tl.showCaption(CAPTIONS.removeMember);
  await hoverOn(tl, "[data-tl=btn-member-remove-jordan]", { ms: 500 });
  await tl.wait(150);
  await pressOn(tl, "[data-tl=btn-member-remove-jordan]");
  tl.setVar("driveJordanMemberRemoved", true);
  tl.setVar("driveMemberMenuOpenId", "");
  tl.setVar("driveMemberRemovedToastOpen", true);
  await tl.wait(1500);

  await finishDrive(tl, STEP65_DURATION_MS);
}
