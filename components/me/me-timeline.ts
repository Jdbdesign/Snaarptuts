import { CancelledError, type Timeline } from "@/lib/timeline";
import {
  ME_URLS,
  type MePage,
  INITIAL_EVENT_TYPES,
  INITIAL_BOOKINGS,
  INITIAL_ACTIVITIES,
  INITIAL_SCHEDULES,
} from "./me-data";

export const ME_END_HOLD_MS = 1500;
export const ME_FADE_MS = 400;

/** Move onto an element, ring it, click it and clear the ring. */
export async function pressOn(
  tl: Timeline,
  sel: string,
  opts: { ms?: number; dx?: number; dy?: number; ring?: boolean } = {}
) {
  if (tl.getVar<boolean>("__meStepEnded", false)) return;
  try {
    await tl.moveCursorTo(sel, { ms: opts.ms ?? 650, dx: opts.dx, dy: opts.dy });
    if (opts.ring !== false) tl.highlight(sel);
    await tl.wait(150);
    await tl.click(sel);
    tl.clearHighlight();
  } catch (err: unknown) {
    if (err instanceof CancelledError) throw err;
    const sceneId = tl.getVar<string>("__sceneId", "me-step");
    console.error(
      `[Snaarp Me Safety Net]: target "${sel}" not found in ${sceneId}. Ending step gracefully.`
    );
    tl.setVar("__meStepEnded", true);
    tl.hideCaption();
    tl.clearHighlight();
    tl.setVar("fade", true);
  }
}

/**
 * Types text character by character into a timeline variable while focused on sel.
 */
export async function typeIntoVar(
  tl: Timeline,
  sel: string,
  varName: string,
  text: string,
  opts: { msPerChar?: number } = {}
) {
  if (tl.getVar<boolean>("__meStepEnded", false)) return;
  const { msPerChar = 45 } = opts;
  tl.highlight(sel);
  for (let i = 1; i <= text.length; i++) {
    if (tl.getVar<boolean>("__meStepEnded", false)) break;
    tl.setVar(varName, text.slice(0, i));
    await tl.wait(msPerChar);
  }
  tl.setVar(varName, text);
  await tl.wait(100);
  tl.clearHighlight();
}

/** Move onto an element and hover it, without clicking. */
export async function hoverOn(
  tl: Timeline,
  sel: string,
  opts: { ms?: number; dx?: number; dy?: number; ring?: boolean } = {}
) {
  if (tl.getVar<boolean>("__meStepEnded", false)) return;
  try {
    await tl.moveCursorTo(sel, { ms: opts.ms ?? 600, dx: opts.dx, dy: opts.dy });
    if (opts.ring !== false) tl.highlight(sel);
  } catch (err: unknown) {
    if (err instanceof CancelledError) throw err;
  }
}

/** The clean step ending with hold and fade. */
export async function finishMe(
  tl: Timeline,
  _totalDurationMs?: number,
  holdMs = ME_END_HOLD_MS
) {
  if (holdMs > 0) {
    await tl.wait(holdMs);
  }
  tl.setVar("fade", true);
  await tl.wait(ME_FADE_MS);
}

/**
 * Resets Snaarp Me scene variables to a clean starting state for any step.
 * Crucial: Always calls tl.placeCursor(...) first so the pointer is visible
 * from the very first frame before any caption or animation begins.
 */
export function beginMe(
  tl: Timeline,
  url: string = ME_URLS.dashboard,
  page: MePage = "dashboard",
  cursor: [number, number] = [0.45, 0.35],
  stepNum?: number
) {
  tl.placeCursor(cursor[0], cursor[1]);
  tl.setUrl(url);
  tl.setVar("meView", page);
  tl.setVar("fade", false);
  tl.setVar("__meStepEnded", false);
  if (stepNum) tl.setVar("__sceneId", `me-step${stepNum}`);

  // Core collections
  tl.setVar("meEventTypes", JSON.parse(JSON.stringify(INITIAL_EVENT_TYPES)));
  tl.setVar("meBookings", JSON.parse(JSON.stringify(INITIAL_BOOKINGS)));
  tl.setVar("meActivities", JSON.parse(JSON.stringify(INITIAL_ACTIVITIES)));

  // Booking Modal
  tl.setVar("meBookingModalOpen", false);
  tl.setVar("meBookingModalBooking", null);

  // Create Event Type Modal Stepper
  tl.setVar("meCreateModalOpen", false);
  tl.setVar("meCreateStep", 1); // 1: Basic Info, 2: Schedule, 3: Advanced
  tl.setVar("meCreateTitle", "");
  tl.setVar("meCreateDesc", "");
  tl.setVar("meCreateDuration", 30);
  tl.setVar("meCreateSchedule", "Open Days");
  tl.setVar("meCreateBufferBefore", 0);
  tl.setVar("meCreateBufferAfter", 0);
  tl.setVar("meCreateMinNotice", 4);
  tl.setVar("meCreateMaxDays", 60);
  tl.setVar("meCreateDailyLimit", "");
  tl.setVar("meCreateWeeklyLimit", "");
  tl.setVar("meCreateMaxAttendees", 1);
  tl.setVar("meCreateColor", "#2563eb");
  tl.setVar("meCreateSecret", false);
  tl.setVar("meCreateInternal", false);
  tl.setVar("meCreateRedirect", "");

  // Edit Event Drawer
  tl.setVar("meEditDrawerOpen", false);
  tl.setVar("meEditEventId", null);
  tl.setVar("meEditTab", "basic"); // "basic" | "schedule" | "advanced"
  tl.setVar("meEditPreviewOpen", false);
  tl.setVar("meEditPreviewDay", 10);
  tl.setVar("meEditPreviewSlot", "3:30 PM");

  // Notifications / Banners
  tl.setVar("meToast", null);
  tl.setVar("meBannerToast", null);
  tl.setVar("meBottomToast", null);
  tl.setVar("meLinkCopied", false);

  // Availability & Schedule
  tl.setVar("meAvailTab", "working-hours");
  tl.setVar("meSelectedSchedule", "open-days");
  tl.setVar("meSchedules", JSON.parse(JSON.stringify(INITIAL_SCHEDULES)));
  tl.setVar("meWeeklyMode", "list");
  tl.setVar("meCreateScheduleOpen", false);
  tl.setVar("meScheduleNameInput", "");
  tl.setVar("meScheduleSatEnabled", false);
  tl.setVar("meScheduleSatTo", "5:00 PM");
  tl.setVar("meScheduleSatDropdownOpen", false);
  tl.setVar("meDatePopoverOpen", false);
  tl.setVar("meDateOverrideModalOpen", false);
  tl.setVar("meOverrideRange2Added", false);
  tl.setVar("meOverrideIsSaving", false);
  tl.setVar("meDateOverrideSaved", false);
  tl.setVar("mePreviewMode", "list");
  tl.setVar("mePreviewExpanded10", false);

  // Calendar Views
  tl.setVar("meCalView", "month");
  tl.setVar("meDayPopupOpen", false);
  tl.setVar("meBookingModalLoading", false);

  // Meetings Page
  tl.setVar("meMeetingsTab", "Upcoming");
  tl.setVar("meMeetingsViewMode", "grid");
  tl.setVar("meMeetingsSortMode", "newest");
  tl.setVar("meMeetingsSortMenuOpen", false);

  // Public Booking Page State
  tl.setVar("meBookingPageStep", "select-slot"); // "select-slot" | "enter-details" | "scheduled"
  tl.setVar("meBookingPageSelectedDay", 11);
  tl.setVar("meBookingPageSelectedTime", "11:30");
  tl.setVar("meBookingPageName", "");
  tl.setVar("meBookingPageEmail", "");
  tl.setVar("meBookingPageGuestInputOpen", false);
  tl.setVar("meBookingPageGuest", "");
  tl.setVar("meBookingPageGuestAdded", false);
  tl.setVar("meBookingPageNotes", "");
  tl.setVar("meBookingPageTimezone", "Lagos (GMT+1)");
}

/** Scroll helper for containers marked with data-me-scroll=true or custom selector. */
export async function scrollView(
  tl: Timeline,
  top: number,
  ms = 1000,
  sel = "[data-me-scroll=true]"
) {
  try {
    await tl.waitForElement(sel);
    await tl.scrollPanelTo(sel, top, ms);
  } catch (err: unknown) {
    if (err instanceof CancelledError) throw err;
  }
}
