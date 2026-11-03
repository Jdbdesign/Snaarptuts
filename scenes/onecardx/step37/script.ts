import type { Timeline } from "@/lib/timeline";
import {
  beginOneCardX,
  finishOneCardX,
  hoverOn,
  pressOn,
  ring,
} from "@/components/onecardx/onecardx-timeline";
import { CAPTIONS, URLS } from "./data";

export const STEP37_DURATION_MS = 7500;

export async function runStep37(tl: Timeline) {
  beginOneCardX(tl, URLS.editor, "editor", [0.85, 0.44]);
  tl.setVar("ocxCardType", "business");
  tl.setVar("ocxActiveTab", "display");
  tl.setVar("ocxBusinessStyle", "split");
  tl.setVar("ocxAccentColor", "#1F2937");
  tl.setVar("ocxTotalViews", 2);
  tl.setVar("ocxTotalShares", 1);
  tl.setVar("ocxLinkCopied", false);

  // 1. Click Save
  await tl.at(600);
  tl.showCaption(CAPTIONS.clickSave);
  await hoverOn(tl, "[data-tl=btn-save-card]", { ms: 600 });
  await pressOn(tl, "[data-tl=btn-save-card]", { ms: 300 });
  tl.setUrl(URLS.cardDetail);
  tl.setVar("ocxPage", "cardDetail");

  // 2. Click Copy Link
  await tl.at(2600);
  tl.showCaption(CAPTIONS.clickCopyLink);
  await hoverOn(tl, "[data-tl=btn-copy-link]", { ms: 600 });
  await pressOn(tl, "[data-tl=btn-copy-link]", { ms: 300 });
  tl.setVar("ocxLinkCopied", true);

  // 3. Highlight landscape card preview
  await tl.at(4400);
  tl.showCaption(CAPTIONS.reviewCard);
  await hoverOn(tl, "[data-tl=card-live-preview]", { ms: 600 });
  await ring(tl, "[data-tl=card-live-preview]", 1600);

  // 4. Conclude
  await finishOneCardX(tl, STEP37_DURATION_MS);
}
