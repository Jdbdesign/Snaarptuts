"use client";

import { Icon } from "@/components/icons";
import type { Timeline } from "@/lib/timeline";
import { useTimelineVar } from "@/lib/useTimelineVar";
import {
  APPLICANTS_LIST,
  ARCHIVED_JOBS,
  JOB_POSTINGS,
  RECRUITMENT_STATS,
  URLS,
} from "./workforce-data";

type Props = {
  tl: Timeline;
};

export function RecruitmentView({ tl }: Props) {
  const activeTab = useTimelineVar<
    "dashboard" | "job-postings" | "applicants" | "archives" | "interviews"
  >(tl, "wfRecruitmentTab", "dashboard");
  const createJobModalOpen = useTimelineVar(tl, "wfCreateJobModalOpen", false);
  const deptSelectOpen = useTimelineVar(tl, "wfJobDeptSelectOpen", false);
  const selectedDept = useTimelineVar(tl, "wfJobDept", null);
  const workArrangementSelectOpen = useTimelineVar(
    tl,
    "wfJobWorkArrangementSelectOpen",
    false
  );
  const salaryPeriodSelectOpen = useTimelineVar(
    tl,
    "wfJobSalaryPeriodSelectOpen",
    false
  );

  const applicantStageSelectOpen = useTimelineVar(
    tl,
    "wfApplicantStageSelectOpen",
    false
  );
  const applicantMenuOpen = useTimelineVar(tl, "wfApplicantMenuOpen", false);
  const requestDocsModalOpen = useTimelineVar(
    tl,
    "wfRequestDocsModalOpen",
    false
  );
  const requestDocsDocxChecked = useTimelineVar(
    tl,
    "wfRequestDocsDocxChecked",
    false
  );
  const requestDocsInstructions = useTimelineVar(
    tl,
    "wfRequestDocsInstructions",
    ""
  );
  const applicantDetailsPanelOpen = useTimelineVar(
    tl,
    "wfApplicantDetailsPanelOpen",
    false
  );

  const archivesSubpage = useTimelineVar<"list" | "details">(
    tl,
    "wfArchivesSubpage",
    "list"
  );

  const scheduleInterviewModalOpen = useTimelineVar(
    tl,
    "wfScheduleInterviewModalOpen",
    false
  );
  const interviewCandidateSelectOpen = useTimelineVar(
    tl,
    "wfInterviewCandidateSelectOpen",
    false
  );
  const interviewCandidateSelected = useTimelineVar(
    tl,
    "wfInterviewCandidateSelected",
    false
  );
  const interviewersSelectOpen = useTimelineVar(
    tl,
    "wfInterviewersSelectOpen",
    false
  );
  const interviewersSelected = useTimelineVar<string[]>(
    tl,
    "wfInterviewersSelected",
    []
  );
  const interviewTypeSelectOpen = useTimelineVar(
    tl,
    "wfInterviewTypeSelectOpen",
    false
  );

  return (
    <div
      data-scroller="recruitment-page"
      className="relative flex-1 overflow-y-auto bg-[#F8F9FB] p-6 text-[#111827] font-['Poppins',sans-serif]"
    >
      {/* Top Section */}
      <div className="flex flex-col gap-4">
        {/* Header row with Title and Careers Link pill */}
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <button
              type="button"
              data-tl="btn-recruitment-back"
              onClick={() => tl.setVar("wfPage", "payroll")}
              className="flex h-8 w-8 items-center justify-center rounded-lg border border-[#E5E7EB] bg-white text-[#6B7280] hover:bg-gray-50 transition-colors shadow-2xs"
              title="Back"
            >
              <Icon name="arrowLeft" size={16} />
            </button>
            <div>
              <h1
                data-tl="recruitment-title"
                className="text-xl font-bold tracking-tight text-[#111827]"
              >
                Recruitment
              </h1>
              <p className="text-xs text-[#6B7280]">
                Manage job postings, applicants, and interviews
              </p>
            </div>
          </div>

          {/* Careers public link bar */}
          <div
            data-tl="pill-careers-link"
            className="flex items-center gap-2 rounded-xl border border-[#E5E7EB] bg-white px-3 py-1.5 shadow-2xs"
          >
            <Icon name="link" size={14} className="text-[#6B7280] shrink-0" />
            <span className="text-xs font-mono text-[#4B5563] truncate max-w-[200px]">
              https://workforce.snaarp.com/career...
            </span>
            <div className="flex items-center gap-1.5 ml-2 border-l border-[#E5E7EB] pl-2">
              <button
                type="button"
                data-tl="btn-careers-copy"
                className="rounded px-2 py-0.5 text-[11px] font-medium text-[#4B5563] border border-[#D1D5DB] hover:bg-gray-50 transition-colors"
              >
                Copy
              </button>
              <button
                type="button"
                data-tl="btn-careers-view"
                onClick={() => {
                  tl.setVar("wfPage", "careers-page");
                  tl.setUrl(URLS.careersPublic);
                }}
                className="rounded px-2 py-0.5 text-[11px] font-medium text-[#7014D9] border border-[#7014D9] hover:bg-purple-50 transition-colors"
              >
                View
              </button>
            </div>
          </div>
        </div>

        {/* Tabs Bar */}
        <div className="flex border-b border-[#E5E7EB] gap-2 pt-2">
          {[
            { id: "dashboard", label: "Dashboard" },
            { id: "job-postings", label: "Job Postings" },
            { id: "applicants", label: "Applicants" },
            { id: "archives", label: "Archives" },
            { id: "interviews", label: "Interviews" },
          ].map((tab) => {
            const isActive = activeTab === tab.id;
            return (
              <button
                key={tab.id}
                type="button"
                data-tl={`tab-recruitment-${tab.id}`}
                onClick={() =>
                  tl.setVar(
                    "wfRecruitmentTab",
                    tab.id as typeof activeTab
                  )
                }
                className={`pb-2.5 px-3 text-xs font-medium transition-colors relative cursor-pointer ${
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
      </div>

      {/* Tab 1: Dashboard */}
      {activeTab === "dashboard" && (
        <div className="mt-6 flex flex-col gap-6">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            <div
              data-tl="card-recruitment-open-jobs"
              className="rounded-2xl border border-[#E5E7EB] bg-white p-5 shadow-2xs flex flex-col gap-2"
            >
              <div className="flex items-center justify-between">
                <span className="text-xs text-[#6B7280] font-medium">
                  Open Jobs
                </span>
                <div className="h-8 w-8 rounded-lg bg-purple-50 flex items-center justify-center text-[#7014D9]">
                  <Icon name="briefcase" size={16} />
                </div>
              </div>
              <div className="text-2xl font-bold text-[#111827]">
                {RECRUITMENT_STATS[0]?.count ?? 1}
              </div>
            </div>

            <div
              data-tl="card-recruitment-total-applicants"
              className="rounded-2xl border border-[#E5E7EB] bg-white p-5 shadow-2xs flex flex-col gap-2"
            >
              <div className="flex items-center justify-between">
                <span className="text-xs text-[#6B7280] font-medium">
                  Total Applicants
                </span>
                <div className="h-8 w-8 rounded-lg bg-blue-50 flex items-center justify-center text-[#2563EB]">
                  <Icon name="users" size={16} />
                </div>
              </div>
              <div className="text-2xl font-bold text-[#111827]">
                {RECRUITMENT_STATS[1]?.count ?? 2}
              </div>
            </div>

            <div
              data-tl="card-recruitment-interviews-week"
              className="rounded-2xl border border-[#E5E7EB] bg-white p-5 shadow-2xs flex flex-col gap-2"
            >
              <div className="flex items-center justify-between">
                <span className="text-xs text-[#6B7280] font-medium">
                  Interviews This Week
                </span>
                <div className="h-8 w-8 rounded-lg bg-amber-50 flex items-center justify-center text-[#D97706]">
                  <Icon name="shCalendar" size={16} />
                </div>
              </div>
              <div className="text-2xl font-bold text-[#111827]">
                {RECRUITMENT_STATS[2]?.count ?? 0}
              </div>
            </div>

            <div
              data-tl="card-recruitment-hires-month"
              className="rounded-2xl border border-[#E5E7EB] bg-white p-5 shadow-2xs flex flex-col gap-2"
            >
              <div className="flex items-center justify-between">
                <span className="text-xs text-[#6B7280] font-medium">
                  Hires This Month
                </span>
                <div className="h-8 w-8 rounded-lg bg-emerald-50 flex items-center justify-center text-[#059669]">
                  <Icon name="userCheck" size={16} />
                </div>
              </div>
              <div className="text-2xl font-bold text-[#111827]">
                {RECRUITMENT_STATS[3]?.count ?? 1}
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Tab 2: Job Postings */}
      {activeTab === "job-postings" && (
        <div className="mt-6 flex flex-col gap-4">
          <div className="flex items-center justify-between">
            <span className="text-xs text-[#6B7280] font-medium">
              2 job posting(s)
            </span>
            <button
              type="button"
              data-tl="btn-create-job"
              onClick={() => tl.setVar("wfCreateJobModalOpen", true)}
              className="flex items-center gap-1.5 rounded-xl bg-[#7014D9] px-4 py-2 text-xs font-semibold text-white shadow-2xs hover:bg-[#5B0FB3] transition-colors"
            >
              <Icon name="plus" size={14} />
              <span>Create Job</span>
            </button>
          </div>

          {/* Jobs Table */}
          <div className="rounded-2xl border border-[#E5E7EB] bg-white shadow-2xs overflow-hidden">
            <div className="overflow-x-auto">
              <table className="w-full text-left text-xs">
                <thead>
                  <tr className="border-b border-[#E5E7EB] bg-[#F9FAFB] text-[#6B7280] font-semibold">
                    <th className="py-3 px-4">Title</th>
                    <th className="py-3 px-4">Department</th>
                    <th className="py-3 px-4">Type</th>
                    <th className="py-3 px-4">Status</th>
                    <th className="py-3 px-4">Applicants</th>
                    <th className="py-3 px-4 text-right">Actions</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-[#F3F4F6]">
                  {JOB_POSTINGS.map((job, idx) => (
                    <tr
                      key={job.id}
                      data-tl={`row-job-${idx + 1}`}
                      className="hover:bg-gray-50 transition-colors"
                    >
                      <td className="py-3 px-4 font-semibold text-[#111827]">
                        {job.title}
                      </td>
                      <td className="py-3 px-4 text-[#4B5563]">
                        {job.department}
                      </td>
                      <td className="py-3 px-4 text-[#4B5563] uppercase">
                        {job.type}
                      </td>
                      <td className="py-3 px-4">
                        <span
                          data-tl={
                            job.status === "OPEN"
                              ? "badge-status-open"
                              : "badge-status-closed"
                          }
                          className={`inline-flex items-center px-2 py-0.5 rounded text-[11px] font-semibold ${
                            job.status === "OPEN"
                              ? "bg-emerald-50 text-emerald-700 border border-emerald-200"
                              : "bg-red-50 text-red-700 border border-red-200"
                          }`}
                        >
                          {job.status}
                        </span>
                      </td>
                      <td className="py-3 px-4 text-[#4B5563]">-</td>
                      <td className="py-3 px-4 text-right">
                        <div
                          data-tl={idx === 0 ? "actions-job-1" : undefined}
                          className="inline-flex items-center gap-2 text-[#6B7280]"
                        >
                          <button
                            type="button"
                            data-tl={idx === 0 ? "btn-edit-job-1" : undefined}
                            className="p-1 hover:text-[#7014D9] rounded transition-colors"
                            title="Edit"
                          >
                            <Icon name="pencil" size={14} />
                          </button>
                          {idx === 0 && (
                            <button
                              type="button"
                              data-tl="btn-circle-job-1"
                              className="p-1 hover:text-[#7014D9] rounded transition-colors"
                              title="Details"
                            >
                              <Icon name="info" size={14} />
                            </button>
                          )}
                          <button
                            type="button"
                            data-tl={idx === 0 ? "btn-delete-job-1" : undefined}
                            className="p-1 hover:text-red-600 rounded transition-colors"
                            title="Delete"
                          >
                            <Icon name="trash" size={14} />
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            {/* Pagination Footer */}
            <div className="flex items-center justify-between border-t border-[#E5E7EB] px-4 py-3 text-xs text-[#6B7280]">
              <div className="flex items-center gap-2">
                <span>Jobs per page</span>
                <select className="rounded border border-[#D1D5DB] px-2 py-1 text-xs bg-white">
                  <option>20</option>
                </select>
              </div>
              <div className="flex items-center gap-3">
                <button
                  type="button"
                  disabled
                  className="opacity-50 cursor-not-allowed"
                >
                  Previous
                </button>
                <span>Page 1 of 1</span>
                <button
                  type="button"
                  disabled
                  className="opacity-50 cursor-not-allowed"
                >
                  Next
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Tab 3: Applicants */}
      {activeTab === "applicants" && (
        <div className="mt-6 flex flex-col gap-4">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
            <span className="text-xs text-[#6B7280] font-medium">
              1 applicant(s)
            </span>
            <div className="flex flex-wrap items-center gap-2">
              <div className="relative">
                <button
                  type="button"
                  data-tl="select-applicant-stage"
                  onClick={() =>
                    tl.setVar(
                      "wfApplicantStageSelectOpen",
                      !applicantStageSelectOpen
                    )
                  }
                  className="flex h-8 items-center justify-between gap-2 rounded-lg border border-[#D1D5DB] bg-white px-3 text-xs text-[#374151]"
                >
                  <span>All Stages</span>
                  <Icon name="chevronDown" size={12} />
                </button>
              </div>

              <select className="h-8 rounded-lg border border-[#D1D5DB] bg-white px-3 text-xs text-[#374151]">
                <option>All job postings</option>
              </select>

              <div className="relative">
                <input
                  type="text"
                  placeholder="Search name, email, job, stage, rating or..."
                  className="h-8 w-64 rounded-lg border border-[#D1D5DB] bg-white pl-8 pr-3 text-xs focus:border-[#7014D9] focus:outline-none"
                />
                <Icon
                  name="search"
                  size={14}
                  className="absolute left-2.5 top-2 text-[#9CA3AF]"
                />
              </div>

              <button
                type="button"
                className="flex h-8 items-center gap-1 rounded-lg bg-[#7014D9] px-3 text-xs font-semibold text-white hover:bg-[#5B0FB3]"
              >
                <Icon name="plus" size={12} />
                <span>Add Applicant</span>
              </button>
            </div>
          </div>

          {/* Applicants Table */}
          <div className="rounded-2xl border border-[#E5E7EB] bg-white shadow-2xs overflow-hidden">
            <div className="overflow-x-auto">
              <table className="w-full text-left text-xs">
                <thead>
                  <tr className="border-b border-[#E5E7EB] bg-[#F9FAFB] text-[#6B7280] font-semibold">
                    <th className="py-3 px-4 w-8">
                      <input type="checkbox" className="rounded" />
                    </th>
                    <th className="py-3 px-4">Name</th>
                    <th className="py-3 px-4">Email</th>
                    <th className="py-3 px-4">Job</th>
                    <th className="py-3 px-4">Stage</th>
                    <th className="py-3 px-4">Rating</th>
                    <th className="py-3 px-4">Source</th>
                    <th className="py-3 px-4 text-right">Actions</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-[#F3F4F6]">
                  {APPLICANTS_LIST.map((applicant) => (
                    <tr
                      key={applicant.id}
                      data-tl="row-applicant-alex"
                      className="hover:bg-gray-50 transition-colors"
                    >
                      <td className="py-3 px-4">
                        <input type="checkbox" className="rounded" />
                      </td>
                      <td className="py-3 px-4 font-semibold text-[#111827]">
                        <div className="flex items-center gap-2">
                          <span>{applicant.name}</span>
                          <span
                            data-tl="badge-applicant-new"
                            className="rounded bg-[#F3E8FF] px-1.5 py-0.5 text-[10px] font-semibold text-[#7014D9]"
                          >
                            New
                          </span>
                        </div>
                      </td>
                      <td className="py-3 px-4 text-[#4B5563]">
                        {applicant.email}
                      </td>
                      <td className="py-3 px-4 text-[#4B5563]">
                        {applicant.job}
                      </td>
                      <td className="py-3 px-4">
                        <div className="relative inline-block">
                          <button
                            type="button"
                            data-tl="select-applicant-status-hired"
                            onClick={() =>
                              tl.setVar(
                                "wfApplicantStageSelectOpen",
                                !applicantStageSelectOpen
                              )
                            }
                            className="inline-flex items-center gap-1.5 rounded-lg border border-emerald-300 bg-emerald-50 px-2.5 py-1 text-xs font-semibold text-emerald-800 hover:bg-emerald-100 transition-colors"
                          >
                            <span>Hired</span>
                            <Icon name="chevronDown" size={12} />
                          </button>
                          {applicantStageSelectOpen && (
                            <div
                              data-tl="dropdown-applicant-stages"
                              className="absolute left-0 top-8 z-30 w-36 rounded-xl border border-[#E5E7EB] bg-white py-1 shadow-lg text-xs"
                            >
                              {[
                                "Applied",
                                "Screening",
                                "Interview",
                                "Assessment",
                                "Offer",
                                "Hired",
                                "Rejected",
                              ].map((stg) => (
                                <div
                                  key={stg}
                                  onClick={() =>
                                    tl.setVar(
                                      "wfApplicantStageSelectOpen",
                                      false
                                    )
                                  }
                                  className="px-3 py-1.5 hover:bg-blue-50 hover:text-blue-700 cursor-pointer text-[#374151]"
                                >
                                  {stg}
                                </div>
                              ))}
                            </div>
                          )}
                        </div>
                      </td>
                      <td className="py-3 px-4 text-[#D1D5DB]">
                        <div className="flex items-center gap-0.5">
                          {[1, 2, 3, 4, 5].map((s) => (
                            <Icon key={s} name="star" size={13} />
                          ))}
                        </div>
                      </td>
                      <td className="py-3 px-4 text-[#4B5563] font-mono text-[11px]">
                        {applicant.source}
                      </td>
                      <td className="py-3 px-4 text-right">
                        <div className="relative inline-flex items-center gap-1 text-[#6B7280]">
                          <button
                            type="button"
                            data-tl="icon-applicant-doc"
                            className="p-1 hover:text-[#7014D9] rounded"
                            title="Document"
                          >
                            <Icon name="docFile" size={14} />
                          </button>
                          <button
                            type="button"
                            data-tl="btn-applicant-menu"
                            onClick={() =>
                              tl.setVar(
                                "wfApplicantMenuOpen",
                                !applicantMenuOpen
                              )
                            }
                            className="p-1 hover:text-[#111827] rounded"
                            title="Options"
                          >
                            <Icon name="moreHorizontal" size={14} />
                          </button>
                          {applicantMenuOpen && (
                            <div
                              data-tl="menu-applicant-actions"
                              className="absolute right-0 top-8 z-30 w-44 rounded-xl border border-[#E5E7EB] bg-white py-1 shadow-lg text-xs text-left"
                            >
                              <div
                                data-tl="menu-opt-view-details"
                                onClick={() => {
                                  tl.setVar("wfApplicantMenuOpen", false);
                                  tl.setVar(
                                    "wfApplicantDetailsPanelOpen",
                                    true
                                  );
                                }}
                                className="px-3 py-1.5 hover:bg-purple-50 hover:text-[#7014D9] cursor-pointer"
                              >
                                View details
                              </div>
                              <div
                                data-tl="menu-opt-archive"
                                onClick={() =>
                                  tl.setVar("wfApplicantMenuOpen", false)
                                }
                                className="px-3 py-1.5 hover:bg-purple-50 cursor-pointer"
                              >
                                Archive applicant
                              </div>
                              <div
                                data-tl="menu-opt-request-docs"
                                onClick={() => {
                                  tl.setVar("wfApplicantMenuOpen", false);
                                  tl.setVar("wfRequestDocsModalOpen", true);
                                }}
                                className="px-3 py-1.5 hover:bg-purple-50 hover:text-[#7014D9] cursor-pointer font-medium"
                              >
                                Request documents
                              </div>
                              <div
                                data-tl="menu-opt-send-email"
                                onClick={() =>
                                  tl.setVar("wfApplicantMenuOpen", false)
                                }
                                className="px-3 py-1.5 hover:bg-purple-50 cursor-pointer"
                              >
                                Send email
                              </div>
                              <div
                                data-tl="menu-opt-delete"
                                onClick={() =>
                                  tl.setVar("wfApplicantMenuOpen", false)
                                }
                                className="px-3 py-1.5 hover:bg-red-50 text-red-600 cursor-pointer border-t border-[#F3F4F6]"
                              >
                                Delete applicant
                              </div>
                            </div>
                          )}
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            {/* Pagination Footer */}
            <div className="flex items-center justify-between border-t border-[#E5E7EB] px-4 py-3 text-xs text-[#6B7280]">
              <span>Showing 1-1 of 1 applicants</span>
              <div className="flex items-center gap-2">
                <span>Applicants per page</span>
                <select className="rounded border border-[#D1D5DB] px-2 py-1 text-xs bg-white">
                  <option>20</option>
                </select>
              </div>
              <div className="flex items-center gap-3">
                <button
                  type="button"
                  disabled
                  className="opacity-50 cursor-not-allowed"
                >
                  Previous
                </button>
                <span>Page 1 of 1</span>
                <button
                  type="button"
                  disabled
                  className="opacity-50 cursor-not-allowed"
                >
                  Next
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Tab 4: Archives */}
      {activeTab === "archives" && (
        <div className="mt-6 flex flex-col gap-4">
          {archivesSubpage === "list" ? (
            <>
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                <div className="flex items-center gap-2">
                  <Icon name="archive" size={18} className="text-[#6B7280]" />
                  <h2 className="text-sm font-bold text-[#111827]">
                    Archived applicants by job
                  </h2>
                </div>
                <div className="flex items-center gap-2">
                  <span className="text-xs text-[#6B7280]">
                    Sort by posting date
                  </span>
                  <select className="h-8 rounded-lg border border-[#D1D5DB] bg-white px-3 text-xs text-[#374151]">
                    <option>Newest posted first</option>
                  </select>
                </div>
              </div>

              <div className="rounded-xl bg-[#F9FAFB] border border-[#E5E7EB] p-3 text-xs text-[#6B7280]">
                Applicants are grouped automatically by their original job
                posting. Unpublished jobs use their creation date for sorting.
              </div>

              {/* Archived Jobs Table */}
              <div className="rounded-2xl border border-[#E5E7EB] bg-white shadow-2xs overflow-hidden">
                <table className="w-full text-left text-xs">
                  <thead>
                    <tr className="border-b border-[#E5E7EB] bg-[#F9FAFB] text-[#6B7280] font-semibold">
                      <th className="py-3 px-4">Job posting</th>
                      <th className="py-3 px-4">Posted</th>
                      <th className="py-3 px-4">Applicants</th>
                      <th className="py-3 px-4 text-right">Actions</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-[#F3F4F6]">
                    {ARCHIVED_JOBS.map((job) => (
                      <tr
                        key={job.id}
                        className="hover:bg-gray-50 transition-colors"
                      >
                        <td className="py-3 px-4 font-semibold text-[#111827]">
                          <span
                            data-tl="link-archived-job"
                            className="text-[#7014D9] hover:underline cursor-pointer font-bold"
                          >
                            {job.title}
                          </span>
                          <div className="text-[10px] text-[#9CA3AF] font-normal">
                            Posting reference: {job.ref}
                          </div>
                        </td>
                        <td className="py-3 px-4 text-[#4B5563]">
                          {job.postedDate}
                        </td>
                        <td className="py-3 px-4 text-[#4B5563]">
                          {job.applicantsCount}
                        </td>
                        <td className="py-3 px-4 text-right">
                          <div className="inline-flex items-center gap-2">
                            <button
                              type="button"
                              data-tl="btn-view-archived-applicants"
                              onClick={() =>
                                tl.setVar("wfArchivesSubpage", "details")
                              }
                              className="rounded-lg bg-[#F3E8FF] px-3 py-1.5 text-xs font-semibold text-[#7014D9] hover:bg-purple-100 transition-colors"
                            >
                              View applicants
                            </button>
                            <button
                              type="button"
                              data-tl="btn-restore-job"
                              className="p-1 text-[#6B7280] hover:text-[#111827] rounded"
                              title="Restore"
                            >
                              <Icon name="refresh" size={14} />
                            </button>
                          </div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
                <div className="flex items-center justify-between border-t border-[#E5E7EB] px-4 py-3 text-xs text-[#6B7280]">
                  <button
                    type="button"
                    disabled
                    className="opacity-50 cursor-not-allowed"
                  >
                    Previous
                  </button>
                  <span>Page 1</span>
                  <button
                    type="button"
                    disabled
                    className="opacity-50 cursor-not-allowed"
                  >
                    Next
                  </button>
                </div>
              </div>
            </>
          ) : (
            <>
              {/* Archives Subpage (details) */}
              <div className="flex flex-col gap-3">
                <button
                  type="button"
                  data-tl="btn-back-archived-jobs"
                  onClick={() => tl.setVar("wfArchivesSubpage", "list")}
                  className="flex items-center gap-1.5 text-xs font-semibold text-[#7014D9] hover:underline w-fit"
                >
                  <Icon name="arrowLeft" size={14} />
                  <span>Back to archived jobs</span>
                </button>

                <div className="flex items-center justify-between">
                  <div>
                    <h2 className="text-base font-bold text-[#111827]">
                      SENIOR ENGINEER
                    </h2>
                    <p className="text-xs text-[#6B7280]">
                      Archived applicants for this job posting
                    </p>
                  </div>
                  <button
                    type="button"
                    data-tl="btn-restore-job-group"
                    className="rounded-lg border border-[#D1D5DB] px-3 py-1.5 text-xs font-medium text-[#374151] hover:bg-gray-50"
                  >
                    Restore job group
                  </button>
                </div>

                <div className="flex items-center justify-between text-xs text-[#6B7280] pt-2">
                  <span>1 applicant(s)</span>
                  <div className="flex items-center gap-2">
                    <select className="h-8 rounded-lg border border-[#D1D5DB] bg-white px-2 text-xs">
                      <option>All Stages</option>
                    </select>
                    <input
                      type="text"
                      placeholder="Search"
                      className="h-8 rounded-lg border border-[#D1D5DB] bg-white px-2 text-xs"
                    />
                  </div>
                </div>

                <div
                  data-tl="table-archived-applicants"
                  className="rounded-2xl border border-[#E5E7EB] bg-white shadow-2xs overflow-hidden"
                >
                  <table className="w-full text-left text-xs">
                    <thead>
                      <tr className="border-b border-[#E5E7EB] bg-[#F9FAFB] text-[#6B7280] font-semibold">
                        <th className="py-3 px-4">Name</th>
                        <th className="py-3 px-4">Stage</th>
                        <th className="py-3 px-4">Source</th>
                      </tr>
                    </thead>
                    <tbody>
                      <tr className="hover:bg-gray-50">
                        <td className="py-3 px-4 font-semibold text-[#111827]">
                          Alex Morgan
                        </td>
                        <td className="py-3 px-4">
                          <span
                            data-tl="select-archived-rejected"
                            className="inline-flex items-center px-2 py-0.5 rounded text-[11px] font-semibold bg-red-50 text-red-700 border border-red-200"
                          >
                            Rejected
                          </span>
                        </td>
                        <td className="py-3 px-4 text-[#4B5563] font-mono">
                          DIRECT
                        </td>
                      </tr>
                    </tbody>
                  </table>
                </div>
              </div>
            </>
          )}
        </div>
      )}

      {/* Tab 5: Interviews */}
      {activeTab === "interviews" && (
        <div className="mt-6 flex flex-col gap-4">
          <div className="flex items-center justify-between">
            <span className="text-xs text-[#6B7280] font-medium">
              0 interview(s)
            </span>
            <div className="flex items-center gap-2">
              <select className="h-8 rounded-lg border border-[#D1D5DB] bg-white px-3 text-xs text-[#374151]">
                <option>All Statuses</option>
              </select>
              <button
                type="button"
                data-tl="btn-schedule-interview"
                onClick={() => tl.setVar("wfScheduleInterviewModalOpen", true)}
                className="flex items-center gap-1.5 rounded-xl bg-[#7014D9] px-4 py-2 text-xs font-semibold text-white shadow-2xs hover:bg-[#5B0FB3] transition-colors"
              >
                <Icon name="plus" size={14} />
                <span>Schedule Interview</span>
              </button>
            </div>
          </div>

          <div
            data-tl="empty-interviews"
            className="rounded-2xl border border-[#E5E7EB] bg-white p-12 text-center text-xs text-[#6B7280] shadow-2xs flex flex-col items-center justify-center gap-2"
          >
            <Icon
              name="shCalendar"
              size={28}
              className="text-[#9CA3AF] opacity-60"
            />
            <p className="font-medium">No interviews found.</p>
          </div>
        </div>
      )}

      {/* MODAL 1: Create Job Modal (Step 79) */}
      {createJobModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 backdrop-blur-2xs p-4">
          <div
            data-tl="modal-create-job"
            data-scroller="modal-create-job"
            className="relative flex flex-col max-h-[85vh] w-full max-w-2xl rounded-2xl bg-white shadow-2xl overflow-y-auto"
          >
            <div className="sticky top-0 z-10 flex items-center justify-between border-b border-[#E5E7EB] bg-white px-6 py-4">
              <h2 className="text-base font-bold text-[#111827]">
                Create a Job Posting
              </h2>
              <button
                type="button"
                onClick={() => tl.setVar("wfCreateJobModalOpen", false)}
                className="text-[#6B7280] hover:text-[#111827]"
              >
                <Icon name="x" size={18} />
              </button>
            </div>

            <div className="p-6 flex flex-col gap-4 text-xs">
              {/* Department */}
              <div className="relative">
                <label className="block font-medium text-[#374151] mb-1">
                  Department *
                </label>
                <button
                  type="button"
                  data-tl="select-job-dept"
                  onClick={() =>
                    tl.setVar("wfJobDeptSelectOpen", !deptSelectOpen)
                  }
                  className="w-full h-9 rounded-lg border border-[#D1D5DB] px-3 bg-white flex items-center justify-between text-[#111827]"
                >
                  <span>{selectedDept || "Select department"}</span>
                  <Icon name="chevronDown" size={14} className="text-[#6B7280]" />
                </button>
                {deptSelectOpen && (
                  <div
                    data-tl="dropdown-job-dept"
                    className="absolute left-0 top-16 z-30 w-full rounded-xl border border-[#E5E7EB] bg-white py-1 shadow-lg"
                  >
                    <div className="px-3 py-2 hover:bg-gray-100 cursor-pointer text-[#6B7280]">
                      Select department
                    </div>
                    <div
                      data-tl="opt-dept-engineering"
                      onClick={() => {
                        tl.setVar("wfJobDept", "Engineering");
                        tl.setVar("wfJobDeptSelectOpen", false);
                      }}
                      className="px-3 py-2 hover:bg-blue-50 hover:text-blue-700 cursor-pointer text-[#111827] font-medium"
                    >
                      Engineering
                    </div>
                    <div
                      onClick={() => {
                        tl.setVar("wfJobDept", "Marketing");
                        tl.setVar("wfJobDeptSelectOpen", false);
                      }}
                      className="px-3 py-2 hover:bg-blue-50 hover:text-blue-700 cursor-pointer text-[#111827]"
                    >
                      Marketing
                    </div>
                  </div>
                )}
              </div>

              {/* Location & City */}
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block font-medium text-[#374151] mb-1">
                    Location *
                  </label>
                  <input
                    type="text"
                    data-tl="input-job-location"
                    placeholder="e.g. London, UK / Remote"
                    className="w-full h-9 rounded-lg border border-[#D1D5DB] px-3 focus:border-[#7014D9] focus:outline-none"
                  />
                </div>
                <div>
                  <label className="block font-medium text-[#374151] mb-1">
                    City / region
                  </label>
                  <input
                    type="text"
                    data-tl="input-job-city"
                    placeholder="London"
                    className="w-full h-9 rounded-lg border border-[#D1D5DB] px-3 focus:border-[#7014D9] focus:outline-none"
                  />
                </div>
              </div>

              {/* Country & Type */}
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block font-medium text-[#374151] mb-1">
                    Country
                  </label>
                  <select
                    data-tl="select-job-country"
                    className="w-full h-9 rounded-lg border border-[#D1D5DB] px-3 bg-white"
                  >
                    <option>Select country</option>
                    <option>United Kingdom</option>
                  </select>
                </div>
                <div>
                  <label className="block font-medium text-[#374151] mb-1">
                    Employment Type
                  </label>
                  <select
                    data-tl="select-job-type"
                    className="w-full h-9 rounded-lg border border-[#D1D5DB] px-3 bg-white"
                  >
                    <option>Full Time</option>
                    <option>Part Time</option>
                  </select>
                </div>
              </div>

              {/* Experience Level */}
              <div>
                <label className="block font-medium text-[#374151] mb-1">
                  Experience Level
                </label>
                <select
                  data-tl="select-job-exp"
                  className="w-full h-9 rounded-lg border border-[#D1D5DB] px-3 bg-white"
                >
                  <option>Mid Level</option>
                  <option>Senior Level</option>
                </select>
              </div>

              {/* Salary Fields */}
              <div
                data-tl="block-job-salary"
                className="rounded-xl border border-[#E5E7EB] bg-[#F9FAFB] p-3 flex flex-col gap-3"
              >
                <div className="font-semibold text-[#111827]">Compensation</div>
                <div className="grid grid-cols-3 gap-3">
                  <div>
                    <label className="block text-[#6B7280] mb-1">
                      Salary Min
                    </label>
                    <input
                      type="number"
                      data-tl="input-job-salary-min"
                      defaultValue={40000}
                      className="w-full h-9 rounded-lg border border-[#D1D5DB] px-3 bg-white focus:border-[#7014D9] focus:outline-none"
                    />
                  </div>
                  <div>
                    <label className="block text-[#6B7280] mb-1">
                      Salary Max
                    </label>
                    <input
                      type="number"
                      data-tl="input-job-salary-max"
                      defaultValue={60000}
                      className="w-full h-9 rounded-lg border border-[#D1D5DB] px-3 bg-white focus:border-[#7014D9] focus:outline-none"
                    />
                  </div>
                  <div>
                    <label className="block text-[#6B7280] mb-1">
                      Currency
                    </label>
                    <select
                      data-tl="select-job-currency"
                      className="w-full h-9 rounded-lg border border-[#D1D5DB] px-3 bg-white"
                    >
                      <option>GBP (£)</option>
                    </select>
                  </div>
                </div>
              </div>

              {/* Work Arrangement & Salary Period */}
              <div className="grid grid-cols-2 gap-4">
                <div className="relative">
                  <label className="block font-medium text-[#374151] mb-1">
                    Work arrangement
                  </label>
                  <button
                    type="button"
                    data-tl="select-job-arrangement"
                    onClick={() =>
                      tl.setVar(
                        "wfJobWorkArrangementSelectOpen",
                        !workArrangementSelectOpen
                      )
                    }
                    className="w-full h-9 rounded-lg border border-[#D1D5DB] px-3 bg-white flex items-center justify-between text-[#111827]"
                  >
                    <span>Hybrid</span>
                    <Icon name="chevronDown" size={14} className="text-[#6B7280]" />
                  </button>
                  {workArrangementSelectOpen && (
                    <div
                      data-tl="dropdown-job-arrangement"
                      className="absolute left-0 top-16 z-30 w-full rounded-xl border border-[#E5E7EB] bg-white py-1 shadow-lg"
                    >
                      <div
                        onClick={() =>
                          tl.setVar("wfJobWorkArrangementSelectOpen", false)
                        }
                        className="px-3 py-1.5 hover:bg-blue-50 cursor-pointer"
                      >
                        On-site
                      </div>
                      <div
                        data-tl="opt-arrangement-hybrid"
                        onClick={() =>
                          tl.setVar("wfJobWorkArrangementSelectOpen", false)
                        }
                        className="px-3 py-1.5 hover:bg-blue-50 text-blue-700 font-medium cursor-pointer"
                      >
                        Hybrid
                      </div>
                      <div
                        onClick={() =>
                          tl.setVar("wfJobWorkArrangementSelectOpen", false)
                        }
                        className="px-3 py-1.5 hover:bg-blue-50 cursor-pointer"
                      >
                        Remote
                      </div>
                    </div>
                  )}
                </div>

                <div className="relative">
                  <label className="block font-medium text-[#374151] mb-1">
                    Salary period
                  </label>
                  <button
                    type="button"
                    data-tl="select-job-period"
                    onClick={() =>
                      tl.setVar(
                        "wfJobSalaryPeriodSelectOpen",
                        !salaryPeriodSelectOpen
                      )
                    }
                    className="w-full h-9 rounded-lg border border-[#D1D5DB] px-3 bg-white flex items-center justify-between text-[#111827]"
                  >
                    <span>Per year</span>
                    <Icon name="chevronDown" size={14} className="text-[#6B7280]" />
                  </button>
                  {salaryPeriodSelectOpen && (
                    <div
                      data-tl="dropdown-job-period"
                      className="absolute left-0 top-16 z-30 w-full rounded-xl border border-[#E5E7EB] bg-white py-1 shadow-lg"
                    >
                      <div
                        onClick={() =>
                          tl.setVar("wfJobSalaryPeriodSelectOpen", false)
                        }
                        className="px-3 py-1.5 hover:bg-blue-50 cursor-pointer"
                      >
                        Per year
                      </div>
                      <div
                        onClick={() =>
                          tl.setVar("wfJobSalaryPeriodSelectOpen", false)
                        }
                        className="px-3 py-1.5 hover:bg-blue-50 cursor-pointer"
                      >
                        Per month
                      </div>
                      <div
                        onClick={() =>
                          tl.setVar("wfJobSalaryPeriodSelectOpen", false)
                        }
                        className="px-3 py-1.5 hover:bg-blue-50 cursor-pointer"
                      >
                        Per hour
                      </div>
                    </div>
                  )}
                </div>
              </div>

              {/* Closing date, Industry, Skills */}
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block font-medium text-[#374151] mb-1">
                    Closing date and time
                  </label>
                  <div className="relative">
                    <input
                      type="text"
                      data-tl="input-job-closing-date"
                      placeholder="30/11/2026 17:00"
                      className="w-full h-9 rounded-lg border border-[#D1D5DB] px-3 pr-8"
                    />
                    <Icon
                      name="shCalendar"
                      size={14}
                      className="absolute right-2.5 top-2.5 text-[#9CA3AF]"
                    />
                  </div>
                </div>
                <div>
                  <label className="block font-medium text-[#374151] mb-1">
                    Industry
                  </label>
                  <input
                    type="text"
                    data-tl="input-job-industry"
                    placeholder="Technology"
                    className="w-full h-9 rounded-lg border border-[#D1D5DB] px-3"
                  />
                </div>
              </div>

              <div>
                <label className="block font-medium text-[#374151] mb-1">
                  Skills
                </label>
                <input
                  type="text"
                  data-tl="input-job-skills"
                  placeholder="React, TypeScript, Node.js"
                  className="w-full h-9 rounded-lg border border-[#D1D5DB] px-3"
                />
              </div>
            </div>

            {/* Modal Footer */}
            <div className="sticky bottom-0 z-10 flex items-center justify-end gap-3 border-t border-[#E5E7EB] bg-white px-6 py-4">
              <button
                type="button"
                data-tl="btn-cancel-create-job"
                onClick={() => tl.setVar("wfCreateJobModalOpen", false)}
                className="rounded-lg border border-[#D1D5DB] px-4 py-2 text-xs font-semibold text-[#374151] hover:bg-gray-50"
              >
                Cancel
              </button>
              <button
                type="button"
                data-tl="btn-submit-create-job"
                className="rounded-lg bg-[#7014D9] px-4 py-2 text-xs font-semibold text-white shadow-2xs hover:bg-[#5B0FB3]"
              >
                Create Job
              </button>
            </div>
          </div>
        </div>
      )}

      {/* MODAL 2: Request Documents Modal (Step 82) */}
      {requestDocsModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 backdrop-blur-2xs p-4">
          <div
            data-tl="modal-request-docs"
            className="relative flex flex-col w-full max-w-lg rounded-2xl bg-white shadow-2xl overflow-hidden"
          >
            <div className="flex items-center justify-between border-b border-[#E5E7EB] px-6 py-4">
              <h2 className="text-base font-bold text-[#111827]">
                Request documents
              </h2>
              <button
                type="button"
                data-tl="btn-close-request-docs"
                onClick={() => tl.setVar("wfRequestDocsModalOpen", false)}
                className="text-[#6B7280] hover:text-[#111827]"
              >
                <Icon name="x" size={18} />
              </button>
            </div>

            <div className="p-6 flex flex-col gap-4 text-xs">
              <p className="text-[#6B7280]">
                Request documents from 1 applicant(s). Each receives a private
                upload link; no account is required.
              </p>

              <div>
                <label className="block font-medium text-[#374151] mb-1">
                  Document 1
                </label>
                <select
                  data-tl="select-request-doc-type"
                  className="w-full h-9 rounded-lg border border-[#7014D9] px-3 bg-white focus:outline-none focus:ring-1 focus:ring-[#7014D9]"
                >
                  <option>CV / Resume</option>
                  <option>Passport / ID</option>
                  <option>Degree Certificate</option>
                </select>
              </div>

              <div>
                <label className="block font-medium text-[#374151] mb-1">
                  Allowed file types
                </label>
                <div className="grid grid-cols-4 gap-2 pt-1">
                  {[
                    "PDF",
                    "DOC",
                    "DOCX",
                    "CSV",
                    "TXT",
                    "JPG",
                    "JPEG",
                    "PNG",
                    "XLS",
                    "XLSX",
                  ].map((ext) => (
                    <label
                      key={ext}
                      className="flex items-center gap-1.5 cursor-pointer text-[#4B5563]"
                    >
                      <input
                        type="checkbox"
                        data-tl={
                          ext === "DOCX" ? "checkbox-filetype-docx" : undefined
                        }
                        checked={
                          ext === "PDF" ||
                          (ext === "DOCX" && requestDocsDocxChecked)
                        }
                        onChange={(e) => {
                          if (ext === "DOCX") {
                            tl.setVar(
                              "wfRequestDocsDocxChecked",
                              e.target.checked
                            );
                          }
                        }}
                        className="rounded"
                      />
                      <span>{ext}</span>
                    </label>
                  ))}
                </div>
                <button
                  type="button"
                  className="mt-2 text-[#7014D9] font-medium hover:underline inline-block"
                >
                  + Add document
                </button>
              </div>

              <div>
                <label className="block font-medium text-[#374151] mb-1">
                  Instructions (optional)
                </label>
                <textarea
                  data-tl="textarea-request-instructions"
                  rows={2}
                  value={requestDocsInstructions}
                  onChange={(e) =>
                    tl.setVar("wfRequestDocsInstructions", e.target.value)
                  }
                  placeholder="Type your own request instructions..."
                  className="w-full rounded-lg border border-[#D1D5DB] p-2.5 focus:border-[#7014D9] focus:outline-none"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block font-medium text-[#374151] mb-1">
                    Link expires in days
                  </label>
                  <input
                    type="number"
                    data-tl="input-request-expiry"
                    defaultValue={14}
                    className="w-full h-9 rounded-lg border border-[#D1D5DB] px-3"
                  />
                </div>
                <div>
                  <label className="block font-medium text-[#374151] mb-1">
                    Email template
                  </label>
                  <select
                    data-tl="select-request-template"
                    className="w-full h-9 rounded-lg border border-[#D1D5DB] px-3 bg-white"
                  >
                    <option>Automatic template / standard email</option>
                  </select>
                </div>
              </div>
            </div>

            <div
              data-tl="footer-request-docs"
              className="flex items-center justify-end gap-3 border-t border-[#E5E7EB] px-6 py-4"
            >
              <button
                type="button"
                data-tl="btn-cancel-request-docs"
                onClick={() => tl.setVar("wfRequestDocsModalOpen", false)}
                className="rounded-lg border border-[#D1D5DB] px-4 py-2 text-xs font-semibold text-[#374151] hover:bg-gray-50"
              >
                Cancel
              </button>
              <button
                type="button"
                data-tl="btn-submit-request-docs"
                className="rounded-lg bg-[#7014D9] px-4 py-2 text-xs font-semibold text-white shadow-2xs hover:bg-[#5B0FB3]"
              >
                Send request
              </button>
            </div>
          </div>
        </div>
      )}

      {/* PANEL 3: Applicant Details Side Panel (Step 83) */}
      {applicantDetailsPanelOpen && (
        <div className="fixed inset-0 z-50 flex justify-end">
          {/* Dimmed backdrop */}
          <div
            data-tl="backdrop-applicant-details"
            onClick={() => tl.setVar("wfApplicantDetailsPanelOpen", false)}
            className="fixed inset-0 bg-black/40 backdrop-blur-2xs transition-opacity"
          />

          {/* Panel */}
          <div
            data-tl="panel-applicant-details"
            data-scroller="panel-applicant-details"
            className="relative z-10 flex h-full w-full max-w-md flex-col bg-white shadow-2xl overflow-y-auto text-xs"
          >
            <div className="sticky top-0 z-10 flex items-center justify-between border-b border-[#E5E7EB] bg-white px-6 py-4">
              <div>
                <h2 className="text-base font-bold text-[#111827]">
                  Alex Morgan
                </h2>
                <p className="text-xs text-[#6B7280]">
                  Software Engineer (Platform)
                </p>
              </div>
              <button
                type="button"
                data-tl="btn-close-applicant-details"
                onClick={() => tl.setVar("wfApplicantDetailsPanelOpen", false)}
                className="text-[#6B7280] hover:text-[#111827]"
              >
                <Icon name="x" size={18} />
              </button>
            </div>

            <div className="p-6 flex flex-col gap-5">
              {/* Rating and Source cards */}
              <div className="grid grid-cols-2 gap-3">
                <div className="rounded-xl border border-[#E5E7EB] p-3 bg-[#F9FAFB]">
                  <span className="text-[11px] text-[#6B7280] block">
                    Rating
                  </span>
                  <span className="font-semibold text-[#111827]">Unrated</span>
                </div>
                <div className="rounded-xl border border-[#E5E7EB] p-3 bg-[#F9FAFB]">
                  <span className="text-[11px] text-[#6B7280] block">
                    Source
                  </span>
                  <span className="font-semibold text-[#111827]">DIRECT</span>
                </div>
              </div>

              <div className="text-[11px] text-[#6B7280]">
                Applied 29/10/2026, 12:50:13 PM
              </div>

              {/* Automatic Stage Emails */}
              <div
                data-tl="section-stage-emails"
                className="flex flex-col gap-2.5 pt-2 border-t border-[#E5E7EB]"
              >
                <h3 className="font-bold text-[#111827]">
                  Automatic stage emails
                </h3>
                <p className="text-[11px] text-[#6B7280] leading-relaxed">
                  Emails are applied only when the stage changes and a matching
                  template has automatic sending enabled and saved. Sent means
                  accepted by the email provider; it does not confirm inbox
                  delivery.
                </p>

                <div className="flex flex-col gap-2 mt-1">
                  <div className="rounded-xl border border-red-200 bg-red-50/50 p-3">
                    <div className="flex items-center justify-between mb-1">
                      <span className="font-bold text-[#111827]">HIRED</span>
                      <span
                        data-tl="badge-email-failed"
                        className="rounded bg-red-100 px-1.5 py-0.5 text-[10px] font-semibold text-red-700"
                      >
                        Failed
                      </span>
                    </div>
                    <div className="text-[10px] text-[#6B7280]">
                      29/10/2026, 9:03:40 AM
                    </div>
                    <p className="text-[11px] text-red-600 mt-1">
                      Email could not be sent. Check the email configuration and
                      recipient address before retrying.
                    </p>
                  </div>

                  <div className="rounded-xl border border-red-200 bg-red-50/50 p-3">
                    <div className="flex items-center justify-between mb-1">
                      <span className="font-bold text-[#111827]">
                        ASSESSMENT
                      </span>
                      <span className="rounded bg-red-100 px-1.5 py-0.5 text-[10px] font-semibold text-red-700">
                        Failed
                      </span>
                    </div>
                    <div className="text-[10px] text-[#6B7280]">
                      29/10/2026, 9:01:12 AM
                    </div>
                    <p className="text-[11px] text-red-600 mt-1">
                      Could not connect to the email provider. Ask an
                      administrator to check SMTP connectivity.
                    </p>
                  </div>

                  <div className="rounded-xl border border-red-200 bg-red-50/50 p-3">
                    <div className="flex items-center justify-between mb-1">
                      <span className="font-bold text-[#111827]">
                        INTERVIEW
                      </span>
                      <span className="rounded bg-red-100 px-1.5 py-0.5 text-[10px] font-semibold text-red-700">
                        Failed
                      </span>
                    </div>
                    <div className="text-[10px] text-[#6B7280]">
                      29/10/2026, 8:58:30 AM
                    </div>
                    <p className="text-[11px] text-red-600 mt-1">
                      Could not connect to the email provider. Ask an
                      administrator to check SMTP connectivity.
                    </p>
                  </div>
                </div>
              </div>

              {/* Documents Section */}
              <div
                data-tl="section-applicant-docs"
                className="flex flex-col gap-2.5 pt-3 border-t border-[#E5E7EB]"
              >
                <div className="flex items-center justify-between">
                  <h3 className="font-bold text-[#111827]">Documents</h3>
                  <button
                    type="button"
                    className="text-[#7014D9] font-medium hover:underline text-[11px]"
                  >
                    Request documents
                  </button>
                </div>

                <div className="flex items-center justify-between rounded-xl border border-[#E5E7EB] p-3 bg-white">
                  <div className="flex items-center gap-2">
                    <Icon name="docFile" size={16} className="text-[#6B7280]" />
                    <span className="font-medium text-[#111827]">
                      Resume / CV
                    </span>
                  </div>
                  <button
                    type="button"
                    className="text-[#7014D9] font-semibold hover:underline"
                  >
                    View / Download
                  </button>
                </div>
                <div className="text-[11px] text-[#9CA3AF]">
                  No additional documents requested.
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* MODAL 4: Schedule Interview Modal (Step 85) */}
      {scheduleInterviewModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 backdrop-blur-2xs p-4">
          <div
            data-tl="modal-schedule-interview"
            data-scroller="modal-schedule-interview"
            className="relative flex flex-col max-h-[85vh] w-full max-w-lg rounded-2xl bg-white shadow-2xl overflow-y-auto text-xs"
          >
            <div className="sticky top-0 z-10 flex items-center justify-between border-b border-[#E5E7EB] bg-white px-6 py-4">
              <h2 className="text-base font-bold text-[#111827]">
                Schedule Interview
              </h2>
              <button
                type="button"
                onClick={() => tl.setVar("wfScheduleInterviewModalOpen", false)}
                className="text-[#6B7280] hover:text-[#111827]"
              >
                <Icon name="x" size={18} />
              </button>
            </div>

            <div className="p-6 flex flex-col gap-4">
              {/* Applicant */}
              <div className="relative">
                <label className="block font-medium text-[#374151] mb-1">
                  Applicant *
                </label>
                <input
                  type="text"
                  data-tl="input-search-candidate"
                  placeholder="Search candidates by name"
                  onClick={() =>
                    tl.setVar(
                      "wfInterviewCandidateSelectOpen",
                      !interviewCandidateSelectOpen
                    )
                  }
                  className="w-full h-9 rounded-lg border border-[#D1D5DB] px-3 focus:border-[#7014D9] focus:outline-none"
                />
                {interviewCandidateSelectOpen && (
                  <div className="absolute left-0 top-16 z-30 w-full rounded-xl border border-[#E5E7EB] bg-white py-1 shadow-lg">
                    <div
                      data-tl="opt-candidate-alex"
                      onClick={() => {
                        tl.setVar("wfInterviewCandidateSelected", true);
                        tl.setVar("wfInterviewCandidateSelectOpen", false);
                      }}
                      className="px-3 py-2 hover:bg-purple-50 hover:text-[#7014D9] cursor-pointer"
                    >
                      Alex Morgan (alex.morgan@snaarp.com)
                    </div>
                  </div>
                )}
                {interviewCandidateSelected && (
                  <div
                    data-tl="chip-selected-candidate"
                    className="mt-2 flex items-center justify-between rounded-lg bg-[#F3E8FF] px-3 py-1.5 text-xs text-[#7014D9]"
                  >
                    <span>
                      Selected: Alex Morgan (alex.morgan@snaarp.com) / Software
                      Engineer (Platform)
                    </span>
                    <button
                      type="button"
                      onClick={() =>
                        tl.setVar("wfInterviewCandidateSelected", false)
                      }
                      className="text-[#7014D9] font-bold ml-2"
                    >
                      Clear
                    </button>
                  </div>
                )}
              </div>

              {/* Job Posting */}
              <div>
                <label className="block font-medium text-[#374151] mb-1">
                  Job Posting *
                </label>
                <select
                  data-tl="select-interview-job"
                  className="w-full h-9 rounded-lg border border-[#D1D5DB] px-3 bg-white"
                >
                  <option>Software Engineer (Platform)</option>
                </select>
              </div>

              {/* Interviewers */}
              <div className="relative">
                <label className="block font-medium text-[#374151] mb-1">
                  Interviewers *
                </label>
                <button
                  type="button"
                  data-tl="input-search-interviewers"
                  onClick={() =>
                    tl.setVar(
                      "wfInterviewersSelectOpen",
                      !interviewersSelectOpen
                    )
                  }
                  className="w-full h-9 rounded-lg border border-[#D1D5DB] px-3 bg-white flex items-center justify-between text-[#111827]"
                >
                  <span>
                    {interviewersSelected.length > 0
                      ? `${interviewersSelected.length} selected`
                      : "Search interviewers"}
                  </span>
                  <Icon name="chevronDown" size={14} className="text-[#6B7280]" />
                </button>
                {interviewersSelectOpen && (
                  <div className="absolute left-0 top-16 z-30 w-full rounded-xl border border-[#E5E7EB] bg-white py-1 shadow-lg">
                    <div
                      data-tl="opt-interviewer-alex"
                      onClick={() => {
                        const next = interviewersSelected.includes(
                          "Alex Morgan"
                        )
                          ? interviewersSelected.filter(
                              (i) => i !== "Alex Morgan"
                            )
                          : [...interviewersSelected, "Alex Morgan"];
                        tl.setVar("wfInterviewersSelected", next);
                      }}
                      className="flex items-center justify-between px-3 py-2 hover:bg-purple-50 cursor-pointer"
                    >
                      <span>Alex Morgan</span>
                      {interviewersSelected.includes("Alex Morgan") && (
                        <span className="text-[10px] font-semibold text-[#7014D9]">
                          Selected
                        </span>
                      )}
                    </div>
                    <div
                      data-tl="opt-interviewer-jordan"
                      onClick={() => {
                        const next = interviewersSelected.includes(
                          "Jordan Lee"
                        )
                          ? interviewersSelected.filter(
                              (i) => i !== "Jordan Lee"
                            )
                          : [...interviewersSelected, "Jordan Lee"];
                        tl.setVar("wfInterviewersSelected", next);
                      }}
                      className="flex items-center justify-between px-3 py-2 hover:bg-purple-50 cursor-pointer"
                    >
                      <span>Jordan Lee</span>
                      {interviewersSelected.includes("Jordan Lee") && (
                        <span className="text-[10px] font-semibold text-[#7014D9]">
                          Selected
                        </span>
                      )}
                    </div>
                  </div>
                )}
                {interviewersSelected.length > 0 && (
                  <div
                    data-tl="chips-interviewers"
                    className="mt-2 flex flex-wrap gap-1.5"
                  >
                    {interviewersSelected.map((inv) => (
                      <span
                        key={inv}
                        className="inline-flex items-center gap-1 rounded-md bg-[#F3E8FF] px-2 py-0.5 text-[11px] font-medium text-[#7014D9]"
                      >
                        {inv}
                        <button
                          type="button"
                          onClick={() => {
                            tl.setVar(
                              "wfInterviewersSelected",
                              interviewersSelected.filter((i) => i !== inv)
                            );
                          }}
                        >
                          ×
                        </button>
                      </span>
                    ))}
                  </div>
                )}
              </div>

              {/* Interview Type */}
              <div className="relative">
                <label className="block font-medium text-[#374151] mb-1">
                  Interview Type
                </label>
                <button
                  type="button"
                  data-tl="select-interview-type"
                  onClick={() =>
                    tl.setVar(
                      "wfInterviewTypeSelectOpen",
                      !interviewTypeSelectOpen
                    )
                  }
                  className="w-full h-9 rounded-lg border border-[#D1D5DB] px-3 bg-white flex items-center justify-between text-[#111827]"
                >
                  <span>Video Call</span>
                  <Icon name="chevronDown" size={14} className="text-[#6B7280]" />
                </button>
                {interviewTypeSelectOpen && (
                  <div
                    data-tl="dropdown-interview-types"
                    className="absolute left-0 top-16 z-30 w-full rounded-xl border border-[#E5E7EB] bg-white py-1 shadow-lg"
                  >
                    {["Phone", "Video Call", "In Person", "Technical", "Panel"].map(
                      (type) => (
                        <div
                          key={type}
                          data-tl={type === "Video Call" ? "opt-type-video" : undefined}
                          onClick={() =>
                            tl.setVar("wfInterviewTypeSelectOpen", false)
                          }
                          className="px-3 py-1.5 hover:bg-blue-50 hover:text-blue-700 cursor-pointer text-[#374151]"
                        >
                          {type}
                        </div>
                      )
                    )}
                  </div>
                )}
              </div>

              {/* Date & Time, Duration */}
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block font-medium text-[#374151] mb-1">
                    Date & Time *
                  </label>
                  <input
                    type="text"
                    data-tl="input-interview-datetime"
                    placeholder="dd/mm/yyyy --:-- --"
                    className="w-full h-9 rounded-lg border border-[#D1D5DB] px-3"
                  />
                </div>
                <div>
                  <label className="block font-medium text-[#374151] mb-1">
                    Duration (minutes)
                  </label>
                  <input
                    type="number"
                    data-tl="input-interview-duration"
                    defaultValue={60}
                    className="w-full h-9 rounded-lg border border-[#D1D5DB] px-3 focus:border-[#7014D9] focus:ring-1 focus:ring-[#7014D9] focus:outline-none"
                  />
                </div>
              </div>

              {/* Location / Meeting link */}
              <div>
                <label className="block font-medium text-[#374151] mb-1">
                  Location / Meeting Link
                </label>
                <input
                  type="text"
                  data-tl="input-interview-location"
                  placeholder="Meeting Room A / https://meet.snaarp.com/"
                  className="w-full h-9 rounded-lg border border-[#D1D5DB] px-3"
                />
              </div>
            </div>

            {/* Modal Footer */}
            <div className="sticky bottom-0 z-10 flex items-center justify-end gap-3 border-t border-[#E5E7EB] bg-white px-6 py-4">
              <button
                type="button"
                data-tl="btn-cancel-schedule-interview"
                onClick={() => tl.setVar("wfScheduleInterviewModalOpen", false)}
                className="rounded-lg border border-[#D1D5DB] px-4 py-2 text-xs font-semibold text-[#374151] hover:bg-gray-50"
              >
                Cancel
              </button>
              <button
                type="button"
                data-tl="btn-submit-schedule-interview"
                className="rounded-lg bg-[#7014D9] px-4 py-2 text-xs font-semibold text-white shadow-2xs hover:bg-[#5B0FB3]"
              >
                Schedule Interview
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
