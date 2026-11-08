"use client";

import type { Timeline } from "@/lib/timeline";
import { useTimelineVar } from "@/lib/useTimelineVar";
import { Plus, MoreVertical, Copy, Trash2, Calendar, FileSpreadsheet } from "lucide-react";
import type { Budget } from "./books-data";

type Props = {
  tl: Timeline;
};

export function BooksBudgetsView({ tl }: Props) {
  const budgets = useTimelineVar<Budget[]>(tl, "booksBudgets", []);
  const activeActionsId = useTimelineVar<string | null>(tl, "booksBudgetActionsOpen", null);

  return (
    <div className="flex-1 flex flex-col min-w-0 bg-[#F8FAFC] overflow-y-auto" data-scroller="true">
      {/* Top Header */}
      <div className="bg-white border-b border-gray-200 px-6 py-4 flex items-center justify-between sticky top-0 z-20">
        <div>
          <h2 className="text-xl font-bold text-gray-900">Budgets</h2>
          <p className="text-xs text-gray-500 mt-0.5">
            Plan and monitor financial targets across income and expenditure categories.
          </p>
        </div>
        <button
          type="button"
          data-tl="btn-new-budget"
          className="inline-flex items-center gap-1.5 bg-[#145CFB] hover:bg-blue-600 text-white font-medium text-sm px-4 py-2 rounded-lg shadow-sm transition-colors"
        >
          <Plus className="w-4 h-4" />
          <span>+ New Budget</span>
        </button>
      </div>

      {/* Main Content */}
      <div className="p-6">
        <div className="bg-white rounded-xl border border-gray-200 shadow-sm overflow-visible">
          <table className="w-full text-left text-sm">
            <thead className="bg-gray-50 border-b border-gray-200 text-xs font-semibold uppercase text-gray-600">
              <tr>
                <th className="px-6 py-3.5">Budget Name</th>
                <th className="px-6 py-3.5">Fiscal Year</th>
                <th className="px-6 py-3.5">Period</th>
                <th className="px-6 py-3.5">Created On</th>
                <th className="px-6 py-3.5">Status</th>
                <th className="px-6 py-3.5 w-20 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100">
              {budgets.map((b, idx) => {
                const isMenuOpen = activeActionsId === b.id || activeActionsId === String(idx);
                return (
                  <tr
                    key={b.id || idx}
                    data-tl={`row-budget-${idx}`}
                    className="hover:bg-gray-50/60 transition-colors"
                  >
                    <td className="px-6 py-4 font-semibold text-gray-900">
                      <div className="flex items-center gap-2.5">
                        <FileSpreadsheet className="w-4 h-4 text-blue-600 shrink-0" />
                        <span data-tl={`link-budget-${idx}`} className="hover:text-blue-600 cursor-pointer">
                          {b.name}
                        </span>
                      </div>
                    </td>
                    <td className="px-6 py-4 text-gray-600 text-xs flex items-center gap-1.5 pt-4">
                      <Calendar className="w-3.5 h-3.5 text-gray-400" />
                      <span>{b.fiscalYear}</span>
                    </td>
                    <td className="px-6 py-4 text-gray-600 text-xs">{b.period}</td>
                    <td className="px-6 py-4 text-gray-500 text-xs">{b.createdAt || "08/11/2026"}</td>
                    <td className="px-6 py-4">
                      <span className="inline-flex items-center px-2 py-0.5 rounded text-xs font-medium bg-emerald-100 text-emerald-800">
                        {b.status || "Active"}
                      </span>
                    </td>
                    <td className="px-6 py-4 text-right relative">
                      <button
                        type="button"
                        data-tl={`btn-budget-actions-${idx}`}
                        className="p-1.5 text-gray-400 hover:text-gray-700 hover:bg-gray-100 rounded-lg transition-colors"
                      >
                        <MoreVertical className="w-4 h-4" />
                      </button>

                      {isMenuOpen && (
                        <div
                          data-tl={`menu-budget-actions-${idx}`}
                          className="absolute right-6 top-10 w-36 bg-white border border-gray-200 rounded-lg shadow-xl z-30 py-1"
                        >
                          <button
                            type="button"
                            data-tl={`opt-clone-budget-${idx}`}
                            className="w-full px-3 py-2 text-left text-xs text-gray-700 hover:bg-gray-50 flex items-center gap-2"
                          >
                            <Copy className="w-3.5 h-3.5 text-gray-400" />
                            <span>Clone</span>
                          </button>
                          <button
                            type="button"
                            data-tl={`opt-delete-budget-${idx}`}
                            className="w-full px-3 py-2 text-left text-xs text-red-600 hover:bg-red-50 flex items-center gap-2"
                          >
                            <Trash2 className="w-3.5 h-3.5 text-red-500" />
                            <span>Delete</span>
                          </button>
                        </div>
                      )}
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
