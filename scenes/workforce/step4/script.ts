import type { Timeline } from "@/lib/timeline";
import { beginWorkforce } from "@/components/workforce/workforce-timeline";
import { CAPTIONS, URLS } from "./data";

export const STEP4_DURATION_MS = 11000;

export async function runStep4(tl: Timeline) {
  beginWorkforce(tl, URLS.dashboard, "dashboard");

  // 1. Next 7 days card
  await tl.at(500);
  tl.showCaption(CAPTIONS.next7Days);
  await tl.moveCursorTo("[data-tl=card-next-7-days]", { ms: 700 });
  tl.highlight("[data-tl=card-next-7-days]");

  // 2. Announcements card
  await tl.at(5000);
  tl.clearHighlight();
  tl.showCaption(CAPTIONS.announcements);
  await tl.moveCursorTo("[data-tl=card-announcements]", { ms: 700 });
  tl.highlight("[data-tl=card-announcements]");

  await tl.at(10000);
  tl.clearHighlight();
  tl.hideCaption();
  await tl.at(STEP4_DURATION_MS);
}
