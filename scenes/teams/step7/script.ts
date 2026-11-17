import type { Timeline } from "@/lib/timeline";
import { beginTeams, finishTeams } from "@/components/teams/teams-timeline";

export const STEP7_DURATION_MS = 24500;

export async function runStep7(tl: Timeline) {
  beginTeams(tl, "teams-start-group-chat", {
    activeNav: "chat",
    activeChatId: "sam-taylor",
    filterTab: "all",
  });

  // Beat 1: Hover people icon in chat header
  await tl.at(400);
  tl.showCaption("Hover over the people icon to create a group.");
  await tl.moveCursorTo("[data-tl=chat-header-group-btn]", { ms: 600 });
  await tl.wait(1400);

  // Beat 2: Click to open Start a group chat dialog
  await tl.at(2600);
  tl.showCaption("Click to start a group chat from this conversation.");
  await tl.click("[data-tl=chat-header-group-btn]");
  tl.setVar("teams:isGroupDialogOpen", true);
  await tl.wait(1800);

  // Beat 3: Search for Casey
  await tl.at(5200);
  tl.showCaption("Search for colleagues by name or email.");
  await tl.moveCursorTo("[data-tl=group-search-input]", { ms: 500 });
  await tl.click("[data-tl=group-search-input]");
  await tl.typeText("[data-tl=group-search-input]", "Casey", { msPerChar: 60 });
  tl.setVar("teams:groupSearchQuery", "Casey");
  await tl.wait(1800);

  // Beat 4: Clear search input
  await tl.at(8200);
  tl.showCaption("Clear search to browse all contacts.");
  await tl.click("[data-tl=group-search-input]");
  tl.setVar("teams:groupSearchQuery", "");
  await tl.wait(1200);

  // Beat 5: Select Casey Brown
  await tl.at(10200);
  tl.showCaption("Select Casey Brown to add them to the group.");
  await tl.moveCursorTo("[data-tl=group-user-row-u-casey]", { ms: 500 });
  await tl.click("[data-tl=group-user-row-u-casey]");
  tl.setVar("teams:groupSelectedUsers", ["u-sam", "u-casey"]);
  await tl.wait(1400);

  // Beat 6: Select Jordan Lee
  await tl.at(12600);
  tl.showCaption("Select Jordan Lee to add them to the group.");
  await tl.moveCursorTo("[data-tl=group-user-row-u-jordan]", { ms: 450 });
  await tl.click("[data-tl=group-user-row-u-jordan]");
  tl.setVar("teams:groupSelectedUsers", ["u-sam", "u-casey", "u-jordan"]);
  await tl.wait(1400);

  // Beat 7: Select Alex Morgan
  await tl.at(15000);
  tl.showCaption("Select Alex Morgan to add them to the group.");
  await tl.moveCursorTo("[data-tl=group-user-row-u-alex]", { ms: 450 });
  await tl.click("[data-tl=group-user-row-u-alex]");
  tl.setVar("teams:groupSelectedUsers", [
    "u-sam",
    "u-casey",
    "u-jordan",
    "u-alex",
  ]);
  await tl.wait(1400);

  // Beat 8: Scroll candidate list
  await tl.at(17400);
  tl.showCaption("Scroll through your team directory to add more members.");
  await tl.moveCursorTo("[data-tl=group-users-scroll]", { ms: 450 });
  await tl.scrollPanelTo("[data-tl=group-users-scroll]", 90, 600);
  await tl.wait(1400);

  // Beat 9: Click Create button
  await tl.at(20000);
  tl.showCaption("Click Create to start your new group chat.");
  await tl.moveCursorTo("[data-tl=group-create-btn]", { ms: 550 });
  await tl.click("[data-tl=group-create-btn]");
  tl.setVar("teams:isCreatingGroup", true);
  await tl.wait(600);
  tl.setVar("teams:isCreatingGroup", false);
  tl.setVar("teams:createdNewGroup", true);
  tl.setVar("teams:activeChatId", "new-group");
  tl.setVar("teams:isGroupDialogOpen", false);
  await tl.wait(2000);

  finishTeams(tl);
}
