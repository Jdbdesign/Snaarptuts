import type { Timeline } from "@/lib/timeline";
import { beginTeams, finishTeams } from "@/components/teams/teams-timeline";

export const STEP22_DURATION_MS = 14500;

export async function runStep22(tl: Timeline) {
  // Step 22 starts on Settings > Security, clicks Notifications then Account
  beginTeams(tl, "teams-notifications-account", {
    activeNav: "settings",
    settingsTab: "security",
  });

  // Beat 1: Click Notifications tab
  await tl.at(400);
  tl.showCaption("Click Notifications to configure alerts for messages and calls.");
  await tl.moveCursorTo("[data-tl=settings-tab-notifications]", { ms: 600 });
  await tl.click("[data-tl=settings-tab-notifications]");
  await tl.wait(1400);

  // Beat 2: Hover email notifications toggle
  await tl.at(2600);
  tl.showCaption("Customize channels for email, push, and SMS notifications.");
  await tl.moveCursorTo("[data-tl=settings-toggle-email]", { ms: 500 });
  await tl.wait(1400);

  // Beat 3: Click Account tab
  await tl.at(4700);
  tl.showCaption("Click Account to view identity and session preferences.");
  await tl.moveCursorTo("[data-tl=settings-tab-account]", { ms: 500 });
  await tl.click("[data-tl=settings-tab-account]");
  await tl.wait(1400);

  // Beat 4: Click Remember me toggle ON
  await tl.at(6800);
  tl.showCaption("Turn on Remember me to remain signed in on trusted devices.");
  await tl.moveCursorTo("[data-tl=settings-toggle-remember]", { ms: 500 });
  await tl.click("[data-tl=settings-toggle-remember]");
  await tl.wait(1200);

  // Beat 5: Click Remember me toggle OFF
  await tl.at(8800);
  tl.showCaption("Turn it off when using shared or temporary devices.");
  await tl.click("[data-tl=settings-toggle-remember]");
  await tl.wait(1500);

  finishTeams(tl);
}
