import type { Timeline } from "@/lib/timeline";
import { beginTeams, finishTeams } from "@/components/teams/teams-timeline";

export const STEP5_DURATION_MS = 14500;

export async function runStep5(tl: Timeline) {
  beginTeams(tl, "teams-call-contact", {
    activeNav: "chat",
    activeChatId: "sam-taylor",
    filterTab: "all",
  });

  // Beat 1: Hover call icon in chat header
  await tl.at(400);
  tl.showCaption("Hover over the phone icon to start a call.");
  await tl.moveCursorTo("[data-tl=chat-header-call-btn]", { ms: 600 });
  await tl.wait(1500);

  // Beat 2: Click to start audio call
  await tl.at(2700);
  tl.showCaption("Click to start an audio call with Sam Taylor.");
  await tl.click("[data-tl=chat-header-call-btn]");
  tl.setVar("teams:isCallOpen", true);
  await tl.wait(2000);

  // Beat 3: Hover mic and add-person buttons
  await tl.at(5500);
  tl.showCaption(
    "Control your microphone or invite team members during the call."
  );
  await tl.moveCursorTo("[data-tl=call-mic-btn]", { ms: 600 });
  await tl.wait(1200);

  await tl.at(7500);
  await tl.moveCursorTo("[data-tl=call-add-btn]", { ms: 500 });
  await tl.wait(1600);

  // Beat 4: Click the red End Call button
  await tl.at(9800);
  tl.showCaption("Click the red button to end the call.");
  await tl.moveCursorTo("[data-tl=call-end-btn]", { ms: 550 });
  await tl.click("[data-tl=call-end-btn]");
  tl.setVar("teams:isCallOpen", false);
  await tl.wait(2000);

  finishTeams(tl);
}
