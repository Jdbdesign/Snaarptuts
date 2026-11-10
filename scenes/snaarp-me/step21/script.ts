import type { Timeline } from "@/lib/timeline";
import {
  beginMe,
  finishMe,
  pressOn,
  hoverOn,
} from "@/components/me/me-timeline";
import { ME_URLS } from "@/components/me/me-data";
import { STEP21_DATA } from "./data";

export const STEP21_DURATION_MS = STEP21_DATA.durationMs;

export async function runStep21(tl: Timeline) {
  beginMe(tl, ME_URLS.contacts, "contacts", [0.45, 0.35], 21);
  tl.setVar("meContactsTab", "my-contacts");

  // Beat 1: Intro
  await tl.at(400);
  tl.showCaption(STEP21_DATA.captions.intro);
  await hoverOn(tl, "[data-tl=me-contacts-view]", { ms: 600, ring: false });
  await tl.wait(1800);

  // Beat 2: My Contacts empty state
  await tl.at(3000);
  tl.showCaption(STEP21_DATA.captions.emptyNotice);
  await hoverOn(tl, "[data-tl=me-contacts-empty]", { ms: 600, ring: true });
  await tl.wait(1600);

  // Beat 3: Organization tab
  await tl.at(5600);
  tl.showCaption(STEP21_DATA.captions.orgTab);
  await pressOn(tl, "[data-tl=me-contacts-tab-org]", { ms: 600 });
  await tl.wait(2000);

  // Beat 4: Invitees tab
  await tl.at(8400);
  tl.showCaption(STEP21_DATA.captions.inviteesTab);
  await pressOn(tl, "[data-tl=me-contacts-tab-invitees]", { ms: 600 });
  await tl.wait(1800);

  // Finish
  await tl.at(10800);
  tl.hideCaption();
  tl.clearHighlight();
  await finishMe(tl);
}
