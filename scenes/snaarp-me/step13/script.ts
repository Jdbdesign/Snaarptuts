import type { Timeline } from "@/lib/timeline";
import {
  beginMe,
  finishMe,
  pressOn,
  hoverOn,
} from "@/components/me/me-timeline";
import { ME_URLS } from "@/components/me/me-data";
import { STEP13_DATA } from "./data";

export const STEP13_DURATION_MS = STEP13_DATA.durationMs;

export async function runStep13(tl: Timeline) {
  beginMe(tl, ME_URLS.calendar, "calendar", [0.45, 0.35], 13);

  // Beat 1: Navigate to Meetings via sidebar
  await tl.at(400);
  tl.showCaption(STEP13_DATA.captions.navMeetings);
  await pressOn(tl, "[data-tl=me-nav-meetings]", { ms: 600 });
  tl.setUrl(ME_URLS.bookings);
  tl.setVar("meView", "meetings");
  tl.setVar("meMeetingsTab", "Upcoming");
  await tl.wait(500);

  // Beat 2: Review Upcoming tab
  await tl.at(3000);
  tl.showCaption(STEP13_DATA.captions.upcomingTab);
  await hoverOn(tl, "[data-tl=me-meetings-tab-upcoming]", { ms: 500 });
  await tl.wait(1500);

  // Beat 3: Click Cancelled tab
  await tl.at(6000);
  tl.showCaption(STEP13_DATA.captions.cancelledTab);
  await pressOn(tl, "[data-tl=me-meetings-tab-cancelled]", { ms: 600 });
  tl.setVar("meMeetingsTab", "Cancelled");
  await tl.wait(1500);

  // Beat 4: Click All tab
  await tl.at(9200);
  tl.showCaption(STEP13_DATA.captions.allTab);
  await pressOn(tl, "[data-tl=me-meetings-tab-all]", { ms: 600 });
  tl.setVar("meMeetingsTab", "All");
  await tl.wait(1200);

  // Beat 5: Toggle List View then back to Grid
  await tl.at(12200);
  tl.showCaption(STEP13_DATA.captions.toggleListView);
  await pressOn(tl, "[data-tl=me-meetings-btn-list-view]", { ms: 500 });
  tl.setVar("meMeetingsViewMode", "list");
  await tl.wait(1000);
  await pressOn(tl, "[data-tl=me-meetings-btn-grid-view]", { ms: 500 });
  tl.setVar("meMeetingsViewMode", "grid");
  await tl.wait(800);

  // Beat 6: Open Sort menu, select A-Z, then back to newest
  await tl.at(15500);
  tl.showCaption(STEP13_DATA.captions.sortMeetings);
  await pressOn(tl, "[data-tl=me-meetings-btn-sort]", { ms: 450 });
  tl.setVar("meMeetingsSortMenuOpen", true);
  await tl.wait(350);
  await pressOn(tl, "[data-tl=me-sort-opt-az]", { ms: 450 });
  tl.setVar("meMeetingsSortMode", "az");
  tl.setVar("meMeetingsSortMenuOpen", false);
  await tl.wait(700);
  await pressOn(tl, "[data-tl=me-meetings-btn-sort]", { ms: 450 });
  tl.setVar("meMeetingsSortMenuOpen", true);
  await tl.wait(350);
  await pressOn(tl, "[data-tl=me-sort-opt-newest]", { ms: 450 });
  tl.setVar("meMeetingsSortMode", "newest");
  tl.setVar("meMeetingsSortMenuOpen", false);
  await tl.wait(800);

  // Beat 7: Finish
  await tl.at(19500);
  tl.showCaption(STEP13_DATA.captions.tourComplete);
  await tl.wait(1200);
  tl.hideCaption();
  tl.clearHighlight();
  await finishMe(tl, undefined, 1200);
}
