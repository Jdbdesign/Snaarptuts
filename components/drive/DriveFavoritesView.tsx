"use client";

import React from "react";
import type { Timeline } from "@/lib/timeline";
import { useTimelineVar } from "@/lib/useTimelineVar";
import { Star, FileText, X } from "lucide-react";

export interface DriveFavoritesViewProps {
  tl: Timeline;
}

interface FavoriteItem {
  id: string;
  name: string;
  type: "pdf" | "docx";
  modified: string;
  size: string;
}

const FAVORITE_ITEMS: FavoriteItem[] = [
  { id: "fav-1", name: "Q3 report.pdf", type: "pdf", modified: "11/4/2026", size: "204.8 KB" },
  { id: "fav-2", name: "Meeting notes.docx", type: "docx", modified: "11/4/2026", size: "1.2 KB" },
  { id: "fav-3", name: "Project brief.docx", type: "docx", modified: "11/4/2026", size: "6.0 KB" },
];

export const DriveFavoritesView: React.FC<DriveFavoritesViewProps> = ({ tl }) => {
  const unstarredId = useTimelineVar<string>(tl, "driveFavoritesUnstarredId", "");
  const previewItem = useTimelineVar<string>(tl, "driveFavoritesPreviewItem", "");

  const activeItems = FAVORITE_ITEMS.filter((item) => item.id !== unstarredId);

  return (
    <div className="flex-1 flex flex-col p-6 bg-white overflow-y-auto font-['Poppins',sans-serif]" data-tl="favorites-view">
      {/* Header */}
      <div className="pb-4">
        <h1 className="text-xl font-bold text-gray-900 leading-tight">Favorites</h1>
        <p className="text-xs text-gray-500">Your starred files and folders</p>
      </div>

      {activeItems.length > 0 ? (
        /* Favorites Table */
        <div className="mt-2 rounded-2xl border border-[#EBECEF] bg-white overflow-hidden shadow-2xs">
          <table className="w-full text-left text-[12.5px]">
            <thead>
              <tr className="border-b border-[#F3F4F6] text-[11.5px] font-semibold text-[#6B7280]">
                <th className="py-2.5 px-4 font-medium">Name</th>
                <th className="py-2.5 px-4 font-medium">Modified</th>
                <th className="py-2.5 px-4 font-medium">Size</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-[#F3F4F6]">
              {activeItems.map((item, idx) => (
                <tr
                  key={item.id}
                  data-tl={`row-favorite-${idx + 1}`}
                  className="hover:bg-purple-50/20 transition-colors group"
                >
                  <td className="py-3 px-4">
                    <div className="flex items-center gap-2.5">
                      <div className="flex h-6 w-6 items-center justify-center rounded bg-rose-50 text-rose-600">
                        <FileText size={14} />
                      </div>
                      <span
                        data-tl={`link-fav-item-${idx + 1}`}
                        onClick={() => tl.setVar("driveFavoritesPreviewItem", item.name)}
                        className="font-semibold text-[#111827] group-hover:text-blue-600 group-hover:underline cursor-pointer"
                      >
                        {item.name}
                      </span>
                      <button
                        type="button"
                        data-tl={`btn-unstar-item-${idx + 1}`}
                        onClick={() => {
                          tl.setVar("driveFavoritesUnstarredId", item.id);
                          tl.setVar("driveFavoritesToastOpen", true);
                        }}
                        className="text-amber-500 fill-amber-500 hover:text-gray-300 transition-colors cursor-pointer ml-1"
                        title="Remove from favorites"
                      >
                        <Star size={14} className="fill-amber-500 text-amber-500" />
                      </button>
                    </div>
                  </td>
                  <td className="py-3 px-4 text-[#4B5563]">{item.modified}</td>
                  <td className="py-3 px-4 text-[#4B5563]">{item.size}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      ) : (
        /* Empty State */
        <div data-tl="favorites-empty-state" className="flex-1 flex flex-col items-center justify-center min-h-[400px]">
          <div className="text-center max-w-sm">
            <div className="w-16 h-16 mx-auto mb-3 text-gray-300 flex items-center justify-center">
              <Star className="w-12 h-12 stroke-[1.3]" />
            </div>
            <h3 className="text-sm font-semibold text-gray-900 mb-1">
              No favorites yet
            </h3>
            <p className="text-xs text-gray-500">
              Star files and folders to quickly access them here.
            </p>
          </div>
        </div>
      )}

      {/* Item Preview Modal if opened */}
      {previewItem && (
        <div
          data-tl="modal-fav-preview"
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 font-['Poppins',sans-serif] animate-in fade-in duration-150"
        >
          <div className="w-[500px] rounded-2xl bg-white p-5 shadow-2xl border border-gray-100">
            <div className="flex items-center justify-between pb-3 border-b border-gray-100">
              <div className="flex items-center gap-2">
                <FileText size={16} className="text-rose-600" />
                <h3 className="text-[14px] font-semibold text-gray-900">{previewItem}</h3>
              </div>
              <button
                type="button"
                data-tl="btn-fav-preview-close"
                onClick={() => tl.setVar("driveFavoritesPreviewItem", "")}
                className="text-gray-400 hover:text-gray-600 cursor-pointer"
              >
                <X size={16} />
              </button>
            </div>
            <div className="py-10 text-center text-gray-400 text-xs">
              Preview of {previewItem}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
