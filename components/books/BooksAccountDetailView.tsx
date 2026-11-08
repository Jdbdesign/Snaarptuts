"use client";

import type { Timeline } from "@/lib/timeline";
import { useTimelineVar } from "@/lib/useTimelineVar";
import { ArrowLeft, ChevronDown, ChevronRight, Home } from "lucide-react";
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
  // The video shows "Asset" for the account type in the dropdown
  const displayType = account?.type === "Cash" ? "Asset" : account?.type || "Asset";
  const displayParent = account?.parentAccountName || "1100 — Accounts Receivable";

  // Parent accounts show Child Accounts section underneath
  const isParentAccount = displayCode === "1100";
  const childAccounts = [
    {
      code: "1002",
      name: updatedName || "Staff Float",
      type: "ASSET",
      status: "Active",
    },
  ];

  return (
    <div className="flex-1 flex flex-col min-w-0 bg-white overflow-y-auto" data-scroller="true">
      {/* Top Header */}
      <div className="bg-white border-b border-gray-200 px-6 py-4 flex items-center justify-between sticky top-0 z-20">
        <div className="flex items-center gap-3">
          <button
            type="button"
            data-tl="btn-back-accounts"
            className="flex items-center gap-1.5 text-sm font-medium text-gray-700 hover:text-gray-900 transition-colors"
          >
            <ArrowLeft className="w-4 h-4" />
            <span>Back</span>
          </button>
          <div className="h-4 w-px bg-gray-200" />
          <div className="flex items-center gap-2 text-sm text-gray-500">
            <Home className="w-4 h-4 text-gray-500" />
            <ChevronRight className="w-3.5 h-3.5 text-gray-400" />
            <span>Accounts</span>
            <ChevronRight className="w-3.5 h-3.5 text-gray-400" />
            <span className="font-semibold text-gray-900">Details</span>
          </div>
        </div>
      </div>

      {/* Main Content - Plain form sitting directly on the white page in ONE centered column (~600px) */}
      <div className="flex-1 bg-white">
        <div className="max-w-[600px] w-full mx-auto pt-[90px] pb-16 px-4">
          <h1 className="text-2xl font-bold text-gray-900 mb-8">
            {displayCode} &mdash; {updatedName}
          </h1>

          <div className="space-y-5">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1.5">
                Code
              </label>
              <input
                type="text"
                data-tl="input-account-code"
                value={displayCode}
                readOnly
                className="w-full px-3.5 py-2.5 bg-white border border-gray-200 rounded-xl text-sm text-gray-900 focus:outline-none focus:border-purple-500 transition-colors"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1.5">
                Name
              </label>
              <input
                type="text"
                data-tl="input-account-name"
                value={updatedName}
                readOnly
                className="w-full px-3.5 py-2.5 bg-white border border-gray-200 rounded-xl text-sm text-gray-900 focus:outline-none focus:border-purple-500 transition-colors"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1.5">
                Account Type
              </label>
              <div className="w-full px-3.5 py-2.5 bg-white border border-gray-200 rounded-xl text-sm text-gray-900 flex items-center justify-between">
                <span>{displayType}</span>
                <ChevronDown className="w-4 h-4 text-gray-400" />
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1.5">
                Description
              </label>
              <textarea
                data-tl="input-account-desc"
                rows={3}
                value={updatedDesc}
                placeholder="Optional description"
                readOnly
                className="w-full px-3.5 py-2.5 bg-white border border-gray-200 rounded-xl text-sm text-gray-900 focus:outline-none focus:border-purple-500 transition-colors resize-y"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1.5">
                Parent Account
              </label>
              <div className="w-full px-3.5 py-2.5 bg-white border border-gray-200 rounded-xl text-sm text-gray-900 flex items-center justify-between">
                <span>{displayParent}</span>
                <ChevronDown className="w-4 h-4 text-gray-400" />
              </div>
            </div>

            <div className="flex items-center gap-2.5 pt-1">
              <input
                type="checkbox"
                id="header-account"
                readOnly
                className="w-4 h-4 rounded border-gray-300 text-[#7014D9] focus:ring-purple-500"
              />
              <label htmlFor="header-account" className="text-sm text-gray-700 cursor-pointer">
                Header account (grouping only)
              </label>
            </div>

            <button
              type="button"
              data-tl="btn-update-account"
              className="w-full bg-[#7014D9] hover:bg-[#5e10b8] text-white py-3 rounded-xl font-medium text-sm transition-colors mt-6 shadow-sm"
            >
              Update Account
            </button>

            {/* Child Accounts section if parent account */}
            {isParentAccount && (
              <div className="pt-8 border-t border-gray-200">
                <h3 className="text-base font-semibold text-gray-900 mb-3">Child Accounts</h3>
                <div className="border border-gray-200 rounded-xl overflow-hidden">
                  <table className="w-full text-left text-sm">
                    <thead className="bg-gray-50 border-b border-gray-200 text-xs text-gray-500 uppercase">
                      <tr>
                        <th className="py-2.5 px-4 font-medium">Code</th>
                        <th className="py-2.5 px-4 font-medium">Name</th>
                        <th className="py-2.5 px-4 font-medium">Type</th>
                        <th className="py-2.5 px-4 font-medium">Status</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-gray-200">
                      {childAccounts.map((child) => (
                        <tr key={child.code} className="hover:bg-gray-50">
                          <td className="py-2.5 px-4 font-mono text-gray-700">{child.code}</td>
                          <td className="py-2.5 px-4 font-medium text-gray-900">{child.name}</td>
                          <td className="py-2.5 px-4 text-gray-600 uppercase text-xs">{child.type}</td>
                          <td className="py-2.5 px-4">
                            <span className="inline-flex items-center px-2 py-0.5 rounded-full text-xs font-medium bg-emerald-100 text-emerald-800">
                              Active
                            </span>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
