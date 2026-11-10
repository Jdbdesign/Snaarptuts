import type { Timeline } from "@/lib/timeline";
import {
  beginMe,
  finishMe,
  pressOn,
  hoverOn,
} from "@/components/me/me-timeline";
import { ME_URLS } from "@/components/me/me-data";
import { STEP30_DATA } from "./data";

export const STEP30_DURATION_MS = STEP30_DATA.durationMs;

export async function runStep30(tl: Timeline) {
  beginMe(tl, ME_URLS.integrationsVideo, "integrations-video", [0.45, 0.35], 30);

  // Beat 1: Intro
  await tl.at(400);
  tl.showCaption(STEP30_DATA.captions.welcome);
  await hoverOn(tl, "[data-tl=me-video-card-snaarp-meet]", { ms: 600, ring: true });
  await tl.wait(1400);

  // Beat 2: Snaarp Meet Account Details
  await tl.at(2600);
  tl.showCaption(STEP30_DATA.captions.snaarpMeet);
  await hoverOn(tl, "[data-tl=me-video-disconnect-snaarp-meet]", { ms: 500, ring: true });
  await tl.wait(1400);

  // Beat 3: Hover Zoom Connect
  await tl.at(4800);
  tl.showCaption(STEP30_DATA.captions.zoomMeet);
  await hoverOn(tl, "[data-tl=me-video-connect-zoom]", { ms: 500, ring: true });
  await tl.wait(1400);

  // Beat 4: Click Back to Integrations
  await tl.at(7000);
  tl.showCaption(STEP30_DATA.captions.backToHub);
  await pressOn(tl, "[data-tl=me-video-back-link]", { ms: 600 });
  await tl.wait(1600);

  // Finish
  await tl.at(10200);
  tl.hideCaption();
  tl.clearHighlight();
  await finishMe(tl, undefined, 1500);
}
