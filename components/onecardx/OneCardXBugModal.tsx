"use client";

import type { Timeline } from "@/lib/timeline";
import { useTimelineVar } from "@/lib/useTimelineVar";
import { Bug, X, ChevronDown, Send } from "lucide-react";

type Props = {
  tl: Timeline;
  onClose?: () => void;
};

const BUG_CATEGORIES = [
  "Bug",
  "UI/Display",
  "Performance",
  "Data/Sync",
  "Billing",
  "Other",
];

export function OneCardXBugModal({ tl, onClose }: Props) {
  const isOpen = useTimelineVar(tl, "ocxBugModalOpen", false);
  const categoryOpen = useTimelineVar(tl, "ocxBugCategoryOpen", false);
  const selectedCategory = useTimelineVar(tl, "ocxBugCategory", "Bug");

  if (!isOpen) return null;

  const handleClose = () => {
    tl.setVar("ocxBugModalOpen", false);
    tl.setVar("ocxBugCategoryOpen", false);
    onClose?.();
  };

  return (
    <div
      data-tl="modal-report-bug-backdrop"
      className="absolute inset-0 z-50 flex items-center justify-center bg-black/40 backdrop-blur-[1px] font-['Poppins',sans-serif]"
    >
      <div
        data-tl="modal-report-bug"
        className="relative w-[460px] rounded-2xl bg-white p-6 shadow-2xl border border-gray-100 transition-all"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="flex items-start justify-between">
          <div className="flex items-center gap-2.5 text-[#111827]">
            <span className="flex h-7 w-7 items-center justify-center rounded-lg bg-red-50 text-[#DC2626]">
              <Bug size={17} strokeWidth={2.2} />
            </span>
            <h2 className="text-[17px] font-semibold tracking-tight text-[#111827]">
              Report a Bug
            </h2>
          </div>
          <button
            type="button"
            data-tl="btn-bug-close-x"
            onClick={handleClose}
            className="flex h-7 w-7 items-center justify-center rounded-lg text-gray-400 hover:bg-gray-100 hover:text-gray-600 transition-colors cursor-pointer"
          >
            <X size={17} strokeWidth={2} />
          </button>
        </div>

        <p className="mt-1.5 text-[12.5px] text-[#6B7280]">
          Spotted something broken? Let us know and the team will take a look.
        </p>

        {/* Category */}
        <div className="mt-4">
          <label className="block text-[12px] font-medium text-[#374151] mb-1">
            Category
          </label>
          <div className="relative">
            <button
              type="button"
              data-tl="dropdown-bug-category"
              onClick={() => tl.setVar("ocxBugCategoryOpen", !categoryOpen)}
              className="flex w-full items-center justify-between rounded-xl border border-[#E5E7EB] bg-white px-3.5 py-2.5 text-[13px] text-[#111827] shadow-2xs hover:border-gray-400 focus:outline-none focus:border-[#7014D9] cursor-pointer"
            >
              <span>{selectedCategory}</span>
              <ChevronDown size={16} className="text-gray-400" />
            </button>

            {/* Dropdown Options */}
            {categoryOpen && (
              <div
                data-tl="dropdown-bug-category-menu"
                className="absolute left-0 right-0 top-full mt-1 rounded-xl border border-[#E5E7EB] bg-white py-1 shadow-lg z-30 overflow-hidden"
              >
                {BUG_CATEGORIES.map((cat) => (
                  <div
                    key={cat}
                    data-tl={`option-bug-category-${cat.toLowerCase().replace(/[^a-z0-9]/g, "-")}`}
                    onClick={() => {
                      tl.setVar("ocxBugCategory", cat);
                      tl.setVar("ocxBugCategoryOpen", false);
                    }}
                    className={`px-3.5 py-2 text-[13px] cursor-pointer transition-colors ${
                      cat === selectedCategory
                        ? "bg-blue-600 text-white font-medium"
                        : "text-[#374151] hover:bg-blue-500 hover:text-white"
                    }`}
                  >
                    {cat}
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>

        {/* What happened? */}
        <div className="mt-3.5">
          <label className="block text-[12px] font-medium text-[#374151] mb-1">
            What happened?
          </label>
          <textarea
            data-tl="textarea-bug-description"
            rows={3}
            placeholder="Describe the problem, what you expected, and how to reproduce it."
            className="w-full resize-none rounded-xl border border-[#E5E7EB] px-3.5 py-2.5 text-[13px] text-[#111827] placeholder:text-[#9CA3AF] shadow-2xs focus:border-[#7014D9] focus:outline-none"
            readOnly
          />
        </div>

        {/* Footer */}
        <div className="mt-6 flex items-center justify-end gap-2.5 border-t border-gray-100 pt-4">
          <button
            type="button"
            data-tl="btn-bug-cancel"
            onClick={handleClose}
            className="rounded-xl px-4 py-2 text-[13px] font-medium text-[#4B5563] hover:bg-gray-100 hover:text-[#111827] transition-colors cursor-pointer"
          >
            Cancel
          </button>
          <button
            type="button"
            data-tl="btn-bug-submit"
            className="flex items-center gap-1.5 rounded-xl bg-[#7014D9] px-5 py-2 text-[13px] font-medium text-white shadow-xs hover:bg-[#5b0fb3] transition-colors cursor-pointer"
          >
            <Send size={14} className="rotate-45" />
            <span>Submit</span>
          </button>
        </div>
      </div>
    </div>
  );
}
