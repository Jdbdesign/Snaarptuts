import type { Timeline } from "@/lib/timeline";
import { beginTeams, finishTeams } from "@/components/teams/teams-timeline";

export const STEP16_DURATION_MS = 10500;

export async function runStep16(tl: Timeline) {
  // Step 16 starts on Chat with calendar not connected
  beginTeams(tl, "teams-connect-calendar", {
    activeNav: "chat",
    isCalendarConnected: false,
  });

  // Beat 1: Click Calendar in the sidebar
  await tl.at(400);
  tl.showCaption("Click Calendar in the sidebar to view your meeting schedule.");
  await tl.moveCursorTo("[data-tl=teams-nav-calendar]", { ms: 600 });
  await tl.click("[data-tl=teams-nav-calendar]");
  await tl.wait(1400);

  // Beat 2: View the Connect Snaarp Me card
  await tl.at(2600);
  tl.showCaption("Link your Snaarp Me account to load calendar bookings.");
  await tl.moveCursorTo("[data-tl=calendar-connect-card]", { ms: 500 });
  await tl.wait(1500);

  // Beat 3: Click Connect Snaarp Me account button
  await tl.at(4800);
  tl.showCaption("Click Connect Snaarp Me account.");
  await tl.moveCursorTo("[data-tl=calendar-connect-btn]", { ms: 450 });
  await tl.click("[data-tl=calendar-connect-btn]");
  await tl.wait(2000);

  finishTeams(tl);
}
