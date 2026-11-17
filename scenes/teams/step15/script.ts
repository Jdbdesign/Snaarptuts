import type { Timeline } from "@/lib/timeline";
import { beginTeams, finishTeams } from "@/components/teams/teams-timeline";

export const STEP15_DURATION_MS = 14500;

export async function runStep15(tl: Timeline) {
  // Step 15 starts on People
  beginTeams(tl, "teams-message-call-person", {
    activeNav: "people",
    peopleFilterTab: "all",
  });

  // Beat 1: Hover Alex Morgan row
  await tl.at(400);
  tl.showCaption("Hover a person's card to reveal quick communication actions.");
  await tl.moveCursorTo("[data-tl=people-card-p-alex]", { ms: 600 });
  tl.setVar("teams:hoveredPersonId", "p-alex");
  await tl.wait(1200);

  // Beat 2: Click Chat icon -> opens Alex Morgan chat
  await tl.at(2400);
  tl.showCaption("Click Chat to open a direct conversation.");
  await tl.moveCursorTo("[data-tl=people-btn-chat-p-alex]", { ms: 450 });
  await tl.click("[data-tl=people-btn-chat-p-alex]");
  await tl.wait(1600);

  // Beat 3: Return to People via sidebar
  await tl.at(4600);
  tl.showCaption("Return to the People directory.");
  await tl.moveCursorTo("[data-tl=teams-nav-people]", { ms: 500 });
  await tl.click("[data-tl=teams-nav-people]");
  await tl.wait(1000);

  // Beat 4: Hover row and click Call icon -> opens calling overlay
  await tl.at(6300);
  tl.showCaption("Click the call button to start an audio call.");
  tl.setVar("teams:hoveredPersonId", "p-alex");
  await tl.moveCursorTo("[data-tl=people-btn-call-p-alex]", { ms: 500 });
  await tl.click("[data-tl=people-btn-call-p-alex]");
  await tl.wait(1600);

  // Beat 5: End call
  await tl.at(8600);
  tl.showCaption("Click the red button to end the call.");
  await tl.moveCursorTo("[data-tl=call-end-btn]", { ms: 500 });
  await tl.click("[data-tl=call-end-btn]");
  await tl.wait(1000);

  // Beat 6: Hover Video icon (tooltip only)
  await tl.at(10300);
  tl.showCaption("Hover Video call to launch a meeting with this person.");
  tl.setVar("teams:hoveredPersonId", "p-alex");
  await tl.moveCursorTo("[data-tl=people-btn-video-p-alex]", { ms: 500 });
  await tl.wait(1600);

  finishTeams(tl);
}
