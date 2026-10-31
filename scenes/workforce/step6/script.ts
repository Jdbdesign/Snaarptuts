import type { Timeline } from "@/lib/timeline";
import { beginWorkforce, closePopovers, finishWorkforce, hoverOn, pressOn, ring } from "@/components/workforce/workforce-timeline";
import { CAPTIONS, URLS } from "./data";

export const STEP6_DURATION_MS = 18000;

export async function runStep6(tl: Timeline) {
  beginWorkforce(tl, URLS.dashboard, "dashboard");
  tl.placeCursorOn("[data-tl=top-bell]");

  // 1. Add Users (admin-only explain beat)
  await tl.at(500);
  tl.showCaption(CAPTIONS.addUsers);
  await hoverOn(tl, "[data-tl=top-add-users]", { ms: 600 });
  await ring(tl, "[data-tl=top-add-users]", 3500);

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
  await hoverOn(tl, "[data-tl=avatar-settings-link]", { ms: 500 });
  await ring(tl, "[data-tl=avatar-settings-link]", 1600);

  // 4. Close & Finish
  await closePopovers(tl);
  await finishWorkforce(tl, 16800, STEP6_DURATION_MS);
}
