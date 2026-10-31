import type { Timeline } from "@/lib/timeline";
import { beginWorkforce, closePopovers, finishWorkforce, hoverOn, pressOn, ring } from "@/components/workforce/workforce-timeline";
import { CAPTIONS, URLS } from "./data";

export const STEP6_DURATION_MS = 18000;

export async function runStep6(tl: Timeline) {
  beginWorkforce(tl, URLS.dashboard, "dashboard");

  // 1. Add Users
  await tl.at(500);
  tl.showCaption(CAPTIONS.addUsers);
  await pressOn(tl, "[data-tl=top-add-users]", { ms: 600 });
  tl.setVar("wfOpenPopover", "add-users");
  await tl.wait(100);
  tl.highlight("[data-tl=add-users-popover]");
  await tl.wait(800);
  tl.clearHighlight();

  await tl.at(2800);
  await tl.fill("[data-tl=add-user-email]", "invite-email", "colleague@example.com", { moveMs: 550, msPerChar: 55 });
  await tl.wait(300);

  await tl.at(5200);
  await pressOn(tl, "[data-tl=add-user-cancel]", { ms: 500 });
  tl.setVar("wfOpenPopover", null);
  await tl.wait(100);

  // 2. Apps Grid
  await tl.at(6800);
  tl.showCaption(CAPTIONS.appsGrid);
  await pressOn(tl, "[data-tl=top-apps-grid]", { ms: 600 });
  tl.setVar("wfOpenPopover", "apps");
  await tl.wait(100);
  tl.highlight("[data-tl=apps-grid-popover]");
  await tl.wait(1800);
  tl.clearHighlight();

  // 3. Avatar menu
  await tl.at(10500);
  tl.showCaption(CAPTIONS.avatar);
  await pressOn(tl, "[data-tl=top-avatar]", { ms: 600 });
  tl.setVar("wfOpenPopover", "avatar");
  await tl.wait(100);
  tl.highlight("[data-tl=avatar-dropdown]");
  await tl.wait(1200);
  tl.clearHighlight();

  await tl.at(13500);
  await hoverOn(tl, "[data-tl=avatar-profile-link]", { ms: 500 });
  await ring(tl, "[data-tl=avatar-profile-link]", 1600);

  // 4. Close & Finish
  await closePopovers(tl);
  await finishWorkforce(tl, 16800, STEP6_DURATION_MS);
}
