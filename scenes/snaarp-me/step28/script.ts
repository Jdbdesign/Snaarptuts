import type { Timeline } from "@/lib/timeline";
import {
  beginMe,
  finishMe,
  pressOn,
  hoverOn,
} from "@/components/me/me-timeline";
import { ME_URLS } from "@/components/me/me-data";
import { STEP28_DATA } from "./data";

export const STEP28_DURATION_MS = STEP28_DATA.durationMs;

export async function runStep28(tl: Timeline) {
  beginMe(tl, ME_URLS.integrations, "integrations", [0.45, 0.35], 28);

  // Beat 1: Explore Hub
  await tl.at(400);
  tl.showCaption(STEP28_DATA.captions.hub);
  await hoverOn(tl, "[data-tl=me-integrations-grid]", { ms: 600, ring: true });
  await tl.wait(1400);

  // Beat 2: Explore Categories
  await tl.at(2600);
  tl.showCaption(STEP28_DATA.captions.exploreHub);
  await hoverOn(tl, "[data-tl=me-integrations-card-video]", { ms: 500, ring: true });
  await tl.wait(1400);

  // Beat 3: Click Calendars
  await tl.at(4800);
  tl.showCaption(STEP28_DATA.captions.openCalendars);
  await pressOn(tl, "[data-tl=me-integrations-card-calendars]", { ms: 600 });
  await tl.wait(1600);

  // Finish
  await tl.at(8400);
  tl.hideCaption();
  tl.clearHighlight();
  await finishMe(tl, undefined, 1500);
}
