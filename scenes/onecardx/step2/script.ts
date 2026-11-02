import type { Timeline } from "@/lib/timeline";
import {
  beginOneCardX,
  finishOneCardX,
  hoverOn,
  pressOn,
} from "@/components/onecardx/onecardx-timeline";
import { CAPTIONS, URLS } from "./data";

export const STEP2_DURATION_MS = 14000;

export async function runStep2(tl: Timeline) {
  beginOneCardX(tl, URLS.home, "home", [0.85, 0.05]);

  // 1. Click Apps Grid Icon
  await tl.at(600);
  tl.showCaption(CAPTIONS.clickApps);
  await pressOn(tl, "[data-tl=top-apps-grid]", { ms: 650 });
  await tl.wait(100);

  // 2. Inspect Apps Popover
  await tl.at(2800);
  tl.showCaption(CAPTIONS.inspectApps);
  tl.highlight("[data-tl=apps-popover]");
  await tl.wait(1500);
  tl.clearHighlight();
  await hoverOn(tl, "[data-tl=popover-app-onecard]", { ms: 500 });
  await tl.wait(800);

  // 3. Close Apps Popover
  await tl.at(6000);
  tl.showCaption(CAPTIONS.closeApps);
  await pressOn(tl, "[data-tl=top-apps-grid]", { ms: 550 });
  await tl.wait(250);

  // 4. Click Avatar Menu
  await tl.at(8000);
  tl.showCaption(CAPTIONS.clickAvatar);
  await pressOn(tl, "[data-tl=top-avatar]", { ms: 600 });
  await tl.wait(100);

  // 5. Inspect Avatar Menu
  await tl.at(10200);
  tl.showCaption(CAPTIONS.inspectAvatar);
  tl.highlight("[data-tl=avatar-popover]");
  await tl.wait(1500);
  tl.clearHighlight();

  // 6. Close Avatar Menu
  await tl.at(12200);
  tl.showCaption(CAPTIONS.closeAvatar);
  await pressOn(tl, "[data-tl=top-avatar]", { ms: 550 });

  // 7. Conclude
  await finishOneCardX(tl, STEP2_DURATION_MS);
}
