import type { Timeline } from "@/lib/timeline";
import {
  beginZeus,
  finishZeus,
  hoverOn,
  pressOn,
  typeIntoVar,
} from "@/components/zeus/zeus-timeline";
import { ZEUS_URLS } from "@/components/zeus/zeus-data";

export const STEP16_DURATION_MS = 13000;

export async function runStep16(tl: Timeline) {
  beginZeus(tl, ZEUS_URLS.integrations, "integrations", [0.45, 0.35], 16);

  // Beat 1: Click Create Key
  await tl.at(400);
  tl.showCaption("Click Create Key to generate an API key for your CRM.");
  await pressOn(tl, "[data-tl=btn-create-api-key]", { ms: 600 });
  await tl.wait(800);

  // Beat 2: Type key name
  await tl.at(2500);
  tl.showCaption("Name your key Zeus Production.");
  await pressOn(tl, "[data-tl=input-api-key-name]", { ms: 600 });
  await typeIntoVar(
    tl,
    "[data-tl=input-api-key-name]",
    "zeusNewApiKeyName",
    "Zeus Production",
    { msPerChar: 45 }
  );
  await tl.wait(600);

  // Beat 3: Confirm Create
  await tl.at(5500);
  tl.showCaption("Click Create to generate the key.");
  await pressOn(tl, "[data-tl=btn-confirm-create-api-key]", { ms: 600 });
  await tl.wait(1400);

  // Beat 4: Setup guide
  await tl.at(8400);
  tl.showCaption("Follow the setup guide below to authenticate your applications.");
  await hoverOn(tl, "[data-tl=zeus-setup-guide]", { ms: 600 });
  await tl.wait(1600);

  // Finish
  await tl.at(11800);
  tl.hideCaption();
  tl.clearHighlight();
  await finishZeus(tl);
}
