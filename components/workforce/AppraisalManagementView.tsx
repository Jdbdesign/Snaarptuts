"use client";

import { Icon } from "@/components/icons";
import type { Timeline } from "@/lib/timeline";
import { useTimelineVar } from "@/lib/useTimelineVar";
import {
  APPRAISAL_CYCLES,
  APPRAISAL_INSIGHTS_QUESTIONS,
  APPRAISAL_TEMPLATES_LIST,
  ASSIGNED_REVIEWS_ADMIN_LIST,
} from "./workforce-data";

type Props = {
  tl: Timeline;
  onCreateCycle?: () => void;
  onViewReview?: (index: number) => void;
};

export function AppraisalManagementView({ tl, onCreateCycle, onViewReview }: Props) {
  const currentTab = useTimelineVar<string>(tl, "wfAppraisalTab", "cycles");
  const templateMenuOpen = useTimelineVar<string | null>(tl, "wfTemplateMenuOpen", null);

  const TABS = [
    { id: "cycles", label: "Review Cycles" },
    { id: "team", label: "Team Reviews" },
    { id: "overview", label: "Overview" },
    { id: "templates", label: "Templates" },
    { id: "approvals", label: "Approvals" },
    { id: "assigned", label: "Assigned Reviews" },
    { id: "insights", label: "Insights" },
    { id: "actions", label: "Employment Actions" },
  ];

  return (
    <div className="flex flex-col gap-6 max-w-7xl mx-auto pb-16">
      {/* Top Header */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-3">
          <button
            type="button"
            data-tl="btn-appraisal-back"
            className="flex h-8 w-8 items-center justify-center rounded-lg border border-[#E5E7EB] bg-white text-[#4B5563] hover:bg-gray-50 transition-colors shadow-2xs"
          >
            <Icon name="arrowLeft" size={16} />
          </button>
          <div>
            <h1 data-tl="appraisal-mgmt-title" className="text-xl font-bold text-[#111827]">
              Appraisal Management
            </h1>
            <p className="text-xs text-[#6B7280] mt-0.5">
              Manage cycles, templates, reviews and approvals
            </p>
          </div>
        </div>

        {currentTab === "cycles" && (
          <div className="flex items-center gap-3">
            <span data-tl="cycles-count" className="text-xs font-medium text-[#6B7280]">
              4 cycle(s)
            </span>
            <button
              type="button"
              data-tl="btn-create-cycle"
              onClick={onCreateCycle}
              className="flex items-center gap-1.5 px-3.5 py-2 rounded-xl bg-[#7014D9] text-white text-xs font-semibold hover:bg-[#5E11B8] transition-colors shadow-sm"
            >
              <Icon name="plus" size={14} />
              <span>Create Cycle</span>
            </button>
          </div>
        )}

        {currentTab === "templates" && (
          <button
            type="button"
            data-tl="btn-create-template"
            className="flex items-center gap-1.5 px-3.5 py-2 rounded-xl bg-[#7014D9] text-white text-xs font-semibold hover:bg-[#5E11B8] transition-colors shadow-sm"
          >
            <Icon name="plus" size={14} />
            <span>Create template</span>
          </button>
        )}
      </div>

      {/* Tabs Row */}
      <div
        data-tl="appraisal-tabs-row"
        className="flex items-center gap-1 border-b border-[#E5E7EB] overflow-x-auto no-scrollbar"
      >
        {TABS.map((tab) => {
          const isActive = currentTab === tab.id;
          return (
            <button
              key={tab.id}
              type="button"
              data-tl={`tab-${tab.id}`}
              onClick={() => tl.setVar("wfAppraisalTab", tab.id)}
              className={`px-3.5 py-2.5 text-xs font-medium transition-all relative whitespace-nowrap ${
                isActive
                  ? "text-[#7014D9] font-semibold border-b-2 border-[#7014D9]"
                  : "text-[#6B7280] hover:text-[#111827]"
              }`}
            >
              {tab.label}
            </button>
          );
        })}
      </div>

      {/* Tab 1: Review Cycles */}
      {currentTab === "cycles" && (
        <div data-tl="cycles-table-card" className="rounded-2xl border border-[#E5E7EB] bg-white shadow-2xs overflow-hidden">
          <div className="overflow-x-auto">
            <table data-tl="cycles-table" className="w-full text-left text-xs">
              <thead className="bg-[#F9FAFB] border-b border-[#E5E7EB] text-[#4B5563] font-semibold">
                <tr>
                  <th className="py-3 px-4">Name</th>
                  <th className="py-3 px-4">Type</th>
                  <th className="py-3 px-4">Status</th>
                  <th className="py-3 px-4">Start Date</th>
                  <th className="py-3 px-4">End Date</th>
                  <th className="py-3 px-4 text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-[#F3F4F6] text-[#111827]">
                {APPRAISAL_CYCLES.map((cycle, idx) => {
                  const isActive = cycle.status === "ACTIVE";
                  return (
                    <tr
                      key={cycle.id}
                      data-tl={`cycle-row-${idx + 1}`}
                      className="hover:bg-gray-50/70 transition-colors"
                    >
                      <td className="py-3 px-4 font-medium">
                        <span data-tl={`cycle-name-${idx + 1}`} className="text-[#7014D9] hover:underline cursor-pointer">
                          {cycle.name}
                        </span>
                      </td>
                      <td className="py-3 px-4 text-[#4B5563]">{cycle.type}</td>
                      <td className="py-3 px-4">
                        <span
                          data-tl={isActive ? "status-pill-active" : "status-pill-paused"}
                          className={`inline-flex items-center px-2 py-0.5 rounded-full text-[10px] font-semibold tracking-wide ${
                            isActive
                              ? "bg-emerald-50 text-emerald-700 border border-emerald-200"
                              : "bg-purple-50 text-purple-700 border border-purple-200"
                          }`}
                        >
                          {cycle.status}
                        </span>
                      </td>
                      <td className="py-3 px-4 text-[#4B5563]">{cycle.startDate}</td>
                      <td className="py-3 px-4 text-[#4B5563]">{cycle.endDate}</td>
                      <td className="py-3 px-4 text-right">
                        <div className="flex items-center justify-end gap-1.5">
                          <button
                            type="button"
                            data-tl={`action-pause-${idx + 1}`}
                            className="px-2 py-1 rounded-md border border-[#E5E7EB] text-[11px] font-medium text-[#4B5563] hover:bg-gray-100 transition-colors"
                          >
                            {isActive ? "Pause" : "Resume"}
                          </button>
                          <button
                            type="button"
                            data-tl={`action-eye-${idx + 1}`}
                            className="p-1 rounded-md text-[#6B7280] hover:bg-gray-100 hover:text-[#111827] transition-colors"
                            title="View"
                          >
                            <Icon name="eye" size={15} />
                          </button>
                          <button
                            type="button"
                            data-tl={`action-clock-${idx + 1}`}
                            className="p-1 rounded-md text-[#6B7280] hover:bg-gray-100 hover:text-[#111827] transition-colors"
                            title="History"
                          >
                            <Icon name="clock" size={15} />
                          </button>
                        </div>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
          <div data-tl="cycles-pagination" className="flex items-center justify-between px-4 py-3 border-t border-[#F3F4F6] text-xs text-[#6B7280] bg-gray-50/50">
            <span>Previous</span>
            <span className="font-medium text-[#111827]">Page 1 of 1</span>
            <span>Next</span>
          </div>
        </div>
      )}

      {/* Tab 3: Overview */}
      {currentTab === "overview" && (
        <div className="flex flex-col gap-5">
          <div>
            <h2 data-tl="overview-heading" className="text-base font-semibold text-[#111827]">
              Appraisal overview
            </h2>
            <p className="text-xs text-[#6B7280] mt-0.5">
              Track participant progress across appraisal cycles
            </p>
          </div>

          {/* Filters row */}
          <div data-tl="overview-filters" className="grid grid-cols-2 md:grid-cols-6 gap-2.5 p-3 rounded-2xl bg-white border border-[#E5E7EB] shadow-2xs">
            <select data-tl="filter-cycles" className="h-8 px-2.5 rounded-lg border border-[#E5E7EB] text-xs bg-white text-[#4B5563] focus:border-[#7014D9] focus:outline-none">
              <option>All cycles</option>
              <option>Q4 cycle</option>
              <option>2027 Appraisal cycle</option>
            </select>
            <select data-tl="filter-depts" className="h-8 px-2.5 rounded-lg border border-[#E5E7EB] text-xs bg-white text-[#4B5563] focus:border-[#7014D9] focus:outline-none">
              <option>All departments</option>
              <option>Engineering</option>
              <option>Marketing</option>
            </select>
            <select data-tl="filter-supervisors" className="h-8 px-2.5 rounded-lg border border-[#E5E7EB] text-xs bg-white text-[#4B5563] focus:border-[#7014D9] focus:outline-none">
              <option>All supervisors</option>
              <option>Sam Taylor</option>
            </select>
            <select data-tl="filter-statuses" className="h-8 px-2.5 rounded-lg border border-[#E5E7EB] text-xs bg-white text-[#4B5563] focus:border-[#7014D9] focus:outline-none">
              <option>All statuses</option>
              <option>Active</option>
              <option>Completed</option>
            </select>
            <input
              type="text"
              data-tl="filter-date-from"
              placeholder="From dd/mm/yyyy"
              className="h-8 px-2.5 rounded-lg border border-[#E5E7EB] text-xs text-[#4B5563] focus:border-[#7014D9] focus:outline-none"
            />
            <input
              type="text"
              data-tl="filter-date-to"
              placeholder="To dd/mm/yyyy"
              className="h-8 px-2.5 rounded-lg border border-[#E5E7EB] text-xs text-[#4B5563] focus:border-[#7014D9] focus:outline-none"
            />
          </div>

          {/* Table with empty state */}
          <div data-tl="overview-table" className="rounded-2xl border border-[#E5E7EB] bg-white shadow-2xs overflow-hidden">
            <div className="overflow-x-auto">
              <table className="w-full text-left text-xs">
                <thead className="bg-[#F9FAFB] border-b border-[#E5E7EB] text-[#4B5563] font-semibold">
                  <tr>
                    <th className="py-3 px-4">Employee</th>
                    <th className="py-3 px-4">Department</th>
                    <th className="py-3 px-4">Supervisor</th>
                    <th className="py-3 px-4">Cycle</th>
                    <th className="py-3 px-4">Stage</th>
                    <th className="py-3 px-4">Deadline</th>
                    <th className="py-3 px-4">Result</th>
                    <th className="py-3 px-4">Development</th>
                    <th className="py-3 px-4 text-right">Actions</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td colSpan={9} className="py-12 text-center text-xs text-[#6B7280]">
                      <div data-tl="overview-empty-state" className="flex flex-col items-center justify-center gap-1">
                        <Icon name="search" size={24} className="text-[#9CA3AF] mb-1" />
                        <span className="font-medium text-[#111827]">No appraisals match these filters.</span>
                        <span className="text-[11px] text-[#9CA3AF]">Try clearing your search or adjust the date range.</span>
                      </div>
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
            <div data-tl="overview-pagination" className="flex items-center justify-between px-4 py-3 border-t border-[#F3F4F6] text-xs text-[#6B7280] bg-gray-50/50">
              <span>Previous</span>
              <span className="font-medium text-[#111827]">Page 1</span>
              <span>Next</span>
            </div>
          </div>
        </div>
      )}

      {/* Tab 6: Assigned Reviews */}
      {currentTab === "assigned" && (
        <div className="flex flex-col gap-4">
          <div>
            <h2 data-tl="assigned-reviews-heading" className="text-base font-semibold text-[#111827]">
              Assigned reviews and approvals
            </h2>
            <p className="text-xs text-[#6B7280] mt-0.5">
              Complete assigned evaluations, line-manager assessments and sign-offs
            </p>
          </div>

          <div data-tl="assigned-reviews-list" className="grid grid-cols-1 md:grid-cols-2 gap-3.5">
            {ASSIGNED_REVIEWS_ADMIN_LIST.map((item, idx) => {
              const isCompleted = item.role === "COMPLETED";
              return (
                <div
                  key={item.id}
                  data-tl={`assigned-card-${idx + 1}`}
                  className="flex items-center justify-between p-4 rounded-2xl border border-[#E5E7EB] bg-white shadow-2xs hover:border-[#D1D5DB] transition-all"
                >
                  <div className="flex items-center gap-3">
                    <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-purple-50 text-[#7014D9] font-bold text-xs">
                      {item.employee === "Alex Morgan" ? "AM" : "JL"}
                    </div>
                    <div>
                      <div className="flex items-center gap-2">
                        <span className="font-semibold text-sm text-[#111827]">{item.employee}</span>
                        <span
                          className={`px-2 py-0.5 rounded-full text-[10px] font-bold tracking-wider ${
                            isCompleted
                              ? "bg-emerald-50 text-emerald-700 border border-emerald-200"
                              : "bg-blue-50 text-blue-700 border border-blue-200"
                          }`}
                        >
                          {item.role}
                        </span>
                      </div>
                      <p className="text-xs text-[#6B7280] mt-0.5">{item.cycle}</p>
                    </div>
                  </div>

                  <button
                    type="button"
                    data-tl={idx === 0 ? "btn-open-task-1" : `btn-view-review-${idx + 1}`}
                    onClick={() => onViewReview?.(idx)}
                    className={`px-3 py-1.5 rounded-xl text-xs font-semibold transition-colors ${
                      idx === 0
                        ? "border border-[#7014D9] text-[#7014D9] hover:bg-purple-50"
                        : "border border-[#E5E7EB] text-[#111827] hover:bg-gray-50 shadow-2xs"
                    }`}
                  >
                    {item.action}
                  </button>
                </div>
              );
            })}
          </div>
        </div>
      )}

      {/* Tab 4: Templates */}
      {currentTab === "templates" && (
        <div className="flex flex-col gap-4">
          <div>
            <h2 data-tl="templates-heading" className="text-base font-semibold text-[#111827]">
              Appraisal templates
            </h2>
            <p className="text-xs text-[#6B7280] mt-0.5">
              Standard review forms and customizable performance templates
            </p>
          </div>

          <div data-tl="templates-grid" className="grid grid-cols-1 md:grid-cols-2 gap-3.5">
            {APPRAISAL_TEMPLATES_LIST.map((tmpl) => {
              const isDraft = tmpl.status === "DRAFT";
              const isMenuOpen = templateMenuOpen === tmpl.id;
              const cardDataTl =
                tmpl.id === "tmpl-1"
                  ? "template-card-probation"
                  : tmpl.id === "tmpl-2"
                  ? "template-card-360"
                  : tmpl.id === "tmpl-4"
                  ? "template-card-annual"
                  : `template-card-${tmpl.id}`;
              const menuBtnDataTl =
                tmpl.id === "tmpl-1"
                  ? "template-menu-btn-probation"
                  : tmpl.id === "tmpl-4"
                  ? "template-menu-btn-annual"
                  : `template-menu-btn-${tmpl.id}`;

              return (
                <div
                  key={tmpl.id}
                  data-tl={cardDataTl}
                  className="relative flex items-center justify-between p-4 rounded-2xl border border-[#E5E7EB] bg-white shadow-2xs hover:border-[#D1D5DB] transition-all"
                >
                  <div className="flex items-center gap-3">
                    <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-[#FAF5FF] text-[#7014D9]">
                      <Icon name="docFile" size={20} />
                    </div>
                    <div>
                      <h3 className="font-semibold text-xs text-[#111827]">{tmpl.name}</h3>
                      <div className="flex items-center gap-1.5 mt-0.5">
                        <span
                          data-tl={isDraft ? "template-status-draft" : "template-status-published"}
                          className={`px-1.5 py-0.2 rounded text-[9px] font-bold uppercase tracking-wider ${
                            isDraft
                              ? "bg-amber-50 text-amber-700 border border-amber-200"
                              : "bg-emerald-50 text-emerald-700 border border-emerald-200"
                          }`}
                        >
                          {tmpl.status}
                        </span>
                        <span className="text-[10px] text-[#9CA3AF]">· {tmpl.revision}</span>
                      </div>
                    </div>
                  </div>

                  <div className="relative">
                    <button
                      type="button"
                      data-tl={menuBtnDataTl}
                      onClick={() =>
                        tl.setVar("wfTemplateMenuOpen", isMenuOpen ? null : tmpl.id)
                      }
                      className="p-1.5 rounded-lg text-[#6B7280] hover:bg-gray-100 transition-colors"
                    >
                      <Icon name="dots" size={16} />
                    </button>

                    {/* Dropdown Menu */}
                    {isMenuOpen && (
                      <div
                        data-tl="template-actions-menu"
                        className="absolute right-0 top-8 z-30 w-36 rounded-xl border border-[#E5E7EB] bg-white py-1 shadow-lg text-xs"
                      >
                        <button
                          type="button"
                          data-tl="template-action-edit"
                          onClick={() => tl.setVar("wfTemplateMenuOpen", null)}
                          className="w-full px-3 py-1.5 text-left text-[#111827] hover:bg-gray-100 flex items-center gap-2"
                        >
                          <Icon name="pencil" size={13} className="text-[#6B7280]" />
                          <span>Edit / preview</span>
                        </button>
                        <button
                          type="button"
                          data-tl="template-action-duplicate"
                          onClick={() => tl.setVar("wfTemplateMenuOpen", null)}
                          className="w-full px-3 py-1.5 text-left text-[#111827] hover:bg-gray-100 flex items-center gap-2"
                        >
                          <Icon name="copy" size={13} className="text-[#6B7280]" />
                          <span>Duplicate</span>
                        </button>
                      </div>
                    )}
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      )}

      {/* Tab 7: Insights */}
      {currentTab === "insights" && (
        <div className="flex flex-col gap-5">
          <div className="flex items-center justify-between">
            <div>
              <h2 data-tl="insights-heading" className="text-base font-semibold text-[#111827]">
                Appraisal insights
              </h2>
              <p data-tl="insights-period" className="text-xs text-[#6B7280] mt-0.5">
                Showing question averages across all 2026 appraisal cycles
              </p>
            </div>
          </div>

          <div data-tl="insights-table" className="rounded-2xl border border-[#E5E7EB] bg-white shadow-2xs overflow-hidden">
            <div className="overflow-x-auto">
              <table className="w-full text-left text-xs">
                <thead className="bg-[#F9FAFB] border-b border-[#E5E7EB] text-[#4B5563] font-semibold">
                  <tr>
                    <th className="py-3 px-4 w-[60%]">Question</th>
                    <th className="py-3 px-4 text-center">Responses</th>
                    <th className="py-3 px-4 text-center">Average</th>
                    <th className="py-3 px-4 text-right">Variance</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-[#F3F4F6] text-[#111827]">
                  {APPRAISAL_INSIGHTS_QUESTIONS.map((q, idx) => (
                    <tr
                      key={idx}
                      data-tl={`insight-row-${idx}`}
                      className="hover:bg-gray-50/70 transition-colors"
                    >
                      <td className="py-3 px-4">
                        <p className="font-medium text-[#111827]">{q.question}</p>
                        <span className="text-[10px] text-[#9CA3AF] block mt-0.5">
                          {q.category}
                        </span>
                      </td>
                      <td className="py-3 px-4 text-center text-[#4B5563]">{q.responses}</td>
                      <td className="py-3 px-4 text-center font-bold text-[#7014D9]">{q.average}</td>
                      <td className="py-3 px-4 text-right text-[#6B7280] font-mono">{q.variance}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>

          {/* Follow-up card */}
          <div
            data-tl="card-follow-up"
            className="p-4 rounded-2xl border border-[#E5E7EB] bg-white shadow-2xs"
          >
            <h3 className="font-semibold text-xs text-[#111827]">Follow-up indicators</h3>
            <p className="text-xs text-[#6B7280] mt-1">No follow-up indicators for this period.</p>
          </div>
        </div>
      )}

      {/* Tab 8: Employment Actions */}
      {currentTab === "actions" && (
        <div className="flex flex-col gap-4">
          <div className="p-8 text-center rounded-2xl border border-[#E5E7EB] bg-white shadow-2xs">
            <h2 data-tl="actions-heading" className="text-sm font-semibold text-[#111827]">
              Employment recommendations awaiting approval
            </h2>
            <p data-tl="actions-empty-state" className="text-xs text-[#6B7280] mt-1">
              No pending recommendations.
            </p>
          </div>
        </div>
      )}
    </div>
  );
}
