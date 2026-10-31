import type { Timeline } from "@/lib/timeline";
import { beginWorkforce } from "@/components/workforce/workforce-timeline";
import { CAPTIONS, URLS } from "./data";

export const STEP10_DURATION_MS = 28000;

export async function runStep10(tl: Timeline) {
  beginWorkforce(tl, URLS.mySpace, "my-space", "overview");

  // 1. Activities
  await tl.at(500);
  tl.showCaption(CAPTIONS.activities);
  await tl.moveCursorTo("[data-tl=tab-act-activities]", { ms: 600 });
  await tl.click("[data-tl=tab-act-activities]");
  tl.setVar("wfActiveActivityTab", "activities");

  // 2. Feeds
  await tl.at(3200);
  tl.showCaption(CAPTIONS.feeds);
  await tl.moveCursorTo("[data-tl=tab-act-feeds]", { ms: 500 });
  await tl.click("[data-tl=tab-act-feeds]");
  tl.setVar("wfActiveActivityTab", "feeds");

  // 3. Profile
  await tl.at(6000);
  tl.showCaption(CAPTIONS.profile);
  await tl.moveCursorTo("[data-tl=tab-act-profile]", { ms: 500 });
  await tl.click("[data-tl=tab-act-profile]");
  tl.setVar("wfActiveActivityTab", "profile");

  // 4. Approvals
  await tl.at(8800);
  tl.showCaption(CAPTIONS.approvals);
  await tl.moveCursorTo("[data-tl=tab-act-approvals]", { ms: 500 });
  await tl.click("[data-tl=tab-act-approvals]");
  tl.setVar("wfActiveActivityTab", "approvals");

  // 5. Leave
  await tl.at(11800);
  tl.showCaption(CAPTIONS.leave);
  await tl.moveCursorTo("[data-tl=tab-act-leave]", { ms: 500 });
  await tl.click("[data-tl=tab-act-leave]");
  tl.setVar("wfActiveActivityTab", "leave");

  // 6. Attendance
  await tl.at(14800);
  tl.showCaption(CAPTIONS.attendance);
  await tl.moveCursorTo("[data-tl=tab-act-attendance]", { ms: 500 });
  await tl.click("[data-tl=tab-act-attendance]");
  tl.setVar("wfActiveActivityTab", "attendance");

  // 7. Time Logs
  await tl.at(17800);
  tl.showCaption(CAPTIONS.timeLogs);
  await tl.moveCursorTo("[data-tl=tab-act-time-logs]", { ms: 500 });
  await tl.click("[data-tl=tab-act-time-logs]");
  tl.setVar("wfActiveActivityTab", "time-logs");

  // 8. Timesheets
  await tl.at(20800);
  tl.showCaption(CAPTIONS.timesheets);
  await tl.moveCursorTo("[data-tl=tab-act-timesheets]", { ms: 500 });
  await tl.click("[data-tl=tab-act-timesheets]");
  tl.setVar("wfActiveActivityTab", "timesheets");

  // 9. Scroll to MY PAYSLIPS
  await tl.at(23800);
  tl.showCaption(CAPTIONS.payslips);
  await tl.moveCursorTo("[data-tl=card-payslips]", { ms: 800 });
  tl.highlight("[data-tl=card-payslips]");

  await tl.at(27500);
  tl.clearHighlight();
  tl.hideCaption();
  await tl.at(STEP10_DURATION_MS);
}
