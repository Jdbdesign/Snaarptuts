import type { Timeline } from "@/lib/timeline";
import {
  beginOneCardX,
  finishOneCardX,
  hoverOn,
  ring,
} from "@/components/onecardx/onecardx-timeline";
import { CAPTIONS, URLS } from "./data";

export const STEP17_DURATION_MS = 9500;

export async function runStep17(tl: Timeline) {
  beginOneCardX(tl, URLS.cardDetail, "cardDetail", [0.45, 0.45]);
  tl.setVar("ocxPublicPreviewOpen", false);

  // 1. Review QR Code
  await tl.at(600);
  tl.showCaption("Review your card's QR Code, ready for instant mobile scanning.");
  await hoverOn(tl, "[data-tl=card-qr-preview]", { ms: 600 });
  await ring(tl, "[data-tl=card-qr-preview]", 2200);

  // 2. Hover Settings tab
  await tl.at(3800);
  tl.showCaption("Switch to Settings to adjust card audience, permissions, or access.");
  await hoverOn(tl, "[data-tl=tab-settings]", { ms: 600 });
  await ring(tl, "[data-tl=tab-settings]", 2200);

  // 3. Conclude tutorial
  await tl.at(7000);
  tl.showCaption(CAPTIONS.tutorialComplete);
  await hoverOn(tl, "[data-tl=card-live-preview]", { ms: 550 });

  // 4. Finish
  await finishOneCardX(tl, STEP17_DURATION_MS);
}
