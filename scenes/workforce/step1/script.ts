import type { Timeline } from "@/lib/timeline";
import { beginWorkforce, finishWorkforce, hoverOn, ring } from "@/components/workforce/workforce-timeline";
import { CAPTIONS, URLS } from "./data";

export const STEP1_DURATION_MS = 10000;

export async function runStep1(tl: Timeline) {
  beginWorkforce(tl, URLS.dashboard, "dashboard");

  // 1. Welcome & page title
  await tl.at(500);
  tl.showCaption(CAPTIONS.welcome);
  await hoverOn(tl, "[data-tl=topbar-title]", { ms: 650 });
  await ring(tl, "[data-tl=topbar-title]", 2200);

  // 2. Overview section
  await tl.at(4500);
  tl.showCaption(CAPTIONS.overview);
  await hoverOn(tl, "[data-tl=your-overview]", { ms: 750 });
  await ring(tl, "[data-tl=your-overview]", 2600);

  // 3. End fade
  await finishWorkforce(tl, 8800, STEP1_DURATION_MS);
}
