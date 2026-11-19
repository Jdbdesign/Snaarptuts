import type { Timeline } from "@/lib/timeline";
import { beginCrm, finishCrm, pressOn, hoverOn } from "@/components/crm/crm-timeline";

export const STEP21_DURATION_MS = 24000;

export async function runStep21(tl: Timeline) {
  beginCrm(tl, "crm-contact-profile", {
    activeNav: "contact-profile",
    contactsOpen: true,
    contactProfileTab: "timeline",
  });

  // Beat 1: Overview & Metrics
  await tl.at(400);
  tl.showCaption("Open a contact profile to inspect engagement metrics, open deals, and linked company details.");
  await hoverOn(tl, "[data-tl=crm-profile-metrics-grid]", { ms: 600 });
  await tl.wait(1500);

  // Beat 2: Timeline tab
  await tl.at(4500);
  tl.showCaption("Review the activity timeline tracking active deals and key interaction milestones.");
  await hoverOn(tl, "[data-tl=crm-profile-timeline-card]", { ms: 600 });
  await tl.wait(2000);

  // Beat 3: Comments tab
  await tl.at(9500);
  tl.showCaption("Switch to Comments to collaborate with team members and add internal notes.");
  await pressOn(tl, "[data-tl=crm-profile-tab-comments]", { ms: 600 });
  tl.setVar("crm:contactProfileTab", "comments");
  await tl.wait(600);
  await hoverOn(tl, "[data-tl=crm-comment-input]", { ms: 500 });
  await tl.wait(2000);

  // Beat 4: Details tab
  await tl.at(15500);
  tl.showCaption("Open Details to inspect personal, professional, address, and attachment records.");
  await pressOn(tl, "[data-tl=crm-profile-tab-details]", { ms: 600 });
  tl.setVar("crm:contactProfileTab", "details");
  await tl.wait(600);
  await hoverOn(tl, "[data-tl=crm-profile-details-card]", { ms: 600 });
  await tl.wait(3000);

  await finishCrm(tl);
}
