"use client";

import React from "react";
import type { Timeline } from "@/lib/timeline";
import { Trash2, Info, RotateCcw, FileSpreadsheet } from "lucide-react";
import { TRASH_ITEM } from "./drive-data";

export interface DriveTrashViewProps {
  tl?: Timeline;
}

export const DriveTrashView: React.FC<DriveTrashViewProps> = () => {
  return (
    <div className="flex-1 flex flex-col p-6 bg-white overflow-y-auto" data-tl="trash-view">
      {/* Header */}
      <div className="flex items-center justify-between pb-4">
        <div>
          <h1 className="text-xl font-bold text-gray-900 leading-tight">Trash</h1>
          <p className="text-xs text-gray-500">1 item in trash</p>
        </div>
        <button
          type="button"
          data-tl="btn-empty-trash"
          className="inline-flex items-center gap-1.5 px-3.5 py-1.5 text-xs font-medium text-white bg-[#DC2626] hover:bg-red-700 rounded-lg transition-colors shadow-xs"
        >
          <Trash2 className="w-3.5 h-3.5" />
          Empty Trash
        </button>
      </div>

      {/* Info Banner */}
      <div className="flex items-center gap-2 px-4 py-2.5 bg-blue-50/70 border border-blue-100 rounded-xl text-xs text-blue-700 mb-6">
        <Info className="w-4 h-4 text-blue-500 shrink-0" />
        <span>Deleted items stay in trash until you restore them or empty the trash.</span>
      </div>

      {/* Table */}
      <div className="border border-gray-200 rounded-xl overflow-hidden shadow-xs">
        <table className="w-full text-left text-xs">
          <thead className="bg-gray-50 text-gray-500 font-medium border-b border-gray-200">
            <tr>
              <th className="py-3 px-4 font-medium">Name</th>
              <th className="py-3 px-4 font-medium">Original Location</th>
              <th className="py-3 px-4 font-medium">Deleted</th>
              <th className="py-3 px-4 font-medium">Size</th>
              <th className="py-3 px-4 text-right font-medium">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-100 bg-white text-gray-700">
            <tr
              data-tl="row-trash-item"
              className="hover:bg-gray-50/70 transition-colors group cursor-pointer"
            >
              <td className="py-3 px-4">
                <div className="flex items-center gap-3">
                  <div className="w-8 h-8 rounded-lg bg-emerald-50 text-emerald-600 flex items-center justify-center shrink-0">
                    <FileSpreadsheet className="w-4 h-4" />
                  </div>
                  <div className="font-medium text-gray-900 group-hover:text-[#7014D9] transition-colors">
                    {TRASH_ITEM.name}
                  </div>
                </div>
              </td>
              <td className="py-3 px-4 text-gray-600">{TRASH_ITEM.subtitle}</td>
              <td className="py-3 px-4 text-gray-600">{TRASH_ITEM.modified}</td>
              <td className="py-3 px-4 text-gray-600 font-mono">{TRASH_ITEM.size}</td>
              <td className="py-3 px-4 text-right">
                <button
                  type="button"
                  data-tl="btn-trash-restore"
                  className="inline-flex items-center gap-1.5 px-2.5 py-1 text-xs font-medium text-gray-700 hover:text-[#7014D9] hover:bg-purple-50 rounded-md transition-colors"
                >
                  <RotateCcw className="w-3.5 h-3.5" />
                  <span>Restore</span>
                </button>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  );
};
