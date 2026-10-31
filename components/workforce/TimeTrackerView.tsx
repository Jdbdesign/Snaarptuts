"use client";

import type { Timeline } from "@/lib/timeline";
import { useTimelineVar } from "@/lib/useTimelineVar";
import { Icon } from "@/components/icons";
import { SAMPLE_TIME_TRACKER } from "./workforce-data";

type Props = {
  tl: Timeline;
  onBack?: () => void;
};

export function TimeTrackerView({ tl, onBack }: Props) {
  const activeTab = useTimelineVar<
    "projects" | "jobs" | "logs" | "timesheets" | "schedule"
  >(tl, "wfTimeTab", "projects");
  const project = useTimelineVar<string>(tl, "wfTimeProject", "No project");
  const job = useTimelineVar<string>(tl, "wfTimeJob", "General work");
  const running = useTimelineVar(tl, "wfTimeRunning", false);
  const seconds = useTimelineVar(tl, "wfTimeSeconds", 0);
  const loadingProjects = useTimelineVar(tl, "wfTimeProjectsLoading", false);
  const scheduleMode = useTimelineVar<"week" | "month">(
    tl,
    "wfTimeScheduleMode",
    "week"
  );
  const projectDropdownOpen = useTimelineVar(
    tl,
    "wfTimeProjectDropdownOpen",
    false
  );
  const jobDropdownOpen = useTimelineVar(tl, "wfTimeJobDropdownOpen", false);

  const formatTimer = (totalSec: number) => {
    const hrs = Math.floor(totalSec / 3600);
    const mins = Math.floor((totalSec % 3600) / 60);
    const secs = totalSec % 60;
    return `${hrs.toString().padStart(2, "0")}:${mins.toString().padStart(2, "0")}:${secs.toString().padStart(2, "0")}`;
  };

  // Week days Oct 26 - Nov 1, 2026
  const weekDays = [
    { day: 26, name: "MON", month: "Oct" },
    { day: 27, name: "TUE", month: "Oct" },
    { day: 28, name: "WED", month: "Oct" },
    { day: 29, name: "THU", month: "Oct" },
    { day: 30, name: "FRI", month: "Oct", isToday: true },
    { day: 31, name: "SAT", month: "Oct" },
    { day: 1, name: "SUN", month: "Nov" },
  ];

  // Month days for Oct 2026 (same 35-day grid as calendar)
  const monthDays = [
    { day: 28, isCurrentMonth: false },
    { day: 29, isCurrentMonth: false },
    { day: 30, isCurrentMonth: false },
    { day: 1, isCurrentMonth: true },
    { day: 2, isCurrentMonth: true },
    { day: 3, isCurrentMonth: true },
    { day: 4, isCurrentMonth: true },
    { day: 5, isCurrentMonth: true },
    { day: 6, isCurrentMonth: true },
    { day: 7, isCurrentMonth: true },
    { day: 8, isCurrentMonth: true },
    { day: 9, isCurrentMonth: true },
    { day: 10, isCurrentMonth: true },
    { day: 11, isCurrentMonth: true },
    { day: 12, isCurrentMonth: true },
    { day: 13, isCurrentMonth: true },
    { day: 14, isCurrentMonth: true },
    { day: 15, isCurrentMonth: true },
    { day: 16, isCurrentMonth: true },
    { day: 17, isCurrentMonth: true },
    { day: 18, isCurrentMonth: true },
    { day: 19, isCurrentMonth: true },
    { day: 20, isCurrentMonth: true },
    { day: 21, isCurrentMonth: true },
    { day: 22, isCurrentMonth: true },
    { day: 23, isCurrentMonth: true },
    { day: 24, isCurrentMonth: true },
    { day: 25, isCurrentMonth: true },
    { day: 26, isCurrentMonth: true },
    { day: 27, isCurrentMonth: true },
    { day: 28, isCurrentMonth: true },
    { day: 29, isCurrentMonth: true },
    { day: 30, isCurrentMonth: true, isToday: true },
    { day: 31, isCurrentMonth: true },
    { day: 1, isCurrentMonth: false },
  ];

  return (
    <div
      data-scroller="time-tracker"
      className="h-full overflow-y-auto no-scrollbar p-6 bg-[#F9FAFB] space-y-6"
    >
      {/* Top bar with back button & timer bar */}
      <div className="flex flex-wrap items-center justify-between gap-4">
        <button
          type="button"
          data-tl="time-back-btn"
          onClick={onBack}
          className="inline-flex items-center gap-1.5 rounded-lg border border-[#E5E7EB] bg-white px-3 py-1.5 text-xs font-medium text-[#4B5563] hover:bg-gray-50 transition-colors shadow-sm"
        >
          <Icon name="chevronLeft" size={14} />
          <span>Back</span>
        </button>

        {/* Top-right Tracker Bar */}
        <div className="flex items-center gap-3">
          {/* Project dropdown */}
          <div className="relative">
            <button
              type="button"
              data-tl="time-project-select"
              onClick={() =>
                tl.setVar("wfTimeProjectDropdownOpen", !projectDropdownOpen)
              }
              className="flex items-center gap-2 rounded-lg border border-[#D1D5DB] bg-white px-3 py-1.5 text-xs text-[#111827] hover:border-gray-400 min-w-[130px] justify-between shadow-sm"
            >
              <span className="truncate">{project}</span>
              <Icon name="chevronDown" size={14} className="text-[#6B7280]" />
            </button>

            {projectDropdownOpen && (
              <div
                data-tl="time-project-menu"
                className="absolute left-0 mt-1 w-44 rounded-lg border border-[#E5E7EB] bg-white py-1 shadow-lg z-30 text-xs"
              >
                <div
                  data-tl="time-project-opt-none"
                  onClick={() => {
                    tl.setVar("wfTimeProject", "No project");
                    tl.setVar("wfTimeProjectDropdownOpen", false);
                  }}
                  className={`px-3 py-1.5 cursor-pointer hover:bg-purple-50 ${
                    project === "No project"
                      ? "bg-[#EFF6FF] text-[#1D4ED8] font-medium"
                      : "text-[#374151]"
                  }`}
                >
                  No project
                </div>
                <div
                  data-tl="time-project-opt-sprint1"
                  onClick={() => {
                    tl.setVar("wfTimeProject", "Sprint 1");
                    tl.setVar("wfTimeProjectDropdownOpen", false);
                  }}
                  className={`px-3 py-1.5 cursor-pointer hover:bg-purple-50 ${
                    project === "Sprint 1"
                      ? "bg-[#EFF6FF] text-[#1D4ED8] font-medium"
                      : "text-[#374151]"
                  }`}
                >
                  Sprint 1
                </div>
              </div>
            )}
          </div>

          {/* Job dropdown */}
          <div className="relative">
            <button
              type="button"
              data-tl="time-job-select"
              onClick={() => tl.setVar("wfTimeJobDropdownOpen", !jobDropdownOpen)}
              className="flex items-center gap-2 rounded-lg border border-[#D1D5DB] bg-white px-3 py-1.5 text-xs text-[#111827] hover:border-gray-400 min-w-[130px] justify-between shadow-sm"
            >
              <span className="truncate">{job}</span>
              <Icon name="chevronDown" size={14} className="text-[#6B7280]" />
            </button>

            {jobDropdownOpen && (
              <div
                data-tl="time-job-menu"
                className="absolute left-0 mt-1 w-44 rounded-lg border border-[#E5E7EB] bg-white py-1 shadow-lg z-30 text-xs"
              >
                <div
                  data-tl="time-job-opt-general"
                  onClick={() => {
                    tl.setVar("wfTimeJob", "General work");
                    tl.setVar("wfTimeJobDropdownOpen", false);
                  }}
                  className={`px-3 py-1.5 cursor-pointer hover:bg-purple-50 ${
                    job === "General work"
                      ? "bg-[#EFF6FF] text-[#1D4ED8] font-medium"
                      : "text-[#374151]"
                  }`}
                >
                  General work
                </div>
                <div
                  data-tl="time-job-opt-planning"
                  onClick={() => {
                    tl.setVar("wfTimeJob", "Sprint planning");
                    tl.setVar("wfTimeJobDropdownOpen", false);
                  }}
                  className={`px-3 py-1.5 cursor-pointer hover:bg-purple-50 ${
                    job === "Sprint planning"
                      ? "bg-[#EFF6FF] text-[#1D4ED8] font-medium"
                      : "text-[#374151]"
                  }`}
                >
                  Sprint planning
                </div>
              </div>
            )}
          </div>

          {/* Timer display */}
          <div className="flex flex-col items-end min-w-[80px]">
            {running && (
              <span
                data-tl="time-active-job-label"
                className="text-[10px] font-bold text-[#7014D9] uppercase tracking-wider"
              >
                General
              </span>
            )}
            <span
              data-tl="time-timer"
              className="font-mono text-lg font-bold text-[#111827]"
            >
              {formatTimer(seconds)}
            </span>
          </div>

          {/* Start / Stop button */}
          {running ? (
            <button
              type="button"
              data-tl="time-stop-btn"
              onClick={() => tl.setVar("wfTimeRunning", false)}
              className="rounded-lg bg-[#DC2626] px-4 py-1.5 text-xs font-semibold text-white hover:bg-[#B91C1C] transition-colors shadow-sm"
            >
              Stop
            </button>
          ) : (
            <button
              type="button"
              data-tl="time-start-btn"
              onClick={() => {
                tl.setVar("wfTimeRunning", true);
                if (seconds === 0) tl.setVar("wfTimeSeconds", 1);
              }}
              className="rounded-lg bg-[#7014D9] px-4 py-1.5 text-xs font-semibold text-white hover:bg-[#5B0FB3] transition-colors shadow-sm"
            >
              Start
            </button>
          )}
        </div>
      </div>

      {/* Heading */}
      <div>
        <h1
          data-tl="time-heading"
          className="text-xl font-bold text-[#111827]"
        >
          Time Tracker
        </h1>
      </div>

      {/* Tabs */}
      <div className="flex border-b border-[#E5E7EB] gap-6 text-sm font-medium">
        <button
          type="button"
          data-tl="time-tab-projects"
          onClick={() => tl.setVar("wfTimeTab", "projects")}
          className={`pb-3 transition-colors ${
            activeTab === "projects"
              ? "border-b-2 border-[#7014D9] text-[#7014D9] font-semibold"
              : "text-[#6B7280] hover:text-[#111827]"
          }`}
        >
          Projects
        </button>
        <button
          type="button"
          data-tl="time-tab-jobs"
          onClick={() => tl.setVar("wfTimeTab", "jobs")}
          className={`pb-3 transition-colors ${
            activeTab === "jobs"
              ? "border-b-2 border-[#7014D9] text-[#7014D9] font-semibold"
              : "text-[#6B7280] hover:text-[#111827]"
          }`}
        >
          Jobs
        </button>
        <button
          type="button"
          data-tl="time-tab-logs"
          onClick={() => tl.setVar("wfTimeTab", "logs")}
          className={`pb-3 transition-colors ${
            activeTab === "logs"
              ? "border-b-2 border-[#7014D9] text-[#7014D9] font-semibold"
              : "text-[#6B7280] hover:text-[#111827]"
          }`}
        >
          Time Logs
        </button>
        <button
          type="button"
          data-tl="time-tab-timesheets"
          onClick={() => tl.setVar("wfTimeTab", "timesheets")}
          className={`pb-3 transition-colors ${
            activeTab === "timesheets"
              ? "border-b-2 border-[#7014D9] text-[#7014D9] font-semibold"
              : "text-[#6B7280] hover:text-[#111827]"
          }`}
        >
          Timesheets
        </button>
        <button
          type="button"
          data-tl="time-tab-schedule"
          onClick={() => tl.setVar("wfTimeTab", "schedule")}
          className={`pb-3 transition-colors ${
            activeTab === "schedule"
              ? "border-b-2 border-[#7014D9] text-[#7014D9] font-semibold"
              : "text-[#6B7280] hover:text-[#111827]"
          }`}
        >
          Job Schedule
        </button>
      </div>

      {/* TAB 1: Projects */}
      {activeTab === "projects" && (
        <div className="space-y-4">
          <div className="flex items-center justify-between gap-4">
            <div className="relative flex-1 max-w-sm">
              <input
                type="text"
                readOnly
                placeholder="Search projects..."
                className="w-full rounded-lg border border-[#D1D5DB] bg-white px-3 py-2 text-xs text-[#111827] placeholder-[#9CA3AF] outline-none"
              />
            </div>
            <div className="flex items-center gap-2">
              <div className="flex items-center gap-2 rounded-lg border border-[#D1D5DB] bg-white px-3 py-2 text-xs text-[#6B7280]">
                <span>All Statuses</span>
                <Icon name="chevronDown" size={14} />
              </div>
            </div>
          </div>

          <div
            data-tl="time-projects-table"
            className="rounded-xl border border-[#E5E7EB] bg-white shadow-sm overflow-hidden"
          >
            {loadingProjects ? (
              <div className="flex items-center justify-center p-8 text-xs text-[#6B7280]">
                <div className="h-4 w-4 animate-spin rounded-full border-2 border-[#7014D9] border-t-transparent mr-2" />
                Loading projects...
              </div>
            ) : (
              <table className="w-full text-left text-xs">
                <thead className="bg-gray-50 border-b border-[#E5E7EB] text-[#6B7280] font-semibold">
                  <tr>
                    <th className="py-3 px-4">Name</th>
                    <th className="py-3 px-4">Client</th>
                    <th className="py-3 px-4">Status</th>
                    <th className="py-3 px-4">Budget</th>
                    <th className="py-3 px-4">Date Range</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-[#F3F4F6] text-[#111827]">
                  {SAMPLE_TIME_TRACKER.projects.map((proj, idx) => (
                    <tr
                      key={idx}
                      data-tl="time-project-row"
                      className="hover:bg-gray-50/50"
                    >
                      <td className="py-3.5 px-4 font-semibold text-[#7014D9]">
                        {proj.name}
                      </td>
                      <td className="py-3.5 px-4 text-[#6B7280]">{proj.client}</td>
                      <td className="py-3.5 px-4">
                        <span className="rounded-full bg-[#DCFCE7] px-2.5 py-0.5 text-[11px] font-semibold text-[#166534]">
                          {proj.status}
                        </span>
                      </td>
                      <td className="py-3.5 px-4">
                        <div className="flex items-center gap-2">
                          <div className="h-1.5 w-16 rounded-full bg-gray-200 overflow-hidden">
                            <div className="h-full bg-[#10B981] w-[20%]" />
                          </div>
                          <span className="text-[11px] text-[#6B7280]">
                            {proj.budget}
                          </span>
                        </div>
                      </td>
                      <td className="py-3.5 px-4 text-[#4B5563]">
                        {proj.dateRange}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            )}
          </div>
        </div>
      )}

      {/* TAB 2: Jobs */}
      {activeTab === "jobs" && (
        <div className="space-y-4">
          <div className="flex items-center justify-between gap-4">
            <div className="relative flex-1 max-w-sm">
              <input
                type="text"
                readOnly
                placeholder="Search jobs..."
                className="w-full rounded-lg border border-[#D1D5DB] bg-white px-3 py-2 text-xs text-[#111827] placeholder-[#9CA3AF] outline-none"
              />
            </div>
            <div className="flex items-center gap-2">
              <div className="flex items-center gap-2 rounded-lg border border-[#D1D5DB] bg-white px-3 py-2 text-xs text-[#6B7280]">
                <span>All Statuses</span>
                <Icon name="chevronDown" size={14} />
              </div>
              <div className="flex items-center gap-2 rounded-lg border border-[#D1D5DB] bg-white px-3 py-2 text-xs text-[#6B7280]">
                <span>All Priorities</span>
                <Icon name="chevronDown" size={14} />
              </div>
            </div>
          </div>

          <div
            data-tl="time-jobs-table"
            className="rounded-xl border border-[#E5E7EB] bg-white shadow-sm overflow-hidden"
          >
            <table className="w-full text-left text-xs">
              <thead className="bg-gray-50 border-b border-[#E5E7EB] text-[#6B7280] font-semibold">
                <tr>
                  <th className="py-3 px-4">Title</th>
                  <th className="py-3 px-4">Status</th>
                  <th className="py-3 px-4">Priority</th>
                  <th className="py-3 px-4">Est. Hours</th>
                  <th className="py-3 px-4">Actual Hours</th>
                  <th className="py-3 px-4">Due Date</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-[#F3F4F6] text-[#111827]">
                {SAMPLE_TIME_TRACKER.jobs.map((jb, idx) => (
                  <tr
                    key={idx}
                    data-tl="time-job-row"
                    className="hover:bg-gray-50/50"
                  >
                    <td className="py-3.5 px-4 font-medium">
                      <span
                        data-tl="time-job-title"
                        className="text-[#DC2626] font-semibold hover:underline cursor-pointer"
                      >
                        {jb.title}
                      </span>
                    </td>
                    <td className="py-3.5 px-4">
                      <span
                        data-tl="time-job-status"
                        className="rounded-full bg-[#DBEAFE] px-2.5 py-0.5 text-[11px] font-semibold text-[#1D4ED8]"
                      >
                        {jb.status}
                      </span>
                    </td>
                    <td className="py-3.5 px-4">
                      <span
                        data-tl="time-job-priority"
                        className="rounded-full bg-[#FEF3C7] px-2.5 py-0.5 text-[11px] font-semibold text-[#B45309]"
                      >
                        {jb.priority}
                      </span>
                    </td>
                    <td className="py-3.5 px-4 text-[#4B5563]">{jb.estHours}</td>
                    <td className="py-3.5 px-4 text-[#4B5563]">{jb.actualHours}</td>
                    <td className="py-3.5 px-4">
                      <div
                        data-tl="time-job-due"
                        className="flex items-center gap-1.5 text-[#DC2626] font-medium"
                      >
                        <span>{jb.dueDate}</span>
                        {jb.overdue && (
                          <span className="text-[#DC2626] font-bold">▲</span>
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

      {/* TAB 3: Time Logs */}
      {activeTab === "logs" && (
        <div className="space-y-4">
          <div
            data-tl="time-log-filters"
            className="flex flex-wrap items-center justify-between gap-4"
          >
            <div className="flex items-center gap-3">
              <div className="flex items-center gap-2 rounded-lg border border-[#D1D5DB] bg-white px-3 py-2 text-xs text-[#9CA3AF]">
                <span>From dd/mm/yyyy</span>
                <Icon name="shCalendar" size={14} className="text-[#6B7280]" />
              </div>
              <div className="flex items-center gap-2 rounded-lg border border-[#D1D5DB] bg-white px-3 py-2 text-xs text-[#9CA3AF]">
                <span>To dd/mm/yyyy</span>
                <Icon name="shCalendar" size={14} className="text-[#6B7280]" />
              </div>
            </div>

            <button
              type="button"
              data-tl="time-log-add-btn"
              className="inline-flex items-center gap-1.5 rounded-lg bg-[#7014D9] px-4 py-2 text-xs font-semibold text-white hover:bg-[#5B0FB3] transition-colors shadow-sm"
            >
              <span>+ Log Time</span>
            </button>
          </div>

          <div className="flex items-center gap-3">
            <input
              type="text"
              readOnly
              placeholder="Search..."
              className="rounded-lg border border-[#D1D5DB] bg-white px-3 py-2 text-xs text-[#111827] placeholder-[#9CA3AF] outline-none max-w-xs"
            />
            <div className="flex items-center gap-2 rounded-lg border border-[#D1D5DB] bg-white px-3 py-2 text-xs text-[#6B7280]">
              <span>All Projects</span>
              <Icon name="chevronDown" size={14} />
            </div>
            <div className="flex items-center gap-2 rounded-lg border border-[#D1D5DB] bg-white px-3 py-2 text-xs text-[#6B7280]">
              <span>All (Billable)</span>
              <Icon name="chevronDown" size={14} />
            </div>
          </div>

          <div
            data-tl="time-logs-table"
            className="rounded-xl border border-[#E5E7EB] bg-white shadow-sm overflow-hidden"
          >
            <table className="w-full text-left text-xs">
              <thead className="bg-gray-50 border-b border-[#E5E7EB] text-[#6B7280] font-semibold">
                <tr>
                  <th className="py-3 px-4">Date</th>
                  <th className="py-3 px-4">Project</th>
                  <th className="py-3 px-4">Job</th>
                  <th className="py-3 px-4">Hours</th>
                  <th className="py-3 px-4">Description</th>
                  <th className="py-3 px-4">Billable</th>
                  <th className="py-3 px-4">Status</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-[#F3F4F6] text-[#111827]">
                {SAMPLE_TIME_TRACKER.timeLogs.map((log, idx) => (
                  <tr key={idx} className="hover:bg-gray-50/50">
                    <td className="py-3.5 px-4 font-medium">{log.date}</td>
                    <td className="py-3.5 px-4 text-[#4B5563]">{log.project}</td>
                    <td className="py-3.5 px-4 text-[#4B5563]">{log.job}</td>
                    <td className="py-3.5 px-4 font-semibold">{log.hours}</td>
                    <td className="py-3.5 px-4 text-[#9CA3AF]">{log.description}</td>
                    <td className="py-3.5 px-4 text-[#4B5563]">{log.billable}</td>
                    <td className="py-3.5 px-4">
                      <span className="rounded-full bg-[#FEF3C7] px-2.5 py-0.5 text-[11px] font-semibold text-[#B45309]">
                        {log.status}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>

            {/* Footer with totals */}
            <div
              data-tl="time-logs-footer"
              className="flex items-center justify-between bg-gray-50 px-4 py-3 border-t border-[#E5E7EB] text-xs font-medium text-[#4B5563]"
            >
              <div>
                Total matching hours:{" "}
                <span className="font-bold text-[#111827]">
                  {SAMPLE_TIME_TRACKER.totals.matching}
                </span>
              </div>
              <div className="flex items-center gap-6">
                <div>
                  Submitted:{" "}
                  <span className="font-bold text-[#111827]">
                    {SAMPLE_TIME_TRACKER.totals.submitted}
                  </span>
                </div>
                <div>
                  Not Submitted:{" "}
                  <span className="font-bold text-[#111827]">
                    {SAMPLE_TIME_TRACKER.totals.notSubmitted}
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* TAB 4: Timesheets */}
      {activeTab === "timesheets" && (
        <div className="space-y-4">
          <div className="flex flex-wrap items-center justify-between gap-4">
            <div
              data-tl="timesheets-range"
              className="flex items-center gap-3"
            >
              <div className="flex items-center gap-2 rounded-lg border border-[#D1D5DB] bg-white px-3 py-2 text-xs text-[#9CA3AF]">
                <span>From dd/mm/yyyy</span>
                <Icon name="shCalendar" size={14} className="text-[#6B7280]" />
              </div>
              <div className="flex items-center gap-2 rounded-lg border border-[#D1D5DB] bg-white px-3 py-2 text-xs text-[#9CA3AF]">
                <span>To dd/mm/yyyy</span>
                <Icon name="shCalendar" size={14} className="text-[#6B7280]" />
              </div>
            </div>

            <button
              type="button"
              data-tl="timesheets-submit-btn"
              className="inline-flex items-center gap-1.5 rounded-lg bg-[#7014D9] px-4 py-2 text-xs font-semibold text-white hover:bg-[#5B0FB3] transition-colors shadow-sm"
            >
              <span>Submit timesheet</span>
            </button>
          </div>

          <div
            data-tl="timesheets-expl"
            className="text-xs text-[#6B7280] leading-relaxed"
          >
            Submit all unsubmitted time logs in the selected period. Pending and
            approved entries are locked; rejected entries can be corrected and
            submitted again.
          </div>

          {/* Empty card */}
          <div
            data-tl="timesheets-empty-card"
            className="flex flex-col items-center justify-center rounded-xl border border-[#E5E7EB] bg-white p-16 text-center shadow-sm"
          >
            <div className="text-sm font-semibold text-[#111827]">
              No timesheets yet.
            </div>
            <div className="mt-1 text-xs text-[#6B7280]">
              Log time, then select a period above to submit it.
            </div>
          </div>

          {/* Pagination */}
          <div className="flex items-center justify-between text-xs text-[#6B7280] pt-2">
            <button type="button" className="hover:text-[#111827]">
              Previous
            </button>
            <span>Page 1 of 1</span>
            <button type="button" className="hover:text-[#111827]">
              Next
            </button>
          </div>
        </div>
      )}

      {/* TAB 5: Job Schedule */}
      {activeTab === "schedule" && (
        <div className="space-y-4">
          <div className="flex items-center justify-between border-b border-[#F3F4F6] pb-3">
            <div
              data-tl="schedule-controls"
              className="flex items-center gap-3"
            >
              <button
                type="button"
                className="flex h-7 w-7 items-center justify-center rounded-md border border-[#E5E7EB] bg-white text-[#6B7280] hover:bg-gray-50"
              >
                <Icon name="chevronLeft" size={14} />
              </button>
              <button
                type="button"
                className="rounded-md border border-[#E5E7EB] bg-white px-2.5 py-1 text-xs font-medium text-[#374151] hover:bg-gray-50"
              >
                Today
              </button>
              <button
                type="button"
                className="flex h-7 w-7 items-center justify-center rounded-md border border-[#E5E7EB] bg-white text-[#6B7280] hover:bg-gray-50"
              >
                <Icon name="chevronRight" size={14} />
              </button>

              <span className="text-xs font-semibold text-[#111827] ml-2">
                {scheduleMode === "week"
                  ? "Oct 26 - Nov 1, 2026"
                  : "October 2026"}
              </span>
            </div>

            {/* Week / Month Toggle */}
            <div className="flex items-center rounded-lg border border-[#E5E7EB] bg-gray-100 p-0.5 text-xs font-medium">
              <button
                type="button"
                data-tl="schedule-mode-week"
                onClick={() => tl.setVar("wfTimeScheduleMode", "week")}
                className={`rounded-md px-3 py-1 transition-colors ${
                  scheduleMode === "week"
                    ? "bg-[#7014D9] text-white font-semibold"
                    : "text-[#6B7280] hover:text-[#111827]"
                }`}
              >
                Week
              </button>
              <button
                type="button"
                data-tl="schedule-mode-month"
                onClick={() => tl.setVar("wfTimeScheduleMode", "month")}
                className={`rounded-md px-3 py-1 transition-colors ${
                  scheduleMode === "month"
                    ? "bg-[#7014D9] text-white font-semibold"
                    : "text-[#6B7280] hover:text-[#111827]"
                }`}
              >
                Month
              </button>
            </div>
          </div>

          <div
            data-tl="schedule-note"
            className="text-xs text-[#6B7280]"
          >
            Planned job hours by date. Select a day to view its assignments.
            Actual tracked hours are recorded in Time Logs.
          </div>

          {/* Schedule Grid */}
          {scheduleMode === "week" ? (
            <div
              data-tl="schedule-week-grid"
              className="grid grid-cols-7 gap-3 rounded-xl border border-[#E5E7EB] bg-white p-4 shadow-sm"
            >
              {weekDays.map((d, idx) => (
                <div
                  key={idx}
                  data-tl={d.isToday ? "schedule-today-cell" : undefined}
                  className={`min-h-[140px] rounded-lg border p-2 flex flex-col justify-between ${
                    d.isToday
                      ? "border-[#7014D9] bg-purple-50/30"
                      : "border-[#E5E7EB] bg-gray-50/50"
                  }`}
                >
                  <div className="flex items-center justify-between">
                    <span className="text-[11px] font-semibold text-[#6B7280]">
                      {d.name}
                    </span>
                    {d.isToday ? (
                      <span
                        data-tl="schedule-today-circle"
                        className="flex h-5 w-5 items-center justify-center rounded-full bg-[#7014D9] text-[10px] font-bold text-white"
                      >
                        {d.day}
                      </span>
                    ) : (
                      <span className="text-xs font-medium text-[#111827]">
                        {d.day}
                      </span>
                    )}
                  </div>
                  <div className="text-[10px] text-[#9CA3AF] text-center py-4">
                    No jobs
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div
              data-tl="schedule-month-grid"
              className="grid grid-cols-7 gap-2 rounded-xl border border-[#E5E7EB] bg-white p-4 shadow-sm"
            >
              {monthDays.map((d, idx) => (
                <div
                  key={idx}
                  data-tl={d.isToday ? "schedule-today-cell" : undefined}
                  className={`min-h-[70px] rounded-lg border p-2 flex flex-col justify-between ${
                    !d.isCurrentMonth
                      ? "border-transparent bg-gray-50/40 text-gray-300"
                      : d.isToday
                      ? "border-[#7014D9] bg-purple-50/30"
                      : "border-[#E5E7EB] bg-white"
                  }`}
                >
                  <div className="flex items-center justify-between">
                    {d.isToday ? (
                      <span
                        data-tl="schedule-today-circle"
                        className="flex h-5 w-5 items-center justify-center rounded-full bg-[#7014D9] text-[10px] font-bold text-white"
                      >
                        {d.day}
                      </span>
                    ) : (
                      <span
                        className={`text-xs font-medium ${
                          d.isCurrentMonth ? "text-[#111827]" : "text-gray-300"
                        }`}
                      >
                        {d.day}
                      </span>
                    )}
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      )}
    </div>
  );
}
