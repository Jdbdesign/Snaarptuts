import type { Timeline } from "@/lib/timeline";
import { beginWorkforce } from "@/components/workforce/workforce-timeline";
import { CAPTIONS, URLS } from "./data";

export const STEP1_DURATION_MS = 10000;

export async function runStep1(tl: Timeline) {
  beginWorkforce(tl, URLS.dashboard, "dashboard");

  // Welcome & page title
  await tl.at(500);
  tl.showCaption(CAPTIONS.welcome);
  tl.highlight("[data-tl=topbar-title]");

  // Overview section
  await tl.at(4500);
  tl.clearHighlight();
  tl.showCaption(CAPTIONS.overview);
  await tl.moveCursorTo("[data-tl=your-overview]", { ms: 800 });
  tl.highlight("[data-tl=your-overview]");

  await tl.at(9000);
  tl.clearHighlight();
  tl.hideCaption();
  await tl.at(STEP1_DURATION_MS);
}
