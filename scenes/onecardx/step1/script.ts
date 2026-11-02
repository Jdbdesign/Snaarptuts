import type { Timeline } from "@/lib/timeline";
import {
  beginOneCardX,
  finishOneCardX,
  hoverOn,
  ring,
} from "@/components/onecardx/onecardx-timeline";
import { CAPTIONS, URLS } from "./data";

export const STEP1_DURATION_MS = 11000;

export async function runStep1(tl: Timeline) {
  beginOneCardX(tl, URLS.home, "home", [0.48, 0.35]);

  // 1. Welcome Header
  await tl.at(600);
  tl.showCaption(CAPTIONS.welcome);
  await hoverOn(tl, "[data-tl=home-welcome-title]", { ms: 650 });
  await ring(tl, "[data-tl=home-welcome-title]", 2200);

  // 2. Quick Actions
  await tl.at(4000);
  tl.showCaption(CAPTIONS.quickActions);
  await hoverOn(tl, "[data-tl=quick-action-org-card]", { ms: 600 });
  await ring(tl, "[data-tl=quick-action-org-card]", 1500);
  await hoverOn(tl, "[data-tl=quick-action-invite]", { ms: 600 });
  await ring(tl, "[data-tl=quick-action-invite]", 1500);

  // 3. Getting Started
  await tl.at(7800);
  tl.showCaption(CAPTIONS.gettingStarted);
  await hoverOn(tl, "[data-tl=getting-started-card]", { ms: 650 });
  await ring(tl, "[data-tl=getting-started-card]", 2000);

  // 4. Conclude
  await finishOneCardX(tl, STEP1_DURATION_MS);
}
