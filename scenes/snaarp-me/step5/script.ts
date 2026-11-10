import type { Timeline } from "@/lib/timeline";
import {
  beginMe,
  finishMe,
  pressOn,
  hoverOn,
  typeIntoVar,
} from "@/components/me/me-timeline";
import {
  ME_URLS,
  CREATIVE_MEETING_EVENT_TYPE,
  INITIAL_EVENT_TYPES,
} from "@/components/me/me-data";

export const STEP5_DURATION_MS = 37500;

export async function runStep5(tl: Timeline) {
  beginMe(tl, ME_URLS.eventTypes, "event-types", [0.45, 0.35], 5);
  tl.setVar("meEventTypes", [CREATIVE_MEETING_EVENT_TYPE, ...INITIAL_EVENT_TYPES]);

  // Beat 1: Hover link icon
  await tl.at(400);
  tl.showCaption("Hover over the link icon to copy your booking link.");
  await hoverOn(tl, "[data-tl=me-btn-copy-link-creative-meeting]");
  await tl.wait(1500);

  // Beat 2: Click link icon
  await tl.at(2500);
  tl.showCaption("Click the link icon to copy the public scheduling link.");
  await pressOn(tl, "[data-tl=me-btn-copy-link-creative-meeting]");
  tl.setVar("meLinkCopied", true);
  tl.setVar("meToast", "Booking link copied to clipboard!");
  await tl.wait(1800);

  // Beat 3: Navigate to public booking page (NO SHELL)
  await tl.at(5000);
  tl.showCaption("Opening the public booking page as an invitee.");
  tl.setUrl(ME_URLS.bookingPage);
  tl.setVar("meView", "booking-page");
  tl.setVar("meBookingPageStep", "select-slot");
  await tl.wait(2000);

  // Beat 4: Select Wednesday, Nov 11
  await tl.at(7800);
  tl.showCaption("Select Wednesday, November 11 on the calendar.");
  await pressOn(tl, "[data-tl=me-public-cal-day-11]");
  tl.setVar("meBookingPageSelectedDay", 11);
  await tl.wait(1000);

  // Beat 5: Choose 11:30 AM slot
  await tl.at(9800);
  tl.showCaption("Choose the 11:30 AM time slot.");
  await pressOn(tl, "[data-tl=me-public-slot-1130]");
  tl.setVar("meBookingPageSelectedTime", "11:30");
  tl.setVar("meBookingPageStep", "enter-details");
  await tl.wait(1500);

  // Beat 6: Type Name
  await tl.at(12200);
  tl.showCaption("Enter your full name: John Smith.");
  await pressOn(tl, "[data-tl=me-public-input-name]");
  await typeIntoVar(
    tl,
    "[data-tl=me-public-input-name]",
    "meBookingPageName",
    "John Smith"
  );
  await tl.wait(1000);

  // Beat 7: Type Email
  await tl.at(14800);
  tl.showCaption("Enter your email address: john@example.com.");
  await pressOn(tl, "[data-tl=me-public-input-email]");
  await typeIntoVar(
    tl,
    "[data-tl=me-public-input-email]",
    "meBookingPageEmail",
    "john@example.com"
  );
  await tl.wait(1000);

  // Beat 8: Add guest
  await tl.at(17800);
  tl.showCaption("Click + Add guests to include a team member.");
  await pressOn(tl, "[data-tl=me-public-btn-add-guests]");
  tl.setVar("meBookingPageGuestInputOpen", true);
  await tl.wait(800);
  await pressOn(tl, "[data-tl=me-public-input-guest]");
  await typeIntoVar(
    tl,
    "[data-tl=me-public-input-guest]",
    "meBookingPageGuest",
    "guest@example.com"
  );
  await tl.wait(600);
  await pressOn(tl, "[data-tl=me-public-btn-submit-guest]");
  tl.setVar("meBookingPageGuestAdded", true);
  await tl.wait(1000);

  // Beat 9: Additional notes
  await tl.at(22000);
  tl.showCaption("Add notes for the organizer before scheduling.");
  await pressOn(tl, "[data-tl=me-public-input-notes]");
  await typeIntoVar(
    tl,
    "[data-tl=me-public-input-notes]",
    "meBookingPageNotes",
    "I can't wait to come and learn how you organized the team professionally"
  );
  await tl.wait(1500);

  // Beat 10: Schedule Event submit
  await tl.at(26000);
  tl.showCaption("Click Schedule Event to confirm the booking.");
  await pressOn(tl, "[data-tl=me-public-btn-schedule-event]");
  tl.setVar("meBookingPageStep", "scheduled");
  await tl.wait(2000);

  // Beat 11: Hover calendar export buttons
  await tl.at(29000);
  tl.showCaption("Your meeting is scheduled! Add it to Google Calendar, Outlook, or download .ics.");
  await hoverOn(tl, "[data-tl=me-public-btn-cal-google]");
  await tl.wait(1000);
  await hoverOn(tl, "[data-tl=me-public-btn-cal-outlook]");
  await tl.wait(1000);
  await hoverOn(tl, "[data-tl=me-public-btn-cal-ics]");
  await tl.wait(1500);

  // Beat 12: Book a new time
  await tl.at(33500);
  tl.showCaption("Click Book a new time to schedule another meeting.");
  await pressOn(tl, "[data-tl=me-public-btn-book-new]");
  await tl.wait(1200);

  // Finish
  await tl.at(36000);
  tl.hideCaption();
  tl.clearHighlight();
  await finishMe(tl);
}
