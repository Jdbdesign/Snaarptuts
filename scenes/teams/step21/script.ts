import type { Timeline } from "@/lib/timeline";
import { beginTeams, finishTeams } from "@/components/teams/teams-timeline";

export const STEP21_DURATION_MS = 18000;

export async function runStep21(tl: Timeline) {
  // Step 21 starts on Settings > Profile, clicks Security
  beginTeams(tl, "teams-change-password", {
    activeNav: "settings",
    settingsTab: "profile",
  });

  // Beat 1: Click Security tab
  await tl.at(400);
  tl.showCaption("Click Security to view your account password and protection settings.");
  await tl.moveCursorTo("[data-tl=settings-tab-security]", { ms: 600 });
  await tl.click("[data-tl=settings-tab-security]");
  await tl.wait(1400);

  // Beat 2: Current password
  await tl.at(2600);
  tl.showCaption("Enter your current password.");
  await tl.moveCursorTo("[data-tl=settings-curr-password-input]", { ms: 500 });
  await tl.click("[data-tl=settings-curr-password-input]");
  await tl.typeText("settings-curr-password-input", "SamplePass#1");
  await tl.wait(1000);

  // Beat 3: New password
  await tl.at(4800);
  tl.showCaption("Choose a new secure password with at least 8 characters.");
  await tl.moveCursorTo("[data-tl=settings-new-password-input]", { ms: 500 });
  await tl.click("[data-tl=settings-new-password-input]");
  await tl.typeText("settings-new-password-input", "SamplePass#2026");
  await tl.wait(1000);

  // Beat 4: Confirm password
  await tl.at(7000);
  tl.showCaption("Confirm your new password.");
  await tl.moveCursorTo("[data-tl=settings-confirm-password-input]", { ms: 500 });
  await tl.click("[data-tl=settings-confirm-password-input]");
  await tl.typeText("settings-confirm-password-input", "SamplePass#2026");
  await tl.wait(1000);

  // Beat 5: Click Change Password
  await tl.at(9200);
  tl.showCaption("Click Change Password to update your credentials.");
  await tl.moveCursorTo("[data-tl=settings-change-password-btn]", { ms: 450 });
  await tl.click("[data-tl=settings-change-password-btn]");
  await tl.wait(1600);

  // Beat 6: Hover Forgot your current password?
  await tl.at(11500);
  tl.showCaption("Reset forgotten passwords through account recovery.");
  await tl.moveCursorTo("[data-tl=settings-forgot-password-link]", { ms: 500 });
  await tl.wait(1400);

  // Beat 7: Hover Enable under Multi-Factor Authentication
  await tl.at(13600);
  tl.showCaption("Enable two-factor authentication for extra protection.");
  await tl.moveCursorTo("[data-tl=settings-enable-2fa-btn]", { ms: 500 });
  await tl.wait(1600);

  finishTeams(tl);
}
