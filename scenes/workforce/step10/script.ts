import type { Timeline } from "@/lib/timeline";
import { beginWorkforce, finishWorkforce, hoverOn, pressOn, ring } from "@/components/workforce/workforce-timeline";
import { CAPTIONS, URLS } from "./data";

export const STEP10_DURATION_MS = 28000;

export async function runStep10(tl: Timeline) {
  beginWorkforce(tl, URLS.mySpace, "my-space", "overview");

  // 1. Activities
  await tl.at(500);
  tl.showCaption(CAPTIONS.activities);
  await pressOn(tl, "[data-tl=tab-act-activities]", { ms: 500, ring: false });
  tl.setVar("wfActiveActivityTab", "activities");
  await tl.wait(200);

  // 2. Feeds
  await tl.at(3200);
  tl.showCaption(CAPTIONS.feeds);
  await pressOn(tl, "[data-tl=tab-act-feeds]", { ms: 500, ring: false });
  tl.setVar("wfActiveActivityTab", "feeds");
  await tl.wait(200);

  // 3. Profile
  await tl.at(6000);
  tl.showCaption(CAPTIONS.profile);
  await pressOn(tl, "[data-tl=tab-act-profile]", { ms: 500, ring: false });
  tl.setVar("wfActiveActivityTab", "profile");
  await tl.wait(200);

  // 4. Approvals
  await tl.at(8800);
  tl.showCaption(CAPTIONS.approvals);
  await pressOn(tl, "[data-tl=tab-act-approvals]", { ms: 500, ring: false });
  tl.setVar("wfActiveActivityTab", "approvals");
  await tl.wait(200);

  // 5. Leave
  await tl.at(11800);
  tl.showCaption(CAPTIONS.leave);
  await pressOn(tl, "[data-tl=tab-act-leave]", { ms: 500, ring: false });
  tl.setVar("wfActiveActivityTab", "leave");
  await tl.wait(200);

  // 6. Attendance
  await tl.at(14800);
  tl.showCaption(CAPTIONS.attendance);
  await pressOn(tl, "[data-tl=tab-act-attendance]", { ms: 500, ring: false });
  tl.setVar("wfActiveActivityTab", "attendance");
  await tl.wait(200);

  // 7. Time Logs
  await tl.at(17800);
  tl.showCaption(CAPTIONS.timeLogs);
  await pressOn(tl, "[data-tl=tab-act-time-logs]", { ms: 500, ring: false });
  tl.setVar("wfActiveActivityTab", "time-logs");
  await tl.wait(200);

  // 8. Timesheets
  await tl.at(20800);
  tl.showCaption(CAPTIONS.timesheets);
  await pressOn(tl, "[data-tl=tab-act-timesheets]", { ms: 500, ring: false });
  tl.setVar("wfActiveActivityTab", "timesheets");
  await tl.wait(200);

  // 9. Scroll to MY PAYSLIPS
  await tl.at(23800);
  tl.showCaption(CAPTIONS.payslips);
  await hoverOn(tl, "[data-tl=card-payslips]", { ms: 750 });
  await ring(tl, "[data-tl=card-payslips]", 2400);

  // 10. End fade
  await finishWorkforce(tl, 27000, STEP10_DURATION_MS);
}
