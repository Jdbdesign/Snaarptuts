import type { Timeline } from "@/lib/timeline";
import { press } from "./script-helpers";
import { CAPTIONS, URL_ORGANIZATION, URL_USERS } from "./steps-data";

/** Snaarp Admin, step 9 - See your departments. Times are active milliseconds from the start of the step. */
export const STEP9_DURATION_MS = 36000;

const filter = (id: string) => `[data-tl=org-filter-${id}]`;

export async function runStep9(tl: Timeline) {
  tl.placeCursor(0.5, 0.45);
  tl.setUrl(URL_USERS);

  await tl.at(500);
  tl.showCaption(CAPTIONS.openOrg);
  await press(tl, "[data-tl=panel-menu-organization]", { ms: 1100 });
  tl.setUrl(URL_ORGANIZATION);
  await tl.wait(900);

  await tl.at(5000);
  tl.showCaption(CAPTIONS.filterList);
  tl.highlight("[data-tl=org-filter-list]");
  await tl.moveCursorTo(filter("all"), { ms: 900 });
  await tl.wait(2200);
  tl.clearHighlight();

  await tl.at(9500);
  tl.showCaption(CAPTIONS.engineering);
  await press(tl, filter("engineering"), { ms: 800 });
  await tl.wait(2500);

  await tl.at(14500);
  tl.showCaption(CAPTIONS.hr);
  await press(tl, filter("hr"), { ms: 700 });
  await tl.wait(2500);

  await tl.at(19500);
  tl.showCaption(CAPTIONS.humanResources);
  await press(tl, filter("human-resources"), { ms: 700 });
  await tl.wait(2500);

  await tl.at(24500);
  tl.showCaption(CAPTIONS.sales);
  await press(tl, filter("sales"), { ms: 700 });
  tl.highlight("[data-tl=org-empty]");
  await tl.wait(2800);
  tl.clearHighlight();

  await tl.at(30500);
  tl.showCaption(CAPTIONS.all);
  await press(tl, filter("all"), { ms: 800 });
  await tl.at(STEP9_DURATION_MS);
}
