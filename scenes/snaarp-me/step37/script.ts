import type { Timeline } from "@/lib/timeline";
import {
  beginMe,
  finishMe,
  pressOn,
  hoverOn,
  typeIntoVar,
} from "@/components/me/me-timeline";
import { ME_URLS } from "@/components/me/me-data";
import { STEP37_DATA } from "./data";

export const STEP37_DURATION_MS = STEP37_DATA.durationMs;

export async function runStep37(tl: Timeline) {
  beginMe(tl, ME_URLS.settingsSso, "settings-sso", [0.45, 0.35], 37);

  // Beat 1: Overview
  await tl.at(200);
  tl.showCaption(STEP37_DATA.captions.overview);
  await hoverOn(tl, "[data-tl=me-sso-status-card]", { ms: 600, ring: true });
  await tl.wait(1400);

  // Beat 2: Entity ID
  await tl.at(2600);
  tl.showCaption(STEP37_DATA.captions.entityId);
  await pressOn(tl, "[data-tl=me-sso-entity-id]", { ms: 600 });
  await typeIntoVar(tl, "[data-tl=me-sso-entity-id]", "meSsoEntityId", "https://idp.example.com/entity", { msPerChar: 30 });
  await tl.wait(800);

  // Beat 3: SSO URL
  await tl.at(5800);
  tl.showCaption(STEP37_DATA.captions.ssoUrl);
  await pressOn(tl, "[data-tl=me-sso-url]", { ms: 600 });
  await typeIntoVar(tl, "[data-tl=me-sso-url]", "meSsoUrl", "https://idp.example.com/sso/saml", { msPerChar: 30 });
  await tl.wait(800);

  // Beat 4: Certificate
  await tl.at(9200);
  tl.showCaption(STEP37_DATA.captions.cert);
  await pressOn(tl, "[data-tl=me-sso-cert]", { ms: 600 });
  await typeIntoVar(
    tl,
    "[data-tl=me-sso-cert]",
    "meSsoCert",
    "-----BEGIN CERTIFICATE-----\nMIIDdTCCAl2gAwIBAgIJAP\n-----END CERTIFICATE-----",
    { msPerChar: 20 }
  );
  await tl.wait(800);

  // Beat 5: Domain
  await tl.at(12600);
  tl.showCaption(STEP37_DATA.captions.domain);
  await pressOn(tl, "[data-tl=me-sso-domain]", { ms: 600 });
  await typeIntoVar(tl, "[data-tl=me-sso-domain]", "meSsoDomain", "example.com", { msPerChar: 35 });
  await tl.wait(1000);

  // Beat 6: Save Configuration
  await tl.at(15800);
  tl.showCaption(STEP37_DATA.captions.saveConfig);
  await pressOn(tl, "[data-tl=me-sso-save-btn]", { ms: 600 });
  await tl.wait(2000);

  // Finish
  await tl.at(19000);
  tl.hideCaption();
  tl.clearHighlight();
  await finishMe(tl, undefined, 1000);
}
