import type { Timeline } from "@/lib/timeline";
import { beginCrm, finishCrm, pressOn, hoverOn } from "@/components/crm/crm-timeline";

export const STEP33_DURATION_MS = 24000;

export async function runStep33(tl: Timeline) {
  beginCrm(tl, "crm-events-management", {
    isSystemAdmin: true,
    activeSysNav: "events",
  });
  tl.setUrl("crm.snaarp.com/admin/events");

  // Beat 1: Review upcoming events
  await tl.at(400);
  tl.showCaption("Review upcoming events and attendee registrations.");
  await hoverOn(tl, "[data-tl=crm-event-card-evt-masterclass]", { ms: 600 });
  await tl.wait(1500);

  // Beat 2: Click Add contact on event card
  await tl.at(3200);
  tl.showCaption("Click Add contact to manage attendees registered for Free Masterclass.");
  await pressOn(tl, "[data-tl=crm-event-add-contact-btn]");
  tl.setVar("crm:isAddEventContactOpen", true);
  await tl.wait(2000);
  await pressOn(tl, "[data-tl=crm-event-add-contact-close]");
  tl.setVar("crm:isAddEventContactOpen", false);
  await tl.wait(1000);

  // Beat 3: Click New event
  await tl.at(8500);
  tl.showCaption("Click New event to schedule an upcoming webinar.");
  await pressOn(tl, "[data-tl=crm-events-new-btn]");
  tl.setVar("crm:isNewEventOpen", true);
  await tl.wait(2000);

  // Beat 4: Save new event
  await tl.at(13000);
  tl.showCaption("Click Save to publish the event.");
  await pressOn(tl, "[data-tl=crm-new-event-save]");
  tl.setVar("crm:isNewEventOpen", false);
  tl.setVar("crm:toast", {
    id: "crm-toast-event-created",
    message: "Event created",
  });
  await tl.wait(1800);

  // Beat 5: Edit Free Masterclass
  await tl.at(17000);
  tl.showCaption("Click Edit to inspect event settings.");
  await pressOn(tl, "[data-tl=crm-event-edit-btn]");
  tl.setVar("crm:isEditEventOpen", true);
  await tl.wait(1500);

  // Beat 6: Inspect Cancelled setting and close
  await tl.at(20500);
  tl.showCaption("Inspect cancellation settings and close editor.");
  await hoverOn(tl, "[data-tl=crm-edit-event-cancelled-check]", { ms: 500 });
  await tl.wait(800);
  await pressOn(tl, "[data-tl=crm-edit-event-cancel]");
  tl.setVar("crm:isEditEventOpen", false);
  await finishCrm(tl);
}
