"use client";

import React from "react";
import type { Timeline } from "@/lib/timeline";
import { useTimelineVar } from "@/lib/useTimelineVar";
import { Star, FileText } from "lucide-react";

export interface DriveFavoritesViewProps {
  tl: Timeline;
}

export const DriveFavoritesView: React.FC<DriveFavoritesViewProps> = ({ tl }) => {
  const isFavorite = useTimelineVar(tl, "driveItemIsFavorite", false);
  const renamedTitle = useTimelineVar<string>(tl, "driveFileSampleTxtTitle", "Sample notes.txt");

  return (
    <div className="flex-1 flex flex-col p-6 bg-white overflow-y-auto font-['Poppins',sans-serif]" data-tl="favorites-view">
      {/* Header */}
      <div className="pb-4">
        <h1 className="text-xl font-bold text-gray-900 leading-tight">Favorites</h1>
        <p className="text-xs text-gray-500">Your starred files and folders</p>
      </div>

      {isFavorite ? (
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
              <tr data-tl="row-fav-sample-txt" className="hover:bg-purple-50/30 transition-colors">
                <td className="py-3 px-4">
                  <div className="flex items-center gap-2.5">
                    <div className="flex h-6 w-6 items-center justify-center rounded bg-rose-50 text-rose-600">
                      <FileText size={14} />
                    </div>
                    <span className="font-semibold text-[#111827]">
                      {renamedTitle}
                    </span>
                    <Star size={14} className="text-amber-500 fill-amber-500 shrink-0" />
                  </div>
                </td>
                <td className="py-3 px-4 text-[#4B5563]">11/4/2026</td>
                <td className="py-3 px-4 text-[#4B5563]">3.4 KB</td>
              </tr>
            </tbody>
          </table>
        </div>
      ) : (
        /* Main Body / Empty State */
        <div className="flex-1 flex flex-col items-center justify-center min-h-[400px]">
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
    </div>
  );
};
