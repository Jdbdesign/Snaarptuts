import type { Timeline } from "@/lib/timeline";
import {
  beginMe,
  finishMe,
  pressOn,
  typeIntoVar,
} from "@/components/me/me-timeline";
import { ME_URLS } from "@/components/me/me-data";
import { STEP40_DATA } from "./data";

export const STEP40_DURATION_MS = STEP40_DATA.durationMs;

export async function runStep40(tl: Timeline) {
  beginMe(tl, ME_URLS.settingsDeveloper, "settings-developer", [0.45, 0.35], 40);

  // Beat 1: Switch to Embed Code tab
  await tl.at(200);
  tl.showCaption(STEP40_DATA.captions.tabEmbed);
  await pressOn(tl, "[data-tl=me-dev-tab-embed]", { ms: 600 });
  await tl.wait(1000);

  // Beat 2: Event Type
  await tl.at(2600);
  tl.showCaption(STEP40_DATA.captions.eventType);
  await pressOn(tl, "[data-tl=me-dev-embed-event-type]", { ms: 600 });
  tl.setVar("meEmbedEventType", "Standup Meeting with developers");
  await tl.wait(1200);

  // Beat 3: Container Selector
  await tl.at(5400);
  tl.showCaption(STEP40_DATA.captions.selector);
  await pressOn(tl, "[data-tl=me-dev-embed-selector]", { ms: 600 });
  await typeIntoVar(
    tl,
    "[data-tl=me-dev-embed-selector]",
    "meEmbedSelector",
    "#snaarp-me-embed",
    { msPerChar: 40 }
  );
  await tl.wait(1200);

  // Beat 4: Copy button
  await tl.at(9800);
  tl.showCaption(STEP40_DATA.captions.copy);
  await pressOn(tl, "[data-tl=me-dev-embed-copy-btn]", { ms: 600 });
  await tl.wait(2000);

  // Beat 5: Calm finish hold before completion card
  await tl.at(14000);
  tl.hideCaption();
  tl.clearHighlight();
  await finishMe(tl, undefined, 1500);
}
