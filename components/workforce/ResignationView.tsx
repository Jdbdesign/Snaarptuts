"use client";

import { Icon } from "@/components/icons";
import type { Timeline } from "@/lib/timeline";
import { useTimelineVar } from "@/lib/useTimelineVar";
import { SAMPLE_RESIGNATION, URLS } from "./workforce-data";

type Props = {
  tl: Timeline;
  onBack?: () => void;
};

export function ResignationView({ tl, onBack }: Props) {
  const loading = useTimelineVar(tl, "wfResignationLoading", false);
  const { status, submittedOn, proposedLastDay, approvedLastDay, reason, timeline, exitInterview } =
    SAMPLE_RESIGNATION;

  if (loading) {
    return (
      <div data-tl="resignation-loading" className="flex h-96 w-full items-center justify-center">
        <div className="flex flex-col items-center gap-3">
          <div className="h-8 w-8 animate-spin rounded-full border-2 border-[#7014D9] border-t-transparent" />
          <span className="text-xs font-medium text-[#6B7280]">Loading...</span>
        </div>
      </div>
    );
  }

  return (
    <div className="flex flex-col gap-5 max-w-4xl mx-auto pb-12">
      {/* Back button */}
      <div>
        <button
          type="button"
          data-tl="resignation-back-btn"
          onClick={() => {
            if (onBack) onBack();
            else {
              tl.setVar("wfPage", "salary-advances");
              tl.setVar("wfSubpage", "salary-advances");
              tl.setUrl(URLS.salaryAdvances);
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
        <h2 data-tl="resignation-heading" className="text-xl font-bold text-[#111827]">
          My Resignation
        </h2>
        <p data-tl="resignation-sub" className="text-xs text-[#6B7280] mt-0.5">
          Your resignation request status
        </p>
      </div>

      {/* Card 1: Resignation Request */}
      <div
        data-tl="card-resignation-request"
        className="rounded-2xl border border-gray-200/90 bg-white p-6 shadow-xs flex flex-col gap-5"
      >
        <div className="flex items-center justify-between">
          <h3 className="text-sm font-semibold text-[#111827]">Resignation Request</h3>
          <span
            data-tl="resignation-status-badge"
            className="inline-block rounded-full bg-emerald-50 border border-emerald-200 px-3 py-0.5 text-xs font-semibold text-emerald-700"
          >
            {status}
          </span>
        </div>

        {/* Date fields */}
        <div data-tl="resignation-dates" className="grid grid-cols-2 gap-6 text-xs">
          <div>
            <span className="text-[#6B7280] block">Submitted On</span>
            <span className="font-semibold text-[#111827] mt-1 block">{submittedOn}</span>
          </div>
          <div>
            <span className="text-[#6B7280] block">Proposed Last Working Day</span>
            <span className="font-semibold text-[#111827] mt-1 block">{proposedLastDay}</span>
          </div>
          <div>
            <span className="text-[#6B7280] block">Approved Last Working Day</span>
            <span className="font-semibold text-[#111827] mt-1 block">{approvedLastDay}</span>
          </div>
        </div>

        {/* Reason */}
        <div data-tl="resignation-reason" className="flex flex-col gap-1.5 text-xs">
          <span className="text-[#6B7280]">Reason</span>
          <div className="rounded-xl bg-[#F9FAFB] border border-gray-100 p-3.5 text-[#374151]">
            {reason}
          </div>
        </div>

        {/* Timeline */}
        <div data-tl="resignation-timeline" className="flex flex-col gap-3 pt-3 border-t border-gray-100">
          <h4 className="text-xs font-semibold text-[#111827]">Timeline</h4>
          <div className="flex items-center gap-6">
            {timeline.map((item, idx) => (
              <div key={idx} className="flex items-center gap-2 text-xs">
                <div className="flex h-6 w-6 items-center justify-center rounded-full bg-[#7014D9] text-white">
                  <Icon name="check" size={13} />
                </div>
                <span className="font-medium text-[#111827]">{item.title}</span>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Card 2: Exit interview submitted */}
      <div
        data-tl="card-exit-interview"
        className="rounded-2xl border border-gray-200/90 bg-white p-6 shadow-xs flex flex-col gap-2 text-xs"
      >
        <h3 className="text-sm font-semibold text-[#111827]">{exitInterview.title}</h3>
        <p className="text-[#6B7280]">{exitInterview.subtitle}</p>
        <p className="text-[#9CA3AF] text-[11px] mt-1">{exitInterview.date}</p>
        <div className="mt-2">
          <button
            type="button"
            data-tl="link-view-exit-answers"
            className="font-medium text-[#7014D9] hover:underline"
          >
            {exitInterview.linkText}
          </button>
        </div>
      </div>
    </div>
  );
}
