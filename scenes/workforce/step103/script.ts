import type { Timeline } from "@/lib/timeline";
import {
  beginWorkforce,
  finishWorkforce,
  hoverOn,
  pressOn,
} from "@/components/workforce/workforce-timeline";
import { CAPTIONS, URLS } from "./data";

export const STEP103_DURATION_MS = 8500;

export async function runStep103(tl: Timeline) {
  beginWorkforce(tl, URLS.announcements, "announcements", "overview", [0.55, 0.55], true);
  tl.setVar("wfCreateAnnouncementModalOpen", true);
  tl.setVar("wfAnnouncementTitleText", "New day");
  tl.setVar("wfAnnouncementContentText", "This is a brand new day");
  tl.setVar("wfAnnouncementBannerChecked", true);
  tl.setVar("wfAnnouncementCtaText", "NEW DAY");
  tl.setVar("wfAnnouncementCreated", false);
  tl.setVar("wfAnnouncementBanner", false);

  // 1. Click Create
  await tl.at(500);
  tl.showCaption(CAPTIONS.publishAnnouncement);
  await pressOn(tl, "[data-tl=btn-submit-announcement]", { ms: 600 });
  tl.setVar("wfAnnouncementCreated", true);
  tl.setVar("wfAnnouncementBanner", true);
  tl.setVar("wfNewAnnouncementNotif", true);
  tl.setVar("wfCreateAnnouncementModalOpen", false);
  await tl.wait(400);

  // 2. Hover banner
  await tl.at(3800);
  tl.showCaption(CAPTIONS.bannerLive);
  await hoverOn(tl, "[data-tl=wf-announcement-banner]", { ms: 600 });
  await tl.wait(600);

  // Finish
  await tl.at(7800);
  await finishWorkforce(tl);
}
