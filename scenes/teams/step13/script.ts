import type { Timeline } from "@/lib/timeline";
import { beginTeams, finishTeams } from "@/components/teams/teams-timeline";

export const STEP13_DURATION_MS = 14500;

export async function runStep13(tl: Timeline) {
  beginTeams(tl, "teams-join-with-id", {
    activeNav: "meet",
    meetTab: "links",
  });

  // Beat 1: Click Join with a meeting ID
  await tl.at(400);
  tl.showCaption(
    "Click Join with a meeting ID to enter an existing room."
  );
  await tl.moveCursorTo("[data-tl=meet-join-id-btn]", { ms: 600 });
  await tl.click("[data-tl=meet-join-id-btn]");
  tl.setVar("teams:isJoinIdDialogOpen", true);
  await tl.wait(1800);

  // Beat 2: Type meeting code into input box
  await tl.at(3000);
  tl.showCaption("Enter the meeting ID or full room link.");
  await tl.moveCursorTo("[data-tl=join-id-input]", { ms: 450 });
  await tl.click("[data-tl=join-id-input]");
  await tl.typeText("[data-tl=join-id-input]", "etz-pips-nmk", { msPerChar: 50 });
  tl.setVar("teams:joinIdQuery", "etz-pips-nmk");
  await tl.wait(1800);

  // Beat 3: Click Join meeting button
  await tl.at(6200);
  tl.showCaption("Click Join meeting to launch the pre-join room.");
  await tl.moveCursorTo("[data-tl=join-id-submit-btn]", { ms: 500 });
  await tl.click("[data-tl=join-id-submit-btn]");
  tl.setVar("teams:isJoinIdDialogOpen", false);
  tl.setVar("teams:isPrejoinOpen", true);
  await tl.wait(2500);

  finishTeams(tl);
}
