import type { Timeline } from "@/lib/timeline";
import {
  beginOneCardX,
  finishOneCardX,
  hoverOn,
  ring,
} from "@/components/onecardx/onecardx-timeline";
import { CAPTIONS, URLS } from "./data";

export const STEP27_DURATION_MS = 10500;

export async function runStep27(tl: Timeline) {
  beginOneCardX(tl, URLS.editor, "editor", [0.45, 0.45]);
  tl.setVar("ocxActiveTab", "information");
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

  tl.setVar("ocxFieldWebsite", false);
  tl.setVar("ocxFieldInstagram", false);
  tl.setVar("field:website-url", "");
  tl.setVar("field:instagram-url", "");

  // 1. Click Fields tab
  await tl.at(600);
  tl.showCaption(CAPTIONS.clickFieldsTab, { target: "[data-tl=tab-fields]" });
  await tl.wait(100);
  await tl.moveCursorTo("[data-tl=tab-fields]", { ms: 600 });
  await tl.click("[data-tl=tab-fields]");
  tl.setVar("ocxActiveTab", "fields");
  await tl.wait(200);

  // 2. Add Website field
  await tl.at(2500);
  tl.showCaption(CAPTIONS.addWebsite, { target: "[data-tl=chip-website]" });
  await tl.wait(100);
  await tl.moveCursorTo("[data-tl=chip-website]", { ms: 500 });
  await tl.click("[data-tl=chip-website]");
  tl.setVar("ocxFieldWebsite", true);
  await tl.wait(200);
  await tl.moveCursorTo("[data-tl=input-field-website]", { ms: 400 });
  await tl.click("[data-tl=input-field-website]");
  await tl.typeText("website-url", "www.acme.example", { msPerChar: 60 });

  // 3. Add Instagram field
  await tl.at(5600);
  tl.showCaption(CAPTIONS.addInstagram, { target: "[data-tl=chip-instagram]" });
  await tl.wait(100);
  await tl.moveCursorTo("[data-tl=chip-instagram]", { ms: 500 });
  await tl.click("[data-tl=chip-instagram]");
  tl.setVar("ocxFieldInstagram", true);
  await tl.wait(200);
  await tl.moveCursorTo("[data-tl=input-field-instagram]", { ms: 400 });
  await tl.click("[data-tl=input-field-instagram]");
  await tl.typeText("instagram-url", "www.instagram.com", { msPerChar: 60 });

  // 4. Highlight Preview
  await tl.at(8400);
  tl.showCaption(CAPTIONS.previewContactLinks, { target: "[data-tl=card-live-preview]" });
  await hoverOn(tl, "[data-tl=card-live-preview]", { ms: 600 });
  await ring(tl, "[data-tl=card-live-preview]", 1600);

  // 5. Finish
  await finishOneCardX(tl, STEP27_DURATION_MS);
}
