import type { Timeline } from "@/lib/timeline";
import {
  beginOneCardX,
  finishOneCardX,
  hoverOn,
  pressOn,
  ring,
} from "@/components/onecardx/onecardx-timeline";
import { CAPTIONS, URLS } from "./data";

export const STEP13_DURATION_MS = 14500;

export async function runStep13(tl: Timeline) {
  beginOneCardX(tl, URLS.editor, "editor", [0.30, 0.12]);
  tl.setVar("ocxActiveTab", "display");
  tl.setVar("ocxDesign", "classic");
  tl.setVar("ocxPhotoAdded", true);
  tl.setVar("ocxLogoAdded", true);
  tl.setVar("ocxBadgeAdded", true);
  tl.setVar("ocxAccentColor", "#2563EB");
  tl.setVar("ocxFirstName", "");
  tl.setVar("ocxLastName", "");

  // 1. Click Information tab
  await tl.at(600);
  tl.showCaption(CAPTIONS.clickInfoTab);
  await pressOn(tl, "[data-tl=tab-information]", { ms: 600 });
  await tl.wait(150);

  // 2. Tick & untick 'Use own name'
  await tl.at(3000);
  tl.showCaption(CAPTIONS.tickOwnName);
  await pressOn(tl, "[data-tl=checkbox-own-name]", { ms: 550 });
  await tl.wait(1000);
  tl.showCaption(CAPTIONS.untickOwnName);
  await pressOn(tl, "[data-tl=checkbox-own-name]", { ms: 450 });
  await tl.wait(200);

  // 3. Type First Name 'Alex'
  await tl.at(6200);
  tl.showCaption(CAPTIONS.typeFirstName);
  await tl.moveCursorTo("[data-tl=input-first-name]", { ms: 550 });
  await tl.click("[data-tl=input-first-name]");
  await tl.typeText("first-name", "Alex", { msPerChar: 70 });
  await tl.wait(300);

  // 4. Type Last Name 'Morgan'
  await tl.at(8800);
  tl.showCaption(CAPTIONS.typeLastName);
  await tl.moveCursorTo("[data-tl=input-last-name]", { ms: 550 });
  await tl.click("[data-tl=input-last-name]");
  await tl.typeText("last-name", "Morgan", { msPerChar: 70 });
  await tl.wait(300);

  // 5. Inspect updated card preview
  await tl.at(11600);
  tl.showCaption(CAPTIONS.previewNameUpdated);
  await hoverOn(tl, "[data-tl=card-live-preview]", { ms: 600 });
  await ring(tl, "[data-tl=card-live-preview]", 2000);

  // 6. Conclude
  await finishOneCardX(tl, STEP13_DURATION_MS);
}
