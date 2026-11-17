import type { Timeline } from "@/lib/timeline";
import {
  beginTeams,
  finishTeams,
  pushTeamsToast,
} from "@/components/teams/teams-timeline";
import { INITIAL_MEET_LINKS, SECOND_MEET_LINK } from "@/components/teams/teams-data";

export const STEP11_DURATION_MS = 23500;

export async function runStep11(tl: Timeline) {
  beginTeams(tl, "teams-create-manage-meet-links", {
    activeNav: "chat",
    activeChatId: "sam-taylor",
    meetTab: "links",
  });

  // Beat 1: Click Meet in left sidebar
  await tl.at(400);
  tl.showCaption("Click Meet to open video meeting tools and links.");
  await tl.moveCursorTo("[data-tl=teams-nav-meet]", { ms: 600 });
  await tl.click("[data-tl=teams-nav-meet]");
  tl.setVar("teams:activeNav", "meet");
  await tl.wait(1800);

  // Beat 2: Click Create a meeting link button
  await tl.at(3000);
  tl.showCaption(
    "Click Create a meeting link to generate a new reusable video room."
  );
  await tl.moveCursorTo("[data-tl=meet-create-link-btn]", { ms: 550 });
  await tl.click("[data-tl=meet-create-link-btn]");
  tl.setVar("teams:isCreatingLink", true);
  await tl.wait(600);
  tl.setVar("teams:isCreatingLink", false);
  tl.setVar("teams:meetLinks", [
    ...INITIAL_MEET_LINKS,
    SECOND_MEET_LINK,
  ]);
  pushTeamsToast(tl, "Meeting link created");
  await tl.wait(2000);

  // Beat 3: Hover action icons on the second card
  await tl.at(6800);
  tl.showCaption("Copy, open, or delete meeting links anytime.");
  await tl.moveCursorTo("[data-tl=card-action-copy-2]", { ms: 450 });
  await tl.wait(800);

  await tl.at(8200);
  await tl.moveCursorTo("[data-tl=card-action-open-2]", { ms: 350 });
  await tl.wait(800);

  await tl.at(9500);
  await tl.moveCursorTo("[data-tl=card-action-delete-2]", { ms: 350 });
  await tl.wait(1000);

  // Beat 4: Click copy icon on second card
  await tl.at(11000);
  tl.showCaption("Click Copy to copy the link to your clipboard.");
  await tl.moveCursorTo("[data-tl=card-action-copy-2]", { ms: 450 });
  await tl.click("[data-tl=card-action-copy-2]");
  pushTeamsToast(tl, "Link copied");
  await tl.wait(2000);

  // Beat 5: Click Share link on the first card
  await tl.at(14000);
  tl.showCaption("Click Share link to share the meeting invitation.");
  await tl.moveCursorTo("[data-tl=card-btn-share-1]", { ms: 500 });
  await tl.click("[data-tl=card-btn-share-1]");
  pushTeamsToast(tl, "Link copied");
  await tl.wait(2000);

  // Beat 6: Click delete trash icon on second card
  await tl.at(17200);
  tl.showCaption("Click the trash icon to remove the meeting link.");
  await tl.moveCursorTo("[data-tl=card-action-delete-2]", { ms: 450 });
  await tl.click("[data-tl=card-action-delete-2]");
  tl.setVar("teams:meetLinks", [...INITIAL_MEET_LINKS]);
  pushTeamsToast(tl, "Meeting link removed");
  await tl.wait(2200);

  finishTeams(tl);
}
