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
  | "hr-cases";

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
  }

  const handleNavigateNav = (nav: WorkforceNavId) => {
    if (nav === "dashboard") {
      tl.setVar("wfPage", "dashboard");
      tl.setUrl(URLS.dashboard);
    } else if (nav === "my-space") {
      tl.setVar("wfPage", "my-space");
      tl.setVar("wfSubpage", "overview");
      tl.setUrl(URLS.mySpace);
    }
  };

  const handleNavigateSub = (sub: MySpaceSubId) => {
    tl.setVar("wfSubpage", sub);
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
      <div
        className={`pointer-events-none absolute inset-0 z-[60] bg-white transition-opacity duration-300 motion-reduce:transition-none ${
          fade ? "opacity-100" : "opacity-0"
        }`}
      />
    </WorkforceShell>
  );
}
