import type { Timeline } from "@/lib/timeline";
import {
  beginDrive,
  finishDrive,
  hoverOn,
  pressOn,
} from "@/components/drive/drive-timeline";
import { CAPTIONS } from "./data";

export const STEP64_DURATION_MS = 10500;

export async function runStep64(tl: Timeline) {
  beginDrive(tl, "drive.snaarp.com/workspaces/2172", "workspaces", [0.75, 0.1]);
  tl.setVar("drivePage", "workspaces");
  tl.setVar("driveActiveNav", "workspaces");
  tl.setVar("driveActiveWorkspaceId", "2172");
  tl.setVar("driveWorkspaceMarketingSpaceCreated", true);

  await tl.at(500);
  tl.showCaption(CAPTIONS.clickInvite);
  await hoverOn(tl, "[data-tl=btn-ws-detail-invite]", { ms: 600 });
  await tl.wait(150);
  await pressOn(tl, "[data-tl=btn-ws-detail-invite]");
  tl.setVar("driveInviteMemberModalOpen", true);

  await tl.at(2500);
  tl.showCaption(CAPTIONS.selectTeammates);
  await hoverOn(tl, "[data-tl=row-invite-member-mem-2]", { ms: 500 });
  await tl.wait(150);
  await pressOn(tl, "[data-tl=row-invite-member-mem-2]");
  tl.setVar("driveInviteSelectedIds", ["mem-2"]);

  await tl.at(4200);
  await hoverOn(tl, "[data-tl=row-invite-member-mem-3]", { ms: 500 });
  await tl.wait(150);
  await pressOn(tl, "[data-tl=row-invite-member-mem-3]");
  tl.setVar("driveInviteSelectedIds", ["mem-2", "mem-3"]);

  await tl.at(6000);
  tl.showCaption(CAPTIONS.setRole);
  await hoverOn(tl, "[data-tl=select-invite-role]", { ms: 500 });
  await tl.wait(150);
  tl.setVar("driveInviteRoleVal", "viewer");
  tl.setVar("driveAlexMemberRole", "viewer");

  await tl.at(7800);
  tl.showCaption(CAPTIONS.confirmInvite);
  await hoverOn(tl, "[data-tl=btn-invite-submit]", { ms: 500 });
  await tl.wait(150);
  await pressOn(tl, "[data-tl=btn-invite-submit]");
  tl.setVar("driveIsInvitingMembers", true);

  await tl.wait(800);
  tl.setVar("driveIsInvitingMembers", false);
  tl.setVar("driveInviteMemberModalOpen", false);
  tl.setVar("driveWorkspaceMembersInvited", true);
  tl.setVar("driveInviteSuccessToastOpen", true);
  await tl.wait(1500);

  await finishDrive(tl, STEP64_DURATION_MS);
}
