import type { Timeline } from "@/lib/timeline";
import {
  beginMe,
  finishMe,
  pressOn,
  hoverOn,
} from "@/components/me/me-timeline";
import {
  ME_URLS,
  CREATIVE_MEETING_EVENT_TYPE,
  INITIAL_EVENT_TYPES,
} from "@/components/me/me-data";

export const STEP4_DURATION_MS = 23000;

export async function runStep4(tl: Timeline) {
  beginMe(tl, ME_URLS.eventTypes, "event-types", [0.45, 0.35], 4);
  tl.setVar("meEventTypes", [CREATIVE_MEETING_EVENT_TYPE, ...INITIAL_EVENT_TYPES]);

  // Beat 1: Open card to open edit drawer
  await tl.at(400);
  tl.showCaption("Click on your event type card to open the edit drawer.");
  await pressOn(tl, "[data-tl=me-card-creative-meeting]");
  tl.setVar("meEditDrawerOpen", true);
  tl.setVar("meEditTab", "basic");
  await tl.wait(1500);

  // Beat 2: Review Basic Info tab
  await tl.at(2800);
  tl.showCaption("Update basic details, title, description, duration, and conferencing venue.");
  await hoverOn(tl, "[data-tl=me-edit-drawer-title]");
  await tl.wait(1500);

  // Beat 3: Switch to Schedule tab
  await tl.at(5200);
  tl.showCaption("Switch to the Schedule tab to adjust buffer times and booking limits.");
  await pressOn(tl, "[data-tl=me-edit-tab-schedule]");
  tl.setVar("meEditTab", "schedule");
  await tl.wait(1800);

  // Beat 4: Switch to Advanced tab
  await tl.at(8000);
  tl.showCaption("Switch to the Advanced tab to manage intake questions and custom redirects.");
  await pressOn(tl, "[data-tl=me-edit-tab-advanced]");
  tl.setVar("meEditTab", "advanced");
  await tl.wait(1800);

  // Beat 5: Click Preview button
  await tl.at(10800);
  tl.showCaption("Click Preview to see how invitees view this event type.");
  await pressOn(tl, "[data-tl=me-edit-btn-preview]");
  tl.setVar("meEditPreviewOpen", true);
  await tl.wait(1500);

  // Beat 6: Test preview calendar and times
  await tl.at(13200);
  tl.showCaption("Test available dates and time slots directly in the preview.");
  await pressOn(tl, "[data-tl=me-preview-cal-day-11]");
  tl.setVar("meEditPreviewDay", 11);
  await tl.wait(800);
  await pressOn(tl, "[data-tl=me-preview-slot-330]");
  tl.setVar("meEditPreviewSlot", "3:30 PM");
  await tl.wait(1200);

  // Beat 7: Close preview panel
  await tl.at(16000);
  tl.showCaption("Close the preview panel.");
  await pressOn(tl, "[data-tl=me-edit-preview-btn-close-x]");
  tl.setVar("meEditPreviewOpen", false);
  await tl.wait(1000);

  // Beat 8: Save changes
  await tl.at(18000);
  tl.showCaption("Click Save changes to save your event type settings.");
  await pressOn(tl, "[data-tl=me-edit-btn-save]");
  tl.setVar("meEditDrawerOpen", false);
  tl.setVar("meToast", "Event type updated successfully.");
  await tl.wait(2500);

  // Finish
  await tl.at(21500);
  tl.hideCaption();
  tl.clearHighlight();
  await finishMe(tl);
}
