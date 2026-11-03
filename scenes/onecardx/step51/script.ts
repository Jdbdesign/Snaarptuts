import type { Timeline } from "@/lib/timeline";
import {
  beginOneCardX,
  finishOneCardX,
  hoverOn,
  pressOn,
  ring,
} from "@/components/onecardx/onecardx-timeline";
import { CAPTIONS, URLS } from "./data";

export const STEP51_DURATION_MS = 7000;

export async function runStep51(tl: Timeline) {
  beginOneCardX(tl, URLS.mailSettings, "mail", [0.55, 0.35]);
  tl.setVar("ocxMailSubpage", "settings");
  tl.setVar("ocxMailSettingsTab", "signature");
  tl.setVar("ocxMailSigPasted", true);
  tl.setVar("ocxMailSigSaved", false);

  // 1. Click Save Signature
  await tl.at(600);
  tl.showCaption(CAPTIONS.clickSaveSignature);
  await hoverOn(tl, "[data-tl=btn-save-signature]", { ms: 600 });
  await pressOn(tl, "[data-tl=btn-save-signature]", { ms: 300 });
  tl.setVar("ocxMailSigSaved", true);
  await tl.wait(150);

  // 2. Highlight Toast
  await tl.at(2400);
  tl.showCaption(CAPTIONS.signatureSaved);
  await hoverOn(tl, "[data-tl=toast-signature-saved]", { ms: 600 });
  await ring(tl, "[data-tl=toast-signature-saved]", 1800);

  // 3. Finish
  await finishOneCardX(tl, STEP51_DURATION_MS);
}
