"use client";

import type { Timeline } from "@/lib/timeline";
import { useTimelineVar } from "@/lib/useTimelineVar";
import { Icon } from "@/components/icons";
import { SAMPLE_GOALS, URLS } from "./workforce-data";

type Props = {
  tl: Timeline;
  onBack?: () => void;
};

export function GoalsView({ tl, onBack }: Props) {
  const activeTab = useTimelineVar<"goals" | "kpis">(tl, "wfGoalsTab", "goals");
  const editModalOpen = useTimelineVar(tl, "wfEditGoalOpen", false);
  const goalProgress = useTimelineVar(tl, "wfGoalProgress", 54);
  const kpiDetailsOpen = useTimelineVar(tl, "wfKpiDetailsOpen", false);

  return (
    <div
      data-scroller="goals"
      className="h-full overflow-y-auto no-scrollbar p-6 bg-[#F9FAFB] space-y-6"
    >
      {/* Top back & actions bar */}
      <div className="flex items-center justify-between">
        <button
          type="button"
          data-tl="goals-back-btn"
          onClick={onBack}
          className="inline-flex items-center gap-1.5 rounded-lg border border-[#E5E7EB] bg-white px-3 py-1.5 text-xs font-medium text-[#4B5563] hover:bg-gray-50 transition-colors shadow-sm"
        >
          <Icon name="chevronLeft" size={14} />
          <span>Back</span>
        </button>

        {activeTab === "goals" && (
          <button
            type="button"
            data-tl="goals-create-btn"
            className="inline-flex items-center gap-1.5 rounded-lg bg-[#7014D9] px-4 py-2 text-xs font-semibold text-white hover:bg-[#5B0FB3] transition-colors shadow-sm"
          >
            <span>+ Create Goal</span>
          </button>
        )}
      </div>

      {/* Tabs */}
      <div className="flex border-b border-[#E5E7EB] gap-6 text-sm font-medium">
        <button
          type="button"
          data-tl="goals-tab-goals"
          onClick={() => {
            tl.setVar("wfGoalsTab", "goals");
            tl.setUrl(URLS.goals);
          }}
          className={`pb-3 transition-colors ${
            activeTab === "goals"
              ? "border-b-2 border-[#7014D9] text-[#7014D9] font-semibold"
              : "text-[#6B7280] hover:text-[#111827]"
          }`}
        >
          Goals
        </button>
        <button
          type="button"
          data-tl="goals-tab-kpis"
          onClick={() => {
            tl.setVar("wfGoalsTab", "kpis");
            tl.setUrl(URLS.goalsKpis);
          }}
          className={`pb-3 transition-colors ${
            activeTab === "kpis"
              ? "border-b-2 border-[#7014D9] text-[#7014D9] font-semibold"
              : "text-[#6B7280] hover:text-[#111827]"
          }`}
        >
          KPIs
        </button>
      </div>

      {/* TAB 1: Goals */}
      {activeTab === "goals" && (
        <div className="space-y-4">
          <div>
            <h1
              data-tl="goals-heading"
              className="text-xl font-bold text-[#111827]"
            >
              Goals
            </h1>
            <p className="text-xs text-[#6B7280] mt-0.5">
              Manage employee goals and track progress
            </p>
          </div>

          <div className="flex items-center justify-between gap-4">
            <div className="relative flex-1 max-w-sm">
              <input
                type="text"
                readOnly
                placeholder="Search by title or employee..."
                className="w-full rounded-lg border border-[#D1D5DB] bg-white px-3 py-2 text-xs text-[#111827] placeholder-[#9CA3AF] outline-none"
              />
            </div>
            <div className="flex items-center gap-2 rounded-lg border border-[#D1D5DB] bg-white px-3 py-2 text-xs text-[#6B7280]">
              <span>All Statuses</span>
              <Icon name="chevronDown" size={14} />
            </div>
          </div>

          <div
            data-tl="goals-table"
            className="rounded-xl border border-[#E5E7EB] bg-white shadow-sm overflow-hidden"
          >
            <table className="w-full text-left text-xs">
              <thead className="bg-gray-50 border-b border-[#E5E7EB] text-[#6B7280] font-semibold">
                <tr>
                  <th className="py-3 px-4">Title</th>
                  <th className="py-3 px-4">Employee</th>
                  <th className="py-3 px-4">Target Date</th>
                  <th className="py-3 px-4">Progress</th>
                  <th className="py-3 px-4">Status</th>
                  <th className="py-3 px-4 text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-[#F3F4F6] text-[#111827]">
                {SAMPLE_GOALS.goals.map((g, idx) => (
                  <tr key={g.id} className="hover:bg-gray-50/50">
                    <td className="py-3.5 px-4 font-semibold text-[#7014D9] cursor-pointer hover:underline">
                      {g.title}
                    </td>
                    <td className="py-3.5 px-4 text-[#4B5563]">{g.employee}</td>
                    <td className="py-3.5 px-4 text-[#6B7280]">{g.targetDate}</td>
                    <td className="py-3.5 px-4">
                      <div className="flex items-center gap-2">
                        <div className="h-1.5 w-16 rounded-full bg-gray-200 overflow-hidden">
                          <div className="h-full bg-[#10B981] w-full" />
                        </div>
                        <span className="text-[11px] font-medium text-[#111827]">
                          {g.progress}
                        </span>
                      </div>
                    </td>
                    <td className="py-3.5 px-4">
                      <span
                        className={`rounded-full px-2.5 py-0.5 text-[11px] font-semibold ${
                          g.status === "Completed"
                            ? "bg-[#DCFCE7] text-[#166534]"
                            : "bg-[#DBEAFE] text-[#1D4ED8]"
                        }`}
                      >
                        {g.status}
                      </span>
                    </td>
                    <td className="py-3.5 px-4 text-right">
                      {idx === 0 ? (
                        <div className="inline-flex items-center gap-2">
                          <button
                            type="button"
                            data-tl="goal-action-view"
                            className="rounded p-1 text-[#6B7280] hover:bg-gray-100 hover:text-[#111827] transition-colors"
                            title="View goal"
                          >
                            <Icon name="eye" size={15} />
                          </button>
                          <button
                            type="button"
                            data-tl="goal-action-edit"
                            onClick={() => tl.setVar("wfEditGoalOpen", true)}
                            className="rounded p-1 text-[#6B7280] hover:bg-gray-100 hover:text-[#7014D9] transition-colors"
                            title="Edit goal"
                          >
                            <Icon name="pencil" size={15} />
                          </button>
                          <button
                            type="button"
                            data-tl="goal-action-delete"
                            className="rounded p-1 text-[#EF4444] hover:bg-red-50 transition-colors"
                            title="Delete goal"
                          >
                            <Icon name="trash" size={15} />
                          </button>
                        </div>
                      ) : (
                        <div className="inline-flex items-center gap-2 text-[#9CA3AF]">
                          <Icon name="eye" size={15} />
                          <Icon name="pencil" size={15} />
                          <Icon name="trash" size={15} />
                        </div>
                      )}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* TAB 2: KPIs */}
      {activeTab === "kpis" && (
        <div className="space-y-4">
          <div>
            <h1
              data-tl="kpis-heading"
              className="text-xl font-bold text-[#111827]"
            >
              KPIs
            </h1>
            <p className="text-xs text-[#6B7280] mt-0.5">
              Targets, results and verification
            </p>
          </div>

          <div className="flex items-center justify-between gap-4">
            <div className="relative flex-1 max-w-sm">
              <input
                type="text"
                readOnly
                placeholder="Search KPIs..."
                className="w-full rounded-lg border border-[#D1D5DB] bg-white px-3 py-2 text-xs text-[#111827] placeholder-[#9CA3AF] outline-none"
              />
            </div>
            <div className="flex items-center gap-2 rounded-lg border border-[#D1D5DB] bg-white px-3 py-2 text-xs text-[#6B7280]">
              <span>All statuses</span>
              <Icon name="chevronDown" size={14} />
            </div>
          </div>

          <div
            data-tl="kpis-table"
            className="rounded-xl border border-[#E5E7EB] bg-white shadow-sm overflow-hidden"
          >
            <table className="w-full text-left text-xs">
              <thead className="bg-gray-50 border-b border-[#E5E7EB] text-[#6B7280] font-semibold">
                <tr>
                  <th className="py-3 px-4">KPI</th>
                  <th className="py-3 px-4">Employee</th>
                  <th className="py-3 px-4">Period</th>
                  <th className="py-3 px-4">Result / Target</th>
                  <th className="py-3 px-4">Score</th>
                  <th className="py-3 px-4">Status</th>
                  <th className="py-3 px-4 text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-[#F3F4F6] text-[#111827]">
                {SAMPLE_GOALS.kpis.map((k) => (
                  <tr
                    key={k.id}
                    data-tl="kpi-row"
                    className="hover:bg-gray-50/50"
                  >
                    <td className="py-3.5 px-4 font-semibold text-[#7014D9]">
                      <button
                        type="button"
                        data-tl="kpi-link-sample"
                        onClick={() => tl.setVar("wfKpiDetailsOpen", true)}
                        className="hover:underline text-left"
                      >
                        {k.title}
                      </button>
                    </td>
                    <td className="py-3.5 px-4 text-[#4B5563]">{k.employee}</td>
                    <td className="py-3.5 px-4 text-[#6B7280]">{k.period}</td>
                    <td className="py-3.5 px-4 font-medium">{k.resultTarget}</td>
                    <td className="py-3.5 px-4">
                      <span
                        data-tl="kpi-score"
                        className="font-bold text-[#10B981]"
                      >
                        {k.score}
                      </span>
                    </td>
                    <td className="py-3.5 px-4">
                      <span
                        data-tl="kpi-status"
                        className="rounded-full bg-[#EDE9FE] px-2.5 py-0.5 text-[11px] font-semibold text-[#7014D9]"
                      >
                        {k.status}
                      </span>
                    </td>
                    <td className="py-3.5 px-4 text-right">
                      <button
                        type="button"
                        data-tl="kpi-actions"
                        className="rounded-lg p-1.5 text-[#6B7280] hover:bg-gray-100"
                      >
                        <Icon name="dots" size={16} />
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
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

      {/* MODAL 1: Edit Goal */}
      {editModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 p-4">
          <div
            data-tl="goal-edit-modal"
            className="relative w-full max-w-lg rounded-2xl bg-white p-6 shadow-2xl max-h-[90vh] overflow-y-auto no-scrollbar"
          >
            <div className="flex items-center justify-between border-b border-[#F3F4F6] pb-4">
              <h2 className="text-base font-bold text-[#111827]">Edit Goal</h2>
              <button
                type="button"
                data-tl="goal-modal-close"
                onClick={() => tl.setVar("wfEditGoalOpen", false)}
                className="rounded-lg p-1 text-[#9CA3AF] hover:bg-gray-100 hover:text-[#111827] transition-colors"
              >
                <Icon name="x" size={18} />
              </button>
            </div>

            <div className="mt-5 space-y-4 text-xs">
              {/* Title */}
              <div>
                <label className="block font-semibold text-[#374151] mb-1.5">
                  Title *
                </label>
                <input
                  type="text"
                  readOnly
                  data-tl="goal-field-title"
                  value="Appraisal for Sam"
                  className="w-full rounded-lg border border-[#D1D5DB] bg-white px-3 py-2 text-[#111827] font-medium outline-none"
                />
              </div>

              {/* Description */}
              <div>
                <label className="block font-semibold text-[#374151] mb-1.5">
                  Description
                </label>
                <textarea
                  readOnly
                  rows={2}
                  data-tl="goal-field-desc"
                  placeholder="Describe the goal"
                  className="w-full rounded-lg border border-[#D1D5DB] bg-white p-3 text-[#111827] placeholder-[#9CA3AF] outline-none resize-none"
                />
              </div>

              {/* Target Date */}
              <div>
                <label className="block font-semibold text-[#374151] mb-1.5">
                  Target Date
                </label>
                <div
                  data-tl="goal-field-date"
                  className="flex items-center justify-between rounded-lg border border-[#D1D5DB] bg-white px-3 py-2 text-[#111827]"
                >
                  <span>25/10/2026</span>
                  <Icon name="shCalendar" size={14} className="text-[#6B7280]" />
                </div>
              </div>

              {/* Progress Slider */}
              <div>
                <div className="flex justify-between items-center mb-1.5">
                  <label
                    data-tl="goal-progress-label"
                    className="font-semibold text-[#374151]"
                  >
                    Progress: {goalProgress}%
                  </label>
                </div>
                <div className="relative py-2">
                  <input
                    type="range"
                    min="0"
                    max="100"
                    data-tl="goal-progress-slider"
                    value={goalProgress}
                    onChange={(e) =>
                      tl.setVar("wfGoalProgress", Number(e.target.value))
                    }
                    className="w-full accent-[#7014D9] cursor-pointer"
                  />
                </div>
              </div>

              {/* Status */}
              <div>
                <label className="block font-semibold text-[#374151] mb-1.5">
                  Status
                </label>
                <div
                  data-tl="goal-field-status"
                  className="flex items-center justify-between rounded-lg border border-[#D1D5DB] bg-white px-3 py-2 text-[#111827]"
                >
                  <span>Completed</span>
                  <Icon name="chevronDown" size={14} className="text-[#6B7280]" />
                </div>
              </div>

              {/* Action buttons */}
              <div className="flex items-center justify-end gap-3 pt-3 border-t border-[#F3F4F6]">
                <button
                  type="button"
                  data-tl="goal-modal-cancel"
                  onClick={() => tl.setVar("wfEditGoalOpen", false)}
                  className="rounded-lg border border-[#D1D5DB] px-4 py-2 font-medium text-[#4B5563] hover:bg-gray-50 transition-colors"
                >
                  Cancel
                </button>
                <button
                  type="button"
                  data-tl="goal-modal-submit"
                  className="rounded-lg bg-[#7014D9] px-4 py-2 font-semibold text-white hover:bg-[#5B0FB3] transition-colors shadow-sm"
                >
                  Update Goal
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* MODAL 2: KPI Details */}
      {kpiDetailsOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 p-4">
          <div
            data-tl="kpi-details-modal"
            className="relative w-full max-w-xl rounded-2xl bg-white p-6 shadow-2xl max-h-[85vh] flex flex-col"
          >
            {/* Header */}
            <div className="flex items-center justify-between border-b border-[#F3F4F6] pb-4 shrink-0">
              <div className="flex items-center gap-3">
                <h2 className="text-base font-bold text-[#111827]">
                  {SAMPLE_GOALS.kpiDetails.title}
                </h2>
                <span
                  data-tl="kpi-detail-status"
                  className="rounded-full bg-[#EDE9FE] px-2.5 py-0.5 text-[11px] font-semibold text-[#7014D9]"
                >
                  {SAMPLE_GOALS.kpiDetails.status}
                </span>
                <span className="text-[#6B7280] text-xs">
                  {SAMPLE_GOALS.kpiDetails.employee}
                </span>
              </div>
              <div className="flex items-center gap-2">
                <button
                  type="button"
                  className="p-1 text-[#6B7280] hover:bg-gray-100 rounded"
                >
                  <Icon name="dots" size={16} />
                </button>
                <button
                  type="button"
                  data-tl="kpi-modal-close"
                  onClick={() => tl.setVar("wfKpiDetailsOpen", false)}
                  className="rounded-lg p-1 text-[#9CA3AF] hover:bg-gray-100 hover:text-[#111827] transition-colors"
                >
                  <Icon name="x" size={18} />
                </button>
              </div>
            </div>

            {/* Scrollable body */}
            <div
              data-tl="kpi-modal-scroll"
              className="mt-4 space-y-4 overflow-y-auto pr-1 text-xs"
            >
              {/* Two-column facts */}
              <div
                data-tl="kpi-facts"
                className="grid grid-cols-2 gap-4 rounded-xl border border-[#E5E7EB] bg-gray-50/50 p-4"
              >
                <div>
                  <span className="text-[#6B7280] block text-[11px]">Period</span>
                  <span className="font-semibold text-[#111827]">
                    {SAMPLE_GOALS.kpiDetails.period}
                  </span>
                </div>
                <div>
                  <span className="text-[#6B7280] block text-[11px]">
                    Direction / weight
                  </span>
                  <span className="font-semibold text-[#111827]">
                    {SAMPLE_GOALS.kpiDetails.directionWeight}
                  </span>
                </div>
                <div>
                  <span className="text-[#6B7280] block text-[11px]">
                    Baseline / target
                  </span>
                  <span className="font-semibold text-[#111827]">
                    {SAMPLE_GOALS.kpiDetails.baselineTarget}
                  </span>
                </div>
                <div>
                  <span className="text-[#6B7280] block text-[11px]">
                    Actual / score
                  </span>
                  <span className="font-semibold text-[#10B981]">
                    {SAMPLE_GOALS.kpiDetails.actualScore}
                  </span>
                </div>
              </div>

              {/* Note */}
              <p className="text-[11px] text-[#6B7280] leading-relaxed">
                {SAMPLE_GOALS.kpiDetails.note}
              </p>

              {/* Evidence note card */}
              <div
                data-tl="kpi-evidence-card"
                className="rounded-xl border border-[#E5E7EB] bg-white p-4 shadow-sm"
              >
                <span className="text-[11px] font-semibold text-[#6B7280] block mb-1">
                  Evidence note
                </span>
                <span className="text-xs text-[#111827]">
                  {SAMPLE_GOALS.kpiDetails.evidence}
                </span>
              </div>

              {/* Reviewer feedback card */}
              <div
                data-tl="kpi-feedback-card"
                className="rounded-xl border border-[#DDD6FE] bg-[#F5F3FF] p-4"
              >
                <span className="text-[11px] font-semibold text-[#7014D9] block mb-1">
                  Reviewer feedback
                </span>
                <span className="text-xs text-[#7014D9] font-medium">
                  {SAMPLE_GOALS.kpiDetails.feedback}
                </span>
              </div>

              {/* Weighted score card */}
              <div
                data-tl="kpi-weighted-card"
                className="rounded-xl border border-[#E5E7EB] bg-gray-50 p-3 text-xs text-[#4B5563] font-medium"
              >
                {SAMPLE_GOALS.kpiDetails.weightedScore}
              </div>

              {/* History section */}
              <div
                data-tl="kpi-history-section"
                className="space-y-2 pt-2 border-t border-[#F3F4F6]"
              >
                <h3 className="font-bold text-[#111827] text-xs">History</h3>
                {SAMPLE_GOALS.kpiDetails.history.map((h, idx) => (
                  <div
                    key={idx}
                    data-tl={`kpi-history-${idx + 1}`}
                    className="rounded-lg border border-[#E5E7EB] bg-white p-3 space-y-1"
                  >
                    <div className="flex justify-between items-center text-[11px]">
                      <span className="font-semibold text-[#7014D9]">
                        {h.action} · {h.actor}
                      </span>
                      <span className="text-[#9CA3AF]">{h.date}</span>
                    </div>
                    <div className="text-[#4B5563]">
                      Actual: <span className="font-medium text-[#111827]">{h.actual}</span>
                      {h.evidence && ` / ${h.evidence}`}
                    </div>
                    {h.feedback && (
                      <div className="text-[#7014D9] font-medium text-[11px]">
                        Feedback: {h.feedback}
                      </div>
                    )}
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
