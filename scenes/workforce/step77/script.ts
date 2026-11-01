import type { Timeline } from "@/lib/timeline";
import {
  beginWorkforce,
  finishWorkforce,
  hoverOn,
  pressOn,
  ring,
} from "@/components/workforce/workforce-timeline";
import { CAPTIONS, URLS } from "./data";

export const STEP77_DURATION_MS = 14500;

export async function runStep77(tl: Timeline) {
  beginWorkforce(tl, URLS.payroll, "payroll", "overview", [0.12, 0.62], true);
  tl.setVar("wfPayrollTab", "pension-calculator");

  // 1. Click Recruitment in MANAGE sidebar
  await tl.at(500);
  tl.showCaption(CAPTIONS.clickRecruitment);
  await pressOn(tl, "[data-tl=nav-recruitment]", { ms: 600 });
  tl.setVar("wfPage", "recruitment");
  tl.setVar("wfRecruitmentTab", "dashboard");
  tl.setUrl(URLS.recruitment);
  await tl.wait(400);

  // 2. Ring careers link pill and hover Copy / View
  await tl.at(3000);
  tl.showCaption(CAPTIONS.careersLink);
  await hoverOn(tl, "[data-tl=pill-careers-link]", { ms: 600 });
  await ring(tl, "[data-tl=pill-careers-link]", 1800);

  await tl.at(5400);
  await hoverOn(tl, "[data-tl=btn-careers-copy]", { ms: 450 });
  await tl.wait(300);
  await hoverOn(tl, "[data-tl=btn-careers-view]", { ms: 450 });
  await tl.wait(300);

  // 3. Ring the 4 stat cards
  await tl.at(7000);
  tl.showCaption(CAPTIONS.overviewCards);
  await hoverOn(tl, "[data-tl=card-recruitment-open-jobs]", { ms: 500 });
  await ring(tl, "[data-tl=card-recruitment-open-jobs]", 1200);

  await tl.at(8800);
  await hoverOn(tl, "[data-tl=card-recruitment-total-applicants]", { ms: 450 });
  await ring(tl, "[data-tl=card-recruitment-total-applicants]", 1200);

  await tl.at(10500);
  await hoverOn(tl, "[data-tl=card-recruitment-interviews-week]", { ms: 450 });
  await ring(tl, "[data-tl=card-recruitment-interviews-week]", 1200);

  await tl.at(12200);
  await hoverOn(tl, "[data-tl=card-recruitment-hires-month]", { ms: 450 });
  await ring(tl, "[data-tl=card-recruitment-hires-month]", 1200);

  // Finish
  await tl.at(13800);
  await finishWorkforce(tl);
}
