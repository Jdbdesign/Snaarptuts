import type { Timeline } from "@/lib/timeline";
import {
  beginWorkforce,
  finishWorkforce,
  pressOn,
} from "@/components/workforce/workforce-timeline";
import { CAPTIONS, URLS } from "./data";

export const STEP102_DURATION_MS = 14500;

export async function runStep102(tl: Timeline) {
  beginWorkforce(tl, URLS.announcements, "announcements", "overview", [0.45, 0.28], true);
  tl.setVar("wfCreateAnnouncementModalOpen", false);
  tl.setVar("wfAnnouncementTitleText", "");
  tl.setVar("wfAnnouncementContentText", "");
  tl.setVar("wfAnnouncementBannerChecked", false);
  tl.setVar("wfAnnouncementCtaText", "");

  // 1. Click + New Announcement
  await tl.at(500);
  tl.showCaption(CAPTIONS.newAnnouncement);
  await pressOn(tl, "[data-tl=btn-new-announcement]", { ms: 600 });
  tl.setVar("wfCreateAnnouncementModalOpen", true);
  await tl.wait(400);

  // 2. Type Title
  await tl.at(3200);
  tl.showCaption(CAPTIONS.fillTitle);
  await pressOn(tl, "[data-tl=input-announcement-title]", { ms: 500 });
  tl.setVar("wfAnnouncementTitleText", "New day");
  await tl.typeText("[data-tl=input-announcement-title]", "New day", { msPerChar: 40 });
  await tl.wait(400);

  // 3. Type Content
  await tl.at(6200);
  tl.showCaption(CAPTIONS.fillMessage);
  await pressOn(tl, "[data-tl=textarea-announcement-content]", { ms: 500 });
  tl.setVar("wfAnnouncementContentText", "This is a brand new day");
  await tl.typeText("[data-tl=textarea-announcement-content]", "This is a brand new day", { msPerChar: 35 });
  await tl.wait(400);

  // 4. Toggle Display as Banner
  await tl.at(9800);
  tl.showCaption(CAPTIONS.toggleBanner);
  await pressOn(tl, "[data-tl=toggle-announcement-banner]", { ms: 500 });
  tl.setVar("wfAnnouncementBannerChecked", true);
  await tl.wait(400);

  // 5. Type CTA text
  await tl.at(11800);
  tl.showCaption(CAPTIONS.fillCta);
  await pressOn(tl, "[data-tl=input-announcement-cta]", { ms: 500 });
  tl.setVar("wfAnnouncementCtaText", "NEW DAY");
  await tl.typeText("[data-tl=input-announcement-cta]", "NEW DAY", { msPerChar: 40 });
  await tl.wait(400);

  // Finish
  await tl.at(13900);
  await finishWorkforce(tl);
}
