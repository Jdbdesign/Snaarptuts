import type { Timeline } from "@/lib/timeline";
import {
  beginMe,
  finishMe,
  pressOn,
  typeIntoVar,
} from "@/components/me/me-timeline";
import { ME_URLS } from "@/components/me/me-data";
import { STEP35_DATA } from "./data";

export const STEP35_DURATION_MS = STEP35_DATA.durationMs;

export async function runStep35(tl: Timeline) {
  beginMe(tl, ME_URLS.settingsTeam, "settings-team", [0.45, 0.35], 35);

  // Beat 1: Type email
  await tl.at(200);
  tl.showCaption(STEP35_DATA.captions.email);
  await pressOn(tl, "[data-tl=me-team-invite-email]", { ms: 600 });
  await typeIntoVar(tl, "[data-tl=me-team-invite-email]", "meTeamInviteEmail", "design@example.com", { msPerChar: 35 });
  await tl.wait(800);

  // Beat 2: Select role
  await tl.at(3800);
  tl.showCaption(STEP35_DATA.captions.role);
  await pressOn(tl, "[data-tl=me-team-invite-role]", { ms: 600 });
  await tl.wait(300);
  await pressOn(tl, "[data-tl=me-team-role-opt-member]", { ms: 500 });
  await tl.wait(1000);

  // Beat 3: Send Invite
  await tl.at(6600);
  tl.showCaption(STEP35_DATA.captions.sendInvite);
  await pressOn(tl, "[data-tl=me-team-send-invite-btn]", { ms: 600 });
  await tl.wait(1800);

  // Beat 4: Resend Invite
  await tl.at(9800);
  tl.showCaption(STEP35_DATA.captions.resendInvite);
  await pressOn(tl, "[data-tl=me-team-resend-invite]", { ms: 600 });
  await tl.wait(1800);

  // Beat 5: Cancel Invite
  await tl.at(13200);
  tl.showCaption(STEP35_DATA.captions.cancelInvite);
  await pressOn(tl, "[data-tl=me-team-cancel-invite]", { ms: 600 });
  await tl.wait(2000);

  // Finish
  await tl.at(16800);
  tl.hideCaption();
  tl.clearHighlight();
  await finishMe(tl, undefined, 1200);
}
