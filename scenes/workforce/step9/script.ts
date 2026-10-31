import type { Timeline } from "@/lib/timeline";
import { beginWorkforce } from "@/components/workforce/workforce-timeline";
import { CAPTIONS, URLS } from "./data";

export const STEP9_DURATION_MS = 16000;

export async function runStep9(tl: Timeline) {
  beginWorkforce(tl, URLS.mySpace, "my-space", "overview");
  tl.setVar("wfCheckedIn", true);

  // 1. Live Attendance timer
  await tl.at(500);
  tl.showCaption(CAPTIONS.timer);
  await tl.moveCursorTo("[data-tl=attendance-timer-display]", { ms: 600 });
  tl.highlight("[data-tl=card-attendance]");

  // 2. Click Stop button
  await tl.at(4500);
  tl.showCaption(CAPTIONS.stop);
  await tl.moveCursorTo("[data-tl=btn-attendance-stop]", { ms: 600 });
  await tl.click("[data-tl=btn-attendance-stop]");
  tl.setVar("wfCheckedIn", false);

  // 3. Reportees card
  await tl.at(8500);
  tl.clearHighlight();
  tl.showCaption(CAPTIONS.reportees);
  await tl.moveCursorTo("[data-tl=card-reportees]", { ms: 600 });
  tl.highlight("[data-tl=card-reportees]");

  // 4. Monthly stat cards
  await tl.at(12000);
  tl.clearHighlight();
  tl.showCaption(CAPTIONS.stats);
  await tl.moveCursorTo("[data-tl=stat-worked]", { ms: 600 });
  tl.highlight("[data-tl=stat-worked]");

  await tl.at(15200);
  tl.clearHighlight();
  tl.hideCaption();
  await tl.at(STEP9_DURATION_MS);
}
