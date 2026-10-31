import type { Timeline } from "@/lib/timeline";
import { beginWorkforce, finishWorkforce, hoverOn, ring } from "@/components/workforce/workforce-timeline";
import { CAPTIONS, URLS } from "./data";

export const STEP4_DURATION_MS = 11000;

export async function runStep4(tl: Timeline) {
  beginWorkforce(tl, URLS.dashboard, "dashboard");
  tl.placeCursorOn("[data-tl=tab-sickness]");

  // 1. Next 7 days card
  await tl.at(500);
  tl.showCaption(CAPTIONS.next7Days);
  await hoverOn(tl, "[data-tl=card-next-7-days]", { ms: 650 });
  await ring(tl, "[data-tl=card-next-7-days]", 2800);

  // 2. Announcements card
  await tl.at(5000);
  tl.showCaption(CAPTIONS.announcements);
  await hoverOn(tl, "[data-tl=card-announcements]", { ms: 650 });
  await ring(tl, "[data-tl=card-announcements]", 2800);

  // 3. End fade
  await finishWorkforce(tl, 9800, STEP4_DURATION_MS);
}
