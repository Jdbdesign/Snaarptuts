"use client";

import type { Timeline } from "@/lib/timeline";
import { useTimelineVar } from "@/lib/useTimelineVar";
import { X, Bookmark } from "lucide-react";

interface Props {
  tl: Timeline;
}

export function ZeusSaveSearchModal({ tl }: Props) {
  const isOpen = useTimelineVar<boolean>(tl, "zeusSaveSearchModalOpen", false);
  const searchName = useTimelineVar<string>(tl, "zeusSavedSearchName", "");
  const savedSearches = useTimelineVar<string[]>(tl, "zeusSavedSearches", []);

  if (!isOpen) return null;

  const handleSave = () => {
    if (!searchName.trim()) return;
    tl.setVar("zeusSavedSearches", [...savedSearches, searchName.trim()]);
    tl.setVar("zeusSaveSearchModalOpen", false);
    tl.setVar("zeusToast", {
      text: "Search saved",
      subtext: `"${searchName.trim()}" saved successfully`,
    });
    setTimeout(() => {
      tl.setVar("zeusToast", null);
    }, 2500);
  };

  return (
    <div
      data-tl="save-search-modal-backdrop"
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 backdrop-blur-[1px] animate-in fade-in duration-150 select-none"
      onClick={() => tl.setVar("zeusSaveSearchModalOpen", false)}
    >
      <div
        data-tl="save-search-modal"
        className="w-[440px] bg-white rounded-2xl p-6 shadow-2xl border border-gray-100 animate-in zoom-in-95 duration-150"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-xl bg-[#F5EEFF] text-[#7014D9] flex items-center justify-center">
              <Bookmark className="w-4 h-4 fill-[#7014D9]" />
            </div>
            <h3 className="text-base font-bold text-gray-900">Save this search</h3>
          </div>
          <button
            type="button"
            data-tl="btn-close-save-search"
            onClick={() => tl.setVar("zeusSaveSearchModalOpen", false)}
            className="p-1 text-gray-400 hover:text-gray-700 rounded-lg hover:bg-gray-100"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        <p className="text-xs text-gray-500 mt-2">
          Give your search a name to quickly run it again later.
        </p>

        <div className="mt-4">
          <label className="block text-xs font-semibold text-gray-700 mb-1">Search Name</label>
          <input
            type="text"
            data-tl="input-save-search-name"
            placeholder="e.g. Senior Engineers in US"
            value={searchName}
            onChange={(e) => tl.setVar("zeusSavedSearchName", e.target.value)}
            className="w-full bg-gray-50 border border-gray-200 rounded-xl px-3 py-2 text-xs text-gray-900 placeholder:text-gray-400 focus:outline-none focus:border-[#7014D9]"
          />
        </div>

        <div className="mt-6 flex items-center justify-end gap-2.5">
          <button
            type="button"
            data-tl="btn-cancel-save-search"
            onClick={() => tl.setVar("zeusSaveSearchModalOpen", false)}
            className="px-4 py-2 text-xs font-semibold text-gray-600 hover:text-gray-900 hover:bg-gray-100 rounded-xl transition-colors"
          >
            Cancel
          </button>
          <button
            type="button"
            data-tl="btn-confirm-save-search"
            onClick={handleSave}
            disabled={!searchName.trim()}
            className={`px-5 py-2 text-xs font-bold rounded-xl transition-colors ${
              searchName.trim()
                ? "bg-[#7014D9] hover:bg-[#5B0FB3] text-white shadow-xs cursor-pointer"
                : "bg-gray-100 text-gray-400 cursor-not-allowed"
            }`}
          >
            Save
          </button>
        </div>
      </div>
    </div>
  );
}
