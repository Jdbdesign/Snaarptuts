"use client";

import type { Timeline } from "@/lib/timeline";
import { useTimelineVar } from "@/lib/useTimelineVar";
import { ArrowLeft, ChevronRight } from "lucide-react";
import type { ChartAccount } from "./books-data";

type Props = {
  tl: Timeline;
};

export function BooksAccountDetailView({ tl }: Props) {
  const account = useTimelineVar<ChartAccount | null>(tl, "booksActiveAccount", null);
  const updatedName = useTimelineVar<string>(tl, "booksEditAccountName", account?.name || "Staff Float");
  const updatedDesc = useTimelineVar<string>(
    tl,
    "booksEditAccountDesc",
    account?.description || "Staff float for minor expenses",
  );

  const displayCode = account?.code || "1002";
  const displayType = account?.type || "Cash";
  const displayParent = account?.parentAccountName || "1100 - Accounts Receivable";

  return (
    <div className="flex-1 flex flex-col min-w-0 bg-[#F8FAFC] overflow-y-auto" data-scroller="true">
      {/* Top Header */}
      <div className="bg-white border-b border-gray-200 px-6 py-4 flex items-center justify-between sticky top-0 z-20">
        <div className="flex items-center gap-3">
          <button
            type="button"
            data-tl="btn-back-accounts"
            className="p-1.5 text-gray-500 hover:text-gray-800 hover:bg-gray-100 rounded-lg transition-colors flex items-center gap-1.5 text-sm"
          >
            <ArrowLeft className="w-5 h-5" />
            <span className="font-medium hidden sm:inline">Back to Chart of Accounts</span>
          </button>
          <div className="h-4 w-px bg-gray-200 hidden sm:block" />
          <div className="flex items-center gap-2 text-sm text-gray-500">
            <span>Accounts</span>
            <ChevronRight className="w-4 h-4 text-gray-400" />
            <span className="font-semibold text-gray-900">Details</span>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="p-8 max-w-4xl mx-auto w-full space-y-6">
        {/* Title Card */}
        <div className="bg-white rounded-xl border border-gray-200 p-6 shadow-sm flex items-center justify-between">
          <div>
            <div className="flex items-center gap-3">
              <h2 className="text-2xl font-bold text-gray-900">
                {displayCode} - {updatedName}
              </h2>
              <span className="px-2.5 py-0.5 rounded-full text-xs font-semibold bg-emerald-100 text-emerald-800 border border-emerald-200">
                Active
              </span>
            </div>
            <p className="text-xs text-gray-500 mt-1">
              Account Type: <span className="font-medium text-gray-700">{displayType}</span>
            </p>
          </div>
        </div>

        {/* Form Card */}
        <div className="bg-white rounded-xl border border-gray-200 p-6 shadow-sm space-y-5">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
            <div>
              <label className="block text-xs font-semibold text-gray-700 uppercase tracking-wider mb-1.5">
                Account Type
              </label>
              <input
                type="text"
                value={displayType}
                disabled
                className="w-full px-3.5 py-2.5 bg-gray-100 border border-gray-300 rounded-lg text-sm text-gray-500 cursor-not-allowed"
              />
            </div>
            <div>
              <label className="block text-xs font-semibold text-gray-700 uppercase tracking-wider mb-1.5">
                Account Name <span className="text-red-500">*</span>
              </label>
              <input
                type="text"
                data-tl="input-account-name"
                value={updatedName}
                readOnly
                className="w-full px-3.5 py-2.5 bg-gray-50 border border-gray-300 rounded-lg text-sm text-gray-900 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:bg-white transition-colors"
              />
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
            <div>
              <label className="block text-xs font-semibold text-gray-700 uppercase tracking-wider mb-1.5">
                Parent Account
              </label>
              <input
                type="text"
                value={displayParent}
                disabled
                className="w-full px-3.5 py-2.5 bg-gray-100 border border-gray-300 rounded-lg text-sm text-gray-500 cursor-not-allowed"
              />
            </div>
            <div>
              <label className="block text-xs font-semibold text-gray-700 uppercase tracking-wider mb-1.5">
                Account Code
              </label>
              <input
                type="text"
                value={displayCode}
                disabled
                className="w-full px-3.5 py-2.5 bg-gray-100 border border-gray-300 rounded-lg text-sm text-gray-500 font-mono cursor-not-allowed"
              />
            </div>
          </div>

          <div>
            <label className="block text-xs font-semibold text-gray-700 uppercase tracking-wider mb-1.5">
              Description
            </label>
            <textarea
              data-tl="input-account-desc"
              rows={3}
              value={updatedDesc}
              readOnly
              className="w-full px-3.5 py-2.5 bg-gray-50 border border-gray-300 rounded-lg text-sm text-gray-900 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:bg-white transition-colors"
            />
          </div>

          {/* Action buttons */}
          <div className="pt-4 border-t border-gray-100 flex items-center gap-3">
            <button
              type="button"
              data-tl="btn-update-account"
              className="px-6 py-2.5 bg-[#7C3AED] hover:bg-[#6D28D9] text-white font-semibold text-sm rounded-lg shadow-sm transition-colors flex items-center gap-2"
            >
              <span>Update Account</span>
            </button>
            <button
              type="button"
              data-tl="btn-cancel-account-edit"
              className="px-5 py-2.5 bg-white border border-gray-300 hover:bg-gray-50 text-gray-700 font-medium text-sm rounded-lg transition-colors"
            >
              Cancel
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
