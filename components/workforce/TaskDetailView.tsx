"use client";

import { Icon } from "@/components/icons";
import type { Timeline } from "@/lib/timeline";
import { SAMPLE_EMPLOYEE } from "./workforce-data";

type Props = {
  tl: Timeline;
  onBack?: () => void;
};

export function TaskDetailView({ tl, onBack }: Props) {
  return (
    <div className="flex flex-col gap-6 max-w-[1240px] mx-auto pb-16">
      {/* Back button */}
      <div>
        <button
          type="button"
          data-tl="btn-back-task-detail"
          onClick={onBack}
          className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-[#F3E8FF] text-[#7014D9] text-xs font-semibold hover:bg-[#E9D5FF] transition-colors"
        >
          <Icon name="chevronLeft" size={14} />
          <span>Back</span>
        </button>
      </div>

      {/* Header */}
      <div>
        <h2 data-tl="task-detail-title" className="text-xl font-bold text-[#111827]">
          Upload identity document
        </h2>
        <p data-tl="task-detail-subline" className="text-xs text-[#6B7280] mt-1">
          Standard onboarding / Version 1 / Start date 30/10/2026 / Completed
        </p>
      </div>

      {/* Details Card */}
      <div
        data-tl="card-task-detail"
        className="p-6 rounded-2xl bg-white border border-[#E5E7EB] shadow-[0_1px_3px_rgba(0,0,0,0.02)] flex flex-col gap-6"
      >
        <div className="flex items-center gap-6 text-xs text-[#4B5563] flex-wrap">
          <div>
            <span className="text-[#6B7280]">Owner: </span>
            <span className="font-semibold text-[#111827]">{SAMPLE_EMPLOYEE.name}</span>
          </div>
          <div>
            <span className="text-[#6B7280]">Due: </span>
            <span className="font-semibold text-[#111827]">30/10/2026</span>
          </div>
          <div>
            <span className="inline-flex px-2.5 py-0.5 rounded-full text-[11px] font-semibold bg-green-50 text-[#16A34A] border border-green-200">
              Completed
            </span>
          </div>
          <div>
            <span className="inline-flex px-2.5 py-0.5 rounded-full text-[11px] font-medium bg-purple-50 text-[#7014D9] border border-purple-200">
              HR approval required
            </span>
          </div>
        </div>

        <div>
          <button
            type="button"
            data-tl="btn-view-identity-pdf"
            onClick={() => tl.toast("Opening identity-document.pdf")}
            className="inline-flex items-center gap-2 px-4 py-2 rounded-xl border border-[#D1D5DB] text-xs font-medium text-[#111827] hover:bg-gray-50 transition-colors shadow-sm"
          >
            <Icon name="docFile" size={16} className="text-[#7014D9]" />
            <span>View identity-document.pdf</span>
          </button>
        </div>
      </div>
    </div>
  );
}
