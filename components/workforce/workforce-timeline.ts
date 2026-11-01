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
  cursor: [number, number] = [0.5, 0.42],
  adminMode: boolean = false
) {
  tl.placeCursor(cursor[0], cursor[1]);
  tl.setUrl(url);
  tl.setVar("wfAdminMode", adminMode);
  tl.setVar("wfPage", page);
  tl.setVar("wfSubpage", subpage);
  tl.setVar("wfSidebarCollapsed", false);
  tl.setVar("wfMySpaceExpanded", page !== "dashboard" && !adminMode);
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
  tl.setVar("wfPolicyViewerOpen", false);
  tl.setVar("wfCertificateViewerOpen", false);
  tl.setVar("wfCertificateToast", false);
  tl.setVar("wfLearningTab", "hub");
  tl.setVar("wfLearningCategoryOpen", false);
  tl.setVar("wfLearningLoading", false);
  tl.setVar("wfLessonState", "ready");
  tl.setVar("wfLessonSeconds", 0);
  tl.setVar("wfLessonCompleted", false);
  tl.setVar("wfCourseCompleted", false);
  tl.setVar("wfLessonSpinner", false);
  // Admin variables (Steps 55+)
  tl.setVar("wfAppraisalTab", "cycles");
  tl.setVar("wfCycleOverridesOpen", false);
  tl.setVar("wfCycleParticipants", "all");
  tl.setVar("wfCycleTypeSelectOpen", false);
  tl.setVar("wfCycleType", "ANNUAL");
  tl.setVar("wfCycleSelfDueOpen", false);
  tl.setVar("wfCycleFallbackSelectOpen", false);
  tl.setVar("wfCycleQuestionsSelectOpen", false);
  tl.setVar("wfWorkLocationSelectOpen", false);
  tl.setVar("wfRepeatSelectOpen", false);
  tl.setVar("wfAppraisalReviewerSelectOpen", false);
  tl.setVar("wfTemplateMenuOpen", null);
  tl.setVar("wfPayrollTab", "salary-components");
  tl.setVar("wfAddComponentModalOpen", false);
  tl.setVar("wfAssignSalaryModalOpen", false);
  tl.setVar("wfAssignSalaryComponentAdded", false);
  tl.setVar("wfPayrunPaid", false);
  tl.setVar("wfCreatePayRunOpen", false);
  tl.setVar("wfPayRunSelectedEmployees", ["alex-morgan"]);
  tl.setVar("wfPayRunStatus", "PROCESSING");
  tl.setVar("wfAdvanceMenuOpenId", null);
  tl.setVar("wfAdvancePolicyModalOpen", false);
  tl.setVar("wfPayrollSubview", "main");
  tl.setVar("wfImportSalariesModalOpen", false);
  tl.setVar("wfImportPayrollFile", null);
  tl.setVar("wfPayrollTransferModalOpen", false);
  tl.setVar("wfTransferConfirmed", false);
  tl.setVar("wfTransferToast", false);
  tl.setVar("wfTaxEmployee", null);
  tl.setVar("wfTaxAdjustOpen", false);
  tl.setVar("wfTaxCalculated", false);
  tl.setVar("wfPensionEmployee", null);
  tl.setVar("wfPensionCalculated", false);
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
export async function finishWorkforce(tl: Timeline, atMs?: number, endMs?: number) {
  if (atMs !== undefined) {
    await tl.at(atMs);
  }
  tl.clearHighlight();
  tl.hideCaption();
  tl.setVar("fade", true);
  if (endMs !== undefined) {
    await tl.at(endMs);
  }
}

