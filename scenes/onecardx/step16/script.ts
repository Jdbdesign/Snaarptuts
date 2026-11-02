import type { Timeline } from "@/lib/timeline";
import {
  beginOneCardX,
  finishOneCardX,
  hoverOn,
  pressOn,
  ring,
} from "@/components/onecardx/onecardx-timeline";
import { CAPTIONS, URLS } from "./data";

export const STEP16_DURATION_MS = 8500;

export async function runStep16(tl: Timeline) {
  beginOneCardX(tl, URLS.cardDetail, "cardDetail", [0.35, 0.25]);
  tl.setVar("ocxLinkCopied", false);
  tl.setVar("ocxPublicPreviewOpen", false);

  // 1. Review QR code & card preview
  await tl.at(500);
  tl.showCaption(CAPTIONS.reviewCard);
  await hoverOn(tl, "[data-tl=card-qr-preview]", { ms: 600 });
  await ring(tl, "[data-tl=card-qr-preview]", 1800);

  // 2. Click Copy Link
  await tl.at(3000);
  tl.showCaption(CAPTIONS.clickCopyLink);
  await pressOn(tl, "[data-tl=btn-copy-link]", { ms: 600 });
  tl.setVar("ocxLinkCopied", true);
  await tl.wait(500);

  // 3. Inspect Brand Toolkit section
  await tl.at(5800);
  tl.showCaption(CAPTIONS.brandToolkit);
  await hoverOn(tl, "[data-tl=brand-toolkit-section]", { ms: 600 });
  await ring(tl, "[data-tl=brand-toolkit-section]", 2000);

  // 4. Conclude
  await finishOneCardX(tl, STEP16_DURATION_MS);
}
