import type { Timeline } from "@/lib/timeline";
import {
  beginOneCardX,
  finishOneCardX,
  hoverOn,
  pressOn,
  ring,
} from "@/components/onecardx/onecardx-timeline";
import { CAPTIONS, URLS } from "./data";

export const STEP14_DURATION_MS = 14000;

export async function runStep14(tl: Timeline) {
  beginOneCardX(tl, URLS.editor, "editor", [0.40, 0.12]);
  tl.setVar("ocxActiveTab", "information");
  tl.setVar("ocxDesign", "classic");
  tl.setVar("ocxPhotoAdded", true);
  tl.setVar("ocxLogoAdded", true);
  tl.setVar("ocxBadgeAdded", true);
  tl.setVar("ocxAccentColor", "#2563EB");
  tl.setVar("field:first-name", "Alex");
  tl.setVar("field:last-name", "Morgan");
  tl.setVar("ocxFieldWebsite", false);
  tl.setVar("ocxFieldInstagram", false);
  tl.setVar("ocxFieldEmail", false);

  // 1. Click Fields tab
  await tl.at(600);
  tl.showCaption(CAPTIONS.clickFieldsTab);
  await pressOn(tl, "[data-tl=tab-fields]", { ms: 600 });
  await tl.wait(150);

  // 2. Click Website chip
  await tl.at(3000);
  tl.showCaption(CAPTIONS.addWebsite);
  await pressOn(tl, "[data-tl=chip-website]", { ms: 550 });
  await tl.wait(250);

  // 3. Click Instagram chip
  await tl.at(5600);
  tl.showCaption(CAPTIONS.addInstagram);
  await pressOn(tl, "[data-tl=chip-instagram]", { ms: 550 });
  await tl.wait(250);

  // 4. Click Email chip
  await tl.at(8200);
  tl.showCaption(CAPTIONS.addEmail);
  await pressOn(tl, "[data-tl=chip-email]", { ms: 550 });
  await tl.wait(300);

  // 5. Inspect preview links
  await tl.at(10800);
  tl.showCaption(CAPTIONS.inspectPreviewFields);
  await hoverOn(tl, "[data-tl=card-live-preview]", { ms: 600 });
  await ring(tl, "[data-tl=card-live-preview]", 2000);

  // 6. Conclude
  await finishOneCardX(tl, STEP14_DURATION_MS);
}
