import type { Timeline } from "@/lib/timeline";
import { beginTeams, finishTeams } from "@/components/teams/teams-timeline";

export const STEP19_DURATION_MS = 15500;

export async function runStep19(tl: Timeline) {
  // Step 19 starts on Activity, clicks top-right avatar
  beginTeams(tl, "teams-set-status", {
    activeNav: "activity",
    presence: "available",
    isAvatarMenuOpen: false,
  });

  // Beat 1: Click top-right avatar
  await tl.at(400);
  tl.showCaption("Click your avatar in the top bar to open account and status options.");
  await tl.moveCursorTo("[data-tl=teams-avatar-btn]", { ms: 600 });
  await tl.click("[data-tl=teams-avatar-btn]");
  await tl.wait(1400);

  // Beat 2: Click presence select
  await tl.at(2600);
  tl.showCaption("Click your current status to choose an availability option.");
  await tl.moveCursorTo("[data-tl=avatar-presence-btn]", { ms: 450 });
  await tl.click("[data-tl=avatar-presence-btn]");
  await tl.wait(1200);

  // Beat 3: Select Busy -> avatar dot turns red
  await tl.at(4500);
  tl.showCaption("Select Busy to let colleagues know you are occupied.");
  await tl.moveCursorTo("[data-tl=avatar-presence-busy]", { ms: 450 });
  await tl.click("[data-tl=avatar-presence-busy]");
  await tl.wait(1400);

  // Beat 4: Open presence again and select Available -> green dot
  await tl.at(6600);
  tl.showCaption("Open the status list again.");
  await tl.moveCursorTo("[data-tl=avatar-presence-btn]", { ms: 450 });
  await tl.click("[data-tl=avatar-presence-btn]");
  await tl.wait(800);

  await tl.at(8100);
  tl.showCaption("Switch your presence back to Available.");
  await tl.moveCursorTo("[data-tl=avatar-presence-available]", { ms: 400 });
  await tl.click("[data-tl=avatar-presence-available]");
  await tl.wait(1200);

  // Beat 5: Hover Add another account
  await tl.at(10000);
  tl.showCaption("Switch or connect additional workspace accounts.");
  await tl.moveCursorTo("[data-tl=avatar-menu-add-account]", { ms: 500 });
  await tl.wait(1400);

  // Beat 6: Click Settings
  await tl.at(12200);
  tl.showCaption("Click Settings to manage your profile and security.");
  await tl.moveCursorTo("[data-tl=avatar-menu-settings]", { ms: 450 });
  await tl.click("[data-tl=avatar-menu-settings]");
  await tl.wait(1400);

  finishTeams(tl);
}
