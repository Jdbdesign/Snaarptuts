"use client";

import { Icon } from "@/components/icons";
import type { Timeline } from "@/lib/timeline";

type Props = {
  tl: Timeline;
  onBack?: () => void;
};

export function AdminReviewDetailView({ onBack }: Props) {
  const selfQuestions = [
    { q: "Does the employee proactively identify and solve problems?", a: "2" },
    { q: "How effectively does the employee use available tools and resources?", a: "5" },
    { q: "How well does the employee communicate with colleagues?", a: "3" },
    { q: "How effectively does the employee collaborate with colleagues?", a: "4" },
    { q: "How would you rate the quality and accuracy of the employee's work?", a: "4" },
    { q: "Does the employee actively seek and apply feedback?", a: "3" },
    { q: "How effectively did the employee manage workload and priorities?", a: "3" },
  ];

  const managerQuestions = [
    { q: "Did the employee complete assigned tasks within agreed deadlines?", a: "4" },
    { q: "Does the employee demonstrate the company's core values?", a: "4" },
    { q: "Does the employee suggest improvements to existing processes?", a: "3" },
    { q: "Has the employee demonstrated measurable improvement?", a: "4" },
  ];

  return (
    <div data-scroller className="flex flex-col gap-5 max-w-4xl mx-auto pb-24">
      {/* Top Header Card */}
      <div className="flex items-center justify-between p-5 rounded-2xl border border-[#E5E7EB] bg-white shadow-2xs">
        <div className="flex items-center gap-3">
          <button
            type="button"
            data-tl="btn-review-back"
            onClick={onBack}
            className="flex h-8 w-8 items-center justify-center rounded-lg border border-[#E5E7EB] bg-white text-[#4B5563] hover:bg-gray-50 transition-colors shadow-2xs"
          >
            <Icon name="arrowLeft" size={16} />
          </button>
          <div>
            <div className="flex items-center gap-2">
              <h1 className="text-lg font-bold text-[#111827]">2026 Appraisals</h1>
              <span className="px-2 py-0.5 rounded-full text-[10px] font-bold bg-emerald-50 text-emerald-700 border border-emerald-200">
                COMPLETED stage
              </span>
            </div>
            <p className="text-xs text-[#6B7280] mt-0.5">Alex Morgan · Engineering</p>
          </div>
        </div>

        <div className="flex items-center gap-2">
          <button
            type="button"
            data-tl="btn-back-to-reviews"
            onClick={onBack}
            className="px-3 py-1.5 rounded-xl border border-[#D1D5DB] text-xs font-semibold text-[#4B5563] hover:bg-gray-50 transition-colors"
          >
            Back to reviews
          </button>
          <button
            type="button"
            data-tl="btn-upload-result"
            className="px-3 py-1.5 rounded-xl border border-[#D1D5DB] text-xs font-semibold text-[#4B5563] hover:bg-gray-50 transition-colors"
          >
            Upload result
          </button>
          <button
            type="button"
            data-tl="btn-reopen-correction"
            className="px-3 py-1.5 rounded-xl border border-[#D1D5DB] text-xs font-semibold text-[#4B5563] hover:bg-gray-50 transition-colors"
          >
            Reopen for correction
          </button>
        </div>
      </div>

      {/* Employee appeals block */}
      <div
        data-tl="block-employee-appeals"
        className="p-4 rounded-2xl border border-amber-200 bg-amber-50/60 flex items-start justify-between"
      >
        <div className="flex flex-col gap-1">
          <div className="flex items-center gap-2">
            <span className="text-xs font-bold text-[#92400E]">Employee appeals</span>
            <span className="px-2 py-0.2 rounded-full text-[10px] font-semibold bg-amber-100 text-amber-800">
              Awaiting HR review
            </span>
          </div>
          <p className="text-xs text-[#78350F] italic">&quot;I can think critically&quot;</p>
        </div>
        <span className="text-[11px] text-[#92400E] font-medium">25/10/2026</span>
      </div>

      {/* Paused cycle notification strip */}
      <div
        data-tl="strip-cycle-paused"
        className="px-4 py-2.5 rounded-xl bg-gray-100 border border-[#E5E7EB] text-xs text-[#4B5563] flex items-center justify-between"
      >
        <span>This appraisal cycle is paused.</span>
        <button
          type="button"
          data-tl="btn-reopen-appraisal"
          className="text-xs font-semibold text-[#7014D9] hover:underline"
        >
          Reopen appraisal
        </button>
      </div>

      {/* Rating banner */}
      <div
        data-tl="strip-overall-rating"
        className="p-4 rounded-2xl bg-[#FAF5FF] border border-purple-200 flex items-center justify-between"
      >
        <div>
          <span className="text-[11px] font-medium text-[#6B7280] block">Overall assessment outcome</span>
          <span className="text-sm font-bold text-[#7014D9]">Overall rating: Exceeds Expectations</span>
        </div>
        <button
          type="button"
          data-tl="link-download-appraisal-pdf"
          className="text-xs font-semibold text-[#7014D9] hover:underline flex items-center gap-1.5"
        >
          <Icon name="download" size={14} />
          <span>Download appraisal PDF</span>
        </button>
      </div>

      {/* Agreed objectives accordion */}
      <div
        data-tl="accordion-agreed-objectives"
        className="p-4 rounded-2xl border border-[#E5E7EB] bg-white text-xs text-[#4B5563] flex items-center justify-between"
      >
        <div className="flex items-center gap-2">
          <span className="font-semibold text-[#111827]">▶ Agreed objectives</span>
          <span className="text-[11px] text-[#6B7280]">· Objectives acknowledged 25/10/2026</span>
        </div>
      </div>

      {/* Submitted Reviews Cards */}
      <div className="flex flex-col gap-5">
        {/* Self review card */}
        <div
          data-tl="card-self-review-submitted"
          className="p-6 rounded-2xl border border-[#E5E7EB] bg-white shadow-2xs flex flex-col gap-4"
        >
          <div className="flex items-center justify-between border-b border-[#F3F4F6] pb-3">
            <div>
              <h2 className="text-sm font-bold text-[#111827]">SELF review submitted</h2>
              <p className="text-xs text-[#6B7280]">Alex Morgan</p>
            </div>
            <div className="text-right">
              <span className="text-[10px] text-[#9CA3AF] uppercase block">Rating</span>
              <span data-tl="self-rating-score" className="text-sm font-bold text-[#7014D9]">
                Rating: 3.48
              </span>
            </div>
          </div>

          <div className="divide-y divide-[#F3F4F6]">
            {selfQuestions.map((item, idx) => (
              <div key={idx} className="py-2.5 flex items-center justify-between text-xs">
                <span className="text-[#374151] pr-4">{item.q}</span>
                <span className="font-bold text-[#111827] px-2 py-0.5 rounded bg-gray-100 min-w-6 text-center">
                  {item.a}
                </span>
              </div>
            ))}
          </div>
          <p className="text-xs text-[#9CA3AF] italic pt-1">No additional comments</p>
        </div>

        {/* Manager review card */}
        <div
          data-tl="card-manager-review-submitted"
          className="p-6 rounded-2xl border border-[#E5E7EB] bg-white shadow-2xs flex flex-col gap-4"
        >
          <div className="flex items-center justify-between border-b border-[#F3F4F6] pb-3">
            <div>
              <h2 className="text-sm font-bold text-[#111827]">MANAGER review submitted</h2>
              <p className="text-xs text-[#6B7280]">Sam Taylor</p>
            </div>
            <div className="text-right">
              <span className="text-[10px] text-[#9CA3AF] uppercase block">Rating</span>
              <span data-tl="manager-rating-score" className="text-sm font-bold text-[#7014D9]">
                Rating: 3.48
              </span>
            </div>
          </div>

          <div className="divide-y divide-[#F3F4F6]">
            {managerQuestions.map((item, idx) => (
              <div key={idx} className="py-2.5 flex items-center justify-between text-xs">
                <span className="text-[#374151] pr-4">{item.q}</span>
                <span className="font-bold text-[#111827] px-2 py-0.5 rounded bg-gray-100 min-w-6 text-center">
                  {item.a}
                </span>
              </div>
            ))}
          </div>
          <p className="text-xs text-[#9CA3AF] italic pt-1">No additional comments</p>
        </div>

        {/* Bottom Back Button */}
        <div className="flex items-center justify-end pt-2">
          <button
            type="button"
            data-tl="btn-bottom-back-to-reviews"
            onClick={onBack}
            className="px-4 py-2 rounded-xl border border-[#D1D5DB] text-xs font-semibold text-[#4B5563] hover:bg-gray-50 transition-colors shadow-2xs"
          >
            Back to reviews
          </button>
        </div>
      </div>
    </div>
  );
}
