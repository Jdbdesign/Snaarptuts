import type { Timeline } from "@/lib/timeline";
import {
  beginOneCardX,
  finishOneCardX,
  hoverOn,
  pressOn,
  ring,
} from "@/components/onecardx/onecardx-timeline";
import { CAPTIONS, URLS } from "./data";

export const STEP49_DURATION_MS = 7500;

export async function runStep49(tl: Timeline) {
  beginOneCardX(tl, URLS.mailSettings, "mail", [0.15, 0.42]);
  tl.setVar("ocxMailSubpage", "settings");
  tl.setVar("ocxMailSettingsTab", "profile");
  tl.setVar("ocxMailSigPasted", false);
  tl.setVar("ocxMailSigSaved", false);

  // 1. Click Signature in Appearance
  await tl.at(600);
  tl.showCaption(CAPTIONS.clickSignatureTab);
  await hoverOn(tl, "[data-tl=btn-settings-signature]", { ms: 600 });
  await pressOn(tl, "[data-tl=btn-settings-signature]", { ms: 300 });
  tl.setVar("ocxMailSettingsTab", "signature");
  await tl.wait(150);

  // 2. Explore Signature Editor
  await tl.at(2400);
  tl.showCaption(CAPTIONS.signatureEditorReady);
  await hoverOn(tl, "[data-tl=input-signature-editor]", { ms: 600 });
  await ring(tl, "[data-tl=input-signature-editor]", 1600);

  // 3. Highlight Preview section
  await tl.at(4800);
  await hoverOn(tl, "[data-tl=signature-preview-box]", { ms: 600 });
  await ring(tl, "[data-tl=signature-preview-box]", 1600);

  // 4. Finish
  await finishOneCardX(tl, STEP49_DURATION_MS);
}
