import type { Timeline } from "@/lib/timeline";
import {
  beginOneCardX,
  finishOneCardX,
  hoverOn,
  pressOn,
  ring,
} from "@/components/onecardx/onecardx-timeline";
import { CAPTIONS, URLS } from "./data";

export const STEP50_DURATION_MS = 7500;

export async function runStep50(tl: Timeline) {
  beginOneCardX(tl, URLS.mailSettings, "mail", [0.45, 0.42]);
  tl.setVar("ocxMailSubpage", "settings");
  tl.setVar("ocxMailSettingsTab", "signature");
  tl.setVar("ocxMailSigPasted", false);
  tl.setVar("ocxMailSigSaved", false);

  // 1. Click editor to paste
  await tl.at(600);
  tl.showCaption(CAPTIONS.clickToPaste);
  await hoverOn(tl, "[data-tl=input-signature-editor]", { ms: 600 });
  await pressOn(tl, "[data-tl=input-signature-editor]", { ms: 300 });
  tl.setVar("ocxMailSigPasted", true);
  await tl.wait(150);

  // 2. Highlight pasted signature
  await tl.at(2400);
  tl.showCaption(CAPTIONS.signaturePasted);
  await ring(tl, "[data-tl=input-signature-editor]", 1600);

  // 3. Highlight preview box
  await tl.at(4800);
  await hoverOn(tl, "[data-tl=signature-preview-box]", { ms: 600 });
  await ring(tl, "[data-tl=signature-preview-box]", 1600);

  // 4. Finish
  await finishOneCardX(tl, STEP50_DURATION_MS);
}
