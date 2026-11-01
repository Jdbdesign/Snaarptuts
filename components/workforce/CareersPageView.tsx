"use client";

import { Icon, ProductLogo } from "@/components/icons";
import type { Timeline } from "@/lib/timeline";
import { useTimelineVar } from "@/lib/useTimelineVar";
import { CAREERS_JOB, URLS } from "./workforce-data";

type Props = {
  tl: Timeline;
};

export function CareersPageView({ tl }: Props) {
  const isDetailOpen = useTimelineVar(tl, "wfCareersDetailOpen", false);

  return (
    <div
      data-scroller="careers-public-page"
      className="flex-1 overflow-y-auto bg-[#F9FAFB] text-[#111827] font-['Poppins',sans-serif] min-h-full"
    >
      {/* Top Banner / Navigation with "Back to the app" chip */}
      <div className="sticky top-0 z-20 border-b border-[#E5E7EB] bg-white px-6 py-3 shadow-2xs flex items-center justify-between">
        <button
          type="button"
          data-tl="chip-back-to-app"
          onClick={() => {
            tl.setVar("wfPage", "recruitment");
            tl.setVar("wfRecruitmentTab", "job-postings");
            tl.setUrl(URLS.recruitment);
          }}
          className="flex items-center gap-2 rounded-full bg-[#F3E8FF] px-3.5 py-1.5 text-xs font-semibold text-[#7014D9] hover:bg-[#E9D5FF] transition-colors shadow-2xs"
        >
          <Icon name="arrowLeft" size={14} />
          <span>Back to the app</span>
        </button>

        <div className="flex items-center gap-2">
          <ProductLogo name="workforce" size={24} className="rounded-md" />
          <span className="text-xs font-semibold text-[#6B7280]">
            Acme Ltd Careers
          </span>
        </div>
      </div>

      <div className="mx-auto max-w-4xl p-6 sm:p-8">
        {!isDetailOpen ? (
          /* List of Open Positions */
          <div className="flex flex-col gap-6">
            <div className="text-center py-6">
              <div className="flex items-center justify-center gap-2 mb-2">
                <ProductLogo name="workforce" size={36} className="rounded-xl shadow-2xs" />
                <h1 className="text-2xl font-bold tracking-tight text-[#111827]">
                  Workforce
                </h1>
              </div>
              <p className="text-sm text-[#4B5563]">Acme Ltd - Open positions</p>
            </div>

            {/* Search */}
            <div className="relative max-w-xl mx-auto w-full">
              <input
                type="text"
                data-tl="input-search-careers"
                placeholder="Search jobs by title, department, or location..."
                className="h-11 w-full rounded-xl border border-[#D1D5DB] bg-white pl-10 pr-4 text-xs shadow-2xs focus:border-[#7014D9] focus:outline-none"
              />
              <Icon
                name="search"
                size={16}
                className="absolute left-3.5 top-3.5 text-[#9CA3AF]"
              />
            </div>

            <div className="flex items-center justify-between text-xs text-[#6B7280] pt-4">
              <span className="font-medium">1 open position</span>
            </div>

            {/* Job Card */}
            <div
              data-tl="card-careers-job"
              className="rounded-2xl border border-[#E5E7EB] bg-white p-6 shadow-2xs flex flex-col md:flex-row md:items-center justify-between gap-4 hover:border-[#7014D9]/40 transition-colors"
            >
              <div className="flex flex-col gap-2">
                <h2 className="text-base font-bold text-[#111827]">
                  {CAREERS_JOB.title}
                </h2>
                <div className="flex flex-wrap items-center gap-2">
                  <span className="rounded-md bg-purple-50 px-2 py-0.5 text-[11px] font-semibold text-[#7014D9]">
                    {CAREERS_JOB.department}
                  </span>
                  <span className="rounded-md bg-gray-100 px-2 py-0.5 text-[11px] font-medium text-[#4B5563]">
                    {CAREERS_JOB.location}
                  </span>
                  <span className="rounded-md bg-gray-100 px-2 py-0.5 text-[11px] font-medium text-[#4B5563] uppercase">
                    {CAREERS_JOB.type}
                  </span>
                  <span className="rounded-md bg-gray-100 px-2 py-0.5 text-[11px] font-medium text-[#4B5563]">
                    {CAREERS_JOB.level}
                  </span>
                </div>
                <div className="text-xs font-semibold text-[#111827] mt-1">
                  {CAREERS_JOB.salary}
                </div>
              </div>

              <button
                type="button"
                data-tl="btn-view-careers-job"
                onClick={() => tl.setVar("wfCareersDetailOpen", true)}
                className="rounded-xl bg-[#7014D9] px-5 py-2.5 text-xs font-semibold text-white shadow-2xs hover:bg-[#5B0FB3] transition-colors self-start md:self-auto cursor-pointer"
              >
                View
              </button>
            </div>
          </div>
        ) : (
          /* Job Detail and Application Form */
          <div className="flex flex-col gap-6">
            <button
              type="button"
              data-tl="btn-back-careers-list"
              onClick={() => tl.setVar("wfCareersDetailOpen", false)}
              className="flex items-center gap-1.5 text-xs font-semibold text-[#7014D9] hover:underline w-fit"
            >
              <Icon name="arrowLeft" size={14} />
              <span>Back to all jobs</span>
            </button>

            <div className="flex flex-col gap-2">
              <h1 className="text-2xl font-bold tracking-tight text-[#111827]">
                {CAREERS_JOB.title}
              </h1>
              <div className="flex flex-wrap items-center gap-2">
                <span className="rounded-md bg-purple-50 px-2 py-0.5 text-[11px] font-semibold text-[#7014D9]">
                  {CAREERS_JOB.department}
                </span>
                <span className="rounded-md bg-gray-100 px-2 py-0.5 text-[11px] font-medium text-[#4B5563]">
                  {CAREERS_JOB.location}
                </span>
                <span className="rounded-md bg-gray-100 px-2 py-0.5 text-[11px] font-medium text-[#4B5563] uppercase">
                  {CAREERS_JOB.type}
                </span>
                <span className="rounded-md bg-gray-100 px-2 py-0.5 text-[11px] font-medium text-[#4B5563]">
                  {CAREERS_JOB.level}
                </span>
                <span className="text-xs font-semibold text-[#111827] ml-2">
                  {CAREERS_JOB.salary}
                </span>
              </div>
            </div>

            {/* Description */}
            <div
              data-tl="section-careers-description"
              className="rounded-2xl border border-[#E5E7EB] bg-white p-6 shadow-2xs flex flex-col gap-3"
            >
              <h2 className="text-xs font-bold uppercase tracking-wider text-[#6B7280]">
                JOB DESCRIPTION
              </h2>
              <p className="text-xs text-[#374151] leading-relaxed">
                {CAREERS_JOB.description}
              </p>
            </div>

            {/* Apply Form */}
            <div
              data-tl="form-careers-apply"
              className="rounded-2xl border border-[#E5E7EB] bg-white p-6 shadow-2xs flex flex-col gap-4 text-xs"
            >
              <h2 className="text-sm font-bold text-[#111827]">
                Apply for this position
              </h2>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block font-medium text-[#374151] mb-1">
                    First Name *
                  </label>
                  <input
                    type="text"
                    data-tl="input-apply-firstname"
                    defaultValue="John"
                    className="w-full h-9 rounded-lg border border-[#D1D5DB] px-3 focus:border-[#7014D9] focus:outline-none"
                  />
                </div>
                <div>
                  <label className="block font-medium text-[#374151] mb-1">
                    Last Name *
                  </label>
                  <input
                    type="text"
                    data-tl="input-apply-lastname"
                    defaultValue="Doe"
                    className="w-full h-9 rounded-lg border border-[#D1D5DB] px-3 focus:border-[#7014D9] focus:outline-none"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block font-medium text-[#374151] mb-1">
                    Email *
                  </label>
                  <input
                    type="email"
                    data-tl="input-apply-email"
                    defaultValue="john.doe@example.com"
                    className="w-full h-9 rounded-lg border border-[#7014D9] px-3 focus:border-[#7014D9] focus:ring-1 focus:ring-[#7014D9] focus:outline-none"
                  />
                </div>
                <div>
                  <label className="block font-medium text-[#374151] mb-1">
                    Phone
                  </label>
                  <input
                    type="tel"
                    data-tl="input-apply-phone"
                    placeholder="+44 7700 900123"
                    className="w-full h-9 rounded-lg border border-[#D1D5DB] px-3 focus:border-[#7014D9] focus:outline-none"
                  />
                </div>
              </div>

              <div>
                <label className="block font-medium text-[#374151] mb-1">
                  Resume / CV
                </label>
                <div
                  data-tl="file-apply-resume"
                  className="flex items-center gap-3 rounded-lg border border-[#D1D5DB] p-2 bg-[#F9FAFB]"
                >
                  <button
                    type="button"
                    className="rounded border border-[#D1D5DB] bg-white px-2.5 py-1 text-xs font-medium text-[#374151] hover:bg-gray-50"
                  >
                    Choose File
                  </button>
                  <span className="text-xs text-[#6B7280]">No file chosen</span>
                  <span className="ml-auto text-[11px] text-[#9CA3AF]">
                    PDF, DOC or DOCX (max 10MB)
                  </span>
                </div>
              </div>

              <div>
                <label className="block font-medium text-[#374151] mb-1">
                  Cover Letter
                </label>
                <textarea
                  data-tl="textarea-apply-cover-letter"
                  rows={3}
                  placeholder="Tell us why you're a great fit for this role..."
                  className="w-full rounded-lg border border-[#D1D5DB] p-2.5 focus:border-[#7014D9] focus:outline-none"
                />
              </div>

              <div className="flex items-center justify-end gap-3 pt-2 border-t border-[#E5E7EB]">
                <button
                  type="button"
                  data-tl="btn-cancel-careers-app"
                  onClick={() => tl.setVar("wfCareersDetailOpen", false)}
                  className="rounded-lg border border-[#D1D5DB] px-4 py-2 text-xs font-semibold text-[#374151] hover:bg-gray-50"
                >
                  Cancel
                </button>
                <button
                  type="button"
                  data-tl="btn-submit-careers-app"
                  className="rounded-lg bg-[#7014D9] px-4 py-2 text-xs font-semibold text-white shadow-2xs hover:bg-[#5B0FB3]"
                >
                  Submit Application
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
