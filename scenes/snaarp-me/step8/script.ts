import type { Timeline } from "@/lib/timeline";
import {
  beginMe,
  finishMe,
  pressOn,
  typeIntoVar,
  hoverOn,
} from "@/components/me/me-timeline";
import { ME_URLS, PERSONAL_SCHEDULE, INITIAL_SCHEDULES } from "@/components/me/me-data";
import { STEP8_DATA } from "./data";

export const STEP8_DURATION_MS = STEP8_DATA.durationMs;

export async function runStep8(tl: Timeline) {
  beginMe(tl, ME_URLS.availability, "availability", [0.45, 0.35], 8);
  tl.setVar("meAvailTab", "working-hours");
  tl.setVar("meSelectedSchedule", "open-days");
  tl.setVar("meWeeklyMode", "list");

  // Beat 1: Click '+' button to open Create Schedule modal
  await tl.at(400);
  tl.showCaption(STEP8_DATA.captions.addSchedule);
  await pressOn(tl, "[data-tl=me-btn-add-schedule]", { ms: 600 });
  tl.setVar("meCreateScheduleOpen", true);
  await tl.wait(500);

  // Beat 2: Type schedule name
  await tl.at(2500);
  tl.showCaption(STEP8_DATA.captions.enterName);
  await pressOn(tl, "[data-tl=me-schedule-input-name]", { ms: 500 });
  await typeIntoVar(tl, "[data-tl=me-schedule-input-name]", "meScheduleNameInput", "Personal Event time", {
    msPerChar: 40,
  });
  await tl.wait(400);

  // Beat 3: Scroll modal down and toggle Saturday
  await tl.at(6200);
  tl.showCaption(STEP8_DATA.captions.saturdayHours);
  await tl.scrollPanelTo("[data-tl=me-schedule-scroll-body]", 260, 500);
  await tl.wait(200);
  await pressOn(tl, "[data-tl=me-schedule-sat-toggle]", { ms: 500 });
  tl.setVar("meScheduleSatEnabled", true);
  await tl.wait(500);

  // Beat 4: Open Saturday 'To' dropdown and select 1:00 PM
  await tl.at(9200);
  tl.showCaption(STEP8_DATA.captions.select1pm);
  await pressOn(tl, "[data-tl=me-schedule-sat-to-select]", { ms: 500 });
  tl.setVar("meScheduleSatDropdownOpen", true);
  await tl.wait(300);
  await pressOn(tl, "[data-tl=me-time-option-100pm]", { ms: 500 });
  tl.setVar("meScheduleSatTo", "1:00 PM");
  tl.setVar("meScheduleSatDropdownOpen", false);
  await tl.wait(400);

  // Beat 5: Click Create Schedule button
  await tl.at(12200);
  tl.showCaption(STEP8_DATA.captions.createSchedule);
  await pressOn(tl, "[data-tl=me-schedule-btn-create]", { ms: 600 });
  tl.setVar("meCreateScheduleOpen", false);
  tl.setVar("meBannerToast", "Schedule created successfully.");
  tl.setVar("meSchedules", [...INITIAL_SCHEDULES, PERSONAL_SCHEDULE]);
  tl.setVar("meSelectedSchedule", "personal-schedule");
  await tl.wait(400);

  // Beat 6: Confirmation
  await tl.at(14500);
  tl.showCaption(STEP8_DATA.captions.createdToast);
  await hoverOn(tl, "[data-tl=me-sched-card-personal-schedule]", { ms: 600, ring: true });
  await tl.wait(1200);

  // Finish
  await tl.at(16500);
  tl.hideCaption();
  tl.clearHighlight();
  await finishMe(tl);
}
