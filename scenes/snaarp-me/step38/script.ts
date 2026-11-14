import type { Timeline } from "@/lib/timeline";
import {
  beginMe,
  finishMe,
  pressOn,
} from "@/components/me/me-timeline";
import { ME_URLS } from "@/components/me/me-data";
import { STEP38_DATA } from "./data";

export const STEP38_DURATION_MS = STEP38_DATA.durationMs;

export async function runStep38(tl: Timeline) {
  beginMe(tl, ME_URLS.settingsDeveloper, "settings-developer", [0.45, 0.35], 38);
  tl.setVar("meDevActiveTab", "apikeys");
  tl.setVar("meDevLoading", true);

  // Beat 1: 1.0s Loading Spinner
  await tl.at(200);
  tl.showCaption(STEP38_DATA.captions.loading);
  await tl.wait(1000);
  tl.setVar("meDevLoading", false);

  // Beat 2: Click Create API Key
  await tl.at(1500);
  tl.showCaption(STEP38_DATA.captions.createKey);
  await pressOn(tl, "[data-tl=me-dev-create-key-btn]", { ms: 600 });
  await tl.wait(800);

  // Beat 3: Key Name
  await tl.at(3500);
  tl.showCaption(STEP38_DATA.captions.keyName);
  await pressOn(tl, "[data-tl=me-apikey-name-input]", { ms: 500 });
  await tl.wait(1000);

  // Beat 4: Submit
  await tl.at(6200);
  tl.showCaption(STEP38_DATA.captions.submit);
  await pressOn(tl, "[data-tl=me-apikey-modal-submit]", { ms: 600 });
  await tl.wait(2200);

  // Finish
  await tl.at(12500);
  tl.hideCaption();
  tl.clearHighlight();
  await finishMe(tl, undefined, 1200);
}
