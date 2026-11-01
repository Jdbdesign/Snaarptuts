import type { Timeline } from "@/lib/timeline";
import {
  beginWorkforce,
  finishWorkforce,
  hoverOn,
  pressOn,
} from "@/components/workforce/workforce-timeline";
import { CAPTIONS, URLS } from "./data";

export const STEP85_DURATION_MS = 18000;

export async function runStep85(tl: Timeline) {
  beginWorkforce(tl, URLS.recruitment, "recruitment", "overview", [0.62, 0.16], true);
  tl.setVar("wfRecruitmentTab", "archives");
  tl.setVar("wfScheduleInterviewModalOpen", false);
  tl.setVar("wfInterviewCandidateSelectOpen", false);
  tl.setVar("wfInterviewCandidateSelected", false);
  tl.setVar("wfInterviewersSelectOpen", false);
  tl.setVar("wfInterviewersSelected", []);
  tl.setVar("wfInterviewTypeSelectOpen", false);

  // 1. Click Interviews tab
  await tl.at(500);
  tl.showCaption(CAPTIONS.clickInterviews);
  await pressOn(tl, "[data-tl=tab-recruitment-interviews]", { ms: 600 });
  tl.setVar("wfRecruitmentTab", "interviews");
  await tl.wait(400);

  // 2. Click + Schedule Interview
  await tl.at(2800);
  tl.showCaption(CAPTIONS.clickSchedule);
  await pressOn(tl, "[data-tl=btn-schedule-interview]", { ms: 600 });
  tl.setVar("wfScheduleInterviewModalOpen", true);
  await tl.wait(400);

  // 3. Search and select candidate Alex Morgan
  await tl.at(5200);
  tl.showCaption(CAPTIONS.selectCandidate);
  await pressOn(tl, "[data-tl=input-search-candidate]", { ms: 500 });
  tl.setVar("wfInterviewCandidateSelectOpen", true);
  await tl.wait(300);

  await tl.at(6800);
  await pressOn(tl, "[data-tl=opt-candidate-alex]", { ms: 450 });
  tl.setVar("wfInterviewCandidateSelected", true);
  tl.setVar("wfInterviewCandidateSelectOpen", false);
  await tl.wait(300);

  // 4. Select interviewers Alex Morgan and Jordan Lee
  await tl.at(8800);
  tl.showCaption(CAPTIONS.selectInterviewers);
  await pressOn(tl, "[data-tl=input-search-interviewers]", { ms: 500 });
  tl.setVar("wfInterviewersSelectOpen", true);
  await tl.wait(300);

  await tl.at(10200);
  await pressOn(tl, "[data-tl=opt-interviewer-alex]", { ms: 400 });
  tl.setVar("wfInterviewersSelected", ["Alex Morgan"]);
  await tl.wait(300);

  await tl.at(11500);
  await pressOn(tl, "[data-tl=opt-interviewer-jordan]", { ms: 400 });
  tl.setVar("wfInterviewersSelected", ["Alex Morgan", "Jordan Lee"]);
  tl.setVar("wfInterviewersSelectOpen", false);
  await tl.wait(300);

  // 5. Select interview type
  await tl.at(13000);
  tl.showCaption(CAPTIONS.selectType);
  await tl.scrollPanelTo("[data-scroller=modal-schedule-interview]", 200, 400);
  await pressOn(tl, "[data-tl=select-interview-type]", { ms: 450 });
  tl.setVar("wfInterviewTypeSelectOpen", true);
  await tl.wait(300);
  await hoverOn(tl, "[data-tl=opt-type-video]", { ms: 350 });
  await tl.wait(200);
  tl.setVar("wfInterviewTypeSelectOpen", false);

  // 6. Click into Duration
  await tl.at(14800);
  tl.showCaption(CAPTIONS.focusDuration);
  await pressOn(tl, "[data-tl=input-interview-duration]", { ms: 500 });
  await tl.wait(300);

  // 7. Click Cancel
  await tl.at(16200);
  tl.showCaption(CAPTIONS.clickCancel);
  await pressOn(tl, "[data-tl=btn-cancel-schedule-interview]", { ms: 500 });
  tl.setVar("wfScheduleInterviewModalOpen", false);
  await tl.wait(300);

  // Finish
  await tl.at(17400);
  await finishWorkforce(tl);
}
