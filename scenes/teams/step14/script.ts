import type { Timeline } from "@/lib/timeline";
import { beginTeams, finishTeams } from "@/components/teams/teams-timeline";

export const STEP14_DURATION_MS = 17500;

export async function runStep14(tl: Timeline) {
  // Step 14 starts on Chat, clicks People
  beginTeams(tl, "teams-find-people", {
    activeNav: "chat",
    activeChatId: "sam-taylor",
    filterTab: "all",
  });

  // Beat 1: Click People in the sidebar
  await tl.at(400);
  tl.showCaption("Click People to view your organization and contacts.");
  await tl.moveCursorTo("[data-tl=teams-nav-people]", { ms: 600 });
  await tl.click("[data-tl=teams-nav-people]");
  await tl.wait(1400);

  // Beat 2: Click filter pills in turn: On Snaarp Teams, Organization, External, All
  await tl.at(2600);
  tl.showCaption("Filter people who are currently available on Snaarp Teams.");
  await tl.moveCursorTo("[data-tl=people-pill-chat]", { ms: 500 });
  await tl.click("[data-tl=people-pill-chat]");
  await tl.wait(1200);

  await tl.at(4500);
  tl.showCaption("View colleagues in your organization domain.");
  await tl.moveCursorTo("[data-tl=people-pill-org]", { ms: 450 });
  await tl.click("[data-tl=people-pill-org]");
  await tl.wait(1200);

  await tl.at(6300);
  tl.showCaption("See external contacts and guest users.");
  await tl.moveCursorTo("[data-tl=people-pill-external]", { ms: 450 });
  await tl.click("[data-tl=people-pill-external]");
  await tl.wait(1200);

  await tl.at(8100);
  tl.showCaption("Switch back to viewing all people.");
  await tl.moveCursorTo("[data-tl=people-pill-all]", { ms: 450 });
  await tl.click("[data-tl=people-pill-all]");
  await tl.wait(1000);

  // Beat 3: Search by name "casey"
  await tl.at(9700);
  tl.showCaption("Search for teammates by name, email, or department.");
  await tl.moveCursorTo("[data-tl=people-search-input]", { ms: 500 });
  await tl.click("[data-tl=people-search-input]");
  await tl.typeText("people-search-input", "casey");
  await tl.wait(1200);

  // Clear search
  await tl.at(12000);
  tl.showCaption("Clear the search filter.");
  await tl.moveCursorTo("[data-tl=people-search-clear]", { ms: 450 });
  await tl.click("[data-tl=people-search-clear]");
  await tl.wait(1000);

  // Beat 4: Scroll and click Load more
  await tl.at(13600);
  tl.showCaption("Click Load more to display additional colleagues.");
  await tl.moveCursorTo("[data-tl=people-load-more-btn]", { ms: 500 });
  await tl.click("[data-tl=people-load-more-btn]");
  await tl.wait(1200);

  // Beat 5: Refresh the people list
  await tl.at(15500);
  tl.showCaption("Refresh the people directory.");
  await tl.moveCursorTo("[data-tl=people-refresh-btn]", { ms: 500 });
  await tl.click("[data-tl=people-refresh-btn]");

  finishTeams(tl);
}
