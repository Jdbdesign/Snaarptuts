import type { Timeline } from "@/lib/timeline";
import {
  beginMe,
  finishMe,
  pressOn,
  hoverOn,
} from "@/components/me/me-timeline";
import { ME_URLS, INITIAL_BOOKINGS } from "@/components/me/me-data";

export const STEP2_DURATION_MS = 19500;

export async function runStep2(tl: Timeline) {
  beginMe(tl, ME_URLS.dashboard, "dashboard", [0.45, 0.35], 2);

  // Beat 1: Open booking in Today's Schedule
  await tl.at(400);
  tl.showCaption("Click your scheduled meeting in Today's Schedule to review its details.");
  await pressOn(tl, "[data-tl=me-today-booking-card]");
  tl.setVar("meBookingModalOpen", true);
  tl.setVar("meBookingModalBooking", INITIAL_BOOKINGS[0]);
  await tl.wait(1500);

  // Beat 2: Copy meet link
  await tl.at(3200);
  tl.showCaption("Copy the Snaarp Meet conferencing link directly to your clipboard.");
  await pressOn(tl, "[data-tl=me-modal-btn-copy-meet]");
  await tl.wait(1500);

  // Beat 3: Close modal
  await tl.at(5200);
  tl.showCaption("Close the booking details modal.");
  await pressOn(tl, "[data-tl=me-modal-btn-close]");
  tl.setVar("meBookingModalOpen", false);
  await tl.wait(1000);

  // Beat 4: Calendar view
  await tl.at(7000);
  tl.showCaption("Click Calendar in the sidebar to view your monthly schedule.");
  await pressOn(tl, "[data-tl=me-nav-calendar]");
  tl.setUrl(ME_URLS.calendar);
  tl.setVar("meView", "calendar");
  await tl.wait(1800);

  // Beat 5: Explore calendar & integrations
  await tl.at(9800);
  tl.showCaption("View scheduled calls and connect external calendars like Google or Outlook.");
  await hoverOn(tl, "[data-tl=me-cal-day-10]");
  await tl.wait(1200);
  await hoverOn(tl, "[data-tl=me-cal-integrations-card]");
  await tl.wait(1800);

  // Beat 6: Meetings detail page
  await tl.at(13200);
  tl.showCaption("Click Meetings in the sidebar to open the full booking page.");
  await pressOn(tl, "[data-tl=me-nav-meetings]");
  tl.setUrl(ME_URLS.meetingDetail);
  tl.setVar("meView", "meeting-detail");
  await tl.wait(1800);

  // Beat 7: Return
  await tl.at(15800);
  tl.showCaption("Click Back to Bookings to return.");
  await pressOn(tl, "[data-tl=me-detail-back-link]");
  tl.setUrl(ME_URLS.dashboard);
  tl.setVar("meView", "dashboard");
  await tl.wait(1500);

  // Finish
  await tl.at(18200);
  tl.hideCaption();
  tl.clearHighlight();
  await finishMe(tl);
}
