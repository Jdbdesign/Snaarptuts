"use client";

import { useState } from "react";
import type { Timeline } from "@/lib/timeline";
import { useTimelineVar } from "@/lib/useTimelineVar";
import {
  BOOKS_RECEIVABLES,
  BOOKS_PAYABLES,
  CASH_FLOW_PERIODS,
  WATCHLIST_ACCRUAL,
  WATCHLIST_CASH,
  RECENT_UPDATES,
} from "./books-data";
import { User, ChevronDown, FileText, Receipt } from "lucide-react";

type Props = {
  tl: Timeline;
};

export function BooksHomeView({ tl }: Props) {
  const activeTab = useTimelineVar<"dashboard" | "recent">(tl, "booksHomeTab", "dashboard");
  const period = useTimelineVar<string>(tl, "booksCashFlowPeriod", "This Month");
  const watchlistBasis = useTimelineVar<"Accrual" | "Cash">(tl, "booksWatchlistBasis", "Accrual");
  const periodDropdownOpen = useTimelineVar<boolean>(tl, "booksCashFlowDropdownOpen", false);
  const watchlistDropdownOpen = useTimelineVar<boolean>(tl, "booksWatchlistDropdownOpen", false);
  const timelineHoveredBar = useTimelineVar<number | null>(tl, "booksCashFlowHoveredBar", null);
  const [localHoveredBar, setLocalHoveredBar] = useState<number | null>(null);
  const hoveredBar = timelineHoveredBar !== null ? timelineHoveredBar : localHoveredBar;

  const cashFlow = CASH_FLOW_PERIODS[period] || CASH_FLOW_PERIODS["This Month"];
  const watchlistItems = watchlistBasis === "Accrual" ? WATCHLIST_ACCRUAL : WATCHLIST_CASH;

  return (
    <div data-tl="books-home-container" className="w-full h-full overflow-y-auto px-8 py-6 space-y-6 max-w-[1200px] mx-auto pb-16">
      {/* Greeting Header */}
      <div data-tl="home-greeting-section" className="flex items-center gap-3.5">
        <div className="flex h-12 w-12 items-center justify-center rounded-full bg-blue-50 text-blue-600 border border-blue-100">
          <User size={24} />
        </div>
        <div>
          <h1 className="text-xl font-bold text-gray-900 tracking-tight">
            Hello, Sam Taylor
          </h1>
          <p className="text-xs font-medium text-gray-400 mt-0.5">Gold</p>
        </div>
      </div>

      {/* Tabs */}
      <div data-tl="home-tabs-row" className="flex items-center gap-8 border-b border-gray-200">
        <button
          type="button"
          data-tl="tab-home-dashboard"
          onClick={() => tl.setVar("booksHomeTab", "dashboard")}
          className={`pb-3 text-sm font-semibold transition-colors relative cursor-pointer ${
            activeTab === "dashboard"
              ? "text-blue-600 after:absolute after:bottom-0 after:left-0 after:right-0 after:h-0.5 after:bg-blue-600"
              : "text-gray-500 hover:text-gray-700"
          }`}
        >
          Dashboard
        </button>
        <button
          type="button"
          data-tl="tab-home-recent-updates"
          onClick={() => tl.setVar("booksHomeTab", "recent")}
          className={`pb-3 text-sm font-semibold transition-colors relative cursor-pointer ${
            activeTab === "recent"
              ? "text-blue-600 after:absolute after:bottom-0 after:left-0 after:right-0 after:h-0.5 after:bg-blue-600"
              : "text-gray-500 hover:text-gray-700"
          }`}
        >
          Recent Updates
        </button>
      </div>

      {activeTab === "dashboard" ? (
        <div className="space-y-6">
          {/* Top Stat Cards: Receivables & Payables */}
          <div className="grid grid-cols-2 gap-6">
            {/* Receivables Card */}
            <div
              data-tl="card-total-receivables"
              className="rounded-2xl border border-gray-200 bg-white p-5 shadow-2xs hover:shadow-xs transition-shadow"
            >
              <div className="flex items-center justify-between">
                <h3 className="text-sm font-semibold text-gray-900">Total Receivables</h3>
                <span data-tl="link-new-receivable" className="text-xs font-semibold text-blue-600 cursor-pointer hover:underline">
                  + New
                </span>
              </div>
              <p className="mt-3 text-xs text-gray-400">Total Unpaid Invoices</p>
              <p data-tl="val-receivables-unpaid" className="mt-1 text-2xl font-bold text-gray-900 tracking-tight">
                {BOOKS_RECEIVABLES.unpaid}
              </p>
              <div className="mt-5 flex items-center gap-6 pt-3 border-t border-gray-100 text-xs">
                <div data-tl="val-receivables-current" className="flex items-center gap-2 text-gray-600">
                  <span className="h-2 w-2 rounded-full bg-blue-500" />
                  <span>Current : {BOOKS_RECEIVABLES.current}</span>
                </div>
                <div data-tl="val-receivables-overdue" className="flex items-center gap-2 text-gray-600">
                  <span className="h-2 w-2 rounded-full bg-amber-500" />
                  <span>Overdue : {BOOKS_RECEIVABLES.overdue}</span>
                </div>
              </div>
            </div>

            {/* Payables Card */}
            <div
              data-tl="card-total-payables"
              className="rounded-2xl border border-gray-200 bg-white p-5 shadow-2xs hover:shadow-xs transition-shadow"
            >
              <div className="flex items-center justify-between">
                <h3 className="text-sm font-semibold text-gray-900">Total Payables</h3>
                <span data-tl="link-new-payable" className="text-xs font-semibold text-blue-600 cursor-pointer hover:underline">
                  + New
                </span>
              </div>
              <p className="mt-3 text-xs text-gray-400">Total Unpaid Bills</p>
              <p data-tl="val-payables-unpaid" className="mt-1 text-2xl font-bold text-gray-900 tracking-tight">
                {BOOKS_PAYABLES.unpaid}
              </p>
              <div className="mt-5 flex items-center gap-6 pt-3 border-t border-gray-100 text-xs">
                <div data-tl="val-payables-current" className="flex items-center gap-2 text-gray-600">
                  <span className="h-2 w-2 rounded-full bg-blue-500" />
                  <span>Current : {BOOKS_PAYABLES.current}</span>
                </div>
                <div data-tl="val-payables-overdue" className="flex items-center gap-2 text-gray-600">
                  <span className="h-2 w-2 rounded-full bg-amber-500" />
                  <span>Overdue : {BOOKS_PAYABLES.overdue}</span>
                </div>
              </div>
            </div>
          </div>

          {/* Cash Flow Chart */}
          <div
            data-tl="card-cash-flow"
            className="rounded-2xl border border-gray-200 bg-white p-5 shadow-2xs"
          >
            <div className="flex items-center justify-between">
              <h3 className="text-sm font-semibold text-gray-900">Cash Flow</h3>
              <div className="relative">
                <button
                  type="button"
                  data-tl="btn-cash-flow-period"
                  onClick={() => tl.setVar("booksCashFlowDropdownOpen", !periodDropdownOpen)}
                  className="flex items-center gap-2 rounded-lg border border-gray-200 bg-white px-3 py-1.5 text-xs font-medium text-gray-700 hover:bg-gray-50 transition-colors cursor-pointer"
                >
                  <span>{period}</span>
                  <ChevronDown size={14} className="text-gray-400" />
                </button>

                {periodDropdownOpen && (
                  <div
                    data-tl="menu-cash-flow-period"
                    className="absolute right-0 top-full mt-1 z-30 w-36 rounded-xl border border-gray-200 bg-white py-1 shadow-lg text-xs"
                  >
                    {["This Week", "This Month", "Last Month", "This Quarter", "This Year"].map((p) => (
                      <button
                        key={p}
                        type="button"
                        data-tl={`opt-period-${p.toLowerCase().replace(/\s+/g, "-")}`}
                        onClick={() => {
                          tl.setVar("booksCashFlowPeriod", p);
                          tl.setVar("booksCashFlowDropdownOpen", false);
                        }}
                        className={`flex w-full px-3 py-2 text-left hover:bg-gray-50 transition-colors cursor-pointer ${
                          p === period ? "font-semibold text-blue-600 bg-blue-50/50" : "text-gray-700"
                        }`}
                      >
                        {p}
                      </button>
                    ))}
                  </div>
                )}
              </div>
            </div>

            {/* Chart Area */}
            <div data-tl="cash-flow-chart-area" className="relative mt-6 h-56 w-full">
              {/* Tooltip */}
              {hoveredBar !== null && (
                <div
                  data-tl="cash-flow-tooltip"
                  className="absolute top-2 left-1/2 -translate-x-1/2 z-20 rounded-lg bg-gray-900 px-3 py-1.5 text-xs text-white shadow-lg pointer-events-none"
                >
                  {cashFlow.labels[hoveredBar]}, Incoming: £{cashFlow.incoming[hoveredBar]}, Outgoing: £{cashFlow.outgoing[hoveredBar]}
                </div>
              )}

              {/* Gridlines */}
              <div className="absolute inset-0 flex flex-col justify-between pointer-events-none">
                {[400, 300, 200, 100, 0].map((tick) => (
                  <div key={tick} className="flex items-center w-full">
                    <span className="w-8 text-[10px] text-gray-400 text-right pr-2 select-none">
                      {Math.round((tick / 400) * cashFlow.maxVal)}
                    </span>
                    <div className="flex-1 border-b border-dashed border-gray-200" />
                  </div>
                ))}
              </div>

              {/* Bars Container */}
              <div className="absolute inset-0 left-9 flex items-end justify-around pb-6 pt-2">
                {cashFlow.labels.map((lbl, idx) => {
                  const incHeight = (cashFlow.incoming[idx] / cashFlow.maxVal) * 100;
                  const outHeight = (cashFlow.outgoing[idx] / cashFlow.maxVal) * 100;

                  return (
                    <div
                      key={lbl}
                      data-tl={`bar-group-${idx}`}
                      onMouseEnter={() => setLocalHoveredBar(idx)}
                      onMouseLeave={() => setLocalHoveredBar(null)}
                      className="group flex flex-col items-center h-full justify-end cursor-pointer"
                    >
                      <div className="flex items-end gap-1.5 h-full">
                        {/* Incoming Bar (Green) */}
                        <div
                          data-tl={`bar-incoming-${idx}`}
                          style={{ height: `${Math.max(4, incHeight)}%` }}
                          className="w-10 rounded-t-sm bg-[#22C55E] transition-all hover:brightness-105"
                        />
                        {/* Outgoing Bar (Red) */}
                        <div
                          data-tl={`bar-outgoing-${idx}`}
                          style={{ height: `${Math.max(4, outHeight)}%` }}
                          className="w-10 rounded-t-sm bg-[#EF4444] transition-all hover:brightness-105"
                        />
                      </div>
                      <span className="text-[11px] font-medium text-gray-500 mt-2 select-none">
                        {lbl}
                      </span>
                    </div>
                  );
                })}
              </div>
            </div>

            {/* Legend */}
            <div className="mt-4 flex items-center justify-center gap-6 text-xs text-gray-600">
              <div className="flex items-center gap-2">
                <span className="h-3 w-3 rounded-xs bg-[#22C55E]" />
                <span>Incoming</span>
              </div>
              <div className="flex items-center gap-2">
                <span className="h-3 w-3 rounded-xs bg-[#EF4444]" />
                <span>Outgoing</span>
              </div>
            </div>
          </div>

          {/* Quick Actions & Bank Accounts */}
          <div className="grid grid-cols-2 gap-6">
            {/* Quick Actions Card */}
            <div
              data-tl="card-quick-actions"
              className="rounded-2xl border border-gray-200 bg-white p-5 shadow-2xs"
            >
              <h3 className="text-sm font-semibold text-gray-900">Quick Actions</h3>
              <div className="mt-4 space-y-2.5">
                <div
                  data-tl="quick-action-create-invoice"
                  className="flex items-center gap-3 rounded-xl border border-gray-100 bg-gray-50/60 p-3 hover:bg-gray-50 transition-colors cursor-pointer"
                >
                  <span className="flex h-8 w-8 items-center justify-center rounded-lg bg-blue-100 text-blue-600">
                    <FileText size={16} />
                  </span>
                  <span className="text-xs font-medium text-gray-800">Create Invoice</span>
                </div>
                <div
                  data-tl="quick-action-record-bill"
                  className="flex items-center gap-3 rounded-xl border border-gray-100 bg-gray-50/60 p-3 hover:bg-gray-50 transition-colors cursor-pointer"
                >
                  <span className="flex h-8 w-8 items-center justify-center rounded-lg bg-blue-100 text-blue-600">
                    <Receipt size={16} />
                  </span>
                  <span className="text-xs font-medium text-gray-800">Record Bill</span>
                </div>
              </div>
            </div>

            {/* Bank and Credit Cards Card */}
            <div
              data-tl="card-bank-accounts"
              className="rounded-2xl border border-gray-200 bg-white p-5 shadow-2xs flex flex-col justify-between"
            >
              <div>
                <h3 className="text-sm font-semibold text-gray-900">Bank and Credit Cards</h3>
                <p className="mt-3 text-xs text-gray-400">Total Balance</p>
                <p data-tl="val-bank-total-balance" className="mt-1 text-2xl font-bold text-gray-900 tracking-tight">
                  £1,588.70
                </p>
                <p className="mt-2 text-xs text-gray-500">3 accounts</p>
              </div>
              <div className="pt-3 border-t border-gray-100">
                <span data-tl="link-view-bank-accounts" className="text-xs font-semibold text-blue-600 cursor-pointer hover:underline">
                  View Bank Accounts
                </span>
              </div>
            </div>
          </div>

          {/* Account Watchlist */}
          <div
            data-tl="card-account-watchlist"
            className="rounded-2xl border border-gray-200 bg-white p-5 shadow-2xs"
          >
            <div className="flex items-center justify-between">
              <h3 className="text-sm font-semibold text-gray-900">Account Watchlist</h3>
              <div className="relative">
                <button
                  type="button"
                  data-tl="btn-watchlist-basis"
                  onClick={() => tl.setVar("booksWatchlistDropdownOpen", !watchlistDropdownOpen)}
                  className="flex items-center gap-2 rounded-lg border border-purple-200 bg-purple-50/30 px-3 py-1.5 text-xs font-medium text-purple-700 hover:bg-purple-50 transition-colors cursor-pointer"
                >
                  <span>{watchlistBasis}</span>
                  <ChevronDown size={14} className="text-purple-500" />
                </button>

                {watchlistDropdownOpen && (
                  <div
                    data-tl="menu-watchlist-basis"
                    className="absolute right-0 top-full mt-1 z-30 w-28 rounded-xl border border-gray-200 bg-white py-1 shadow-lg text-xs"
                  >
                    {["Accrual", "Cash"].map((b) => (
                      <button
                        key={b}
                        type="button"
                        data-tl={`opt-basis-${b.toLowerCase()}`}
                        onClick={() => {
                          tl.setVar("booksWatchlistBasis", b);
                          tl.setVar("booksWatchlistDropdownOpen", false);
                        }}
                        className={`flex w-full px-3 py-2 text-left hover:bg-gray-50 transition-colors cursor-pointer ${
                          b === watchlistBasis ? "font-semibold text-purple-700 bg-purple-50/60" : "text-gray-700"
                        }`}
                      >
                        {b}
                      </button>
                    ))}
                  </div>
                )}
              </div>
            </div>

            <div className="mt-4 divide-y divide-gray-100">
              {watchlistItems.map((item, idx) => (
                <div
                  key={item.name}
                  data-tl={`watchlist-row-${idx + 1}`}
                  className="flex items-center justify-between py-3 text-xs"
                >
                  <div>
                    <p className="font-medium text-gray-900">{item.name}</p>
                    <p className="text-[11px] text-gray-400 mt-0.5">{item.code}</p>
                  </div>
                  <span
                    className={`font-semibold ${
                      item.negative ? "text-rose-600" : "text-gray-900"
                    }`}
                  >
                    {item.amount}
                  </span>
                </div>
              ))}
            </div>
          </div>
        </div>
      ) : (
        /* Recent Updates Tab */
        <div data-tl="home-recent-updates-list" className="rounded-2xl border border-gray-200 bg-white p-5 shadow-2xs divide-y divide-gray-100">
          {RECENT_UPDATES.map((item, idx) => (
            <div
              key={item.id}
              data-tl={`recent-update-row-${idx + 1}`}
              className="flex items-start justify-between py-3.5 hover:bg-gray-50/50 px-2 rounded-lg transition-colors"
            >
              <div>
                <p className="text-sm font-semibold text-gray-900">{item.title}</p>
                <p className="text-xs text-gray-500 mt-0.5">{item.detail}</p>
              </div>
              <span className="text-xs text-gray-400 shrink-0 select-none">{item.date}</span>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
