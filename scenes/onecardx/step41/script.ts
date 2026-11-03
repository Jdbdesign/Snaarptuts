import type { Timeline } from "@/lib/timeline";
import {
  beginOneCardX,
  finishOneCardX,
  hoverOn,
  pressOn,
  ring,
} from "@/components/onecardx/onecardx-timeline";
import { CAPTIONS, URLS } from "./data";

export const STEP41_DURATION_MS = 7500;

export async function runStep41(tl: Timeline) {
  beginOneCardX(tl, URLS.backgrounds, "backgrounds", [0.72, 0.44]);
  tl.setVar("ocxBgLayout", "bottom-right");
  tl.setVar("ocxSelectedBg", "beach-waves");
  tl.setVar("ocxShowCompany", false);
  tl.setVar("ocxUploadedBg", false);

  // 1. Click Upload
  await tl.at(600);
  tl.showCaption(CAPTIONS.clickUpload);
  await hoverOn(tl, "[data-tl=btn-upload-background]", { ms: 600 });
  await pressOn(tl, "[data-tl=btn-upload-background]", { ms: 300 });
  tl.setVar("ocxUploadedBg", true);
  tl.setVar("ocxSelectedBg", "uploaded");

  // 2. Highlight custom background preview
  await tl.at(2600);
  tl.showCaption(CAPTIONS.uploadedPreview);
  await hoverOn(tl, "[data-tl=bg-preview-card]", { ms: 600 });
  await ring(tl, "[data-tl=bg-preview-card]", 1600);

  // 3. Highlight Download button
  await tl.at(4800);
  tl.showCaption(CAPTIONS.downloadReady);
  await hoverOn(tl, "[data-tl=btn-download-bg]", { ms: 600 });
  await ring(tl, "[data-tl=btn-download-bg]", 1500);

  // 4. Conclude
  await finishOneCardX(tl, STEP41_DURATION_MS);
}
