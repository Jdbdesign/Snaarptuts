"use client";

import React from "react";
import type { Timeline } from "@/lib/timeline";
import { useTimelineVar } from "@/lib/useTimelineVar";
import { Trash2, Info, RotateCcw, FileText, FileSpreadsheet } from "lucide-react";
import { INITIAL_TRASH_ITEMS } from "./drive-data";

export interface DriveTrashViewProps {
  tl?: Timeline;
}

export const DriveTrashView: React.FC<DriveTrashViewProps> = ({ tl }) => {
  const isEmptied = useTimelineVar(tl!, "driveTrashEmptied", false);
  const restoredId = useTimelineVar<string>(tl!, "driveTrashRestoredId", "");

  const activeItems = isEmptied
    ? []
    : INITIAL_TRASH_ITEMS.filter((item) => item.id !== restoredId);

  return (
    <div className="flex-1 flex flex-col p-6 bg-white overflow-y-auto font-['Poppins',sans-serif]" data-tl="trash-view">
      {/* Header */}
      <div className="flex items-center justify-between pb-4">
        <div>
          <h1 className="text-xl font-bold text-gray-900 leading-tight">Trash</h1>
          <p className="text-xs text-gray-500">{activeItems.length} items in trash</p>
        </div>
        <button
          type="button"
          data-tl="btn-empty-trash"
          disabled={activeItems.length === 0}
          onClick={() => tl?.setVar("driveEmptyTrashModalOpen", true)}
          className={`inline-flex items-center gap-1.5 px-3.5 py-1.5 text-xs font-medium rounded-lg transition-colors shadow-xs ${
            activeItems.length === 0
              ? "bg-gray-200 text-gray-400 cursor-not-allowed"
              : "text-white bg-[#DC2626] hover:bg-red-700 cursor-pointer"
          }`}
        >
          <Trash2 className="w-3.5 h-3.5" />
          <span>Empty Trash</span>
        </button>
      </div>

      {/* Info Banner */}
      <div className="flex items-center gap-2 px-4 py-2.5 bg-blue-50/70 border border-blue-100 rounded-xl text-xs text-blue-700 mb-6">
        <Info className="w-4 h-4 text-blue-500 shrink-0" />
        <span>Deleted items stay in trash until you restore them or empty the trash.</span>
      </div>

      {activeItems.length > 0 ? (
        /* Table */
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
              {activeItems.map((item) => (
                <tr
                  key={item.id}
                  data-tl={`row-trash-${item.id}`}
                  className="hover:bg-gray-50/70 transition-colors group cursor-pointer"
                >
                  <td className="py-3 px-4">
                    <div className="flex items-center gap-3">
                      <div className="w-8 h-8 rounded-lg bg-blue-50 text-blue-600 flex items-center justify-center shrink-0">
                        {item.type === "xlsx" ? (
                          <FileSpreadsheet className="w-4 h-4 text-emerald-600" />
                        ) : (
                          <FileText className="w-4 h-4 text-blue-600" />
                        )}
                      </div>
                      <div className="font-medium text-gray-900 group-hover:text-[#7014D9] transition-colors">
                        {item.name}
                      </div>
                    </div>
                  </td>
                  <td className="py-3 px-4 text-gray-600">{item.originalLocation}</td>
                  <td className="py-3 px-4 text-gray-600">{item.deletedDate}</td>
                  <td className="py-3 px-4 text-gray-600 font-mono">{item.size}</td>
                  <td className="py-3 px-4 text-right">
                    <button
                      type="button"
                      data-tl={`btn-trash-restore-${item.id}`}
                      onClick={() => {
                        tl?.setVar("driveTrashRestoredId", item.id);
                        tl?.setVar("driveTrashRestoredToastOpen", true);
                      }}
                      className="inline-flex items-center gap-1.5 px-2.5 py-1 text-xs font-medium text-gray-700 hover:text-[#7014D9] hover:bg-purple-50 rounded-md transition-colors cursor-pointer"
                    >
                      <RotateCcw className="w-3.5 h-3.5" />
                      <span>Restore</span>
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      ) : (
        /* Empty State */
        <div data-tl="trash-empty-state" className="flex-1 flex flex-col items-center justify-center min-h-[300px]">
          <div className="text-center max-w-sm">
            <div className="w-14 h-14 mx-auto mb-3 text-gray-300 flex items-center justify-center">
              <Trash2 className="w-10 h-10 stroke-[1.4]" />
            </div>
            <h3 className="text-sm font-semibold text-gray-900 mb-1">
              Trash is empty
            </h3>
            <p className="text-xs text-gray-500">
              Items moved to trash will appear here.
            </p>
          </div>
        </div>
      )}
    </div>
  );
};
