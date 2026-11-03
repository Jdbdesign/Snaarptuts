import type { Timeline } from "@/lib/timeline";
import {
  beginOneCardX,
  finishOneCardX,
  hoverOn,
  pressOn,
  ring,
} from "@/components/onecardx/onecardx-timeline";
import { CAPTIONS, URLS } from "./data";

export const STEP45_DURATION_MS = 8500;

export async function runStep45(tl: Timeline) {
  beginOneCardX(tl, URLS.emailSignatures, "emailSignatures", [0.65, 0.42]);
  tl.setVar("ocxSigCard", "business");
  tl.setVar("ocxSigStyle", 2);
  tl.setVar("ocxSigApp", "Gmail");
  tl.setVar("ocxSigOs", "Web");

  // 1. Try Other & Outlook
  await tl.at(600);
  tl.showCaption(CAPTIONS.chooseMailApp);
  await hoverOn(tl, "[data-tl=sig-app-other]", { ms: 500 });
  await pressOn(tl, "[data-tl=sig-app-other]", { ms: 250 });
  tl.setVar("ocxSigApp", "Other");
  await tl.wait(150);

  await hoverOn(tl, "[data-tl=sig-app-outlook]", { ms: 500 });
  await pressOn(tl, "[data-tl=sig-app-outlook]", { ms: 250 });
  tl.setVar("ocxSigApp", "Outlook");
  await tl.wait(150);

  // 2. Select Gmail
  await hoverOn(tl, "[data-tl=sig-app-gmail]", { ms: 500 });
  await pressOn(tl, "[data-tl=sig-app-gmail]", { ms: 250 });
  tl.setVar("ocxSigApp", "Gmail");
  await tl.wait(150);

  // 3. Try OS options
  await tl.at(3600);
  tl.showCaption(CAPTIONS.choosePlatformOs);
  await hoverOn(tl, "[data-tl=sig-os-mac]", { ms: 400 });
  await pressOn(tl, "[data-tl=sig-os-mac]", { ms: 250 });
  tl.setVar("ocxSigOs", "Mac");
  await tl.wait(150);

  await hoverOn(tl, "[data-tl=sig-os-windows]", { ms: 400 });
  await pressOn(tl, "[data-tl=sig-os-windows]", { ms: 250 });
  tl.setVar("ocxSigOs", "Windows");
  await tl.wait(150);

  await hoverOn(tl, "[data-tl=sig-os-web]", { ms: 400 });
  await pressOn(tl, "[data-tl=sig-os-web]", { ms: 250 });
  tl.setVar("ocxSigOs", "Web");
  await tl.wait(150);

  // 4. Highlight Apply tag
  await tl.at(6200);
  tl.showCaption(CAPTIONS.gmailWebSelected);
  await hoverOn(tl, "[data-tl=sig-apply-tag]", { ms: 500 });
  await ring(tl, "[data-tl=sig-apply-tag]", 1500);

  // 5. Finish
  await finishOneCardX(tl, STEP45_DURATION_MS);
}
