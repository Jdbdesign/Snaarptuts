import type { Timeline } from "@/lib/timeline";
import { beginWorkforce, closePopovers, finishWorkforce, hoverOn, pressOn, ring } from "@/components/workforce/workforce-timeline";
import { CAPTIONS, URLS } from "./data";

export const STEP5_DURATION_MS = 16000;

export async function runStep5(tl: Timeline) {
  beginWorkforce(tl, URLS.dashboard, "dashboard");
  tl.placeCursorOn("[data-tl=card-announcements]");

  // 1. Open notifications popover
  await tl.at(500);
  tl.showCaption(CAPTIONS.open);
  await pressOn(tl, "[data-tl=top-bell]", { ms: 600 });
  tl.setVar("wfOpenPopover", "notifications");
  await tl.wait(100);

  // 2. Highlight popover & scroll down to later items
  await tl.at(3500);
  tl.showCaption(CAPTIONS.scroll);
  tl.highlight("[data-tl=notifications-dropdown]");
  await tl.wait(1200);
  tl.clearHighlight();

  await tl.at(5500);
  await hoverOn(tl, "[data-tl=notif-item-n6]", { ms: 800 });
  await ring(tl, "[data-tl=notif-item-n6]", 1800);

  // 3. Mark all read
  await tl.at(9500);
  tl.showCaption(CAPTIONS.markRead);
  await pressOn(tl, "[data-tl=notif-mark-read]", { ms: 600 });
  tl.setVar("wfUnreadCount", 0);
  await tl.wait(600);

  // 4. Close and finish
  await closePopovers(tl);
  await finishWorkforce(tl, 14500, STEP5_DURATION_MS);
}
