import type { Timeline } from "@/lib/timeline";
import { hoverOn, press } from "./script-helpers";
import { CAPTIONS, URL_ORGANIZATION } from "./steps-data";

/** Snaarp Admin, step 11 - Add a member to the department (Ada Okoye moves into Design). Times are active milliseconds from the start of the step. */
export const STEP11_DURATION_MS = 38000;

export async function runStep11(tl: Timeline) {
  tl.placeCursor(0.5, 0.45);
  tl.setUrl(URL_ORGANIZATION);

  await tl.at(500);
  tl.showCaption(CAPTIONS.allMembers);
  await press(tl, "[data-tl=org-filter-all]", { ms: 1000 });
  await tl.wait(1500);

  await tl.at(5500);
  tl.showCaption(CAPTIONS.rowMenu);
  await press(tl, "[data-tl=org-actions-ada]", { ms: 1100 });
  await tl.wait(1200);

  await tl.at(10500);
  tl.showCaption(CAPTIONS.moveTo);
  await hoverOn(tl, "[data-tl=org-move-engineering]", { ms: 800, hold: 400 });
  await hoverOn(tl, "[data-tl=org-move-design]", { ms: 600, hold: 600 });
  tl.highlight("[data-tl=org-move-design]");
  await tl.wait(400);
  await tl.click("[data-tl=org-move-design]");
  tl.clearHighlight();
  tl.hover(null);
  await tl.wait(2000);

  await tl.at(19500);
  tl.showCaption(CAPTIONS.memberAdded);
  await press(tl, "[data-tl=org-filter-design]", { ms: 1100 });
  tl.highlight("[data-tl=org-row-ada]");
  await tl.wait(4500);
  tl.clearHighlight();
  await tl.at(STEP11_DURATION_MS);
}
