import type { Timeline } from "@/lib/timeline";
import {
  beginLock,
  finishLock,
  pressOn,
  scrollView,
} from "@/components/lock/lock-timeline";
import { LOCK_URLS } from "@/components/lock/lock-data";

export const STEP2_DURATION_MS = 13500;

export async function runStep2(tl: Timeline) {
  beginLock(tl, LOCK_URLS.dashboard, "dashboard", [0.45, 0.45], 2);

  // Beat 1: Click Manage
  await tl.at(400);
  tl.showCaption("Click Manage to view all active sessions and connected devices.");
  await pressOn(tl, "[data-tl=btn-manage-devices]");
  tl.setVar("lockView", "devices");
  tl.setUrl(LOCK_URLS.devices);
  await tl.wait(300);

  // Beat 2: Scroll through sessions
  await tl.at(2500);
  tl.showCaption("Review all active sign-ins across browsers, operating systems, and IP addresses.");
  await scrollView(tl, 140, 800);
  await tl.wait(600);

  // Beat 3: Revoke a single session
  await tl.at(5200);
  tl.showCaption("Click Revoke on any session you want to disconnect.");
  await pressOn(tl, "[data-tl=btn-revoke-3]");
  await tl.wait(1000);

  // Beat 4: Revoke All Others
  await tl.at(7800);
  tl.showCaption("Click Revoke All Others to immediately sign out all other devices.");
  await pressOn(tl, "[data-tl=btn-revoke-all-others]");
  await tl.wait(1200);

  // Beat 5: Return to Dashboard
  await tl.at(10400);
  tl.showCaption("Click the back arrow to return to your security dashboard.");
  await pressOn(tl, "[data-tl=btn-devices-back]");
  tl.setVar("lockView", "dashboard");
  tl.setUrl(LOCK_URLS.dashboard);
  await tl.wait(400);

  // Finish
  await tl.at(12600);
  tl.hideCaption();
  tl.clearHighlight();
  await finishLock(tl);
}
