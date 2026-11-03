import type { Timeline } from "@/lib/timeline";
import {
  beginOneCardX,
  finishOneCardX,
  hoverOn,
  pressOn,
  ring,
} from "@/components/onecardx/onecardx-timeline";
import { CAPTIONS, URLS } from "./data";

export const STEP39_DURATION_MS = 7500;

export async function runStep39(tl: Timeline) {
  beginOneCardX(tl, URLS.memberView, "memberView", [0.08, 0.28]);
  tl.setVar("ocxMemberLandscape", true);
  tl.setVar("ocxBgLayout", "bottom-left");
  tl.setVar("ocxSelectedBg", "sunset-lake");

  // 1. Click Backgrounds in sidebar
  await tl.at(500);
  tl.showCaption(CAPTIONS.clickBackgrounds);
  await hoverOn(tl, "[data-tl=nav-backgrounds]", { ms: 600 });
  await pressOn(tl, "[data-tl=nav-backgrounds]", { ms: 300 });
  tl.setUrl(URLS.backgrounds);
  tl.setVar("ocxPage", "backgrounds");

  // 2. Highlight 16:9 virtual background preview
  await tl.at(2600);
  tl.showCaption(CAPTIONS.virtualBackgroundsIntro);
  await hoverOn(tl, "[data-tl=bg-preview-card]", { ms: 600 });
  await ring(tl, "[data-tl=bg-preview-card]", 1600);

  // 3. Highlight user badge on backdrop
  await tl.at(4800);
  tl.showCaption(CAPTIONS.previewInspect);
  await hoverOn(tl, "[data-tl=bg-user-badge]", { ms: 600 });
  await ring(tl, "[data-tl=bg-user-badge]", 1500);

  // 4. Conclude
  await finishOneCardX(tl, STEP39_DURATION_MS);
}
