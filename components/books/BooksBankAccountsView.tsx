"use client";

import React from "react";
import type { Timeline } from "@/lib/timeline";
import { useTimelineVar } from "@/lib/useTimelineVar";
import {
  BOOKS_URLS,
  type BankAccount,
  formatGBP,
  BANK_STATUS_FILTERS,
  BANK_TYPE_FILTERS,
} from "./books-data";
import {
  Landmark,
  Search,
  Plus,
  ChevronDown,
  Check,
  Building2,
  Sparkles,
  ArrowRight,
} from "lucide-react";

interface BooksBankAccountsViewProps {
  tl: Timeline;
}

export function BooksBankAccountsView({ tl }: BooksBankAccountsViewProps) {
  const accounts = useTimelineVar<BankAccount[]>(tl, "booksBankAccounts", []);
  const searchQuery = useTimelineVar<string>(tl, "booksBankAccountsSearch", "");
  const statusFilter = useTimelineVar<string>(
    tl,
    "booksBankAccountsStatusFilter",
    "Status"
  );
  const typeFilter = useTimelineVar<string>(
    tl,
    "booksBankAccountsTypeFilter",
    "Account Type"
  );
  const statusFilterOpen = useTimelineVar<boolean>(
    tl,
    "booksBankAccountsStatusFilterOpen",
    false
  );
  const typeFilterOpen = useTimelineVar<boolean>(
    tl,
    "booksBankAccountsTypeFilterOpen",
    false
  );

  // Compute active vs inactive count
  const activeCount = accounts.filter(
    (a: BankAccount) => a.status === "ACTIVE"
  ).length;
  const inactiveCount = accounts.filter(
    (a: BankAccount) => a.status === "INACTIVE"
  ).length;
  const totalBalance = accounts
    .filter((a: BankAccount) => a.status === "ACTIVE")
    .reduce(
      (sum: number, a: BankAccount) =>
        sum + (a.currency === "GBP" ? (a.balance ?? a.currentBalance ?? 0) : 0),
      0
    );

  // Filter accounts
  const filteredAccounts = accounts.filter((a: BankAccount) => {
    const accName = a.name || a.accountName || "";
    if (searchQuery.trim()) {
      const q = searchQuery.toLowerCase();
      if (
        !accName.toLowerCase().includes(q) &&
        !a.bankName.toLowerCase().includes(q) &&
        !a.accountNumber.includes(q)
      ) {
        return false;
      }
    }
    if (statusFilter !== "Status" && statusFilter !== "All") {
      if (a.status.toUpperCase() !== statusFilter.toUpperCase()) return false;
    }
    if (typeFilter !== "Account Type" && typeFilter !== "All") {
      if (a.accountType !== typeFilter) return false;
    }
    return true;
  });

  return (
    <div
      data-tl="view-bank-accounts"
      data-scroller="true"
      className="flex flex-col h-full bg-[#F9FAFB] overflow-y-auto no-scrollbar"
    >
      <div className="p-6 space-y-6 max-w-7xl mx-auto w-full">
        {/* Top 3 Summary Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {/* Card 1: Total Balance */}
          <div
            data-tl="card-total-balance"
            className="bg-white rounded-xl border border-gray-200 p-5 shadow-xs"
          >
            <div className="flex items-center justify-between text-xs font-medium text-gray-500 mb-1">
              <span>Total Balance</span>
              <span className="text-emerald-600 font-semibold bg-emerald-50 px-2 py-0.5 rounded-full">
                +0.0% this month
              </span>
            </div>
            <div className="text-2xl font-bold text-gray-900 tracking-tight">
              {accounts.length > 0 ? formatGBP(totalBalance || 1587.58) : "GBP 1,587.58"}
            </div>
            <div className="text-xs text-gray-500 mt-2">
              {accounts.length > 0 ? `${accounts.length} accounts` : "2 accounts"}
            </div>
          </div>

          {/* Card 2: Active Accounts */}
          <div
            data-tl="card-active-accounts"
            className="bg-white rounded-xl border border-gray-200 p-5 shadow-xs"
          >
            <div className="text-xs font-medium text-gray-500 mb-1">
              Active Accounts
            </div>
            <div className="text-2xl font-bold text-gray-900 tracking-tight">
              {accounts.length > 0 ? activeCount : 2}
            </div>
            <div className="text-xs text-gray-500 mt-2">
              {accounts.length > 0
                ? `${activeCount} active • ${inactiveCount} inactive`
                : "2 active • 0 inactive"}
            </div>
          </div>

          {/* Card 3: Quick Actions */}
          <div
            data-tl="card-quick-actions"
            className="bg-white rounded-xl border border-gray-200 p-5 shadow-xs flex flex-col justify-between"
          >
            <div className="text-xs font-medium text-gray-500 mb-1">
              Quick Actions
            </div>
            <div className="flex items-center gap-2 my-1">
              <span className="text-xs font-medium text-gray-600 px-2.5 py-1 bg-gray-100 rounded-md">
                Transfer
              </span>
              <span className="text-xs font-medium text-gray-600 px-2.5 py-1 bg-gray-100 rounded-md">
                Reconcile
              </span>
            </div>
            <div>
              <button
                type="button"
                data-tl="btn-view-transactions"
                onClick={() => {
                  tl.setVar("booksView", "bank-transactions");
                  tl.setUrl(BOOKS_URLS.bankTransactions);
                }}
                className="text-xs font-medium text-[#2563EB] hover:text-blue-700 flex items-center gap-1 transition-colors cursor-pointer"
              >
                <span>View Transactions</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </button>
            </div>
          </div>
        </div>

        {/* Bank Feeds Banner Card */}
        <div
          data-tl="card-bank-feeds"
          className="bg-gradient-to-r from-blue-50/80 to-indigo-50/50 rounded-xl border border-blue-100 p-4 flex items-center justify-between shadow-xs"
        >
          <div className="flex items-center gap-3.5">
            <div className="w-10 h-10 rounded-lg bg-blue-600 text-white flex items-center justify-center shrink-0">
              <Sparkles className="w-5 h-5" />
            </div>
            <div>
              <h4 className="text-xs font-semibold text-gray-900">
                Automate your banking
              </h4>
              <p className="text-[11px] text-gray-600 mt-0.5">
                Connect your bank feeds to automatically import transactions and reconcile faster.
              </p>
            </div>
          </div>
          <button
            type="button"
            data-tl="btn-connect-bank"
            className="px-3 py-1.5 rounded-lg border border-gray-300 bg-white text-xs font-medium text-gray-700 hover:bg-gray-50 transition-colors shadow-2xs shrink-0 cursor-pointer"
          >
            Connect bank
          </button>
        </div>

        {/* Controls Bar: Search, Filters, + Add Account button */}
        <div className="flex items-center justify-between gap-3">
          <div className="flex items-center gap-2.5 flex-1 max-w-lg">
            {/* Search Input */}
            <div className="relative flex-1">
              <Search className="w-4 h-4 text-gray-400 absolute left-3 top-1/2 -translate-y-1/2" />
              <input
                type="text"
                data-tl="input-bank-accounts-search"
                value={searchQuery}
                onChange={(e) => tl.setVar("booksBankAccountsSearch", e.target.value)}
                placeholder="Search bank accounts..."
                className="w-full pl-9 pr-3 py-2 bg-white border border-gray-200 rounded-lg text-xs placeholder-gray-400 focus:outline-none focus:ring-1 focus:ring-blue-500"
              />
            </div>

            {/* Status Filter Dropdown */}
            <div className="relative">
              <button
                type="button"
                data-tl="select-bank-accounts-status"
                onClick={() =>
                  tl.setVar("booksBankAccountsStatusFilterOpen", !statusFilterOpen)
                }
                className="flex items-center gap-2 px-3 py-2 bg-white border border-gray-200 rounded-lg text-xs font-medium text-gray-700 hover:bg-gray-50 transition-colors cursor-pointer"
              >
                <span>{statusFilter}</span>
                <ChevronDown className="w-3.5 h-3.5 text-gray-400" />
              </button>

              {statusFilterOpen && (
                <div
                  data-tl="menu-bank-accounts-status"
                  className="absolute left-0 mt-1 w-36 bg-white border border-gray-200 rounded-lg shadow-lg py-1 z-30"
                >
                  {BANK_STATUS_FILTERS.map((s) => {
                    const slug = s === "Status" ? "all" : s.toLowerCase();
                    return (
                      <button
                        key={s}
                        type="button"
                        data-tl={`opt-status-${slug}`}
                        onClick={() => {
                          tl.setVar("booksBankAccountsStatusFilter", s);
                          tl.setVar("booksBankAccountsStatusFilterOpen", false);
                        }}
                        className="w-full text-left px-3 py-1.5 text-xs text-gray-700 hover:bg-gray-50 flex items-center justify-between cursor-pointer"
                      >
                        <span>{s}</span>
                        {statusFilter === s && (
                          <Check className="w-3.5 h-3.5 text-blue-600" />
                        )}
                      </button>
                    );
                  })}
                </div>
              )}
            </div>

            {/* Account Type Filter Dropdown */}
            <div className="relative">
              <button
                type="button"
                data-tl="select-bank-accounts-type"
                onClick={() =>
                  tl.setVar("booksBankAccountsTypeFilterOpen", !typeFilterOpen)
                }
                className="flex items-center gap-2 px-3 py-2 bg-white border border-gray-200 rounded-lg text-xs font-medium text-gray-700 hover:bg-gray-50 transition-colors cursor-pointer"
              >
                <span>{typeFilter}</span>
                <ChevronDown className="w-3.5 h-3.5 text-gray-400" />
              </button>

              {typeFilterOpen && (
                <div
                  data-tl="menu-bank-accounts-type"
                  className="absolute left-0 mt-1 w-40 bg-white border border-gray-200 rounded-lg shadow-lg py-1 z-30"
                >
                  {BANK_TYPE_FILTERS.map((t) => {
                    const slug =
                      t === "Account Type" ? "all" : t.toLowerCase().replace(/\s+/g, "-");
                    return (
                      <button
                        key={t}
                        type="button"
                        data-tl={`opt-type-${slug}`}
                        onClick={() => {
                          tl.setVar("booksBankAccountsTypeFilter", t);
                          tl.setVar("booksBankAccountsTypeFilterOpen", false);
                        }}
                        className="w-full text-left px-3 py-1.5 text-xs text-gray-700 hover:bg-gray-50 flex items-center justify-between cursor-pointer"
                      >
                        <span>{t}</span>
                        {typeFilter === t && (
                          <Check className="w-3.5 h-3.5 text-blue-600" />
                        )}
                      </button>
                    );
                  })}
                </div>
              )}
            </div>
          </div>

          {/* Top + Add Bank Account button */}
          <button
            type="button"
            data-tl="btn-add-account"
            onClick={() => {
              tl.setVar("booksView", "new-bank-account");
              tl.setUrl(BOOKS_URLS.newBankAccount);
            }}
            className="flex items-center gap-1.5 px-3.5 py-2 rounded-lg bg-[#2563EB] hover:bg-blue-700 text-white text-xs font-medium transition-colors shadow-xs cursor-pointer"
          >
            <Plus className="w-3.5 h-3.5" />
            <span>+ Add Bank Account</span>
          </button>
        </div>

        {/* Content: Empty State OR Accounts Table */}
        {accounts.length === 0 ? (
          <div
            data-tl="empty-bank-accounts"
            className="bg-white rounded-xl border border-gray-200 p-12 text-center flex flex-col items-center justify-center min-h-[360px]"
          >
            <div className="w-14 h-14 rounded-2xl bg-blue-50 text-blue-600 flex items-center justify-center mb-4">
              <Landmark className="w-7 h-7" />
            </div>
            <h3 className="text-base font-semibold text-gray-900 mb-1">
              Set Up Your Bank Accounts
            </h3>
            <p className="text-xs text-gray-500 max-w-md mb-6 leading-relaxed">
              Connect your bank feeds or manually add your accounts to track balances,
              reconcile statements, and monitor cash flow.
            </p>
            <button
              type="button"
              data-tl="btn-empty-add-account"
              onClick={() => {
                tl.setVar("booksView", "new-bank-account");
                tl.setUrl(BOOKS_URLS.newBankAccount);
              }}
              className="flex items-center gap-1.5 px-4 py-2 rounded-lg bg-[#2563EB] hover:bg-blue-700 text-white text-xs font-medium transition-colors shadow-xs cursor-pointer"
            >
              <Plus className="w-3.5 h-3.5" />
              <span>+ Add Bank Account</span>
            </button>
          </div>
        ) : (
          <div
            data-tl="table-bank-accounts"
            className="bg-white rounded-xl border border-gray-200 overflow-hidden shadow-xs"
          >
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="border-b border-gray-200 bg-gray-50/75 text-[11px] font-semibold text-gray-500 uppercase tracking-wider">
                  <th className="py-3 px-4">Account Name</th>
                  <th className="py-3 px-4">Bank Name</th>
                  <th className="py-3 px-4">Account Type</th>
                  <th className="py-3 px-4">Account Number</th>
                  <th className="py-3 px-4">Currency</th>
                  <th className="py-3 px-4">Status</th>
                  <th className="py-3 px-4 text-right">Current Balance</th>
                  <th className="py-3 px-4 text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-100 text-xs">
                {filteredAccounts.map((account: BankAccount) => {
                  const accName = account.name || account.accountName || "";
                  const bal = account.balance ?? account.currentBalance ?? 0;
                  const isActive = account.status === "ACTIVE";
                  return (
                    <tr
                      key={account.id}
                      data-tl={`account-row-${account.id}`}
                      onClick={() => {
                        tl.setVar("booksActiveBankAccount", account);
                        tl.setVar("booksView", "bank-account-detail");
                        tl.setUrl(
                          BOOKS_URLS.bankAccountDetails.replace(":id", account.id)
                        );
                      }}
                      className="hover:bg-gray-50/75 transition-colors cursor-pointer group"
                    >
                      <td className="py-3.5 px-4 font-medium text-gray-900 flex items-center gap-2.5">
                        <div className="w-7 h-7 rounded-lg bg-blue-50 text-blue-600 flex items-center justify-center shrink-0">
                          <Building2 className="w-3.5 h-3.5" />
                        </div>
                        <span className="font-semibold text-gray-900 group-hover:text-blue-600 transition-colors">
                          {accName}
                        </span>
                      </td>
                      <td className="py-3.5 px-4 text-gray-600">{account.bankName}</td>
                      <td className="py-3.5 px-4">
                        <span className="px-2 py-0.5 rounded-md bg-gray-100 text-gray-700 font-medium text-[11px]">
                          {account.accountType}
                        </span>
                      </td>
                      <td className="py-3.5 px-4 text-gray-500 font-mono text-[11px]">
                        ••••{account.accountNumber.slice(-4) || account.accountNumber}
                      </td>
                      <td className="py-3.5 px-4 text-gray-600 font-medium">
                        {account.currency}
                      </td>
                      <td className="py-3.5 px-4">
                        <span
                          data-tl={`badge-status-${account.id}`}
                          className={`inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-[10px] font-semibold tracking-wide uppercase ${
                            isActive
                              ? "bg-emerald-50 text-emerald-700 border border-emerald-200"
                              : "bg-gray-100 text-gray-600 border border-gray-200"
                          }`}
                        >
                          <span
                            className={`w-1.5 h-1.5 rounded-full ${
                              isActive ? "bg-emerald-500" : "bg-gray-400"
                            }`}
                          />
                          {account.status}
                        </span>
                      </td>
                      <td className="py-3.5 px-4 text-right font-semibold text-gray-900">
                        {account.currency === "GBP"
                          ? formatGBP(bal)
                          : `${account.currency} ${bal.toLocaleString("en-US", { minimumFractionDigits: 2 })}`}
                      </td>
                      <td className="py-3.5 px-4 text-right">
                        <span className="text-xs text-blue-600 group-hover:underline font-medium">
                          View
                        </span>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
}
