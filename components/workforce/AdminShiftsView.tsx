"use client";

import { Icon } from "@/components/icons";
import type { Timeline } from "@/lib/timeline";
import { useTimelineVar } from "@/lib/useTimelineVar";
import { ADMIN_SHIFTS_DATA } from "./workforce-data";

type Props = {
  tl: Timeline;
};

export function AdminShiftsView({ tl }: Props) {
  const isAddShiftOpen = useTimelineVar(tl, "wfAddShiftModalOpen", false);

  return (
    <div className="flex flex-col gap-6 max-w-6xl mx-auto pb-16">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h2 data-tl="shifts-admin-heading" className="text-xl font-bold text-[#111827]">
            Shifts
          </h2>
          <p data-tl="shifts-admin-sub" className="text-xs text-[#6B7280] mt-0.5">
            Schedule and manage team shifts
          </p>
        </div>
        <button
          type="button"
          data-tl="btn-add-shift"
          onClick={() => tl.setVar("wfAddShiftModalOpen", true)}
          className="inline-flex items-center gap-1.5 px-4 py-2 rounded-lg bg-[#7014D9] hover:bg-[#5E10B8] text-white text-xs font-semibold shadow-xs transition-colors"
        >
          <Icon name="plus" size={14} />
          <span>+ Add Shift</span>
        </button>
      </div>

      {/* Shifts Table */}
      <div className="rounded-xl border border-[#E5E7EB] bg-white overflow-hidden shadow-xs">
        <table className="w-full text-left text-xs">
          <thead className="bg-[#F9FAFB] text-[#6B7280] uppercase tracking-wider font-semibold border-b border-[#E5E7EB]">
            <tr>
              <th className="py-3 px-4">Shift Name</th>
              <th className="py-3 px-4">Start Time</th>
              <th className="py-3 px-4">End Time</th>
              <th className="py-3 px-4">Break (mins)</th>
              <th className="py-3 px-4">Working Days</th>
              <th className="py-3 px-4">Assigned Employees</th>
              <th className="py-3 px-4 text-right">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-[#F3F4F6] text-[#111827]">
            {ADMIN_SHIFTS_DATA.map((s) => (
              <tr key={s.id} className="hover:bg-gray-50 transition-colors">
                <td className="py-3.5 px-4">
                  <div className="flex items-center gap-2">
                    <span
                      className="h-2.5 w-2.5 rounded-full"
                      style={{ backgroundColor: s.color }}
                    />
                    <span className="font-semibold text-[#111827]">{s.name}</span>
                  </div>
                </td>
                <td className="py-3.5 px-4 font-medium text-[#4B5563]">{s.start}</td>
                <td className="py-3.5 px-4 font-medium text-[#4B5563]">{s.end}</td>
                <td className="py-3.5 px-4 text-[#6B7280]">{s.breakMins} mins</td>
                <td className="py-3.5 px-4 text-[#4B5563]">{s.days}</td>
                <td className="py-3.5 px-4">
                  <span className="inline-flex items-center px-2 py-0.5 rounded-full text-[11px] font-medium bg-[#F3E8FF] text-[#7014D9]">
                    {s.employeesCount} employee(s)
                  </span>
                </td>
                <td className="py-3.5 px-4 text-right space-x-2">
                  <button
                    type="button"
                    className="p-1 rounded-md text-[#6B7280] hover:text-[#7014D9] hover:bg-gray-100 transition-colors"
                  >
                    <Icon name="pencil" size={14} />
                  </button>
                  <button
                    type="button"
                    className="p-1 rounded-md text-[#6B7280] hover:text-[#EF4444] hover:bg-gray-100 transition-colors"
                  >
                    <Icon name="trash" size={14} />
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* ADD SHIFT MODAL (Step 106) */}
      {isAddShiftOpen && (
        <div
          data-tl="modal-add-shift"
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 backdrop-blur-xs p-4"
        >
          <div className="w-full max-w-lg rounded-2xl bg-white p-6 shadow-2xl border border-[#E5E7EB]">
            <div className="flex items-center justify-between border-b border-[#F3F4F6] pb-3 mb-4">
              <h3 className="text-base font-bold text-[#111827]">
                Add Shift
              </h3>
              <button
                type="button"
                onClick={() => tl.setVar("wfAddShiftModalOpen", false)}
                className="text-[#9CA3AF] hover:text-[#111827]"
              >
                <Icon name="x" size={16} />
              </button>
            </div>

            <div className="space-y-3.5 text-xs">
              <div>
                <label className="block text-[11px] font-semibold text-[#374151] mb-1">
                  Shift Name *
                </label>
                <input
                  type="text"
                  readOnly
                  data-tl="input-shift-name"
                  value="Morning Shift"
                  className="w-full px-3 py-2 rounded-lg border border-[#D1D5DB] bg-white text-[#111827]"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-[11px] font-semibold text-[#374151] mb-1">
                    Start Time *
                  </label>
                  <input
                    type="text"
                    readOnly
                    data-tl="input-shift-start"
                    value="09:00"
                    className="w-full px-3 py-2 rounded-lg border border-[#D1D5DB] bg-white text-[#111827]"
                  />
                </div>
                <div>
                  <label className="block text-[11px] font-semibold text-[#374151] mb-1">
                    End Time *
                  </label>
                  <input
                    type="text"
                    readOnly
                    data-tl="input-shift-end"
                    value="17:00"
                    className="w-full px-3 py-2 rounded-lg border border-[#D1D5DB] bg-white text-[#111827]"
                  />
                </div>
              </div>

              <div>
                <label className="block text-[11px] font-semibold text-[#374151] mb-1">
                  Break Duration (mins)
                </label>
                <input
                  type="text"
                  readOnly
                  data-tl="input-shift-break"
                  value="60"
                  className="w-full px-3 py-2 rounded-lg border border-[#D1D5DB] bg-white text-[#111827]"
                />
              </div>

              <div>
                <label className="block text-[11px] font-semibold text-[#374151] mb-1">
                  Working Days
                </label>
                <div
                  data-tl="select-shift-days"
                  className="flex items-center gap-1.5 pt-1"
                >
                  {["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"].map((d, i) => (
                    <span
                      key={d}
                      className={`h-7 w-9 flex items-center justify-center rounded-md text-[11px] font-semibold border ${
                        i < 5
                          ? "bg-[#F3E8FF] border-[#D8B4FE] text-[#7014D9]"
                          : "bg-gray-100 border-gray-200 text-gray-400"
                      }`}
                    >
                      {d}
                    </span>
                  ))}
                </div>
              </div>
            </div>

            <div className="mt-6 flex justify-end gap-2.5">
              <button
                type="button"
                data-tl="btn-cancel-shift"
                onClick={() => tl.setVar("wfAddShiftModalOpen", false)}
                className="px-4 py-2 rounded-lg border border-[#D1D5DB] bg-white text-xs font-semibold text-[#374151] hover:bg-gray-50 transition-colors"
              >
                Cancel
              </button>
              <button
                type="button"
                data-tl="btn-save-shift"
                onClick={() => tl.setVar("wfAddShiftModalOpen", false)}
                className="px-4 py-2 rounded-lg bg-[#7014D9] text-white text-xs font-semibold hover:bg-[#5E10B8] transition-colors"
              >
                Save shift
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
