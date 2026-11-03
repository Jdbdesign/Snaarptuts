import type { Timeline } from "@/lib/timeline";
import {
  beginOneCardX,
  finishOneCardX,
} from "@/components/onecardx/onecardx-timeline";
import { CAPTIONS, URLS } from "./data";

export const STEP20_DURATION_MS = 8500;

export async function runStep20(tl: Timeline) {
  beginOneCardX(tl, URLS.orgCards, "orgCards", [0.55, 0.42]);
  tl.setVar("ocxAudienceModalOpen", true);
  tl.setVar("ocxAudienceMode", "everyone");
  tl.setVar("ocxSelectedAudience", []);

  // 1. Click Specific people
  await tl.at(600);
  tl.showCaption(CAPTIONS.clickSpecificPeople, { target: "[data-tl=audience-opt-specific]" });
  await tl.wait(100);
  await tl.moveCursorTo("[data-tl=audience-opt-specific]", { ms: 600 });
  await tl.click("[data-tl=audience-opt-specific]");
  tl.setVar("ocxAudienceMode", "specific");
  await tl.wait(200);

  // 2. Select Alex Morgan and Jordan Lee
  await tl.at(3000);
  tl.showCaption(CAPTIONS.tickPeople, { target: "[data-tl=check-audience-alex-morgan]" });
  await tl.moveCursorTo("[data-tl=check-audience-alex-morgan]", { ms: 600 });
  await tl.click("[data-tl=check-audience-alex-morgan]");
  tl.setVar("ocxSelectedAudience", ["alex-morgan"]);
  await tl.wait(300);

  await tl.moveCursorTo("[data-tl=check-audience-jordan-lee]", { ms: 400 });
  await tl.click("[data-tl=check-audience-jordan-lee]");
  tl.setVar("ocxSelectedAudience", ["alex-morgan", "jordan-lee"]);
  await tl.wait(300);

  // 3. Click Cancel to close
  await tl.at(6200);
  tl.showCaption(CAPTIONS.cancelAudience, { target: "[data-tl=btn-cancel-audience]" });
  await tl.wait(100);
  await tl.moveCursorTo("[data-tl=btn-cancel-audience]", { ms: 500 });
  await tl.click("[data-tl=btn-cancel-audience]");
  tl.setVar("ocxAudienceModalOpen", false);

  // 4. Finish
  await finishOneCardX(tl, STEP20_DURATION_MS);
}
