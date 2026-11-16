import type { Timeline } from "@/lib/timeline";
import {
  beginProjects,
  finishProjects,
  hoverOn,
  pressOn,
  pushProjectsToast,
  typeIntoVar,
} from "@/components/projects/projects-timeline";
import { PROJECTS_URLS } from "@/components/projects/projects-data";

export const STEP26_DURATION_MS = 21000;

export async function runStep26(tl: Timeline) {
  beginProjects(tl, PROJECTS_URLS.reports, "reports", [0.94, 0.05], 26);

  // Beat 1: Open avatar menu
  await tl.at(400);
  tl.showCaption("Click your avatar to open user options.");
  await pressOn(tl, "[data-tl=topbar-avatar-btn]", { ms: 600 });
  tl.setVar("isAvatarMenuOpen", true);
  await tl.wait(600);

  // Beat 2: Click Settings
  await tl.at(2500);
  tl.showCaption("Click Settings to manage personal preferences.");
  await pressOn(tl, "[data-tl=avatar-menu-settings]", { ms: 500 });
  tl.setVar("isAvatarMenuOpen", false);
  tl.setVar("projectsView", "profile");
  tl.setUrl(PROJECTS_URLS.profile);
  await tl.wait(600);

  // Beat 3: Update Full Name
  await tl.at(4800);
  tl.showCaption("Update your full name.");
  await pressOn(tl, "[data-tl=profile-name-input]", { ms: 500 });
  await typeIntoVar(
    tl,
    "[data-tl=profile-name-input]",
    "profileFullName",
    "Jane Doe",
    { msPerChar: 55 }
  );
  await tl.wait(400);

  await tl.at(6800);
  await pressOn(tl, "[data-tl=profile-save-btn]", { ms: 500 });
  pushProjectsToast(tl, "Profile updated", "success");
  await tl.wait(600);

  // Beat 4: Current Password
  await tl.at(8400);
  tl.showCaption("Enter your current password.");
  await pressOn(tl, "[data-tl=profile-current-password]", { ms: 500 });
  await typeIntoVar(
    tl,
    "[data-tl=profile-current-password]",
    "profileCurrentPassword",
    "SamplePass#1",
    { msPerChar: 45 }
  );
  await tl.wait(400);

  await tl.at(10400);
  await pressOn(tl, "[data-tl=profile-toggle-current-password]", { ms: 450 });
  tl.setVar("profileShowCurrentPassword", true);
  await tl.wait(500);

  await tl.at(11600);
  await pressOn(tl, "[data-tl=profile-toggle-current-password]", { ms: 450 });
  tl.setVar("profileShowCurrentPassword", false);
  await tl.wait(400);

  // Beat 5: New Password + Confirm Password
  await tl.at(12800);
  tl.showCaption("Enter and confirm your new password.");
  await pressOn(tl, "[data-tl=profile-new-password]", { ms: 500 });
  await typeIntoVar(
    tl,
    "[data-tl=profile-new-password]",
    "profileNewPassword",
    "SamplePass#2026",
    { msPerChar: 40 }
  );
  await tl.wait(400);

  await tl.at(15000);
  await pressOn(tl, "[data-tl=profile-confirm-password]", { ms: 500 });
  await typeIntoVar(
    tl,
    "[data-tl=profile-confirm-password]",
    "profileConfirmPassword",
    "SamplePass#2026",
    { msPerChar: 40 }
  );
  await tl.wait(500);

  // Beat 6: Update Password
  await tl.at(17200);
  tl.showCaption("Click Update Password to secure your account.");
  await pressOn(tl, "[data-tl=profile-update-password-btn]", { ms: 500 });
  tl.setVar("profileCurrentPassword", "");
  tl.setVar("profileNewPassword", "");
  tl.setVar("profileConfirmPassword", "");
  pushProjectsToast(tl, "Password updated", "success");
  await tl.wait(700);

  // Beat 7: Hover 2FA Enable
  await tl.at(19400);
  tl.showCaption("Enable two-factor authentication for extra protection.");
  await hoverOn(tl, "[data-tl=profile-enable-2fa-btn]", { ms: 600 });

  await finishProjects(tl, STEP26_DURATION_MS);
}
