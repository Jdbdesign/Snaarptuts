import type { Timeline } from "@/lib/timeline";
import { beginTeams, finishTeams } from "@/components/teams/teams-timeline";

export const STEP8_DURATION_MS = 24500;

export async function runStep8(tl: Timeline) {
  beginTeams(tl, "teams-explore-group-chat", {
    activeNav: "chat",
    activeChatId: "acme-product-tech",
    filterTab: "group",
  });

  // Beat 1: Ring header elements
  await tl.at(400);
  tl.showCaption(
    "View group details, Meet now, members, search, and notifications."
  );
  await tl.moveCursorTo("[data-tl=group-chat-header]", { ms: 600 });
  await tl.wait(1800);

  // Beat 2: Click people icon to open members popover
  await tl.at(3000);
  tl.showCaption("Click the members icon to view everyone in this group.");
  await tl.moveCursorTo("[data-tl=group-header-members-btn]", { ms: 500 });
  await tl.click("[data-tl=group-header-members-btn]");
  tl.setVar("teams:isMembersPopoverOpen", true);
  await tl.wait(1400);

  // Beat 3: Scroll members list
  await tl.at(5200);
  tl.showCaption("Scroll through all 8 participants and manage invitations.");
  await tl.moveCursorTo("[data-tl=popover-members-scroll]", { ms: 450 });
  await tl.scrollPanelTo("[data-tl=popover-members-scroll]", 60, 500);
  await tl.wait(1600);

  // Beat 4: Click away to close popover
  await tl.at(7800);
  tl.showCaption("Click away to close the members list.");
  await tl.moveCursorTo("[data-tl=group-members-backdrop]", { ms: 400 });
  await tl.click("[data-tl=group-members-backdrop]");
  tl.setVar("teams:isMembersPopoverOpen", false);
  await tl.wait(1200);

  // Beat 5: Click search icon to open Find in chat panel
  await tl.at(9800);
  tl.showCaption("Click Search to find messages and links in this chat.");
  await tl.moveCursorTo("[data-tl=group-header-search-btn]", { ms: 500 });
  await tl.click("[data-tl=group-header-search-btn]");
  tl.setVar("teams:isFindInChatOpen", true);
  await tl.wait(1400);

  // Beat 6: Type keyword into Find in chat input
  await tl.at(12200);
  tl.showCaption("Type keywords to search through group history.");
  await tl.moveCursorTo("[data-tl=find-in-chat-input]", { ms: 450 });
  await tl.click("[data-tl=find-in-chat-input]");
  await tl.typeText("[data-tl=find-in-chat-input]", "Hello", {
    msPerChar: 60,
  });
  tl.setVar("teams:findInChatQuery", "Hello");
  await tl.wait(1800);

  // Beat 7: Close Find in chat panel
  await tl.at(15200);
  tl.showCaption("Close the search panel.");
  await tl.moveCursorTo("[data-tl=find-in-chat-close-btn]", { ms: 450 });
  await tl.click("[data-tl=find-in-chat-close-btn]");
  tl.setVar("teams:isFindInChatOpen", false);
  await tl.wait(1200);

  // Beat 8: Hover message to display reaction bar
  await tl.at(17400);
  tl.showCaption("Hover over any message to react with emojis.");
  await tl.moveCursorTo("[data-tl=chat-message-gm1]", { ms: 600 });
  tl.setVar("teams:hoveredMessageId", "gm1");
  await tl.wait(1600);

  // Beat 9: Click thumbs-up reaction
  await tl.at(20000);
  tl.showCaption("Click the thumbs-up to react to the announcement.");
  await tl.moveCursorTo("[data-tl=reaction-btn-thumbs]", { ms: 450 });
  await tl.click("[data-tl=reaction-btn-thumbs]");
  tl.setVar("teams:hasFirstReaction", true);
  tl.setVar("teams:hoveredMessageId", null);
  await tl.wait(2200);

  finishTeams(tl);
}
