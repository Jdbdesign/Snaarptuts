import type { Timeline } from "@/lib/timeline";
import { beginWorkforce, finishWorkforce, hoverOn, pressOn, ring } from "@/components/workforce/workforce-timeline";
import { CAPTIONS, URLS } from "./data";

export const STEP20_DURATION_MS = 18000;

export async function runStep20(tl: Timeline) {
  beginWorkforce(tl, URLS.salaryAdvances, "salary-advances", "salary-advances", [0.12, 0.4]);

  // 1. Click Resignation in sidebar
  await tl.at(500);
  tl.showCaption(CAPTIONS.clickResignation);
  await pressOn(tl, "[data-tl=subnav-resignation]", { ms: 600 });
  tl.setVar("wfResignationLoading", true);
  tl.setVar("wfPage", "resignation");
  tl.setVar("wfSubpage", "resignation");
  tl.setUrl(URLS.resignation);
  await tl.wait(800);
  tl.setVar("wfResignationLoading", false);
  await tl.wait(150);

  // 2. Ring status badge
  await tl.at(3500);
  tl.showCaption(CAPTIONS.statusBadge);
  await hoverOn(tl, "[data-tl=resignation-status-badge]", { ms: 600 });
  await ring(tl, "[data-tl=resignation-status-badge]", 2000);

  // 3. Ring dates
  await tl.at(6800);
  tl.showCaption(CAPTIONS.dates);
  await hoverOn(tl, "[data-tl=resignation-dates]", { ms: 600 });
  await ring(tl, "[data-tl=resignation-dates]", 2200);

  // 4. Scroll to Timeline and ring it
  await tl.at(10200);
  tl.showCaption(CAPTIONS.timeline);
  await hoverOn(tl, "[data-tl=resignation-timeline]", { ms: 600 });
  await ring(tl, "[data-tl=resignation-timeline]", 2200);

  // 5. Scroll to Exit interview card and ring it
  await tl.at(13600);
  tl.showCaption(CAPTIONS.exitInterview);
  await hoverOn(tl, "[data-tl=card-exit-interview]", { ms: 600 });
  await ring(tl, "[data-tl=card-exit-interview]", 2200);

  // 6. Finish
  await finishWorkforce(tl, 17200, STEP20_DURATION_MS);
}
