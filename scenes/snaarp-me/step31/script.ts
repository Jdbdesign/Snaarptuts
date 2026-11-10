import type { Timeline } from "@/lib/timeline";
import {
  beginMe,
  finishMe,
  pressOn,
  hoverOn,
} from "@/components/me/me-timeline";
import { ME_URLS } from "@/components/me/me-data";
import { STEP31_DATA } from "./data";

export const STEP31_DURATION_MS = STEP31_DATA.durationMs;

export async function runStep31(tl: Timeline) {
  beginMe(tl, ME_URLS.integrationsPayments, "integrations-payments", [0.45, 0.35], 31);

  // Beat 1: Intro to Payments
  await tl.at(400);
  tl.showCaption(STEP31_DATA.captions.welcome);
  await hoverOn(tl, "[data-tl=me-pay-card-stripe]", { ms: 600, ring: true });
  await tl.wait(1400);

  // Beat 2: Hover Payment Providers
  await tl.at(2600);
  tl.showCaption(STEP31_DATA.captions.providers);
  await hoverOn(tl, "[data-tl=me-pay-card-paypal]", { ms: 500, ring: true });
  await tl.wait(1400);

  // Beat 3: Toggle On Require Payment
  await tl.at(4800);
  tl.showCaption(STEP31_DATA.captions.toggleOn);
  await pressOn(tl, "[data-tl=me-pay-toggle-creative]", { ms: 600 });
  await tl.wait(1600);

  // Beat 4: Toggle Off Require Payment
  await tl.at(7400);
  tl.showCaption(STEP31_DATA.captions.toggleOff);
  await pressOn(tl, "[data-tl=me-pay-toggle-creative]", { ms: 500 });
  await tl.wait(1400);

  // Beat 5: Click Back to Integrations
  await tl.at(10200);
  tl.showCaption(STEP31_DATA.captions.backToHub);
  await pressOn(tl, "[data-tl=me-payments-back-link]", { ms: 600 });
  await tl.wait(1600);

  // Finish
  await tl.at(13600);
  tl.hideCaption();
  tl.clearHighlight();
  await finishMe(tl, undefined, 1500);
}
