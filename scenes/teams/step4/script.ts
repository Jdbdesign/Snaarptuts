import type { Timeline } from "@/lib/timeline";
import {
  beginTeams,
  finishTeams,
  pushTeamsToast,
} from "@/components/teams/teams-timeline";

export const STEP4_DURATION_MS = 21500;

export async function runStep4(tl: Timeline) {
  beginTeams(tl, "teams-start-meet-chat-list", {
    activeNav: "chat",
    activeChatId: "sam-taylor",
    filterTab: "all",
  });

  // Beat 1: Click video icon at top of chat list
  await tl.at(400);
  tl.showCaption("Click the video icon to start a quick meeting.");
  await tl.moveCursorTo("[data-tl=chat-list-video-btn]", { ms: 600 });
  await tl.click("[data-tl=chat-list-video-btn]");
  tl.setVar("teams:isMeetingDialogOpen", true);
  await tl.wait(1800);

  // Beat 2: Click "Get a link to share"
  await tl.at(3000);
  tl.showCaption("Click Get a link to share to copy the meeting link.");
  await tl.moveCursorTo("[data-tl=dialog-meet-share-btn]", { ms: 550 });
  await tl.click("[data-tl=dialog-meet-share-btn]");
  pushTeamsToast(tl, "Meeting link copied. Valid for 1 hour");
  await tl.wait(2200);

  // Beat 3: Click "Start meeting"
  await tl.at(6000);
  tl.showCaption("Click Start meeting to create your video room.");
  await tl.moveCursorTo("[data-tl=dialog-meet-start-btn]", { ms: 500 });
  await tl.click("[data-tl=dialog-meet-start-btn]");
  tl.setVar("teams:isCreatingMeet", true);
  await tl.wait(700);
  tl.setVar("teams:isCreatingMeet", false);
  tl.setVar("teams:isMeetingDialogOpen", false);
  tl.setVar("teams:isPrejoinOpen", true);
  await tl.wait(2000);

  // Beat 4: Toggle Camera off
  await tl.at(9800);
  tl.showCaption("Turn off your camera before joining.");
  await tl.moveCursorTo("[data-tl=prejoin-cam-btn]", { ms: 600 });
  await tl.click("[data-tl=prejoin-cam-btn]");
  tl.setVar("teams:prejoinCamOff", true);
  await tl.wait(2000);

  // Beat 5: Toggle Microphone off
  await tl.at(13000);
  tl.showCaption("Mute your microphone before entering.");
  await tl.moveCursorTo("[data-tl=prejoin-mic-btn]", { ms: 500 });
  await tl.click("[data-tl=prejoin-mic-btn]");
  tl.setVar("teams:prejoinMicOff", true);
  await tl.wait(2000);

  // Beat 6: Ring "Join now"
  await tl.at(16200);
  tl.showCaption("Click Join now when you are ready to enter the meeting.");
  await tl.moveCursorTo("[data-tl=prejoin-join-btn]", { ms: 600 });
  await tl.wait(2500);

  finishTeams(tl);
}
