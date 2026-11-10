import type { Timeline } from "@/lib/timeline";
import {
  beginMe,
  finishMe,
  pressOn,
  hoverOn,
} from "@/components/me/me-timeline";
import { ME_URLS } from "@/components/me/me-data";
import { STEP11_DATA } from "./data";

export const STEP11_DURATION_MS = STEP11_DATA.durationMs;

export async function runStep11(tl: Timeline) {
  beginMe(tl, ME_URLS.availability, "availability", [0.45, 0.35], 11);

  // Beat 1: Navigate to Calendar via sidebar
  await tl.at(400);
  tl.showCaption(STEP11_DATA.captions.navCalendar);
  await pressOn(tl, "[data-tl=me-nav-calendar]", { ms: 600 });
  tl.setUrl(ME_URLS.calendar);
  tl.setVar("meView", "calendar");
  tl.setVar("meCalView", "month");
  await tl.wait(500);

  // Beat 2: Month overview
  await tl.at(3000);
  tl.showCaption(STEP11_DATA.captions.monthOverview);
  await hoverOn(tl, "[data-tl=me-cal-month-title]", { ms: 500 });
  await tl.wait(1400);

  // Beat 3: Switch to Week view
  await tl.at(5800);
  tl.showCaption(STEP11_DATA.captions.switchWeek);
  await pressOn(tl, "[data-tl=me-cal-view-week]", { ms: 600 });
  tl.setVar("meCalView", "week");
  await tl.wait(800);

  // Beat 4: Upcoming sidebar
  await tl.at(8800);
  tl.showCaption(STEP11_DATA.captions.upcomingSidebar);
  await hoverOn(tl, "[data-tl=me-cal-upcoming-card]", { ms: 600, ring: true });
  await tl.wait(1200);

  // Beat 5: Scroll Calendar Integrations
  await tl.at(11800);
  tl.showCaption(STEP11_DATA.captions.calendarIntegrations);
  await tl.scrollPanelTo("[data-tl=me-cal-right-column]", 200, 600);
  await hoverOn(tl, "[data-tl=me-cal-integrations-card]", { ms: 500, ring: true });
  await tl.wait(1200);

  // Beat 6: Actions row
  await tl.at(14800);
  tl.showCaption(STEP11_DATA.captions.actionsRow);
  await hoverOn(tl, "[data-tl=me-cal-btn-schedule]", { ms: 500, ring: true });
  await tl.wait(600);
  await hoverOn(tl, "[data-tl=me-cal-btn-connect]", { ms: 500, ring: true });
  await tl.wait(1000);

  // Finish
  await tl.at(17200);
  tl.hideCaption();
  tl.clearHighlight();
  await finishMe(tl);
}
