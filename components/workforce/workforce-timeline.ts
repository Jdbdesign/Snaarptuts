import type { Timeline } from "@/lib/timeline";
import { URLS, type MySpaceSubId } from "./workforce-data";
import type { WorkforcePage } from "./WorkforceStage";

// Re-export generic house helpers from sheets-timeline
export { pressOn, hoverOn, ring, endFade } from "@/components/sheets/sheets-timeline";

/**
 * Resets Workforce scene variables to a clean starting state for any step.
 */
export function beginWorkforce(
  tl: Timeline,
  url: string = URLS.dashboard,
  page: WorkforcePage = "dashboard",
  subpage: MySpaceSubId = "overview",
  cursor: [number, number] = [0.5, 0.42]
) {
  tl.placeCursor(cursor[0], cursor[1]);
  tl.setUrl(url);
  tl.setVar("wfPage", page);
  tl.setVar("wfSubpage", subpage);
  tl.setVar("wfSidebarCollapsed", false);
  tl.setVar("wfMySpaceExpanded", page !== "dashboard");
  tl.setVar("wfOpenPopover", null);
  tl.setVar("wfUnreadCount", 1);
  tl.setVar("wfActiveTaskTab", "tasks");
  tl.setVar("wfActiveActivityTab", "activities");
  tl.setVar("wfCheckedIn", true);
  tl.setVar("wfOnboardingStatus", "Active");
  tl.setVar("wfActiveRecordTab", "overview");
  tl.setVar("wfSalaryAdvanceModalOpen", false);
  tl.setVar("wfAdvanceMenuOpen", false);
  tl.setVar("wfResignationLoading", false);
  tl.setVar("wfHrCaseModalOpen", false);
  tl.setVar("wfSubmitGrievanceModalOpen", false);
  tl.setVar("wfGrievanceTypeDropdownOpen", false);
  tl.setVar("wfGrievanceDatePickerOpen", false);
  tl.setVar("wfGrievanceType", "Bullying");
  tl.setVar("wfGrievanceDate", "");
  tl.setVar("wfAttendanceSeconds", 13 * 60 + 16);
  tl.setVar("wfAttendanceCheckedIn", true);
  tl.setVar("wfAttendanceLoading", false);
  tl.setVar("wfAttendanceTab", "calendar");
  tl.setVar("wfLeaveTab", "summary");
  tl.setVar("wfLeaveLoading", false);
  tl.setVar("wfRequestLeaveOpen", false);
  tl.setVar("wfLeaveDetailsOpen", false);
  tl.setVar("wfTimeProject", "No project");
  tl.setVar("wfTimeJob", "General work");
  tl.setVar("wfTimeRunning", false);
  tl.setVar("wfTimeSeconds", 0);
  tl.setVar("wfTimeTab", "projects");
  tl.setVar("wfTimeProjectsLoading", false);
  tl.setVar("wfTimeScheduleMode", "week");
  tl.setVar("wfTimeProjectDropdownOpen", false);
  tl.setVar("wfTimeJobDropdownOpen", false);
  tl.setVar("wfGoalsTab", "goals");
  tl.setVar("wfEditGoalOpen", false);
  tl.setVar("wfGoalProgress", 54);
  tl.setVar("wfKpiDetailsOpen", false);
  tl.setVar("wfAppraisalsTab", "my-reviews");
  tl.setVar("wfReviewObjectivesOpen", false);
  tl.setVar("wfReviewAnswers", {});
  tl.setVar("wfReviewSkills", "");
  tl.setVar("wfReviewComments", "");
  tl.setVar("wfReviewSubmitting", false);
  tl.setVar("wfReviewSubmitted", false);
  tl.setVar("wfActiveReviewSelect", null);
  tl.setVar("fade", false);
}

export async function openNotifications(tl: Timeline) {
  await tl.moveCursorTo("[data-tl=top-bell]", { ms: 600 });
  tl.highlight("[data-tl=top-bell]");
  await tl.wait(150);
  await tl.click("[data-tl=top-bell]");
  tl.clearHighlight();
  tl.setVar("wfOpenPopover", "notifications");
  await tl.wait(120);
}

export async function closePopovers(tl: Timeline) {
  tl.setVar("wfOpenPopover", null);
  await tl.wait(80);
}

/**
 * Standard white fade finish for Workforce steps.
 */
export async function finishWorkforce(tl: Timeline, atMs: number, endMs: number) {
  await tl.at(atMs);
  tl.clearHighlight();
  tl.hideCaption();
  tl.setVar("fade", true);
  await tl.at(endMs);
}

