import type { Timeline } from "@/lib/timeline";
import { beginTeams, finishTeams } from "@/components/teams/teams-timeline";

export const STEP17_DURATION_MS = 21000;

export async function runStep17(tl: Timeline) {
  // Step 17 starts on Calendar connected
  beginTeams(tl, "teams-use-calendar", {
    activeNav: "calendar",
    isCalendarConnected: true,
    calendarSelectedDay: 17,
    calendarMonth: "November 2026",
  });

  // Beat 1: Click next month arrow (December 2026)
  await tl.at(400);
  tl.showCaption("Navigate to upcoming months to plan ahead.");
  await tl.moveCursorTo("[data-tl=calendar-next-month-btn]", { ms: 600 });
  await tl.click("[data-tl=calendar-next-month-btn]");
  await tl.wait(1200);

  // Beat 2: Click previous month arrow twice (to October 2026)
  await tl.at(2400);
  tl.showCaption("Navigate backward to review past meetings.");
  await tl.moveCursorTo("[data-tl=calendar-prev-month-btn]", { ms: 450 });
  await tl.click("[data-tl=calendar-prev-month-btn]");
  await tl.wait(600);
  await tl.click("[data-tl=calendar-prev-month-btn]");
  await tl.wait(1200);

  // Beat 3: Click Today to return to November with 17 selected
  await tl.at(4900);
  tl.showCaption("Click Today to return to the current month and date.");
  await tl.moveCursorTo("[data-tl=calendar-today-btn]", { ms: 500 });
  await tl.click("[data-tl=calendar-today-btn]");
  await tl.wait(1200);

  // Beat 4: Click Tue 10 Nov
  await tl.at(6800);
  tl.showCaption("Click November 10 to inspect scheduled standup meeting.");
  await tl.moveCursorTo("[data-tl=calendar-day-10]", { ms: 500 });
  await tl.click("[data-tl=calendar-day-10]");
  await tl.wait(1400);

  // Beat 5: Click Wed 11 Nov
  await tl.at(8900);
  tl.showCaption("Click November 11 to see the creative team session.");
  await tl.moveCursorTo("[data-tl=calendar-day-11]", { ms: 450 });
  await tl.click("[data-tl=calendar-day-11]");
  await tl.wait(1400);

  // Beat 6: Click Join (pressed state)
  await tl.at(11000);
  tl.showCaption("Click Join to enter your meeting when it begins.");
  await tl.moveCursorTo("[data-tl=calendar-meeting-join-btn]", { ms: 450 });
  await tl.click("[data-tl=calendar-meeting-join-btn]");
  await tl.wait(1400);

  // Beat 7: Hover Open Snaarp Me
  await tl.at(13100);
  tl.showCaption("Open Snaarp Me to customize your booking availability.");
  await tl.moveCursorTo("[data-tl=calendar-open-btn]", { ms: 500 });
  await tl.wait(1400);

  // Beat 8: Click Disconnect
  await tl.at(15200);
  tl.showCaption("Disconnect calendar integration if required.");
  await tl.moveCursorTo("[data-tl=calendar-disconnect-btn]", { ms: 500 });
  await tl.click("[data-tl=calendar-disconnect-btn]");
  await tl.wait(1600);

  // Beat 9: Click Connect Snaarp Me account again to end connected
  await tl.at(17500);
  tl.showCaption("Reconnect anytime with one click.");
  await tl.moveCursorTo("[data-tl=calendar-connect-btn]", { ms: 500 });
  await tl.click("[data-tl=calendar-connect-btn]");
  await tl.wait(1600);

  finishTeams(tl);
}
