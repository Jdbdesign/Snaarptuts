import type { Timeline } from "@/lib/timeline";
import {
  beginProjects,
  finishProjects,
  hoverOn,
  pressOn,
} from "@/components/projects/projects-timeline";
import { PROJECTS_URLS } from "@/components/projects/projects-data";

export const STEP2_DURATION_MS = 10500;

export async function runStep2(tl: Timeline) {
  beginProjects(tl, PROJECTS_URLS.dashboard, "dashboard", [0.75, 0.65], 2);

  // Beat 1: View toggle intro
  await tl.at(400);
  tl.showCaption("Switch between monthly planning and full year overview.");
  await hoverOn(tl, "[data-tl=calendar-mode-toggle-group]", { ms: 600 });
  await tl.wait(1200);

  // Beat 2: Click Year
  await tl.at(2600);
  tl.showCaption("Click Year to inspect the 12-month calendar overview.");
  await pressOn(tl, "[data-tl=calendar-toggle-year]", { ms: 600 });
  await tl.wait(300);

  // Beat 3: Inspect months
  await tl.at(4400);
  tl.showCaption("Notice November is highlighted as the active workspace month.");
  await hoverOn(tl, "[data-tl=calendar-month-nov]", { ms: 600 });
  await tl.wait(1400);

  // Beat 4: Click Month to return
  await tl.at(6600);
  tl.showCaption("Click Month to return to the day-by-day calendar grid.");
  await pressOn(tl, "[data-tl=calendar-toggle-month]", { ms: 600 });
  await tl.wait(300);

  // Beat 5: Focus today
  await tl.at(8200);
  tl.showCaption("Today's date is clearly marked in purple.");
  await hoverOn(tl, "[data-tl=calendar-day-15]", { ms: 550 });
  await tl.wait(1000);

  // Finish
  await tl.at(9800);
  tl.hideCaption();
  tl.clearHighlight();
  await finishProjects(tl);
}
