"use client";

import { useState } from "react";
import type { Timeline } from "@/lib/timeline";
import { useTimelineVar } from "@/lib/useTimelineVar";
import { X, ChevronDown, Check } from "lucide-react";
import { COA_ACCOUNT_TYPES } from "./books-data";

type Props = {
  tl: Timeline;
};

export function BooksCreateAccountModal({ tl }: Props) {
  const isOpen = useTimelineVar<boolean>(tl, "booksCreateAccountModalOpen", false);
  const accountType = useTimelineVar<string>(tl, "booksNewAccountType", "");
  const accountTypeOpen = useTimelineVar<boolean>(tl, "booksNewAccountTypeOpen", false);
  const accountName = useTimelineVar<string>(tl, "booksNewAccountName", "");
  const isSubAccount = useTimelineVar<boolean>(tl, "booksNewAccountIsSub", false);
  const parentAccount = useTimelineVar<string>(tl, "booksNewAccountParent", "");
  const parentAccountOpen = useTimelineVar<boolean>(tl, "booksNewAccountParentOpen", false);
  const accountCode = useTimelineVar<string>(tl, "booksNewAccountCode", "");
  const description = useTimelineVar<string>(tl, "booksNewAccountDescription", "");

  const [localTypeOpen, setLocalTypeOpen] = useState(false);
  const [localParentOpen, setLocalParentOpen] = useState(false);

  if (!isOpen) return null;

  const showTypeDropdown = accountTypeOpen || localTypeOpen;
  const showParentDropdown = parentAccountOpen || localParentOpen;

  const parentOptions = [
    "1100 - Accounts Receivable",
    "1000 - Cash on Hand",
    "1001 - Undeposited Funds",
    "1200 - Inventory Asset",
  ];

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-xs animate-in fade-in">
      <div
        data-tl="modal-create-account"
        className="bg-white rounded-xl shadow-2xl border border-gray-200 max-w-lg w-full overflow-hidden flex flex-col"
      >
        {/* Header */}
        <div className="px-6 py-4 border-b border-gray-200 flex items-center justify-between bg-gray-50">
          <h3 className="text-lg font-bold text-gray-900">Create Account</h3>
          <button
            type="button"
            data-tl="btn-close-account-modal"
            className="text-gray-400 hover:text-gray-600 p-1 rounded-md"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Body */}
        <div className="p-6 space-y-4 max-h-[75vh] overflow-y-auto">
          {/* Account Type */}
          <div className="relative">
            <label className="block text-xs font-semibold text-gray-700 uppercase tracking-wider mb-1.5">
              Account Type <span className="text-red-500">*</span>
            </label>
            <button
              type="button"
              data-tl="select-modal-account-type"
              onClick={() => setLocalTypeOpen(!localTypeOpen)}
              className="w-full px-3.5 py-2.5 bg-white border border-gray-300 rounded-lg text-sm text-gray-900 flex items-center justify-between text-left shadow-sm"
            >
              <span>{accountType || "Select an Account Type"}</span>
              <ChevronDown className="w-4 h-4 text-gray-400" />
            </button>

            {showTypeDropdown && (
              <div
                data-tl="menu-modal-account-types"
                className="absolute left-0 right-0 mt-1 bg-white border border-gray-200 rounded-lg shadow-xl z-30 max-h-56 overflow-y-auto py-1"
              >
                {COA_ACCOUNT_TYPES.map((t) => (
                  <button
                    key={t}
                    type="button"
                    data-tl={`opt-type-${t.toLowerCase().replace(/[^a-z0-9]/g, "-")}`}
                    onClick={() => setLocalTypeOpen(false)}
                    className="w-full px-4 py-2 text-left text-sm hover:bg-blue-50 text-gray-800 hover:text-blue-600 flex items-center justify-between"
                  >
                    <span>{t}</span>
                    {accountType === t && <Check className="w-4 h-4 text-blue-600" />}
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* Asset Info Card when Cash is selected */}
          {accountType === "Cash" && (
            <div className="bg-[#1E293B] text-slate-100 p-4 rounded-xl text-xs space-y-1 shadow-sm">
              <div className="flex items-center gap-2">
                <span className="px-2 py-0.5 rounded bg-blue-500 text-white font-bold text-[10px] tracking-wide uppercase">
                  ASSET
                </span>
              </div>
              <p className="text-slate-300 text-xs leading-relaxed pt-1">
                To keep track of cash and other cash equivalents like petty cash, undeposited funds, etc.
              </p>
            </div>
          )}

          {/* Account Name */}
          <div>
            <label className="block text-xs font-semibold text-gray-700 uppercase tracking-wider mb-1.5">
              Account Name <span className="text-red-500">*</span>
            </label>
            <input
              type="text"
              data-tl="input-modal-account-name"
              placeholder="e.g. Staff Float"
              value={accountName}
              readOnly
              className="w-full px-3.5 py-2.5 bg-gray-50 border border-gray-300 rounded-lg text-sm text-gray-900 focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

          {/* Sub Account Checkbox */}
          <div className="pt-1">
            <label className="flex items-center gap-2.5 cursor-pointer">
              <input
                type="checkbox"
                data-tl="chk-modal-sub-account"
                checked={isSubAccount}
                readOnly
                className="w-4 h-4 text-blue-600 rounded border-gray-300 focus:ring-blue-500"
              />
              <span className="text-sm font-medium text-gray-800">
                Make this a sub-account of
              </span>
            </label>
          </div>

          {/* Parent Account Dropdown (shown when sub-account checked) */}
          {isSubAccount && (
            <div className="relative pl-6">
              <label className="block text-xs font-semibold text-gray-700 uppercase tracking-wider mb-1.5">
                Parent Account <span className="text-red-500">*</span>
              </label>
              <button
                type="button"
                data-tl="select-modal-parent-account"
                onClick={() => setLocalParentOpen(!localParentOpen)}
                className="w-full px-3.5 py-2.5 bg-white border border-gray-300 rounded-lg text-sm text-gray-900 flex items-center justify-between text-left shadow-sm"
              >
                <span>{parentAccount || "Select Parent Account"}</span>
                <ChevronDown className="w-4 h-4 text-gray-400" />
              </button>

              {showParentDropdown && (
                <div
                  data-tl="menu-modal-parent-accounts"
                  className="absolute left-6 right-0 mt-1 bg-white border border-gray-200 rounded-lg shadow-xl z-30 py-1"
                >
                  {parentOptions.map((opt) => (
                    <button
                      key={opt}
                      type="button"
                      data-tl={`opt-parent-${opt.includes("1100") ? "ar" : opt.toLowerCase().replace(/[^a-z0-9]/g, "-")}`}
                      onClick={() => setLocalParentOpen(false)}
                      className="w-full px-4 py-2 text-left text-sm hover:bg-blue-50 text-gray-800 hover:text-blue-600 flex items-center justify-between"
                    >
                      <span>{opt}</span>
                      {parentAccount === opt && <Check className="w-4 h-4 text-blue-600" />}
                    </button>
                  ))}
                </div>
              )}
            </div>
          )}

          {/* Account Code */}
          <div>
            <label className="block text-xs font-semibold text-gray-700 uppercase tracking-wider mb-1.5">
              Account Code
            </label>
            <input
              type="text"
              data-tl="input-modal-account-code"
              placeholder="e.g. 1002"
              value={accountCode}
              readOnly
              className="w-full px-3.5 py-2.5 bg-gray-50 border border-gray-300 rounded-lg text-sm text-gray-900 font-mono focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

          {/* Description */}
          <div>
            <label className="block text-xs font-semibold text-gray-700 uppercase tracking-wider mb-1.5">
              Description
            </label>
            <textarea
              data-tl="input-modal-account-desc"
              rows={3}
              placeholder="Staff float for minor expenses"
              value={description}
              readOnly
              className="w-full px-3.5 py-2.5 bg-gray-50 border border-gray-300 rounded-lg text-sm text-gray-900 focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
        </div>

        {/* Footer */}
        <div className="px-6 py-4 bg-gray-50 border-t border-gray-200 flex items-center justify-end gap-3">
          <button
            type="button"
            data-tl="btn-modal-cancel-account"
            className="px-4 py-2 text-sm font-medium text-gray-700 hover:text-gray-900 bg-white border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors"
          >
            Cancel
          </button>
          <button
            type="button"
            data-tl="btn-modal-save-account"
            className="px-5 py-2 text-sm font-semibold text-white bg-[#145CFB] hover:bg-blue-600 rounded-lg shadow-sm transition-colors"
          >
            Save
          </button>
        </div>
      </div>
    </div>
  );
}
