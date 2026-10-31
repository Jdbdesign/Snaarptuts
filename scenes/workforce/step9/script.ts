import type { Timeline } from "@/lib/timeline";
import { beginWorkforce, finishWorkforce, hoverOn, pressOn, ring } from "@/components/workforce/workforce-timeline";
import { CAPTIONS, URLS } from "./data";

export const STEP9_DURATION_MS = 16000;

export async function runStep9(tl: Timeline) {
  beginWorkforce(tl, URLS.mySpace, "my-space", "overview");
  tl.setVar("wfCheckedIn", true);

  // 1. Live Attendance timer
  await tl.at(500);
  tl.showCaption(CAPTIONS.timer);
  await hoverOn(tl, "[data-tl=attendance-timer-display]", { ms: 600 });
  await ring(tl, "[data-tl=card-attendance]", 2400);

  // 2. Click Stop button
  await tl.at(4500);
  tl.showCaption(CAPTIONS.stop);
  await pressOn(tl, "[data-tl=btn-attendance-stop]", { ms: 600 });
  tl.setVar("wfCheckedIn", false);
  await tl.wait(600);

  // 3. Reportees card
  await tl.at(8000);
  tl.showCaption(CAPTIONS.reportees);
  await hoverOn(tl, "[data-tl=card-reportees]", { ms: 600 });
  await ring(tl, "[data-tl=card-reportees]", 2200);

  // 4. Monthly stat cards
  await tl.at(11800);
  tl.showCaption(CAPTIONS.stats);
  await hoverOn(tl, "[data-tl=stat-worked]", { ms: 600 });
  await ring(tl, "[data-tl=stat-worked]", 2000);

  // 5. End fade
  await finishWorkforce(tl, 15000, STEP9_DURATION_MS);
}
