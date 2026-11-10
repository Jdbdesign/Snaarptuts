import type { Timeline } from "@/lib/timeline";
import {
  beginMe,
  finishMe,
  pressOn,
  hoverOn,
} from "@/components/me/me-timeline";
import { ME_URLS } from "@/components/me/me-data";
import { STEP29_DATA } from "./data";

export const STEP29_DURATION_MS = STEP29_DATA.durationMs;

export async function runStep29(tl: Timeline) {
  beginMe(tl, ME_URLS.integrationsCalendars, "integrations-calendars", [0.45, 0.35], 29);

  // Beat 1: Intro to Calendar Integrations
  await tl.at(400);
  tl.showCaption(STEP29_DATA.captions.welcome);
  await hoverOn(tl, "[data-tl=me-cal-card-snaarp-meet]", { ms: 600, ring: true });
  await tl.wait(1400);

  // Beat 2: Hover Disconnect on Snaarp Meet
  await tl.at(2600);
  tl.showCaption(STEP29_DATA.captions.connectedMeet);
  await hoverOn(tl, "[data-tl=me-cal-disconnect-snaarp-meet]", { ms: 500, ring: true });
  await tl.wait(1200);

  // Beat 3: External calendars hover
  await tl.at(4600);
  tl.showCaption(STEP29_DATA.captions.connectExternal);
  await hoverOn(tl, "[data-tl=me-cal-connect-google]", { ms: 500, ring: true });
  await tl.wait(1400);

  // Beat 4: Click Back to Integrations
  await tl.at(6800);
  tl.showCaption(STEP29_DATA.captions.backToHub);
  await pressOn(tl, "[data-tl=me-calendar-back-link]", { ms: 600 });
  await tl.wait(1600);

  // Finish
  await tl.at(10200);
  tl.hideCaption();
  tl.clearHighlight();
  await finishMe(tl, undefined, 1500);
}
