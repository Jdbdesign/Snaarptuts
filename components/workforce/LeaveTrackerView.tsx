"use client";

import type { Timeline } from "@/lib/timeline";
import { useTimelineVar } from "@/lib/useTimelineVar";
import { Icon } from "@/components/icons";
import { SAMPLE_LEAVE, SAMPLE_EMPLOYEE } from "./workforce-data";

type Props = {
  tl: Timeline;
  onBack?: () => void;
};

export function LeaveTrackerView({ tl, onBack }: Props) {
  const activeTab = useTimelineVar<"summary" | "requests" | "shift">(
    tl,
    "wfLeaveTab",
    "summary"
  );
  const loading = useTimelineVar(tl, "wfLeaveLoading", false);
  const modalOpen = useTimelineVar(tl, "wfRequestLeaveOpen", false);
  const detailsOpen = useTimelineVar(tl, "wfLeaveDetailsOpen", false);

  return (
    <div
      data-scroller="leave"
      className="h-full overflow-y-auto no-scrollbar p-6 bg-[#F9FAFB] space-y-6"
    >
      {/* Top back & actions bar */}
      <div className="flex items-center justify-between">
        <button
          type="button"
          data-tl="leave-back-btn"
          onClick={onBack}
          className="inline-flex items-center gap-1.5 rounded-lg border border-[#E5E7EB] bg-white px-3 py-1.5 text-xs font-medium text-[#4B5563] hover:bg-gray-50 transition-colors shadow-sm"
        >
          <Icon name="chevronLeft" size={14} />
          <span>Back</span>
        </button>

        <button
          type="button"
          data-tl="leave-request-btn"
          onClick={() => tl.setVar("wfRequestLeaveOpen", true)}
          className="inline-flex items-center gap-1.5 rounded-lg bg-[#7014D9] px-4 py-2 text-xs font-semibold text-white hover:bg-[#5B0FB3] transition-colors shadow-sm"
        >
          <span>+ Request Leave</span>
        </button>
      </div>

      {/* Heading */}
      <div>
        <h1
          data-tl="leave-heading"
          className="text-xl font-bold text-[#111827]"
        >
          Leave Tracker
        </h1>
      </div>

      {/* Tabs */}
      <div className="flex border-b border-[#E5E7EB] gap-6 text-sm font-medium">
        <button
          type="button"
          data-tl="leave-tab-summary"
          onClick={() => tl.setVar("wfLeaveTab", "summary")}
          className={`pb-3 transition-colors ${
            activeTab === "summary"
              ? "border-b-2 border-[#7014D9] text-[#7014D9] font-semibold"
              : "text-[#6B7280] hover:text-[#111827]"
          }`}
        >
          Leave Summary
        </button>
        <button
          type="button"
          data-tl="leave-tab-requests"
          onClick={() => tl.setVar("wfLeaveTab", "requests")}
          className={`pb-3 transition-colors ${
            activeTab === "requests"
              ? "border-b-2 border-[#7014D9] text-[#7014D9] font-semibold"
              : "text-[#6B7280] hover:text-[#111827]"
          }`}
        >
          Leave Requests
        </button>
        <button
          type="button"
          data-tl="leave-tab-shift"
          onClick={() => tl.setVar("wfLeaveTab", "shift")}
          className={`pb-3 transition-colors ${
            activeTab === "shift"
              ? "border-b-2 border-[#7014D9] text-[#7014D9] font-semibold"
              : "text-[#6B7280] hover:text-[#111827]"
          }`}
        >
          Shift
        </button>
      </div>

      {/* TAB 1: Leave Summary */}
      {activeTab === "summary" && (
        <div className="space-y-6">
          {loading ? (
            <div
              data-tl="leave-loading-card"
              className="flex items-center justify-center rounded-xl border border-[#E5E7EB] bg-white p-12 text-sm text-[#6B7280] shadow-sm"
            >
              <div className="flex items-center gap-2">
                <div className="h-4 w-4 animate-spin rounded-full border-2 border-[#7014D9] border-t-transparent" />
                <span>Loading...</span>
              </div>
            </div>
          ) : (
            <>
              {/* 4 Overview cards */}
              <div
                data-tl="leave-summary-cards"
                className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4"
              >
                <div
                  data-tl="leave-card-allowance"
                  className="rounded-xl border border-[#E5E7EB] bg-white p-5 shadow-sm"
                >
                  <span className="text-[11px] font-semibold tracking-wider text-[#6B7280] uppercase">
                    ALLOWANCE
                  </span>
                  <div className="mt-2 text-2xl font-bold text-[#111827]">
                    7 days
                  </div>
                </div>

                <div
                  data-tl="leave-card-carried"
                  className="rounded-xl border border-[#E5E7EB] bg-white p-5 shadow-sm"
                >
                  <span className="text-[11px] font-semibold tracking-wider text-[#6B7280] uppercase">
                    CARRIED FORWARD
                  </span>
                  <div className="mt-2 text-2xl font-bold text-[#111827]">
                    0 days
                  </div>
                </div>

                <div
                  data-tl="leave-card-booked"
                  className="rounded-xl border border-[#E5E7EB] bg-white p-5 shadow-sm"
                >
                  <span className="text-[11px] font-semibold tracking-wider text-[#6B7280] uppercase">
                    BOOKED &amp; TAKEN
                  </span>
                  <div className="mt-2 text-2xl font-bold text-[#111827]">
                    2 days
                  </div>
                </div>

                <div
                  data-tl="leave-card-available"
                  className="rounded-xl border border-[#86EFAC] bg-[#DCFCE7] p-5 shadow-sm"
                >
                  <span className="text-[11px] font-semibold tracking-wider text-[#166534] uppercase">
                    AVAILABLE
                  </span>
                  <div className="mt-2 text-2xl font-bold text-[#166534]">
                    5 days
                  </div>
                </div>
              </div>

              {/* By leave type */}
              <div className="space-y-3">
                <h2 className="text-sm font-semibold text-[#111827]">
                  By leave type
                </h2>
                <div
                  data-tl="leave-type-sick"
                  className="max-w-md rounded-xl border border-[#E5E7EB] bg-white p-5 shadow-sm flex items-center justify-between"
                >
                  <div>
                    <div className="font-semibold text-sm text-[#111827]">
                      {SAMPLE_LEAVE.byType.name}
                    </div>
                    <div className="text-xs text-[#6B7280] mt-0.5">
                      {SAMPLE_LEAVE.byType.availableText}
                    </div>
                  </div>
                  <span className="rounded-full bg-[#DCFCE7] px-2.5 py-1 text-xs font-semibold text-[#166534]">
                    Available
                  </span>
                </div>
              </div>
            </>
          )}
        </div>
      )}

      {/* TAB 2: Leave Requests */}
      {activeTab === "requests" && (
        <div
          data-tl="leave-requests-table"
          className="rounded-xl border border-[#E5E7EB] bg-white shadow-sm overflow-hidden"
        >
          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs">
              <thead className="bg-gray-50 border-b border-[#E5E7EB] text-[#6B7280] font-semibold">
                <tr>
                  <th className="py-3 px-4">Type</th>
                  <th className="py-3 px-4">Start</th>
                  <th className="py-3 px-4">End</th>
                  <th className="py-3 px-4">Days</th>
                  <th className="py-3 px-4">Status</th>
                  <th className="py-3 px-4">Reason</th>
                  <th className="py-3 px-4 text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-[#F3F4F6] text-[#111827]">
                {SAMPLE_LEAVE.requests.map((req) => (
                  <tr key={req.id} className="hover:bg-gray-50/50">
                    <td className="py-3.5 px-4 font-medium">{req.type}</td>
                    <td className="py-3.5 px-4 text-[#4B5563]">{req.start}</td>
                    <td className="py-3.5 px-4 text-[#4B5563]">{req.end}</td>
                    <td className="py-3.5 px-4">{req.days}</td>
                    <td className="py-3.5 px-4">
                      <span className="rounded-full bg-[#DCFCE7] px-2.5 py-0.5 text-[11px] font-semibold text-[#166534]">
                        {req.status}
                      </span>
                    </td>
                    <td className="py-3.5 px-4 text-[#6B7280]">{req.reason}</td>
                    <td className="py-3.5 px-4 text-right">
                      <button
                        type="button"
                        data-tl="leave-row-actions"
                        onClick={() => tl.setVar("wfLeaveDetailsOpen", true)}
                        className="rounded-lg p-1.5 text-[#6B7280] hover:bg-gray-100 transition-colors"
                        title="Actions"
                      >
                        <Icon name="dots" size={16} />
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* TAB 3: Shift */}
      {activeTab === "shift" && (
        <div
          data-tl="shift-card"
          className="rounded-xl border border-[#E5E7EB] bg-white p-6 shadow-sm space-y-4 max-w-2xl"
        >
          <div className="flex items-center justify-between border-b border-[#F3F4F6] pb-4">
            <h2 className="text-sm font-semibold text-[#6B7280] uppercase tracking-wider">
              My shift
            </h2>
            <span
              data-tl="shift-name"
              className="rounded-md bg-[#EDE9FE] px-2.5 py-1 text-xs font-bold text-[#7014D9]"
            >
              {SAMPLE_LEAVE.shift.name}
            </span>
          </div>

          <div
            data-tl="shift-hours"
            className="text-2xl font-bold text-[#111827]"
          >
            {SAMPLE_LEAVE.shift.hours}
          </div>

          <div
            data-tl="shift-grace"
            className="text-xs text-[#4B5563] font-medium"
          >
            {SAMPLE_LEAVE.shift.details}
          </div>

          <div
            data-tl="shift-note"
            className="rounded-lg bg-gray-50 p-3 text-xs text-[#6B7280] leading-relaxed border border-[#E5E7EB]"
          >
            {SAMPLE_LEAVE.shift.note}
          </div>
        </div>
      )}

      {/* MODAL 1: Request Leave */}
      {modalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 p-4">
          <div
            data-tl="leave-modal"
            className="relative w-full max-w-lg rounded-2xl bg-white p-6 shadow-2xl max-h-[90vh] overflow-y-auto no-scrollbar"
          >
            <div className="flex items-center justify-between border-b border-[#F3F4F6] pb-4">
              <h2 className="text-base font-bold text-[#111827]">
                Request Leave
              </h2>
              <button
                type="button"
                data-tl="leave-modal-close"
                onClick={() => tl.setVar("wfRequestLeaveOpen", false)}
                className="rounded-lg p-1 text-[#9CA3AF] hover:bg-gray-100 hover:text-[#111827] transition-colors"
              >
                <Icon name="x" size={18} />
              </button>
            </div>

            <div className="mt-5 space-y-4 text-xs">
              {/* Leave type */}
              <div>
                <label className="block font-semibold text-[#374151] mb-1.5">
                  Leave Type
                </label>
                <div
                  data-tl="leave-field-type"
                  className="flex items-center justify-between rounded-lg border border-[#D1D5DB] bg-white px-3 py-2 text-[#6B7280]"
                >
                  <span>Select leave type</span>
                  <Icon name="chevronDown" size={14} />
                </div>
              </div>

              {/* Start Date & End Date */}
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block font-semibold text-[#374151] mb-1.5">
                    Start Date
                  </label>
                  <div
                    data-tl="leave-field-start"
                    className="flex items-center justify-between rounded-lg border border-[#D1D5DB] bg-white px-3 py-2 text-[#9CA3AF]"
                  >
                    <span>dd/mm/yyyy</span>
                    <Icon name="shCalendar" size={14} className="text-[#6B7280]" />
                  </div>
                </div>

                <div>
                  <label className="block font-semibold text-[#374151] mb-1.5">
                    End Date
                  </label>
                  <div
                    data-tl="leave-field-end"
                    className="flex items-center justify-between rounded-lg border border-[#D1D5DB] bg-white px-3 py-2 text-[#9CA3AF]"
                  >
                    <span>dd/mm/yyyy</span>
                    <Icon name="shCalendar" size={14} className="text-[#6B7280]" />
                  </div>
                </div>
              </div>

              {/* Team Email (CC) */}
              <div>
                <label className="block font-semibold text-[#374151] mb-1.5">
                  Team Email (CC)
                </label>
                <input
                  type="text"
                  readOnly
                  data-tl="leave-field-email"
                  placeholder="team@company.com"
                  className="w-full rounded-lg border border-[#D1D5DB] bg-white px-3 py-2 text-[#111827] placeholder-[#9CA3AF] outline-none"
                />
              </div>

              {/* Reason */}
              <div>
                <label className="block font-semibold text-[#374151] mb-1.5">
                  Reason
                </label>
                <textarea
                  readOnly
                  rows={3}
                  data-tl="leave-field-reason"
                  placeholder="Please provide a reason for your leave request..."
                  className="w-full rounded-lg border border-[#D1D5DB] bg-white p-3 text-[#111827] placeholder-[#9CA3AF] outline-none resize-none"
                />
              </div>

              {/* Apply Leave button */}
              <div className="pt-2">
                <button
                  type="button"
                  data-tl="leave-submit-btn"
                  className="w-full rounded-lg bg-[#7014D9] py-2.5 text-xs font-semibold text-white hover:bg-[#5B0FB3] transition-colors shadow-sm"
                >
                  Apply Leave
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* MODAL 2: Leave Request Details */}
      {detailsOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 p-4">
          <div
            data-tl="leave-details-modal"
            className="relative w-full max-w-lg rounded-2xl bg-white p-6 shadow-2xl max-h-[90vh] overflow-y-auto no-scrollbar"
          >
            <div className="flex items-center justify-between border-b border-[#F3F4F6] pb-4">
              <h2 className="text-base font-bold text-[#111827]">
                Leave request details
              </h2>
              <button
                type="button"
                data-tl="leave-details-close"
                onClick={() => tl.setVar("wfLeaveDetailsOpen", false)}
                className="rounded-lg p-1 text-[#9CA3AF] hover:bg-gray-100 hover:text-[#111827] transition-colors"
              >
                <Icon name="x" size={18} />
              </button>
            </div>

            <div className="mt-5 space-y-4 text-xs divide-y divide-[#F3F4F6]">
              <div className="flex justify-between items-center py-2">
                <span className="text-[#6B7280]">Leave type</span>
                <span
                  data-tl="leave-details-type"
                  className="font-semibold text-[#111827]"
                >
                  Sick leave
                </span>
              </div>

              <div className="flex justify-between items-center py-2">
                <span className="text-[#6B7280]">Employee</span>
                <span className="font-semibold text-[#111827]">
                  {SAMPLE_EMPLOYEE.name}
                </span>
              </div>

              <div className="flex justify-between items-center py-2">
                <span className="text-[#6B7280]">Status</span>
                <span
                  data-tl="leave-details-status"
                  className="rounded-full bg-[#DCFCE7] px-2.5 py-0.5 text-[11px] font-semibold text-[#166534]"
                >
                  APPROVED
                </span>
              </div>

              <div className="flex justify-between items-center py-2">
                <span className="text-[#6B7280]">Start date</span>
                <span
                  data-tl="leave-details-start"
                  className="font-medium text-[#111827]"
                >
                  2026-10-20
                </span>
              </div>

              <div className="flex justify-between items-center py-2">
                <span className="text-[#6B7280]">End date</span>
                <span
                  data-tl="leave-details-end"
                  className="font-medium text-[#111827]"
                >
                  2026-10-22
                </span>
              </div>

              <div className="flex justify-between items-center py-2">
                <span className="text-[#6B7280]">Days requested</span>
                <span className="font-semibold text-[#111827]">2</span>
              </div>

              <div className="flex justify-between items-center py-2">
                <span className="text-[#6B7280]">Submitted</span>
                <span className="text-[#4B5563]">19/10/2026, 7:52:04 AM</span>
              </div>

              <div className="flex justify-between items-center py-2">
                <span className="text-[#6B7280]">Reason</span>
                <span className="text-[#111827] font-medium">sick</span>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
