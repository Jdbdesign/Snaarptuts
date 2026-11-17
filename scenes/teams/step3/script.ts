import type { Timeline } from "@/lib/timeline";
import { beginTeams, finishTeams } from "@/components/teams/teams-timeline";

export const STEP3_DURATION_MS = 17500;

export async function runStep3(tl: Timeline) {
  beginTeams(tl, "teams-chat-menu", {
    activeNav: "chat",
    activeChatId: "sam-taylor",
    filterTab: "all",
  });

  // Beat 1: Hover Sam Taylor row
  await tl.at(400);
  tl.showCaption("Hover over a conversation to access options.");
  await tl.moveCursorTo("[data-tl=chat-row-sam-taylor]", { ms: 600 });
  await tl.wait(1200);

  // Beat 2: Click the three-dots button
  await tl.at(2200);
  tl.showCaption("Click the more options menu.");
  await tl.moveCursorTo("[data-tl=chat-row-more-btn]", { ms: 450 });
  await tl.click("[data-tl=chat-row-more-btn]");
  tl.setVar("teams:isRowMenuOpen", true);
  await tl.wait(1400);

  // Beat 3: Hover menu items in sequence
  await tl.at(4200);
  tl.showCaption("Review available conversation actions.");
  await tl.moveCursorTo("[data-tl=chat-menu-unread]", { ms: 400 });
  await tl.wait(900);

  await tl.at(5600);
  await tl.moveCursorTo("[data-tl=chat-menu-pin]", { ms: 350 });
  await tl.wait(900);

  await tl.at(7000);
  await tl.moveCursorTo("[data-tl=chat-menu-mute]", { ms: 350 });
  await tl.wait(900);

  await tl.at(8400);
  await tl.moveCursorTo("[data-tl=chat-menu-hide]", { ms: 350 });
  await tl.wait(900);

  await tl.at(9800);
  await tl.moveCursorTo("[data-tl=chat-menu-block]", { ms: 350 });
  await tl.wait(900);

  await tl.at(11200);
  await tl.moveCursorTo("[data-tl=chat-menu-delete]", { ms: 350 });
  await tl.wait(1200);

  // Beat 4: Click Pin to top
  await tl.at(13000);
  tl.showCaption("Click Pin to top to keep important chats at the top.");
  await tl.moveCursorTo("[data-tl=chat-menu-pin]", { ms: 450 });
  await tl.click("[data-tl=chat-menu-pin]");
  tl.setVar("teams:isPinnedSam", true);
  tl.setVar("teams:isRowMenuOpen", false);
  await tl.wait(2000);

  finishTeams(tl);
}
