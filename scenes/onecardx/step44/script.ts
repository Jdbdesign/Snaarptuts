import type { Timeline } from "@/lib/timeline";
import {
  beginOneCardX,
  finishOneCardX,
  hoverOn,
  pressOn,
  ring,
} from "@/components/onecardx/onecardx-timeline";
import { CAPTIONS, URLS } from "./data";

export const STEP44_DURATION_MS = 8000;

export async function runStep44(tl: Timeline) {
  beginOneCardX(tl, URLS.emailSignatures, "emailSignatures", [0.65, 0.22]);
  tl.setVar("ocxSigCard", "business");
  tl.setVar("ocxSigStyle", 0);

  // 1. Click style 1
  await tl.at(600);
  tl.showCaption(CAPTIONS.tryStyles);
  await hoverOn(tl, "[data-tl=sig-style-tile-1]", { ms: 600 });
  await pressOn(tl, "[data-tl=sig-style-tile-1]", { ms: 300 });
  tl.setVar("ocxSigStyle", 1);
  await tl.wait(150);

  // 2. Click style 3
  await tl.at(2400);
  await hoverOn(tl, "[data-tl=sig-style-tile-3]", { ms: 500 });
  await pressOn(tl, "[data-tl=sig-style-tile-3]", { ms: 300 });
  tl.setVar("ocxSigStyle", 3);
  await tl.wait(150);

  // 3. Select style 2 (photo + QR + SAVE CONTACT)
  await tl.at(4200);
  tl.showCaption(CAPTIONS.selectQrStyle);
  await hoverOn(tl, "[data-tl=sig-style-tile-2]", { ms: 600 });
  await pressOn(tl, "[data-tl=sig-style-tile-2]", { ms: 300 });
  tl.setVar("ocxSigStyle", 2);
  await tl.wait(150);

  // 4. Highlight preview
  await tl.at(5800);
  tl.showCaption(CAPTIONS.previewConfirmed);
  await hoverOn(tl, "[data-tl=signature-preview-card]", { ms: 600 });
  await ring(tl, "[data-tl=signature-preview-card]", 1500);

  // 5. Finish
  await finishOneCardX(tl, STEP44_DURATION_MS);
}
