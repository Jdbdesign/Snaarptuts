import type { Timeline } from "@/lib/timeline";
import { beginWorkforce, finishWorkforce, hoverOn, pressOn, ring } from "@/components/workforce/workforce-timeline";
import { CAPTIONS, URLS } from "./data";

export const STEP8_DURATION_MS = 15000;

export async function runStep8(tl: Timeline) {
  beginWorkforce(tl, URLS.dashboard, "dashboard");
  tl.setVar("wfMySpaceExpanded", false);
  tl.placeCursorOn("[data-tl=wf-collapse-btn]");

  // 1. Click My Space to expand
  await tl.at(500);
  tl.showCaption(CAPTIONS.expand);
  await pressOn(tl, "[data-tl=nav-my-space]", { ms: 600 });
  tl.setVar("wfMySpaceExpanded", true);
  await tl.wait(250);

  // 2. Select Overview
  await tl.at(3500);
  tl.showCaption(CAPTIONS.overview);
  await pressOn(tl, "[data-tl=subnav-overview]", { ms: 500 });
  tl.setVar("wfPage", "my-space");
  tl.setVar("wfSubpage", "overview");
  tl.setUrl(URLS.mySpace);
  await tl.wait(250);

  // 3. Highlight Profile card
  await tl.at(7500);
  tl.showCaption(CAPTIONS.profileCard);
  await hoverOn(tl, "[data-tl=card-profile]", { ms: 650 });
  await ring(tl, "[data-tl=card-profile]", 2400);

  await tl.at(11000);
  await hoverOn(tl, "[data-tl=link-edit-profile]", { ms: 500 });
  await ring(tl, "[data-tl=link-edit-profile]", 1800);

  // 4. End fade
  await finishWorkforce(tl, 14200, STEP8_DURATION_MS);
}
