"use client";

import type { ReactNode } from "react";
import type { Timeline } from "@/lib/timeline";
import { useTimelineVar } from "@/lib/useTimelineVar";
import { DashboardView } from "./DashboardView";
import { ExitTasksView } from "./ExitTasksView";
import { HolidaysView } from "./HolidaysView";
import { HrCasesView } from "./HrCasesView";
import { MySpaceOverviewView } from "./MySpaceOverviewView";
import { OnboardingListView } from "./OnboardingListView";
import { OnboardingRecordView } from "./OnboardingRecordView";
import { ProfileView } from "./ProfileView";
import { ResignationView } from "./ResignationView";
import { SalaryAdvancesView } from "./SalaryAdvancesView";
import { TaskDetailView } from "./TaskDetailView";
import { AttendanceView } from "./AttendanceView";
import { LeaveTrackerView } from "./LeaveTrackerView";
import { TimeTrackerView } from "./TimeTrackerView";
import { GoalsView } from "./GoalsView";
import {
  AppraisalsView,
  ReviewFormView,
  ReviewResultView,
} from "./AppraisalsView";
import { PoliciesView } from "./PoliciesView";
import { LearningHubView } from "./LearningHubView";
import { NotificationsView } from "./NotificationsView";
import { AppraisalManagementView } from "./AppraisalManagementView";
import { CycleCreationFormView } from "./CycleCreationFormView";
import { AdminReviewDetailView } from "./AdminReviewDetailView";
import { PayrollView } from "./PayrollView";
import { RecruitmentView } from "./RecruitmentView";
import { CareersPageView } from "./CareersPageView";
import { EmailTemplatesView } from "./EmailTemplatesView";
import { ComplianceView } from "./ComplianceView";
import { LifecycleView } from "./LifecycleView";
import { AdminHrCasesView } from "./AdminHrCasesView";
import { AdminAnnouncementsView } from "./AdminAnnouncementsView";
import { AdminShiftsView } from "./AdminShiftsView";
import { AdminHolidaysView } from "./AdminHolidaysView";
import { AdminTrainingView, type AdminTrainingSubpage } from "./AdminTrainingView";
import { AdminReportsView } from "./AdminReportsView";
import { AdminPanelEmbedView } from "./AdminPanelEmbedView";
import { WorkforceShell } from "./WorkforceShell";
import { URLS, type MySpaceSubId, type WorkforceNavId } from "./workforce-data";

export type WorkforcePage =
  | "dashboard"
  | "my-space"
  | "onboarding"
  | "onboarding-record"
  | "task-detail"
  | "profile"
  | "salary-advances"
  | "resignation"
  | "exit-tasks"
  | "holidays"
  | "hr-cases"
  | "attendance"
  | "leave"
  | "time-tracker"
  | "goals"
  | "performance"
  | "performance-review"
  | "performance-result"
  | "policies"
  | "policies-folder"
  | "policy-details"
  | "learning"
  | "learning-course"
  | "notifications"
  | "appraisal-management"
  | "cycle-new"
  | "admin-review-detail"
  | "payroll"
  | "recruitment"
  | "careers-page"
  | "email-templates"
  | "compliance"
  | "lifecycle-onboarding"
  | "lifecycle-offboarding"
  | "admin-hr-cases"
  | "announcements"
  | "shifts"
  | "admin-holidays"
  | "training-dashboard"
  | "training-courses"
  | "training-categories"
  | "training-assignments"
  | "reports"
  | "reports-attendance"
  | "reports-leave"
  | "reports-headcount"
  | "reports-onboarding"
  | "admin-panel-dashboard";

type Props = {
  tl: Timeline;
  startPage?: WorkforcePage;
  startSubpage?: MySpaceSubId;
  overlay?: ReactNode;
};

export function WorkforceStage({
  tl,
  startPage = "dashboard",
  startSubpage = "overview",
  overlay,
}: Props) {
  const page = useTimelineVar<WorkforcePage>(tl, "wfPage", startPage);
  const subpage = useTimelineVar<MySpaceSubId>(tl, "wfSubpage", startSubpage);
  const fade = useTimelineVar(tl, "fade", false);

  // Map current page to sidebar activeNav and activeSub
  let activeNav: WorkforceNavId = "dashboard";
  let activeSub: MySpaceSubId | undefined = undefined;
  let topTitle = "Dashboard";

  if (page === "dashboard") {
    activeNav = "dashboard";
    topTitle = "Dashboard";
  } else if (page === "my-space") {
    activeNav = "my-space";
    activeSub = subpage || "overview";
    topTitle = "My Space";
  } else if (page === "onboarding") {
    activeNav = "my-space";
    activeSub = "onboarding";
    topTitle = "My Space";
  } else if (page === "onboarding-record") {
    activeNav = "my-space";
    activeSub = "onboarding";
    topTitle = "Workforce";
  } else if (page === "task-detail") {
    activeNav = "my-space";
    activeSub = "onboarding";
    topTitle = "Workforce";
  } else if (page === "profile") {
    activeNav = "my-space";
    activeSub = "profile";
    topTitle = "My Profile";
  } else if (page === "salary-advances") {
    activeNav = "my-space";
    activeSub = "salary-advances";
    topTitle = "Salary advances";
  } else if (page === "resignation") {
    activeNav = "my-space";
    activeSub = "resignation";
    topTitle = "My Space";
  } else if (page === "exit-tasks") {
    activeNav = "my-space";
    activeSub = "exit-tasks";
    topTitle = "My Space";
  } else if (page === "holidays") {
    activeNav = "my-space";
    activeSub = "holidays";
    topTitle = "Organization";
  } else if (page === "hr-cases") {
    activeNav = "my-space";
    activeSub = "hr-cases";
    topTitle = "HR Cases";
  } else if (page === "attendance") {
    activeNav = "attendance";
    topTitle = "Attendance";
  } else if (page === "leave") {
    activeNav = "leave";
    topTitle = "Leave";
  } else if (page === "time-tracker") {
    activeNav = "time-tracker";
    topTitle = "Time Tracker";
  } else if (page === "goals") {
    activeNav = "goals";
    topTitle = "Goals";
  } else if (
    page === "performance" ||
    page === "performance-review" ||
    page === "performance-result"
  ) {
    activeNav = "appraisals";
    topTitle = "My Appraisals";
  } else if (
    page === "policies" ||
    page === "policies-folder" ||
    page === "policy-details"
  ) {
    activeNav = "policies";
    topTitle = "Workforce";
  } else if (page === "learning" || page === "learning-course") {
    activeNav = "learning-hub";
    topTitle = "Learning Hub";
  } else if (page === "notifications") {
    activeNav = "notifications";
    topTitle = "Notifications";
  } else if (page === "appraisal-management" || page === "cycle-new") {
    activeNav = "appraisal-management";
    topTitle = "Appraisal Management";
  } else if (page === "admin-review-detail") {
    activeNav = "appraisals";
    topTitle = "My Appraisals";
  } else if (page === "payroll") {
    activeNav = "payroll";
    topTitle = "Payroll";
  } else if (page === "recruitment") {
    activeNav = "recruitment";
    topTitle = "Recruitment";
  } else if (page === "email-templates") {
    activeNav = "email-templates";
    topTitle = "Email templates";
  } else if (page === "compliance") {
    activeNav = "compliance";
    topTitle = "Workforce";
  } else if (page === "lifecycle-onboarding") {
    activeNav = "lifecycle";
    topTitle = "Workforce";
  } else if (page === "lifecycle-offboarding") {
    activeNav = "lifecycle";
    topTitle = "Offboarding";
  } else if (page === "admin-hr-cases") {
    activeNav = "hr-cases-manage";
    topTitle = "HR Cases";
  } else if (page === "announcements") {
    activeNav = "announcements";
    topTitle = "Announcements";
  } else if (page === "shifts") {
    activeNav = "shifts";
    topTitle = "Shifts";
  } else if (page === "admin-holidays") {
    activeNav = "holidays-manage";
    topTitle = "Holidays";
  } else if (page.startsWith("training-")) {
    activeNav = "training";
    topTitle = "Training";
  } else if (page.startsWith("reports")) {
    activeNav = "reports";
    topTitle = "Reports";
  } else if (page === "admin-panel-dashboard") {
    activeNav = "admin-panel";
    topTitle = "Admin Dashboard";
  }

  const handleNavigateNav = (nav: WorkforceNavId) => {
    if (nav === "dashboard") {
      tl.setVar("wfPage", "dashboard");
      tl.setUrl(URLS.dashboard);
    } else if (nav === "my-space") {
      tl.setVar("wfPage", "my-space");
      tl.setVar("wfSubpage", "overview");
      tl.setUrl(URLS.mySpace);
    } else if (nav === "attendance") {
      tl.setVar("wfPage", "attendance");
      tl.setUrl(URLS.attendance);
    } else if (nav === "leave") {
      tl.setVar("wfPage", "leave");
      tl.setUrl(URLS.leave);
    } else if (nav === "time-tracker") {
      tl.setVar("wfPage", "time-tracker");
      tl.setUrl(URLS.timeTracker);
    } else if (nav === "goals") {
      tl.setVar("wfPage", "goals");
      tl.setUrl(URLS.goals);
    } else if (nav === "appraisals") {
      tl.setVar("wfPage", "performance");
      tl.setUrl(URLS.performance);
    } else if (nav === "policies") {
      tl.setVar("wfPage", "policies");
      tl.setUrl(URLS.policies);
    } else if (nav === "learning-hub") {
      tl.setVar("wfPage", "learning");
      tl.setUrl(URLS.learning);
    } else if (nav === "notifications") {
      tl.setVar("wfPage", "notifications");
      tl.setVar("wfUnreadCount", 0);
      tl.setUrl(URLS.notifications);
    } else if (nav === "appraisal-management") {
      tl.setVar("wfPage", "appraisal-management");
      tl.setUrl(URLS.appraisalManagement);
    } else if (nav === "payroll") {
      tl.setVar("wfPage", "payroll");
      tl.setUrl(URLS.payroll);
    } else if (nav === "recruitment") {
      tl.setVar("wfPage", "recruitment");
      tl.setUrl(URLS.recruitment);
    } else if (nav === "email-templates") {
      tl.setVar("wfPage", "email-templates");
      tl.setUrl(URLS.emailTemplates);
    } else if (nav === "compliance") {
      tl.setVar("wfPage", "compliance");
      tl.setUrl(URLS.compliance);
    } else if (nav === "lifecycle") {
      tl.setVar("wfPage", "lifecycle-onboarding");
      tl.setVar("wfLifecycleTab", "onboarding");
      tl.setUrl(URLS.onboardingAdmin);
    } else if (nav === "hr-cases-manage") {
      tl.setVar("wfPage", "admin-hr-cases");
      tl.setUrl(URLS.hrCasesAdmin);
    } else if (nav === "announcements") {
      tl.setVar("wfPage", "announcements");
      tl.setUrl(URLS.announcements);
    } else if (nav === "shifts") {
      tl.setVar("wfPage", "shifts");
      tl.setUrl(URLS.shifts);
    } else if (nav === "holidays-manage") {
      tl.setVar("wfPage", "admin-holidays");
      tl.setUrl(URLS.holidaysAdmin);
    } else if (nav === "training") {
      tl.setVar("wfPage", "training-dashboard");
      tl.setVar("wfTrainingSub", "dashboard");
      tl.setUrl(URLS.trainingDashboard);
    } else if (nav === "reports") {
      tl.setVar("wfPage", "reports");
      tl.setVar("wfReportsSub", "hub");
      tl.setUrl(URLS.reports);
    } else if (nav === "admin-panel") {
      tl.setVar("wfPage", "admin-panel-dashboard");
      tl.setUrl(URLS.adminPanel);
    }
  };

  const handleNavigateSub = (sub: MySpaceSubId | string) => {
    if (sub === "dashboard" || sub === "courses" || sub === "categories" || sub === "assignments") {
      tl.setVar("wfPage", `training-${sub}` as WorkforcePage);
      tl.setVar("wfTrainingSub", sub);
      if (sub === "dashboard") tl.setUrl(URLS.trainingDashboard);
      if (sub === "courses") tl.setUrl(URLS.trainingCourses);
      if (sub === "categories") tl.setUrl(URLS.trainingCategories);
      if (sub === "assignments") tl.setUrl(URLS.trainingAssignments);
      return;
    }
    tl.setVar("wfSubpage", sub as MySpaceSubId);
    if (sub === "overview") {
      tl.setVar("wfPage", "my-space");
      tl.setUrl(URLS.mySpace);
    } else if (sub === "onboarding") {
      tl.setVar("wfPage", "onboarding");
      tl.setUrl(URLS.onboarding);
    } else if (sub === "profile") {
      tl.setVar("wfPage", "profile");
      tl.setUrl(URLS.profile);
    } else if (sub === "salary-advances") {
      tl.setVar("wfPage", "salary-advances");
      tl.setUrl(URLS.salaryAdvances);
    } else if (sub === "resignation") {
      tl.setVar("wfPage", "resignation");
      tl.setUrl(URLS.resignation);
    } else if (sub === "exit-tasks") {
      tl.setVar("wfPage", "exit-tasks");
      tl.setUrl(URLS.exitTasks);
    } else if (sub === "holidays") {
      tl.setVar("wfPage", "holidays");
      tl.setUrl(URLS.holidays);
    } else if (sub === "hr-cases") {
      tl.setVar("wfPage", "hr-cases");
      tl.setUrl(URLS.hrCases);
    }
  };

  if (page === "careers-page") {
    return (
      <div
        data-scroller
        className="relative h-full w-full overflow-hidden bg-[#F9FAFB] text-[#111827] font-['Poppins',sans-serif]"
      >
        <CareersPageView tl={tl} />
        <div
          className={`pointer-events-none absolute inset-0 z-[60] bg-white transition-opacity duration-300 motion-reduce:transition-none ${
            fade ? "opacity-100" : "opacity-0"
          }`}
        />
      </div>
    );
  }

  if (page === "admin-panel-dashboard") {
    return (
      <div
        data-scroller
        className="relative h-full w-full overflow-hidden bg-[#F9FAFB] text-[#111827] font-['Poppins',sans-serif]"
      >
        <AdminPanelEmbedView
          tl={tl}
          onBackToWorkforce={() => {
            tl.setVar("wfPage", "reports");
            tl.setUrl(URLS.reports);
          }}
        />
        <div
          className={`pointer-events-none absolute inset-0 z-[60] bg-white transition-opacity duration-300 motion-reduce:transition-none ${
            fade ? "opacity-100" : "opacity-0"
          }`}
        />
      </div>
    );
  }

  return (
    <WorkforceShell
      tl={tl}
      title={topTitle}
      activeNav={activeNav}
      activeSub={activeSub}
      onNavigateNav={handleNavigateNav}
      onNavigateSub={handleNavigateSub}
      overlay={overlay}
    >
      {page === "dashboard" && <DashboardView tl={tl} />}
      {page === "my-space" && (
        <MySpaceOverviewView
          tl={tl}
          onNavigateSub={(s) => {
            if (s === "profile") {
              tl.setVar("wfPage", "profile");
              tl.setVar("wfSubpage", "profile");
              tl.setUrl(URLS.profile);
            }
          }}
        />
      )}
      {page === "onboarding" && (
        <OnboardingListView
          tl={tl}
          onOpenRecord={() => {
            tl.setVar("wfPage", "onboarding-record");
            tl.setUrl(URLS.onboardingRecord);
          }}
        />
      )}
      {page === "onboarding-record" && (
        <OnboardingRecordView
          tl={tl}
          onBack={() => {
            tl.setVar("wfPage", "onboarding");
            tl.setUrl(URLS.onboarding);
          }}
          onOpenTaskDetail={() => {
            tl.setVar("wfPage", "task-detail");
            tl.setUrl(URLS.taskDetail);
          }}
        />
      )}
      {page === "task-detail" && (
        <TaskDetailView
          tl={tl}
          onBack={() => {
            tl.setVar("wfPage", "onboarding-record");
            tl.setVar("wfActiveRecordTab", "checklist");
            tl.setUrl(URLS.onboardingRecord);
          }}
        />
      )}
      {page === "profile" && (
        <ProfileView
          tl={tl}
          onBack={() => {
            tl.setVar("wfPage", "my-space");
            tl.setVar("wfSubpage", "overview");
            tl.setUrl(URLS.mySpace);
          }}
        />
      )}
      {page === "salary-advances" && (
        <SalaryAdvancesView
          tl={tl}
          onBack={() => {
            tl.setVar("wfPage", "my-space");
            tl.setVar("wfSubpage", "overview");
            tl.setUrl(URLS.mySpace);
          }}
        />
      )}
      {page === "resignation" && (
        <ResignationView
          tl={tl}
          onBack={() => {
            tl.setVar("wfPage", "salary-advances");
            tl.setVar("wfSubpage", "salary-advances");
            tl.setUrl(URLS.salaryAdvances);
          }}
        />
      )}
      {page === "exit-tasks" && (
        <ExitTasksView
          tl={tl}
          onBack={() => {
            tl.setVar("wfPage", "resignation");
            tl.setVar("wfSubpage", "resignation");
            tl.setUrl(URLS.resignation);
          }}
        />
      )}
      {page === "holidays" && (
        <HolidaysView
          tl={tl}
          onBack={() => {
            tl.setVar("wfPage", "exit-tasks");
            tl.setVar("wfSubpage", "exit-tasks");
            tl.setUrl(URLS.exitTasks);
          }}
        />
      )}
      {page === "hr-cases" && (
        <HrCasesView
          tl={tl}
          onBack={() => {
            tl.setVar("wfPage", "holidays");
            tl.setVar("wfSubpage", "holidays");
            tl.setUrl(URLS.holidays);
          }}
        />
      )}
      {page === "attendance" && <AttendanceView tl={tl} />}
      {page === "leave" && (
        <LeaveTrackerView
          tl={tl}
          onBack={() => {
            tl.setVar("wfPage", "attendance");
            tl.setUrl(URLS.attendance);
          }}
        />
      )}
      {page === "time-tracker" && (
        <TimeTrackerView
          tl={tl}
          onBack={() => {
            tl.setVar("wfPage", "leave");
            tl.setUrl(URLS.leave);
          }}
        />
      )}
      {page === "goals" && (
        <GoalsView
          tl={tl}
          onBack={() => {
            tl.setVar("wfPage", "time-tracker");
            tl.setUrl(URLS.timeTracker);
          }}
        />
      )}
      {page === "performance" && (
        <AppraisalsView
          tl={tl}
          onBack={() => {
            tl.setVar("wfPage", "goals");
            tl.setUrl(URLS.goals);
          }}
          onOpenReview={() => {
            tl.setVar("wfPage", "performance-review");
            tl.setUrl(URLS.performanceReview);
          }}
          onViewResult={() => {
            tl.setVar("wfPage", "performance-result");
            tl.setUrl(URLS.performanceReview);
          }}
        />
      )}
      {page === "performance-review" && (
        <ReviewFormView
          tl={tl}
          onBack={() => {
            tl.setVar("wfPage", "performance");
            tl.setUrl(URLS.performance);
          }}
        />
      )}
      {page === "performance-result" && (
        <ReviewResultView
          _tl={tl}
          onBack={() => {
            tl.setVar("wfPage", "performance");
            tl.setUrl(URLS.performance);
          }}
        />
      )}
      {(page === "policies" ||
        page === "policies-folder" ||
        page === "policy-details") && <PoliciesView tl={tl} />}
      {(page === "learning" || page === "learning-course") && (
        <LearningHubView tl={tl} />
      )}
      {page === "notifications" && <NotificationsView tl={tl} />}
      {page === "appraisal-management" && (
        <AppraisalManagementView
          tl={tl}
          onCreateCycle={() => {
            tl.setVar("wfPage", "cycle-new");
            tl.setUrl(URLS.cycleNew);
          }}
          onViewReview={() => {
            tl.setVar("wfPage", "admin-review-detail");
            tl.setUrl(URLS.reviewSample);
          }}
        />
      )}
      {page === "cycle-new" && (
        <CycleCreationFormView
          tl={tl}
          onCancel={() => {
            tl.setVar("wfPage", "appraisal-management");
            tl.setUrl(URLS.appraisalManagement);
          }}
        />
      )}
      {page === "admin-review-detail" && (
        <AdminReviewDetailView
          tl={tl}
          onBack={() => {
            tl.setVar("wfPage", "appraisal-management");
            tl.setUrl(URLS.appraisalManagement);
          }}
        />
      )}
      {page === "payroll" && <PayrollView tl={tl} />}
      {page === "recruitment" && <RecruitmentView tl={tl} />}
      {page === "email-templates" && <EmailTemplatesView tl={tl} />}
      {page === "compliance" && <ComplianceView tl={tl} />}
      {(page === "lifecycle-onboarding" ||
        page === "lifecycle-offboarding") && <LifecycleView tl={tl} />}
      {page === "admin-hr-cases" && <AdminHrCasesView tl={tl} />}
      {page === "announcements" && <AdminAnnouncementsView tl={tl} />}
      {page === "shifts" && <AdminShiftsView tl={tl} />}
      {page === "admin-holidays" && <AdminHolidaysView tl={tl} />}
      {page.startsWith("training-") && (
        <AdminTrainingView
          tl={tl}
          subpage={page.replace("training-", "") as AdminTrainingSubpage}
        />
      )}
      {page === "reports" && <AdminReportsView tl={tl} subpage="hub" />}
      {page === "reports-attendance" && (
        <AdminReportsView tl={tl} subpage="attendance" />
      )}
      {page === "reports-leave" && (
        <AdminReportsView tl={tl} subpage="leave" />
      )}
      {page === "reports-headcount" && (
        <AdminReportsView tl={tl} subpage="headcount" />
      )}
      {page === "reports-onboarding" && (
        <AdminReportsView tl={tl} subpage="onboarding" />
      )}
      <div
        className={`pointer-events-none absolute inset-0 z-[60] bg-white transition-opacity duration-300 motion-reduce:transition-none ${
          fade ? "opacity-100" : "opacity-0"
        }`}
      />
    </WorkforceShell>
  );
}
