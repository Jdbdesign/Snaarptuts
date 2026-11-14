import type { Timeline } from "@/lib/timeline";
import {
  beginMe,
  finishMe,
  pressOn,
} from "@/components/me/me-timeline";
import { ME_URLS } from "@/components/me/me-data";
import { STEP39_DATA } from "./data";

export const STEP39_DURATION_MS = STEP39_DATA.durationMs;

export async function runStep39(tl: Timeline) {
  beginMe(tl, ME_URLS.settingsDeveloper, "settings-developer", [0.45, 0.35], 39);

  // Beat 1: Switch to Webhooks
  await tl.at(200);
  tl.showCaption(STEP39_DATA.captions.tabWebhooks);
  await pressOn(tl, "[data-tl=me-dev-tab-webhooks]", { ms: 600 });
  await tl.wait(1000);

  // Beat 2: Click Add Webhook
  await tl.at(2400);
  tl.showCaption(STEP39_DATA.captions.addWebhook);
  await pressOn(tl, "[data-tl=me-dev-add-webhook-btn]", { ms: 600 });
  await tl.wait(1000);

  // Beat 3: Submit Webhook
  await tl.at(4800);
  tl.showCaption(STEP39_DATA.captions.submitWebhook);
  await pressOn(tl, "[data-tl=me-webhook-modal-submit]", { ms: 600 });
  await tl.wait(1600);

  // Beat 4: Switch to OAuth Apps
  await tl.at(7600);
  tl.showCaption(STEP39_DATA.captions.tabOauth);
  await pressOn(tl, "[data-tl=me-dev-tab-oauth]", { ms: 600 });
  await tl.wait(1000);

  // Beat 5: Click Register App
  await tl.at(9800);
  tl.showCaption(STEP39_DATA.captions.registerApp);
  await pressOn(tl, "[data-tl=me-dev-register-app-btn]", { ms: 600 });
  await tl.wait(1000);

  // Beat 6: Submit OAuth
  await tl.at(12200);
  tl.showCaption(STEP39_DATA.captions.submitOauth);
  await pressOn(tl, "[data-tl=me-oauth-modal-submit]", { ms: 600 });
  await tl.wait(2200);

  // Finish
  await tl.at(16500);
  tl.hideCaption();
  tl.clearHighlight();
  await finishMe(tl, undefined, 1200);
}
