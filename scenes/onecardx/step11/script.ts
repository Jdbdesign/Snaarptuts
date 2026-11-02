import type { Timeline } from "@/lib/timeline";
import {
  beginOneCardX,
  finishOneCardX,
  hoverOn,
  pressOn,
  ring,
} from "@/components/onecardx/onecardx-timeline";
import { CAPTIONS, URLS } from "./data";

export const STEP11_DURATION_MS = 10500;

export async function runStep11(tl: Timeline) {
  beginOneCardX(tl, URLS.editor, "editor", [0.25, 0.70]);
  tl.setVar("ocxActiveTab", "display");
  tl.setVar("ocxDesign", "classic");
  tl.setVar("ocxPhotoAdded", true);
  tl.setVar("ocxAccentColor", "#2563EB");
  tl.setVar("ocxLogoAdded", false);

  // 1. Click Add Logo
  await tl.at(600);
  tl.showCaption(CAPTIONS.clickAddLogo, { target: "[data-tl=btn-add-logo]" });
  await tl.wait(100);
  await tl.moveCursorTo("[data-tl=btn-add-logo]", { ms: 600 });
  await tl.click("[data-tl=btn-add-logo]");
  tl.setVar("ocxLogoModalOpen", true);
  await tl.wait(150);

  // 2. Pick sample Acme logo
  await tl.at(3400);
  tl.showCaption(CAPTIONS.pickLogo);
  await pressOn(tl, "[data-tl=btn-choose-logo-logo-acme]", { ms: 600 });
  tl.setVar("ocxLogoAdded", true);
  tl.setVar("ocxLogoModalOpen", false);
  await tl.wait(300);

  // 3. Inspect live preview with logo
  await tl.at(6600);
  tl.showCaption(CAPTIONS.logoUpdated);
  await hoverOn(tl, "[data-tl=card-live-preview]", { ms: 600 });
  await ring(tl, "[data-tl=card-live-preview]", 2200);

  // 4. Conclude
  await finishOneCardX(tl, STEP11_DURATION_MS);
}
