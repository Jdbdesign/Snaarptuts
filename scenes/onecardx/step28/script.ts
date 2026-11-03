import type { Timeline } from "@/lib/timeline";
import {
  beginOneCardX,
  finishOneCardX,
  hoverOn,
  ring,
} from "@/components/onecardx/onecardx-timeline";
import { CAPTIONS, URLS } from "./data";

export const STEP28_DURATION_MS = 7500;

export async function runStep28(tl: Timeline) {
  beginOneCardX(tl, URLS.editor, "editor", [0.45, 0.45]);
  tl.setVar("ocxActiveTab", "fields");
  tl.setVar("ocxDesign", "modern");
  tl.setVar("ocxCardType", "id-card");
  tl.setVar("ocxPhotoAdded", true);
  tl.setVar("ocxLogoAdded", true);
  tl.setVar("ocxBadgeAdded", true);
  tl.setVar("ocxAccentColor", "#0D9488");
  tl.setVar("ocxUseOwnNameChecked", false);

  tl.setVar("field:prefix", "Mr");
  tl.setVar("field:first-name", "Alex");
  tl.setVar("field:last-name", "Morgan");
  tl.setVar("field:title", "Product Designer");
  tl.setVar("field:company", "Acme Ltd");

  tl.setVar("ocxFieldWebsite", true);
  tl.setVar("ocxFieldInstagram", true);
  tl.setVar("field:website-url", "www.acme.example");
  tl.setVar("field:instagram-url", "www.instagram.com");
  tl.setVar("ocxSavingCard", false);

  // 1. Click Save
  await tl.at(600);
  tl.showCaption(CAPTIONS.clickSave, { target: "[data-tl=btn-save-card]" });
  await tl.wait(100);
  await tl.moveCursorTo("[data-tl=btn-save-card]", { ms: 600 });
  await tl.click("[data-tl=btn-save-card]");
  tl.setVar("ocxSavingCard", true);
  await tl.wait(600);
  tl.setVar("ocxSavingCard", false);
  tl.setUrl(URLS.cardDetail);
  tl.setVar("ocxPage", "cardDetail");
  await tl.wait(200);

  // 2. Inspect card and QR code
  await tl.at(3200);
  tl.showCaption(CAPTIONS.cardReady, { target: "[data-tl=card-live-preview]" });
  await hoverOn(tl, "[data-tl=card-live-preview]", { ms: 600 });
  await ring(tl, "[data-tl=card-live-preview]", 1800);

  // 3. Finish
  await finishOneCardX(tl, STEP28_DURATION_MS);
}
