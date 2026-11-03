import type { Timeline } from "@/lib/timeline";
import {
  beginOneCardX,
  finishOneCardX,
  hoverOn,
  pressOn,
  ring,
} from "@/components/onecardx/onecardx-timeline";
import { CAPTIONS, URLS } from "./data";

export const STEP43_DURATION_MS = 8500;

export async function runStep43(tl: Timeline) {
  beginOneCardX(tl, URLS.emailSignatures, "emailSignatures", [0.72, 0.12]);
  tl.setVar("ocxSigCard", "business");
  tl.setVar("ocxSigCardDropdownOpen", false);

  // 1. Click Change to open dropdown
  await tl.at(600);
  tl.showCaption(CAPTIONS.clickChange);
  await hoverOn(tl, "[data-tl=btn-change-sig-card]", { ms: 600 });
  await pressOn(tl, "[data-tl=btn-change-sig-card]", { ms: 300 });
  tl.setVar("ocxSigCardDropdownOpen", true);
  await tl.wait(150);

  // 2. Select I D Card
  await tl.at(2400);
  tl.showCaption(CAPTIONS.selectIdCard);
  await hoverOn(tl, "[data-tl=sig-card-opt-id]", { ms: 600 });
  await pressOn(tl, "[data-tl=sig-card-opt-id]", { ms: 300 });
  tl.setVar("ocxSigCard", "id-card");
  tl.setVar("ocxSigCardDropdownOpen", false);
  await tl.wait(150);
  await ring(tl, "[data-tl=signature-preview-card]", 1400);

  // 3. Switch back to Business Card
  await tl.at(4800);
  tl.showCaption(CAPTIONS.switchBack);
  await hoverOn(tl, "[data-tl=btn-change-sig-card]", { ms: 500 });
  await pressOn(tl, "[data-tl=btn-change-sig-card]", { ms: 300 });
  tl.setVar("ocxSigCardDropdownOpen", true);
  await tl.wait(150);

  await hoverOn(tl, "[data-tl=sig-card-opt-business]", { ms: 500 });
  await pressOn(tl, "[data-tl=sig-card-opt-business]", { ms: 300 });
  tl.setVar("ocxSigCard", "business");
  tl.setVar("ocxSigCardDropdownOpen", false);
  await tl.wait(150);
  await ring(tl, "[data-tl=signature-preview-card]", 1200);

  // 4. Finish
  await finishOneCardX(tl, STEP43_DURATION_MS);
}
