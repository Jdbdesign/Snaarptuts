"use client";

import { Icon } from "@/components/icons";
import type { Timeline } from "@/lib/timeline";
import { SAMPLE_EXIT_TASKS, URLS } from "./workforce-data";

type Props = {
  tl: Timeline;
  onBack?: () => void;
};

export function ExitTasksView({ tl, onBack }: Props) {
  const { title, subtitle, emptyMessage } = SAMPLE_EXIT_TASKS;

  return (
    <div className="flex flex-col gap-5 max-w-4xl mx-auto pb-12">
      {/* Back button */}
      <div>
        <button
          type="button"
          data-tl="exit-tasks-back-btn"
          onClick={() => {
            if (onBack) onBack();
            else {
              tl.setVar("wfPage", "resignation");
              tl.setVar("wfSubpage", "resignation");
              tl.setUrl(URLS.resignation);
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
        <h2 data-tl="exit-tasks-heading" className="text-xl font-bold text-[#111827]">
          {title}
        </h2>
        <p data-tl="exit-tasks-sub" className="text-xs text-[#6B7280] mt-0.5">
          {subtitle}
        </p>
      </div>

      {/* Empty Message */}
      <div className="pt-2">
        <p data-tl="exit-tasks-empty" className="text-sm text-[#111827]">
          {emptyMessage}
        </p>
      </div>
    </div>
  );
}
