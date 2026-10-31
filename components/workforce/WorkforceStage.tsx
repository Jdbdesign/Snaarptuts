"use client";

import type { ReactNode } from "react";
import type { Timeline } from "@/lib/timeline";
import { useTimelineVar } from "@/lib/useTimelineVar";
import { DashboardView } from "./DashboardView";
import { MySpaceOverviewView } from "./MySpaceOverviewView";
import { OnboardingListView } from "./OnboardingListView";
import { OnboardingRecordView } from "./OnboardingRecordView";
import { ProfileView } from "./ProfileView";
import { TaskDetailView } from "./TaskDetailView";
import { WorkforceShell } from "./WorkforceShell";
import { URLS, type ActivityTabId, type MySpaceSubId, type WorkforceNavId } from "./workforce-data";

export type WorkforcePage =
  | "dashboard"
  | "my-space"
  | "onboarding"
  | "onboarding-record"
  | "task-detail"
  | "profile";

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
    </WorkforceShell>
  );
}
