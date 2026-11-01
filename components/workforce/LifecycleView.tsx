"use client";

import { useState } from "react";
import { Icon, type IconName } from "@/components/icons";
import type { Timeline } from "@/lib/timeline";
import { useTimelineVar } from "@/lib/useTimelineVar";
import {
  EXIT_DEFAULT_TEMPLATES,
  OFFBOARDING_DASHBOARD_RECORDS,
  OFFBOARDING_RESIGNATIONS,
  ONBOARDING_ADMIN_RECORDS,
  ONBOARDING_TEMPLATE_STANDARD,
  URLS,
} from "./workforce-data";

type Props = {
  tl: Timeline;
};

export function LifecycleView({ tl }: Props) {
  // Main lifecycle toggle
  const lifecycleTab = useTimelineVar<"onboarding" | "offboarding">(
    tl,
    "wfLifecycleTab",
    "onboarding"
  );

  // Onboarding sub-state
  const onboardingPill = useTimelineVar<"dashboard" | "templates">(
    tl,
    "wfOnboardingPill",
    "dashboard"
  );
  const onboardingStatusFilter = useTimelineVar<"Active" | "Completed">(
    tl,
    "wfOnboardingStatusFilter",
    "Active"
  );
  const [statusDropdownOpen, setStatusDropdownOpen] = useState(false);
  const onboardingSubpage = useTimelineVar<
    "dashboard" | "record" | "start" | "template-detail"
  >(tl, "wfOnboardingSubpage", "dashboard");
  const recordTab = useTimelineVar<
    "overview" | "checklist" | "documents" | "activity"
  >(tl, "wfOnboardingRecordTab", "overview");

  // Start onboarding form state
  const startEmployee = useTimelineVar(tl, "wfStartOnboardingEmployee", null);
  const startTemplate = useTimelineVar(tl, "wfStartOnboardingTemplate", null);
  const startHrOwner = useTimelineVar(tl, "wfStartOnboardingHrOwner", null);
  const startManager = useTimelineVar(tl, "wfStartOnboardingManager", null);
  const startWelcomeMessage = useTimelineVar(
    tl,
    "wfStartOnboardingMessage",
    ""
  );
  const [employeeDropdownOpen, setEmployeeDropdownOpen] = useState(false);
  const [hrOwnerDropdownOpen, setHrOwnerDropdownOpen] = useState(false);
  const [managerDropdownOpen, setManagerDropdownOpen] = useState(false);

  // Offboarding sub-state
  const offboardingSubTab = useTimelineVar<
    "dashboard" | "resignations" | "templates"
  >(tl, "wfOffboardingSubTab", "dashboard");
  const offboardingSubpage = useTimelineVar<"main" | "initiate">(
    tl,
    "wfOffboardingSubpage",
    "main"
  );

  // Initiate exit form state
  const exitEmployee = useTimelineVar(tl, "wfInitiateExitEmployee", null);
  const exitReason = useTimelineVar(tl, "wfInitiateExitReason", null);
  const exitDepartureType = useTimelineVar(
    tl,
    "wfInitiateExitDepartureType",
    "Voluntary"
  );
  const exitChecklist = useTimelineVar(tl, "wfInitiateExitChecklist", null);
  const [exitDepartureDropdownOpen, setExitDepartureDropdownOpen] =
    useState(false);

  // Resignation detail modal state
  const resignationMenuOpen = useTimelineVar(
    tl,
    "wfResignationMenuOpen",
    false
  );
  const resignationDetailModalOpen = useTimelineVar(
    tl,
    "wfResignationDetailModalOpen",
    false
  );

  // Exit template modal state
  const standardExitModalOpen = useTimelineVar(
    tl,
    "wfStandardExitModalOpen",
    false
  );

  return (
    <>
      <div
        data-scroller="lifecycle-page"
        className="flex-1 overflow-y-auto bg-[#F8F9FB] p-6 text-[#111827] font-['Poppins',sans-serif]"
      >
      <div className="flex flex-col gap-6 max-w-6xl mx-auto">
        {/* Top Header & Main Toggle */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div>
            <h1
              data-tl="lifecycle-title"
              className="text-xl font-bold tracking-tight text-[#111827]"
            >
              Lifecycle
            </h1>
            <p className="text-xs text-[#6B7280]">
              {lifecycleTab === "onboarding"
                ? "Manage new hire onboarding workflows and task checklists"
                : "Manage employee exits and offboarding processes"}
            </p>
          </div>

          {/* Big Pill Toggle: Onboarding / Offboarding */}
          <div className="flex items-center rounded-xl bg-[#E5E7EB]/60 p-1 self-start sm:self-auto">
            <button
              type="button"
              data-tl="toggle-lifecycle-onboarding"
              onClick={() => {
                tl.setVar("wfLifecycleTab", "onboarding");
                tl.setVar("wfPage", "lifecycle-onboarding");
                tl.setUrl(URLS.onboardingAdmin);
              }}
              className={`rounded-lg px-4 py-1.5 text-xs font-semibold transition-all cursor-pointer ${
                lifecycleTab === "onboarding"
                  ? "bg-[#7014D9] text-white shadow-2xs"
                  : "text-[#4B5563] hover:text-[#111827]"
              }`}
            >
              Onboarding
            </button>
            <button
              type="button"
              data-tl="toggle-lifecycle-offboarding"
              onClick={() => {
                tl.setVar("wfLifecycleTab", "offboarding");
                tl.setVar("wfPage", "lifecycle-offboarding");
                tl.setUrl(URLS.offboarding);
              }}
              className={`rounded-lg px-4 py-1.5 text-xs font-semibold transition-all cursor-pointer ${
                lifecycleTab === "offboarding"
                  ? "bg-[#7014D9] text-white shadow-2xs"
                  : "text-[#4B5563] hover:text-[#111827]"
              }`}
            >
              Offboarding
            </button>
          </div>
        </div>

        {/* ============================================================== */}
        {/* ONBOARDING SECTION */}
        {/* ============================================================== */}
        {lifecycleTab === "onboarding" && (
          <div className="flex flex-col gap-6">
            {/* Subpage 1: Dashboard or Templates List */}
            {onboardingSubpage === "dashboard" && (
              <>
                {/* Second row of pills & Start Onboarding button */}
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-[#E5E7EB] pb-3">
                  <div className="flex items-center gap-2">
                    <button
                      type="button"
                      data-tl="pill-onboarding-dashboard"
                      onClick={() => tl.setVar("wfOnboardingPill", "dashboard")}
                      className={`rounded-lg px-3.5 py-1.5 text-xs font-semibold transition-colors ${
                        onboardingPill === "dashboard"
                          ? "bg-[#7014D9] text-white"
                          : "bg-white border border-[#D1D5DB] text-[#4B5563] hover:bg-gray-50"
                      }`}
                    >
                      Dashboard
                    </button>
                    <button
                      type="button"
                      data-tl="pill-onboarding-templates"
                      onClick={() => tl.setVar("wfOnboardingPill", "templates")}
                      className={`rounded-lg px-3.5 py-1.5 text-xs font-semibold transition-colors ${
                        onboardingPill === "templates"
                          ? "bg-[#7014D9] text-white"
                          : "bg-white border border-[#D1D5DB] text-[#4B5563] hover:bg-gray-50"
                      }`}
                    >
                      Templates
                    </button>
                  </div>

                  {onboardingPill === "dashboard" ? (
                    <button
                      type="button"
                      data-tl="btn-start-onboarding"
                      onClick={() => {
                        tl.setVar("wfOnboardingSubpage", "start");
                        tl.setUrl(URLS.onboardingStart);
                      }}
                      className="flex items-center gap-1.5 rounded-xl bg-[#7014D9] px-4 py-2 text-xs font-semibold text-white shadow-2xs hover:bg-[#5B0FB3] transition-colors self-start sm:self-auto cursor-pointer"
                    >
                      <Icon name="plus" size={14} />
                      <span>Start onboarding</span>
                    </button>
                  ) : (
                    <button
                      type="button"
                      data-tl="btn-create-template"
                      className="flex items-center gap-1.5 rounded-xl bg-[#7014D9] px-4 py-2 text-xs font-semibold text-white shadow-2xs hover:bg-[#5B0FB3] transition-colors self-start sm:self-auto"
                    >
                      <Icon name="plus" size={14} />
                      <span>Create template</span>
                    </button>
                  )}
                </div>

                {/* Dashboard Pill Content */}
                {onboardingPill === "dashboard" && (
                  <div className="flex flex-col gap-6">
                    {/* Stat Cards */}
                    <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                      <div
                        data-tl="card-onboarding-active"
                        className="rounded-2xl border border-[#E5E7EB] bg-white p-5 shadow-2xs flex flex-col gap-1"
                      >
                        <span className="text-xs text-[#6B7280]">
                          Active onboarding
                        </span>
                        <span className="text-2xl font-bold text-[#111827]">
                          0
                        </span>
                      </div>
                      <div
                        data-tl="card-onboarding-awaiting"
                        className="rounded-2xl border border-[#E5E7EB] bg-white p-5 shadow-2xs flex flex-col gap-1"
                      >
                        <span className="text-xs text-[#6B7280]">
                          Awaiting review
                        </span>
                        <span className="text-2xl font-bold text-[#111827]">
                          0
                        </span>
                      </div>
                      <div
                        data-tl="card-onboarding-overdue"
                        className="rounded-2xl border border-[#E5E7EB] bg-white p-5 shadow-2xs flex flex-col gap-1"
                      >
                        <span className="text-xs text-[#6B7280]">
                          Overdue tasks
                        </span>
                        <span className="text-2xl font-bold text-[#111827]">
                          0
                        </span>
                      </div>
                    </div>

                    {/* Filter bar */}
                    <div className="flex flex-wrap items-center gap-3">
                      <div className="relative">
                        <input
                          type="text"
                          data-tl="input-search-onboarding"
                          placeholder="Search employee name"
                          className="h-9 w-64 rounded-xl border border-[#D1D5DB] bg-white pl-9 pr-3 text-xs focus:border-[#7014D9] focus:outline-none"
                        />
                        <Icon
                          name="search"
                          size={14}
                          className="absolute left-3 top-2.5 text-[#9CA3AF]"
                        />
                      </div>

                      <div className="relative">
                        <button
                          type="button"
                          data-tl="select-onboarding-status"
                          onClick={() =>
                            setStatusDropdownOpen(!statusDropdownOpen)
                          }
                          className="flex h-9 items-center justify-between gap-3 rounded-xl border border-[#D1D5DB] bg-white px-3 text-xs text-[#374151]"
                        >
                          <span>{onboardingStatusFilter}</span>
                          <Icon name="chevronDown" size={12} />
                        </button>
                        {statusDropdownOpen && (
                          <div
                            data-tl="dropdown-onboarding-status"
                            className="absolute left-0 top-11 z-30 w-36 rounded-xl border border-[#E5E7EB] bg-white py-1 shadow-lg text-xs"
                          >
                            <div
                              onClick={() => {
                                tl.setVar(
                                  "wfOnboardingStatusFilter",
                                  "Active"
                                );
                                setStatusDropdownOpen(false);
                              }}
                              className="px-3 py-1.5 hover:bg-purple-50 cursor-pointer"
                            >
                              Active
                            </div>
                            <div
                              data-tl="opt-status-completed"
                              onClick={() => {
                                tl.setVar(
                                  "wfOnboardingStatusFilter",
                                  "Completed"
                                );
                                setStatusDropdownOpen(false);
                              }}
                              className="px-3 py-1.5 hover:bg-purple-50 hover:text-[#7014D9] font-medium cursor-pointer"
                            >
                              Completed
                            </div>
                          </div>
                        )}
                      </div>
                    </div>

                    {/* Table Area */}
                    {onboardingStatusFilter === "Active" ? (
                      <div
                        data-tl="empty-onboarding-records"
                        className="rounded-2xl border border-[#E5E7EB] bg-white p-12 text-center text-xs text-[#6B7280] shadow-2xs flex flex-col items-center justify-center gap-2"
                      >
                        <p className="font-medium">
                          No onboarding records match your filters.
                        </p>
                        <div className="flex items-center gap-3 pt-4 text-xs text-[#9CA3AF]">
                          <span>Previous</span>
                          <span>Page 1</span>
                          <span>Next</span>
                        </div>
                      </div>
                    ) : (
                      <div className="rounded-2xl border border-[#E5E7EB] bg-white shadow-2xs overflow-hidden">
                        <table className="w-full text-left text-xs">
                          <thead>
                            <tr className="border-b border-[#E5E7EB] bg-[#F9FAFB] text-[#6B7280] font-semibold">
                              <th className="py-3 px-4">Employee</th>
                              <th className="py-3 px-4">Start date</th>
                              <th className="py-3 px-4">Progress</th>
                              <th className="py-3 px-4">Status</th>
                              <th className="py-3 px-4 text-right">Actions</th>
                            </tr>
                          </thead>
                          <tbody className="divide-y divide-[#F3F4F6]">
                            {ONBOARDING_ADMIN_RECORDS.map((rec) => (
                              <tr
                                key={rec.id}
                                data-tl="row-onboarding-alex"
                                className="hover:bg-gray-50"
                              >
                                <td className="py-3 px-4 font-semibold text-[#111827]">
                                  {rec.employee}
                                </td>
                                <td className="py-3 px-4 text-[#4B5563]">
                                  {rec.startDate}
                                </td>
                                <td className="py-3 px-4">
                                  <div className="flex items-center gap-2">
                                    <div className="h-1.5 w-24 rounded-full bg-gray-200 overflow-hidden">
                                      <div
                                        data-tl="progress-bar-5of5"
                                        className="h-full bg-emerald-500 w-full"
                                      />
                                    </div>
                                    <span className="text-[11px] text-[#6B7280]">
                                      {rec.progress}
                                    </span>
                                  </div>
                                </td>
                                <td className="py-3 px-4">
                                  <span className="rounded bg-emerald-50 px-2 py-0.5 text-[11px] font-semibold text-emerald-700 border border-emerald-200">
                                    {rec.status}
                                  </span>
                                </td>
                                <td className="py-3 px-4 text-right">
                                  <button
                                    type="button"
                                    data-tl="btn-view-onboarding-record"
                                    onClick={() => {
                                      tl.setVar(
                                        "wfOnboardingSubpage",
                                        "record"
                                      );
                                      tl.setUrl(URLS.onboardingRecordAdmin);
                                    }}
                                    className="rounded-lg border border-[#D1D5DB] px-3 py-1 text-xs font-semibold text-[#374151] hover:bg-gray-50"
                                  >
                                    View
                                  </button>
                                </td>
                              </tr>
                            ))}
                          </tbody>
                        </table>
                      </div>
                    )}
                  </div>
                )}

                {/* Templates Pill Content */}
                {onboardingPill === "templates" && (
                  <div className="flex flex-col gap-4">
                    <div
                      data-tl="card-template-standard"
                      onClick={() => {
                        tl.setVar("wfOnboardingSubpage", "template-detail");
                        tl.setUrl(URLS.onboardingTemplateStandard);
                      }}
                      className="rounded-2xl border border-[#E5E7EB] bg-white p-5 shadow-2xs hover:border-[#7014D9]/40 hover:shadow-xs transition-all cursor-pointer flex items-center justify-between"
                    >
                      <div>
                        <h3 className="font-bold text-sm text-[#111827]">
                          Standard onboarding
                        </h3>
                        <div className="text-xs text-[#6B7280] mt-0.5">
                          5 tasks · Version 2
                        </div>
                      </div>
                      <Icon
                        name="chevronRight"
                        size={16}
                        className="text-[#9CA3AF]"
                      />
                    </div>
                  </div>
                )}
              </>
            )}

            {/* Subpage 2: Onboarding Record Details (Step 91) */}
            {onboardingSubpage === "record" && (
              <div className="flex flex-col gap-6 text-xs">
                <button
                  type="button"
                  data-tl="btn-back-onboarding-dashboard"
                  onClick={() => {
                    tl.setVar("wfOnboardingSubpage", "dashboard");
                    tl.setUrl(URLS.onboardingAdmin);
                  }}
                  className="flex items-center gap-1.5 text-xs font-semibold text-[#7014D9] hover:underline w-fit"
                >
                  <Icon name="arrowLeft" size={14} />
                  <span>Back</span>
                </button>

                <div className="flex flex-col gap-1">
                  <h1
                    data-tl="record-employee-name"
                    className="text-xl font-bold tracking-tight text-[#111827]"
                  >
                    Alex Morgan
                  </h1>
                  <p className="text-xs text-[#6B7280]">
                    Standard onboarding / Version 1 / Start date 2026-10-30 /
                    Completed
                  </p>
                </div>

                {/* 100% complete card */}
                <div
                  data-tl="card-record-completion"
                  className="rounded-2xl border border-emerald-200 bg-emerald-50/40 p-4 shadow-2xs flex flex-col gap-2"
                >
                  <div className="flex items-center justify-between">
                    <span className="font-bold text-xs text-[#111827]">
                      100% complete
                    </span>
                    <span className="text-[11px] font-semibold text-emerald-700">
                      5 of 5 tasks
                    </span>
                  </div>
                  <div className="h-2 w-full rounded-full bg-gray-200 overflow-hidden">
                    <div className="h-full bg-emerald-500 w-full" />
                  </div>
                </div>

                {/* Pill Tabs */}
                <div className="flex border-b border-[#E5E7EB] gap-2 pt-2">
                  {[
                    { id: "overview", label: "Overview" },
                    { id: "checklist", label: "Checklist" },
                    { id: "documents", label: "Documents" },
                    { id: "activity", label: "Activity" },
                  ].map((tab) => {
                    const isActive = recordTab === tab.id;
                    return (
                      <button
                        key={tab.id}
                        type="button"
                        data-tl={`tab-record-${tab.id}`}
                        onClick={() =>
                          tl.setVar(
                            "wfOnboardingRecordTab",
                            tab.id as typeof recordTab
                          )
                        }
                        className={`rounded-lg px-3 py-1 text-xs font-semibold transition-colors cursor-pointer ${
                          isActive
                            ? "bg-[#7014D9] text-white"
                            : "bg-white border border-[#D1D5DB] text-[#4B5563] hover:bg-gray-50"
                        }`}
                      >
                        {tab.label}
                      </button>
                    );
                  })}
                </div>

                {/* Tab content */}
                {recordTab === "checklist" && (
                  <div
                    data-tl="checklist-tasks-container"
                    className="rounded-2xl border border-[#E5E7EB] bg-white p-5 shadow-2xs flex flex-col gap-3"
                  >
                    {[
                      {
                        title: "Complete your employee profile *",
                        owner: "Alex Morgan",
                        due: "Due 2026-10-30",
                      },
                      {
                        title: "Upload identity document *",
                        owner: "Alex Morgan",
                        due: "Due 2026-10-30",
                      },
                      {
                        title: "Prepare equipment *",
                        owner: "Jordan Lee",
                        due: "Due 2026-10-29",
                      },
                      {
                        title: "Set up work accounts *",
                        owner: "Jordan Lee",
                        due: "Due 2026-10-29",
                      },
                      {
                        title: "First-day orientation *",
                        owner: "Jordan Lee",
                        due: "Due 2026-10-30",
                      },
                    ].map((tsk, idx) => (
                      <div
                        key={idx}
                        className="flex items-center justify-between p-3 rounded-xl border border-[#E5E7EB] hover:bg-gray-50"
                      >
                        <div className="flex flex-col gap-0.5">
                          <span className="font-semibold text-[#111827]">
                            {tsk.title}
                          </span>
                          <span className="text-[11px] text-[#6B7280]">
                            {tsk.owner} / {tsk.due}
                          </span>
                        </div>
                        <span className="rounded bg-[#F3E8FF] px-2 py-0.5 text-[11px] font-semibold text-[#7014D9]">
                          Completed
                        </span>
                      </div>
                    ))}
                  </div>
                )}

                {recordTab === "documents" && (
                  <div
                    data-tl="documents-container"
                    className="rounded-2xl border border-[#E5E7EB] bg-white p-5 shadow-2xs flex flex-col gap-3"
                  >
                    <div className="flex items-center justify-between p-3 rounded-xl border border-[#E5E7EB]">
                      <div className="flex items-center gap-2">
                        <Icon name="docFile" size={16} className="text-[#6B7280]" />
                        <span className="font-semibold text-[#111827]">
                          Upload identity document *
                        </span>
                      </div>
                      <span className="rounded bg-[#F3E8FF] px-2 py-0.5 text-[11px] font-semibold text-[#7014D9]">
                        Completed
                      </span>
                    </div>
                  </div>
                )}

                {recordTab === "activity" && (
                  <div
                    data-tl="activity-container"
                    className="rounded-2xl border border-[#E5E7EB] bg-white p-5 shadow-2xs flex flex-col gap-3"
                  >
                    {[
                      {
                        action: "Complete",
                        time: "30/10/2026, 9:09:46 AM",
                        desc: "ALEX ONBOARDED SUCCESSFULLY",
                      },
                      {
                        action: "Submit",
                        time: "First-day orientation / 30/10/2026, 9:09:30 AM",
                        desc: "",
                      },
                      {
                        action: "Approve",
                        time: "Upload identity document / 30/10/2026, 9:09:12 AM",
                        desc: "",
                      },
                    ].map((act, i) => (
                      <div
                        key={i}
                        className="flex items-start gap-3 p-2.5 rounded-lg border-l-2 border-[#7014D9] bg-[#F9FAFB]"
                      >
                        <div className="flex flex-col gap-0.5">
                          <span className="font-bold text-[#111827]">
                            {act.action}
                          </span>
                          <span className="text-[11px] text-[#6B7280]">
                            {act.time}
                          </span>
                          {act.desc && (
                            <span className="text-[11px] font-semibold text-[#7014D9] mt-0.5">
                              {act.desc}
                            </span>
                          )}
                        </div>
                      </div>
                    ))}
                  </div>
                )}

                {recordTab === "overview" && (
                  <div className="rounded-2xl border border-[#E5E7EB] bg-white p-5 shadow-2xs text-[#4B5563]">
                    Overview summary of Alex Morgan onboarding process.
                  </div>
                )}
              </div>
            )}

            {/* Subpage 3: Start Onboarding (Step 92) */}
            {onboardingSubpage === "start" && (
              <div className="flex flex-col gap-6 max-w-2xl mx-auto text-xs">
                <button
                  type="button"
                  data-tl="btn-back-onboarding-dashboard"
                  onClick={() => {
                    tl.setVar("wfOnboardingSubpage", "dashboard");
                    tl.setUrl(URLS.onboardingAdmin);
                  }}
                  className="flex items-center gap-1.5 text-xs font-semibold text-[#7014D9] hover:underline w-fit"
                >
                  <Icon name="arrowLeft" size={14} />
                  <span>Back</span>
                </button>

                <h1 className="text-xl font-bold tracking-tight text-[#111827]">
                  Start onboarding
                </h1>

                <div className="rounded-2xl border border-[#E5E7EB] bg-white p-6 shadow-2xs flex flex-col gap-4">
                  {/* Employee select */}
                  <div className="relative">
                    <label className="block font-medium text-[#374151] mb-1">
                      Employee *
                    </label>
                    <button
                      type="button"
                      data-tl="select-start-employee"
                      onClick={() =>
                        setEmployeeDropdownOpen(!employeeDropdownOpen)
                      }
                      className="w-full h-9 rounded-lg border border-[#D1D5DB] px-3 bg-white flex items-center justify-between text-[#111827]"
                    >
                      <span>{startEmployee || "Select an employee"}</span>
                      <Icon name="chevronDown" size={14} className="text-[#6B7280]" />
                    </button>
                    {employeeDropdownOpen && (
                      <div className="absolute left-0 top-16 z-30 w-full rounded-xl border border-[#E5E7EB] bg-white py-1 shadow-lg">
                        <div
                          data-tl="opt-start-employee-jordan"
                          onClick={() => {
                            tl.setVar(
                              "wfStartOnboardingEmployee",
                              "Jordan Lee"
                            );
                            setEmployeeDropdownOpen(false);
                          }}
                          className="px-3 py-2 hover:bg-purple-50 hover:text-[#7014D9] cursor-pointer"
                        >
                          Jordan Lee
                        </div>
                      </div>
                    )}
                  </div>

                  {/* Template select */}
                  <div>
                    <label className="block font-medium text-[#374151] mb-1">
                      Template *
                    </label>
                    <select
                      data-tl="select-start-template"
                      value={startTemplate || "Standard onboarding"}
                      onChange={(e) =>
                        tl.setVar("wfStartOnboardingTemplate", e.target.value)
                      }
                      className="w-full h-9 rounded-lg border border-[#D1D5DB] px-3 bg-white"
                    >
                      <option>Select a template</option>
                      <option>Standard onboarding</option>
                    </select>
                  </div>

                  {/* Start Date */}
                  <div>
                    <label className="block font-medium text-[#374151] mb-1">
                      Start date
                    </label>
                    <div className="relative">
                      <input
                        type="text"
                        data-tl="input-start-date"
                        defaultValue="30/10/2026"
                        className="w-full h-9 rounded-lg border border-[#D1D5DB] px-3 pr-8"
                      />
                      <Icon
                        name="shCalendar"
                        size={14}
                        className="absolute right-2.5 top-2.5 text-[#9CA3AF]"
                      />
                    </div>
                  </div>

                  {/* HR Task Owner */}
                  <div className="relative">
                    <label className="block font-medium text-[#374151] mb-1">
                      HR task owner
                    </label>
                    <button
                      type="button"
                      data-tl="select-start-hr-owner"
                      onClick={() =>
                        setHrOwnerDropdownOpen(!hrOwnerDropdownOpen)
                      }
                      className="w-full h-9 rounded-lg border border-[#D1D5DB] px-3 bg-white flex items-center justify-between text-[#111827]"
                    >
                      <span>{startHrOwner || "Select an employee"}</span>
                      <Icon name="chevronDown" size={14} className="text-[#6B7280]" />
                    </button>
                    {hrOwnerDropdownOpen && (
                      <div
                        data-tl="dropdown-start-hr-owner"
                        className="absolute left-0 top-16 z-30 w-full rounded-xl border border-[#E5E7EB] bg-white py-1 shadow-lg"
                      >
                        <div className="px-3 py-1.5 hover:bg-blue-50 text-blue-700 cursor-pointer">
                          Select an employee
                        </div>
                        <div
                          onClick={() => {
                            tl.setVar(
                              "wfStartOnboardingHrOwner",
                              "Alex Morgan"
                            );
                            setHrOwnerDropdownOpen(false);
                          }}
                          className="px-3 py-1.5 hover:bg-gray-50 cursor-pointer"
                        >
                          Alex Morgan
                        </div>
                        <div
                          data-tl="opt-start-hr-jordan"
                          onClick={() => {
                            tl.setVar(
                              "wfStartOnboardingHrOwner",
                              "Jordan Lee"
                            );
                            setHrOwnerDropdownOpen(false);
                          }}
                          className="px-3 py-1.5 hover:bg-purple-50 hover:text-[#7014D9] font-medium cursor-pointer"
                        >
                          Jordan Lee
                        </div>
                      </div>
                    )}
                  </div>

                  {/* Manager */}
                  <div className="relative">
                    <label className="block font-medium text-[#374151] mb-1">
                      Manager
                    </label>
                    <button
                      type="button"
                      data-tl="select-start-manager"
                      onClick={() =>
                        setManagerDropdownOpen(!managerDropdownOpen)
                      }
                      className="w-full h-9 rounded-lg border border-[#D1D5DB] px-3 bg-white flex items-center justify-between text-[#111827]"
                    >
                      <span>{startManager || "Use current manager"}</span>
                      <Icon name="chevronDown" size={14} className="text-[#6B7280]" />
                    </button>
                    {managerDropdownOpen && (
                      <div
                        data-tl="dropdown-start-manager"
                        className="absolute left-0 top-16 z-30 w-full rounded-xl border border-[#E5E7EB] bg-white py-1 shadow-lg"
                      >
                        <div className="px-3 py-1.5 hover:bg-gray-50 cursor-pointer">
                          Use current manager
                        </div>
                        <div
                          data-tl="opt-start-manager-jordan"
                          onClick={() => {
                            tl.setVar(
                              "wfStartOnboardingManager",
                              "Jordan Lee"
                            );
                            setManagerDropdownOpen(false);
                          }}
                          className="px-3 py-1.5 hover:bg-purple-50 hover:text-[#7014D9] font-medium cursor-pointer"
                        >
                          Jordan Lee
                        </div>
                      </div>
                    )}
                  </div>

                  {/* Welcome message */}
                  <div>
                    <label className="block font-medium text-[#374151] mb-1">
                      Welcome and first-day instructions
                    </label>
                    <textarea
                      data-tl="textarea-start-welcome"
                      rows={3}
                      value={startWelcomeMessage}
                      onChange={(e) =>
                        tl.setVar("wfStartOnboardingMessage", e.target.value)
                      }
                      placeholder="Welcome instructions..."
                      className="w-full rounded-lg border border-[#7014D9] p-2.5 focus:border-[#7014D9] focus:ring-1 focus:ring-[#7014D9] focus:outline-none"
                    />
                  </div>

                  <div className="flex justify-end pt-3 border-t border-[#E5E7EB]">
                    <button
                      type="button"
                      data-tl="btn-submit-start-onboarding"
                      className="rounded-xl bg-[#7014D9] px-5 py-2.5 text-xs font-semibold text-white shadow-2xs hover:bg-[#5B0FB3] transition-colors"
                    >
                      Start onboarding
                    </button>
                  </div>
                </div>
              </div>
            )}

            {/* Subpage 4: Onboarding Template Editor (Step 93) */}
            {onboardingSubpage === "template-detail" && (
              <div className="flex flex-col gap-6 max-w-4xl mx-auto text-xs">
                <button
                  type="button"
                  data-tl="btn-back-templates-list"
                  onClick={() => {
                    tl.setVar("wfOnboardingSubpage", "dashboard");
                    tl.setVar("wfOnboardingPill", "templates");
                    tl.setUrl(URLS.onboardingAdmin);
                  }}
                  className="flex items-center gap-1.5 text-xs font-semibold text-[#7014D9] hover:underline w-fit"
                >
                  <Icon name="arrowLeft" size={14} />
                  <span>Back to templates</span>
                </button>

                <div className="rounded-2xl border border-[#E5E7EB] bg-white p-6 shadow-2xs flex flex-col gap-4">
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                    <div className="flex-1 max-w-md">
                      <label className="block font-medium text-[#374151] mb-1">
                        Template name
                      </label>
                      <input
                        type="text"
                        data-tl="input-template-name"
                        defaultValue="Standard onboarding"
                        className="w-full h-9 rounded-lg border border-[#D1D5DB] px-3 focus:border-[#7014D9] focus:outline-none"
                      />
                    </div>
                    <label className="flex items-center gap-2 cursor-pointer pt-4">
                      <input type="checkbox" className="rounded" />
                      <span className="text-[#4B5563]">
                        Archive template for new onboarding
                      </span>
                    </label>
                  </div>

                  <p className="text-[11px] text-[#6B7280]">
                    Task deadlines are days before or after the start date.
                    Existing checklists retain the template version they
                    started with.
                  </p>
                </div>

                {/* 5 Task Cards */}
                <div
                  data-tl="template-tasks-list"
                  data-scroller="template-tasks"
                  className="flex flex-col gap-4"
                >
                  {ONBOARDING_TEMPLATE_STANDARD.tasks.map((tsk, i) => (
                    <div
                      key={tsk.id}
                      data-tl={`card-task-${i + 1}`}
                      className="rounded-2xl border border-[#E5E7EB] bg-white p-5 shadow-2xs flex flex-col gap-3"
                    >
                      <div className="flex items-center justify-between">
                        <span className="font-bold text-xs text-[#111827]">
                          Task {i + 1}
                        </span>
                        <button
                          type="button"
                          className="text-red-600 text-[11px] font-medium hover:underline"
                        >
                          Remove
                        </button>
                      </div>

                      <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                        <div className="sm:col-span-2">
                          <label className="block text-[#6B7280] mb-1">
                            Title
                          </label>
                          <input
                            type="text"
                            data-tl={
                              i === 3 ? "input-task-4-title" : undefined
                            }
                            defaultValue={tsk.title}
                            className={`w-full h-8 rounded-lg border px-3 ${
                              i === 3
                                ? "border-[#7014D9] ring-1 ring-[#7014D9]"
                                : "border-[#D1D5DB]"
                            }`}
                          />
                        </div>
                        <div>
                          <label className="block text-[#6B7280] mb-1">
                            Task type
                          </label>
                          <select
                            defaultValue={tsk.type}
                            className="w-full h-8 rounded-lg border border-[#D1D5DB] px-2 bg-white"
                          >
                            <option>{tsk.type}</option>
                          </select>
                        </div>
                      </div>

                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                        <div>
                          <label className="block text-[#6B7280] mb-1">
                            Task owner
                          </label>
                          <select
                            defaultValue={tsk.owner}
                            className="w-full h-8 rounded-lg border border-[#D1D5DB] px-2 bg-white"
                          >
                            <option>{tsk.owner}</option>
                          </select>
                        </div>
                        <div>
                          <label className="block text-[#6B7280] mb-1">
                            Days from start date
                          </label>
                          <input
                            type="number"
                            defaultValue={tsk.days}
                            className="w-full h-8 rounded-lg border border-[#D1D5DB] px-3"
                          />
                        </div>
                      </div>

                      <div>
                        <label className="block text-[#6B7280] mb-1">
                          Instructions
                        </label>
                        <textarea
                          rows={2}
                          defaultValue={tsk.instructions}
                          className="w-full rounded-lg border border-[#D1D5DB] p-2"
                        />
                      </div>

                      <div className="flex items-center gap-4 pt-1">
                        <label className="flex items-center gap-1.5 cursor-pointer">
                          <input
                            type="checkbox"
                            defaultChecked={tsk.required}
                            className="rounded"
                          />
                          <span>Required for completion</span>
                        </label>
                        <label className="flex items-center gap-1.5 cursor-pointer">
                          <input
                            type="checkbox"
                            defaultChecked={tsk.requiresReview}
                            className="rounded"
                          />
                          <span>Requires HR review</span>
                        </label>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
        )}

        {/* ============================================================== */}
        {/* OFFBOARDING SECTION */}
        {/* ============================================================== */}
        {lifecycleTab === "offboarding" && (
          <div className="flex flex-col gap-6">
            {offboardingSubpage === "main" ? (
              <>
                {/* Header row with Initiate Exit button */}
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-[#E5E7EB] pb-3">
                  {/* Sub tabs: Dashboard, Resignations, Templates */}
                  <div className="flex items-center gap-2">
                    {[
                      { id: "dashboard", label: "Dashboard", icon: "grid4" },
                      { id: "resignations", label: "Resignations", icon: "user" },
                      { id: "templates", label: "Templates", icon: "docFile" },
                    ].map((tab) => {
                      const isActive = offboardingSubTab === tab.id;
                      return (
                        <button
                          key={tab.id}
                          type="button"
                          data-tl={`tab-offboarding-${tab.id}`}
                          onClick={() =>
                            tl.setVar(
                              "wfOffboardingSubTab",
                              tab.id as typeof offboardingSubTab
                            )
                          }
                          className={`flex items-center gap-1.5 rounded-lg px-3.5 py-1.5 text-xs font-semibold transition-colors cursor-pointer ${
                            isActive
                              ? "bg-[#7014D9] text-white"
                              : "bg-white border border-[#D1D5DB] text-[#4B5563] hover:bg-gray-50"
                          }`}
                        >
                          <Icon name={tab.icon as IconName} size={13} />
                          <span>{tab.label}</span>
                        </button>
                      );
                    })}
                  </div>

                  <button
                    type="button"
                    data-tl="btn-initiate-exit"
                    onClick={() => {
                      tl.setVar("wfOffboardingSubpage", "initiate");
                      tl.setUrl(URLS.offboardingInitiate);
                    }}
                    className="flex items-center gap-1.5 rounded-xl border border-[#7014D9] px-4 py-2 text-xs font-semibold text-[#7014D9] hover:bg-purple-50 transition-colors self-start sm:self-auto cursor-pointer"
                  >
                    <span>Initiate Exit</span>
                  </button>
                </div>

                {/* SubTab 1: Dashboard */}
                {offboardingSubTab === "dashboard" && (
                  <div className="flex flex-col gap-4">
                    <div className="flex flex-wrap items-center gap-3">
                      <input
                        type="text"
                        placeholder="Search employees..."
                        className="h-9 w-64 rounded-xl border border-[#D1D5DB] bg-white px-3 text-xs"
                      />
                      <select className="h-9 rounded-xl border border-[#D1D5DB] bg-white px-3 text-xs">
                        <option>All Departments</option>
                      </select>
                      <select className="h-9 rounded-xl border border-[#D1D5DB] bg-white px-3 text-xs">
                        <option>All Statuses</option>
                      </select>
                    </div>

                    <div className="rounded-2xl border border-[#E5E7EB] bg-white shadow-2xs min-h-[180px]">
                      <table className="w-full text-left text-xs">
                        <thead>
                          <tr className="border-b border-[#E5E7EB] bg-[#F9FAFB] text-[#6B7280] font-semibold">
                            <th className="py-3 px-4">Employee</th>
                            <th className="py-3 px-4">Department</th>
                            <th className="py-3 px-4">Last Working Day</th>
                            <th className="py-3 px-4">Progress</th>
                            <th className="py-3 px-4">Status</th>
                            <th className="py-3 px-4 text-right">Actions</th>
                          </tr>
                        </thead>
                        <tbody className="divide-y divide-[#F3F4F6]">
                          {OFFBOARDING_DASHBOARD_RECORDS.map((rec) => (
                            <tr
                              key={rec.id}
                              data-tl="row-exit-casey"
                              className="hover:bg-gray-50"
                            >
                              <td className="py-3 px-4 font-semibold text-[#111827]">
                                {rec.employee}
                              </td>
                              <td className="py-3 px-4 text-[#4B5563]">
                                {rec.department}
                              </td>
                              <td className="py-3 px-4 text-[#4B5563]">
                                {rec.lastWorkingDay}
                              </td>
                              <td className="py-3 px-4">
                                <div className="flex items-center gap-2">
                                  <div className="h-1.5 w-20 rounded-full bg-gray-200 overflow-hidden">
                                    <div
                                      data-tl="bar-progress-50"
                                      className="h-full bg-amber-500 w-1/2"
                                    />
                                  </div>
                                  <span className="text-[11px] text-[#6B7280]">
                                    {rec.progress}%
                                  </span>
                                </div>
                              </td>
                              <td className="py-3 px-4">
                                <span className="rounded bg-emerald-50 px-2 py-0.5 text-[11px] font-semibold text-emerald-700 border border-emerald-200">
                                  {rec.status}
                                </span>
                              </td>
                              <td className="py-3 px-4 text-right">
                                <div className="inline-flex items-center gap-2">
                                  <button
                                    type="button"
                                    data-tl="btn-view-exit-record"
                                    className="rounded-lg border border-[#D1D5DB] px-3 py-1 text-xs font-semibold text-[#374151] hover:bg-gray-50"
                                  >
                                    View
                                  </button>
                                  <button
                                    type="button"
                                    data-tl="btn-cancel-exit-record"
                                    className="rounded-lg border border-red-300 px-3 py-1 text-xs font-semibold text-red-600 hover:bg-red-50"
                                  >
                                    Cancel
                                  </button>
                                </div>
                              </td>
                            </tr>
                          ))}
                        </tbody>
                      </table>
                    </div>
                  </div>
                )}

                {/* SubTab 2: Resignations */}
                {offboardingSubTab === "resignations" && (
                  <div className="flex flex-col gap-4">
                    <div className="flex flex-wrap items-center gap-3">
                      <input
                        type="text"
                        placeholder="Search resignations..."
                        className="h-9 w-64 rounded-xl border border-[#D1D5DB] bg-white px-3 text-xs"
                      />
                      <select className="h-9 rounded-xl border border-[#D1D5DB] bg-white px-3 text-xs">
                        <option>All Statuses</option>
                      </select>
                    </div>

                    <div className="rounded-2xl border border-[#E5E7EB] bg-white shadow-2xs min-h-[180px]">
                      <table className="w-full text-left text-xs">
                        <thead>
                          <tr className="border-b border-[#E5E7EB] bg-[#F9FAFB] text-[#6B7280] font-semibold">
                            <th className="py-3 px-4">Employee</th>
                            <th className="py-3 px-4">Department</th>
                            <th className="py-3 px-4">Proposed LWD</th>
                            <th className="py-3 px-4">Submitted</th>
                            <th className="py-3 px-4">Status</th>
                            <th className="py-3 px-4 text-right">Actions</th>
                          </tr>
                        </thead>
                        <tbody className="divide-y divide-[#F3F4F6]">
                          {OFFBOARDING_RESIGNATIONS.map((res) => (
                            <tr
                              key={res.id}
                              data-tl={
                                res.id === "alex-morgan"
                                  ? "row-resignation-alex"
                                  : undefined
                              }
                              className="hover:bg-gray-50"
                            >
                              <td className="py-3 px-4 font-semibold text-[#111827]">
                                {res.employee}
                              </td>
                              <td className="py-3 px-4 text-[#4B5563]">
                                {res.department}
                              </td>
                              <td className="py-3 px-4 text-[#4B5563]">
                                {res.proposedLwd}
                              </td>
                              <td className="py-3 px-4 text-[#4B5563]">
                                {res.submitted}
                              </td>
                              <td className="py-3 px-4">
                                <span className="rounded bg-emerald-50 px-2 py-0.5 text-[11px] font-semibold text-emerald-700 border border-emerald-200">
                                  {res.status}
                                </span>
                              </td>
                              <td className="py-3 px-4 text-right">
                                <div className="relative inline-block">
                                  <button
                                    type="button"
                                    data-tl={
                                      res.id === "alex-morgan"
                                        ? "btn-menu-resignation-alex"
                                        : undefined
                                    }
                                    onClick={() =>
                                      tl.setVar(
                                        "wfResignationMenuOpen",
                                        !resignationMenuOpen
                                      )
                                    }
                                    className="p-1 text-[#6B7280] hover:text-[#111827] rounded"
                                  >
                                    <Icon name="moreHorizontal" size={14} />
                                  </button>
                                  {res.id === "alex-morgan" &&
                                    resignationMenuOpen && (
                                      <div className="absolute right-0 top-7 z-30 w-28 rounded-xl border border-[#E5E7EB] bg-white py-1 shadow-lg text-xs text-left">
                                        <div
                                          data-tl="menu-resignation-view"
                                          onClick={() => {
                                            tl.setVar(
                                              "wfResignationMenuOpen",
                                              false
                                            );
                                            tl.setVar(
                                              "wfResignationDetailModalOpen",
                                              true
                                            );
                                          }}
                                          className="px-3 py-1.5 hover:bg-purple-50 hover:text-[#7014D9] cursor-pointer font-medium"
                                        >
                                          View
                                        </div>
                                      </div>
                                    )}
                                </div>
                              </td>
                            </tr>
                          ))}
                        </tbody>
                      </table>
                    </div>
                  </div>
                )}

                {/* SubTab 3: Templates */}
                {offboardingSubTab === "templates" && (
                  <div className="flex flex-col gap-6">
                    {/* Custom templates section */}
                    <div className="flex flex-col gap-3">
                      <div className="flex items-center justify-between">
                        <h2 className="text-sm font-bold text-[#111827]">
                          Manage custom templates
                        </h2>
                        <button
                          type="button"
                          data-tl="btn-create-exit-template"
                          className="rounded-xl bg-[#7014D9] px-4 py-2 text-xs font-semibold text-white shadow-2xs hover:bg-[#5B0FB3]"
                        >
                          Create template
                        </button>
                      </div>

                      <div
                        data-tl="card-custom-exit-template"
                        className="rounded-2xl border border-[#E5E7EB] bg-white p-5 shadow-2xs flex items-center justify-between"
                      >
                        <div>
                          <h3 className="font-bold text-sm text-[#111827]">
                            IT Equipment Return
                          </h3>
                          <div className="text-xs text-[#6B7280] mt-0.5">
                            Checklist · Active · 5 items
                          </div>
                        </div>
                        <button
                          type="button"
                          className="p-1 text-[#6B7280] hover:text-[#111827]"
                        >
                          <Icon name="moreHorizontal" size={16} />
                        </button>
                      </div>

                      <div className="flex items-center gap-3 text-xs text-[#9CA3AF]">
                        <span>Previous</span>
                        <span>Page 1</span>
                        <span>Next</span>
                      </div>
                    </div>

                    {/* Default templates section */}
                    <div
                      data-tl="section-default-templates"
                      className="flex flex-col gap-4 pt-4 border-t border-[#E5E7EB]"
                    >
                      <div className="flex items-center justify-between">
                        <div>
                          <h2 className="text-sm font-bold text-[#111827]">
                            Checklist Templates
                          </h2>
                          <p className="text-xs text-[#6B7280]">
                            DEFAULT TEMPLATES
                          </p>
                        </div>
                        <button
                          type="button"
                          className="rounded-xl bg-[#7014D9] px-3.5 py-1.5 text-xs font-semibold text-white shadow-2xs"
                        >
                          + Create Template
                        </button>
                      </div>

                      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                        {EXIT_DEFAULT_TEMPLATES.map((tmpl) => (
                          <div
                            key={tmpl.id}
                            className={`rounded-2xl border p-5 shadow-2xs flex flex-col justify-between gap-4 ${
                              tmpl.color === "blue"
                                ? "border-blue-200 bg-blue-50/30"
                                : tmpl.color === "purple"
                                ? "border-purple-200 bg-purple-50/30"
                                : "border-emerald-200 bg-emerald-50/30"
                            }`}
                          >
                            <div className="flex flex-col gap-2">
                              <h3 className="font-bold text-sm text-[#111827]">
                                {tmpl.title}
                              </h3>
                              <p className="text-xs text-[#4B5563] leading-relaxed">
                                {tmpl.description}
                              </p>
                              <span className="text-[11px] font-semibold text-[#6B7280]">
                                {tmpl.itemsCount} items
                              </span>
                            </div>

                            {tmpl.id === "standard-exit" && (
                              <div className="flex items-center gap-2 pt-2 border-t border-blue-100">
                                <button
                                  type="button"
                                  data-tl="btn-preview-standard-exit"
                                  onClick={() =>
                                    tl.setVar(
                                      "wfStandardExitModalOpen",
                                      true
                                    )
                                  }
                                  className="flex items-center gap-1 rounded-lg border border-[#D1D5DB] bg-white px-3 py-1.5 text-xs font-semibold text-[#374151] hover:bg-gray-50 shadow-2xs"
                                >
                                  <Icon name="eye" size={13} />
                                  <span>Preview</span>
                                </button>
                                <button
                                  type="button"
                                  data-tl="btn-use-standard-exit"
                                  className="rounded-lg bg-[#7014D9] px-3 py-1.5 text-xs font-semibold text-white hover:bg-[#5B0FB3] shadow-2xs"
                                >
                                  + Use Template
                                </button>
                              </div>
                            )}
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                )}
              </>
            ) : (
              /* Initiate Exit Subpage (Step 94) */
              <div className="flex flex-col gap-6 max-w-2xl mx-auto text-xs">
                <button
                  type="button"
                  data-tl="btn-back-to-offboarding"
                  onClick={() => {
                    tl.setVar("wfOffboardingSubpage", "main");
                    tl.setUrl(URLS.offboarding);
                  }}
                  className="flex items-center gap-1.5 text-xs font-semibold text-[#7014D9] hover:underline w-fit"
                >
                  <Icon name="arrowLeft" size={14} />
                  <span>Back to Offboarding</span>
                </button>

                <div>
                  <h1 className="text-xl font-bold tracking-tight text-[#111827]">
                    Initiate Exit
                  </h1>
                  <p className="text-xs text-[#6B7280]">
                    Add exit details for an employee leaving the organization
                  </p>
                </div>

                {/* Separation Details Card */}
                <div
                  data-tl="card-separation-details"
                  className="rounded-2xl border border-[#E5E7EB] bg-white p-6 shadow-2xs flex flex-col gap-4"
                >
                  <h2 className="font-bold text-sm text-[#111827]">
                    Separation Details
                  </h2>

                  <div>
                    <label className="block font-medium text-[#374151] mb-1">
                      Employee *
                    </label>
                    <select
                      data-tl="select-exit-employee"
                      value={exitEmployee || "Alex Morgan"}
                      onChange={(e) =>
                        tl.setVar("wfInitiateExitEmployee", e.target.value)
                      }
                      className="w-full h-9 rounded-lg border border-[#D1D5DB] px-3 bg-white"
                    >
                      <option>Select employee</option>
                      <option data-tl="opt-exit-employee-alex">
                        Alex Morgan
                      </option>
                    </select>
                  </div>

                  <div>
                    <label className="block font-medium text-[#374151] mb-1">
                      Separation Date *
                    </label>
                    <input
                      type="text"
                      data-tl="input-exit-date"
                      defaultValue="31/10/2026"
                      className="w-full h-9 rounded-lg border border-[#D1D5DB] px-3"
                    />
                  </div>

                  <div>
                    <label className="block font-medium text-[#374151] mb-1">
                      Reason for Leaving *
                    </label>
                    <select
                      data-tl="select-exit-reason"
                      value={exitReason || "Personal Reasons"}
                      onChange={(e) =>
                        tl.setVar("wfInitiateExitReason", e.target.value)
                      }
                      className="w-full h-9 rounded-lg border border-[#D1D5DB] px-3 bg-white"
                    >
                      <option>Select a reason</option>
                      <option data-tl="opt-exit-reason-personal">
                        Personal Reasons
                      </option>
                      <option>Career Growth</option>
                      <option>Relocation</option>
                    </select>
                  </div>

                  <div className="relative">
                    <label className="block font-medium text-[#374151] mb-1">
                      Departure Type *
                    </label>
                    <button
                      type="button"
                      data-tl="select-exit-departure-type"
                      onClick={() =>
                        setExitDepartureDropdownOpen(!exitDepartureDropdownOpen)
                      }
                      className="w-full h-9 rounded-lg border border-[#D1D5DB] px-3 bg-white flex items-center justify-between text-[#111827]"
                    >
                      <span>{exitDepartureType}</span>
                      <Icon name="chevronDown" size={14} className="text-[#6B7280]" />
                    </button>
                    {exitDepartureDropdownOpen && (
                      <div
                        data-tl="dropdown-exit-departure-type"
                        className="absolute left-0 top-16 z-30 w-full rounded-xl border border-[#E5E7EB] bg-white py-1 shadow-lg"
                      >
                        <div
                          data-tl="opt-departure-voluntary"
                          onClick={() => {
                            tl.setVar(
                              "wfInitiateExitDepartureType",
                              "Voluntary"
                            );
                            setExitDepartureDropdownOpen(false);
                          }}
                          className="px-3 py-1.5 hover:bg-purple-50 cursor-pointer"
                        >
                          Voluntary
                        </div>
                        <div
                          data-tl="opt-departure-involuntary"
                          onClick={() => {
                            tl.setVar(
                              "wfInitiateExitDepartureType",
                              "Involuntary"
                            );
                            setExitDepartureDropdownOpen(false);
                          }}
                          className="px-3 py-1.5 hover:bg-purple-50 cursor-pointer"
                        >
                          Involuntary
                        </div>
                      </div>
                    )}
                  </div>
                </div>

                {/* Exit Templates Card */}
                <div
                  data-tl="card-exit-templates"
                  className="rounded-2xl border border-[#E5E7EB] bg-white p-6 shadow-2xs flex flex-col gap-4"
                >
                  <div>
                    <h2 className="font-bold text-sm text-[#111827]">
                      Exit templates
                    </h2>
                    <p className="text-[11px] text-[#6B7280]">
                      The selected templates are copied into this employee&apos;s
                      exit. Leave blank to use configured defaults.
                    </p>
                  </div>

                  <div>
                    <label className="block font-medium text-[#374151] mb-1">
                      Checklist
                    </label>
                    <select
                      data-tl="select-exit-checklist"
                      value={exitChecklist || "IT Equipment Return"}
                      onChange={(e) =>
                        tl.setVar("wfInitiateExitChecklist", e.target.value)
                      }
                      className="w-full h-9 rounded-lg border border-[#D1D5DB] px-3 bg-white"
                    >
                      <option>Use default, if configured</option>
                      <option data-tl="opt-exit-checklist-it">
                        IT Equipment Return
                      </option>
                    </select>
                  </div>

                  <div>
                    <label className="block font-medium text-[#374151] mb-1">
                      Interview questionnaire
                    </label>
                    <select
                      data-tl="select-exit-questionnaire"
                      className="w-full h-9 rounded-lg border border-[#7014D9] ring-1 ring-[#7014D9] px-3 bg-white focus:outline-none"
                    >
                      <option>Use default, if configured</option>
                    </select>
                  </div>
                </div>

                {/* Footer Buttons */}
                <div className="flex items-center justify-end gap-3 pt-2">
                  <button
                    type="button"
                    data-tl="btn-cancel-initiate-exit"
                    onClick={() => {
                      tl.setVar("wfOffboardingSubpage", "main");
                      tl.setUrl(URLS.offboarding);
                    }}
                    className="rounded-lg border border-[#D1D5DB] px-4 py-2 text-xs font-semibold text-[#374151] hover:bg-gray-50"
                  >
                    Cancel
                  </button>
                  <button
                    type="button"
                    disabled
                    data-tl="btn-submit-initiate-exit"
                    className="rounded-lg bg-[#F3E8FF] px-5 py-2 text-xs font-semibold text-[#7014D9] opacity-70 cursor-not-allowed"
                  >
                    Submit
                  </button>
                </div>
              </div>
            )}
          </div>
        )}
      </div>
      </div>

      {/* ============================================================== */}
      {/* MODAL: Resignation Details (Step 95) */}
      {/* ============================================================== */}
      {resignationDetailModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 backdrop-blur-2xs p-4">
          <div
            data-tl="modal-resignation-details"
            className="relative flex flex-col w-full max-w-md rounded-2xl bg-white shadow-2xl overflow-hidden text-xs"
          >
            <div className="flex items-center justify-between border-b border-[#E5E7EB] px-6 py-4">
              <h2 className="text-base font-bold text-[#111827]">
                Resignation Details
              </h2>
              <button
                type="button"
                data-tl="btn-close-resignation-details"
                onClick={() =>
                  tl.setVar("wfResignationDetailModalOpen", false)
                }
                className="text-[#6B7280] hover:text-[#111827]"
              >
                <Icon name="x" size={18} />
              </button>
            </div>

            <div className="p-6 flex flex-col gap-4">
              <div className="flex items-center justify-between">
                <span className="font-bold text-sm text-[#111827]">
                  Alex Morgan
                </span>
                <span
                  data-tl="badge-resignation-approved"
                  className="rounded bg-emerald-50 px-2.5 py-0.5 text-xs font-semibold text-emerald-700 border border-emerald-200"
                >
                  Approved
                </span>
              </div>

              <div className="rounded-xl border border-[#E5E7EB] bg-[#F9FAFB] p-4 flex flex-col gap-2.5 text-xs">
                <div
                  data-tl="text-resignation-submitted"
                  className="flex justify-between"
                >
                  <span className="text-[#6B7280]">Submitted On</span>
                  <span className="font-semibold text-[#111827]">
                    19/10/2026
                  </span>
                </div>
                <div
                  data-tl="text-resignation-proposed-lwd"
                  className="flex justify-between"
                >
                  <span className="text-[#6B7280]">Proposed Last Working Day</span>
                  <span className="font-semibold text-[#111827]">
                    27/11/2026
                  </span>
                </div>
                <div
                  data-tl="text-resignation-approved-lwd"
                  className="flex justify-between"
                >
                  <span className="text-[#6B7280]">Approved Last Working Day</span>
                  <span className="font-semibold text-[#111827]">
                    27/11/2026
                  </span>
                </div>
              </div>

              <div>
                <span className="block text-[#6B7280] font-medium mb-1">
                  Reason
                </span>
                <div
                  data-tl="box-resignation-reason"
                  className="rounded-xl border border-[#E5E7EB] p-3 text-xs text-[#374151] bg-[#F9FAFB]"
                >
                  Moving to a new role elsewhere
                </div>
              </div>
            </div>

            <div className="flex items-center justify-end border-t border-[#E5E7EB] px-6 py-4">
              <button
                type="button"
                data-tl="btn-dismiss-resignation-details"
                onClick={() =>
                  tl.setVar("wfResignationDetailModalOpen", false)
                }
                className="rounded-lg border border-[#D1D5DB] px-4 py-2 text-xs font-semibold text-[#374151] hover:bg-gray-50"
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}

      {/* ============================================================== */}
      {/* MODAL: Standard Exit Checklist Preview (Step 96) */}
      {/* ============================================================== */}
      {standardExitModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 backdrop-blur-2xs p-4">
          <div
            data-tl="modal-standard-exit"
            className="relative flex flex-col w-full max-w-lg rounded-2xl bg-white shadow-2xl overflow-hidden text-xs max-h-[85vh]"
          >
            <div className="flex items-center justify-between border-b border-[#E5E7EB] px-6 py-4">
              <div>
                <h2 className="text-base font-bold text-[#111827]">
                  Standard Exit Checklist
                </h2>
                <p className="text-[11px] text-[#6B7280]">
                  A comprehensive exit checklist covering all standard
                  offboarding procedures.
                </p>
              </div>
              <button
                type="button"
                data-tl="btn-close-standard-exit"
                onClick={() => tl.setVar("wfStandardExitModalOpen", false)}
                className="text-[#6B7280] hover:text-[#111827]"
              >
                <Icon name="x" size={18} />
              </button>
            </div>

            <div className="p-6 flex flex-col gap-3 overflow-y-auto">
              <span className="font-bold text-xs uppercase tracking-wider text-[#6B7280]">
                8 CHECKLIST ITEMS
              </span>
              <div
                data-tl="list-standard-exit-items"
                className="flex flex-col gap-2"
              >
                {[
                  "Company vehicle handed in",
                  "All equipment handed in",
                  "All library books submitted",
                  "Security clearance",
                  "Exit interview conducted",
                  "Resignation letter submitted",
                  "Notice period followed",
                  "Manager/Supervisor clearance",
                ].map((item, idx) => (
                  <div
                    key={idx}
                    data-tl={
                      idx === 0
                        ? "item-exit-1"
                        : idx === 1
                        ? "item-exit-2"
                        : undefined
                    }
                    className="flex items-center gap-3 rounded-xl border border-[#E5E7EB] p-3 bg-[#F9FAFB] hover:bg-purple-50/50 transition-colors"
                  >
                    <span className="flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-[#E5E7EB] text-[10px] font-bold text-[#4B5563]">
                      {idx + 1}
                    </span>
                    <span className="text-xs text-[#111827] font-medium">
                      {item}
                    </span>
                  </div>
                ))}
              </div>
            </div>

            <div className="flex items-center justify-end gap-3 border-t border-[#E5E7EB] px-6 py-4">
              <button
                type="button"
                data-tl="btn-dismiss-standard-exit"
                onClick={() => tl.setVar("wfStandardExitModalOpen", false)}
                className="rounded-lg border border-[#D1D5DB] px-4 py-2 text-xs font-semibold text-[#374151] hover:bg-gray-50"
              >
                Close
              </button>
              <button
                type="button"
                data-tl="btn-modal-use-template"
                className="rounded-lg bg-[#7014D9] px-4 py-2 text-xs font-semibold text-white shadow-2xs hover:bg-[#5B0FB3]"
              >
                + Use Template
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
