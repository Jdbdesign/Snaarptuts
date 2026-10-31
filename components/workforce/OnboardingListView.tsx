"use client";

import { Icon } from "@/components/icons";
import type { Timeline } from "@/lib/timeline";
import { useTimelineVar } from "@/lib/useTimelineVar";
import { SAMPLE_EMPLOYEE } from "./workforce-data";

type Props = {
  tl: Timeline;
  onOpenRecord?: () => void;
};

export function OnboardingListView({ tl, onOpenRecord }: Props) {
  const statusFilter = useTimelineVar<string>(tl, "wfOnboardingStatus", "Active");
  const searchQuery = useTimelineVar<string>(tl, "field:search-employee", "");

  return (
    <div className="flex flex-col gap-6 max-w-[1240px] mx-auto pb-16">
      {/* Title */}
      <div>
        <h2 className="text-xl font-bold text-[#111827]">My onboarding</h2>
      </div>

      {/* 3 Stat Cards */}
      <div className="grid grid-cols-3 gap-5">
        <div
          data-tl="stat-onboarding-active"
          className="flex flex-col justify-between p-5 rounded-2xl bg-white border border-[#E5E7EB] shadow-[0_1px_3px_rgba(0,0,0,0.02)]"
        >
          <span className="text-xs text-[#6B7280]">Active onboarding</span>
          <span className="text-2xl font-bold text-[#111827] mt-2">0</span>
        </div>
        <div
          data-tl="stat-onboarding-awaiting"
          className="flex flex-col justify-between p-5 rounded-2xl bg-white border border-[#E5E7EB] shadow-[0_1px_3px_rgba(0,0,0,0.02)]"
        >
          <span className="text-xs text-[#6B7280]">Awaiting review</span>
          <span className="text-2xl font-bold text-[#111827] mt-2">0</span>
        </div>
        <div
          data-tl="stat-onboarding-overdue"
          className="flex flex-col justify-between p-5 rounded-2xl bg-white border border-[#E5E7EB] shadow-[0_1px_3px_rgba(0,0,0,0.02)]"
        >
          <span className="text-xs text-[#6B7280]">Overdue tasks</span>
          <span className="text-2xl font-bold text-[#111827] mt-2">0</span>
        </div>
      </div>

      {/* Filter Row */}
      <div className="flex items-center gap-4">
        <div className="relative flex-1 max-w-sm">
          <input
            type="text"
            data-tl="input-search-employee"
            value={searchQuery}
            placeholder="Search employee name"
            onChange={(e) => tl.setVar("field:search-employee", e.target.value)}
            className="w-full h-10 px-4 rounded-xl border border-[#E5E7EB] bg-white text-xs text-[#111827] placeholder:text-[#9CA3AF] focus:outline-none focus:border-[#7014D9]"
          />
        </div>

        <div className="relative">
          <select
            data-tl="select-onboarding-status"
            value={statusFilter}
            onChange={(e) => tl.setVar("wfOnboardingStatus", e.target.value)}
            className="h-10 px-4 pr-9 rounded-xl border border-[#E5E7EB] bg-white text-xs text-[#111827] font-medium appearance-none focus:outline-none focus:border-[#7014D9] cursor-pointer"
          >
            <option value="All statuses">All statuses</option>
            <option value="Active">Active</option>
            <option value="Completed">Completed</option>
            <option value="Cancelled">Cancelled</option>
          </select>
          <div className="pointer-events-none absolute right-3 top-3 text-[#6B7280]">
            <Icon name="chevronDown" size={14} />
          </div>
        </div>
      </div>

      {/* Main Table or Empty State Card */}
      <div className="rounded-2xl bg-white border border-[#E5E7EB] shadow-[0_1px_3px_rgba(0,0,0,0.02)] overflow-hidden">
        {statusFilter === "Completed" ? (
          <div data-tl="onboarding-table" className="w-full">
            <table className="w-full text-left text-xs">
              <thead className="border-b border-[#F3F4F6] bg-gray-50/50 text-[#6B7280] font-medium">
                <tr>
                  <th className="py-3 px-6">Employee</th>
                  <th className="py-3 px-6">Start date</th>
                  <th className="py-3 px-6">Progress</th>
                  <th className="py-3 px-6">Status</th>
                  <th className="py-3 px-6 text-right">Action</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-[#F3F4F6]">
                <tr
                  data-tl="onboarding-row-1"
                  onClick={onOpenRecord}
                  className="hover:bg-purple-50/30 cursor-pointer transition-colors"
                >
                  <td className="py-4 px-6 font-semibold text-[#111827]">{SAMPLE_EMPLOYEE.name}</td>
                  <td className="py-4 px-6 text-[#4B5563]">30/10/2026</td>
                  <td className="py-4 px-6">
                    <div className="flex flex-col gap-1 w-48">
                      <span className="text-[11px] font-medium text-[#111827]">5/5 tasks</span>
                      <div
                        data-tl="onboarding-progress-bar"
                        className="h-2 w-full rounded-full bg-gray-100 overflow-hidden"
                      >
                        <div className="h-full w-full bg-[#16A34A] rounded-full" />
                      </div>
                    </div>
                  </td>
                  <td className="py-4 px-6">
                    <span className="inline-flex items-center px-2.5 py-1 rounded-full text-[11px] font-medium bg-green-50 text-[#16A34A] border border-green-200">
                      Completed
                    </span>
                  </td>
                  <td className="py-4 px-6 text-right">
                    <button
                      type="button"
                      data-tl="btn-view-onboarding"
                      onClick={(e) => {
                        e.stopPropagation();
                        onOpenRecord?.();
                      }}
                      className="px-3 py-1 rounded-lg border border-[#D1D5DB] text-xs font-medium text-[#4B5563] hover:bg-gray-50"
                    >
                      View
                    </button>
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        ) : (
          <div data-tl="onboarding-empty-msg" className="p-12 text-center text-xs text-[#6B7280]">
            No onboarding or preparation tasks have been assigned to you.
          </div>
        )}
      </div>

      {/* Pagination */}
      <div className="flex items-center justify-end gap-3 text-xs text-[#6B7280]">
        <button
          type="button"
          data-tl="pagination-prev"
          disabled
          className="opacity-50 cursor-not-allowed hover:text-[#111827]"
        >
          Previous
        </button>
        <span className="font-semibold text-[#111827]">Page 1</span>
        <button
          type="button"
          data-tl="pagination-next"
          disabled
          className="opacity-50 cursor-not-allowed hover:text-[#111827]"
        >
          Next
        </button>
      </div>
    </div>
  );
}
