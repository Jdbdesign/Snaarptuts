import type { Timeline } from "@/lib/timeline";
import {
  beginWorkforce,
  finishWorkforce,
  hoverOn,
  pressOn,
  ring,
} from "@/components/workforce/workforce-timeline";
import { CAPTIONS, URLS } from "./data";

export const STEP25_DURATION_MS = 14500;

export async function runStep25(tl: Timeline) {
  beginWorkforce(tl, URLS.attendance, "attendance", "overview", [0.5, 0.35]);
  tl.setVar("wfAttendanceCheckedIn", true);
  tl.setVar("wfAttendanceSeconds", 13 * 60 + 16);

  // 1. Ring the timer
  await tl.at(500);
  tl.showCaption(CAPTIONS.timerTicking);
  await hoverOn(tl, "[data-tl=attendance-timer]", { ms: 600 });
  await ring(tl, "[data-tl=attendance-timer]", 1800);

  // Advance timer seconds
  await tl.at(1500);
  tl.setVar("wfAttendanceSeconds", 13 * 60 + 17);
  await tl.at(2500);
  tl.setVar("wfAttendanceSeconds", 13 * 60 + 18);

  // 2. Ring the session box
  await tl.at(3000);
  tl.showCaption(CAPTIONS.sessionBox);
  await hoverOn(tl, "[data-tl=attendance-session-box]", { ms: 600 });
  await ring(tl, "[data-tl=attendance-session-box]", 2000);

  await tl.at(4000);
  tl.setVar("wfAttendanceSeconds", 13 * 60 + 19);
  await tl.at(5000);
  tl.setVar("wfAttendanceSeconds", 13 * 60 + 20);

  // 3. Click Check Out
  await tl.at(6000);
  tl.showCaption(CAPTIONS.clickCheckOut);
  await pressOn(tl, "[data-tl=attendance-checkout-btn]", { ms: 600 });
  tl.setVar("wfAttendanceLoading", true);
  await tl.wait(800);
  tl.setVar("wfAttendanceLoading", false);
  tl.setVar("wfAttendanceCheckedIn", false);
  await tl.wait(250);

  // 4. Ring the new checked out state
  await tl.at(8800);
  tl.showCaption(CAPTIONS.checkedOutState);
  await hoverOn(tl, "[data-tl=attendance-checked-out-box]", { ms: 600 });
  await ring(tl, "[data-tl=attendance-checked-out-box]", 3000);

  // Finish
  await finishWorkforce(tl, 13500, STEP25_DURATION_MS);
}
