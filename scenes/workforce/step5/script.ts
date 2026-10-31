import type { Timeline } from "@/lib/timeline";
import { beginWorkforce, closePopovers } from "@/components/workforce/workforce-timeline";
import { CAPTIONS, URLS } from "./data";

export const STEP5_DURATION_MS = 16000;

export async function runStep5(tl: Timeline) {
  beginWorkforce(tl, URLS.dashboard, "dashboard");

  // 1. Open notifications popover
  await tl.at(500);
  tl.showCaption(CAPTIONS.open);
  await tl.moveCursorTo("[data-tl=top-bell]", { ms: 600 });
  await tl.click("[data-tl=top-bell]");
  tl.setVar("wfOpenPopover", "notifications");

  // 2. Highlight popover & scroll down to later items
  await tl.at(3500);
  tl.showCaption(CAPTIONS.scroll);
  tl.highlight("[data-tl=notifications-dropdown]");

  await tl.at(6000);
  // Auto-scroll inside notif-list to item n6 using moveCursorTo
  await tl.moveCursorTo("[data-tl=notif-item-n6]", { ms: 800 });

  // 3. Mark all read
  await tl.at(10000);
  tl.clearHighlight();
  tl.showCaption(CAPTIONS.markRead);
  await tl.moveCursorTo("[data-tl=notif-mark-read]", { ms: 600 });
  await tl.click("[data-tl=notif-mark-read]");
  tl.setVar("wfUnreadCount", 0);

  await tl.at(14500);
  tl.hideCaption();
  await closePopovers(tl);
  await tl.at(STEP5_DURATION_MS);
}
