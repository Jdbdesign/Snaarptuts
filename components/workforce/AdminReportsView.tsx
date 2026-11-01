"use client";

import { Icon } from "@/components/icons";
import type { Timeline } from "@/lib/timeline";
import { useTimelineVar } from "@/lib/useTimelineVar";
import { ADMIN_REPORTS_DATA, URLS } from "./workforce-data";

export type AdminReportsSubpage = "hub" | "attendance" | "leave" | "headcount" | "onboarding";

type Props = {
  tl: Timeline;
  subpage?: AdminReportsSubpage;
  onNavigateSub?: (sub: AdminReportsSubpage) => void;
};

export function AdminReportsView({ tl, subpage = "hub", onNavigateSub }: Props) {
  const currentSub = useTimelineVar<AdminReportsSubpage>(tl, "wfReportsSub", subpage);
  const isLoading = useTimelineVar(tl, "wfReportLoading", false);

  const { hubCards, attendance, leave, headcount, onboarding } = ADMIN_REPORTS_DATA;

  const navigateTo = (target: AdminReportsSubpage) => {
    tl.setVar("wfReportsSub", target);
    if (onNavigateSub) {
      onNavigateSub(target);
    } else {
      if (target === "hub") {
        tl.setVar("wfPage", "reports");
        tl.setUrl(URLS.reports);
      } else if (target === "attendance") {
        tl.setVar("wfPage", "reports-attendance");
        tl.setUrl(URLS.reportsAttendance);
      } else if (target === "leave") {
        tl.setVar("wfPage", "reports-leave");
        tl.setUrl(URLS.reportsLeave);
      } else if (target === "headcount") {
        tl.setVar("wfPage", "reports-headcount");
        tl.setUrl(URLS.reportsHeadcount);
      } else if (target === "onboarding") {
        tl.setVar("wfPage", "reports-onboarding");
        tl.setUrl(URLS.reportsOnboarding);
      }
    }
  };

  return (
    <div className="flex flex-col gap-6 max-w-6xl mx-auto pb-16">
      {/* 1. REPORTS HUB (Step 118) */}
      {currentSub === "hub" && (
        <div className="flex flex-col gap-6">
          <div>
            <h2 data-tl="reports-hub-heading" className="text-xl font-bold text-[#111827]">
              Reports
            </h2>
            <p className="text-xs text-[#6B7280] mt-0.5">
              Insights and analytics across workforce
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
            {hubCards.map((c) => (
              <div
                key={c.id}
                data-tl={`card-report-${c.id}`}
                onClick={() => navigateTo(c.id as AdminReportsSubpage)}
                className="p-6 rounded-xl border border-[#E5E7EB] bg-white shadow-xs hover:border-[#D8B4FE] hover:shadow-md transition-all cursor-pointer flex flex-col justify-between"
              >
                <div>
                  <div className="flex items-center justify-between mb-3">
                    <span className="flex h-10 w-10 items-center justify-center rounded-xl bg-[#FAF5FF] text-[#7014D9]">
                      <Icon name="shChart" size={20} />
                    </span>
                    <Icon name="chevronRight" size={16} className="text-[#9CA3AF]" />
                  </div>
                  <h3 className="text-base font-bold text-[#111827]">{c.title}</h3>
                  <p className="text-xs text-[#6B7280] mt-1.5 leading-relaxed">
                    {c.desc}
                  </p>
                </div>
                <div className="mt-5 pt-3 border-t border-[#F3F4F6] flex items-center text-xs font-semibold text-[#7014D9]">
                  <span>Open report →</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* 2. ATTENDANCE REPORT (Step 119) */}
      {currentSub === "attendance" && (
        <div className="flex flex-col gap-6">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <button
                type="button"
                data-tl="btn-back-to-reports"
                onClick={() => navigateTo("hub")}
                className="flex h-8 w-8 items-center justify-center rounded-lg border border-[#E5E7EB] bg-white text-[#4B5563] hover:bg-gray-50 transition-colors shadow-xs"
              >
                <Icon name="chevronLeft" size={16} />
              </button>
              <div>
                <h2 data-tl="reports-attendance-heading" className="text-xl font-bold text-[#111827]">
                  Attendance Report
                </h2>
                <p className="text-xs text-[#6B7280] mt-0.5">
                  Showing records for October 2026
                </p>
              </div>
            </div>

            <div className="flex items-center gap-2">
              <button
                type="button"
                data-tl="btn-export-csv"
                className="px-3 py-1.5 rounded-lg border border-[#D1D5DB] bg-white text-xs font-semibold text-[#374151] hover:bg-gray-50"
              >
                Export CSV
              </button>
              <button
                type="button"
                data-tl="btn-export-pdf"
                className="px-3 py-1.5 rounded-lg border border-[#D1D5DB] bg-white text-xs font-semibold text-[#374151] hover:bg-gray-50"
              >
                Export PDF
              </button>
            </div>
          </div>

          {/* Filters */}
          <div className="flex flex-wrap items-center gap-3 bg-white p-3.5 rounded-xl border border-[#E5E7EB] shadow-xs text-xs">
            <div className="flex items-center gap-2">
              <span className="text-[#6B7280] font-medium">Start:</span>
              <input
                type="text"
                readOnly
                data-tl="input-att-start-date"
                value="01/10/2026"
                className="w-28 px-2.5 py-1.5 rounded-lg border border-[#D1D5DB] bg-white text-[#111827]"
              />
            </div>
            <div className="flex items-center gap-2">
              <span className="text-[#6B7280] font-medium">End:</span>
              <input
                type="text"
                readOnly
                data-tl="input-att-end-date"
                value="30/10/2026"
                className="w-28 px-2.5 py-1.5 rounded-lg border border-[#D1D5DB] bg-white text-[#111827]"
              />
            </div>
            <div className="flex items-center gap-2">
              <span className="text-[#6B7280] font-medium">Dept:</span>
              <div
                data-tl="select-att-dept"
                className="px-3 py-1.5 rounded-lg border border-[#D1D5DB] bg-white text-[#111827] flex items-center gap-2"
              >
                <span>All Departments</span>
                <Icon name="chevronDown" size={13} className="text-[#9CA3AF]" />
              </div>
            </div>
            <button
              type="button"
              data-tl="btn-apply-att-filter"
              className="ml-auto px-4 py-1.5 rounded-lg bg-[#7014D9] hover:bg-[#5E10B8] text-white font-semibold transition-colors shadow-xs"
            >
              Apply
            </button>
          </div>

          {/* Table / Loading State */}
          {isLoading ? (
            <div className="p-12 text-center bg-white rounded-xl border border-[#E5E7EB]">
              <div className="inline-block animate-spin rounded-full h-8 w-8 border-b-2 border-[#7014D9]" />
              <p className="mt-3 text-xs text-[#6B7280] font-medium">Loading report data...</p>
            </div>
          ) : (
            <div className="rounded-xl border border-[#E5E7EB] bg-white overflow-hidden shadow-xs">
              <table data-tl="table-attendance-report" className="w-full text-left text-xs">
                <thead className="bg-[#F9FAFB] text-[#6B7280] uppercase tracking-wider font-semibold border-b border-[#E5E7EB]">
                  <tr>
                    <th className="py-3 px-4">Employee Code</th>
                    <th className="py-3 px-4">Employee Name</th>
                    <th className="py-3 px-4">Department</th>
                    <th className="py-3 px-4">Total Days</th>
                    <th className="py-3 px-4">Present</th>
                    <th className="py-3 px-4">Absent</th>
                    <th className="py-3 px-4">Late</th>
                    <th className="py-3 px-4 text-right">Total Hours</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-[#F3F4F6] text-[#111827]">
                  {attendance.map((row) => (
                    <tr key={row.code} className="hover:bg-gray-50 transition-colors">
                      <td className="py-3.5 px-4 font-semibold text-[#7014D9]">{row.code}</td>
                      <td className="py-3.5 px-4 font-semibold">{row.name}</td>
                      <td className="py-3.5 px-4 text-[#4B5563]">{row.department}</td>
                      <td className="py-3.5 px-4 text-[#6B7280]">{row.totalDays}</td>
                      <td className="py-3.5 px-4 font-medium text-[#059669]">{row.present}</td>
                      <td className="py-3.5 px-4 font-medium text-[#EF4444]">{row.absent}</td>
                      <td className="py-3.5 px-4 text-[#D97706]">{row.late}</td>
                      <td className="py-3.5 px-4 text-right font-bold text-[#111827]">{row.totalHours}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
              <div className="p-3 bg-[#F9FAFB] border-t border-[#E5E7EB] text-xs text-[#6B7280] text-right font-medium">
                Showing 3 of 3 records
              </div>
            </div>
          )}
        </div>
      )}

      {/* 3. LEAVE REPORT (Step 120) */}
      {currentSub === "leave" && (
        <div className="flex flex-col gap-6">
          <div className="flex items-center gap-3">
            <button
              type="button"
              data-tl="btn-back-to-reports"
              onClick={() => navigateTo("hub")}
              className="flex h-8 w-8 items-center justify-center rounded-lg border border-[#E5E7EB] bg-white text-[#4B5563] hover:bg-gray-50 transition-colors shadow-xs"
            >
              <Icon name="chevronLeft" size={16} />
            </button>
            <div>
              <h2 data-tl="reports-leave-heading" className="text-xl font-bold text-[#111827]">
                Leave Report
              </h2>
              <p className="text-xs text-[#6B7280] mt-0.5">
                Annual leave allowances, taken days and remaining balances
              </p>
            </div>
          </div>

          <div className="rounded-xl border border-[#E5E7EB] bg-white overflow-hidden shadow-xs">
            <table data-tl="table-leave-report" className="w-full text-left text-xs">
              <thead className="bg-[#F9FAFB] text-[#6B7280] uppercase tracking-wider font-semibold border-b border-[#E5E7EB]">
                <tr>
                  <th className="py-3 px-4">Employee Code</th>
                  <th className="py-3 px-4">Employee Name</th>
                  <th className="py-3 px-4">Department</th>
                  <th className="py-3 px-4">Leave Type</th>
                  <th className="py-3 px-4">Balance</th>
                  <th className="py-3 px-4">Used</th>
                  <th className="py-3 px-4 text-right">Remaining</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-[#F3F4F6] text-[#111827]">
                {leave.map((row) => (
                  <tr key={row.code} className="hover:bg-gray-50 transition-colors">
                    <td className="py-3.5 px-4 font-semibold text-[#7014D9]">{row.code}</td>
                    <td className="py-3.5 px-4 font-semibold">{row.name}</td>
                    <td className="py-3.5 px-4 text-[#4B5563]">{row.department}</td>
                    <td className="py-3.5 px-4">{row.leaveType}</td>
                    <td className="py-3.5 px-4 text-[#6B7280]">{row.balance} days</td>
                    <td className="py-3.5 px-4 text-[#EF4444] font-medium">{row.used} days</td>
                    <td className="py-3.5 px-4 text-right font-bold text-[#059669]">{row.remaining} days</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* 4. HEADCOUNT REPORT (Step 121) */}
      {currentSub === "headcount" && (
        <div className="flex flex-col gap-6">
          <div className="flex items-center gap-3">
            <button
              type="button"
              data-tl="btn-back-to-reports"
              onClick={() => navigateTo("hub")}
              className="flex h-8 w-8 items-center justify-center rounded-lg border border-[#E5E7EB] bg-white text-[#4B5563] hover:bg-gray-50 transition-colors shadow-xs"
            >
              <Icon name="chevronLeft" size={16} />
            </button>
            <div>
              <h2 data-tl="reports-headcount-heading" className="text-xl font-bold text-[#111827]">
                Headcount Report
              </h2>
              <p className="text-xs text-[#6B7280] mt-0.5">
                Organizational size, department breakdown and employment statuses
              </p>
            </div>
          </div>

          <div
            data-tl="card-total-headcount"
            className="p-5 rounded-xl border border-[#E5E7EB] bg-white shadow-xs max-w-sm"
          >
            <span className="text-xs font-semibold text-[#6B7280]">Total Active Headcount</span>
            <div className="text-3xl font-bold text-[#111827] mt-1">3</div>
            <p className="text-[11px] text-[#059669] mt-1 font-medium">100% active retention</p>
          </div>

          <div className="rounded-xl border border-[#E5E7EB] bg-white overflow-hidden shadow-xs">
            <table data-tl="table-headcount-report" className="w-full text-left text-xs">
              <thead className="bg-[#F9FAFB] text-[#6B7280] uppercase tracking-wider font-semibold border-b border-[#E5E7EB]">
                <tr>
                  <th className="py-3 px-4">Department</th>
                  <th className="py-3 px-4">Status</th>
                  <th className="py-3 px-4 text-right">Count</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-[#F3F4F6] text-[#111827]">
                {headcount.map((row, i) => (
                  <tr key={i} className="hover:bg-gray-50 transition-colors">
                    <td className="py-3.5 px-4 font-semibold text-[#111827]">{row.department}</td>
                    <td className="py-3.5 px-4">
                      <span className="px-2.5 py-0.5 rounded-full text-[10px] font-semibold bg-[#D1FAE5] text-[#065F46]">
                        {row.status}
                      </span>
                    </td>
                    <td className="py-3.5 px-4 text-right font-bold text-[#7014D9]">{row.count}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* 5. ONBOARDING REPORT (Step 122) */}
      {currentSub === "onboarding" && (
        <div className="flex flex-col gap-6">
          <div className="flex items-center gap-3">
            <button
              type="button"
              data-tl="btn-back-to-reports"
              onClick={() => navigateTo("hub")}
              className="flex h-8 w-8 items-center justify-center rounded-lg border border-[#E5E7EB] bg-white text-[#4B5563] hover:bg-gray-50 transition-colors shadow-xs"
            >
              <Icon name="chevronLeft" size={16} />
            </button>
            <div>
              <h2 data-tl="reports-onboarding-heading" className="text-xl font-bold text-[#111827]">
                Onboarding Report
              </h2>
              <p className="text-xs text-[#6B7280] mt-0.5">
                Track new joiner progress and induction task completion
              </p>
            </div>
          </div>

          <div className="flex items-center gap-3 bg-white p-3 rounded-xl border border-[#E5E7EB] shadow-xs text-xs">
            <div className="flex items-center gap-2">
              <span className="text-[#6B7280] font-medium">Status:</span>
              <div className="px-3 py-1.5 rounded-lg border border-[#D1D5DB] bg-white font-medium text-[#111827] flex items-center gap-2">
                <span>All Statuses</span>
                <Icon name="chevronDown" size={13} className="text-[#9CA3AF]" />
              </div>
            </div>
            <button
              type="button"
              data-tl="btn-apply-onboarding-filter"
              className="ml-auto px-4 py-1.5 rounded-lg bg-[#7014D9] hover:bg-[#5E10B8] text-white font-semibold transition-colors shadow-xs"
            >
              Apply
            </button>
          </div>

          <div className="rounded-xl border border-[#E5E7EB] bg-white overflow-hidden shadow-xs">
            <table data-tl="table-onboarding-report" className="w-full text-left text-xs">
              <thead className="bg-[#F9FAFB] text-[#6B7280] uppercase tracking-wider font-semibold border-b border-[#E5E7EB]">
                <tr>
                  <th className="py-3 px-4">Employee Code</th>
                  <th className="py-3 px-4">Employee Name</th>
                  <th className="py-3 px-4">Department</th>
                  <th className="py-3 px-4">Status</th>
                  <th className="py-3 px-4 text-right">Joined Date</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-[#F3F4F6] text-[#111827]">
                {onboarding.map((row) => (
                  <tr key={row.code} className="hover:bg-gray-50 transition-colors">
                    <td className="py-3.5 px-4 font-semibold text-[#7014D9]">{row.code}</td>
                    <td className="py-3.5 px-4 font-semibold">{row.name}</td>
                    <td className="py-3.5 px-4 text-[#4B5563]">{row.department}</td>
                    <td className="py-3.5 px-4">
                      <span
                        className={`px-2 py-0.5 rounded-full text-[10px] font-semibold ${
                          row.status === "COMPLETED"
                            ? "bg-[#D1FAE5] text-[#065F46]"
                            : "bg-[#FEF3C7] text-[#92400E]"
                        }`}
                      >
                        {row.status}
                      </span>
                    </td>
                    <td className="py-3.5 px-4 text-right text-[#6B7280]">{row.joinedDate}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}
    </div>
  );
}
