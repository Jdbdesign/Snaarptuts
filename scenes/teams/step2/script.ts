import type { Timeline } from "@/lib/timeline";
import { beginTeams, finishTeams } from "@/components/teams/teams-timeline";

export const STEP2_DURATION_MS = 18500;

export async function runStep2(tl: Timeline) {
  beginTeams(tl, "teams-filter-chats", {
    activeNav: "chat",
    activeChatId: "sam-taylor",
    filterTab: "all",
  });

  // Beat 1: Click Unread
  await tl.at(400);
  tl.showCaption("Click Unread to filter unread conversations.");
  await tl.moveCursorTo("[data-tl=chat-tab-unread]", { ms: 600 });
  await tl.click("[data-tl=chat-tab-unread]");
  tl.setVar("teams:filterTab", "unread");
  await tl.wait(2000);

  // Beat 2: Click Group
  await tl.at(3200);
  tl.showCaption("Click Group to view all your team and group chats.");
  await tl.moveCursorTo("[data-tl=chat-tab-group]", { ms: 550 });
  await tl.click("[data-tl=chat-tab-group]");
  tl.setVar("teams:filterTab", "group");
  await tl.wait(2200);

  // Beat 3: Click search toggle icon
  await tl.at(6200);
  tl.showCaption("Click the search icon to filter chats by name.");
  await tl.moveCursorTo("[data-tl=chat-list-search-toggle]", { ms: 500 });
  await tl.click("[data-tl=chat-list-search-toggle]");
  tl.setVar("teams:isListSearchOpen", true);
  await tl.wait(1200);

  // Beat 4: Type "Acme" into search box
  await tl.at(8200);
  tl.showCaption("Type a keyword to find matching chats.");
  await tl.moveCursorTo("[data-tl=chat-list-search-input]", { ms: 450 });
  await tl.click("[data-tl=chat-list-search-input]");
  await tl.typeText("[data-tl=chat-list-search-input]", "Acme", { msPerChar: 60 });
  tl.setVar("teams:listSearchQuery", "Acme");
  await tl.wait(2200);

  // Beat 5: Clear search box
  await tl.at(12000);
  tl.showCaption("Clear the search to restore the group list.");
  await tl.moveCursorTo("[data-tl=chat-list-search-input]", { ms: 400 });
  await tl.click("[data-tl=chat-list-search-input]");
  tl.setVar("teams:listSearchQuery", "");
  await tl.wait(1500);

  // Beat 6: Click All to restore
  await tl.at(14500);
  tl.showCaption("Click All to view all conversations.");
  await tl.moveCursorTo("[data-tl=chat-tab-all]", { ms: 500 });
  await tl.click("[data-tl=chat-tab-all]");
  tl.setVar("teams:filterTab", "all");
  await tl.wait(1800);

  finishTeams(tl);
}
