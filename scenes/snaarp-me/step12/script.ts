import type { Timeline } from "@/lib/timeline";
import {
  beginMe,
  finishMe,
  pressOn,
} from "@/components/me/me-timeline";
import { ME_URLS } from "@/components/me/me-data";
import { STEP12_DATA } from "./data";

export const STEP12_DURATION_MS = STEP12_DATA.durationMs;

export async function runStep12(tl: Timeline) {
  beginMe(tl, ME_URLS.calendar, "calendar", [0.45, 0.35], 12);
  tl.setVar("meCalView", "week");

  // Beat 1: Switch to Day view, then Month view
  await tl.at(400);
  tl.showCaption(STEP12_DATA.captions.switchDayMonth);
  await pressOn(tl, "[data-tl=me-cal-view-day]", { ms: 600 });
  tl.setVar("meCalView", "day");
  await tl.wait(700);
  await pressOn(tl, "[data-tl=me-cal-view-month]", { ms: 500 });
  tl.setVar("meCalView", "month");
  await tl.wait(500);

  // Beat 2: Click Tuesday 10 in month grid
  await tl.at(4000);
  tl.showCaption(STEP12_DATA.captions.clickDay10);
  await pressOn(tl, "[data-tl=me-cal-day-10]", { ms: 600 });
  tl.setVar("meDayPopupOpen", true);
  await tl.wait(700);

  // Beat 3: Click 'View day schedule' in popup
  await tl.at(7000);
  tl.showCaption(STEP12_DATA.captions.viewDaySchedule);
  await pressOn(tl, "[data-tl=me-popup-btn-view-day]", { ms: 600 });
  tl.setVar("meDayPopupOpen", false);
  tl.setVar("meCalView", "day");
  await tl.wait(700);

  // Beat 4: Click Standup meeting block in Day view
  await tl.at(10000);
  tl.showCaption(STEP12_DATA.captions.clickMeetingBlock);
  await pressOn(tl, "[data-tl=me-day-event-standup]", { ms: 600 });
  tl.setVar("meBookingModalLoading", true);
  tl.setVar("meBookingModalOpen", true);
  tl.setVar("meBookingModalBooking", {
    id: "meet-standup",
    title: "Standup Meeting with developers",
    inviteeName: "Casey Brown",
    inviteeEmail: "casey@example.com",
    date: "Tuesday, November 10, 2026 at 11:30 AM",
    duration: "30 minutes",
    location: "Snaarp Meet",
    meetUrl: "https://meet.snaarp.com/meet/csv-vmbx-stn",
    source: "Direct",
    created: "Nov 10, 2026, 2:48 AM",
    timezone: "Africa/Lagos",
    status: "Confirmed",
  });
  await tl.wait(800);
  tl.setVar("meBookingModalLoading", false);
  await tl.wait(800);

  // Beat 5: Copy link and close modal
  await tl.at(14500);
  tl.showCaption(STEP12_DATA.captions.copyLinkAndClose);
  await pressOn(tl, "[data-tl=me-modal-btn-copy-meet]", { ms: 500 });
  await tl.wait(500);
  await pressOn(tl, "[data-tl=me-modal-btn-close]", { ms: 500 });
  tl.setVar("meBookingModalOpen", false);
  await tl.wait(1000);

  // Finish
  await tl.at(18500);
  tl.hideCaption();
  tl.clearHighlight();
  await finishMe(tl);
}
