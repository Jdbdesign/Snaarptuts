import type { Timeline } from "@/lib/timeline";
import { beginWorkforce, finishWorkforce, hoverOn, pressOn, ring } from "@/components/workforce/workforce-timeline";
import { CAPTIONS, URLS } from "./data";

export const STEP7_DURATION_MS = 28000;

export async function runStep7(tl: Timeline) {
  beginWorkforce(tl, URLS.dashboard, "dashboard");
  tl.placeCursorOn("[data-tl=top-avatar]");

  // 1. Suite Rail
  await tl.at(500);
  tl.showCaption(CAPTIONS.suiteRail);
  await hoverOn(tl, "[data-tl=suite-rail]", { ms: 600 });
  await ring(tl, "[data-tl=suite-rail]", 1800);

  // 2. Dashboard
  await tl.at(3000);
  tl.showCaption(CAPTIONS.dashboard);
  await hoverOn(tl, "[data-tl=nav-dashboard]", { ms: 500 });
  await ring(tl, "[data-tl=nav-dashboard]", 1600);

  // 3. My Space
  await tl.at(5200);
  tl.showCaption(CAPTIONS.mySpace);
  await hoverOn(tl, "[data-tl=nav-my-space]", { ms: 500 });
  await ring(tl, "[data-tl=nav-my-space]", 1600);

  // 4. Attendance
  await tl.at(7400);
  tl.showCaption(CAPTIONS.attendance);
  await hoverOn(tl, "[data-tl=nav-attendance]", { ms: 500 });
  await ring(tl, "[data-tl=nav-attendance]", 1600);

  // 5. Leave
  await tl.at(9600);
  tl.showCaption(CAPTIONS.leave);
  await hoverOn(tl, "[data-tl=nav-leave]", { ms: 500 });
  await ring(tl, "[data-tl=nav-leave]", 1600);

  // 6. Time Tracker
  await tl.at(11800);
  tl.showCaption(CAPTIONS.timeTracker);
  await hoverOn(tl, "[data-tl=nav-time-tracker]", { ms: 500 });
  await ring(tl, "[data-tl=nav-time-tracker]", 1600);

  // 7. Goals
  await tl.at(14000);
  tl.showCaption(CAPTIONS.goals);
  await hoverOn(tl, "[data-tl=nav-goals]", { ms: 500 });
  await ring(tl, "[data-tl=nav-goals]", 1600);

  // 8. My Appraisals
  await tl.at(16200);
  tl.showCaption(CAPTIONS.appraisals);
  await hoverOn(tl, "[data-tl=nav-appraisals]", { ms: 500 });
  await ring(tl, "[data-tl=nav-appraisals]", 1600);

  // 9. Policies
  await tl.at(18400);
  tl.showCaption(CAPTIONS.policies);
  await hoverOn(tl, "[data-tl=nav-policies]", { ms: 500 });
  await ring(tl, "[data-tl=nav-policies]", 1600);

  // 10. Learning Hub
  await tl.at(20600);
  tl.showCaption(CAPTIONS.learningHub);
  await hoverOn(tl, "[data-tl=nav-learning-hub]", { ms: 500 });
  await ring(tl, "[data-tl=nav-learning-hub]", 1600);

  // 11. Notifications
  await tl.at(22800);
  tl.showCaption(CAPTIONS.notifications);
  await hoverOn(tl, "[data-tl=nav-notifications]", { ms: 500 });
  await ring(tl, "[data-tl=nav-notifications]", 1600);

  // 12. Collapse & Expand
  await tl.at(25000);
  tl.showCaption(CAPTIONS.collapse);
  await pressOn(tl, "[data-tl=wf-collapse-btn]", { ms: 600 });
  tl.setVar("wfSidebarCollapsed", true);

  await tl.at(26400);
  await pressOn(tl, "[data-tl=wf-collapse-btn]", { ms: 500 });
  tl.setVar("wfSidebarCollapsed", false);

  // 13. End fade
  await finishWorkforce(tl, 27400, STEP7_DURATION_MS);
}
