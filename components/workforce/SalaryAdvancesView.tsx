"use client";

import { Icon } from "@/components/icons";
import type { Timeline } from "@/lib/timeline";
import { useTimelineVar } from "@/lib/useTimelineVar";
import { SAMPLE_SALARY_ADVANCE, URLS } from "./workforce-data";

type Props = {
  tl: Timeline;
  onBack?: () => void;
};

export function SalaryAdvancesView({ tl, onBack }: Props) {
  const isModalOpen = useTimelineVar(tl, "wfSalaryAdvanceModalOpen", false);
  const isMenuOpen = useTimelineVar(tl, "wfAdvanceMenuOpen", false);

  const { limit, terms, note, stats, record } = SAMPLE_SALARY_ADVANCE;

  const handleOpenDetails = () => {
    tl.setVar("wfAdvanceMenuOpen", false);
    tl.setVar("wfSalaryAdvanceModalOpen", true);
    tl.setUrl(`${URLS.salaryAdvances}?advance=sample`);
  };

  const handleCloseDetails = () => {
    tl.setVar("wfSalaryAdvanceModalOpen", false);
    tl.setUrl(URLS.salaryAdvances);
  };

  return (
    <div className="flex flex-col gap-5 max-w-6xl mx-auto pb-12">
      {/* Back button */}
      <div>
        <button
          type="button"
          data-tl="advances-back-btn"
          onClick={() => {
            if (onBack) onBack();
            else {
              tl.setVar("wfPage", "my-space");
              tl.setVar("wfSubpage", "overview");
              tl.setUrl(URLS.mySpace);
            }
          }}
          className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-white border border-gray-200 text-xs font-medium text-[#4B5563] hover:bg-gray-50 transition-colors shadow-xs"
        >
          <Icon name="chevronLeft" size={14} className="text-[#6B7280]" />
          <span>Back</span>
        </button>
      </div>

      {/* Header with Title + Request Advance button */}
      <div className="flex items-start justify-between gap-4">
        <div>
          <h2 data-tl="advances-title" className="text-xl font-bold text-[#111827]">
            Salary advances
          </h2>
          <p data-tl="advances-subtitle" className="text-xs text-[#6B7280] mt-0.5">
            Request an advance and track HR decisions
          </p>
        </div>
        <button
          type="button"
          data-tl="btn-request-advance"
          disabled
          className="inline-flex items-center justify-center px-4 py-2 rounded-xl bg-[#E9D5FF] text-[#7014D9]/60 text-xs font-medium border border-[#D8B4FE]/40 cursor-not-allowed shadow-xs select-none"
          title="Locked while a request is pending or approved"
        >
          Request advance
        </button>
      </div>

      {/* Info banner */}
      <div
        data-tl="advances-info-box"
        className="rounded-xl border border-gray-200/90 bg-white p-4 shadow-xs flex flex-col gap-1"
      >
        <p className="text-xs font-semibold text-[#111827]">
          Request limit: {limit}
        </p>
        <p className="text-xs text-[#6B7280]">{terms}</p>
        <p className="text-xs text-[#6B7280]">{note}</p>
      </div>

      {/* 4 Stat Cards */}
      <div className="grid grid-cols-4 gap-4">
        <div
          data-tl="advances-stat-pending"
          className="rounded-xl border border-gray-200/90 bg-white p-4 shadow-xs flex flex-col justify-between"
        >
          <span className="text-xs text-[#6B7280]">Pending</span>
          <span className="text-2xl font-bold text-[#111827] mt-1">{stats.pending}</span>
        </div>
        <div
          data-tl="advances-stat-approved"
          className="rounded-xl border border-gray-200/90 bg-white p-4 shadow-xs flex flex-col justify-between"
        >
          <span className="text-xs text-[#6B7280]">Approved - not paid</span>
          <span className="text-2xl font-bold text-[#111827] mt-1">{stats.approved}</span>
        </div>
        <div
          data-tl="advances-stat-rejected"
          className="rounded-xl border border-gray-200/90 bg-white p-4 shadow-xs flex flex-col justify-between"
        >
          <span className="text-xs text-[#6B7280]">Rejected</span>
          <span className="text-2xl font-bold text-[#111827] mt-1">{stats.rejected}</span>
        </div>
        <div
          data-tl="advances-stat-cancelled"
          className="rounded-xl border border-gray-200/90 bg-white p-4 shadow-xs flex flex-col justify-between"
        >
          <span className="text-xs text-[#6B7280]">Cancelled</span>
          <span className="text-2xl font-bold text-[#111827] mt-1">{stats.cancelled}</span>
        </div>
      </div>

      {/* Search and Status filter */}
      <div className="flex items-center gap-3">
        <div className="relative flex-1 max-w-xs">
          <input
            type="text"
            data-tl="input-search-advances"
            readOnly
            placeholder="Search employee..."
            className="w-full rounded-lg border border-gray-200 bg-white px-3 py-1.5 text-xs text-[#111827] placeholder:text-[#9CA3AF] focus:outline-none"
          />
        </div>
        <div className="relative">
          <button
            type="button"
            data-tl="select-advances-status"
            className="flex items-center gap-2 rounded-lg border border-gray-200 bg-white px-3 py-1.5 text-xs font-medium text-[#374151]"
          >
            <span>All statuses</span>
            <Icon name="chevronDown" size={14} className="text-[#6B7280]" />
          </button>
        </div>
      </div>

      {/* Table */}
      <div
        data-tl="advances-table"
        className="rounded-xl border border-gray-200/90 bg-white shadow-xs overflow-visible"
      >
        <table className="w-full text-left border-collapse text-xs">
          <thead>
            <tr className="border-b border-gray-200/80 bg-gray-50/70 text-[#6B7280] font-medium">
              <th className="py-3 px-4 font-semibold">Employee</th>
              <th className="py-3 px-4 font-semibold">Amount</th>
              <th className="py-3 px-4 font-semibold">Requested</th>
              <th className="py-3 px-4 font-semibold">Instalments</th>
              <th className="py-3 px-4 font-semibold">Status</th>
              <th className="py-3 px-4 font-semibold text-right">Actions</th>
            </tr>
          </thead>
          <tbody>
            <tr
              data-tl="advances-row-1"
              className="border-b border-gray-100 hover:bg-gray-50/50 transition-colors"
            >
              <td className="py-3 px-4 font-medium text-[#111827]">{record.employee}</td>
              <td className="py-3 px-4">
                <button
                  type="button"
                  data-tl="advance-amount-link"
                  onClick={handleOpenDetails}
                  className="font-medium text-[#7014D9] hover:underline"
                >
                  {record.amount}
                </button>
              </td>
              <td className="py-3 px-4 text-[#4B5563]">{record.requestedDate}</td>
              <td className="py-3 px-4 text-[#4B5563]">{record.instalments}</td>
              <td className="py-3 px-4">
                <span
                  data-tl="advance-status-badge"
                  className="inline-block rounded-full bg-[#F3E8FF] px-2.5 py-0.5 text-[11px] font-semibold text-[#7014D9]"
                >
                  {record.status}
                </span>
              </td>
              <td className="py-3 px-4 text-right relative">
                <button
                  type="button"
                  data-tl="btn-advance-actions-1"
                  onClick={() => tl.setVar("wfAdvanceMenuOpen", !isMenuOpen)}
                  className="p-1 rounded-md text-[#6B7280] hover:bg-gray-100 hover:text-[#111827] transition-colors"
                >
                  <Icon name="dots" size={16} />
                </button>

                {/* Actions Context Menu */}
                {isMenuOpen && (
                  <div
                    data-tl="advance-actions-menu"
                    className="absolute right-4 top-10 z-30 min-w-[130px] rounded-lg border border-gray-200 bg-white py-1 shadow-lg text-left"
                  >
                    <button
                      type="button"
                      data-tl="menu-view-details"
                      onClick={handleOpenDetails}
                      className="w-full px-3 py-1.5 text-xs text-[#374151] hover:bg-gray-100 transition-colors text-left"
                    >
                      View details
                    </button>
                  </div>
                )}
              </td>
            </tr>
          </tbody>
        </table>

        {/* Pagination */}
        <div
          data-tl="advances-pagination"
          className="flex items-center justify-end gap-4 px-4 py-3 text-xs text-[#6B7280] border-t border-gray-100 bg-white rounded-b-xl"
        >
          <span>Page 1 of 1</span>
          <button type="button" disabled className="text-[#9CA3AF] cursor-not-allowed">
            Previous
          </button>
          <button type="button" disabled className="text-[#9CA3AF] cursor-not-allowed">
            Next
          </button>
        </div>
      </div>

      {/* Salary Advance Details Modal */}
      {isModalOpen && (
        <div
          data-tl="advance-details-backdrop"
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 p-4"
        >
          <div
            data-tl="advance-details-modal"
            className="flex flex-col w-full max-w-[560px] max-h-[85vh] rounded-2xl bg-white shadow-2xl border border-gray-200 overflow-hidden"
          >
            {/* Modal Header */}
            <div className="flex items-center justify-between border-b border-gray-100 px-6 py-4">
              <h3 className="text-sm font-semibold text-[#111827]">Salary advance details</h3>
              <button
                type="button"
                data-tl="btn-close-advance-modal"
                onClick={handleCloseDetails}
                className="p-1 rounded-md text-[#6B7280] hover:bg-gray-100 transition-colors"
              >
                <Icon name="x" size={18} />
              </button>
            </div>

            {/* Modal Body (Scrollable) */}
            <div
              data-tl="advance-modal-scrollable"
              className="flex-1 overflow-y-auto p-6 flex flex-col gap-4 text-xs"
            >
              {/* Top status & actions */}
              <div className="flex items-center justify-between">
                <span
                  data-tl="modal-advance-status"
                  className="inline-block rounded-full bg-[#F3E8FF] px-2.5 py-0.5 text-[11px] font-semibold text-[#7014D9]"
                >
                  {record.status}
                </span>
                <button
                  type="button"
                  data-tl="modal-actions-dots"
                  className="p-1 text-[#6B7280] hover:text-[#111827]"
                >
                  <Icon name="dots" size={16} />
                </button>
              </div>

              {/* Amount, employee, reason */}
              <div>
                <p data-tl="modal-advance-amount" className="text-2xl font-bold text-[#111827]">
                  {record.amount}
                </p>
                <p className="text-sm font-semibold text-[#111827] mt-1">{record.employee}</p>
                <p className="text-xs text-[#374151] mt-1.5 uppercase tracking-wide font-medium">
                  {record.reason}
                </p>
                <p className="text-[11px] text-[#6B7280] italic mt-1">{record.planNote}</p>
              </div>

              {/* Proposed repayments section */}
              <div data-tl="modal-repayments-section" className="mt-2 pt-2 border-t border-gray-100">
                <h4 className="text-xs font-semibold text-[#111827] mb-2">Proposed repayments</h4>
                <div className="rounded-lg border border-gray-200 overflow-hidden">
                  <table className="w-full text-left text-xs">
                    <thead>
                      <tr className="border-b border-gray-200 bg-gray-50/80 text-[#6B7280]">
                        <th className="py-2 px-3 font-semibold">Proposed date</th>
                        <th className="py-2 px-3 font-semibold text-right">Amount</th>
                      </tr>
                    </thead>
                    <tbody>
                      {record.repayments.map((rep, idx) => (
                        <tr key={idx} className="border-b border-gray-100 last:border-0">
                          <td className="py-2 px-3 text-[#374151]">{rep.date}</td>
                          <td className="py-2 px-3 text-[#111827] font-medium text-right">
                            {rep.amount}
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
                <p className="text-[11px] text-[#6B7280] mt-1.5">
                  These dates are a plan. No payment or payroll deduction is made.
                </p>
              </div>

              {/* History section */}
              <div data-tl="modal-history-section" className="mt-2 pt-2 border-t border-gray-100">
                <h4 className="text-xs font-semibold text-[#111827] mb-2.5">History</h4>
                <div className="flex flex-col gap-2">
                  {record.history.map((h, idx) => (
                    <div
                      key={idx}
                      data-tl={`history-card-${idx + 1}`}
                      className="rounded-xl border border-gray-200 bg-[#F9FAFB] p-3 flex flex-col gap-0.5"
                    >
                      <div className="flex items-center justify-between">
                        <span className="font-semibold text-xs text-[#111827]">
                          {h.action} · {h.actor}
                        </span>
                        <span className="text-[10px] text-[#6B7280]">{h.date}</span>
                      </div>
                      <span className="font-medium text-xs text-[#111827] mt-0.5">{h.amount}</span>
                      <span className="text-[11px] text-[#4B5563] uppercase">{h.reason}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
