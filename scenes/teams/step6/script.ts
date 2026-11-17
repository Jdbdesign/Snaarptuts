import type { Timeline } from "@/lib/timeline";
import { beginTeams, finishTeams } from "@/components/teams/teams-timeline";

export const STEP6_DURATION_MS = 15500;

export async function runStep6(tl: Timeline) {
  beginTeams(tl, "teams-files-photos", {
    activeNav: "chat",
    activeChatId: "sam-taylor",
    filterTab: "all",
    chatSubTab: "chat",
  });

  // Beat 1: Click Files tab
  await tl.at(400);
  tl.showCaption("Click Files to view shared documents and attachments.");
  await tl.moveCursorTo("[data-tl=chat-tab-files]", { ms: 600 });
  await tl.click("[data-tl=chat-tab-files]");
  tl.setVar("teams:chatSubTab", "files");
  await tl.wait(2200);

  // Beat 2: Hover empty state
  await tl.at(3500);
  await tl.moveCursorTo("[data-tl=files-empty-state]", { ms: 600 });
  await tl.wait(1500);

  // Beat 3: Click Photos tab
  await tl.at(5800);
  tl.showCaption("Click Photos to view shared images and media.");
  await tl.moveCursorTo("[data-tl=chat-tab-photos]", { ms: 550 });
  await tl.click("[data-tl=chat-tab-photos]");
  tl.setVar("teams:chatSubTab", "photos");
  await tl.wait(2000);

  // Beat 4: Hover sample photo tile
  await tl.at(8800);
  tl.showCaption("Inspect shared media thumbnails directly in the gallery.");
  await tl.moveCursorTo("[data-tl=photo-card-tile]", { ms: 500 });
  await tl.wait(1800);

  // Beat 5: Click Chat tab to return
  await tl.at(11500);
  tl.showCaption("Click Chat to return to the message stream.");
  await tl.moveCursorTo("[data-tl=chat-tab-chat]", { ms: 550 });
  await tl.click("[data-tl=chat-tab-chat]");
  tl.setVar("teams:chatSubTab", "chat");
  await tl.wait(1800);

  finishTeams(tl);
}
