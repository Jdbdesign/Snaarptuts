import type { Timeline } from "@/lib/timeline";
import {
  beginWorkforce,
  finishWorkforce,
  hoverOn,
  pressOn,
  ring,
} from "@/components/workforce/workforce-timeline";
import { CAPTIONS, URLS } from "./data";

export const STEP54_DURATION_MS = 21500;

export async function runStep54(tl: Timeline) {
  beginWorkforce(tl, URLS.learningRecord, "learning", "overview", [0.1, 0.68]);
  tl.setVar("wfLearningTab", "record");
  tl.setVar("wfUnreadCount", 0);

  // 1. Click Notifications in sidebar
  await tl.at(500);
  tl.showCaption(CAPTIONS.clickNotifications);
  await pressOn(tl, "[data-tl=nav-notifications]", { ms: 600 });
  tl.setVar("wfPage", "notifications");
  tl.setVar("wfUnreadCount", 0);
  tl.setUrl(URLS.notifications);
  await tl.wait(250);

  // 2. Ring top item
  await tl.at(2500);
  tl.showCaption(CAPTIONS.topItem);
  await hoverOn(tl, "[data-tl=notif-item-1]", { ms: 500 });
  await ring(tl, "[data-tl=notif-item-1]", 1800);

  // 3. Hover Clear all & Mark all as read
  await tl.at(4800);
  tl.showCaption(CAPTIONS.clearAndMark);
  await hoverOn(tl, "[data-tl=btn-clear-all]", { ms: 500 });
  await ring(tl, "[data-tl=btn-clear-all]", 1200);

  await tl.at(6600);
  await hoverOn(tl, "[data-tl=btn-mark-all-read]", { ms: 500 });
  await ring(tl, "[data-tl=btn-mark-all-read]", 1200);

  // 4. Scroll down to policy notification
  await tl.at(8400);
  tl.showCaption(CAPTIONS.scrollList);
  await tl.scrollPanelTo("[data-scroller=notifications-page]", "[data-tl=notif-item-policy]", 1200);

  // 5. Ring policy notice & hover link
  await tl.at(10200);
  tl.showCaption(CAPTIONS.policyNotif);
  await hoverOn(tl, "[data-tl=notif-link-policy]", { ms: 500 });
  await ring(tl, "[data-tl=notif-item-policy]", 1800);

  // 6. Scroll down to attendance notification
  await tl.at(12600);
  await tl.scrollPanelTo("[data-scroller=notifications-page]", "[data-tl=notif-item-attendance]", 1200);

  // 7. Ring attendance notice
  await tl.at(14400);
  tl.showCaption(CAPTIONS.attendanceNotif);
  await hoverOn(tl, "[data-tl=notif-item-attendance]", { ms: 500 });
  await ring(tl, "[data-tl=notif-item-attendance]", 1800);

  // 8. Hover delete icon
  await tl.at(16800);
  tl.showCaption(CAPTIONS.hoverDelete);
  await hoverOn(tl, "[data-tl=btn-notif-delete]", { ms: 500 });
  await ring(tl, "[data-tl=btn-notif-delete]", 1200);

  // 9. Scroll back to top
  await tl.at(18600);
  await tl.scrollPanelTo("[data-scroller=notifications-page]", 0, 1200);

  await finishWorkforce(tl, 20400, STEP54_DURATION_MS);
}
