import type { Timeline } from "@/lib/timeline";
import { beginTeams, finishTeams } from "@/components/teams/teams-timeline";

export const STEP18_DURATION_MS = 16000;

export async function runStep18(tl: Timeline) {
  // Step 18 starts on Chat, clicks Activity
  beginTeams(tl, "teams-check-activity", {
    activeNav: "chat",
    activityFilterTab: "all",
  });

  // Beat 1: Click Activity in the sidebar
  await tl.at(400);
  tl.showCaption("Click Activity to review workspace messages and calls.");
  await tl.moveCursorTo("[data-tl=teams-nav-activity]", { ms: 600 });
  await tl.click("[data-tl=teams-nav-activity]");
  await tl.wait(1400);

  // Beat 2: Review All activity feed
  await tl.at(2600);
  tl.showCaption("Browse your comprehensive activity history across channels.");
  await tl.moveCursorTo("[data-tl=activity-feed-list]", { ms: 500 });
  await tl.wait(1400);

  // Beat 3: Click Unread
  await tl.at(4700);
  tl.showCaption("Filter for unread mentions and messages.");
  await tl.moveCursorTo("[data-tl=activity-tab-unread]", { ms: 450 });
  await tl.click("[data-tl=activity-tab-unread]");
  await tl.wait(1200);

  // Beat 4: Click Calls
  await tl.at(6600);
  tl.showCaption("Check your recent and missed call records.");
  await tl.moveCursorTo("[data-tl=activity-tab-calls]", { ms: 450 });
  await tl.click("[data-tl=activity-tab-calls]");
  await tl.wait(1200);

  // Beat 5: Hover a call row
  await tl.at(8500);
  tl.showCaption("Hover a call entry to view communication options.");
  tl.setVar("teams:hoveredCallId", "act-1");
  await tl.moveCursorTo("[data-tl=activity-card-act-1]", { ms: 500 });
  await tl.wait(1400);

  // Beat 6: Click Ongoing tab
  await tl.at(10600);
  tl.showCaption("See live ongoing calls in your organization.");
  await tl.moveCursorTo("[data-tl=activity-tab-ongoing]", { ms: 450 });
  await tl.click("[data-tl=activity-tab-ongoing]");
  await tl.wait(1400);

  // Beat 7: Click refresh icon
  await tl.at(12700);
  tl.showCaption("Refresh the activity feed anytime.");
  await tl.moveCursorTo("[data-tl=activity-refresh-btn]", { ms: 500 });
  await tl.click("[data-tl=activity-refresh-btn]");
  await tl.wait(1200);

  finishTeams(tl);
}
