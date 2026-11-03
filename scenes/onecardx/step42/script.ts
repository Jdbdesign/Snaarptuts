import type { Timeline } from "@/lib/timeline";
import {
  beginOneCardX,
  finishOneCardX,
  hoverOn,
  pressOn,
  ring,
} from "@/components/onecardx/onecardx-timeline";
import { CAPTIONS, URLS } from "./data";

export const STEP42_DURATION_MS = 6500;

export async function runStep42(tl: Timeline) {
  beginOneCardX(tl, URLS.backgrounds, "backgrounds", [0.12, 0.35]);

  // 1. Click Email Signatures in sidebar
  await tl.at(600);
  tl.showCaption(CAPTIONS.clickEmailSignatures);
  await hoverOn(tl, "[data-tl=nav-email-signatures]", { ms: 600 });
  await pressOn(tl, "[data-tl=nav-email-signatures]", { ms: 300 });
  tl.setUrl(URLS.emailSignatures);
  tl.setVar("ocxPage", "emailSignatures");
  await tl.wait(150);

  // 2. Explore signature preview
  await tl.at(2400);
  tl.showCaption(CAPTIONS.exploreEmailSignatures);
  await hoverOn(tl, "[data-tl=signature-preview-card]", { ms: 600 });
  await ring(tl, "[data-tl=signature-preview-card]", 1500);

  // 3. Highlight options pane
  await tl.at(4400);
  await hoverOn(tl, "[data-tl=sig-styles-grid]", { ms: 600 });
  await ring(tl, "[data-tl=sig-styles-grid]", 1400);

  // 4. Finish
  await finishOneCardX(tl, STEP42_DURATION_MS);
}
