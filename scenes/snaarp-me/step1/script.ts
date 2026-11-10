import type { Timeline } from "@/lib/timeline";
import {
  beginMe,
  finishMe,
  hoverOn,
} from "@/components/me/me-timeline";
import { ME_URLS } from "@/components/me/me-data";

export const STEP1_DURATION_MS = 16500;

export async function runStep1(tl: Timeline) {
  beginMe(tl, ME_URLS.dashboard, "dashboard", [0.45, 0.35], 1);

  // Beat 1: Intro welcome
  await tl.at(400);
  tl.showCaption("Welcome to Snaarp Me — your scheduling and calendar workspace.");
  await hoverOn(tl, "[data-tl=me-welcome-card]", { ms: 600 });
  await tl.wait(2500);

  // Beat 2: Today's schedule
  await tl.at(3500);
  tl.showCaption("Review your scheduled meetings for today.");
  await hoverOn(tl, "[data-tl=me-today-section]", { ms: 600 });
  await tl.wait(2500);

  // Beat 3: Stat metrics
  await tl.at(6500);
  tl.showCaption("Track weekly bookings, upcoming events, and cancellation metrics.");
  await hoverOn(tl, "[data-tl=me-stat-bookings]", { ms: 500 });
  await tl.wait(1200);
  await hoverOn(tl, "[data-tl=me-stat-upcoming]", { ms: 500 });
  await tl.wait(1500);

  // Beat 4: Recent activity
  await tl.at(9500);
  tl.showCaption("Monitor real-time updates as invitees schedule or change meetings.");
  await hoverOn(tl, "[data-tl=me-recent-activity-card]", { ms: 600 });
  await tl.wait(2500);

  // Beat 5: Sidebar navigation
  await tl.at(12500);
  tl.showCaption("Use the left menu to manage event types, availability, and calendars.");
  await hoverOn(tl, "[data-tl=me-nav-home]", { ms: 600 });
  await tl.wait(2000);

  // Finish
  await tl.at(15000);
  tl.hideCaption();
  tl.clearHighlight();
  await finishMe(tl);
}
