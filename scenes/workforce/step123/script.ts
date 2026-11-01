import type { Timeline } from "@/lib/timeline";
import {
  beginWorkforce,
  finishWorkforce,
  hoverOn,
  pressOn,
} from "@/components/workforce/workforce-timeline";
import { CAPTIONS, URLS } from "./data";

export const STEP123_DURATION_MS = 8000;

export async function runStep123(tl: Timeline) {
  beginWorkforce(tl, URLS.reports, "reports", "overview", [0.45, 0.28], true);

  // 1. Click Admin Panel in sidebar
  await tl.at(500);
  tl.showCaption(CAPTIONS.clickAdminPanel);
  await pressOn(tl, "[data-tl=nav-admin-panel]", { ms: 600 });
  tl.setVar("wfPage", "admin-panel-dashboard");
  tl.setUrl(URLS.adminPanel);
  await tl.wait(400);

  // 2. Hover card on admin dashboard
  await tl.at(3800);
  tl.showCaption(CAPTIONS.reviewAdminDashboard);
  await hoverOn(tl, "[data-tl=card-total-users]", { ms: 600 });
  await tl.wait(600);

  // Finish
  await tl.at(7400);
  await finishWorkforce(tl);
}
