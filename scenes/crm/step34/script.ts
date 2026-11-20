import type { Timeline } from "@/lib/timeline";
import { beginCrm, finishCrm, pressOn, hoverOn } from "@/components/crm/crm-timeline";

export const STEP34_DURATION_MS = 20000;

export async function runStep34(tl: Timeline) {
  beginCrm(tl, "crm-event-attendees", {
    isSystemAdmin: true,
    activeSysNav: "event-attendees",
  });
  tl.setUrl("crm.snaarp.com/admin/event-attendees");

  // Beat 1: Review attendees table
  await tl.at(400);
  tl.showCaption("Review all registered attendees across events.");
  await hoverOn(tl, "[data-tl=crm-attendees-table]", { ms: 600 });
  await tl.wait(1500);

  // Beat 2: Switch to Web form tab
  await tl.at(3200);
  tl.showCaption("Filter attendees registered via Web forms.");
  await pressOn(tl, "[data-tl=crm-attendees-tab-web]");
  tl.setVar("crm:attendeesTab", "web-form");
  await tl.wait(1500);

  // Beat 3: Switch to Added manually tab
  await tl.at(6500);
  tl.showCaption("Filter attendees added manually.");
  await pressOn(tl, "[data-tl=crm-attendees-tab-manual]");
  tl.setVar("crm:attendeesTab", "manual");
  await tl.wait(1500);

  // Beat 4: Switch back to All tab
  await tl.at(9800);
  tl.showCaption("Return to All attendees.");
  await pressOn(tl, "[data-tl=crm-attendees-tab-all]");
  tl.setVar("crm:attendeesTab", "all");
  await tl.wait(1200);

  // Beat 5: Click attendee Alex Morgan to open contact profile
  await tl.at(12500);
  tl.showCaption("Click attendee name to view linked contact profile.");
  await pressOn(tl, "[data-tl=crm-attendee-link-alex]");
  tl.setVar("crm:selectedAttendeeProfileId", "att-1");
  await tl.wait(2000);

  // Beat 6: Close contact profile drawer
  await tl.at(16000);
  tl.showCaption("Close contact drawer to complete the tour.");
  await pressOn(tl, "[data-tl=crm-attendee-profile-close]");
  tl.setVar("crm:selectedAttendeeProfileId", null);
  await finishCrm(tl);
}
