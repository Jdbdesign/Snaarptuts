import type { Timeline } from "@/lib/timeline";
import {
  beginLock,
  finishLock,
  pressOn,
  typeIntoVar,
  hoverOn,
} from "@/components/lock/lock-timeline";
import { LOCK_URLS, INITIAL_ORGANIZATIONS, type Organization } from "@/components/lock/lock-data";

export const STEP9_DURATION_MS = 24000;

export async function runStep9(tl: Timeline) {
  beginLock(tl, LOCK_URLS.organizations, "organizations", [0.45, 0.25], 9);

  const orgsWithStudio: Organization[] = [
    {
      id: "org-acme-studio",
      name: "Acme Studio",
      memberCount: 1,
      date: "Today",
      members: [
        {
          id: "mem-owner",
          email: "jane@example.com",
          role: "Owner",
        },
      ],
    },
    ...INITIAL_ORGANIZATIONS,
  ];
  tl.setVar("lockOrgs", orgsWithStudio);

  // Beat 1: Open Acme Studio organization card
  await tl.at(400);
  tl.showCaption("Click the Acme Studio card to manage team members.");
  await pressOn(tl, "[data-tl=org-card-studio]");
  tl.setVar("lockView", "org-detail");
  tl.setUrl(LOCK_URLS.orgDetail);
  tl.setVar("lockOrgDetailLoading", true);
  await tl.wait(600);
  tl.setVar("lockOrgDetailLoading", false);
  await tl.wait(400);

  // Beat 2: Click Invite
  await tl.at(2800);
  tl.showCaption("Click Invite to add a member.");
  await pressOn(tl, "[data-tl=btn-open-invite]");
  tl.setVar("lockInviteOpen", true);
  await tl.wait(500);

  // Beat 3: Enter email address
  await tl.at(4800);
  tl.showCaption("Enter the new member's email address.");
  await pressOn(tl, "[data-tl=input-invite-email]");
  await typeIntoVar(tl, "[data-tl=input-invite-email]", "lockInviteEmail", "john@example.com", {
    msPerChar: 45,
  });
  await tl.wait(400);

  // Beat 4: Select initial role
  await tl.at(7600);
  tl.showCaption("Check the role selection.");
  await pressOn(tl, "[data-tl=select-invite-role]");
  await tl.wait(500);

  // Beat 5: Send Invite
  await tl.at(9400);
  tl.showCaption("Click Send Invite.");
  await pressOn(tl, "[data-tl=btn-send-invite]");
  tl.setVar("lockMemberCount", 2);
  tl.setVar("lockInviteOpen", false);
  tl.setVar("lockInviteEmail", "");
  tl.setVar("lockToast", "Invitation sent successfully");
  await tl.wait(1000);

  // Beat 6: Open member role select
  await tl.at(12000);
  tl.showCaption("Click the role dropdown on the new member's row.");
  await pressOn(tl, "[data-tl=select-member-role]");
  tl.setVar("lockRoleDropdownOpen", true);
  await tl.wait(700);

  // Beat 7: Pick Admin
  await tl.at(14200);
  tl.showCaption("Select Admin to elevate their permissions.");
  await pressOn(tl, "[data-tl=option-role-admin]");
  tl.setVar("lockMemberRole", "Admin");
  tl.setVar("lockRoleDropdownOpen", false);
  tl.setVar("lockToast", "Role updated");
  await tl.wait(1000);

  // Beat 8: Hover Transfer ownership icon (tooltip)
  await tl.at(16600);
  tl.showCaption("Hover over the transfer icon.");
  await hoverOn(tl, "[data-tl=btn-transfer-owner]");
  tl.setVar("lockTransferTooltip", true);
  await tl.wait(900);

  // Beat 9: Click Transfer ownership icon
  await tl.at(18800);
  tl.showCaption("Click the transfer icon to open the Transfer Ownership dialog.");
  await pressOn(tl, "[data-tl=btn-transfer-owner]");
  tl.setVar("lockTransferTooltip", false);
  tl.setVar("lockTransferModalOpen", true);
  await tl.wait(1000);

  // Beat 10: Click Cancel on modal
  await tl.at(21000);
  tl.showCaption("Review the transfer warning and click Cancel.");
  await pressOn(tl, "[data-tl=btn-transfer-cancel]");
  tl.setVar("lockTransferModalOpen", false);
  await tl.wait(1200);

  // Finish
  await tl.at(23000);
  tl.hideCaption();
  tl.clearHighlight();
  await finishLock(tl);
}
