import type { Timeline } from "@/lib/timeline";
import {
  beginWorkforce,
  finishWorkforce,
  hoverOn,
  pressOn,
  ring,
} from "@/components/workforce/workforce-timeline";
import { CAPTIONS, URLS } from "./data";

export const STEP80_DURATION_MS = 17500;

export async function runStep80(tl: Timeline) {
  beginWorkforce(tl, URLS.recruitment, "recruitment", "overview", [0.93, 0.1], true);
  tl.setVar("wfRecruitmentTab", "job-postings");
  tl.setVar("wfCareersDetailOpen", false);

  // 1. Click View next to careers link
  await tl.at(500);
  tl.showCaption(CAPTIONS.clickViewPortal);
  await pressOn(tl, "[data-tl=btn-careers-view]", { ms: 600 });
  tl.setVar("wfPage", "careers-page");
  tl.setUrl(URLS.careersPublic);
  await tl.wait(500);

  // 2. Click View on job card
  await tl.at(3000);
  tl.showCaption(CAPTIONS.viewJobDetails);
  await pressOn(tl, "[data-tl=btn-view-careers-job]", { ms: 600 });
  tl.setVar("wfCareersDetailOpen", true);
  await tl.wait(400);

  // 3. Scroll and click into Email
  await tl.at(5500);
  await tl.scrollPanelTo("[data-scroller=careers-public-page]", 260, { ms: 800 });
  await tl.wait(300);

  await tl.at(7000);
  tl.showCaption(CAPTIONS.focusEmail);
  await pressOn(tl, "[data-tl=input-apply-email]", { ms: 500 });
  await tl.wait(300);

  // 4. Ring the application form
  await tl.at(9200);
  tl.showCaption(CAPTIONS.ringForm);
  await hoverOn(tl, "[data-tl=form-careers-apply]", { ms: 500 });
  await ring(tl, "[data-tl=form-careers-apply]", 1800);

  // 5. Click Cancel
  await tl.at(11800);
  tl.showCaption(CAPTIONS.clickCancelForm);
  await pressOn(tl, "[data-tl=btn-cancel-careers-app]", { ms: 500 });
  tl.setVar("wfCareersDetailOpen", false);
  await tl.wait(400);

  // 6. Click Back to the app
  await tl.at(14000);
  tl.showCaption(CAPTIONS.backToApp);
  await pressOn(tl, "[data-tl=chip-back-to-app]", { ms: 600 });
  tl.setVar("wfPage", "recruitment");
  tl.setVar("wfRecruitmentTab", "job-postings");
  tl.setUrl(URLS.recruitment);
  await tl.wait(400);

  // Finish
  await tl.at(16800);
  await finishWorkforce(tl);
}
