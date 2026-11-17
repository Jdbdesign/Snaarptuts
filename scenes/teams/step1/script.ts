import type { Timeline } from "@/lib/timeline";
import { beginTeams, finishTeams } from "@/components/teams/teams-timeline";

export const STEP1_DURATION_MS = 18500;

export async function runStep1(tl: Timeline) {
  beginTeams(tl, "teams-meet-teams", {
    activeNav: "chat",
    activeChatId: "sam-taylor",
    filterTab: "all",
  });

  // Beat 1: Welcome & Snaarp suite rail
  await tl.at(400);
  tl.showCaption(
    "Switch between Snaarp apps from the suite rail on the left."
  );
  await tl.moveCursorTo("[data-tl=teams-suite-rail]", { ms: 600 });
  await tl.wait(1800);

  // Beat 2: Teams left menu
  await tl.at(3000);
  tl.showCaption(
    "Navigate Chat, Meet, People, Calendar, and Activity from the main menu."
  );
  await tl.moveCursorTo("[data-tl=teams-sidebar]", { ms: 600 });
  await tl.wait(1800);

  // Beat 3: Global search bar
  await tl.at(5600);
  tl.showCaption("Search messages, people, and files across Snaarp Teams.");
  await tl.moveCursorTo("[data-tl=teams-topbar-search]", { ms: 550 });
  await tl.wait(1800);

  // Beat 4: Theme toggle (sun)
  await tl.at(8200);
  tl.showCaption("Toggle between light and dark themes.");
  await tl.moveCursorTo("[data-tl=teams-theme-btn]", { ms: 500 });
  await tl.wait(1600);

  // Beat 5: Apps grid switcher
  await tl.at(10500);
  tl.showCaption("Open the Snaarp app switcher.");
  await tl.moveCursorTo("[data-tl=teams-apps-grid-btn]", { ms: 450 });
  await tl.wait(1600);

  // Beat 6: User profile & status
  await tl.at(12800);
  tl.showCaption("View your profile and account settings.");
  await tl.moveCursorTo("[data-tl=teams-avatar-btn]", { ms: 450 });
  await tl.wait(1600);

  // Beat 7: Chat header action icons
  await tl.at(15100);
  tl.showCaption(
    "Start a call, meeting, or group chat from the conversation header."
  );
  await tl.moveCursorTo("[data-tl=teams-chat-header-actions]", { ms: 550 });
  await tl.wait(1600);

  finishTeams(tl);
}
