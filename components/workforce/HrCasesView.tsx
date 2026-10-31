"use client";

import { Icon } from "@/components/icons";
import type { Timeline } from "@/lib/timeline";
import { useTimelineVar } from "@/lib/useTimelineVar";
import { SAMPLE_HR_CASES, URLS } from "./workforce-data";

type Props = {
  tl: Timeline;
  onBack?: () => void;
};

export function HrCasesView({ tl, onBack }: Props) {
  const isDetailsOpen = useTimelineVar(tl, "wfHrCaseModalOpen", false);
  const isSubmitOpen = useTimelineVar(tl, "wfSubmitGrievanceModalOpen", false);
  const isTypeDropdownOpen = useTimelineVar(tl, "wfGrievanceTypeDropdownOpen", false);
  const isDatePickerOpen = useTimelineVar(tl, "wfGrievanceDatePickerOpen", false);
  const selectedType = useTimelineVar(tl, "wfGrievanceType", "Bullying");
  const selectedDate = useTimelineVar(tl, "wfGrievanceDate", "");

  const { title, subtitle, tab, tabSubtitle, cases, types } = SAMPLE_HR_CASES;

  const handleOpenDetails = () => {
    tl.setVar("wfHrCaseModalOpen", true);
  };

  const handleCloseDetails = () => {
    tl.setVar("wfHrCaseModalOpen", false);
  };

  const handleOpenSubmit = () => {
    tl.setVar("wfSubmitGrievanceModalOpen", true);
  };

  const handleCloseSubmit = () => {
    tl.setVar("wfSubmitGrievanceModalOpen", false);
    tl.setVar("wfGrievanceTypeDropdownOpen", false);
    tl.setVar("wfGrievanceDatePickerOpen", false);
  };

  // Calendar dates for October 2026 in date picker:
  // Oct 1 is Thursday -> 4 prefix blanks
  const pickerDays = Array.from({ length: 31 }, (_, i) => i + 1);

  return (
    <div className="flex flex-col gap-5 max-w-5xl mx-auto pb-12">
      {/* Back button */}
      <div>
        <button
          type="button"
          data-tl="hr-cases-back-btn"
          onClick={() => {
            if (onBack) onBack();
            else {
              tl.setVar("wfPage", "holidays");
              tl.setVar("wfSubpage", "holidays");
              tl.setUrl(URLS.holidays);
            }
          }}
          className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-white border border-gray-200 text-xs font-medium text-[#4B5563] hover:bg-gray-50 transition-colors shadow-xs"
        >
          <Icon name="chevronLeft" size={14} className="text-[#6B7280]" />
          <span>Back</span>
        </button>
      </div>

      {/* Header */}
      <div>
        <h2 data-tl="hr-cases-heading" className="text-xl font-bold text-[#111827]">
          {title}
        </h2>
        <p data-tl="hr-cases-sub" className="text-xs text-[#6B7280] mt-0.5">
          {subtitle}
        </p>
      </div>

      {/* Grievances tab */}
      <div className="border-b border-gray-200">
        <button
          type="button"
          data-tl="tab-grievances"
          className="pb-2 border-b-2 border-[#7014D9] text-xs font-semibold text-[#7014D9]"
        >
          {tab}
        </button>
      </div>

      {/* Subtitle & Submit grievance button */}
      <div className="flex items-center justify-between">
        <p className="text-xs text-[#6B7280]">{tabSubtitle}</p>
        <button
          type="button"
          data-tl="btn-submit-grievance"
          onClick={handleOpenSubmit}
          className="inline-flex items-center justify-center px-4 py-2 rounded-full bg-[#7014D9] hover:bg-[#5E10B8] text-white text-xs font-medium shadow-xs transition-colors"
        >
          Submit grievance
        </button>
      </div>

      {/* Table */}
      <div
        data-tl="hr-cases-table"
        className="rounded-xl border border-gray-200/90 bg-white shadow-xs overflow-hidden"
      >
        <table className="w-full text-left border-collapse text-xs">
          <thead>
            <tr className="border-b border-gray-200/80 bg-gray-50/70 text-[#6B7280] font-medium">
              <th className="py-3 px-4 font-semibold">Employee</th>
              <th className="py-3 px-4 font-semibold">Type</th>
              <th className="py-3 px-4 font-semibold">Incident date</th>
              <th className="py-3 px-4 font-semibold">Status</th>
              <th className="py-3 px-4 font-semibold text-right">Actions</th>
            </tr>
          </thead>
          <tbody>
            {cases.map((c) => (
              <tr
                key={c.id}
                data-tl="hr-case-row-1"
                className="border-b border-gray-100 hover:bg-gray-50/50 transition-colors"
              >
                <td className="py-3 px-4 font-medium text-[#111827]">{c.employee}</td>
                <td className="py-3 px-4 text-[#4B5563]">{c.type}</td>
                <td className="py-3 px-4 text-[#4B5563]">{c.incidentDate}</td>
                <td className="py-3 px-4 text-[#4B5563]">{c.status}</td>
                <td className="py-3 px-4 text-right">
                  <button
                    type="button"
                    data-tl="btn-view-hr-case-1"
                    onClick={handleOpenDetails}
                    className="font-medium text-[#7014D9] hover:underline"
                  >
                    View case
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>

        {/* Pagination */}
        <div
          data-tl="hr-cases-pagination"
          className="flex items-center justify-end gap-4 px-4 py-3 text-xs text-[#6B7280] border-t border-gray-100 bg-white"
        >
          <button type="button" disabled className="text-[#9CA3AF] cursor-not-allowed">
            Previous
          </button>
          <span>Page 1</span>
          <button type="button" disabled className="text-[#9CA3AF] cursor-not-allowed">
            Next
          </button>
        </div>
      </div>

      {/* Modal 1: HR Case Details */}
      {isDetailsOpen && (
        <div
          data-tl="hr-case-details-backdrop"
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 p-4"
        >
          <div
            data-tl="hr-case-details-modal"
            className="flex flex-col w-full max-w-md rounded-2xl bg-white shadow-2xl border border-gray-200 overflow-hidden"
          >
            <div className="flex items-center justify-between border-b border-gray-100 px-6 py-4">
              <h3 className="text-sm font-semibold text-[#111827]">HR case details</h3>
              <button
                type="button"
                data-tl="btn-close-hr-case-modal"
                onClick={handleCloseDetails}
                className="p-1 rounded-md text-[#6B7280] hover:bg-gray-100 transition-colors"
              >
                <Icon name="x" size={18} />
              </button>
            </div>
            <div className="p-6 flex flex-col gap-3 text-xs">
              <p className="font-semibold text-sm text-[#111827]">Bullying · Closed</p>
              <p className="text-xs text-[#4B5563]">Case note</p>
              <p className="text-xs text-[#6B7280]">Incident: 2026-10-15</p>
              <div className="pt-2 border-t border-gray-100 mt-1">
                <p className="font-bold text-xs text-[#111827]">Case history</p>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Modal 2: Submit Grievance */}
      {isSubmitOpen && (
        <div
          data-tl="submit-grievance-backdrop"
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 p-4"
        >
          <div
            data-tl="submit-grievance-modal"
            className="flex flex-col w-full max-w-lg rounded-2xl bg-white shadow-2xl border border-gray-200 overflow-visible relative"
          >
            {/* Modal Header */}
            <div className="flex items-center justify-between border-b border-gray-100 px-6 py-4">
              <h3 className="text-sm font-semibold text-[#111827]">Submit grievance</h3>
              <button
                type="button"
                data-tl="btn-close-submit-grievance"
                onClick={handleCloseSubmit}
                className="p-1 rounded-md text-[#6B7280] hover:bg-gray-100 transition-colors"
              >
                <Icon name="x" size={18} />
              </button>
            </div>

            {/* Modal Body */}
            <div className="p-6 flex flex-col gap-4 text-xs">
              {/* Type Select */}
              <div className="relative flex flex-col gap-1.5">
                <label className="font-medium text-[#374151]">Type</label>
                <button
                  type="button"
                  data-tl="select-grievance-type"
                  onClick={() => tl.setVar("wfGrievanceTypeDropdownOpen", !isTypeDropdownOpen)}
                  className="flex items-center justify-between rounded-xl border border-gray-200 bg-white px-3.5 py-2 text-xs text-[#111827] focus:outline-none focus:ring-2 focus:ring-[#7014D9]/20"
                >
                  <span>{selectedType}</span>
                  <Icon name="chevronDown" size={14} className="text-[#6B7280]" />
                </button>

                {/* Dropdown Options */}
                {isTypeDropdownOpen && (
                  <div
                    data-tl="grievance-type-menu"
                    className="absolute top-16 left-0 right-0 z-30 rounded-xl border border-gray-200 bg-white shadow-lg overflow-hidden py-1"
                  >
                    {types.map((t) => {
                      const isHoveredOrSelected = t === selectedType;
                      const optId = t.toLowerCase().replace(/\s+/g, "-");
                      return (
                        <button
                          key={t}
                          type="button"
                          data-tl={`type-opt-${optId}`}
                          onClick={() => {
                            tl.setVar("wfGrievanceType", t);
                            tl.setVar("wfGrievanceTypeDropdownOpen", false);
                          }}
                          className={`w-full px-3.5 py-2 text-left text-xs transition-colors ${
                            isHoveredOrSelected
                              ? "bg-[#2563EB] text-white font-medium"
                              : "text-[#374151] hover:bg-blue-50"
                          }`}
                        >
                          {t}
                        </button>
                      );
                    })}
                  </div>
                )}
              </div>

              {/* Incident date Input */}
              <div className="relative flex flex-col gap-1.5">
                <label className="font-medium text-[#374151]">Incident date</label>
                <div
                  data-tl="input-incident-date"
                  onClick={() => tl.setVar("wfGrievanceDatePickerOpen", !isDatePickerOpen)}
                  className="flex items-center justify-between rounded-xl border border-gray-200 bg-white px-3.5 py-2 text-xs text-[#111827] cursor-pointer focus:outline-none focus:ring-2 focus:ring-[#7014D9]"
                >
                  <span className={selectedDate ? "text-[#111827]" : "text-[#9CA3AF]"}>
                    {selectedDate || "dd/mm/yyyy"}
                  </span>
                  <button
                    type="button"
                    data-tl="btn-calendar-picker"
                    className="text-[#6B7280]"
                  >
                    <Icon name="shCalendar" size={16} />
                  </button>
                </div>

                {/* Calendar Popup */}
                {isDatePickerOpen && (
                  <div
                    data-tl="calendar-popup"
                    className="absolute top-16 left-0 z-30 rounded-xl border border-gray-200 bg-white shadow-xl p-3 w-64"
                  >
                    <div className="flex items-center justify-between pb-2 mb-2 border-b border-gray-100">
                      <span className="font-semibold text-xs text-[#111827]">October 2026</span>
                      <div className="flex items-center gap-1">
                        <button type="button" className="p-0.5 text-[#6B7280]">
                          <Icon name="chevronLeft" size={14} />
                        </button>
                        <button type="button" className="p-0.5 text-[#6B7280]">
                          <Icon name="chevronRight" size={14} />
                        </button>
                      </div>
                    </div>
                    <div className="grid grid-cols-7 text-center text-[10px] text-[#6B7280] font-semibold mb-1">
                      <span>Su</span>
                      <span>Mo</span>
                      <span>Tu</span>
                      <span>We</span>
                      <span>Th</span>
                      <span>Fr</span>
                      <span>Sa</span>
                    </div>
                    <div className="grid grid-cols-7 gap-1 text-center text-xs">
                      {/* 4 blanks for Oct 2026 */}
                      <span className="p-1 text-gray-300">27</span>
                      <span className="p-1 text-gray-300">28</span>
                      <span className="p-1 text-gray-300">29</span>
                      <span className="p-1 text-gray-300">30</span>
                      {pickerDays.map((d) => (
                        <button
                          key={d}
                          type="button"
                          data-tl={`cal-day-${d}`}
                          onClick={() => {
                            tl.setVar("wfGrievanceDate", `${d < 10 ? `0${d}` : d}/10/2026`);
                            tl.setVar("wfGrievanceDatePickerOpen", false);
                          }}
                          className={`p-1 rounded-md transition-colors ${
                            d === 28
                              ? "bg-purple-100 text-[#7014D9] font-bold"
                              : d === 30
                              ? "bg-[#2563EB] text-white font-bold"
                              : "text-[#374151] hover:bg-gray-100"
                          }`}
                        >
                          {d}
                        </button>
                      ))}
                    </div>
                    <div className="flex items-center justify-between pt-2 mt-2 border-t border-gray-100 text-[11px]">
                      <button
                        type="button"
                        onClick={() => tl.setVar("wfGrievanceDate", "")}
                        className="text-[#7014D9] hover:underline"
                      >
                        Clear
                      </button>
                      <button
                        type="button"
                        onClick={() => {
                          tl.setVar("wfGrievanceDate", "30/10/2026");
                          tl.setVar("wfGrievanceDatePickerOpen", false);
                        }}
                        className="text-[#7014D9] hover:underline"
                      >
                        Today
                      </button>
                    </div>
                  </div>
                )}
              </div>

              {/* Description Input */}
              <div className="flex flex-col gap-1.5">
                <label className="font-medium text-[#374151]">Description</label>
                <textarea
                  data-tl="textarea-grievance-desc"
                  rows={4}
                  readOnly
                  placeholder="Describe your grievance in detail..."
                  className="w-full rounded-xl border border-gray-200 bg-white p-3 text-xs text-[#111827] placeholder:text-[#9CA3AF] focus:outline-none focus:ring-2 focus:ring-[#7014D9]"
                />
              </div>

              {/* Action Buttons */}
              <div className="flex items-center justify-end gap-3 pt-3 border-t border-gray-100">
                <button
                  type="button"
                  data-tl="btn-cancel-grievance"
                  onClick={handleCloseSubmit}
                  className="px-4 py-2 rounded-full border border-gray-200 text-xs font-medium text-[#4B5563] hover:bg-gray-50 transition-colors"
                >
                  Cancel
                </button>
                <button
                  type="button"
                  data-tl="btn-submit-form"
                  disabled
                  className="px-4 py-2 rounded-full bg-[#7014D9] text-white text-xs font-medium hover:bg-[#5E10B8] transition-colors"
                >
                  Submit
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
