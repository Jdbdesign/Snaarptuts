import type { Timeline } from "@/lib/timeline";
import { NEW_DEPARTMENT } from "./people-data";
import { press } from "./script-helpers";
import { CAPTIONS, URL_ORGANIZATION } from "./steps-data";

/** Snaarp Admin, step 10 - Create a new department. Times are active milliseconds from the start of the step. */
export const STEP10_DURATION_MS = 36000;

export async function runStep10(tl: Timeline) {
  tl.placeCursor(0.5, 0.45);
  tl.setUrl(URL_ORGANIZATION);

  await tl.at(500);
  tl.showCaption(CAPTIONS.newDept);
  await press(tl, "[data-tl=btn-new-department]", { ms: 1100 });
  await tl.wait(800);

  await tl.at(4500);
  tl.showCaption(CAPTIONS.deptName);
  await tl.fill("[data-tl=field-deptname]", "deptname", NEW_DEPARTMENT.name, { moveMs: 900, msPerChar: 130 });
  await tl.wait(500);

  await tl.at(9500);
  tl.showCaption(CAPTIONS.deptDesc);
  await tl.fill("[data-tl=field-deptdesc]", "deptdesc", NEW_DEPARTMENT.description, { moveMs: 700, msPerChar: 55 });
  tl.setVar("focus", "");
  await tl.wait(500);

  await tl.at(16500);
  tl.showCaption(CAPTIONS.deptColor);
  await press(tl, "[data-tl=newdept-color-6]", { ms: 800 });
  await tl.wait(700);
  await press(tl, "[data-tl=newdept-color-2]", { ms: 500 });
  await tl.wait(1200);

  await tl.at(22000);
  tl.showCaption(CAPTIONS.deptCreate);
  await press(tl, "[data-tl=btn-newdept-create]", { ms: 900 });
  await tl.wait(1000);

  await tl.at(27000);
  tl.showCaption(CAPTIONS.deptCreated);
  tl.highlight("[data-tl=org-filter-design]");
  await tl.moveCursorTo("[data-tl=org-filter-design]", { ms: 900 });
  await tl.wait(3500);
  tl.clearHighlight();
  await tl.at(STEP10_DURATION_MS);
}
