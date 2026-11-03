import type { Timeline } from "@/lib/timeline";
import {
  beginOneCardX,
  finishOneCardX,
  hoverOn,
  pressOn,
  ring,
} from "@/components/onecardx/onecardx-timeline";
import { CAPTIONS, URLS } from "./data";

export const STEP46_DURATION_MS = 7500;

export async function runStep46(tl: Timeline) {
  beginOneCardX(tl, URLS.emailSignatures, "emailSignatures", [0.72, 0.45]);
  tl.setVar("ocxSigCard", "business");
  tl.setVar("ocxSigStyle", 2);
  tl.setVar("ocxSigApp", "Gmail");
  tl.setVar("ocxSigOs", "Web");
  tl.setVar("ocxSigCopied", false);

  // 1. Review instructions
  await tl.at(600);
  tl.showCaption(CAPTIONS.reviewInstructions);
  await hoverOn(tl, "[data-tl=sig-apply-instructions]", { ms: 600 });
  await ring(tl, "[data-tl=sig-apply-instructions]", 1600);

  // 2. Click Copy
  await tl.at(2800);
  tl.showCaption(CAPTIONS.clickCopy);
  await hoverOn(tl, "[data-tl=btn-copy-signature]", { ms: 600 });
  await pressOn(tl, "[data-tl=btn-copy-signature]", { ms: 300 });
  tl.setVar("ocxSigCopied", true);
  await tl.wait(150);

  // 3. Highlight Copied state
  await tl.at(4800);
  tl.showCaption(CAPTIONS.signatureCopied);
  await hoverOn(tl, "[data-tl=btn-copied-signature]", { ms: 500 });
  await ring(tl, "[data-tl=btn-copied-signature]", 1500);

  // 4. Finish
  await finishOneCardX(tl, STEP46_DURATION_MS);
}
