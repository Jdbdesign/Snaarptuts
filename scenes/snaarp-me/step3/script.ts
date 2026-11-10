import type { Timeline } from "@/lib/timeline";
import {
  beginMe,
  finishMe,
  pressOn,
  typeIntoVar,
} from "@/components/me/me-timeline";
import {
  ME_URLS,
  CREATIVE_MEETING_EVENT_TYPE,
  INITIAL_EVENT_TYPES,
} from "@/components/me/me-data";

export const STEP3_DURATION_MS = 28500;

export async function runStep3(tl: Timeline) {
  beginMe(tl, ME_URLS.dashboard, "dashboard", [0.45, 0.35], 3);

  // Beat 1: Open Create Modal
  await tl.at(400);
  tl.showCaption("Click '+ New Event' to create a new bookable event type.");
  await pressOn(tl, "[data-tl=me-btn-new-event]");
  tl.setVar("meCreateModalOpen", true);
  tl.setVar("meCreateStep", 1);
  await tl.wait(1200);

  // Beat 2: Title input
  await tl.at(2500);
  tl.showCaption("Enter the event title: Creative meeting with the Team.");
  await pressOn(tl, "[data-tl=me-create-input-title]");
  await typeIntoVar(
    tl,
    "[data-tl=me-create-input-title]",
    "meCreateTitle",
    "Creative meeting with the Team"
  );
  await tl.wait(800);

  // Beat 3: Description input
  await tl.at(5500);
  tl.showCaption("Add a description explaining what the session covers.");
  await pressOn(tl, "[data-tl=me-create-input-desc]");
  await typeIntoVar(
    tl,
    "[data-tl=me-create-input-desc]",
    "meCreateDesc",
    "Learn how to plan your week with Snaarp Me"
  );
  await tl.wait(800);

  // Beat 4: Duration chips
  await tl.at(8800);
  tl.showCaption("Select your desired meeting duration.");
  await pressOn(tl, "[data-tl=me-create-duration-45]");
  tl.setVar("meCreateDuration", 45);
  await tl.wait(600);
  await pressOn(tl, "[data-tl=me-create-duration-30]");
  tl.setVar("meCreateDuration", 30);
  await tl.wait(800);

  // Beat 5: Next to Schedule
  await tl.at(11200);
  tl.showCaption("Click Next to proceed to Schedule & Availability.");
  await pressOn(tl, "[data-tl=me-create-btn-next-1]");
  tl.setVar("meCreateStep", 2);
  await tl.wait(1200);

  // Beat 6: Max attendees
  await tl.at(13200);
  tl.showCaption("Set Max Attendees to 2 for group participation.");
  await pressOn(tl, "[data-tl=me-create-spin-attendees-up]");
  tl.setVar("meCreateMaxAttendees", 2);
  await tl.wait(1000);

  // Beat 7: Next to Advanced
  await tl.at(15200);
  tl.showCaption("Click Next to configure Advanced settings.");
  await pressOn(tl, "[data-tl=me-create-btn-next-2]");
  tl.setVar("meCreateStep", 3);
  await tl.wait(1200);

  // Beat 8: Color swatch
  await tl.at(17200);
  tl.showCaption("Select your event brand color.");
  await pressOn(tl, "[data-tl=me-create-color-swatch]");
  await tl.wait(800);

  // Beat 9: Secret toggle
  await tl.at(19000);
  tl.showCaption("Toggle Secret Event on and off.");
  await pressOn(tl, "[data-tl=me-create-toggle-secret]");
  tl.setVar("meCreateSecret", true);
  await tl.wait(500);
  await pressOn(tl, "[data-tl=me-create-toggle-secret]");
  tl.setVar("meCreateSecret", false);
  await tl.wait(800);

  // Beat 10: Internal toggle
  await tl.at(21200);
  tl.showCaption("Toggle Internal Event on and off.");
  await pressOn(tl, "[data-tl=me-create-toggle-internal]");
  tl.setVar("meCreateInternal", true);
  await tl.wait(500);
  await pressOn(tl, "[data-tl=me-create-toggle-internal]");
  tl.setVar("meCreateInternal", false);
  await tl.wait(800);

  // Beat 11: Create event type submit
  await tl.at(23600);
  tl.showCaption("Click Create Event Type to save.");
  await pressOn(tl, "[data-tl=me-create-btn-submit]");
  tl.setVar("meCreateModalOpen", false);
  tl.setVar("meToast", "Event type created successfully.");
  tl.setVar("meEventTypes", [CREATIVE_MEETING_EVENT_TYPE, ...INITIAL_EVENT_TYPES]);
  await tl.wait(2500);

  // Finish
  await tl.at(27000);
  tl.hideCaption();
  tl.clearHighlight();
  await finishMe(tl);
}
