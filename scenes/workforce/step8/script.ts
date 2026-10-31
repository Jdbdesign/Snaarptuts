import type { Timeline } from "@/lib/timeline";
import { beginWorkforce } from "@/components/workforce/workforce-timeline";
import { CAPTIONS, URLS } from "./data";

export const STEP8_DURATION_MS = 15000;

export async function runStep8(tl: Timeline) {
  beginWorkforce(tl, URLS.dashboard, "dashboard");
  tl.setVar("wfMySpaceExpanded", false);

  // 1. Click My Space to expand
  await tl.at(500);
  tl.showCaption(CAPTIONS.expand);
  await tl.moveCursorTo("[data-tl=nav-my-space]", { ms: 600 });
  await tl.click("[data-tl=nav-my-space]");
  tl.setVar("wfMySpaceExpanded", true);

  // 2. Open Overview
  await tl.at(3500);
  tl.showCaption(CAPTIONS.overview);
  await tl.moveCursorTo("[data-tl=subnav-overview]", { ms: 500 });
  await tl.click("[data-tl=subnav-overview]");
  tl.setVar("wfPage", "my-space");
  tl.setVar("wfSubpage", "overview");
  tl.setUrl(URLS.mySpace);

  // 3. Highlight Profile card
  await tl.at(7500);
  tl.showCaption(CAPTIONS.profileCard);
  await tl.moveCursorTo("[data-tl=card-profile]", { ms: 700 });
  tl.highlight("[data-tl=card-profile]");

  await tl.at(11000);
  await tl.moveCursorTo("[data-tl=link-edit-profile]", { ms: 600 });

  await tl.at(14000);
  tl.clearHighlight();
  tl.hideCaption();
  await tl.at(STEP8_DURATION_MS);
}
