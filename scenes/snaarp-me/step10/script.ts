import type { Timeline } from "@/lib/timeline";
import {
  beginMe,
  finishMe,
  pressOn,
  hoverOn,
} from "@/components/me/me-timeline";
import { ME_URLS, PERSONAL_SCHEDULE, INITIAL_SCHEDULES } from "@/components/me/me-data";
import { STEP10_DATA } from "./data";

export const STEP10_DURATION_MS = STEP10_DATA.durationMs;

export async function runStep10(tl: Timeline) {
  beginMe(tl, ME_URLS.availability, "availability", [0.45, 0.35], 10);
  tl.setVar("meSchedules", [...INITIAL_SCHEDULES, PERSONAL_SCHEDULE]);
  tl.setVar("meSelectedSchedule", "personal-schedule");
  tl.setVar("meAvailTab", "date-overrides");
  tl.setVar("mePreviewMode", "list");
  tl.setVar("mePreviewExpanded10", false);

  // Beat 1: Switch to Preview tab
  await tl.at(400);
  tl.showCaption(STEP10_DATA.captions.openPreview);
  await pressOn(tl, "[data-tl=me-avail-tab-preview]", { ms: 600 });
  tl.setVar("meAvailTab", "preview");
  await tl.wait(500);

  // Beat 2: Click '+8 more' on Tuesday 10
  await tl.at(3000);
  tl.showCaption(STEP10_DATA.captions.expandSlots);
  await pressOn(tl, "[data-tl=me-preview-btn-more-10]", { ms: 600 });
  tl.setVar("mePreviewExpanded10", true);
  await tl.wait(500);

  // Beat 3: Scroll down through upcoming days and scroll back up
  await tl.at(5800);
  tl.showCaption(STEP10_DATA.captions.scrollDays);
  await tl.scrollPanelTo("[data-tl=me-preview-list-container]", 240, 700);
  await tl.wait(800);
  await tl.scrollPanelTo("[data-tl=me-preview-list-container]", 0, 500);
  await tl.wait(300);
  await pressOn(tl, "[data-tl=me-preview-btn-less-10]", { ms: 500 });
  tl.setVar("mePreviewExpanded10", false);
  await tl.wait(400);

  // Beat 4: Switch to Calendar view
  await tl.at(10500);
  tl.showCaption(STEP10_DATA.captions.switchCalendar);
  await pressOn(tl, "[data-tl=me-preview-toggle-cal]", { ms: 600 });
  tl.setVar("mePreviewMode", "calendar");
  await tl.wait(500);

  // Beat 5: Review calendar grid
  await tl.at(13000);
  tl.showCaption(STEP10_DATA.captions.reviewCalendar);
  await hoverOn(tl, "[data-tl=me-preview-calendar-grid]", { ms: 600, ring: true });
  await tl.wait(1800);

  // Finish
  await tl.at(16200);
  tl.hideCaption();
  tl.clearHighlight();
  await finishMe(tl);
}
