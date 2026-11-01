import type { Timeline } from "@/lib/timeline";
import {
  beginWorkforce,
  finishWorkforce,
  hoverOn,
  pressOn,
} from "@/components/workforce/workforce-timeline";
import { CAPTIONS, URLS } from "./data";

export const STEP104_DURATION_MS = 10500;

export async function runStep104(tl: Timeline) {
  beginWorkforce(tl, URLS.announcements, "announcements", "overview", [0.55, 0.12], true);
  tl.setVar("wfAnnouncementCreated", true);
  tl.setVar("wfAnnouncementBanner", true);
  tl.setVar("wfNewAnnouncementNotif", true);
  tl.setVar("wfOpenPopover", null);

  // 1. Click notifications bell
  await tl.at(500);
  tl.showCaption(CAPTIONS.openNotifications);
  await pressOn(tl, "[data-tl=top-bell]", { ms: 600 });
  tl.setVar("wfOpenPopover", "notifications");
  await tl.wait(400);

  // 2. Hover new announcement notification
  await tl.at(3800);
  tl.showCaption(CAPTIONS.inspectNotification);
  await hoverOn(tl, "[data-tl=notif-item-new-announcement]", { ms: 600 });
  await tl.wait(600);

  // 3. Dismiss banner
  await tl.at(7200);
  tl.showCaption(CAPTIONS.dismissBanner);
  await pressOn(tl, "[data-tl=btn-dismiss-announcement-banner]", { ms: 600 });
  tl.setVar("wfAnnouncementBanner", false);
  tl.setVar("wfOpenPopover", null);
  await tl.wait(400);

  // Finish
  await tl.at(9800);
  await finishWorkforce(tl);
}
