import type { Timeline } from "@/lib/timeline";
import { beginWorkforce, closePopovers } from "@/components/workforce/workforce-timeline";
import { CAPTIONS, URLS } from "./data";

export const STEP6_DURATION_MS = 18000;

export async function runStep6(tl: Timeline) {
  beginWorkforce(tl, URLS.dashboard, "dashboard");

  // 1. Add Users
  await tl.at(500);
  tl.showCaption(CAPTIONS.addUsers);
  await tl.moveCursorTo("[data-tl=top-add-users]", { ms: 600 });
  await tl.click("[data-tl=top-add-users]");
  tl.setVar("wfOpenPopover", "add-users");
  tl.highlight("[data-tl=add-users-popover]");

  await tl.at(3000);
  await tl.moveCursorTo("[data-tl=add-user-email]", { ms: 500 });
  await tl.typeText("colleague@example.com", "field:invite-email");

  await tl.at(5200);
  await tl.moveCursorTo("[data-tl=add-user-cancel]", { ms: 500 });
  await tl.click("[data-tl=add-user-cancel]");
  tl.clearHighlight();
  tl.setVar("wfOpenPopover", null);

  // 2. Apps Grid
  await tl.at(7000);
  tl.showCaption(CAPTIONS.appsGrid);
  await tl.moveCursorTo("[data-tl=top-apps-grid]", { ms: 600 });
  await tl.click("[data-tl=top-apps-grid]");
  tl.setVar("wfOpenPopover", "apps");
  tl.highlight("[data-tl=apps-grid-popover]");

  // 3. Avatar menu
  await tl.at(11000);
  tl.clearHighlight();
  tl.showCaption(CAPTIONS.avatar);
  await tl.moveCursorTo("[data-tl=top-avatar]", { ms: 600 });
  await tl.click("[data-tl=top-avatar]");
  tl.setVar("wfOpenPopover", "avatar");
  tl.highlight("[data-tl=avatar-dropdown]");

  await tl.at(14000);
  await tl.moveCursorTo("[data-tl=avatar-profile-link]", { ms: 600 });

  await tl.at(16800);
  tl.clearHighlight();
  tl.hideCaption();
  await closePopovers(tl);
  await tl.at(STEP6_DURATION_MS);
}
