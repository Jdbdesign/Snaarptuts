import type { Timeline } from "@/lib/timeline";
import {
  beginOneCardX,
  finishOneCardX,
  hoverOn,
  ring,
} from "@/components/onecardx/onecardx-timeline";
import { CAPTIONS, URLS } from "./data";

export const STEP25_DURATION_MS = 10000;

export async function runStep25(tl: Timeline) {
  beginOneCardX(tl, URLS.editor, "editor", [0.45, 0.45]);
  tl.setVar("ocxActiveTab", "display");
  tl.setVar("ocxDesign", "modern");
  tl.setVar("ocxCardType", "id-card");
  tl.setVar("ocxPhotoAdded", true);
  tl.setVar("ocxLogoAdded", true);
  tl.setVar("ocxBadgeAdded", true);
  tl.setVar("ocxAccentColor", "#0D9488");
  tl.setVar("ocxUseOwnNameChecked", false);

  tl.setVar("field:prefix", "");
  tl.setVar("field:first-name", "");
  tl.setVar("field:last-name", "");
  tl.setVar("field:title", "");
  tl.setVar("field:company", "");

  // 1. Click Information tab
  await tl.at(600);
  tl.showCaption(CAPTIONS.clickInfoTab, { target: "[data-tl=tab-information]" });
  await tl.wait(100);
  await tl.moveCursorTo("[data-tl=tab-information]", { ms: 600 });
  await tl.click("[data-tl=tab-information]");
  tl.setVar("ocxActiveTab", "information");
  await tl.wait(200);

  // 2. Type personal details
  await tl.at(2500);
  tl.showCaption(CAPTIONS.typePersonal, { target: "[data-tl=input-prefix]" });
  await tl.wait(100);
  await tl.moveCursorTo("[data-tl=input-prefix]", { ms: 400 });
  await tl.click("[data-tl=input-prefix]");
  await tl.typeText("prefix", "Mr", { msPerChar: 70 });
  await tl.wait(100);
  await tl.moveCursorTo("[data-tl=input-first-name]", { ms: 400 });
  await tl.click("[data-tl=input-first-name]");
  await tl.typeText("first-name", "Alex", { msPerChar: 70 });
  await tl.wait(100);
  await tl.moveCursorTo("[data-tl=input-last-name]", { ms: 400 });
  await tl.click("[data-tl=input-last-name]");
  await tl.typeText("last-name", "Morgan", { msPerChar: 70 });

  // 3. Type work details
  await tl.at(5600);
  tl.showCaption(CAPTIONS.typeWork, { target: "[data-tl=input-title]" });
  await tl.wait(100);
  await tl.moveCursorTo("[data-tl=input-title]", { ms: 400 });
  await tl.click("[data-tl=input-title]");
  await tl.typeText("title", "Product Designer", { msPerChar: 60 });
  await tl.wait(100);
  await tl.moveCursorTo("[data-tl=input-company]", { ms: 400 });
  await tl.click("[data-tl=input-company]");
  await tl.typeText("company", "Acme Ltd", { msPerChar: 60 });

  // 4. Highlight preview
  await tl.at(8000);
  tl.showCaption(CAPTIONS.previewDetails, { target: "[data-tl=card-live-preview]" });
  await hoverOn(tl, "[data-tl=card-live-preview]", { ms: 600 });
  await ring(tl, "[data-tl=card-live-preview]", 1500);

  // 5. Finish
  await finishOneCardX(tl, STEP25_DURATION_MS);
}
