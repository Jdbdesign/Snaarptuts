"use client";

import type { Timeline } from "@/lib/timeline";
import { useTimelineVar } from "@/lib/useTimelineVar";
import {
  Search,
  Plus,
  ChevronDown,
  Lock,
  Edit2,
  Trash2,
  Check,
  X,
  CornerDownRight,
} from "lucide-react";
import type { ChartAccount } from "./books-data";

type Props = {
  tl: Timeline;
};

export function BooksChartOfAccountsView({ tl }: Props) {
  const accounts = useTimelineVar<ChartAccount[]>(tl, "booksChartOfAccounts", []);
  const viewName = useTimelineVar<string>(tl, "booksCoaView", "Active Accounts");
  const viewOpen = useTimelineVar<boolean>(tl, "booksCoaViewOpen", false);
  const searchQuery = useTimelineVar<string>(tl, "booksCoaSearch", "");
  const selectedIds = useTimelineVar<string[]>(tl, "booksCoaSelected", []);

  // Filter accounts
  const filtered = accounts.filter((acc) => {
    if (viewName === "Inactive Accounts" && acc.status === "Active") return false;
    if (viewName === "Active Accounts" && acc.status === "Inactive") return false;
    if (searchQuery.trim()) {
      const q = searchQuery.toLowerCase();
      const matchName = acc.name.toLowerCase().includes(q);
      const matchCode = acc.code.toLowerCase().includes(q);
      const matchType = acc.type.toLowerCase().includes(q);
      if (!matchName && !matchCode && !matchType) return false;
    }
    return true;
  });

  const isSelectionBarOpen = selectedIds.length > 0;

  return (
    <div className="flex-1 flex flex-col min-w-0 bg-[#F8FAFC] overflow-y-auto" data-scroller="true">
      {/* Selection bar if items selected */}
      {isSelectionBarOpen && (
        <div
          data-tl="bar-coa-selection"
          className="bg-gray-900 text-white px-6 py-3 flex items-center justify-between sticky top-0 z-30 shadow-md animate-in fade-in"
        >
          <div className="flex items-center gap-6">
            <span className="font-semibold text-sm">
              {selectedIds.length} Selected
            </span>
            <div className="h-4 w-px bg-gray-700" />
            <div className="flex items-center gap-3">
              <button
                type="button"
                data-tl="btn-coa-mark-active"
                className="px-3 py-1 bg-gray-800 hover:bg-gray-700 text-xs font-medium rounded transition-colors"
              >
                Mark as Active
              </button>
              <button
                type="button"
                data-tl="btn-coa-mark-inactive"
                className="px-3 py-1 bg-gray-800 hover:bg-gray-700 text-xs font-medium rounded transition-colors"
              >
                Mark as Inactive
              </button>
              <button
                type="button"
                data-tl="btn-coa-delete"
                className="px-3 py-1 bg-red-600 hover:bg-red-700 text-white text-xs font-medium rounded flex items-center gap-1.5 transition-colors"
              >
                <Trash2 className="w-3.5 h-3.5" />
                <span>Delete</span>
              </button>
            </div>
          </div>
          <button
            type="button"
            data-tl="btn-coa-esc"
            className="flex items-center gap-1.5 text-xs text-gray-400 hover:text-white"
          >
            <X className="w-4 h-4" />
            <span>Esc</span>
          </button>
        </div>
      )}

      {/* Top Header / View selector & Actions */}
      <div className="bg-white border-b border-gray-200 px-6 py-4 flex flex-col sm:flex-row sm:items-center justify-between gap-4 sticky top-0 z-20">
        <div className="flex items-center gap-4">
          <div className="relative">
            <button
              type="button"
              data-tl="btn-coa-view"
              className="flex items-center gap-2 text-lg font-bold text-gray-900 hover:text-blue-600 transition-colors"
            >
              <span>{viewName}</span>
              <ChevronDown className="w-5 h-5 text-gray-500" />
            </button>
            {viewOpen && (
              <div
                data-tl="menu-coa-view"
                className="absolute left-0 mt-2 w-52 bg-white border border-gray-200 rounded-lg shadow-xl z-30 py-1"
              >
                <button
                  type="button"
                  data-tl="opt-coa-active"
                  className="w-full px-4 py-2 text-left text-sm hover:bg-blue-50 hover:text-blue-600 flex items-center justify-between"
                >
                  <span>Active Accounts</span>
                  {viewName === "Active Accounts" && <Check className="w-4 h-4 text-blue-600" />}
                </button>
                <button
                  type="button"
                  data-tl="opt-coa-inactive"
                  className="w-full px-4 py-2 text-left text-sm hover:bg-blue-50 hover:text-blue-600 flex items-center justify-between"
                >
                  <span>Inactive Accounts</span>
                  {viewName === "Inactive Accounts" && <Check className="w-4 h-4 text-blue-600" />}
                </button>
              </div>
            )}
          </div>
        </div>

        <div className="flex items-center gap-3">
          {/* Search box */}
          <div className="relative">
            <Search className="w-4 h-4 text-gray-400 absolute left-3 top-1/2 -translate-y-1/2 pointer-events-none" />
            <input
              type="text"
              data-tl="input-coa-search"
              placeholder="Search accounts..."
              value={searchQuery}
              readOnly
              className="pl-9 pr-4 py-2 bg-gray-50 border border-gray-300 rounded-lg text-sm text-gray-900 w-56 focus:w-64 focus:bg-white focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all"
            />
          </div>

          {/* New Account Button */}
          <button
            type="button"
            data-tl="btn-new-account"
            className="inline-flex items-center gap-1.5 bg-[#145CFB] hover:bg-blue-600 text-white font-medium text-sm px-4 py-2 rounded-lg shadow-sm transition-colors"
          >
            <Plus className="w-4 h-4" />
            <span>+ New Account</span>
          </button>
        </div>
      </div>

      {/* Accounts Table */}
      <div className="p-6">
        <div className="bg-white rounded-xl border border-gray-200 shadow-sm overflow-hidden">
          <table className="w-full text-left text-sm">
            <thead className="bg-gray-50 border-b border-gray-200 text-xs font-semibold uppercase text-gray-600">
              <tr>
                <th className="px-4 py-3.5 w-10">
                  <input
                    type="checkbox"
                    className="w-4 h-4 text-blue-600 rounded border-gray-300 focus:ring-blue-500"
                    readOnly
                  />
                </th>
                <th className="px-6 py-3.5 min-w-[240px]">Account Name</th>
                <th className="px-6 py-3.5 w-32">Account Code</th>
                <th className="px-6 py-3.5 min-w-[180px]">Account Type</th>
                <th className="px-6 py-3.5 w-28">Currency</th>
                <th className="px-6 py-3.5 w-24 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100">
              {filtered.map((acc) => {
                const isSelected = selectedIds.includes(acc.id) || selectedIds.includes(acc.code);
                return (
                  <tr
                    key={acc.id}
                    data-tl={`row-account-${acc.code || acc.id}`}
                    className={`hover:bg-blue-50/40 transition-colors ${
                      isSelected ? "bg-blue-50/60" : ""
                    }`}
                  >
                    <td className="px-4 py-3.5">
                      <input
                        type="checkbox"
                        data-tl={`chk-account-${acc.code || acc.id}`}
                        checked={isSelected}
                        readOnly
                        className="w-4 h-4 text-blue-600 rounded border-gray-300 focus:ring-blue-500 cursor-pointer"
                      />
                    </td>
                    <td className="px-6 py-3.5">
                      <div className={`flex items-center gap-2 ${acc.isSubAccount ? "pl-6" : ""}`}>
                        {acc.isSubAccount && (
                          <CornerDownRight className="w-3.5 h-3.5 text-gray-400 shrink-0" />
                        )}
                        <span
                          data-tl={`link-account-${acc.code || acc.id}`}
                          className="font-medium text-gray-900 hover:text-blue-600 cursor-pointer"
                        >
                          {acc.name}
                        </span>
                      </div>
                    </td>
                    <td className="px-6 py-3.5 text-gray-600 font-mono text-xs">
                      {acc.code || "—"}
                    </td>
                    <td className="px-6 py-3.5">
                      <span className="inline-flex items-center px-2 py-0.5 rounded text-xs font-medium bg-gray-100 text-gray-800">
                        {acc.type}
                      </span>
                    </td>
                    <td className="px-6 py-3.5 text-gray-600 text-xs font-mono">
                      {acc.currency || "GBP"}
                    </td>
                    <td className="px-6 py-3.5 text-right">
                      {acc.isSystemLocked ? (
                        <span title="System account locked from modification">
                          <Lock className="w-4 h-4 text-gray-300 inline" />
                        </span>
                      ) : (
                        <button
                          type="button"
                          data-tl={`btn-edit-account-${acc.code || acc.id}`}
                          className="p-1 text-gray-400 hover:text-blue-600 rounded"
                        >
                          <Edit2 className="w-4 h-4" />
                        </button>
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
