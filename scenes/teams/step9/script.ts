import type { Timeline } from "@/lib/timeline";
import { beginTeams, finishTeams } from "@/components/teams/teams-timeline";

export const STEP9_DURATION_MS = 18500;

export async function runStep9(tl: Timeline) {
  beginTeams(tl, "teams-rename-pin-group", {
    activeNav: "chat",
    activeChatId: "acme-product-tech",
    filterTab: "group",
    groupTitle: "Acme Product & Tech Team",
  });

  // Beat 1: Click group more button in header
  await tl.at(400);
  tl.showCaption("Click the more options menu in the group header.");
  await tl.moveCursorTo("[data-tl=group-header-more-btn]", { ms: 600 });
  await tl.click("[data-tl=group-header-more-btn]");
  tl.setVar("teams:isGroupMoreMenuOpen", true);
  await tl.wait(1500);

  // Beat 2: Click Rename group
  await tl.at(2800);
  tl.showCaption("Click Rename group to update the group's name.");
  await tl.moveCursorTo("[data-tl=group-menu-rename]", { ms: 450 });
  await tl.click("[data-tl=group-menu-rename]");
  tl.setVar("teams:isGroupMoreMenuOpen", false);
  tl.setVar("teams:isRenameDialogOpen", true);
  await tl.wait(1600);

  // Beat 3: Enter new group name
  await tl.at(5200);
  tl.showCaption("Enter a new name for your team chat.");
  await tl.moveCursorTo("[data-tl=dialog-rename-input]", { ms: 450 });
  await tl.click("[data-tl=dialog-rename-input]");
  await tl.typeText("[data-tl=dialog-rename-input]", "Acme Product Team", {
    msPerChar: 40,
  });
  await tl.wait(1400);

  // Beat 4: Save new name
  await tl.at(8000);
  tl.showCaption("Click Save to apply the updated name.");
  await tl.moveCursorTo("[data-tl=dialog-rename-save-btn]", { ms: 450 });
  await tl.click("[data-tl=dialog-rename-save-btn]");
  tl.setVar("teams:groupTitle", "Acme Product Team");
  tl.setVar("teams:isRenameDialogOpen", false);
  await tl.wait(2000);

  // Beat 5: Click more options again
  await tl.at(11000);
  tl.showCaption("Open the group menu again.");
  await tl.moveCursorTo("[data-tl=group-header-more-btn]", { ms: 500 });
  await tl.click("[data-tl=group-header-more-btn]");
  tl.setVar("teams:isGroupMoreMenuOpen", true);
  await tl.wait(1400);

  // Beat 6: Click Pin to top
  await tl.at(13500);
  tl.showCaption("Click Pin to top to pin this group to the top of your list.");
  await tl.moveCursorTo("[data-tl=group-menu-pin]", { ms: 450 });
  await tl.click("[data-tl=group-menu-pin]");
  tl.setVar("teams:isPinnedGroup", true);
  tl.setVar("teams:isGroupMoreMenuOpen", false);
  await tl.wait(2000);

  finishTeams(tl);
}
