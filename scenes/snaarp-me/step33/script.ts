import type { Timeline } from "@/lib/timeline";
import {
  beginMe,
  finishMe,
  hoverOn,
} from "@/components/me/me-timeline";
import { ME_URLS } from "@/components/me/me-data";
import { STEP33_DATA } from "./data";

export const STEP33_DURATION_MS = STEP33_DATA.durationMs;

export async function runStep33(tl: Timeline) {
  beginMe(tl, ME_URLS.settings, "settings", [0.45, 0.35], 33);

  // Beat 1: Overview
  await tl.at(200);
  tl.showCaption(STEP33_DATA.captions.overview);
  await hoverOn(tl, "[data-tl=me-settings-card-profile]", { ms: 600, ring: true });
  await tl.wait(1800);

  // Beat 2: Team & Branding
  await tl.at(2800);
  tl.showCaption(STEP33_DATA.captions.team);
  await hoverOn(tl, "[data-tl=me-settings-card-team]", { ms: 600, ring: true });
  await tl.wait(1600);

  await tl.at(5200);
  tl.showCaption(STEP33_DATA.captions.branding);
  await hoverOn(tl, "[data-tl=me-settings-card-branding]", { ms: 600, ring: true });
  await tl.wait(1600);

  // Beat 3: Security & SSO
  await tl.at(7600);
  tl.showCaption(STEP33_DATA.captions.security);
  await hoverOn(tl, "[data-tl=me-settings-card-security]", { ms: 600, ring: true });
  await tl.wait(1600);

  await tl.at(10000);
  tl.showCaption(STEP33_DATA.captions.sso);
  await hoverOn(tl, "[data-tl=me-settings-card-sso]", { ms: 600, ring: true });
  await tl.wait(1600);

  // Beat 4: Developer
  await tl.at(12000);
  tl.showCaption(STEP33_DATA.captions.developer);
  await hoverOn(tl, "[data-tl=me-settings-card-developer]", { ms: 600, ring: true });
  await tl.wait(1400);

  // Finish
  await tl.at(13500);
  tl.hideCaption();
  tl.clearHighlight();
  await finishMe(tl, undefined, 1000);
}
