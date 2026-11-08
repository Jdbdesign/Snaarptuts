"use client";

import type { Timeline } from "@/lib/timeline";
import { useTimelineVar } from "@/lib/useTimelineVar";
import {
  Lock,
  ShoppingCart,
  ShoppingBag,
  Landmark,
  BookOpen,
} from "lucide-react";

type Props = {
  tl: Timeline;
};

export function BooksTransactionLockingView({ tl }: Props) {
  const lockMode = useTimelineVar<string>(tl, "booksLockMode", "all");

  return (
    <div
      className="flex-1 flex flex-col min-w-0 bg-white overflow-y-auto"
      data-scroller="true"
    >
      <div className="px-8 py-7 w-full max-w-6xl">
        {/* Title */}
        <h1 className="text-2xl font-bold text-gray-900 tracking-tight">
          Transaction Locking
        </h1>
        <p className="text-xs text-gray-500 leading-relaxed max-w-2xl mt-2">
          Transaction locking prevents you and your users from making any changes to transactions that might affect your accounts. Once transactions are locked, users cannot edit, modify, or delete any transactions that were recorded before the specified date in this module.
        </p>

        {lockMode !== "modules" ? (
          /* Screen A: Lock All view */
          <div>
            {/* All Transactions Row */}
            <div className="mt-8 border border-gray-200/90 rounded-2xl bg-white px-5 py-4.5 flex items-center justify-between shadow-[0_1px_2px_rgba(0,0,0,0.02)]">
              <div className="flex items-center gap-3.5">
                <div className="w-10 h-10 rounded-full bg-[#F6F6F6] flex items-center justify-center shrink-0">
                  <Lock className="w-4 h-4 text-gray-500" />
                </div>
                <div>
                  <div className="text-sm font-bold text-gray-900">All Transactions</div>
                  <div className="text-xs text-gray-500 mt-0.5">
                    You have not opted to lock all transactions.
                  </div>
                </div>
              </div>
              <button
                type="button"
                data-tl="btn-lock-all-link"
                className="inline-flex items-center gap-1 text-xs font-semibold text-blue-600 hover:text-blue-700 cursor-pointer"
              >
                <Lock className="w-3.5 h-3.5" />
                <span>Lock</span>
              </button>
            </div>

            {/* Lock Individual Modules Section */}
            <div className="mt-8">
              <h2 className="text-sm font-bold text-gray-900">
                Lock Individual Modules
              </h2>
              <p className="text-xs text-gray-500 mt-2 mb-2">
                You will be able to:
              </p>
              <ul className="list-disc list-inside text-xs text-gray-500 space-y-1 mb-4">
                <li>Select the modules (Sales, Purchases, Banking, Accountant) you wish to lock</li>
                <li>Set different lock dates for each module</li>
              </ul>
              <button
                type="button"
                data-tl="link-lock-individual-modules"
                onClick={() => tl?.setVar("booksLockMode", "modules")}
                className="inline-flex items-center gap-1.5 text-xs font-semibold text-blue-600 hover:text-blue-700 cursor-pointer"
              >
                <Lock className="w-3.5 h-3.5" />
                <span>Lock Individual Modules</span>
              </button>
            </div>
          </div>
        ) : (
          /* Screen B: Individual Modules view */
          <div>
            <div className="mt-8 space-y-3">
              {/* Sales Row */}
              <div className="border border-gray-200/90 rounded-2xl bg-white px-5 py-4 flex items-center justify-between shadow-[0_1px_2px_rgba(0,0,0,0.02)]">
                <div className="flex items-center gap-3.5">
                  <div className="w-10 h-10 rounded-full bg-[#F6F6F6] flex items-center justify-center shrink-0">
                    <ShoppingCart className="w-4 h-4 text-gray-500" />
                  </div>
                  <div>
                    <div className="text-sm font-bold text-gray-900">Sales</div>
                    <div className="text-xs text-gray-500 mt-0.5">
                      You have not locked the transactions in this module.
                    </div>
                  </div>
                </div>
                <button
                  type="button"
                  data-tl="link-lock-sales"
                  className="inline-flex items-center gap-1 text-xs font-semibold text-blue-600 hover:text-blue-700 cursor-pointer"
                >
                  <Lock className="w-3.5 h-3.5" />
                  <span>Lock</span>
                </button>
              </div>

              {/* Purchases Row */}
              <div className="border border-gray-200/90 rounded-2xl bg-white px-5 py-4 flex items-center justify-between shadow-[0_1px_2px_rgba(0,0,0,0.02)]">
                <div className="flex items-center gap-3.5">
                  <div className="w-10 h-10 rounded-full bg-[#F6F6F6] flex items-center justify-center shrink-0">
                    <ShoppingBag className="w-4 h-4 text-gray-500" />
                  </div>
                  <div>
                    <div className="text-sm font-bold text-gray-900">Purchases</div>
                    <div className="text-xs text-gray-500 mt-0.5">
                      You have not locked the transactions in this module.
                    </div>
                  </div>
                </div>
                <button
                  type="button"
                  data-tl="link-lock-purchases"
                  className="inline-flex items-center gap-1 text-xs font-semibold text-blue-600 hover:text-blue-700 cursor-pointer"
                >
                  <Lock className="w-3.5 h-3.5" />
                  <span>Lock</span>
                </button>
              </div>

              {/* Banking Row */}
              <div className="border border-gray-200/90 rounded-2xl bg-white px-5 py-4 flex items-center justify-between shadow-[0_1px_2px_rgba(0,0,0,0.02)]">
                <div className="flex items-center gap-3.5">
                  <div className="w-10 h-10 rounded-full bg-[#F6F6F6] flex items-center justify-center shrink-0">
                    <Landmark className="w-4 h-4 text-gray-500" />
                  </div>
                  <div>
                    <div className="text-sm font-bold text-gray-900">Banking</div>
                    <div className="text-xs text-gray-500 mt-0.5">
                      You have not locked the transactions in this module.
                    </div>
                  </div>
                </div>
                <button
                  type="button"
                  data-tl="link-lock-banking"
                  className="inline-flex items-center gap-1 text-xs font-semibold text-blue-600 hover:text-blue-700 cursor-pointer"
                >
                  <Lock className="w-3.5 h-3.5" />
                  <span>Lock</span>
                </button>
              </div>

              {/* Accountant Row */}
              <div className="border border-gray-200/90 rounded-2xl bg-white px-5 py-4 flex items-center justify-between shadow-[0_1px_2px_rgba(0,0,0,0.02)]">
                <div className="flex items-center gap-3.5">
                  <div className="w-10 h-10 rounded-full bg-[#F6F6F6] flex items-center justify-center shrink-0">
                    <BookOpen className="w-4 h-4 text-gray-500" />
                  </div>
                  <div>
                    <div className="text-sm font-bold text-gray-900">Accountant</div>
                    <div className="text-xs text-gray-500 mt-0.5">
                      You have not locked the transactions in this module.
                    </div>
                  </div>
                </div>
                <button
                  type="button"
                  data-tl="link-lock-accountant"
                  className="inline-flex items-center gap-1 text-xs font-semibold text-blue-600 hover:text-blue-700 cursor-pointer"
                >
                  <Lock className="w-3.5 h-3.5" />
                  <span>Lock</span>
                </button>
              </div>
            </div>

            {/* Divider */}
            <div className="border-t border-gray-200/80 my-7" />

            {/* Switch to Lock All Transactions */}
            <div>
              <h2 className="text-sm font-bold text-gray-900 mb-1">
                Lock All Transactions At Once
              </h2>
              <p className="text-xs text-gray-500 mb-3 max-w-2xl">
                You can freeze all transactions at once instead of locking the Sales, Purchases, Banking and Account transactions individually.
              </p>
              <button
                type="button"
                data-tl="link-switch-lock-all"
                onClick={() => tl?.setVar("booksLockMode", "all")}
                className="inline-flex items-center gap-1 text-xs font-semibold text-blue-600 hover:text-blue-700 cursor-pointer"
              >
                <span>Switch to Lock All Transactions &rarr;</span>
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
