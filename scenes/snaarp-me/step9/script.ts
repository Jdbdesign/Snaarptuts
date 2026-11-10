import type { Timeline } from "@/lib/timeline";
import {
  beginMe,
  finishMe,
  pressOn,
  hoverOn,
} from "@/components/me/me-timeline";
import { ME_URLS, PERSONAL_SCHEDULE, INITIAL_SCHEDULES } from "@/components/me/me-data";
import { STEP9_DATA } from "./data";

export const STEP9_DURATION_MS = STEP9_DATA.durationMs;

export async function runStep9(tl: Timeline) {
  beginMe(tl, ME_URLS.availability, "availability", [0.45, 0.35], 9);
  tl.setVar("meSchedules", [...INITIAL_SCHEDULES, PERSONAL_SCHEDULE]);
  tl.setVar("meSelectedSchedule", "personal-schedule");
  tl.setVar("meAvailTab", "working-hours");
  tl.setVar("meWeeklyMode", "list");

  // Beat 1: Switch Weekly Hours to Calendar view
  await tl.at(400);
  tl.showCaption(STEP9_DATA.captions.switchCalendar);
  await pressOn(tl, "[data-tl=me-weekly-toggle-cal]", { ms: 600 });
  tl.setVar("meWeeklyMode", "calendar");
  await tl.wait(500);

  // Beat 2: Click Wednesday 11 to open day popover
  await tl.at(3000);
  tl.showCaption(STEP9_DATA.captions.selectDate);
  await pressOn(tl, "[data-tl=me-avail-cal-day-11]", { ms: 600 });
  tl.setVar("meDatePopoverOpen", true);
  await tl.wait(600);

  // Beat 3: Click 'Edit date' in popover
  await tl.at(5800);
  tl.showCaption(STEP9_DATA.captions.editDate);
  await pressOn(tl, "[data-tl=me-menu-btn-edit-date]", { ms: 500 });
  tl.setVar("meDatePopoverOpen", false);
  tl.setVar("meDateOverrideModalOpen", true);
  await tl.wait(500);

  // Beat 4: Click '+ Add time range'
  await tl.at(8500);
  tl.showCaption(STEP9_DATA.captions.addTimeRange);
  await pressOn(tl, "[data-tl=me-btn-add-timerange]", { ms: 600 });
  tl.setVar("meOverrideRange2Added", true);
  await tl.wait(600);

  // Beat 5: Click Save button
  await tl.at(11500);
  tl.showCaption(STEP9_DATA.captions.saveOverride);
  await pressOn(tl, "[data-tl=me-modal-btn-save-override]", { ms: 600 });
  tl.setVar("meDateOverrideModalOpen", false);
  tl.setVar("meDateOverrideSaved", true);
  tl.setVar("meBottomToast", "Date override saved.");
  await tl.wait(600);

  // Beat 6: Switch to Date Overrides tab
  await tl.at(14500);
  tl.showCaption(STEP9_DATA.captions.viewOverridesTab);
  await pressOn(tl, "[data-tl=me-avail-tab-overrides]", { ms: 600 });
  tl.setVar("meAvailTab", "date-overrides");
  await tl.wait(400);
  await hoverOn(tl, "[data-tl=me-overrides-cal-day-11]", { ms: 600, ring: true });
  await tl.wait(1500);

  // Finish
  await tl.at(17800);
  tl.hideCaption();
  tl.clearHighlight();
  await finishMe(tl);
}
