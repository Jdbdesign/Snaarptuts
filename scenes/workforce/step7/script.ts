import type { Timeline } from "@/lib/timeline";
import { beginWorkforce } from "@/components/workforce/workforce-timeline";
import { CAPTIONS, URLS } from "./data";

export const STEP7_DURATION_MS = 28000;

export async function runStep7(tl: Timeline) {
  beginWorkforce(tl, URLS.dashboard, "dashboard");

  // 1. Suite Rail
  await tl.at(500);
  tl.showCaption(CAPTIONS.suiteRail);
  await tl.moveCursorTo("[data-tl=suite-rail]", { ms: 600 });
  tl.highlight("[data-tl=suite-rail]");

  // 2. Dashboard
  await tl.at(3000);
  tl.clearHighlight();
  tl.showCaption(CAPTIONS.dashboard);
  await tl.moveCursorTo("[data-tl=nav-dashboard]", { ms: 500 });
  tl.highlight("[data-tl=nav-dashboard]");

  // 3. My Space
  await tl.at(5200);
  tl.clearHighlight();
  tl.showCaption(CAPTIONS.mySpace);
  await tl.moveCursorTo("[data-tl=nav-my-space]", { ms: 500 });
  tl.highlight("[data-tl=nav-my-space]");

  // 4. Attendance
  await tl.at(7400);
  tl.clearHighlight();
  tl.showCaption(CAPTIONS.attendance);
  await tl.moveCursorTo("[data-tl=nav-attendance]", { ms: 500 });
  tl.highlight("[data-tl=nav-attendance]");

  // 5. Leave
  await tl.at(9600);
  tl.clearHighlight();
  tl.showCaption(CAPTIONS.leave);
  await tl.moveCursorTo("[data-tl=nav-leave]", { ms: 500 });
  tl.highlight("[data-tl=nav-leave]");

  // 6. Time Tracker
  await tl.at(11800);
  tl.clearHighlight();
  tl.showCaption(CAPTIONS.timeTracker);
  await tl.moveCursorTo("[data-tl=nav-time-tracker]", { ms: 500 });
  tl.highlight("[data-tl=nav-time-tracker]");

  // 7. Goals
  await tl.at(14000);
  tl.clearHighlight();
  tl.showCaption(CAPTIONS.goals);
  await tl.moveCursorTo("[data-tl=nav-goals]", { ms: 500 });
  tl.highlight("[data-tl=nav-goals]");

  // 8. My Appraisals
  await tl.at(16200);
  tl.clearHighlight();
  tl.showCaption(CAPTIONS.appraisals);
  await tl.moveCursorTo("[data-tl=nav-appraisals]", { ms: 500 });
  tl.highlight("[data-tl=nav-appraisals]");

  // 9. Policies
  await tl.at(18400);
  tl.clearHighlight();
  tl.showCaption(CAPTIONS.policies);
  await tl.moveCursorTo("[data-tl=nav-policies]", { ms: 500 });
  tl.highlight("[data-tl=nav-policies]");

  // 10. Learning Hub
  await tl.at(20600);
  tl.clearHighlight();
  tl.showCaption(CAPTIONS.learningHub);
  await tl.moveCursorTo("[data-tl=nav-learning-hub]", { ms: 500 });
  tl.highlight("[data-tl=nav-learning-hub]");

  // 11. Notifications
  await tl.at(22800);
  tl.clearHighlight();
  tl.showCaption(CAPTIONS.notifications);
  await tl.moveCursorTo("[data-tl=nav-notifications]", { ms: 500 });
  tl.highlight("[data-tl=nav-notifications]");

  // 12. Collapse & Expand
  await tl.at(25000);
  tl.clearHighlight();
  tl.showCaption(CAPTIONS.collapse);
  await tl.moveCursorTo("[data-tl=wf-collapse-btn]", { ms: 600 });
  await tl.click("[data-tl=wf-collapse-btn]");
  tl.setVar("wfSidebarCollapsed", true);

  await tl.at(26500);
  await tl.click("[data-tl=wf-collapse-btn]");
  tl.setVar("wfSidebarCollapsed", false);

  await tl.at(27500);
  tl.hideCaption();
  await tl.at(STEP7_DURATION_MS);
}
