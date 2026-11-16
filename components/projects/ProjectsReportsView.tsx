"use client";

import type { Timeline } from "@/lib/timeline";
import { useTimelineVar } from "@/lib/useTimelineVar";
import {
  BarChart2,
  CheckCircle2,
  TrendingUp,
  AlertCircle,
  Users,
  Clock,
} from "lucide-react";
import {
  INITIAL_REPORTS_DATA,
  type ReportsData,
} from "./projects-data";

interface Props {
  tl: Timeline;
}

export function ProjectsReportsView({ tl }: Props) {
  const reports = useTimelineVar<ReportsData>(
    tl,
    "reportsData",
    INITIAL_REPORTS_DATA
  );

  return (
    <div
      data-tl="projects-reports-view"
      className="space-y-6 max-w-7xl mx-auto font-sans select-none pb-12"
    >
      {/* Header */}
      <div className="flex items-center gap-3">
        <div className="w-9 h-9 rounded-xl bg-[#F5EEFF] text-[#7014D9] flex items-center justify-center">
          <BarChart2 className="w-5 h-5 text-[#7014D9]" />
        </div>
        <div>
          <h1
            data-tl="reports-page-title"
            className="text-2xl font-bold text-gray-900 tracking-tight"
          >
            Reports
          </h1>
          <p className="text-xs text-gray-500">
            Project metrics and task analytics
          </p>
        </div>
      </div>

      {/* 4 Stat Cards */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        {/* Total Tasks */}
        <div
          data-tl="report-stat-total-tasks"
          className="bg-white border border-gray-200/90 rounded-2xl p-4 shadow-2xs space-y-2"
        >
          <span className="text-xs font-semibold text-gray-600">Total Tasks</span>
          <div className="flex items-center gap-2">
            <CheckCircle2 className="w-4 h-4 text-[#7014D9]" />
            <span className="text-2xl font-bold text-gray-900">
              {reports.totalTasks}
            </span>
          </div>
        </div>

        {/* Completion Rate */}
        <div
          data-tl="report-stat-completion"
          className="bg-white border border-gray-200/90 rounded-2xl p-4 shadow-2xs space-y-2"
        >
          <span className="text-xs font-semibold text-gray-600">
            Completion Rate
          </span>
          <div className="flex items-center gap-2">
            <TrendingUp className="w-4 h-4 text-emerald-500" />
            <span className="text-2xl font-bold text-gray-900">
              {reports.completionRate}%
            </span>
          </div>
        </div>

        {/* Overdue */}
        <div
          data-tl="report-stat-overdue"
          className="bg-white border border-gray-200/90 rounded-2xl p-4 shadow-2xs space-y-2"
        >
          <span className="text-xs font-semibold text-gray-600">Overdue</span>
          <div className="flex items-center gap-2">
            <AlertCircle className="w-4 h-4 text-red-500" />
            <span className="text-2xl font-bold text-gray-900">
              {reports.overdue}
            </span>
          </div>
        </div>

        {/* Unassigned */}
        <div
          data-tl="report-stat-unassigned"
          className="bg-white border border-gray-200/90 rounded-2xl p-4 shadow-2xs space-y-2"
        >
          <span className="text-xs font-semibold text-gray-600">Unassigned</span>
          <div className="flex items-center gap-2">
            <Users className="w-4 h-4 text-amber-500" />
            <span className="text-2xl font-bold text-gray-900">
              {reports.unassigned}
            </span>
          </div>
        </div>
      </div>

      {/* Two Main Visual Cards */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Priority Distribution */}
        <div
          data-tl="report-priority-distribution"
          className="bg-white border border-gray-200/90 rounded-2xl p-6 shadow-2xs space-y-5"
        >
          <h2 className="text-base font-bold text-gray-900">
            Priority Distribution
          </h2>

          <div className="space-y-4 text-xs">
            {/* Urgent */}
            <div className="space-y-1">
              <div className="flex items-center justify-between text-gray-600">
                <span>Urgent</span>
                <span className="font-semibold text-gray-900">
                  {reports.priorityDistribution.urgent}
                </span>
              </div>
              <div className="h-2 w-full bg-gray-100 rounded-full overflow-hidden">
                <div
                  className="h-full bg-red-500 rounded-full"
                  style={{
                    width: `${(reports.priorityDistribution.urgent / 6) * 100}%`,
                  }}
                />
              </div>
            </div>

            {/* High */}
            <div className="space-y-1">
              <div className="flex items-center justify-between text-gray-600">
                <span>High</span>
                <span className="font-semibold text-gray-900">
                  {reports.priorityDistribution.high}
                </span>
              </div>
              <div className="h-2 w-full bg-gray-100 rounded-full overflow-hidden">
                <div
                  className="h-full bg-orange-500 rounded-full"
                  style={{
                    width: `${(reports.priorityDistribution.high / 6) * 100}%`,
                  }}
                />
              </div>
            </div>

            {/* Normal */}
            <div className="space-y-1">
              <div className="flex items-center justify-between text-gray-600">
                <span>Normal</span>
                <span className="font-semibold text-gray-900">
                  {reports.priorityDistribution.normal}
                </span>
              </div>
              <div className="h-2 w-full bg-gray-100 rounded-full overflow-hidden">
                <div
                  className="h-full bg-blue-600 rounded-full"
                  style={{
                    width: `${(reports.priorityDistribution.normal / 6) * 100}%`,
                  }}
                />
              </div>
            </div>

            {/* Low */}
            <div className="space-y-1">
              <div className="flex items-center justify-between text-gray-600">
                <span>Low</span>
                <span className="font-semibold text-gray-900">
                  {reports.priorityDistribution.low}
                </span>
              </div>
              <div className="h-2 w-full bg-gray-100 rounded-full overflow-hidden">
                <div
                  className="h-full bg-slate-600 rounded-full"
                  style={{
                    width: `${(reports.priorityDistribution.low / 6) * 100}%`,
                  }}
                />
              </div>
            </div>

            {/* None */}
            <div className="space-y-1">
              <div className="flex items-center justify-between text-gray-600">
                <span>None</span>
                <span className="font-semibold text-gray-900">
                  {reports.priorityDistribution.none}
                </span>
              </div>
              <div className="h-2 w-full bg-gray-100 rounded-full overflow-hidden">
                <div
                  className="h-full bg-gray-300 rounded-full"
                  style={{
                    width: `${(reports.priorityDistribution.none / 6) * 100}%`,
                  }}
                />
              </div>
            </div>
          </div>
        </div>

        {/* Task Summary */}
        <div
          data-tl="report-task-summary"
          className="bg-white border border-gray-200/90 rounded-2xl p-6 shadow-2xs space-y-4"
        >
          <h2 className="text-base font-bold text-gray-900">Task Summary</h2>

          <div className="space-y-2.5">
            {/* Tasks with due dates */}
            <div
              data-tl="report-summary-due"
              className="flex items-center justify-between p-3 rounded-xl bg-gray-50/70 hover:bg-gray-100/70 transition-colors text-xs"
            >
              <div className="flex items-center gap-2.5 text-gray-700">
                <Clock className="w-4 h-4 text-blue-500" />
                <span className="font-medium">Tasks with due dates</span>
              </div>
              <span className="font-bold text-gray-900">
                {reports.summary.tasksWithDueDates}
              </span>
            </div>

            {/* Urgent + High priority */}
            <div
              data-tl="report-summary-urgent"
              className="flex items-center justify-between p-3 rounded-xl bg-gray-50/70 hover:bg-gray-100/70 transition-colors text-xs"
            >
              <div className="flex items-center gap-2.5 text-gray-700">
                <AlertCircle className="w-4 h-4 text-red-500" />
                <span className="font-medium">Urgent + High priority</span>
              </div>
              <span className="font-bold text-gray-900">
                {reports.summary.urgentPlusHigh}
              </span>
            </div>

            {/* Assigned tasks */}
            <div
              data-tl="report-summary-assigned"
              className="flex items-center justify-between p-3 rounded-xl bg-gray-50/70 hover:bg-gray-100/70 transition-colors text-xs"
            >
              <div className="flex items-center gap-2.5 text-gray-700">
                <Users className="w-4 h-4 text-emerald-500" />
                <span className="font-medium">Assigned tasks</span>
              </div>
              <span className="font-bold text-gray-900">
                {reports.summary.assignedTasks}
              </span>
            </div>

            {/* Avg tasks per day */}
            <div
              data-tl="report-summary-avg"
              className="flex items-center justify-between p-3 rounded-xl bg-gray-50/70 hover:bg-gray-100/70 transition-colors text-xs"
            >
              <div className="flex items-center gap-2.5 text-gray-700">
                <TrendingUp className="w-4 h-4 text-[#7014D9]" />
                <span className="font-medium">Avg tasks per day</span>
              </div>
              <span className="font-bold text-gray-900">
                {reports.summary.avgTasksPerDay}
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
