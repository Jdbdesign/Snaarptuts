import type { Timeline } from "@/lib/timeline";
import {
  beginWorkforce,
  finishWorkforce,
  hoverOn,
  pressOn,
} from "@/components/workforce/workforce-timeline";
import { CAPTIONS, URLS } from "./data";

export const STEP101_DURATION_MS = 8000;

export async function runStep101(tl: Timeline) {
  beginWorkforce(tl, URLS.hrCases, "admin-hr-cases", "overview", [0.45, 0.28], true);
  tl.setVar("wfHrAdminTab", "disciplinary");
  tl.setVar("wfCreateAnnouncementModalOpen", false);

  // 1. Click Announcements in sidebar
  await tl.at(500);
  tl.showCaption(CAPTIONS.clickAnnouncements);
  await pressOn(tl, "[data-tl=nav-announcements]", { ms: 600 });
  tl.setVar("wfPage", "announcements");
  tl.setUrl(URLS.announcements);
  await tl.wait(400);

  // 2. Hover announcements table
  await tl.at(3800);
  tl.showCaption(CAPTIONS.reviewAnnouncements);
  await hoverOn(tl, "[data-tl=btn-new-announcement]", { ms: 600 });
  await tl.wait(600);

  // Finish
  await tl.at(7400);
  await finishWorkforce(tl);
}
