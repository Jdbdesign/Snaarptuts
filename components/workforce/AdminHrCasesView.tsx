"use client";

import { Icon } from "@/components/icons";
import type { Timeline } from "@/lib/timeline";
import { useTimelineVar } from "@/lib/useTimelineVar";
import { ADMIN_HR_CASES_DATA } from "./workforce-data";

type Props = {
  tl: Timeline;
};

export function AdminHrCasesView({ tl }: Props) {
  const activeTab = useTimelineVar<"grievances" | "disciplinary">(
    tl,
    "wfHrAdminTab",
    "grievances"
  );
  const isDetailsModalOpen = useTimelineVar(tl, "wfHrCaseDetailsModalOpen", false);
  const isAddDiscModalOpen = useTimelineVar(tl, "wfAddDisciplinaryModalOpen", false);

  const { grievances, disciplinary } = ADMIN_HR_CASES_DATA;

  return (
    <div className="flex flex-col gap-6 max-w-6xl mx-auto pb-16">
      {/* Page Title & Subtitle */}
      <div>
        <h2 data-tl="hr-cases-admin-heading" className="text-xl font-bold text-[#111827]">
          HR Cases
        </h2>
        <p data-tl="hr-cases-admin-sub" className="text-xs text-[#6B7280] mt-0.5">
          Grievances and disciplinary records
        </p>
      </div>

      {/* Confidentiality Notice Banner */}
      <div
        data-tl="hr-confidentiality-notice"
        className="flex items-start gap-3 p-3.5 rounded-xl border border-[#FDE68A] bg-[#FEFCE8] text-[#92400E] text-xs select-none"
      >
        <Icon name="shield" size={18} className="text-[#D97706] shrink-0 mt-0.5" />
        <div>
          <p className="font-semibold text-[#92400E]">Confidentiality Notice</p>
          <p className="text-[#B45309] mt-0.5">
            HR cases contain sensitive personal data. All activity is logged and auditable in accordance with Acme Ltd compliance policies.
          </p>
        </div>
      </div>

      {/* Tabs */}
      <div className="flex items-center gap-6 border-b border-[#E5E7EB]">
        <button
          type="button"
          data-tl="tab-hr-grievances"
          onClick={() => tl.setVar("wfHrAdminTab", "grievances")}
          className={`pb-3 text-sm font-semibold transition-colors relative ${
            activeTab === "grievances"
              ? "text-[#7014D9] border-b-2 border-[#7014D9]"
              : "text-[#6B7280] hover:text-[#111827]"
          }`}
        >
          Grievances
        </button>
        <button
          type="button"
          data-tl="tab-hr-disciplinary"
          onClick={() => tl.setVar("wfHrAdminTab", "disciplinary")}
          className={`pb-3 text-sm font-semibold transition-colors relative ${
            activeTab === "disciplinary"
              ? "text-[#7014D9] border-b-2 border-[#7014D9]"
              : "text-[#6B7280] hover:text-[#111827]"
          }`}
        >
          Disciplinary
        </button>
      </div>

      {/* GRIEVANCES TAB CONTENT */}
      {activeTab === "grievances" && (
        <div className="flex flex-col gap-4">
          <div className="flex items-center justify-between">
            <span className="text-xs font-medium text-[#6B7280]">
              {grievances.length} grievance record(s)
            </span>
            <button
              type="button"
              data-tl="btn-submit-grievance"
              className="inline-flex items-center gap-1.5 px-4 py-2 rounded-lg bg-[#7014D9] hover:bg-[#5E10B8] text-white text-xs font-semibold shadow-xs transition-colors"
            >
              <Icon name="plus" size={14} />
              <span>Submit grievance</span>
            </button>
          </div>

          {/* Table */}
          <div className="rounded-xl border border-[#E5E7EB] bg-white overflow-hidden shadow-xs">
            <table className="w-full text-left text-xs">
              <thead className="bg-[#F9FAFB] text-[#6B7280] uppercase tracking-wider font-semibold border-b border-[#E5E7EB]">
                <tr>
                  <th className="py-3 px-4">Case ID</th>
                  <th className="py-3 px-4">Subject</th>
                  <th className="py-3 px-4">Submitted By</th>
                  <th className="py-3 px-4">Incident Date</th>
                  <th className="py-3 px-4">Status</th>
                  <th className="py-3 px-4">Created</th>
                  <th className="py-3 px-4 text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-[#F3F4F6] text-[#111827]">
                {grievances.map((c) => (
                  <tr key={c.id} className="hover:bg-gray-50 transition-colors">
                    <td className="py-3.5 px-4 font-semibold text-[#7014D9]">{c.id}</td>
                    <td className="py-3.5 px-4 font-medium">{c.subject}</td>
                    <td className="py-3.5 px-4 text-[#4B5563]">{c.submittedBy}</td>
                    <td className="py-3.5 px-4 text-[#6B7280]">{c.date}</td>
                    <td className="py-3.5 px-4">
                      <span className="inline-flex items-center px-2 py-0.5 rounded-full text-[11px] font-medium bg-[#F3F4F6] text-[#4B5563]">
                        {c.status}
                      </span>
                    </td>
                    <td className="py-3.5 px-4 text-[#6B7280]">{c.created}</td>
                    <td className="py-3.5 px-4 text-right">
                      <button
                        type="button"
                        data-tl="btn-view-hr-case"
                        onClick={() => tl.setVar("wfHrCaseDetailsModalOpen", true)}
                        className="inline-flex items-center px-3 py-1 rounded-md bg-[#FAF5FF] hover:bg-[#F3E8FF] text-[#7014D9] font-medium transition-colors"
                      >
                        View case
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* DISCIPLINARY TAB CONTENT */}
      {activeTab === "disciplinary" && (
        <div className="flex flex-col gap-4">
          <div className="flex items-center justify-between">
            <span data-tl="label-disc-count" className="text-xs font-medium text-[#6B7280]">
              {disciplinary.length} record(s)
            </span>
            <button
              type="button"
              data-tl="btn-add-disciplinary-record"
              onClick={() => tl.setVar("wfAddDisciplinaryModalOpen", true)}
              className="inline-flex items-center gap-1.5 px-4 py-2 rounded-lg bg-[#7014D9] hover:bg-[#5E10B8] text-white text-xs font-semibold shadow-xs transition-colors"
            >
              <Icon name="plus" size={14} />
              <span>+ Add Record</span>
            </button>
          </div>

          {/* Table */}
          <div className="rounded-xl border border-[#E5E7EB] bg-white overflow-hidden shadow-xs">
            <table className="w-full text-left text-xs">
              <thead className="bg-[#F9FAFB] text-[#6B7280] uppercase tracking-wider font-semibold border-b border-[#E5E7EB]">
                <tr>
                  <th className="py-3 px-4">Employee</th>
                  <th className="py-3 px-4">Type</th>
                  <th className="py-3 px-4">Date</th>
                  <th className="py-3 px-4">Reason</th>
                  <th className="py-3 px-4">Status</th>
                  <th className="py-3 px-4 text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-[#F3F4F6] text-[#111827]">
                {disciplinary.map((d) => (
                  <tr key={d.id} className="hover:bg-gray-50 transition-colors">
                    <td className="py-3.5 px-4 font-semibold">{d.employee}</td>
                    <td className="py-3.5 px-4">
                      <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-[11px] font-medium bg-[#FEF3C7] text-[#92400E]">
                        {d.type}
                      </span>
                    </td>
                    <td className="py-3.5 px-4 text-[#6B7280]">{d.date}</td>
                    <td className="py-3.5 px-4 text-[#4B5563]">{d.reason}</td>
                    <td className="py-3.5 px-4">
                      <span className="inline-flex items-center px-2 py-0.5 rounded-full text-[11px] font-medium bg-[#DBEAFE] text-[#1E40AF]">
                        {d.status}
                      </span>
                    </td>
                    <td className="py-3.5 px-4 text-right">
                      <button
                        type="button"
                        data-tl="btn-view-disc-record"
                        className="inline-flex items-center px-2.5 py-1 rounded-md text-[#6B7280] hover:text-[#111827] hover:bg-gray-100 transition-colors"
                      >
                        View
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* CASE DETAILS MODAL (Step 98) */}
      {isDetailsModalOpen && (
        <div
          data-tl="modal-hr-case-details"
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 backdrop-blur-xs p-4"
        >
          <div className="w-full max-w-xl rounded-2xl bg-white p-6 shadow-2xl border border-[#E5E7EB]">
            <div className="flex items-center justify-between border-b border-[#F3F4F6] pb-3 mb-4">
              <div>
                <span className="text-[10px] font-bold text-[#7014D9] uppercase tracking-wider">
                  Case Details · CAS-001
                </span>
                <h3 className="text-base font-bold text-[#111827]">
                  Bullying Investigation
                </h3>
              </div>
              <span className="px-2.5 py-0.5 rounded-full text-xs font-semibold bg-[#F3F4F6] text-[#4B5563]">
                Closed
              </span>
            </div>

            <div className="space-y-3.5 text-xs">
              <div className="grid grid-cols-2 gap-4 bg-[#F9FAFB] p-3 rounded-lg border border-[#F3F4F6]">
                <div>
                  <span className="text-[#9CA3AF] block text-[10px] uppercase font-semibold">Submitted By</span>
                  <span className="font-semibold text-[#111827]">Alex Morgan</span>
                </div>
                <div>
                  <span className="text-[#9CA3AF] block text-[10px] uppercase font-semibold">Incident Date</span>
                  <span className="font-semibold text-[#111827]">15 Oct 2026</span>
                </div>
              </div>

              <div>
                <label className="text-[11px] font-bold text-[#374151] block mb-1">
                  Incident Description
                </label>
                <div className="p-2.5 rounded-lg bg-gray-50 border border-gray-200 text-[#4B5563]">
                  {grievances[0].details}
                </div>
              </div>

              <div>
                <label className="text-[11px] font-bold text-[#374151] block mb-1">
                  Resolution & Outcome
                </label>
                <div className="p-2.5 rounded-lg bg-[#FAF5FF] border border-[#E9D5FF] text-[#6B21A8]">
                  {grievances[0].resolution}
                </div>
              </div>

              <div>
                <label className="text-[11px] font-bold text-[#374151] block mb-1">
                  Internal Notes
                </label>
                <div className="p-2.5 rounded-lg bg-gray-50 border border-gray-200 text-[#6B7280]">
                  {grievances[0].outcomeNotes}
                </div>
              </div>
            </div>

            <div className="mt-6 flex justify-end">
              <button
                type="button"
                data-tl="btn-close-hr-case-modal"
                onClick={() => tl.setVar("wfHrCaseDetailsModalOpen", false)}
                className="px-4 py-2 rounded-lg bg-[#111827] text-white text-xs font-semibold hover:bg-black transition-colors"
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}

      {/* ADD DISCIPLINARY RECORD MODAL (Step 100) */}
      {isAddDiscModalOpen && (
        <div
          data-tl="modal-add-disciplinary"
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 backdrop-blur-xs p-4"
        >
          <div className="w-full max-w-lg rounded-2xl bg-white p-6 shadow-2xl border border-[#E5E7EB]">
            <div className="flex items-center justify-between border-b border-[#F3F4F6] pb-3 mb-4">
              <h3 className="text-base font-bold text-[#111827]">
                Add Disciplinary Record
              </h3>
              <button
                type="button"
                onClick={() => tl.setVar("wfAddDisciplinaryModalOpen", false)}
                className="text-[#9CA3AF] hover:text-[#111827]"
              >
                <Icon name="x" size={16} />
              </button>
            </div>

            <div className="space-y-3.5 text-xs">
              <div>
                <label className="block text-[11px] font-semibold text-[#374151] mb-1">
                  Employee *
                </label>
                <div
                  data-tl="select-disc-employee"
                  className="w-full px-3 py-2 rounded-lg border border-[#D1D5DB] bg-white font-medium text-[#111827] flex items-center justify-between"
                >
                  <span>Alex Morgan (EMP-0001)</span>
                  <Icon name="chevronDown" size={14} className="text-[#9CA3AF]" />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-[11px] font-semibold text-[#374151] mb-1">
                    Disciplinary Type *
                  </label>
                  <div
                    data-tl="select-disc-type"
                    className="w-full px-3 py-2 rounded-lg border border-[#D1D5DB] bg-white text-[#111827] flex items-center justify-between"
                  >
                    <span>Verbal warning</span>
                    <Icon name="chevronDown" size={14} className="text-[#9CA3AF]" />
                  </div>
                </div>
                <div>
                  <label className="block text-[11px] font-semibold text-[#374151] mb-1">
                    Record Date *
                  </label>
                  <input
                    type="text"
                    readOnly
                    data-tl="input-disc-date"
                    value="20/10/2026"
                    className="w-full px-3 py-2 rounded-lg border border-[#D1D5DB] bg-white text-[#111827]"
                  />
                </div>
              </div>

              <div>
                <label className="block text-[11px] font-semibold text-[#374151] mb-1">
                  Reason *
                </label>
                <input
                  type="text"
                  readOnly
                  data-tl="input-disc-reason"
                  value="bullying"
                  className="w-full px-3 py-2 rounded-lg border border-[#D1D5DB] bg-white text-[#111827]"
                />
              </div>

              <div>
                <label className="block text-[11px] font-semibold text-[#374151] mb-1">
                  Internal Notes
                </label>
                <textarea
                  readOnly
                  data-tl="textarea-disc-notes"
                  rows={3}
                  value="Investigation documented and agreed with employee. Formal verbal notice issued."
                  className="w-full px-3 py-2 rounded-lg border border-[#D1D5DB] bg-white text-[#4B5563] resize-none"
                />
              </div>
            </div>

            <div className="mt-6 flex justify-end gap-2.5">
              <button
                type="button"
                data-tl="btn-cancel-disc-record"
                onClick={() => tl.setVar("wfAddDisciplinaryModalOpen", false)}
                className="px-4 py-2 rounded-lg border border-[#D1D5DB] bg-white text-xs font-semibold text-[#374151] hover:bg-gray-50 transition-colors"
              >
                Cancel
              </button>
              <button
                type="button"
                data-tl="btn-save-disc-record"
                className="px-4 py-2 rounded-lg bg-[#7014D9] text-white text-xs font-semibold hover:bg-[#5E10B8] transition-colors"
              >
                Save record
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
