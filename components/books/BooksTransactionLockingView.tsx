"use client";

import type { Timeline } from "@/lib/timeline";
import { Lock, Unlock, ShieldCheck } from "lucide-react";

type Props = {
  tl?: Timeline;
};

export function BooksTransactionLockingView({}: Props) {
  const modules = [
    {
      id: "sales",
      title: "Sales",
      description: "Invoices, Credit Notes, Sales Receipts, Customer Payments",
      status: "Unlocked",
      dataTlBtn: "btn-lock-sales",
    },
    {
      id: "purchases",
      title: "Purchases",
      description: "Expenses, Bills, Vendor Credits, Payments Made",
      status: "Unlocked",
      dataTlBtn: "btn-lock-purchases",
    },
    {
      id: "banking",
      title: "Banking",
      description: "Bank Accounts, Bank Transactions, Transfer Records",
      status: "Unlocked",
      dataTlBtn: "btn-lock-banking",
    },
    {
      id: "accountant",
      title: "Accountant",
      description: "Manual Journals, Chart of Accounts, Budgets",
      status: "Unlocked",
      dataTlBtn: "btn-lock-accountant",
    },
  ];

  return (
    <div className="flex-1 flex flex-col min-w-0 bg-[#F8FAFC] overflow-y-auto" data-scroller="true">
      {/* Top Header */}
      <div className="bg-white border-b border-gray-200 px-6 py-5 sticky top-0 z-20">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-purple-50 text-purple-600 flex items-center justify-center">
            <Lock className="w-5 h-5" />
          </div>
          <div>
            <h2 className="text-xl font-bold text-gray-900">Transaction Locking</h2>
            <p className="text-xs text-gray-500 mt-0.5">
              Lock your transactions to prevent anyone from adding, editing, or deleting them for a specific period.
            </p>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="p-8 max-w-5xl mx-auto w-full space-y-8 pb-24">
        {/* All Transactions Card */}
        <div className="bg-white rounded-xl border border-gray-200 p-6 shadow-sm flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div className="space-y-1">
            <div className="flex items-center gap-2.5">
              <ShieldCheck className="w-5 h-5 text-blue-600" />
              <h3 className="text-base font-bold text-gray-900">Lock All Transactions</h3>
            </div>
            <p className="text-xs text-gray-500 max-w-xl leading-relaxed">
              Lock all transactions across all modules simultaneously up to a chosen freeze date. This ensures closed financial accounting periods cannot be modified.
            </p>
          </div>
          <button
            type="button"
            data-tl="btn-lock-all"
            className="px-5 py-2.5 bg-[#145CFB] hover:bg-blue-600 text-white font-medium text-sm rounded-lg shadow-sm transition-colors whitespace-nowrap flex items-center gap-2 self-start sm:self-center"
          >
            <Lock className="w-4 h-4" />
            <span>Lock All</span>
          </button>
        </div>

        {/* Individual Modules Section */}
        <div className="space-y-4">
          <div>
            <h3 className="text-sm font-bold text-gray-900 uppercase tracking-wider">
              Lock by Specific Module
            </h3>
            <p className="text-xs text-gray-500 mt-0.5">
              Choose specific functional modules to lock independently based on your audit workflows.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
            {modules.map((mod) => (
              <div
                key={mod.id}
                className="bg-white rounded-xl border border-gray-200 p-5 shadow-sm hover:shadow-md transition-shadow flex flex-col justify-between"
              >
                <div>
                  <div className="flex items-center justify-between mb-2">
                    <h4 className="font-bold text-gray-900 text-base">{mod.title}</h4>
                    <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-xs font-medium bg-gray-100 text-gray-600 border border-gray-200">
                      <Unlock className="w-3 h-3 text-gray-400" />
                      <span>{mod.status}</span>
                    </span>
                  </div>
                  <p className="text-xs text-gray-500 leading-relaxed mb-4">
                    {mod.description}
                  </p>
                </div>

                <div className="pt-3 border-t border-gray-100 flex items-center justify-between">
                  <span className="text-xs text-gray-400">No freeze date set</span>
                  <button
                    type="button"
                    data-tl={mod.dataTlBtn}
                    className="inline-flex items-center gap-1.5 px-4 py-1.5 bg-gray-900 hover:bg-black text-white text-xs font-semibold rounded-lg shadow-sm transition-colors"
                  >
                    <Lock className="w-3.5 h-3.5" />
                    <span>Lock {mod.title}</span>
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
