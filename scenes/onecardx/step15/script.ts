import type { Timeline } from "@/lib/timeline";
import {
  beginOneCardX,
  finishOneCardX,
  hoverOn,
  pressOn,
  ring,
} from "@/components/onecardx/onecardx-timeline";
import { CAPTIONS, URLS } from "./data";

export const STEP15_DURATION_MS = 6500;

export async function runStep15(tl: Timeline) {
  beginOneCardX(tl, URLS.editor, "editor", [0.75, 0.08]);
  tl.setVar("ocxActiveTab", "fields");
  tl.setVar("ocxDesign", "classic");
  tl.setVar("ocxPhotoAdded", true);
  tl.setVar("ocxLogoAdded", true);
  tl.setVar("ocxBadgeAdded", true);
  tl.setVar("ocxAccentColor", "#2563EB");
  tl.setVar("field:first-name", "Alex");
  tl.setVar("field:last-name", "Morgan");
  tl.setVar("ocxFieldWebsite", true);
  tl.setVar("ocxFieldInstagram", true);
  tl.setVar("ocxFieldEmail", true);
  tl.setVar("ocxSavingCard", false);

  // 1. Click Save
  await tl.at(600);
  tl.showCaption(CAPTIONS.clickSave);
  await pressOn(tl, "[data-tl=btn-save-card]", { ms: 600 });
  await tl.wait(900);

  // Ensure target page is transitioned
  tl.setVar("ocxSavingCard", false);
  tl.setUrl(URLS.cardDetail);
  tl.setVar("ocxPage", "cardDetail");
  await tl.wait(200);

  // 2. Review saved card details
  await tl.at(3200);
  tl.showCaption(CAPTIONS.savedConfirmation);
  await hoverOn(tl, "[data-tl=analytics-strip]", { ms: 600 });
  await ring(tl, "[data-tl=analytics-strip]", 1800);

  // 3. Conclude
  await finishOneCardX(tl, STEP15_DURATION_MS);
}
