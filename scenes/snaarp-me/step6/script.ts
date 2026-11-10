import type { Timeline } from "@/lib/timeline";
import {
  beginMe,
  finishMe,
  hoverOn,
  scrollView,
} from "@/components/me/me-timeline";
import {
  ME_URLS,
  INITIAL_BOOKINGS,
  NEW_BOOKING,
  INITIAL_ACTIVITIES,
  NEW_ACTIVITY,
} from "@/components/me/me-data";

export const STEP6_DURATION_MS = 22000;

export async function runStep6(tl: Timeline) {
  beginMe(tl, ME_URLS.dashboard, "dashboard", [0.45, 0.35], 6);

  // Set updated collections
  tl.setVar("meBookings", [NEW_BOOKING, ...INITIAL_BOOKINGS]);
  tl.setVar("meActivities", [NEW_ACTIVITY, ...INITIAL_ACTIVITIES]);

  // Beat 1: Intro
  await tl.at(400);
  tl.showCaption("Back on the Home dashboard, your newly scheduled meeting is instantly synced.");
  await tl.wait(2500);

  // Beat 2: Stat cards updated
  await tl.at(3200);
  tl.showCaption("Your stats update in real time: 2 Bookings This Week and 2 Upcoming meetings.");
  await hoverOn(tl, "[data-tl=me-stat-bookings]", { ms: 600 });
  await tl.wait(1500);
  await hoverOn(tl, "[data-tl=me-stat-upcoming]", { ms: 500 });
  await tl.wait(1800);

  // Beat 3: Recent Activity row
  await tl.at(7000);
  tl.showCaption("Recent Activity logs John Smith's new booking with live timestamping.");
  await hoverOn(tl, "[data-tl=me-recent-activity-card]", { ms: 600 });
  await tl.wait(2500);

  // Beat 4: Upcoming Bookings section
  await tl.at(10000);
  tl.showCaption("Upcoming Bookings lists both scheduled meetings with direct links to details.");
  await hoverOn(tl, "[data-tl=me-upcoming-section]", { ms: 600 });
  await tl.wait(2500);

  // Beat 5: Scroll dashboard
  await tl.at(13000);
  tl.showCaption("Scroll through your meetings to stay ahead of upcoming sessions.");
  await scrollView(tl, 140, 1000);
  await tl.wait(2000);

  // Beat 6: Final wrap-up
  await tl.at(16500);
  tl.showCaption(
    "You've mastered Snaarp Me! Create event types, share booking links, and manage your meetings with ease."
  );
  await tl.wait(3000);

  // Finish
  await tl.at(20500);
  tl.hideCaption();
  tl.clearHighlight();
  await finishMe(tl);
}
