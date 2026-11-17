import type { Timeline } from "@/lib/timeline";
import { beginTeams, finishTeams } from "@/components/teams/teams-timeline";

export const STEP12_DURATION_MS = 20500;

export async function runStep12(tl: Timeline) {
  beginTeams(tl, "teams-scheduled-and-calls", {
    activeNav: "meet",
    meetTab: "links",
  });

  // Beat 1: Click Scheduled meetings tab
  await tl.at(400);
  tl.showCaption(
    "Click Scheduled meetings to view upcoming calendar sessions."
  );
  await tl.moveCursorTo("[data-tl=meet-tab-scheduled]", { ms: 600 });
  await tl.click("[data-tl=meet-tab-scheduled]");
  tl.setVar("teams:meetTab", "scheduled");
  await tl.wait(1800);

  // Beat 2: Hover Connect Snaarp Me link
  await tl.at(3000);
  tl.showCaption("Connect Snaarp Me to sync your calendar meetings.");
  await tl.moveCursorTo("[data-tl=connect-snaarp-me-link]", { ms: 500 });
  await tl.wait(1800);

  // Beat 3: Click Calls tab
  await tl.at(5600);
  tl.showCaption("Click Calls to inspect recent audio and video call history.");
  await tl.moveCursorTo("[data-tl=meet-tab-calls]", { ms: 550 });
  await tl.click("[data-tl=meet-tab-calls]");
  tl.setVar("teams:meetTab", "calls");
  await tl.wait(2000);

  // Beat 4: Search recent calls for "Sam"
  await tl.at(8400);
  tl.showCaption("Search calls to filter by contact name.");
  await tl.moveCursorTo("[data-tl=calls-search-input]", { ms: 500 });
  await tl.click("[data-tl=calls-search-input]");
  await tl.typeText("[data-tl=calls-search-input]", "Sam", { msPerChar: 60 });
  tl.setVar("teams:callsSearchQuery", "Sam");
  await tl.wait(2200);

  // Beat 5: Clear search
  await tl.at(12200);
  tl.showCaption("Clear search to restore all call records.");
  await tl.moveCursorTo("[data-tl=calls-search-input]", { ms: 400 });
  await tl.click("[data-tl=calls-search-input]");
  tl.setVar("teams:callsSearchQuery", "");
  await tl.wait(1600);

  // Beat 6: Return to Meeting links
  await tl.at(15000);
  tl.showCaption("Click Meeting links to return to your links.");
  await tl.moveCursorTo("[data-tl=meet-tab-links]", { ms: 500 });
  await tl.click("[data-tl=meet-tab-links]");
  tl.setVar("teams:meetTab", "links");
  await tl.wait(2000);

  finishTeams(tl);
}
