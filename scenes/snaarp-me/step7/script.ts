import type { Timeline } from "@/lib/timeline";
import {
  beginMe,
  finishMe,
  hoverOn,
} from "@/components/me/me-timeline";
import { ME_URLS } from "@/components/me/me-data";
import { STEP7_DATA } from "./data";

export const STEP7_DURATION_MS = STEP7_DATA.durationMs;

export async function runStep7(tl: Timeline) {
  beginMe(tl, ME_URLS.availability, "availability", [0.45, 0.35], 7);
  tl.setVar("meAvailTab", "working-hours");
  tl.setVar("meSelectedSchedule", "open-days");
  tl.setVar("meWeeklyMode", "list");

  // Beat 1: Overview
  await tl.at(400);
  tl.showCaption(STEP7_DATA.captions.intro);
  await hoverOn(tl, "[data-tl=me-avail-schedules-list]", { ms: 600, ring: true });
  await tl.wait(2200);

  // Beat 2: Tabs
  await tl.at(3800);
  tl.showCaption(STEP7_DATA.captions.tabs);
  await hoverOn(tl, "[data-tl=me-avail-tabs-row]", { ms: 600, ring: true });
  await tl.wait(2200);

  // Beat 3: Weekly Hours
  await tl.at(7200);
  tl.showCaption(STEP7_DATA.captions.weeklyHours);
  await hoverOn(tl, "[data-tl=me-avail-weekly-hours]", { ms: 600, ring: true });
  await tl.wait(2200);

  // Beat 4: Hover '+' button
  await tl.at(10500);
  tl.showCaption(STEP7_DATA.captions.addSchedule);
  await hoverOn(tl, "[data-tl=me-btn-add-schedule]", { ms: 500, ring: true });
  await tl.wait(1500);

  // Finish
  await tl.at(12600);
  tl.hideCaption();
  tl.clearHighlight();
  await finishMe(tl);
}
