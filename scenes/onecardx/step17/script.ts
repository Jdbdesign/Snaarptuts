import type { Timeline } from "@/lib/timeline";
import {
  beginOneCardX,
  finishOneCardX,
  hoverOn,
  pressOn,
  ring,
} from "@/components/onecardx/onecardx-timeline";
import { CAPTIONS, URLS } from "./data";

export const STEP17_DURATION_MS = 10500;

export async function runStep17(tl: Timeline) {
  beginOneCardX(tl, URLS.cardDetail, "cardDetail", [0.30, 0.30]);
  tl.setVar("ocxPublicPreviewOpen", false);

  // 1. Click QR code to open public preview
  await tl.at(500);
  tl.showCaption(CAPTIONS.clickPreview);
  await pressOn(tl, "[data-tl=card-qr-preview]", { ms: 600 });
  tl.setVar("ocxPublicPreviewOpen", true);
  tl.setUrl(URLS.publicPreview);
  await tl.wait(400);

  // 2. Review the public card view
  await tl.at(2800);
  tl.showCaption(CAPTIONS.inspectPublicCard);
  await hoverOn(tl, "[data-tl=public-card-card]", { ms: 600 });
  await ring(tl, "[data-tl=public-card-card]", 2000);

  // 3. Click Back to return to admin app
  await tl.at(5600);
  tl.showCaption(CAPTIONS.clickBack);
  await pressOn(tl, "[data-tl=btn-back-to-app]", { ms: 600 });
  tl.setVar("ocxPublicPreviewOpen", false);
  tl.setUrl(URLS.cardDetail);
  await tl.wait(400);

  // 4. Concluding notice & hover on settings
  await tl.at(8000);
  tl.showCaption(CAPTIONS.tutorialComplete);
  await hoverOn(tl, "[data-tl=tab-settings]", { ms: 600 });
  await ring(tl, "[data-tl=tab-settings]", 1600);

  // 5. Conclude
  await finishOneCardX(tl, STEP17_DURATION_MS);
}
